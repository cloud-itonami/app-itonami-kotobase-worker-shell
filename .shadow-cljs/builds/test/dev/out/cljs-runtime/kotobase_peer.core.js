goog.provide('kotobase_peer.core');
kotobase_peer.core.verified_node = (function kotobase_peer$core$verified_node(get_fn,expected_cid){
var temp__5825__auto__ = (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(expected_cid) : get_fn.call(null,expected_cid));
if(cljs.core.truth_(temp__5825__auto__)){
var bytes = temp__5825__auto__;
var actual = ipld.core.cid(bytes);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected_cid,actual)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: block CID mismatch",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ipld","cid-mismatch","ipld/cid-mismatch",1738594899),new cljs.core.Keyword(null,"expected-cid","expected-cid",-860224801),expected_cid,new cljs.core.Keyword(null,"actual-cid","actual-cid",-884324624),actual], null));
}

return ipld.core.decode(bytes);
} else {
return null;
}
});
/**
 * Max in-flight `f` calls at once (ADR-2607110200 addendum: `hot-datoms`/
 *   `fold!`'s novelty read fired ALL novelty tx-block gets via one unbounded
 *   `js/Promise.all` — fine for a handful of blocks, but a graph with
 *   hundreds of unfolded novelty blocks (a mass-write burst outrunning the
 *   fold cron, exactly what happened to yoro-social-v2 on 2026-07-10 --
 *   ~300 create-record calls, each its own novelty block, none folded)
 *   fires that many simultaneous R2 gets in one shot. Workers' own
 *   concurrent-subrequest ceiling then serializes/queues most of them
 *   behind the scenes, so wall-clock time degrades sharply past a few dozen
 *   in flight rather than scaling with real R2 latency — a graph that
 *   should read in ~1-2s of parallel I/O instead exceeds the Worker's own
 *   CPU/wall-time budget and the request never completes. Batching bounds
 *   the storm to a size well under typical Workers subrequest concurrency
 *   limits while still running each batch fully in parallel, so this stays
 *   `pmap-async`'s intended 'concurrent, not sequential' behavior -- just
 *   capped instead of unbounded. 24 is a starting point (not load-tested
 *   against Workers' exact per-plan ceiling); revisit if a graph's novelty
 *   count grows enough to need re-tuning.
 */
kotobase_peer.core.pmap_async_batch_size = (24);
/**
 * cljs only: map `f` (returns a `js/Promise`) over `coll` in batches of
 *   `pmap-async-batch-size` concurrent calls at a time (never all of `coll`
 *   at once, see that var's docstring for why), return one `js/Promise` of
 *   the resolved results, order-preserved.
 */
kotobase_peer.core.pmap_async = (function kotobase_peer$core$pmap_async(f,coll){
var batches = cljs.core.partition_all.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.pmap_async_batch_size,coll);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc_promise,batch){
return acc_promise.then((function (acc){
return Promise.all(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,batch))).then((function (batch_results){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(acc,batch_results);
}));
}));
}),Promise.resolve(cljs.core.PersistentVector.EMPTY),batches);
});
kotobase_peer.core.empty_db = (function kotobase_peer$core$empty_db(){
return arrangement.core.empty_db();
});
/**
 * Coerce one quad position: an `ipld.core/Link` passes through unchanged (so
 * it survives to `assert-quad`'s `ref?` check as a genuine Link, ADR-2607050200);
 * anything else stringifies as before (general typed-value support beyond
 * Link -- int/bytes/bool/list/map -- remains a follow-up, ADR-2607023200 §6-5).
 */
kotobase_peer.core.__GT_quad_value = (function kotobase_peer$core$__GT_quad_value(v){
if(cljs.core.truth_((ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1(v) : ipld.core.link_QMARK_.call(null,v)))){
return v;
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v));
}
});
/**
 * Coerce one tx-data item to a `{:s :p :o}` quad (`:s`/`:p` always coerced to
 * strings; `:o` passes an `ipld.core/Link` through unchanged, see
 * `->quad-value`). Accepts a `{:s :p :o}` map, `[:db/add e a v]`, or a bare
 * `[e a v]` triple.
 */
kotobase_peer.core.__GT_quad = (function kotobase_peer$core$__GT_quad(item){
if(((cljs.core.map_QMARK_(item)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"retract-entity","retract-entity",-2035411479),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(item))) && (cljs.core.contains_QMARK_(item,new cljs.core.Keyword(null,"s","s",1705939918))))))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"s","s",1705939918),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(item))),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"retract-entity","retract-entity",-2035411479)], null);
} else {
if(((cljs.core.map_QMARK_(item)) && (((cljs.core.contains_QMARK_(item,new cljs.core.Keyword(null,"s","s",1705939918))) && (((cljs.core.contains_QMARK_(item,new cljs.core.Keyword(null,"p","p",151049309))) && (cljs.core.contains_QMARK_(item,new cljs.core.Keyword(null,"o","o",-1350007228))))))))){
var G__11539 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(item))),new cljs.core.Keyword(null,"p","p",151049309),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(item))),new cljs.core.Keyword(null,"o","o",-1350007228),kotobase_peer.core.__GT_quad_value(new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(item))], null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(item))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11539,new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(item));
} else {
return G__11539;
}
} else {
if(((cljs.core.vector_QMARK_(item)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((4),cljs.core.count(item))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("db","add","db/add",235286841),cljs.core.first(item))))))){
var vec__11540 = item;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11540,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11540,(1),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11540,(2),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11540,(3),null);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),new cljs.core.Keyword(null,"p","p",151049309),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),new cljs.core.Keyword(null,"o","o",-1350007228),kotobase_peer.core.__GT_quad_value(v)], null);
} else {
if(((cljs.core.vector_QMARK_(item)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((4),cljs.core.count(item))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("db","retract","db/retract",-1549825231),cljs.core.first(item))))))){
var vec__11543 = item;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11543,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11543,(1),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11543,(2),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11543,(3),null);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"s","s",1705939918),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),new cljs.core.Keyword(null,"p","p",151049309),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),new cljs.core.Keyword(null,"o","o",-1350007228),kotobase_peer.core.__GT_quad_value(v),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"retract","retract",-1549826125)], null);
} else {
if(((cljs.core.vector_QMARK_(item)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(item))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("db","retractEntity","db/retractEntity",-1452737935),cljs.core.first(item))))))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"s","s",1705939918),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.second(item))),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"retract-entity","retract-entity",-2035411479)], null);
} else {
if(((cljs.core.sequential_QMARK_(item)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(item))))){
var vec__11546 = item;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11546,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11546,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11546,(2),null);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),new cljs.core.Keyword(null,"p","p",151049309),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),new cljs.core.Keyword(null,"o","o",-1350007228),kotobase_peer.core.__GT_quad_value(v)], null);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: unrecognized tx-data item",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),item], null));

}
}
}
}
}
}
});
/**
 * Retract every quad whose subject is `s` from the hot db (spo lookup —
 *   O(|entity|), ADR-2607071610 :retract-entity).
 */
kotobase_peer.core.retract_entity_STAR_ = (function kotobase_peer$core$retract_entity_STAR_(db,s,ref_QMARK_){
return cljs.core.reduce_kv((function (db__$1,p,os){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db__$2,o){
return arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3(db__$2,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null),ref_QMARK_);
}),db__$1,os);
}),db,cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spo","spo",734923469),s], null),cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Apply one :op-tagged quad to the hot db (ADR-2607071610). Missing :op =
 *   :assert — old novelty blocks and plain quads stay valid unchanged.
 */
kotobase_peer.core.apply_quad = (function kotobase_peer$core$apply_quad(db,p__11549,ref_QMARK_){
var map__11550 = p__11549;
var map__11550__$1 = cljs.core.__destructure_map(map__11550);
var q = map__11550__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11550__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var G__11551 = (function (){var or__5162__auto__ = op;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"assert","assert",-963103026);
}
})();
var G__11551__$1 = (((G__11551 instanceof cljs.core.Keyword))?G__11551.fqn:null);
switch (G__11551__$1) {
case "assert":
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(db,q,ref_QMARK_);

break;
case "retract":
return arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3(db,q,ref_QMARK_);

break;
case "retract-entity":
return kotobase_peer.core.retract_entity_STAR_(db,new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(q),ref_QMARK_);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11551__$1))));

}
});
kotobase_peer.core.asserted_QMARK_ = (function kotobase_peer$core$asserted_QMARK_(db,p__11552){
var map__11553 = p__11552;
var map__11553__$1 = cljs.core.__destructure_map(map__11553);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11553__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11553__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11553__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
return cljs.core.contains_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$3(arrangement.core.entity_attrs(db,s),p,cljs.core.PersistentHashSet.EMPTY),o);
});
/**
 * Apply raw TX-DATA and return only state-changing datom deltas. Duplicate
 *   asserts and missing retracts emit nothing. `:retract-entity` expands the
 *   entity's currently asserted triples in deterministic order.
 */
kotobase_peer.core.transact_effective = (function kotobase_peer$core$transact_effective(var_args){
var G__11556 = arguments.length;
switch (G__11556) {
case 2:
return kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$2 = (function (db,tx_data){
return kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$3(db,tx_data,ipld.core.link_QMARK_);
}));

(kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$3 = (function (db,tx_data,ref_QMARK_){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__11557,item){
var map__11558 = p__11557;
var map__11558__$1 = cljs.core.__destructure_map(map__11558);
var result = map__11558__$1;
var db_after = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11558__$1,new cljs.core.Keyword(null,"db-after","db-after",-571884666));
var map__11559 = kotobase_peer.core.__GT_quad(item);
var map__11559__$1 = cljs.core.__destructure_map(map__11559);
var quad = map__11559__$1;
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11559__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11559__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11559__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11559__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var op__$1 = (function (){var or__5162__auto__ = op;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"assert","assert",-963103026);
}
})();
var G__11560 = op__$1;
var G__11560__$1 = (((G__11560 instanceof cljs.core.Keyword))?G__11560.fqn:null);
switch (G__11560__$1) {
case "assert":
if(kotobase_peer.core.asserted_QMARK_(db_after,quad)){
return result;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db-after","db-after",-571884666),arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(db_after,quad,ref_QMARK_),new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),s,new cljs.core.Keyword(null,"a","a",-2123407586),p,new cljs.core.Keyword(null,"v","v",21465059),o,new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"assert","assert",-963103026)], null))], null);
}

break;
case "retract":
if((!(kotobase_peer.core.asserted_QMARK_(db_after,quad)))){
return result;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db-after","db-after",-571884666),arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3(db_after,quad,ref_QMARK_),new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),s,new cljs.core.Keyword(null,"a","a",-2123407586),p,new cljs.core.Keyword(null,"v","v",21465059),o,new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"retract","retract",-1549826125)], null))], null);
}

break;
case "retract-entity":
var deltas = cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"a","a",-2123407586),(function (p1__11554_SHARP_){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"v","v",21465059).cljs$core$IFn$_invoke$arity$1(p1__11554_SHARP_)], 0));
})),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__11561){
var vec__11562 = p__11561;
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11562,(0),null);
var values = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11562,(1),null);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (value){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),s,new cljs.core.Keyword(null,"a","a",-2123407586),attr,new cljs.core.Keyword(null,"v","v",21465059),value,new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"retract","retract",-1549826125)], null);
}),values);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arrangement.core.entity_attrs(db_after,s)], 0))));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db-after","db-after",-571884666),kotobase_peer.core.retract_entity_STAR_(db_after,s,ref_QMARK_),new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987).cljs$core$IFn$_invoke$arity$1(result),deltas)], null);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11560__$1))));

}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db-after","db-after",-571884666),db,new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987),cljs.core.PersistentVector.EMPTY], null),tx_data);
}));

(kotobase_peer.core.transact_effective.cljs$lang$maxFixedArity = 3);

/**
 * Normalize and apply TX-DATA, then refresh scoped query statistics at
 *   NEW-EPOCH from the effective deltas only. Returns both immutable results.
 */
kotobase_peer.core.transact_with_statistics = (function kotobase_peer$core$transact_with_statistics(var_args){
var G__11566 = arguments.length;
switch (G__11566) {
case 4:
return kotobase_peer.core.transact_with_statistics.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return kotobase_peer.core.transact_with_statistics.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.transact_with_statistics.cljs$core$IFn$_invoke$arity$4 = (function (db,tx_data,query_statistics,new_epoch){
return kotobase_peer.core.transact_with_statistics.cljs$core$IFn$_invoke$arity$5(db,tx_data,ipld.core.link_QMARK_,query_statistics,new_epoch);
}));

(kotobase_peer.core.transact_with_statistics.cljs$core$IFn$_invoke$arity$5 = (function (db,tx_data,ref_QMARK_,query_statistics,new_epoch){
var map__11567 = kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$3(db,tx_data,ref_QMARK_);
var map__11567__$1 = cljs.core.__destructure_map(map__11567);
var db_after = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11567__$1,new cljs.core.Keyword(null,"db-after","db-after",-571884666));
var effective_deltas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11567__$1,new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"db-after","db-after",-571884666),db_after,new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987),effective_deltas,new cljs.core.Keyword(null,"query-statistics","query-statistics",1589762077),(kotobase_peer.statistics.refresh_query_statistics.cljs$core$IFn$_invoke$arity$3 ? kotobase_peer.statistics.refresh_query_statistics.cljs$core$IFn$_invoke$arity$3(query_statistics,effective_deltas,new_epoch) : kotobase_peer.statistics.refresh_query_statistics.call(null,query_statistics,effective_deltas,new_epoch))], null);
}));

(kotobase_peer.core.transact_with_statistics.cljs$lang$maxFixedArity = 5);

/**
 * Set-based snapshot-half cancellation for `hot-datoms` (ADR-2607071610):
 *   which [s p o] triples / s entities do the novelty blocks retract? Order-
 *   safe because re-asserts after a retract live in the novelty half, whose
 *   ordered replay re-emits them.
 */
kotobase_peer.core.retraction_filters = (function kotobase_peer$core$retraction_filters(quads){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__11568){
var map__11569 = p__11568;
var map__11569__$1 = cljs.core.__destructure_map(map__11569);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11569__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11569__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11569__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11569__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var G__11570 = op;
var G__11570__$1 = (((G__11570 instanceof cljs.core.Keyword))?G__11570.fqn:null);
switch (G__11570__$1) {
case "retract":
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,new cljs.core.Keyword(null,"triples","triples",-368198101),cljs.core.conj,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null));

break;
case "retract-entity":
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,new cljs.core.Keyword(null,"entities","entities",1940967403),cljs.core.conj,s);

break;
default:
return acc;

}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"triples","triples",-368198101),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"entities","entities",1940967403),cljs.core.PersistentHashSet.EMPTY], null),quads);
});
/**
 * Drop cold/snapshot rows cancelled by novelty retractions.
 */
kotobase_peer.core.remove_retracted = (function kotobase_peer$core$remove_retracted(p__11571,rows){
var map__11572 = p__11571;
var map__11572__$1 = cljs.core.__destructure_map(map__11572);
var triples = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11572__$1,new cljs.core.Keyword(null,"triples","triples",-368198101));
var entities = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11572__$1,new cljs.core.Keyword(null,"entities","entities",1940967403));
if(((cljs.core.empty_QMARK_(triples)) && (cljs.core.empty_QMARK_(entities)))){
return rows;
} else {
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__11573){
var map__11574 = p__11573;
var map__11574__$1 = cljs.core.__destructure_map(map__11574);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11574__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11574__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v_edn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11574__$1,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866));
return ((cljs.core.contains_QMARK_(entities,e)) || (cljs.core.contains_QMARK_(triples,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,arrangement.core.edn__GT_link(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(v_edn))], null))));
}),rows);
}
});
/**
 * Apply `tx-data` (a seq of `{:s :p :o}` quads, `[:db/add e a v]`, or `[e a v]`
 * triples) to `db`. Returns the new (immutable) db value. `ref?` is passed
 * through to `arrangement.core/assert-quad` for reverse-reference indexing
 * (default `ipld.core/link?`, ADR-2607050200 -- a value asserted as a Link is
 * automatically reverse-indexed, see `refs`).
 * 
 * A pure hot-db utility, independent of persistence strategy -- used
 * internally by `fold!` (via `hydrate-db`'s reduce, not this fn directly) and
 * available for anyone assembling/inspecting a hot db value directly (tests,
 * migration/backfill tooling). The write path proper is `commit!`, below.
 */
kotobase_peer.core.transact = (function kotobase_peer$core$transact(var_args){
var G__11576 = arguments.length;
switch (G__11576) {
case 2:
return kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$2 = (function (db,tx_data){
return kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$3(db,tx_data,ipld.core.link_QMARK_);
}));

(kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$3 = (function (db,tx_data,ref_QMARK_){
return new cljs.core.Keyword(null,"db-after","db-after",-571884666).cljs$core$IFn$_invoke$arity$1(kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$3(db,tx_data,ref_QMARK_));
}));

(kotobase_peer.core.transact.cljs$lang$maxFixedArity = 3);

/**
 * Meta-schema attributes describing OTHER attributes -- these never need a
 *   schema entry of their own. Declaring them about some attribute name IS
 *   how that attribute gets its first schema entry; a database with zero
 *   schema installed can still bootstrap its first one. `db/tupleTypes`
 *   (ADR-2607061200 value-type follow-up) declares a `:tuple` attribute's
 *   fixed per-position value types.
 */
kotobase_peer.core.bootstrap_attrs = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, ["db/unique",null,"db/tupleTypes",null,"db/doc",null,"db/cardinality",null,"db/valueType",null], null), null);
/**
 * Like `->quad`, but the `:o`/`v` position is NOT coerced (Link-passthrough
 *   or stringified) -- the caller's ORIGINAL value, for `transact-with-
 *   schema`'s `:db/valueType` check to inspect before `->quad`'s
 *   stringification would erase e.g. an int's actual type. Returns `[s p o]`,
 *   not yet a quad map; storage still goes through the normal `->quad`
 *   coercion afterward (schema validates the value's type at the API
 *   boundary, it does not change the on-disk string-based representation
 *   every other value already uses).
 */
kotobase_peer.core.raw_triple = (function kotobase_peer$core$raw_triple(item){
if(((cljs.core.map_QMARK_(item)) && (((cljs.core.contains_QMARK_(item,new cljs.core.Keyword(null,"s","s",1705939918))) && (((cljs.core.contains_QMARK_(item,new cljs.core.Keyword(null,"p","p",151049309))) && (cljs.core.contains_QMARK_(item,new cljs.core.Keyword(null,"o","o",-1350007228))))))))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(item))),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(item))),new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(item)], null);
} else {
if(((cljs.core.vector_QMARK_(item)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((4),cljs.core.count(item))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("db","add","db/add",235286841),cljs.core.first(item))))))){
var vec__11577 = item;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11577,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11577,(1),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11577,(2),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11577,(3),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),v], null);
} else {
if(((cljs.core.sequential_QMARK_(item)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(item))))){
var vec__11580 = item;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11580,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11580,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11580,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),v], null);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: unrecognized tx-data item",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),item], null));

}
}
}
});
/**
 * One `install-schema` declaration value -> its wire string. A keyword
 *   stores by `name` (`:string` -> "string"); `db/tupleTypes`'s vector of
 *   per-position types stores comma-joined (`[:string :long]` -> "string,
 *   long") rather than a stringified EDN vector -- simpler to parse back
 *   (`str/split`) than round-tripping through `edn/read-string`, and this
 *   substrate's other schema fields are already single plain strings.
 */
kotobase_peer.core.schema_value__GT_wire = (function kotobase_peer$core$schema_value__GT_wire(v){
if(cljs.core.vector_QMARK_(v)){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__11583_SHARP_){
if((p1__11583_SHARP_ instanceof cljs.core.Keyword)){
return cljs.core.name(p1__11583_SHARP_);
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__11583_SHARP_));
}
}),v));
} else {
if((v instanceof cljs.core.Keyword)){
return cljs.core.name(v);
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v));

}
}
});
/**
 * Assert schema declarations as ordinary datoms (see the ns section
 *   comment above): `schema` is `{attr-name {:db/valueType t :db/cardinality
 *   c :db/unique u :db/doc "..." :db/tupleTypes [t1 t2 ...]}}` (each key
 *   optional; values may be keywords -- `:string`, `:one`, `:identity`,
 *   etc. -- or plain strings; `:db/tupleTypes` is a vector of per-position
 *   value-types, only meaningful when `:db/valueType` is `:tuple`).
 *   `db/doc` is purely informational, never validated by `transact-with-
 *   schema`.
 */
kotobase_peer.core.install_schema = (function kotobase_peer$core$install_schema(var_args){
var G__11585 = arguments.length;
switch (G__11585) {
case 2:
return kotobase_peer.core.install_schema.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.install_schema.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.install_schema.cljs$core$IFn$_invoke$arity$2 = (function (db,schema){
return kotobase_peer.core.install_schema.cljs$core$IFn$_invoke$arity$3(db,schema,ipld.core.link_QMARK_);
}));

(kotobase_peer.core.install_schema.cljs$core$IFn$_invoke$arity$3 = (function (db,schema,ref_QMARK_){
return kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$3(db,(function (){var iter__5649__auto__ = (function kotobase_peer$core$iter__11586(s__11587){
return (new cljs.core.LazySeq(null,(function (){
var s__11587__$1 = s__11587;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11587__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11592 = cljs.core.first(xs__6385__auto__);
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11592,(0),null);
var decl = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11592,(1),null);
var iterys__5645__auto__ = ((function (s__11587__$1,vec__11592,attr,decl,xs__6385__auto__,temp__5825__auto__){
return (function kotobase_peer$core$iter__11586_$_iter__11588(s__11589){
return (new cljs.core.LazySeq(null,((function (s__11587__$1,vec__11592,attr,decl,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__11589__$1 = s__11589;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11589__$1);
if(temp__5825__auto____$1){
var s__11589__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11589__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11589__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11591 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11590 = (0);
while(true){
if((i__11590 < size__5648__auto__)){
var vec__11595 = cljs.core._nth(c__5647__auto__,i__11590);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11595,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11595,(1),null);
var k_name = cljs.core.subs.cljs$core$IFn$_invoke$arity$2((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)),(1));
if(cljs.core.contains_QMARK_(kotobase_peer.core.bootstrap_attrs,k_name)){
cljs.core.chunk_append(b__11591,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr,k_name,kotobase_peer.core.schema_value__GT_wire(v)], null));

var G__12059 = (i__11590 + (1));
i__11590 = G__12059;
continue;
} else {
var G__12060 = (i__11590 + (1));
i__11590 = G__12060;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11591),kotobase_peer$core$iter__11586_$_iter__11588(cljs.core.chunk_rest(s__11589__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11591),null);
}
} else {
var vec__11598 = cljs.core.first(s__11589__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11598,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11598,(1),null);
var k_name = cljs.core.subs.cljs$core$IFn$_invoke$arity$2((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)),(1));
if(cljs.core.contains_QMARK_(kotobase_peer.core.bootstrap_attrs,k_name)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr,k_name,kotobase_peer.core.schema_value__GT_wire(v)], null),kotobase_peer$core$iter__11586_$_iter__11588(cljs.core.rest(s__11589__$2)));
} else {
var G__12061 = cljs.core.rest(s__11589__$2);
s__11589__$1 = G__12061;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__11587__$1,vec__11592,attr,decl,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__11587__$1,vec__11592,attr,decl,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(decl));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11586(cljs.core.rest(s__11587__$1)));
} else {
var G__12062 = cljs.core.rest(s__11587__$1);
s__11587__$1 = G__12062;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(schema);
})(),ref_QMARK_);
}));

(kotobase_peer.core.install_schema.cljs$lang$maxFixedArity = 3);

/**
 * Derive `{attr-name {:value-type _ :cardinality _ :unique _ :tuple-
 *   types _}}` from whatever `db/valueType`/`db/cardinality`/`db/unique`/
 *   `db/tupleTypes` datoms already exist in `db` (see `install-schema`) --
 *   schema is just data the db already has, not a side-channel a caller
 *   must separately track. `:cardinality` defaults to `"many"`
 *   (arrangement's own native cardinality-agnostic behavior, ADR-2607061200
 *   pillar note) when an attribute has SOME schema entry but no explicit
 *   `db/cardinality`. `:tuple-types` is a vector of value-type strings
 *   (parsed back from `db/tupleTypes`'s comma-joined wire string), or `nil`.
 */
kotobase_peer.core.schema_of = (function kotobase_peer$core$schema_of(db){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$1((function (p__11601){
var vec__11602 = p__11601;
var ent = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11602,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11602,(1),null);
var vt = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(attrs,"db/valueType"));
var card = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(attrs,"db/cardinality"));
var uniq = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(attrs,"db/unique"));
var tuple_types_str = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(attrs,"db/tupleTypes"));
if(cljs.core.truth_((function (){var or__5162__auto__ = vt;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = card;
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
var or__5162__auto____$2 = uniq;
if(cljs.core.truth_(or__5162__auto____$2)){
return or__5162__auto____$2;
} else {
return tuple_types_str;
}
}
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ent,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value-type","value-type",576005757),vt,new cljs.core.Keyword(null,"cardinality","cardinality",-104971109),(function (){var or__5162__auto__ = card;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "many";
}
})(),new cljs.core.Keyword(null,"unique","unique",329397282),uniq,new cljs.core.Keyword(null,"tuple-types","tuple-types",389454381),(function (){var G__11605 = tuple_types_str;
if((G__11605 == null)){
return null;
} else {
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(G__11605,/,/);
}
})()], null)], null);
} else {
return null;
}
})),new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db));
});
/**
 * `value-type` -> the check run against the ORIGINAL value `v` (before
 *   `->quad`'s string coercion -- see `raw-triple`). `tuple-types` (a
 *   vector of per-position value-type strings, from `db/tupleTypes`) is
 *   only consulted when `value-type` is `"tuple"`.
 * 
 *   `"bigdec"`/`"bigint"` are deliberately NOT included: cljs/JS has no
 *   true arbitrary-precision decimal/integer type, so a check that's
 *   meaningful on JVM (`decimal?`) would ALWAYS fail on cljs/nbb -- a
 *   cross-platform correctness mismatch this codebase avoids elsewhere
 *   (see e.g. `avg`'s forced double division in `arrangement.datalog`),
 *   not an oversight.
 */
kotobase_peer.core.validate_value_type_BANG_ = (function kotobase_peer$core$validate_value_type_BANG_(attr,value_type,v,tuple_types){
var G__11606 = value_type;
switch (G__11606) {
case "string":
if(typeof v === 'string'){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a string",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "long":
if(cljs.core.integer_QMARK_(v)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a long",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "double":
if(typeof v === 'number'){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a double",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "boolean":
if(cljs.core.boolean_QMARK_(v)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a boolean",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "ref":
if(cljs.core.truth_((ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1(v) : ipld.core.link_QMARK_.call(null,v)))){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a ref (ipld/Link)",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "uuid":
if(cljs.core.uuid_QMARK_(v)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a uuid",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "instant":
if(cljs.core.inst_QMARK_(v)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected an instant",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "keyword":
if((v instanceof cljs.core.Keyword)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a keyword",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "symbol":
if((v instanceof cljs.core.Symbol)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a symbol",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "bytes":
if((v instanceof Uint8Array)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected bytes",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

break;
case "tuple":
if(cljs.core.vector_QMARK_(v)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- expected a tuple (vector)",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"value","value",305978217),v], null));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(tuple_types),cljs.core.count(v))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: schema violation -- tuple arity mismatch",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"expected","expected",1583670997),cljs.core.count(tuple_types),new cljs.core.Keyword(null,"got","got",-1674745710),cljs.core.count(v)], null));
}

return cljs.core.dorun.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (t,elem){
return (kotobase_peer.core.validate_value_type_BANG_.cljs$core$IFn$_invoke$arity$4 ? kotobase_peer.core.validate_value_type_BANG_.cljs$core$IFn$_invoke$arity$4(attr,t,elem,null) : kotobase_peer.core.validate_value_type_BANG_.call(null,attr,t,elem,null));
}),tuple_types,v));

break;
default:
return null;

}
});
/**
 * Caller-passed inline schema declarations (`install-schema`'s own
 *   `{:db/valueType t :db/cardinality c :db/unique u :db/tupleTypes
 *   [t1 ...]}` shape) -> the SAME `{:value-type _ :cardinality _ :unique _
 *   :tuple-types _}` shape `schema-of` derives from already-installed
 *   datoms, so `transact-with-schema`'s `(merge (schema-of db) schema)`
 *   actually reconciles the two instead of one shape silently shadowing
 *   the other with mismatched keys.
 * 
 *   This fixes a real bug: an inline `{:db/valueType :long}` passed
 *   directly to `transact-with-schema` (never pre-installed via
 *   `install-schema`) was previously a SILENT no-op for value-type
 *   validation -- `effective-schema`'s entry for that attr ended up in the
 *   caller's raw `:db/valueType`-keyed shape, and `(get-in ... [p
 *   :value-type])` looked for a key (`:value-type`) that was never there,
 *   returning `nil` and skipping the check entirely.
 */
kotobase_peer.core.normalize_inline_schema = (function kotobase_peer$core$normalize_inline_schema(schema){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__11608){
var vec__11609 = p__11608;
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11609,(0),null);
var decl = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11609,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value-type","value-type",576005757),(function (){var G__11612 = new cljs.core.Keyword("db","valueType","db/valueType",1827971944).cljs$core$IFn$_invoke$arity$1(decl);
if((G__11612 == null)){
return null;
} else {
return cljs.core.name(G__11612);
}
})(),new cljs.core.Keyword(null,"cardinality","cardinality",-104971109),(function (){var or__5162__auto__ = (function (){var G__11613 = new cljs.core.Keyword("db","cardinality","db/cardinality",-104975659).cljs$core$IFn$_invoke$arity$1(decl);
if((G__11613 == null)){
return null;
} else {
return cljs.core.name(G__11613);
}
})();
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "many";
}
})(),new cljs.core.Keyword(null,"unique","unique",329397282),(function (){var G__11614 = new cljs.core.Keyword("db","unique","db/unique",329396388).cljs$core$IFn$_invoke$arity$1(decl);
if((G__11614 == null)){
return null;
} else {
return cljs.core.name(G__11614);
}
})(),new cljs.core.Keyword(null,"tuple-types","tuple-types",389454381),(function (){var G__11615 = new cljs.core.Keyword("db","tupleTypes","db/tupleTypes",1512507626).cljs$core$IFn$_invoke$arity$1(decl);
if((G__11615 == null)){
return null;
} else {
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11607_SHARP_){
if((p1__11607_SHARP_ instanceof cljs.core.Keyword)){
return cljs.core.name(p1__11607_SHARP_);
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__11607_SHARP_));
}
}),G__11615);
}
})()], null)], null);
})),schema);
});
/**
 * Like `transact`, but OPT-IN schema enforcement (plain `transact` is
 *   completely unchanged -- every existing caller keeps working exactly as
 *   before): validates every tx-data item against `schema` (merged with
 *   whatever `schema-of` already derives from `db`, so a caller can declare
 *   brand-new attributes in the very same call that writes their first
 *   data, Datomic's own "schema is just a transaction too" idiom) BEFORE
 *   applying any of them.
 *  - an attribute with no schema entry (and not `bootstrap-attrs`, which
 *    describe schema itself and need none) throws -- Datomic's own
 *    "attribute must be installed before use" discipline.
 *  - a declared `:value-type` mismatch (checked against the ORIGINAL
 *    value, before `->quad`'s string coercion -- see `raw-triple`)
 *    throws.
 *  - a declared `:cardinality "one"` attribute automatically retracts
 *    any PRIOR value(s) for that `(s, p)` pair before asserting the new
 *    one -- this fn's own job, NOT `arrangement.core/assert-quad`'s
 *    (arrangement stays cardinality-agnostic per its own ns docstring;
 *    cardinality is a POLICY layered on top here, the same way
 *    `visible?`/`blind-fn`/`encrypt-fn` are layered rather than baked
 *    into arrangement).
 *  - a declared `:unique "identity"`/`"value"` attribute throws if
 *    the `(attr, value)` pair already belongs to a DIFFERENT entity.
 *   Applied in tx-data order against the RUNNING db, so a later item can
 *   rely on an earlier item's cardinality-one retraction having already
 *   happened.
 */
kotobase_peer.core.transact_with_schema = (function kotobase_peer$core$transact_with_schema(var_args){
var G__11617 = arguments.length;
switch (G__11617) {
case 3:
return kotobase_peer.core.transact_with_schema.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return kotobase_peer.core.transact_with_schema.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.transact_with_schema.cljs$core$IFn$_invoke$arity$3 = (function (db,tx_data,schema){
return kotobase_peer.core.transact_with_schema.cljs$core$IFn$_invoke$arity$4(db,tx_data,ipld.core.link_QMARK_,schema);
}));

(kotobase_peer.core.transact_with_schema.cljs$core$IFn$_invoke$arity$4 = (function (db,tx_data,ref_QMARK_,schema){
var effective_schema = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kotobase_peer.core.schema_of(db),kotobase_peer.core.normalize_inline_schema(schema)], 0));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db__$1,item){
var vec__11618 = kotobase_peer.core.raw_triple(item);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11618,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11618,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11618,(2),null);
if(((cljs.core.contains_QMARK_(kotobase_peer.core.bootstrap_attrs,p)) || (cljs.core.contains_QMARK_(effective_schema,p)))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: unknown attribute -- no schema declared (see install-schema)",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"attr","attr",-604132353),p], null));
}

var temp__5825__auto___12065 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(effective_schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,new cljs.core.Keyword(null,"value-type","value-type",576005757)], null));
if(cljs.core.truth_(temp__5825__auto___12065)){
var vt_12066 = temp__5825__auto___12065;
kotobase_peer.core.validate_value_type_BANG_(p,vt_12066,o,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(effective_schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,new cljs.core.Keyword(null,"tuple-types","tuple-types",389454381)], null)));
} else {
}

if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["value",null,"identity",null], null), null),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(effective_schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,new cljs.core.Keyword(null,"unique","unique",329397282)], null)))){
var quad_o_12067 = kotobase_peer.core.__GT_quad_value(o);
var existing_12068 = arrangement.core.by_predicate_value(db__$1,p,quad_o_12067);
if(((cljs.core.seq(existing_12068)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(existing_12068,cljs.core.PersistentHashSet.createAsIfByAssoc([s]))))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: unique attribute violation -- value already belongs to a different entity",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"attr","attr",-604132353),p,new cljs.core.Keyword(null,"value","value",305978217),quad_o_12067,new cljs.core.Keyword(null,"existing","existing",-340796094),existing_12068], null));
} else {
}
} else {
}

var db__$2 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("one",cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(effective_schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,new cljs.core.Keyword(null,"cardinality","cardinality",-104971109)], null),"many")))?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db__$2,old_o){
return arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3(db__$2,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),old_o], null),ref_QMARK_);
}),db__$1,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(arrangement.core.entity_attrs(db__$1,s),p,cljs.core.PersistentHashSet.EMPTY),kotobase_peer.core.__GT_quad_value(o))):db__$1);
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(db__$2,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),kotobase_peer.core.__GT_quad_value(o)], null),ref_QMARK_);
}),db,tx_data);
}));

(kotobase_peer.core.transact_with_schema.cljs$lang$maxFixedArity = 4);

/**
 * Like `transact`, but returns a Datomic-shaped tx-report --
 * `{:db-before :db-after :tx-data}` -- instead of the bare new db value.
 * No `:tempids` (see `commit-with-report!`'s docstring for why).
 */
kotobase_peer.core.transact_with_report = (function kotobase_peer$core$transact_with_report(var_args){
var G__11622 = arguments.length;
switch (G__11622) {
case 2:
return kotobase_peer.core.transact_with_report.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.transact_with_report.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.transact_with_report.cljs$core$IFn$_invoke$arity$2 = (function (db,tx_data){
return kotobase_peer.core.transact_with_report.cljs$core$IFn$_invoke$arity$3(db,tx_data,ipld.core.link_QMARK_);
}));

(kotobase_peer.core.transact_with_report.cljs$core$IFn$_invoke$arity$3 = (function (db,tx_data,ref_QMARK_){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"db-before","db-before",-553691536),db,new cljs.core.Keyword(null,"db-after","db-after",-571884666),kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$3(db,tx_data,ref_QMARK_),new cljs.core.Keyword(null,"tx-data","tx-data",934159761),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.__GT_quad,tx_data)], null);
}));

(kotobase_peer.core.transact_with_report.cljs$lang$maxFixedArity = 3);

/**
 * Datomic's `with`: apply `tx-data` to `db` SPECULATIVELY and return the
 * tx-report -- a pure function, db value in, `{:db-before :db-after
 * :tx-data}` out, nothing persisted anywhere (no `put!`/`chain` touched
 * at all). This substrate's `transact`/`transact-with-report` already
 * ARE exactly this -- a hot db value in, a new hot db value out, no
 * persistence -- so `with` is simply that mechanism under Datomic's own
 * name, for a caller specifically looking for it.
 */
kotobase_peer.core.with$ = (function kotobase_peer$core$with(var_args){
var G__11624 = arguments.length;
switch (G__11624) {
case 2:
return kotobase_peer.core.with$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.with$.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.with$.cljs$core$IFn$_invoke$arity$2 = (function (db,tx_data){
return kotobase_peer.core.transact_with_report.cljs$core$IFn$_invoke$arity$2(db,tx_data);
}));

(kotobase_peer.core.with$.cljs$core$IFn$_invoke$arity$3 = (function (db,tx_data,ref_QMARK_){
return kotobase_peer.core.transact_with_report.cljs$core$IFn$_invoke$arity$3(db,tx_data,ref_QMARK_);
}));

(kotobase_peer.core.with$.cljs$lang$maxFixedArity = 3);

/**
 * Datafy one Datomic-style entity tx-map `{:db/id e :ns/a v …}` → `[e a v]`
 * datoms (`datom.core/eavt`).
 */
kotobase_peer.core.tx_map__GT_datoms = (function kotobase_peer$core$tx_map__GT_datoms(ent){
return datom.core.eavt(ent);
});
/**
 * Flatten a seq of entity tx-maps into `[e a v]` datoms (`datom.core/eavt`).
 */
kotobase_peer.core.entities__GT_datoms = (function kotobase_peer$core$entities__GT_datoms(entities){
return cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(datom.core.eavt,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([entities], 0)));
});
/**
 * Transact a seq of entity tx-maps into `db`: datafy through the canonical datom
 * model (`entities->datoms`), then `transact`. The peer library's entity-transaction
 * expressed in kotoba's datom representation.
 */
kotobase_peer.core.transact_tx = (function kotobase_peer$core$transact_tx(var_args){
var G__11626 = arguments.length;
switch (G__11626) {
case 2:
return kotobase_peer.core.transact_tx.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.transact_tx.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.transact_tx.cljs$core$IFn$_invoke$arity$2 = (function (db,entities){
return kotobase_peer.core.transact_tx.cljs$core$IFn$_invoke$arity$3(db,entities,ipld.core.link_QMARK_);
}));

(kotobase_peer.core.transact_tx.cljs$core$IFn$_invoke$arity$3 = (function (db,entities,ref_QMARK_){
return kotobase_peer.core.transact.cljs$core$IFn$_invoke$arity$3(db,kotobase_peer.core.entities__GT_datoms(entities),ref_QMARK_);
}));

(kotobase_peer.core.transact_tx.cljs$lang$maxFixedArity = 3);

/**
 * Serialize an arrangement value to the EDN string the kotobase wire uses -- a
 * Link renders as `qs/link->edn`'s `["ipld/link" cid]` form (readable, no
 * custom reader needed), anything else pr-str's directly as before. Matches
 * the shape the pre-existing DataScript-backed `kotobase.engine` (app-aozora)
 * produced, for wire compatibility.
 */
kotobase_peer.core.v__GT_edn = (function kotobase_peer$core$v__GT_edn(v){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arrangement.core.link__GT_edn(v)], 0));
});
/**
 * `datomic.datoms`-shaped rows `{:e :a :v_edn :added}`, AppView-scan compatible
 * (same wire shape as the DataScript-backed `kotobase.engine` this replaces).
 * 
 * `visible?` is REQUIRED (ADR-2607050500: Query is a first-class effect all
 * the way up this stack, `q`'s own precedent -- no permissive default). It is
 * applied as a post-filter over each candidate ROW, i.e. `(visible? {:e :a
 * :v_edn :added})` -- the same `datomic.datoms`-shaped map this fn returns,
 * NOT `arrangement.query`'s `{:s :p :o}` quad shape (`:e`/`:a` name the same
 * positions as `:s`/`:p`, but `:v_edn` is already the wire-encoded EDN string,
 * not the raw decoded value, and `:added` is present too) -- a caller
 * filtering by entity/attribute (the common case: can this actor see this
 * entity, is this attribute public) needs no decoding to do so; a caller
 * that must decide on the raw value can `clojure.edn/read-string` `:v_edn`
 * itself. Pass `(constantly true)` to see everything, as an explicit choice.
 * 
 * 2-arg (`[db visible?]`) → whole-db (:eavt full scan, unchanged). 3-arg
 * additionally honors an optional `{:index :components :limit}` SERVER-SIDE
 * via arrangement's index accessors, so a filtered read (e.g. getBackup by
 * entity, or by [attr value]) materialises ONLY the matching entity/attr
 * instead of the whole graph — the root fix for the deployed wasm worker
 * ignoring index/components_edn/limit and rehydrating the full graph per read
 * (ADR-2607022330 addendum 2).
 * 
 * `:index` ∈ #{:eavt :aevt :avet :vaet} (default :eavt); `:components` is an
 * ordered prefix in that index's key order (:eavt=[e a v], :aevt/:avet=
 * [a …], :vaet=[v a …] -- reverse-reference only, populated for ref-valued
 * quads, see the :vaet case below); values are the opaque strings
 * arrangement stores (the PDS's :db/id for e, `:ns/attr` for a, the stored
 * value string for v). `kotoba-lang/kotobase-client`'s own `datoms` has
 * always documented `:vaet` as a valid index (see its docstring) -- this
 * fn previously had no matching `case` clause AND no default, so any
 * caller actually sending `:vaet` (a documented, not hypothetical, request
 * shape) crashed with an unhandled-case exception instead of a graceful
 * error. Confirmed 2026-07-08, fixed here. `visible?` is applied BEFORE `:limit`
 * is taken, so `:limit` caps the row count the caller actually receives (all
 * of them visible), not the count of raw candidates scanned.
 */
kotobase_peer.core.datoms = (function kotobase_peer$core$datoms(var_args){
var G__11628 = arguments.length;
switch (G__11628) {
case 2:
return kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$2 = (function (db,visible_QMARK_){
return kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$3(db,null,visible_QMARK_);
}));

(kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$3 = (function (db,p__11629,visible_QMARK_){
var map__11630 = p__11629;
var map__11630__$1 = cljs.core.__destructure_map(map__11630);
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11630__$1,new cljs.core.Keyword(null,"index","index",-1531685915));
var components = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11630__$1,new cljs.core.Keyword(null,"components","components",-1073188942));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11630__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var vec__11631 = components;
var c0 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11631,(0),null);
var c1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11631,(1),null);
var triples = (function (){var G__11634 = (function (){var or__5162__auto__ = index;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"eavt","eavt",-666437073);
}
})();
var G__11634__$1 = (((G__11634 instanceof cljs.core.Keyword))?G__11634.fqn:null);
switch (G__11634__$1) {
case "eavt":
if(cljs.core.truth_((function (){var and__5160__auto__ = c0;
if(cljs.core.truth_(and__5160__auto__)){
return c1;
} else {
return and__5160__auto__;
}
})())){
var iter__5649__auto__ = (function kotobase_peer$core$iter__11635(s__11636){
return (new cljs.core.LazySeq(null,(function (){
var s__11636__$1 = s__11636;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11636__$1);
if(temp__5825__auto__){
var s__11636__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11636__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11636__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11638 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11637 = (0);
while(true){
if((i__11637 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11637);
cljs.core.chunk_append(b__11638,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c0,c1,v], null));

var G__12074 = (i__11637 + (1));
i__11637 = G__12074;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11638),kotobase_peer$core$iter__11635(cljs.core.chunk_rest(s__11636__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11638),null);
}
} else {
var v = cljs.core.first(s__11636__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c0,c1,v], null),kotobase_peer$core$iter__11635(cljs.core.rest(s__11636__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(cljs.core.get.cljs$core$IFn$_invoke$arity$3(arrangement.core.entity_attrs(db,c0),c1,cljs.core.PersistentHashSet.EMPTY));
} else {
if(cljs.core.truth_(c0)){
var iter__5649__auto__ = (function kotobase_peer$core$iter__11639(s__11640){
return (new cljs.core.LazySeq(null,(function (){
var s__11640__$1 = s__11640;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11640__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11645 = cljs.core.first(xs__6385__auto__);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11645,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11645,(1),null);
var iterys__5645__auto__ = ((function (s__11640__$1,vec__11645,a,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11639_$_iter__11641(s__11642){
return (new cljs.core.LazySeq(null,((function (s__11640__$1,vec__11645,a,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11642__$1 = s__11642;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11642__$1);
if(temp__5825__auto____$1){
var s__11642__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11642__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11642__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11644 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11643 = (0);
while(true){
if((i__11643 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11643);
cljs.core.chunk_append(b__11644,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c0,a,v], null));

var G__12075 = (i__11643 + (1));
i__11643 = G__12075;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11644),kotobase_peer$core$iter__11639_$_iter__11641(cljs.core.chunk_rest(s__11642__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11644),null);
}
} else {
var v = cljs.core.first(s__11642__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c0,a,v], null),kotobase_peer$core$iter__11639_$_iter__11641(cljs.core.rest(s__11642__$2)));
}
} else {
return null;
}
break;
}
});})(s__11640__$1,vec__11645,a,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11640__$1,vec__11645,a,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11639(cljs.core.rest(s__11640__$1)));
} else {
var G__12076 = cljs.core.rest(s__11640__$1);
s__11640__$1 = G__12076;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(arrangement.core.entity_attrs(db,c0));
} else {
var iter__5649__auto__ = (function kotobase_peer$core$iter__11648(s__11649){
return (new cljs.core.LazySeq(null,(function (){
var s__11649__$1 = s__11649;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11649__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11656 = cljs.core.first(xs__6385__auto__);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11656,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11656,(1),null);
var iterys__5645__auto__ = ((function (s__11649__$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11648_$_iter__11650(s__11651){
return (new cljs.core.LazySeq(null,((function (s__11649__$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11651__$1 = s__11651;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11651__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__11659 = cljs.core.first(xs__6385__auto____$1);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11659,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11659,(1),null);
var iterys__5645__auto__ = ((function (s__11651__$1,s__11649__$1,vec__11659,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11648_$_iter__11650_$_iter__11652(s__11653){
return (new cljs.core.LazySeq(null,((function (s__11651__$1,s__11649__$1,vec__11659,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11653__$1 = s__11653;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__11653__$1);
if(temp__5825__auto____$2){
var s__11653__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__11653__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11653__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11655 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11654 = (0);
while(true){
if((i__11654 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11654);
cljs.core.chunk_append(b__11655,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null));

var G__12077 = (i__11654 + (1));
i__11654 = G__12077;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11655),kotobase_peer$core$iter__11648_$_iter__11650_$_iter__11652(cljs.core.chunk_rest(s__11653__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11655),null);
}
} else {
var v = cljs.core.first(s__11653__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null),kotobase_peer$core$iter__11648_$_iter__11650_$_iter__11652(cljs.core.rest(s__11653__$2)));
}
} else {
return null;
}
break;
}
});})(s__11651__$1,s__11649__$1,vec__11659,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11651__$1,s__11649__$1,vec__11659,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11648_$_iter__11650(cljs.core.rest(s__11651__$1)));
} else {
var G__12078 = cljs.core.rest(s__11651__$1);
s__11651__$1 = G__12078;
continue;
}
} else {
return null;
}
break;
}
});})(s__11649__$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11649__$1,vec__11656,e,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11648(cljs.core.rest(s__11649__$1)));
} else {
var G__12079 = cljs.core.rest(s__11649__$1);
s__11649__$1 = G__12079;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db));

}
}

break;
case "aevt":
if(cljs.core.truth_(c0)){
var iter__5649__auto__ = (function kotobase_peer$core$iter__11662(s__11663){
return (new cljs.core.LazySeq(null,(function (){
var s__11663__$1 = s__11663;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11663__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11668 = cljs.core.first(xs__6385__auto__);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11668,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11668,(1),null);
var iterys__5645__auto__ = ((function (s__11663__$1,vec__11668,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11662_$_iter__11664(s__11665){
return (new cljs.core.LazySeq(null,((function (s__11663__$1,vec__11668,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11665__$1 = s__11665;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11665__$1);
if(temp__5825__auto____$1){
var s__11665__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11665__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11665__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11667 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11666 = (0);
while(true){
if((i__11666 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11666);
cljs.core.chunk_append(b__11667,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c0,v], null));

var G__12080 = (i__11666 + (1));
i__11666 = G__12080;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11667),kotobase_peer$core$iter__11662_$_iter__11664(cljs.core.chunk_rest(s__11665__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11667),null);
}
} else {
var v = cljs.core.first(s__11665__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c0,v], null),kotobase_peer$core$iter__11662_$_iter__11664(cljs.core.rest(s__11665__$2)));
}
} else {
return null;
}
break;
}
});})(s__11663__$1,vec__11668,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11663__$1,vec__11668,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11662(cljs.core.rest(s__11663__$1)));
} else {
var G__12081 = cljs.core.rest(s__11663__$1);
s__11663__$1 = G__12081;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(arrangement.core.by_predicate(db,c0));
} else {
var iter__5649__auto__ = (function kotobase_peer$core$iter__11671(s__11672){
return (new cljs.core.LazySeq(null,(function (){
var s__11672__$1 = s__11672;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11672__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11679 = cljs.core.first(xs__6385__auto__);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11679,(0),null);
var em = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11679,(1),null);
var iterys__5645__auto__ = ((function (s__11672__$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11671_$_iter__11673(s__11674){
return (new cljs.core.LazySeq(null,((function (s__11672__$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11674__$1 = s__11674;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11674__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__11682 = cljs.core.first(xs__6385__auto____$1);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11682,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11682,(1),null);
var iterys__5645__auto__ = ((function (s__11674__$1,s__11672__$1,vec__11682,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11671_$_iter__11673_$_iter__11675(s__11676){
return (new cljs.core.LazySeq(null,((function (s__11674__$1,s__11672__$1,vec__11682,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11676__$1 = s__11676;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__11676__$1);
if(temp__5825__auto____$2){
var s__11676__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__11676__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11676__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11678 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11677 = (0);
while(true){
if((i__11677 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11677);
cljs.core.chunk_append(b__11678,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null));

var G__12082 = (i__11677 + (1));
i__11677 = G__12082;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11678),kotobase_peer$core$iter__11671_$_iter__11673_$_iter__11675(cljs.core.chunk_rest(s__11676__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11678),null);
}
} else {
var v = cljs.core.first(s__11676__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null),kotobase_peer$core$iter__11671_$_iter__11673_$_iter__11675(cljs.core.rest(s__11676__$2)));
}
} else {
return null;
}
break;
}
});})(s__11674__$1,s__11672__$1,vec__11682,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11674__$1,s__11672__$1,vec__11682,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11671_$_iter__11673(cljs.core.rest(s__11674__$1)));
} else {
var G__12083 = cljs.core.rest(s__11674__$1);
s__11674__$1 = G__12083;
continue;
}
} else {
return null;
}
break;
}
});})(s__11672__$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11672__$1,vec__11679,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(em));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11671(cljs.core.rest(s__11672__$1)));
} else {
var G__12084 = cljs.core.rest(s__11672__$1);
s__11672__$1 = G__12084;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"pso","pso",1415685955).cljs$core$IFn$_invoke$arity$1(db));

}

break;
case "avet":
if(cljs.core.truth_((function (){var and__5160__auto__ = c0;
if(cljs.core.truth_(and__5160__auto__)){
return c1;
} else {
return and__5160__auto__;
}
})())){
var iter__5649__auto__ = (function kotobase_peer$core$iter__11685(s__11686){
return (new cljs.core.LazySeq(null,(function (){
var s__11686__$1 = s__11686;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11686__$1);
if(temp__5825__auto__){
var s__11686__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11686__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11686__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11688 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11687 = (0);
while(true){
if((i__11687 < size__5648__auto__)){
var e = cljs.core._nth(c__5647__auto__,i__11687);
cljs.core.chunk_append(b__11688,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c0,c1], null));

var G__12085 = (i__11687 + (1));
i__11687 = G__12085;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11688),kotobase_peer$core$iter__11685(cljs.core.chunk_rest(s__11686__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11688),null);
}
} else {
var e = cljs.core.first(s__11686__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c0,c1], null),kotobase_peer$core$iter__11685(cljs.core.rest(s__11686__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(arrangement.core.by_predicate_value(db,c0,c1));
} else {
if(cljs.core.truth_(c0)){
var iter__5649__auto__ = (function kotobase_peer$core$iter__11689(s__11690){
return (new cljs.core.LazySeq(null,(function (){
var s__11690__$1 = s__11690;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11690__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11695 = cljs.core.first(xs__6385__auto__);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11695,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11695,(1),null);
var iterys__5645__auto__ = ((function (s__11690__$1,vec__11695,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11689_$_iter__11691(s__11692){
return (new cljs.core.LazySeq(null,((function (s__11690__$1,vec__11695,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11692__$1 = s__11692;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11692__$1);
if(temp__5825__auto____$1){
var s__11692__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11692__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11692__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11694 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11693 = (0);
while(true){
if((i__11693 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11693);
cljs.core.chunk_append(b__11694,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c0,v], null));

var G__12086 = (i__11693 + (1));
i__11693 = G__12086;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11694),kotobase_peer$core$iter__11689_$_iter__11691(cljs.core.chunk_rest(s__11692__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11694),null);
}
} else {
var v = cljs.core.first(s__11692__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c0,v], null),kotobase_peer$core$iter__11689_$_iter__11691(cljs.core.rest(s__11692__$2)));
}
} else {
return null;
}
break;
}
});})(s__11690__$1,vec__11695,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11690__$1,vec__11695,e,vs,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11689(cljs.core.rest(s__11690__$1)));
} else {
var G__12087 = cljs.core.rest(s__11690__$1);
s__11690__$1 = G__12087;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(arrangement.core.by_predicate(db,c0));
} else {
var iter__5649__auto__ = (function kotobase_peer$core$iter__11698(s__11699){
return (new cljs.core.LazySeq(null,(function (){
var s__11699__$1 = s__11699;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11699__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11706 = cljs.core.first(xs__6385__auto__);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11706,(0),null);
var em = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11706,(1),null);
var iterys__5645__auto__ = ((function (s__11699__$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11698_$_iter__11700(s__11701){
return (new cljs.core.LazySeq(null,((function (s__11699__$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11701__$1 = s__11701;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11701__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__11709 = cljs.core.first(xs__6385__auto____$1);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11709,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11709,(1),null);
var iterys__5645__auto__ = ((function (s__11701__$1,s__11699__$1,vec__11709,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11698_$_iter__11700_$_iter__11702(s__11703){
return (new cljs.core.LazySeq(null,((function (s__11701__$1,s__11699__$1,vec__11709,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11703__$1 = s__11703;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__11703__$1);
if(temp__5825__auto____$2){
var s__11703__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__11703__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11703__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11705 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11704 = (0);
while(true){
if((i__11704 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11704);
cljs.core.chunk_append(b__11705,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null));

var G__12088 = (i__11704 + (1));
i__11704 = G__12088;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11705),kotobase_peer$core$iter__11698_$_iter__11700_$_iter__11702(cljs.core.chunk_rest(s__11703__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11705),null);
}
} else {
var v = cljs.core.first(s__11703__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null),kotobase_peer$core$iter__11698_$_iter__11700_$_iter__11702(cljs.core.rest(s__11703__$2)));
}
} else {
return null;
}
break;
}
});})(s__11701__$1,s__11699__$1,vec__11709,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11701__$1,s__11699__$1,vec__11709,e,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11698_$_iter__11700(cljs.core.rest(s__11701__$1)));
} else {
var G__12089 = cljs.core.rest(s__11701__$1);
s__11701__$1 = G__12089;
continue;
}
} else {
return null;
}
break;
}
});})(s__11699__$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11699__$1,vec__11706,a,em,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(em));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11698(cljs.core.rest(s__11699__$1)));
} else {
var G__12090 = cljs.core.rest(s__11699__$1);
s__11699__$1 = G__12090;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"pso","pso",1415685955).cljs$core$IFn$_invoke$arity$1(db));

}
}

break;
case "vaet":
if(cljs.core.truth_((function (){var and__5160__auto__ = c0;
if(cljs.core.truth_(and__5160__auto__)){
return c1;
} else {
return and__5160__auto__;
}
})())){
var iter__5649__auto__ = (function kotobase_peer$core$iter__11712(s__11713){
return (new cljs.core.LazySeq(null,(function (){
var s__11713__$1 = s__11713;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11713__$1);
if(temp__5825__auto__){
var s__11713__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11713__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11713__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11715 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11714 = (0);
while(true){
if((i__11714 < size__5648__auto__)){
var e = cljs.core._nth(c__5647__auto__,i__11714);
cljs.core.chunk_append(b__11715,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c1,c0], null));

var G__12091 = (i__11714 + (1));
i__11714 = G__12091;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11715),kotobase_peer$core$iter__11712(cljs.core.chunk_rest(s__11713__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11715),null);
}
} else {
var e = cljs.core.first(s__11713__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,c1,c0], null),kotobase_peer$core$iter__11712(cljs.core.rest(s__11713__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(cljs.core.get.cljs$core$IFn$_invoke$arity$3(arrangement.core.refs_to(db,c0),c1,cljs.core.PersistentHashSet.EMPTY));
} else {
if(cljs.core.truth_(c0)){
var iter__5649__auto__ = (function kotobase_peer$core$iter__11716(s__11717){
return (new cljs.core.LazySeq(null,(function (){
var s__11717__$1 = s__11717;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11717__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11722 = cljs.core.first(xs__6385__auto__);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11722,(0),null);
var es = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11722,(1),null);
var iterys__5645__auto__ = ((function (s__11717__$1,vec__11722,a,es,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11716_$_iter__11718(s__11719){
return (new cljs.core.LazySeq(null,((function (s__11717__$1,vec__11722,a,es,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11719__$1 = s__11719;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11719__$1);
if(temp__5825__auto____$1){
var s__11719__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11719__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11719__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11721 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11720 = (0);
while(true){
if((i__11720 < size__5648__auto__)){
var e = cljs.core._nth(c__5647__auto__,i__11720);
cljs.core.chunk_append(b__11721,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,c0], null));

var G__12092 = (i__11720 + (1));
i__11720 = G__12092;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11721),kotobase_peer$core$iter__11716_$_iter__11718(cljs.core.chunk_rest(s__11719__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11721),null);
}
} else {
var e = cljs.core.first(s__11719__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,c0], null),kotobase_peer$core$iter__11716_$_iter__11718(cljs.core.rest(s__11719__$2)));
}
} else {
return null;
}
break;
}
});})(s__11717__$1,vec__11722,a,es,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11717__$1,vec__11722,a,es,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(es));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11716(cljs.core.rest(s__11717__$1)));
} else {
var G__12093 = cljs.core.rest(s__11717__$1);
s__11717__$1 = G__12093;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(arrangement.core.refs_to(db,c0));
} else {
var iter__5649__auto__ = (function kotobase_peer$core$iter__11725(s__11726){
return (new cljs.core.LazySeq(null,(function (){
var s__11726__$1 = s__11726;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11726__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11733 = cljs.core.first(xs__6385__auto__);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11733,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11733,(1),null);
var iterys__5645__auto__ = ((function (s__11726__$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11725_$_iter__11727(s__11728){
return (new cljs.core.LazySeq(null,((function (s__11726__$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11728__$1 = s__11728;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11728__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__11736 = cljs.core.first(xs__6385__auto____$1);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11736,(0),null);
var es = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11736,(1),null);
var iterys__5645__auto__ = ((function (s__11728__$1,s__11726__$1,vec__11736,a,es,xs__6385__auto____$1,temp__5825__auto____$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function kotobase_peer$core$iter__11725_$_iter__11727_$_iter__11729(s__11730){
return (new cljs.core.LazySeq(null,((function (s__11728__$1,s__11726__$1,vec__11736,a,es,xs__6385__auto____$1,temp__5825__auto____$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit){
return (function (){
var s__11730__$1 = s__11730;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__11730__$1);
if(temp__5825__auto____$2){
var s__11730__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__11730__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11730__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11732 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11731 = (0);
while(true){
if((i__11731 < size__5648__auto__)){
var e = cljs.core._nth(c__5647__auto__,i__11731);
cljs.core.chunk_append(b__11732,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,o], null));

var G__12094 = (i__11731 + (1));
i__11731 = G__12094;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11732),kotobase_peer$core$iter__11725_$_iter__11727_$_iter__11729(cljs.core.chunk_rest(s__11730__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11732),null);
}
} else {
var e = cljs.core.first(s__11730__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,o], null),kotobase_peer$core$iter__11725_$_iter__11727_$_iter__11729(cljs.core.rest(s__11730__$2)));
}
} else {
return null;
}
break;
}
});})(s__11728__$1,s__11726__$1,vec__11736,a,es,xs__6385__auto____$1,temp__5825__auto____$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11728__$1,s__11726__$1,vec__11736,a,es,xs__6385__auto____$1,temp__5825__auto____$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(es));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11725_$_iter__11727(cljs.core.rest(s__11728__$1)));
} else {
var G__12095 = cljs.core.rest(s__11728__$1);
s__11728__$1 = G__12095;
continue;
}
} else {
return null;
}
break;
}
});})(s__11726__$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
,null,null));
});})(s__11726__$1,vec__11733,o,pm,xs__6385__auto__,temp__5825__auto__,G__11634,G__11634__$1,vec__11631,c0,c1,map__11630,map__11630__$1,index,components,limit))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11725(cljs.core.rest(s__11726__$1)));
} else {
var G__12096 = cljs.core.rest(s__11726__$1);
s__11726__$1 = G__12096;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"ocp","ocp",448959679).cljs$core$IFn$_invoke$arity$1(db));

}
}

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11634__$1))));

}
})();
var rows = (function (){var iter__5649__auto__ = (function kotobase_peer$core$iter__11739(s__11740){
return (new cljs.core.LazySeq(null,(function (){
var s__11740__$1 = s__11740;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11740__$1);
if(temp__5825__auto__){
var s__11740__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11740__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11740__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11742 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11741 = (0);
while(true){
if((i__11741 < size__5648__auto__)){
var vec__11743 = cljs.core._nth(c__5647__auto__,i__11741);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11743,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11743,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11743,(2),null);
cljs.core.chunk_append(b__11742,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(v),new cljs.core.Keyword(null,"added","added",2057651688),true], null));

var G__12097 = (i__11741 + (1));
i__11741 = G__12097;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11742),kotobase_peer$core$iter__11739(cljs.core.chunk_rest(s__11740__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11742),null);
}
} else {
var vec__11746 = cljs.core.first(s__11740__$2);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11746,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11746,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11746,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(v),new cljs.core.Keyword(null,"added","added",2057651688),true], null),kotobase_peer$core$iter__11739(cljs.core.rest(s__11740__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(triples);
})();
var rows__$1 = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(visible_QMARK_,rows);
var rows__$2 = (function (){var G__11749 = rows__$1;
if(cljs.core.truth_(limit)){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(limit,G__11749);
} else {
return G__11749;
}
})();
return cljs.core.vec(rows__$2);
}));

(kotobase_peer.core.datoms.cljs$lang$maxFixedArity = 3);

/**
 * `datomic.q`-equivalent: `pattern` is `[s p o]` (nil = wildcard), routed to
 * the matching index via `arrangement.query`. Returns a set of `{:s :p :o}`
 * quads. NOTE: triple-pattern only, no join across clauses -- see `query`
 * below for that.
 * 
 * `visible?` is REQUIRED, cascaded straight from `arrangement.query/query`
 * (ADR-2607050500: Query is a first-class effect all the way up this
 * stack, not just at arrangement's layer) -- pass `(constantly true)` to
 * see everything, as an explicit choice.
 */
kotobase_peer.core.q = (function kotobase_peer$core$q(db,pattern,visible_QMARK_){
return arrangement.query.query(db,pattern,visible_QMARK_);
});
kotobase_peer.core.datalog_var_QMARK_ = (function kotobase_peer$core$datalog_var_QMARK_(x){
return (((x instanceof cljs.core.Symbol)) && (clojure.string.starts_with_QMARK_(cljs.core.name(x),"?")));
});
kotobase_peer.core.reorderable_triple_QMARK_ = (function kotobase_peer$core$reorderable_triple_QMARK_(clause){
return ((cljs.core.vector_QMARK_(clause)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(clause))));
});
kotobase_peer.core.supplied_cardinality = (function kotobase_peer$core$supplied_cardinality(query_statistics,statistics_scope,query_epoch,max_statistics_age,pattern){
var scope = (function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(query_statistics,"visibility-scope");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"visibility-scope","visibility-scope",176238632).cljs$core$IFn$_invoke$arity$1(query_statistics);
}
})();
var statistics_epoch = (function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(query_statistics,"epoch");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"epoch","epoch",1435633666).cljs$core$IFn$_invoke$arity$1(query_statistics);
}
})();
var clauses = (function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(query_statistics,"clauses");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"clauses","clauses",1454841241).cljs$core$IFn$_invoke$arity$1(query_statistics);
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(statistics_scope,scope);
if(and__5160__auto__){
return (kotobase_peer.statistics.query_statistics_fresh_QMARK_.cljs$core$IFn$_invoke$arity$3 ? kotobase_peer.statistics.query_statistics_fresh_QMARK_.cljs$core$IFn$_invoke$arity$3(statistics_epoch,query_epoch,max_statistics_age) : kotobase_peer.statistics.query_statistics_fresh_QMARK_.call(null,statistics_epoch,query_epoch,max_statistics_age));
} else {
return and__5160__auto__;
}
})())){
return cljs.core.some((function (statistic){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(pattern,(function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(statistic,"pattern");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(statistic);
}
})())){
var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(statistic,"rows");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"rows","rows",850049680).cljs$core$IFn$_invoke$arity$1(statistic);
}
} else {
return null;
}
}),clauses);
} else {
return null;
}
});
/**
 * Compile a safe cost-ordered plan for a plain conjunctive Datalog query.
 * Positive triple clauses commute, so their visible cardinalities can drive
 * `plan-clause-order`. Queries containing negation, functions, rules, or `or`
 * retain source order because those forms have binding/safety semantics.
 */
kotobase_peer.core.datalog_query_plan = (function kotobase_peer$core$datalog_query_plan(var_args){
var G__11751 = arguments.length;
switch (G__11751) {
case 3:
return kotobase_peer.core.datalog_query_plan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return kotobase_peer.core.datalog_query_plan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.datalog_query_plan.cljs$core$IFn$_invoke$arity$3 = (function (db,query,visible_QMARK_){
return kotobase_peer.core.datalog_query_plan.cljs$core$IFn$_invoke$arity$4(db,query,visible_QMARK_,cljs.core.PersistentVector.EMPTY);
}));

(kotobase_peer.core.datalog_query_plan.cljs$core$IFn$_invoke$arity$4 = (function (db,query,visible_QMARK_,inputs){
var where = new cljs.core.Keyword(null,"where","where",-2044795965).cljs$core$IFn$_invoke$arity$1(query);
if(cljs.core.every_QMARK_(kotobase_peer.core.reorderable_triple_QMARK_,where)){
var input_vars = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,"$","$",-1580747756,null),null], null), null),(function (){var or__5162__auto__ = new cljs.core.Keyword(null,"in","in",-1531184865).cljs$core$IFn$_invoke$arity$1(query);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})()));
var input_bindings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,input_vars,inputs));
var query_statistics = new cljs.core.Keyword(null,"query-statistics","query-statistics",1589762077).cljs$core$IFn$_invoke$arity$1(query);
var statistics_scope = new cljs.core.Keyword(null,"statistics-scope","statistics-scope",446092183).cljs$core$IFn$_invoke$arity$1(query);
var query_epoch = new cljs.core.Keyword(null,"query-epoch","query-epoch",1366240675).cljs$core$IFn$_invoke$arity$1(query);
var max_statistics_age = new cljs.core.Keyword(null,"max-statistics-age","max-statistics-age",-1672778686).cljs$core$IFn$_invoke$arity$2(query,(0));
var clauses = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (id,clause){
var pattern = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (term){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(term,new cljs.core.Symbol(null,"_","_",-1201019570,null))){
return null;
} else {
if(cljs.core.contains_QMARK_(input_bindings,term)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(input_bindings,term);
} else {
if(kotobase_peer.core.datalog_var_QMARK_(term)){
return null;
} else {
return term;

}
}
}
}),clause);
var supplied = kotobase_peer.core.supplied_cardinality(query_statistics,statistics_scope,query_epoch,max_statistics_age,pattern);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"clause","clause",1479668060),clause,new cljs.core.Keyword(null,"vars","vars",-2046957217),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(kotobase_peer.core.datalog_var_QMARK_),clause),new cljs.core.Keyword(null,"estimated-rows","estimated-rows",1235608148),(((!((supplied == null))))?supplied:arrangement.query.estimate_cardinality(db,pattern)),new cljs.core.Keyword(null,"estimate-source","estimate-source",266808546),(((!((supplied == null))))?new cljs.core.Keyword(null,"materialized-statistics","materialized-statistics",1498712153):new cljs.core.Keyword(null,"index-estimate","index-estimate",-1655994642))], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$0(),where);
var plan = (kotobase_peer.statistics.plan_clause_order.cljs$core$IFn$_invoke$arity$1 ? kotobase_peer.statistics.plan_clause_order.cljs$core$IFn$_invoke$arity$1(clauses) : kotobase_peer.statistics.plan_clause_order.call(null,clauses));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(query,new cljs.core.Keyword(null,"where","where",-2044795965),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"clause","clause",1479668060),plan),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"clause-cardinality","clause-cardinality",-1709612991),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"clause","clause",1479668060),new cljs.core.Keyword(null,"estimated-rows","estimated-rows",1235608148))),plan)], 0)),new cljs.core.Keyword(null,"plan","plan",1118952668),plan,new cljs.core.Keyword(null,"optimized?","optimized?",-1451961621),true], null);
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),query,new cljs.core.Keyword(null,"plan","plan",1118952668),cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (id,clause){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"clause","clause",1479668060),clause,new cljs.core.Keyword(null,"step","step",1288888124),id], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$0(),where),new cljs.core.Keyword(null,"optimized?","optimized?",-1451961621),false], null);
}
}));

(kotobase_peer.core.datalog_query_plan.cljs$lang$maxFixedArity = 4);

/**
 * `datomic.api/q`-equivalent: `{:find [?var ...] :in [?param ...] :where
 * [[e a v] ...] :rules [...]}` conjunctive multi-clause join over
 * `arrangement.datalog/q` (ADR-2607061200 staged Datalog roadmap + query-
 * language follow-up). `:where` clauses may be `(not [e a v])`,
 * `(rule-name ?arg ...)`, `[(fn-sym arg...)]` / `[(fn-sym arg...)
 * result-var]` (a whitelisted predicate/function call), or
 * `(or clause ...)` / `(or-join [?shared ...] clause ...)`. `:find`
 * elements may be `(count ?v)`/`(count-distinct ?v)`/`(sum ?v)`/
 * `(avg ?v)`/`(min ?v)`/`(max ?v)` alongside plain variables, and
 * `:rules` may define recursive relations (`[[(rule-name ?param ...)
 * clause ...] ...]`, evaluated to a least fixpoint via semi-naive
 * iteration). `inputs` (optional 4th arg, positional, matching `:in`'s
 * order) supplies extra query parameters. See `arrangement.datalog`'s
 * ns docstring for the full grammar and for why negation/recursion/
 * `or` are all safe against `visible?` (enforced in arrangement, this
 * fn is a straight passthrough). Returns a set of `:find`-ordered
 * vectors. `visible?` is REQUIRED, same convention as `q` above.
 */
kotobase_peer.core.query = (function kotobase_peer$core$query(var_args){
var G__11753 = arguments.length;
switch (G__11753) {
case 3:
return kotobase_peer.core.query.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return kotobase_peer.core.query.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.query.cljs$core$IFn$_invoke$arity$3 = (function (db,find_PLUS_where,visible_QMARK_){
return kotobase_peer.core.query.cljs$core$IFn$_invoke$arity$4(db,find_PLUS_where,visible_QMARK_,cljs.core.PersistentVector.EMPTY);
}));

(kotobase_peer.core.query.cljs$core$IFn$_invoke$arity$4 = (function (db,find_PLUS_where,visible_QMARK_,inputs){
var map__11754 = kotobase_peer.core.datalog_query_plan.cljs$core$IFn$_invoke$arity$4(db,find_PLUS_where,visible_QMARK_,inputs);
var map__11754__$1 = cljs.core.__destructure_map(map__11754);
var planned_query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11754__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
return arrangement.datalog.q.cljs$core$IFn$_invoke$arity$4(db,planned_query,visible_QMARK_,inputs);
}));

(kotobase_peer.core.query.cljs$lang$maxFixedArity = 4);

kotobase_peer.core.pull_wildcard_QMARK_ = (function kotobase_peer$core$pull_wildcard_QMARK_(attr){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(attr,new cljs.core.Symbol(null,"*","*",345799209,null));
});
kotobase_peer.core.pull_map_spec_QMARK_ = (function kotobase_peer$core$pull_map_spec_QMARK_(attr){
return cljs.core.map_QMARK_(attr);
});
kotobase_peer.core.reverse_attr_QMARK_ = (function kotobase_peer$core$reverse_attr_QMARK_(a){
return clojure.string.starts_with_QMARK_(a,"_");
});
kotobase_peer.core.reverse_attr_name = (function kotobase_peer$core$reverse_attr_name(a){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(a,(1));
});
/**
 * Pull entity `s` per pull-pattern `pattern` (a vector of pull-attrs, see
 *   `pull`'s docstring). `seen` is the set of entity ids already being
 *   expanded on this recursion path -- an entity already on the path is
 *   returned as `{}` rather than re-expanded, so a cyclic graph can never
 *   loop forever, REGARDLESS of whether the caller wrote an explicit `n`/
 *   `'...` recursion limit or not (unconditional cycle safety, not just a
 *   courtesy for well-behaved callers).
 */
kotobase_peer.core.pull1 = (function kotobase_peer$core$pull1(db,s,pattern,seen){
var attrs = arrangement.core.entity_attrs(db,s);
var seen_SINGLEQUOTE_ = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(seen,s);
var expand = (function (ref,sub_pattern){
if(cljs.core.contains_QMARK_(seen_SINGLEQUOTE_,ref)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return (kotobase_peer.core.pull1.cljs$core$IFn$_invoke$arity$4 ? kotobase_peer.core.pull1.cljs$core$IFn$_invoke$arity$4(db,ref,sub_pattern,seen_SINGLEQUOTE_) : kotobase_peer.core.pull1.call(null,db,ref,sub_pattern,seen_SINGLEQUOTE_));
}
});
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,attr){
if(kotobase_peer.core.pull_wildcard_QMARK_(attr)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([acc,attrs], 0));
} else {
if(((typeof attr === 'string') && (kotobase_peer.core.reverse_attr_QMARK_(attr)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,attr,cljs.core.get.cljs$core$IFn$_invoke$arity$3(arrangement.core.refs_to(db,s),kotobase_peer.core.reverse_attr_name(attr),cljs.core.PersistentHashSet.EMPTY));
} else {
if(typeof attr === 'string'){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,attr,cljs.core.get.cljs$core$IFn$_invoke$arity$3(attrs,attr,cljs.core.PersistentHashSet.EMPTY));
} else {
if(kotobase_peer.core.pull_map_spec_QMARK_(attr)){
var vec__11757 = cljs.core.first(attr);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11757,(0),null);
var spec = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11757,(1),null);
var reverse_QMARK_ = kotobase_peer.core.reverse_attr_QMARK_(a);
var refs = ((reverse_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$3(arrangement.core.refs_to(db,s),kotobase_peer.core.reverse_attr_name(a),cljs.core.PersistentHashSet.EMPTY):cljs.core.get.cljs$core$IFn$_invoke$arity$3(attrs,a,cljs.core.PersistentHashSet.EMPTY));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,a,((cljs.core.vector_QMARK_(spec))?cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__11755_SHARP_){
return expand(p1__11755_SHARP_,spec);
})),refs):((((cljs.core.integer_QMARK_(spec)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(spec,new cljs.core.Symbol(null,"...","...",-1926939749,null)))))?((((cljs.core.integer_QMARK_(spec)) && ((spec <= (0)))))?refs:cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__11756_SHARP_){
return expand(p1__11756_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",345799209,null),cljs.core.PersistentArrayMap.createAsIfByAssoc([a,((cljs.core.integer_QMARK_(spec))?(spec - (1)):new cljs.core.Symbol(null,"...","...",-1926939749,null))])], null));
})),refs)):acc
)));
} else {
return acc;

}
}
}
}
}),cljs.core.PersistentArrayMap.EMPTY,pattern);
});
/**
 * `datomic.pull`-equivalent for entity `s`. 2-arg form is unchanged: flat
 * `{p #{o...}}` (arrangement has no cardinality tracking, so every
 * attribute is multi-valued -- a caller expecting single-valued Datomic
 * pull semantics must pick e.g. `first`).
 * 
 * 3-arg form takes a Datomic-shaped pull PATTERN, a vector of pull-attrs:
 *   - a plain attr string        -> that attr's value set, flat (as above)
 *   - `'*`                        -> every attr the entity has (wildcard)
 *   - `"_attr"` (leading `_`)   -> reverse nav: every entity referencing
 *                                    THIS one via `attr` (`refs`/VAET-style),
 *                                    flat
 *   - `{attr [sub-pattern ...]}`  -> nested pull: treat attr's value(s) (or,
 *                                    for `"_attr"`, its referrers) as
 *                                    entity ids and pull each with
 *                                    sub-pattern
 *   - `{attr n}` / `{attr '...}`  -> recursive wildcard pull through attr,
 *                                    `n` levels deep or unlimited -- cycle-
 *                                    safe either way (see `pull1`), so a
 *                                    graph cycle can't loop forever even
 *                                    with `'...`.
 */
kotobase_peer.core.pull = (function kotobase_peer$core$pull(var_args){
var G__11761 = arguments.length;
switch (G__11761) {
case 2:
return kotobase_peer.core.pull.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.pull.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.pull.cljs$core$IFn$_invoke$arity$2 = (function (db,s){
return arrangement.core.entity_attrs(db,s);
}));

(kotobase_peer.core.pull.cljs$core$IFn$_invoke$arity$3 = (function (db,s,pattern){
return kotobase_peer.core.pull1(db,s,pattern,cljs.core.PersistentHashSet.EMPTY);
}));

(kotobase_peer.core.pull.cljs$lang$maxFixedArity = 3);

/**
 * Datomic's `entity`: `pull`'s flat 2-arg form (`{p #{o...}}`) under
 * Datomic's own name, for a caller specifically looking for it. See the
 * ns section comment above for why this is a plain map, not a custom
 * lazy-navigating type -- use `entity-attr` to navigate a ref-valued
 * attribute's values into their own nested entities on demand.
 */
kotobase_peer.core.entity = (function kotobase_peer$core$entity(db,s){
return arrangement.core.entity_attrs(db,s);
});
/**
 * Navigate FROM an already-`entity`/`pull`-ed map at `attr` INTO each of
 * its values as their OWN `entity` -- the explicit lazy-navigation step
 * `entity` itself doesn't take eagerly (see ns section comment). Returns
 * `#{{...} ...}`, one nested entity map per value; a value that was
 * never itself asserted as an entity's own subject simply resolves to
 * `{}` (harmless -- same convention `pull`'s nested-ref form uses).
 */
kotobase_peer.core.entity_attr = (function kotobase_peer$core$entity_attr(db,entity_map,attr){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__11762_SHARP_){
return kotobase_peer.core.entity(db,p1__11762_SHARP_);
})),cljs.core.get.cljs$core$IFn$_invoke$arity$3(entity_map,attr,cljs.core.PersistentHashSet.EMPTY));
});
/**
 * `{p #{s...}}`: every entity `s` that references `ref` via predicate `p`
 * (VAET-style reverse lookup, ADR-2607050200). Only populated for quads
 * whose value was asserted as an `ipld.core/Link` — see `transact`'s default
 * `ref?`. `ref` is the same Link value the referencing quad's `:o` was.
 */
kotobase_peer.core.refs = (function kotobase_peer$core$refs(db,ref){
return arrangement.core.refs_to(db,ref);
});
/**
 * Datomic's `entid`: resolve a caller-given id-or-ident to the entity id.
 * A plain (non-keyword) `id` passes through UNCHANGED -- this substrate's
 * entity ids are already caller-chosen strings (`:db/id "e1"`, a CID, …),
 * never Datomic's auto-assigned longs, so there is no numeric-id
 * resolution step to perform (unlike real Datomic, where a bare id is
 * already the thing `entid` returns and the interesting case is only the
 * ident branch below -- same shape here).
 * 
 * A keyword `id` is resolved via `:db/ident`, asserted on an entity via
 * ordinary `transact` (`{:db/id "e1" :db/ident :my.ns/thing}`) exactly
 * like any other attribute -- `:db/ident` needs no special engine support,
 * the same "schema is just data the db already has" posture
 * `install-schema`/`schema-of` (above) take for attribute schema. Finds
 * the entity `e` such that `[e :db/ident id]` is asserted via a plain
 * triple-pattern `q`. Nothing in this substrate enforces `:db/ident`
 * uniqueness (Datomic itself would via a `:db/unique :db.unique/identity`
 * schema declaration on `:db/ident`, which this substrate has no
 * ENFORCEMENT mechanism for yet, only the schema-as-data description) --
 * if more than one entity happens to assert the same ident, which one
 * `entid` returns is unspecified (`q`'s result is a set, iteration order
 * not guaranteed). Returns nil if no entity has that ident asserted.
 */
kotobase_peer.core.entid = (function kotobase_peer$core$entid(db,id){
if((id instanceof cljs.core.Keyword)){
return cljs.core.some(new cljs.core.Keyword(null,"s","s",1705939918),kotobase_peer.core.q(db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,":db/ident",(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(id))], null),cljs.core.constantly(true)));
} else {
return id;
}
});
/**
 * Datomic's `ident`: the inverse of `entid` for keyword idents -- the
 * `:db/ident` keyword `s` has asserted on itself, or nil if it has none
 * (including if the value there isn't actually a keyword-shaped string,
 * e.g. someone asserted `:db/ident "plain string"` instead of a real
 * keyword -- treated as "no ident" rather than a partial/lossy result).
 */
kotobase_peer.core.ident = (function kotobase_peer$core$ident(db,s){
var v = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.entity(db,s),":db/ident"));
if(((typeof v === 'string') && (clojure.string.starts_with_QMARK_(v,":")))){
return cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(v);
} else {
return null;
}
});
/**
 * Full O(graph) commit: snapshot `db`'s 4 indexes into content-addressed
 * prolly-trees (`arrangement.core/commit!`, always with `prev` nil) and
 * append that snapshot CID (as a fresh empty-novelty state) onto the
 * chain rooted at `prev-chain-cid`. This is the SAME expensive
 * rebuild the pre-D1 `commit!` did on every write; it now exists only as a
 * primitive `fold!` calls internally, plus a one-shot cold-start entry point
 * for callers that already have a fully materialized hot `db` (backfill /
 * migration tooling, tests). Most write paths want `commit!`, below.
 * 
 * `blind-fn`/`encrypt-fn` (ADR-2607051000, accepted 2026-07-06) are REQUIRED
 * and threaded straight to `arrangement.core/commit!` -- see its docstring
 * for their contract, including the sync-JVM/Promise-cljs platform split
 * this fn inherits (`arrangement.core/commit!` is itself a `js/Promise` on
 * cljs; `cd/commit!` below is unaffected/synchronous on both platforms).
 */
kotobase_peer.core.snapshot_BANG_ = (function kotobase_peer$core$snapshot_BANG_(put_BANG_,get_fn,db,prev_chain_cid,blind_fn,encrypt_fn){
return arrangement.core.commit_BANG_.cljs$core$IFn$_invoke$arity$6(put_BANG_,db,null,arrangement.core.current_schema_version,blind_fn,encrypt_fn).then((function (snapshot_cid){
return chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$4(put_BANG_,get_fn,new cljs.core.PersistentArrayMap(null, 4, ["indexed",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(snapshot_cid) : ipld.core.link.call(null,snapshot_cid)),"novelty-front",null,"novelty-back",null,"novelty-count",(0)], null),prev_chain_cid);
}));
});
kotobase_peer.core.normalize_state = (function kotobase_peer$core$normalize_state(state){
if(cljs.core.truth_((ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1(state) : ipld.core.link_QMARK_.call(null,state)))){
return new cljs.core.PersistentArrayMap(null, 4, ["indexed",state,"novelty-front",null,"novelty-back",null,"novelty-count",(0)], null);
} else {
if(cljs.core.map_QMARK_(state)){
return state;
} else {
if((state == null)){
return new cljs.core.PersistentArrayMap(null, 4, ["indexed",null,"novelty-front",null,"novelty-back",null,"novelty-count",(0)], null);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: unrecognized commit state shape",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"state","state",-1988618099),state], null));

}
}
}
});
/**
 * True iff `state` uses the ORIGINAL flat-vector "novelty" shape (a chain
 *   written before this landing, never yet migrated). Every state THIS build
 *   writes always has "novelty-front"/"novelty-back" keys present (even
 *   when both nil), so their absence reliably means 'not yet touched by
 *   post-migration code' rather than 'empty via the new code path'.
 */
kotobase_peer.core.legacy_novelty_state_QMARK_ = (function kotobase_peer$core$legacy_novelty_state_QMARK_(state){
return ((cljs.core.contains_QMARK_(state,"novelty")) && ((!(cljs.core.contains_QMARK_(state,"novelty-front")))));
});
/**
 * The normalized state at `chain-cid` (an O(1) head fetch since chain/head,
 * ADR-2607032430's other half -- and, since kotoba-lang/kotobase-peer#16's
 * fix, an O(1) STATE SIZE too: the state block itself only ever holds 4
 * small links/ints, never the full novelty backlog inline, unlike the flat
 * vector this replaced). nil chain-cid (no prior commit) → the empty state.
 */
kotobase_peer.core.state_at = (function kotobase_peer$core$state_at(get_fn,chain_cid){
if((chain_cid == null)){
return new cljs.core.PersistentArrayMap(null, 4, ["indexed",null,"novelty-front",null,"novelty-back",null,"novelty-count",(0)], null);
} else {
return kotobase_peer.core.normalize_state(new cljs.core.Keyword(null,"state","state",-1988618099).cljs$core$IFn$_invoke$arity$1(chain.core.head(get_fn,chain_cid)));
}
});
kotobase_peer.core.indexed_cid = (function kotobase_peer$core$indexed_cid(state){
var G__11763 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"indexed");
if((G__11763 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11763) : ipld.core.link_cid.call(null,G__11763));
}
});
/**
 * Entries per novelty chain node. 1 was the original shape: one block per
 *   unfolded transaction, so ENUMERATING novelty cost one sequential block
 *   fetch per transaction. Measured (bench/results/2026-08-01-dag-shape.edn,
 *   ADR-2608021000): at the fold threshold of 64 that walk was 91-97% of a
 *   hydrate's sequential round trips, against 2-3 for the whole prolly-tree,
 *   and no prefetch can flatten it because each successor CID only exists
 *   inside its predecessor. Batching k entries per node divides the hops by k.
 * 
 *   16 matches `novelty-index-segment-size`, which already uses this exact
 *   shape for the subject directory -- the pattern was in the codebase, just
 *   not applied to the queue it was measured on. The trade is that a push into
 *   a partly-filled head segment re-encodes that segment's <=16 entries
 *   instead of writing one fresh node; that is a bounded constant on a small
 *   block, paid on the write path, to remove a linear term from every read.
 */
kotobase_peer.core.novelty_segment_size = (16);
/**
 * Puts one {"e" tx-link "rest" rest-link|nil "subjects" [...]?} node, returns its cid
 *   (string, NOT wrapped in a Link -- callers wrap when storing it as a
 *   value). Single-entry shape, kept because live chains are full of these
 *   nodes and `walk-novelty-entries` must keep reading them; new pushes write
 *   the segment shape below.
 */
kotobase_peer.core.novelty_node_cid_BANG_ = (function kotobase_peer$core$novelty_node_cid_BANG_(var_args){
var G__11765 = arguments.length;
switch (G__11765) {
case 3:
return kotobase_peer.core.novelty_node_cid_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return kotobase_peer.core.novelty_node_cid_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.novelty_node_cid_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (put_BANG_,tx_cid,rest_link){
return kotobase_peer.core.novelty_node_cid_BANG_.cljs$core$IFn$_invoke$arity$4(put_BANG_,tx_cid,rest_link,null);
}));

(kotobase_peer.core.novelty_node_cid_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (put_BANG_,tx_cid,rest_link,subject_tokens){
return ipld.core.put_node_BANG_(put_BANG_,(function (){var G__11766 = new cljs.core.PersistentArrayMap(null, 2, ["e",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(tx_cid) : ipld.core.link.call(null,tx_cid)),"rest",rest_link], null);
if(cljs.core.seq(subject_tokens)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11766,"subjects",cljs.core.vec(subject_tokens));
} else {
return G__11766;
}
})());
}));

(kotobase_peer.core.novelty_node_cid_BANG_.cljs$lang$maxFixedArity = 4);

kotobase_peer.core.entry__GT_node_entry = (function kotobase_peer$core$entry__GT_node_entry(p__11767){
var map__11768 = p__11767;
var map__11768__$1 = cljs.core.__destructure_map(map__11768);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11768__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
var subjects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11768__$1,new cljs.core.Keyword(null,"subjects","subjects",21416729));
var G__11769 = new cljs.core.PersistentArrayMap(null, 1, ["e",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(cid) : ipld.core.link.call(null,cid))], null);
if(cljs.core.seq(subjects)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11769,"subjects",cljs.core.vec(subjects));
} else {
return G__11769;
}
});
kotobase_peer.core.node_entry__GT_entry = (function kotobase_peer$core$node_entry__GT_entry(p__11770){
var map__11771 = p__11770;
var map__11771__$1 = cljs.core.__destructure_map(map__11771);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11771__$1,"e");
var subjects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11771__$1,"subjects");
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cid","cid",-1940591320),(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(e) : ipld.core.link_cid.call(null,e)),new cljs.core.Keyword(null,"subjects","subjects",21416729),subjects], null);
});
/**
 * Puts one {"es" [entry ...] "rest" rest-link|nil} node. `entries` are in
 *   WALK ORDER -- the order `walk-novelty-entries` should emit them for this
 *   chain's direction -- so the same node shape serves the newest-first `back`
 *   chain and the oldest-first `front` chain without either needing to know
 *   about the other.
 */
kotobase_peer.core.novelty_segment_cid_BANG_ = (function kotobase_peer$core$novelty_segment_cid_BANG_(put_BANG_,entries,rest_link){
return ipld.core.put_node_BANG_(put_BANG_,new cljs.core.PersistentArrayMap(null, 2, ["es",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.entry__GT_node_entry,entries),"rest",rest_link], null));
});
/**
 * Entries of one novelty chain node, in walk order, for EITHER shape: the
 *   single-entry `{"e" ..}` nodes every live chain is made of, and the
 *   `{"es" [..]}` segments this build writes. A chain freely mixes both --
 *   a graph that was written before this landing keeps its old nodes and grows
 *   segments on top, with no migration step.
 */
kotobase_peer.core.node_entries = (function kotobase_peer$core$node_entries(node){
if(cljs.core.contains_QMARK_(node,"es")){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.node_entry__GT_entry,cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"es"));
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cid","cid",-1940591320),(function (){var G__11772 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"e");
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11772) : ipld.core.link_cid.call(null,G__11772));
})(),new cljs.core.Keyword(null,"subjects","subjects",21416729),cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"subjects")], null)], null);
}
});
kotobase_peer.core.walk_novelty_entries = (function kotobase_peer$core$walk_novelty_entries(get_fn,head_cid){
var cid = head_cid;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if((cid == null)){
return acc;
} else {
var node = ipld.core.get_node(get_fn,cid);
var G__12102 = (function (){var G__11774 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"rest");
if((G__11774 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11774) : ipld.core.link_cid.call(null,G__11774));
}
})();
var G__12103 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(acc,kotobase_peer.core.node_entries(node));
cid = G__12102;
acc = G__12103;
continue;
}
break;
}
});
/**
 * Builds a new cons-chain from `cids` (a vector, in the order you want when
 *   WALKING the result head-to-tail) and returns a Link to its head, or nil if
 *   `cids` is empty. Shared by legacy-novelty migration and by 'reverse back
 *   into a fresh front' (take-oldest-novelty) -- both are 'turn this in-order
 *   vector into a walkable chain, cheaply'. O(count cids) puts -- the one-time
 *   cost either of those two callers pays, never repeated per-entry on a later
 *   unrelated push.
 */
kotobase_peer.core.build_novelty_chain_BANG_ = (function kotobase_peer$core$build_novelty_chain_BANG_(put_BANG_,entries){
var normalized = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (entry){
if(cljs.core.map_QMARK_(entry)){
return entry;
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cid","cid",-1940591320),entry], null);
}
}),entries);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (rest_link,segment){
var G__11775 = kotobase_peer.core.novelty_segment_cid_BANG_(put_BANG_,segment,rest_link);
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__11775) : ipld.core.link.call(null,G__11775));
}),null,cljs.core.reverse(cljs.core.partition_all.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.novelty_segment_size,normalized)));
});
kotobase_peer.core.novelty_entries = (function kotobase_peer$core$novelty_entries(get_fn,state){
if(kotobase_peer.core.legacy_novelty_state_QMARK_(state)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (link){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cid","cid",-1940591320),(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(link) : ipld.core.link_cid.call(null,link)),new cljs.core.Keyword(null,"subjects","subjects",21416729),null], null);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty",cljs.core.PersistentVector.EMPTY));
} else {
var front = kotobase_peer.core.walk_novelty_entries(get_fn,(function (){var G__11776 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-front");
if((G__11776 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11776) : ipld.core.link_cid.call(null,G__11776));
}
})());
var back = kotobase_peer.core.walk_novelty_entries(get_fn,(function (){var G__11777 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-back");
if((G__11777 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11777) : ipld.core.link_cid.call(null,G__11777));
}
})());
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(front,cljs.core.rseq(back));
}
});
kotobase_peer.core.novelty_index_segment_size = (16);
/**
 * Append one indexed novelty entry to a newest-first chain of bounded
 * metadata segments. Returns a state fragment, or {} when pre-existing
 * unindexed novelty makes the directory incomplete (the reader then uses the
 * conservative queue fallback).
 */
kotobase_peer.core.append_novelty_index_BANG_ = (function kotobase_peer$core$append_novelty_index_BANG_(put_BANG_,get_fn,state,tx_cid,subject_tokens){
var root = (function (){var G__11778 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-subject-index");
if((G__11778 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11778) : ipld.core.link_cid.call(null,G__11778));
}
})();
var eligible_QMARK_ = (function (){var or__5162__auto__ = root;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty-count",(0)) === (0));
}
})();
if(cljs.core.not((function (){var and__5160__auto__ = eligible_QMARK_;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.seq(subject_tokens);
} else {
return and__5160__auto__;
}
})())){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
var entry = new cljs.core.PersistentArrayMap(null, 2, ["e",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(tx_cid) : ipld.core.link.call(null,tx_cid)),"subjects",cljs.core.vec(subject_tokens)], null);
var current = (cljs.core.truth_(root)?kotobase_peer.core.verified_node(get_fn,root):null);
var entries = cljs.core.get.cljs$core$IFn$_invoke$arity$3(current,"entries",cljs.core.PersistentVector.EMPTY);
var node = (((cljs.core.count(entries) < kotobase_peer.core.novelty_index_segment_size))?new cljs.core.PersistentArrayMap(null, 2, ["entries",cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(entries),entry),"rest",cljs.core.get.cljs$core$IFn$_invoke$arity$2(current,"rest")], null):new cljs.core.PersistentArrayMap(null, 2, ["entries",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [entry], null),"rest",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(root) : ipld.core.link.call(null,root))], null));
return new cljs.core.PersistentArrayMap(null, 1, ["novelty-subject-index",(function (){var G__11779 = ipld.core.put_node_BANG_(put_BANG_,node);
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__11779) : ipld.core.link.call(null,G__11779));
})()], null);
}
});
kotobase_peer.core.indexed_novelty_entries = (function kotobase_peer$core$indexed_novelty_entries(get_fn,state){
var temp__5825__auto__ = (function (){var G__11781 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-subject-index");
if((G__11781 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11781) : ipld.core.link_cid.call(null,G__11781));
}
})();
if(cljs.core.truth_(temp__5825__auto__)){
var root = temp__5825__auto__;
var cid = root;
var segments = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.not(cid)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (cid,segments,root,temp__5825__auto__){
return (function (p__11785){
var map__11786 = p__11785;
var map__11786__$1 = cljs.core.__destructure_map(map__11786);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11786__$1,"e");
var subjects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11786__$1,"subjects");
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cid","cid",-1940591320),(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(e) : ipld.core.link_cid.call(null,e)),new cljs.core.Keyword(null,"subjects","subjects",21416729),subjects], null);
});})(cid,segments,root,temp__5825__auto__))
,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (cid,segments,root,temp__5825__auto__){
return (function (p1__11780_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__11780_SHARP_,"entries");
});})(cid,segments,root,temp__5825__auto__))
,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.rseq(segments)], 0)));
} else {
var segment = kotobase_peer.core.verified_node(get_fn,cid);
var G__12104 = (function (){var G__11787 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(segment,"rest");
if((G__11787 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11787) : ipld.core.link_cid.call(null,G__11787));
}
})();
var G__12105 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segments,segment);
cid = G__12104;
segments = G__12105;
continue;
}
break;
}
} else {
return null;
}
});
/**
 * Rebuild the bounded subject directory for chronological ENTRIES. Returns a
 * Link to the newest segment, or nil when empty/incomplete.
 */
kotobase_peer.core.build_novelty_index_BANG_ = (function kotobase_peer$core$build_novelty_index_BANG_(put_BANG_,entries){
if(((cljs.core.seq(entries)) && (cljs.core.every_QMARK_(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.seq,new cljs.core.Keyword(null,"subjects","subjects",21416729)),entries)))){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (rest_link,segment){
var G__11788 = ipld.core.put_node_BANG_(put_BANG_,new cljs.core.PersistentArrayMap(null, 2, ["entries",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__11789){
var map__11790 = p__11789;
var map__11790__$1 = cljs.core.__destructure_map(map__11790);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11790__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
var subjects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11790__$1,new cljs.core.Keyword(null,"subjects","subjects",21416729));
return new cljs.core.PersistentArrayMap(null, 2, ["e",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(cid) : ipld.core.link.call(null,cid)),"subjects",cljs.core.vec(subjects)], null);
}),segment),"rest",rest_link], null));
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__11788) : ipld.core.link.call(null,G__11788));
}),null,cljs.core.partition_all.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.novelty_index_segment_size,entries));
} else {
return null;
}
});
/**
 * ALL not-yet-folded tx-block cids, oldest-first (chronological order).
 *   O(current total novelty length) -- necessarily, since returning everything
 *   means touching everything; see take-oldest-novelty for a genuinely bounded
 *   alternative when only a prefix is needed.
 */
kotobase_peer.core.novelty_cids = (function kotobase_peer$core$novelty_cids(get_fn,state){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cid","cid",-1940591320),kotobase_peer.core.novelty_entries(get_fn,state));
});
/**
 * The single most-recently-pushed tx-cid, or nil if novelty is empty. O(1)
 *   for a non-legacy state (peeks novelty-back's head node) -- never walks the
 *   full backlog just to find its newest entry.
 */
kotobase_peer.core.newest_novelty_cid = (function kotobase_peer$core$newest_novelty_cid(get_fn,state){
if(kotobase_peer.core.legacy_novelty_state_QMARK_(state)){
var G__11791 = cljs.core.peek(cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty",cljs.core.PersistentVector.EMPTY));
if((G__11791 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11791) : ipld.core.link_cid.call(null,G__11791));
}
} else {
var temp__5825__auto__ = (function (){var G__11792 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-back");
if((G__11792 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11792) : ipld.core.link_cid.call(null,G__11792));
}
})();
if(cljs.core.truth_(temp__5825__auto__)){
var back_cid = temp__5825__auto__;
return new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(cljs.core.first(kotobase_peer.core.node_entries(ipld.core.get_node(get_fn,back_cid))));
} else {
return null;
}
}
});
/**
 * Returns a NEW {"novelty-front" .. "novelty-back" .. "novelty-count"
 *   ..} triple with `tx-cid` pushed onto the back. Migrates a legacy
 *   flat-vector novelty into the new front chain the first time a push touches
 *   it -- O(legacy length), paid once, never again for that chain.
 * 
 *   Cost, and why it changed: this used to write ONE single-entry node per
 *   push and touch nothing else, which was the fix for kotoba-lang/
 *   kotobase-peer#16 (the flat vector it replaced was decoded and re-encoded
 *   WHOLE on every push). It now appends into a bounded head SEGMENT of up to
 *   `novelty-segment-size` entries, which means reading that head node and
 *   re-encoding its <=16 entries. That is deliberately trading a bounded
 *   constant on the WRITE path for a linear term on every READ path: measured
 *   (ADR-2608021000), enumerating novelty was 91-97% of a hydrate's sequential
 *   round trips at the fold threshold, because the successor CID of a
 *   single-entry node only exists inside that node. It is NOT a return to
 *   kotobase-peer#16 -- the re-encoded node is bounded at 16 entries and never
 *   grows with the backlog, which is exactly the property the flat vector
 *   lacked.
 * 
 *   `get-fn` is required for that head read. A legacy single-entry head is
 *   never rewritten -- the new entry starts a fresh segment pointing at it --
 *   so an existing chain keeps its old nodes and grows segments on top, with
 *   no migration step and no rewrite of history.
 */
kotobase_peer.core.push_novelty_BANG_ = (function kotobase_peer$core$push_novelty_BANG_(var_args){
var G__11794 = arguments.length;
switch (G__11794) {
case 4:
return kotobase_peer.core.push_novelty_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return kotobase_peer.core.push_novelty_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.push_novelty_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (put_BANG_,get_fn,state,tx_cid){
return kotobase_peer.core.push_novelty_BANG_.cljs$core$IFn$_invoke$arity$5(put_BANG_,get_fn,state,tx_cid,null);
}));

(kotobase_peer.core.push_novelty_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (put_BANG_,get_fn,state,tx_cid,subject_tokens){
if(kotobase_peer.core.legacy_novelty_state_QMARK_(state)){
var legacy_cids = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.core.link_cid,cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty",cljs.core.PersistentVector.EMPTY));
return new cljs.core.PersistentArrayMap(null, 3, ["novelty-front",kotobase_peer.core.build_novelty_chain_BANG_(put_BANG_,legacy_cids),"novelty-back",(function (){var G__11795 = kotobase_peer.core.novelty_node_cid_BANG_.cljs$core$IFn$_invoke$arity$4(put_BANG_,tx_cid,null,subject_tokens);
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__11795) : ipld.core.link.call(null,G__11795));
})(),"novelty-count",(cljs.core.count(legacy_cids) + (1))], null);
} else {
var back_link = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-back");
var head = (cljs.core.truth_(back_link)?ipld.core.get_node(get_fn,(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(back_link) : ipld.core.link_cid.call(null,back_link))):null);
var head_entries = (cljs.core.truth_((function (){var and__5160__auto__ = head;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.contains_QMARK_(head,"es");
} else {
return and__5160__auto__;
}
})())?cljs.core.get.cljs$core$IFn$_invoke$arity$2(head,"es"):null);
var entry = kotobase_peer.core.entry__GT_node_entry(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cid","cid",-1940591320),tx_cid,new cljs.core.Keyword(null,"subjects","subjects",21416729),subject_tokens], null));
var node = (cljs.core.truth_((function (){var and__5160__auto__ = head_entries;
if(cljs.core.truth_(and__5160__auto__)){
return (cljs.core.count(head_entries) < kotobase_peer.core.novelty_segment_size);
} else {
return and__5160__auto__;
}
})())?ipld.core.put_node_BANG_(put_BANG_,new cljs.core.PersistentArrayMap(null, 2, ["es",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [entry], null),head_entries),"rest",cljs.core.get.cljs$core$IFn$_invoke$arity$2(head,"rest")], null)):ipld.core.put_node_BANG_(put_BANG_,new cljs.core.PersistentArrayMap(null, 2, ["es",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [entry], null),"rest",back_link], null)));
return new cljs.core.PersistentArrayMap(null, 3, ["novelty-front",cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-front"),"novelty-back",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(node) : ipld.core.link.call(null,node)),"novelty-count",(cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty-count",(0)) + (1))], null);
}
}));

(kotobase_peer.core.push_novelty_BANG_.cljs$lang$maxFixedArity = 5);

/**
 * Returns {"novelty-front" .. "novelty-back" .. "novelty-count" ..
 *   :taken [cids, oldest-first, up to n]} -- the n oldest not-yet-folded
 *   entries, plus the novelty state with them removed (fewer than n taken if
 *   that's all there was).
 * 
 *   Cost: O(min(n, front-length)) in the common case -- taken directly off
 *   `front`, which is already oldest-first; `back` untouched. If `front`
 *   doesn't have n entries, ALSO pays O(back-length) to reverse `back` into a
 *   fresh front and continue taking from there -- this only happens once
 *   `front` is exhausted, amortized against however many pushes built up
 *   `back` since front was last refreshed (classic persistent-queue amortized
 *   accounting -- expensive on a single call sometimes, O(1) amortized over a
 *   sequence of push/take calls, NOT a flat per-call guarantee regardless of
 *   history; see kotoba-lang/kotobase-peer#16's own follow-up comment on
 *   this).
 * 
 *   A legacy flat-vector novelty is migrated to the new shape as part of this
 *   call (same one-time-cost story as push-novelty!).
 */
kotobase_peer.core.take_oldest_novelty = (function kotobase_peer$core$take_oldest_novelty(put_BANG_,get_fn,state,n){
var legacy_QMARK_ = kotobase_peer.core.legacy_novelty_state_QMARK_(state);
var front = ((legacy_QMARK_)?cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (link){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cid","cid",-1940591320),(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(link) : ipld.core.link_cid.call(null,link)),new cljs.core.Keyword(null,"subjects","subjects",21416729),null], null);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty",cljs.core.PersistentVector.EMPTY)):kotobase_peer.core.walk_novelty_entries(get_fn,(function (){var G__11796 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-front");
if((G__11796 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11796) : ipld.core.link_cid.call(null,G__11796));
}
})()));
if((cljs.core.count(front) >= n)){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"taken","taken",1185385376),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cid","cid",-1940591320),cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(front,(0),n)),"novelty-front",kotobase_peer.core.build_novelty_chain_BANG_(put_BANG_,cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(front,n)),"novelty-back",((legacy_QMARK_)?null:cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-back")),"novelty-count",(((legacy_QMARK_)?cljs.core.count(front):cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty-count",(0))) - n),new cljs.core.Keyword(null,"remaining-entries","remaining-entries",1841144287),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(front,n),((legacy_QMARK_)?null:cljs.core.rseq(kotobase_peer.core.walk_novelty_entries(get_fn,(function (){var G__11797 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-back");
if((G__11797 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11797) : ipld.core.link_cid.call(null,G__11797));
}
})()))))], null);
} else {
var back_cid = ((legacy_QMARK_)?null:(function (){var G__11798 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"novelty-back");
if((G__11798 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11798) : ipld.core.link_cid.call(null,G__11798));
}
})());
var back_oldest_first = cljs.core.vec(cljs.core.rseq(kotobase_peer.core.walk_novelty_entries(get_fn,back_cid)));
var combined = cljs.core.into.cljs$core$IFn$_invoke$arity$2(front,back_oldest_first);
var k = cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,cljs.core.count(combined));
var total = ((legacy_QMARK_)?cljs.core.count(front):cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty-count",(0)));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"taken","taken",1185385376),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cid","cid",-1940591320),cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(combined,(0),k)),"novelty-front",kotobase_peer.core.build_novelty_chain_BANG_(put_BANG_,cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(combined,k)),"novelty-back",null,"novelty-count",(total - k),new cljs.core.Keyword(null,"remaining-entries","remaining-entries",1841144287),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(combined,k)], null);
}
});
kotobase_peer.core.quad__GT_wire = (function kotobase_peer$core$quad__GT_wire(p__11799){
var map__11800 = p__11799;
var map__11800__$1 = cljs.core.__destructure_map(map__11800);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11800__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11800__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11800__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11800__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var G__11801 = new cljs.core.PersistentArrayMap(null, 3, ["s",s,"p",p,"o",o], null);
if(cljs.core.truth_((function (){var and__5160__auto__ = op;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"assert","assert",-963103026),op);
} else {
return and__5160__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11801,"op",cljs.core.name(op));
} else {
return G__11801;
}
});
kotobase_peer.core.wire__GT_quad = (function kotobase_peer$core$wire__GT_quad(p__11802){
var map__11803 = p__11802;
var map__11803__$1 = cljs.core.__destructure_map(map__11803);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11803__$1,"s");
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11803__$1,"p");
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11803__$1,"o");
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11803__$1,"op");
var G__11804 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null);
if(cljs.core.truth_(op)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11804,new cljs.core.Keyword(null,"op","op",-1882987955),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(op));
} else {
return G__11804;
}
});
/**
 * The bytes `put-tx-block!` hands to `encrypt-fn`: the dag-cbor of
 *   `{"quads" [...]}`, run through `kotobase-block-codec`.
 * 
 *   Compression has to happen HERE — inside the AEAD, not under it. The bytes
 *   the store actually holds are ciphertext, and ciphertext measures at DEFLATE
 *   ratio 1.003: a provider or backend that compressed them would spend CPU to
 *   store more. This payload is the one place a whole batch of quads exists as
 *   plaintext at once, which is also the only reason it compresses: subjects and
 *   predicates repeat across a transaction. Measured 0.10-0.37 depending on
 *   batch size (ADR-2608060500).
 * 
 *   `bc/frame` is unary and pure, so this stays a function of the quads alone.
 */
kotobase_peer.core.framed_quad_payload = (function kotobase_peer$core$framed_quad_payload(quads){
return kotobase.blockcodec.core.platform_bytes(kotobase.blockcodec.core.frame(ipld.core.encode(new cljs.core.PersistentArrayMap(null, 1, ["quads",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.quad__GT_wire,quads)], null))));
});
/**
 * Inverse of `framed-quad-payload`. `bc/unframe` is the identity on bytes
 *   written before the frame existed, so this reads old and new blocks with one
 *   path and no version flag — which is what let the read half of this change
 *   ship ahead of the write half.
 * 
 *   **A payload this cannot read throws. It does not return no quads.**
 * 
 *   Those two answers used to be the same value. `get` returns nil for a node
 *   that is not a `{"quads" [...]}` map at all, and `mapv` over nil is `[]` —
 *   so a transaction the reader could not decode contributed exactly what an
 *   empty transaction contributes, with no error anywhere above it. Measured in
 *   production on 2026-08-18 (superproject ADR-2608182100): a deployment reading
 *   blocks written by a build whose frame it did not have listed **one object out
 *   of four** and returned HTTP 200. The three it could not decode were intact in
 *   the store the whole time; nothing said so.
 * 
 *   An empty transaction is still readable and still legal: it encodes
 *   `{"quads" []}`, `get` finds the key, and the result is `[]`. The
 *   distinction this makes is between *no quads* and *no answer*, which is the
 *   only distinction that could have surfaced that incident.
 */
kotobase_peer.core.decode_quad_payload = (function kotobase_peer$core$decode_quad_payload(plaintext){
var node = ipld.core.decode(kotobase.blockcodec.core.platform_bytes(kotobase.blockcodec.core.unframe(plaintext)));
var quads = ((cljs.core.map_QMARK_(node))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"quads"):null);
if(cljs.core.sequential_QMARK_(quads)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("tx block payload is not a quad node",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("kotobase-peer","error","kotobase-peer/error",-1067417833),new cljs.core.Keyword(null,"undecodable-tx-payload","undecodable-tx-payload",1133917692),new cljs.core.Keyword(null,"node-type","node-type",129492462),((cljs.core.map_QMARK_(node))?new cljs.core.Keyword(null,"map-without-quads","map-without-quads",-973479734):((typeof node === 'number')?new cljs.core.Keyword(null,"number","number",1570378438):((typeof node === 'string')?new cljs.core.Keyword(null,"string","string",-1989541586):((cljs.core.sequential_QMARK_(node))?new cljs.core.Keyword(null,"sequence","sequence",926807414):new cljs.core.Keyword(null,"other","other",995793544)
)))),new cljs.core.Keyword(null,"quads-type","quads-type",1268561574),(((quads == null))?new cljs.core.Keyword(null,"absent","absent",1020140372):new cljs.core.Keyword(null,"not-sequential","not-sequential",1957101826)
)], null));
}

return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.wire__GT_quad,quads);
});
/**
 * ADR-2607051000 (accepted 2026-07-06): the novelty tx block's whole quad
 *   payload is encrypted as one opaque ciphertext blob (`encrypt-fn`, REQUIRED,
 *   no silent default) -- `read-tx-block` is whole-block reads only, never a
 *   keyed/prefix seek, so there's no blind-index concern here, just AEAD.
 *   Synchronous on JVM, a `js/Promise` of the block CID on cljs (see the
 *   platform-split note above).
 * 
 *   The payload is compression-framed before encryption (ADR-2608060500); see
 *   `framed-quad-payload` for why the seam is on this side of `encrypt-fn`.
 */
kotobase_peer.core.put_tx_block_BANG_ = (function kotobase_peer$core$put_tx_block_BANG_(put_BANG_,quads,encrypt_fn){
return (function (){var G__11805 = kotobase_peer.core.framed_quad_payload(quads);
return (encrypt_fn.cljs$core$IFn$_invoke$arity$1 ? encrypt_fn.cljs$core$IFn$_invoke$arity$1(G__11805) : encrypt_fn.call(null,G__11805));
})().then((function (ct){
return ipld.core.put_node_BANG_(put_BANG_,new cljs.core.PersistentArrayMap(null, 1, ["ct",ct], null));
}));
});
/**
 * Inverse of `put-tx-block!`: decrypt the block's `"ct"` ciphertext
 *   (`decrypt-fn`, REQUIRED), unframe it, and decode the dag-cbor
 *   `{"quads" [...]}` node as before. Synchronous on JVM, a `js/Promise` of the
 *   quads on cljs.
 */
kotobase_peer.core.read_tx_block = (function kotobase_peer$core$read_tx_block(get_fn,tx_cid,decrypt_fn){
var map__11806 = ipld.core.get_node(get_fn,tx_cid);
var map__11806__$1 = cljs.core.__destructure_map(map__11806);
var ct = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11806__$1,"ct");
return (decrypt_fn.cljs$core$IFn$_invoke$arity$1 ? decrypt_fn.cljs$core$IFn$_invoke$arity$1(ct) : decrypt_fn.call(null,ct)).then(kotobase_peer.core.decode_quad_payload);
});
/**
 * Like `read-tx-block`, but for `async-get-fn`: a Promise-returning
 *   `(fn [cid]) -> js/Promise<bytes>` that fetches DIRECTLY, bypassing a
 *   synchronous block-miss trampoline (e.g. `with-blocks`) entirely.
 * 
 *   Motivation (ADR-2607120730 follow-up, confirmed live): routing
 *   `fold!`'s COLD-snapshot hydrate through `scan-prefix-async` (`cold-
 *   datoms-async`) did NOT by itself resolve `yoro-social-v2`'s CPU-
 *   exceeded failures, because `fold!`'s NOVELTY tx-block reads
 *   (`read-tx-block`, called via `pmap-async` over `to-fold-cids`) still
 *   used the plain synchronous `get-fn` -- and a Worker's whole `h/handle`
 *   call is wrapped in ONE `with-blocks` retry loop: ANY miss ANYWHERE
 *   within that call (not just in the cold scan) restarts the ENTIRE
 *   `h/handle` invocation from scratch, including redoing the (now
 *   individually fast, ~880ms) hydrate walk again from zero. With up to
 *   `max-novelty` (e.g. 200) novelty blocks, none of them pre-cached, this
 *   can mean dozens to hundreds of full restarts -- exactly the kind of
 *   redundant-retry cost `scan-prefix-async` fixed for the cold side, just
 *   relocated to the novelty side. Routing novelty reads through a direct
 *   fetch too removes `with-blocks` from `fold!`'s critical path entirely.
 */
kotobase_peer.core.read_tx_block_async = (function kotobase_peer$core$read_tx_block_async(async_get_fn,tx_cid,decrypt_fn){
return (async_get_fn.cljs$core$IFn$_invoke$arity$1 ? async_get_fn.cljs$core$IFn$_invoke$arity$1(tx_cid) : async_get_fn.call(null,tx_cid)).then(ipld.core.decode).then((function (p__11807){
var map__11808 = p__11807;
var map__11808__$1 = cljs.core.__destructure_map(map__11808);
var ct = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11808__$1,"ct");
return (decrypt_fn.cljs$core$IFn$_invoke$arity$1 ? decrypt_fn.cljs$core$IFn$_invoke$arity$1(ct) : decrypt_fn.call(null,ct)).then(kotobase_peer.core.decode_quad_payload);
}));
});
/**
 * THE write path (ADR-2607032430 D1): append `tx-data` as one novelty tx
 * block. O(|tx-data|) — reads only the previous state's small {indexed,
 * novelty-front, novelty-back, novelty-count} LINKS/int (one O(1) head
 * fetch via chain, never the graph itself, and — since kotoba-lang/
 * kotobase-peer#16's fix — never the full novelty backlog either: pushing
 * the new tx-block link is one new small cons node, see push-novelty!,
 * NOT a re-encode of every not-yet-folded entry) and writes one new small
 * tx block plus one new chain entry. Touches no prolly-tree, rehydrates
 * nothing. `tx-data` accepts the same shapes `transact` does (quad maps,
 * `[:db/add e a v]`, bare `[e a v]` triples, and the retraction forms
 * `[:db/retract e a v]` / `[:db/retractEntity e]` — ADR-2607071610).
 * 
 * This REPLACES the pre-D1 `commit!` (now `snapshot!`), which took an
 * already-hydrated hot db and paid a full O(graph) rebuild on every call —
 * confirmed live 2026-07-03 as the root cause of a CF Worker CPU-limit
 * collapse (error 1102) partway through a 321-actor mass write. Call
 * `fold!` periodically (see `should-fold?`) to bound novelty size and keep
 * `hot-datoms` reads fast; correctness never depends on folding promptly.
 * 
 * `encrypt-fn` (ADR-2607051000, accepted 2026-07-06) is REQUIRED and
 * threaded straight to `put-tx-block!` -- see its docstring for the
 * contract, including the sync-JVM/Promise-cljs platform split (`put-tx-
 * block!` is itself a `js/Promise` of the tx CID on cljs; `push-novelty!`
 * itself is synchronous on BOTH platforms — it touches only cids/links,
 * no crypto). Optional `blind-fn` adds keyed subject tokens to the novelty
 * queue node so transaction-slice reads can skip unrelated encrypted blocks;
 * the original arity remains wire-compatible and emits an unindexed node.
 */
kotobase_peer.core.commit_BANG_ = (function kotobase_peer$core$commit_BANG_(var_args){
var G__11810 = arguments.length;
switch (G__11810) {
case 5:
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (put_BANG_,get_fn,tx_data,prev_chain_cid,encrypt_fn){
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$6(put_BANG_,get_fn,tx_data,prev_chain_cid,encrypt_fn,null);
}));

(kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$6 = (function (put_BANG_,get_fn,tx_data,prev_chain_cid,encrypt_fn,blind_fn){
var quads = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.__GT_quad,tx_data);
var subjects = cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"s","s",1705939918),quads))));
var state = kotobase_peer.core.state_at(get_fn,prev_chain_cid);
return Promise.all([kotobase_peer.core.put_tx_block_BANG_(put_BANG_,quads,encrypt_fn),(cljs.core.truth_(blind_fn)?kotobase_peer.core.pmap_async(blind_fn,subjects):Promise.resolve(null))]).then((function (results){
var vec__11811 = cljs.core.vec(results);
var tx_cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11811,(0),null);
var tokens = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11811,(1),null);
var new_state = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(state,"novelty",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["novelty-subject-index"], 0)),kotobase_peer.core.push_novelty_BANG_.cljs$core$IFn$_invoke$arity$5(put_BANG_,get_fn,state,tx_cid,tokens),kotobase_peer.core.append_novelty_index_BANG_(put_BANG_,get_fn,state,tx_cid,tokens)], 0));
return chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$4(put_BANG_,get_fn,new_state,prev_chain_cid);
}));
}));

(kotobase_peer.core.commit_BANG_.cljs$lang$maxFixedArity = 6);

/**
 * Like `commit!`, but returns a Datomic-shaped tx-report --
 * `{:chain-cid-before prev-chain-cid :chain-cid-after new-chain-cid
 * :tx-data quads}` -- instead of a bare chain-cid. Datomic's own
 * `{:db-before :db-after :tx-data :tempids}`, adapted: this substrate's
 * "db identity" for a chain-append write IS the chain-cid (content-
 * addressed), not a hot db value, so `:chain-cid-before`/`-after` take
 * `:db-before`/`-after`'s role. No `:tempids` -- this substrate has no
 * temporary-id resolution step (callers pass real entity ids directly),
 * so it's omitted rather than faked. Synchronous on JVM; a `js/Promise`
 * of the report on cljs.
 */
kotobase_peer.core.commit_with_report_BANG_ = (function kotobase_peer$core$commit_with_report_BANG_(put_BANG_,get_fn,tx_data,prev_chain_cid,encrypt_fn){
var quads = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.__GT_quad,tx_data);
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5(put_BANG_,get_fn,tx_data,prev_chain_cid,encrypt_fn).then((function (new_cid){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"chain-cid-before","chain-cid-before",956922648),prev_chain_cid,new cljs.core.Keyword(null,"chain-cid-after","chain-cid-after",-1567090406),new_cid,new cljs.core.Keyword(null,"tx-data","tx-data",934159761),quads], null);
}));
});
/**
 * How many times `commit-serialized!` retries after losing a `cas!` race
 *   before giving up and throwing -- a defensive cap (persistent, unbounded
 *   write contention on one head-key is a caller/deployment problem, not
 *   something to retry forever for), not a tuned constant.
 */
kotobase_peer.core.default_max_cas_retries = (10);
/**
 * Like `commit!`, but coordinates through a caller-provided `cas!` --
 * `(cas! head-key expected-chain-cid new-chain-cid) -> actual-chain-cid`,
 * an ATOMIC compare-and-swap on `head-key` (a caller-chosen MUTABLE
 * pointer, e.g. a D1/DynamoDB row keyed by actor id -- NOT a chain-cid;
 * chain-cids are content-addressed and never change meaning). Contract:
 * if `head-key`'s CURRENT value equals `expected-chain-cid`, atomically
 * swap it to `new-chain-cid` and return `new-chain-cid`; otherwise leave
 * it untouched and return whatever its ACTUAL current value is (a
 * standard compare-and-exchange shape -- the caller can always tell
 * success from failure by comparing the return value to `new-chain-cid`,
 * and a failure directly hands back what to retry against, no separate
 * re-read needed) -- instead of blindly trusting a caller-passed
 * `prev-chain-cid`.
 * 
 * Re-derives `tx-data`'s tx-block against whatever the ACTUAL current
 * head turns out to be on every attempt, retrying (up to `max-retries`)
 * on a lost race, throwing if it never wins. True single-writer-per-
 * `head-key` serialization -- the ACID guarantee `commit!` alone cannot
 * make.
 * 
 * `head-key` identifies the mutable pointer. `expected-chain-cid` is the
 * chain-cid the CALLER currently believes is the head (`nil` means "I
 * believe this chain doesn't exist yet"). `cas!` is synchronous on JVM.
 * On cljs it may return either the value or a Promise of it, allowing direct
 * composition with R2/S3 conditional-head adapters; the result is always
 * awaited before success/retry is decided.
 */
kotobase_peer.core.commit_serialized_BANG_ = (function kotobase_peer$core$commit_serialized_BANG_(var_args){
var G__11815 = arguments.length;
switch (G__11815) {
case 7:
return kotobase_peer.core.commit_serialized_BANG_.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 8:
return kotobase_peer.core.commit_serialized_BANG_.cljs$core$IFn$_invoke$arity$8((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.commit_serialized_BANG_.cljs$core$IFn$_invoke$arity$7 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn){
return kotobase_peer.core.commit_serialized_BANG_.cljs$core$IFn$_invoke$arity$8(put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn,kotobase_peer.core.default_max_cas_retries);
}));

(kotobase_peer.core.commit_serialized_BANG_.cljs$core$IFn$_invoke$arity$8 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn,max_retries){
var attempt = (function kotobase_peer$core$attempt(current_cid,attempts){
if((attempts > max_retries)){
return Promise.reject(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: commit-serialized! exceeded max-cas-retries -- persistent write contention on head-key",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"head-key","head-key",1479955464),head_key,new cljs.core.Keyword(null,"attempts","attempts",1024246729),attempts], null)));
} else {
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5(put_BANG_,get_fn,tx_data,current_cid,encrypt_fn).then((function (new_cid){
return Promise.resolve((cas_BANG_.cljs$core$IFn$_invoke$arity$3 ? cas_BANG_.cljs$core$IFn$_invoke$arity$3(head_key,current_cid,new_cid) : cas_BANG_.call(null,head_key,current_cid,new_cid))).then((function (actual){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(actual,new_cid)){
return new_cid;
} else {
return kotobase_peer$core$attempt(actual,(attempts + (1)));
}
}));
}));
}
});
return attempt(expected_chain_cid,(0));
}));

(kotobase_peer.core.commit_serialized_BANG_.cljs$lang$maxFixedArity = 8);

/**
 * Like `commit-serialized!`, but returns a Datomic-shaped tx-report (see
 * `commit-with-report!`) -- `{:chain-cid-before :chain-cid-after
 * :tx-data}`, where `:chain-cid-before` is whichever chain-cid actually
 * won the CAS race and got committed against (NOT necessarily the
 * caller's original `expected-chain-cid`, if a retry happened).
 */
kotobase_peer.core.commit_serialized_with_report_BANG_ = (function kotobase_peer$core$commit_serialized_with_report_BANG_(var_args){
var G__11817 = arguments.length;
switch (G__11817) {
case 7:
return kotobase_peer.core.commit_serialized_with_report_BANG_.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 8:
return kotobase_peer.core.commit_serialized_with_report_BANG_.cljs$core$IFn$_invoke$arity$8((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.commit_serialized_with_report_BANG_.cljs$core$IFn$_invoke$arity$7 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn){
return kotobase_peer.core.commit_serialized_with_report_BANG_.cljs$core$IFn$_invoke$arity$8(put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn,kotobase_peer.core.default_max_cas_retries);
}));

(kotobase_peer.core.commit_serialized_with_report_BANG_.cljs$core$IFn$_invoke$arity$8 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn,max_retries){
var quads = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.__GT_quad,tx_data);
var attempt = (function kotobase_peer$core$attempt(current_cid,attempts){
if((attempts > max_retries)){
return Promise.reject(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: commit-serialized-with-report! exceeded max-cas-retries -- persistent write contention on head-key",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"head-key","head-key",1479955464),head_key,new cljs.core.Keyword(null,"attempts","attempts",1024246729),attempts], null)));
} else {
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5(put_BANG_,get_fn,tx_data,current_cid,encrypt_fn).then((function (new_cid){
return Promise.resolve((cas_BANG_.cljs$core$IFn$_invoke$arity$3 ? cas_BANG_.cljs$core$IFn$_invoke$arity$3(head_key,current_cid,new_cid) : cas_BANG_.call(null,head_key,current_cid,new_cid))).then((function (actual){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(actual,new_cid)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"chain-cid-before","chain-cid-before",956922648),current_cid,new cljs.core.Keyword(null,"chain-cid-after","chain-cid-after",-1567090406),new_cid,new cljs.core.Keyword(null,"tx-data","tx-data",934159761),quads], null);
} else {
return kotobase_peer$core$attempt(actual,(attempts + (1)));
}
}));
}));
}
});
return attempt(expected_chain_cid,(0));
}));

(kotobase_peer.core.commit_serialized_with_report_BANG_.cljs$lang$maxFixedArity = 8);

/**
 * Publish one `transactor/plan-head-batches` item as one chain commit and one
 *   HeadCAS, then return acknowledgements for every coalesced logical request.
 *   The batch must target HEAD-KEY; batching never crosses mutable heads. Like
 *   `commit-serialized!`, TX-DATA must already be normalized. REQUEST-ID is an
 *   acknowledgement correlation id, not a durable exactly-once ledger; an ingress
 *   retry protocol must deduplicate before planning or use the effective path.
 */
kotobase_peer.core.commit_serialized_batch_BANG_ = (function kotobase_peer$core$commit_serialized_batch_BANG_(var_args){
var G__11820 = arguments.length;
switch (G__11820) {
case 7:
return kotobase_peer.core.commit_serialized_batch_BANG_.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 8:
return kotobase_peer.core.commit_serialized_batch_BANG_.cljs$core$IFn$_invoke$arity$8((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.commit_serialized_batch_BANG_.cljs$core$IFn$_invoke$arity$7 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,batch,encrypt_fn){
return kotobase_peer.core.commit_serialized_batch_BANG_.cljs$core$IFn$_invoke$arity$8(put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,batch,encrypt_fn,kotobase_peer.core.default_max_cas_retries);
}));

(kotobase_peer.core.commit_serialized_batch_BANG_.cljs$core$IFn$_invoke$arity$8 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,batch,encrypt_fn,max_retries){
var batch__$1 = kotobase_peer.transactor.validate_batch(batch);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(head_key,new cljs.core.Keyword(null,"head-key","head-key",1479955464).cljs$core$IFn$_invoke$arity$1(batch__$1))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Transactor batch/head mismatch",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"head-key","head-key",1479955464),head_key,new cljs.core.Keyword(null,"batch-head","batch-head",-554109086),new cljs.core.Keyword(null,"head-key","head-key",1479955464).cljs$core$IFn$_invoke$arity$1(batch__$1)], null));
}

return kotobase_peer.core.commit_serialized_with_report_BANG_.cljs$core$IFn$_invoke$arity$8(put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(batch__$1),encrypt_fn,max_retries).then((function (p1__11818_SHARP_){
return kotobase_peer.transactor.batch_receipt(batch__$1,p1__11818_SHARP_);
}));
}));

(kotobase_peer.core.commit_serialized_batch_BANG_.cljs$lang$maxFixedArity = 8);

/**
 * How many not-yet-folded tx blocks sit on `chain-cid`'s current state —
 * the `fold!` trigger signal. O(1) once a chain has been touched by this
 * build's code (reads the maintained "novelty-count" field, never walks
 * front/back); O(legacy novelty length) for a chain still in the pre-
 * kotoba-lang/kotobase-peer#16-fix flat-vector shape — no worse than
 * `state-at` already pays to read such a chain's state at all.
 */
kotobase_peer.core.novelty_size = (function kotobase_peer$core$novelty_size(get_fn,chain_cid){
var state = kotobase_peer.core.state_at(get_fn,chain_cid);
if(kotobase_peer.core.legacy_novelty_state_QMARK_(state)){
return cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty",cljs.core.PersistentVector.EMPTY));
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(state,"novelty-count",(0));
}
});
/**
 * novelty length `should-fold?` flags for compaction at. Tunes the
 * amortization: a fold costs O(graph_shard) once every `default-fold-
 * threshold` writes, so write-heavy shards fold more often in absolute
 * time but pay the SAME amortized cost per write. A shard's own write
 * volume and latency budget should drive the real value in production;
 * this is a reasonable engine-level default, not a tuned constant.
 */
kotobase_peer.core.default_fold_threshold = (64);
kotobase_peer.core.should_fold_QMARK_ = (function kotobase_peer$core$should_fold_QMARK_(var_args){
var G__11822 = arguments.length;
switch (G__11822) {
case 2:
return kotobase_peer.core.should_fold_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.core.should_fold_QMARK_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.should_fold_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (get_fn,chain_cid){
return kotobase_peer.core.should_fold_QMARK_.cljs$core$IFn$_invoke$arity$3(get_fn,chain_cid,kotobase_peer.core.default_fold_threshold);
}));

(kotobase_peer.core.should_fold_QMARK_.cljs$core$IFn$_invoke$arity$3 = (function (get_fn,chain_cid,threshold){
return (kotobase_peer.core.novelty_size(get_fn,chain_cid) >= threshold);
}));

(kotobase_peer.core.should_fold_QMARK_.cljs$lang$maxFixedArity = 3);

/**
 * Full commit history rooted at `chain-cid`, oldest first. Each entry's
 * `:state` is the `{indexed novelty}` map (or, for a pre-D1 commit, the
 * bare snapshot Link `normalize-state` would expand — `chain`/`head` return
 * the RAW state as chain stored it; callers that need the normalized
 * shape go through `state-at` / `hot-datoms` / `latest-snapshot-cid`).
 */
kotobase_peer.core.chain = (function kotobase_peer$core$chain(get_fn,chain_cid){
return chain.core.chain(get_fn,chain_cid);
});
/**
 * The chain entry AT `chain-cid` (O(1) — see chain/head). Returns
 * the RAW `:state` (not normalize-state-expanded); see `chain`'s docstring.
 */
kotobase_peer.core.head = (function kotobase_peer$core$head(get_fn,chain_cid){
return chain.core.head(get_fn,chain_cid);
});
/**
 * The INDEXED arrangement snapshot CID as of `chain-cid`'s current state —
 * the last fold point, NOT including any pending novelty. nil when the
 * chain is empty OR when nothing has been folded yet (an all-novelty chain,
 * the common case for a fresh, low-write-volume shard between folds — this
 * is NOT the same as "no data"; use `hot-datoms`/`novelty-size` to check
 * for pending unfolded writes, not this fn alone, before deciding a graph
 * is empty).
 */
kotobase_peer.core.latest_snapshot_cid = (function kotobase_peer$core$latest_snapshot_cid(get_fn,chain_cid){
if(cljs.core.truth_(chain_cid)){
return kotobase_peer.core.indexed_cid(kotobase_peer.core.state_at(get_fn,chain_cid));
} else {
return null;
}
});
/**
 * The chain-cid at-or-before `seq` (Datomic's `:as-of`, keyed by commit
 * :seq number here -- see ns section comment). Given `:seq`'s gaplessness
 * from 0 (`verify-chain`), this finds an exact match unless `seq` is
 * beyond the chain's own tip, in which case it clamps to the tip
 * (Datomic's own "as-of the future just means now" behavior). `nil` if
 * `chain-cid` itself is `nil` (no prior commit at all yet).
 * 
 * The result composes directly with every existing chain-cid-accepting
 * fn -- `(hot-datoms get-fn (as-of get-fn chain-cid 5) ...)` reads
 * "hot-datoms as of seq 5", no separate as-of-flavored sibling of each
 * read fn needed.
 */
kotobase_peer.core.as_of = (function kotobase_peer$core$as_of(get_fn,chain_cid,seq){
if(cljs.core.truth_(chain_cid)){
var entries = kotobase_peer.core.chain(get_fn,chain_cid);
return new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1((function (){var or__5162__auto__ = cljs.core.some((function (p1__11823_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(seq,new cljs.core.Keyword(null,"seq","seq",-1817803783).cljs$core$IFn$_invoke$arity$1(p1__11823_SHARP_))){
return p1__11823_SHARP_;
} else {
return null;
}
}),entries);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.last(entries);
}
})());
} else {
return null;
}
});
kotobase_peer.core.index_spec = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"root","root",-448657453),"spo",new cljs.core.Keyword(null,"->eav","->eav",-987562248),(function (p__11824){
var vec__11825 = p__11824;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11825,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11825,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11825,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null);
})], null),new cljs.core.Keyword(null,"aevt","aevt",-585148059),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"root","root",-448657453),"pso",new cljs.core.Keyword(null,"->eav","->eav",-987562248),(function (p__11828){
var vec__11829 = p__11828;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11829,(0),null);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11829,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11829,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null);
})], null),new cljs.core.Keyword(null,"avet","avet",1383857032),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"root","root",-448657453),"pos",new cljs.core.Keyword(null,"->eav","->eav",-987562248),(function (p__11832){
var vec__11833 = p__11832;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11833,(0),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11833,(1),null);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11833,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null);
})], null),new cljs.core.Keyword(null,"vaet","vaet",-1564760892),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"root","root",-448657453),"ocp",new cljs.core.Keyword(null,"->eav","->eav",-987562248),(function (p__11836){
var vec__11837 = p__11836;
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11837,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11837,(1),null);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11837,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null);
})], null)], null);
/**
 * String prefix into a `(pr-str [k1 k2 v])` leaf key for an ordered component
 *   vector. `["a" "b"]` → `["a" "b" ` (up to the space before the next
 *   slot), so it matches every key whose first components are exactly those.
 * 
 *   ADR-2607051000 (accepted 2026-07-06): each component is run through
 *   `link->edn` THEN `blind-fn` (REQUIRED, the SAME keyed MAC
 *   `arrangement.core/index-root` used to build the key -- `index-root`'s own
 *   key construction is `(blind-fn (link->edn component))` for every
 *   position, see its docstring), so a caller who already knows the
 *   plaintext component independently re-derives the identical blinded
 *   prefix bytes to seek on.
 * 
 *   The `link->edn` step was MISSING here until 2026-07-08 ("an orthogonal,
 *   pre-existing gap this ADR doesn't touch", per this docstring's own prior
 *   wording) -- harmless for every index THIS fn was actually exercised
 *   against before then (`:eavt`/`:aevt`/`:avet` components are always
 *   plain strings in practice: entity ids, attribute names, scalar values --
 *   `link->edn` on a non-Link value is already a no-op passthrough, so
 *   omitting the call never changed the result). `:vaet` (added 2026-07-08)
 *   is the first index whose OWN seek components are genuinely Link-typed
 *   by design (VAET's whole point is reverse-reference lookup on ref
 *   values) -- for those, skipping `link->edn` produced a seek prefix
 *   blinded from the wrong input, silently matching nothing. Confirmed live
 *   via `cold-datoms`'s own `:vaet` test, fixed here rather than deferred
 *   again now that a real caller (`:vaet`) actually needs it.
 * 
 *   Synchronous on JVM (returns the prefix string, or nil for empty
 *   `components`); a `js/Promise` of the same on cljs.
 */
kotobase_peer.core.components_prefix = (function kotobase_peer$core$components_prefix(components,blind_fn){
if(cljs.core.seq(components)){
return kotobase_peer.core.pmap_async((function (c){
var G__11840 = arrangement.core.link__GT_edn(c);
return (blind_fn.cljs$core$IFn$_invoke$arity$1 ? blind_fn.cljs$core$IFn$_invoke$arity$1(G__11840) : blind_fn.call(null,G__11840));
}),components).then((function (blinded){
var s = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([blinded], 0));
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),(((s).length) - (1))))+" ");
}));
} else {
return Promise.resolve(null);
}
});
/**
 * Decode a persisted index leaf with the codec that WROTE it.
 * 
 *   `arrangement` schema-version 2 (ADR-kotoba-canonical-value-codec) moved the
 *   leaf value slot from the node codec to `kotoba.value.v1`, so a component
 *   keeps its TYPE across the round-trip. A reader that assumes version 1
 *   against a version-2 snapshot does not fail — it decodes the typed wrapper
 *   as if it were the triple, and every row comes back shaped
 *   `{:e 16 :a [[4 "alice"] ...] :v_edn "nil"}`. Silent and wrong, which is
 *   why the version is READ from the snapshot rather than assumed.
 * 
 *   Mirrors `arrangement.core/restore`'s own dispatch deliberately: two copies
 *   of a codec choice that can disagree are how a format migration corrupts a
 *   reader.
 */
kotobase_peer.core.leaf_decoder = (function kotobase_peer$core$leaf_decoder(snap){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.get.cljs$core$IFn$_invoke$arity$2(snap,"schema-version"))){
return (function (bytes){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(arrangement.core.edn__GT_link,ipld.core.decode(bytes));
});
} else {
return ipld.value.decode_value;
}
});
/**
 * `datomic.datoms`-shaped rows read DIRECTLY from a persisted snapshot without
 *   rehydrating the whole db. `snapshot-cid` is an arrangement commit CID
 *   (`latest-snapshot-cid`). opts = `{:index :components :limit}` as in `datoms`.
 *   Touches only the chosen index tree's blocks along the components prefix path
 *   (range-pruned via `prolly-tree.core/scan-prefix`), never the other three
 *   indexes — so a keyed read stays small regardless of graph size. `nil`
 *   snapshot-cid → `[]` (nothing folded yet; see `hot-datoms` for the
 *   novelty-inclusive read). get-fn: `(get-fn cid) -> bytes`.
 * 
 *   `visible?` is REQUIRED, same contract as `datoms`'s (ADR-2607050500): a
 *   post-filter over each candidate `{:e :a :v_edn :added}` row, applied BEFORE
 *   `:limit` is taken (so `:limit` caps what the caller actually receives).
 *   `:limit` is ALSO pushed into `scan-prefix` so the tree walk stops after
 *   that many ciphertexts — taking limit after a full scan is what made
 *   `datoms` `:limit 1` cost O(database) CPU on kotobase.net (2026-08-17,
 *   relay-bsky ~35s/500). A dropping `visible?` may therefore return fewer
 *   than `:limit` rows rather than keep walking; the public Worker path
 *   passes `(constantly true)`.
 *   Pass `(constantly true)` to see everything, as an explicit choice. See
 *   `hydrate-db`, below, for the one internal caller that deliberately must NOT
 *   narrow this.
 * 
 *   `blind-fn`/`decrypt-fn` (ADR-2607051000, accepted 2026-07-06) are REQUIRED:
 *   `blind-fn` re-derives the seek prefix from known `:components` (see
 *   `components-prefix`); `decrypt-fn` opens each matched leaf's ENCRYPTED
 *   VALUE to recover the real `[k1 k2 v]` triple -- the key is a one-way blind
 *   token and can no longer be read back for the row's actual content (the
 *   design correction ADR-2607061800/2607061900's addendum made to
 *   ADR-2607051000's original, incorrect "no separate value encryption
 *   needed" claim). Synchronous on JVM; a `js/Promise` of the rows on cljs
 *   (since `components-prefix`/`decrypt-fn` are themselves Promise-returning
 *   there — `get-fn`/`pt/scan-prefix` stay synchronous on both platforms).
 */
kotobase_peer.core.cold_datoms = (function kotobase_peer$core$cold_datoms(get_fn,snapshot_cid,p__11841,visible_QMARK_,blind_fn,decrypt_fn){
var map__11842 = p__11841;
var map__11842__$1 = cljs.core.__destructure_map(map__11842);
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11842__$1,new cljs.core.Keyword(null,"index","index",-1531685915));
var components = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11842__$1,new cljs.core.Keyword(null,"components","components",-1073188942));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11842__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
if((snapshot_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var map__11843 = (function (){var G__11844 = (function (){var or__5162__auto__ = index;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"eavt","eavt",-666437073);
}
})();
return (kotobase_peer.core.index_spec.cljs$core$IFn$_invoke$arity$1 ? kotobase_peer.core.index_spec.cljs$core$IFn$_invoke$arity$1(G__11844) : kotobase_peer.core.index_spec.call(null,G__11844));
})();
var map__11843__$1 = cljs.core.__destructure_map(map__11843);
var root = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11843__$1,new cljs.core.Keyword(null,"root","root",-448657453));
var __GT_eav = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11843__$1,new cljs.core.Keyword(null,"->eav","->eav",-987562248));
var snap = kotobase_peer.core.verified_node(get_fn,snapshot_cid);
var root_cid = (function (){var G__11845 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(snap,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["index-roots",root], null));
if((G__11845 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11845) : ipld.core.link_cid.call(null,G__11845));
}
})();
return kotobase_peer.core.components_prefix(components,blind_fn).then((function (prefix){
var entries = (((root_cid == null))?cljs.core.PersistentVector.EMPTY:prolly_tree.core.scan_prefix.cljs$core$IFn$_invoke$arity$4(get_fn,root_cid,(function (){var or__5162__auto__ = prefix;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),limit));
return kotobase_peer.core.pmap_async((function (p__11846){
var vec__11847 = p__11846;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11847,(0),null);
var ciphertext = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11847,(1),null);
return (decrypt_fn.cljs$core$IFn$_invoke$arity$1 ? decrypt_fn.cljs$core$IFn$_invoke$arity$1(ciphertext) : decrypt_fn.call(null,ciphertext)).then(kotobase_peer.core.leaf_decoder(snap));
}),entries);
})).then((function (triples){
var rows = (function (){var iter__5649__auto__ = (function kotobase_peer$core$cold_datoms_$_iter__11850(s__11851){
return (new cljs.core.LazySeq(null,(function (){
var s__11851__$1 = s__11851;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11851__$1);
if(temp__5825__auto__){
var s__11851__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11851__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11851__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11853 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11852 = (0);
while(true){
if((i__11852 < size__5648__auto__)){
var triple = cljs.core._nth(c__5647__auto__,i__11852);
var vec__11854 = (__GT_eav.cljs$core$IFn$_invoke$arity$1 ? __GT_eav.cljs$core$IFn$_invoke$arity$1(triple) : __GT_eav.call(null,triple));
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11854,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11854,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11854,(2),null);
cljs.core.chunk_append(b__11853,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(v),new cljs.core.Keyword(null,"added","added",2057651688),true], null));

var G__12112 = (i__11852 + (1));
i__11852 = G__12112;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11853),kotobase_peer$core$cold_datoms_$_iter__11850(cljs.core.chunk_rest(s__11851__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11853),null);
}
} else {
var triple = cljs.core.first(s__11851__$2);
var vec__11857 = (__GT_eav.cljs$core$IFn$_invoke$arity$1 ? __GT_eav.cljs$core$IFn$_invoke$arity$1(triple) : __GT_eav.call(null,triple));
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11857,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11857,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11857,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(v),new cljs.core.Keyword(null,"added","added",2057651688),true], null),kotobase_peer$core$cold_datoms_$_iter__11850(cljs.core.rest(s__11851__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(triples);
})();
var rows__$1 = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(visible_QMARK_,rows);
var rows__$2 = (function (){var G__11860 = rows__$1;
if(cljs.core.truth_(limit)){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(limit,G__11860);
} else {
return G__11860;
}
})();
return cljs.core.vec(rows__$2);
}));
}
});
/**
 * Like `cold-datoms`, but for `async-get-fn`: a Promise-returning `(fn
 *   [cid]) -> js/Promise<bytes>` that fetches DIRECTLY -- bypassing a
 *   synchronous block-miss trampoline (e.g. `kotobase-cljc-worker`'s
 *   `with-blocks`) entirely -- and uses `prolly-tree.core/scan-prefix-
 *   async`'s batched-concurrent node discovery instead of `scan-prefix`'s
 *   one-miss-discovered-per-retry-from-root pattern.
 * 
 *   Motivation, confirmed live (gftdcojp/app-aozora#78, ADR-2607120730
 *   follow-up): `scan-prefix` run over `with-blocks` re-walks AND
 *   re-decodes every already-fetched node on every retry (only raw bytes
 *   are cached, not decoded nodes), so a walk touching N distinct blocks
 *   costs O(N^2) total node decodes -- for `yoro-social-v2`'s real stuck
 *   snapshot (5130 leaf entries), a `diagHydrateCost` probe using
 *   `scan-prefix-async` completed in 806ms; the equivalent `with-blocks`-
 *   trampolined path was exceeding a 300-SECOND CPU budget. The graph was
 *   never actually too large to hydrate in one Worker invocation -- the
 *   block-discovery strategy was quadratic.
 * 
 *   Same `{:index :components :limit}`/`visible?`/`blind-fn`/`decrypt-fn`
 *   contract, same row shape, same decrypt batching (`pmap-async`) as
 *   `cold-datoms`. `:cljs`-only (`async-get-fn`/`scan-prefix-async` have no
 *   JVM analog -- JVM callers have no comparable network-latency-driven
 *   retry-inflation problem to fix).
 */
kotobase_peer.core.cold_datoms_async = (function kotobase_peer$core$cold_datoms_async(async_get_fn,snapshot_cid,p__11861,visible_QMARK_,blind_fn,decrypt_fn){
var map__11862 = p__11861;
var map__11862__$1 = cljs.core.__destructure_map(map__11862);
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11862__$1,new cljs.core.Keyword(null,"index","index",-1531685915));
var components = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11862__$1,new cljs.core.Keyword(null,"components","components",-1073188942));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11862__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
if((snapshot_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var map__11863 = (function (){var G__11864 = (function (){var or__5162__auto__ = index;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"eavt","eavt",-666437073);
}
})();
return (kotobase_peer.core.index_spec.cljs$core$IFn$_invoke$arity$1 ? kotobase_peer.core.index_spec.cljs$core$IFn$_invoke$arity$1(G__11864) : kotobase_peer.core.index_spec.call(null,G__11864));
})();
var map__11863__$1 = cljs.core.__destructure_map(map__11863);
var root = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11863__$1,new cljs.core.Keyword(null,"root","root",-448657453));
var __GT_eav = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11863__$1,new cljs.core.Keyword(null,"->eav","->eav",-987562248));
return (async_get_fn.cljs$core$IFn$_invoke$arity$1 ? async_get_fn.cljs$core$IFn$_invoke$arity$1(snapshot_cid) : async_get_fn.call(null,snapshot_cid)).then(ipld.core.decode).then((function (snap){
var root_cid = (function (){var G__11865 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(snap,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["index-roots",root], null));
if((G__11865 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11865) : ipld.core.link_cid.call(null,G__11865));
}
})();
var decode = kotobase_peer.core.leaf_decoder(snap);
return kotobase_peer.core.components_prefix(components,blind_fn).then((function (prefix){
if((root_cid == null)){
return cljs.core.PersistentVector.EMPTY;
} else {
return prolly_tree.core.scan_prefix_async.cljs$core$IFn$_invoke$arity$4(async_get_fn,root_cid,(function (){var or__5162__auto__ = prefix;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),limit);
}
})).then((function (entries){
return kotobase_peer.core.pmap_async((function (p__11866){
var vec__11867 = p__11866;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11867,(0),null);
var ciphertext = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11867,(1),null);
return (decrypt_fn.cljs$core$IFn$_invoke$arity$1 ? decrypt_fn.cljs$core$IFn$_invoke$arity$1(ciphertext) : decrypt_fn.call(null,ciphertext)).then(decode);
}),entries);
}));
})).then((function (triples){
var rows = (function (){var iter__5649__auto__ = (function kotobase_peer$core$cold_datoms_async_$_iter__11870(s__11871){
return (new cljs.core.LazySeq(null,(function (){
var s__11871__$1 = s__11871;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11871__$1);
if(temp__5825__auto__){
var s__11871__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11871__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11871__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11873 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11872 = (0);
while(true){
if((i__11872 < size__5648__auto__)){
var triple = cljs.core._nth(c__5647__auto__,i__11872);
var vec__11874 = (__GT_eav.cljs$core$IFn$_invoke$arity$1 ? __GT_eav.cljs$core$IFn$_invoke$arity$1(triple) : __GT_eav.call(null,triple));
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11874,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11874,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11874,(2),null);
cljs.core.chunk_append(b__11873,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(v),new cljs.core.Keyword(null,"added","added",2057651688),true], null));

var G__12113 = (i__11872 + (1));
i__11872 = G__12113;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11873),kotobase_peer$core$cold_datoms_async_$_iter__11870(cljs.core.chunk_rest(s__11871__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11873),null);
}
} else {
var triple = cljs.core.first(s__11871__$2);
var vec__11877 = (__GT_eav.cljs$core$IFn$_invoke$arity$1 ? __GT_eav.cljs$core$IFn$_invoke$arity$1(triple) : __GT_eav.call(null,triple));
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11877,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11877,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11877,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(v),new cljs.core.Keyword(null,"added","added",2057651688),true], null),kotobase_peer$core$cold_datoms_async_$_iter__11870(cljs.core.rest(s__11871__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(triples);
})();
var rows__$1 = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(visible_QMARK_,rows);
var rows__$2 = (function (){var G__11880 = rows__$1;
if(cljs.core.truth_(limit)){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(limit,G__11880);
} else {
return G__11880;
}
})();
return cljs.core.vec(rows__$2);
}));
}
});
/**
 * Rebuild the full hot 4-index `db` from a persisted snapshot. Reads ONE
 *   index tree (spo) in full and re-asserts every quad, so the reconstructed
 *   db is ~1× graph size. This is `fold!`'s internal starting point (hydrate
 *   the last-indexed snapshot, then re-assert novelty on top) — an O(graph_shard)
 *   operation, now paid once per fold instead of once per write. get-fn:
 *   `(get-fn cid) -> bytes`; nil snapshot → empty db.
 * 
 *   Deliberately calls `cold-datoms` with `(constantly true)`, NOT a caller-
 *   supplied `visible?`: this fn reconstructs the COMPLETE hot db for an
 *   internal structural purpose (`fold!`'s re-assert-novelty-then-resnapshot
 *   step), not a scoped read for an external caller. Any narrower `visible?`
 *   here would silently drop rows out of the rebuilt db — and since `fold!`
 *   then commits that db as the new persisted snapshot, a narrowed hydrate
 *   would bake permanent, silent data loss into the graph. Visibility belongs
 *   at the read surface (`datoms`/`cold-datoms`/`hot-datoms` called directly
 *   for a caller-facing read), never at this internal rehydration step.
 * 
 *   `blind-fn`/`decrypt-fn` (ADR-2607051000, accepted 2026-07-06) are REQUIRED
 *   and threaded straight to `cold-datoms` -- see its docstring for their
 *   contract, including the sync-JVM/Promise-cljs platform split (`cold-
 *   datoms` is itself a `js/Promise` of the rows on cljs).
 */
kotobase_peer.core.hydrate_db = (function kotobase_peer$core$hydrate_db(get_fn,snapshot_cid,blind_fn,decrypt_fn){
var build = (function kotobase_peer$core$hydrate_db_$_build(rows){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,p__11883){
var map__11884 = p__11883;
var map__11884__$1 = cljs.core.__destructure_map(map__11884);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11884__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11884__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v_edn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11884__$1,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866));
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),e,new cljs.core.Keyword(null,"p","p",151049309),a,new cljs.core.Keyword(null,"o","o",-1350007228),arrangement.core.edn__GT_link(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(v_edn))], null));
}),arrangement.core.empty_db(),rows);
});
if((snapshot_cid == null)){
return Promise.resolve(arrangement.core.empty_db());
} else {
return kotobase_peer.core.cold_datoms(get_fn,snapshot_cid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"index","index",-1531685915),new cljs.core.Keyword(null,"eavt","eavt",-666437073)], null),cljs.core.constantly(true),blind_fn,decrypt_fn).then(build);
}
});
/**
 * The cache key `hydrate-db-cached` stores/looks up its memoized rows under
 * for a given `snapshot-cid`. Exposed so callers constructing a storage-
 * backed cache-get/cache-put! (e.g. an R2 adapter keyed by string) can share
 * the exact same derivation without duplicating the "hydrate-cache/v1/"
 * namespace prefix.
 */
kotobase_peer.core.hydrate_cache_key = (function kotobase_peer$core$hydrate_cache_key(snapshot_cid){
return (""+"hydrate-cache/v1/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(snapshot_cid));
});
/**
 * Like `hydrate-db`, but memoizes the expensive `cold-datoms` decrypt-and-
 * scan result via `cache-get`/`cache-put!` (both optional; nil for either
 * disables caching, falling back to identical behavior to `hydrate-db`),
 * keyed by `snapshot-cid` (`hydrate-cache-key`) -- so a fold retried against
 * the SAME still-unfolded snapshot (the common case while a backlog is too
 * large to clear in one attempt: `snapshot-cid` doesn't change between
 * retries since no fold has succeeded yet) skips straight to a cache hit
 * instead of re-paying the O(graph_shard) decrypt-and-scan on every single
 * retry (ADR-2607120730 Part 1, "memoized hydration").
 * 
 * `cache-put!` is invoked as soon as the rows are computed -- BEFORE the
 * caller applies novelty/re-commits -- specifically so a fold attempt that
 * hydrates successfully but then exceeds its CPU budget LATER (applying
 * novelty, or `qs/commit!`'s tree rebuild) still leaves the cache populated
 * for the next attempt. This is why `cache-put!` must be a storage write
 * that lands immediately, NOT one threaded through a buffered end-of-request
 * flush (e.g. `kotobase-cljc-worker`'s `run-write-attempt` buffers `put!`
 * and only flushes to R2 after the whole call returns a response) -- a
 * cache write buffered that way would be lost on exactly the failure this
 * fn exists to survive.
 * 
 * `cache-get`/`cache-put!` are `(fn [key]) -> bytes|nil` / `(fn [key bytes])`
 * on JVM (synchronous, matching `get-fn`/`put!`'s own JVM contract); on cljs
 * they are Promise-returning (`(fn [key]) -> js/Promise<bytes|nil>` /
 * `(fn [key bytes]) -> js/Promise<_>`) since a real cache-put! is a direct
 * (unbuffered) R2 write, unlike the synchronous `get-fn`/`put!` block-store
 * trampoline.
 * 
 * Serialization deliberately does NOT `pr-str` a `cold-datoms` row
 * (`{:e :a :v_edn :added}`) as-is: `:v_edn` is already a safely-encoded EDN
 * string (`v->edn`'s `qs/link->edn` form, readable with no custom reader),
 * but `:e`/`:a` are raw decoded values that -- exactly like `:v` before
 * `v->edn` -- may themselves be `ipld.core` Links, which plain `pr-str`
 * shreds into a bare, untyped seq on read-back (the same regression
 * `v->edn`'s docstring/ADR-2607051000 follow-up already document for `:v`).
 * Each row is therefore re-encoded through the SAME `v->edn`/`qs/edn->link`
 * round-trip for `:e` and `:a` too before caching.
 * 
 * `async-get-fn` (optional, `:cljs` only, nil-safe -- absent falls back to
 * `cold-datoms`'s `with-blocks`-trampolined scan, identical to before this
 * param existed): a DIRECT Promise-returning `(fn [cid]) -> js/Promise
 * <bytes>`, routed to `cold-datoms-async` instead of `cold-datoms` --
 * confirmed live (ADR-2607120730 follow-up) to fix the actual dominant
 * cost of a stuck fold: `with-blocks`' one-miss-per-retry-from-root
 * trampoline re-walks/re-decodes every already-fetched node on every
 * retry, O(N^2) for a tree touching N distinct blocks, regardless of
 * `cache-get`/`cache-put!` (which only helps a SECOND attempt against an
 * already-hydrated snapshot -- if the FIRST hydrate itself never
 * completes, cache-put! never even fires). `cold-datoms-async`'s batched-
 * concurrent discovery is O(N).
 */
kotobase_peer.core.hydrate_db_cached = (function kotobase_peer$core$hydrate_db_cached(var_args){
var G__11886 = arguments.length;
switch (G__11886) {
case 6:
return kotobase_peer.core.hydrate_db_cached.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
case 7:
return kotobase_peer.core.hydrate_db_cached.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.hydrate_db_cached.cljs$core$IFn$_invoke$arity$6 = (function (get_fn,snapshot_cid,blind_fn,decrypt_fn,cache_get,cache_put_BANG_){
return kotobase_peer.core.hydrate_db_cached.cljs$core$IFn$_invoke$arity$7(get_fn,snapshot_cid,blind_fn,decrypt_fn,cache_get,cache_put_BANG_,null);
}));

(kotobase_peer.core.hydrate_db_cached.cljs$core$IFn$_invoke$arity$7 = (function (get_fn,snapshot_cid,blind_fn,decrypt_fn,cache_get,cache_put_BANG_,async_get_fn){
var build = (function kotobase_peer$core$build(rows){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,p__11895){
var map__11896 = p__11895;
var map__11896__$1 = cljs.core.__destructure_map(map__11896);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11896__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11896__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v_edn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11896__$1,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866));
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),e,new cljs.core.Keyword(null,"p","p",151049309),a,new cljs.core.Keyword(null,"o","o",-1350007228),arrangement.core.edn__GT_link(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(v_edn))], null));
}),arrangement.core.empty_db(),rows);
});
var encode_rows = (function kotobase_peer$core$encode_rows(rows){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__11897){
var map__11898 = p__11897;
var map__11898__$1 = cljs.core.__destructure_map(map__11898);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11898__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11898__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v_edn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11898__$1,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866));
var added = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11898__$1,new cljs.core.Keyword(null,"added","added",2057651688));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase_peer.core.v__GT_edn(e),kotobase_peer.core.v__GT_edn(a),v_edn,added], null);
}),rows)], 0));
});
var decode_rows = (function kotobase_peer$core$decode_rows(s){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__11899){
var vec__11900 = p__11899;
var e_edn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11900,(0),null);
var a_edn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11900,(1),null);
var v_edn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11900,(2),null);
var added = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11900,(3),null);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),arrangement.core.edn__GT_link(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(e_edn)),new cljs.core.Keyword(null,"a","a",-2123407586),arrangement.core.edn__GT_link(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(a_edn)),new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),v_edn,new cljs.core.Keyword(null,"added","added",2057651688),added], null);
}),cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(s));
});
if((snapshot_cid == null)){
return Promise.resolve(arrangement.core.empty_db());
} else {
return (cljs.core.truth_(cache_get)?(function (){var G__11903 = kotobase_peer.core.hydrate_cache_key(snapshot_cid);
return (cache_get.cljs$core$IFn$_invoke$arity$1 ? cache_get.cljs$core$IFn$_invoke$arity$1(G__11903) : cache_get.call(null,G__11903));
})():Promise.resolve(null)).then((function (cached){
if(cljs.core.truth_(cached)){
return build(decode_rows(cached));
} else {
return (cljs.core.truth_(async_get_fn)?kotobase_peer.core.cold_datoms_async(async_get_fn,snapshot_cid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"index","index",-1531685915),new cljs.core.Keyword(null,"eavt","eavt",-666437073)], null),cljs.core.constantly(true),blind_fn,decrypt_fn):kotobase_peer.core.cold_datoms(get_fn,snapshot_cid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"index","index",-1531685915),new cljs.core.Keyword(null,"eavt","eavt",-666437073)], null),cljs.core.constantly(true),blind_fn,decrypt_fn)).then((function (rows){
return (cljs.core.truth_(cache_put_BANG_)?(function (){var G__11904 = kotobase_peer.core.hydrate_cache_key(snapshot_cid);
var G__11905 = encode_rows(rows);
return (cache_put_BANG_.cljs$core$IFn$_invoke$arity$2 ? cache_put_BANG_.cljs$core$IFn$_invoke$arity$2(G__11904,G__11905) : cache_put_BANG_.call(null,G__11904,G__11905));
})():Promise.resolve(null)).then((function (_){
return build(rows);
}));
}));
}
}));
}
}));

(kotobase_peer.core.hydrate_db_cached.cljs$lang$maxFixedArity = 7);

/**
 * Rebuild the full hot db AS OF `chain-cid` — the persisted `indexed`
 * snapshot PLUS any not-yet-folded `novelty` re-asserted on top, in append
 * order. Unlike `hydrate-db` (indexed snapshot only, `fold!`'s internal
 * building block), this matches exactly what `fold!` would commit if
 * called at this exact point: `(hydrate-chain get-fn (as-of get-fn
 * chain-cid seq) blind-fn decrypt-fn)` is a true database VALUE as of
 * that point in history, safe to `q`/`query`/`pull` against like any
 * other hot db.
 * 
 * `blind-fn`/`decrypt-fn` (ADR-2607051000) REQUIRED, same contract as
 * `hydrate-db`/`hot-datoms`. Synchronous on JVM; a `js/Promise` of the db
 * on cljs.
 */
kotobase_peer.core.hydrate_chain = (function kotobase_peer$core$hydrate_chain(get_fn,chain_cid,blind_fn,decrypt_fn){
var state = kotobase_peer.core.state_at(get_fn,chain_cid);
var novelty = kotobase_peer.core.novelty_cids(get_fn,state);
return Promise.all([kotobase_peer.core.hydrate_db(get_fn,kotobase_peer.core.indexed_cid(state),blind_fn,decrypt_fn),kotobase_peer.core.pmap_async((function (cid){
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}),novelty)]).then((function (results){
var vec__11907 = cljs.core.vec(results);
var base = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11907,(0),null);
var novelty_quads_per_cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11907,(1),null);
var novelty_quads = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,novelty_quads_per_cid);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,q){
return kotobase_peer.core.apply_quad(db,q,ipld.core.link_QMARK_);
}),base,novelty_quads);
}));
});
kotobase_peer.core.delta__GT_quad = (function kotobase_peer$core$delta__GT_quad(p__11910){
var map__11911 = p__11910;
var map__11911__$1 = cljs.core.__destructure_map(map__11911);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11911__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11911__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11911__$1,new cljs.core.Keyword(null,"v","v",21465059));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11911__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"s","s",1705939918),e,new cljs.core.Keyword(null,"p","p",151049309),a,new cljs.core.Keyword(null,"o","o",-1350007228),v,new cljs.core.Keyword(null,"op","op",-1882987955),op], null);
});
/**
 * Rebuild only the current subjects TX-DATA can change. The indexed half is
 * read as one EAVT prefix range per distinct subject; unfolded novelty blocks
 * are fetched once and only matching subjects are replayed. This preserves
 * `transact-effective` semantics (including retractEntity) without hydrating
 * unrelated graph rows. Sync on JVM, Promise on cljs. OPTS currently accepts
 * cljs-only `:async-get-fn` for direct bounded object-store reads.
 */
kotobase_peer.core.hydrate_transaction_slice = (function kotobase_peer$core$hydrate_transaction_slice(var_args){
var G__11916 = arguments.length;
switch (G__11916) {
case 5:
return kotobase_peer.core.hydrate_transaction_slice.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return kotobase_peer.core.hydrate_transaction_slice.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.hydrate_transaction_slice.cljs$core$IFn$_invoke$arity$5 = (function (get_fn,chain_cid,tx_data,blind_fn,decrypt_fn){
return kotobase_peer.core.hydrate_transaction_slice.cljs$core$IFn$_invoke$arity$6(get_fn,chain_cid,tx_data,blind_fn,decrypt_fn,cljs.core.PersistentArrayMap.EMPTY);
}));

(kotobase_peer.core.hydrate_transaction_slice.cljs$core$IFn$_invoke$arity$6 = (function (get_fn,chain_cid,tx_data,blind_fn,decrypt_fn,p__11917){
var map__11918 = p__11917;
var map__11918__$1 = cljs.core.__destructure_map(map__11918);
var async_get_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11918__$1,new cljs.core.Keyword(null,"async-get-fn","async-get-fn",-424674493));
var subjects = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"s","s",1705939918),kotobase_peer.core.__GT_quad)),tx_data);
var state = kotobase_peer.core.state_at(get_fn,chain_cid);
var snapshot_cid = kotobase_peer.core.indexed_cid(state);
var novelty = (function (){var or__5162__auto__ = kotobase_peer.core.indexed_novelty_entries(get_fn,state);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase_peer.core.novelty_entries(get_fn,state);
}
})();
var matching_entries = (function (subject_tokens){
return cljs.core.filterv((function (p__11919){
var map__11920 = p__11919;
var map__11920__$1 = cljs.core.__destructure_map(map__11920);
var entry_tokens = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11920__$1,new cljs.core.Keyword(null,"subjects","subjects",21416729));
var or__5162__auto__ = (entry_tokens == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
return cljs.core.some(subject_tokens,entry_tokens);
}
}),novelty);
});
var rows__GT_db = (function (rows){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,p__11921){
var map__11922 = p__11921;
var map__11922__$1 = cljs.core.__destructure_map(map__11922);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11922__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11922__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v_edn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11922__$1,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866));
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),e,new cljs.core.Keyword(null,"p","p",151049309),a,new cljs.core.Keyword(null,"o","o",-1350007228),arrangement.core.edn__GT_link(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(v_edn))], null),ipld.core.link_QMARK_);
}),arrangement.core.empty_db(),rows);
});
var replay = (function (rows,novelty_per_cid){
var base = rows__GT_db(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,rows));
var relevant = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__11912_SHARP_){
return cljs.core.contains_QMARK_(subjects,new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(p1__11912_SHARP_));
}),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,novelty_per_cid));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,q){
return kotobase_peer.core.apply_quad(db,q,ipld.core.link_QMARK_);
}),base,relevant);
});
return kotobase_peer.core.pmap_async(blind_fn,subjects).then((function (tokens){
var entries = matching_entries(cljs.core.set(tokens));
return Promise.all([kotobase_peer.core.pmap_async((function (subject){
if(cljs.core.truth_(async_get_fn)){
return kotobase_peer.core.cold_datoms_async(async_get_fn,snapshot_cid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"index","index",-1531685915),new cljs.core.Keyword(null,"eavt","eavt",-666437073),new cljs.core.Keyword(null,"components","components",-1073188942),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [subject], null)], null),cljs.core.constantly(true),blind_fn,decrypt_fn);
} else {
return kotobase_peer.core.cold_datoms(get_fn,snapshot_cid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"index","index",-1531685915),new cljs.core.Keyword(null,"eavt","eavt",-666437073),new cljs.core.Keyword(null,"components","components",-1073188942),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [subject], null)], null),cljs.core.constantly(true),blind_fn,decrypt_fn);
}
}),subjects),kotobase_peer.core.pmap_async((function (p__11923){
var map__11924 = p__11923;
var map__11924__$1 = cljs.core.__destructure_map(map__11924);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11924__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
if(cljs.core.truth_(async_get_fn)){
return kotobase_peer.core.read_tx_block_async(async_get_fn,cid,decrypt_fn);
} else {
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}
}),entries)]);
})).then((function (results){
var vec__11925 = cljs.core.vec(results);
var rows = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11925,(0),null);
var novelty_quads = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11925,(1),null);
return replay(rows,novelty_quads);
}));
}));

(kotobase_peer.core.hydrate_transaction_slice.cljs$lang$maxFixedArity = 6);

/**
 * Correctness-first persisted transactor path. Hydrates the actual CAS head,
 * normalizes TX-DATA against that database value, and persists only effective
 * state transitions. A semantic no-op writes no blocks and does not call
 * `cas!`; a lost CAS race retries from (and re-normalizes against) the actual
 * winning head.
 * 
 * Returns a report containing `:committed?`, `:chain-cid-before`,
 * `:chain-cid-after`, and `:effective-deltas`. OPTS accepts `:max-retries`
 * (default `default-max-cas-retries`). This path intentionally pays the current
 * full-hydration cost. `commit-serialized!` remains the O(tx) append path for
 * callers which have already normalized their transaction. OPTS also forwards
 * cljs-only `:async-get-fn` to the transaction-slice reader.
 */
kotobase_peer.core.commit_serialized_effective_BANG_ = (function kotobase_peer$core$commit_serialized_effective_BANG_(var_args){
var G__11929 = arguments.length;
switch (G__11929) {
case 9:
return kotobase_peer.core.commit_serialized_effective_BANG_.cljs$core$IFn$_invoke$arity$9((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]));

break;
case 10:
return kotobase_peer.core.commit_serialized_effective_BANG_.cljs$core$IFn$_invoke$arity$10((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.commit_serialized_effective_BANG_.cljs$core$IFn$_invoke$arity$9 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn,blind_fn,decrypt_fn){
return kotobase_peer.core.commit_serialized_effective_BANG_.cljs$core$IFn$_invoke$arity$10(put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn,blind_fn,decrypt_fn,cljs.core.PersistentArrayMap.EMPTY);
}));

(kotobase_peer.core.commit_serialized_effective_BANG_.cljs$core$IFn$_invoke$arity$10 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,tx_data,encrypt_fn,blind_fn,decrypt_fn,p__11930){
var map__11931 = p__11930;
var map__11931__$1 = cljs.core.__destructure_map(map__11931);
var opts = map__11931__$1;
var max_retries = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__11931__$1,new cljs.core.Keyword(null,"max-retries","max-retries",-1933762121),kotobase_peer.core.default_max_cas_retries);
var report = (function (before,after,deltas,committed_QMARK_,attempts){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"committed?","committed?",-1852070345),committed_QMARK_,new cljs.core.Keyword(null,"chain-cid-before","chain-cid-before",956922648),before,new cljs.core.Keyword(null,"chain-cid-after","chain-cid-after",-1567090406),after,new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987),deltas,new cljs.core.Keyword(null,"attempts","attempts",1024246729),attempts], null);
});
var attempt = (function kotobase_peer$core$attempt(current_cid,attempts){
if((attempts > max_retries)){
return Promise.reject(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: commit-serialized-effective! exceeded max-cas-retries",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"head-key","head-key",1479955464),head_key,new cljs.core.Keyword(null,"attempts","attempts",1024246729),attempts], null)));
} else {
return kotobase_peer.core.hydrate_transaction_slice.cljs$core$IFn$_invoke$arity$6(get_fn,current_cid,tx_data,blind_fn,decrypt_fn,opts).then((function (db){
var map__11933 = kotobase_peer.core.transact_effective.cljs$core$IFn$_invoke$arity$2(db,tx_data);
var map__11933__$1 = cljs.core.__destructure_map(map__11933);
var effective_deltas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11933__$1,new cljs.core.Keyword(null,"effective-deltas","effective-deltas",1827051987));
if(cljs.core.empty_QMARK_(effective_deltas)){
return report(current_cid,current_cid,cljs.core.PersistentVector.EMPTY,false,attempts);
} else {
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$6(put_BANG_,get_fn,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase_peer.core.delta__GT_quad,effective_deltas),current_cid,encrypt_fn,blind_fn).then((function (new_cid){
return Promise.resolve((cas_BANG_.cljs$core$IFn$_invoke$arity$3 ? cas_BANG_.cljs$core$IFn$_invoke$arity$3(head_key,current_cid,new_cid) : cas_BANG_.call(null,head_key,current_cid,new_cid))).then((function (actual){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(actual,new_cid)){
return report(current_cid,new_cid,effective_deltas,true,attempts);
} else {
return kotobase_peer$core$attempt(actual,(attempts + (1)));
}
}));
}));
}
}));
}
});
return attempt(expected_chain_cid,(0));
}));

(kotobase_peer.core.commit_serialized_effective_BANG_.cljs$lang$maxFixedArity = 10);

/**
 * `hydrate-chain`, with the SNAPSHOT portion memoized through
 * `hydrate-db-cached`'s encoded-rows cache -- `cache-get`/`cache-put!`
 * (both optional; nil for either falls back to plain `hydrate-db`
 * behavior for the snapshot), keyed by snapshot-cid via
 * `hydrate-cache-key`, plus `hydrate-db-cached`'s optional
 * `async-get-fn` (`:cljs` only) for `cold-datoms-async`'s
 * batched-concurrent block discovery. The NOVELTY portion is replayed
 * fresh every call, exactly as `hydrate-chain` does -- novelty is the
 * part that changes between commits, and (post-fold) the part that is
 * small; the snapshot is the part that is big and immutable per
 * snapshot-cid, hence the only part worth caching.
 * 
 * Motivation (net-kotobase/kotobase-cf-wasm, 2026-07-24): a serving
 * isolate's FIRST read of a graph re-pays the full snapshot
 * decrypt-and-scan even when a sibling isolate in the same colo hydrated
 * the same snapshot moments earlier; a colo-shared rows cache (e.g.
 * Cloudflare Cache API) behind `cache-get`/`cache-put!` turns that into
 * one blob fetch + decode. Same contract as `hydrate-db-cached` for the
 * cache fns: sync bytes|nil on JVM, Promise-returning on cljs.
 * 
 * Sound by immutability: the cache key is the snapshot-cid (content
 * address); a fold produces a NEW snapshot-cid. Rows land in the cache
 * DECRYPTED (encoded via `hydrate-db-cached`'s own codec) -- callers
 * whose cache medium is less trusted than their own runtime memory must
 * encrypt the blob themselves inside `cache-put!`/`cache-get`.
 * 
 * Synchronous on JVM; a `js/Promise` of the db on cljs.
 */
kotobase_peer.core.hydrate_chain_cached = (function kotobase_peer$core$hydrate_chain_cached(var_args){
var G__11936 = arguments.length;
switch (G__11936) {
case 6:
return kotobase_peer.core.hydrate_chain_cached.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
case 7:
return kotobase_peer.core.hydrate_chain_cached.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.hydrate_chain_cached.cljs$core$IFn$_invoke$arity$6 = (function (get_fn,chain_cid,blind_fn,decrypt_fn,cache_get,cache_put_BANG_){
return kotobase_peer.core.hydrate_chain_cached.cljs$core$IFn$_invoke$arity$7(get_fn,chain_cid,blind_fn,decrypt_fn,cache_get,cache_put_BANG_,null);
}));

(kotobase_peer.core.hydrate_chain_cached.cljs$core$IFn$_invoke$arity$7 = (function (get_fn,chain_cid,blind_fn,decrypt_fn,cache_get,cache_put_BANG_,async_get_fn){
var state = kotobase_peer.core.state_at(get_fn,chain_cid);
var novelty = kotobase_peer.core.novelty_cids(get_fn,state);
return Promise.all([kotobase_peer.core.hydrate_db_cached.cljs$core$IFn$_invoke$arity$7(get_fn,kotobase_peer.core.indexed_cid(state),blind_fn,decrypt_fn,cache_get,cache_put_BANG_,async_get_fn),kotobase_peer.core.pmap_async((function (cid){
if(cljs.core.truth_(async_get_fn)){
return kotobase_peer.core.read_tx_block_async(async_get_fn,cid,decrypt_fn);
} else {
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}
}),novelty)]).then((function (results){
var vec__11937 = cljs.core.vec(results);
var base = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11937,(0),null);
var novelty_quads_per_cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11937,(1),null);
var novelty_quads = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,novelty_quads_per_cid);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,q){
return kotobase_peer.core.apply_quad(db,q,ipld.core.link_QMARK_);
}),base,novelty_quads);
}));
}));

(kotobase_peer.core.hydrate_chain_cached.cljs$lang$maxFixedArity = 7);

/**
 * Walk `chain-cid`'s full history: for each commit whose OWN novelty list
 * grew by exactly one entry relative to the PREVIOUS commit (a plain
 * `commit!` append, not a `fold!` compaction/reset) AND whose `:seq` is
 * greater than `after-seq`, collect that commit's newest novelty tx-cid.
 * A `fold!` commit itself contributes nothing (folding restructures
 * already-seen data into an indexed snapshot, it doesn't add new user
 * data) -- but any ORIGINAL `commit!` this walk already passed still
 * counts regardless of a LATER fold, since this reads each commit's
 * HISTORICAL state as it was at that point in the chain, not just the
 * tip's current shape. Shared walk `since`/`history` both build on.
 * 
 * Per-commit cost: O(1) for a state already in the new front/back shape
 * (`novelty-count` read directly, `newest-novelty-cid` peeks novelty-back's
 * head node — never walks the full per-commit backlog just to size or
 * peek it); O(legacy novelty length) for a commit still in the pre-
 * kotoba-lang/kotobase-peer#16-fix flat-vector shape (unavoidable — that
 * shape has no cheaper way to answer either question).
 */
kotobase_peer.core.newly_added_transactions = (function kotobase_peer$core$newly_added_transactions(get_fn,chain_cid,after_seq){
var prev_count = (0);
var remaining = kotobase_peer.core.chain(get_fn,chain_cid);
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(remaining)){
return acc;
} else {
var map__11941 = cljs.core.first(remaining);
var map__11941__$1 = cljs.core.__destructure_map(map__11941);
var seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11941__$1,new cljs.core.Keyword(null,"seq","seq",-1817803783));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11941__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var norm = kotobase_peer.core.normalize_state(state);
var cur_count = ((kotobase_peer.core.legacy_novelty_state_QMARK_(norm))?cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$3(norm,"novelty",cljs.core.PersistentVector.EMPTY)):cljs.core.get.cljs$core$IFn$_invoke$arity$3(norm,"novelty-count",(0)));
var G__12118 = cur_count;
var G__12119 = cljs.core.rest(remaining);
var G__12120 = (((((seq > after_seq)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cur_count,(prev_count + (1))))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"t","t",-1397832519),seq,new cljs.core.Keyword(null,"tx-cid","tx-cid",2049864488),kotobase_peer.core.newest_novelty_cid(get_fn,norm)], null)):acc);
prev_count = G__12118;
remaining = G__12119;
acc = G__12120;
continue;
}
break;
}
});
kotobase_peer.core.newly_added_tx_cids = (function kotobase_peer$core$newly_added_tx_cids(get_fn,chain_cid,after_seq){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"tx-cid","tx-cid",2049864488),kotobase_peer.core.newly_added_transactions(get_fn,chain_cid,after_seq));
});
/**
 * Return committed transaction-log entries in `[start, end)`.
 * 
 *   Each entry contains the immutable chain sequence `:t`, the encrypted
 *   transaction block CID as `:tx-cid`, and raw operation-shaped `:data`.
 *   Assertions/retractions carry Datomic-shaped `:added`; retractEntity is
 *   retained as an explicit marker because the original transaction block does
 *   not duplicate every affected datom. Synchronous on JVM and Promise-returning
 *   on ClojureScript.
 */
kotobase_peer.core.tx_range = (function kotobase_peer$core$tx_range(var_args){
var G__11944 = arguments.length;
switch (G__11944) {
case 3:
return kotobase_peer.core.tx_range.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 5:
return kotobase_peer.core.tx_range.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.tx_range.cljs$core$IFn$_invoke$arity$3 = (function (get_fn,chain_cid,decrypt_fn){
return kotobase_peer.core.tx_range.cljs$core$IFn$_invoke$arity$5(get_fn,chain_cid,null,null,decrypt_fn);
}));

(kotobase_peer.core.tx_range.cljs$core$IFn$_invoke$arity$5 = (function (get_fn,chain_cid,start,end,decrypt_fn){
var start__$1 = (function (){var or__5162__auto__ = start;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (0);
}
})();
var selected = cljs.core.filterv((function (p__11945){
var map__11946 = p__11945;
var map__11946__$1 = cljs.core.__destructure_map(map__11946);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11946__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
return (((start__$1 <= t)) && ((((end == null)) || ((t < end)))));
}),kotobase_peer.core.newly_added_transactions(get_fn,chain_cid,(start__$1 - (1))));
var entry = (function (p__11947,quads){
var map__11948 = p__11947;
var map__11948__$1 = cljs.core.__destructure_map(map__11948);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11948__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var tx_cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11948__$1,new cljs.core.Keyword(null,"tx-cid","tx-cid",2049864488));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"t","t",-1397832519),t,new cljs.core.Keyword(null,"tx-cid","tx-cid",2049864488),tx_cid,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__11949){
var map__11950 = p__11949;
var map__11950__$1 = cljs.core.__destructure_map(map__11950);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11950__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11950__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11950__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11950__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"retract-entity","retract-entity",-2035411479),op)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),s,new cljs.core.Keyword(null,"retract-entity","retract-entity",-2035411479),true,new cljs.core.Keyword(null,"added","added",2057651688),false], null);
} else {
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),s,new cljs.core.Keyword(null,"a","a",-2123407586),p,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(o),new cljs.core.Keyword(null,"added","added",2057651688),cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"retract","retract",-1549826125),op)], null);
}
}),quads)], null);
});
return kotobase_peer.core.pmap_async((function (transaction){
return kotobase_peer.core.read_tx_block(get_fn,new cljs.core.Keyword(null,"tx-cid","tx-cid",2049864488).cljs$core$IFn$_invoke$arity$1(transaction),decrypt_fn).then((function (p1__11942_SHARP_){
return entry(transaction,p1__11942_SHARP_);
}));
}),selected).then(cljs.core.vec);
}));

(kotobase_peer.core.tx_range.cljs$lang$maxFixedArity = 5);

/**
 * A hot db containing ONLY the quads from commits with `:seq` greater
 * than `since-seq` -- Datomic's `since`, a view of what changed AFTER a
 * point (NOT merged with state as-of that point; for the merged
 * "everything up to and including now" view, use `hydrate-chain` on
 * the chain-cid itself). See `newly-added-tx-cids` for exactly which
 * commits this includes. `decrypt-fn` (ADR-2607051000) REQUIRED.
 * Synchronous on JVM; a `js/Promise` of the db on cljs.
 */
kotobase_peer.core.since = (function kotobase_peer$core$since(get_fn,chain_cid,since_seq,decrypt_fn){
var tx_cids = kotobase_peer.core.newly_added_tx_cids(get_fn,chain_cid,since_seq);
return kotobase_peer.core.pmap_async((function (cid){
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}),tx_cids).then((function (quads_per_cid){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,q){
return kotobase_peer.core.apply_quad(db,q,ipld.core.link_QMARK_);
}),arrangement.core.empty_db(),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,quads_per_cid));
}));
});
kotobase_peer.core.spo__GT_quads = (function kotobase_peer$core$spo__GT_quads(db){
var iter__5649__auto__ = (function kotobase_peer$core$spo__GT_quads_$_iter__11952(s__11953){
return (new cljs.core.LazySeq(null,(function (){
var s__11953__$1 = s__11953;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11953__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11960 = cljs.core.first(xs__6385__auto__);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11960,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11960,(1),null);
var iterys__5645__auto__ = ((function (s__11953__$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__){
return (function kotobase_peer$core$spo__GT_quads_$_iter__11952_$_iter__11954(s__11955){
return (new cljs.core.LazySeq(null,((function (s__11953__$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__11955__$1 = s__11955;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11955__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__11963 = cljs.core.first(xs__6385__auto____$1);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11963,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11963,(1),null);
var iterys__5645__auto__ = ((function (s__11955__$1,s__11953__$1,vec__11963,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__){
return (function kotobase_peer$core$spo__GT_quads_$_iter__11952_$_iter__11954_$_iter__11956(s__11957){
return (new cljs.core.LazySeq(null,((function (s__11955__$1,s__11953__$1,vec__11963,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__11957__$1 = s__11957;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__11957__$1);
if(temp__5825__auto____$2){
var s__11957__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__11957__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11957__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11959 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11958 = (0);
while(true){
if((i__11958 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__11958);
cljs.core.chunk_append(b__11959,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),e,new cljs.core.Keyword(null,"p","p",151049309),a,new cljs.core.Keyword(null,"o","o",-1350007228),v], null));

var G__12122 = (i__11958 + (1));
i__11958 = G__12122;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11959),kotobase_peer$core$spo__GT_quads_$_iter__11952_$_iter__11954_$_iter__11956(cljs.core.chunk_rest(s__11957__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11959),null);
}
} else {
var v = cljs.core.first(s__11957__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),e,new cljs.core.Keyword(null,"p","p",151049309),a,new cljs.core.Keyword(null,"o","o",-1350007228),v], null),kotobase_peer$core$spo__GT_quads_$_iter__11952_$_iter__11954_$_iter__11956(cljs.core.rest(s__11957__$2)));
}
} else {
return null;
}
break;
}
});})(s__11955__$1,s__11953__$1,vec__11963,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__11955__$1,s__11953__$1,vec__11963,a,vs,xs__6385__auto____$1,temp__5825__auto____$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$spo__GT_quads_$_iter__11952_$_iter__11954(cljs.core.rest(s__11955__$1)));
} else {
var G__12123 = cljs.core.rest(s__11955__$1);
s__11955__$1 = G__12123;
continue;
}
} else {
return null;
}
break;
}
});})(s__11953__$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__11953__$1,vec__11960,e,attrs,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(attrs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$spo__GT_quads_$_iter__11952(cljs.core.rest(s__11953__$1)));
} else {
var G__12124 = cljs.core.rest(s__11953__$1);
s__11953__$1 = G__12124;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db));
});
/**
 * [current-db audit-db] after replaying every quad in `quads` (in order).
 * `current-db` applies ops normally (assert/retract/retract-entity, same
 * as `apply-quad` -- used ONLY to know a `:retract-entity`'s prior attrs
 * when it's hit, never returned to callers). `audit-db` never retracts:
 * every (e,a,v) any op ever named is `assert-quad`'d in and stays.
 */
kotobase_peer.core.audit_replay = (function kotobase_peer$core$audit_replay(quads,ref_QMARK_){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__11966,p__11967){
var vec__11968 = p__11966;
var cur = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11968,(0),null);
var audit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11968,(1),null);
var map__11971 = p__11967;
var map__11971__$1 = cljs.core.__destructure_map(map__11971);
var q = map__11971__$1;
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11971__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11971__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11971__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11971__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var G__11972 = (function (){var or__5162__auto__ = op;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"assert","assert",-963103026);
}
})();
var G__11972__$1 = (((G__11972 instanceof cljs.core.Keyword))?G__11972.fqn:null);
switch (G__11972__$1) {
case "assert":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(cur,q,ref_QMARK_),arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(audit,q,ref_QMARK_)], null);

break;
case "retract":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3(cur,q,ref_QMARK_),arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(audit,q,ref_QMARK_)], null);

break;
case "retract-entity":
var prior = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(cur,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spo","spo",734923469),s], null),cljs.core.PersistentArrayMap.EMPTY);
var audit_SINGLEQUOTE_ = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (a,p__11973){
var vec__11974 = p__11973;
var p__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11974,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11974,(1),null);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (a__$1,v){
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(a__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p__$1,new cljs.core.Keyword(null,"o","o",-1350007228),v], null),ref_QMARK_);
}),a,vs);
}),audit,prior);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase_peer.core.retract_entity_STAR_(cur,s,ref_QMARK_),audit_SINGLEQUOTE_], null);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11972__$1))));

}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arrangement.core.empty_db(),arrangement.core.empty_db()], null),quads);
});
/**
 * A hot db containing every quad EVER asserted via any commit rooted at
 * `chain-cid`, across its WHOLE history from genesis to tip -- Datomic's
 * `history`: every assertion that ever reached the chain, union'd across
 * fold compactions, INCLUDING facts later retracted (ADR-2607071610 Phase
 * 2 -- see `audit-replay`'s docstring for the confirmed bug this fixes in
 * how this fn used to be composed; the promise below is now actually true).
 * Separately, two `commit!` calls asserting different values for the
 * same `(s, p)` pair both remain visible (`arrangement.core` has no
 * cardinality tracking of its own, ADR-2607061200 pillar note;
 * `transact-with-schema`'s cardinality `:one` retraction happens on hot
 * db values). What `history` gives: a complete, literal audit trail
 * across `fold!` compactions -- data folded away from `hot-datoms`'
 * novelty view remains fully reconstructable here.
 * 
 * Built from replaying `(newly-added-tx-cids get-fn chain-cid -1)` (every
 * novelty tx-block ever appended, across the whole chain -- `-1` because
 * every real commit's `:seq` is >= 0) via `audit-replay`, UNION the tip's
 * `indexed` snapshot (`hydrate-db`, which already subsumes everything
 * folded before it -- also the only source of any content a `snapshot!`-
 * seeded genesis contributed, see the HONEST LIMITATION below). Overlap
 * between the two (a commit whose novelty was later folded appears in
 * both) is harmless: `arrangement.core`'s indices are sets, re-asserting
 * an identical fact is a no-op.
 * 
 * HONEST LIMITATION: content seeded via `snapshot!` (the cold-start/
 * migration entry point, NOT the novelty-log `commit!` path) has no
 * individual assert history -- it was never transacted through the
 * novelty log, so there's no tx block recording how it came to exist.
 * The union with the tip snapshot means CURRENTLY-live seeded facts still
 * appear here, but a seeded fact that was LATER retracted would not (no
 * audit event for it ever existed) -- an honest gap from import-without-
 * a-log, not something this fn can paper over.
 * 
 * `blind-fn`/`decrypt-fn` (ADR-2607051000) REQUIRED, same contract as
 * `hydrate-db`/`since`. Synchronous on JVM; a `js/Promise` of the db on
 * cljs.
 */
kotobase_peer.core.history = (function kotobase_peer$core$history(get_fn,chain_cid,blind_fn,decrypt_fn){
var tx_cids = kotobase_peer.core.newly_added_tx_cids(get_fn,chain_cid,(-1));
return Promise.all([kotobase_peer.core.pmap_async((function (cid){
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}),tx_cids),kotobase_peer.core.hydrate_db(get_fn,kotobase_peer.core.latest_snapshot_cid(get_fn,chain_cid),blind_fn,decrypt_fn)]).then((function (results){
var vec__11978 = cljs.core.vec(results);
var quads_per_cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11978,(0),null);
var snap_db = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11978,(1),null);
var quads = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,quads_per_cid);
var vec__11981 = kotobase_peer.core.audit_replay(quads,ipld.core.link_QMARK_);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11981,(0),null);
var audit_db = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11981,(1),null);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(arrangement.core.assert_quad,snap_db,kotobase_peer.core.spo__GT_quads(audit_db));
}));
});
/**
 * Datomic `(d/datoms (d/history db) ...)`-shaped rows `{:e :a :v_edn
 * :added}` (ADR-2607071610 Phase 2's other half -- `history` above gives
 * a queryable hot-db VALUE with retracted facts folded back in
 * indistinguishably from live ones; this gives the actual EVENT LOG,
 * distinguishing an assert from a retract via `:added`).
 * 
 * Replays the same whole-chain walk `history` does (`audit-replay`, see
 * its docstring for the confirmed bug it fixes), but returns the ORDERED
 * ROW SEQUENCE instead of a db value: `:added true` for an assert,
 * `:added false` for a retract or (one row per attribute the entity held
 * at that moment) a `:retract-entity` -- the op itself carries no attrs,
 * so this asks the SAME running current-state the replay already tracks
 * internally to know what they were.
 * 
 * `entity` (optional, a `:db/id` string): when given, only that entity's
 * rows are emitted -- the single most common `(d/history db)` ask ("what
 * happened to THIS entity"). The full replay always runs regardless (an
 * unrelated entity's `:retract-entity` still needs correct running
 * state); only the emitted rows are narrowed. `nil` = whole-graph history
 * -- correct but O(all history) with no narrowing; prefer passing
 * `entity` on any graph with real write volume.
 * 
 * Does NOT union the tip's indexed snapshot the way `history` does: a
 * `snapshot!`-seeded fact has no assert EVENT to show (see `history`'s
 * own HONEST LIMITATION note) -- this fn stays honest about that instead
 * of synthesizing a fake `:added true` row with no real event behind it.
 * 
 * `visible?`/`decrypt-fn` REQUIRED, same convention as every other read
 * fn here. Synchronous on JVM; a `js/Promise` of the rows on cljs.
 */
kotobase_peer.core.history_datoms = (function kotobase_peer$core$history_datoms(var_args){
var G__11986 = arguments.length;
switch (G__11986) {
case 4:
return kotobase_peer.core.history_datoms.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return kotobase_peer.core.history_datoms.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.history_datoms.cljs$core$IFn$_invoke$arity$4 = (function (get_fn,chain_cid,visible_QMARK_,decrypt_fn){
return kotobase_peer.core.history_datoms.cljs$core$IFn$_invoke$arity$5(get_fn,chain_cid,null,visible_QMARK_,decrypt_fn);
}));

(kotobase_peer.core.history_datoms.cljs$core$IFn$_invoke$arity$5 = (function (get_fn,chain_cid,entity,visible_QMARK_,decrypt_fn){
var row = (function (s,p,v,added){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),s,new cljs.core.Keyword(null,"a","a",-2123407586),p,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),kotobase_peer.core.v__GT_edn(v),new cljs.core.Keyword(null,"added","added",2057651688),added], null);
});
var want_QMARK_ = (function (s){
return (((entity == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(entity,s)));
});
var step = (function (p__11987,p__11988){
var vec__11989 = p__11987;
var cur = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11989,(0),null);
var rows = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11989,(1),null);
var map__11992 = p__11988;
var map__11992__$1 = cljs.core.__destructure_map(map__11992);
var q = map__11992__$1;
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11992__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11992__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11992__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11992__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var G__11993 = (function (){var or__5162__auto__ = op;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"assert","assert",-963103026);
}
})();
var G__11993__$1 = (((G__11993 instanceof cljs.core.Keyword))?G__11993.fqn:null);
switch (G__11993__$1) {
case "assert":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3(cur,q,ipld.core.link_QMARK_),(function (){var G__11994 = rows;
if(want_QMARK_(s)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__11994,row(s,p,o,true));
} else {
return G__11994;
}
})()], null);

break;
case "retract":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3(cur,q,ipld.core.link_QMARK_),(function (){var G__11995 = rows;
if(want_QMARK_(s)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__11995,row(s,p,o,false));
} else {
return G__11995;
}
})()], null);

break;
case "retract-entity":
var prior = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(cur,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spo","spo",734923469),s], null),cljs.core.PersistentArrayMap.EMPTY);
var new_rows = ((want_QMARK_(s))?(function (){var iter__5649__auto__ = (function kotobase_peer$core$iter__11996(s__11997){
return (new cljs.core.LazySeq(null,(function (){
var s__11997__$1 = s__11997;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11997__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__12002 = cljs.core.first(xs__6385__auto__);
var p__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12002,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12002,(1),null);
var iterys__5645__auto__ = ((function (s__11997__$1,vec__12002,p__$1,vs,xs__6385__auto__,temp__5825__auto__,prior,G__11993,G__11993__$1,vec__11989,cur,rows,map__11992,map__11992__$1,q,s,p,o,op,row,want_QMARK_){
return (function kotobase_peer$core$iter__11996_$_iter__11998(s__11999){
return (new cljs.core.LazySeq(null,((function (s__11997__$1,vec__12002,p__$1,vs,xs__6385__auto__,temp__5825__auto__,prior,G__11993,G__11993__$1,vec__11989,cur,rows,map__11992,map__11992__$1,q,s,p,o,op,row,want_QMARK_){
return (function (){
var s__11999__$1 = s__11999;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11999__$1);
if(temp__5825__auto____$1){
var s__11999__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11999__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11999__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__12001 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__12000 = (0);
while(true){
if((i__12000 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__12000);
cljs.core.chunk_append(b__12001,row(s,p__$1,v,false));

var G__12128 = (i__12000 + (1));
i__12000 = G__12128;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__12001),kotobase_peer$core$iter__11996_$_iter__11998(cljs.core.chunk_rest(s__11999__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__12001),null);
}
} else {
var v = cljs.core.first(s__11999__$2);
return cljs.core.cons(row(s,p__$1,v,false),kotobase_peer$core$iter__11996_$_iter__11998(cljs.core.rest(s__11999__$2)));
}
} else {
return null;
}
break;
}
});})(s__11997__$1,vec__12002,p__$1,vs,xs__6385__auto__,temp__5825__auto__,prior,G__11993,G__11993__$1,vec__11989,cur,rows,map__11992,map__11992__$1,q,s,p,o,op,row,want_QMARK_))
,null,null));
});})(s__11997__$1,vec__12002,p__$1,vs,xs__6385__auto__,temp__5825__auto__,prior,G__11993,G__11993__$1,vec__11989,cur,rows,map__11992,map__11992__$1,q,s,p,o,op,row,want_QMARK_))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(vs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_peer$core$iter__11996(cljs.core.rest(s__11997__$1)));
} else {
var G__12129 = cljs.core.rest(s__11997__$1);
s__11997__$1 = G__12129;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(prior);
})():null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase_peer.core.retract_entity_STAR_(cur,s,ipld.core.link_QMARK_),cljs.core.into.cljs$core$IFn$_invoke$arity$2(rows,new_rows)], null);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__11993__$1))));

}
});
if((chain_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var tx_cids = kotobase_peer.core.newly_added_tx_cids(get_fn,chain_cid,(-1));
return kotobase_peer.core.pmap_async((function (cid){
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}),tx_cids).then((function (quads_per_cid){
var quads = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,quads_per_cid);
var vec__12005 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arrangement.core.empty_db(),cljs.core.PersistentVector.EMPTY], null),quads);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12005,(0),null);
var rows = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12005,(1),null);
return cljs.core.vec(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(visible_QMARK_,rows));
}));
}
}));

(kotobase_peer.core.history_datoms.cljs$lang$maxFixedArity = 5);

/**
 * THE scale-safe read path (ADR-2607032430 D1): `datoms`-shaped rows as of
 *   `chain-cid`'s current state, merging the indexed snapshot (`cold-datoms` —
 *   range-pruned, untouched by graph size) with any not-yet-folded novelty
 *   (small, bounded by the fold threshold). Novelty filtering reuses `datoms`'s
 *   own index/components logic (build a throwaway hot db from just the
 *   novelty quads, filter it the normal way) — exactly consistent with the
 *   snapshot path's semantics, no separate filter implementation to drift.
 *   Replaces `hydrate-db` + `datoms` for any caller that doesn't need a full
 *   hot db value. `nil` chain-cid → `[]`.
 * 
 *   `visible?` is REQUIRED (ADR-2607050500, same contract as `datoms`/
 *   `cold-datoms`: a post-filter over each `{:e :a :v_edn :added}` row).
 *   Forwarded UNCHANGED to both `cold-datoms` (for the snapshot half) and
 *   `datoms` (for the novelty half) — each half is filtered exactly once, by
 *   its own producer, before the two row seqs are concatenated, so nothing is
 *   filtered twice and neither path (snapshot or novelty) is missed. Pass
 *   `(constantly true)` to see everything, as an explicit choice.
 * 
 *   `blind-fn`/`decrypt-fn` (ADR-2607051000, accepted 2026-07-06) are REQUIRED:
 *   `blind-fn`/`decrypt-fn` go to `cold-datoms` (the snapshot half);
 *   `decrypt-fn` also goes to `read-tx-block` (the novelty half, whole-block
 *   decrypt, no blinding needed there). Synchronous on JVM; a `js/Promise` of
 *   the rows on cljs (the snapshot and novelty halves resolve concurrently
 *   there, via `js/Promise.all`, since they're independent).
 * 
 *   `async-get-fn` (optional, `:cljs`-only effect, nil-safe — kotoba-lang/
 *   kotobase-peer#21): a Promise-returning `(fn [cid]) -> js/Promise<bytes>`
 *   that fetches DIRECTLY, bypassing a synchronous block-miss trampoline
 *   (e.g. `with-blocks`) entirely — the exact same fix `fold!` already
 *   applies to ITS OWN hydrate step (ADR-2607120730), now available for
 *   every regular read too, not just the fold maintenance operation.
 *   Without this, EVERY hot-datoms call (the read path `do-q`/`do-pull`/any
 *   store bridge's `hydrate!` goes through) pays the sync trampoline's O(N²)
 *   block-discovery cost on its cold-snapshot half — confirmed live
 *   elsewhere in this org (gftdcojp/app-aozora#78): a 5130-leaf snapshot
 *   exceeded a 300s CPU budget via that path vs 806ms via
 *   `scan-prefix-async`. Routes the snapshot half through `cold-datoms-async`
 *   and the novelty half through `read-tx-block-async` (both already used
 *   internally by `fold!`); `nil` (the default, omitted arity) is IDENTICAL
 *   to today's behavior — this is purely additive. `chain-cid`'s own head
 *   walk (`state-at`) stays synchronous either way, same as `fold!`'s own
 *   async-get-fn arity — it's a handful of small metadata blocks, not
 *   proportional to graph size, so it isn't the O(N²) cost this closes.
 */
kotobase_peer.core.hot_datoms = (function kotobase_peer$core$hot_datoms(var_args){
var G__12010 = arguments.length;
switch (G__12010) {
case 5:
return kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
case 7:
return kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$5 = (function (get_fn,chain_cid,visible_QMARK_,blind_fn,decrypt_fn){
return kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$6(get_fn,chain_cid,null,visible_QMARK_,blind_fn,decrypt_fn);
}));

(kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$6 = (function (get_fn,chain_cid,opts,visible_QMARK_,blind_fn,decrypt_fn){
return kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$7(get_fn,chain_cid,opts,visible_QMARK_,blind_fn,decrypt_fn,null);
}));

(kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$7 = (function (get_fn,chain_cid,opts,visible_QMARK_,blind_fn,decrypt_fn,async_get_fn){
if((chain_cid == null)){
return Promise.resolve(cljs.core.PersistentVector.EMPTY);
} else {
var state = kotobase_peer.core.state_at(get_fn,chain_cid);
var novelty = kotobase_peer.core.novelty_cids(get_fn,state);
return Promise.all([(cljs.core.truth_(async_get_fn)?kotobase_peer.core.cold_datoms_async(async_get_fn,kotobase_peer.core.indexed_cid(state),opts,visible_QMARK_,blind_fn,decrypt_fn):kotobase_peer.core.cold_datoms(get_fn,kotobase_peer.core.indexed_cid(state),opts,visible_QMARK_,blind_fn,decrypt_fn)),kotobase_peer.core.pmap_async((function (cid){
if(cljs.core.truth_(async_get_fn)){
return kotobase_peer.core.read_tx_block_async(async_get_fn,cid,decrypt_fn);
} else {
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}
}),novelty)]).then((function (results){
var vec__12011 = cljs.core.vec(results);
var snap_rows = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12011,(0),null);
var novelty_quads_per_cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12011,(1),null);
var novelty_quads = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,novelty_quads_per_cid);
var snap_rows__$1 = kotobase_peer.core.remove_retracted(kotobase_peer.core.retraction_filters(novelty_quads),snap_rows);
var novelty_rows = kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$3(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,q){
return kotobase_peer.core.apply_quad(db,q,ipld.core.link_QMARK_);
}),arrangement.core.empty_db(),novelty_quads),opts,visible_QMARK_);
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(snap_rows__$1,novelty_rows));
}));
}
}));

(kotobase_peer.core.hot_datoms.cljs$lang$maxFixedArity = 7);

/**
 * Write the views node {"views" {name {"spec" .. "rows" [[e a v_edn]
 *   ...]}}} as one AEAD-encrypted block; returns its CID (string). Sync on
 *   JVM, js/Promise of the CID on cljs (encrypt-fn is a Promise there).
 */
kotobase_peer.core.put_views_block_BANG_ = (function kotobase_peer$core$put_views_block_BANG_(put_BANG_,views,encrypt_fn){
return (function (){var G__12014 = ipld.core.encode(new cljs.core.PersistentArrayMap(null, 1, ["views",views], null));
return (encrypt_fn.cljs$core$IFn$_invoke$arity$1 ? encrypt_fn.cljs$core$IFn$_invoke$arity$1(G__12014) : encrypt_fn.call(null,G__12014));
})().then((function (ct){
return ipld.core.put_node_BANG_(put_BANG_,new cljs.core.PersistentArrayMap(null, 1, ["ct",ct], null));
}));
});
/**
 * Inverse of put-views-block!: the decrypted {name {"spec" .. "rows"
 *   ..}} map. Sync on JVM, js/Promise on cljs.
 */
kotobase_peer.core.read_views_block = (function kotobase_peer$core$read_views_block(get_fn,views_cid,decrypt_fn){
var map__12015 = ipld.core.get_node(get_fn,views_cid);
var map__12015__$1 = cljs.core.__destructure_map(map__12015);
var ct = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12015__$1,"ct");
return (decrypt_fn.cljs$core$IFn$_invoke$arity$1 ? decrypt_fn.cljs$core$IFn$_invoke$arity$1(ct) : decrypt_fn.call(null,ct)).then((function (pt){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(ipld.core.decode(pt),"views");
}));
});
/**
 * Current-state rows matching `spec` from an in-memory db, as compact
 *   [e a v_edn] triples (assertions only — a view holds current state; the
 *   read path re-applies unfolded novelty retractions on top).
 */
kotobase_peer.core.derive_view_rows = (function kotobase_peer$core$derive_view_rows(db,spec){
var attrs = cljs.core.set(cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,"attrs"));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12017){
var map__12018 = p__12017;
var map__12018__$1 = cljs.core.__destructure_map(map__12018);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12018__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12018__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v_edn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12018__$1,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v_edn], null);
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__12016_SHARP_){
var and__5160__auto__ = new cljs.core.Keyword(null,"added","added",2057651688).cljs$core$IFn$_invoke$arity$2(p1__12016_SHARP_,true);
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.contains_QMARK_(attrs,new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__12016_SHARP_));
} else {
return and__5160__auto__;
}
}),kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$2(db,cljs.core.constantly(true))));
});
/**
 * The spec set to materialize this fold: the previously-stored specs,
 *   overridden by `views-param` when the caller passed one (upsert per name;
 *   an explicit nil spec removes that view).
 */
kotobase_peer.core.merge_view_specs = (function kotobase_peer$core$merge_view_specs(old_views,views_param){
var old_specs = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__12019){
var vec__12020 = p__12019;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12020,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12020,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.get.cljs$core$IFn$_invoke$arity$2(v,"spec")], null);
})),old_views);
if((views_param == null)){
return old_specs;
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__12023){
var vec__12024 = p__12023;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12024,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12024,(1),null);
if((v == null)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(acc,k);
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v);
}
}),old_specs,views_param);
}
});
/**
 * Materialize every view over the fold's merged `db` and write ONE views
 *   block. Returns a Link to it, or nil when there are no views to keep.
 *   Sync on JVM, js/Promise on cljs.
 */
kotobase_peer.core.materialize_views_BANG_ = (function kotobase_peer$core$materialize_views_BANG_(put_BANG_,get_fn,state,db,views_param,encrypt_fn,decrypt_fn){
var views_cid = (function (){var G__12027 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"views");
if((G__12027 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__12027) : ipld.core.link_cid.call(null,G__12027));
}
})();
return (cljs.core.truth_(views_cid)?kotobase_peer.core.read_views_block(get_fn,views_cid,decrypt_fn):Promise.resolve(null)).then((function (old_views){
var specs = kotobase_peer.core.merge_view_specs(old_views,views_param);
if(cljs.core.seq(specs)){
return kotobase_peer.core.put_views_block_BANG_(put_BANG_,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__12028){
var vec__12029 = p__12028;
var nm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12029,(0),null);
var spec = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12029,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nm,new cljs.core.PersistentArrayMap(null, 2, ["spec",spec,"rows",kotobase_peer.core.derive_view_rows(db,spec)], null)], null);
})),specs),encrypt_fn).then(ipld.core.link);
} else {
return Promise.resolve(null);
}
}));
});
/**
 * Rows of materialized view `view-name` as of `chain-cid`, ALWAYS FRESH:
 *   the fold-time view rows with unfolded novelty merged on top (retractions
 *   cancel stored rows; novelty assertions matching the view's spec are
 *   appended) — the same hot/cold split as hot-datoms, but the cold half is
 *   ONE views block instead of a tree scan. Returns {:spec .. :rows
 *   [{:e :a :v_edn :added} ...]} or nil when the view doesn't exist.
 *   `visible?` is REQUIRED (same contract as datoms/hot-datoms). Sync on JVM,
 *   js/Promise on cljs.
 */
kotobase_peer.core.view_rows = (function kotobase_peer$core$view_rows(get_fn,chain_cid,view_name,visible_QMARK_,decrypt_fn){
var state = kotobase_peer.core.state_at(get_fn,chain_cid);
var views_cid = (function (){var G__12035 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,"views");
if((G__12035 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__12035) : ipld.core.link_cid.call(null,G__12035));
}
})();
var finish = (function (views,novelty_quads){
var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(views,view_name);
if(cljs.core.truth_(temp__5825__auto__)){
var entry = temp__5825__auto__;
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(entry,"spec");
var attrs = cljs.core.set(cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,"attrs"));
var stored = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__12036){
var vec__12037 = p__12036;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12037,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12037,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12037,(2),null);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v_edn","v_edn",-266503866),v,new cljs.core.Keyword(null,"added","added",2057651688),true], null);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(entry,"rows"));
var snap_rows = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(visible_QMARK_,kotobase_peer.core.remove_retracted(kotobase_peer.core.retraction_filters(novelty_quads),stored));
var novelty_rows = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__12032_SHARP_){
return cljs.core.contains_QMARK_(attrs,new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__12032_SHARP_));
}),kotobase_peer.core.datoms.cljs$core$IFn$_invoke$arity$2(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,q){
return kotobase_peer.core.apply_quad(db,q,ipld.core.link_QMARK_);
}),arrangement.core.empty_db(),novelty_quads),visible_QMARK_));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spec","spec",347520401),spec,new cljs.core.Keyword(null,"rows","rows",850049680),cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(snap_rows,novelty_rows))], null);
} else {
return null;
}
});
if(cljs.core.not(views_cid)){
return Promise.resolve(null);
} else {
var novelty = kotobase_peer.core.novelty_cids(get_fn,state);
return Promise.all([kotobase_peer.core.read_views_block(get_fn,views_cid,decrypt_fn),Promise.all(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__12034_SHARP_){
return kotobase_peer.core.read_tx_block(get_fn,p1__12034_SHARP_,decrypt_fn);
}),novelty)))]).then((function (pair){
return finish((pair[(0)]),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1((pair[(1)]))));
}));
}
});
/**
 * Compact `chain-cid`'s novelty into a fresh indexed snapshot: hydrate the
 *   current `indexed` snapshot, re-assert every novelty quad on top (append
 *   order), `qs/commit!` that as the new `indexed`, and append ONE new
 *   chain entry. Cost: O(graph_shard) — the same full rebuild `snapshot!`/the
 *   pre-D1 `commit!` always paid, now amortized over however many `commit!`
 *   writes accumulated the folded novelty instead of being paid on every
 *   single one (`should-fold?`/`novelty-size` decide when to call this;
 *   correctness never depends on it running promptly).
 * 
 *   `max-novelty` (optional, default nil = unbounded/full fold, exactly
 *   today's behavior): caps how many of the OLDEST not-yet-folded tx blocks
 *   this call folds, leaving the rest as the new state's `novelty` tail
 *   instead of always emptying it. Novelty is stored oldest-first (`commit!`
 *   `conj`s each new tx-block link onto the END), so `take max-novelty`/
 *   `drop max-novelty` folds strictly in chronological (append) order and the
 *   remaining tail is exactly what a later `fold!` call would still need to
 *   process — correctness (retraction-vs-earlier-assertion resolution, which
 *   `apply-quad`'s reduce already handles by walking `indexed` then novelty
 *   in order) is identical whether one call folds everything or N calls each
 *   fold a bounded slice, since each call's own `hydrate-db` picks up
 *   whatever the PREVIOUS call already committed to `indexed`.
 * 
 *   Motivation (found live, gftdcojp/app-aozora#78): bounding `pmap-async`'s
 *   in-flight fetch count (see that fn's docstring) fixes the Workers
 *   subrequest-concurrency collapse for a MODERATE novelty backlog, but a
 *   backlog large enough that even batched-but-still-sequential processing
 *   of the WHOLE thing exceeds one Worker invocation's CPU/wall-time budget
 *   can leave `fold!` itself unable to ever complete — a runaway: novelty
 *   can only shrink via a successful fold, but the fold needed to shrink it
 *   never finishes. `max-novelty` breaks that: a fold cron can call `fold!`
 *   with a small bounded budget every cycle and make guaranteed forward
 *   progress (novelty strictly shrinks by up to `max-novelty` per successful
 *   call) even against a backlog too large to clear in one invocation,
 *   instead of repeatedly attempting (and losing all the work of) one
 *   all-or-nothing fold that never finishes.
 * 
 *   Since kotoba-lang/kotobase-peer#16's fix: reading which entries to fold
 *   (unbounded: everything; bounded: the oldest `max-novelty`) no longer
 *   requires decoding the WHOLE novelty backlog just to find them — see
 *   `novelty-cids`/`take-oldest-novelty`'s own docstrings for the front/back
 *   persistent-queue design and its (amortized, not flat-per-call) cost
 *   story.
 * 
 *   Deterministic FOR A GIVEN novelty-cids ordering and a given `max-novelty`
 *   choice: prolly-tree/arrangement are content-addressed, so folding the
 *   identical (indexed, to-fold-slice) pair — from ANY writer, a server cron
 *   or a browser at idle — always produces the same snapshot CID. Concurrent
 *   folds of the same state with the same `max-novelty` are safe, redundant,
 *   and cheap (re-`put!`ing already-stored bytes is a no-op at the
 *   block-store layer); this property does NOT require every caller to agree
 *   on `max-novelty` for overall correctness (only for the 'redundant folds
 *   converge to the identical intermediate CID' optimization — the sequence
 *   of indexed snapshots still monotonically absorbs novelty in order either
 *   way). NOTE (ADR-2607051000, accepted 2026-07-06): this determinism now
 *   additionally depends on `encrypt-fn` deriving its nonce deterministically
 *   from the plaintext rather than randomly -- a random-nonce `encrypt-fn`
 *   would make even identical (indexed, novelty) pairs fold to DIFFERENT
 *   snapshot CIDs, silently losing the "cheap redundant fold" property this
 *   paragraph otherwise promises. Callers should supply a deterministic
 *   `encrypt-fn` (e.g. nonce = HMAC(nonce-key, plaintext)) if this property
 *   matters to them.
 * 
 *   `blind-fn`/`encrypt-fn`/`decrypt-fn` are REQUIRED and threaded to
 *   `hydrate-db` (blind-fn, decrypt-fn), `read-tx-block` (decrypt-fn), and
 *   `arrangement.core/commit!` (blind-fn, encrypt-fn). Synchronous on JVM; a
 *   `js/Promise` of the new chain CID on cljs (the novelty-quads read and the
 *   snapshot hydrate resolve concurrently there, via `js/Promise.all`, since
 *   they're independent).
 * 
 *   `async-get-fn` (optional, `:cljs` only, nil-safe) now covers BOTH the
 *   cold-snapshot hydrate (`cold-datoms-async`, ADR-2607120730's first
 *   follow-up) AND the novelty tx-block reads (`read-tx-block-async`, this
 *   addendum) -- confirmed live that routing ONLY the hydrate through it was
 *   insufficient: a Worker's whole `h/handle` call is one `with-blocks`
 *   retry loop, and a novelty-block miss restarts the ENTIRE call (redoing
 *   the hydrate walk too, however fast it now is on its own). Routing BOTH
 *   read paths through a direct async fetch removes `with-blocks` from
 *   `fold!`'s critical path entirely, not just from one half of it.
 */
kotobase_peer.core.fold_BANG_ = (function kotobase_peer$core$fold_BANG_(var_args){
var G__12042 = arguments.length;
switch (G__12042) {
case 6:
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
case 7:
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 8:
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$8((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]));

break;
case 10:
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$10((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]));

break;
case 11:
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$11((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]),(arguments[(10)]));

break;
case 12:
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$12((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]),(arguments[(10)]),(arguments[(11)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$6 = (function (put_BANG_,get_fn,chain_cid,blind_fn,encrypt_fn,decrypt_fn){
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$8(put_BANG_,get_fn,chain_cid,ipld.core.link_QMARK_,null,blind_fn,encrypt_fn,decrypt_fn);
}));

(kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$7 = (function (put_BANG_,get_fn,chain_cid,ref_QMARK_,blind_fn,encrypt_fn,decrypt_fn){
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$8(put_BANG_,get_fn,chain_cid,ref_QMARK_,null,blind_fn,encrypt_fn,decrypt_fn);
}));

(kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$8 = (function (put_BANG_,get_fn,chain_cid,ref_QMARK_,max_novelty,blind_fn,encrypt_fn,decrypt_fn){
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$10(put_BANG_,get_fn,chain_cid,ref_QMARK_,max_novelty,blind_fn,encrypt_fn,decrypt_fn,null,null);
}));

(kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$10 = (function (put_BANG_,get_fn,chain_cid,ref_QMARK_,max_novelty,blind_fn,encrypt_fn,decrypt_fn,cache_get,cache_put_BANG_){
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$11(put_BANG_,get_fn,chain_cid,ref_QMARK_,max_novelty,blind_fn,encrypt_fn,decrypt_fn,cache_get,cache_put_BANG_,null);
}));

(kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$11 = (function (put_BANG_,get_fn,chain_cid,ref_QMARK_,max_novelty,blind_fn,encrypt_fn,decrypt_fn,cache_get,cache_put_BANG_,async_get_fn){
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$12(put_BANG_,get_fn,chain_cid,ref_QMARK_,max_novelty,blind_fn,encrypt_fn,decrypt_fn,cache_get,cache_put_BANG_,async_get_fn,null);
}));

(kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$12 = (function (put_BANG_,get_fn,chain_cid,ref_QMARK_,max_novelty,blind_fn,encrypt_fn,decrypt_fn,cache_get,cache_put_BANG_,async_get_fn,views){
var state = kotobase_peer.core.state_at(get_fn,chain_cid);
var bounded_QMARK_ = (!((max_novelty == null)));
var take_result = ((bounded_QMARK_)?kotobase_peer.core.take_oldest_novelty(put_BANG_,get_fn,state,max_novelty):null);
var to_fold_cids = ((bounded_QMARK_)?new cljs.core.Keyword(null,"taken","taken",1185385376).cljs$core$IFn$_invoke$arity$1(take_result):kotobase_peer.core.novelty_cids(get_fn,state));
var remaining_index = ((bounded_QMARK_)?kotobase_peer.core.build_novelty_index_BANG_(put_BANG_,new cljs.core.Keyword(null,"remaining-entries","remaining-entries",1841144287).cljs$core$IFn$_invoke$arity$1(take_result)):null);
var new_novelty_state = ((bounded_QMARK_)?(function (){var G__12043 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(take_result,new cljs.core.Keyword(null,"taken","taken",1185385376),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"remaining-entries","remaining-entries",1841144287)], 0));
if(cljs.core.truth_(remaining_index)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12043,"novelty-subject-index",remaining_index);
} else {
return G__12043;
}
})():new cljs.core.PersistentArrayMap(null, 3, ["novelty-front",null,"novelty-back",null,"novelty-count",(0)], null));
return Promise.all([kotobase_peer.core.pmap_async((function (cid){
if(cljs.core.truth_(async_get_fn)){
return kotobase_peer.core.read_tx_block_async(async_get_fn,cid,decrypt_fn);
} else {
return kotobase_peer.core.read_tx_block(get_fn,cid,decrypt_fn);
}
}),to_fold_cids),kotobase_peer.core.hydrate_db_cached.cljs$core$IFn$_invoke$arity$7(get_fn,kotobase_peer.core.indexed_cid(state),blind_fn,decrypt_fn,cache_get,cache_put_BANG_,async_get_fn)]).then((function (results){
var vec__12044 = cljs.core.vec(results);
var novelty_quads_per_cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12044,(0),null);
var hydrated_db = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12044,(1),null);
var novelty_quads = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,novelty_quads_per_cid);
var db = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,q){
return kotobase_peer.core.apply_quad(db,q,ref_QMARK_);
}),hydrated_db,novelty_quads);
return Promise.all([arrangement.core.commit_BANG_.cljs$core$IFn$_invoke$arity$6(put_BANG_,db,null,arrangement.core.current_schema_version,blind_fn,encrypt_fn),kotobase_peer.core.materialize_views_BANG_(put_BANG_,get_fn,state,db,views,encrypt_fn,decrypt_fn)]);
})).then((function (pair){
var new_snap_cid = (pair[(0)]);
var views_link = (pair[(1)]);
var new_state = (function (){var G__12047 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, ["indexed",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(new_snap_cid) : ipld.core.link.call(null,new_snap_cid))], null),new_novelty_state], 0));
if(cljs.core.truth_(views_link)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12047,"views",views_link);
} else {
return G__12047;
}
})();
return chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$4(put_BANG_,get_fn,new_state,chain_cid);
}));
}));

(kotobase_peer.core.fold_BANG_.cljs$lang$maxFixedArity = 12);

/**
 * CAS-safe scheduler primitive: fold only when the actual head's novelty is
 * at least `:threshold`, publish the fold through HeadCAS, and retry from the
 * winning head after contention. Below threshold it performs no block writes
 * and no CAS. OPTS: `:threshold` (default 64), `:max-novelty` (default the
 * threshold, bounding one invocation), `:max-retries` (default 10), and
 * `:views` (default nil — a map of `{view-name spec-or-nil}` materialized
 * view declarations, threaded straight to `fold!`'s own `views` param;
 * see its docstring/`materialize-views!`). A non-nil `:views` FORCES the
 * fold to run even when novelty is below `:threshold` — a caller declaring
 * or updating a view needs that declaration persisted regardless of
 * whether there happens to be unfolded novelty to compact right now;
 * without this the view would be silently dropped whenever the graph is
 * already caught up (the same fold-is-a-no-op-below-threshold path this
 * fn otherwise takes for its ordinary maintenance role).
 * Returns {:committed? :chain-cid-before :chain-cid-after :novelty-before
 * :novelty-after :attempts}. Sync JVM / Promise cljs.
 */
kotobase_peer.core.fold_serialized_if_needed_BANG_ = (function kotobase_peer$core$fold_serialized_if_needed_BANG_(var_args){
var G__12049 = arguments.length;
switch (G__12049) {
case 8:
return kotobase_peer.core.fold_serialized_if_needed_BANG_.cljs$core$IFn$_invoke$arity$8((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]));

break;
case 9:
return kotobase_peer.core.fold_serialized_if_needed_BANG_.cljs$core$IFn$_invoke$arity$9((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.core.fold_serialized_if_needed_BANG_.cljs$core$IFn$_invoke$arity$8 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,blind_fn,encrypt_fn,decrypt_fn){
return kotobase_peer.core.fold_serialized_if_needed_BANG_.cljs$core$IFn$_invoke$arity$9(put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,blind_fn,encrypt_fn,decrypt_fn,cljs.core.PersistentArrayMap.EMPTY);
}));

(kotobase_peer.core.fold_serialized_if_needed_BANG_.cljs$core$IFn$_invoke$arity$9 = (function (put_BANG_,get_fn,cas_BANG_,head_key,expected_chain_cid,blind_fn,encrypt_fn,decrypt_fn,p__12050){
var map__12051 = p__12050;
var map__12051__$1 = cljs.core.__destructure_map(map__12051);
var threshold = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12051__$1,new cljs.core.Keyword(null,"threshold","threshold",204221583),kotobase_peer.core.default_fold_threshold);
var max_novelty = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12051__$1,new cljs.core.Keyword(null,"max-novelty","max-novelty",166770453));
var max_retries = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12051__$1,new cljs.core.Keyword(null,"max-retries","max-retries",-1933762121),kotobase_peer.core.default_max_cas_retries);
var views = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12051__$1,new cljs.core.Keyword(null,"views","views",1450155487));
var max_novelty__$1 = (function (){var or__5162__auto__ = max_novelty;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return threshold;
}
})();
var force_QMARK_ = (!((views == null)));
var report = (function (before,after,novelty_before,attempts,committed_QMARK_){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"committed?","committed?",-1852070345),committed_QMARK_,new cljs.core.Keyword(null,"chain-cid-before","chain-cid-before",956922648),before,new cljs.core.Keyword(null,"chain-cid-after","chain-cid-after",-1567090406),after,new cljs.core.Keyword(null,"novelty-before","novelty-before",954880168),novelty_before,new cljs.core.Keyword(null,"novelty-after","novelty-after",251597064),kotobase_peer.core.novelty_size(get_fn,after),new cljs.core.Keyword(null,"attempts","attempts",1024246729),attempts], null);
});
var attempt = (function kotobase_peer$core$attempt(current,attempts){
if((attempts > max_retries)){
return Promise.reject(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("kotobase-peer: fold-serialized-if-needed! exceeded max-cas-retries",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"head-key","head-key",1479955464),head_key,new cljs.core.Keyword(null,"attempts","attempts",1024246729),attempts], null)));
} else {
var size = kotobase_peer.core.novelty_size(get_fn,current);
if((((!(force_QMARK_))) && ((size < threshold)))){
return Promise.resolve(report(current,current,size,attempts,false));
} else {
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$12(put_BANG_,get_fn,current,ipld.core.link_QMARK_,max_novelty__$1,blind_fn,encrypt_fn,decrypt_fn,null,null,null,views).then((function (next){
return Promise.resolve((cas_BANG_.cljs$core$IFn$_invoke$arity$3 ? cas_BANG_.cljs$core$IFn$_invoke$arity$3(head_key,current,next) : cas_BANG_.call(null,head_key,current,next))).then((function (actual){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(actual,next)){
return report(current,next,size,attempts,true);
} else {
return kotobase_peer$core$attempt(actual,(attempts + (1)));
}
}));
}));
}
}
});
return attempt(expected_chain_cid,(0));
}));

(kotobase_peer.core.fold_serialized_if_needed_BANG_.cljs$lang$maxFixedArity = 9);

/**
 * True iff the chain rooted at `chain-cid` is untampered and its
 * `:seq` values are gapless from 0. Does NOT verify the prolly-tree
 * snapshots or tx blocks each commit's `:state` links to are themselves
 * intact (that would require walking every index/tx-block — a follow-up).
 */
kotobase_peer.core.verify_chain = (function kotobase_peer$core$verify_chain(get_fn,chain_cid){
return chain.core.verify_chain(get_fn,chain_cid);
});

//# sourceMappingURL=kotobase_peer.core.js.map
