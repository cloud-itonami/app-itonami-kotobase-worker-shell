(ns kotobase-protocols-worker.kotobase-store-test
  "KotobaseStore ≡ LocalStore: every scenario here runs through BOTH the
  real content-addressed engine (via an in-memory fake R2 bucket — same
  shape a real Cloudflare binding exposes: .get/.put with
  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts
  their :docs/:streams end up identical after each step AND survive a
  fresh hydrate (a true round-trip through the chain, not just an
  in-memory check). shadow-cljs :node-test — the engine's crypto seam
  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids
  nbb (ADR-2607177500)."
  (:require [cljs.test :refer-macros [deftest testing async]]
            [clojure.edn :as edn]
            [cljs.test :refer [is]]
            [cljs.test :as t]
            [kotobase-peer.core :as eng]
            [kotobase.local :as local]
            [kotobase.store :as st]
            [kotobase-protocols-worker.kotobase-r2 :as r2]
            [kotobase-protocols-worker.kotobase-store :as ks]))

;; ---------------------------------------------------------- fake R2
;; Minimal in-memory stand-in for the Cloudflare R2 binding: .get/.put
;; Promise-returning, honoring opts.onlyIf.etagMatches for the head-CAS
;; path exactly as the real binding does.

(defn fake-bucket []
  (let [store (atom {}) ;; key -> {:val string|Uint8Array :etag int}
        next-etag (atom 0)]
    #js {:get (fn [k]
                (js/Promise.resolve
                 (when-let [{:keys [val etag]} (get @store k)]
                   #js {:text (fn [] (js/Promise.resolve val))
                        :arrayBuffer (fn [] (js/Promise.resolve (.-buffer val)))
                        :etag (str etag)})))
         :put (fn [k v opts]
                (js/Promise.resolve
                 (let [current (get @store k)
                       required (some-> opts .-onlyIf .-etagMatches)]
                   (if (and required (not= required (some-> current :etag str)))
                     nil
                     (do (swap! store assoc k {:val v :etag (swap! next-etag inc)})
                         true)))))}))

;; -------------------------------------------------------------- ops

(defn- apply-op! [store [op & args]]
  (case op
    :put (apply st/-put store args)
    :append (apply st/-append store args)))

(def ops-1
  [[:put [:s3 "bkt"] "a.txt" {:body "hello"}]
   [:put [:s3 "bkt"] "b.txt" {:body "world"}]
   [:append :audit {:op :create :k "a.txt"}]
   [:append :audit {:op :create :k "b.txt"}]
   [:put [:s3 "bkt"] "a.txt" nil]                 ; delete/tombstone
   [:put [:atproto "did:x" "coll"] "r1" {:v 1}]])

(defn- content [snap] (select-keys snap [:docs :streams]))

(defn- run-through-datom-store!
  "Applies `ops` one at a time, each through its OWN
  hydrate-run-persist! cycle (so every step is a genuine chain commit,
  not one big in-memory batch), and resolves with the FINAL hydrated
  content (a fresh hydrate! of the resulting head, proving persistence
  round-trips, not just that the in-memory diff was correct)."
  [bucket ops]
  (letfn [(step [remaining]
            (if (empty? remaining)
              (js/Promise.resolve nil)
              (-> (ks/hydrate-run-persist!
                   bucket "" "test-graph"
                   (fn [seed]
                     (let [store (local/local-store seed)]
                       (apply-op! store (first remaining))
                       {:after-state (content (local/snapshot store))
                        :response nil})))
                  (.then (fn [{:keys [persisted]}]
                           (when-not persisted
                             (throw (ex-info "CAS lost in a single-writer test — should never happen" {})))
                           (step (rest remaining)))))))]
    (-> (step ops)
        (.then (fn [_]
                 (ks/hydrate-run-persist!
                  bucket "" "test-graph"
                  (fn [seed] {:after-state (content seed) :response (content seed)})))))))

(deftest datom-store-equals-local-store
  (async done
   (let [oracle (local/local-store)]
     (doseq [op ops-1] (apply-op! oracle op))
     (let [expected (content (local/snapshot oracle))]
       (-> (run-through-datom-store! (fake-bucket) ops-1)
           (.then
            (fn [{:keys [response]}]
              (testing "content-addressed round-trip (multiple sequential commits + a fresh hydrate) matches the LocalStore oracle exactly"
                (t/is (= (:docs expected) (:docs response)))
                (t/is (= (:streams expected) (:streams response))))
              (done)))
           (.catch (fn [e]
                     (t/is false (str "unexpected rejection: " (.-message e) "\n" (.-stack e)))
                     (done))))))))

(deftest empty-graph-hydrates-empty
  (async done
   (-> (ks/hydrate-run-persist!
        (fake-bucket) "" "brand-new-graph"
        (fn [seed] {:after-state (content seed) :response seed}))
       (.then (fn [{:keys [response persisted]}]
                (t/is persisted)
                (t/is (= {} (:docs response)))
                (t/is (= {} (:streams response)))
                (done)))
       (.catch (fn [e] (t/is false (.-message e)) (done))))))


(deftest diagnose-empty-graph
  (async done
   (-> (ks/diagnose! (fake-bucket) "" "never-touched-graph")
       (.then (fn [{:keys [chain-present? novelty-size should-fold?]}]
                (t/is (false? chain-present?))
                (t/is (= 0 novelty-size))
                (t/is (false? should-fold?))
                (done)))
       (.catch (fn [e] (t/is false (.-message e)) (done))))))

(deftest diagnose-after-one-commit-is-read-only
  (async done
   (let [bucket (fake-bucket)]
     (-> (ks/hydrate-run-persist!
          bucket "" "diag-graph"
          (fn [seed]
            (let [store (local/local-store seed)]
              (st/-put store [:s3 "bkt"] "k" {:v 1})
              {:after-state (content (local/snapshot store)) :response nil})))
         (.then (fn [_] (ks/diagnose! bucket "" "diag-graph")))
         (.then (fn [d1]
                  (t/is (true? (:chain-present? d1)))
                  (t/is (= 1 (:novelty-size d1)) "one commit, no fold yet, no prior novelty")
                  (t/is (false? (:should-fold? d1)) "1 < default threshold 64")
                  (ks/diagnose! bucket "" "diag-graph")))
         (.then (fn [d2]
                  (t/is (= 1 (:novelty-size d2))
                        "calling diagnose! must not itself mutate novelty (read-only)")
                  (done)))
         (.catch (fn [e] (t/is false (str (.-message e) "\n" (.-stack e))) (done)))))))


;; ── the fast outer layer of decode2 ──────────────────────────────────────────
;; `read-string-literal` replaces the EDN reader with JSON.parse for the OUTER
;; layer of a stored value, which is always a string literal. The two grammars
;; differ over exactly one thing this domain can produce -- raw control
;; characters, which pr-str emits unescaped and JSON forbids -- so these tests
;; pin both halves: the fast path must agree, and the case only the slow path
;; can read must still be read.

(deftest read-string-literal-agrees-with-the-edn-reader
  (doseq [s ["hello world"
             "he said \"hi\""
             "a\\b"
             "line1\nline2"
             "a\tb"
             "{:a 1 :b \"two\" :c #{1 2}}"
             "a/b"
             ""]]
    (let [wire (pr-str s)]
      (is (= s (ks/read-string-literal wire))
          (str "fast path must round-trip " (pr-str s)))
      (is (= (edn/read-string wire) (ks/read-string-literal wire))
          (str "fast and slow paths must agree on " (pr-str s))))))

(deftest read-string-literal-falls-back-on-raw-control-characters
  ;; This is the case that separates the two readers. JSON.parse THROWS here; if
  ;; the fallback were dropped the value would come back nil and the document
  ;; would silently lose its contents.
  (doseq [code [0 1 27 31]]
    (let [s (str "a" (js/String.fromCharCode code) "b")
          wire (pr-str s)]
      (is (nil? (try (js/JSON.parse wire) (catch :default _ nil)))
          (str "precondition: JSON.parse cannot read control char " code))
      (is (= s (ks/read-string-literal wire))
          (str "fallback must recover control char " code)))))

(deftest read-string-literal-refuses-non-strings
  ;; JSON.parse would return a NUMBER for "123" and nil for "null" where the EDN
  ;; reader returns 123 and the symbol null. The guard sends anything that is
  ;; not a string to the authoritative reader rather than diverging silently.
  (is (= 123 (ks/read-string-literal "123")))
  (is (= 'null (ks/read-string-literal "null")))
  (is (= [1 2] (ks/read-string-literal "[1 2]"))))
