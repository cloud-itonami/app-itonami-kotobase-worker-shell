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
var G__8989 = cljs.core.rest(remaining);
var G__8990 = cljs.core.PersistentVector.EMPTY;
var G__8991 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(out,chunk_SINGLEQUOTE_);
remaining = G__8989;
chunk = G__8990;
out = G__8991;
continue;
} else {
var G__8992 = cljs.core.rest(remaining);
var G__8993 = chunk_SINGLEQUOTE_;
var G__8994 = out;
remaining = G__8992;
chunk = G__8993;
out = G__8994;
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
}),prolly_tree.core.chunk_by((function (p__8832){
var vec__8833 = p__8832;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8833,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8833,(1),null);
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
var node = new cljs.core.PersistentArrayMap(null, 2, ["kind","internal","children",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__8836){
var vec__8837 = p__8836;
var max_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8837,(0),null);
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8837,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [max_key,(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(cid) : ipld.core.link.call(null,cid))], null);
}),chunk)], null);
var cid = prolly_tree.core.put_node_BANG_(put_BANG_,node);
var max_key = cljs.core.first(cljs.core.last(chunk));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [max_key,cid], null);
}),prolly_tree.core.chunk_by((function (p__8840){
var vec__8841 = p__8840;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8841,(0),null);
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8841,(1),null);
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
var G__8995 = prolly_tree.core.build_internal_level(put_BANG_,level);
level = G__8995;
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

return prolly_tree.schema.unify_node(ipld.core.decode(bytes));
});
prolly_tree.core.get_node = (function prolly_tree$core$get_node(get_fn,cid){
return prolly_tree.core.verified_node(cid,(get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid)));
});
/**
 * A decoded internal-node child entry is `[max-key <tag-42 link>]`; return
 *   the link's CID string.
 */
prolly_tree.core.child_cid = (function prolly_tree$core$child_cid(p__8844){
var vec__8845 = p__8844;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8845,(0),null);
var link = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8845,(1),null);
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(link) : ipld.core.link_cid.call(null,link));
});
/**
 * The child CID that owns `k`, given a decoded internal node's `children`:
 *   the first whose max-key >= k, else the last.
 * 
 *   Kept in one place because `lookup`, `inclusion-proof` and `verify` must
 *   descend identically. A verifier that follows a different rule from the
 *   prover accepts proofs for the wrong leaf -- and `child-index` above already
 *   states this same rule for the `[max-key cid-string]` summary shape, so
 *   there were two statements of it before this one and now there are two
 *   again, one per shape, rather than four.
 */
prolly_tree.core.descend_cid = (function prolly_tree$core$descend_cid(children,k){
var or__5162__auto__ = cljs.core.some((function (entry){
if((cljs.core.compare(k,cljs.core.first(entry)) <= (0))){
return prolly_tree.core.child_cid(entry);
} else {
return null;
}
}),children);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return prolly_tree.core.child_cid(cljs.core.last(children));
}
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
var G__8848 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__8848) {
case "leaf":
return cljs.core.some(((function (cid,G__8848,node){
return (function (p__8849){
var vec__8850 = p__8849;
var ek = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8850,(0),null);
var ev = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8850,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ek,k)){
return ev;
} else {
return null;
}
});})(cid,G__8848,node))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries"));

break;
case "internal":
var G__8997 = prolly_tree.core.descend_cid(cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children"),k);
cid = G__8997;
continue;

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8848))));

}
break;
}
} else {
return null;
}
});
prolly_tree.core.prefix_past_QMARK_ = (function prolly_tree$core$prefix_past_QMARK_(k,prefix){
return (((cljs.core.compare(k,prefix) > (0))) && ((!(clojure.string.starts_with_QMARK_(k,prefix)))));
});
/**
 * Recursive prefix walk. `left` is a volatile of remaining matches, or
 *   nil when unlimited. Stops descending once the budget is spent.
 */
prolly_tree.core.scan_prefix_walk = (function prolly_tree$core$scan_prefix_walk(get_fn,cid,prefix,left){
if((((left == null)) || ((cljs.core.deref(left) > (0))))){
var node = prolly_tree.core.get_node(get_fn,cid);
var G__8853 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__8853) {
case "leaf":
var ms = cljs.core.filterv((function (p__8854){
var vec__8855 = p__8854;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8855,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8855,(1),null);
return clojure.string.starts_with_QMARK_(k,prefix);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries"));
if((left == null)){
return ms;
} else {
var got = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(left),ms));
cljs.core._vreset_BANG_(left,(cljs.core._deref(left) - cljs.core.count(got)));

return got;
}

break;
case "internal":
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children");
var prev_max = null;
var out = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if(cljs.core.empty_QMARK_(children)){
return cljs.core.persistent_BANG_(out);
} else {
if(cljs.core.truth_((function (){var and__5160__auto__ = left;
if(cljs.core.truth_(and__5160__auto__)){
return (!((cljs.core.deref(left) > (0))));
} else {
return and__5160__auto__;
}
})())){
return cljs.core.persistent_BANG_(out);
} else {
var entry = cljs.core.first(children);
var mk = cljs.core.first(entry);
if((((!((prev_max == null)))) && (prolly_tree.core.prefix_past_QMARK_(prev_max,prefix)))){
return cljs.core.persistent_BANG_(out);
} else {
if((cljs.core.compare(mk,prefix) < (0))){
var G__8999 = cljs.core.rest(children);
var G__9000 = mk;
var G__9001 = out;
children = G__8999;
prev_max = G__9000;
out = G__9001;
continue;
} else {
var G__9002 = cljs.core.rest(children);
var G__9003 = mk;
var G__9004 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,out,(function (){var or__5162__auto__ = (function (){var G__8862 = get_fn;
var G__8863 = prolly_tree.core.child_cid(entry);
var G__8864 = prefix;
var G__8865 = left;
return (prolly_tree.core.scan_prefix_walk.cljs$core$IFn$_invoke$arity$4 ? prolly_tree.core.scan_prefix_walk.cljs$core$IFn$_invoke$arity$4(G__8862,G__8863,G__8864,G__8865) : prolly_tree.core.scan_prefix_walk.call(null,G__8862,G__8863,G__8864,G__8865));
})();
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})());
children = G__9002;
prev_max = G__9003;
out = G__9004;
continue;

}
}

}
}
break;
}

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8853))));

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
 * 
 *   Optional `limit` (positive int) stops after that many matching pairs.
 *   `nil` is unlimited. `0` or negative is empty without walking. A caller
 *   that takes `limit` after a full scan still paid O(tree); this is the
 *   bound that makes `datoms` `:limit 1` O(path), not O(database).
 */
prolly_tree.core.scan_prefix = (function prolly_tree$core$scan_prefix(var_args){
var G__8867 = arguments.length;
switch (G__8867) {
case 3:
return prolly_tree.core.scan_prefix.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return prolly_tree.core.scan_prefix.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(prolly_tree.core.scan_prefix.cljs$core$IFn$_invoke$arity$3 = (function (get_fn,root_cid,prefix){
return prolly_tree.core.scan_prefix.cljs$core$IFn$_invoke$arity$4(get_fn,root_cid,prefix,null);
}));

(prolly_tree.core.scan_prefix.cljs$core$IFn$_invoke$arity$4 = (function (get_fn,root_cid,prefix,limit){
if(cljs.core.truth_(root_cid)){
if((((!((limit == null)))) && ((!((limit > (0))))))){
return cljs.core.PersistentVector.EMPTY;
} else {
return cljs.core.vec((function (){var or__5162__auto__ = prolly_tree.core.scan_prefix_walk(get_fn,root_cid,prefix,(((!((limit == null))))?cljs.core.volatile_BANG_(limit):null));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})());
}
} else {
return null;
}
}));

(prolly_tree.core.scan_prefix.cljs$lang$maxFixedArity = 4);

/**
 * True when `k` is in `[lo, hi)`. A nil bound is unbounded.
 */
prolly_tree.core.in_key_range_QMARK_ = (function prolly_tree$core$in_key_range_QMARK_(k,lo,hi){
return (((((lo == null)) || ((!((cljs.core.compare(k,lo) < (0))))))) && ((((hi == null)) || ((cljs.core.compare(k,hi) < (0))))));
});
/**
 * Internal-node children that can hold a key in `[lo, hi)`.
 * 
 *   A child with max-key `mk` owns `(prev-max, mk]`. Skip it when `mk < lo`.
 *   Stop when `prev-max >= hi` — every remaining key is `> prev-max`, so
 *   outside an exclusive hi. This is the value-range analogue of
 *   `scan-prefix`'s prefix prune: the tree is cut in the middle, not scanned
 *   then filtered.
 */
prolly_tree.core.range_children = (function prolly_tree$core$range_children(children,lo,hi){
var remaining = children;
var prev_max = null;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(remaining)){
return acc;
} else {
var entry = cljs.core.first(remaining);
var mk = cljs.core.first(entry);
if((((!((prev_max == null)))) && ((((!((hi == null)))) && ((!((cljs.core.compare(prev_max,hi) < (0))))))))){
return acc;
} else {
if((((!((lo == null)))) && ((cljs.core.compare(mk,lo) < (0))))){
var G__9006 = cljs.core.rest(remaining);
var G__9007 = mk;
var G__9008 = acc;
remaining = G__9006;
prev_max = G__9007;
acc = G__9008;
continue;
} else {
var G__9009 = cljs.core.rest(remaining);
var G__9010 = mk;
var G__9011 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,entry);
remaining = G__9009;
prev_max = G__9010;
acc = G__9011;
continue;

}
}
}
break;
}
});
/**
 * All `[k v]` pairs whose key is in `[lo, hi)`, fetching nodes via
 *   `(get-fn cid) -> bytes`. `lo` inclusive, `hi` exclusive; a nil bound is
 *   unbounded. Key-range pruned the same way `scan-prefix` is: children whose
 *   whole span sits below `lo` are skipped, and the walk stops once past `hi`.
 * 
 *   This is the primitive `index-range` and AVET value intervals need.
 *   `scan-prefix` cannot express `["attr|n0000000010" "attr|n0000000050")`
 *   without reading every key under `attr|` and filtering — which is exactly
 *   the full-attribute scan this exists to avoid. Keys must already compare
 *   as the query range (order-preserving encoding). HMAC-blinded leaf keys
 *   do not; those stay on prefix + decrypt + filter.
 * 
 *   Empty tree / nil root → nil (same as `scan-prefix`).
 */
prolly_tree.core.scan_range = (function prolly_tree$core$scan_range(get_fn,root_cid,lo,hi){
if(cljs.core.truth_(root_cid)){
var walk = (function prolly_tree$core$scan_range_$_walk(cid){
var node = prolly_tree.core.get_node(get_fn,cid);
var G__8873 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__8873) {
case "leaf":
return cljs.core.filterv((function (p__8874){
var vec__8875 = p__8874;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8875,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8875,(1),null);
return prolly_tree.core.in_key_range_QMARK_(k,lo,hi);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries"));

break;
case "internal":
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (entry){
return prolly_tree$core$scan_range_$_walk(prolly_tree.core.child_cid(entry));
})),prolly_tree.core.range_children(cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children"),lo,hi));

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8873))));

}
});
return walk(root_cid);
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
prolly_tree.core.scan_prefix_async_full = (function prolly_tree$core$scan_prefix_async_full(get_fn,root_cid,prefix){
if((root_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var past_prefix_QMARK_ = (function prolly_tree$core$scan_prefix_async_full_$_past_prefix_QMARK_(k){
return (((cljs.core.compare(k,prefix) > (0))) && ((!(clojure.string.starts_with_QMARK_(k,prefix)))));
});
var children_to_walk = (function prolly_tree$core$scan_prefix_async_full_$_children_to_walk(node){
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
var G__9013 = cljs.core.rest(children);
var G__9014 = mk;
var G__9015 = acc;
children = G__9013;
prev_max = G__9014;
acc = G__9015;
continue;
} else {
var G__9016 = cljs.core.rest(children);
var G__9017 = mk;
var G__9018 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,entry);
children = G__9016;
prev_max = G__9017;
acc = G__9018;
continue;

}
}
}
break;
}
});
var walk = (function prolly_tree$core$scan_prefix_async_full_$_walk(cid){
return (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid)).then((function (p1__8878_SHARP_){
return prolly_tree.core.verified_node(cid,p1__8878_SHARP_);
})).then((function (node){
var G__8884 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__8884) {
case "leaf":
return Promise.resolve(cljs.core.filterv((function (p__8885){
var vec__8886 = p__8885;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8886,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8886,(1),null);
return clojure.string.starts_with_QMARK_(k,prefix);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries")));

break;
case "internal":
return prolly_tree.core.pmap_async((function (entry){
return prolly_tree$core$scan_prefix_async_full_$_walk(prolly_tree.core.child_cid(entry));
}),children_to_walk(node)).then((function (results){
return cljs.core.vec(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,results));
}));

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8884))));

}
}));
});
return walk(root_cid);
}
});
prolly_tree.core.scan_prefix_async_limited = (function prolly_tree$core$scan_prefix_async_limited(get_fn,root_cid,prefix,limit){
if((root_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
if((!((limit > (0))))){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var left = cljs.core.volatile_BANG_(limit);
var past_prefix_QMARK_ = (function (k){
return (((cljs.core.compare(k,prefix) > (0))) && ((!(clojure.string.starts_with_QMARK_(k,prefix)))));
});
var take_matching = (function (entries){
var ms = cljs.core.filterv((function (p__8889){
var vec__8890 = p__8889;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8890,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8890,(1),null);
return clojure.string.starts_with_QMARK_(k,prefix);
}),entries);
var got = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(left),ms));
left.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,(left.cljs$core$IDeref$_deref$arity$1(null) - cljs.core.count(got)));

return got;
});
var children_to_walk = (function (node){
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children");
var prev_max = null;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(children)){
return acc;
} else {
var entry = cljs.core.first(children);
var mk = cljs.core.first(entry);
if((((!((prev_max == null)))) && (past_prefix_QMARK_(prev_max)))){
return acc;
} else {
if((cljs.core.compare(mk,prefix) < (0))){
var G__9020 = cljs.core.rest(children);
var G__9021 = mk;
var G__9022 = acc;
children = G__9020;
prev_max = G__9021;
acc = G__9022;
continue;
} else {
var G__9023 = cljs.core.rest(children);
var G__9024 = mk;
var G__9025 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,entry);
children = G__9023;
prev_max = G__9024;
acc = G__9025;
continue;

}
}
}
break;
}
});
var walk = (function prolly_tree$core$scan_prefix_async_limited_$_walk(cid){
if((!((cljs.core.deref(left) > (0))))){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
return (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid)).then((function (bytes){
return prolly_tree.core.verified_node(cid,bytes);
})).then((function (node){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("leaf",cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind"))){
return Promise.resolve(take_matching(cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries")));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p,entry){
return p.then((function (acc){
if((!((cljs.core.deref(left) > (0))))){
return acc;
} else {
return prolly_tree$core$scan_prefix_async_limited_$_walk(prolly_tree.core.child_cid(entry)).then((function (more){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(acc,more);
}));
}
}));
}),Promise.resolve(cljs.core.PersistentVector.EMPTY),children_to_walk(node));
}
}));
}
});
return walk(root_cid);

}
}
});
/**
 * Async counterpart to `scan-prefix`. Optional `limit` walks children
 *   left-to-right and stops; `nil` keeps the batched-concurrent full walk.
 */
prolly_tree.core.scan_prefix_async = (function prolly_tree$core$scan_prefix_async(var_args){
var G__8894 = arguments.length;
switch (G__8894) {
case 3:
return prolly_tree.core.scan_prefix_async.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return prolly_tree.core.scan_prefix_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(prolly_tree.core.scan_prefix_async.cljs$core$IFn$_invoke$arity$3 = (function (get_fn,root_cid,prefix){
return prolly_tree.core.scan_prefix_async_full(get_fn,root_cid,prefix);
}));

(prolly_tree.core.scan_prefix_async.cljs$core$IFn$_invoke$arity$4 = (function (get_fn,root_cid,prefix,limit){
if((limit == null)){
return prolly_tree.core.scan_prefix_async_full(get_fn,root_cid,prefix);
} else {
return prolly_tree.core.scan_prefix_async_limited(get_fn,root_cid,prefix,limit);
}
}));

(prolly_tree.core.scan_prefix_async.cljs$lang$maxFixedArity = 4);

/**
 * Async counterpart to `scan-range`. Same `[lo, hi)` contract, same
 *   child pruning, batched concurrent child fetches like `scan-prefix-async`.
 * 
 *   get-fn: `(get-fn cid) -> js/Promise<bytes>`. → `js/Promise<[[k v] ...]>`.
 */
prolly_tree.core.scan_range_async = (function prolly_tree$core$scan_range_async(get_fn,root_cid,lo,hi){
if((root_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var walk = (function prolly_tree$core$scan_range_async_$_walk(cid){
return (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid)).then((function (p1__8895_SHARP_){
return prolly_tree.core.verified_node(cid,p1__8895_SHARP_);
})).then((function (node){
var G__8901 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__8901) {
case "leaf":
return Promise.resolve(cljs.core.filterv((function (p__8902){
var vec__8903 = p__8902;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8903,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8903,(1),null);
return prolly_tree.core.in_key_range_QMARK_(k,lo,hi);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries")));

break;
case "internal":
return prolly_tree.core.pmap_async((function (entry){
return prolly_tree$core$scan_range_async_$_walk(prolly_tree.core.child_cid(entry));
}),prolly_tree.core.range_children(cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children"),lo,hi)).then((function (results){
return cljs.core.vec(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,results));
}));

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8901))));

}
}));
});
return walk(root_cid);
}
});
/**
 * The blocks along the path from `root-cid` to the leaf holding `k`, root
 *   first, leaf last. Fetches via `(get-fn cid) -> bytes`.
 * 
 *   Returns nil when `k` is absent or `root-cid` is nil. A nil return does NOT
 *   prove absence (see the note above); it means there is no inclusion proof to
 *   hand out.
 * 
 *   The proof is EXACTLY the path -- no envelope carrying the root or the key --
 *   because `verify` must take both of those from its own caller. A verifier
 *   that reads the root it checks against out of the thing being checked
 *   verifies nothing.
 */
prolly_tree.core.inclusion_proof = (function prolly_tree$core$inclusion_proof(get_fn,root_cid,k){
if(cljs.core.truth_(root_cid)){
var cid = root_cid;
var path = cljs.core.PersistentVector.EMPTY;
while(true){
var bytes = (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(cid) : get_fn.call(null,cid));
var node = prolly_tree.core.verified_node(cid,bytes);
var path_SINGLEQUOTE_ = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,bytes);
var G__8907 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__8907) {
case "leaf":
if(cljs.core.truth_(cljs.core.some(((function (cid,path,G__8907,bytes,node,path_SINGLEQUOTE_){
return (function (entry){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(entry),k);
});})(cid,path,G__8907,bytes,node,path_SINGLEQUOTE_))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries")))){
return path_SINGLEQUOTE_;
} else {
return null;
}

break;
case "internal":
var G__9029 = prolly_tree.core.descend_cid(cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children"),k);
var G__9030 = path_SINGLEQUOTE_;
cid = G__9029;
path = G__9030;
continue;

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8907))));

}
break;
}
} else {
return null;
}
});
/**
 * Check that `proof` proves `k` is present under `root-cid`, and return
 *   `{:value v}` -- or nil if it proves nothing.
 * 
 *   `root-cid` and `k` come from the CALLER. Neither is read out of `proof`.
 * 
 *   The value is wrapped in a map because a stored value may legitimately be
 *   nil, and a bare nil return would make `absent` and `present, with value nil`
 *   indistinguishable -- exactly the confusion a verifier must not have.
 * 
 *   Every one of these is a failure, and each has a test: a block whose bytes do
 *   not hash to the CID the previous step demanded; an internal node whose
 *   descent for `k` does not select the next block; a leaf reached before the
 *   path ends, or a path that ends without reaching a leaf; a leaf that does not
 *   contain `k`. No I/O -- the caller supplies the blocks, which is the point.
 */
prolly_tree.core.verify = (function prolly_tree$core$verify(root_cid,k,proof){
if(cljs.core.truth_((function (){var and__5160__auto__ = root_cid;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.seq(proof);
} else {
return and__5160__auto__;
}
})())){
var expected = root_cid;
var blocks = cljs.core.seq(proof);
while(true){
var node = (function (){try{return prolly_tree.core.verified_node(expected,cljs.core.first(blocks));
}catch (e8908){var _ = e8908;
return null;
}})();
var more = cljs.core.next(blocks);
if(cljs.core.truth_(node)){
var G__8909 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"kind");
switch (G__8909) {
case "leaf":
if((more == null)){
return cljs.core.some(((function (expected,blocks,G__8909,node,more){
return (function (entry){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(entry),k)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.second(entry)], null);
} else {
return null;
}
});})(expected,blocks,G__8909,node,more))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"entries"));
} else {
return null;
}

break;
case "internal":
if((!((more == null)))){
var G__9032 = prolly_tree.core.descend_cid(cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"children"),k);
var G__9033 = more;
expected = G__9032;
blocks = G__9033;
continue;
} else {
return null;
}

break;
default:
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
var i = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__8910_SHARP_){
return (cljs.core.compare(cljs.core.first(p1__8910_SHARP_),k) < (0));
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
var or__5162__auto__ = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,p__8911){
var vec__8912 = p__8911;
var max_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8912,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8912,(1),null);
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
var G__9034 = cljs.core.second(cljs.core.first(prolly_tree.core.node_children(node)));
var G__9035 = (height + (1));
cid = G__9034;
height = G__9035;
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__8915){
var vec__8916 = p__8915;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8916,(0),null);
var child = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8916,(1),null);
var G__8919 = get_fn;
var G__8920 = child;
var G__8921 = (height - (1));
return (prolly_tree.core.leaf_summaries_at_height.cljs$core$IFn$_invoke$arity$3 ? prolly_tree.core.leaf_summaries_at_height.cljs$core$IFn$_invoke$arity$3(G__8919,G__8920,G__8921) : prolly_tree.core.leaf_summaries_at_height.call(null,G__8919,G__8920,G__8921));
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
var addition_indexed = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__8924){
var vec__8925 = p__8924;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8925,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8925,(1),null);
var pair = vec__8925;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prolly_tree.core.child_index(leaves,k),pair], null);
}),additions);
var removal_indices = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__8922_SHARP_){
return prolly_tree.core.child_index(leaves,p1__8922_SHARP_);
}),removals);
var affected = cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,addition_indexed)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__8923_SHARP_){
if((p1__8923_SHARP_ < last_index)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8923_SHARP_,(p1__8923_SHARP_ + (1))], null);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8923_SHARP_], null);
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
var G__9036 = prolly_tree.core.rechunk_internal(put_BANG_,level__$1);
level__$1 = G__9036;
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
return prolly_tree.core.build_tree(put_BANG_,cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__8928){
var vec__8929 = p__8928;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8929,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8929,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,v);
}),cljs.core.PersistentArrayMap.EMPTY,pairs__$1))));
} else {
var leaves = prolly_tree.core.leaf_summaries(get_fn,root_cid);
var by_leaf = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__8932){
var vec__8933 = p__8932;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8933,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8933,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,prolly_tree.core.child_index(leaves,k),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
}),cljs.core.PersistentArrayMap.EMPTY,pairs__$1);
var level = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (level,p__8936){
var vec__8937 = p__8936;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8937,(0),null);
var additions = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8937,(1),null);
var at = i;
var leaf = prolly_tree.core.get_node(get_fn,cljs.core.second(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(level,at)));
var entries = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (es,p__8940){
var vec__8941 = p__8940;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8941,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8941,(1),null);
return prolly_tree.core.upsert_sorted(es,k,v);
}),prolly_tree.core.node_entries(leaf),additions);
return prolly_tree.core.splice(level,at,(1),prolly_tree.core.rechunk_leaves(put_BANG_,entries));
}),leaves,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.first,cljs.core._GT_,by_leaf));
var level__$1 = level;
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(level__$1))){
return cljs.core.second(cljs.core.first(level__$1));
} else {
var G__9037 = prolly_tree.core.rechunk_internal(put_BANG_,level__$1);
level__$1 = G__9037;
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
var map__8944 = prolly_tree.core.mutation_plan(leaves,additions__$1,removals__$1);
var map__8944__$1 = cljs.core.__destructure_map(map__8944);
var addition_indexed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8944__$1,new cljs.core.Keyword(null,"addition-indexed","addition-indexed",1201466297));
var windows = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8944__$1,new cljs.core.Keyword(null,"windows","windows",2068861701));
var removal_set = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8944__$1,new cljs.core.Keyword(null,"removal-set","removal-set",1587895159));
var level = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (level,p__8945){
var vec__8946 = p__8945;
var start = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8946,(0),null);
var end = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8946,(1),null);
var retained = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__8949){
var vec__8950 = p__8949;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8950,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8950,(1),null);
return cljs.core.contains_QMARK_(removal_set,k);
}),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__8953){
var vec__8954 = p__8953;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8954,(0),null);
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8954,(1),null);
return prolly_tree.core.node_entries(prolly_tree.core.get_node(get_fn,cid));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(level,start,(end + (1)))], 0))));
var window_additions = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p__8957){
var vec__8958 = p__8957;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8958,(0),null);
var pair = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8958,(1),null);
if((((start <= i)) && ((i <= end)))){
return pair;
} else {
return null;
}
}),addition_indexed);
var entries = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (es,p__8961){
var vec__8962 = p__8961;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8962,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8962,(1),null);
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
var G__9038 = prolly_tree.core.rechunk_internal(put_BANG_,level__$1);
level__$1 = G__9038;
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
return prolly_tree.core.pmap_async((function (p__8965){
var vec__8966 = p__8965;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8966,(0),null);
var child = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8966,(1),null);
var G__8969 = get_fn;
var G__8970 = cache;
var G__8971 = child;
var G__8972 = (height - (1));
return (prolly_tree.core.warm_leaf_summaries_BANG_.cljs$core$IFn$_invoke$arity$4 ? prolly_tree.core.warm_leaf_summaries_BANG_.cljs$core$IFn$_invoke$arity$4(G__8969,G__8970,G__8971,G__8972) : prolly_tree.core.warm_leaf_summaries_BANG_.call(null,G__8969,G__8970,G__8971,G__8972));
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
var map__8974 = prolly_tree.core.mutation_plan(leaves,additions,removals);
var map__8974__$1 = cljs.core.__destructure_map(map__8974);
var windows = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8974__$1,new cljs.core.Keyword(null,"windows","windows",2068861701));
var leaf_cids = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__8975){
var vec__8976 = p__8975;
var start = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8976,(0),null);
var end = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8976,(1),null);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(leaves,start,(end + (1))));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([windows], 0)));
return prolly_tree.core.pmap_async((function (p1__8973_SHARP_){
return prolly_tree.core.fetch_node_BANG_(get_fn,cache,p1__8973_SHARP_);
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
return prolly_tree.core.insert_many(buffered_put_BANG_,(function (p1__8979_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cache),p1__8979_SHARP_);
}),root_cid,pairs__$1);
})).then((function (new_root){
return prolly_tree.core.pmap_async((function (p__8980){
var vec__8981 = p__8980;
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8981,(0),null);
var bytes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8981,(1),null);
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
return prolly_tree.core.mutate_many(buffered_put_BANG_,(function (p1__8984_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cache),p1__8984_SHARP_);
}),root_cid,additions__$1,removals__$1);
})).then((function (new_root){
return prolly_tree.core.pmap_async((function (p__8985){
var vec__8986 = p__8985;
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8986,(0),null);
var bytes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8986,(1),null);
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
