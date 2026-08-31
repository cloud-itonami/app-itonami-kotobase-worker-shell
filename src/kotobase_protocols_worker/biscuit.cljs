(ns kotobase-protocols-worker.biscuit
  "The Biscuit rung of this Worker's one authorization ladder.

  Measured 2026-08-31 across all six apexes: no data plane in the fleet read
  `Authorization: Biscuit` at all -- the refusal was byte-identical with and
  without the header, so a holder of a perfectly good issued credential got
  the same answer as somebody holding nothing (ADR-2608311600). ADR-2608261300
  had made Biscuit the primary API credential five days earlier. The query
  surfaces were never wired.

  ## Not a second permission engine

  Everything here delegates to `kotobase.biscuit-grant`, the one
  implementation `authn` mints through and the API gateway already verifies
  through (ADR-2608262600 D4). This namespace adds only: which env var holds
  the public root, which curve verifies a block signature, and which
  permission this Worker's ladder demands. A second verifier would be a
  second place for the answer to drift.

  ## Public key, on purpose

  The root is a VERIFICATION key. This Worker can check a credential it could
  never have minted and holds nothing worth stealing -- which is the whole
  reason the credential is a Biscuit and not the shared string the ladder's
  first rung still accepts."
  (:require [kotobase.biscuit-grant :as grant]
            ["@noble/curves/ed25519.js" :refer [ed25519]]))

(def read-permission
  "What a read must carry. Same word ADR-2608280230 requires of the datom
  plane; inventing `query:read` here would have made every existing role
  unable to do something its role already says it can."
  "data:read")

(def write-permission "data:write")

(defn presented
  "The Biscuit out of the request's Authorization header, or nil."
  [req]
  (grant/header-token (get (:headers req) "authorization")))

(defn root-public-key [^js env]
  (grant/decode-base64url (aget env "BISCUIT_ROOT_PUBLIC_KEY_B64URL")))

(defn- verify-fn [public payload signature]
  (.verify ed25519
           (js/Uint8Array.from (clj->js (vec signature)))
           (js/Uint8Array.from (clj->js (vec payload)))
           (js/Uint8Array.from (clj->js (vec public)))))

(defn attempt
  "Decide the Biscuit rung. Synchronous: the curve is, so a refusal can be
  explained in the same pass that produced it.

  Returns `{:presented? :ok? :reason}`. `:reason` is nil only when nothing
  was presented -- every refusal is NAMED, because the repairs differ: a
  malformed header is a client bug, a bad signature is an attack or a key
  rotation, an expired token is neither, and a token missing the permission
  is the wrong token rather than a broken one.

  `op` is `:read` or `:write`. A write demands `data:write`; a read accepts
  either, because a credential that may write may obviously also read --
  the same reasoning the Bearer rung above it already uses."
  ([env req op] (attempt env req op (js/Date.now)))
  ([^js env req op now-ms]
   (let [token (presented req)]
     (cond
       (nil? token) {:presented? false :ok? false :reason nil}

       (nil? (root-public-key env))
       ;; Not "unauthorized": the operator configured no verification key, so
       ;; this Worker cannot answer the question at all. A 401 here would send
       ;; the caller off to fix a token that is fine.
       {:presented? true :ok? false :reason "biscuit verification is not configured"}

       :else
       (let [g (grant/grant token {:root-public-key (root-public-key env)
                                   :now-ms now-ms
                                   :verify-fn verify-fn})
             needed (if (= op :write) write-permission read-permission)]
         (cond
           (not (:ok? g))
           {:presented? true :ok? false :reason (name (:reason g))}

           (or (grant/permits? g write-permission)
               (and (= op :read) (grant/permits? g read-permission)))
           {:presented? true :ok? true :reason nil :grant g}

           :else
           {:presented? true :ok? false
            :reason (str "token does not carry " needed)}))))))

(defn refusal-detail
  "The sentence to append to a 401 when a Biscuit was presented and refused,
  or nil. Kept separate from `attempt` so the success path never builds a
  string it will not use."
  [env req op]
  (let [a (attempt env req op)]
    (when (and (:presented? a) (not (:ok? a)) (:reason a))
      (str "presented Biscuit rejected: " (:reason a)))))
