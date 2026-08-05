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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (b,p__11832){
var vec__11833 = p__11832;
var term = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11833,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11833,(1),null);
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

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__11836_SHARP_){
return datalog.core.substitute(p1__11836_SHARP_,binding);
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
var G__11838 = arguments.length;
switch (G__11838) {
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
var seq__11839_12015 = cljs.core.seq(datalog.core.or_branches(clause));
var chunk__11840_12016 = null;
var count__11841_12017 = (0);
var i__11842_12018 = (0);
while(true){
if((i__11842_12018 < count__11841_12017)){
var branch_12019 = chunk__11840_12016.cljs$core$IIndexed$_nth$arity$2(null,i__11842_12018);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_12019))?datalog.core.and_clauses(branch_12019):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_12019], null)),bound_so_far);


var G__12020 = seq__11839_12015;
var G__12021 = chunk__11840_12016;
var G__12022 = count__11841_12017;
var G__12023 = (i__11842_12018 + (1));
seq__11839_12015 = G__12020;
chunk__11840_12016 = G__12021;
count__11841_12017 = G__12022;
i__11842_12018 = G__12023;
continue;
} else {
var temp__5825__auto___12024 = cljs.core.seq(seq__11839_12015);
if(temp__5825__auto___12024){
var seq__11839_12025__$1 = temp__5825__auto___12024;
if(cljs.core.chunked_seq_QMARK_(seq__11839_12025__$1)){
var c__5694__auto___12026 = cljs.core.chunk_first(seq__11839_12025__$1);
var G__12027 = cljs.core.chunk_rest(seq__11839_12025__$1);
var G__12028 = c__5694__auto___12026;
var G__12029 = cljs.core.count(c__5694__auto___12026);
var G__12030 = (0);
seq__11839_12015 = G__12027;
chunk__11840_12016 = G__12028;
count__11841_12017 = G__12029;
i__11842_12018 = G__12030;
continue;
} else {
var branch_12031 = cljs.core.first(seq__11839_12025__$1);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_12031))?datalog.core.and_clauses(branch_12031):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_12031], null)),bound_so_far);


var G__12032 = cljs.core.next(seq__11839_12025__$1);
var G__12033 = null;
var G__12034 = (0);
var G__12035 = (0);
seq__11839_12015 = G__12032;
chunk__11840_12016 = G__12033;
count__11841_12017 = G__12034;
i__11842_12018 = G__12035;
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
var seq__11843_12036 = cljs.core.seq(datalog.core.or_join_branches(clause));
var chunk__11844_12037 = null;
var count__11845_12038 = (0);
var i__11846_12039 = (0);
while(true){
if((i__11846_12039 < count__11845_12038)){
var branch_12040 = chunk__11844_12037.cljs$core$IIndexed$_nth$arity$2(null,i__11846_12039);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_12040))?datalog.core.and_clauses(branch_12040):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_12040], null)),bound_so_far);


var G__12041 = seq__11843_12036;
var G__12042 = chunk__11844_12037;
var G__12043 = count__11845_12038;
var G__12044 = (i__11846_12039 + (1));
seq__11843_12036 = G__12041;
chunk__11844_12037 = G__12042;
count__11845_12038 = G__12043;
i__11846_12039 = G__12044;
continue;
} else {
var temp__5825__auto___12045 = cljs.core.seq(seq__11843_12036);
if(temp__5825__auto___12045){
var seq__11843_12046__$1 = temp__5825__auto___12045;
if(cljs.core.chunked_seq_QMARK_(seq__11843_12046__$1)){
var c__5694__auto___12047 = cljs.core.chunk_first(seq__11843_12046__$1);
var G__12048 = cljs.core.chunk_rest(seq__11843_12046__$1);
var G__12049 = c__5694__auto___12047;
var G__12050 = cljs.core.count(c__5694__auto___12047);
var G__12051 = (0);
seq__11843_12036 = G__12048;
chunk__11844_12037 = G__12049;
count__11845_12038 = G__12050;
i__11846_12039 = G__12051;
continue;
} else {
var branch_12052 = cljs.core.first(seq__11843_12046__$1);
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$2(((datalog.core.and_clause_QMARK_(branch_12052))?datalog.core.and_clauses(branch_12052):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [branch_12052], null)),bound_so_far);


var G__12053 = cljs.core.next(seq__11843_12046__$1);
var G__12054 = null;
var G__12055 = (0);
var G__12056 = (0);
seq__11843_12036 = G__12053;
chunk__11844_12037 = G__12054;
count__11845_12038 = G__12055;
i__11846_12039 = G__12056;
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11847_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(r,p1__11847_SHARP_);
}),positions);
}),rows)], null);
})),cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__11850){
var vec__11851 = p__11850;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11851,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11851,(1),null);
return datalog.core.bound_positions(pattern,clause);
}),groups)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__11854){
var vec__11855 = p__11854;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11855,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11855,(1),null);
var positions = datalog.core.bound_positions(pattern,clause);
var key = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11848_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(pattern,p1__11848_SHARP_);
}),positions);
var matched = ((cljs.core.seq(positions))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(indexes,positions),key):rows);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__11849_SHARP_){
return datalog.core.unify_positional(binding,clause,p1__11849_SHARP_);
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
var G__11864 = arguments.length;
switch (G__11864) {
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
return cljs.core.seq(datalog.core.scan_STAR_(db,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11858_SHARP_){
return datalog.core.substitute(p1__11858_SHARP_,binding);
}),pattern),visible_QMARK_));
})),bindings);
} else {
if(datalog.core.rule_invocation_QMARK_(clause)){
var args = datalog.core.rule_args(clause);
var extension = (function (){var G__11865 = datalog.core.rule_name(clause);
return (extension_for.cljs$core$IFn$_invoke$arity$1 ? extension_for.cljs$core$IFn$_invoke$arity$1(G__11865) : extension_for.call(null,G__11865));
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (binding){
var substituted = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11859_SHARP_){
return datalog.core.substitute(p1__11859_SHARP_,binding);
}),args);
var matches_QMARK_ = (function (tuple){
return cljs.core.every_QMARK_(cljs.core.true_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (want,got){
return (((want == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(want,got)));
}),substituted,tuple));
});
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__11860_SHARP_){
return datalog.core.unify_positional(binding,args,p1__11860_SHARP_);
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11861_SHARP_){
return datalog.core.substitute(p1__11861_SHARP_,binding);
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__11866){
var vec__11867 = p__11866;
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11867,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11867,(1),null);
var rows = datalog.core.scan_STAR_(db,pattern,visible_QMARK_);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (binding){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__11862_SHARP_){
return datalog.core.unify_positional(binding,clause,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918).cljs$core$IFn$_invoke$arity$1(p1__11862_SHARP_),new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(p1__11862_SHARP_),new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(p1__11862_SHARP_)], null));
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
var grouped = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__11870){
var vec__11871 = p__11870;
var seq__11872 = cljs.core.seq(vec__11871);
var first__11873 = cljs.core.first(seq__11872);
var seq__11872__$1 = cljs.core.next(seq__11872);
var vec__11874 = first__11873;
var seq__11875 = cljs.core.seq(vec__11874);
var first__11876 = cljs.core.first(seq__11875);
var seq__11875__$1 = cljs.core.next(seq__11875);
var rname = first__11876;
var params = seq__11875__$1;
var body = seq__11872__$1;
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,rname,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"params","params",710516235),cljs.core.vec(params),new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.vec(body)], null));
}),cljs.core.PersistentArrayMap.EMPTY,rules);
var seq__11877_12058 = cljs.core.seq(grouped);
var chunk__11878_12059 = null;
var count__11879_12060 = (0);
var i__11880_12061 = (0);
while(true){
if((i__11880_12061 < count__11879_12060)){
var vec__11887_12062 = chunk__11878_12059.cljs$core$IIndexed$_nth$arity$2(null,i__11880_12061);
var rname_12063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11887_12062,(0),null);
var defs_12064 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11887_12062,(1),null);
var arities_12065 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,new cljs.core.Keyword(null,"params","params",710516235))),defs_12064);
if((cljs.core.count(arities_12065) > (1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule definitions for the same name must all declare the same arity",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_12063,new cljs.core.Keyword(null,"arities","arities",-1781122917),arities_12065], null));
} else {
}


var G__12066 = seq__11877_12058;
var G__12067 = chunk__11878_12059;
var G__12068 = count__11879_12060;
var G__12069 = (i__11880_12061 + (1));
seq__11877_12058 = G__12066;
chunk__11878_12059 = G__12067;
count__11879_12060 = G__12068;
i__11880_12061 = G__12069;
continue;
} else {
var temp__5825__auto___12070 = cljs.core.seq(seq__11877_12058);
if(temp__5825__auto___12070){
var seq__11877_12071__$1 = temp__5825__auto___12070;
if(cljs.core.chunked_seq_QMARK_(seq__11877_12071__$1)){
var c__5694__auto___12072 = cljs.core.chunk_first(seq__11877_12071__$1);
var G__12073 = cljs.core.chunk_rest(seq__11877_12071__$1);
var G__12074 = c__5694__auto___12072;
var G__12075 = cljs.core.count(c__5694__auto___12072);
var G__12076 = (0);
seq__11877_12058 = G__12073;
chunk__11878_12059 = G__12074;
count__11879_12060 = G__12075;
i__11880_12061 = G__12076;
continue;
} else {
var vec__11890_12077 = cljs.core.first(seq__11877_12071__$1);
var rname_12078 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11890_12077,(0),null);
var defs_12079 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11890_12077,(1),null);
var arities_12080 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.count,new cljs.core.Keyword(null,"params","params",710516235))),defs_12079);
if((cljs.core.count(arities_12080) > (1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule definitions for the same name must all declare the same arity",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_12078,new cljs.core.Keyword(null,"arities","arities",-1781122917),arities_12080], null));
} else {
}


var G__12081 = cljs.core.next(seq__11877_12071__$1);
var G__12082 = null;
var G__12083 = (0);
var G__12084 = (0);
seq__11877_12058 = G__12081;
chunk__11878_12059 = G__12082;
count__11879_12060 = G__12083;
i__11880_12061 = G__12084;
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
var seq__11893 = cljs.core.seq(clauses);
var chunk__11895 = null;
var count__11896 = (0);
var i__11897 = (0);
while(true){
if((i__11897 < count__11896)){
var clause = chunk__11895.cljs$core$IIndexed$_nth$arity$2(null,i__11897);
if(datalog.core.rule_invocation_QMARK_(clause)){
var rname_12085 = datalog.core.rule_name(clause);
if(cljs.core.contains_QMARK_(parsed_rules,rname_12085)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown rule invoked -- not defined in :rules",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_12085], null));
}

var map__11901_12086 = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed_rules,rname_12085));
var map__11901_12087__$1 = cljs.core.__destructure_map(map__11901_12086);
var params_12088 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11901_12087__$1,new cljs.core.Keyword(null,"params","params",710516235));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(params_12088),cljs.core.count(datalog.core.rule_args(clause)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule invoked with the wrong number of arguments",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_12085,new cljs.core.Keyword(null,"expected","expected",1583670997),cljs.core.count(params_12088),new cljs.core.Keyword(null,"got","got",-1674745710),cljs.core.count(datalog.core.rule_args(clause))], null));
} else {
}


var G__12089 = seq__11893;
var G__12090 = chunk__11895;
var G__12091 = count__11896;
var G__12092 = (i__11897 + (1));
seq__11893 = G__12089;
chunk__11895 = G__12090;
count__11896 = G__12091;
i__11897 = G__12092;
continue;
} else {
var G__12093 = seq__11893;
var G__12094 = chunk__11895;
var G__12095 = count__11896;
var G__12096 = (i__11897 + (1));
seq__11893 = G__12093;
chunk__11895 = G__12094;
count__11896 = G__12095;
i__11897 = G__12096;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__11893);
if(temp__5825__auto__){
var seq__11893__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11893__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__11893__$1);
var G__12097 = cljs.core.chunk_rest(seq__11893__$1);
var G__12098 = c__5694__auto__;
var G__12099 = cljs.core.count(c__5694__auto__);
var G__12100 = (0);
seq__11893 = G__12097;
chunk__11895 = G__12098;
count__11896 = G__12099;
i__11897 = G__12100;
continue;
} else {
var clause = cljs.core.first(seq__11893__$1);
if(datalog.core.rule_invocation_QMARK_(clause)){
var rname_12101 = datalog.core.rule_name(clause);
if(cljs.core.contains_QMARK_(parsed_rules,rname_12101)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: unknown rule invoked -- not defined in :rules",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_12101], null));
}

var map__11902_12102 = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed_rules,rname_12101));
var map__11902_12103__$1 = cljs.core.__destructure_map(map__11902_12102);
var params_12104 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11902_12103__$1,new cljs.core.Keyword(null,"params","params",710516235));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(params_12104),cljs.core.count(datalog.core.rule_args(clause)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datalog.core: rule invoked with the wrong number of arguments",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"rule","rule",729973257),rname_12101,new cljs.core.Keyword(null,"expected","expected",1583670997),cljs.core.count(params_12104),new cljs.core.Keyword(null,"got","got",-1674745710),cljs.core.count(datalog.core.rule_args(clause))], null));
} else {
}


var G__12105 = cljs.core.next(seq__11893__$1);
var G__12106 = null;
var G__12107 = (0);
var G__12108 = (0);
seq__11893 = G__12105;
chunk__11895 = G__12106;
count__11896 = G__12107;
i__11897 = G__12108;
continue;
} else {
var G__12109 = cljs.core.next(seq__11893__$1);
var G__12110 = null;
var G__12111 = (0);
var G__12112 = (0);
seq__11893 = G__12109;
chunk__11895 = G__12110;
count__11896 = G__12111;
i__11897 = G__12112;
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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bindings,p__11903){
var vec__11904 = p__11903;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11904,(0),null);
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11904,(1),null);
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11907_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__11907_SHARP_);
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
var seed = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__11908){
var vec__11909 = p__11908;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11909,(0),null);
var defs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11909,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,rname,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__11912){
var map__11913 = p__11912;
var map__11913__$1 = cljs.core.__destructure_map(map__11913);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11913__$1,new cljs.core.Keyword(null,"params","params",710516235));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11913__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
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
return (function (acc,p__11924){
var vec__11925 = p__11924;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11925,(0),null);
var defs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11925,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,rname,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(((function (full,delta,iterations,vec__11925,rname,defs,seed){
return (function (p__11928){
var map__11929 = p__11928;
var map__11929__$1 = cljs.core.__destructure_map(map__11929);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11929__$1,new cljs.core.Keyword(null,"params","params",710516235));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11929__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var idxs = datalog.core.rule_invocation_indices(body);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (full,delta,iterations,idxs,map__11929,map__11929__$1,params,body,vec__11925,rname,defs,seed){
return (function (delta_idx){
return datalog.core.project_params(datalog.core.eval_body_variant(db,visible_QMARK_,body,full,delta,delta_idx),params);
});})(full,delta,iterations,idxs,map__11929,map__11929__$1,params,body,vec__11925,rname,defs,seed))
,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([idxs], 0));
});})(full,delta,iterations,vec__11925,rname,defs,seed))
),defs));
});})(full,delta,iterations,seed))
,cljs.core.PersistentArrayMap.EMPTY,parsed_rules);
var new_delta = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (full,delta,iterations,candidates,seed){
return (function (p__11930){
var vec__11931 = p__11930;
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11931,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11931,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rname,clojure.set.difference.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(candidates,rname,cljs.core.PersistentHashSet.EMPTY),cljs.core.get.cljs$core$IFn$_invoke$arity$3(full,rname,cljs.core.PersistentHashSet.EMPTY))], null);
});})(full,delta,iterations,candidates,seed))
),parsed_rules);
var full_SINGLEQUOTE_ = cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(clojure.set.union,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([full,new_delta], 0));
var G__12113 = full_SINGLEQUOTE_;
var G__12114 = new_delta;
var G__12115 = (iterations + (1));
full = G__12113;
delta = G__12114;
iterations = G__12115;
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__11934_SHARP_){
return cljs.core.select_keys(p1__11934_SHARP_,needed);
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
var G__11939 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11935_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__11935_SHARP_,datalog.core.agg_var(f));
}),group_bindings);
var fexpr__11938 = datalog.core.agg_fn(f);
return (fexpr__11938.cljs$core$IFn$_invoke$arity$1 ? fexpr__11938.cljs$core$IFn$_invoke$arity$1(G__11939) : fexpr__11938.call(null,G__11939));
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.first(group_bindings),f);
}
}),find);
});
if(cljs.core.empty_QMARK_(group_vars)){
return cljs.core.PersistentHashSet.createAsIfByAssoc([row(bindings)]);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__11940){
var vec__11941 = p__11940;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11941,(0),null);
var group_bindings = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11941,(1),null);
return row(group_bindings);
})),cljs.core.group_by((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11936_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__11936_SHARP_);
}),group_vars);
}),bindings));
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (binding){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11937_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(binding,p1__11937_SHARP_);
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
return cljs.core.cons(clause,(function (){var G__11944 = datalog.core.or_branches(clause);
return (datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1 ? datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1(G__11944) : datalog.core.flatten_clauses.call(null,G__11944));
})());
} else {
if(datalog.core.or_join_clause_QMARK_(clause)){
return cljs.core.cons(clause,(function (){var G__11945 = datalog.core.or_join_branches(clause);
return (datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1 ? datalog.core.flatten_clauses.cljs$core$IFn$_invoke$arity$1(G__11945) : datalog.core.flatten_clauses.call(null,G__11945));
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
var vec__11946 = (cljs.core.truth_((function (){var and__5160__auto__ = cljs.core.vector_QMARK_(element);
if(and__5160__auto__){
var G__11950 = cljs.core.second(element);
var fexpr__11949 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"desc","desc",2093485764),null,new cljs.core.Keyword(null,"asc","asc",356854569),null], null), null);
return (fexpr__11949.cljs$core$IFn$_invoke$arity$1 ? fexpr__11949.cljs$core$IFn$_invoke$arity$1(G__11950) : fexpr__11949.call(null,G__11950));
} else {
return and__5160__auto__;
}
})())?element:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [element,new cljs.core.Keyword(null,"asc","asc",356854569)], null));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11946,(0),null);
var dir = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11946,(1),null);
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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,p__11951){
var vec__11952 = p__11951;
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11952,(0),null);
var dir = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11952,(1),null);
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
var ordered = ((cljs.core.seq(spec))?cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$2((function (p1__11955_SHARP_,p2__11956_SHARP_){
return datalog.core.compare_rows(spec,p1__11955_SHARP_,p2__11956_SHARP_);
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
var G__11959 = arguments.length;
switch (G__11959) {
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

(datalog.core.q.cljs$core$IFn$_invoke$arity$4 = (function (db,p__11960,visible_QMARK_,inputs){
var map__11961 = p__11960;
var map__11961__$1 = cljs.core.__destructure_map(map__11961);
var find = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11961__$1,new cljs.core.Keyword(null,"find","find",496279456));
var where = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11961__$1,new cljs.core.Keyword(null,"where","where",-2044795965));
var rules = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11961__$1,new cljs.core.Keyword(null,"rules","rules",1198912366));
var in$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11961__$1,new cljs.core.Keyword(null,"in","in",-1531184865));
var order_by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11961__$1,new cljs.core.Keyword(null,"order-by","order-by",1527318070));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11961__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var clause_cardinality = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11961__$1,new cljs.core.Keyword(null,"clause-cardinality","clause-cardinality",-1709612991));
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

var seq__11962_12117 = cljs.core.seq(parsed_rules);
var chunk__11963_12118 = null;
var count__11964_12119 = (0);
var i__11965_12120 = (0);
while(true){
if((i__11965_12120 < count__11964_12119)){
var vec__11988_12121 = chunk__11963_12118.cljs$core$IIndexed$_nth$arity$2(null,i__11965_12120);
var __12122 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11988_12121,(0),null);
var defs_12123 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11988_12121,(1),null);
var seq__11991_12124 = cljs.core.seq(defs_12123);
var chunk__11992_12125 = null;
var count__11993_12126 = (0);
var i__11994_12127 = (0);
while(true){
if((i__11994_12127 < count__11993_12126)){
var map__11997_12128 = chunk__11992_12125.cljs$core$IIndexed$_nth$arity$2(null,i__11994_12127);
var map__11997_12129__$1 = cljs.core.__destructure_map(map__11997_12128);
var body_12130 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11997_12129__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_12130);


var G__12131 = seq__11991_12124;
var G__12132 = chunk__11992_12125;
var G__12133 = count__11993_12126;
var G__12134 = (i__11994_12127 + (1));
seq__11991_12124 = G__12131;
chunk__11992_12125 = G__12132;
count__11993_12126 = G__12133;
i__11994_12127 = G__12134;
continue;
} else {
var temp__5825__auto___12135 = cljs.core.seq(seq__11991_12124);
if(temp__5825__auto___12135){
var seq__11991_12136__$1 = temp__5825__auto___12135;
if(cljs.core.chunked_seq_QMARK_(seq__11991_12136__$1)){
var c__5694__auto___12137 = cljs.core.chunk_first(seq__11991_12136__$1);
var G__12138 = cljs.core.chunk_rest(seq__11991_12136__$1);
var G__12139 = c__5694__auto___12137;
var G__12140 = cljs.core.count(c__5694__auto___12137);
var G__12141 = (0);
seq__11991_12124 = G__12138;
chunk__11992_12125 = G__12139;
count__11993_12126 = G__12140;
i__11994_12127 = G__12141;
continue;
} else {
var map__11998_12142 = cljs.core.first(seq__11991_12136__$1);
var map__11998_12143__$1 = cljs.core.__destructure_map(map__11998_12142);
var body_12144 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11998_12143__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_12144);


var G__12145 = cljs.core.next(seq__11991_12136__$1);
var G__12146 = null;
var G__12147 = (0);
var G__12148 = (0);
seq__11991_12124 = G__12145;
chunk__11992_12125 = G__12146;
count__11993_12126 = G__12147;
i__11994_12127 = G__12148;
continue;
}
} else {
}
}
break;
}


var G__12149 = seq__11962_12117;
var G__12150 = chunk__11963_12118;
var G__12151 = count__11964_12119;
var G__12152 = (i__11965_12120 + (1));
seq__11962_12117 = G__12149;
chunk__11963_12118 = G__12150;
count__11964_12119 = G__12151;
i__11965_12120 = G__12152;
continue;
} else {
var temp__5825__auto___12153 = cljs.core.seq(seq__11962_12117);
if(temp__5825__auto___12153){
var seq__11962_12154__$1 = temp__5825__auto___12153;
if(cljs.core.chunked_seq_QMARK_(seq__11962_12154__$1)){
var c__5694__auto___12155 = cljs.core.chunk_first(seq__11962_12154__$1);
var G__12156 = cljs.core.chunk_rest(seq__11962_12154__$1);
var G__12157 = c__5694__auto___12155;
var G__12158 = cljs.core.count(c__5694__auto___12155);
var G__12159 = (0);
seq__11962_12117 = G__12156;
chunk__11963_12118 = G__12157;
count__11964_12119 = G__12158;
i__11965_12120 = G__12159;
continue;
} else {
var vec__11999_12160 = cljs.core.first(seq__11962_12154__$1);
var __12161 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11999_12160,(0),null);
var defs_12162 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11999_12160,(1),null);
var seq__12002_12163 = cljs.core.seq(defs_12162);
var chunk__12003_12164 = null;
var count__12004_12165 = (0);
var i__12005_12166 = (0);
while(true){
if((i__12005_12166 < count__12004_12165)){
var map__12008_12167 = chunk__12003_12164.cljs$core$IIndexed$_nth$arity$2(null,i__12005_12166);
var map__12008_12168__$1 = cljs.core.__destructure_map(map__12008_12167);
var body_12169 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12008_12168__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_12169);


var G__12170 = seq__12002_12163;
var G__12171 = chunk__12003_12164;
var G__12172 = count__12004_12165;
var G__12173 = (i__12005_12166 + (1));
seq__12002_12163 = G__12170;
chunk__12003_12164 = G__12171;
count__12004_12165 = G__12172;
i__12005_12166 = G__12173;
continue;
} else {
var temp__5825__auto___12174__$1 = cljs.core.seq(seq__12002_12163);
if(temp__5825__auto___12174__$1){
var seq__12002_12175__$1 = temp__5825__auto___12174__$1;
if(cljs.core.chunked_seq_QMARK_(seq__12002_12175__$1)){
var c__5694__auto___12176 = cljs.core.chunk_first(seq__12002_12175__$1);
var G__12177 = cljs.core.chunk_rest(seq__12002_12175__$1);
var G__12178 = c__5694__auto___12176;
var G__12179 = cljs.core.count(c__5694__auto___12176);
var G__12180 = (0);
seq__12002_12163 = G__12177;
chunk__12003_12164 = G__12178;
count__12004_12165 = G__12179;
i__12005_12166 = G__12180;
continue;
} else {
var map__12009_12181 = cljs.core.first(seq__12002_12175__$1);
var map__12009_12182__$1 = cljs.core.__destructure_map(map__12009_12181);
var body_12183 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12009_12182__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
datalog.core.check_clause_safety_BANG_.cljs$core$IFn$_invoke$arity$1(body_12183);


var G__12184 = cljs.core.next(seq__12002_12175__$1);
var G__12185 = null;
var G__12186 = (0);
var G__12187 = (0);
seq__12002_12163 = G__12184;
chunk__12003_12164 = G__12185;
count__12004_12165 = G__12186;
i__12005_12166 = G__12187;
continue;
}
} else {
}
}
break;
}


var G__12188 = cljs.core.next(seq__11962_12154__$1);
var G__12189 = null;
var G__12190 = (0);
var G__12191 = (0);
seq__11962_12117 = G__12188;
chunk__11963_12118 = G__12189;
count__11964_12119 = G__12190;
i__11965_12120 = G__12191;
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
var bindings = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bindings,p__12010){
var vec__12011 = p__12010;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12011,(0),null);
var clause = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12011,(1),null);
var bs = datalog.core.join_clause.cljs$core$IFn$_invoke$arity$6(bindings,clause,db,visible_QMARK_,(function (p1__11957_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(full,p1__11957_SHARP_,cljs.core.PersistentHashSet.EMPTY);
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
