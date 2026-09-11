(ns kotobase-protocols-worker.core
  "Pure decision logic for the kotobase-protocols deploy shell —
  everything here is host-free so the nbb test suite covers it without
  a workerd runtime (same split as kotobase-cljc-worker: pure handler
  vs edge shell).

  `make-store` seeds a plain in-process kotobase.local/LocalStore that
  the pure kotobase.protocols router runs against synchronously for
  ONE request — same LocalStore either standalone (OSS) or, wired to
  the real content-addressed backend, as the per-request in-memory
  materialization kotobase-protocols-worker.kotobase-store hydrates
  from and diffs back to R2 (ADR-2607177500)."
  (:require [clojure.string :as str]
            [kotobase.local :as local]
            [kotobase.protocols.router :as router]))

(def empty-state
  {:docs {} :streams {} :seq 0 :revision 0 :tx-receipts {}})

(defn make-store
  "LocalStore over an atom the shell owns, so state snapshots are plain
  `@state` — no deftype field access (kotobase.local/snapshot reads
  `.-state`, which compiled cljs supports but nbb/SCI does not; owning
  the atom sidesteps the difference)."
  [seed]
  (let [state (atom (merge empty-state seed))]
    {:store (local/->LocalStore state) :state state}))

(def write-methods #{:put :post :delete})

;; `write?` needs the surface and `effective-surface` needs `router`, which
;; sits further down with the rest of the routing mirror. Declared rather than
;; reordered so the file keeps reading in its original order.
(declare effective-surface)

(def query-surfaces
  "Surfaces whose POST is a READ.

  SPARQL 1.1 Protocol sends queries by POST on purpose (query text outruns
  URL length limits), and Neo4j's HTTP Cypher API is
  `POST /db/data/transaction/commit`. Classifying those as writes by method
  alone makes all three surfaces answer 401 to every legitimate query, which
  is how this was found.

  Safe because none of them performs a CALLER-DIRECTED write: the Cypher
  handler rejects CREATE/MERGE/DELETE/SET/REMOVE with a named error rather
  than ignoring them, the SPARQL surface implements SELECT/ASK and no UPDATE
  at all, and the Gremlin subset has no mutation step. Nothing a caller sends
  can place data of its choosing. If any of them ever grows one, it comes OFF
  this set in the same commit — that is the invariant, and it is the only
  thing keeping a POST here from being an unauthenticated write.

  **This is NOT the same as touching nothing, and an earlier version of this
  docstring said \"read-only BY CONSTRUCTION\", which was wrong.**
  `kotobase.protocols.cypher` appends an audit event to the
  `:kotobase.protocols/audit` stream on every statement it runs, successful or
  not. That is a store mutation on a request classified here as a read. It is
  still not a caller-directed write — the record's shape and contents are the
  handler's, not the request's — but the distinction had a consequence that
  measurement found and reasoning did not: the append changes `:streams`, so
  the chain head advances, so two identical Cypher queries hydrate from
  different heads. A query memo keyed on that head NEVER hit on Cypher —
  measured locally at 0 hits / 3 queries against SPARQL's 2 / 3. The memo now
  keys on `:docs` alone, which the append does not touch; see
  `kotobase-protocols-worker.query/memo-version` and ADR-2607310900."
  #{"sparql" "cypher" "gremlin" "graphql"})

(defn write?
  "Whether this request mutates. The 1-arity is method-only and is what a
  caller with no apex can know; the 2-arity is the accurate one, because a
  POST to a read-only query surface is a read."
  ([req] (contains? write-methods (:method req)))
  ([req apex]
   (and (contains? write-methods (:method req))
        (not (contains? query-surfaces (effective-surface req apex))))))

(defn authorized-write?
  "Writes need `authorization: Bearer <token>`. Fail closed: with no
  token configured every write is rejected — an unauthenticated public
  S3/XRPC write surface must be impossible to deploy by accident.

  Named for writes but shape-identical for reads: the read ladder in
  `kotobase-protocols-worker.worker` calls this same predicate first,
  because a bearer token that may write may obviously also read."
  [req token]
  (boolean
   (and (string? token)
        (seq token)
        (= (get (:headers req) "authorization") (str "Bearer " token)))))

;; ------------------------------------------------------- read exposure

(def public-read-surfaces
  "Surfaces whose reads stay open to anyone, and why each one is a
  deliberate decision rather than an omission:

    ipfs    the CID *is* the capability — knowing it is the grant, and
            the gateway serves immutable content-addressed blocks
            (KRP §3.3). Requiring a credential to fetch a CID would
            make it not an IPFS gateway.
    git     an actor repo's git history is the primary source of its
            PUBLIC data (ADR-2607072300, git-journal primacy). Closing
            it would invert that ADR.
    atproto AT-Protocol records are a public record plane; per-DID
            isolation (ADR-2607178000) governs WHOSE graph is read,
            not whether a reader must authenticate.

  Closed, each also deliberately:

    s3      tenant object storage. The Drive that ADR-2607263000 puts
            on this surface makes every object someone's private file.
    pinning the Pinning Service API is per-user by spec (its own
            §authentication) — `GET /pins` is *your* pin list, and
            answering it anonymously would answer with someone's.
    issues  self-described internal-only (see the handler's ns
            docstring); a repo's public journal is git's job, and
            git.<apex> already serves it.

  An allowlist, not a denylist: a surface added later is private until
  someone states otherwise here (ADR-2607263000 D2)."
  #{"ipfs" "git" "atproto"})

(defn effective-surface
  "Which protocol surface this request will ACTUALLY land on — mirrors
  `kotobase.protocols.router/handle`'s dispatch, including its
  single-origin path-prefix fallback.

  Derived rather than assumed: an authorization decision made against
  a different surface than the one that answers is the whole bug class
  this exists to prevent. `GET /s3/bkt/k` on the apex is an s3 read
  even though its host has no `s3.` label."
  [req apex]
  (let [path (or (:path req) "")]
    (or (router/surface-of (:host req) apex)
        (cond
          (str/starts-with? path "/ipfs/")   "ipfs"
          (str/starts-with? path "/ipns/")   "ipfs"
          (str/starts-with? path "/xrpc/")   "atproto"
          (str/starts-with? path "/pins")    "pinning"
          (str/starts-with? path "/s3/")     "s3"
          (str/starts-with? path "/git/")    "git"
          (str/starts-with? path "/issues/") "issues"
          ;; Same mounts kotobase-protocols-worker.query registers with the
          ;; router. Kept in step deliberately: an authorization decision made
          ;; against a different surface than the one that answers is the bug
          ;; class effective-surface exists to prevent.
          (str/starts-with? path "/sparql")    "sparql"
          (str/starts-with? path "/db/data/")  "cypher"
          (str/starts-with? path "/gremlin")   "gremlin"
          (str/starts-with? path "/graphql")   "graphql"))))

(defn read-auth-required?
  "True when this non-write request must present a credential.

  `GET /health` is exempt on every surface: the router answers it
  before dispatching to any handler (it is a routing/readiness probe,
  not tenant data), and an uptime monitor cannot hold a CACAO."
  [req apex]
  (and (not (write? req apex))
       (not (and (= :get (:method req)) (= "/health" (:path req))))
       (let [surface (effective-surface req apex)]
         (and (some? surface)
              (not (contains? public-read-surfaces surface))))))

(defn unauthorized-response
  "401 for an unauthenticated request. `op` distinguishes the message
  only — the status and the fail-closed behaviour are the same for
  reads and writes."
  ([token-configured?] (unauthorized-response token-configured? :write nil))
  ([token-configured? op] (unauthorized-response token-configured? op nil))
  ([token-configured? op detail]
   ;; `detail` says why a credential that WAS presented did not work. Without
   ;; it the enumeration below is all a caller ever learns, and a rejected
   ;; token reads exactly like no token at all -- measured 2026-08-31 as the
   ;; reason a Biscuit holder could not tell a wrong key from an unwired
   ;; surface (ADR-2608311600).
   {:status 401
    :headers {"content-type" "text/plain; charset=utf-8"
              "www-authenticate" "Biscuit, Bearer"}
    :body (str (cond
                 (= op :read)
                 "unauthorized: this surface's reads require a credential (an issued Biscuit, Bearer, AWS SigV4, or an operator CACAO)"
                 token-configured?
                 "unauthorized: writes require an issued Biscuit or a bearer token"
                 :else
                 "unauthorized: write token not configured (writes are disabled)")
               (when detail (str " — " detail)))}))

(defn normalize-headers
  "Lower-case header names once at the boundary."
  [pairs]
  (into {} (map (fn [[k v]] [(str/lower-case k) v])) pairs))
