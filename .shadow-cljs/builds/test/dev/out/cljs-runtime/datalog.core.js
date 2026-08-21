goog.provide('datalog.core');
/**
 * Whether the db of the query currently running satisfies `IPatternSource`.
 * 
 *   `scan*` used to ask that question with `satisfies?` on every call, and `q`
 *   calls `scan*` once per DISTINCT SUBSTITUTED PATTERN -- 882 times for one
 *   clause of LDBC IC02 alone, roughly 1,800 times for the whole query. Measured
 *   2026-08-14: `satisfies?` on a materialized-map db costs 11,305 ns and the keyed
 *   index read it guards costs 210 ns, so the check was 54x the work it protected
 *   and 89% of that query
 *   (kotobase-peer bench/results/2026-08-14-the-residue-is-a-protocol-check.edn).
 * 
 *   The type does not change during a query, so `q` decides once and binds this.
 *   `nil` means nobody decided -- a direct call to an internal, or work that
 *   escaped the binding -- and `scan*` falls back to asking, so the answer is
 *   never wrong, only slower.
 */
datalog.core._STAR_pattern_source_QMARK__STAR_ = null;
/**
 * Resolve one clause pattern against `db`, which may be EITHER a materialized
 *   db (the historical argument) or anything satisfying
 *   `datom.source/IPatternSource`.
 * 
 *   This one function is what puts the whole Datalog engine on top of the seam.
 *   Every clause resolution in this namespace goes through it, so swapping a
 *   cursor source in for a materialized db changes the cost of a join without
 *   changing a line of join logic — which is the point of having had a seam at
 *   all. `visible?` is applied identically in both branches; a source that
 *   filtered differently from `datalog.query/query` would let a negation
 *   observe a fact a positive clause cannot see.
 */
datalog.core.scan_STAR_ = (function datalog$core$scan_STAR_(db,pattern,visible_QMARK_){
if(cljs.core.truth_((((!((datalog.core._STAR_pattern_source_QMARK__STAR_ == null))))?datalog.core._STAR_pattern_source_QMARK__STAR_:(((!((db == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === db.datom$source$IPatternSource$))))?true:(((!db.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db):false)):cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db))))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(visible_QMARK_),datom.source.scan(db,pattern));
} else {
return datalog.query.query(db,pattern,visible_QMARK_);
}
});
/**
 * Resolve `[lo, hi)` on `attr` against `db`. Prefers `IRangeSource` so a
 *   cursor or lake source can prune; degrades to an attribute scan plus
 *   `in-range?` on any other `IPatternSource`; uses `query-range` on a
 *   materialized index map.
 */
datalog.core.scan_range_STAR_ = (function datalog$core$scan_range_STAR_(db,attr,lo,hi,opts,visible_QMARK_){
if((((!((db == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === db.datom$source$IRangeSource$))))?true:(((!db.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(datom.source.IRangeSource,db):false)):cljs.core.native_satisfies_QMARK_(datom.source.IRangeSource,db))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(visible_QMARK_),datom.source.scan_range.cljs$core$IFn$_invoke$arity$5(db,attr,lo,hi,opts));
} else {
if(cljs.core.truth_((((!((datalog.core._STAR_pattern_source_QMARK__STAR_ == null))))?datalog.core._STAR_pattern_source_QMARK__STAR_:(((!((db == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === db.datom$source$IPatternSource$))))?true:(((!db.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db):false)):cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db))))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (q){
var and__5160__auto__ = (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(q) : visible_QMARK_.call(null,q));
if(cljs.core.truth_(and__5160__auto__)){
return datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(q),lo,hi,opts);
} else {
return and__5160__auto__;
}
})),datom.source.scan(db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,attr,null], null)));
} else {
return datalog.query.query_range.cljs$core$IFn$_invoke$arity$6(db,attr,lo,hi,visible_QMARK_,opts);

}
}
});
/**
 * True for a Datalog logic variable: a symbol whose name starts with `?`.
 *   `_` is the wildcard, not a variable -- it never binds.
 */
datalog.core.lvar_QMARK_ = (function datalog$core$lvar_QMARK_(x){
return (((x instanceof cljs.core.Symbol)) && (((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(x,new cljs.core.Symbol(null,"_","_",-1201019570,null))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("?",cljs.core.first(cljs.core.name(x)))))));
});
datalog.core.wildcard_QMARK_ = (function datalog$core$wildcard_QMARK_(x){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,new cljs.core.Symbol(null,"_","_",-1201019570,null));
});
/**
 * `clause` position -> concrete `datalog.query` pattern position: a
 *   wildcard or an unbound variable becomes `nil` (query's own wildcard);
 *   a bound variable becomes its current value; anything else passes through
 *   as the literal it already is.
 */
datalog.core.substitute = (function datalog$core$substitute(term,binding){
if(datalog.core.wildcard_QMARK_(term)){
return null;
} else {
if(datalog.core.lvar_QMARK_(term)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,term);
} else {
return term;

}
}
});
/**
 * Extend `binding` with `terms`'s variables against one matched `values`
 *   seq (same order/count as `terms`). Returns the extended binding, or nil
 *   if a variable bound earlier in this same clause conflicts with another
 *   position's value (e.g. `[?x :likes ?x]` against a row where s != o).
 *   Used for both triple clauses (`terms`/`values` are `[e a v]`/`[s p o]`)
 *   and rule invocations (`terms`/`values` are the invocation's args/a
 *   matched tuple in the rule's own param order).
 * 
 *   Walked by index rather than by `(map vector terms values)`. That form reads
 *   better and allocated a lazy seq plus one pair vector per TERM on every matched
 *   row -- four objects a row for a triple clause, on the hottest path here.
 *   Measured 2026-08-14 over 361,246 rows of the LDBC `hasCreator` clause shape,
 *   with both forms asserted to return equal bindings: 316.3 ns a row for the
 *   `map vector` form against 100.5 ns for this one.
 * 
 *   End to end that reaches a single-clause scan as about -12% and a three-clause
 *   LDBC join as -2% to -5%
 *   (kotobase-peer bench/results/2026-08-14-unify-indexed-landed.edn).
 * 
 *   `terms` is a clause vector for a triple and a rule invocation's arg seq for a
 *   rule, so neither is assumed indexed; a seq is converted once per call rather
 *   than once per term.
 */
datalog.core.unify_positional = (function datalog$core$unify_positional(binding,terms,values){
var tv = ((cljs.core.vector_QMARK_(terms))?terms:cljs.core.vec(terms));
var vv = ((cljs.core.vector_QMARK_(values))?values:cljs.core.vec(values));
var n = cljs.core.count(tv);
var i = (0);
var b = binding;
while(true){
if((((b == null)) || ((i === n)))){
return b;
} else {
var term = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(tv,i);
if(((datalog.core.wildcard_QMARK_(term)) || ((!(datalog.core.lvar_QMARK_(term)))))){
var G__9521 = (i + (1));
var G__9522 = b;
i = G__9521;
b = G__9522;
continue;
} else {
if(cljs.core.contains_QMARK_(b,term)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,term),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vv,i))){
var G__9523 = (i + (1));
var G__9524 = b;
i = G__9523;
b = G__9524;
continue;
} else {
return null;
}
} else {
var G__9525 = (i + (1));
var G__9526 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b,term,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vv,i));
i = G__9525;
b = G__9526;
continue;

}
}
}
break;
}
});
/**
 * `(not [e a v])` -- a `:where` element that isn't itself a triple pattern
 *   but a negation of one. Distinguished from a positive `[e a v]` clause by
 *   being a seq (list) headed by the symbol `not`, vs. a vector.
 */
datalog.core.not_clause_QMARK_ = (function datalog$core$not_clause_QMARK_(x){
return ((cljs.core.seq_QMARK_(x)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.first(x))));
});
datalog.core.negated_pattern = (function datalog$core$negated_pattern(not_clause){
return cljs.core.second(not_clause);
});
/**
 * Symbols that head a special-form clause (`not`/`or`/`or-join`) rather
 *   than a rule invocation -- `rule-invocation?` excludes all of these, not
 *   just `not` (a clause `(or ...)` is not an attempted call to a rule
 *   literally named `or`).
 */
datalog.core.reserved_clause_heads = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Symbol(null,"and","and",668631710,null),null,new cljs.core.Symbol(null,"not","not",1044554643,null),null,new cljs.core.Symbol(null,"or-join","or-join",591375469,null),null,new cljs.core.Symbol(null,"or","or",1876275696,null),null], null), null);
/**
 * `(rule-name ?arg ...)` -- a `:where`/rule-body element that's neither a
 *   triple-pattern vector nor a special-form clause (`not`/`or`/`or-join`),
 *   but an invocation of a name declared in `:rules`.
 */
datalog.core.rule_invocation_QMARK_ = (function datalog$core$rule_invocation_QMARK_(x){
return ((cljs.core.seq_QMARK_(x)) && ((((cljs.core.first(x) instanceof cljs.core.Symbol)) && ((!(cljs.core.contains_QMARK_(datalog.core.reserved_clause_heads,cljs.core.first(x))))))));
});
datalog.core.rule_name = (function datalog$core$rule_name(invocation){
return cljs.core.first(invocation);
});
datalog.core.rule_args = (function datalog$core$rule_args(invocation){
return cljs.core.vec(cljs.core.rest(invocation));
});
datalog.core.clause_lvars = (function datalog$core$clause_lvars(pattern){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(datalog.core.lvar_QMARK_),pattern);
});
/**
 * The WHITELISTED function registry predicate/function `:where` clauses
 *   may call (`[(fn-sym arg...)]` / `[(fn-sym arg...) result-var]`) --
 *   deliberately a fixed whitelist, not arbitrary code execution: a query is
 *   caller-supplied data in this codebase's threat model, same reasoning as
 *   `visible?`/rule invocations being data too, never `eval`'d source.
 */
datalog.core.query_fns = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,"upper-case","upper-case",1427515769,null),new cljs.core.Symbol(null,">=",">=",1016916022,null),new cljs.core.Symbol(null,"lower-case","lower-case",1428172944,null),new cljs.core.Symbol(null,"ends-with?","ends-with?",-346570208,null),new cljs.core.Symbol(null,">",">",1085014381,null),new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"/","/",-1371932971,null),new cljs.core.Symbol(null,"<=","<=",1244895369,null),new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"+","+",-740910886,null),new cljs.core.Symbol(null,"starts-with?","starts-with?",1014173927,null),new cljs.core.Symbol(null,"ground","ground",-1460862835,null),new cljs.core.Symbol(null,"*","*",345799209,null),new cljs.core.Symbol(null,"not=","not=",1466536204,null),new cljs.core.Symbol(null,"str","str",-1564826950,null),new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"-","-",-471816912,null),new cljs.core.Symbol(null,"includes?","includes?",-2049283381,null)],[clojure.string.upper_case,cljs.core._GT__EQ_,clojure.string.lower_case,clojure.string.ends_with_QMARK_,cljs.core._GT_,cljs.core.count,cljs.core._SLASH_,cljs.core._LT__EQ_,cljs.core._EQ_,cljs.core._PLUS_,clojure.string.starts_with_QMARK_,cljs.core.identity,cljs.core._STAR_,cljs.core.not_EQ_,cljs.core.str,cljs.core._LT_,cljs.core._,clojure.string.includes_QMARK_]);
/**
 * `[(fn-sym arg...)]` or `[(fn-sym arg...) result-var]` -- a `:where`
 *   element that's a VECTOR whose first element is itself a seq (the
 *   function-call form), distinguishing it from a plain `[e a v]` triple
 *   pattern (whose first element is never a seq).
 */
datalog.core.predicate_clause_QMARK_ = (function datalog$core$predicate_clause_QMARK_(x){
return ((cljs.core.vector_QMARK_(x)) && (cljs.core.seq_QMARK_(cljs.core.first(x))));
});
datalog.core.clause_fn_call = (function datalog$core$clause_fn_call(pred_clause){
return cljs.core.first(pred_clause);
});
datalog.core.clause_result_binding = (function datalog$core$clause_result_binding(pred_clause){
return cljs.core.second(pred_clause);
});
datalog.core.fn_call_sym = (function datalog$core$fn_call_sym(fn_call){
return cljs.core.first(fn_call);
});
datalog.core.fn_call_args = (function datalog$core$fn_call_args(fn_call){
return cljs.core.vec(cljs.core.rest(fn_call));
});
datalog.core.range_pred_ops = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Symbol(null,"<","<",993667236,null),"null",new cljs.core.Symbol(null,"<=","<=",1244895369,null),"null",new cljs.core.Symbol(null,">",">",1085014381,null),"null",new cljs.core.Symbol(null,">=",">=",1016916022,null),"null"], null), null);
/**
 * A fused value-interval clause produced by `fuse-value-ranges`.
 */
datalog.core.range_clause_QMARK_ = (function datalog$core$range_clause_QMARK_(x){
return ((cljs.core.map_QMARK_(x)) && (cljs.core.contains_QMARK_(x,new cljs.core.Keyword("range","a","range/a",-1678559649))));
});
/**
 * If `clause` is `[(op ?v ground)]` with a comparison op, describe it.
 */
datalog.core.range_pred_on = (function datalog$core$range_pred_on(clause){
if(((datalog.core.predicate_clause_QMARK_(clause)) && ((datalog.core.clause_result_binding(clause) == null)))){
var call = datalog.core.clause_fn_call(clause);
var op = datalog.core.fn_call_sym(call);
var args = datalog.core.fn_call_args(call);
if(((cljs.core.contains_QMARK_(datalog.core.range_pred_ops,op)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(args))) && (((datalog.core.lvar_QMARK_(cljs.core.first(args))) && ((((!(datalog.core.lvar_QMARK_(cljs.core.second(args))))) && ((!(datalog.core.wildcard_QMARK_(cljs.core.second(args))))))))))))){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),cljs.core.first(args),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"bound","bound",587617170),cljs.core.second(args)], null);
} else {
return null;
}
} else {
return null;
}
});
datalog.core.apply_range_op = (function datalog$core$apply_range_op(bounds,p__9321){
var map__9322 = p__9321;
var map__9322__$1 = cljs.core.__destructure_map(map__9322);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9322__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var bound = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9322__$1,new cljs.core.Keyword(null,"bound","bound",587617170));
var G__9323 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,">",">",1085014381,null),G__9323)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(bounds,new cljs.core.Keyword(null,"lo","lo",-931799889),bound,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"lo-open?","lo-open?",1169535129),true], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,">=",">=",1016916022,null),G__9323)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(bounds,new cljs.core.Keyword(null,"lo","lo",-931799889),bound,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"lo-open?","lo-open?",1169535129),false], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"<","<",993667236,null),G__9323)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(bounds,new cljs.core.Keyword(null,"hi","hi",-1821422114),bound,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hi-open?","hi-open?",-315123739),true], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"<=","<=",1244895369,null),G__9323)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(bounds,new cljs.core.Keyword(null,"hi","hi",-1821422114),bound,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hi-open?","hi-open?",-315123739),false], 0));
} else {
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__9323))));

}
}
}
}
});
/**
 * Rewrite `:where` so `[?e attr ?v]` plus later comparison predicates on
 *   `?v` become one range clause, and those predicates are dropped.
 * 
 *   Only fuses when `attr` is ground and the comparison's other argument is
 *   ground. Unfusable clauses pass through unchanged, so a query with no
 *   range predicates is byte-identical after this pass.
 */
datalog.core.fuse_value_ranges = (function datalog$core$fuse_value_ranges(where){
var where__$1 = cljs.core.vec(where);
var triples = cljs.core.vec(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,c){
if(((cljs.core.vector_QMARK_(c)) && ((((!(datalog.core.predicate_clause_QMARK_(c)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(c))))))){
var vec__9325 = c;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9325,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9325,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9325,(2),null);
if(((datalog.core.lvar_QMARK_(v)) && ((((!(datalog.core.lvar_QMARK_(a)))) && ((!(datalog.core.wildcard_QMARK_(a)))))))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"i","i",-1386841315),i,new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v","v",21465059),v], null);
} else {
return null;
}
} else {
return null;
}
}),where__$1));
var by_var = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,t){
if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"v","v",21465059).cljs$core$IFn$_invoke$arity$1(t))){
return m;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword(null,"v","v",21465059).cljs$core$IFn$_invoke$arity$1(t),t);
}
}),cljs.core.PersistentArrayMap.EMPTY,triples);
var pred_at = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,c){
var temp__5825__auto__ = datalog.core.range_pred_on(c);
if(cljs.core.truth_(temp__5825__auto__)){
var p = temp__5825__auto__;
var temp__5825__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(by_var,new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(p));
if(cljs.core.truth_(temp__5825__auto____$1)){
var t = temp__5825__auto____$1;
if((i > new cljs.core.Keyword(null,"i","i",-1386841315).cljs$core$IFn$_invoke$arity$1(t))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,p], null);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
}),where__$1));
if(cljs.core.empty_QMARK_(pred_at)){
return where__$1;
} else {
var preds_by_var = cljs.core.reduce_kv((function (m,_,p){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(m,new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(p),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),p);
}),cljs.core.PersistentArrayMap.EMPTY,pred_at);
var used_pred = cljs.core.set(cljs.core.keys(pred_at));
var fused_i = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p__9328){
var vec__9329 = p__9328;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9329,(0),null);
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9329,(1),null);
if(cljs.core.contains_QMARK_(preds_by_var,v)){
return new cljs.core.Keyword(null,"i","i",-1386841315).cljs$core$IFn$_invoke$arity$1(t);
} else {
return null;
}
}),by_var));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$1((function (i,c){
if(cljs.core.contains_QMARK_(used_pred,i)){
return null;
} else {
if(cljs.core.contains_QMARK_(fused_i,i)){
var t = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__9324_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,new cljs.core.Keyword(null,"i","i",-1386841315).cljs$core$IFn$_invoke$arity$1(p1__9324_SHARP_));
}),triples));
var bounds = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(datalog.core.apply_range_op,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"lo","lo",-931799889),null,new cljs.core.Keyword(null,"hi","hi",-1821422114),null,new cljs.core.Keyword(null,"lo-open?","lo-open?",1169535129),false,new cljs.core.Keyword(null,"hi-open?","hi-open?",-315123739),true], null),cljs.core.get.cljs$core$IFn$_invoke$arity$2(preds_by_var,new cljs.core.Keyword(null,"v","v",21465059).cljs$core$IFn$_invoke$arity$1(t)));
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("range","e","range/e",750827019),new cljs.core.Keyword(null,"e","e",1381269198).cljs$core$IFn$_invoke$arity$1(t),new cljs.core.Keyword("range","a","range/a",-1678559649),new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(t),new cljs.core.Keyword("range","v","range/v",-136070498),new cljs.core.Keyword(null,"v","v",21465059).cljs$core$IFn$_invoke$arity$1(t),new cljs.core.Keyword("range","lo","range/lo",-891181714),new cljs.core.Keyword(null,"lo","lo",-931799889).cljs$core$IFn$_invoke$arity$1(bounds),new cljs.core.Keyword("range","hi","range/hi",-1915021615),new cljs.core.Keyword(null,"hi","hi",-1821422114).cljs$core$IFn$_invoke$arity$1(bounds),new cljs.core.Keyword("range","lo-open?","range/lo-open?",1209690974),new cljs.core.Keyword(null,"lo-open?","lo-open?",1169535129).cljs$core$IFn$_invoke$arity$1(bounds),new cljs.core.Keyword("range","hi-open?","range/hi-open?",-466268518),new cljs.core.Keyword(null,"hi-open?","hi-open?",-315123739).cljs$core$IFn$_invoke$arity$1(bounds)], null);
} else {
return c;

}
}
})),where__$1);
}
});
datalog.core.eval_fn_call = (function datalog$core$eval_fn_call(binding,fn_call){
var fsym = datalog.core.fn_call_sym(fn_call);
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(datalog.core.query_fns,fsym);
if(cljs.core.truth_(f)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown or disallowed function in query clause -- see query-fns for the whitelist",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fn","fn",-1175266204),fsym], null));
}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__9332_SHARP_){
return datalog.core.substitute(p1__9332_SHARP_,binding);
}),datalog.core.fn_call_args(fn_call)));
});
/**
 * A multi-clause branch inside `or`/`or-join`, written the way Datomic writes
 *   it: `(and [?e :a 1] [?e :b 2])`.
 * 
 *   A branch used to be one clause, which meant a branch could not both BIND a
 *   variable and CONSTRAIN it -- so `(or-join [?e] (and [?e :age ?a] [(> ?a 18)]))`
 *   was inexpressible and every comparison inside a disjunction had to be
 *   refused. `and` is the form that makes a branch a conjunction; it is only
 *   meaningful inside `or`/`or-join`, where a branch position exists.
 */
datalog.core.and_clause_QMARK_ = (function datalog$core$and_clause_QMARK_(x){
return ((cljs.core.seq_QMARK_(x)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.first(x))));
});
datalog.core.and_clauses = (function datalog$core$and_clauses(x){
return cljs.core.vec(cljs.core.rest(x));
});
datalog.core.or_clause_QMARK_ = (function datalog$core$or_clause_QMARK_(x){
return ((cljs.core.seq_QMARK_(x)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.first(x))));
});
datalog.core.or_branches = (function datalog$core$or_branches(x){
return cljs.core.vec(cljs.core.rest(x));
});
datalog.core.or_join_clause_QMARK_ = (function datalog$core$or_join_clause_QMARK_(x){
return ((cljs.core.seq_QMARK_(x)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"or-join","or-join",591375469,null),cljs.core.first(x))));
});
datalog.core.or_join_vars = (function datalog$core$or_join_vars(x){
return cljs.core.vec(cljs.core.second(x));
});
datalog.core.or_join_branches = (function datalog$core$or_join_branches(x){
return cljs.core.vec(cljs.core.rest(cljs.core.rest(x)));
});
/**
 * Static pass over a `:where` vector or a rule body, in order (optionally
 *   seeded with `initial-bound`, used to check an `or`/`or-join` branch
 *   against whatever's already bound OUTSIDE it): every lvar inside a
 *   `(not [e a v])` clause, or every ARG lvar inside a predicate/function
 *   clause, must already have been bound by an earlier POSITIVE clause (a
 *   plain triple, a rule invocation, or a function clause's own result
 *   binding -- all bind the same way). Throws on the first violation
 *   instead of running an unsafe (unboundedly enumerable) negation/
 *   function-call, or if a `not`'s negated form isn't a plain triple
 *   pattern at all (negating a rule invocation isn't supported -- see ns
 *   docstring). `not`/predicate clauses never contribute new bindings; a
 *   function clause's `result-var` does. `or` checks every branch against
 *   the SAME outer `bound-so-far` (branches are alternatives, not
 *   sequential) and does not itself extend `bound-so-far` (branches aren't
 *   required to bind the same variables); `or-join` additionally makes its
 *   declared shared-vars available afterward.
 */
datalog.core.check_clause_safety_BANG_ = (function datalog$core$check_clause_safety_BANG_(var_args){
var G__9334 = arguments.length;
switch (G__9334) {
case 1:
return datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (clauses){
return datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(clauses,cljs.core.PersistentHashSet.EMPTY);
}));

(datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (clauses,initial_bound){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bound_so_far,clause){
if(datalog.core.not_clause_QMARK_(clause)){
var pattern = datalog.core.negated_pattern(clause);
if(cljs.core.vector_QMARK_(pattern)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: negation of a rule invocation is not supported -- only (not [e a v]) triple patterns",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clause","clause",1479668060),clause], null));
}

var unbound = clojure.set.difference.cljs$core$IFn$_invoke$arity$2(datalog.core.clause_lvars(pattern),bound_so_far);
if(cljs.core.seq(unbound)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unsafe negation -- variable(s) not bound by an earlier positive clause",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"clause","clause",1479668060),clause,new cljs.core.Keyword(null,"unbound","unbound",-1366326654),unbound], null));
} else {
}

return bound_so_far;
} else {
if(datalog.core.predicate_clause_QMARK_(clause)){
var fn_call = datalog.core.clause_fn_call(clause);
var result_binding = datalog.core.clause_result_binding(clause);
var unbound = clojure.set.difference.cljs$core$IFn$_invoke$arity$2(datalog.core.clause_lvars(datalog.core.fn_call_args(fn_call)),bound_so_far);
if(cljs.core.contains_QMARK_(datalog.core.query_fns,datalog.core.fn_call_sym(fn_call))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown or disallowed function in query clause -- see query-fns for the whitelist",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fn","fn",-1175266204),datalog.core.fn_call_sym(fn_call),new cljs.core.Keyword(null,"clause","clause",1479668060),clause], null));
}

if(cljs.core.seq(unbound)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unsafe function/predicate clause -- variable(s) not bound by an earlier clause",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"clause","clause",1479668060),clause,new cljs.core.Keyword(null,"unbound","unbound",-1366326654),unbound], null));
} else {
}

if(datalog.core.lvar_QMARK_(result_binding)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bound_so_far,result_binding);
} else {
return bound_so_far;
}
} else {
if(datalog.core.or_clause_QMARK_(clause)){
var seq__9335_9528 = cljs.core.seq(datalog.core.or_branches(clause));
var chunk__9336_9529 = null;
var count__9337_9530 = (0);
var i__9338_9531 = (0);
while(true){
if((i__9338_9531 < count__9337_9530)){
var branch_9532 = chunk__9336_9529.cljs$core$IIndexed$_nth$arity$2(null,i__9338_9531);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_9532))?datalog.core.and_clauses(branch_9532):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_9532], null)),bound_so_far);


var G__9533 = seq__9335_9528;
var G__9534 = chunk__9336_9529;
var G__9535 = count__9337_9530;
var G__9536 = (i__9338_9531 + (1));
seq__9335_9528 = G__9533;
chunk__9336_9529 = G__9534;
count__9337_9530 = G__9535;
i__9338_9531 = G__9536;
continue;
} else {
var temp__5825__auto___9537 = cljs.core.seq(seq__9335_9528);
if(temp__5825__auto___9537){
var seq__9335_9538__$1 = temp__5825__auto___9537;
if(cljs.core.chunked_seq_QMARK_(seq__9335_9538__$1)){
var c__5694__auto___9539 = cljs.core.chunk_first(seq__9335_9538__$1);
var G__9540 = cljs.core.chunk_rest(seq__9335_9538__$1);
var G__9541 = c__5694__auto___9539;
var G__9542 = cljs.core.count(c__5694__auto___9539);
var G__9543 = (0);
seq__9335_9528 = G__9540;
chunk__9336_9529 = G__9541;
count__9337_9530 = G__9542;
i__9338_9531 = G__9543;
continue;
} else {
var branch_9544 = cljs.core.first(seq__9335_9538__$1);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_9544))?datalog.core.and_clauses(branch_9544):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_9544], null)),bound_so_far);


var G__9545 = cljs.core.next(seq__9335_9538__$1);
var G__9546 = null;
var G__9547 = (0);
var G__9548 = (0);
seq__9335_9528 = G__9545;
chunk__9336_9529 = G__9546;
count__9337_9530 = G__9547;
i__9338_9531 = G__9548;
continue;
}
} else {
}
}
break;
}

return bound_so_far;
} else {
if(datalog.core.or_join_clause_QMARK_(clause)){
var seq__9339_9549 = cljs.core.seq(datalog.core.or_join_branches(clause));
var chunk__9340_9550 = null;
var count__9341_9551 = (0);
var i__9342_9552 = (0);
while(true){
if((i__9342_9552 < count__9341_9551)){
var branch_9553 = chunk__9340_9550.cljs$core$IIndexed$_nth$arity$2(null,i__9342_9552);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_9553))?datalog.core.and_clauses(branch_9553):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_9553], null)),bound_so_far);


var G__9554 = seq__9339_9549;
var G__9555 = chunk__9340_9550;
var G__9556 = count__9341_9551;
var G__9557 = (i__9342_9552 + (1));
seq__9339_9549 = G__9554;
chunk__9340_9550 = G__9555;
count__9341_9551 = G__9556;
i__9342_9552 = G__9557;
continue;
} else {
var temp__5825__auto___9558 = cljs.core.seq(seq__9339_9549);
if(temp__5825__auto___9558){
var seq__9339_9559__$1 = temp__5825__auto___9558;
if(cljs.core.chunked_seq_QMARK_(seq__9339_9559__$1)){
var c__5694__auto___9560 = cljs.core.chunk_first(seq__9339_9559__$1);
var G__9561 = cljs.core.chunk_rest(seq__9339_9559__$1);
var G__9562 = c__5694__auto___9560;
var G__9563 = cljs.core.count(c__5694__auto___9560);
var G__9564 = (0);
seq__9339_9549 = G__9561;
chunk__9340_9550 = G__9562;
count__9341_9551 = G__9563;
i__9342_9552 = G__9564;
continue;
} else {
var branch_9565 = cljs.core.first(seq__9339_9559__$1);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_9565))?datalog.core.and_clauses(branch_9565):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_9565], null)),bound_so_far);


var G__9566 = cljs.core.next(seq__9339_9559__$1);
var G__9567 = null;
var G__9568 = (0);
var G__9569 = (0);
seq__9339_9549 = G__9566;
chunk__9340_9550 = G__9567;
count__9341_9551 = G__9568;
i__9342_9552 = G__9569;
continue;
}
} else {
}
}
break;
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(bound_so_far,datalog.core.or_join_vars(clause));
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(bound_so_far,datalog.core.clause_lvars(clause));

}
}
}
}
}),initial_bound,clauses);
}));

(datalog.core.check_clause_safety_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * Prefer ONE broad scan plus an in-memory hash join over N keyed scans when
 *   the clause's whole relation is no larger than this multiple of N.
 * 
 *   Both sides of that comparison are real costs. A keyed scan is cheap per row
 *   but has a fixed cost per call -- and over `datom.source/IPatternSource` it
 *   may be a network round trip -- so N of them is N fixed costs. A broad scan
 *   is one fixed cost and `card` rows. Below the budget the single scan wins.
 * 
 *   4 is where the measured workload sits on either side without being near the
 *   line (kotobase-peer bench/results/2026-08-01-ic09-diagnosis.edn, LDBC SNB
 *   SF1 subset): `[?msg "hasCreator" ?f2]` is 7,355 rows against <=9,892
 *   distinct keys, so it hashes; `[?f1 "knows" ?f2]` is 361,246 rows against
 *   882 keys, so it does not -- and it must not, because that broad scan takes
 *   a second on its own. A starting point chosen to put those two on opposite
 *   sides, not a tuned constant.
 */
datalog.core.hash_join_row_budget = (4);
/**
 * The clause with every variable and wildcard nil -- its literal constants
 *   only. Every substituted pattern for this clause is a specialization of it,
 *   so one scan of this returns a superset of what all of them would.
 */
datalog.core.broad_pattern = (function datalog$core$broad_pattern(clause){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (t){
if(((datalog.core.lvar_QMARK_(t)) || (datalog.core.wildcard_QMARK_(t)))){
return null;
} else {
return t;
}
}),clause);
});
/**
 * Indices where a substituted pattern pinned a value the broad pattern left
 *   open -- the columns a hash index for this pattern has to be keyed on.
 */
datalog.core.bound_positions = (function datalog$core$bound_positions(pattern,clause){
var broad = datalog.core.broad_pattern(clause);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$1((function (i,v){
if((((!((v == null)))) && ((cljs.core.nth.cljs$core$IFn$_invoke$arity$2(broad,i) == null)))){
return i;
} else {
return null;
}
})),pattern);
});
/**
 * One broad scan, indexed by whichever columns the substituted patterns
 *   pinned, then a lookup per distinct pattern. Groups whose patterns pin
 *   DIFFERENT columns each get their own index -- that only happens when
 *   bindings reaching this clause carry different variables (an `or` branch,
 *   say), and it stays correct rather than needing to be excluded.
 */
datalog.core.hash_join_rows = (function datalog$core$hash_join_rows(groups,clause,db,visible_QMARK_){
var rows = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (q){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(q),new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(q),new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(q)], null);
})),datalog.core.scan_STAR_(db,datalog.core.broad_pattern(clause),visible_QMARK_));
var indexes = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (positions){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [positions,cljs.core.group_by((function (r){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9343_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(r,p1__9343_SHARP_);
}),positions);
}),rows)], null);
})),cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__9346){
var vec__9347 = p__9346;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9347,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9347,(1),null);
return datalog.core.bound_positions(pattern,clause);
}),groups)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__9350){
var vec__9351 = p__9350;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9351,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9351,(1),null);
var positions = datalog.core.bound_positions(pattern,clause);
var key = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9344_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(pattern,p1__9344_SHARP_);
}),positions);
var matched = ((cljs.core.seq(positions))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(indexes,positions),key):rows);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__9345_SHARP_){
return datalog.core.unify_positional(binding,clause,p1__9345_SHARP_);
}),matched);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([group], 0));
})),groups);
});
/**
 * One `or`/`or-join` branch against `bindings`: a conjunction when it is
 *   `(and ...)`, a single clause otherwise. Threading the bindings through the
 *   conjunction is what lets a branch bind a variable in one clause and constrain
 *   it in the next.
 */
datalog.core.join_branch = (function datalog$core$join_branch(bindings,branch,db,visible_QMARK_,extension_for,cardinality){
if(datalog.core.and_clause_QMARK_(branch)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bs,c){
return (datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6 ? datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6(bs,c,db,visible_QMARK_,extension_for,cardinality) : datalog.core.join_clause.call(null,bs,c,db,visible_QMARK_,extension_for,cardinality));
}),bindings,datalog.core.and_clauses(branch));
} else {
return (datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6 ? datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6(bindings,branch,db,visible_QMARK_,extension_for,cardinality) : datalog.core.join_clause.call(null,bindings,branch,db,visible_QMARK_,extension_for,cardinality));
}
});
/**
 * One step of the join: for every binding so far,
 *   - `(not [e a v])`: drop the binding iff the fully-substituted pattern
 *  has ANY `visible?`-filtered match against `db` -- keep it otherwise.
 *   - `(rule-name ?arg ...)`: resolve against `(extension-for rule-name)`
 *  (a set of tuples in that rule's own param order, supplied by the
 *  fixpoint driver or, for a rule-free query, `q` itself) exactly like a
 *  triple clause resolves against `db`.
 *   - `[(fn-sym arg...)]`: keep the binding iff the (whitelisted, see
 *  `query-fns`) function call returns truthy -- a predicate, binds
 *  nothing new.
 *   - `[(fn-sym arg...) result-var]`: compute the function call and unify
 *  `result-var` against it -- a function clause, binds `result-var`.
 *   - `(or clause1 clause2 ...)`: union of resolving EACH branch against
 *  the current bindings independently (an alternative/OR derivation,
 *  not a conjunction).
 *   - `(or-join [?shared...] clause1 clause2 ...)`: like `or`, but only
 *  `?shared` propagates back out of each branch (see `or-join-step`) --
 *  branches may use their own internal variable names for everything
 *  else.
 *   - `[e a v]`: resolve against `db` via `datalog.query/query`.
 *   Triple and negation cases query through the same `visible?`-filtered
 *   `datalog.query/query`, so a negation can never observe a fact
 *   `visible?` would hide (see the ns docstring).
 */
datalog.core.join_clause = (function datalog$core$join_clause(var_args){
var G__9362 = arguments.length;
switch (G__9362) {
case 5:
return datalog.core.join_clause.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datalog.core.join_clause.cljs$core$IFn$_invoke$arity$5 = (function (bindings,clause,db,visible_QMARK_,extension_for){
return datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6(bindings,clause,db,visible_QMARK_,extension_for,null);
}));

(datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6 = (function (bindings,clause,db,visible_QMARK_,extension_for,cardinality){
if(datalog.core.not_clause_QMARK_(clause)){
var pattern = datalog.core.negated_pattern(clause);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1((function (binding){
return cljs.core.seq(datalog.core.scan_STAR_(db,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9354_SHARP_){
return datalog.core.substitute(p1__9354_SHARP_,binding);
}),pattern),visible_QMARK_));
})),bindings);
} else {
if(datalog.core.rule_invocation_QMARK_(clause)){
var args = datalog.core.rule_args(clause);
var extension = (function (){var G__9363 = datalog.core.rule_name(clause);
return (extension_for.cljs$core$IFn$_invoke$arity$1 ? extension_for.cljs$core$IFn$_invoke$arity$1(G__9363) : extension_for.call(null,G__9363));
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (binding){
var substituted = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9355_SHARP_){
return datalog.core.substitute(p1__9355_SHARP_,binding);
}),args);
var matches_QMARK_ = (function (tuple){
return cljs.core.every_QMARK_(cljs.core.true_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (want,got){
return (((want == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(want,got)));
}),substituted,tuple));
});
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__9356_SHARP_){
return datalog.core.unify_positional(binding,args,p1__9356_SHARP_);
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(matches_QMARK_,extension));
})),bindings);
} else {
if(datalog.core.predicate_clause_QMARK_(clause)){
var fn_call = datalog.core.clause_fn_call(clause);
var result_binding = datalog.core.clause_result_binding(clause);
if(cljs.core.truth_(result_binding)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$1((function (binding){
return datalog.core.unify_positional(binding,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [result_binding], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [datalog.core.eval_fn_call(binding,fn_call)], null));
})),bindings);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (binding){
return datalog.core.eval_fn_call(binding,fn_call);
})),bindings);
}
} else {
if(datalog.core.or_clause_QMARK_(clause)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (branch){
return datalog.core.join_branch(bindings,branch,db,visible_QMARK_,extension_for,cardinality);
})),datalog.core.or_branches(clause));
} else {
if(datalog.core.or_join_clause_QMARK_(clause)){
var shared_vars = cljs.core.set(datalog.core.or_join_vars(clause));
var branches = datalog.core.or_join_branches(clause);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (binding){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (branch){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (extended){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (b,v){
if(cljs.core.contains_QMARK_(extended,v)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b,v,cljs.core.get.cljs$core$IFn$_invoke$arity$2(extended,v));
} else {
return b;
}
}),binding,shared_vars);
})),datalog.core.join_branch(cljs.core.PersistentHashSet.createAsIfByAssoc([binding]),branch,db,visible_QMARK_,extension_for,cardinality));
})),branches);
})),bindings);
} else {
if(datalog.core.range_clause_QMARK_(clause)){
var groups = cljs.core.group_by((function (binding){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"a","a",-2123407586),datalog.core.substitute(new cljs.core.Keyword("range","a","range/a",-1678559649).cljs$core$IFn$_invoke$arity$1(clause),binding),new cljs.core.Keyword(null,"lo","lo",-931799889),datalog.core.substitute(new cljs.core.Keyword("range","lo","range/lo",-891181714).cljs$core$IFn$_invoke$arity$1(clause),binding),new cljs.core.Keyword(null,"hi","hi",-1821422114),datalog.core.substitute(new cljs.core.Keyword("range","hi","range/hi",-1915021615).cljs$core$IFn$_invoke$arity$1(clause),binding),new cljs.core.Keyword(null,"e","e",1381269198),datalog.core.substitute(new cljs.core.Keyword("range","e","range/e",750827019).cljs$core$IFn$_invoke$arity$1(clause),binding)], null);
}),bindings);
var terms = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("range","e","range/e",750827019).cljs$core$IFn$_invoke$arity$1(clause),new cljs.core.Keyword("range","a","range/a",-1678559649).cljs$core$IFn$_invoke$arity$1(clause),new cljs.core.Keyword("range","v","range/v",-136070498).cljs$core$IFn$_invoke$arity$1(clause)], null);
var opts = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lo-open?","lo-open?",1169535129),new cljs.core.Keyword("range","lo-open?","range/lo-open?",1209690974).cljs$core$IFn$_invoke$arity$1(clause),new cljs.core.Keyword(null,"hi-open?","hi-open?",-315123739),new cljs.core.Keyword("range","hi-open?","range/hi-open?",-466268518).cljs$core$IFn$_invoke$arity$1(clause)], null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__9364){
var vec__9365 = p__9364;
var map__9368 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9365,(0),null);
var map__9368__$1 = cljs.core.__destructure_map(map__9368);
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9368__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var lo = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9368__$1,new cljs.core.Keyword(null,"lo","lo",-931799889));
var hi = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9368__$1,new cljs.core.Keyword(null,"hi","hi",-1821422114));
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9368__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9365,(1),null);
var rows = (function (){var G__9369 = datalog.core.scan_range_STAR_(db,a,lo,hi,opts,visible_QMARK_);
if((!((e == null)))){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__9357_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(p1__9357_SHARP_));
}),G__9369);
} else {
return G__9369;
}
})();
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__9358_SHARP_){
return datalog.core.unify_positional(binding,terms,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(p1__9358_SHARP_),new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(p1__9358_SHARP_),new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(p1__9358_SHARP_)], null));
}),rows);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([group], 0));
})),groups);
} else {
var groups = cljs.core.group_by((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9359_SHARP_){
return datalog.core.substitute(p1__9359_SHARP_,binding);
}),clause);
}),bindings);
var card = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cardinality,clause);
if(cljs.core.truth_((function (){var and__5160__auto__ = card;
if(cljs.core.truth_(and__5160__auto__)){
return (card <= (datalog.core.hash_join_row_budget * cljs.core.count(groups)));
} else {
return and__5160__auto__;
}
})())){
return datalog.core.hash_join_rows(groups,clause,db,visible_QMARK_);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__9370){
var vec__9371 = p__9370;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9371,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9371,(1),null);
var rows = datalog.core.scan_STAR_(db,pattern,visible_QMARK_);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__9360_SHARP_){
return datalog.core.unify_positional(binding,clause,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(p1__9360_SHARP_),new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(p1__9360_SHARP_),new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(p1__9360_SHARP_)], null));
}),rows);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([group], 0));
})),groups);
}

}
}
}
}
}
}
}));

(datalog.core.join_clause.cljs$lang$maxFixedArity = 6);

/**
 * `:rules` (`[[(rule-name ?a ?b) clause ...] ...]`) -> `{rule-name
 *   [{:params [?a ?b] :body [clause ...]} ...]}` -- a rule name maps to
 *   EVERY definition given for it (multiple definitions = alternative/OR
 *   derivations, e.g. a recursive rule's base case + inductive case).
 *   Validates every definition of the same name declares the same param
 *   COUNT (arity) -- Datomic itself requires this, and it's what lets a
 *   `:where`/body invocation be checked without knowing which definition
 *   will end up firing.
 */
datalog.core.parse_rules = (function datalog$core$parse_rules(rules){
var grouped = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__9374){
var vec__9375 = p__9374;
var seq__9376 = cljs.core.seq(vec__9375);
var first__9377 = cljs.core.first(seq__9376);
var seq__9376__$1 = cljs.core.next(seq__9376);
var vec__9378 = first__9377;
var seq__9379 = cljs.core.seq(vec__9378);
var first__9380 = cljs.core.first(seq__9379);
var seq__9379__$1 = cljs.core.next(seq__9379);
var rname = first__9380;
var params = seq__9379__$1;
var body = seq__9376__$1;
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,rname,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"params","params",710516235),cljs.core.vec(params),new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.vec(body)], null));
}),cljs.core.PersistentArrayMap.EMPTY,rules);
var seq__9381_9571 = cljs.core.seq(grouped);
var chunk__9382_9572 = null;
var count__9383_9573 = (0);
var i__9384_9574 = (0);
while(true){
if((i__9384_9574 < count__9383_9573)){
var vec__9391_9575 = chunk__9382_9572.cljs$core$IIndexed$_nth$arity$2(null,i__9384_9574);
var rname_9576 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9391_9575,(0),null);
var defs_9577 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9391_9575,(1),null);
var arities_9578 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,new cljs.core.Keyword(null,"params","params",710516235))),defs_9577);
if((cljs.core.count(arities_9578) > (1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule definitions for the same name must all declare the same arity",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_9576,new cljs.core.Keyword(null,"arities","arities",-1781122917),arities_9578], null));
} else {
}


var G__9579 = seq__9381_9571;
var G__9580 = chunk__9382_9572;
var G__9581 = count__9383_9573;
var G__9582 = (i__9384_9574 + (1));
seq__9381_9571 = G__9579;
chunk__9382_9572 = G__9580;
count__9383_9573 = G__9581;
i__9384_9574 = G__9582;
continue;
} else {
var temp__5825__auto___9583 = cljs.core.seq(seq__9381_9571);
if(temp__5825__auto___9583){
var seq__9381_9584__$1 = temp__5825__auto___9583;
if(cljs.core.chunked_seq_QMARK_(seq__9381_9584__$1)){
var c__5694__auto___9585 = cljs.core.chunk_first(seq__9381_9584__$1);
var G__9586 = cljs.core.chunk_rest(seq__9381_9584__$1);
var G__9587 = c__5694__auto___9585;
var G__9588 = cljs.core.count(c__5694__auto___9585);
var G__9589 = (0);
seq__9381_9571 = G__9586;
chunk__9382_9572 = G__9587;
count__9383_9573 = G__9588;
i__9384_9574 = G__9589;
continue;
} else {
var vec__9394_9590 = cljs.core.first(seq__9381_9584__$1);
var rname_9591 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9394_9590,(0),null);
var defs_9592 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9394_9590,(1),null);
var arities_9593 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,new cljs.core.Keyword(null,"params","params",710516235))),defs_9592);
if((cljs.core.count(arities_9593) > (1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule definitions for the same name must all declare the same arity",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_9591,new cljs.core.Keyword(null,"arities","arities",-1781122917),arities_9593], null));
} else {
}


var G__9594 = cljs.core.next(seq__9381_9584__$1);
var G__9595 = null;
var G__9596 = (0);
var G__9597 = (0);
seq__9381_9571 = G__9594;
chunk__9382_9572 = G__9595;
count__9383_9573 = G__9596;
i__9384_9574 = G__9597;
continue;
}
} else {
}
}
break;
}

return grouped;
});
/**
 * Static pass: every `(rule-name ...)` invocation anywhere in `:where` or
 *   any rule body must name a rule actually defined in `:rules` -- throws
 *   immediately instead of silently joining against an empty extension.
 */
datalog.core.check_unknown_rules_BANG_ = (function datalog$core$check_unknown_rules_BANG_(clauses,parsed_rules){
var seq__9397 = cljs.core.seq(clauses);
var chunk__9399 = null;
var count__9400 = (0);
var i__9401 = (0);
while(true){
if((i__9401 < count__9400)){
var clause = chunk__9399.cljs$core$IIndexed$_nth$arity$2(null,i__9401);
if(datalog.core.rule_invocation_QMARK_(clause)){
var rname_9598 = datalog.core.rule_name(clause);
if(cljs.core.contains_QMARK_(parsed_rules,rname_9598)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown rule invoked -- not defined in :rules",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_9598], null));
}

var map__9405_9599 = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed_rules,rname_9598));
var map__9405_9600__$1 = cljs.core.__destructure_map(map__9405_9599);
var params_9601 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9405_9600__$1,new cljs.core.Keyword(null,"params","params",710516235));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(params_9601),cljs.core.count(datalog.core.rule_args(clause)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule invoked with the wrong number of arguments",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_9598,new cljs.core.Keyword(null,"expected","expected",1583670997),cljs.core.count(params_9601),new cljs.core.Keyword(null,"got","got",-1674745710),cljs.core.count(datalog.core.rule_args(clause))], null));
} else {
}


var G__9602 = seq__9397;
var G__9603 = chunk__9399;
var G__9604 = count__9400;
var G__9605 = (i__9401 + (1));
seq__9397 = G__9602;
chunk__9399 = G__9603;
count__9400 = G__9604;
i__9401 = G__9605;
continue;
} else {
var G__9606 = seq__9397;
var G__9607 = chunk__9399;
var G__9608 = count__9400;
var G__9609 = (i__9401 + (1));
seq__9397 = G__9606;
chunk__9399 = G__9607;
count__9400 = G__9608;
i__9401 = G__9609;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__9397);
if(temp__5825__auto__){
var seq__9397__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__9397__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__9397__$1);
var G__9610 = cljs.core.chunk_rest(seq__9397__$1);
var G__9611 = c__5694__auto__;
var G__9612 = cljs.core.count(c__5694__auto__);
var G__9613 = (0);
seq__9397 = G__9610;
chunk__9399 = G__9611;
count__9400 = G__9612;
i__9401 = G__9613;
continue;
} else {
var clause = cljs.core.first(seq__9397__$1);
if(datalog.core.rule_invocation_QMARK_(clause)){
var rname_9614 = datalog.core.rule_name(clause);
if(cljs.core.contains_QMARK_(parsed_rules,rname_9614)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown rule invoked -- not defined in :rules",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_9614], null));
}

var map__9406_9615 = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed_rules,rname_9614));
var map__9406_9616__$1 = cljs.core.__destructure_map(map__9406_9615);
var params_9617 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9406_9616__$1,new cljs.core.Keyword(null,"params","params",710516235));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(params_9617),cljs.core.count(datalog.core.rule_args(clause)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule invoked with the wrong number of arguments",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_9614,new cljs.core.Keyword(null,"expected","expected",1583670997),cljs.core.count(params_9617),new cljs.core.Keyword(null,"got","got",-1674745710),cljs.core.count(datalog.core.rule_args(clause))], null));
} else {
}


var G__9618 = cljs.core.next(seq__9397__$1);
var G__9619 = null;
var G__9620 = (0);
var G__9621 = (0);
seq__9397 = G__9618;
chunk__9399 = G__9619;
count__9400 = G__9620;
i__9401 = G__9621;
continue;
} else {
var G__9622 = cljs.core.next(seq__9397__$1);
var G__9623 = null;
var G__9624 = (0);
var G__9625 = (0);
seq__9397 = G__9622;
chunk__9399 = G__9623;
count__9400 = G__9624;
i__9401 = G__9625;
continue;
}
}
} else {
return null;
}
}
break;
}
});
/**
 * Evaluate `body` (a conjunction of clauses) against `db`, where the
 *   rule-invocation clause at index `delta-idx` (if any) resolves against
 *   `delta-map`, and every OTHER rule-invocation clause resolves against
 *   `full-map` -- the semi-naive rewriting: one variant per rule-invocation
 *   position, so a round only re-derives combinations touching at least one
 *   tuple newly discovered LAST round, never recomputing purely-old ones.
 */
datalog.core.eval_body_variant = (function datalog$core$eval_body_variant(db,visible_QMARK_,body,full_map,delta_map,delta_idx){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bindings,p__9407){
var vec__9408 = p__9407;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9408,(0),null);
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9408,(1),null);
return datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6(bindings,clause,db,visible_QMARK_,(function (rname){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,delta_idx)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(delta_map,rname,cljs.core.PersistentHashSet.EMPTY);
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(full_map,rname,cljs.core.PersistentHashSet.EMPTY);
}
}),null);
}),cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.PersistentArrayMap.EMPTY]),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,body));
});
datalog.core.project_params = (function datalog$core$project_params(bindings,params){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9411_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__9411_SHARP_);
}),params);
})),bindings);
});
datalog.core.rule_invocation_indices = (function datalog$core$rule_invocation_indices(body){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$1((function (i,clause){
if(datalog.core.rule_invocation_QMARK_(clause)){
return i;
} else {
return null;
}
})),body);
});
/**
 * Defensive cap, not a tuning knob: derivation is monotonic over `db`'s
 *   finite domain, so a correct fixpoint always converges long before this.
 *   Existing only to fail loudly (not hang) if it somehow doesn't.
 */
datalog.core.max_fixpoint_iterations = (10000);
/**
 * Semi-naive least fixpoint over every rule in `parsed-rules`. Returns
 *   `{rule-name #{tuple ...}}`, each tuple in that rule's own param order --
 *   ready to hand to `join-clause`'s `extension-for` for the top-level
 *   `:where` (or a caller evaluating one rule body against another's
 *   results, though this landing only nests rules through `:where`/bodies,
 *   never re-enters `fixpoint` itself).
 */
datalog.core.fixpoint = (function datalog$core$fixpoint(db,visible_QMARK_,parsed_rules){
var seed = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__9412){
var vec__9413 = p__9412;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9413,(0),null);
var defs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9413,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,rname,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__9416){
var map__9417 = p__9416;
var map__9417__$1 = cljs.core.__destructure_map(map__9417);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9417__$1,new cljs.core.Keyword(null,"params","params",710516235));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9417__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
return datalog.core.project_params(datalog.core.eval_body_variant(db,visible_QMARK_,body,cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,(-1)),params);
})),defs));
}),cljs.core.PersistentArrayMap.EMPTY,parsed_rules);
var full = seed;
var delta = seed;
var iterations = (0);
while(true){
if((iterations > datalog.core.max_fixpoint_iterations)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: fixpoint did not converge within the iteration cap",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"iterations","iterations",-1402710890),iterations], null));
} else {
}

if(cljs.core.every_QMARK_(cljs.core.empty_QMARK_,cljs.core.vals(delta))){
return full;
} else {
var candidates = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (full,delta,iterations,seed){
return (function (acc,p__9428){
var vec__9429 = p__9428;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9429,(0),null);
var defs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9429,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,rname,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(((function (full,delta,iterations,vec__9429,rname,defs,seed){
return (function (p__9432){
var map__9433 = p__9432;
var map__9433__$1 = cljs.core.__destructure_map(map__9433);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9433__$1,new cljs.core.Keyword(null,"params","params",710516235));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9433__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var idxs = datalog.core.rule_invocation_indices(body);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (full,delta,iterations,idxs,map__9433,map__9433__$1,params,body,vec__9429,rname,defs,seed){
return (function (delta_idx){
return datalog.core.project_params(datalog.core.eval_body_variant(db,visible_QMARK_,body,full,delta,delta_idx),params);
});})(full,delta,iterations,idxs,map__9433,map__9433__$1,params,body,vec__9429,rname,defs,seed))
,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([idxs], 0));
});})(full,delta,iterations,vec__9429,rname,defs,seed))
),defs));
});})(full,delta,iterations,seed))
,cljs.core.PersistentArrayMap.EMPTY,parsed_rules);
var new_delta = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (full,delta,iterations,candidates,seed){
return (function (p__9434){
var vec__9435 = p__9434;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9435,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9435,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rname,clojure.set.difference.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(candidates,rname,cljs.core.PersistentHashSet.EMPTY),cljs.core.get.cljs$core$IFn$_invoke$arity$3(full,rname,cljs.core.PersistentHashSet.EMPTY))], null);
});})(full,delta,iterations,candidates,seed))
),parsed_rules);
var full_SINGLEQUOTE_ = cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(clojure.set.union,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([full,new_delta], 0));
var G__9626 = full_SINGLEQUOTE_;
var G__9627 = new_delta;
var G__9628 = (iterations + (1));
full = G__9626;
delta = G__9627;
iterations = G__9628;
continue;
}
break;
}
});
/**
 * Datomic-shaped `:find` aggregates. Each reduces the seq of one aggregate
 *   variable's bound values across a group of bindings. `min`/`max` on an
 *   empty group are `nil` ("no minimum exists"), not a thrown arity error;
 *   `avg` forces double division (`(double (count vals))`) so JVM/cljs/nbb
 *   agree -- integer `/` gives a Clojure ratio on JVM but a float on cljs.
 */
datalog.core.aggregate_fns = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Symbol(null,"count","count",-514511684,null),cljs.core.count,new cljs.core.Symbol(null,"count-distinct","count-distinct",-1566572514,null),(function (vals){
return cljs.core.count(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(vals));
}),new cljs.core.Symbol(null,"sum","sum",1777518341,null),(function (vals){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),vals);
}),new cljs.core.Symbol(null,"avg","avg",1837937727,null),(function (vals){
if(cljs.core.seq(vals)){
return (cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),vals) / cljs.core.count(vals));
} else {
return null;
}
}),new cljs.core.Symbol(null,"min","min",2085523049,null),(function (vals){
if(cljs.core.seq(vals)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,vals);
} else {
return null;
}
}),new cljs.core.Symbol(null,"max","max",1701898075,null),(function (vals){
if(cljs.core.seq(vals)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,vals);
} else {
return null;
}
})], null);
/**
 * `(count ?v)`/`(sum ?v)`/etc. -- a `:find` element that isn't a plain
 *   projected variable but an aggregate over one.
 */
datalog.core.agg_find_QMARK_ = (function datalog$core$agg_find_QMARK_(x){
return ((cljs.core.seq_QMARK_(x)) && (cljs.core.contains_QMARK_(datalog.core.aggregate_fns,cljs.core.first(x))));
});
datalog.core.agg_fn = (function datalog$core$agg_fn(x){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(datalog.core.aggregate_fns,cljs.core.first(x));
});
datalog.core.agg_var = (function datalog$core$agg_var(x){
return cljs.core.second(x);
});
/**
 * Every logic variable anywhere in `form`, at any nesting depth. Deliberately
 *   structural rather than clause-aware: a triple, a `not`, an `or-join`, a
 *   function call and a rule invocation all just contain symbols, and
 *   over-approximating (keeping a variable that turns out not to be needed) is
 *   always safe while under-approximating drops a binding a later clause was
 *   going to join on.
 */
datalog.core.form_lvars = (function datalog$core$form_lvars(form){
if(datalog.core.lvar_QMARK_(form)){
return cljs.core.PersistentHashSet.createAsIfByAssoc([form]);
} else {
if(cljs.core.coll_QMARK_(form)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(datalog.core.form_lvars),form);
} else {
return cljs.core.PersistentHashSet.EMPTY;

}
}
});
/**
 * Drop variables no remaining clause and no output needs.
 * 
 *   A binding set is a set, so removing a column MERGES bindings that differed
 *   only in it. That is the point: measured (kotobase-peer
 *   bench/results/2026-08-02-ic02-diagnosis.edn), LDBC IC09 carried 55,335
 *   bindings into a step that only ever used 8,130 distinct values of one
 *   variable -- the other 47,000 existed solely because two earlier variables
 *   were still along for the ride, and every one of them cost a substitution, a
 *   scan or a hash lookup, and a unification.
 * 
 *   `needed` must include every variable of every REMAINING clause (including
 *   ones nested in `or`/`not`/rule invocations) plus every `:find` element, or
 *   this silently deletes a join key.
 */
datalog.core.prune_bindings = (function datalog$core$prune_bindings(bindings,needed){
if(((cljs.core.empty_QMARK_(bindings)) || (cljs.core.every_QMARK_(needed,cljs.core.keys(cljs.core.first(bindings)))))){
return bindings;
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__9438_SHARP_){
return cljs.core.select_keys(p1__9438_SHARP_,needed);
})),bindings);
}
});
/**
 * `bindings` -> `:find`-ordered rows. With no aggregate `:find` elements,
 *   this is the original per-binding projection (a plain set of tuples, one
 *   per binding). With any aggregate element, the non-aggregate `:find`
 *   elements become GROUP-BY columns: bindings are partitioned by their
 *   values at those columns, and each aggregate column is computed once per
 *   group. An all-aggregate `:find` (no group-by columns) is Datomic's
 *   ungrouped-aggregate shape -- exactly one output row, computed over every
 *   binding as a single implicit group (so e.g. `(count ?e)` over zero
 *   matches is `#{[0]}`, not `#{}`).
 */
datalog.core.project = (function datalog$core$project(bindings,find){
if(cljs.core.truth_(cljs.core.some(datalog.core.agg_find_QMARK_,find))){
var group_vars = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(datalog.core.agg_find_QMARK_),find);
var row = (function (group_bindings){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (f){
if(datalog.core.agg_find_QMARK_(f)){
var G__9443 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9439_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__9439_SHARP_,datalog.core.agg_var(f));
}),group_bindings);
var fexpr__9442 = datalog.core.agg_fn(f);
return (fexpr__9442.cljs$core$IFn$_invoke$arity$1 ? fexpr__9442.cljs$core$IFn$_invoke$arity$1(G__9443) : fexpr__9442.call(null,G__9443));
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.first(group_bindings),f);
}
}),find);
});
if(cljs.core.empty_QMARK_(group_vars)){
return cljs.core.PersistentHashSet.createAsIfByAssoc([row(bindings)]);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__9444){
var vec__9445 = p__9444;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9445,(0),null);
var group_bindings = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9445,(1),null);
return row(group_bindings);
})),cljs.core.group_by((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9440_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__9440_SHARP_);
}),group_vars);
}),bindings));
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9441_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__9441_SHARP_);
}),find);
})),bindings);
}
});
/**
 * `or`/`or-join` branches, flattened alongside their own clause -- so a
 *   static pass over the result also sees any rule invocation nested
 *   inside a branch, not just top-level `:where`/rule-body clauses.
 */
datalog.core.flatten_clauses = (function datalog$core$flatten_clauses(clauses){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (clause){
if(datalog.core.or_clause_QMARK_(clause)){
return cljs.core.cons(clause,(function (){var G__9448 = datalog.core.or_branches(clause);
return (datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1 ? datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1(G__9448) : datalog.core.flatten_clauses.call(null,G__9448));
})());
} else {
if(datalog.core.or_join_clause_QMARK_(clause)){
return cljs.core.cons(clause,(function (){var G__9449 = datalog.core.or_join_branches(clause);
return (datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1 ? datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1(G__9449) : datalog.core.flatten_clauses.call(null,G__9449));
})());
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clause], null);

}
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([clauses], 0));
});
/**
 * Normalize `:order-by` into `[[find-position direction] ...]`. Each element
 *   is a `:find` element (a plain var, or an aggregate form written exactly as
 *   it appears in `:find`), optionally wrapped as `[element :asc|:desc]`.
 *   Ordering by something not in `:find` is rejected rather than silently
 *   ignored -- the rows being ordered ARE the projection, so a key outside it
 *   does not exist at this point.
 */
datalog.core.order_spec = (function datalog$core$order_spec(find,order_by){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (element){
var vec__9450 = (cljs.core.truth_((function (){var and__5160__auto__ = cljs.core.vector_QMARK_(element);
if(and__5160__auto__){
var G__9454 = cljs.core.second(element);
var fexpr__9453 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"desc","desc",2093485764),null,new cljs.core.Keyword(null,"asc","asc",356854569),null], null), null);
return (fexpr__9453.cljs$core$IFn$_invoke$arity$1 ? fexpr__9453.cljs$core$IFn$_invoke$arity$1(G__9454) : fexpr__9453.call(null,G__9454));
} else {
return and__5160__auto__;
}
})())?element:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [element,new cljs.core.Keyword(null,"asc","asc",356854569)], null));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9450,(0),null);
var dir = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9450,(1),null);
var idx = (function (){var or__5162__auto__ = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,k)){
return i;
} else {
return null;
}
}),find));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (-1);
}
})();
if((idx < (0))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: :order-by key is not in :find",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),k,new cljs.core.Keyword(null,"find","find",496279456),find], null));
} else {
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,dir], null);
}),order_by);
});
datalog.core.compare_rows = (function datalog$core$compare_rows(spec,a,b){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,p__9455){
var vec__9456 = p__9455;
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9456,(0),null);
var dir = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9456,(1),null);
var c = cljs.core.compare(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,idx),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,idx));
var c__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dir,new cljs.core.Keyword(null,"desc","desc",2093485764)))?(- c):c);
if((c__$1 === (0))){
return (0);
} else {
return cljs.core.reduced(c__$1);
}
}),(0),spec);
});
/**
 * Apply `:order-by` / `:limit` to a projected result.
 * 
 *   RETURN TYPE: without either key this returns the SET `project` produced,
 *   exactly as before. With either key it returns a VECTOR, because an ordered
 *   result is a sequence and a set cannot carry order -- a caller asking for
 *   ordering is asking for the thing a set cannot represent. `:limit` alone
 *   also returns a vector; without `:order-by` WHICH rows come back is
 *   unspecified (the set's iteration order), so a bare `:limit` is only
 *   meaningful for `count`-style probes, not for top-N.
 * 
 *   WHAT THIS IS NOT: the limit is applied to the finished projection, so the
 *   join still does all of its work. It makes top-N EXPRESSIBLE -- the caller
 *   no longer sorts the whole result in host code -- but it does not yet make
 *   it cheaper. Pushing a limit into the join needs the ordering clause to
 *   drive iteration, which is possible here because the value-ordered index
 *   already yields `[p o s]` in `o` order; that is a separate change and is
 *   not claimed by this one.
 */
datalog.core.order_PLUS_limit = (function datalog$core$order_PLUS_limit(rows,find,order_by,limit){
if(((cljs.core.empty_QMARK_(order_by)) && ((limit == null)))){
return rows;
} else {
var spec = datalog.core.order_spec(find,order_by);
var ordered = ((cljs.core.seq(spec))?cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$2((function (p1__9459_SHARP_,p2__9460_SHARP_){
return datalog.core.compare_rows(spec,p1__9459_SHARP_,p2__9460_SHARP_);
}),rows)):cljs.core.vec(rows));
if(cljs.core.truth_(limit)){
return cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(limit,ordered));
} else {
return ordered;
}
}
});
/**
 * `{:find [?var ...] :in [?param ...] :where [[e a v] ...] :rules [...]}`
 *   over `db`. `visible?` is required and threaded into every underlying
 *   `datalog.query/query` call, same convention as `datalog.query`
 *   itself (ADR-2607050500). Returns a set of `:find`-ordered vectors --
 *   `nil` for any plain `:find` var a clause never bound (e.g. wildcard-only
 *   clauses).
 * 
 *   `:where` clauses may be:
 *  - `(not [e a v])` (see ns docstring for the `visible?`/safety contract)
 *  - `(rule-name ?arg ...)`, invoking a `:rules` definition
 *  - `[(fn-sym arg...)]` / `[(fn-sym arg...) result-var]`, a whitelisted
 *    predicate/function call (see `query-fns`)
 *  - `(or clause ...)` / `(or-join [?shared ...] clause ...)`, union
 *    across alternative derivations
 *   `:find` elements may be `(count ?v)`, `(count-distinct ?v)`, `(sum ?v)`,
 *   `(avg ?v)`, `(min ?v)`, or `(max ?v)` alongside plain variables, which
 *   then act as GROUP-BY columns (see `project`).
 * 
 *   `:in` (optional) declares extra query parameters -- `inputs` (a 4th,
 *   optional arg, positional, same order as `:in`) supplies their values.
 *   `'$` in `:in` is accepted as a no-op placeholder for `db` itself
 *   (already passed separately); every other symbol consumes one value
 *   from `inputs`, pre-bound before `:where` runs.
 * 
 *   `:rules` (optional; omit or `[]` for plain Stage 1/2 queries, unchanged)
 *   is `[[(rule-name ?param ...) clause ...] ...]` -- see ns docstring for
 *   the fixpoint/semi-naive contract, safety, and the `visible?` guarantee
 *   extending recursively into rule bodies.
 * 
 *   `:order-by` / `:limit` (optional) make top-N expressible in the query
 *   instead of in host code. `:order-by` is a vector of `:find` elements,
 *   each optionally `[element :asc|:desc]` (default `:asc`); a key that is
 *   not in `:find` is an error, not a no-op. Supplying either key changes
 *   the return type from a SET to a VECTOR, because an ordered result is a
 *   sequence. `:limit` without `:order-by` returns an unspecified subset --
 *   useful for probes, not for top-N.
 * 
 *   `:clause-cardinality` (optional) is `{clause estimated-rows}` -- a
 *   planner's own per-clause row estimate, which it already computes in
 *   order to choose a clause order. When a clause's whole relation is small
 *   relative to the number of keyed scans a join step would issue for it,
 *   the executor reads that relation ONCE and hash-joins instead. Omit it
 *   and every step stays on the keyed path, which is the safe default: a
 *   broad scan of a large relation is the mistake the budget avoids, and a
 *   hint that is absent is not a hint that is wrong. It never changes an
 *   answer -- see `hash-join-rows` and the equivalence tests.
 * 
 *   These are applied to the finished projection: the join still does all
 *   of its work, so this makes top-N SAYABLE, not yet cheaper. Every LDBC
 *   SNB complex read is a "most recent N" query, and until this existed a
 *   caller had to materialize the whole join and sort it in host code
 *   (kotobase-peer bench/results/2026-08-01-ldbc-snb-interactive.edn did
 *   exactly that, and said so). Pushing the limit into the join is a
 *   separate change -- see `order+limit`.
 */
datalog.core.q = (function datalog$core$q(var_args){
var G__9463 = arguments.length;
switch (G__9463) {
case 3:
return datalog.core.q.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return datalog.core.q.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datalog.core.q.cljs$core$IFn$_invoke$arity$3 = (function (db,query,visible_QMARK_){
return datalog.core.q.cljs$core$IFn$_invoke$arity$4(db,query,visible_QMARK_,cljs.core.PersistentVector.EMPTY);
}));

(datalog.core.q.cljs$core$IFn$_invoke$arity$4 = (function (db,p__9464,visible_QMARK_,inputs){
var map__9465 = p__9464;
var map__9465__$1 = cljs.core.__destructure_map(map__9465);
var find = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"find","find",496279456));
var where = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"where","where",-2044795965));
var rules = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"rules","rules",1198912366));
var in$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"in","in",-1531184865));
var order_by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"order-by","order-by",1527318070));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var clause_cardinality = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"clause-cardinality","clause-cardinality",-1709612991));
var _STAR_pattern_source_QMARK__STAR__orig_val__9466 = datalog.core._STAR_pattern_source_QMARK__STAR_;
var _STAR_pattern_source_QMARK__STAR__temp_val__9467 = (((!((db == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === db.datom$source$IPatternSource$))))?true:(((!db.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db):false)):cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db));
(datalog.core._STAR_pattern_source_QMARK__STAR_ = _STAR_pattern_source_QMARK__STAR__temp_val__9467);

try{var in_syms = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,"$","$",-1580747756,null),null], null), null),(function (){var or__5162__auto__ = in$;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})()));
var initial_binding = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,in_syms,inputs));
var parsed_rules = datalog.core.parse_rules((function (){var or__5162__auto__ = rules;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})());
var all_clauses = datalog.core.flatten_clauses(cljs.core.into.cljs$core$IFn$_invoke$arity$3(where,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"body","body",-2049205669)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.val,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([parsed_rules], 0))));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(where,cljs.core.set(in_syms));

var seq__9469_9630 = cljs.core.seq(parsed_rules);
var chunk__9470_9631 = null;
var count__9471_9632 = (0);
var i__9472_9633 = (0);
while(true){
if((i__9472_9633 < count__9471_9632)){
var vec__9495_9634 = chunk__9470_9631.cljs$core$IIndexed$_nth$arity$2(null,i__9472_9633);
var __9635 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9495_9634,(0),null);
var defs_9636 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9495_9634,(1),null);
var seq__9498_9637 = cljs.core.seq(defs_9636);
var chunk__9499_9638 = null;
var count__9500_9639 = (0);
var i__9501_9640 = (0);
while(true){
if((i__9501_9640 < count__9500_9639)){
var map__9504_9641 = chunk__9499_9638.cljs$core$IIndexed$_nth$arity$2(null,i__9501_9640);
var map__9504_9642__$1 = cljs.core.__destructure_map(map__9504_9641);
var body_9643 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9504_9642__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_9643);


var G__9644 = seq__9498_9637;
var G__9645 = chunk__9499_9638;
var G__9646 = count__9500_9639;
var G__9647 = (i__9501_9640 + (1));
seq__9498_9637 = G__9644;
chunk__9499_9638 = G__9645;
count__9500_9639 = G__9646;
i__9501_9640 = G__9647;
continue;
} else {
var temp__5825__auto___9648 = cljs.core.seq(seq__9498_9637);
if(temp__5825__auto___9648){
var seq__9498_9649__$1 = temp__5825__auto___9648;
if(cljs.core.chunked_seq_QMARK_(seq__9498_9649__$1)){
var c__5694__auto___9650 = cljs.core.chunk_first(seq__9498_9649__$1);
var G__9651 = cljs.core.chunk_rest(seq__9498_9649__$1);
var G__9652 = c__5694__auto___9650;
var G__9653 = cljs.core.count(c__5694__auto___9650);
var G__9654 = (0);
seq__9498_9637 = G__9651;
chunk__9499_9638 = G__9652;
count__9500_9639 = G__9653;
i__9501_9640 = G__9654;
continue;
} else {
var map__9505_9655 = cljs.core.first(seq__9498_9649__$1);
var map__9505_9656__$1 = cljs.core.__destructure_map(map__9505_9655);
var body_9657 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9505_9656__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_9657);


var G__9658 = cljs.core.next(seq__9498_9649__$1);
var G__9659 = null;
var G__9660 = (0);
var G__9661 = (0);
seq__9498_9637 = G__9658;
chunk__9499_9638 = G__9659;
count__9500_9639 = G__9660;
i__9501_9640 = G__9661;
continue;
}
} else {
}
}
break;
}


var G__9662 = seq__9469_9630;
var G__9663 = chunk__9470_9631;
var G__9664 = count__9471_9632;
var G__9665 = (i__9472_9633 + (1));
seq__9469_9630 = G__9662;
chunk__9470_9631 = G__9663;
count__9471_9632 = G__9664;
i__9472_9633 = G__9665;
continue;
} else {
var temp__5825__auto___9666 = cljs.core.seq(seq__9469_9630);
if(temp__5825__auto___9666){
var seq__9469_9667__$1 = temp__5825__auto___9666;
if(cljs.core.chunked_seq_QMARK_(seq__9469_9667__$1)){
var c__5694__auto___9668 = cljs.core.chunk_first(seq__9469_9667__$1);
var G__9669 = cljs.core.chunk_rest(seq__9469_9667__$1);
var G__9670 = c__5694__auto___9668;
var G__9671 = cljs.core.count(c__5694__auto___9668);
var G__9672 = (0);
seq__9469_9630 = G__9669;
chunk__9470_9631 = G__9670;
count__9471_9632 = G__9671;
i__9472_9633 = G__9672;
continue;
} else {
var vec__9506_9673 = cljs.core.first(seq__9469_9667__$1);
var __9674 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9506_9673,(0),null);
var defs_9675 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9506_9673,(1),null);
var seq__9509_9676 = cljs.core.seq(defs_9675);
var chunk__9510_9677 = null;
var count__9511_9678 = (0);
var i__9512_9679 = (0);
while(true){
if((i__9512_9679 < count__9511_9678)){
var map__9515_9680 = chunk__9510_9677.cljs$core$IIndexed$_nth$arity$2(null,i__9512_9679);
var map__9515_9681__$1 = cljs.core.__destructure_map(map__9515_9680);
var body_9682 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9515_9681__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_9682);


var G__9683 = seq__9509_9676;
var G__9684 = chunk__9510_9677;
var G__9685 = count__9511_9678;
var G__9686 = (i__9512_9679 + (1));
seq__9509_9676 = G__9683;
chunk__9510_9677 = G__9684;
count__9511_9678 = G__9685;
i__9512_9679 = G__9686;
continue;
} else {
var temp__5825__auto___9687__$1 = cljs.core.seq(seq__9509_9676);
if(temp__5825__auto___9687__$1){
var seq__9509_9688__$1 = temp__5825__auto___9687__$1;
if(cljs.core.chunked_seq_QMARK_(seq__9509_9688__$1)){
var c__5694__auto___9689 = cljs.core.chunk_first(seq__9509_9688__$1);
var G__9690 = cljs.core.chunk_rest(seq__9509_9688__$1);
var G__9691 = c__5694__auto___9689;
var G__9692 = cljs.core.count(c__5694__auto___9689);
var G__9693 = (0);
seq__9509_9676 = G__9690;
chunk__9510_9677 = G__9691;
count__9511_9678 = G__9692;
i__9512_9679 = G__9693;
continue;
} else {
var map__9516_9694 = cljs.core.first(seq__9509_9688__$1);
var map__9516_9695__$1 = cljs.core.__destructure_map(map__9516_9694);
var body_9696 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9516_9695__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_9696);


var G__9697 = cljs.core.next(seq__9509_9688__$1);
var G__9698 = null;
var G__9699 = (0);
var G__9700 = (0);
seq__9509_9676 = G__9697;
chunk__9510_9677 = G__9698;
count__9511_9678 = G__9699;
i__9512_9679 = G__9700;
continue;
}
} else {
}
}
break;
}


var G__9701 = cljs.core.next(seq__9469_9667__$1);
var G__9702 = null;
var G__9703 = (0);
var G__9704 = (0);
seq__9469_9630 = G__9701;
chunk__9470_9631 = G__9702;
count__9471_9632 = G__9703;
i__9472_9633 = G__9704;
continue;
}
} else {
}
}
break;
}

datalog.core.check_unknown_rules_BANG_(all_clauses,parsed_rules);

var where__$1 = datalog.core.fuse_value_ranges(where);
var full = datalog.core.fixpoint(db,visible_QMARK_,parsed_rules);
var prune_QMARK_ = cljs.core.not(cljs.core.some(datalog.core.agg_find_QMARK_,find));
var bindings = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bindings,p__9517){
var vec__9518 = p__9517;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9518,(0),null);
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9518,(1),null);
var bs = datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6(bindings,clause,db,visible_QMARK_,(function (p1__9461_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(full,p1__9461_SHARP_,cljs.core.PersistentHashSet.EMPTY);
}),clause_cardinality);
if(prune_QMARK_){
return datalog.core.prune_bindings(bs,cljs.core.into.cljs$core$IFn$_invoke$arity$2(datalog.core.form_lvars(find),datalog.core.form_lvars(cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(where__$1),(i + (1))))));
} else {
return bs;
}
}),cljs.core.PersistentHashSet.createAsIfByAssoc([initial_binding]),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,where__$1));
return datalog.core.order_PLUS_limit(datalog.core.project(bindings,find),find,order_by,limit);
}finally {(datalog.core._STAR_pattern_source_QMARK__STAR_ = _STAR_pattern_source_QMARK__STAR__orig_val__9466);
}}));

(datalog.core.q.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=datalog.core.js.map
