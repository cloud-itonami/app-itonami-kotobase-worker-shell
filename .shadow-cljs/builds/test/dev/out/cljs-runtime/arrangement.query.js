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
 * How many quads `pattern` matches under `visible?` -- the same number as
 *   `(count (query db pattern visible?))`, without building the set.
 * 
 *   Delegates to `datalog.query/cardinality`.
 */
arrangement.query.cardinality = (function arrangement$query$cardinality(db,pattern,visible_QMARK_){
return datalog.query.cardinality(db,pattern,visible_QMARK_);
});

//# sourceMappingURL=arrangement.query.js.map
