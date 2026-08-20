goog.provide('arrangement.query');
/**
 * `pattern` is `[s p o]`, any position `nil` for wildcard. `visible?` is
 *   applied as a post-filter over every candidate quad before it's returned.
 *   Returns a set of matching `{:s :p :o}` quads.
 * 
 *   Delegates to `datalog.query/query`.
 */
arrangement.query.query = (function arrangement$query$query(db,pattern,visible_QMARK_){
return datalog.query.query(db,pattern,visible_QMARK_);
});
/**
 * Quads of `attr` whose object is in `[lo, hi)` under `visible?`.
 * 
 *   Delegates to `datalog.query/query-range`.
 */
arrangement.query.query_range = (function arrangement$query$query_range(var_args){
var G__11446 = arguments.length;
switch (G__11446) {
case 5:
return arrangement.query.query_range.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return arrangement.query.query_range.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(arrangement.query.query_range.cljs$core$IFn$_invoke$arity$5 = (function (db,attr,lo,hi,visible_QMARK_){
return datalog.query.query_range.cljs$core$IFn$_invoke$arity$5(db,attr,lo,hi,visible_QMARK_);
}));

(arrangement.query.query_range.cljs$core$IFn$_invoke$arity$6 = (function (db,attr,lo,hi,visible_QMARK_,opts){
return datalog.query.query_range.cljs$core$IFn$_invoke$arity$6(db,attr,lo,hi,visible_QMARK_,opts);
}));

(arrangement.query.query_range.cljs$lang$maxFixedArity = 6);

/**
 * How many quads `pattern` matches under `visible?` -- the same number as
 *   `(count (query db pattern visible?))`, without building the set.
 * 
 *   Delegates to `datalog.query/cardinality`.
 */
arrangement.query.cardinality = (function arrangement$query$cardinality(db,pattern,visible_QMARK_){
return datalog.query.cardinality(db,pattern,visible_QMARK_);
});
/**
 * Cheap index-derived upper bound for planning. Unlike `cardinality`, this
 *   does not invoke visibility filtering and may overestimate visible rows.
 * 
 *   Delegates to `datalog.query/estimate-cardinality`.
 */
arrangement.query.estimate_cardinality = (function arrangement$query$estimate_cardinality(db,pattern){
return datalog.query.estimate_cardinality(db,pattern);
});

//# sourceMappingURL=arrangement.query.js.map
