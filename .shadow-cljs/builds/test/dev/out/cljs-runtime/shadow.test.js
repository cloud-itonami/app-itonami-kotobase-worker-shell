goog.provide('shadow.test');
/**
 * like ct/test-vars-block but more generic
 * groups vars by namespace, executes fixtures
 */
shadow.test.test_vars_grouped_block = (function shadow$test$test_vars_grouped_block(vars){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__15228){
var vec__15229 = p__15228;
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15229,(0),null);
var vars__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15229,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
return cljs.test.report.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"begin-test-ns","begin-test-ns",-1701237033),new cljs.core.Keyword(null,"ns","ns",441598760),ns], null));
}),(function (){
return cljs.test.block((function (){var env = cljs.test.get_current_env();
var once_fixtures = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"once-fixtures","once-fixtures",1253947167),ns], null));
var each_fixtures = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"each-fixtures","each-fixtures",802243977),ns], null));
var G__15232 = cljs.test.execution_strategy(once_fixtures,each_fixtures);
var G__15232__$1 = (((G__15232 instanceof cljs.core.Keyword))?G__15232.fqn:null);
switch (G__15232__$1) {
case "async":
return cljs.test.wrap_map_fixtures(once_fixtures,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.test.wrap_map_fixtures,each_fixtures),cljs.test.test_var_block),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"test","test",577538877),cljs.core.meta),vars__$1)], 0)));

break;
case "sync":
var each_fixture_fn = cljs.test.join_fixtures(each_fixtures);
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
var G__15234 = (function (){
var seq__15235 = cljs.core.seq(vars__$1);
var chunk__15236 = null;
var count__15237 = (0);
var i__15238 = (0);
while(true){
if((i__15238 < count__15237)){
var v = chunk__15236.cljs$core$IIndexed$_nth$arity$2(null,i__15238);
var temp__5825__auto___15282 = new cljs.core.Keyword(null,"test","test",577538877).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v));
if(cljs.core.truth_(temp__5825__auto___15282)){
var t_15283 = temp__5825__auto___15282;
var G__15241_15284 = ((function (seq__15235,chunk__15236,count__15237,i__15238,t_15283,temp__5825__auto___15282,v,each_fixture_fn,G__15232,G__15232__$1,env,once_fixtures,each_fixtures,vec__15229,ns,vars__$1){
return (function (){
return cljs.test.run_block(cljs.test.test_var_block_STAR_(v,cljs.test.disable_async(t_15283)));
});})(seq__15235,chunk__15236,count__15237,i__15238,t_15283,temp__5825__auto___15282,v,each_fixture_fn,G__15232,G__15232__$1,env,once_fixtures,each_fixtures,vec__15229,ns,vars__$1))
;
(each_fixture_fn.cljs$core$IFn$_invoke$arity$1 ? each_fixture_fn.cljs$core$IFn$_invoke$arity$1(G__15241_15284) : each_fixture_fn.call(null,G__15241_15284));
} else {
}


var G__15285 = seq__15235;
var G__15286 = chunk__15236;
var G__15287 = count__15237;
var G__15288 = (i__15238 + (1));
seq__15235 = G__15285;
chunk__15236 = G__15286;
count__15237 = G__15287;
i__15238 = G__15288;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__15235);
if(temp__5825__auto__){
var seq__15235__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15235__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__15235__$1);
var G__15289 = cljs.core.chunk_rest(seq__15235__$1);
var G__15290 = c__5694__auto__;
var G__15291 = cljs.core.count(c__5694__auto__);
var G__15292 = (0);
seq__15235 = G__15289;
chunk__15236 = G__15290;
count__15237 = G__15291;
i__15238 = G__15292;
continue;
} else {
var v = cljs.core.first(seq__15235__$1);
var temp__5825__auto___15293__$1 = new cljs.core.Keyword(null,"test","test",577538877).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v));
if(cljs.core.truth_(temp__5825__auto___15293__$1)){
var t_15294 = temp__5825__auto___15293__$1;
var G__15242_15295 = ((function (seq__15235,chunk__15236,count__15237,i__15238,t_15294,temp__5825__auto___15293__$1,v,seq__15235__$1,temp__5825__auto__,each_fixture_fn,G__15232,G__15232__$1,env,once_fixtures,each_fixtures,vec__15229,ns,vars__$1){
return (function (){
return cljs.test.run_block(cljs.test.test_var_block_STAR_(v,cljs.test.disable_async(t_15294)));
});})(seq__15235,chunk__15236,count__15237,i__15238,t_15294,temp__5825__auto___15293__$1,v,seq__15235__$1,temp__5825__auto__,each_fixture_fn,G__15232,G__15232__$1,env,once_fixtures,each_fixtures,vec__15229,ns,vars__$1))
;
(each_fixture_fn.cljs$core$IFn$_invoke$arity$1 ? each_fixture_fn.cljs$core$IFn$_invoke$arity$1(G__15242_15295) : each_fixture_fn.call(null,G__15242_15295));
} else {
}


var G__15296 = cljs.core.next(seq__15235__$1);
var G__15297 = null;
var G__15298 = (0);
var G__15299 = (0);
seq__15235 = G__15296;
chunk__15236 = G__15297;
count__15237 = G__15298;
i__15238 = G__15299;
continue;
}
} else {
return null;
}
}
break;
}
});
var fexpr__15233 = cljs.test.join_fixtures(once_fixtures);
return (fexpr__15233.cljs$core$IFn$_invoke$arity$1 ? fexpr__15233.cljs$core$IFn$_invoke$arity$1(G__15234) : fexpr__15233.call(null,G__15234));
})], null);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__15232__$1))));

}
})());
}),(function (){
return cljs.test.report.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"end-test-ns","end-test-ns",1620675645),new cljs.core.Keyword(null,"ns","ns",441598760),ns], null));
})], null);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.group_by((function (p1__15227_SHARP_){
return new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__15227_SHARP_));
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

var map__15243 = shadow.test.env.get_test_ns_info(ns);
var map__15243__$1 = cljs.core.__destructure_map(map__15243);
var test_ns = map__15243__$1;
var vars = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15243__$1,new cljs.core.Keyword(null,"vars","vars",-2046957217));
if(cljs.core.not(test_ns)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(""+"Namespace: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns)+" not found, no tests to run.")], 0));
})], null);
} else {
return shadow.test.test_vars_grouped_block(vars);
}
});
shadow.test.prepare_test_run = (function shadow$test$prepare_test_run(p__15245,vars){
var map__15246 = p__15245;
var map__15246__$1 = cljs.core.__destructure_map(map__15246);
var env = map__15246__$1;
var report_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15246__$1,new cljs.core.Keyword(null,"report-fn","report-fn",-549046115));
var orig_report = cljs.test.report;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
cljs.test.set_env_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword("shadow.test","report-fn","shadow.test/report-fn",1075704061),orig_report));

if(cljs.core.truth_(report_fn)){
(cljs.test.report = report_fn);
} else {
}

var seq__15247_15300 = cljs.core.seq(shadow.test.env.get_tests());
var chunk__15249_15301 = null;
var count__15250_15302 = (0);
var i__15251_15303 = (0);
while(true){
if((i__15251_15303 < count__15250_15302)){
var vec__15261_15304 = chunk__15249_15301.cljs$core$IIndexed$_nth$arity$2(null,i__15251_15303);
var test_ns_15305 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15261_15304,(0),null);
var ns_info_15306 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15261_15304,(1),null);
var map__15264_15307 = ns_info_15306;
var map__15264_15308__$1 = cljs.core.__destructure_map(map__15264_15307);
var fixtures_15309 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15264_15308__$1,new cljs.core.Keyword(null,"fixtures","fixtures",1009814994));
var temp__5825__auto___15310 = new cljs.core.Keyword(null,"once","once",-262568523).cljs$core$IFn$_invoke$arity$1(fixtures_15309);
if(cljs.core.truth_(temp__5825__auto___15310)){
var fix_15311 = temp__5825__auto___15310;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"once-fixtures","once-fixtures",1253947167)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_15305,fix_15311], 0));
} else {
}

var temp__5825__auto___15312 = new cljs.core.Keyword(null,"each","each",940016129).cljs$core$IFn$_invoke$arity$1(fixtures_15309);
if(cljs.core.truth_(temp__5825__auto___15312)){
var fix_15313 = temp__5825__auto___15312;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"each-fixtures","each-fixtures",802243977)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_15305,fix_15313], 0));
} else {
}


var G__15314 = seq__15247_15300;
var G__15315 = chunk__15249_15301;
var G__15316 = count__15250_15302;
var G__15317 = (i__15251_15303 + (1));
seq__15247_15300 = G__15314;
chunk__15249_15301 = G__15315;
count__15250_15302 = G__15316;
i__15251_15303 = G__15317;
continue;
} else {
var temp__5825__auto___15318 = cljs.core.seq(seq__15247_15300);
if(temp__5825__auto___15318){
var seq__15247_15319__$1 = temp__5825__auto___15318;
if(cljs.core.chunked_seq_QMARK_(seq__15247_15319__$1)){
var c__5694__auto___15320 = cljs.core.chunk_first(seq__15247_15319__$1);
var G__15321 = cljs.core.chunk_rest(seq__15247_15319__$1);
var G__15322 = c__5694__auto___15320;
var G__15323 = cljs.core.count(c__5694__auto___15320);
var G__15324 = (0);
seq__15247_15300 = G__15321;
chunk__15249_15301 = G__15322;
count__15250_15302 = G__15323;
i__15251_15303 = G__15324;
continue;
} else {
var vec__15265_15325 = cljs.core.first(seq__15247_15319__$1);
var test_ns_15326 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15265_15325,(0),null);
var ns_info_15327 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15265_15325,(1),null);
var map__15268_15328 = ns_info_15327;
var map__15268_15329__$1 = cljs.core.__destructure_map(map__15268_15328);
var fixtures_15330 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15268_15329__$1,new cljs.core.Keyword(null,"fixtures","fixtures",1009814994));
var temp__5825__auto___15331__$1 = new cljs.core.Keyword(null,"once","once",-262568523).cljs$core$IFn$_invoke$arity$1(fixtures_15330);
if(cljs.core.truth_(temp__5825__auto___15331__$1)){
var fix_15332 = temp__5825__auto___15331__$1;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"once-fixtures","once-fixtures",1253947167)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_15326,fix_15332], 0));
} else {
}

var temp__5825__auto___15333__$1 = new cljs.core.Keyword(null,"each","each",940016129).cljs$core$IFn$_invoke$arity$1(fixtures_15330);
if(cljs.core.truth_(temp__5825__auto___15333__$1)){
var fix_15334 = temp__5825__auto___15333__$1;
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"each-fixtures","each-fixtures",802243977)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([test_ns_15326,fix_15334], 0));
} else {
}


var G__15335 = cljs.core.next(seq__15247_15319__$1);
var G__15336 = null;
var G__15337 = (0);
var G__15338 = (0);
seq__15247_15300 = G__15335;
chunk__15249_15301 = G__15336;
count__15250_15302 = G__15337;
i__15251_15303 = G__15338;
continue;
}
} else {
}
}
break;
}

return cljs.test.report.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"begin-run-tests","begin-run-tests",309363062),new cljs.core.Keyword(null,"var-count","var-count",-1513152110),cljs.core.count(vars),new cljs.core.Keyword(null,"ns-count","ns-count",-1269070724),cljs.core.count(cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15244_SHARP_){
return new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__15244_SHARP_));
}),vars)))], null));
})], null);
});
shadow.test.finish_test_run = (function shadow$test$finish_test_run(block){
if(cljs.core.vector_QMARK_(block)){
} else {
throw (new Error("Assert failed: (vector? block)"));
}

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(block,(function (){
var map__15269 = cljs.test.get_current_env();
var map__15269__$1 = cljs.core.__destructure_map(map__15269);
var env = map__15269__$1;
var report_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15269__$1,new cljs.core.Keyword("shadow.test","report-fn","shadow.test/report-fn",1075704061));
var report_counters = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15269__$1,new cljs.core.Keyword(null,"report-counters","report-counters",-1702609242));
cljs.test.report.call(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(report_counters,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"summary","summary",380847952)));

cljs.test.report.call(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(report_counters,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"end-run-tests","end-run-tests",267300563)));

return (cljs.test.report = report_fn);
}));
});
/**
 * tests all vars grouped by namespace, expects seq of test vars, can be obtained from env
 */
shadow.test.run_test_vars = (function shadow$test$run_test_vars(var_args){
var G__15271 = arguments.length;
switch (G__15271) {
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
var G__15273 = arguments.length;
switch (G__15273) {
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
var map__15274 = shadow.test.env.get_test_ns_info(ns);
var map__15274__$1 = cljs.core.__destructure_map(map__15274);
var vars = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15274__$1,new cljs.core.Keyword(null,"vars","vars",-2046957217));
return cljs.test.run_block(shadow.test.finish_test_run(cljs.core.into.cljs$core$IFn$_invoke$arity$2(shadow.test.prepare_test_run(env,vars),shadow.test.test_vars_grouped_block(vars))));
}));

(shadow.test.test_ns.cljs$lang$maxFixedArity = 2);

/**
 * test all vars in specified namespace symbol set
 */
shadow.test.run_tests = (function shadow$test$run_tests(var_args){
var G__15277 = arguments.length;
switch (G__15277) {
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

var vars = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__15275_SHARP_){
return cljs.core.contains_QMARK_(namespaces,new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__15275_SHARP_)));
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
var G__15280 = arguments.length;
switch (G__15280) {
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
return shadow.test.run_tests.cljs$core$IFn$_invoke$arity$2(env,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__15278_SHARP_){
var or__5162__auto__ = (re == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
return cljs.core.re_matches(re,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__15278_SHARP_)));
}
}),shadow.test.env.get_test_namespaces())));
}));

(shadow.test.run_all_tests.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=shadow.test.js.map
