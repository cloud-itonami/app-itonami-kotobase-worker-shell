goog.provide('kotobase_protocols_worker.query');
/**
 * See the ns docstring — a decision about this deployment, made explicit.
 */
kotobase_protocols_worker.query.visible_everything = cljs.core.constantly(true);
/**
 * Collection keys present in a hydrated LocalStore-shaped `state`.
 */
kotobase_protocols_worker.query.collections = (function kotobase_protocols_worker$query$collections(state){
return cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.keys(new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(state))));
});
/**
 * Gremlin's transport is WebSocket. A plain HTTP request to the surface gets
 *   426, which is what the status code is for — answering 200 with a JSON
 *   explanation would let a client believe it had a working endpoint.
 */
kotobase_protocols_worker.query.gremlin_http_handle = (function kotobase_protocols_worker$query$gremlin_http_handle(_ctx,_req){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((426),new cljs.core.PersistentArrayMap(null, 3, ["content-type","text/plain; charset=utf-8","upgrade","websocket","cache-control","no-store"], null),(""+"gremlin speaks WebSocket (GraphSON RequestMessage per text frame).\n"+"Connect with Upgrade: websocket; op must be \"bytecode\" (no \"eval\").\n"));
});
/**
 * Stable v1 schema. Values remain JSON strings so arbitrary Kotobase
 *   documents are not silently coerced into a guessed application schema.
 */
kotobase_protocols_worker.query.graphql_schema = graphql.sdl.parse_schema("type Query {\n      document(collection: String!, key: ID!): Document\n      documents(collection: String!, limit: Int): [Document]\n      collections: [String]\n    }\n    type Document { collection: String!, key: ID!, json: String! }");
kotobase_protocols_worker.query.document = (function kotobase_protocols_worker$query$document(store,coll,key){
var temp__5829__auto__ = kotobase.store._get(store,coll,key);
if((temp__5829__auto__ == null)){
return null;
} else {
var value = temp__5829__auto__;
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"collection","collection",-683361892),coll,new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"json","json",1279968570),kotobase.protocols.json.encode(value)], null);
}
});
kotobase_protocols_worker.query.graphql_resolvers = (function kotobase_protocols_worker$query$graphql_resolvers(colls){
return cljs.core.PersistentArrayMap.createAsIfByAssoc([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Query","collections"], null),(function (_,___$1,___$2){
return colls;
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Query","document"], null),(function (_,args,p__10468){
var map__10469 = p__10468;
var map__10469__$1 = cljs.core.__destructure_map(map__10469);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10469__$1,new cljs.core.Keyword(null,"store","store",1512230022));
return kotobase_protocols_worker.query.document(store,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(args,"collection"))),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(args,"key"))));
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Query","documents"], null),(function (_,args,p__10470){
var map__10471 = p__10470;
var map__10471__$1 = cljs.core.__destructure_map(map__10471);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10471__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var coll = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(args,"collection")));
var limit = cljs.core.min.cljs$core$IFn$_invoke$arity$2((1000),cljs.core.max.cljs$core$IFn$_invoke$arity$2((0),(function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(args,"limit");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (100);
}
})()));
return cljs.core.vec(cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__10467_SHARP_){
return kotobase_protocols_worker.query.document(store,coll,p1__10467_SHARP_);
}),cljs.core.take.cljs$core$IFn$_invoke$arity$2(limit,cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.store._list(store,coll)))));
})]);
});
/**
 * Host label -> handler, for `kotobase.protocols.router`'s ctx.
 */
kotobase_protocols_worker.query.surfaces = new cljs.core.PersistentArrayMap(null, 4, ["sparql",kotobase.protocols.sparql.handle,"cypher",kotobase.protocols.cypher.handle,"gremlin",kotobase_protocols_worker.query.gremlin_http_handle,"graphql",kotobase.protocols.graphql.handle], null);
/**
 * Path prefix -> surface label, for deploys serving one hostname.
 * 
 *   The prefixes are each protocol's own absolute path, not a mount point we
 *   chose: SPARQL 1.1 Protocol puts the query at the service endpoint, and
 *   Neo4j's HTTP Cypher API is `/db/data/transaction/commit`. The router does
 *   not strip them, because the handlers check those paths themselves.
 */
kotobase_protocols_worker.query.path_surfaces = new cljs.core.PersistentArrayMap(null, 4, ["/sparql","sparql","/db/data/","cypher","/gremlin","gremlin","/graphql","graphql"], null);
/**
 * Machine-readable, deliberately conservative compatibility contract.
 * 
 *   This belongs beside the handlers rather than in marketing copy so adding a
 *   feature and claiming it are reviewed in the same change.  `subset` is a
 *   compatibility level, not a product weakness: clients can branch on it
 *   instead of mistaking a familiar hostname for complete wire compatibility.
 */
kotobase_protocols_worker.query.capabilities = new cljs.core.PersistentArrayMap(null, 6, ["schema_version",(1),"service","kotobase-query-protocols","canonical_model","content-addressed datoms","surfaces",new cljs.core.PersistentArrayMap(null, 4, ["sparql",new cljs.core.PersistentArrayMap(null, 5, ["transport","SPARQL Protocol over HTTP","operations",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["SELECT","ASK"], null),"compatibility","documented-subset","read_only",true,"not_claimed",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["full SPARQL 1.1 grammar","SPARQL Update","RDF 1.2"], null)], null),"cypher",new cljs.core.PersistentArrayMap(null, 5, ["transport","Neo4j-shaped transactional HTTP","operations",new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["MATCH","WHERE","RETURN","ORDER BY","UNION","count"], null),"compatibility","documented-subset","read_only",true,"not_claimed",new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Bolt","full openCypher grammar","mutations","variable-length paths","OPTIONAL MATCH","WITH"], null)], null),"gremlin",new cljs.core.PersistentArrayMap(null, 5, ["transport","WebSocket GraphSON RequestMessage","operations",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["bytecode"], null),"compatibility","documented-subset","read_only",true,"not_claimed",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["script eval","full TinkerPop step set","mutations"], null)], null),"graphql",new cljs.core.PersistentArrayMap(null, 6, ["transport","GraphQL over HTTP POST","operations",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["query","document","documents","collections"], null),"compatibility","documented-subset","read_only",true,"schema","kotobase-document-v1","not_claimed",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["mutations","subscriptions","variables","introspection"], null)], null)], null),"isolation",new cljs.core.PersistentArrayMap(null, 3, ["unit","one hydrated content-addressed graph per request","cross_tenant_default","deny","visibility_filter_required",true], null),"limits",new cljs.core.PersistentArrayMap(null, 2, ["query_cost_controls","adapter-defined","capability_discovery","/.well-known/kotobase-capabilities"], null)], null);
if((typeof kotobase_protocols_worker !== 'undefined') && (typeof kotobase_protocols_worker.query !== 'undefined') && (typeof kotobase_protocols_worker.query.isolate_memo !== 'undefined')){
} else {
/**
 * The query memo for this isolate (ADR-2607310900 L1).
 * 
 *   `defonce` in module scope: a Cloudflare isolate survives across requests, so
 *   this is where a memo can live at all. It is per-isolate and per-colo, which is
 *   the RIGHT scope for it — the memo holds derived data, so losing one costs
 *   time and never correctness, and that is exactly why it does not justify a
 *   Durable Object or any other shared writer.
 */
kotobase_protocols_worker.query.isolate_memo = kotobase.query.bridge.memo.cljs$core$IFn$_invoke$arity$0();
}
/**
 * This isolate's memo counters, as a JSON-shaped map. A thin projection of
 *   `bridge/memo-stats` so the shell does not have to know the memo's shape.
 */
kotobase_protocols_worker.query.memo_stats = (function kotobase_protocols_worker$query$memo_stats(){
var map__10472 = kotobase.query.bridge.memo_stats(kotobase_protocols_worker.query.isolate_memo);
var map__10472__$1 = cljs.core.__destructure_map(map__10472);
var size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10472__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var capacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10472__$1,new cljs.core.Keyword(null,"capacity","capacity",72689734));
var hits = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10472__$1,new cljs.core.Keyword(null,"hits","hits",-2120002930));
var misses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10472__$1,new cljs.core.Keyword(null,"misses","misses",-1275188323));
var total = (hits + misses);
return new cljs.core.PersistentArrayMap(null, 5, ["size",size,"capacity",capacity,"hits",hits,"misses",misses,"hit_rate",(((total > (0)))?(Math.round((10000.0 * (hits / total))) / 10000.0):null)], null);
});
/**
 * Whether this request will land on a read-only query surface.
 * 
 *   The memo names the state a query READS, not the state a write leaves behind,
 *   so it is only supplied where nothing the caller directs can write. These three
 *   surfaces are read-only in that sense (`kotobase-protocols-worker.core/query-
 *   surfaces` says why, including the audit append that is not), and tying the
 *   memo to that same set means the guarantee is checked in one place rather than
 *   assumed in two.
 */
kotobase_protocols_worker.query.queryable_QMARK_ = (function kotobase_protocols_worker$query$queryable_QMARK_(surface){
return cljs.core.contains_QMARK_(kotobase_protocols_worker.query.surfaces,surface);
});
/**
 * What the memo keys on: `:docs`, and nothing else.
 * 
 *   MEASURED, 2026-07-31, `wrangler dev --local` with a seeded graph and the
 *   `/_diag/query-memo` counters, when this keyed on the CHAIN HEAD instead:
 * 
 *    SPARQL  2 hits / 3 queries
 *    Cypher  0 hits / 3 queries
 * 
 *   Cypher's zero was not a tuning problem. `kotobase.protocols.cypher` appends an
 *   audit event per statement, which changes `:streams`, which advances the chain
 *   head — so every Cypher query hydrated from a head the previous Cypher query
 *   had created, and could never hit. The memo was doing exactly what it promised;
 *   the KEY named more state than `materialize` reads.
 * 
 *   `materialize` reads `:docs` and only `:docs`, so that is the whole key. An
 *   audit append no longer invalidates anything, because it does not touch `:docs`.
 * 
 *   **This is a value, not a digest, and that is deliberate.** Hashing it would be
 *   a second content address to keep honest, and a 32-bit one at that; a Clojure
 *   map lookup already hashes for the bucket and then compares with `=`, so equal
 *   docs hit and unequal docs cannot, with no collision window to reason about.
 *   What it costs is the hash, and that was measured too (JVM, 5-property docs):
 * 
 *    docs     materialize    hash(:docs)
 *    1000         8.1 ms         0.2 ms     35x
 *    5000        34.0 ms         0.4 ms     83x
 *    20000      123.9 ms         2.1 ms     58x
 * 
 *   The retained reference is the same map the request already built, and the memo
 *   is bounded at `bridge/memo`'s capacity, so this holds no more graphs alive than
 *   the materialized indices beside them already do.
 * 
 *   Conservative in one direction on purpose: a write to a collection the query
 *   never touches still changes `:docs` and still misses. Narrowing that to the
 *   queried collections would mean keying per collection subset, which trades a
 *   rare miss for a key that is harder to prove right.
 */
kotobase_protocols_worker.query.memo_version = (function kotobase_protocols_worker$query$memo_version(state){
return new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(state);
});
/**
 * Add the query surfaces and everything they require to `ctx`, given the
 *   hydrated `state` the request's store was built from.
 * 
 *   The memo version is derived from `state` here rather than passed in, so there
 *   is no way for a caller to hand it a version that names something other than
 *   what `materialize` will read.
 */
kotobase_protocols_worker.query.enrich = (function kotobase_protocols_worker$query$enrich(var_args){
var G__10474 = arguments.length;
switch (G__10474) {
case 2:
return kotobase_protocols_worker.query.enrich.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_protocols_worker.query.enrich.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_protocols_worker.query.enrich.cljs$core$IFn$_invoke$arity$2 = (function (ctx,state){
return kotobase_protocols_worker.query.enrich.cljs$core$IFn$_invoke$arity$3(ctx,state,null);
}));

(kotobase_protocols_worker.query.enrich.cljs$core$IFn$_invoke$arity$3 = (function (ctx,state,surface){
var colls = kotobase_protocols_worker.query.collections(state);
var G__10475 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(ctx,new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421),kotobase_protocols_worker.query.surfaces,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274),kotobase_protocols_worker.query.path_surfaces,new cljs.core.Keyword(null,"visible?","visible?",2129863715),kotobase_protocols_worker.query.visible_everything,new cljs.core.Keyword(null,"schema","schema",-1582001791),kotobase_protocols_worker.query.graphql_schema,new cljs.core.Keyword(null,"resolvers","resolvers",-1037942130),kotobase_protocols_worker.query.graphql_resolvers(colls),new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070),colls,new cljs.core.Keyword(null,"vertex-colls","vertex-colls",-1707425754),colls], 0));
if(kotobase_protocols_worker.query.queryable_QMARK_(surface)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__10475,new cljs.core.Keyword(null,"query-memo","query-memo",-429356731),kotobase_protocols_worker.query.isolate_memo,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"query-version","query-version",-73824555),kotobase_protocols_worker.query.memo_version(state)], 0));
} else {
return G__10475;
}
}));

(kotobase_protocols_worker.query.enrich.cljs$lang$maxFixedArity = 3);

/**
 * A ResponseMessage carrying a server-side failure, for the case where the
 *   shell itself broke before the envelope could. Code 597 is Gremlin's
 *   server-error, and the request id is empty because the frame that would have
 *   carried it is what failed.
 */
kotobase_protocols_worker.query.gremlin_error = (function kotobase_protocols_worker$query$gremlin_error(message){
return kotobase.gremlin.envelope.encode_response("",(597),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),message], null));
});
/**
 * One GraphSON RequestMessage text frame -> one ResponseMessage text frame,
 *   against the store built from `state`. The socket belongs to the shell; this
 *   is the whole of what the shell has to call.
 */
kotobase_protocols_worker.query.gremlin_message = (function kotobase_protocols_worker$query$gremlin_message(ctx,state,text){
return kotobase.gremlin.envelope.handle_request_text(kotobase_protocols_worker.query.enrich.cljs$core$IFn$_invoke$arity$3(ctx,state,"gremlin"),text);
});

//# sourceMappingURL=kotobase_protocols_worker.query.js.map
