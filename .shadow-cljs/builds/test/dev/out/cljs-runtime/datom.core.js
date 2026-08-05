goog.provide('datom.core');
/**
 * Datomic-style entity (tx-map). `domain` is the attribute prefix (e.g.
 *   "aero", "vdesign"), `kind` the entity type → namespace :domain.Kind/.
 *   `id` is the unique identity; nil attrs are dropped.
 */
datom.core.entity = (function datom$core$entity(domain,kind,id,attrs){
var ns = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(domain))+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(kind)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,"id"),id]),(function (){var iter__5649__auto__ = (function datom$core$entity_$_iter__13827(s__13828){
return (new cljs.core.LazySeq(null,(function (){
var s__13828__$1 = s__13828;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__13828__$1);
if(temp__5825__auto__){
var s__13828__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13828__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__13828__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__13830 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__13829 = (0);
while(true){
if((i__13829 < size__5648__auto__)){
var vec__13831 = cljs.core._nth(c__5647__auto__,i__13829);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13831,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13831,(1),null);
if((!((v == null)))){
cljs.core.chunk_append(b__13830,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.name(a)),v], null));

var G__13842 = (i__13829 + (1));
i__13829 = G__13842;
continue;
} else {
var G__13843 = (i__13829 + (1));
i__13829 = G__13843;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13830),datom$core$entity_$_iter__13827(cljs.core.chunk_rest(s__13828__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13830),null);
}
} else {
var vec__13834 = cljs.core.first(s__13828__$2);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13834,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13834,(1),null);
if((!((v == null)))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.name(a)),v], null),datom$core$entity_$_iter__13827(cljs.core.rest(s__13828__$2)));
} else {
var G__13844 = cljs.core.rest(s__13828__$2);
s__13828__$1 = G__13844;
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
var id_attr = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__13837_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("id",cljs.core.name(p1__13837_SHARP_));
}),cljs.core.keys(ent)));
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ent,id_attr);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__13838){
var vec__13839 = p__13838;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13839,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13839,(1),null);
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
