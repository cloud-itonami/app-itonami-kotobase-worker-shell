goog.provide('shadow.test.env');
/**
 * @define {boolean}
 * @type {boolean}
 */
shadow.test.env.UI_DRIVEN = goog.define("shadow.test.env.UI_DRIVEN",false);
if((typeof shadow !== 'undefined') && (typeof shadow.test !== 'undefined') && (typeof shadow.test.env !== 'undefined') && (typeof shadow.test.env.tests_ref !== 'undefined')){
} else {
shadow.test.env.tests_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469),cljs.core.PersistentArrayMap.EMPTY], null));
}
shadow.test.env.reset_test_data_BANG_ = (function shadow$test$env$reset_test_data_BANG_(test_data){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shadow.test.env.tests_ref,cljs.core.assoc,new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469),test_data);
});
shadow.test.env.get_tests = (function shadow$test$env$get_tests(){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.test.env.tests_ref),new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469));
});
shadow.test.env.get_test_vars = (function shadow$test$env$get_test_vars(){
var iter__5649__auto__ = (function shadow$test$env$get_test_vars_$_iter__8787(s__8788){
return (new cljs.core.LazySeq(null,(function (){
var s__8788__$1 = s__8788;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__8788__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__8793 = cljs.core.first(xs__6385__auto__);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8793,(0),null);
var ns_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8793,(1),null);
var iterys__5645__auto__ = ((function (s__8788__$1,vec__8793,ns,ns_info,xs__6385__auto__,temp__5825__auto__){
return (function shadow$test$env$get_test_vars_$_iter__8787_$_iter__8789(s__8790){
return (new cljs.core.LazySeq(null,((function (s__8788__$1,vec__8793,ns,ns_info,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__8790__$1 = s__8790;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__8790__$1);
if(temp__5825__auto____$1){
var s__8790__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__8790__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__8790__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__8792 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__8791 = (0);
while(true){
if((i__8791 < size__5648__auto__)){
var var$ = cljs.core._nth(c__5647__auto__,i__8791);
cljs.core.chunk_append(b__8792,var$);

var G__8802 = (i__8791 + (1));
i__8791 = G__8802;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8792),shadow$test$env$get_test_vars_$_iter__8787_$_iter__8789(cljs.core.chunk_rest(s__8790__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8792),null);
}
} else {
var var$ = cljs.core.first(s__8790__$2);
return cljs.core.cons(var$,shadow$test$env$get_test_vars_$_iter__8787_$_iter__8789(cljs.core.rest(s__8790__$2)));
}
} else {
return null;
}
break;
}
});})(s__8788__$1,vec__8793,ns,ns_info,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__8788__$1,vec__8793,ns,ns_info,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(ns_info)));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,shadow$test$env$get_test_vars_$_iter__8787(cljs.core.rest(s__8788__$1)));
} else {
var G__8803 = cljs.core.rest(s__8788__$1);
s__8788__$1 = G__8803;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(shadow.test.env.get_tests());
});
shadow.test.env.get_test_ns_info = (function shadow$test$env$get_test_ns_info(ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.test.env.tests_ref),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469),ns], null));
});
/**
 * returns all the registered test namespaces and symbols
 * use (get-test-ns-info the-sym) to get the details
 */
shadow.test.env.get_test_namespaces = (function shadow$test$env$get_test_namespaces(){
return cljs.core.keys(new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(shadow.test.env.tests_ref)));
});
shadow.test.env.get_test_count = (function shadow$test$env$get_test_count(){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),(function (){var iter__5649__auto__ = (function shadow$test$env$get_test_count_$_iter__8796(s__8797){
return (new cljs.core.LazySeq(null,(function (){
var s__8797__$1 = s__8797;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__8797__$1);
if(temp__5825__auto__){
var s__8797__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__8797__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__8797__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__8799 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__8798 = (0);
while(true){
if((i__8798 < size__5648__auto__)){
var map__8800 = cljs.core._nth(c__5647__auto__,i__8798);
var map__8800__$1 = cljs.core.__destructure_map(map__8800);
var test_ns = map__8800__$1;
var vars = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8800__$1,new cljs.core.Keyword(null,"vars","vars",-2046957217));
cljs.core.chunk_append(b__8799,cljs.core.count(vars));

var G__8804 = (i__8798 + (1));
i__8798 = G__8804;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8799),shadow$test$env$get_test_count_$_iter__8796(cljs.core.chunk_rest(s__8797__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8799),null);
}
} else {
var map__8801 = cljs.core.first(s__8797__$2);
var map__8801__$1 = cljs.core.__destructure_map(map__8801);
var test_ns = map__8801__$1;
var vars = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8801__$1,new cljs.core.Keyword(null,"vars","vars",-2046957217));
return cljs.core.cons(cljs.core.count(vars),shadow$test$env$get_test_count_$_iter__8796(cljs.core.rest(s__8797__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(cljs.core.vals(new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(shadow.test.env.tests_ref))));
})());
});

//# sourceMappingURL=shadow.test.env.js.map
