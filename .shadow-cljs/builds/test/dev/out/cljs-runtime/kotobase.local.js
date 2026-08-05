goog.provide('kotobase.local');
kotobase.local.revision_conflict = (function kotobase$local$revision_conflict(expected,actual){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("IStore tenant revision conflict",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.store","revision-conflict","kotobase.store/revision-conflict",-711017562),new cljs.core.Keyword(null,"expected-revision","expected-revision",-640183121),expected,new cljs.core.Keyword(null,"current-revision","current-revision",789644848),actual], null));
});
kotobase.local.transaction_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"expected-revision","expected-revision",-640183121),null,new cljs.core.Keyword(null,"appends","appends",97325525),null,new cljs.core.Keyword(null,"tx-id","tx-id",638275288),null,new cljs.core.Keyword(null,"puts","puts",770558715),null,new cljs.core.Keyword(null,"deletes","deletes",2085953887),null], null), null);
kotobase.local.maximum_transaction_operations = (1000);
kotobase.local.non_empty_name_QMARK_ = (function kotobase$local$non_empty_name_QMARK_(value){
return ((typeof value === 'string') && (((cljs.core.seq(value)) && ((cljs.core.count(value) <= (1024))))));
});
/**
 * Reject malformed/oversized transaction data before entering swap!, so a
 * Byzantine request can never partially mutate the reference store.
 */
kotobase.local.validate_transaction_BANG_ = (function kotobase$local$validate_transaction_BANG_(p__10819){
var map__10820 = p__10819;
var map__10820__$1 = cljs.core.__destructure_map(map__10820);
var request = map__10820__$1;
var tx_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10820__$1,new cljs.core.Keyword(null,"tx-id","tx-id",638275288));
var expected_revision = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10820__$1,new cljs.core.Keyword(null,"expected-revision","expected-revision",-640183121));
var puts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10820__$1,new cljs.core.Keyword(null,"puts","puts",770558715));
var deletes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10820__$1,new cljs.core.Keyword(null,"deletes","deletes",2085953887));
var appends = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10820__$1,new cljs.core.Keyword(null,"appends","appends",97325525));
var puts__$1 = (function (){var or__5162__auto__ = puts;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var deletes__$1 = (function (){var or__5162__auto__ = deletes;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var appends__$1 = (function (){var or__5162__auto__ = appends;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var operation_count = ((cljs.core.count(puts__$1) + cljs.core.count(deletes__$1)) + cljs.core.count(appends__$1));
var valid_put_QMARK_ = (function (entry){
return ((cljs.core.vector_QMARK_(entry)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(entry))) && (((kotobase.local.non_empty_name_QMARK_(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(entry,(0)))) && (kotobase.local.non_empty_name_QMARK_(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(entry,(1)))))))));
});
var valid_delete_QMARK_ = (function (entry){
return ((cljs.core.vector_QMARK_(entry)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(entry))) && (((kotobase.local.non_empty_name_QMARK_(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(entry,(0)))) && (kotobase.local.non_empty_name_QMARK_(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(entry,(1)))))))));
});
var valid_append_QMARK_ = (function (entry){
return ((cljs.core.vector_QMARK_(entry)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(entry))) && (((kotobase.local.non_empty_name_QMARK_(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(entry,(0)))) && (cljs.core.map_QMARK_(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(entry,(1)))))))));
});
var code = ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.local.transaction_keys,cljs.core.set(cljs.core.keys(request))))?new cljs.core.Keyword("transaction","shape","transaction/shape",-916872872):(((!(((kotobase.local.non_empty_name_QMARK_(tx_id)) && ((cljs.core.count(tx_id) <= (256)))))))?new cljs.core.Keyword("transaction","tx-id","transaction/tx-id",-1498785230):(((!(((cljs.core.integer_QMARK_(expected_revision)) && ((!((expected_revision < (0)))))))))?new cljs.core.Keyword("transaction","revision","transaction/revision",786903948):(((!(((cljs.core.vector_QMARK_(puts__$1)) && (cljs.core.every_QMARK_(valid_put_QMARK_,puts__$1))))))?new cljs.core.Keyword("transaction","puts","transaction/puts",-1404510887):(((!(((cljs.core.vector_QMARK_(deletes__$1)) && (cljs.core.every_QMARK_(valid_delete_QMARK_,deletes__$1))))))?new cljs.core.Keyword("transaction","deletes","transaction/deletes",-34188159):(((!(((cljs.core.vector_QMARK_(appends__$1)) && (cljs.core.every_QMARK_(valid_append_QMARK_,appends__$1))))))?new cljs.core.Keyword("transaction","appends","transaction/appends",-2052447109):(((operation_count > kotobase.local.maximum_transaction_operations))?new cljs.core.Keyword("transaction","too-many-operations","transaction/too-many-operations",-1194923150):null
)))))));
if(cljs.core.truth_(code)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("IStore invalid transaction",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.store","invalid-transaction","kotobase.store/invalid-transaction",335938139),new cljs.core.Keyword(null,"code","code",1586293142),code], null));
} else {
}

return request;
});

/**
* @constructor
 * @implements {kotobase.store.ITransactionalStore}
 * @implements {kotobase.store.IStore}
*/
kotobase.local.LocalStore = (function (state){
this.state = state;
});
(kotobase.local.LocalStore.prototype.kotobase$store$IStore$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase.local.LocalStore.prototype.kotobase$store$IStore$_put$arity$4 = (function (_,coll,k,v){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.state,(function (p1__10821_SHARP_){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc_in(p1__10821_SHARP_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),coll,k], null),v),new cljs.core.Keyword(null,"revision","revision",-1350113114),cljs.core.inc);
}));

return v;
}));

(kotobase.local.LocalStore.prototype.kotobase$store$IStore$_get$arity$3 = (function (_,coll,k){
var self__ = this;
var ___$1 = this;
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),coll,k], null));
}));

(kotobase.local.LocalStore.prototype.kotobase$store$IStore$_list$arity$2 = (function (_,coll){
var self__ = this;
var ___$1 = this;
return cljs.core.vec(cljs.core.keys(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),coll], null))));
}));

(kotobase.local.LocalStore.prototype.kotobase$store$IStore$_append$arity$3 = (function (_,stream,event){
var self__ = this;
var ___$1 = this;
var result = cljs.core.volatile_BANG_(null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.state,(function (current){
var seq_SINGLEQUOTE_ = (new cljs.core.Keyword(null,"seq","seq",-1817803783).cljs$core$IFn$_invoke$arity$1(current) + (1));
var event_SINGLEQUOTE_ = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(event,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq_SINGLEQUOTE_);
cljs.core.vreset_BANG_(result,event_SINGLEQUOTE_);

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(current,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq_SINGLEQUOTE_),new cljs.core.Keyword(null,"revision","revision",-1350113114),cljs.core.inc),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"streams","streams",1465783789),stream], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),event_SINGLEQUOTE_);
}));

return cljs.core.deref(result);
}));

(kotobase.local.LocalStore.prototype.kotobase$store$IStore$_read$arity$3 = (function (_,stream,since){
var self__ = this;
var ___$1 = this;
var since__$1 = (function (){var or__5162__auto__ = since;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (0);
}
})();
return cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"seq","seq",-1817803783),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__10822_SHARP_){
return (cljs.core.long$(new cljs.core.Keyword(null,"seq","seq",-1817803783).cljs$core$IFn$_invoke$arity$1(p1__10822_SHARP_)) > cljs.core.long$(since__$1));
}),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"streams","streams",1465783789),stream], null)))));
}));

(kotobase.local.LocalStore.prototype.kotobase$store$ITransactionalStore$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase.local.LocalStore.prototype.kotobase$store$ITransactionalStore$_snapshot$arity$2 = (function (_,p__10823){
var self__ = this;
var map__10824 = p__10823;
var map__10824__$1 = cljs.core.__destructure_map(map__10824);
var collections = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10824__$1,new cljs.core.Keyword(null,"collections","collections",-2114643505));
var streams = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10824__$1,new cljs.core.Keyword(null,"streams","streams",1465783789));
var ___$1 = this;
var current = cljs.core.deref(self__.state);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"revision","revision",-1350113114),new cljs.core.Keyword(null,"revision","revision",-1350113114).cljs$core$IFn$_invoke$arity$1(current),new cljs.core.Keyword(null,"docs","docs",-1974280502),cljs.core.select_keys(new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(current),collections),new cljs.core.Keyword(null,"streams","streams",1465783789),cljs.core.select_keys(new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(current),streams)], null);
}));

(kotobase.local.LocalStore.prototype.kotobase$store$ITransactionalStore$_transact$arity$2 = (function (_,p__10825){
var self__ = this;
var map__10826 = p__10825;
var map__10826__$1 = cljs.core.__destructure_map(map__10826);
var request = map__10826__$1;
var tx_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10826__$1,new cljs.core.Keyword(null,"tx-id","tx-id",638275288));
var expected_revision = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10826__$1,new cljs.core.Keyword(null,"expected-revision","expected-revision",-640183121));
var puts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10826__$1,new cljs.core.Keyword(null,"puts","puts",770558715));
var deletes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10826__$1,new cljs.core.Keyword(null,"deletes","deletes",2085953887));
var appends = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10826__$1,new cljs.core.Keyword(null,"appends","appends",97325525));
var ___$1 = this;
kotobase.local.validate_transaction_BANG_(request);

var result = cljs.core.volatile_BANG_(null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.state,(function (current){
var temp__5823__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(current,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tx-receipts","tx-receipts",562380438),tx_id], null));
if(cljs.core.truth_(temp__5823__auto__)){
var map__10827 = temp__5823__auto__;
var map__10827__$1 = cljs.core.__destructure_map(map__10827);
var prior_request = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10827__$1,new cljs.core.Keyword(null,"request","request",1772954723));
var receipt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10827__$1,new cljs.core.Keyword(null,"receipt","receipt",1871350913));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(prior_request,request)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("IStore tx-id reused with different request",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.store","transaction-id-conflict","kotobase.store/transaction-id-conflict",1101035392),new cljs.core.Keyword(null,"tx-id","tx-id",638275288),tx_id], null));
}

cljs.core.vreset_BANG_(result,receipt);

return current;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected_revision,new cljs.core.Keyword(null,"revision","revision",-1350113114).cljs$core$IFn$_invoke$arity$1(current))){
} else {
throw kotobase.local.revision_conflict(expected_revision,new cljs.core.Keyword(null,"revision","revision",-1350113114).cljs$core$IFn$_invoke$arity$1(current));
}

var vec__10828 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__10831,p__10832){
var vec__10833 = p__10831;
var acc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10833,(0),null);
var events = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10833,(1),null);
var vec__10836 = p__10832;
var stream = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10836,(0),null);
var event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10836,(1),null);
var seq_SINGLEQUOTE_ = (new cljs.core.Keyword(null,"seq","seq",-1817803783).cljs$core$IFn$_invoke$arity$1(acc) + (1));
var event_SINGLEQUOTE_ = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(event,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq_SINGLEQUOTE_);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq_SINGLEQUOTE_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"streams","streams",1465783789),stream], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),event_SINGLEQUOTE_),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(events,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stream,event_SINGLEQUOTE_], null))], null);
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__10839){
var vec__10840 = p__10839;
var coll = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10840,(0),null);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10840,(1),null);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(acc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),coll], null),cljs.core.dissoc,key);
}),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__10843){
var vec__10844 = p__10843;
var coll = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10844,(0),null);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10844,(1),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10844,(2),null);
return cljs.core.assoc_in(acc,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),coll,key], null),value);
}),current,puts),deletes),cljs.core.PersistentVector.EMPTY], null),appends);
var next_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10828,(0),null);
var stamped = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10828,(1),null);
var revision_SINGLEQUOTE_ = (new cljs.core.Keyword(null,"revision","revision",-1350113114).cljs$core$IFn$_invoke$arity$1(current) + (1));
var receipt = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tx-id","tx-id",638275288),tx_id,new cljs.core.Keyword(null,"revision","revision",-1350113114),revision_SINGLEQUOTE_,new cljs.core.Keyword(null,"appends","appends",97325525),stamped], null);
var committed = cljs.core.assoc_in(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(next_state,new cljs.core.Keyword(null,"revision","revision",-1350113114),revision_SINGLEQUOTE_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tx-receipts","tx-receipts",562380438),tx_id], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"request","request",1772954723),request,new cljs.core.Keyword(null,"receipt","receipt",1871350913),receipt], null));
cljs.core.vreset_BANG_(result,receipt);

return committed;
}
}));

return cljs.core.deref(result);
}));

(kotobase.local.LocalStore.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"state","state",-348086572,null)], null);
}));

(kotobase.local.LocalStore.cljs$lang$type = true);

(kotobase.local.LocalStore.cljs$lang$ctorStr = "kotobase.local/LocalStore");

(kotobase.local.LocalStore.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase.local/LocalStore");
}));

/**
 * Positional factory function for kotobase.local/LocalStore.
 */
kotobase.local.__GT_LocalStore = (function kotobase$local$__GT_LocalStore(state){
return (new kotobase.local.LocalStore(state));
});

/**
 * A fresh in-process store. Pass `:seed` to preload `{:docs … :streams … :seq …}`.
 */
kotobase.local.local_store = (function kotobase$local$local_store(var_args){
var G__10848 = arguments.length;
switch (G__10848) {
case 0:
return kotobase.local.local_store.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.local.local_store.cljs$core$IFn$_invoke$arity$0 = (function (){
return kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}));

(kotobase.local.local_store.cljs$core$IFn$_invoke$arity$1 = (function (p__10849){
var map__10850 = p__10849;
var map__10850__$1 = cljs.core.__destructure_map(map__10850);
var docs = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10850__$1,new cljs.core.Keyword(null,"docs","docs",-1974280502),cljs.core.PersistentArrayMap.EMPTY);
var streams = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10850__$1,new cljs.core.Keyword(null,"streams","streams",1465783789),cljs.core.PersistentArrayMap.EMPTY);
var seq = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10850__$1,new cljs.core.Keyword(null,"seq","seq",-1817803783),(0));
var revision = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10850__$1,new cljs.core.Keyword(null,"revision","revision",-1350113114),(0));
var tx_receipts = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10850__$1,new cljs.core.Keyword(null,"tx-receipts","tx-receipts",562380438),cljs.core.PersistentArrayMap.EMPTY);
return kotobase.local.__GT_LocalStore(cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"docs","docs",-1974280502),docs,new cljs.core.Keyword(null,"streams","streams",1465783789),streams,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq,new cljs.core.Keyword(null,"revision","revision",-1350113114),revision,new cljs.core.Keyword(null,"tx-receipts","tx-receipts",562380438),tx_receipts], null)));
}));

(kotobase.local.local_store.cljs$lang$maxFixedArity = 1);

/**
 * The store's full state as a value — for checkpointing / pushing to the cloud.
 */
kotobase.local.snapshot = (function kotobase$local$snapshot(s){
return cljs.core.deref(s.state);
});

//# sourceMappingURL=kotobase.local.js.map
