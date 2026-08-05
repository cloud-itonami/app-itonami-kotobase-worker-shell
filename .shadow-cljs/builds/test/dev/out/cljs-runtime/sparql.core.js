goog.provide('sparql.core');
sparql.core.logic_var_QMARK_ = (function sparql$core$logic_var_QMARK_(x){
return (((x instanceof cljs.core.Symbol)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("?",cljs.core.first(cljs.core.name(x)))));
});
sparql.core.term_EQ_ = (function sparql$core$term_EQ_(a,b){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a,b);
});
sparql.core.match_component = (function sparql$core$match_component(pat,quad_val,bindings){
if(sparql.core.logic_var_QMARK_(pat)){
if(cljs.core.contains_QMARK_(bindings,pat)){
if(sparql.core.term_EQ_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(bindings,pat),quad_val)){
return bindings;
} else {
return null;
}
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(bindings,pat,quad_val);
}
} else {
if(sparql.core.term_EQ_(pat,quad_val)){
return bindings;
} else {
return null;
}

}
});
/**
 * Try to unify one [s p o] pattern (terms or ?vars) against one quad map
 *   (:subject/:predicate/:object, rdf.core shape). Returns an extended
 *   bindings map, or nil on mismatch.
 */
sparql.core.match_triple = (function sparql$core$match_triple(p__8134,quad,bindings){
var vec__8135 = p__8134;
var ps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8135,(0),null);
var pp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8135,(1),null);
var po = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8135,(2),null);
var G__8138 = bindings;
var G__8138__$1 = (((G__8138 == null))?null:sparql.core.match_component(ps,new cljs.core.Keyword(null,"subject","subject",-1411880451).cljs$core$IFn$_invoke$arity$1(quad),G__8138));
var G__8138__$2 = (((G__8138__$1 == null))?null:sparql.core.match_component(pp,new cljs.core.Keyword(null,"predicate","predicate",-1742501860).cljs$core$IFn$_invoke$arity$1(quad),G__8138__$1));
if((G__8138__$2 == null)){
return null;
} else {
return sparql.core.match_component(po,new cljs.core.Keyword(null,"object","object",1474613949).cljs$core$IFn$_invoke$arity$1(quad),G__8138__$2);
}
});
/**
 * Multiple triple patterns, joined left-to-right by shared ?vars.
 *   Returns the seq of bindings-maps satisfying every pattern.
 */
sparql.core.bgp = (function sparql$core$bgp(patterns,quads){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (binding_seq,pattern){
var iter__5649__auto__ = (function sparql$core$bgp_$_iter__8139(s__8140){
return (new cljs.core.LazySeq(null,(function (){
var s__8140__$1 = s__8140;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__8140__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var bindings = cljs.core.first(xs__6385__auto__);
var iterys__5645__auto__ = ((function (s__8140__$1,bindings,xs__6385__auto__,temp__5825__auto__){
return (function sparql$core$bgp_$_iter__8139_$_iter__8141(s__8142){
return (new cljs.core.LazySeq(null,((function (s__8140__$1,bindings,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__8142__$1 = s__8142;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__8142__$1);
if(temp__5825__auto____$1){
var s__8142__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__8142__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__8142__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__8144 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__8143 = (0);
while(true){
if((i__8143 < size__5648__auto__)){
var quad = cljs.core._nth(c__5647__auto__,i__8143);
var next = sparql.core.match_triple(pattern,quad,bindings);
if(cljs.core.truth_(next)){
cljs.core.chunk_append(b__8144,next);

var G__8198 = (i__8143 + (1));
i__8143 = G__8198;
continue;
} else {
var G__8199 = (i__8143 + (1));
i__8143 = G__8199;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8144),sparql$core$bgp_$_iter__8139_$_iter__8141(cljs.core.chunk_rest(s__8142__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8144),null);
}
} else {
var quad = cljs.core.first(s__8142__$2);
var next = sparql.core.match_triple(pattern,quad,bindings);
if(cljs.core.truth_(next)){
return cljs.core.cons(next,sparql$core$bgp_$_iter__8139_$_iter__8141(cljs.core.rest(s__8142__$2)));
} else {
var G__8200 = cljs.core.rest(s__8142__$2);
s__8142__$1 = G__8200;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__8140__$1,bindings,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__8140__$1,bindings,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(quads));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,sparql$core$bgp_$_iter__8139(cljs.core.rest(s__8140__$1)));
} else {
var G__8201 = cljs.core.rest(s__8140__$1);
s__8140__$1 = G__8201;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(binding_seq);
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY], null),patterns);
});
/**
 * Compare two bound values, tolerating unbound (nil) and mixed types.
 * 
 *   `clojure.core/compare` throws across types, and a solution sequence is
 *   exactly where mixed types show up — SPARQL binds whatever the data holds
 *   and does not promise homogeneity. Unbound sorts first (SPARQL 1.1 §15.1
 *   puts unbound before everything), then values are compared inside a type,
 *   and across types by type name so the order is at least total and stable
 *   rather than an exception.
 */
sparql.core.cmp = (function sparql$core$cmp(a,b){
if((((a == null)) && ((b == null)))){
return (0);
} else {
if((a == null)){
return (-1);
} else {
if((b == null)){
return (1);
} else {
var ta = cljs.core.type(a);
var tb = cljs.core.type(b);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ta,tb)){
try{return cljs.core.compare(a,b);
}catch (e8145){var _ = e8145;
return cljs.core.compare((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(b)));
}} else {
return cljs.core.compare((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(ta)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tb)));
}

}
}
}
});
/**
 * Comparator over solution maps for `vars`, descending for those in `desc`.
 * 
 *   Written out rather than `sort-by` + `juxt` because that form can only sort
 *   every key the same direction — which is why `ORDER BY DESC(?x)` used to be
 *   accepted and then silently sorted ASCENDING. A comparator that cannot express
 *   the query is worse than one that rejects it.
 */
sparql.core.row_comparator = (function sparql$core$row_comparator(var_args){
var G__8147 = arguments.length;
switch (G__8147) {
case 1:
return sparql.core.row_comparator.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sparql.core.row_comparator.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(sparql.core.row_comparator.cljs$core$IFn$_invoke$arity$1 = (function (vars){
return sparql.core.row_comparator.cljs$core$IFn$_invoke$arity$2(vars,cljs.core.PersistentHashSet.EMPTY);
}));

(sparql.core.row_comparator.cljs$core$IFn$_invoke$arity$2 = (function (vars,desc){
return (function (x,y){
var vs = cljs.core.seq(vars);
while(true){
if(cljs.core.not(vs)){
return (0);
} else {
var v = cljs.core.first(vs);
var c = sparql.core.cmp(cljs.core.get.cljs$core$IFn$_invoke$arity$2(x,v),cljs.core.get.cljs$core$IFn$_invoke$arity$2(y,v));
var c__$1 = ((cljs.core.contains_QMARK_(desc,v))?(- c):c);
if((c__$1 === (0))){
var G__8203 = cljs.core.next(vs);
vs = G__8203;
continue;
} else {
return c__$1;
}
}
break;
}
});
}));

(sparql.core.row_comparator.cljs$lang$maxFixedArity = 2);

sparql.core.eval_node = (function sparql$core$eval_node(node,quads){
var G__8149 = new cljs.core.Keyword("sparql","op","sparql/op",1260997734).cljs$core$IFn$_invoke$arity$1(node);
var G__8149__$1 = (((G__8149 instanceof cljs.core.Keyword))?G__8149.fqn:null);
switch (G__8149__$1) {
case "bgp":
return sparql.core.bgp(new cljs.core.Keyword(null,"patterns","patterns",1164082024).cljs$core$IFn$_invoke$arity$1(node),quads);

break;
case "filter":
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pred","pred",1927423397).cljs$core$IFn$_invoke$arity$1(node),(function (){var G__8150 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__8151 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8150,G__8151) : sparql.core.eval_node.call(null,G__8150,G__8151));
})());

break;
case "join":
var iter__5649__auto__ = (function sparql$core$eval_node_$_iter__8152(s__8153){
return (new cljs.core.LazySeq(null,(function (){
var s__8153__$1 = s__8153;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__8153__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var l = cljs.core.first(xs__6385__auto__);
var iterys__5645__auto__ = ((function (s__8153__$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1){
return (function sparql$core$eval_node_$_iter__8152_$_iter__8154(s__8155){
return (new cljs.core.LazySeq(null,((function (s__8153__$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1){
return (function (){
var s__8155__$1 = s__8155;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__8155__$1);
if(temp__5825__auto____$1){
var s__8155__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__8155__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__8155__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__8157 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__8156 = (0);
while(true){
if((i__8156 < size__5648__auto__)){
var r = cljs.core._nth(c__5647__auto__,i__8156);
if(cljs.core.every_QMARK_(((function (i__8156,s__8155__$1,s__8153__$1,r,c__5647__auto__,size__5648__auto__,b__8157,s__8155__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1){
return (function (p__8158){
var vec__8159 = p__8158;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8159,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8159,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get.cljs$core$IFn$_invoke$arity$3(r,k,v));
});})(i__8156,s__8155__$1,s__8153__$1,r,c__5647__auto__,size__5648__auto__,b__8157,s__8155__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1))
,l)){
cljs.core.chunk_append(b__8157,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([l,r], 0)));

var G__8205 = (i__8156 + (1));
i__8156 = G__8205;
continue;
} else {
var G__8206 = (i__8156 + (1));
i__8156 = G__8206;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8157),sparql$core$eval_node_$_iter__8152_$_iter__8154(cljs.core.chunk_rest(s__8155__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8157),null);
}
} else {
var r = cljs.core.first(s__8155__$2);
if(cljs.core.every_QMARK_(((function (s__8155__$1,s__8153__$1,r,s__8155__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1){
return (function (p__8162){
var vec__8163 = p__8162;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8163,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8163,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get.cljs$core$IFn$_invoke$arity$3(r,k,v));
});})(s__8155__$1,s__8153__$1,r,s__8155__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1))
,l)){
return cljs.core.cons(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([l,r], 0)),sparql$core$eval_node_$_iter__8152_$_iter__8154(cljs.core.rest(s__8155__$2)));
} else {
var G__8207 = cljs.core.rest(s__8155__$2);
s__8155__$1 = G__8207;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__8153__$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1))
,null,null));
});})(s__8153__$1,l,xs__6385__auto__,temp__5825__auto__,G__8149,G__8149__$1))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__((function (){var G__8166 = new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(node);
var G__8167 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8166,G__8167) : sparql.core.eval_node.call(null,G__8166,G__8167));
})()));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,sparql$core$eval_node_$_iter__8152(cljs.core.rest(s__8153__$1)));
} else {
var G__8208 = cljs.core.rest(s__8153__$1);
s__8153__$1 = G__8208;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__((function (){var G__8168 = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(node);
var G__8169 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8168,G__8169) : sparql.core.eval_node.call(null,G__8168,G__8169));
})());

break;
case "union":
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__8170 = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(node);
var G__8171 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8170,G__8171) : sparql.core.eval_node.call(null,G__8170,G__8171));
})(),(function (){var G__8172 = new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(node);
var G__8173 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8172,G__8173) : sparql.core.eval_node.call(null,G__8172,G__8173));
})());

break;
case "optional":
var lefts = (function (){var G__8174 = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(node);
var G__8175 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8174,G__8175) : sparql.core.eval_node.call(null,G__8174,G__8175));
})();
var rights = (function (){var G__8176 = new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(node);
var G__8177 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8176,G__8177) : sparql.core.eval_node.call(null,G__8176,G__8177));
})();
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (l){
var matches = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (r){
if(cljs.core.every_QMARK_((function (p__8178){
var vec__8179 = p__8178;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8179,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8179,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get.cljs$core$IFn$_invoke$arity$3(r,k,v));
}),l)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([l,r], 0));
} else {
return null;
}
}),rights);
if(cljs.core.seq(matches)){
return matches;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [l], null);
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([lefts], 0));

break;
case "project":
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__8148_SHARP_){
return cljs.core.select_keys(p1__8148_SHARP_,new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(node));
}),(function (){var G__8182 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__8183 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8182,G__8183) : sparql.core.eval_node.call(null,G__8182,G__8183));
})());

break;
case "distinct":
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var G__8184 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__8185 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8184,G__8185) : sparql.core.eval_node.call(null,G__8184,G__8185));
})());

break;
case "order-by":
return cljs.core.sort.cljs$core$IFn$_invoke$arity$2(sparql.core.row_comparator.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(node),cljs.core.set(new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(node))),(function (){var G__8186 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__8187 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8186,G__8187) : sparql.core.eval_node.call(null,G__8186,G__8187));
})());

break;
case "slice":
var G__8188 = (function (){var G__8189 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__8190 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__8189,G__8190) : sparql.core.eval_node.call(null,G__8189,G__8190));
})();
var G__8188__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"offset","offset",296498311).cljs$core$IFn$_invoke$arity$1(node))?cljs.core.drop.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"offset","offset",296498311).cljs$core$IFn$_invoke$arity$1(node),G__8188):G__8188);
if(cljs.core.truth_(new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(node))){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(node),G__8188__$1);
} else {
return G__8188__$1;
}

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8149__$1))));

}
});
/**
 * One template triple `[s p o]` -- written like a BGP pattern -- against one
 *   solution: every logic variable replaced by
 *   its binding. Returns nil when any position is still unbound — SPARQL 1.1
 *   §16.2 says a template triple with an unbound slot produces nothing, rather
 *   than a triple with a hole in it.
 */
sparql.core.instantiate = (function sparql$core$instantiate(p__8191,binding){
var vec__8192 = p__8191;
var subject = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8192,(0),null);
var predicate = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8192,(1),null);
var object = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8192,(2),null);
var r = (function (t){
if(sparql.core.logic_var_QMARK_(t)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(binding,t,new cljs.core.Keyword("sparql.core","unbound","sparql.core/unbound",-2042926594));
} else {
return t;
}
});
var s_SINGLEQUOTE_ = r(subject);
var p_SINGLEQUOTE_ = r(predicate);
var o_SINGLEQUOTE_ = r(object);
if(cljs.core.truth_(cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("sparql.core","unbound","sparql.core/unbound",-2042926594),null], null), null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s_SINGLEQUOTE_,p_SINGLEQUOTE_,o_SINGLEQUOTE_], null)))){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"subject","subject",-1411880451),s_SINGLEQUOTE_,new cljs.core.Keyword(null,"predicate","predicate",-1742501860),p_SINGLEQUOTE_,new cljs.core.Keyword(null,"object","object",1474613949),o_SINGLEQUOTE_], null);
}
});
/**
 * `CONSTRUCT`: evaluate `algebra` and instantiate `template` (a seq of `[s p o]`
 *   triple patterns, the same shape a `:bgp` takes) once per solution. Emits
 *   rdf-shaped quad maps, which is what `describe` and every consumer of a graph
 *   here already reads.
 * 
 *   Returns a SET of triples, because the result of CONSTRUCT is an RDF graph and
 *   a graph has no duplicates and no order — returning a seq would invite callers
 *   to depend on both.
 */
sparql.core.construct = (function sparql$core$construct(template,algebra,quads){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__8195_SHARP_){
return sparql.core.instantiate(p1__8195_SHARP_,binding);
}),template);
}))),sparql.core.eval_node(algebra,quads));
});
/**
 * `DESCRIBE`: every quad whose subject is one of `terms`.
 * 
 *   That is the SUBJECT-triples description, not the Concise Bounded Description
 *   the spec permits — CBD follows blank nodes recursively, and this library has
 *   no blank-node syntax to follow. The spec leaves the description's shape
 *   implementation-defined precisely so a service can say which one it returns,
 *   so this one says it.
 * 
 *   Returns a set, for the same reason `construct` does.
 */
sparql.core.describe = (function sparql$core$describe(terms,quads){
var wanted = cljs.core.set(terms);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__8196_SHARP_){
return cljs.core.contains_QMARK_(wanted,new cljs.core.Keyword(null,"subject","subject",-1411880451).cljs$core$IFn$_invoke$arity$1(p1__8196_SHARP_));
})),quads);
});
/**
 * `DESCRIBE ?v WHERE { ... }`: the terms `?v` takes across the solutions of
 *   `algebra`, described. `vars` is the projection list.
 */
sparql.core.describe_solutions = (function sparql$core$describe_solutions(vars,algebra,quads){
return sparql.core.describe(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (b){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__8197_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,p1__8197_SHARP_);
}),vars);
}))),sparql.core.eval_node(algebra,quads)),quads);
});
/**
 * Execute a SPARQL algebra tree (see the :sparql/op node shapes above)
 *   against a seq of rdf.core-shaped quads. Returns a seq of bindings maps
 *   ({'?var term ...}).
 */
sparql.core.select = (function sparql$core$select(algebra,quads){
return cljs.core.vec(sparql.core.eval_node(algebra,quads));
});
/**
 * True if the algebra tree matches at least one binding.
 */
sparql.core.ask = (function sparql$core$ask(algebra,quads){
return cljs.core.boolean$(cljs.core.seq(sparql.core.eval_node(algebra,quads)));
});

//# sourceMappingURL=sparql.core.js.map
