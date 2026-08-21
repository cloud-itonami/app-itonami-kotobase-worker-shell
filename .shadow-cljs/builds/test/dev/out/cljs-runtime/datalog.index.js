goog.provide('datalog.index');
/**
 * A db with all four indices empty. Just a map -- nothing to close, nothing
 *   to open, safe to hold in an atom or thread through pure functions.
 */
datalog.index.empty_db = (function datalog$index$empty_db(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"spo","spo",734923469),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"pso","pso",1415685955),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"pos","pos",-864607220),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ocp","ocp",448959679),cljs.core.PersistentArrayMap.EMPTY], null);
});
datalog.index.upd = (function datalog$index$upd(m,k1,k2,v){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(m,k1,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (m2){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(m2,k2,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),v);
}),cljs.core.PersistentArrayMap.EMPTY));
});
datalog.index.rm = (function datalog$index$rm(m,k1,k2,v){
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,k1);
if(cljs.core.truth_(temp__5823__auto__)){
var m2 = temp__5823__auto__;
var s = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m2,k2,cljs.core.PersistentHashSet.EMPTY),v);
if(cljs.core.empty_QMARK_(s)){
var m2_SINGLEQUOTE_ = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(m2,k2);
if(cljs.core.empty_QMARK_(m2_SINGLEQUOTE_)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(m,k1);
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k1,m2_SINGLEQUOTE_);
}
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k1,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m2,k2,s));
}
} else {
return m;
}
});
/**
 * Add `{:s :p :o}` to `db`'s four indices. `ref?` is REQUIRED (see the ns
 *   docstring): it decides whether `:o` is additionally indexed in `:ocp` for
 *   reverse-reference lookup via `refs-to`. Pure -- returns a new db.
 */
datalog.index.assert_quad = (function datalog$index$assert_quad(db,p__6147,ref_QMARK_){
var map__6148 = p__6147;
var map__6148__$1 = cljs.core.__destructure_map(map__6148);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6148__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6148__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6148__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var G__6149 = db;
var G__6149__$1 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6149,new cljs.core.Keyword(null,"spo","spo",734923469),datalog.index.upd,s,p,o)
;
var G__6149__$2 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6149__$1,new cljs.core.Keyword(null,"pso","pso",1415685955),datalog.index.upd,p,s,o)
;
var G__6149__$3 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6149__$2,new cljs.core.Keyword(null,"pos","pos",-864607220),datalog.index.upd,p,o,s)
;
if(cljs.core.truth_((ref_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ref_QMARK_.cljs$core$IFn$_invoke$arity$1(o) : ref_QMARK_.call(null,o)))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6149__$3,new cljs.core.Keyword(null,"ocp","ocp",448959679),datalog.index.upd,o,p,s);
} else {
return G__6149__$3;
}
});
/**
 * One index, `{k1 {k2 #{v}}}`, with every inner map made transient. The outer
 *   map stays persistent on purpose: after a key exists, a bulk insert mutates
 *   its inner map in place and never touches the outer map again.
 */
datalog.index.__GT_mutable = (function datalog$index$__GT_mutable(m){
return cljs.core.reduce_kv((function (acc,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,cljs.core.transient$(v));
}),cljs.core.PersistentArrayMap.EMPTY,m);
});
datalog.index.freeze = (function datalog$index$freeze(m){
return cljs.core.reduce_kv((function (acc,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,cljs.core.persistent_BANG_(v));
}),cljs.core.PersistentArrayMap.EMPTY,m);
});
datalog.index.upd_mut = (function datalog$index$upd_mut(m,k1,k2,v){
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,k1);
if(cljs.core.truth_(temp__5823__auto__)){
var inner = temp__5823__auto__;
var inner_SINGLEQUOTE_ = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(inner,k2,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(inner,k2,cljs.core.PersistentHashSet.EMPTY),v));
if((inner_SINGLEQUOTE_ === inner)){
return m;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k1,inner_SINGLEQUOTE_);
}
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k1,cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),k2,cljs.core.PersistentHashSet.createAsIfByAssoc([v])));
}
});
/**
 * A mutable bulk-loading accumulator over `db`. Pair with `assert-quads!` and
 *   finish with `persist-db`. NOT a db: nothing else in this namespace accepts
 *   one, and it is not safe to share or to hold across threads.
 * 
 *   This exists because the cost `assert-quads` pays once -- walking the existing
 *   outer keys to make their inner maps transient -- is proportional to the db,
 *   not to the batch. Calling `assert-quads` in a loop therefore pays that walk
 *   once per batch, which is quadratic in the number of batches.
 * 
 *   Measured 2026-08-13, LDBC SNB SF-1 (31,837,452 datoms) in 500,000-datom
 *   batches: the looped `assert-quads` form was still running after 25 minutes,
 *   with a JVM thread dump showing the main thread inside the transient-conversion
 *   walk. That was mistaken for the engine being super-linear in ingest. It is
 *   not; the loop was.
 */
datalog.index.mutable_db = (function datalog$index$mutable_db(db){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"spo","spo",734923469),datalog.index.__GT_mutable(new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db)),new cljs.core.Keyword(null,"pso","pso",1415685955),datalog.index.__GT_mutable(new cljs.core.Keyword(null,"pso","pso",1415685955).cljs$core$IFn$_invoke$arity$1(db)),new cljs.core.Keyword(null,"pos","pos",-864607220),datalog.index.__GT_mutable(new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(db)),new cljs.core.Keyword(null,"ocp","ocp",448959679),datalog.index.__GT_mutable(new cljs.core.Keyword(null,"ocp","ocp",448959679).cljs$core$IFn$_invoke$arity$1(db))], null);
});
/**
 * Add `quads` to a `mutable-db`, returning the accumulator. Cheap to call
 *   repeatedly: no per-call walk of the existing db.
 */
datalog.index.assert_quads_BANG_ = (function datalog$index$assert_quads_BANG_(mdb,quads,ref_QMARK_){
var qs = cljs.core.seq(quads);
var spo = new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(mdb);
var pso = new cljs.core.Keyword(null,"pso","pso",1415685955).cljs$core$IFn$_invoke$arity$1(mdb);
var pos = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(mdb);
var ocp = new cljs.core.Keyword(null,"ocp","ocp",448959679).cljs$core$IFn$_invoke$arity$1(mdb);
while(true){
var temp__5823__auto__ = cljs.core.first(qs);
if(cljs.core.truth_(temp__5823__auto__)){
var map__6150 = temp__5823__auto__;
var map__6150__$1 = cljs.core.__destructure_map(map__6150);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6150__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6150__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6150__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var G__6156 = cljs.core.next(qs);
var G__6157 = datalog.index.upd_mut(spo,s,p,o);
var G__6158 = datalog.index.upd_mut(pso,p,s,o);
var G__6159 = datalog.index.upd_mut(pos,p,o,s);
var G__6160 = (cljs.core.truth_((ref_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ref_QMARK_.cljs$core$IFn$_invoke$arity$1(o) : ref_QMARK_.call(null,o)))?datalog.index.upd_mut(ocp,o,p,s):ocp);
qs = G__6156;
spo = G__6157;
pso = G__6158;
pos = G__6159;
ocp = G__6160;
continue;
} else {
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"spo","spo",734923469),spo,new cljs.core.Keyword(null,"pso","pso",1415685955),pso,new cljs.core.Keyword(null,"pos","pos",-864607220),pos,new cljs.core.Keyword(null,"ocp","ocp",448959679),ocp], null);
}
break;
}
});
/**
 * Finish a `mutable-db`, returning a db. The accumulator must not be used
 *   afterwards.
 */
datalog.index.persist_db = (function datalog$index$persist_db(mdb){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"spo","spo",734923469),datalog.index.freeze(new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(mdb)),new cljs.core.Keyword(null,"pso","pso",1415685955),datalog.index.freeze(new cljs.core.Keyword(null,"pso","pso",1415685955).cljs$core$IFn$_invoke$arity$1(mdb)),new cljs.core.Keyword(null,"pos","pos",-864607220),datalog.index.freeze(new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(mdb)),new cljs.core.Keyword(null,"ocp","ocp",448959679),datalog.index.freeze(new cljs.core.Keyword(null,"ocp","ocp",448959679).cljs$core$IFn$_invoke$arity$1(mdb))], null);
});
/**
 * Bulk `assert-quad`. Same result as `(reduce #(assert-quad %1 %2 ref?) db qs)`
 *   -- there is a test asserting exactly that -- built for loading a dataset
 *   rather than for one write.
 * 
 *   Measured 2026-08-13, loading 2,000,000 real LDBC SNB datoms into an empty db
 *   on an Apple M4: **888k datoms/s here against 600k for reducing `assert-quad`**
 *   -- about 1.5x. Worth having for a dataset load, and no more than that.
 * 
 *   It is deliberately recorded here that this was written believing the per-quad
 *   path was a far worse bottleneck than it is. It is not: 2,000,000 datoms take
 *   3.3 seconds through `assert-quad`. Do not cite this function as the reason a
 *   large load became possible.
 * 
 *   ONE CALL PER LOAD. It pays an up-front walk over the existing db's outer keys,
 *   so calling it once per batch in a loop is quadratic in the number of batches.
 *   To load in batches, use `mutable-db` / `assert-quads!` / `persist-db`.
 */
datalog.index.assert_quads = (function datalog$index$assert_quads(db,quads,ref_QMARK_){
return datalog.index.persist_db(datalog.index.assert_quads_BANG_(datalog.index.mutable_db(db),quads,ref_QMARK_));
});
/**
 * Remove `{:s :p :o}` from `db`'s four indices. `ref?` is REQUIRED and must
 *   agree with the one used to assert the same quad -- otherwise the `:ocp`
 *   entry is left behind. Pure -- returns a new db.
 */
datalog.index.retract_quad = (function datalog$index$retract_quad(db,p__6151,ref_QMARK_){
var map__6152 = p__6151;
var map__6152__$1 = cljs.core.__destructure_map(map__6152);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6152__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6152__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6152__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var G__6153 = db;
var G__6153__$1 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6153,new cljs.core.Keyword(null,"spo","spo",734923469),datalog.index.rm,s,p,o)
;
var G__6153__$2 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6153__$1,new cljs.core.Keyword(null,"pso","pso",1415685955),datalog.index.rm,p,s,o)
;
var G__6153__$3 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6153__$2,new cljs.core.Keyword(null,"pos","pos",-864607220),datalog.index.rm,p,o,s)
;
if(cljs.core.truth_((ref_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ref_QMARK_.cljs$core$IFn$_invoke$arity$1(o) : ref_QMARK_.call(null,o)))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__6153__$3,new cljs.core.Keyword(null,"ocp","ocp",448959679),datalog.index.rm,o,p,s);
} else {
return G__6153__$3;
}
});
/**
 * All `{p #{o...}}` for subject `s` (EAVT-style).
 */
datalog.index.entity_attrs = (function datalog$index$entity_attrs(db,s){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db),s,cljs.core.PersistentArrayMap.EMPTY);
});
/**
 * All `{s #{o...}}` for predicate `p` (AEVT-style scan).
 */
datalog.index.by_predicate = (function datalog$index$by_predicate(db,p){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"pso","pso",1415685955).cljs$core$IFn$_invoke$arity$1(db),p,cljs.core.PersistentArrayMap.EMPTY);
});
/**
 * All subjects `s` where `[s p o]` holds (AVET-style point lookup).
 */
datalog.index.by_predicate_value = (function datalog$index$by_predicate_value(db,p,o){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pos","pos",-864607220),p,o], null),cljs.core.PersistentHashSet.EMPTY);
});
/**
 * AVET-style value interval: `{s #{o...}}` for predicate `p` whose object
 *   is in `[lo, hi)` (see `datom.source/in-range?`).
 * 
 *   Walks the values of `p` in `:pos` and filters. That is O(|values of p|),
 *   not a tree cut — in-memory `:pos` is a hash map, not a sorted map
 *   (sorted-map cannot be transient, and `assert-quads!` depends on that).
 *   The tree cut lives in `prolly-tree/scan-range` and in lake columnar
 *   stats; this function is the same *question* on the hot db.
 */
datalog.index.by_predicate_range = (function datalog$index$by_predicate_range(var_args){
var G__6155 = arguments.length;
switch (G__6155) {
case 4:
return datalog.index.by_predicate_range.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return datalog.index.by_predicate_range.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datalog.index.by_predicate_range.cljs$core$IFn$_invoke$arity$4 = (function (db,p,lo,hi){
return datalog.index.by_predicate_range.cljs$core$IFn$_invoke$arity$5(db,p,lo,hi,cljs.core.PersistentArrayMap.EMPTY);
}));

(datalog.index.by_predicate_range.cljs$core$IFn$_invoke$arity$5 = (function (db,p,lo,hi,opts){
return cljs.core.reduce_kv((function (acc,o,ss){
if(datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$4(o,lo,hi,opts)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,s){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(m,s,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),o);
}),acc,ss);
} else {
return acc;
}
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pos","pos",-864607220),p], null),cljs.core.PersistentArrayMap.EMPTY));
}));

(datalog.index.by_predicate_range.cljs$lang$maxFixedArity = 5);

/**
 * All `{p #{s...}}` referencing object `o` (VAET-style reverse lookup) --
 *   only populated for quads asserted with a truthy `ref?`.
 */
datalog.index.refs_to = (function datalog$index$refs_to(db,o){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"ocp","ocp",448959679).cljs$core$IFn$_invoke$arity$1(db),o,cljs.core.PersistentArrayMap.EMPTY);
});

//# sourceMappingURL=datalog.index.js.map
