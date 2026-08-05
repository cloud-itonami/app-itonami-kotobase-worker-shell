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
datalog.index.assert_quad = (function datalog$index$assert_quad(db,p__11073,ref_QMARK_){
var map__11074 = p__11073;
var map__11074__$1 = cljs.core.__destructure_map(map__11074);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11074__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11074__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11074__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var G__11075 = db;
var G__11075__$1 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11075,new cljs.core.Keyword(null,"spo","spo",734923469),datalog.index.upd,s,p,o)
;
var G__11075__$2 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11075__$1,new cljs.core.Keyword(null,"pso","pso",1415685955),datalog.index.upd,p,s,o)
;
var G__11075__$3 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11075__$2,new cljs.core.Keyword(null,"pos","pos",-864607220),datalog.index.upd,p,o,s)
;
if(cljs.core.truth_((ref_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ref_QMARK_.cljs$core$IFn$_invoke$arity$1(o) : ref_QMARK_.call(null,o)))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11075__$3,new cljs.core.Keyword(null,"ocp","ocp",448959679),datalog.index.upd,o,p,s);
} else {
return G__11075__$3;
}
});
/**
 * Remove `{:s :p :o}` from `db`'s four indices. `ref?` is REQUIRED and must
 *   agree with the one used to assert the same quad -- otherwise the `:ocp`
 *   entry is left behind. Pure -- returns a new db.
 */
datalog.index.retract_quad = (function datalog$index$retract_quad(db,p__11076,ref_QMARK_){
var map__11077 = p__11076;
var map__11077__$1 = cljs.core.__destructure_map(map__11077);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11077__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11077__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11077__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var G__11078 = db;
var G__11078__$1 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11078,new cljs.core.Keyword(null,"spo","spo",734923469),datalog.index.rm,s,p,o)
;
var G__11078__$2 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11078__$1,new cljs.core.Keyword(null,"pso","pso",1415685955),datalog.index.rm,p,s,o)
;
var G__11078__$3 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11078__$2,new cljs.core.Keyword(null,"pos","pos",-864607220),datalog.index.rm,p,o,s)
;
if(cljs.core.truth_((ref_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ref_QMARK_.cljs$core$IFn$_invoke$arity$1(o) : ref_QMARK_.call(null,o)))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$6(G__11078__$3,new cljs.core.Keyword(null,"ocp","ocp",448959679),datalog.index.rm,o,p,s);
} else {
return G__11078__$3;
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
 * All `{p #{s...}}` referencing object `o` (VAET-style reverse lookup) --
 *   only populated for quads asserted with a truthy `ref?`.
 */
datalog.index.refs_to = (function datalog$index$refs_to(db,o){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"ocp","ocp",448959679).cljs$core$IFn$_invoke$arity$1(db),o,cljs.core.PersistentArrayMap.EMPTY);
});

//# sourceMappingURL=datalog.index.js.map
