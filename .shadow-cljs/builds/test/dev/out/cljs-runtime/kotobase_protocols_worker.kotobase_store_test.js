goog.provide('kotobase_protocols_worker.kotobase_store_test');
kotobase_protocols_worker.kotobase_store_test.fake_bucket = (function kotobase_protocols_worker$kotobase_store_test$fake_bucket(){
var store = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var next_etag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
return ({"get": (function (k){
return Promise.resolve((function (){var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(store),k);
if(cljs.core.truth_(temp__5825__auto__)){
var map__12209 = temp__5825__auto__;
var map__12209__$1 = cljs.core.__destructure_map(map__12209);
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12209__$1,new cljs.core.Keyword(null,"val","val",128701612));
var etag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12209__$1,new cljs.core.Keyword(null,"etag","etag",-329255476));
return ({"text": (function (){
return Promise.resolve(val);
}), "arrayBuffer": (function (){
return Promise.resolve(val.buffer);
}), "etag": (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(etag))});
} else {
return null;
}
})());
}), "put": (function (k,v,opts){
return Promise.resolve((function (){var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(store),k);
var required = (function (){var G__12210 = opts;
var G__12210__$1 = (((G__12210 == null))?null:G__12210.onlyIf);
if((G__12210__$1 == null)){
return null;
} else {
return G__12210__$1.etagMatches;
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = required;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(required,(function (){var G__12211 = current;
var G__12211__$1 = (((G__12211 == null))?null:new cljs.core.Keyword(null,"etag","etag",-329255476).cljs$core$IFn$_invoke$arity$1(G__12211));
if((G__12211__$1 == null)){
return null;
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12211__$1));
}
})());
} else {
return and__5160__auto__;
}
})())){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(store,cljs.core.assoc,k,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"val","val",128701612),v,new cljs.core.Keyword(null,"etag","etag",-329255476),cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(next_etag,cljs.core.inc)], null));

return true;
}
})());
})});
});
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_ = (function kotobase_protocols_worker$kotobase_store_test$apply_op_BANG_(store,p__12212){
var vec__12213 = p__12212;
var seq__12214 = cljs.core.seq(vec__12213);
var first__12215 = cljs.core.first(seq__12214);
var seq__12214__$1 = cljs.core.next(seq__12214);
var op = first__12215;
var args = seq__12214__$1;
var G__12216 = op;
var G__12216__$1 = (((G__12216 instanceof cljs.core.Keyword))?G__12216.fqn:null);
switch (G__12216__$1) {
case "put":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(kotobase.store._put,store,args);

break;
case "append":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(kotobase.store._append,store,args);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12216__$1))));

}
});
kotobase_protocols_worker.kotobase_store_test.ops_1 = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),"a.txt",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"body","body",-2049205669),"hello"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),"b.txt",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"body","body",-2049205669),"world"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"append","append",-291298229),new cljs.core.Keyword(null,"audit","audit",-1046653260),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"create","create",-1301499256),new cljs.core.Keyword(null,"k","k",-2146297393),"a.txt"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"append","append",-291298229),new cljs.core.Keyword(null,"audit","audit",-1046653260),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"create","create",-1301499256),new cljs.core.Keyword(null,"k","k",-2146297393),"b.txt"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),"a.txt",null], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"atproto","atproto",-794792181),"did:x","coll"], null),"r1",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"v","v",21465059),(1)], null)], null)], null);
kotobase_protocols_worker.kotobase_store_test.content = (function kotobase_protocols_worker$kotobase_store_test$content(snap){
return cljs.core.select_keys(snap,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Keyword(null,"streams","streams",1465783789)], null));
});
/**
 * Applies `ops` one at a time, each through its OWN
 *   hydrate-run-persist! cycle (so every step is a genuine chain commit,
 *   not one big in-memory batch), and resolves with the FINAL hydrated
 *   content (a fresh hydrate! of the resulting head, proving persistence
 *   round-trips, not just that the in-memory diff was correct).
 */
kotobase_protocols_worker.kotobase_store_test.run_through_datom_store_BANG_ = (function kotobase_protocols_worker$kotobase_store_test$run_through_datom_store_BANG_(bucket,ops){
var step = (function kotobase_protocols_worker$kotobase_store_test$run_through_datom_store_BANG__$_step(remaining){
if(cljs.core.empty_QMARK_(remaining)){
return Promise.resolve(null);
} else {
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(bucket,"","test-graph",(function (seed){
var store = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1(seed);
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_(store,cljs.core.first(remaining));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(store)),new cljs.core.Keyword(null,"response","response",-1068424192),null], null);
})).then((function (p__12219){
var map__12220 = p__12219;
var map__12220__$1 = cljs.core.__destructure_map(map__12220);
var persisted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12220__$1,new cljs.core.Keyword(null,"persisted","persisted",-900171345));
if(cljs.core.truth_(persisted)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("CAS lost in a single-writer test \u2014 should never happen",cljs.core.PersistentArrayMap.EMPTY);
}

return kotobase_protocols_worker$kotobase_store_test$run_through_datom_store_BANG__$_step(cljs.core.rest(remaining));
}));
}
});
return step(ops).then((function (_){
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(bucket,"","test-graph",(function (seed){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(seed),new cljs.core.Keyword(null,"response","response",-1068424192),kotobase_protocols_worker.kotobase_store_test.content(seed)], null);
}));
}));
});

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221 = (function (meta12222){
this.meta12222 = meta12222;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12223,meta12222__$1){
var self__ = this;
var _12223__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221(meta12222__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12223){
var self__ = this;
var _12223__$1 = this;
return self__.meta12222;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12225 = (arguments.length - (1));
switch (G__12225) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.prototype.apply = (function (self__,args12224){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12224.length > (20)))?(function (){var G__12226 = args12224.slice((0),(20));
G__12226.push(args12224.slice((20)));

return G__12226;
})():args12224)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var oracle = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$0();
var seq__12227_12326 = cljs.core.seq(kotobase_protocols_worker.kotobase_store_test.ops_1);
var chunk__12228_12327 = null;
var count__12229_12328 = (0);
var i__12230_12329 = (0);
while(true){
if((i__12230_12329 < count__12229_12328)){
var op_12330 = chunk__12228_12327.cljs$core$IIndexed$_nth$arity$2(null,i__12230_12329);
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_(oracle,op_12330);


var G__12331 = seq__12227_12326;
var G__12332 = chunk__12228_12327;
var G__12333 = count__12229_12328;
var G__12334 = (i__12230_12329 + (1));
seq__12227_12326 = G__12331;
chunk__12228_12327 = G__12332;
count__12229_12328 = G__12333;
i__12230_12329 = G__12334;
continue;
} else {
var temp__5825__auto___12335 = cljs.core.seq(seq__12227_12326);
if(temp__5825__auto___12335){
var seq__12227_12336__$1 = temp__5825__auto___12335;
if(cljs.core.chunked_seq_QMARK_(seq__12227_12336__$1)){
var c__5694__auto___12337 = cljs.core.chunk_first(seq__12227_12336__$1);
var G__12338 = cljs.core.chunk_rest(seq__12227_12336__$1);
var G__12339 = c__5694__auto___12337;
var G__12340 = cljs.core.count(c__5694__auto___12337);
var G__12341 = (0);
seq__12227_12326 = G__12338;
chunk__12228_12327 = G__12339;
count__12229_12328 = G__12340;
i__12230_12329 = G__12341;
continue;
} else {
var op_12342 = cljs.core.first(seq__12227_12336__$1);
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_(oracle,op_12342);


var G__12343 = cljs.core.next(seq__12227_12336__$1);
var G__12344 = null;
var G__12345 = (0);
var G__12346 = (0);
seq__12227_12326 = G__12343;
chunk__12228_12327 = G__12344;
count__12229_12328 = G__12345;
i__12230_12329 = G__12346;
continue;
}
} else {
}
}
break;
}

var expected = kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(oracle));
return kotobase_protocols_worker.kotobase_store_test.run_through_datom_store_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),kotobase_protocols_worker.kotobase_store_test.ops_1).then((function (p__12231){
var map__12232 = p__12231;
var map__12232__$1 = cljs.core.__destructure_map(map__12232);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12232__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["content-addressed round-trip (multiple sequential commits + a fresh hydrate) matches the LocalStore oracle exactly"], 0));

try{try{var values__1983__auto___12347 = (new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(expected),(new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___12348 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12347);
if(cljs.core.truth_(result__1984__auto___12348)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"pass","pass",1574159993),23,97,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),97,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12347),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"fail","fail",1706214930),23,97,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),97,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12347),null,(1),null)),(2),null)),null]));
}

}catch (e12233){var t__2020__auto___12349 = e12233;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"error","error",-978969032),23,97,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),97,t__2020__auto___12349,null]));
}
try{var values__1983__auto___12350 = (new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(expected),(new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___12351 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12350);
if(cljs.core.truth_(result__1984__auto___12351)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"pass","pass",1574159993),23,98,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),98,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12350),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"fail","fail",1706214930),23,98,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),98,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12350),null,(1),null)),(2),null)),null]));
}

}catch (e12234){var t__2020__auto___12352 = e12234;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"error","error",-978969032),23,98,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),98,t__2020__auto___12352,null]));
}}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12353 = false;
if(value__1987__auto___12353){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12353,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12353,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e12235){var t__2020__auto___12354 = e12235;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12354,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12222","meta12222",1851335184,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12221");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12221");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12221.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test12221 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test12221(meta12222){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221(meta12222));
});


kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store = (function kotobase_protocols_worker$kotobase_store_test$datom_store_equals_local_store(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12221(null));
});

(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","datom-store-equals-local-store","kotobase-protocols-worker.kotobase-store-test/datom-store-equals-local-store",1419377560,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"datom-store-equals-local-store","datom-store-equals-local-store",97200870,null),"kotobase_protocols_worker/kotobase_store_test.cljs",40,1,88,88,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store)?kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236 = (function (meta12237){
this.meta12237 = meta12237;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12238,meta12237__$1){
var self__ = this;
var _12238__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236(meta12237__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12238){
var self__ = this;
var _12238__$1 = this;
return self__.meta12237;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12240 = (arguments.length - (1));
switch (G__12240) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.prototype.apply = (function (self__,args12239){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12239.length > (20)))?(function (){var G__12241 = args12239.slice((0),(20));
G__12241.push(args12239.slice((20)));

return G__12241;
})():args12239)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),"","brand-new-graph",(function (seed){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(seed),new cljs.core.Keyword(null,"response","response",-1068424192),seed], null);
})).then((function (p__12242){
var map__12243 = p__12242;
var map__12243__$1 = cljs.core.__destructure_map(map__12243);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12243__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
var persisted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12243__$1,new cljs.core.Keyword(null,"persisted","persisted",-900171345));
try{var value__1987__auto___12356 = persisted;
if(cljs.core.truth_(value__1987__auto___12356)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"pass","pass",1574159993),23,110,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),110,value__1987__auto___12356,null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"fail","fail",1706214930),23,110,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),110,value__1987__auto___12356,null]));
}

}catch (e12244){var t__2020__auto___12357 = e12244;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"error","error",-978969032),23,110,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),110,t__2020__auto___12357,null]));
}
try{var values__1983__auto___12358 = (new cljs.core.List(null,cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___12359 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12358);
if(cljs.core.truth_(result__1984__auto___12359)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),23,111,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),111,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12358),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),23,111,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),111,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12358),null,(1),null)),(2),null)),null]));
}

}catch (e12245){var t__2020__auto___12360 = e12245;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),23,111,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),111,t__2020__auto___12360,null]));
}
try{var values__1983__auto___12361 = (new cljs.core.List(null,cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___12362 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12361);
if(cljs.core.truth_(result__1984__auto___12362)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),23,112,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),112,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12361),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),23,112,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),112,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12361),null,(1),null)),(2),null)),null]));
}

}catch (e12246){var t__2020__auto___12363 = e12246;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),23,112,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),112,t__2020__auto___12363,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12364 = false;
if(value__1987__auto___12364){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12364,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12364,e.message]));
}

}catch (e12247){var t__2020__auto___12365 = e12247;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12365,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12237","meta12237",-815572275,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12236");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12236");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12236.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test12236 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test12236(meta12237){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236(meta12237));
});


kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty = (function kotobase_protocols_worker$kotobase_store_test$empty_graph_hydrates_empty(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12236(null));
});

(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","empty-graph-hydrates-empty","kotobase-protocols-worker.kotobase-store-test/empty-graph-hydrates-empty",816979834,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"empty-graph-hydrates-empty","empty-graph-hydrates-empty",1180813436,null),"kotobase_protocols_worker/kotobase_store_test.cljs",36,1,104,104,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty)?kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248 = (function (meta12249){
this.meta12249 = meta12249;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12250,meta12249__$1){
var self__ = this;
var _12250__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248(meta12249__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12250){
var self__ = this;
var _12250__$1 = this;
return self__.meta12249;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12252 = (arguments.length - (1));
switch (G__12252) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.prototype.apply = (function (self__,args12251){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12251.length > (20)))?(function (){var G__12253 = args12251.slice((0),(20));
G__12253.push(args12251.slice((20)));

return G__12253;
})():args12251)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var bucket = kotobase_protocols_worker.kotobase_store_test.fake_bucket();
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(bucket,"","race-graph",(function (seed){
var store = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1(seed);
store.kotobase$store$IStore$_put$arity$4(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),"seed",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword(null,"seed","seed",68613327)], null));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(store)),new cljs.core.Keyword(null,"response","response",-1068424192),null], null);
})).then((function (_){
return Promise.all([kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(bucket,"","race-graph",(function (seed){
var store = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1(seed);
store.kotobase$store$IStore$_put$arity$4(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),"writer-a",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword(null,"a","a",-2123407586)], null));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(store)),new cljs.core.Keyword(null,"response","response",-1068424192),new cljs.core.Keyword(null,"a","a",-2123407586)], null);
})),kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(bucket,"","race-graph",(function (seed){
var store = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1(seed);
store.kotobase$store$IStore$_put$arity$4(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),"writer-b",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword(null,"b","b",1482224470)], null));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(store)),new cljs.core.Keyword(null,"response","response",-1068424192),new cljs.core.Keyword(null,"b","b",1482224470)], null);
}))]);
})).then((function (results){
var vec__12254_12367 = cljs.core.vec(results);
var a_12368 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12254_12367,(0),null);
var b_12369 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12254_12367,(1),null);
try{var values__1983__auto___12370 = (new cljs.core.List(null,new cljs.core.Keyword(null,"persisted","persisted",-900171345).cljs$core$IFn$_invoke$arity$1(a_12368),(new cljs.core.List(null,new cljs.core.Keyword(null,"persisted","persisted",-900171345).cljs$core$IFn$_invoke$arity$1(b_12369),null,(1),null)),(2),null));
var result__1984__auto___12371 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.not_EQ_,values__1983__auto___12370);
if(cljs.core.truth_(result__1984__auto___12371)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"pass","pass",1574159993),27,148,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),148,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___12370),"exactly one of the two racing writers must lose the CAS"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"fail","fail",1706214930),27,148,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),148,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___12370),null,(1),null)),(2),null)),"exactly one of the two racing writers must lose the CAS"]));
}

}catch (e12257){var t__2020__auto___12372 = e12257;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"error","error",-978969032),27,148,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),148,t__2020__auto___12372,"exactly one of the two racing writers must lose the CAS"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12373 = false;
if(value__1987__auto___12373){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12373,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12373,e.message]));
}

}catch (e12258){var t__2020__auto___12374 = e12258;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12374,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12249","meta12249",-237788521,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12248");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12248");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12248.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test12248 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test12248(meta12249){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248(meta12249));
});


kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries = (function kotobase_protocols_worker$kotobase_store_test$concurrent_writers_one_wins_one_retries(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12248(null));
});

(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","concurrent-writers-one-wins-one-retries","kotobase-protocols-worker.kotobase-store-test/concurrent-writers-one-wins-one-retries",-1542958409,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"concurrent-writers-one-wins-one-retries","concurrent-writers-one-wins-one-retries",-146840131,null),"kotobase_protocols_worker/kotobase_store_test.cljs",49,1,116,116,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries)?kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259 = (function (meta12260){
this.meta12260 = meta12260;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12261,meta12260__$1){
var self__ = this;
var _12261__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259(meta12260__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12261){
var self__ = this;
var _12261__$1 = this;
return self__.meta12260;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12263 = (arguments.length - (1));
switch (G__12263) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.prototype.apply = (function (self__,args12262){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12262.length > (20)))?(function (){var G__12264 = args12262.slice((0),(20));
G__12264.push(args12262.slice((20)));

return G__12264;
})():args12262)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var bucket = kotobase_protocols_worker.kotobase_store_test.fake_bucket();
var write_one = (function kotobase_protocols_worker$kotobase_store_test$write_one(i){
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(bucket,"","fold-graph",(function (seed){
var store = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1(seed);
store.kotobase$store$IStore$_put$arity$4(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),(""+"k"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"i","i",-1386841315),i], null));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(store)),new cljs.core.Keyword(null,"response","response",-1068424192),null], null);
}));
});
var write_n = (function kotobase_protocols_worker$kotobase_store_test$write_n(n){
if((n === (0))){
return Promise.resolve(null);
} else {
return write_one(n).then((function (_){
return kotobase_protocols_worker$kotobase_store_test$write_n((n - (1)));
}));
}
});
return write_n((70)).then((function (_){
return kotobase_protocols_worker.kotobase_r2.with_blocks((function (cid){
return kotobase_protocols_worker.kotobase_r2.cached_block_bytes(bucket,"",cid);
}),(function (get_fn){
return kotobase_protocols_worker.kotobase_r2.r2_get_head(bucket,kotobase_protocols_worker.kotobase_r2.head_key("","fold-graph")).then((function (p__12265){
var map__12266 = p__12265;
var map__12266__$1 = cljs.core.__destructure_map(map__12266);
var chain__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12266__$1,new cljs.core.Keyword(null,"chain","chain",15631029));
return kotobase_peer.core.novelty_size(get_fn,chain__$1);
}));
}));
})).then((function (n){
try{var values__1983__auto___12376 = (new cljs.core.List(null,n,(new cljs.core.List(null,(70),null,(1),null)),(2),null));
var result__1984__auto___12377 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._LT_,values__1983__auto___12376);
if(cljs.core.truth_(result__1984__auto___12377)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"pass","pass",1574159993),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),184,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___12376),(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"fail","fail",1706214930),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),184,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___12376),null,(1),null)),(2),null)),(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
}

}catch (e12267){var t__2020__auto___12378 = e12267;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"error","error",-978969032),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),184,t__2020__auto___12378,(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
}
try{var values__1983__auto___12379 = (new cljs.core.List(null,n,(new cljs.core.List(null,(64),null,(1),null)),(2),null));
var result__1984__auto___12380 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._LT_,values__1983__auto___12379);
if(cljs.core.truth_(result__1984__auto___12380)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"pass","pass",1574159993),27,186,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),186,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___12379),"should-fold?'s own threshold means it must be below 64 post-fold"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"fail","fail",1706214930),27,186,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),186,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___12379),null,(1),null)),(2),null)),"should-fold?'s own threshold means it must be below 64 post-fold"]));
}

}catch (e12268){var t__2020__auto___12381 = e12268;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"error","error",-978969032),27,186,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),186,t__2020__auto___12381,"should-fold?'s own threshold means it must be below 64 post-fold"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12382 = false;
if(value__1987__auto___12382){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12382,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12382,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e12269){var t__2020__auto___12383 = e12269;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12383,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12260","meta12260",38669419,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12259");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12259");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12259.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test12259 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test12259(meta12260){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259(meta12260));
});


kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold = (function kotobase_protocols_worker$kotobase_store_test$novelty_folds_past_the_threshold(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12259(null));
});

(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","novelty-folds-past-the-threshold","kotobase-protocols-worker.kotobase-store-test/novelty-folds-past-the-threshold",-1648184396,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"novelty-folds-past-the-threshold","novelty-folds-past-the-threshold",-821050706,null),"kotobase_protocols_worker/kotobase_store_test.cljs",42,1,153,153,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold)?kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270 = (function (meta12271){
this.meta12271 = meta12271;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12272,meta12271__$1){
var self__ = this;
var _12272__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270(meta12271__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12272){
var self__ = this;
var _12272__$1 = this;
return self__.meta12271;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12274 = (arguments.length - (1));
switch (G__12274) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.prototype.apply = (function (self__,args12273){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12273.length > (20)))?(function (){var G__12275 = args12273.slice((0),(20));
G__12275.push(args12273.slice((20)));

return G__12275;
})():args12273)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),"","never-touched-graph").then((function (p__12276){
var map__12277 = p__12276;
var map__12277__$1 = cljs.core.__destructure_map(map__12277);
var chain_present_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12277__$1,new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428));
var novelty_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12277__$1,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361));
var should_fold_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12277__$1,new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095));
try{var values__1983__auto___12385 = (new cljs.core.List(null,chain_present_QMARK_,null,(1),null));
var result__1984__auto___12386 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___12385);
if(cljs.core.truth_(result__1984__auto___12386)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),195,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12385),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),195,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12385),null,(1),null)),(2),null)),null]));
}

}catch (e12278){var t__2020__auto___12387 = e12278;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),195,t__2020__auto___12387,null]));
}
try{var values__1983__auto___12388 = (new cljs.core.List(null,(0),(new cljs.core.List(null,novelty_size,null,(1),null)),(2),null));
var result__1984__auto___12389 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12388);
if(cljs.core.truth_(result__1984__auto___12389)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"pass","pass",1574159993),23,196,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),196,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12388),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"fail","fail",1706214930),23,196,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),196,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12388),null,(1),null)),(2),null)),null]));
}

}catch (e12279){var t__2020__auto___12390 = e12279;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"error","error",-978969032),23,196,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),196,t__2020__auto___12390,null]));
}
try{var values__1983__auto___12391 = (new cljs.core.List(null,should_fold_QMARK_,null,(1),null));
var result__1984__auto___12392 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___12391);
if(cljs.core.truth_(result__1984__auto___12392)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),23,197,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),197,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12391),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),23,197,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),197,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12391),null,(1),null)),(2),null)),null]));
}

}catch (e12280){var t__2020__auto___12393 = e12280;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),23,197,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),197,t__2020__auto___12393,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12394 = false;
if(value__1987__auto___12394){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12394,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12394,e.message]));
}

}catch (e12281){var t__2020__auto___12395 = e12281;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12395,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12271","meta12271",1457804876,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12270");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12270");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12270.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test12270 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test12270(meta12271){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270(meta12271));
});


kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph = (function kotobase_protocols_worker$kotobase_store_test$diagnose_empty_graph(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12270(null));
});

(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","diagnose-empty-graph","kotobase-protocols-worker.kotobase-store-test/diagnose-empty-graph",1152815364,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"diagnose-empty-graph","diagnose-empty-graph",996388414,null),"kotobase_protocols_worker/kotobase_store_test.cljs",30,1,191,191,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph)?kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282 = (function (meta12283){
this.meta12283 = meta12283;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12284,meta12283__$1){
var self__ = this;
var _12284__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282(meta12283__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12284){
var self__ = this;
var _12284__$1 = this;
return self__.meta12283;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12286 = (arguments.length - (1));
switch (G__12286) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.prototype.apply = (function (self__,args12285){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12285.length > (20)))?(function (){var G__12287 = args12285.slice((0),(20));
G__12287.push(args12285.slice((20)));

return G__12287;
})():args12285)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var bucket = kotobase_protocols_worker.kotobase_store_test.fake_bucket();
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(bucket,"","diag-graph",(function (seed){
var store = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1(seed);
store.kotobase$store$IStore$_put$arity$4(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s3","s3",969970109),"bkt"], null),"k",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"v","v",21465059),(1)], null));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(store)),new cljs.core.Keyword(null,"response","response",-1068424192),null], null);
})).then((function (_){
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(bucket,"","diag-graph");
})).then((function (d1){
try{var values__1983__auto___12397 = (new cljs.core.List(null,new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null));
var result__1984__auto___12398 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___12397);
if(cljs.core.truth_(result__1984__auto___12398)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"pass","pass",1574159993),25,212,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12397),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"fail","fail",1706214930),25,212,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12397),null,(1),null)),(2),null)),null]));
}

}catch (e12288){var t__2020__auto___12399 = e12288;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"error","error",-978969032),25,212,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,t__2020__auto___12399,null]));
}
try{var values__1983__auto___12400 = (new cljs.core.List(null,(1),(new cljs.core.List(null,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null)),(2),null));
var result__1984__auto___12401 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12400);
if(cljs.core.truth_(result__1984__auto___12401)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),25,213,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),213,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12400),"one commit, no fold yet, no prior novelty"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),25,213,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),213,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12400),null,(1),null)),(2),null)),"one commit, no fold yet, no prior novelty"]));
}

}catch (e12289){var t__2020__auto___12402 = e12289;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),25,213,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),213,t__2020__auto___12402,"one commit, no fold yet, no prior novelty"]));
}
try{var values__1983__auto___12403 = (new cljs.core.List(null,new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null));
var result__1984__auto___12404 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___12403);
if(cljs.core.truth_(result__1984__auto___12404)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"pass","pass",1574159993),25,214,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),214,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12403),"1 < default threshold 64"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"fail","fail",1706214930),25,214,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),214,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12403),null,(1),null)),(2),null)),"1 < default threshold 64"]));
}

}catch (e12290){var t__2020__auto___12405 = e12290;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"error","error",-978969032),25,214,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),214,t__2020__auto___12405,"1 < default threshold 64"]));
}
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(bucket,"","diag-graph");
})).then((function (d2){
try{var values__1983__auto___12406 = (new cljs.core.List(null,(1),(new cljs.core.List(null,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361).cljs$core$IFn$_invoke$arity$1(d2),null,(1),null)),(2),null));
var result__1984__auto___12407 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12406);
if(cljs.core.truth_(result__1984__auto___12407)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),25,217,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),217,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12406),"calling diagnose! must not itself mutate novelty (read-only)"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),25,217,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),217,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12406),null,(1),null)),(2),null)),"calling diagnose! must not itself mutate novelty (read-only)"]));
}

}catch (e12291){var t__2020__auto___12408 = e12291;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),25,217,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),217,t__2020__auto___12408,"calling diagnose! must not itself mutate novelty (read-only)"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12409 = false;
if(value__1987__auto___12409){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12409,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12409,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e12292){var t__2020__auto___12410 = e12292;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12410,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12283","meta12283",825524963,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12282");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12282");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test12282.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test12282 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test12282(meta12283){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282(meta12283));
});


kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only = (function kotobase_protocols_worker$kotobase_store_test$diagnose_after_one_commit_is_read_only(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test12282(null));
});

(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","diagnose-after-one-commit-is-read-only","kotobase-protocols-worker.kotobase-store-test/diagnose-after-one-commit-is-read-only",2032179897,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"diagnose-after-one-commit-is-read-only","diagnose-after-one-commit-is-read-only",-2007635577,null),"kotobase_protocols_worker/kotobase_store_test.cljs",48,1,201,201,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only)?kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$test:null)])));
kotobase_protocols_worker.kotobase_store_test.read_string_literal_agrees_with_the_edn_reader = (function kotobase_protocols_worker$kotobase_store_test$read_string_literal_agrees_with_the_edn_reader(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.read_string_literal_agrees_with_the_edn_reader.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.read_string_literal_agrees_with_the_edn_reader.cljs$lang$test = (function (){
var seq__12293 = cljs.core.seq(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["hello world","he said \"hi\"","a\\b","line1\nline2","a\tb","{:a 1 :b \"two\" :c #{1 2}}","a/b",""], null));
var chunk__12294 = null;
var count__12295 = (0);
var i__12296 = (0);
while(true){
if((i__12296 < count__12295)){
var s = chunk__12294.cljs$core$IIndexed$_nth$arity$2(null,i__12296);
var wire_12411 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0));
try{var values__1983__auto___12412 = (new cljs.core.List(null,s,(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal(wire_12411),null,(1),null)),(2),null));
var result__1984__auto___12413 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12412);
if(cljs.core.truth_(result__1984__auto___12413)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),11,241,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),241,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12412),(""+"fast path must round-trip "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),11,241,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),241,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12412),null,(1),null)),(2),null)),(""+"fast path must round-trip "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}

}catch (e12301){var t__2020__auto___12414 = e12301;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),11,241,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),241,t__2020__auto___12414,(""+"fast path must round-trip "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}
try{var values__1983__auto___12415 = (new cljs.core.List(null,clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(wire_12411),(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal(wire_12411),null,(1),null)),(2),null));
var result__1984__auto___12416 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12415);
if(cljs.core.truth_(result__1984__auto___12416)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"pass","pass",1574159993),11,243,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol("edn","read-string","edn/read-string",-558816566,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),243,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12415),(""+"fast and slow paths must agree on "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"fail","fail",1706214930),11,243,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol("edn","read-string","edn/read-string",-558816566,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),243,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12415),null,(1),null)),(2),null)),(""+"fast and slow paths must agree on "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}

}catch (e12302){var t__2020__auto___12417 = e12302;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"error","error",-978969032),11,243,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol("edn","read-string","edn/read-string",-558816566,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),243,t__2020__auto___12417,(""+"fast and slow paths must agree on "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}

var G__12418 = seq__12293;
var G__12419 = chunk__12294;
var G__12420 = count__12295;
var G__12421 = (i__12296 + (1));
seq__12293 = G__12418;
chunk__12294 = G__12419;
count__12295 = G__12420;
i__12296 = G__12421;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__12293);
if(temp__5825__auto__){
var seq__12293__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12293__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__12293__$1);
var G__12422 = cljs.core.chunk_rest(seq__12293__$1);
var G__12423 = c__5694__auto__;
var G__12424 = cljs.core.count(c__5694__auto__);
var G__12425 = (0);
seq__12293 = G__12422;
chunk__12294 = G__12423;
count__12295 = G__12424;
i__12296 = G__12425;
continue;
} else {
var s = cljs.core.first(seq__12293__$1);
var wire_12426 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0));
try{var values__1983__auto___12427 = (new cljs.core.List(null,s,(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal(wire_12426),null,(1),null)),(2),null));
var result__1984__auto___12428 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12427);
if(cljs.core.truth_(result__1984__auto___12428)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),11,241,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),241,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12427),(""+"fast path must round-trip "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),11,241,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),241,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12427),null,(1),null)),(2),null)),(""+"fast path must round-trip "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}

}catch (e12303){var t__2020__auto___12429 = e12303;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),11,241,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),241,t__2020__auto___12429,(""+"fast path must round-trip "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}
try{var values__1983__auto___12430 = (new cljs.core.List(null,clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(wire_12426),(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal(wire_12426),null,(1),null)),(2),null));
var result__1984__auto___12431 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12430);
if(cljs.core.truth_(result__1984__auto___12431)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"pass","pass",1574159993),11,243,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol("edn","read-string","edn/read-string",-558816566,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),243,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12430),(""+"fast and slow paths must agree on "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"fail","fail",1706214930),11,243,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol("edn","read-string","edn/read-string",-558816566,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),243,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12430),null,(1),null)),(2),null)),(""+"fast and slow paths must agree on "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}

}catch (e12304){var t__2020__auto___12432 = e12304;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"error","error",-978969032),11,243,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol("edn","read-string","edn/read-string",-558816566,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),243,t__2020__auto___12432,(""+"fast and slow paths must agree on "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s], 0))))]));
}

var G__12433 = cljs.core.next(seq__12293__$1);
var G__12434 = null;
var G__12435 = (0);
var G__12436 = (0);
seq__12293 = G__12433;
chunk__12294 = G__12434;
count__12295 = G__12435;
i__12296 = G__12436;
continue;
}
} else {
return null;
}
}
break;
}
});

(kotobase_protocols_worker.kotobase_store_test.read_string_literal_agrees_with_the_edn_reader.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.read_string_literal_agrees_with_the_edn_reader;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","read-string-literal-agrees-with-the-edn-reader","kotobase-protocols-worker.kotobase-store-test/read-string-literal-agrees-with-the-edn-reader",1575003205,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"read-string-literal-agrees-with-the-edn-reader","read-string-literal-agrees-with-the-edn-reader",-1397516465,null),"kotobase_protocols_worker/kotobase_store_test.cljs",56,1,231,231,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.read_string_literal_agrees_with_the_edn_reader)?kotobase_protocols_worker.kotobase_store_test.read_string_literal_agrees_with_the_edn_reader.cljs$lang$test:null)])));
kotobase_protocols_worker.kotobase_store_test.read_string_literal_falls_back_on_raw_control_characters = (function kotobase_protocols_worker$kotobase_store_test$read_string_literal_falls_back_on_raw_control_characters(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.read_string_literal_falls_back_on_raw_control_characters.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.read_string_literal_falls_back_on_raw_control_characters.cljs$lang$test = (function (){
var seq__12305 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(27),(31)], null));
var chunk__12306 = null;
var count__12307 = (0);
var i__12308 = (0);
while(true){
if((i__12308 < count__12307)){
var code = chunk__12306.cljs$core$IIndexed$_nth$arity$2(null,i__12308);
var s_12437 = (""+"a"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code))+"b");
var wire_12438 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s_12437], 0));
try{var values__1983__auto___12439 = (new cljs.core.List(null,(function (){try{return JSON.parse(wire_12438);
}catch (e12316){var _ = e12316;
return null;
}})(),null,(1),null));
var result__1984__auto___12440 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,values__1983__auto___12439);
if(cljs.core.truth_(result__1984__auto___12440)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"pass","pass",1574159993),11,253,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol(null,"try","try",-1273693247,null),cljs.core.list(new cljs.core.Symbol("js","JSON.parse","js/JSON.parse",8393822,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Symbol(null,"_","_",-1201019570,null),null))),253,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12439),(""+"precondition: JSON.parse cannot read control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"fail","fail",1706214930),11,253,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol(null,"try","try",-1273693247,null),cljs.core.list(new cljs.core.Symbol("js","JSON.parse","js/JSON.parse",8393822,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Symbol(null,"_","_",-1201019570,null),null))),253,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12439),null,(1),null)),(2),null)),(""+"precondition: JSON.parse cannot read control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}

}catch (e12315){var t__2020__auto___12441 = e12315;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"error","error",-978969032),11,253,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol(null,"try","try",-1273693247,null),cljs.core.list(new cljs.core.Symbol("js","JSON.parse","js/JSON.parse",8393822,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Symbol(null,"_","_",-1201019570,null),null))),253,t__2020__auto___12441,(""+"precondition: JSON.parse cannot read control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}
try{var values__1983__auto___12442 = (new cljs.core.List(null,s_12437,(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal(wire_12438),null,(1),null)),(2),null));
var result__1984__auto___12443 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12442);
if(cljs.core.truth_(result__1984__auto___12443)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),11,255,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),255,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12442),(""+"fallback must recover control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),11,255,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),255,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12442),null,(1),null)),(2),null)),(""+"fallback must recover control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}

}catch (e12317){var t__2020__auto___12444 = e12317;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),11,255,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),255,t__2020__auto___12444,(""+"fallback must recover control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}

var G__12445 = seq__12305;
var G__12446 = chunk__12306;
var G__12447 = count__12307;
var G__12448 = (i__12308 + (1));
seq__12305 = G__12445;
chunk__12306 = G__12446;
count__12307 = G__12447;
i__12308 = G__12448;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__12305);
if(temp__5825__auto__){
var seq__12305__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12305__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__12305__$1);
var G__12449 = cljs.core.chunk_rest(seq__12305__$1);
var G__12450 = c__5694__auto__;
var G__12451 = cljs.core.count(c__5694__auto__);
var G__12452 = (0);
seq__12305 = G__12449;
chunk__12306 = G__12450;
count__12307 = G__12451;
i__12308 = G__12452;
continue;
} else {
var code = cljs.core.first(seq__12305__$1);
var s_12453 = (""+"a"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code))+"b");
var wire_12454 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s_12453], 0));
try{var values__1983__auto___12455 = (new cljs.core.List(null,(function (){try{return JSON.parse(wire_12454);
}catch (e12319){var _ = e12319;
return null;
}})(),null,(1),null));
var result__1984__auto___12456 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,values__1983__auto___12455);
if(cljs.core.truth_(result__1984__auto___12456)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"pass","pass",1574159993),11,253,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol(null,"try","try",-1273693247,null),cljs.core.list(new cljs.core.Symbol("js","JSON.parse","js/JSON.parse",8393822,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Symbol(null,"_","_",-1201019570,null),null))),253,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12455),(""+"precondition: JSON.parse cannot read control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"fail","fail",1706214930),11,253,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol(null,"try","try",-1273693247,null),cljs.core.list(new cljs.core.Symbol("js","JSON.parse","js/JSON.parse",8393822,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Symbol(null,"_","_",-1201019570,null),null))),253,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12455),null,(1),null)),(2),null)),(""+"precondition: JSON.parse cannot read control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}

}catch (e12318){var t__2020__auto___12457 = e12318;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",67,new cljs.core.Keyword(null,"error","error",-978969032),11,253,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol(null,"try","try",-1273693247,null),cljs.core.list(new cljs.core.Symbol("js","JSON.parse","js/JSON.parse",8393822,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null)),cljs.core.list(new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Symbol(null,"_","_",-1201019570,null),null))),253,t__2020__auto___12457,(""+"precondition: JSON.parse cannot read control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}
try{var values__1983__auto___12458 = (new cljs.core.List(null,s_12453,(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal(wire_12454),null,(1),null)),(2),null));
var result__1984__auto___12459 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12458);
if(cljs.core.truth_(result__1984__auto___12459)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),11,255,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),255,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12458),(""+"fallback must recover control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),11,255,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),255,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12458),null,(1),null)),(2),null)),(""+"fallback must recover control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}

}catch (e12320){var t__2020__auto___12460 = e12320;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),11,255,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"s","s",-948495851,null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),new cljs.core.Symbol(null,"wire","wire",-1423759475,null))),255,t__2020__auto___12460,(""+"fallback must recover control char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code))]));
}

var G__12461 = cljs.core.next(seq__12305__$1);
var G__12462 = null;
var G__12463 = (0);
var G__12464 = (0);
seq__12305 = G__12461;
chunk__12306 = G__12462;
count__12307 = G__12463;
i__12308 = G__12464;
continue;
}
} else {
return null;
}
}
break;
}
});

(kotobase_protocols_worker.kotobase_store_test.read_string_literal_falls_back_on_raw_control_characters.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.read_string_literal_falls_back_on_raw_control_characters;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","read-string-literal-falls-back-on-raw-control-characters","kotobase-protocols-worker.kotobase-store-test/read-string-literal-falls-back-on-raw-control-characters",1259860653,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"read-string-literal-falls-back-on-raw-control-characters","read-string-literal-falls-back-on-raw-control-characters",-1170029657,null),"kotobase_protocols_worker/kotobase_store_test.cljs",66,1,246,246,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.read_string_literal_falls_back_on_raw_control_characters)?kotobase_protocols_worker.kotobase_store_test.read_string_literal_falls_back_on_raw_control_characters.cljs$lang$test:null)])));
kotobase_protocols_worker.kotobase_store_test.read_string_literal_refuses_non_strings = (function kotobase_protocols_worker$kotobase_store_test$read_string_literal_refuses_non_strings(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.read_string_literal_refuses_non_strings.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.read_string_literal_refuses_non_strings.cljs$lang$test = (function (){
try{var values__1983__auto___12465 = (new cljs.core.List(null,(123),(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal("123"),null,(1),null)),(2),null));
var result__1984__auto___12466 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12465);
if(cljs.core.truth_(result__1984__auto___12466)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",45,new cljs.core.Keyword(null,"pass","pass",1574159993),7,262,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(123),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"123")),262,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12465),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",45,new cljs.core.Keyword(null,"fail","fail",1706214930),7,262,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(123),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"123")),262,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12465),null,(1),null)),(2),null)),null]));
}

}catch (e12321){var t__2020__auto___12467 = e12321;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",45,new cljs.core.Keyword(null,"error","error",-978969032),7,262,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(123),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"123")),262,t__2020__auto___12467,null]));
}
try{var values__1983__auto___12468 = (new cljs.core.List(null,new cljs.core.Symbol(null,"null","null",1460393818,null),(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal("null"),null,(1),null)),(2),null));
var result__1984__auto___12469 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12468);
if(cljs.core.truth_(result__1984__auto___12469)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",48,new cljs.core.Keyword(null,"pass","pass",1574159993),7,263,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),new cljs.core.Symbol(null,"null","null",1460393818,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"null")),263,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12468),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",48,new cljs.core.Keyword(null,"fail","fail",1706214930),7,263,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),new cljs.core.Symbol(null,"null","null",1460393818,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"null")),263,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12468),null,(1),null)),(2),null)),null]));
}

}catch (e12322){var t__2020__auto___12470 = e12322;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",48,new cljs.core.Keyword(null,"error","error",-978969032),7,263,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),new cljs.core.Symbol(null,"null","null",1460393818,null)),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"null")),263,t__2020__auto___12470,null]));
}
try{var values__1983__auto__ = (new cljs.core.List(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(2)], null),(new cljs.core.List(null,kotobase_protocols_worker.kotobase_store.read_string_literal("[1 2]"),null,(1),null)),(2),null));
var result__1984__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto__);
if(cljs.core.truth_(result__1984__auto__)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),7,264,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(2)], null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"[1 2]")),264,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto__),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),7,264,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(2)], null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"[1 2]")),264,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto__),null,(1),null)),(2),null)),null]));
}

return result__1984__auto__;
}catch (e12323){var t__2020__auto__ = e12323;
return cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),7,264,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(2)], null),cljs.core.list(new cljs.core.Symbol("ks","read-string-literal","ks/read-string-literal",1017166840,null),"[1 2]")),264,t__2020__auto__,null]));
}});

(kotobase_protocols_worker.kotobase_store_test.read_string_literal_refuses_non_strings.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.read_string_literal_refuses_non_strings;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","read-string-literal-refuses-non-strings","kotobase-protocols-worker.kotobase-store-test/read-string-literal-refuses-non-strings",-417423638,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"read-string-literal-refuses-non-strings","read-string-literal-refuses-non-strings",-1775374368,null),"kotobase_protocols_worker/kotobase_store_test.cljs",49,1,258,258,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.read_string_literal_refuses_non_strings)?kotobase_protocols_worker.kotobase_store_test.read_string_literal_refuses_non_strings.cljs$lang$test:null)])));

//# sourceMappingURL=kotobase_protocols_worker.kotobase_store_test.js.map
