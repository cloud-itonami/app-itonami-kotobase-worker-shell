(ns kotobase-protocols-worker.query
  "The four query-protocol surfaces — SPARQL 1.1, openCypher, Gremlin and GraphQL —
  composed onto this deploy shell.

  They live in their own repositories (`org-w3-sparql-protocol`,
  `org-opencypher-cypher`, `org-apache-tinkerpop-gremlin`), each a consumer
  of the shared `kotobase-query` bridge, and `kotobase.protocols.router`
  does not know they exist. It does not have to: the router takes
  `:surfaces` and `:path-surfaces` from ctx, and **the shell that already
  depends on both is where they meet** — the same arrangement
  `drive.object/store-of` and `storj.store` prescribe for object stores.

  ## `:visible?` is (constantly true) HERE, and that is not a default

  All four handlers REQUIRE a `:visible?` predicate over materialized
  datoms and refuse to run without one (ADR-2607050500) — deliberately no
  permissive default, because a query surface that shows everything by
  accident is the worst possible accident.

  Supplying `(constantly true)` here is a decision about *this deployment*,
  not a shrug: the store handed to a request is already the graph
  `kotobase-protocols-worker.graph/for-request` resolved for it, so the
  isolation boundary is the store itself and a per-datom filter on top would
  be filtering a set that is already the tenant's own. If this shell ever
  serves more than one tenant's datoms out of one store, this is the line
  that has to change, and it is written out rather than hidden behind a
  default so that change is a visible edit rather than a discovered gap.

  ## Collections come from the store, not from configuration

  SPARQL needs `:coll-keys` (its RDF dataset) and Gremlin needs
  `:vertex-colls`. Both are read off the hydrated state, so a graph exposes
  exactly what it holds. A configured list would drift from the data the
  first time anyone wrote a new collection, and drift in the direction of
  *querying something that is not there* is silent — you get an empty
  result, not an error.

  ## What these surfaces are NOT

  Each is an explicitly-scoped subset, documented in its own repository, and
  deploying them does not widen any of it. All three can walk an edge now, and
  Cypher's `WHERE` does comparisons, booleans, `IS NULL`, string predicates and
  `count()` — but variable-length paths (`-[:R*1..3]->`), `OPTIONAL MATCH`,
  `WITH` and `UNION` are still absent, and each repository's README is the list
  that is kept true rather than this paragraph.

  Materialization is memoized per isolate (`memo-version` below) rather than
  redone per query, which is a floor and not a fix: the first query against a
  given `:docs` still rebuilds every requested collection, so the cost scales
  with the graph and not with the answer. Only a persisted index (ADR-2607310900
  L2) changes that, and none of it is fixed by putting a hostname in front."
  (:require [graphql.sdl :as sdl]
            [kotobase.gremlin.envelope :as gremlin-envelope]
            [kotobase.query.bridge :as bridge]
            [kotobase.protocols.cypher :as cypher]
            [kotobase.protocols.graphql :as graphql]
            [kotobase.protocols.http :as http]
            [kotobase.protocols.json :as json]
            [kotobase.protocols.sparql :as sparql]
            [kotobase.store :as st]))

(def visible-everything
  "See the ns docstring — a decision about this deployment, made explicit."
  (constantly true))

(defn collections
  "Collection keys present in a hydrated LocalStore-shaped `state`."
  [state]
  (vec (sort (keys (:docs state)))))

(defn gremlin-http-handle
  "Gremlin's transport is WebSocket. A plain HTTP request to the surface gets
  426, which is what the status code is for — answering 200 with a JSON
  explanation would let a client believe it had a working endpoint."
  [_ctx _req]
  (http/response 426
                 {"content-type" "text/plain; charset=utf-8"
                  "upgrade" "websocket"
                  "cache-control" "no-store"}
                 (str "gremlin speaks WebSocket (GraphSON RequestMessage per text frame).\n"
                      "Connect with Upgrade: websocket; op must be \"bytecode\" (no \"eval\").\n")))

(def graphql-schema
  "Stable v1 schema. Values remain JSON strings so arbitrary Kotobase
  documents are not silently coerced into a guessed application schema."
  (sdl/parse-schema
   "type Query {
      document(collection: String!, key: ID!): Document
      documents(collection: String!, limit: Int): [Document]
      collections: [String]
    }
    type Document { collection: String!, key: ID!, json: String! }"))

(defn- document [store coll key]
  (when-some [value (st/-get store coll key)]
    {:collection coll :key key :json (json/encode value)}))

(defn graphql-resolvers [colls]
  {["Query" "collections"] (fn [_ _ _] colls)
   ["Query" "document"]
   (fn [_ args {:keys [store]}]
     (document store (str (get args "collection")) (str (get args "key"))))
   ["Query" "documents"]
   (fn [_ args {:keys [store]}]
     (let [coll (str (get args "collection"))
           limit (min 1000 (max 0 (or (get args "limit") 100)))]
       (->> (st/-list store coll)
            sort
            (take limit)
            (keep #(document store coll %))
            vec)))})

(def surfaces
  "Host label -> handler, for `kotobase.protocols.router`'s ctx."
  {"sparql" sparql/handle
   "cypher" cypher/handle
   "gremlin" gremlin-http-handle
   "graphql" graphql/handle})

(def path-surfaces
  "Path prefix -> surface label, for deploys serving one hostname.

  The prefixes are each protocol's own absolute path, not a mount point we
  chose: SPARQL 1.1 Protocol puts the query at the service endpoint, and
  Neo4j's HTTP Cypher API is `/db/data/transaction/commit`. The router does
  not strip them, because the handlers check those paths themselves."
  {"/sparql" "sparql"
   "/db/data/" "cypher"
   "/gremlin" "gremlin"
   "/graphql" "graphql"})

(def capabilities
  "Machine-readable, deliberately conservative compatibility contract.

  This belongs beside the handlers rather than in marketing copy so adding a
  feature and claiming it are reviewed in the same change.  `subset` is a
  compatibility level, not a product weakness: clients can branch on it
  instead of mistaking a familiar hostname for complete wire compatibility."
  {"schema_version" 1
   "service" "kotobase-query-protocols"
   "canonical_model" "content-addressed datoms"
   "surfaces"
   {"sparql" {"transport" "SPARQL Protocol over HTTP"
              "operations" ["SELECT" "ASK"]
              "compatibility" "documented-subset"
              "read_only" true
              "not_claimed" ["full SPARQL 1.1 grammar" "SPARQL Update" "RDF 1.2"]}
    "cypher" {"transport" "Neo4j-shaped transactional HTTP"
              "operations" ["MATCH" "WHERE" "RETURN" "ORDER BY" "UNION" "count"]
              "compatibility" "documented-subset"
              "read_only" true
              "not_claimed" ["Bolt" "full openCypher grammar" "mutations"
                               "variable-length paths" "OPTIONAL MATCH" "WITH"]}
    "gremlin" {"transport" "WebSocket GraphSON RequestMessage"
               "operations" ["bytecode"]
               "compatibility" "documented-subset"
               "read_only" true
               "not_claimed" ["script eval" "full TinkerPop step set" "mutations"]}
    "graphql" {"transport" "GraphQL over HTTP POST"
               "operations" ["query" "document" "documents" "collections"]
               "compatibility" "documented-subset"
               "read_only" true
               "schema" "kotobase-document-v1"
               "not_claimed" ["mutations" "subscriptions" "variables" "introspection"]}}
   "isolation" {"unit" "one hydrated content-addressed graph per request"
                "cross_tenant_default" "deny"
                "visibility_filter_required" true}
   "limits" {"query_cost_controls" "adapter-defined"
             "capability_discovery" "/.well-known/kotobase-capabilities"}})


(defonce ^{:doc "The query memo for this isolate (ADR-2607310900 L1).

  `defonce` in module scope: a Cloudflare isolate survives across requests, so
  this is where a memo can live at all. It is per-isolate and per-colo, which is
  the RIGHT scope for it — the memo holds derived data, so losing one costs
  time and never correctness, and that is exactly why it does not justify a
  Durable Object or any other shared writer."}
  isolate-memo
  (bridge/memo))


(defn memo-stats
  "This isolate's memo counters, as a JSON-shaped map. A thin projection of
  `bridge/memo-stats` so the shell does not have to know the memo's shape."
  []
  (let [{:keys [size capacity hits misses]} (bridge/memo-stats isolate-memo)
        total (+ hits misses)]
    {"size" size "capacity" capacity "hits" hits "misses" misses
     "hit_rate" (if (pos? total) (/ (Math/round (* 10000.0 (/ hits total))) 10000.0) nil)}))

(defn queryable?
  "Whether this request will land on a read-only query surface.

  The memo names the state a query READS, not the state a write leaves behind,
  so it is only supplied where nothing the caller directs can write. These three
  surfaces are read-only in that sense (`kotobase-protocols-worker.core/query-
  surfaces` says why, including the audit append that is not), and tying the
  memo to that same set means the guarantee is checked in one place rather than
  assumed in two."
  [surface]
  (contains? surfaces surface))

(defn memo-version
  "What the memo keys on: `:docs`, and nothing else.

  MEASURED, 2026-07-31, `wrangler dev --local` with a seeded graph and the
  `/_diag/query-memo` counters, when this keyed on the CHAIN HEAD instead:

      SPARQL  2 hits / 3 queries
      Cypher  0 hits / 3 queries

  Cypher's zero was not a tuning problem. `kotobase.protocols.cypher` appends an
  audit event per statement, which changes `:streams`, which advances the chain
  head — so every Cypher query hydrated from a head the previous Cypher query
  had created, and could never hit. The memo was doing exactly what it promised;
  the KEY named more state than `materialize` reads.

  `materialize` reads `:docs` and only `:docs`, so that is the whole key. An
  audit append no longer invalidates anything, because it does not touch `:docs`.

  **This is a value, not a digest, and that is deliberate.** Hashing it would be
  a second content address to keep honest, and a 32-bit one at that; a Clojure
  map lookup already hashes for the bucket and then compares with `=`, so equal
  docs hit and unequal docs cannot, with no collision window to reason about.
  What it costs is the hash, and that was measured too (JVM, 5-property docs):

      docs     materialize    hash(:docs)
      1000         8.1 ms         0.2 ms     35x
      5000        34.0 ms         0.4 ms     83x
      20000      123.9 ms         2.1 ms     58x

  The retained reference is the same map the request already built, and the memo
  is bounded at `bridge/memo`'s capacity, so this holds no more graphs alive than
  the materialized indices beside them already do.

  Conservative in one direction on purpose: a write to a collection the query
  never touches still changes `:docs` and still misses. Narrowing that to the
  queried collections would mean keying per collection subset, which trades a
  rare miss for a key that is harder to prove right."
  [state]
  (:docs state))

(defn enrich
  "Add the query surfaces and everything they require to `ctx`, given the
  hydrated `state` the request's store was built from.

  The memo version is derived from `state` here rather than passed in, so there
  is no way for a caller to hand it a version that names something other than
  what `materialize` will read."
  ([ctx state] (enrich ctx state nil))
  ([ctx state surface]
   (let [colls (collections state)]
     (cond-> (assoc ctx
                    :surfaces surfaces
                    :path-surfaces path-surfaces
                    :visible? visible-everything
                    :schema graphql-schema
                    :resolvers (graphql-resolvers colls)
                    :coll-keys colls
                    :vertex-colls colls)
       ;; Both halves or neither: `bridge/db-for` builds fresh unless it has a
       ;; memo AND a version, so a surface that can write simply never gets one.
       (queryable? surface)
       (assoc :query-memo isolate-memo :query-version (memo-version state))))))

(defn gremlin-error
  "A ResponseMessage carrying a server-side failure, for the case where the
  shell itself broke before the envelope could. Code 597 is Gremlin's
  server-error, and the request id is empty because the frame that would have
  carried it is what failed."
  [message]
  (gremlin-envelope/encode-response "" 597 {:message message}))

(defn gremlin-message
  "One GraphSON RequestMessage text frame -> one ResponseMessage text frame,
  against the store built from `state`. The socket belongs to the shell; this
  is the whole of what the shell has to call."
  [ctx state text]
  (gremlin-envelope/handle-request-text (enrich ctx state "gremlin") text))
