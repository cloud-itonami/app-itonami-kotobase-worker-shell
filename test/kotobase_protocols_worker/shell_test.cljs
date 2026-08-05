(ns kotobase-protocols-worker.shell-test
  "The SigV4 write-auth path, driven end to end.

  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves
  them against AWS's published vectors. What that cannot prove is that *this*
  worker still composes them correctly — the akid check, the payload-hash
  check, and the header set it feeds the verifier. So these tests sign a
  request with the shared library, exactly as an S3 client would, and require
  the worker to accept it — then require it to reject each way it should."
  (:require [cljs.test :refer [deftest is testing async]]
            [kotobase-protocols-worker.shell :as worker]
            [kotobase-protocols-worker.query :as query]
            [kotobase.protocols.atproto :as atproto]
            [kotobase.protocols.git :as git]
            [kotobase.protocols.ipfs :as ipfs]
            [kotobase.protocols.ipfs-pinning :as ipfs-pinning]
            [kotobase.protocols.issue :as issue]
            [kotobase.protocols.s3 :as s3]
            [sigv4.core :as v4]
            [sigv4.crypto :as crypto]
            [sigv4.protocols :as p]))


;; The combined deployment: every surface this repo's Worker used to serve
;; from a built-in router table. kotobase-protocol-core's router has no such
;; table any more (ADR-2608051000), so the shell states it — and these tests
;; exercise the same set they always did.
(def ^:private handler
  (worker/make-handler
   {:surfaces (merge {"s3" s3/handle
                      "ipfs" ipfs/handle
                      "atproto" atproto/handle
                      "git" git/handle
                      "pinning" ipfs-pinning/handle
                      "issues" issue/handle}
                     query/surfaces)
    :path-surfaces query/path-surfaces}))

(def akid "AKIDEXAMPLE")
(def secret "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY")
(def env #js {:S3_ACCESS_KEY_ID akid :S3_SECRET_ACCESS_KEY secret})

(def c (crypto/crypto))
(def amz-date "20260725T120000Z")
(def short-date "20260725")
(def region "auto")

(defn- body-bytes [s] (.-buffer (.encode (js/TextEncoder.) s)))

(defn- sign-request
  "Build a request signed the way an S3 client signs it. → Promise<req>."
  [{:keys [body path]}]
  (let [payload-hash-p (p/-sha256-hex c body)]
    (.then payload-hash-p
           (fn [payload-hash]
             (let [headers {"host" "s3.kotobase.net"
                            "x-amz-content-sha256" payload-hash
                            "x-amz-date" amz-date}
                   {:keys [canonical-request signed-headers]}
                   (v4/canonical-request {:method :put :path path :query ""
                                          :headers headers
                                          :payload-hash payload-hash})
                   scope (v4/credential-scope short-date region)
                   {:keys [seed steps]} (v4/signing-key-chain secret short-date region)]
               (-> (p/-sha256-hex c canonical-request)
                   (.then (fn [cr-hash]
                            (let [sts (v4/string-to-sign amz-date scope cr-hash)]
                              (-> (reduce (fn [pr step] (.then pr #(p/-hmac c % step)))
                                          (js/Promise.resolve seed) steps)
                                  (.then #(p/-hmac c % sts))
                                  (.then #(p/-hex c %))))))
                   (.then (fn [signature]
                            {:method :put :path path :query {} :body body
                             :headers (assoc headers "authorization"
                                             (v4/authorization-header
                                              akid scope signed-headers signature))}))))))))

(deftest a-correctly-signed-write-is-accepted
  (async done
    (let [body (body-bytes "hello kotobase")]
      (-> (sign-request {:body "hello kotobase" :path "/bkt/a.txt"})
          (.then #(worker/sigv4-verify env % body))
          (.then (fn [ok?] (is (true? ok?) "a request signed by a real S3 client must verify") (done)))
          (.catch (fn [e] (is false (str e)) (done)))))))

(deftest a-non-ascii-key-is-accepted
  (testing "the copy this replaced encoded with charCodeAt, so a non-ASCII key
            signed as UTF-16 and could never have verified"
    (async done
      (let [body (body-bytes "x")]
        (-> (sign-request {:body "x" :path (v4/object-path "bkt" "日本語 file.txt")})
            (.then #(worker/sigv4-verify env % body))
            (.then (fn [ok?] (is (true? ok?)) (done)))
            (.catch (fn [e] (is false (str e)) (done))))))))

(deftest a-tampered-body-is-rejected
  (async done
    (-> (sign-request {:body "hello kotobase" :path "/bkt/a.txt"})
        (.then #(worker/sigv4-verify env % (body-bytes "hello attacker")))
        (.then (fn [ok?] (is (false? ok?) "the declared payload hash must match the body received") (done)))
        (.catch (fn [e] (is false (str e)) (done))))))

(deftest a-tampered-path-is-rejected
  (async done
    (let [body (body-bytes "hello kotobase")]
      (-> (sign-request {:body "hello kotobase" :path "/bkt/a.txt"})
          (.then #(worker/sigv4-verify env (assoc % :path "/bkt/elsewhere.txt") body))
          (.then (fn [ok?] (is (false? ok?)) (done)))
          (.catch (fn [e] (is false (str e)) (done)))))))

(deftest an-unknown-access-key-is-rejected
  (async done
    (let [body (body-bytes "x")]
      (-> (sign-request {:body "x" :path "/bkt/a.txt"})
          (.then #(worker/sigv4-verify #js {:S3_ACCESS_KEY_ID "OTHER"
                                            :S3_SECRET_ACCESS_KEY secret}
                                       % body))
          (.then (fn [ok?] (is (false? ok?)) (done)))
          (.catch (fn [e] (is false (str e)) (done)))))))

(deftest a-wrong-secret-is-rejected
  (async done
    (let [body (body-bytes "x")]
      (-> (sign-request {:body "x" :path "/bkt/a.txt"})
          (.then #(worker/sigv4-verify #js {:S3_ACCESS_KEY_ID akid
                                            :S3_SECRET_ACCESS_KEY "not-the-secret"}
                                       % body))
          (.then (fn [ok?] (is (false? ok?)) (done)))
          (.catch (fn [e] (is false (str e)) (done)))))))

;; ---------------------------------------------------------- read auth

(def ^:private no-r2
  "An env with NO STATE_BUCKET on purpose. A rejected read must be
  rejected before any storage is touched, so binding-free is exactly
  the right shape here: if the 401 ever regresses into a 200, this
  test does not quietly pass against a fake bucket — it explodes on a
  nil binding."
  #js {:APEX "kotobase.net" :CACAO_OPERATOR_DIDS ""})

(defn- fetch-req [method url]
  (js/Request. url #js {:method method}))

(defn- status-of [^js env req]
  (.then (.fetch handler req env #js {}) #(.-status ^js %)))

(defn- response-of [^js env req]
  (.fetch handler req env #js {}))

(deftest capability-discovery-needs-no-storage-and-is-honest
  (async done
    (let [req (js/Request.
               "https://cypher.kotobase.net/.well-known/kotobase-capabilities"
               #js {:headers #js {"x-request-id" "enterprise-smoke-1"}})]
      (-> (response-of no-r2 req)
          (.then (fn [response]
                   (is (= 200 (.-status response)))
                   (is (= "enterprise-smoke-1"
                          (.get (.-headers response) "x-kotobase-request-id")))
                   (is (= "max-age=31536000; includeSubDomains"
                          (.get (.-headers response) "strict-transport-security")))
                   (is (= "DENY" (.get (.-headers response) "x-frame-options")))
                   (.json response)))
          (.then (fn [body]
                   (is (= 1 (aget body "schema_version")))
                   (is (= "documented-subset"
                          (aget body "surfaces" "cypher" "compatibility")))
                   (is (true? (aget body "surfaces" "sparql" "read_only")))
                   (done)))
          (.catch (fn [e] (is false (str e)) (done)))))))

(deftest generated-request-ids-and-security-headers-cover-errors
  (async done
    (-> (response-of no-r2
                     (fetch-req "GET" "https://s3.kotobase.net/bkt/secret.txt"))
        (.then (fn [response]
                 (is (= 401 (.-status response)))
                 (is (re-matches #"kotobase-protocols-[0-9a-f-]+"
                                 (.get (.-headers response) "x-kotobase-request-id")))
                 (is (= "nosniff" (.get (.-headers response) "x-content-type-options")))
                 (is (= "no-referrer" (.get (.-headers response) "referrer-policy")))
                 (done)))
        (.catch (fn [e] (is false (str e)) (done))))))

(deftest an-anonymous-s3-read-is-rejected
  ;; The measured gap (ADR-2607263000 D2): before this, GET
  ;; https://s3.kotobase.net/<bucket>?list-type=2 answered 200 to
  ;; anyone. Both the object read and the bucket listing must 401.
  (async done
    (-> (js/Promise.all
         #js [(status-of no-r2 (fetch-req "GET" "https://s3.kotobase.net/bkt?list-type=2"))
              (status-of no-r2 (fetch-req "GET" "https://s3.kotobase.net/bkt/secret.txt"))
              (status-of no-r2 (fetch-req "HEAD" "https://s3.kotobase.net/bkt/secret.txt"))
              ;; the router's single-origin fallback reaches the same handler
              (status-of no-r2 (fetch-req "GET" "https://kotobase.net/s3/bkt/secret.txt"))])
        (.then (fn [statuses]
                 (is (= [401 401 401 401] (vec statuses)))
                 (done)))
        (.catch (fn [e] (is false (str e)) (done))))))

(deftest a-bearer-credential-passes-the-read-gate
  ;; Not asserting 200 — with no STATE_BUCKET the request fails after
  ;; authorization. The point is precisely that it gets PAST the gate:
  ;; anything other than 401 proves the credential was accepted.
  (async done
    (let [env #js {:APEX "kotobase.net" :WRITE_TOKEN "t0k3n" :CACAO_OPERATOR_DIDS ""}
          req (js/Request. "https://s3.kotobase.net/bkt/secret.txt"
                           #js {:method "GET"
                                :headers #js {"authorization" "Bearer t0k3n"}})]
      (-> (status-of env req)
          (.then (fn [status] (is (not= 401 status)) (done)))
          (.catch (fn [e] (is false (str e)) (done)))))))

(deftest an-anonymous-gremlin-websocket-handshake-is-rejected
  ;; This must exercise handler.fetch, not only core/read-auth-required?.  The
  ;; WebSocket upgrade is dispatched before the ordinary HTTP body path and a
  ;; regression there previously bypassed the otherwise-correct policy test.
  ;; `no-r2` and Node's lack of WebSocketPair are useful tripwires: a 401 proves
  ;; rejection happened before either storage hydration or socket allocation.
  (async done
    (let [req (js/Request. "https://gremlin.kotobase.net/gremlin"
                           #js {:method "GET"
                                :headers #js {"upgrade" "websocket"
                                              "connection" "Upgrade"
                                              "sec-websocket-key" "dGhlIHNhbXBsZSBub25jZQ=="
                                              "sec-websocket-version" "13"}})]
      (-> (response-of no-r2 req)
          (.then (fn [response]
                   (is (= 401 (.-status response)))
                   (is (= "Bearer" (.get (.-headers response) "www-authenticate")))
                   (is (= "nosniff" (.get (.-headers response) "x-content-type-options")))
                   (.text response)))
          (.then (fn [body]
                   (is (re-find #"reads require a credential" body))
                   (done)))
          (.catch (fn [e] (is false (str e)) (done)))))))

(deftest public-surfaces-are-still-anonymous
  ;; ipfs/git/atproto reads must NOT have been closed by the same
  ;; change — again asserting only "not 401", since without R2 they
  ;; cannot succeed either.
  (async done
    (-> (js/Promise.all
         #js [(status-of no-r2 (fetch-req "GET" "https://ipfs.kotobase.net/ipfs/bafyfake"))
              (status-of no-r2 (fetch-req "GET" "https://git.kotobase.net/r/info/refs"))
              (status-of no-r2 (fetch-req "GET" "https://s3.kotobase.net/health"))])
        (.then (fn [statuses]
                 (is (every? #(not= 401 %) statuses) (str (vec statuses)))
                 (done)))
        (.catch (fn [e] (is false (str e)) (done))))))
