goog.provide('kotobase_protocols_worker.kotobase_r2');
/**
 * Signal thrown by the sync get-fn on a cache miss; caught by with-blocks. The
 *   `:block-miss` marker lets handler/handle re-throw it (rather than swallow it as
 *   an InternalError) so the trampoline actually sees the miss.
 */
kotobase_protocols_worker.kotobase_r2.missing_block = (function kotobase_protocols_worker$kotobase_r2$missing_block(cid){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("block-miss",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"block-miss","block-miss",-736447246),true,new cljs.core.Keyword(null,"cid","cid",-1940591320),cid], null));
});
/**
 * True if `e` is the trampoline's cache-miss signal (used by handler/handle to
 *   re-throw instead of catching).
 */
kotobase_protocols_worker.kotobase_r2.block_miss_QMARK_ = (function kotobase_protocols_worker$kotobase_r2$block_miss_QMARK_(e){
return cljs.core.boolean$(new cljs.core.Keyword(null,"block-miss","block-miss",-736447246).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(e)));
});
/**
 * The block-miss payload carried by `e`, or nil — read from the CAUSE CHAIN.
 * 
 *   A runtime may WRAP the signal rather than rethrow it: nbb/SCI, when the throw
 *   crosses an async continuation, produces its own error whose `ex-data` is
 *   `{:type :sci/error …}` and puts the original under `:cause`. Reading one link
 *   deep makes the miss invisible there, so the retry never happens and the read
 *   fails as a generic error. On the JVM and under shadow-cljs the chain is one
 *   link long, so this returns exactly what `(ex-data e)` returned before.
 *   Root ADR-2608190100.
 */
kotobase_protocols_worker.kotobase_r2.miss_data = (function kotobase_protocols_worker$kotobase_r2$miss_data(e){
var e__$1 = e;
var n = (0);
while(true){
if((e__$1 == null)){
return null;
} else {
if((n > (8))){
return null;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"block-miss","block-miss",-736447246).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(e__$1)))){
return cljs.core.ex_data(e__$1);
} else {
var G__12138 = cljs.core.ex_cause(e__$1);
var G__12139 = (n + (1));
e__$1 = G__12138;
n = G__12139;
continue;

}
}
}
break;
}
});
/**
 * Run `(f sync-get)` where `sync-get` reads from an in-memory cache, fetching
 *   absent blocks via `(fetch1 cid) -> Promise<bytes>` and retrying. Returns a
 *   Promise of `f`'s result. `f` must be pure/idempotent (it is re-run per miss).
 * 
 *   `f` may return a plain value OR a js/Promise (ADR-2607051000: the engine's
 *   crypto seam made the handler's reads/writes Promise-returning on cljs) — a
 *   block-miss can therefore surface either as a SYNC throw from `f` or as a
 *   REJECTION of `f`'s promise (sync-get called inside a .then continuation),
 *   and both trampoline the same way. Non-miss failures reject through.
 */
kotobase_protocols_worker.kotobase_r2.with_blocks = (function kotobase_protocols_worker$kotobase_r2$with_blocks(fetch1,f){
var cache = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var sync_get = (function (cid){
if(cljs.core.contains_QMARK_(cljs.core.deref(cache),cid)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cache),cid);
} else {
throw kotobase_protocols_worker.kotobase_r2.missing_block(cid);
}
});
var fetch_and_retry = (function kotobase_protocols_worker$kotobase_r2$with_blocks_$_fetch_and_retry(e){
var temp__5823__auto__ = kotobase_protocols_worker.kotobase_r2.miss_data(e);
if(cljs.core.truth_(temp__5823__auto__)){
var d = temp__5823__auto__;
return (function (){var G__12135 = new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(d);
return (fetch1.cljs$core$IFn$_invoke$arity$1 ? fetch1.cljs$core$IFn$_invoke$arity$1(G__12135) : fetch1.call(null,G__12135));
})().then((function (bytes){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cache,cljs.core.assoc,new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(d),bytes);

return step();
}));
} else {
return Promise.reject(e);
}
});
var step = (function kotobase_protocols_worker$kotobase_r2$with_blocks_$_step(){
try{return Promise.resolve((f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(sync_get) : f.call(null,sync_get))).catch((function (e){
return fetch_and_retry(e);
}));
}catch (e12136){var e = e12136;
return fetch_and_retry(e);
}});
return step();
});
kotobase_protocols_worker.kotobase_r2.block_key = (function kotobase_protocols_worker$kotobase_r2$block_key(prefix,cid){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)+"blocks/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid));
});
kotobase_protocols_worker.kotobase_r2.head_key = (function kotobase_protocols_worker$kotobase_r2$head_key(prefix,graph){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)+"heads/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(graph,/[^A-Za-z0-9._:-]/,"_")));
});
kotobase_protocols_worker.kotobase_r2.ipns_key = (function kotobase_protocols_worker$kotobase_r2$ipns_key(prefix,name){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)+"ipns/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(name,/[^A-Za-z0-9._:-]/,"_")));
});
/**
 * → Promise<Uint8Array|nil> for an R2 object key.
 */
kotobase_protocols_worker.kotobase_r2.r2_get_bytes = (function kotobase_protocols_worker$kotobase_r2$r2_get_bytes(bucket,k){
return bucket.get(k).then((function (obj){
if(cljs.core.truth_(obj)){
return obj.arrayBuffer().then((function (p1__12137_SHARP_){
return (new Uint8Array(p1__12137_SHARP_));
}));
} else {
return null;
}
}));
});
kotobase_protocols_worker.kotobase_r2.block_cache = (new Map());
kotobase_protocols_worker.kotobase_r2.block_cache_bytes = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
kotobase_protocols_worker.kotobase_r2.block_cache_budget = (((64) * (1024)) * (1024));
kotobase_protocols_worker.kotobase_r2.block_cache_put_BANG_ = (function kotobase_protocols_worker$kotobase_r2$block_cache_put_BANG_(cid,bytes){
if((((!((bytes == null)))) && (cljs.core.not(kotobase_protocols_worker.kotobase_r2.block_cache.has(cid))))){
kotobase_protocols_worker.kotobase_r2.block_cache.set(cid,bytes);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(kotobase_protocols_worker.kotobase_r2.block_cache_bytes,cljs.core._PLUS_,bytes.length);

while(true){
if((cljs.core.deref(kotobase_protocols_worker.kotobase_r2.block_cache_bytes) > kotobase_protocols_worker.kotobase_r2.block_cache_budget)){
var oldest = kotobase_protocols_worker.kotobase_r2.block_cache.keys().next().value;
if((!((oldest == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(kotobase_protocols_worker.kotobase_r2.block_cache_bytes,cljs.core._,kotobase_protocols_worker.kotobase_r2.block_cache.get(oldest).length);

kotobase_protocols_worker.kotobase_r2.block_cache.delete(oldest);

continue;
} else {
return null;
}
} else {
return null;
}
break;
}
} else {
return null;
}
});
/**
 * Promise<Uint8Array|nil> for an immutable block `cid`: isolate-memory cache
 *   first, R2 on miss (populating the cache on a non-nil result).
 */
kotobase_protocols_worker.kotobase_r2.cached_block_bytes = (function kotobase_protocols_worker$kotobase_r2$cached_block_bytes(bucket,pfx,cid){
if(cljs.core.truth_(kotobase_protocols_worker.kotobase_r2.block_cache.has(cid))){
return Promise.resolve(kotobase_protocols_worker.kotobase_r2.block_cache.get(cid));
} else {
return kotobase_protocols_worker.kotobase_r2.r2_get_bytes(bucket,kotobase_protocols_worker.kotobase_r2.block_key(pfx,cid)).then((function (bytes){
kotobase_protocols_worker.kotobase_r2.block_cache_put_BANG_(cid,bytes);

return bytes;
}));
}
});
kotobase_protocols_worker.kotobase_r2.r2_put_bytes = (function kotobase_protocols_worker$kotobase_r2$r2_put_bytes(bucket,k,bytes){
return bucket.put(k,bytes);
});
kotobase_protocols_worker.kotobase_r2.r2_get_text = (function kotobase_protocols_worker$kotobase_r2$r2_get_text(bucket,k){
return bucket.get(k).then((function (obj){
if(cljs.core.truth_(obj)){
return obj.text();
} else {
return null;
}
}));
});
/**
 * → Promise<{:chain string|nil :etag string|nil}> for the graph's head
 *   pointer. :etag nil when the key doesn't exist yet (first write to a new
 *   graph) — callers use that to choose the create-if-absent put path.
 */
kotobase_protocols_worker.kotobase_r2.r2_get_head = (function kotobase_protocols_worker$kotobase_r2$r2_get_head(bucket,k){
return bucket.get(k).then((function (obj){
if((obj == null)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"chain","chain",15631029),null,new cljs.core.Keyword(null,"etag","etag",-329255476),null], null);
} else {
return obj.text().then((function (text){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"chain","chain",15631029),text,new cljs.core.Keyword(null,"etag","etag",-329255476),obj.etag], null);
}));
}
}));
});
/**
 * Conditional head write. `etag` non-nil: succeeds only if the key's CURRENT
 *   etag still equals `etag` (R2's onlyIf.etagMatches — a native
 *   compare-and-swap against a KNOWN-EXISTING object, no read-modify-write
 *   gap). `etag` nil: the caller's r2-get-head found no object, i.e. first
 *   write to a new graph — R2's onlyIf has no documented "only if absent"
 *   condition (etagMatches against a nonexistent object is a comparison with
 *   nothing, not a green light; an earlier version of this fn wrongly assumed
 *   etagMatches "" would treat absence as a match, which live-tested as an
 *   ALWAYS-FAILING condition — every first write to a brand-new graph lost the
 *   race against nothing and exhausted retries), so this path does a plain
 *   unconditional put instead. That re-opens a narrow race window, but only
 *   for the very first commit of a graph nobody has written to yet — two
 *   simultaneous first-ever writers is a vanishingly rare coincidence, and
 *   even then exactly one commit (not accumulated history) is at risk, unlike
 *   the accumulating-history loss the etag-guarded path (the common case,
 *   every write after the first) closes. → Promise<boolean> (true = written,
 *   false = lost the race — caller must re-read the now-current head and
 *   retry).
 */
kotobase_protocols_worker.kotobase_r2.r2_put_head_if_match = (function kotobase_protocols_worker$kotobase_r2$r2_put_head_if_match(bucket,k,chain__$1,etag){
if((etag == null)){
return bucket.put(k,chain__$1).then((function (_){
return true;
}));
} else {
return bucket.put(k,chain__$1,({"onlyIf": ({"etagMatches": etag})})).then((function (result){
return cljs.core.boolean$(result);
}));
}
});

//# sourceMappingURL=kotobase_protocols_worker.kotobase_r2.js.map
