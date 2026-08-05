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
sparql.core.match_triple = (function sparql$core$match_triple(p__13216,quad,bindings){
var vec__13217 = p__13216;
var ps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13217,(0),null);
var pp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13217,(1),null);
var po = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13217,(2),null);
var G__13220 = bindings;
var G__13220__$1 = (((G__13220 == null))?null:sparql.core.match_component(ps,new cljs.core.Keyword(null,"subject","subject",-1411880451).cljs$core$IFn$_invoke$arity$1(quad),G__13220));
var G__13220__$2 = (((G__13220__$1 == null))?null:sparql.core.match_component(pp,new cljs.core.Keyword(null,"predicate","predicate",-1742501860).cljs$core$IFn$_invoke$arity$1(quad),G__13220__$1));
if((G__13220__$2 == null)){
return null;
} else {
return sparql.core.match_component(po,new cljs.core.Keyword(null,"object","object",1474613949).cljs$core$IFn$_invoke$arity$1(quad),G__13220__$2);
}
});
/**
 * Multiple triple patterns, joined left-to-right by shared ?vars.
 *   Returns the seq of bindings-maps satisfying every pattern.
 */
sparql.core.bgp = (function sparql$core$bgp(patterns,quads){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (binding_seq,pattern){
var iter__5649__auto__ = (function sparql$core$bgp_$_iter__13221(s__13222){
return (new cljs.core.LazySeq(null,(function (){
var s__13222__$1 = s__13222;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__13222__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var bindings = cljs.core.first(xs__6385__auto__);
var iterys__5645__auto__ = ((function (s__13222__$1,bindings,xs__6385__auto__,temp__5825__auto__){
return (function sparql$core$bgp_$_iter__13221_$_iter__13223(s__13224){
return (new cljs.core.LazySeq(null,((function (s__13222__$1,bindings,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__13224__$1 = s__13224;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__13224__$1);
if(temp__5825__auto____$1){
var s__13224__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__13224__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__13224__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__13226 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__13225 = (0);
while(true){
if((i__13225 < size__5648__auto__)){
var quad = cljs.core._nth(c__5647__auto__,i__13225);
var next = sparql.core.match_triple(pattern,quad,bindings);
if(cljs.core.truth_(next)){
cljs.core.chunk_append(b__13226,next);

var G__13310 = (i__13225 + (1));
i__13225 = G__13310;
continue;
} else {
var G__13311 = (i__13225 + (1));
i__13225 = G__13311;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13226),sparql$core$bgp_$_iter__13221_$_iter__13223(cljs.core.chunk_rest(s__13224__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13226),null);
}
} else {
var quad = cljs.core.first(s__13224__$2);
var next = sparql.core.match_triple(pattern,quad,bindings);
if(cljs.core.truth_(next)){
return cljs.core.cons(next,sparql$core$bgp_$_iter__13221_$_iter__13223(cljs.core.rest(s__13224__$2)));
} else {
var G__13312 = cljs.core.rest(s__13224__$2);
s__13224__$1 = G__13312;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__13222__$1,bindings,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__13222__$1,bindings,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(quads));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,sparql$core$bgp_$_iter__13221(cljs.core.rest(s__13222__$1)));
} else {
var G__13313 = cljs.core.rest(s__13222__$1);
s__13222__$1 = G__13313;
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
}catch (e13227){var _ = e13227;
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
var G__13229 = arguments.length;
switch (G__13229) {
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
var G__13315 = cljs.core.next(vs);
vs = G__13315;
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

/**
 * The number a term carries, or nil.
 * 
 *   A datom plane that stringifies on write reports `30` as the string
 *   `"30"`, so SUM/AVG/MIN/MAX over real data would otherwise see nothing
 *   numeric at all. Parsing here is the same rule a FILTER comparison needs:
 *   numeric when both sides parse as numbers, and this is the `parses as a
 *   number` half of it. A value that does not parse contributes nothing rather
 *   than throwing — SPARQL aggregates skip what they cannot add.
 */
sparql.core.numeric = (function sparql$core$numeric(term){
var v = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(term);
if(typeof v === 'number'){
return v;
} else {
if(typeof v === 'string'){
var n = (function (){var n = parseFloat(v);
if(cljs.core.truth_(isNaN(n))){
return null;
} else {
return n;
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = n;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.re_matches(/\s*-?\d+(\.\d+)?\s*/,v);
} else {
return and__5160__auto__;
}
})())){
return n;
} else {
return null;
}
} else {
return null;

}
}
});
/**
 * Wrap an aggregate result as a term, so a row is terms throughout and a
 *   consumer never has to ask which columns are special.
 */
sparql.core.literal = (function sparql$core$literal(v){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("rdf","type","rdf/type",1175423232),new cljs.core.Keyword(null,"literal","literal",1664775605),new cljs.core.Keyword(null,"value","value",305978217),v], null);
});
/**
 * One aggregate over one group's solutions.
 * 
 *   `:arg` is a var, or `:*` for `COUNT(*)`. COUNT counts solutions in which
 *   the arg is BOUND (`COUNT(*)` counts every solution); the numeric
 *   aggregates skip solutions whose value is not a number, and answer nil for
 *   an empty group — nil, not 0, because `SUM` of nothing and `SUM` of zeros
 *   are different facts.
 */
sparql.core.aggregate_value = (function sparql$core$aggregate_value(p__13232,rows){
var map__13233 = p__13232;
var map__13233__$1 = cljs.core.__destructure_map(map__13233);
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13233__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var arg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13233__$1,new cljs.core.Keyword(null,"arg","arg",-1747261837));
var distinct_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13233__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810));
var bound = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"*","*",-1294732318),arg))?rows:cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__13230_SHARP_){
return cljs.core.contains_QMARK_(p1__13230_SHARP_,arg);
}),rows));
var vals_STAR_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"*","*",-1294732318),arg))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13231_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__13231_SHARP_,arg);
}),bound));
var vals_STAR___$1 = (cljs.core.truth_(distinct_QMARK_)?cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(vals_STAR_):vals_STAR_);
var nums = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(sparql.core.numeric,vals_STAR___$1);
var G__13234 = fn;
var G__13234__$1 = (((G__13234 instanceof cljs.core.Keyword))?G__13234.fqn:null);
switch (G__13234__$1) {
case "count":
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"*","*",-1294732318),arg)){
return cljs.core.count((cljs.core.truth_(distinct_QMARK_)?cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(bound):bound));
} else {
return cljs.core.count(vals_STAR___$1);
}

break;
case "sum":
if(cljs.core.seq(nums)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,nums);
} else {
return null;
}

break;
case "min":
if(cljs.core.seq(nums)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.min,nums);
} else {
return null;
}

break;
case "max":
if(cljs.core.seq(nums)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.max,nums);
} else {
return null;
}

break;
case "avg":
if(cljs.core.seq(nums)){
return (cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,nums) / cljs.core.count(nums));
} else {
return null;
}

break;
default:
return null;

}
});
/**
 * GROUP BY + aggregates.
 * 
 *   With no `:by` vars the whole solution set is ONE group, and it exists even
 *   when there are no solutions — `SELECT (COUNT(?e) AS ?c) WHERE {...}` over
 *   an empty result answers one row with 0, which is what SPARQL says and what
 *   a caller counting things expects. With `:by` vars an empty result is zero
 *   groups and therefore zero rows.
 */
sparql.core.group = (function sparql$core$group(p__13236,rows){
var map__13237 = p__13236;
var map__13237__$1 = cljs.core.__destructure_map(map__13237);
var by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13237__$1,new cljs.core.Keyword(null,"by","by",30600856));
var aggregates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13237__$1,new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289));
var groups = ((cljs.core.seq(by))?cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__13238){
var vec__13239 = p__13238;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13239,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13239,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}),cljs.core.group_by((function (p1__13235_SHARP_){
return cljs.core.select_keys(p1__13235_SHARP_,by);
}),rows)):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,cljs.core.vec(rows)], null)], null));
var iter__5649__auto__ = (function sparql$core$group_$_iter__13242(s__13243){
return (new cljs.core.LazySeq(null,(function (){
var s__13243__$1 = s__13243;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__13243__$1);
if(temp__5825__auto__){
var s__13243__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13243__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__13243__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__13245 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__13244 = (0);
while(true){
if((i__13244 < size__5648__auto__)){
var vec__13246 = cljs.core._nth(c__5647__auto__,i__13244);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13246,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13246,(1),null);
cljs.core.chunk_append(b__13245,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (i__13244,vec__13246,k,v,c__5647__auto__,size__5648__auto__,b__13245,s__13243__$2,temp__5825__auto__,groups,map__13237,map__13237__$1,by,aggregates){
return (function (row,p__13249){
var map__13250 = p__13249;
var map__13250__$1 = cljs.core.__destructure_map(map__13250);
var agg = map__13250__$1;
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13250__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var x = sparql.core.aggregate_value(agg,v);
var G__13251 = row;
if((!((x == null)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__13251,var$,sparql.core.literal(x));
} else {
return G__13251;
}
});})(i__13244,vec__13246,k,v,c__5647__auto__,size__5648__auto__,b__13245,s__13243__$2,temp__5825__auto__,groups,map__13237,map__13237__$1,by,aggregates))
,k,aggregates));

var G__13317 = (i__13244 + (1));
i__13244 = G__13317;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13245),sparql$core$group_$_iter__13242(cljs.core.chunk_rest(s__13243__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13245),null);
}
} else {
var vec__13252 = cljs.core.first(s__13243__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13252,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13252,(1),null);
return cljs.core.cons(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (vec__13252,k,v,s__13243__$2,temp__5825__auto__,groups,map__13237,map__13237__$1,by,aggregates){
return (function (row,p__13255){
var map__13256 = p__13255;
var map__13256__$1 = cljs.core.__destructure_map(map__13256);
var agg = map__13256__$1;
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13256__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var x = sparql.core.aggregate_value(agg,v);
var G__13257 = row;
if((!((x == null)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__13257,var$,sparql.core.literal(x));
} else {
return G__13257;
}
});})(vec__13252,k,v,s__13243__$2,temp__5825__auto__,groups,map__13237,map__13237__$1,by,aggregates))
,k,aggregates),sparql$core$group_$_iter__13242(cljs.core.rest(s__13243__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(groups);
});
sparql.core.eval_node = (function sparql$core$eval_node(node,quads){
var G__13259 = new cljs.core.Keyword("sparql","op","sparql/op",1260997734).cljs$core$IFn$_invoke$arity$1(node);
var G__13259__$1 = (((G__13259 instanceof cljs.core.Keyword))?G__13259.fqn:null);
switch (G__13259__$1) {
case "bgp":
return sparql.core.bgp(new cljs.core.Keyword(null,"patterns","patterns",1164082024).cljs$core$IFn$_invoke$arity$1(node),quads);

break;
case "filter":
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pred","pred",1927423397).cljs$core$IFn$_invoke$arity$1(node),(function (){var G__13260 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__13261 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13260,G__13261) : sparql.core.eval_node.call(null,G__13260,G__13261));
})());

break;
case "join":
var iter__5649__auto__ = (function sparql$core$eval_node_$_iter__13262(s__13263){
return (new cljs.core.LazySeq(null,(function (){
var s__13263__$1 = s__13263;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__13263__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var l = cljs.core.first(xs__6385__auto__);
var iterys__5645__auto__ = ((function (s__13263__$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1){
return (function sparql$core$eval_node_$_iter__13262_$_iter__13264(s__13265){
return (new cljs.core.LazySeq(null,((function (s__13263__$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1){
return (function (){
var s__13265__$1 = s__13265;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__13265__$1);
if(temp__5825__auto____$1){
var s__13265__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__13265__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__13265__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__13267 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__13266 = (0);
while(true){
if((i__13266 < size__5648__auto__)){
var r = cljs.core._nth(c__5647__auto__,i__13266);
if(cljs.core.every_QMARK_(((function (i__13266,s__13265__$1,s__13263__$1,r,c__5647__auto__,size__5648__auto__,b__13267,s__13265__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1){
return (function (p__13268){
var vec__13269 = p__13268;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13269,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13269,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get.cljs$core$IFn$_invoke$arity$3(r,k,v));
});})(i__13266,s__13265__$1,s__13263__$1,r,c__5647__auto__,size__5648__auto__,b__13267,s__13265__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1))
,l)){
cljs.core.chunk_append(b__13267,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([l,r], 0)));

var G__13319 = (i__13266 + (1));
i__13266 = G__13319;
continue;
} else {
var G__13320 = (i__13266 + (1));
i__13266 = G__13320;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13267),sparql$core$eval_node_$_iter__13262_$_iter__13264(cljs.core.chunk_rest(s__13265__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13267),null);
}
} else {
var r = cljs.core.first(s__13265__$2);
if(cljs.core.every_QMARK_(((function (s__13265__$1,s__13263__$1,r,s__13265__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1){
return (function (p__13272){
var vec__13273 = p__13272;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13273,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13273,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get.cljs$core$IFn$_invoke$arity$3(r,k,v));
});})(s__13265__$1,s__13263__$1,r,s__13265__$2,temp__5825__auto____$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1))
,l)){
return cljs.core.cons(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([l,r], 0)),sparql$core$eval_node_$_iter__13262_$_iter__13264(cljs.core.rest(s__13265__$2)));
} else {
var G__13321 = cljs.core.rest(s__13265__$2);
s__13265__$1 = G__13321;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__13263__$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1))
,null,null));
});})(s__13263__$1,l,xs__6385__auto__,temp__5825__auto__,G__13259,G__13259__$1))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__((function (){var G__13276 = new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(node);
var G__13277 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13276,G__13277) : sparql.core.eval_node.call(null,G__13276,G__13277));
})()));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,sparql$core$eval_node_$_iter__13262(cljs.core.rest(s__13263__$1)));
} else {
var G__13322 = cljs.core.rest(s__13263__$1);
s__13263__$1 = G__13322;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__((function (){var G__13278 = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(node);
var G__13279 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13278,G__13279) : sparql.core.eval_node.call(null,G__13278,G__13279));
})());

break;
case "union":
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__13280 = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(node);
var G__13281 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13280,G__13281) : sparql.core.eval_node.call(null,G__13280,G__13281));
})(),(function (){var G__13282 = new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(node);
var G__13283 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13282,G__13283) : sparql.core.eval_node.call(null,G__13282,G__13283));
})());

break;
case "optional":
var lefts = (function (){var G__13284 = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(node);
var G__13285 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13284,G__13285) : sparql.core.eval_node.call(null,G__13284,G__13285));
})();
var rights = (function (){var G__13286 = new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(node);
var G__13287 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13286,G__13287) : sparql.core.eval_node.call(null,G__13286,G__13287));
})();
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (l){
var matches = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (r){
if(cljs.core.every_QMARK_((function (p__13288){
var vec__13289 = p__13288;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13289,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13289,(1),null);
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
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13258_SHARP_){
return cljs.core.select_keys(p1__13258_SHARP_,new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(node));
}),(function (){var G__13292 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__13293 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13292,G__13293) : sparql.core.eval_node.call(null,G__13292,G__13293));
})());

break;
case "distinct":
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var G__13294 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__13295 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13294,G__13295) : sparql.core.eval_node.call(null,G__13294,G__13295));
})());

break;
case "order-by":
return cljs.core.sort.cljs$core$IFn$_invoke$arity$2(sparql.core.row_comparator.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(node),cljs.core.set(new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(node))),(function (){var G__13296 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__13297 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13296,G__13297) : sparql.core.eval_node.call(null,G__13296,G__13297));
})());

break;
case "group":
return sparql.core.group(node,(function (){var G__13298 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__13299 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13298,G__13299) : sparql.core.eval_node.call(null,G__13298,G__13299));
})());

break;
case "slice":
var G__13300 = (function (){var G__13301 = new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node);
var G__13302 = quads;
return (sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2 ? sparql.core.eval_node.cljs$core$IFn$_invoke$arity$2(G__13301,G__13302) : sparql.core.eval_node.call(null,G__13301,G__13302));
})();
var G__13300__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"offset","offset",296498311).cljs$core$IFn$_invoke$arity$1(node))?cljs.core.drop.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"offset","offset",296498311).cljs$core$IFn$_invoke$arity$1(node),G__13300):G__13300);
if(cljs.core.truth_(new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(node))){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(node),G__13300__$1);
} else {
return G__13300__$1;
}

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__13259__$1))));

}
});
/**
 * One template triple `[s p o]` -- written like a BGP pattern -- against one
 *   solution: every logic variable replaced by
 *   its binding. Returns nil when any position is still unbound — SPARQL 1.1
 *   §16.2 says a template triple with an unbound slot produces nothing, rather
 *   than a triple with a hole in it.
 */
sparql.core.instantiate = (function sparql$core$instantiate(p__13303,binding){
var vec__13304 = p__13303;
var subject = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13304,(0),null);
var predicate = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13304,(1),null);
var object = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13304,(2),null);
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
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__13307_SHARP_){
return sparql.core.instantiate(p1__13307_SHARP_,binding);
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__13308_SHARP_){
return cljs.core.contains_QMARK_(wanted,new cljs.core.Keyword(null,"subject","subject",-1411880451).cljs$core$IFn$_invoke$arity$1(p1__13308_SHARP_));
})),quads);
});
/**
 * `DESCRIBE ?v WHERE { ... }`: the terms `?v` takes across the solutions of
 *   `algebra`, described. `vars` is the projection list.
 */
sparql.core.describe_solutions = (function sparql$core$describe_solutions(vars,algebra,quads){
return sparql.core.describe(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (b){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__13309_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,p1__13309_SHARP_);
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
