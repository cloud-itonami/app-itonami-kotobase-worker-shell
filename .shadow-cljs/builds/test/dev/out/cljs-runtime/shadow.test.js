goog.provide('shadow.test');
/**
 * like ct/test-vars-block but more generic
 * groups vars by namespace, executes fixtures
 */
shadow.test.test_vars_grouped_block = (function shadow$test$test_vars_grouped_block(vars){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__9637){
var vec__9638 = p__9637;
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9638,(0),null);
var vars__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9638,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
return cljs.test.report.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"begin-test-ns","begin-test-ns",-1701237033),new cljs.core.Keyword(null,"ns","ns",441598760),ns], null));
}),(function (){
return cljs.test.block((function (){var env = cljs.test.get_current_env();
var once_fixtures = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"once-fixtures","once-fixtures",1253947167),ns], null));
var each_fixtures = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"each-fixtures","each-fixtures",802243977),ns], null));
var G__9641 = cljs.test.execution_strategy(once_fixtures,each_fixtures);
var G__9641__$1 = (((G__9641 instanceof cljs.core.Keyword))?G__9641.fqn:null);
switch (G__9641__$1) {
case "async":
return cljs.test.wrap_map_fixtures(once_fixtures,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.test.wrap_map_fixtures,each_fixtures),cljs.test.test_var_block),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"test","test",577538877),cljs.core.meta),vars__$1)], 0)));

break;
case "sync":
var each_fixture_fn = cljs.test.join_fixtures(each_fixtures);
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
var G__9643 = (function (){
var seq__9644 = cljs.core.seq(vars__$1);
var chunk__9645 = null;
var count__9646 = (0);
var i__9647 = (0);
while(true){
if((i__9647 < count__9646)){
var v = chunk__9645.cljs$core$IIndexed$_nth$arity$2(null,i__9647);
var temp__5825__auto___9691 = new cljs.core.Keyword(null,"test","test",577538877).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v));
if(cljs.core.truth_(temp__5825__auto___9691)){
var t_9692 = temp__5825__auto___9691;
var G__9650_9693 = ((function (seq__9644,chunk__9645,count__9646,i__9647,t_9692,temp__5825__auto___9691,v,each_fixture_fn,G__9641,G__9641__$1,env,once_fixtures,each_fixtures,vec__9638,ns,vars__$1){
return (function (){
return cljs.test.run_block(cljs.test.test_var_block_STAR_(v,cljs.test.disable_async(t_9692)));
});})(seq__9644,chunk__9645,count__9646,i__9647,t_9692,temp__5825__auto___9691,v,each_fixture_fn,G__9641,G__9641__$1,env,once_fixtures,each_fixtures,vec__9638,ns,vars__$1))
;
(each_fixture_fn.cljs$core$IFn$_invoke$arity$1 ? each_fixture_fn.cljs$core$IFn$_invoke$arity$1(G__9650_9693) : each_fixture_fn.call(null,G__9650_9693));
} else {
}


var G__9694 = seq__9644;
var G__9695 = chunk__9645;
var G__9696 = count__9646;
var G__9697 = (i__9647 + (1));
seq__9644 = G__9694;
chunk__9645 = G__9695;
count__9646 = G__9696;
i__9647 = G__9697;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__9644);
if(temp__5825__auto__){
var seq__9644__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__9644__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__9644__$1);
var G__9698 = cljs.core.chunk_rest(seq__9644__$1);
var G__9699 = c__5694__auto__;
var G__9700 = cljs.core.count(c__5694__auto__);
var G__9701 = (0);
seq__9644 = G__9698;
chunk__9645 = G__9699;
count__9646 = G__9700;
i__9647 = G__9701;
continue;
} else {
var v = cljs.core.first(seq__9644__$1);
var temp__5825__auto___9702__$1 = new cljs.core.Keyword(null,"test","test",577538877).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v));
if(cljs.core.truth_(temp__5825__auto___9702__$1)){
var t_9703 = temp__5825__auto___9702__$1;
var G__9651_9704 = ((function (seq__9644,chunk__9645,count__9646,i__9647,t_9703,temp__5825__auto___9702__$1,v,seq__9644__$1,temp__5825__auto__,each_fixture_fn,G__9641,G__9641__$1,env,once_fixtures,each_fixtures,vec__9638,ns,vars__$1){
return (function (){
return cljs.test.run_block(cljs.test.test_var_block_STAR_(v,cljs.test.disable_async(t_9703)));
});})(seq__9644,chunk__9645,count__9646,i__9647,t_9703,temp__5825__auto___9702__$1,v,seq__9644__$1,temp__5825__auto__,each_fixture_fn,G__9641,G__9641__$1,env,once_fixtures,each_fixtures,vec__9638,ns,vars__$1))
;
(each_fixture_fn.cljs$core$IFn$_invoke$arity$1 ? each_fixture_fn.cljs$core$IFn$_invoke$arity$1(G__9651_9704) : each_fixture_fn.call(null,G__9651_9704));
} else {
}


var G__9705 = cljs.core.next(seq__9644__$1);
var G__9706 = null;
var G__9707 = (0);
var G__9708 = (0);
seq__9644 = G__9705;
chunk__9645 = G__9706;
count__9646 = G__9707;
i__9647 = G__9708;
continue;
}
} else {
return null;
}
}
break;
}
});
var fexpr__9642 = cljs.test.join_fixtures(once_fixtures);
return (fexpr__9642.cljs$core$IFn$_invoke$arity$1 ? fexpr__9642.cljs$core$IFn$_invoke$arity$1(G__9643) : fexpr__9642.call(null,G__9643));
})], null);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__9641__$1))));

}
})());
}),(function (){
return cljs.test.report.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"end-test-ns","end-test-ns",1620675645),new cljs.core.Keyword(null,"ns","ns",441598760),ns], null));
})], null);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.group_by((function (p1__9636_SHARP_){
return new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__9636_SHARP_));
}),vars))], 0));
});
/**
 * Like test-ns, but returns a block for further composition and
 *   later execution.  Does not clear the current env.
 */
shadow.test.test_ns_block = (function shadow$test$test_ns_block(ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

var map__9652 = shadow.test.env.get_test_ns_info(ns);
var map__9652__$1 = cljs.core.__destructure_map(map__9652);
var test_ns = map__9652__$1;
var vars = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9652__$1,new cljs.core.Keyword(null,"vars","vars",-2046957217));
if(cljs.core.not(test_ns)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(""+"Namespace: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns)+" not found, no tests to run.")], 0));
})], null);
} else {
return shadow.test.test_vars_grouped_block(vars);
}
});
shadow.test.prepare_test_run = (function shadow$test$prepare_test_run(p__9654,vars){
var map__9655 = p__9654;
var map__9655__$1 = cljs.core.__destructure_map(map__9655);
var env = map__9655__$1;
var report_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9655__$1,new cljs.core.Keyword(null,"report-fn","report-fn",-549046115));
var orig_report = cljs.test.report;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
cljs.test.set_env_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword("shadow.test","report-fn","shadow.test/report-fn",1075704061),orig_report));

if(cljs.core.truth_(report_fn)){
(cljs.test.report = report_fn);
} else {
}

var seq__9656_9709 = cljs.core.seq(shadow.test.env.get_tests());
var chunk__9658_9710 = null;
var count__9659_9711 = (0);
var i__9660_9712 = (0);
while(true){
if((i__9660_9712 < count__9659_9711)){
var vec__9670_9713 = chunk__9658_9710.cljs$core$IIndexed$_nth$arity$2(null,i__9660_9712);
var test_ns_9714 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9670_9713,(0),null);
var ns_info_9715 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9670_9713,(1),null);
var map__9673_9716 = ns_info_9715;
var map__9673_9717__$1 = cljs.core.__destructure_map(map__9673_9716);
var fixtures_9718 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9673_9717__$1,new cljs.core.Keyword(null,"fixtures","fixtures",1009814994));
var temp__5825__auto___9719 = new cljs.core.Keyword(null,"once","once",-262568523).cljs$core$IFn$_invoke$arity$1(fixtures_9718);
if(cljs.core.truth_(temp__5825__auto___9719)){
var fix_9720 = temp__5825__auto___9719;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"once-fixtures","once-fixtures",1253947167)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_9714,fix_9720], 0));
} else {
}

var temp__5825__auto___9721 = new cljs.core.Keyword(null,"each","each",940016129).cljs$core$IFn$_invoke$arity$1(fixtures_9718);
if(cljs.core.truth_(temp__5825__auto___9721)){
var fix_9722 = temp__5825__auto___9721;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"each-fixtures","each-fixtures",802243977)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_9714,fix_9722], 0));
} else {
}


var G__9723 = seq__9656_9709;
var G__9724 = chunk__9658_9710;
var G__9725 = count__9659_9711;
var G__9726 = (i__9660_9712 + (1));
seq__9656_9709 = G__9723;
chunk__9658_9710 = G__9724;
count__9659_9711 = G__9725;
i__9660_9712 = G__9726;
continue;
} else {
var temp__5825__auto___9727 = cljs.core.seq(seq__9656_9709);
if(temp__5825__auto___9727){
var seq__9656_9728__$1 = temp__5825__auto___9727;
if(cljs.core.chunked_seq_QMARK_(seq__9656_9728__$1)){
var c__5694__auto___9729 = cljs.core.chunk_first(seq__9656_9728__$1);
var G__9730 = cljs.core.chunk_rest(seq__9656_9728__$1);
var G__9731 = c__5694__auto___9729;
var G__9732 = cljs.core.count(c__5694__auto___9729);
var G__9733 = (0);
seq__9656_9709 = G__9730;
chunk__9658_9710 = G__9731;
count__9659_9711 = G__9732;
i__9660_9712 = G__9733;
continue;
} else {
var vec__9674_9734 = cljs.core.first(seq__9656_9728__$1);
var test_ns_9735 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9674_9734,(0),null);
var ns_info_9736 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9674_9734,(1),null);
var map__9677_9737 = ns_info_9736;
var map__9677_9738__$1 = cljs.core.__destructure_map(map__9677_9737);
var fixtures_9739 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9677_9738__$1,new cljs.core.Keyword(null,"fixtures","fixtures",1009814994));
var temp__5825__auto___9740__$1 = new cljs.core.Keyword(null,"once","once",-262568523).cljs$core$IFn$_invoke$arity$1(fixtures_9739);
if(cljs.core.truth_(temp__5825__auto___9740__$1)){
var fix_9741 = temp__5825__auto___9740__$1;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"once-fixtures","once-fixtures",1253947167)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_9735,fix_9741], 0));
} else {
}

var temp__5825__auto___9742__$1 = new cljs.core.Keyword(null,"each","each",940016129).cljs$core$IFn$_invoke$arity$1(fixtures_9739);
if(cljs.core.truth_(temp__5825__auto___9742__$1)){
var fix_9743 = temp__5825__auto___9742__$1;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"each-fixtures","each-fixtures",802243977)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_9735,fix_9743], 0));
} else {
}


var G__9744 = cljs.core.next(seq__9656_9728__$1);
var G__9745 = null;
var G__9746 = (0);
var G__9747 = (0);
seq__9656_9709 = G__9744;
chunk__9658_9710 = G__9745;
count__9659_9711 = G__9746;
i__9660_9712 = G__9747;
continue;
}
} else {
}
}
break;
}

return cljs.test.report.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"begin-run-tests","begin-run-tests",309363062),new cljs.core.Keyword(null,"var-count","var-count",-1513152110),cljs.core.count(vars),new cljs.core.Keyword(null,"ns-count","ns-count",-1269070724),cljs.core.count(cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__9653_SHARP_){
return new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__9653_SHARP_));
}),vars)))], null));
})], null);
});
shadow.test.finish_test_run = (function shadow$test$finish_test_run(block){
if(cljs.core.vector_QMARK_(block)){
} else {
throw (new Error("Assert failed: (vector? block)"));
}

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(block,(function (){
var map__9678 = cljs.test.get_current_env();
var map__9678__$1 = cljs.core.__destructure_map(map__9678);
var env = map__9678__$1;
var report_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9678__$1,new cljs.core.Keyword("shadow.test","report-fn","shadow.test/report-fn",1075704061));
var report_counters = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9678__$1,new cljs.core.Keyword(null,"report-counters","report-counters",-1702609242));
cljs.test.report.call(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(report_counters,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"summary","summary",380847952)));

cljs.test.report.call(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(report_counters,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"end-run-tests","end-run-tests",267300563)));

return (cljs.test.report = report_fn);
}));
});
/**
 * tests all vars grouped by namespace, expects seq of test vars, can be obtained from env
 */
shadow.test.run_test_vars = (function shadow$test$run_test_vars(var_args){
var G__9680 = arguments.length;
switch (G__9680) {
case 1:
return shadow.test.run_test_vars.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.test.run_test_vars.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(shadow.test.run_test_vars.cljs$core$IFn$_invoke$arity$1 = (function (test_vars){
return shadow.test.run_test_vars.cljs$core$IFn$_invoke$arity$2(cljs.test.empty_env.cljs$core$IFn$_invoke$arity$0(),test_vars);
}));

(shadow.test.run_test_vars.cljs$core$IFn$_invoke$arity$2 = (function (env,vars){
return cljs.test.run_block(shadow.test.finish_test_run(cljs.core.into.cljs$core$IFn$_invoke$arity$2(shadow.test.prepare_test_run(env,vars),shadow.test.test_vars_grouped_block(vars))));
}));

(shadow.test.run_test_vars.cljs$lang$maxFixedArity = 2);

/**
 * test all vars for given namespace symbol
 */
shadow.test.test_ns = (function shadow$test$test_ns(var_args){
var G__9682 = arguments.length;
switch (G__9682) {
case 1:
return shadow.test.test_ns.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.test.test_ns.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(shadow.test.test_ns.cljs$core$IFn$_invoke$arity$1 = (function (ns){
return shadow.test.test_ns.cljs$core$IFn$_invoke$arity$2(cljs.test.empty_env.cljs$core$IFn$_invoke$arity$0(),ns);
}));

(shadow.test.test_ns.cljs$core$IFn$_invoke$arity$2 = (function (env,ns){
var map__9683 = shadow.test.env.get_test_ns_info(ns);
var map__9683__$1 = cljs.core.__destructure_map(map__9683);
var vars = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9683__$1,new cljs.core.Keyword(null,"vars","vars",-2046957217));
return cljs.test.run_block(shadow.test.finish_test_run(cljs.core.into.cljs$core$IFn$_invoke$arity$2(shadow.test.prepare_test_run(env,vars),shadow.test.test_vars_grouped_block(vars))));
}));

(shadow.test.test_ns.cljs$lang$maxFixedArity = 2);

/**
 * test all vars in specified namespace symbol set
 */
shadow.test.run_tests = (function shadow$test$run_tests(var_args){
var G__9686 = arguments.length;
switch (G__9686) {
case 0:
return shadow.test.run_tests.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return shadow.test.run_tests.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.test.run_tests.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(shadow.test.run_tests.cljs$core$IFn$_invoke$arity$0 = (function (){
return shadow.test.run_tests.cljs$core$IFn$_invoke$arity$1(cljs.test.empty_env.cljs$core$IFn$_invoke$arity$0());
}));

(shadow.test.run_tests.cljs$core$IFn$_invoke$arity$1 = (function (env){
return shadow.test.run_tests.cljs$core$IFn$_invoke$arity$2(env,shadow.test.env.get_test_namespaces());
}));

(shadow.test.run_tests.cljs$core$IFn$_invoke$arity$2 = (function (env,namespaces){
if(cljs.core.set_QMARK_(namespaces)){
} else {
throw (new Error("Assert failed: (set? namespaces)"));
}

var vars = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__9684_SHARP_){
return cljs.core.contains_QMARK_(namespaces,new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__9684_SHARP_)));
}),shadow.test.env.get_test_vars());
return cljs.test.run_block(shadow.test.finish_test_run(cljs.core.into.cljs$core$IFn$_invoke$arity$2(shadow.test.prepare_test_run(env,vars),shadow.test.test_vars_grouped_block(vars))));
}));

(shadow.test.run_tests.cljs$lang$maxFixedArity = 2);

/**
 * Runs all tests in all namespaces; prints results.
 *   Optional argument is a regular expression; only namespaces with
 *   names matching the regular expression (with re-matches) will be
 *   tested.
 */
shadow.test.run_all_tests = (function shadow$test$run_all_tests(var_args){
var G__9689 = arguments.length;
switch (G__9689) {
case 0:
return shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$0 = (function (){
return shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$2(cljs.test.empty_env.cljs$core$IFn$_invoke$arity$0(),null);
}));

(shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$1 = (function (env){
return shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$2(env,null);
}));

(shadow.test.run_all_tests.cljs$core$IFn$_invoke$arity$2 = (function (env,re){
return shadow.test.run_tests.cljs$core$IFn$_invoke$arity$2(env,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__9687_SHARP_){
var or__5162__auto__ = (re == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
return cljs.core.re_matches(re,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__9687_SHARP_)));
}
}),shadow.test.env.get_test_namespaces())));
}));

(shadow.test.run_all_tests.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=shadow.test.js.map
