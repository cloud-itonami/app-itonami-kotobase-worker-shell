goog.provide('kotobase_protocols_worker.kotobase_store_test');
kotobase_protocols_worker.kotobase_store_test.fake_bucket = (function kotobase_protocols_worker$kotobase_store_test$fake_bucket(){
var store = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var next_etag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
return ({"get": (function (k){
return Promise.resolve((function (){var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(store),k);
if(cljs.core.truth_(temp__5825__auto__)){
var map__9465 = temp__5825__auto__;
var map__9465__$1 = cljs.core.__destructure_map(map__9465);
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"val","val",128701612));
var etag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9465__$1,new cljs.core.Keyword(null,"etag","etag",-329255476));
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
var required = (function (){var G__9466 = opts;
var G__9466__$1 = (((G__9466 == null))?null:G__9466.onlyIf);
if((G__9466__$1 == null)){
return null;
} else {
return G__9466__$1.etagMatches;
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = required;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(required,(function (){var G__9467 = current;
var G__9467__$1 = (((G__9467 == null))?null:new cljs.core.Keyword(null,"etag","etag",-329255476).cljs$core$IFn$_invoke$arity$1(G__9467));
if((G__9467__$1 == null)){
return null;
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__9467__$1));
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
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_ = (function kotobase_protocols_worker$kotobase_store_test$apply_op_BANG_(store,p__9468){
var vec__9469 = p__9468;
var seq__9470 = cljs.core.seq(vec__9469);
var first__9471 = cljs.core.first(seq__9470);
var seq__9470__$1 = cljs.core.next(seq__9470);
var op = first__9471;
var args = seq__9470__$1;
var G__9472 = op;
var G__9472__$1 = (((G__9472 instanceof cljs.core.Keyword))?G__9472.fqn:null);
switch (G__9472__$1) {
case "put":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(kotobase.store._put,store,args);

break;
case "append":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(kotobase.store._append,store,args);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__9472__$1))));

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
})).then((function (p__9475){
var map__9476 = p__9475;
var map__9476__$1 = cljs.core.__destructure_map(map__9476);
var persisted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9476__$1,new cljs.core.Keyword(null,"persisted","persisted",-900171345));
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
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477 = (function (meta9478){
this.meta9478 = meta9478;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9479,meta9478__$1){
var self__ = this;
var _9479__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477(meta9478__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9479){
var self__ = this;
var _9479__$1 = this;
return self__.meta9478;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__9481 = (arguments.length - (1));
switch (G__9481) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.prototype.apply = (function (self__,args9480){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args9480.length > (20)))?(function (){var G__9482 = args9480.slice((0),(20));
G__9482.push(args9480.slice((20)));

return G__9482;
})():args9480)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var oracle = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$0();
var seq__9483_9551 = cljs.core.seq(kotobase_protocols_worker.kotobase_store_test.ops_1);
var chunk__9484_9552 = null;
var count__9485_9553 = (0);
var i__9486_9554 = (0);
while(true){
if((i__9486_9554 < count__9485_9553)){
var op_9555 = chunk__9484_9552.cljs$core$IIndexed$_nth$arity$2(null,i__9486_9554);
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_(oracle,op_9555);


var G__9556 = seq__9483_9551;
var G__9557 = chunk__9484_9552;
var G__9558 = count__9485_9553;
var G__9559 = (i__9486_9554 + (1));
seq__9483_9551 = G__9556;
chunk__9484_9552 = G__9557;
count__9485_9553 = G__9558;
i__9486_9554 = G__9559;
continue;
} else {
var temp__5825__auto___9560 = cljs.core.seq(seq__9483_9551);
if(temp__5825__auto___9560){
var seq__9483_9561__$1 = temp__5825__auto___9560;
if(cljs.core.chunked_seq_QMARK_(seq__9483_9561__$1)){
var c__5694__auto___9562 = cljs.core.chunk_first(seq__9483_9561__$1);
var G__9563 = cljs.core.chunk_rest(seq__9483_9561__$1);
var G__9564 = c__5694__auto___9562;
var G__9565 = cljs.core.count(c__5694__auto___9562);
var G__9566 = (0);
seq__9483_9551 = G__9563;
chunk__9484_9552 = G__9564;
count__9485_9553 = G__9565;
i__9486_9554 = G__9566;
continue;
} else {
var op_9567 = cljs.core.first(seq__9483_9561__$1);
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_(oracle,op_9567);


var G__9568 = cljs.core.next(seq__9483_9561__$1);
var G__9569 = null;
var G__9570 = (0);
var G__9571 = (0);
seq__9483_9551 = G__9568;
chunk__9484_9552 = G__9569;
count__9485_9553 = G__9570;
i__9486_9554 = G__9571;
continue;
}
} else {
}
}
break;
}

var expected = kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(oracle));
return kotobase_protocols_worker.kotobase_store_test.run_through_datom_store_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),kotobase_protocols_worker.kotobase_store_test.ops_1).then((function (p__9487){
var map__9488 = p__9487;
var map__9488__$1 = cljs.core.__destructure_map(map__9488);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9488__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["content-addressed round-trip (multiple sequential commits + a fresh hydrate) matches the LocalStore oracle exactly"], 0));

try{try{var values__1983__auto___9572 = (new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(expected),(new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___9573 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___9572);
if(cljs.core.truth_(result__1984__auto___9573)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"pass","pass",1574159993),23,95,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),95,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9572),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"fail","fail",1706214930),23,95,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),95,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9572),null,(1),null)),(2),null)),null]));
}

}catch (e9489){var t__2020__auto___9574 = e9489;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"error","error",-978969032),23,95,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),95,t__2020__auto___9574,null]));
}
try{var values__1983__auto___9575 = (new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(expected),(new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___9576 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___9575);
if(cljs.core.truth_(result__1984__auto___9576)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"pass","pass",1574159993),23,96,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),96,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9575),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"fail","fail",1706214930),23,96,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),96,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9575),null,(1),null)),(2),null)),null]));
}

}catch (e9490){var t__2020__auto___9577 = e9490;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"error","error",-978969032),23,96,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),96,t__2020__auto___9577,null]));
}}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___9578 = false;
if(value__1987__auto___9578){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___9578,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___9578,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e9491){var t__2020__auto___9579 = e9491;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___9579,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta9478","meta9478",1976740435,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9477");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9477");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9477.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test9477 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test9477(meta9478){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477(meta9478));
});


kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store = (function kotobase_protocols_worker$kotobase_store_test$datom_store_equals_local_store(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9477(null));
});

(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","datom-store-equals-local-store","kotobase-protocols-worker.kotobase-store-test/datom-store-equals-local-store",1419377560,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"datom-store-equals-local-store","datom-store-equals-local-store",97200870,null),"kotobase_protocols_worker/kotobase_store_test.cljs",40,1,86,86,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store)?kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492 = (function (meta9493){
this.meta9493 = meta9493;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9494,meta9493__$1){
var self__ = this;
var _9494__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492(meta9493__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9494){
var self__ = this;
var _9494__$1 = this;
return self__.meta9493;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__9496 = (arguments.length - (1));
switch (G__9496) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.prototype.apply = (function (self__,args9495){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args9495.length > (20)))?(function (){var G__9497 = args9495.slice((0),(20));
G__9497.push(args9495.slice((20)));

return G__9497;
})():args9495)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),"","brand-new-graph",(function (seed){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(seed),new cljs.core.Keyword(null,"response","response",-1068424192),seed], null);
})).then((function (p__9498){
var map__9499 = p__9498;
var map__9499__$1 = cljs.core.__destructure_map(map__9499);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9499__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
var persisted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9499__$1,new cljs.core.Keyword(null,"persisted","persisted",-900171345));
try{var value__1987__auto___9581 = persisted;
if(cljs.core.truth_(value__1987__auto___9581)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"pass","pass",1574159993),23,108,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),108,value__1987__auto___9581,null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"fail","fail",1706214930),23,108,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),108,value__1987__auto___9581,null]));
}

}catch (e9500){var t__2020__auto___9582 = e9500;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"error","error",-978969032),23,108,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),108,t__2020__auto___9582,null]));
}
try{var values__1983__auto___9583 = (new cljs.core.List(null,cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___9584 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___9583);
if(cljs.core.truth_(result__1984__auto___9584)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),23,109,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),109,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9583),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),23,109,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),109,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9583),null,(1),null)),(2),null)),null]));
}

}catch (e9501){var t__2020__auto___9585 = e9501;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),23,109,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),109,t__2020__auto___9585,null]));
}
try{var values__1983__auto___9586 = (new cljs.core.List(null,cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___9587 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___9586);
if(cljs.core.truth_(result__1984__auto___9587)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),23,110,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),110,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9586),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),23,110,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),110,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9586),null,(1),null)),(2),null)),null]));
}

}catch (e9502){var t__2020__auto___9588 = e9502;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),23,110,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),110,t__2020__auto___9588,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___9589 = false;
if(value__1987__auto___9589){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___9589,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___9589,e.message]));
}

}catch (e9503){var t__2020__auto___9590 = e9503;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___9590,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta9493","meta9493",83279650,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9492");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9492");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9492.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test9492 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test9492(meta9493){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492(meta9493));
});


kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty = (function kotobase_protocols_worker$kotobase_store_test$empty_graph_hydrates_empty(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9492(null));
});

(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","empty-graph-hydrates-empty","kotobase-protocols-worker.kotobase-store-test/empty-graph-hydrates-empty",816979834,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"empty-graph-hydrates-empty","empty-graph-hydrates-empty",1180813436,null),"kotobase_protocols_worker/kotobase_store_test.cljs",36,1,102,102,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty)?kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504 = (function (meta9505){
this.meta9505 = meta9505;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9506,meta9505__$1){
var self__ = this;
var _9506__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504(meta9505__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9506){
var self__ = this;
var _9506__$1 = this;
return self__.meta9505;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__9508 = (arguments.length - (1));
switch (G__9508) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.prototype.apply = (function (self__,args9507){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args9507.length > (20)))?(function (){var G__9509 = args9507.slice((0),(20));
G__9509.push(args9507.slice((20)));

return G__9509;
})():args9507)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
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
var vec__9510_9592 = cljs.core.vec(results);
var a_9593 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9510_9592,(0),null);
var b_9594 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9510_9592,(1),null);
try{var values__1983__auto___9595 = (new cljs.core.List(null,new cljs.core.Keyword(null,"persisted","persisted",-900171345).cljs$core$IFn$_invoke$arity$1(a_9593),(new cljs.core.List(null,new cljs.core.Keyword(null,"persisted","persisted",-900171345).cljs$core$IFn$_invoke$arity$1(b_9594),null,(1),null)),(2),null));
var result__1984__auto___9596 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.not_EQ_,values__1983__auto___9595);
if(cljs.core.truth_(result__1984__auto___9596)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"pass","pass",1574159993),27,146,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),146,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___9595),"exactly one of the two racing writers must lose the CAS"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"fail","fail",1706214930),27,146,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),146,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___9595),null,(1),null)),(2),null)),"exactly one of the two racing writers must lose the CAS"]));
}

}catch (e9513){var t__2020__auto___9597 = e9513;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"error","error",-978969032),27,146,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),146,t__2020__auto___9597,"exactly one of the two racing writers must lose the CAS"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___9598 = false;
if(value__1987__auto___9598){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___9598,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___9598,e.message]));
}

}catch (e9514){var t__2020__auto___9599 = e9514;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___9599,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta9505","meta9505",-1907795903,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9504");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9504");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9504.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test9504 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test9504(meta9505){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504(meta9505));
});


kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries = (function kotobase_protocols_worker$kotobase_store_test$concurrent_writers_one_wins_one_retries(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9504(null));
});

(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","concurrent-writers-one-wins-one-retries","kotobase-protocols-worker.kotobase-store-test/concurrent-writers-one-wins-one-retries",-1542958409,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"concurrent-writers-one-wins-one-retries","concurrent-writers-one-wins-one-retries",-146840131,null),"kotobase_protocols_worker/kotobase_store_test.cljs",49,1,114,114,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries)?kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515 = (function (meta9516){
this.meta9516 = meta9516;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9517,meta9516__$1){
var self__ = this;
var _9517__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515(meta9516__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9517){
var self__ = this;
var _9517__$1 = this;
return self__.meta9516;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__9519 = (arguments.length - (1));
switch (G__9519) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.prototype.apply = (function (self__,args9518){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args9518.length > (20)))?(function (){var G__9520 = args9518.slice((0),(20));
G__9520.push(args9518.slice((20)));

return G__9520;
})():args9518)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
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
return kotobase_protocols_worker.kotobase_r2.r2_get_head(bucket,kotobase_protocols_worker.kotobase_r2.head_key("","fold-graph")).then((function (p__9521){
var map__9522 = p__9521;
var map__9522__$1 = cljs.core.__destructure_map(map__9522);
var chain__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9522__$1,new cljs.core.Keyword(null,"chain","chain",15631029));
return kotobase_peer.core.novelty_size(get_fn,chain__$1);
}));
}));
})).then((function (n){
try{var values__1983__auto___9601 = (new cljs.core.List(null,n,(new cljs.core.List(null,(70),null,(1),null)),(2),null));
var result__1984__auto___9602 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._LT_,values__1983__auto___9601);
if(cljs.core.truth_(result__1984__auto___9602)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"pass","pass",1574159993),27,182,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),182,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___9601),(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"fail","fail",1706214930),27,182,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),182,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___9601),null,(1),null)),(2),null)),(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
}

}catch (e9523){var t__2020__auto___9603 = e9523;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"error","error",-978969032),27,182,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),182,t__2020__auto___9603,(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
}
try{var values__1983__auto___9604 = (new cljs.core.List(null,n,(new cljs.core.List(null,(64),null,(1),null)),(2),null));
var result__1984__auto___9605 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._LT_,values__1983__auto___9604);
if(cljs.core.truth_(result__1984__auto___9605)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"pass","pass",1574159993),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),184,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___9604),"should-fold?'s own threshold means it must be below 64 post-fold"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"fail","fail",1706214930),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),184,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___9604),null,(1),null)),(2),null)),"should-fold?'s own threshold means it must be below 64 post-fold"]));
}

}catch (e9524){var t__2020__auto___9606 = e9524;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"error","error",-978969032),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),184,t__2020__auto___9606,"should-fold?'s own threshold means it must be below 64 post-fold"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___9607 = false;
if(value__1987__auto___9607){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___9607,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___9607,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e9525){var t__2020__auto___9608 = e9525;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___9608,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta9516","meta9516",-1416657954,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9515");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9515");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9515.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test9515 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test9515(meta9516){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515(meta9516));
});


kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold = (function kotobase_protocols_worker$kotobase_store_test$novelty_folds_past_the_threshold(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9515(null));
});

(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","novelty-folds-past-the-threshold","kotobase-protocols-worker.kotobase-store-test/novelty-folds-past-the-threshold",-1648184396,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"novelty-folds-past-the-threshold","novelty-folds-past-the-threshold",-821050706,null),"kotobase_protocols_worker/kotobase_store_test.cljs",42,1,151,151,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold)?kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526 = (function (meta9527){
this.meta9527 = meta9527;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9528,meta9527__$1){
var self__ = this;
var _9528__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526(meta9527__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9528){
var self__ = this;
var _9528__$1 = this;
return self__.meta9527;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__9530 = (arguments.length - (1));
switch (G__9530) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.prototype.apply = (function (self__,args9529){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args9529.length > (20)))?(function (){var G__9531 = args9529.slice((0),(20));
G__9531.push(args9529.slice((20)));

return G__9531;
})():args9529)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),"","never-touched-graph").then((function (p__9532){
var map__9533 = p__9532;
var map__9533__$1 = cljs.core.__destructure_map(map__9533);
var chain_present_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9533__$1,new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428));
var novelty_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9533__$1,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361));
var should_fold_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9533__$1,new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095));
try{var values__1983__auto___9610 = (new cljs.core.List(null,chain_present_QMARK_,null,(1),null));
var result__1984__auto___9611 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___9610);
if(cljs.core.truth_(result__1984__auto___9611)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),23,193,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),193,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___9610),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),23,193,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),193,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___9610),null,(1),null)),(2),null)),null]));
}

}catch (e9534){var t__2020__auto___9612 = e9534;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),23,193,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),193,t__2020__auto___9612,null]));
}
try{var values__1983__auto___9613 = (new cljs.core.List(null,(0),(new cljs.core.List(null,novelty_size,null,(1),null)),(2),null));
var result__1984__auto___9614 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___9613);
if(cljs.core.truth_(result__1984__auto___9614)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"pass","pass",1574159993),23,194,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),194,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9613),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"fail","fail",1706214930),23,194,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),194,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9613),null,(1),null)),(2),null)),null]));
}

}catch (e9535){var t__2020__auto___9615 = e9535;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"error","error",-978969032),23,194,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),194,t__2020__auto___9615,null]));
}
try{var values__1983__auto___9616 = (new cljs.core.List(null,should_fold_QMARK_,null,(1),null));
var result__1984__auto___9617 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___9616);
if(cljs.core.truth_(result__1984__auto___9617)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),195,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___9616),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),195,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___9616),null,(1),null)),(2),null)),null]));
}

}catch (e9536){var t__2020__auto___9618 = e9536;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),195,t__2020__auto___9618,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___9619 = false;
if(value__1987__auto___9619){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___9619,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___9619,e.message]));
}

}catch (e9537){var t__2020__auto___9620 = e9537;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___9620,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta9527","meta9527",871653928,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9526");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9526");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9526.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test9526 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test9526(meta9527){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526(meta9527));
});


kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph = (function kotobase_protocols_worker$kotobase_store_test$diagnose_empty_graph(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9526(null));
});

(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","diagnose-empty-graph","kotobase-protocols-worker.kotobase-store-test/diagnose-empty-graph",1152815364,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"diagnose-empty-graph","diagnose-empty-graph",996388414,null),"kotobase_protocols_worker/kotobase_store_test.cljs",30,1,189,189,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph)?kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538 = (function (meta9539){
this.meta9539 = meta9539;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9540,meta9539__$1){
var self__ = this;
var _9540__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538(meta9539__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9540){
var self__ = this;
var _9540__$1 = this;
return self__.meta9539;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__9542 = (arguments.length - (1));
switch (G__9542) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.prototype.apply = (function (self__,args9541){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args9541.length > (20)))?(function (){var G__9543 = args9541.slice((0),(20));
G__9543.push(args9541.slice((20)));

return G__9543;
})():args9541)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
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
try{var values__1983__auto___9622 = (new cljs.core.List(null,new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null));
var result__1984__auto___9623 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___9622);
if(cljs.core.truth_(result__1984__auto___9623)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"pass","pass",1574159993),25,210,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),210,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___9622),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"fail","fail",1706214930),25,210,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),210,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___9622),null,(1),null)),(2),null)),null]));
}

}catch (e9544){var t__2020__auto___9624 = e9544;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"error","error",-978969032),25,210,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),210,t__2020__auto___9624,null]));
}
try{var values__1983__auto___9625 = (new cljs.core.List(null,(1),(new cljs.core.List(null,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null)),(2),null));
var result__1984__auto___9626 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___9625);
if(cljs.core.truth_(result__1984__auto___9626)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),25,211,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),211,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9625),"one commit, no fold yet, no prior novelty"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),25,211,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),211,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9625),null,(1),null)),(2),null)),"one commit, no fold yet, no prior novelty"]));
}

}catch (e9545){var t__2020__auto___9627 = e9545;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),25,211,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),211,t__2020__auto___9627,"one commit, no fold yet, no prior novelty"]));
}
try{var values__1983__auto___9628 = (new cljs.core.List(null,new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null));
var result__1984__auto___9629 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___9628);
if(cljs.core.truth_(result__1984__auto___9629)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"pass","pass",1574159993),25,212,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___9628),"1 < default threshold 64"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"fail","fail",1706214930),25,212,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___9628),null,(1),null)),(2),null)),"1 < default threshold 64"]));
}

}catch (e9546){var t__2020__auto___9630 = e9546;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"error","error",-978969032),25,212,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,t__2020__auto___9630,"1 < default threshold 64"]));
}
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(bucket,"","diag-graph");
})).then((function (d2){
try{var values__1983__auto___9631 = (new cljs.core.List(null,(1),(new cljs.core.List(null,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361).cljs$core$IFn$_invoke$arity$1(d2),null,(1),null)),(2),null));
var result__1984__auto___9632 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___9631);
if(cljs.core.truth_(result__1984__auto___9632)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),25,215,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),215,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9631),"calling diagnose! must not itself mutate novelty (read-only)"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),25,215,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),215,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___9631),null,(1),null)),(2),null)),"calling diagnose! must not itself mutate novelty (read-only)"]));
}

}catch (e9547){var t__2020__auto___9633 = e9547;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),25,215,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),215,t__2020__auto___9633,"calling diagnose! must not itself mutate novelty (read-only)"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___9634 = false;
if(value__1987__auto___9634){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___9634,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___9634,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e9548){var t__2020__auto___9635 = e9548;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___9635,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta9539","meta9539",-333271771,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9538");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9538");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test9538.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test9538 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test9538(meta9539){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538(meta9539));
});


kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only = (function kotobase_protocols_worker$kotobase_store_test$diagnose_after_one_commit_is_read_only(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test9538(null));
});

(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","diagnose-after-one-commit-is-read-only","kotobase-protocols-worker.kotobase-store-test/diagnose-after-one-commit-is-read-only",2032179897,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"diagnose-after-one-commit-is-read-only","diagnose-after-one-commit-is-read-only",-2007635577,null),"kotobase_protocols_worker/kotobase_store_test.cljs",48,1,199,199,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only)?kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$test:null)])));

//# sourceMappingURL=kotobase_protocols_worker.kotobase_store_test.js.map
