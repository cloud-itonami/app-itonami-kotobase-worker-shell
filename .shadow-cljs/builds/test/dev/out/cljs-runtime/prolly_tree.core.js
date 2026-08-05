goog.provide('prolly_tree.core');
/**
 * Chunk boundary fires when the low `boundary-bits` bits of the determinant
 *   hash are all zero. 8 bits == ~1/256 average chunk size (BOUNDARY_MASK=0xFF
 *   in the deleted Rust implementation).
 */
prolly_tree.core.boundary_bits = (8);
prolly_tree.core.utf8_bytes = (function prolly_tree$core$utf8_bytes(s){
return (new TextEncoder()).encode(s);
});
/**
 * True ~1/(2^boundary-bits) of the time: the last byte of
 *   sha256(str(x)-as-utf8) is all-zero under `boundary-bits`.
 */
prolly_tree.core.boundary_QMARK_ = (function prolly_tree$core$boundary_QMARK_(x){
var h = multiformats.core.sha256(prolly_tree.core.utf8_bytes((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x))));
var b = ((255) & (h[(h.length - (1))]));
return ((b & (((1) << prolly_tree.core.boundary_bits) - (1))) === (0));
});
/**
 * DAG-CBOR-encode `node` (links become tag 42), CID it, call
 *   `(put! cid bytes)`, return the cid string.
 */
prolly_tree.core.put_node_BANG_ = (function prolly_tree$core$put_node_BANG_(put_BANG_,node){
return ipld.core.put_node_BANG_(put_BANG_,node);
});
/**
 * Split `items` into chunks; a chunk ends right after any item for which
 *   `boundary-fn` returns true, or at the end of `items`. Never splits an
 *   empty input.
 */
prolly_tree.core.chunk_by = (function prolly_tree$core$chunk_by(boundary_fn,items){
if(cljs.core.empty_QMARK_(items)){
return cljs.core.PersistentVector.EMPTY;
} else {
var remaining = items;
var chunk = cljs.core.PersistentVector.EMPTY;
var out = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(remaining)){
if(cljs.core.seq(chunk)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(out,chunk);
} else {
return out;
}
} else {
var item = cljs.core.first(remaining);
var chunk_SINGLEQUOTE_ = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(chunk,item);
if(cljs.core.truth_((boundary_fn.cljs$core$IFn$_invoke$arity$1 ? boundary_fn.cljs$core$IFn$_invoke$arity$1(item) : boundary_fn.call(null,item)))){
var G__11414 = cljs.core.rest(remaining);
var G__11415 = cljs.core.PersistentVector.EMPTY;
var G__11416 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(out,chunk_SINGLEQUOTE_);
remaining = G__11414;
chunk = G__11415;
out = G__11416;
continue;
} else {
var G__11417 = cljs.core.rest(remaining);
var G__11418 = chunk_SINGLEQUOTE_;
var G__11419 = out;
remaining = G__11417;
chunk = G__11418;
out = G__11419;
continue;
}
}
break;
}
}
});
/**
 * `sorted-entries`: seq of `[k v]`, already sorted by k. Returns a seq of
 *   `[max-key cid]` summaries after put!-ing each leaf node.
 */
prolly_tree.core.build_leaf_level = (function prolly_tree$core$build_leaf_level(put_BANG_,sorted_entries){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (chunk){
var node = new cljs.core.PersistentArrayMap(null, 2, ["kind","leaf","entries",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,chunk)], null);
var cid = prolly_tree.core.put_node_BANG_(put_BANG_,node);
var max_key = cljs.core.first(cljs.core.last(chunk));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [max_key,cid], null);
}),prolly_tree.core.chunk_by((function (p__11293){
var vec__11294 = p__11293;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11294,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11294,(1),null);
return prolly_tree.core.boundary_QMARK_(k);
}),sorted_entries));
});
/**
 * `child-summaries`: seq of `[max-key cid]`, already sorted by max-key.
 *   Boundary is determined by the CHILD CID (see namespace docstring), not by
 *   max-key. On-block, each child reference is a real IPLD link (tag 42);
 *   in-memory summaries stay plain CID strings so the boundary math is
 *   encoding-independent.
 */
prolly_tree.core.build_internal_level = (function prolly_tree$core$build_internal_level(put_BANG_,child_summaries){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (chunk){
var node = new cljs.core.PersistentArrayMap(null, 2, ["kind","internal","children",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__11297){
var vec__11298 = p__11297;
var max_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11298,(0),null);
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11298,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [max_key,(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(cid) : ipld.core.link.call(null,cid))], null);
}),chunk)], null);
var cid = prolly_tree.core.put_node_BANG_(put_BANG_,node);
var max_key = cljs.core.first(cljs.core.last(chunk));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [max_key,cid], null);
}),prolly_tree.core.chunk_by((function (p__11301){
var vec__11302 = p__11301;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11302,(0),null);
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11302,(1),null);
return prolly_tree.core.boundary_QMARK_(cid);
}),child_summaries));
});
/**
 * Build a Prolly Tree from `sorted-entries` (seq of `[k v]`, sorted by `k`
 *   ascending, `k` comparable via `compare`), calling `(put! cid bytes)` for
 *   every node created. Returns the root CID string, or nil for empty input.
 */
prolly_tree.core.build_tree = (function prolly_tree$core$build_tree(put_BANG_,sorted_entries){
if(cljs.core.seq(sorted_entries)){
var level = prolly_tree.core.build_leaf_level(put_BANG_,sorted_entries);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(level))){
return cljs.core.second(cljs.core.first(level));
} else {
var G__11420 = prolly_tree.core.build_internal_level(put_BANG_,level);
level = G__11420;
continue;
}
break;
}
} else {
return null;
}
});
prolly_tree.core.verified_node = (function prolly_tree$core$verified_node(expected_cid,bytes){
var actual = ipld.core.cid(bytes);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected_cid,actual)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("prolly-tree: block CID mismatch",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ipld","cid-mismatch","ipld/cid-mismatch",1738594899),new cljs.core.Keyword(null,"expected-cid","expected-cid",-860224801),expected_cid,new cljs.core.Keyword(null,"actual-cid","actual-cid",-884324624),actual], null));
}

return ipld.core.decode(bytes);
});
prolly_tree.core.get_node = (function prolly_tree$core$get_node(get_fn,cid){
return prolly_tree.core.verified_node(cid,(get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid)));
});
/**
 * A decoded internal-node child entry is `[max-key <tag-42 link>]`; return
 *   the link's CID string.
 */
prolly_tree.core.child_cid = (function prolly_tree$core$child_cid(p__11305){
var vec__11306 = p__11305;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11306,(0),null);
var link = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11306,(1),null);
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(link) : ipld.core.link_cid.call(null,link));
});
/**
 * Point lookup of `k` under `root-cid`, fetching nodes via `(get-fn cid) ->
 *   bytes`. Returns the value, or nil if `k` is absent or `root-cid` is nil
 *   (empty tree).
 */
prolly_tree.core.lookup = (function prolly_tree$core$lookup(get_fn,root_cid,k){
if(cljs.core.truth_(root_cid)){
var cid = root_cid;
while(true){
var node = prolly_tree.core.get_node(get_fn,cid);
var G__11309 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__11309) {
case "leaf":
return cljs.core.some(((function (cid,G__11309,node){
return (function (p__11310){
var vec__11311 = p__11310;
var ek = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11311,(0),null);
var ev = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11311,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ek,k)){
return ev;
} else {
return null;
}
});})(cid,G__11309,node))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries"));

break;
case "internal":
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children");
var target = (function (){var or__5162__auto__ = cljs.core.some(((function (cid,children,G__11309,node){
return (function (entry){
if((cljs.core.compare(k,cljs.core.first(entry)) <= (0))){
return prolly_tree.core.child_cid(entry);
} else {
return null;
}
});})(cid,children,G__11309,node))
,children);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return prolly_tree.core.child_cid(cljs.core.last(children));
}
})();
var G__11422 = target;
cid = G__11422;
continue;

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11309))));

}
break;
}
} else {
return null;
}
});
/**
 * All `[k v]` pairs whose string key starts with `prefix`, fetching nodes via
 *   `(get-fn cid) -> bytes`. Key-range pruned: since keys are sorted and an
 *   internal node's children are `[max-key cid]` in order, a prefix-matching key
 *   can only live in a child whose `max-key >= prefix` AND whose predecessor's
 *   `max-key` has not already passed the prefix range. So we skip children entirely
 *   below the prefix and stop once past it — descending into O(path) blocks for a
 *   keyed read instead of the whole tree (ADR-2607022330 addendum 3 / #16). With an
 *   empty `prefix` this is a full ordered scan, unchanged.
 */
prolly_tree.core.scan_prefix = (function prolly_tree$core$scan_prefix(get_fn,root_cid,prefix){
if(cljs.core.truth_(root_cid)){
var past_prefix_QMARK_ = (function prolly_tree$core$scan_prefix_$_past_prefix_QMARK_(k){
return (((cljs.core.compare(k,prefix) > (0))) && ((!(clojure.string.starts_with_QMARK_(k,prefix)))));
});
var walk = (function prolly_tree$core$scan_prefix_$_walk(cid){
var node = prolly_tree.core.get_node(get_fn,cid);
var G__11319 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__11319) {
case "leaf":
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__11320){
var vec__11321 = p__11320;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11321,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11321,(1),null);
return clojure.string.starts_with_QMARK_(k,prefix);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries"));

break;
case "internal":
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children");
var prev_max = null;
var out = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if(cljs.core.empty_QMARK_(children)){
return cljs.core.persistent_BANG_(out);
} else {
var entry = cljs.core.first(children);
var mk = cljs.core.first(entry);
if(cljs.core.truth_((function (){var and__5160__auto__ = (!((prev_max == null)));
if(and__5160__auto__){
return past_prefix_QMARK_(prev_max);
} else {
return and__5160__auto__;
}
})())){
return cljs.core.persistent_BANG_(out);
} else {
if((cljs.core.compare(mk,prefix) < (0))){
var G__11424 = cljs.core.rest(children);
var G__11425 = mk;
var G__11426 = out;
children = G__11424;
prev_max = G__11425;
out = G__11426;
continue;
} else {
var G__11427 = cljs.core.rest(children);
var G__11428 = mk;
var G__11429 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,out,prolly_tree$core$scan_prefix_$_walk(prolly_tree.core.child_cid(entry)));
children = G__11427;
prev_max = G__11428;
out = G__11429;
continue;

}
}
}
break;
}

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11319))));

}
});
return cljs.core.vec(walk(root_cid));
} else {
return null;
}
});
/**
 * Max in-flight child fetches at once for `scan-prefix-async`, same
 *   rationale/value as `kotobase-peer.core`'s `pmap-async-batch-size`
 *   (duplicated here rather than shared -- prolly-tree has no dependency on
 *   kotobase-peer, and this codebase's own precedent is per-repo test/
 *   concurrency helper duplication over a forced shared dependency in the
 *   wrong direction). 24 is a starting point, not load-tested against
 *   Workers' exact per-plan subrequest ceiling.
 */
prolly_tree.core.scan_prefix_async_batch_size = (24);
/**
 * cljs only: map `f` (returns a `js/Promise`) over `coll` in bounded
 *   batches of `scan-prefix-async-batch-size` concurrent calls, return one
 *   `js/Promise` of the resolved results, order-preserved. See that var's
 *   docstring for why unbounded concurrency is unsafe.
 */
prolly_tree.core.pmap_async = (function prolly_tree$core$pmap_async(f,coll){
var batches = cljs.core.partition_all.cljs$core$IFn$_invoke$arity$2(prolly_tree.core.scan_prefix_async_batch_size,coll);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc_promise,batch){
return acc_promise.then((function (acc){
return Promise.all(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,batch))).then((function (batch_results){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(acc,batch_results);
}));
}));
}),Promise.resolve(cljs.core.PersistentVector.EMPTY),batches);
});
/**
 * Async, concurrency-batched counterpart to `scan-prefix`, for a `get-fn`
 *   that returns a `js/Promise<bytes>` (fetches over the network, e.g. R2)
 *   rather than the synchronous get-fn/block-miss-trampoline contract
 *   `scan-prefix` assumes.
 * 
 *   `scan-prefix` over a trampoline like `kotobase.cljc-worker.r2/with-
 *   blocks` does exactly ONE new block discovery per call: `get-fn` throws
 *   synchronously on the first not-yet-cached CID, the trampoline catches
 *   it, fetches JUST THAT block, and re-runs `scan-prefix`'s ENTIRE
 *   recursive walk from `root-cid`. Only raw bytes are cached by the
 *   trampoline -- `get-node`'s `ipld/decode` is NOT memoized -- so a walk
 *   touching N distinct blocks costs O(N) SEQUENTIAL round trips (one
 *   discovered per retry, never batched) and, because every retry re-walks
 *   and re-decodes every already-fetched node from the root, O(N^2) total
 *   node decodes. For a mature tree (thousands of leaf blocks) this
 *   quadratic redundant-decode cost, not raw I/O latency, is a plausible
 *   dominant contributor to a cold hydrate exceeding a Worker's CPU budget
 *   (kotoba-lang/kotobase-peer's `hydrate-db`, gftdcojp/app-aozora#78 /
 *   ADR-2607120730).
 * 
 *   `scan-prefix-async` fetches each internal node's children CONCURRENTLY
 *   (bounded batch, `pmap-async`) instead of one miss at a time, and decodes
 *   each node exactly once (no retry-from-root) -- O(N) round trips
 *   (batched, not sequential) and O(N) decodes, not O(N^2). Same key-range
 *   pruning as `scan-prefix`; same `[k v]` pair shape.
 * 
 *   get-fn: `(get-fn cid) -> js/Promise<bytes>`. → `js/Promise<[[k v] ...]>`.
 */
prolly_tree.core.scan_prefix_async = (function prolly_tree$core$scan_prefix_async(get_fn,root_cid,prefix){
if((root_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var past_prefix_QMARK_ = (function prolly_tree$core$scan_prefix_async_$_past_prefix_QMARK_(k){
return (((cljs.core.compare(k,prefix) > (0))) && ((!(clojure.string.starts_with_QMARK_(k,prefix)))));
});
var children_to_walk = (function prolly_tree$core$scan_prefix_async_$_children_to_walk(node){
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children");
var prev_max = null;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(children)){
return acc;
} else {
var entry = cljs.core.first(children);
var mk = cljs.core.first(entry);
if(cljs.core.truth_((function (){var and__5160__auto__ = (!((prev_max == null)));
if(and__5160__auto__){
return past_prefix_QMARK_(prev_max);
} else {
return and__5160__auto__;
}
})())){
return acc;
} else {
if((cljs.core.compare(mk,prefix) < (0))){
var G__11430 = cljs.core.rest(children);
var G__11431 = mk;
var G__11432 = acc;
children = G__11430;
prev_max = G__11431;
acc = G__11432;
continue;
} else {
var G__11433 = cljs.core.rest(children);
var G__11434 = mk;
var G__11435 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,entry);
children = G__11433;
prev_max = G__11434;
acc = G__11435;
continue;

}
}
}
break;
}
});
var walk = (function prolly_tree$core$scan_prefix_async_$_walk(cid){
return (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid)).then((function (p1__11324_SHARP_){
return prolly_tree.core.verified_node(cid,p1__11324_SHARP_);
})).then((function (node){
var G__11330 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__11330) {
case "leaf":
return Promise.resolve(cljs.core.filterv((function (p__11331){
var vec__11332 = p__11331;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11332,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11332,(1),null);
return clojure.string.starts_with_QMARK_(k,prefix);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries")));

break;
case "internal":
return prolly_tree.core.pmap_async((function (entry){
return prolly_tree$core$scan_prefix_async_$_walk(prolly_tree.core.child_cid(entry));
}),children_to_walk(node)).then((function (results){
return cljs.core.vec(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,results));
}));

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11330))));

}
}));
});
return walk(root_cid);
}
});
prolly_tree.core.leaf_node_QMARK_ = (function prolly_tree$core$leaf_node_QMARK_(node){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("leaf",cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind"));
});
/**
 * Leaf entries as a vector of [k v], with dag-cbor's vectors normalized.
 */
prolly_tree.core.node_entries = (function prolly_tree$core$node_entries(node){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries"));
});
/**
 * Internal children as a vector of [max-key cid-string]. In-memory summaries
 *   stay plain CID strings so boundary math is encoding-independent, matching
 *   `build-internal-level`.
 */
prolly_tree.core.node_children = (function prolly_tree$core$node_children(node){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (entry){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(entry),prolly_tree.core.child_cid(entry)], null);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children"));
});
/**
 * Insert or replace [k v] in a sorted vector of entries, keeping key order.
 */
prolly_tree.core.upsert_sorted = (function prolly_tree$core$upsert_sorted(entries,k,v){
var i = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__11335_SHARP_){
return (cljs.core.compare(cljs.core.first(p1__11335_SHARP_),k) < (0));
}),entries));
var hit_QMARK_ = (((i < cljs.core.count(entries))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.first(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(entries,i)))));
if(hit_QMARK_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(entries,i,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
} else {
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(entries,(0),i),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null)], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(entries,i)], 0)));
}
});
/**
 * Index of the child that owns `k`: the first whose max-key >= k, else the
 *   last. Same rule `lookup` descends by, kept in one place.
 */
prolly_tree.core.child_index = (function prolly_tree$core$child_index(children,k){
var or__5162__auto__ = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,p__11336){
var vec__11337 = p__11336;
var max_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11337,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11337,(1),null);
if((cljs.core.compare(k,max_key) <= (0))){
return i;
} else {
return null;
}
}),children));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (cljs.core.count(children) - (1));
}
});
/**
 * Re-chunk `entries` into leaf nodes and return their [max-key cid] summaries.
 */
prolly_tree.core.rechunk_leaves = (function prolly_tree$core$rechunk_leaves(put_BANG_,entries){
return prolly_tree.core.build_leaf_level(put_BANG_,entries);
});
/**
 * Re-chunk `children` into internal nodes and return their summaries.
 */
prolly_tree.core.rechunk_internal = (function prolly_tree$core$rechunk_internal(put_BANG_,children){
return prolly_tree.core.build_internal_level(put_BANG_,children);
});
/**
 * Replace `n` items of `v` starting at `i` with `replacement`.
 */
prolly_tree.core.splice = (function prolly_tree$core$splice(v,i,n,replacement){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(v,(0),i),replacement,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(v,cljs.core.min.cljs$core$IFn$_invoke$arity$2(cljs.core.count(v),(i + n)))], 0)));
});
/**
 * Number of internal levels below `root-cid`. A leaf root has height zero.
 *   Prolly trees are level-balanced, so following the first child is sufficient.
 */
prolly_tree.core.tree_height = (function prolly_tree$core$tree_height(get_fn,root_cid){
var cid = root_cid;
var height = (0);
while(true){
var node = prolly_tree.core.get_node(get_fn,cid);
if(prolly_tree.core.leaf_node_QMARK_(node)){
return height;
} else {
var G__11437 = cljs.core.second(cljs.core.first(prolly_tree.core.node_children(node)));
var G__11438 = (height + (1));
cid = G__11437;
height = G__11438;
continue;
}
break;
}
});
prolly_tree.core.leaf_summaries_at_height = (function prolly_tree$core$leaf_summaries_at_height(get_fn,cid,height){
var node = prolly_tree.core.get_node(get_fn,cid);
if((height === (0))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(cljs.core.last(prolly_tree.core.node_entries(node))),cid], null)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),height)){
return prolly_tree.core.node_children(node);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__11340){
var vec__11341 = p__11340;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11341,(0),null);
var child = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11341,(1),null);
var G__11344 = get_fn;
var G__11345 = child;
var G__11346 = (height - (1));
return (prolly_tree.core.leaf_summaries_at_height.cljs$core$IFn$_invoke$arity$3 ? prolly_tree.core.leaf_summaries_at_height.cljs$core$IFn$_invoke$arity$3(G__11344,G__11345,G__11346) : prolly_tree.core.leaf_summaries_at_height.call(null,G__11344,G__11345,G__11346));
})),prolly_tree.core.node_children(node));

}
}
});
/**
 * Every leaf's `[max-key cid]` under `root-cid`, in key order.
 * 
 *   Walks internal nodes only. There are ~1/256 as many of those as there are
 *   leaves (and ~1/65536 as many again above them), so collecting the whole leaf
 *   index costs O(n/256) reads -- for a five-million-entry tree, on the order of
 *   eighty blocks rather than twenty thousand.
 */
prolly_tree.core.leaf_summaries = (function prolly_tree$core$leaf_summaries(get_fn,root_cid){
return prolly_tree.core.leaf_summaries_at_height(get_fn,root_cid,prolly_tree.core.tree_height(get_fn,root_cid));
});
prolly_tree.core.mutation_plan = (function prolly_tree$core$mutation_plan(leaves,additions,removals){
var last_index = (cljs.core.count(leaves) - (1));
var addition_indexed = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__11349){
var vec__11350 = p__11349;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11350,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11350,(1),null);
var pair = vec__11350;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prolly_tree.core.child_index(leaves,k),pair], null);
}),additions);
var removal_indices = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__11347_SHARP_){
return prolly_tree.core.child_index(leaves,p1__11347_SHARP_);
}),removals);
var affected = cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,addition_indexed)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__11348_SHARP_){
if((p1__11348_SHARP_ < last_index)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11348_SHARP_,(p1__11348_SHARP_ + (1))], null);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11348_SHARP_], null);
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([removal_indices], 0))));
var windows = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ranges,i){
if(((cljs.core.seq(ranges)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(cljs.core.second(cljs.core.peek(ranges)) + (1)))))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(ranges),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(cljs.core.peek(ranges)),i], null));
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ranges,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,i], null));
}
}),cljs.core.PersistentVector.EMPTY,affected);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"addition-indexed","addition-indexed",1201466297),addition_indexed,new cljs.core.Keyword(null,"windows","windows",2068861701),windows,new cljs.core.Keyword(null,"removal-set","removal-set",1587895159),cljs.core.set(removals)], null);
});
/**
 * Insert or replace `[k v]` under `root-cid`, writing only the affected leaf
 *   and the internal nodes above it, and return the new root CID.
 * 
 *   A nil `root-cid` builds a single-entry tree. The result is byte-identical to
 *   `(build-tree put! sorted-entries-with-k)` -- the tests treat any divergence
 *   as a failure rather than a variant, because a content-addressed store whose
 *   insert can produce a tree a rebuild would not is one where two replicas
 *   holding identical data disagree about their root hash.
 * 
 *   Only ONE leaf is read and rewritten; every other leaf is shared with the old
 *   tree. The internal levels are re-chunked in full rather than patched through
 *   a window. That is deliberate: boundaries are content-defined, so a
 *   replacement whose new CID stops being a boundary must merge its chunk with
 *   the following one, and when the affected node is the last child of its
 *   parent that sibling lives under a different parent. A window that cannot see
 *   past its parent cannot express that merge, and an earlier draft of this
 *   function got it wrong in exactly that case. Re-chunking each internal level
 *   from the whole ordered summary list is equivalent to what `build-tree` does
 *   by construction, and internal nodes are ~1/256 of the tree -- so the cost is
 *   a few dozen blocks where a full rebuild pays tens of thousands, and the
 *   correctness argument is one sentence instead of a case analysis.
 */
prolly_tree.core.insert = (function prolly_tree$core$insert(put_BANG_,get_fn,root_cid,k,v){
if((root_cid == null)){
return prolly_tree.core.build_tree(put_BANG_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null)], null));
} else {
var leaves = prolly_tree.core.leaf_summaries(get_fn,root_cid);
var i = prolly_tree.core.child_index(leaves,k);
var leaf = prolly_tree.core.get_node(get_fn,cljs.core.second(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(leaves,i)));
var rebuilt = prolly_tree.core.rechunk_leaves(put_BANG_,prolly_tree.core.upsert_sorted(prolly_tree.core.node_entries(leaf),k,v));
var level = prolly_tree.core.splice(leaves,i,(1),rebuilt);
var level__$1 = level;
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(level__$1))){
return cljs.core.second(cljs.core.first(level__$1));
} else {
var G__11439 = prolly_tree.core.rechunk_internal(put_BANG_,level__$1);
level__$1 = G__11439;
continue;
}
break;
}
}
});
/**
 * Insert or replace many `[k v]` pairs under `root-cid` in one pass, and
 *   return the new root CID.
 * 
 *   This is not a convenience wrapper. Calling `insert` in a loop re-chunks the
 *   internal levels once PER ENTRY, and the internal levels are the part this
 *   design rebuilds in full — so a thousand entries would rewrite them a
 *   thousand times and cost more than the rebuild the whole exercise exists to
 *   avoid. Here every affected leaf is rebuilt, then the internal levels are
 *   re-chunked exactly once.
 * 
 *   A fold's novelty is precisely this shape: many entries at once, spread over
 *   a few leaves. `pairs` need not be sorted or distinct; later pairs win for a
 *   repeated key, matching `insert`'s replace semantics.
 * 
 *   Byte-identical to `(build-tree put! all-sorted-entries)`, same as `insert`,
 *   and the tests assert it against both a rebuild and a loop of single inserts.
 */
prolly_tree.core.insert_many = (function prolly_tree$core$insert_many(put_BANG_,get_fn,root_cid,pairs){
var pairs__$1 = cljs.core.vec(pairs);
if(cljs.core.empty_QMARK_(pairs__$1)){
return root_cid;
} else {
if((root_cid == null)){
return prolly_tree.core.build_tree(put_BANG_,cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__11353){
var vec__11354 = p__11353;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11354,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11354,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,v);
}),cljs.core.PersistentArrayMap.EMPTY,pairs__$1))));
} else {
var leaves = prolly_tree.core.leaf_summaries(get_fn,root_cid);
var by_leaf = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__11357){
var vec__11358 = p__11357;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11358,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11358,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,prolly_tree.core.child_index(leaves,k),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
}),cljs.core.PersistentArrayMap.EMPTY,pairs__$1);
var level = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (level,p__11361){
var vec__11362 = p__11361;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11362,(0),null);
var additions = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11362,(1),null);
var at = i;
var leaf = prolly_tree.core.get_node(get_fn,cljs.core.second(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(level,at)));
var entries = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (es,p__11365){
var vec__11366 = p__11365;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11366,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11366,(1),null);
return prolly_tree.core.upsert_sorted(es,k,v);
}),prolly_tree.core.node_entries(leaf),additions);
return prolly_tree.core.splice(level,at,(1),prolly_tree.core.rechunk_leaves(put_BANG_,entries));
}),leaves,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.first,cljs.core._GT_,by_leaf));
var level__$1 = level;
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(level__$1))){
return cljs.core.second(cljs.core.first(level__$1));
} else {
var G__11440 = prolly_tree.core.rechunk_internal(put_BANG_,level__$1);
level__$1 = G__11440;
continue;
}
break;
}

}
}
});
/**
 * Apply `additions` (`[k v]`) and `removals` (keys) in one leaf pass.
 * 
 *   Removal windows include the successor leaf because deleting a boundary key
 *   can merge its chunk with the following chunk. Additions and removals sharing
 *   a window are coalesced, and internal levels are rebuilt exactly once.
 *   Additions win when the same key occurs in both inputs.
 */
prolly_tree.core.mutate_many = (function prolly_tree$core$mutate_many(put_BANG_,get_fn,root_cid,additions,removals){
var additions__$1 = cljs.core.vec(additions);
var removals__$1 = cljs.core.vec(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(removals));
if((root_cid == null)){
return prolly_tree.core.insert_many(put_BANG_,get_fn,null,additions__$1);
} else {
if(((cljs.core.empty_QMARK_(additions__$1)) && (cljs.core.empty_QMARK_(removals__$1)))){
return root_cid;
} else {
var leaves = prolly_tree.core.leaf_summaries(get_fn,root_cid);
var map__11369 = prolly_tree.core.mutation_plan(leaves,additions__$1,removals__$1);
var map__11369__$1 = cljs.core.__destructure_map(map__11369);
var addition_indexed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11369__$1,new cljs.core.Keyword(null,"addition-indexed","addition-indexed",1201466297));
var windows = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11369__$1,new cljs.core.Keyword(null,"windows","windows",2068861701));
var removal_set = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11369__$1,new cljs.core.Keyword(null,"removal-set","removal-set",1587895159));
var level = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (level,p__11370){
var vec__11371 = p__11370;
var start = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11371,(0),null);
var end = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11371,(1),null);
var retained = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__11374){
var vec__11375 = p__11374;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11375,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11375,(1),null);
return cljs.core.contains_QMARK_(removal_set,k);
}),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__11378){
var vec__11379 = p__11378;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11379,(0),null);
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11379,(1),null);
return prolly_tree.core.node_entries(prolly_tree.core.get_node(get_fn,cid));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(level,start,(end + (1)))], 0))));
var window_additions = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p__11382){
var vec__11383 = p__11382;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11383,(0),null);
var pair = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11383,(1),null);
if((((start <= i)) && ((i <= end)))){
return pair;
} else {
return null;
}
}),addition_indexed);
var entries = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (es,p__11386){
var vec__11387 = p__11386;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11387,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11387,(1),null);
return prolly_tree.core.upsert_sorted(es,k,v);
}),retained,window_additions);
return prolly_tree.core.splice(level,start,((end - start) + (1)),prolly_tree.core.rechunk_leaves(put_BANG_,entries));
}),leaves,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.first,cljs.core._GT_,windows));
var level__$1 = level;
while(true){
if(cljs.core.empty_QMARK_(level__$1)){
return null;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(level__$1))){
return cljs.core.second(cljs.core.first(level__$1));
} else {
var G__11441 = prolly_tree.core.rechunk_internal(put_BANG_,level__$1);
level__$1 = G__11441;
continue;

}
}
break;
}

}
}
});
/**
 * Delete `keys` under `root-cid` in one pass and return the new root CID.
 *   Missing and duplicate keys are no-ops; deleting the last entry returns nil.
 */
prolly_tree.core.delete_many = (function prolly_tree$core$delete_many(put_BANG_,get_fn,root_cid,keys){
return prolly_tree.core.mutate_many(put_BANG_,get_fn,root_cid,cljs.core.PersistentVector.EMPTY,keys);
});
/**
 * Delete `k` under `root-cid`; one-key convenience over `delete-many`.
 */
prolly_tree.core.delete$ = (function prolly_tree$core$delete(put_BANG_,get_fn,root_cid,k){
return prolly_tree.core.delete_many(put_BANG_,get_fn,root_cid,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null));
});
prolly_tree.core.fetch_node_BANG_ = (function prolly_tree$core$fetch_node_BANG_(get_fn,cache,cid){
if(cljs.core.contains_QMARK_(cljs.core.deref(cache),cid)){
return Promise.resolve(prolly_tree.core.verified_node(cid,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cache),cid)));
} else {
return Promise.resolve((get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid))).then((function (bytes){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cache,cljs.core.assoc,cid,bytes);

return prolly_tree.core.verified_node(cid,bytes);
}));
}
});
prolly_tree.core.warm_height_BANG_ = (function prolly_tree$core$warm_height_BANG_(get_fn,cache,root_cid){
var walk = (function prolly_tree$core$warm_height_BANG__$_walk(cid,height){
return prolly_tree.core.fetch_node_BANG_(get_fn,cache,cid).then((function (node){
if(prolly_tree.core.leaf_node_QMARK_(node)){
return height;
} else {
return prolly_tree$core$warm_height_BANG__$_walk(cljs.core.second(cljs.core.first(prolly_tree.core.node_children(node))),(height + (1)));
}
}));
});
return walk(root_cid,(0));
});
prolly_tree.core.warm_leaf_summaries_BANG_ = (function prolly_tree$core$warm_leaf_summaries_BANG_(get_fn,cache,cid,height){
return prolly_tree.core.fetch_node_BANG_(get_fn,cache,cid).then((function (node){
if((height === (0))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(cljs.core.last(prolly_tree.core.node_entries(node))),cid], null)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),height)){
return prolly_tree.core.node_children(node);
} else {
return prolly_tree.core.pmap_async((function (p__11390){
var vec__11391 = p__11390;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11391,(0),null);
var child = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11391,(1),null);
var G__11394 = get_fn;
var G__11395 = cache;
var G__11396 = child;
var G__11397 = (height - (1));
return (prolly_tree.core.warm_leaf_summaries_BANG_.cljs$core$IFn$_invoke$arity$4 ? prolly_tree.core.warm_leaf_summaries_BANG_.cljs$core$IFn$_invoke$arity$4(G__11394,G__11395,G__11396,G__11397) : prolly_tree.core.warm_leaf_summaries_BANG_.call(null,G__11394,G__11395,G__11396,G__11397));
}),prolly_tree.core.node_children(node)).then((function (levels){
return cljs.core.vec(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,levels));
}));

}
}
}));
});
/**
 * Warm internal summary blocks plus only the leaf windows a mutation reads.
 * 
 *   The old writer recursively fetched every leaf merely to discover that it
 *   was a leaf. Height makes that discovery once; a penultimate internal node
 *   already contains every child's max-key/CID summary.
 */
prolly_tree.core.warm_mutation_BANG_ = (function prolly_tree$core$warm_mutation_BANG_(get_fn,cache,root_cid,additions,removals){
return prolly_tree.core.warm_height_BANG_(get_fn,cache,root_cid).then((function (height){
return prolly_tree.core.warm_leaf_summaries_BANG_(get_fn,cache,root_cid,height).then((function (leaves){
var map__11399 = prolly_tree.core.mutation_plan(leaves,additions,removals);
var map__11399__$1 = cljs.core.__destructure_map(map__11399);
var windows = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11399__$1,new cljs.core.Keyword(null,"windows","windows",2068861701));
var leaf_cids = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__11400){
var vec__11401 = p__11400;
var start = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11401,(0),null);
var end = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11401,(1),null);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(leaves,start,(end + (1))));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([windows], 0)));
return prolly_tree.core.pmap_async((function (p1__11398_SHARP_){
return prolly_tree.core.fetch_node_BANG_(get_fn,cache,p1__11398_SHARP_);
}),leaf_cids);
}));
}));
});
/**
 * `insert-many` for a `get-fn`/`put!` pair that returns Promises.
 * 
 *   -> `js/Promise` of the new root CID, resolved only after every block it
 *   wrote has been acknowledged. Byte-identical to the synchronous result for
 *   the same input, because it IS the synchronous function -- see the note
 *   above.
 */
prolly_tree.core.insert_many_async = (function prolly_tree$core$insert_many_async(put_BANG_,get_fn,root_cid,pairs){
var pairs__$1 = cljs.core.vec(pairs);
if(cljs.core.empty_QMARK_(pairs__$1)){
return Promise.resolve(root_cid);
} else {
var cache = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var writes = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var buffered_put_BANG_ = (function (cid,bytes){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(writes,cljs.core.conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cid,bytes], null));

return cid;
});
return (((root_cid == null))?Promise.resolve(null):prolly_tree.core.warm_mutation_BANG_(get_fn,cache,root_cid,pairs__$1,cljs.core.PersistentVector.EMPTY)).then((function (_){
return prolly_tree.core.insert_many(buffered_put_BANG_,(function (p1__11404_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cache),p1__11404_SHARP_);
}),root_cid,pairs__$1);
})).then((function (new_root){
return prolly_tree.core.pmap_async((function (p__11405){
var vec__11406 = p__11405;
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11406,(0),null);
var bytes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11406,(1),null);
return Promise.resolve((put_BANG_.cljs$core$IFn$_invoke$arity$2 ? put_BANG_.cljs$core$IFn$_invoke$arity$2(cid,bytes) : put_BANG_.call(null,cid,bytes)));
}),cljs.core.deref(writes)).then((function (_){
return new_root;
}));
}));
}
});
/**
 * `mutate-many` for a Promise-returning store. Resolves only after every
 *   newly referenced block has been acknowledged.
 */
prolly_tree.core.mutate_many_async = (function prolly_tree$core$mutate_many_async(put_BANG_,get_fn,root_cid,additions,removals){
var additions__$1 = cljs.core.vec(additions);
var removals__$1 = cljs.core.vec(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(removals));
if(((cljs.core.empty_QMARK_(additions__$1)) && (cljs.core.empty_QMARK_(removals__$1)))){
return Promise.resolve(root_cid);
} else {
var cache = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var writes = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var buffered_put_BANG_ = (function (cid,bytes){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(writes,cljs.core.conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cid,bytes], null));

return cid;
});
return (cljs.core.truth_(root_cid)?prolly_tree.core.warm_mutation_BANG_(get_fn,cache,root_cid,additions__$1,removals__$1):Promise.resolve(null)).then((function (_){
return prolly_tree.core.mutate_many(buffered_put_BANG_,(function (p1__11409_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cache),p1__11409_SHARP_);
}),root_cid,additions__$1,removals__$1);
})).then((function (new_root){
return prolly_tree.core.pmap_async((function (p__11410){
var vec__11411 = p__11410;
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11411,(0),null);
var bytes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11411,(1),null);
return Promise.resolve((put_BANG_.cljs$core$IFn$_invoke$arity$2 ? put_BANG_.cljs$core$IFn$_invoke$arity$2(cid,bytes) : put_BANG_.call(null,cid,bytes)));
}),cljs.core.deref(writes)).then((function (_){
return new_root;
}));
}));
}
});
/**
 * `delete-many` for a Promise-returning store.
 */
prolly_tree.core.delete_many_async = (function prolly_tree$core$delete_many_async(put_BANG_,get_fn,root_cid,keys){
return prolly_tree.core.mutate_many_async(put_BANG_,get_fn,root_cid,cljs.core.PersistentVector.EMPTY,keys);
});
/**
 * `delete` for a Promise-returning store.
 */
prolly_tree.core.delete_async = (function prolly_tree$core$delete_async(put_BANG_,get_fn,root_cid,k){
return prolly_tree.core.delete_many_async(put_BANG_,get_fn,root_cid,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null));
});
/**
 * `insert` for a Promise-returning store. One pair through
 *   `insert-many-async`, which has identical replace semantics.
 */
prolly_tree.core.insert_async = (function prolly_tree$core$insert_async(put_BANG_,get_fn,root_cid,k,v){
return prolly_tree.core.insert_many_async(put_BANG_,get_fn,root_cid,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null)], null));
});

//# sourceMappingURL=prolly_tree.core.js.map
