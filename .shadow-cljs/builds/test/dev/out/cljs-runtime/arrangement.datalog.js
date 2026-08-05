goog.provide('arrangement.datalog');
/**
 * `{:find [?var ...] :in [?param ...] :where [[e a v] ...] :rules [...]}`
 *   over `db`. `visible?` is required and threaded into every underlying
 *   `arrangement.query/query` call (ADR-2607050500). Returns a set of
 *   `:find`-ordered vectors, or a VECTOR when `:order-by`/`:limit` is
 *   supplied, because an ordered result is a sequence.
 * 
 *   Delegates to `datalog.core/q`; see that var's docstring for the full
 *   clause grammar, the aggregate forms, and the `:clause-cardinality` hint.
 */
arrangement.datalog.q = (function arrangement$datalog$q(var_args){
var G__7122 = arguments.length;
switch (G__7122) {
case 3:
return arrangement.datalog.q.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return arrangement.datalog.q.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(arrangement.datalog.q.cljs$core$IFn$_invoke$arity$3 = (function (db,query,visible_QMARK_){
return datalog.core.q.cljs$core$IFn$_invoke$arity$3(db,query,visible_QMARK_);
}));

(arrangement.datalog.q.cljs$core$IFn$_invoke$arity$4 = (function (db,query,visible_QMARK_,inputs){
return datalog.core.q.cljs$core$IFn$_invoke$arity$4(db,query,visible_QMARK_,inputs);
}));

(arrangement.datalog.q.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=arrangement.datalog.js.map
