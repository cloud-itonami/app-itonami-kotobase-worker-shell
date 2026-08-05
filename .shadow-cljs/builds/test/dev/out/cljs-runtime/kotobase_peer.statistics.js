goog.provide('kotobase_peer.statistics');
/**
 * M5: Construct cardinality estimates by index and key prefix.
 * 
 * Scans visible-rows to compute:
 * - Full cardinality (total rows)
 * - Prefix cardinalities (grouping by first 2 components)
 * - Average cardinality per prefix
 * 
 * Used by join planner to estimate selectivity.
 * 
 * Returns: {:index :full-cardinality :prefix-cardinalities :average-cardinality-per-prefix}
 */
kotobase_peer.statistics.build_cardinality_histogram = (function kotobase_peer$statistics$build_cardinality_histogram(index,rows){
var full_card = cljs.core.count(rows);
var by_prefix = cljs.core.frequencies(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (row){
var comps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(row,"components");
return cljs.core.take.cljs$core$IFn$_invoke$arity$2((2),comps);
}),rows));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"index","index",-1531685915),index,new cljs.core.Keyword(null,"full-cardinality","full-cardinality",-1391995556),full_card,new cljs.core.Keyword(null,"prefix-cardinalities","prefix-cardinalities",1679816443),by_prefix,new cljs.core.Keyword(null,"average-cardinality-per-prefix","average-cardinality-per-prefix",-1275440289),((cljs.core.seq(by_prefix))?(full_card / cljs.core.count(by_prefix)):0.0)], null);
});
/**
 * M5: Build histograms for all indexes in a manifest. Full run objects
 * produce prefix histograms; persisted run refs fall back to their counts.
 * 
 * Returns map: {:eavt {...} :aevt {...} :avet {...} :vaet {...}}
 */
kotobase_peer.statistics.build_index_statistics = (function kotobase_peer$statistics$build_index_statistics(manifest){
var indexes_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"node","node",581201198).cljs$core$IFn$_invoke$arity$1(manifest),"indexes");
var epoch = new cljs.core.Keyword(null,"epoch","epoch",1435633666).cljs$core$IFn$_invoke$arity$1(manifest);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__8750){
var vec__8751 = p__8750;
var index_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8751,(0),null);
var levels = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8751,(1),null);
var index = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(index_name);
var refs = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.val,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([levels], 0));
var rows = cljs.core.vec(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__8748_SHARP_){
return (cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__8748_SHARP_,"epoch") <= epoch);
}),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__8747_SHARP_){
var temp__5823__auto__ = new cljs.core.Keyword(null,"node","node",581201198).cljs$core$IFn$_invoke$arity$1(p1__8747_SHARP_);
if(cljs.core.truth_(temp__5823__auto__)){
var node = temp__5823__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(node,"rows");
} else {
return cljs.core.PersistentVector.EMPTY;
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([refs], 0))));
if(cljs.core.seq(rows)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [index,kotobase_peer.statistics.build_cardinality_histogram(index,rows)], null);
} else {
var cardinality = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__8749_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(p1__8749_SHARP_,"count",(0));
}),refs));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [index,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"index","index",-1531685915),index,new cljs.core.Keyword(null,"full-cardinality","full-cardinality",-1391995556),cardinality,new cljs.core.Keyword(null,"prefix-cardinalities","prefix-cardinalities",1679816443),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"average-cardinality-per-prefix","average-cardinality-per-prefix",-1275440289),0.0], null)], null);
}
}),indexes_map));
});
/**
 * M5: Estimate selectivity of a join condition.
 * 
 * Returns factor in (0..1]:
 * - 1.0 if no histograms available (conservative)
 * - min(card-a, card-b) / max(card-a, card-b) otherwise
 * 
 * Assumes join is on common components; result is multiplicative reduction
 * from earlier stage cardinality.
 */
kotobase_peer.statistics.selectivity_estimate = (function kotobase_peer$statistics$selectivity_estimate(histograms,left_index,right_index){
var left_hist = cljs.core.get.cljs$core$IFn$_invoke$arity$2(histograms,left_index);
var right_hist = cljs.core.get.cljs$core$IFn$_invoke$arity$2(histograms,right_index);
if(cljs.core.truth_((function (){var and__5160__auto__ = left_hist;
if(cljs.core.truth_(and__5160__auto__)){
return right_hist;
} else {
return and__5160__auto__;
}
})())){
var left_card = new cljs.core.Keyword(null,"full-cardinality","full-cardinality",-1391995556).cljs$core$IFn$_invoke$arity$2(left_hist,(1));
var right_card = new cljs.core.Keyword(null,"full-cardinality","full-cardinality",-1391995556).cljs$core$IFn$_invoke$arity$2(right_hist,(1));
var estimated_match = cljs.core.min.cljs$core$IFn$_invoke$arity$2(left_card,right_card);
return (estimated_match / cljs.core.max.cljs$core$IFn$_invoke$arity$variadic(left_card,right_card,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(1)], 0)));
} else {
return 1.0;
}
});
/**
 * M5: Optimize multi-index join order using cardinality histograms.
 * 
 * Greedy strategy: pick smallest index first, then process remaining
 * in order of increasing selectivity * current-rows.
 * 
 * Input: {:query-indexes [:eavt :aevt :avet] ...}
 * Returns: sequence of join steps with estimated cost at each stage.
 */
kotobase_peer.statistics.plan_join_order = (function kotobase_peer$statistics$plan_join_order(query,histograms){
var indexes = cljs.core.vec((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"query-indexes","query-indexes",-615841257).cljs$core$IFn$_invoke$arity$1(query);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073)], null);
}
})());
var base_index = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.min_key,(function (p1__8754_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(histograms,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8754_SHARP_,new cljs.core.Keyword(null,"full-cardinality","full-cardinality",-1391995556)], null),Infinity);
}),indexes);
var base_card = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(histograms,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [base_index,new cljs.core.Keyword(null,"full-cardinality","full-cardinality",-1391995556)], null),1.0);
var remaining_indexes = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.createAsIfByAssoc([base_index]),indexes);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"step","step",1288888124),(0),new cljs.core.Keyword(null,"index","index",-1531685915),base_index,new cljs.core.Keyword(null,"estimated-rows","estimated-rows",1235608148),base_card], null),(function (){var remaining = remaining_indexes;
var steps = cljs.core.PersistentVector.EMPTY;
var current_card = base_card;
var step_num = (1);
while(true){
if(cljs.core.seq(remaining)){
var selectivities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (remaining,steps,current_card,step_num,indexes,base_index,base_card,remaining_indexes){
return (function (idx){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,kotobase_peer.statistics.selectivity_estimate(histograms,base_index,idx)], null);
});})(remaining,steps,current_card,step_num,indexes,base_index,base_card,remaining_indexes))
,remaining);
var vec__8758 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.min_key,cljs.core.second,selectivities);
var next_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8758,(0),null);
var selectivity = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8758,(1),null);
var next_card = (current_card * selectivity);
var G__8783 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.createAsIfByAssoc([next_idx]),remaining);
var G__8784 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(steps,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"step","step",1288888124),step_num,new cljs.core.Keyword(null,"index","index",-1531685915),next_idx,new cljs.core.Keyword(null,"selectivity","selectivity",-1804444859),selectivity,new cljs.core.Keyword(null,"estimated-rows","estimated-rows",1235608148),next_card], null));
var G__8785 = next_card;
var G__8786 = (step_num + (1));
remaining = G__8783;
steps = G__8784;
current_card = G__8785;
step_num = G__8786;
continue;
} else {
return steps;
}
break;
}
})());
});
/**
 * Greedy connected join order for portable host executors. CLAUSES contain
 *   {:id, :estimated-rows, :vars}. Prefer a clause sharing already-bound vars,
 *   then the lowest estimated cardinality. Returns immutable plan steps.
 */
kotobase_peer.statistics.plan_clause_order = (function kotobase_peer$statistics$plan_clause_order(clauses){
var remaining = cljs.core.vec(clauses);
var bound = cljs.core.PersistentHashSet.EMPTY;
var result = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(remaining)){
return result;
} else {
var connected_QMARK_ = ((function (remaining,bound,result){
return (function (clause){
return cljs.core.seq(clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(bound,new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(clause)));
});})(remaining,bound,result))
;
var candidates = ((cljs.core.seq(bound))?(function (){var connected = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(connected_QMARK_,remaining);
if(cljs.core.seq(connected)){
return connected;
} else {
return remaining;
}
})():remaining);
var next_clause = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.min_key,((function (remaining,bound,result,connected_QMARK_,candidates){
return (function (p1__8761_SHARP_){
var or__5162__auto__ = new cljs.core.Keyword(null,"estimated-rows","estimated-rows",1235608148).cljs$core$IFn$_invoke$arity$1(p1__8761_SHARP_);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return Number.MAX_SAFE_INTEGER;
}
});})(remaining,bound,result,connected_QMARK_,candidates))
,candidates);
var G__8787 = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (remaining,bound,result,connected_QMARK_,candidates,next_clause){
return (function (p1__8762_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(p1__8762_SHARP_),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(next_clause));
});})(remaining,bound,result,connected_QMARK_,candidates,next_clause))
,remaining));
var G__8788 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(bound,new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(next_clause));
var G__8789 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(next_clause,new cljs.core.Keyword(null,"step","step",1288888124),cljs.core.count(result),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"bound-vars-after","bound-vars-after",1640680338),cljs.core.into.cljs$core$IFn$_invoke$arity$2(bound,new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(next_clause))], 0)));
remaining = G__8787;
bound = G__8788;
result = G__8789;
continue;
}
break;
}
});
kotobase_peer.statistics.matches_triple_pattern_QMARK_ = (function kotobase_peer$statistics$matches_triple_pattern_QMARK_(p__8763,p__8764){
var vec__8765 = p__8763;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8765,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8765,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8765,(2),null);
var map__8768 = p__8764;
var map__8768__$1 = cljs.core.__destructure_map(map__8768);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8768__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8768__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8768__$1,new cljs.core.Keyword(null,"v","v",21465059));
return cljs.core.every_QMARK_(cljs.core.true_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (expected,actual){
return (((expected == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected,actual)));
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null)));
});
/**
 * Apply effective datom deltas to scoped clause cardinalities at NEW-EPOCH.
 *   CHANGES must already be normalized state transitions (`:assert` adds one,
 *   `:retract` removes one), not raw duplicate transaction requests. Underflow
 *   is rejected so corrupt/drifted statistics cannot be published silently.
 */
kotobase_peer.statistics.refresh_query_statistics = (function kotobase_peer$statistics$refresh_query_statistics(p__8769,changes,new_epoch){
var map__8770 = p__8769;
var map__8770__$1 = cljs.core.__destructure_map(map__8770);
var visibility_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8770__$1,new cljs.core.Keyword(null,"visibility-scope","visibility-scope",176238632));
var clauses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8770__$1,new cljs.core.Keyword(null,"clauses","clauses",1454841241));
var epoch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8770__$1,new cljs.core.Keyword(null,"epoch","epoch",1435633666));
if(((cljs.core.integer_QMARK_(new_epoch)) && ((new_epoch > (function (){var or__5162__auto__ = epoch;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (-1);
}
})())))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Statistics refresh epoch must advance",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-epoch","current-epoch",1893520126),epoch,new cljs.core.Keyword(null,"new-epoch","new-epoch",1213173057),new_epoch], null));
}

var updated = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__8771){
var map__8772 = p__8771;
var map__8772__$1 = cljs.core.__destructure_map(map__8772);
var clause = map__8772__$1;
var pattern = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8772__$1,new cljs.core.Keyword(null,"pattern","pattern",242135423));
var rows = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8772__$1,new cljs.core.Keyword(null,"rows","rows",850049680));
var delta = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (total,p__8773){
var map__8774 = p__8773;
var map__8774__$1 = cljs.core.__destructure_map(map__8774);
var change = map__8774__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8774__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
if(kotobase_peer.statistics.matches_triple_pattern_QMARK_(pattern,change)){
return (total + (function (){var G__8775 = op;
var G__8775__$1 = (((G__8775 instanceof cljs.core.Keyword))?G__8775.fqn:null);
switch (G__8775__$1) {
case "assert":
return (1);

break;
case "retract":
return (-1);

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Unknown statistics delta op",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),op], null));

}
})());
} else {
return total;
}
}),(0),changes);
var next_rows = (rows + delta);
if((next_rows < (0))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Query statistics cardinality underflow",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pattern","pattern",242135423),pattern,new cljs.core.Keyword(null,"rows","rows",850049680),rows,new cljs.core.Keyword(null,"delta","delta",108939957),delta], null));
} else {
}

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(clause,new cljs.core.Keyword(null,"rows","rows",850049680),next_rows);
}),clauses);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"visibility-scope","visibility-scope",176238632),visibility_scope,new cljs.core.Keyword(null,"epoch","epoch",1435633666),new_epoch,new cljs.core.Keyword(null,"clauses","clauses",1454841241),updated], null);
});
/**
 * True when scoped statistics may plan QUERY-EPOCH within MAX-AGE epochs.
 *   A nil query epoch keeps backward compatibility for callers without MVCC.
 */
kotobase_peer.statistics.query_statistics_fresh_QMARK_ = (function kotobase_peer$statistics$query_statistics_fresh_QMARK_(statistics_epoch,query_epoch,max_age){
return (((query_epoch == null)) || (((cljs.core.integer_QMARK_(statistics_epoch)) && (((cljs.core.integer_QMARK_(query_epoch)) && ((((statistics_epoch <= query_epoch)) && (((query_epoch - statistics_epoch) <= (function (){var or__5162__auto____$1 = max_age;
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return (0);
}
})())))))))));
});
/**
 * M5: Define an incremental materialized arrangement.
 * 
 * Arrangement = pre-computed query result updated atomically with manifest publishes.
 * 
 * Example: MaterializedView of (find ?e ?a where [?e :type/resource] [?e ?a])
 * is updated every time new [e type/resource] datom is flushed.
 * 
 * Returns: arrangement descriptor with materialization status.
 */
kotobase_peer.statistics.delta_arrangement = (function kotobase_peer$statistics$delta_arrangement(p__8776){
var map__8777 = p__8776;
var map__8777__$1 = cljs.core.__destructure_map(map__8777);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8777__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var query_pattern = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8777__$1,new cljs.core.Keyword(null,"query-pattern","query-pattern",2084624577));
var base_index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8777__$1,new cljs.core.Keyword(null,"base-index","base-index",-865646491));
var delta_index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8777__$1,new cljs.core.Keyword(null,"delta-index","delta-index",-134064298));
var manifest_cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8777__$1,new cljs.core.Keyword(null,"manifest-cid","manifest-cid",-215877857));
var epoch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8777__$1,new cljs.core.Keyword(null,"epoch","epoch",1435633666));
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword("arrangement","delta-index","arrangement/delta-index",-173550524),new cljs.core.Keyword("arrangement","name","arrangement/name",1603195719),new cljs.core.Keyword("arrangement","manifest-cid","arrangement/manifest-cid",-239504823),new cljs.core.Keyword("arrangement","epoch","arrangement/epoch",1328448780),new cljs.core.Keyword("arrangement","rows","arrangement/rows",760626582),new cljs.core.Keyword("arrangement","materialized?","arrangement/materialized?",1938491005),new cljs.core.Keyword("arrangement","update-plan","arrangement/update-plan",124993055),new cljs.core.Keyword("arrangement","base-index","arrangement/base-index",-1023621281),new cljs.core.Keyword("arrangement","query-pattern","arrangement/query-pattern",1873171391)],[delta_index,name,manifest_cid,epoch,cljs.core.PersistentVector.EMPTY,false,null,base_index,query_pattern]);
});
/**
 * M5 low-level datom arrangement update. General Datalog result maintenance
 * lives in kotobase-peer.datalog-materialization.
 * 
 * When new datoms are flushed:
 * 1. Apply delta (new assertions/retractions) to materialized result
 * 2. Record which arrangements to update
 * 3. Attach update to manifest publish (same atomic epoch)
 * 
 * Returns a deterministic updated arrangement; wall-clock state is forbidden
 * from the pure kernel.
 */
kotobase_peer.statistics.maintain_materialized_delta = (function kotobase_peer$statistics$maintain_materialized_delta(var_args){
var G__8779 = arguments.length;
switch (G__8779) {
case 2:
return kotobase_peer.statistics.maintain_materialized_delta.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return kotobase_peer.statistics.maintain_materialized_delta.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.statistics.maintain_materialized_delta.cljs$core$IFn$_invoke$arity$2 = (function (arrangement__$1,new_datoms){
return kotobase_peer.statistics.maintain_materialized_delta.cljs$core$IFn$_invoke$arity$3(arrangement__$1,new_datoms,((function (){var or__5162__auto__ = new cljs.core.Keyword("arrangement","epoch","arrangement/epoch",1328448780).cljs$core$IFn$_invoke$arity$1(arrangement__$1);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (-1);
}
})() + (1)));
}));

(kotobase_peer.statistics.maintain_materialized_delta.cljs$core$IFn$_invoke$arity$3 = (function (arrangement__$1,new_datoms,new_epoch){
if(((cljs.core.integer_QMARK_(new_epoch)) && ((new_epoch > (function (){var or__5162__auto__ = new cljs.core.Keyword("arrangement","epoch","arrangement/epoch",1328448780).cljs$core$IFn$_invoke$arity$1(arrangement__$1);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (-1);
}
})())))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Arrangement epoch must advance",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.Keyword("arrangement","epoch","arrangement/epoch",1328448780).cljs$core$IFn$_invoke$arity$1(arrangement__$1),new cljs.core.Keyword(null,"new","new",-2085437848),new_epoch], null));
}

var delta_rows = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__8780){
var map__8781 = p__8780;
var map__8781__$1 = cljs.core.__destructure_map(map__8781);
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8781__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8781__$1,new cljs.core.Keyword(null,"a","a",-2123407586));
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8781__$1,new cljs.core.Keyword(null,"v","v",21465059));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8781__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"e","e",1381269198),e,new cljs.core.Keyword(null,"a","a",-2123407586),a,new cljs.core.Keyword(null,"v","v",21465059),v,new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"delta?","delta?",-1801433442),true], null);
}),new_datoms);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(arrangement__$1,new cljs.core.Keyword("arrangement","epoch","arrangement/epoch",1328448780),new_epoch,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("arrangement","materialized?","arrangement/materialized?",1938491005),true,new cljs.core.Keyword("arrangement","delta-rows","arrangement/delta-rows",-1042020374),delta_rows], 0));
}));

(kotobase_peer.statistics.maintain_materialized_delta.cljs$lang$maxFixedArity = 3);

/**
 * M5: Execute query using pre-materialized arrangements when available.
 * 
 * Decision tree:
 * 1. Look up arrangement by query name
 * 2. If materialized & not stale: return arrangement rows
 * 3. Else: fall back to index scan
 * 
 * Returns: {:result-type :materialized/:scan :rows [...] :manifest-cid ...}
 */
kotobase_peer.statistics.query_with_arrangements = (function kotobase_peer$statistics$query_with_arrangements(manifest,query_pattern,arrangements){
var arrangement_name = new cljs.core.Keyword(null,"arrangement-name","arrangement-name",-533897005).cljs$core$IFn$_invoke$arity$1(query_pattern);
var matching_arrangement = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__8782_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("arrangement","name","arrangement/name",1603195719).cljs$core$IFn$_invoke$arity$1(p1__8782_SHARP_),arrangement_name);
}),arrangements));
if(cljs.core.truth_((function (){var and__5160__auto__ = matching_arrangement;
if(cljs.core.truth_(and__5160__auto__)){
return new cljs.core.Keyword("arrangement","materialized?","arrangement/materialized?",1938491005).cljs$core$IFn$_invoke$arity$1(matching_arrangement);
} else {
return and__5160__auto__;
}
})())){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"result-type","result-type",-982013227),new cljs.core.Keyword(null,"materialized","materialized",-1815568995),new cljs.core.Keyword(null,"arrangement","arrangement",801037662),new cljs.core.Keyword("arrangement","name","arrangement/name",1603195719).cljs$core$IFn$_invoke$arity$1(matching_arrangement),new cljs.core.Keyword(null,"rows","rows",850049680),new cljs.core.Keyword("arrangement","delta-rows","arrangement/delta-rows",-1042020374).cljs$core$IFn$_invoke$arity$1(matching_arrangement)], null);
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"result-type","result-type",-982013227),new cljs.core.Keyword(null,"scan","scan",-328900104),new cljs.core.Keyword(null,"needs-index-scan","needs-index-scan",-984763327),true,new cljs.core.Keyword(null,"manifest-cid","manifest-cid",-215877857),new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(manifest)], null);
}
});

//# sourceMappingURL=kotobase_peer.statistics.js.map
