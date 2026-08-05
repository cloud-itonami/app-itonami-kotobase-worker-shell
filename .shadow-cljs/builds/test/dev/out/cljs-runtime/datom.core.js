goog.provide('datom.core');
/**
 * Datomic-style entity (tx-map). `domain` is the attribute prefix (e.g.
 *   "aero", "vdesign"), `kind` the entity type → namespace :domain.Kind/.
 *   `id` is the unique identity; nil attrs are dropped.
 */
datom.core.entity = (function datom$core$entity(domain,kind,id,attrs){
var ns = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(domain))+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(kind)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,"id"),id]),(function (){var iter__5649__auto__ = (function datom$core$entity_$_iter__8713(s__8714){
return (new cljs.core.LazySeq(null,(function (){
var s__8714__$1 = s__8714;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__8714__$1);
if(temp__5825__auto__){
var s__8714__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__8714__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__8714__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__8716 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__8715 = (0);
while(true){
if((i__8715 < size__5648__auto__)){
var vec__8717 = cljs.core._nth(c__5647__auto__,i__8715);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8717,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8717,(1),null);
if((!((v == null)))){
cljs.core.chunk_append(b__8716,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.name(a)),v], null));

var G__8728 = (i__8715 + (1));
i__8715 = G__8728;
continue;
} else {
var G__8729 = (i__8715 + (1));
i__8715 = G__8729;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8716),datom$core$entity_$_iter__8713(cljs.core.chunk_rest(s__8714__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8716),null);
}
} else {
var vec__8720 = cljs.core.first(s__8714__$2);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8720,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8720,(1),null);
if((!((v == null)))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.name(a)),v], null),datom$core$entity_$_iter__8713(cljs.core.rest(s__8714__$2)));
} else {
var G__8730 = cljs.core.rest(s__8714__$2);
s__8714__$1 = G__8730;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(attrs);
})());
});
/**
 * Flatten an entity tx-map into [e a v] tuples, keyed by its /id attribute.
 */
datom.core.eavt = (function datom$core$eavt(ent){
var id_attr = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__8723_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("id",cljs.core.name(p1__8723_SHARP_));
}),cljs.core.keys(ent)));
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ent,id_attr);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__8724){
var vec__8725 = p__8724;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8725,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8725,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null);
}),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(ent,id_attr));
});
/**
 * Collect entity tx-maps into {:tx [..] :datoms [..] :count n}.
 */
datom.core.log = (function datom$core$log(entities){
var ents = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,entities));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tx","tx",466630418),ents,new cljs.core.Keyword(null,"datoms","datoms",-290874434),cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(datom.core.eavt,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ents], 0))),new cljs.core.Keyword(null,"count","count",2139924085),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,datom.core.eavt),ents))], null);
});

//# sourceMappingURL=datom.core.js.map
