goog.provide('kotobase_peer.transactor');
kotobase_peer.transactor.valid_request_QMARK_ = (function kotobase_peer$transactor$valid_request_QMARK_(p__13845){
var map__13846 = p__13845;
var map__13846__$1 = cljs.core.__destructure_map(map__13846);
var request_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13846__$1,new cljs.core.Keyword(null,"request-id","request-id",-985684093));
var head_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13846__$1,new cljs.core.Keyword(null,"head-key","head-key",1479955464));
var tx_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13846__$1,new cljs.core.Keyword(null,"tx-data","tx-data",934159761));
return (((!((request_id == null)))) && (((typeof head_key === 'string') && (((cljs.core.seq(head_key)) && (((cljs.core.sequential_QMARK_(tx_data)) && (cljs.core.seq(tx_data)))))))));
});
kotobase_peer.transactor.append_request = (function kotobase_peer$transactor$append_request(batches,request,max_requests,max_datoms){
var datom_count = cljs.core.count(new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(request));
var current = cljs.core.peek(batches);
var fits_QMARK_ = (function (){var and__5160__auto__ = current;
if(cljs.core.truth_(and__5160__auto__)){
return (((new cljs.core.Keyword(null,"request-count","request-count",426155899).cljs$core$IFn$_invoke$arity$1(current) < max_requests)) && (((new cljs.core.Keyword(null,"datom-count","datom-count",515794351).cljs$core$IFn$_invoke$arity$1(current) + datom_count) <= max_datoms)));
} else {
return and__5160__auto__;
}
})();
if(cljs.core.truth_(fits_QMARK_)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(batches),cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$4(current,new cljs.core.Keyword(null,"request-ids","request-ids",287462495),cljs.core.conj,new cljs.core.Keyword(null,"request-id","request-id",-985684093).cljs$core$IFn$_invoke$arity$1(request)),new cljs.core.Keyword(null,"request-count","request-count",426155899),cljs.core.inc),new cljs.core.Keyword(null,"datom-count","datom-count",515794351),cljs.core._PLUS_,datom_count),new cljs.core.Keyword(null,"tx-data","tx-data",934159761),cljs.core.into,new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(request)));
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(batches,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"head-key","head-key",1479955464),new cljs.core.Keyword(null,"head-key","head-key",1479955464).cljs$core$IFn$_invoke$arity$1(request),new cljs.core.Keyword(null,"request-ids","request-ids",287462495),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-id","request-id",-985684093).cljs$core$IFn$_invoke$arity$1(request)], null),new cljs.core.Keyword(null,"request-count","request-count",426155899),(1),new cljs.core.Keyword(null,"datom-count","datom-count",515794351),datom_count,new cljs.core.Keyword(null,"tx-data","tx-data",934159761),cljs.core.vec(new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(request))], null));
}
});
/**
 * Coalesce ordered logical requests per mutable head. Each returned batch is
 *   one atomic commit/HeadCAS domain. Heads are sorted for deterministic host
 *   scheduling; requests within a head retain caller order. A request larger than
 *   MAX-DATOMS remains one batch rather than being split across transactions.
 */
kotobase_peer.transactor.plan_head_batches = (function kotobase_peer$transactor$plan_head_batches(var_args){
var G__13850 = arguments.length;
switch (G__13850) {
case 1:
return kotobase_peer.transactor.plan_head_batches.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kotobase_peer.transactor.plan_head_batches.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase_peer.transactor.plan_head_batches.cljs$core$IFn$_invoke$arity$1 = (function (requests){
return kotobase_peer.transactor.plan_head_batches.cljs$core$IFn$_invoke$arity$2(requests,cljs.core.PersistentArrayMap.EMPTY);
}));

(kotobase_peer.transactor.plan_head_batches.cljs$core$IFn$_invoke$arity$2 = (function (requests,p__13851){
var map__13852 = p__13851;
var map__13852__$1 = cljs.core.__destructure_map(map__13852);
var max_requests = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__13852__$1,new cljs.core.Keyword(null,"max-requests","max-requests",229153272),(32));
var max_datoms = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__13852__$1,new cljs.core.Keyword(null,"max-datoms","max-datoms",908228773),(4096));
if(((cljs.core.pos_int_QMARK_(max_requests)) && (cljs.core.pos_int_QMARK_(max_datoms)))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Transactor batch bounds must be positive",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"max-requests","max-requests",229153272),max_requests,new cljs.core.Keyword(null,"max-datoms","max-datoms",908228773),max_datoms], null));
}

var requests__$1 = cljs.core.vec(requests);
var temp__5825__auto___13859 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(kotobase_peer.transactor.valid_request_QMARK_,requests__$1));
if(cljs.core.truth_(temp__5825__auto___13859)){
var invalid_13860 = temp__5825__auto___13859;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Malformed transactor request",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request","request",1772954723),invalid_13860], null));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(requests__$1),cljs.core.count(cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-id","request-id",-985684093),requests__$1))))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Transactor request ids must be unique",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-ids","request-ids",287462495),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-id","request-id",-985684093),requests__$1)], null));
}

return cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__13853){
var vec__13854 = p__13853;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13854,(0),null);
var head_requests = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13854,(1),null);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__13847_SHARP_,p2__13848_SHARP_){
return kotobase_peer.transactor.append_request(p1__13847_SHARP_,p2__13848_SHARP_,max_requests,max_datoms);
}),cljs.core.PersistentVector.EMPTY,head_requests);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.key,cljs.core.group_by(new cljs.core.Keyword(null,"head-key","head-key",1479955464),requests__$1))], 0)));
}));

(kotobase_peer.transactor.plan_head_batches.cljs$lang$maxFixedArity = 2);

/**
 * Validate a planned batch before any immutable block or head is written.
 */
kotobase_peer.transactor.validate_batch = (function kotobase_peer$transactor$validate_batch(batch){
if(cljs.core.truth_((function (){var and__5160__auto__ = new cljs.core.Keyword(null,"head-key","head-key",1479955464).cljs$core$IFn$_invoke$arity$1(batch);
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core.seq(new cljs.core.Keyword(null,"request-ids","request-ids",287462495).cljs$core$IFn$_invoke$arity$1(batch))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-count","request-count",426155899).cljs$core$IFn$_invoke$arity$1(batch),cljs.core.count(new cljs.core.Keyword(null,"request-ids","request-ids",287462495).cljs$core$IFn$_invoke$arity$1(batch)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"datom-count","datom-count",515794351).cljs$core$IFn$_invoke$arity$1(batch),cljs.core.count(new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(batch)))))));
} else {
return and__5160__auto__;
}
})())){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Malformed planned transactor batch",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"batch","batch",-662921200),batch], null));
}

return batch;
});
/**
 * Attach logical-request acknowledgement metadata to one successful commit
 *   report without changing the canonical transaction or chain format.
 */
kotobase_peer.transactor.batch_receipt = (function kotobase_peer$transactor$batch_receipt(batch,commit_report){
kotobase_peer.transactor.validate_batch(batch);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(commit_report,new cljs.core.Keyword(null,"head-key","head-key",1479955464),new cljs.core.Keyword(null,"head-key","head-key",1479955464).cljs$core$IFn$_invoke$arity$1(batch),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"request-ids","request-ids",287462495),new cljs.core.Keyword(null,"request-ids","request-ids",287462495).cljs$core$IFn$_invoke$arity$1(batch),new cljs.core.Keyword(null,"request-count","request-count",426155899),new cljs.core.Keyword(null,"request-count","request-count",426155899).cljs$core$IFn$_invoke$arity$1(batch),new cljs.core.Keyword(null,"datom-count","datom-count",515794351),new cljs.core.Keyword(null,"datom-count","datom-count",515794351).cljs$core$IFn$_invoke$arity$1(batch),new cljs.core.Keyword(null,"cas-publications","cas-publications",103252479),(1)], 0));
});
/**
 * Schedule at most one batch per head in each parallel wave. This preserves
 *   per-head order without globally serializing independent actor/tenant heads.
 */
kotobase_peer.transactor.execution_waves = (function kotobase_peer$transactor$execution_waves(batches){
var by_head = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.val,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.key,cljs.core.group_by(new cljs.core.Keyword(null,"head-key","head-key",1479955464),batches)));
var wave_count = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(0),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,by_head));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (offset){
return cljs.core.vec(cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__13857_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p1__13857_SHARP_,offset,null);
}),by_head));
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(wave_count));
});

//# sourceMappingURL=kotobase_peer.transactor.js.map
