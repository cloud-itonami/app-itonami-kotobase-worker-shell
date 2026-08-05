goog.provide('kotobase.query.bridge');
/**
 * A document key -> the datom attribute for it.
 * 
 *   Documents arrive with BOTH key types and this is not a corner case:
 *   `kotobase.protocols.atproto` stores the record it parsed out of a JSON
 *   body verbatim, so its keys are strings, while every document written from
 *   Clojure (and every test in this repo) has keyword keys. Left alone, the
 *   same field is two different attributes depending on how it was written.
 * 
 *   That broke both query surfaces at once, in the two worst ways available:
 * 
 *  - SPARQL 500s. `kotobase.protocols.sparql.quads/kw->iri-string` calls
 *    `namespace`, which in ClojureScript throws `Doesn't support namespace:
 *    <x>` on a string. Every SPARQL query against such a graph failed,
 *    whatever the query said. Found in production 2026-07-31, where the
 *    surface had been answering 200 on /health the whole time.
 *  - Cypher silently returns nothing. `n.text` translates to the keyword
 *    `:text`, which never matches the string attribute `"text"`, so the
 *    answer is an empty result set rather than an error.
 * 
 *   Normalising here rather than in each surface is what makes those two
 *   agree: the bridge is where a document becomes datoms, and a datom
 *   attribute should have one type. `(keyword "a/b")` splits on the slash
 *   into `:a/b`, which is what the IRI form and the Cypher form both already
 *   render as `a/b`, so the round trip holds.
 */
kotobase.query.bridge.__GT_attr = (function kotobase$query$bridge$__GT_attr(k){
if(typeof k === 'string'){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k);
} else {
return k;
}
});
/**
 * One document `doc` (as read from `[coll k]`) -> a seq of `{:s :p :o}`
 *   datoms for entity `entity`. See the ns docstring's "Doc -> datoms
 *   mapping" section for the full contract. `:kotobase/coll`/`:kotobase/key`
 *   are NOT emitted here -- `materialize` adds those two synthetic datoms
 *   itself, since only the caller knows `coll`/`k`.
 */
kotobase.query.bridge.doc__GT_datoms = (function kotobase$query$bridge$doc__GT_datoms(entity,doc){
if(cljs.core.map_QMARK_(doc)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__7124){
var vec__7125 = p__7124;
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7125,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7125,(1),null);
var attr__$1 = kotobase.query.bridge.__GT_attr(attr);
if(((cljs.core.coll_QMARK_(v)) && ((!(cljs.core.map_QMARK_(v)))))){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (el){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),entity,new cljs.core.Keyword(null,"p","p",151049309),attr__$1,new cljs.core.Keyword(null,"o","o",-1350007228),el], null);
}),v);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),entity,new cljs.core.Keyword(null,"p","p",151049309),attr__$1,new cljs.core.Keyword(null,"o","o",-1350007228),v], null)], null);
}
})),doc);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),entity,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword("kotobase","value","kotobase/value",997117337),new cljs.core.Keyword(null,"o","o",-1350007228),doc], null)], null);
}
});
/**
 * The materialized entity for `[coll k]` -- `(keyword (str coll) (str k))`,
 *   e.g. `["users" "u1"]` -> `:users/u1`. See the ns docstring's
 *   "Doc -> datoms mapping".
 * 
 *   Public because a surface addressing a known document should not have to
 *   re-derive this convention: an entity id built by hand somewhere else is a
 *   copy that can drift from `materialize`'s, and the failure mode is an empty
 *   result rather than an error.
 */
kotobase.query.bridge.entity_id = (function kotobase$query$bridge$entity_id(coll,k){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(coll)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
});
/**
 * Materialize every document in each of `coll-keys` (a seq of
 *   `kotobase.store` collection identifiers, e.g. `["users" "departments"]`)
 *   as datoms in one combined `arrangement.core` db (the `{:spo :pso :pos
 *   :ocp}` 4-covering index) -- ready to hand to `q`/`arrangement.datalog/q`.
 *   Reads `store` via `kotobase.store/-list` + `-get` only (never mutates it).
 * 
 *   v0.1 linear scan: every call does a full `-list` + `-get` of every
 *   collection and rebuilds the db from scratch -- see ns docstring.
 */
kotobase.query.bridge.materialize = (function kotobase$query$bridge$materialize(store,coll_keys){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,coll){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db__$1,k){
var entity = kotobase.query.bridge.entity_id(coll,k);
var doc = kotobase.store._get(store,coll,k);
var datoms = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),entity,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword("kotobase","coll","kotobase/coll",-1195202821),new cljs.core.Keyword(null,"o","o",-1350007228),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(coll))], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),entity,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword("kotobase","key","kotobase/key",-1670563723),new cljs.core.Keyword(null,"o","o",-1350007228),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k))], null)], null),kotobase.query.bridge.doc__GT_datoms(entity,doc));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(arrangement.core.assert_quad,db__$1,datoms);
}),db,kotobase.store._list(store,coll));
}),arrangement.core.empty_db(),coll_keys);
});
/**
 * `m` with `k`->`v`, evicting the oldest insertion past `cap`. Insertion order
 *   is tracked explicitly rather than by relying on map ordering, which neither
 *   host promises above a handful of entries.
 */
kotobase.query.bridge.lru_put = (function kotobase$query$bridge$lru_put(p__7129,k,v,cap){
var map__7130 = p__7129;
var map__7130__$1 = cljs.core.__destructure_map(map__7130);
var m = map__7130__$1;
var entries = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__7130__$1,new cljs.core.Keyword(null,"entries","entries",-86943161));
var order = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__7130__$1,new cljs.core.Keyword(null,"order","order",-1254677256));
var order__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__7128_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,p1__7128_SHARP_);
}),order)),k);
var entries__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(entries,k,v);
var excess = (cljs.core.count(order__$1) - cap);
if((excess > (0))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"entries","entries",-86943161),cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc,entries__$1,cljs.core.take.cljs$core$IFn$_invoke$arity$2(excess,order__$1)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"order","order",-1254677256),cljs.core.vec(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(excess,order__$1))], 0));
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"entries","entries",-86943161),entries__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"order","order",-1254677256),order__$1], 0));
}
});
/**
 * Materialized dbs to keep. Small on purpose: each one holds every datom of
 *   every collection it covers, so this is the knob that decides how much memory
 *   a query surface uses, and a large default would hide that.
 */
kotobase.query.bridge.default_memo_capacity = (8);
/**
 * A memo store for `materialize-memo`. Callers own it, so a test can hold one
 *   and a Worker can hold one per isolate without either reaching the other.
 */
kotobase.query.bridge.memo = (function kotobase$query$bridge$memo(var_args){
var G__7132 = arguments.length;
switch (G__7132) {
case 0:
return kotobase.query.bridge.memo.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return kotobase.query.bridge.memo.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.query.bridge.memo.cljs$core$IFn$_invoke$arity$0 = (function (){
return kotobase.query.bridge.memo.cljs$core$IFn$_invoke$arity$1(kotobase.query.bridge.default_memo_capacity);
}));

(kotobase.query.bridge.memo.cljs$core$IFn$_invoke$arity$1 = (function (capacity){
if((capacity > (0))){
} else {
throw (new Error((""+"Assert failed: "+"a capacity of zero would memoise nothing and still allocate"+"\n"+"(pos? capacity)")));
}

return cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"entries","entries",-86943161),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"order","order",-1254677256),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"capacity","capacity",72689734),capacity,new cljs.core.Keyword(null,"hits","hits",-2120002930),(0),new cljs.core.Keyword(null,"misses","misses",-1275188323),(0)], null));
}));

(kotobase.query.bridge.memo.cljs$lang$maxFixedArity = 1);

/**
 * `materialize`, memoised on `version` -- a CONTENT ADDRESS for the state of
 *   `store` (the chain-head CID, in `kotobase-protocols-worker`'s case).
 * 
 *   `version` is REQUIRED and must not be nil. A caller with no content address
 *   has nothing that makes a cached db provably current, and defaulting it would
 *   turn this into a cache that never invalidates -- which is not a cache, it is
 *   a bug that returns yesterday's data. Such a caller should call `materialize`
 *   directly and pay for it.
 * 
 *   `version` must change whenever ANY document in `coll-keys` changes. A
 *   revision counter is not automatically good enough: a counter is unique only
 *   along one line of writes, and a content-addressed chain can fork such that
 *   two forks reach the same counter with different contents (ADR-2607310900).
 */
kotobase.query.bridge.materialize_memo = (function kotobase$query$bridge$materialize_memo(memo_atom,store,coll_keys,version){
if((!((version == null)))){
} else {
throw (new Error((""+"Assert failed: "+"materialize-memo requires a non-nil version (a content address); use materialize when you have none"+"\n"+"(some? version)")));
}

var k = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [version,cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,coll_keys)))], null);
var cached = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(memo_atom),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"entries","entries",-86943161),k], null));
if(cljs.core.truth_(cached)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(memo_atom,cljs.core.update,new cljs.core.Keyword(null,"hits","hits",-2120002930),cljs.core.inc);

return cached;
} else {
var db = kotobase.query.bridge.materialize(store,coll_keys);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(memo_atom,(function (m){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(kotobase.query.bridge.lru_put(m,k,db,new cljs.core.Keyword(null,"capacity","capacity",72689734).cljs$core$IFn$_invoke$arity$1(m)),new cljs.core.Keyword(null,"misses","misses",-1275188323),cljs.core.inc);
}));

return db;
}
});
/**
 * `{:size :capacity :hits :misses}` -- so a deploy can report whether the memo
 *   is earning its memory instead of assuming it.
 */
kotobase.query.bridge.memo_stats = (function kotobase$query$bridge$memo_stats(memo_atom){
var m = cljs.core.deref(memo_atom);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"size","size",1098693007),cljs.core.count(new cljs.core.Keyword(null,"entries","entries",-86943161).cljs$core$IFn$_invoke$arity$1(m)),new cljs.core.Keyword(null,"capacity","capacity",72689734),new cljs.core.Keyword(null,"capacity","capacity",72689734).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"hits","hits",-2120002930),new cljs.core.Keyword(null,"hits","hits",-2120002930).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"misses","misses",-1275188323),new cljs.core.Keyword(null,"misses","misses",-1275188323).cljs$core$IFn$_invoke$arity$1(m)], null);
});
/**
 * The materialized db for `coll-keys`, memoised when `ctx` carries BOTH a
 *   `:query-memo` and a `:query-version`, and freshly built when it does not.
 * 
 *   This is the seam a protocol handler calls instead of `query`, so that a
 *   deployment able to name its state gets the memo and one that cannot still
 *   works unchanged. Neither half alone is enough: a memo with no version has
 *   nothing to key on, and a version with no memo has nowhere to put the result.
 * 
 *   The caller supplying `:query-version` is asserting it changes whenever any
 *   document in `coll-keys` changes. See `materialize-memo`.
 */
kotobase.query.bridge.db_for = (function kotobase$query$bridge$db_for(p__7133,store,coll_keys){
var map__7134 = p__7133;
var map__7134__$1 = cljs.core.__destructure_map(map__7134);
var query_memo = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__7134__$1,new cljs.core.Keyword(null,"query-memo","query-memo",-429356731));
var query_version = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__7134__$1,new cljs.core.Keyword(null,"query-version","query-version",-73824555));
if(cljs.core.truth_((function (){var and__5160__auto__ = query_memo;
if(cljs.core.truth_(and__5160__auto__)){
return query_version;
} else {
return and__5160__auto__;
}
})())){
return kotobase.query.bridge.materialize_memo(query_memo,store,coll_keys,query_version);
} else {
return kotobase.query.bridge.materialize(store,coll_keys);
}
});
/**
 * Refuse a missing or non-callable `visible?` before reading anything.
 * 
 *   Being CALLED is not a reliable way for the predicate to announce it is
 *   missing: it is only called when the index has something to filter, and
 *   `(refs-to db o)` on a db with an empty `:ocp` answered `{}` perfectly
 *   cheerfully with no predicate at all. An access path that answers when it
 *   was handed no visibility decision is what ADR-2607050500 forbids, and the
 *   empty-index case is the worst version of it -- the answer looks fine.
 */
kotobase.query.bridge.check_visible_BANG_ = (function kotobase$query$bridge$check_visible_BANG_(visible_QMARK_){
if(cljs.core.ifn_QMARK_(visible_QMARK_)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"visible? is required (ADR-2607050500) -- pass "+"(constantly true) to see everything materialized"),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("kotobase.query","error","kotobase.query/error",1396951710),new cljs.core.Keyword(null,"missing-visible-predicate","missing-visible-predicate",-1423318209)], null));
}
});
/**
 * The `os` an entity `s` still shows under predicate `p`.
 */
kotobase.query.bridge.visible_objects = (function kotobase$query$bridge$visible_objects(visible_QMARK_,s,p,os){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (o){
var G__7135 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null);
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__7135) : visible_QMARK_.call(null,G__7135));
})),os);
});
/**
 * The `ss` still holding `[s p o]` for a fixed `p`/`o`.
 */
kotobase.query.bridge.visible_subjects = (function kotobase$query$bridge$visible_subjects(visible_QMARK_,p,o,ss){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (s){
var G__7136 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null);
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__7136) : visible_QMARK_.call(null,G__7136));
})),ss);
});
/**
 * Drop entries whose value set came back empty. See the ns docstring: an
 *   empty set under a key answers "this exists, but you may see none of it",
 *   which is more than the caller is allowed to know.
 */
kotobase.query.bridge.prune = (function kotobase$query$bridge$prune(m){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.empty_QMARK_,cljs.core.val)),m);
});
/**
 * All `{p #{o ...}}` for subject `s`, under `visible?` -- spo, Datomic's
 *   EAVT. `visible?` is REQUIRED (ns docstring).
 */
kotobase.query.bridge.entity_attrs = (function kotobase$query$bridge$entity_attrs(db,s,visible_QMARK_){
kotobase.query.bridge.check_visible_BANG_(visible_QMARK_);

return kotobase.query.bridge.prune(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__7137){
var vec__7138 = p__7137;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7138,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7138,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,kotobase.query.bridge.visible_objects(visible_QMARK_,s,p,os)], null);
})),arrangement.core.entity_attrs(db,s)));
});
/**
 * All `{s #{o ...}}` for predicate `p`, under `visible?` -- pso, Datomic's
 *   AEVT scan. `visible?` is REQUIRED (ns docstring).
 */
kotobase.query.bridge.by_predicate = (function kotobase$query$bridge$by_predicate(db,p,visible_QMARK_){
kotobase.query.bridge.check_visible_BANG_(visible_QMARK_);

return kotobase.query.bridge.prune(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__7141){
var vec__7142 = p__7141;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7142,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7142,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,kotobase.query.bridge.visible_objects(visible_QMARK_,s,p,os)], null);
})),arrangement.core.by_predicate(db,p)));
});
/**
 * The subjects `s` where `[s p o]` holds, under `visible?` -- pos, Datomic's
 *   AVET point lookup. `visible?` is REQUIRED (ns docstring).
 * 
 *   This is the reverse lookup a surface materialized from documents actually
 *   wants: a foreign key here is a value (`:dept-key "d1"`), so "who points at
 *   d1?" is `(by-predicate-value db :dept-key "d1" visible?)`, not `refs-to`.
 */
kotobase.query.bridge.by_predicate_value = (function kotobase$query$bridge$by_predicate_value(db,p,o,visible_QMARK_){
kotobase.query.bridge.check_visible_BANG_(visible_QMARK_);

return kotobase.query.bridge.visible_subjects(visible_QMARK_,p,o,arrangement.core.by_predicate_value(db,p,o));
});
/**
 * All `{p #{s ...}}` referencing object `o`, under `visible?` -- ocp,
 *   Datomic's VAET. `visible?` is REQUIRED (ns docstring).
 * 
 *   Returns `{}` on a typical materialized db, and that is a property of the
 *   data rather than of this function: `:ocp` covers only objects satisfying
 *   `materialize`'s `ref?` (`ipld.core/link?`), and documents carry plain EDN.
 *   Use `by-predicate-value`. See the ns docstring.
 */
kotobase.query.bridge.refs_to = (function kotobase$query$bridge$refs_to(db,o,visible_QMARK_){
kotobase.query.bridge.check_visible_BANG_(visible_QMARK_);

return kotobase.query.bridge.prune(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__7145){
var vec__7146 = p__7145;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7146,(0),null);
var ss = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7146,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,kotobase.query.bridge.visible_subjects(visible_QMARK_,p,o,ss)], null);
})),arrangement.core.refs_to(db,o)));
});
/**
 * Every `{:s :p :o}` in `db`, under `visible?` -- the fully-unbound scan,
 *   lazy, in `:spo` order. `visible?` is REQUIRED (ns docstring).
 * 
 *   This is the access path a surface with its own engine actually starts
 *   from: it wants the whole plane once, in its own shape, and does its own
 *   joins afterwards. `org-w3-sparql-protocol` is the existing example -- it
 *   turns every triple into an RDF quad and hands the seq to `sparql.core`.
 * 
 *   It was missing from the first cut of this contract (ADR-2608039970), and
 *   the omission was not harmless: the one surface that needed it read
 *   `(:spo db)` directly instead -- a raw index read, with nothing on the
 *   supported path to apply `visible?` for it. That repo re-implemented the
 *   predicate discipline itself and got it right; the next one would have had
 *   to know to.
 * 
 *   Lazy on purpose. The caller is transforming every triple into something
 *   else, so forcing a vector here would hold the whole plane twice.
 */
kotobase.query.bridge.datoms = (function kotobase$query$bridge$datoms(db,visible_QMARK_){
kotobase.query.bridge.check_visible_BANG_(visible_QMARK_);

return cljs.core.filter.cljs$core$IFn$_invoke$arity$2(visible_QMARK_,(function (){var iter__5649__auto__ = (function kotobase$query$bridge$datoms_$_iter__7149(s__7150){
return (new cljs.core.LazySeq(null,(function (){
var s__7150__$1 = s__7150;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__7150__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__7157 = cljs.core.first(xs__6385__auto__);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7157,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7157,(1),null);
var iterys__5645__auto__ = ((function (s__7150__$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__){
return (function kotobase$query$bridge$datoms_$_iter__7149_$_iter__7151(s__7152){
return (new cljs.core.LazySeq(null,((function (s__7150__$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__7152__$1 = s__7152;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__7152__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__7160 = cljs.core.first(xs__6385__auto____$1);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7160,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7160,(1),null);
var iterys__5645__auto__ = ((function (s__7152__$1,s__7150__$1,vec__7160,p,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__){
return (function kotobase$query$bridge$datoms_$_iter__7149_$_iter__7151_$_iter__7153(s__7154){
return (new cljs.core.LazySeq(null,((function (s__7152__$1,s__7150__$1,vec__7160,p,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__7154__$1 = s__7154;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__7154__$1);
if(temp__5825__auto____$2){
var s__7154__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__7154__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__7154__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__7156 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__7155 = (0);
while(true){
if((i__7155 < size__5648__auto__)){
var o = cljs.core._nth(c__5647__auto__,i__7155);
cljs.core.chunk_append(b__7156,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null));

var G__7168 = (i__7155 + (1));
i__7155 = G__7168;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__7156),kotobase$query$bridge$datoms_$_iter__7149_$_iter__7151_$_iter__7153(cljs.core.chunk_rest(s__7154__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__7156),null);
}
} else {
var o = cljs.core.first(s__7154__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null),kotobase$query$bridge$datoms_$_iter__7149_$_iter__7151_$_iter__7153(cljs.core.rest(s__7154__$2)));
}
} else {
return null;
}
break;
}
});})(s__7152__$1,s__7150__$1,vec__7160,p,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__7152__$1,s__7150__$1,vec__7160,p,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase$query$bridge$datoms_$_iter__7149_$_iter__7151(cljs.core.rest(s__7152__$1)));
} else {
var G__7169 = cljs.core.rest(s__7152__$1);
s__7152__$1 = G__7169;
continue;
}
} else {
return null;
}
break;
}
});})(s__7150__$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__7150__$1,vec__7157,s,pm,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase$query$bridge$datoms_$_iter__7149(cljs.core.rest(s__7150__$1)));
} else {
var G__7170 = cljs.core.rest(s__7150__$1);
s__7150__$1 = G__7170;
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
})());
});
/**
 * Run a Datomic-shaped Datalog `query` (`{:find [...] :where [...] :in
 *   [...] :rules [...]}`) over an already-materialized `db` (the return of
 *   `materialize`, or any `arrangement.core` db). `visible?` is REQUIRED (see
 *   ns docstring). Optional 4th arg `inputs` supplies `:in` parameter values,
 *   positional, same order as `:in`.
 * 
 *   A thin delegation to `arrangement.datalog/q` -- this bridge does not
 *   reimplement query evaluation.
 */
kotobase.query.bridge.q = (function kotobase$query$bridge$q(var_args){
var G__7164 = arguments.length;
switch (G__7164) {
case 3:
return kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$3 = (function (db,query,visible_QMARK_){
return arrangement.datalog.q.cljs$core$IFn$_invoke$arity$3(db,query,visible_QMARK_);
}));

(kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$4 = (function (db,query,visible_QMARK_,inputs){
return arrangement.datalog.q.cljs$core$IFn$_invoke$arity$4(db,query,visible_QMARK_,inputs);
}));

(kotobase.query.bridge.q.cljs$lang$maxFixedArity = 4);

/**
 * Convenience: `(q (materialize store coll-keys) query visible? inputs)` in
 *   one call -- materialize `coll-keys` from `store` and immediately run
 *   `query` over the result. `visible?` is REQUIRED (see ns docstring).
 * 
 *   Prefer calling `materialize` once and `q` directly when running several
 *   queries over the same snapshot of data (e.g. in a test, or a batch of
 *   queries in one request) -- `query` re-materializes on every call, which
 *   is wasteful (and, per the v0.1 linear-scan limitation, may observe a
 *   different snapshot of `store` between two `query` calls if it is mutated
 *   concurrently).
 */
kotobase.query.bridge.query = (function kotobase$query$bridge$query(var_args){
var G__7166 = arguments.length;
switch (G__7166) {
case 4:
return kotobase.query.bridge.query.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return kotobase.query.bridge.query.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.query.bridge.query.cljs$core$IFn$_invoke$arity$4 = (function (store,coll_keys,query_form,visible_QMARK_){
return kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$3(kotobase.query.bridge.materialize(store,coll_keys),query_form,visible_QMARK_);
}));

(kotobase.query.bridge.query.cljs$core$IFn$_invoke$arity$5 = (function (store,coll_keys,query_form,visible_QMARK_,inputs){
return kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$4(kotobase.query.bridge.materialize(store,coll_keys),query_form,visible_QMARK_,inputs);
}));

(kotobase.query.bridge.query.cljs$lang$maxFixedArity = 5);


//# sourceMappingURL=kotobase.query.bridge.js.map
