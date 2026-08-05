goog.provide('kotobase_protocols_worker.kotobase_store');
kotobase_protocols_worker.kotobase_store.visible_all = cljs.core.constantly(true);
kotobase_protocols_worker.kotobase_store.doc_eid = (function kotobase_protocols_worker$kotobase_store$doc_eid(coll,k){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"doc","doc",1913296891),coll,k], null)], 0));
});
kotobase_protocols_worker.kotobase_store.event_eid = (function kotobase_protocols_worker$kotobase_store$event_eid(stream,seq){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"event","event",301435442),stream,seq], null)], 0));
});
kotobase_protocols_worker.kotobase_store.counter_eid = (function kotobase_protocols_worker$kotobase_store$counter_eid(stream){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"seq-counter","seq-counter",1692708568),stream], null)], 0));
});
/**
 * rows for one doc eid → its current "doc/val" edn-string, or nil.
 */
kotobase_protocols_worker.kotobase_store.rows__GT_doc_val = (function kotobase_protocols_worker$kotobase_store$rows__GT_doc_val(rows){
return cljs.core.some((function (p1__14511_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/val",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14511_SHARP_))){
return new cljs.core.Keyword(null,"v_edn","v_edn",-266503866).cljs$core$IFn$_invoke$arity$1(p1__14511_SHARP_);
} else {
return null;
}
}),rows);
});
/**
 * hot-datoms' :v_edn is (pr-str stored-o); every attr here stores
 *   stored-o as (pr-str original-value) (see the ns docstring's entity
 *   model), so recovering `original-value` needs edn/read-string TWICE —
 *   once for hot-datoms' own wrapping, once for ours. (diff->tx-data!'s
 *   retraction path needs only the FIRST layer — the exact raw stored
 *   string — to build a matching [:db/retract] quad, so it stays a
 *   single edn/read-string; only decode-for-callers goes through here.)
 */
kotobase_protocols_worker.kotobase_store.decode2 = (function kotobase_protocols_worker$kotobase_store$decode2(v_edn){
return clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(v_edn));
});
/**
 * chain-cid → Promise<LocalStore-shaped state map>, or an EMPTY state
 *   for a nil chain-cid (first-ever write to this graph). Walks every
 *   "doc/coll"+"doc/key"+"doc/val" and "doc/stream"+"doc/seq"+
 *   "doc/event" row via one hot-datoms scan (index :aevt, so every
 *   attribute's rows come back grouped) and folds them back into
 *   {:docs {...} :streams {...} :seq n :revision n}. `:revision`/`:seq`
 *   are recovered as event/doc counts (not persisted separately — the
 *   chain itself is the revision log).
 * 
 *   `async-get-fn` (kotoba-lang/kotobase-peer#21): every request — even a
 *   single-key point read — pays this call's cost, and it's an UNSCOPED
 *   `:aevt` scan of the WHOLE shared graph (no `:components` prefix
 *   pruning, unlike `doc-point-query` below), so it's exactly the O(N^2)
 *   with-blocks-trampoline class of cost kotoba-lang/kotobase-protocols-
 *   worker#1 traced git.kotobase.net's per-request latency to. Buffer-
 *   aware — see `hydrate-run-persist!`'s own `async-get-fn` docstring for
 *   why (a request whose own in-flight `commit!` crosses the fold
 *   threshold needs to see its own just-buffered, not-yet-flushed block).
 */
kotobase_protocols_worker.kotobase_store.hydrate_BANG_ = (function kotobase_protocols_worker$kotobase_store$hydrate_BANG_(get_fn,chain_cid,async_get_fn){
return kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$7(get_fn,chain_cid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"index","index",-1531685915),new cljs.core.Keyword(null,"aevt","aevt",-585148059)], null),kotobase_protocols_worker.kotobase_store.visible_all,kotobase_protocols_worker.kotobase_crypto.blind_fn,kotobase_protocols_worker.kotobase_crypto.decrypt_fn,async_get_fn).then((function (rows){
var by_e = cljs.core.group_by(new cljs.core.Keyword(null,"e","e",1381269198),rows);
var doc_eids = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__14512_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/coll",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14512_SHARP_));
})),cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"e","e",1381269198))),rows);
var event_eids = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__14513_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/stream",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14513_SHARP_));
})),cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"e","e",1381269198))),rows);
var docs = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,eid){
var attrs = (by_e.cljs$core$IFn$_invoke$arity$1 ? by_e.cljs$core$IFn$_invoke$arity$1(eid) : by_e.call(null,eid));
var coll = kotobase_protocols_worker.kotobase_store.decode2(cljs.core.some((function (p1__14514_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/coll",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14514_SHARP_))){
return new cljs.core.Keyword(null,"v_edn","v_edn",-266503866).cljs$core$IFn$_invoke$arity$1(p1__14514_SHARP_);
} else {
return null;
}
}),attrs));
var k = kotobase_protocols_worker.kotobase_store.decode2(cljs.core.some((function (p1__14515_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/key",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14515_SHARP_))){
return new cljs.core.Keyword(null,"v_edn","v_edn",-266503866).cljs$core$IFn$_invoke$arity$1(p1__14515_SHARP_);
} else {
return null;
}
}),attrs));
var v = kotobase_protocols_worker.kotobase_store.decode2(kotobase_protocols_worker.kotobase_store.rows__GT_doc_val(attrs));
return cljs.core.assoc_in(acc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [coll,k], null),v);
}),cljs.core.PersistentArrayMap.EMPTY,doc_eids);
var events = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,eid){
var attrs = (by_e.cljs$core$IFn$_invoke$arity$1 ? by_e.cljs$core$IFn$_invoke$arity$1(eid) : by_e.call(null,eid));
var stream = kotobase_protocols_worker.kotobase_store.decode2(cljs.core.some((function (p1__14516_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/stream",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14516_SHARP_))){
return new cljs.core.Keyword(null,"v_edn","v_edn",-266503866).cljs$core$IFn$_invoke$arity$1(p1__14516_SHARP_);
} else {
return null;
}
}),attrs));
var event = kotobase_protocols_worker.kotobase_store.decode2(cljs.core.some((function (p1__14517_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/event",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14517_SHARP_))){
return new cljs.core.Keyword(null,"v_edn","v_edn",-266503866).cljs$core$IFn$_invoke$arity$1(p1__14517_SHARP_);
} else {
return null;
}
}),attrs));
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,stream,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),event);
}),cljs.core.PersistentArrayMap.EMPTY,event_eids);
var events__$1 = cljs.core.reduce_kv((function (m,s,evs){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,s,cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"seq","seq",-1817803783),evs)));
}),cljs.core.PersistentArrayMap.EMPTY,events);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"docs","docs",-1974280502),docs,new cljs.core.Keyword(null,"streams","streams",1465783789),events__$1,new cljs.core.Keyword(null,"seq","seq",-1817803783),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,cljs.core.vals(events__$1))),new cljs.core.Keyword(null,"revision","revision",-1350113114),(cljs.core.count(doc_eids) + cljs.core.count(event_eids))], null);
}));
});
/**
 * Promise<vec of rows> for one known eid — a cheap :eavt point lookup,
 *   used to find the OLD "doc/val" quad (if any) to retract before
 *   asserting the new one (this substrate has no cardinality-one; an
 *   unretracted re-assert would leave both values visible).
 */
kotobase_protocols_worker.kotobase_store.doc_point_query = (function kotobase_protocols_worker$kotobase_store$doc_point_query(get_fn,chain_cid,eid){
return kotobase_peer.core.hot_datoms.cljs$core$IFn$_invoke$arity$6(get_fn,chain_cid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"index","index",-1531685915),new cljs.core.Keyword(null,"eavt","eavt",-666437073),new cljs.core.Keyword(null,"components","components",-1073188942),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [eid], null)], null),kotobase_protocols_worker.kotobase_store.visible_all,kotobase_protocols_worker.kotobase_crypto.blind_fn,kotobase_protocols_worker.kotobase_crypto.decrypt_fn);
});
/**
 * Promise<tx-data vec> for the docs/streams that actually changed
 *   between `before` and `after` (both LocalStore-shaped state maps —
 *   the Worker computes this from its existing before/after :docs/:streams
 *   snapshots, so only genuinely touched entities enter tx-data, keeping
 *   every commit O(diff) like kotobase-peer's own commit! promises, not
 *   O(whole graph)).
 */
kotobase_protocols_worker.kotobase_store.diff__GT_tx_data_BANG_ = (function kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG_(get_fn,chain_cid,before,after){
var changed_docs = (function (){var iter__5649__auto__ = (function kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14519(s__14520){
return (new cljs.core.LazySeq(null,(function (){
var s__14520__$1 = s__14520;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__14520__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__14525 = cljs.core.first(xs__6385__auto__);
var coll = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14525,(0),null);
var kvs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14525,(1),null);
var iterys__5645__auto__ = ((function (s__14520__$1,vec__14525,coll,kvs,xs__6385__auto__,temp__5825__auto__){
return (function kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14519_$_iter__14521(s__14522){
return (new cljs.core.LazySeq(null,((function (s__14520__$1,vec__14525,coll,kvs,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__14522__$1 = s__14522;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__14522__$1);
if(temp__5825__auto____$1){
var s__14522__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__14522__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__14522__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__14524 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__14523 = (0);
while(true){
if((i__14523 < size__5648__auto__)){
var vec__14528 = cljs.core._nth(c__5647__auto__,i__14523);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14528,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14528,(1),null);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(before,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),coll,k], null),new cljs.core.Keyword("kotobase-protocols-worker.kotobase-store","absent","kotobase-protocols-worker.kotobase-store/absent",-271536407)))){
cljs.core.chunk_append(b__14524,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [coll,k,v], null));

var G__14572 = (i__14523 + (1));
i__14523 = G__14572;
continue;
} else {
var G__14573 = (i__14523 + (1));
i__14523 = G__14573;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14524),kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14519_$_iter__14521(cljs.core.chunk_rest(s__14522__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14524),null);
}
} else {
var vec__14531 = cljs.core.first(s__14522__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14531,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14531,(1),null);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(before,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"docs","docs",-1974280502),coll,k], null),new cljs.core.Keyword("kotobase-protocols-worker.kotobase-store","absent","kotobase-protocols-worker.kotobase-store/absent",-271536407)))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [coll,k,v], null),kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14519_$_iter__14521(cljs.core.rest(s__14522__$2)));
} else {
var G__14574 = cljs.core.rest(s__14522__$2);
s__14522__$1 = G__14574;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__14520__$1,vec__14525,coll,kvs,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__14520__$1,vec__14525,coll,kvs,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(kvs));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14519(cljs.core.rest(s__14520__$1)));
} else {
var G__14575 = cljs.core.rest(s__14520__$1);
s__14520__$1 = G__14575;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(after));
})();
var new_events = (function (){var iter__5649__auto__ = (function kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14534(s__14535){
return (new cljs.core.LazySeq(null,(function (){
var s__14535__$1 = s__14535;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__14535__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__14540 = cljs.core.first(xs__6385__auto__);
var stream = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14540,(0),null);
var evs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14540,(1),null);
var before_n = cljs.core.count(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(before,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"streams","streams",1465783789),stream], null)));
var iterys__5645__auto__ = ((function (s__14535__$1,before_n,vec__14540,stream,evs,xs__6385__auto__,temp__5825__auto__,changed_docs){
return (function kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14534_$_iter__14536(s__14537){
return (new cljs.core.LazySeq(null,((function (s__14535__$1,before_n,vec__14540,stream,evs,xs__6385__auto__,temp__5825__auto__,changed_docs){
return (function (){
var s__14537__$1 = s__14537;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__14537__$1);
if(temp__5825__auto____$1){
var s__14537__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__14537__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__14537__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__14539 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__14538 = (0);
while(true){
if((i__14538 < size__5648__auto__)){
var ev = cljs.core._nth(c__5647__auto__,i__14538);
cljs.core.chunk_append(b__14539,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stream,ev], null));

var G__14576 = (i__14538 + (1));
i__14538 = G__14576;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14539),kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14534_$_iter__14536(cljs.core.chunk_rest(s__14537__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14539),null);
}
} else {
var ev = cljs.core.first(s__14537__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stream,ev], null),kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14534_$_iter__14536(cljs.core.rest(s__14537__$2)));
}
} else {
return null;
}
break;
}
});})(s__14535__$1,before_n,vec__14540,stream,evs,xs__6385__auto__,temp__5825__auto__,changed_docs))
,null,null));
});})(s__14535__$1,before_n,vec__14540,stream,evs,xs__6385__auto__,temp__5825__auto__,changed_docs))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(before_n,evs)));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14534(cljs.core.rest(s__14535__$1)));
} else {
var G__14577 = cljs.core.rest(s__14535__$1);
s__14535__$1 = G__14577;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(after));
})();
return Promise.all(cljs.core.clj__GT_js((function (){var iter__5649__auto__ = (function kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14543(s__14544){
return (new cljs.core.LazySeq(null,(function (){
var s__14544__$1 = s__14544;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__14544__$1);
if(temp__5825__auto__){
var s__14544__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14544__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__14544__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__14546 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__14545 = (0);
while(true){
if((i__14545 < size__5648__auto__)){
var vec__14547 = cljs.core._nth(c__5647__auto__,i__14545);
var coll = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14547,(0),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14547,(1),null);
var _v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14547,(2),null);
cljs.core.chunk_append(b__14546,kotobase_protocols_worker.kotobase_store.doc_point_query(get_fn,chain_cid,kotobase_protocols_worker.kotobase_store.doc_eid(coll,k)));

var G__14578 = (i__14545 + (1));
i__14545 = G__14578;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14546),kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14543(cljs.core.chunk_rest(s__14544__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14546),null);
}
} else {
var vec__14550 = cljs.core.first(s__14544__$2);
var coll = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14550,(0),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14550,(1),null);
var _v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14550,(2),null);
return cljs.core.cons(kotobase_protocols_worker.kotobase_store.doc_point_query(get_fn,chain_cid,kotobase_protocols_worker.kotobase_store.doc_eid(coll,k)),kotobase_protocols_worker$kotobase_store$diff__GT_tx_data_BANG__$_iter__14543(cljs.core.rest(s__14544__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(changed_docs);
})())).then((function (rows_per_doc){
var doc_tx = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__14553,rows){
var vec__14554 = p__14553;
var coll = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14554,(0),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14554,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14554,(2),null);
var eid = kotobase_protocols_worker.kotobase_store.doc_eid(coll,k);
var old_val_edn = kotobase_protocols_worker.kotobase_store.rows__GT_doc_val(rows);
var coll_known_QMARK_ = cljs.core.some((function (p1__14518_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("doc/coll",new cljs.core.Keyword(null,"a","a",-2123407586).cljs$core$IFn$_invoke$arity$1(p1__14518_SHARP_));
}),rows);
var G__14557 = cljs.core.PersistentVector.EMPTY;
var G__14557__$1 = (cljs.core.truth_(old_val_edn)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__14557,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","retract","db/retract",-1549825231),eid,"doc/val",clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(old_val_edn)], null)):G__14557);
var G__14557__$2 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__14557__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",235286841),eid,"doc/val",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v], 0))], null))
;
var G__14557__$3 = ((cljs.core.not(coll_known_QMARK_))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__14557__$2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",235286841),eid,"doc/coll",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([coll], 0))], null)):G__14557__$2);
if(cljs.core.not(coll_known_QMARK_)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__14557__$3,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",235286841),eid,"doc/key",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([k], 0))], null));
} else {
return G__14557__$3;
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([changed_docs,cljs.core.vec(rows_per_doc)], 0));
var event_tx = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__14558,i){
var vec__14559 = p__14558;
var stream = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14559,(0),null);
var ev = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14559,(1),null);
var seq = ((cljs.core.count(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(before,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"streams","streams",1465783789),stream], null))) + i) + (1));
var eid = kotobase_protocols_worker.kotobase_store.event_eid(stream,seq);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",235286841),eid,"doc/stream",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([stream], 0))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",235286841),eid,"doc/event",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ev,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq)], 0))], null)], null);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new_events,cljs.core.range.cljs$core$IFn$_invoke$arity$0()], 0));
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(doc_tx,event_tx));
}));
});
/**
 * After a commit, fold novelty into the indexed snapshot once it crosses
 *   the engine's default threshold (64 tx-blocks) — WITHOUT this, every
 *   hot-datoms read walks an ever-growing novelty chain and both reads and
 *   writes degrade without bound (found live, 2026-07-17: a shared graph
 *   that accumulated ~150+ unfolded commits across a session's worth of
 *   testing made even a plain read take >30s). `should-fold?`/`novelty-
 *   size` are pure state-field reads (O(1), no decrypt needed) so this
 *   check itself is cheap on every commit.
 * 
 *   `async-get-fn` (REQUIRED, not optional — see the ns-level guardrail note
 *   below) is threaded to `eng/fold!`'s async-scan arity: fold's own
 *   pre-fold hydrate walks the ENTIRE indexed snapshot via
 *   `prolly-tree.core/scan-prefix`, and over the `with-blocks` sync-retry
 *   trampoline (`kotobase-protocols-worker.kotobase-r2`) that walk is O(N²)
 *   in the number of distinct blocks touched — confirmed live elsewhere in
 *   this org (gftdcojp/app-aozora#78 / ADR-2607120730): a 5130-leaf
 *   snapshot exceeded a 300s CPU budget over the sync path vs 806ms via
 *   `scan-prefix-async`. `kotobase-cljc-worker.handler/do-fold` (the
 *   reference implementation this module is a deploy shell for) already
 *   wires this same `async-get-fn` into its own `eng/fold!` call — this
 *   fn was missing it (kotoba-lang/kotobase-protocols-worker#1).
 */
kotobase_protocols_worker.kotobase_store.fold_if_due_BANG_ = (function kotobase_protocols_worker$kotobase_store$fold_if_due_BANG_(put_BANG_,get_fn,chain_cid,async_get_fn){
if(cljs.core.truth_(kotobase_peer.core.should_fold_QMARK_.cljs$core$IFn$_invoke$arity$2(get_fn,chain_cid))){
return kotobase_peer.core.fold_BANG_.cljs$core$IFn$_invoke$arity$11(put_BANG_,get_fn,chain_cid,ipld.core.link_QMARK_,null,kotobase_protocols_worker.kotobase_crypto.blind_fn,kotobase_protocols_worker.kotobase_crypto.encrypt_fn,kotobase_protocols_worker.kotobase_crypto.decrypt_fn,null,null,async_get_fn);
} else {
return Promise.resolve(chain_cid);
}
});
/**
 * Promise<new-chain-cid | prev-chain-cid> — commits the before/after
 *   diff (empty diff → resolves to prev-chain-cid unchanged, no-op write),
 *   folding afterward if the engine's own threshold says novelty is due.
 *   `async-get-fn` — see `fold-if-due!`.
 */
kotobase_protocols_worker.kotobase_store.commit_changes_BANG_ = (function kotobase_protocols_worker$kotobase_store$commit_changes_BANG_(put_BANG_,get_fn,chain_cid,before,after,async_get_fn){
return kotobase_protocols_worker.kotobase_store.diff__GT_tx_data_BANG_(get_fn,chain_cid,before,after).then((function (tx_data){
if(cljs.core.empty_QMARK_(tx_data)){
return Promise.resolve(chain_cid);
} else {
return kotobase_peer.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5(put_BANG_,get_fn,tx_data,chain_cid,kotobase_protocols_worker.kotobase_crypto.encrypt_fn).then((function (p1__14562_SHARP_){
return kotobase_protocols_worker.kotobase_store.fold_if_due_BANG_(put_BANG_,get_fn,p1__14562_SHARP_,async_get_fn);
}));
}
}));
});
/**
 * Read-only health signal for `graph` (ADR-2607178500): no hydrate, no
 *   LocalStore, no write — just the engine's own O(1) `novelty-size`/
 *   `should-fold?` state-field reads via the SAME R2 trampoline every
 *   other call in this module uses. Exists because diagnosing the
 *   unfolded-novelty incident (ADR-2607177500) required manually timing
 *   a plain read and guessing at the cause — this makes that observable
 *   directly, without live forensics.
 *   → Promise<{:chain-present? bool :novelty-size int :should-fold? bool}>.
 */
kotobase_protocols_worker.kotobase_store.diagnose_BANG_ = (function kotobase_protocols_worker$kotobase_store$diagnose_BANG_(bucket,pfx,graph){
return kotobase_protocols_worker.kotobase_r2.r2_get_head(bucket,kotobase_protocols_worker.kotobase_r2.head_key(pfx,graph)).then((function (p__14563){
var map__14564 = p__14563;
var map__14564__$1 = cljs.core.__destructure_map(map__14564);
var chain__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14564__$1,new cljs.core.Keyword(null,"chain","chain",15631029));
if((chain__$1 == null)){
return Promise.resolve(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),false,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),(0),new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),false], null));
} else {
return kotobase_protocols_worker.kotobase_r2.with_blocks((function (cid){
return kotobase_protocols_worker.kotobase_r2.cached_block_bytes(bucket,pfx,cid);
}),(function (get_fn){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428),true,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361),kotobase_peer.core.novelty_size(get_fn,chain__$1),new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095),kotobase_peer.core.should_fold_QMARK_.cljs$core$IFn$_invoke$arity$2(get_fn,chain__$1)], null);
}));
}
}));
});
/**
 * The Worker's whole per-request cycle against the real content-
 *   addressed chain: read the graph's head, hydrate a LocalStore-shaped
 *   seed from it, hand that seed to `run-fn` (the Worker's existing
 *   make-store→router/handle→snapshot sequence — this module knows
 *   nothing about kotobase.protocols.router), diff the result against
 *   the seed, and — only when :docs/:streams actually changed — commit
 *   the diff and CAS the head.
 * 
 *   `run-fn` is `(fn [seed chain-cid]) -> {:after-state map :response resp}`,
 *   where `chain-cid` is the head this seed was hydrated from (nil for a graph
 *   with no commits yet).
 *   Ported get-fn/put! buffering is INCIDENT 2607032800's fix
 *   (kotobase-cljc-worker's run-write-attempt docstring): commit!'s own
 *   novelty-size re-reads the chain-cid it just committed BEFORE this fn
 *   flushes to R2, so get-fn must check the in-memory buffer first.
 *   `async-get-fn` (threaded to `commit-changes!`/`fold-if-due!`, see
 *   their docstrings) gets the SAME buffer-first check — NOT a direct,
 *   unbuffered R2 fetch like `kotobase-cljc-worker.worker/run-write-
 *   attempt`'s own `:async-get-fn`: if THIS request's own `commit!` is
 *   what crosses the fold threshold, its just-buffered (not yet flushed
 *   to R2) tx-block is exactly the kind of cid `fold!`'s novelty-read
 *   step needs back, and an unbuffered async fetch would either return
 *   nil (nothing at that key in R2 yet) into `ipld/decode`, which throws,
 *   or — the more insidious failure — a stale/absent read gets silently
 *   treated as "nothing there", losing that tx-block from the fold's
 *   merged state. This may be a latent bug in the reference
 *   implementation's own analogous `:async-get-fn`
 *   (kotoba-lang/kotobase-cljc-worker, flagged separately, not fixed
 *   here) — this module closes it for its own copy by construction.
 * 
 *   → Promise<{:response resp :persisted bool}>; :persisted false means
 *   another writer's head update landed first — the Worker's own retry
 *   loop (unchanged from today) re-runs the whole cycle from a fresh head.
 */
kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_ = (function kotobase_protocols_worker$kotobase_store$hydrate_run_persist_BANG_(bucket,pfx,graph,run_fn){
var buffer = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var async_get_fn = (function (cid){
if(cljs.core.contains_QMARK_(cljs.core.deref(buffer),cid)){
return Promise.resolve(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(buffer),cid));
} else {
return kotobase_protocols_worker.kotobase_r2.cached_block_bytes(bucket,pfx,cid);
}
});
return kotobase_protocols_worker.kotobase_r2.r2_get_head(bucket,kotobase_protocols_worker.kotobase_r2.head_key(pfx,graph)).then((function (p__14565){
var map__14566 = p__14565;
var map__14566__$1 = cljs.core.__destructure_map(map__14566);
var chain__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14566__$1,new cljs.core.Keyword(null,"chain","chain",15631029));
var etag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14566__$1,new cljs.core.Keyword(null,"etag","etag",-329255476));
return kotobase_protocols_worker.kotobase_r2.with_blocks((function (cid){
return kotobase_protocols_worker.kotobase_r2.cached_block_bytes(bucket,pfx,cid);
}),(function (sync_get){
var get_fn = (function (cid){
if(cljs.core.contains_QMARK_(cljs.core.deref(buffer),cid)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(buffer),cid);
} else {
return (sync_get.cljs$core$IFn$_invoke$arity$1 ? sync_get.cljs$core$IFn$_invoke$arity$1(cid) : sync_get.call(null,cid));
}
});
var put_BANG_ = (function (cid,bytes){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(buffer,cljs.core.assoc,cid,bytes);
});
return kotobase_protocols_worker.kotobase_store.hydrate_BANG_(get_fn,chain__$1,async_get_fn).then((function (before){
var map__14567 = (run_fn.cljs$core$IFn$_invoke$arity$2 ? run_fn.cljs$core$IFn$_invoke$arity$2(before,chain__$1) : run_fn.call(null,before,chain__$1));
var map__14567__$1 = cljs.core.__destructure_map(map__14567);
var after_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14567__$1,new cljs.core.Keyword(null,"after-state","after-state",918332654));
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14567__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(before),new cljs.core.Keyword(null,"docs","docs",-1974280502).cljs$core$IFn$_invoke$arity$1(after_state))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(before),new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(after_state))))){
return Promise.resolve(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"response","response",-1068424192),response,new cljs.core.Keyword(null,"persisted","persisted",-900171345),true], null));
} else {
return kotobase_protocols_worker.kotobase_store.commit_changes_BANG_(put_BANG_,get_fn,chain__$1,before,after_state,async_get_fn).then((function (new_chain){
return Promise.all(cljs.core.clj__GT_js(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__14568){
var vec__14569 = p__14568;
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14569,(0),null);
var bytes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14569,(1),null);
return kotobase_protocols_worker.kotobase_r2.r2_put_bytes(bucket,kotobase_protocols_worker.kotobase_r2.block_key(pfx,cid),bytes);
}),cljs.core.deref(buffer)))).then((function (_){
return kotobase_protocols_worker.kotobase_r2.r2_put_head_if_match(bucket,kotobase_protocols_worker.kotobase_r2.head_key(pfx,graph),new_chain,etag);
})).then((function (cas_ok_QMARK_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"response","response",-1068424192),response,new cljs.core.Keyword(null,"persisted","persisted",-900171345),cas_ok_QMARK_], null);
}));
}));
}
}));
}));
}));
});

//# sourceMappingURL=kotobase_protocols_worker.kotobase_store.js.map
