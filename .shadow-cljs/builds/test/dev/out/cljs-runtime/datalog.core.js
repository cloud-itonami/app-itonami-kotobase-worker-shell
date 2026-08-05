goog.provide('datalog.core');
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
if((((!((db == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === db.datom$source$IPatternSource$))))?true:(((!db.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db):false)):cljs.core.native_satisfies_QMARK_(datom.source.IPatternSource,db))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(visible_QMARK_),datom.source.scan(db,pattern));
} else {
return datalog.query.query(db,pattern,visible_QMARK_);
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
 */
datalog.core.unify_positional = (function datalog$core$unify_positional(binding,terms,values){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (b,p__6761){
var vec__6762 = p__6761;
var term = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6762,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6762,(1),null);
if(((datalog.core.wildcard_QMARK_(term)) || ((!(datalog.core.lvar_QMARK_(term)))))){
return b;
} else {
if(cljs.core.contains_QMARK_(b,term)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,term),v)){
return b;
} else {
return cljs.core.reduced(null);
}
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b,term,v);

}
}
}),binding,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,terms,values));
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
datalog.core.eval_fn_call = (function datalog$core$eval_fn_call(binding,fn_call){
var fsym = datalog.core.fn_call_sym(fn_call);
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(datalog.core.query_fns,fsym);
if(cljs.core.truth_(f)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown or disallowed function in query clause -- see query-fns for the whitelist",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fn","fn",-1175266204),fsym], null));
}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__6765_SHARP_){
return datalog.core.substitute(p1__6765_SHARP_,binding);
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
var G__6767 = arguments.length;
switch (G__6767) {
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
var seq__6768_6944 = cljs.core.seq(datalog.core.or_branches(clause));
var chunk__6769_6945 = null;
var count__6770_6946 = (0);
var i__6771_6947 = (0);
while(true){
if((i__6771_6947 < count__6770_6946)){
var branch_6948 = chunk__6769_6945.cljs$core$IIndexed$_nth$arity$2(null,i__6771_6947);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_6948))?datalog.core.and_clauses(branch_6948):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_6948], null)),bound_so_far);


var G__6949 = seq__6768_6944;
var G__6950 = chunk__6769_6945;
var G__6951 = count__6770_6946;
var G__6952 = (i__6771_6947 + (1));
seq__6768_6944 = G__6949;
chunk__6769_6945 = G__6950;
count__6770_6946 = G__6951;
i__6771_6947 = G__6952;
continue;
} else {
var temp__5825__auto___6953 = cljs.core.seq(seq__6768_6944);
if(temp__5825__auto___6953){
var seq__6768_6954__$1 = temp__5825__auto___6953;
if(cljs.core.chunked_seq_QMARK_(seq__6768_6954__$1)){
var c__5694__auto___6955 = cljs.core.chunk_first(seq__6768_6954__$1);
var G__6956 = cljs.core.chunk_rest(seq__6768_6954__$1);
var G__6957 = c__5694__auto___6955;
var G__6958 = cljs.core.count(c__5694__auto___6955);
var G__6959 = (0);
seq__6768_6944 = G__6956;
chunk__6769_6945 = G__6957;
count__6770_6946 = G__6958;
i__6771_6947 = G__6959;
continue;
} else {
var branch_6960 = cljs.core.first(seq__6768_6954__$1);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_6960))?datalog.core.and_clauses(branch_6960):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_6960], null)),bound_so_far);


var G__6961 = cljs.core.next(seq__6768_6954__$1);
var G__6962 = null;
var G__6963 = (0);
var G__6964 = (0);
seq__6768_6944 = G__6961;
chunk__6769_6945 = G__6962;
count__6770_6946 = G__6963;
i__6771_6947 = G__6964;
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
var seq__6772_6965 = cljs.core.seq(datalog.core.or_join_branches(clause));
var chunk__6773_6966 = null;
var count__6774_6967 = (0);
var i__6775_6968 = (0);
while(true){
if((i__6775_6968 < count__6774_6967)){
var branch_6969 = chunk__6773_6966.cljs$core$IIndexed$_nth$arity$2(null,i__6775_6968);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_6969))?datalog.core.and_clauses(branch_6969):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_6969], null)),bound_so_far);


var G__6970 = seq__6772_6965;
var G__6971 = chunk__6773_6966;
var G__6972 = count__6774_6967;
var G__6973 = (i__6775_6968 + (1));
seq__6772_6965 = G__6970;
chunk__6773_6966 = G__6971;
count__6774_6967 = G__6972;
i__6775_6968 = G__6973;
continue;
} else {
var temp__5825__auto___6974 = cljs.core.seq(seq__6772_6965);
if(temp__5825__auto___6974){
var seq__6772_6975__$1 = temp__5825__auto___6974;
if(cljs.core.chunked_seq_QMARK_(seq__6772_6975__$1)){
var c__5694__auto___6976 = cljs.core.chunk_first(seq__6772_6975__$1);
var G__6977 = cljs.core.chunk_rest(seq__6772_6975__$1);
var G__6978 = c__5694__auto___6976;
var G__6979 = cljs.core.count(c__5694__auto___6976);
var G__6980 = (0);
seq__6772_6965 = G__6977;
chunk__6773_6966 = G__6978;
count__6774_6967 = G__6979;
i__6775_6968 = G__6980;
continue;
} else {
var branch_6981 = cljs.core.first(seq__6772_6975__$1);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_6981))?datalog.core.and_clauses(branch_6981):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_6981], null)),bound_so_far);


var G__6982 = cljs.core.next(seq__6772_6975__$1);
var G__6983 = null;
var G__6984 = (0);
var G__6985 = (0);
seq__6772_6965 = G__6982;
chunk__6773_6966 = G__6983;
count__6774_6967 = G__6984;
i__6775_6968 = G__6985;
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6776_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(r,p1__6776_SHARP_);
}),positions);
}),rows)], null);
})),cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__6779){
var vec__6780 = p__6779;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6780,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6780,(1),null);
return datalog.core.bound_positions(pattern,clause);
}),groups)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__6783){
var vec__6784 = p__6783;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6784,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6784,(1),null);
var positions = datalog.core.bound_positions(pattern,clause);
var key = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6777_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(pattern,p1__6777_SHARP_);
}),positions);
var matched = ((cljs.core.seq(positions))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(indexes,positions),key):rows);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__6778_SHARP_){
return datalog.core.unify_positional(binding,clause,p1__6778_SHARP_);
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
var G__6793 = arguments.length;
switch (G__6793) {
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
return cljs.core.seq(datalog.core.scan_STAR_(db,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6787_SHARP_){
return datalog.core.substitute(p1__6787_SHARP_,binding);
}),pattern),visible_QMARK_));
})),bindings);
} else {
if(datalog.core.rule_invocation_QMARK_(clause)){
var args = datalog.core.rule_args(clause);
var extension = (function (){var G__6794 = datalog.core.rule_name(clause);
return (extension_for.cljs$core$IFn$_invoke$arity$1 ? extension_for.cljs$core$IFn$_invoke$arity$1(G__6794) : extension_for.call(null,G__6794));
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (binding){
var substituted = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6788_SHARP_){
return datalog.core.substitute(p1__6788_SHARP_,binding);
}),args);
var matches_QMARK_ = (function (tuple){
return cljs.core.every_QMARK_(cljs.core.true_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (want,got){
return (((want == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(want,got)));
}),substituted,tuple));
});
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__6789_SHARP_){
return datalog.core.unify_positional(binding,args,p1__6789_SHARP_);
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
var groups = cljs.core.group_by((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6790_SHARP_){
return datalog.core.substitute(p1__6790_SHARP_,binding);
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__6795){
var vec__6796 = p__6795;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6796,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6796,(1),null);
var rows = datalog.core.scan_STAR_(db,pattern,visible_QMARK_);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__6791_SHARP_){
return datalog.core.unify_positional(binding,clause,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(p1__6791_SHARP_),new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(p1__6791_SHARP_),new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(p1__6791_SHARP_)], null));
}),rows);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([group], 0));
})),groups);
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
var grouped = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__6799){
var vec__6800 = p__6799;
var seq__6801 = cljs.core.seq(vec__6800);
var first__6802 = cljs.core.first(seq__6801);
var seq__6801__$1 = cljs.core.next(seq__6801);
var vec__6803 = first__6802;
var seq__6804 = cljs.core.seq(vec__6803);
var first__6805 = cljs.core.first(seq__6804);
var seq__6804__$1 = cljs.core.next(seq__6804);
var rname = first__6805;
var params = seq__6804__$1;
var body = seq__6801__$1;
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,rname,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"params","params",710516235),cljs.core.vec(params),new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.vec(body)], null));
}),cljs.core.PersistentArrayMap.EMPTY,rules);
var seq__6806_6987 = cljs.core.seq(grouped);
var chunk__6807_6988 = null;
var count__6808_6989 = (0);
var i__6809_6990 = (0);
while(true){
if((i__6809_6990 < count__6808_6989)){
var vec__6816_6991 = chunk__6807_6988.cljs$core$IIndexed$_nth$arity$2(null,i__6809_6990);
var rname_6992 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6816_6991,(0),null);
var defs_6993 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6816_6991,(1),null);
var arities_6994 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,new cljs.core.Keyword(null,"params","params",710516235))),defs_6993);
if((cljs.core.count(arities_6994) > (1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule definitions for the same name must all declare the same arity",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_6992,new cljs.core.Keyword(null,"arities","arities",-1781122917),arities_6994], null));
} else {
}


var G__6995 = seq__6806_6987;
var G__6996 = chunk__6807_6988;
var G__6997 = count__6808_6989;
var G__6998 = (i__6809_6990 + (1));
seq__6806_6987 = G__6995;
chunk__6807_6988 = G__6996;
count__6808_6989 = G__6997;
i__6809_6990 = G__6998;
continue;
} else {
var temp__5825__auto___6999 = cljs.core.seq(seq__6806_6987);
if(temp__5825__auto___6999){
var seq__6806_7000__$1 = temp__5825__auto___6999;
if(cljs.core.chunked_seq_QMARK_(seq__6806_7000__$1)){
var c__5694__auto___7001 = cljs.core.chunk_first(seq__6806_7000__$1);
var G__7002 = cljs.core.chunk_rest(seq__6806_7000__$1);
var G__7003 = c__5694__auto___7001;
var G__7004 = cljs.core.count(c__5694__auto___7001);
var G__7005 = (0);
seq__6806_6987 = G__7002;
chunk__6807_6988 = G__7003;
count__6808_6989 = G__7004;
i__6809_6990 = G__7005;
continue;
} else {
var vec__6819_7006 = cljs.core.first(seq__6806_7000__$1);
var rname_7007 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6819_7006,(0),null);
var defs_7008 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6819_7006,(1),null);
var arities_7009 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,new cljs.core.Keyword(null,"params","params",710516235))),defs_7008);
if((cljs.core.count(arities_7009) > (1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule definitions for the same name must all declare the same arity",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_7007,new cljs.core.Keyword(null,"arities","arities",-1781122917),arities_7009], null));
} else {
}


var G__7010 = cljs.core.next(seq__6806_7000__$1);
var G__7011 = null;
var G__7012 = (0);
var G__7013 = (0);
seq__6806_6987 = G__7010;
chunk__6807_6988 = G__7011;
count__6808_6989 = G__7012;
i__6809_6990 = G__7013;
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
var seq__6822 = cljs.core.seq(clauses);
var chunk__6824 = null;
var count__6825 = (0);
var i__6826 = (0);
while(true){
if((i__6826 < count__6825)){
var clause = chunk__6824.cljs$core$IIndexed$_nth$arity$2(null,i__6826);
if(datalog.core.rule_invocation_QMARK_(clause)){
var rname_7014 = datalog.core.rule_name(clause);
if(cljs.core.contains_QMARK_(parsed_rules,rname_7014)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown rule invoked -- not defined in :rules",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_7014], null));
}

var map__6830_7015 = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed_rules,rname_7014));
var map__6830_7016__$1 = cljs.core.__destructure_map(map__6830_7015);
var params_7017 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6830_7016__$1,new cljs.core.Keyword(null,"params","params",710516235));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(params_7017),cljs.core.count(datalog.core.rule_args(clause)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule invoked with the wrong number of arguments",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_7014,new cljs.core.Keyword(null,"expected","expected",1583670997),cljs.core.count(params_7017),new cljs.core.Keyword(null,"got","got",-1674745710),cljs.core.count(datalog.core.rule_args(clause))], null));
} else {
}


var G__7018 = seq__6822;
var G__7019 = chunk__6824;
var G__7020 = count__6825;
var G__7021 = (i__6826 + (1));
seq__6822 = G__7018;
chunk__6824 = G__7019;
count__6825 = G__7020;
i__6826 = G__7021;
continue;
} else {
var G__7022 = seq__6822;
var G__7023 = chunk__6824;
var G__7024 = count__6825;
var G__7025 = (i__6826 + (1));
seq__6822 = G__7022;
chunk__6824 = G__7023;
count__6825 = G__7024;
i__6826 = G__7025;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6822);
if(temp__5825__auto__){
var seq__6822__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6822__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6822__$1);
var G__7026 = cljs.core.chunk_rest(seq__6822__$1);
var G__7027 = c__5694__auto__;
var G__7028 = cljs.core.count(c__5694__auto__);
var G__7029 = (0);
seq__6822 = G__7026;
chunk__6824 = G__7027;
count__6825 = G__7028;
i__6826 = G__7029;
continue;
} else {
var clause = cljs.core.first(seq__6822__$1);
if(datalog.core.rule_invocation_QMARK_(clause)){
var rname_7030 = datalog.core.rule_name(clause);
if(cljs.core.contains_QMARK_(parsed_rules,rname_7030)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown rule invoked -- not defined in :rules",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_7030], null));
}

var map__6831_7031 = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed_rules,rname_7030));
var map__6831_7032__$1 = cljs.core.__destructure_map(map__6831_7031);
var params_7033 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6831_7032__$1,new cljs.core.Keyword(null,"params","params",710516235));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(params_7033),cljs.core.count(datalog.core.rule_args(clause)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule invoked with the wrong number of arguments",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_7030,new cljs.core.Keyword(null,"expected","expected",1583670997),cljs.core.count(params_7033),new cljs.core.Keyword(null,"got","got",-1674745710),cljs.core.count(datalog.core.rule_args(clause))], null));
} else {
}


var G__7034 = cljs.core.next(seq__6822__$1);
var G__7035 = null;
var G__7036 = (0);
var G__7037 = (0);
seq__6822 = G__7034;
chunk__6824 = G__7035;
count__6825 = G__7036;
i__6826 = G__7037;
continue;
} else {
var G__7038 = cljs.core.next(seq__6822__$1);
var G__7039 = null;
var G__7040 = (0);
var G__7041 = (0);
seq__6822 = G__7038;
chunk__6824 = G__7039;
count__6825 = G__7040;
i__6826 = G__7041;
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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bindings,p__6832){
var vec__6833 = p__6832;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6833,(0),null);
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6833,(1),null);
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6836_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__6836_SHARP_);
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
var seed = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__6837){
var vec__6838 = p__6837;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6838,(0),null);
var defs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6838,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,rname,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__6841){
var map__6842 = p__6841;
var map__6842__$1 = cljs.core.__destructure_map(map__6842);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6842__$1,new cljs.core.Keyword(null,"params","params",710516235));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6842__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
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
return (function (acc,p__6853){
var vec__6854 = p__6853;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6854,(0),null);
var defs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6854,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,rname,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(((function (full,delta,iterations,vec__6854,rname,defs,seed){
return (function (p__6857){
var map__6858 = p__6857;
var map__6858__$1 = cljs.core.__destructure_map(map__6858);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6858__$1,new cljs.core.Keyword(null,"params","params",710516235));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6858__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var idxs = datalog.core.rule_invocation_indices(body);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (full,delta,iterations,idxs,map__6858,map__6858__$1,params,body,vec__6854,rname,defs,seed){
return (function (delta_idx){
return datalog.core.project_params(datalog.core.eval_body_variant(db,visible_QMARK_,body,full,delta,delta_idx),params);
});})(full,delta,iterations,idxs,map__6858,map__6858__$1,params,body,vec__6854,rname,defs,seed))
,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([idxs], 0));
});})(full,delta,iterations,vec__6854,rname,defs,seed))
),defs));
});})(full,delta,iterations,seed))
,cljs.core.PersistentArrayMap.EMPTY,parsed_rules);
var new_delta = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (full,delta,iterations,candidates,seed){
return (function (p__6859){
var vec__6860 = p__6859;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6860,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6860,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rname,clojure.set.difference.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(candidates,rname,cljs.core.PersistentHashSet.EMPTY),cljs.core.get.cljs$core$IFn$_invoke$arity$3(full,rname,cljs.core.PersistentHashSet.EMPTY))], null);
});})(full,delta,iterations,candidates,seed))
),parsed_rules);
var full_SINGLEQUOTE_ = cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(clojure.set.union,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([full,new_delta], 0));
var G__7042 = full_SINGLEQUOTE_;
var G__7043 = new_delta;
var G__7044 = (iterations + (1));
full = G__7042;
delta = G__7043;
iterations = G__7044;
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__6863_SHARP_){
return cljs.core.select_keys(p1__6863_SHARP_,needed);
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
var G__6868 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6864_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__6864_SHARP_,datalog.core.agg_var(f));
}),group_bindings);
var fexpr__6867 = datalog.core.agg_fn(f);
return (fexpr__6867.cljs$core$IFn$_invoke$arity$1 ? fexpr__6867.cljs$core$IFn$_invoke$arity$1(G__6868) : fexpr__6867.call(null,G__6868));
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.first(group_bindings),f);
}
}),find);
});
if(cljs.core.empty_QMARK_(group_vars)){
return cljs.core.PersistentHashSet.createAsIfByAssoc([row(bindings)]);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__6869){
var vec__6870 = p__6869;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6870,(0),null);
var group_bindings = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6870,(1),null);
return row(group_bindings);
})),cljs.core.group_by((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6865_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__6865_SHARP_);
}),group_vars);
}),bindings));
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6866_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__6866_SHARP_);
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
return cljs.core.cons(clause,(function (){var G__6873 = datalog.core.or_branches(clause);
return (datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1 ? datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1(G__6873) : datalog.core.flatten_clauses.call(null,G__6873));
})());
} else {
if(datalog.core.or_join_clause_QMARK_(clause)){
return cljs.core.cons(clause,(function (){var G__6874 = datalog.core.or_join_branches(clause);
return (datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1 ? datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1(G__6874) : datalog.core.flatten_clauses.call(null,G__6874));
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
var vec__6875 = (cljs.core.truth_((function (){var and__5160__auto__ = cljs.core.vector_QMARK_(element);
if(and__5160__auto__){
var G__6879 = cljs.core.second(element);
var fexpr__6878 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"desc","desc",2093485764),null,new cljs.core.Keyword(null,"asc","asc",356854569),null], null), null);
return (fexpr__6878.cljs$core$IFn$_invoke$arity$1 ? fexpr__6878.cljs$core$IFn$_invoke$arity$1(G__6879) : fexpr__6878.call(null,G__6879));
} else {
return and__5160__auto__;
}
})())?element:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [element,new cljs.core.Keyword(null,"asc","asc",356854569)], null));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6875,(0),null);
var dir = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6875,(1),null);
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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,p__6880){
var vec__6881 = p__6880;
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6881,(0),null);
var dir = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6881,(1),null);
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
var ordered = ((cljs.core.seq(spec))?cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$2((function (p1__6884_SHARP_,p2__6885_SHARP_){
return datalog.core.compare_rows(spec,p1__6884_SHARP_,p2__6885_SHARP_);
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
var G__6888 = arguments.length;
switch (G__6888) {
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

(datalog.core.q.cljs$core$IFn$_invoke$arity$4 = (function (db,p__6889,visible_QMARK_,inputs){
var map__6890 = p__6889;
var map__6890__$1 = cljs.core.__destructure_map(map__6890);
var find = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6890__$1,new cljs.core.Keyword(null,"find","find",496279456));
var where = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6890__$1,new cljs.core.Keyword(null,"where","where",-2044795965));
var rules = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6890__$1,new cljs.core.Keyword(null,"rules","rules",1198912366));
var in$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6890__$1,new cljs.core.Keyword(null,"in","in",-1531184865));
var order_by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6890__$1,new cljs.core.Keyword(null,"order-by","order-by",1527318070));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6890__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var clause_cardinality = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6890__$1,new cljs.core.Keyword(null,"clause-cardinality","clause-cardinality",-1709612991));
var in_syms = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,"$","$",-1580747756,null),null], null), null),(function (){var or__5162__auto__ = in$;
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

var seq__6891_7046 = cljs.core.seq(parsed_rules);
var chunk__6892_7047 = null;
var count__6893_7048 = (0);
var i__6894_7049 = (0);
while(true){
if((i__6894_7049 < count__6893_7048)){
var vec__6917_7050 = chunk__6892_7047.cljs$core$IIndexed$_nth$arity$2(null,i__6894_7049);
var __7051 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6917_7050,(0),null);
var defs_7052 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6917_7050,(1),null);
var seq__6920_7053 = cljs.core.seq(defs_7052);
var chunk__6921_7054 = null;
var count__6922_7055 = (0);
var i__6923_7056 = (0);
while(true){
if((i__6923_7056 < count__6922_7055)){
var map__6926_7057 = chunk__6921_7054.cljs$core$IIndexed$_nth$arity$2(null,i__6923_7056);
var map__6926_7058__$1 = cljs.core.__destructure_map(map__6926_7057);
var body_7059 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6926_7058__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_7059);


var G__7060 = seq__6920_7053;
var G__7061 = chunk__6921_7054;
var G__7062 = count__6922_7055;
var G__7063 = (i__6923_7056 + (1));
seq__6920_7053 = G__7060;
chunk__6921_7054 = G__7061;
count__6922_7055 = G__7062;
i__6923_7056 = G__7063;
continue;
} else {
var temp__5825__auto___7064 = cljs.core.seq(seq__6920_7053);
if(temp__5825__auto___7064){
var seq__6920_7065__$1 = temp__5825__auto___7064;
if(cljs.core.chunked_seq_QMARK_(seq__6920_7065__$1)){
var c__5694__auto___7066 = cljs.core.chunk_first(seq__6920_7065__$1);
var G__7067 = cljs.core.chunk_rest(seq__6920_7065__$1);
var G__7068 = c__5694__auto___7066;
var G__7069 = cljs.core.count(c__5694__auto___7066);
var G__7070 = (0);
seq__6920_7053 = G__7067;
chunk__6921_7054 = G__7068;
count__6922_7055 = G__7069;
i__6923_7056 = G__7070;
continue;
} else {
var map__6927_7071 = cljs.core.first(seq__6920_7065__$1);
var map__6927_7072__$1 = cljs.core.__destructure_map(map__6927_7071);
var body_7073 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6927_7072__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_7073);


var G__7074 = cljs.core.next(seq__6920_7065__$1);
var G__7075 = null;
var G__7076 = (0);
var G__7077 = (0);
seq__6920_7053 = G__7074;
chunk__6921_7054 = G__7075;
count__6922_7055 = G__7076;
i__6923_7056 = G__7077;
continue;
}
} else {
}
}
break;
}


var G__7078 = seq__6891_7046;
var G__7079 = chunk__6892_7047;
var G__7080 = count__6893_7048;
var G__7081 = (i__6894_7049 + (1));
seq__6891_7046 = G__7078;
chunk__6892_7047 = G__7079;
count__6893_7048 = G__7080;
i__6894_7049 = G__7081;
continue;
} else {
var temp__5825__auto___7082 = cljs.core.seq(seq__6891_7046);
if(temp__5825__auto___7082){
var seq__6891_7083__$1 = temp__5825__auto___7082;
if(cljs.core.chunked_seq_QMARK_(seq__6891_7083__$1)){
var c__5694__auto___7084 = cljs.core.chunk_first(seq__6891_7083__$1);
var G__7085 = cljs.core.chunk_rest(seq__6891_7083__$1);
var G__7086 = c__5694__auto___7084;
var G__7087 = cljs.core.count(c__5694__auto___7084);
var G__7088 = (0);
seq__6891_7046 = G__7085;
chunk__6892_7047 = G__7086;
count__6893_7048 = G__7087;
i__6894_7049 = G__7088;
continue;
} else {
var vec__6928_7089 = cljs.core.first(seq__6891_7083__$1);
var __7090 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6928_7089,(0),null);
var defs_7091 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6928_7089,(1),null);
var seq__6931_7092 = cljs.core.seq(defs_7091);
var chunk__6932_7093 = null;
var count__6933_7094 = (0);
var i__6934_7095 = (0);
while(true){
if((i__6934_7095 < count__6933_7094)){
var map__6937_7096 = chunk__6932_7093.cljs$core$IIndexed$_nth$arity$2(null,i__6934_7095);
var map__6937_7097__$1 = cljs.core.__destructure_map(map__6937_7096);
var body_7098 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6937_7097__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_7098);


var G__7099 = seq__6931_7092;
var G__7100 = chunk__6932_7093;
var G__7101 = count__6933_7094;
var G__7102 = (i__6934_7095 + (1));
seq__6931_7092 = G__7099;
chunk__6932_7093 = G__7100;
count__6933_7094 = G__7101;
i__6934_7095 = G__7102;
continue;
} else {
var temp__5825__auto___7103__$1 = cljs.core.seq(seq__6931_7092);
if(temp__5825__auto___7103__$1){
var seq__6931_7104__$1 = temp__5825__auto___7103__$1;
if(cljs.core.chunked_seq_QMARK_(seq__6931_7104__$1)){
var c__5694__auto___7105 = cljs.core.chunk_first(seq__6931_7104__$1);
var G__7106 = cljs.core.chunk_rest(seq__6931_7104__$1);
var G__7107 = c__5694__auto___7105;
var G__7108 = cljs.core.count(c__5694__auto___7105);
var G__7109 = (0);
seq__6931_7092 = G__7106;
chunk__6932_7093 = G__7107;
count__6933_7094 = G__7108;
i__6934_7095 = G__7109;
continue;
} else {
var map__6938_7110 = cljs.core.first(seq__6931_7104__$1);
var map__6938_7111__$1 = cljs.core.__destructure_map(map__6938_7110);
var body_7112 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6938_7111__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_7112);


var G__7113 = cljs.core.next(seq__6931_7104__$1);
var G__7114 = null;
var G__7115 = (0);
var G__7116 = (0);
seq__6931_7092 = G__7113;
chunk__6932_7093 = G__7114;
count__6933_7094 = G__7115;
i__6934_7095 = G__7116;
continue;
}
} else {
}
}
break;
}


var G__7117 = cljs.core.next(seq__6891_7083__$1);
var G__7118 = null;
var G__7119 = (0);
var G__7120 = (0);
seq__6891_7046 = G__7117;
chunk__6892_7047 = G__7118;
count__6893_7048 = G__7119;
i__6894_7049 = G__7120;
continue;
}
} else {
}
}
break;
}

datalog.core.check_unknown_rules_BANG_(all_clauses,parsed_rules);

var full = datalog.core.fixpoint(db,visible_QMARK_,parsed_rules);
var prune_QMARK_ = cljs.core.not(cljs.core.some(datalog.core.agg_find_QMARK_,find));
var bindings = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bindings,p__6939){
var vec__6940 = p__6939;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6940,(0),null);
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6940,(1),null);
var bs = datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6(bindings,clause,db,visible_QMARK_,(function (p1__6886_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(full,p1__6886_SHARP_,cljs.core.PersistentHashSet.EMPTY);
}),clause_cardinality);
if(prune_QMARK_){
return datalog.core.prune_bindings(bs,cljs.core.into.cljs$core$IFn$_invoke$arity$2(datalog.core.form_lvars(find),datalog.core.form_lvars(cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(where),(i + (1))))));
} else {
return bs;
}
}),cljs.core.PersistentHashSet.createAsIfByAssoc([initial_binding]),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,where));
return datalog.core.order_PLUS_limit(datalog.core.project(bindings,find),find,order_by,limit);
}));

(datalog.core.q.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=datalog.core.js.map
