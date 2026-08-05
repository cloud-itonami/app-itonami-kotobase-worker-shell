goog.provide('kotobase_protocols_worker.core');
kotobase_protocols_worker.core.empty_state = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"docs","docs",-1974280502),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"streams","streams",1465783789),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"seq","seq",-1817803783),(0),new cljs.core.Keyword(null,"revision","revision",-1350113114),(0),new cljs.core.Keyword(null,"tx-receipts","tx-receipts",562380438),cljs.core.PersistentArrayMap.EMPTY], null);
/**
 * LocalStore over an atom the shell owns, so state snapshots are plain
 *   `@state` — no deftype field access (kotobase.local/snapshot reads
 *   `.-state`, which compiled cljs supports but nbb/SCI does not; owning
 *   the atom sidesteps the difference).
 */
kotobase_protocols_worker.core.make_store = (function kotobase_protocols_worker$core$make_store(seed){
var state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kotobase_protocols_worker.core.empty_state,seed], 0)));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"store","store",1512230022),kotobase.local.__GT_LocalStore(state),new cljs.core.Keyword(null,"state","state",-1988618099),state], null);
});
kotobase_protocols_worker.core.write_methods = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"delete","delete",-1768633620),null,new cljs.core.Keyword(null,"post","post",269697687),null,new cljs.core.Keyword(null,"put","put",1299772570),null], null), null);
/**
 * Surfaces whose POST is a READ.
 * 
 *   SPARQL 1.1 Protocol sends queries by POST on purpose (query text outruns
 *   URL length limits), and Neo4j's HTTP Cypher API is
 *   `POST /db/data/transaction/commit`. Classifying those as writes by method
 *   alone makes all three surfaces answer 401 to every legitimate query, which
 *   is how this was found.
 * 
 *   Safe because none of them performs a CALLER-DIRECTED write: the Cypher
 *   handler rejects CREATE/MERGE/DELETE/SET/REMOVE with a named error rather
 *   than ignoring them, the SPARQL surface implements SELECT/ASK and no UPDATE
 *   at all, and the Gremlin subset has no mutation step. Nothing a caller sends
 *   can place data of its choosing. If any of them ever grows one, it comes OFF
 *   this set in the same commit — that is the invariant, and it is the only
 *   thing keeping a POST here from being an unauthenticated write.
 * 
 *   **This is NOT the same as touching nothing, and an earlier version of this
 *   docstring said "read-only BY CONSTRUCTION", which was wrong.**
 *   `kotobase.protocols.cypher` appends an audit event to the
 *   `:kotobase.protocols/audit` stream on every statement it runs, successful or
 *   not. That is a store mutation on a request classified here as a read. It is
 *   still not a caller-directed write — the record's shape and contents are the
 *   handler's, not the request's — but the distinction had a consequence that
 *   measurement found and reasoning did not: the append changes `:streams`, so
 *   the chain head advances, so two identical Cypher queries hydrate from
 *   different heads. A query memo keyed on that head NEVER hit on Cypher —
 *   measured locally at 0 hits / 3 queries against SPARQL's 2 / 3. The memo now
 *   keys on `:docs` alone, which the append does not touch; see
 *   `kotobase-protocols-worker.query/memo-version` and ADR-2607310900.
 */
kotobase_protocols_worker.core.query_surfaces = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["sparql",null,"gremlin",null,"graphql",null,"cypher",null], null), null);
/**
 * Whether this request mutates. The 1-arity is method-only and is what a
 *   caller with no apex can know; the 2-arity is the accurate one, because a
 *   POST to a read-only query surface is a read.
 */
kotobase_protocols_worker.core.write_QMARK_ = (function kotobase_protocols_worker$core$write_QMARK_(var_args){
var G__10915 = arguments.length;
switch (G__10915) {
case 1:
return kotobase_protocols_worker.core.write_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kotobase_protocols_worker.core.write_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_protocols_worker.core.write_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (req){
return cljs.core.contains_QMARK_(kotobase_protocols_worker.core.write_methods,new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req));
}));

(kotobase_protocols_worker.core.write_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (req,apex){
return ((cljs.core.contains_QMARK_(kotobase_protocols_worker.core.write_methods,new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && ((!(cljs.core.contains_QMARK_(kotobase_protocols_worker.core.query_surfaces,(kotobase_protocols_worker.core.effective_surface.cljs$core$IFn$_invoke$arity$2 ? kotobase_protocols_worker.core.effective_surface.cljs$core$IFn$_invoke$arity$2(req,apex) : kotobase_protocols_worker.core.effective_surface.call(null,req,apex)))))));
}));

(kotobase_protocols_worker.core.write_QMARK_.cljs$lang$maxFixedArity = 2);

/**
 * Writes need `authorization: Bearer <token>`. Fail closed: with no
 *   token configured every write is rejected — an unauthenticated public
 *   S3/XRPC write surface must be impossible to deploy by accident.
 * 
 *   Named for writes but shape-identical for reads: the read ladder in
 *   `kotobase-protocols-worker.worker` calls this same predicate first,
 *   because a bearer token that may write may obviously also read.
 */
kotobase_protocols_worker.core.authorized_write_QMARK_ = (function kotobase_protocols_worker$core$authorized_write_QMARK_(req,token){
return cljs.core.boolean$(((typeof token === 'string') && (((cljs.core.seq(token)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),"authorization"),(""+"Bearer "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(token))))))));
});
/**
 * Surfaces whose reads stay open to anyone, and why each one is a
 *   deliberate decision rather than an omission:
 * 
 *  ipfs    the CID *is* the capability — knowing it is the grant, and
 *          the gateway serves immutable content-addressed blocks
 *          (KRP §3.3). Requiring a credential to fetch a CID would
 *          make it not an IPFS gateway.
 *  git     an actor repo's git history is the primary source of its
 *          PUBLIC data (ADR-2607072300, git-journal primacy). Closing
 *          it would invert that ADR.
 *  atproto AT-Protocol records are a public record plane; per-DID
 *          isolation (ADR-2607178000) governs WHOSE graph is read,
 *          not whether a reader must authenticate.
 * 
 *   Closed, each also deliberately:
 * 
 *  s3      tenant object storage. The Drive that ADR-2607263000 puts
 *          on this surface makes every object someone's private file.
 *  pinning the Pinning Service API is per-user by spec (its own
 *          §authentication) — `GET /pins` is *your* pin list, and
 *          answering it anonymously would answer with someone's.
 *  issues  self-described internal-only (see the handler's ns
 *          docstring); a repo's public journal is git's job, and
 *          git.<apex> already serves it.
 * 
 *   An allowlist, not a denylist: a surface added later is private until
 *   someone states otherwise here (ADR-2607263000 D2).
 */
kotobase_protocols_worker.core.public_read_surfaces = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["ipfs",null,"git",null,"atproto",null], null), null);
/**
 * Which protocol surface this request will ACTUALLY land on — mirrors
 *   `kotobase.protocols.router/handle`'s dispatch, including its
 *   single-origin path-prefix fallback.
 * 
 *   Derived rather than assumed: an authorization decision made against
 *   a different surface than the one that answers is the whole bug class
 *   this exists to prevent. `GET /s3/bkt/k` on the apex is an s3 read
 *   even though its host has no `s3.` label.
 */
kotobase_protocols_worker.core.effective_surface = (function kotobase_protocols_worker$core$effective_surface(req,apex){
var path = (function (){var or__5162__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})();
var or__5162__auto__ = kotobase.protocols.router.surface_of(new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(req),apex);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
if(clojure.string.starts_with_QMARK_(path,"/ipfs/")){
return "ipfs";
} else {
if(clojure.string.starts_with_QMARK_(path,"/ipns/")){
return "ipfs";
} else {
if(clojure.string.starts_with_QMARK_(path,"/xrpc/")){
return "atproto";
} else {
if(clojure.string.starts_with_QMARK_(path,"/pins")){
return "pinning";
} else {
if(clojure.string.starts_with_QMARK_(path,"/s3/")){
return "s3";
} else {
if(clojure.string.starts_with_QMARK_(path,"/git/")){
return "git";
} else {
if(clojure.string.starts_with_QMARK_(path,"/issues/")){
return "issues";
} else {
if(clojure.string.starts_with_QMARK_(path,"/sparql")){
return "sparql";
} else {
if(clojure.string.starts_with_QMARK_(path,"/db/data/")){
return "cypher";
} else {
if(clojure.string.starts_with_QMARK_(path,"/gremlin")){
return "gremlin";
} else {
if(clojure.string.starts_with_QMARK_(path,"/graphql")){
return "graphql";
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
});
/**
 * True when this non-write request must present a credential.
 * 
 *   `GET /health` is exempt on every surface: the router answers it
 *   before dispatching to any handler (it is a routing/readiness probe,
 *   not tenant data), and an uptime monitor cannot hold a CACAO.
 */
kotobase_protocols_worker.core.read_auth_required_QMARK_ = (function kotobase_protocols_worker$core$read_auth_required_QMARK_(req,apex){
var and__5160__auto__ = (!(kotobase_protocols_worker.core.write_QMARK_.cljs$core$IFn$_invoke$arity$2(req,apex)));
if(and__5160__auto__){
var and__5160__auto____$1 = (!(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/health",new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req))))));
if(and__5160__auto____$1){
var surface = kotobase_protocols_worker.core.effective_surface(req,apex);
return (((!((surface == null)))) && ((!(cljs.core.contains_QMARK_(kotobase_protocols_worker.core.public_read_surfaces,surface)))));
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
});
/**
 * 401 for an unauthenticated request. `op` distinguishes the message
 *   only — the status and the fail-closed behaviour are the same for
 *   reads and writes.
 */
kotobase_protocols_worker.core.unauthorized_response = (function kotobase_protocols_worker$core$unauthorized_response(var_args){
var G__10917 = arguments.length;
switch (G__10917) {
case 1:
return kotobase_protocols_worker.core.unauthorized_response.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kotobase_protocols_worker.core.unauthorized_response.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_protocols_worker.core.unauthorized_response.cljs$core$IFn$_invoke$arity$1 = (function (token_configured_QMARK_){
return kotobase_protocols_worker.core.unauthorized_response.cljs$core$IFn$_invoke$arity$2(token_configured_QMARK_,new cljs.core.Keyword(null,"write","write",-1857649168));
}));

(kotobase_protocols_worker.core.unauthorized_response.cljs$core$IFn$_invoke$arity$2 = (function (token_configured_QMARK_,op){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(401),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 2, ["content-type","text/plain; charset=utf-8","www-authenticate","Bearer"], null),new cljs.core.Keyword(null,"body","body",-2049205669),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"read","read",1140058661)))?"unauthorized: this surface's reads require a credential (Bearer, AWS SigV4, or an operator CACAO)":(cljs.core.truth_(token_configured_QMARK_)?"unauthorized: writes require a bearer token":"unauthorized: write token not configured (writes are disabled)"
))], null);
}));

(kotobase_protocols_worker.core.unauthorized_response.cljs$lang$maxFixedArity = 2);

/**
 * Lower-case header names once at the boundary.
 */
kotobase_protocols_worker.core.normalize_headers = (function kotobase_protocols_worker$core$normalize_headers(pairs){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__10918){
var vec__10919 = p__10918;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10919,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10919,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.string.lower_case(k),v], null);
})),pairs);
});

//# sourceMappingURL=kotobase_protocols_worker.core.js.map
