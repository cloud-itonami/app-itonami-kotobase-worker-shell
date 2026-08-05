goog.provide('kotobase_protocols_worker.kotobase_store_test');
kotobase_protocols_worker.kotobase_store_test.fake_bucket = (function kotobase_protocols_worker$kotobase_store_test$fake_bucket(){
var store = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var next_etag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
return ({"get": (function (k){
return Promise.resolve((function (){var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(store),k);
if(cljs.core.truth_(temp__5825__auto__)){
var map__14579 = temp__5825__auto__;
var map__14579__$1 = cljs.core.__destructure_map(map__14579);
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14579__$1,new cljs.core.Keyword(null,"val","val",128701612));
var etag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14579__$1,new cljs.core.Keyword(null,"etag","etag",-329255476));
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
var required = (function (){var G__14580 = opts;
var G__14580__$1 = (((G__14580 == null))?null:G__14580.onlyIf);
if((G__14580__$1 == null)){
return null;
} else {
return G__14580__$1.etagMatches;
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = required;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(required,(function (){var G__14581 = current;
var G__14581__$1 = (((G__14581 == null))?null:new cljs.core.Keyword(null,"etag","etag",-329255476).cljs$core$IFn$_invoke$arity$1(G__14581));
if((G__14581__$1 == null)){
return null;
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__14581__$1));
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
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_ = (function kotobase_protocols_worker$kotobase_store_test$apply_op_BANG_(store,p__14582){
var vec__14583 = p__14582;
var seq__14584 = cljs.core.seq(vec__14583);
var first__14585 = cljs.core.first(seq__14584);
var seq__14584__$1 = cljs.core.next(seq__14584);
var op = first__14585;
var args = seq__14584__$1;
var G__14586 = op;
var G__14586__$1 = (((G__14586 instanceof cljs.core.Keyword))?G__14586.fqn:null);
switch (G__14586__$1) {
case "put":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(kotobase.store._put,store,args);

break;
case "append":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(kotobase.store._append,store,args);

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__14586__$1))));

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
})).then((function (p__14589){
var map__14590 = p__14589;
var map__14590__$1 = cljs.core.__destructure_map(map__14590);
var persisted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14590__$1,new cljs.core.Keyword(null,"persisted","persisted",-900171345));
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
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591 = (function (meta14592){
this.meta14592 = meta14592;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14593,meta14592__$1){
var self__ = this;
var _14593__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591(meta14592__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14593){
var self__ = this;
var _14593__$1 = this;
return self__.meta14592;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__14595 = (arguments.length - (1));
switch (G__14595) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.prototype.apply = (function (self__,args14594){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args14594.length > (20)))?(function (){var G__14596 = args14594.slice((0),(20));
G__14596.push(args14594.slice((20)));

return G__14596;
})():args14594)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var oracle = kotobase.local.local_store.cljs$core$IFn$_invoke$arity$0();
var seq__14597_14665 = cljs.core.seq(kotobase_protocols_worker.kotobase_store_test.ops_1);
var chunk__14598_14666 = null;
var count__14599_14667 = (0);
var i__14600_14668 = (0);
while(true){
if((i__14600_14668 < count__14599_14667)){
var op_14669 = chunk__14598_14666.cljs$core$IIndexed$_nth$arity$2(null,i__14600_14668);
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_(oracle,op_14669);


var G__14670 = seq__14597_14665;
var G__14671 = chunk__14598_14666;
var G__14672 = count__14599_14667;
var G__14673 = (i__14600_14668 + (1));
seq__14597_14665 = G__14670;
chunk__14598_14666 = G__14671;
count__14599_14667 = G__14672;
i__14600_14668 = G__14673;
continue;
} else {
var temp__5825__auto___14674 = cljs.core.seq(seq__14597_14665);
if(temp__5825__auto___14674){
var seq__14597_14675__$1 = temp__5825__auto___14674;
if(cljs.core.chunked_seq_QMARK_(seq__14597_14675__$1)){
var c__5694__auto___14676 = cljs.core.chunk_first(seq__14597_14675__$1);
var G__14677 = cljs.core.chunk_rest(seq__14597_14675__$1);
var G__14678 = c__5694__auto___14676;
var G__14679 = cljs.core.count(c__5694__auto___14676);
var G__14680 = (0);
seq__14597_14665 = G__14677;
chunk__14598_14666 = G__14678;
count__14599_14667 = G__14679;
i__14600_14668 = G__14680;
continue;
} else {
var op_14681 = cljs.core.first(seq__14597_14675__$1);
kotobase_protocols_worker.kotobase_store_test.apply_op_BANG_(oracle,op_14681);


var G__14682 = cljs.core.next(seq__14597_14675__$1);
var G__14683 = null;
var G__14684 = (0);
var G__14685 = (0);
seq__14597_14665 = G__14682;
chunk__14598_14666 = G__14683;
count__14599_14667 = G__14684;
i__14600_14668 = G__14685;
continue;
}
} else {
}
}
break;
}

var expected = kotobase_protocols_worker.kotobase_store_test.content(kotobase.local.snapshot(oracle));
return kotobase_protocols_worker.kotobase_store_test.run_through_datom_store_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),kotobase_protocols_worker.kotobase_store_test.ops_1).then((function (p__14601){
var map__14602 = p__14601;
var map__14602__$1 = cljs.core.__destructure_map(map__14602);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14602__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["content-addressed round-trip (multiple sequential commits + a fresh hydrate) matches the LocalStore oracle exactly"], 0));

try{try{var values__1983__auto___14686 = (new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(expected),(new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___14687 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___14686);
if(cljs.core.truth_(result__1984__auto___14687)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"pass","pass",1574159993),23,95,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),95,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14686),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"fail","fail",1706214930),23,95,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),95,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14686),null,(1),null)),(2),null)),null]));
}

}catch (e14603){var t__2020__auto___14688 = e14603;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",60,new cljs.core.Keyword(null,"error","error",-978969032),23,95,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),95,t__2020__auto___14688,null]));
}
try{var values__1983__auto___14689 = (new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(expected),(new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___14690 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___14689);
if(cljs.core.truth_(result__1984__auto___14690)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"pass","pass",1574159993),23,96,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),96,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14689),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"fail","fail",1706214930),23,96,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),96,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14689),null,(1),null)),(2),null)),null]));
}

}catch (e14604){var t__2020__auto___14691 = e14604;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",66,new cljs.core.Keyword(null,"error","error",-978969032),23,96,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"expected","expected",-1070764772,null)),cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),96,t__2020__auto___14691,null]));
}}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___14692 = false;
if(value__1987__auto___14692){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___14692,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___14692,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e14605){var t__2020__auto___14693 = e14605;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___14693,(""+"unexpected rejection: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta14592","meta14592",-530902233,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14591");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14591");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14591.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test14591 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test14591(meta14592){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591(meta14592));
});


kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store = (function kotobase_protocols_worker$kotobase_store_test$datom_store_equals_local_store(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14591(null));
});

(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","datom-store-equals-local-store","kotobase-protocols-worker.kotobase-store-test/datom-store-equals-local-store",1419377560,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"datom-store-equals-local-store","datom-store-equals-local-store",97200870,null),"kotobase_protocols_worker/kotobase_store_test.cljs",40,1,86,86,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store)?kotobase_protocols_worker.kotobase_store_test.datom_store_equals_local_store.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606 = (function (meta14607){
this.meta14607 = meta14607;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14608,meta14607__$1){
var self__ = this;
var _14608__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606(meta14607__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14608){
var self__ = this;
var _14608__$1 = this;
return self__.meta14607;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__14610 = (arguments.length - (1));
switch (G__14610) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.prototype.apply = (function (self__,args14609){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args14609.length > (20)))?(function (){var G__14611 = args14609.slice((0),(20));
G__14611.push(args14609.slice((20)));

return G__14611;
})():args14609)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),"","brand-new-graph",(function (seed){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),kotobase_protocols_worker.kotobase_store_test.content(seed),new cljs.core.Keyword(null,"response","response",-1068424192),seed], null);
})).then((function (p__14612){
var map__14613 = p__14612;
var map__14613__$1 = cljs.core.__destructure_map(map__14613);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14613__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
var persisted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14613__$1,new cljs.core.Keyword(null,"persisted","persisted",-900171345));
try{var value__1987__auto___14695 = persisted;
if(cljs.core.truth_(value__1987__auto___14695)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"pass","pass",1574159993),23,108,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),108,value__1987__auto___14695,null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"fail","fail",1706214930),23,108,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),108,value__1987__auto___14695,null]));
}

}catch (e14614){var t__2020__auto___14696 = e14614;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",32,new cljs.core.Keyword(null,"error","error",-978969032),23,108,new cljs.core.Symbol(null,"persisted","persisted",740360182,null),108,t__2020__auto___14696,null]));
}
try{var values__1983__auto___14697 = (new cljs.core.List(null,cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___14698 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___14697);
if(cljs.core.truth_(result__1984__auto___14698)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),23,109,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),109,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14697),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),23,109,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),109,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14697),null,(1),null)),(2),null)),null]));
}

}catch (e14615){var t__2020__auto___14699 = e14615;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),23,109,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Symbol(null,"response","response",572107335,null))),109,t__2020__auto___14699,null]));
}
try{var values__1983__auto___14700 = (new cljs.core.List(null,cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response),null,(1),null)),(2),null));
var result__1984__auto___14701 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___14700);
if(cljs.core.truth_(result__1984__auto___14701)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),23,110,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),110,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14700),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),23,110,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),110,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14700),null,(1),null)),(2),null)),null]));
}

}catch (e14616){var t__2020__auto___14702 = e14616;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),23,110,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Symbol(null,"response","response",572107335,null))),110,t__2020__auto___14702,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___14703 = false;
if(value__1987__auto___14703){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___14703,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___14703,e.message]));
}

}catch (e14617){var t__2020__auto___14704 = e14617;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___14704,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta14607","meta14607",-703908073,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14606");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14606");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14606.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test14606 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test14606(meta14607){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606(meta14607));
});


kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty = (function kotobase_protocols_worker$kotobase_store_test$empty_graph_hydrates_empty(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14606(null));
});

(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","empty-graph-hydrates-empty","kotobase-protocols-worker.kotobase-store-test/empty-graph-hydrates-empty",816979834,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"empty-graph-hydrates-empty","empty-graph-hydrates-empty",1180813436,null),"kotobase_protocols_worker/kotobase_store_test.cljs",36,1,102,102,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty)?kotobase_protocols_worker.kotobase_store_test.empty_graph_hydrates_empty.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618 = (function (meta14619){
this.meta14619 = meta14619;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14620,meta14619__$1){
var self__ = this;
var _14620__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618(meta14619__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14620){
var self__ = this;
var _14620__$1 = this;
return self__.meta14619;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__14622 = (arguments.length - (1));
switch (G__14622) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.prototype.apply = (function (self__,args14621){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args14621.length > (20)))?(function (){var G__14623 = args14621.slice((0),(20));
G__14623.push(args14621.slice((20)));

return G__14623;
})():args14621)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
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
var vec__14624_14706 = cljs.core.vec(results);
var a_14707 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14624_14706,(0),null);
var b_14708 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14624_14706,(1),null);
try{var values__1983__auto___14709 = (new cljs.core.List(null,new cljs.core.Keyword(null,"persisted","persisted",-900171345).cljs$core$IFn$_invoke$arity$1(a_14707),(new cljs.core.List(null,new cljs.core.Keyword(null,"persisted","persisted",-900171345).cljs$core$IFn$_invoke$arity$1(b_14708),null,(1),null)),(2),null));
var result__1984__auto___14710 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.not_EQ_,values__1983__auto___14709);
if(cljs.core.truth_(result__1984__auto___14710)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"pass","pass",1574159993),27,146,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),146,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___14709),"exactly one of the two racing writers must lose the CAS"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"fail","fail",1706214930),27,146,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),146,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___14709),null,(1),null)),(2),null)),"exactly one of the two racing writers must lose the CAS"]));
}

}catch (e14627){var t__2020__auto___14711 = e14627;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",63,new cljs.core.Keyword(null,"error","error",-978969032),27,146,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"a","a",-482876059,null)),cljs.core.list(new cljs.core.Keyword(null,"persisted","persisted",-900171345),new cljs.core.Symbol(null,"b","b",-1172211299,null))),146,t__2020__auto___14711,"exactly one of the two racing writers must lose the CAS"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___14712 = false;
if(value__1987__auto___14712){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___14712,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___14712,e.message]));
}

}catch (e14628){var t__2020__auto___14713 = e14628;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___14713,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta14619","meta14619",1052360032,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14618");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14618");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14618.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test14618 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test14618(meta14619){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618(meta14619));
});


kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries = (function kotobase_protocols_worker$kotobase_store_test$concurrent_writers_one_wins_one_retries(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14618(null));
});

(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","concurrent-writers-one-wins-one-retries","kotobase-protocols-worker.kotobase-store-test/concurrent-writers-one-wins-one-retries",-1542958409,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"concurrent-writers-one-wins-one-retries","concurrent-writers-one-wins-one-retries",-146840131,null),"kotobase_protocols_worker/kotobase_store_test.cljs",49,1,114,114,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries)?kotobase_protocols_worker.kotobase_store_test.concurrent_writers_one_wins_one_retries.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629 = (function (meta14630){
this.meta14630 = meta14630;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14631,meta14630__$1){
var self__ = this;
var _14631__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629(meta14630__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14631){
var self__ = this;
var _14631__$1 = this;
return self__.meta14630;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__14633 = (arguments.length - (1));
switch (G__14633) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.prototype.apply = (function (self__,args14632){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args14632.length > (20)))?(function (){var G__14634 = args14632.slice((0),(20));
G__14634.push(args14632.slice((20)));

return G__14634;
})():args14632)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
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
return kotobase_protocols_worker.kotobase_r2.r2_get_head(bucket,kotobase_protocols_worker.kotobase_r2.head_key("","fold-graph")).then((function (p__14635){
var map__14636 = p__14635;
var map__14636__$1 = cljs.core.__destructure_map(map__14636);
var chain__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14636__$1,new cljs.core.Keyword(null,"chain","chain",15631029));
return kotobase_peer.core.novelty_size(get_fn,chain__$1);
}));
}));
})).then((function (n){
try{var values__1983__auto___14715 = (new cljs.core.List(null,n,(new cljs.core.List(null,(70),null,(1),null)),(2),null));
var result__1984__auto___14716 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._LT_,values__1983__auto___14715);
if(cljs.core.truth_(result__1984__auto___14716)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"pass","pass",1574159993),27,182,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),182,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___14715),(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"fail","fail",1706214930),27,182,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),182,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___14715),null,(1),null)),(2),null)),(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
}

}catch (e14637){var t__2020__auto___14717 = e14637;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"error","error",-978969032),27,182,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(70)),182,t__2020__auto___14717,(""+"novelty-size after 70 commits should have been folded down, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n))]));
}
try{var values__1983__auto___14718 = (new cljs.core.List(null,n,(new cljs.core.List(null,(64),null,(1),null)),(2),null));
var result__1984__auto___14719 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._LT_,values__1983__auto___14718);
if(cljs.core.truth_(result__1984__auto___14719)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"pass","pass",1574159993),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),184,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___14718),"should-fold?'s own threshold means it must be below 64 post-fold"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"fail","fail",1706214930),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),184,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"<","<",993667236,null),values__1983__auto___14718),null,(1),null)),(2),null)),"should-fold?'s own threshold means it must be below 64 post-fold"]));
}

}catch (e14638){var t__2020__auto___14720 = e14638;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",35,new cljs.core.Keyword(null,"error","error",-978969032),27,184,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"n","n",-2092305744,null),(64)),184,t__2020__auto___14720,"should-fold?'s own threshold means it must be below 64 post-fold"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___14721 = false;
if(value__1987__auto___14721){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___14721,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___14721,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e14639){var t__2020__auto___14722 = e14639;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___14722,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta14630","meta14630",-480250634,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14629");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14629");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14629.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test14629 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test14629(meta14630){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629(meta14630));
});


kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold = (function kotobase_protocols_worker$kotobase_store_test$novelty_folds_past_the_threshold(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14629(null));
});

(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","novelty-folds-past-the-threshold","kotobase-protocols-worker.kotobase-store-test/novelty-folds-past-the-threshold",-1648184396,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"novelty-folds-past-the-threshold","novelty-folds-past-the-threshold",-821050706,null),"kotobase_protocols_worker/kotobase_store_test.cljs",42,1,151,151,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold)?kotobase_protocols_worker.kotobase_store_test.novelty_folds_past_the_threshold.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640 = (function (meta14641){
this.meta14641 = meta14641;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14642,meta14641__$1){
var self__ = this;
var _14642__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640(meta14641__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14642){
var self__ = this;
var _14642__$1 = this;
return self__.meta14641;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__14644 = (arguments.length - (1));
switch (G__14644) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.prototype.apply = (function (self__,args14643){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args14643.length > (20)))?(function (){var G__14645 = args14643.slice((0),(20));
G__14645.push(args14643.slice((20)));

return G__14645;
})():args14643)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(kotobase_protocols_worker.kotobase_store_test.fake_bucket(),"","never-touched-graph").then((function (p__14646){
var map__14647 = p__14646;
var map__14647__$1 = cljs.core.__destructure_map(map__14647);
var chain_present_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14647__$1,new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428));
var novelty_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14647__$1,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361));
var should_fold_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14647__$1,new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095));
try{var values__1983__auto___14724 = (new cljs.core.List(null,chain_present_QMARK_,null,(1),null));
var result__1984__auto___14725 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___14724);
if(cljs.core.truth_(result__1984__auto___14725)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"pass","pass",1574159993),23,193,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),193,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___14724),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"fail","fail",1706214930),23,193,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),193,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___14724),null,(1),null)),(2),null)),null]));
}

}catch (e14648){var t__2020__auto___14726 = e14648;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",46,new cljs.core.Keyword(null,"error","error",-978969032),23,193,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"chain-present?","chain-present?",-267866901,null)),193,t__2020__auto___14726,null]));
}
try{var values__1983__auto___14727 = (new cljs.core.List(null,(0),(new cljs.core.List(null,novelty_size,null,(1),null)),(2),null));
var result__1984__auto___14728 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___14727);
if(cljs.core.truth_(result__1984__auto___14728)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"pass","pass",1574159993),23,194,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),194,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14727),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"fail","fail",1706214930),23,194,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),194,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14727),null,(1),null)),(2),null)),null]));
}

}catch (e14649){var t__2020__auto___14729 = e14649;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",41,new cljs.core.Keyword(null,"error","error",-978969032),23,194,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(0),new cljs.core.Symbol(null,"novelty-size","novelty-size",-1336500408,null)),194,t__2020__auto___14729,null]));
}
try{var values__1983__auto___14730 = (new cljs.core.List(null,should_fold_QMARK_,null,(1),null));
var result__1984__auto___14731 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___14730);
if(cljs.core.truth_(result__1984__auto___14731)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),195,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___14730),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),195,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___14730),null,(1),null)),(2),null)),null]));
}

}catch (e14650){var t__2020__auto___14732 = e14650;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),23,195,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"should-fold?","should-fold?",1375867432,null)),195,t__2020__auto___14732,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___14733 = false;
if(value__1987__auto___14733){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___14733,e.message]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___14733,e.message]));
}

}catch (e14651){var t__2020__auto___14734 = e14651;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___14734,e.message]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta14641","meta14641",1285970857,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14640");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14640");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14640.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test14640 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test14640(meta14641){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640(meta14641));
});


kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph = (function kotobase_protocols_worker$kotobase_store_test$diagnose_empty_graph(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14640(null));
});

(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","diagnose-empty-graph","kotobase-protocols-worker.kotobase-store-test/diagnose-empty-graph",1152815364,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"diagnose-empty-graph","diagnose-empty-graph",996388414,null),"kotobase_protocols_worker/kotobase_store_test.cljs",30,1,189,189,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph)?kotobase_protocols_worker.kotobase_store_test.diagnose_empty_graph.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652 = (function (meta14653){
this.meta14653 = meta14653;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14654,meta14653__$1){
var self__ = this;
var _14654__$1 = this;
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652(meta14653__$1));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14654){
var self__ = this;
var _14654__$1 = this;
return self__.meta14653;
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__14656 = (arguments.length - (1));
switch (G__14656) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.prototype.apply = (function (self__,args14655){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args14655.length > (20)))?(function (){var G__14657 = args14655.slice((0),(20));
G__14657.push(args14655.slice((20)));

return G__14657;
})():args14655)));
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
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
try{var values__1983__auto___14736 = (new cljs.core.List(null,new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null));
var result__1984__auto___14737 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___14736);
if(cljs.core.truth_(result__1984__auto___14737)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"pass","pass",1574159993),25,210,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),210,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___14736),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"fail","fail",1706214930),25,210,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),210,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___14736),null,(1),null)),(2),null)),null]));
}

}catch (e14658){var t__2020__auto___14738 = e14658;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",53,new cljs.core.Keyword(null,"error","error",-978969032),25,210,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),new cljs.core.Symbol(null,"d1","d1",375811720,null))),210,t__2020__auto___14738,null]));
}
try{var values__1983__auto___14739 = (new cljs.core.List(null,(1),(new cljs.core.List(null,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null)),(2),null));
var result__1984__auto___14740 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___14739);
if(cljs.core.truth_(result__1984__auto___14740)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),25,211,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),211,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14739),"one commit, no fold yet, no prior novelty"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),25,211,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),211,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14739),null,(1),null)),(2),null)),"one commit, no fold yet, no prior novelty"]));
}

}catch (e14659){var t__2020__auto___14741 = e14659;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),25,211,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d1","d1",375811720,null))),211,t__2020__auto___14741,"one commit, no fold yet, no prior novelty"]));
}
try{var values__1983__auto___14742 = (new cljs.core.List(null,new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095).cljs$core$IFn$_invoke$arity$1(d1),null,(1),null));
var result__1984__auto___14743 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___14742);
if(cljs.core.truth_(result__1984__auto___14743)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"pass","pass",1574159993),25,212,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___14742),"1 < default threshold 64"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"fail","fail",1706214930),25,212,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___14742),null,(1),null)),(2),null)),"1 < default threshold 64"]));
}

}catch (e14660){var t__2020__auto___14744 = e14660;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",52,new cljs.core.Keyword(null,"error","error",-978969032),25,212,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),cljs.core.list(new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),new cljs.core.Symbol(null,"d1","d1",375811720,null))),212,t__2020__auto___14744,"1 < default threshold 64"]));
}
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(bucket,"","diag-graph");
})).then((function (d2){
try{var values__1983__auto___14745 = (new cljs.core.List(null,(1),(new cljs.core.List(null,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361).cljs$core$IFn$_invoke$arity$1(d2),null,(1),null)),(2),null));
var result__1984__auto___14746 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___14745);
if(cljs.core.truth_(result__1984__auto___14746)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),25,215,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),215,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14745),"calling diagnose! must not itself mutate novelty (read-only)"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),25,215,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),215,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___14745),null,(1),null)),(2),null)),"calling diagnose! must not itself mutate novelty (read-only)"]));
}

}catch (e14661){var t__2020__auto___14747 = e14661;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/kotobase_store_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),25,215,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),new cljs.core.Symbol(null,"d2","d2",-516033910,null))),215,t__2020__auto___14747,"calling diagnose! must not itself mutate novelty (read-only)"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___14748 = false;
if(value__1987__auto___14748){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___14748,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___14748,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}

}catch (e14662){var t__2020__auto___14749 = e14662;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___14749,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.stack))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta14653","meta14653",1896136051,null)], null);
}));

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.cljs$lang$type = true);

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.cljs$lang$ctorStr = "kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14652");

(kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14652");
}));

/**
 * Positional factory function for kotobase-protocols-worker.kotobase-store-test/t_kotobase_protocols_worker$kotobase_store_test14652.
 */
kotobase_protocols_worker.kotobase_store_test.__GT_t_kotobase_protocols_worker$kotobase_store_test14652 = (function kotobase_protocols_worker$kotobase_store_test$__GT_t_kotobase_protocols_worker$kotobase_store_test14652(meta14653){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652(meta14653));
});


kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only = (function kotobase_protocols_worker$kotobase_store_test$diagnose_after_one_commit_is_read_only(){
return cljs.test.test_var(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$var);
});
kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.kotobase_store_test.t_kotobase_protocols_worker$kotobase_store_test14652(null));
});

(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only;},new cljs.core.Symbol("kotobase-protocols-worker.kotobase-store-test","diagnose-after-one-commit-is-read-only","kotobase-protocols-worker.kotobase-store-test/diagnose-after-one-commit-is-read-only",2032179897,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.kotobase-store-test","kotobase-protocols-worker.kotobase-store-test",-1033452580,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"KotobaseStore \u2261 LocalStore: every scenario here runs through BOTH the\n  real content-addressed engine (via an in-memory fake R2 bucket \u2014 same\n  shape a real Cloudflare binding exposes: .get/.put with\n  onlyIf.etagMatches) and a plain kotobase.local/LocalStore, and asserts\n  their :docs/:streams end up identical after each step AND survive a\n  fresh hydrate (a true round-trip through the chain, not just an\n  in-memory check). shadow-cljs :node-test \u2014 the engine's crypto seam\n  needs real @noble/hashes/@ipld/dag-cbor, same reason cacao-test avoids\n  nbb (ADR-2607177500)."], null)),new cljs.core.Symbol(null,"diagnose-after-one-commit-is-read-only","diagnose-after-one-commit-is-read-only",-2007635577,null),"kotobase_protocols_worker/kotobase_store_test.cljs",48,1,199,199,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only)?kotobase_protocols_worker.kotobase_store_test.diagnose_after_one_commit_is_read_only.cljs$lang$test:null)])));

//# sourceMappingURL=kotobase_protocols_worker.kotobase_store_test.js.map
