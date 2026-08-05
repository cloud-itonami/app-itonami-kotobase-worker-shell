goog.provide('kotobase.store');

/**
 * @interface
 */
kotobase.store.IStore = function(){};

var kotobase$store$IStore$_put$dyn_10812 = (function (s,coll,k,v){
var x__5519__auto__ = (((s == null))?null:s);
var m__5520__auto__ = (kotobase.store._put[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$4(s,coll,k,v) : m__5520__auto__.call(null,s,coll,k,v));
} else {
var m__5518__auto__ = (kotobase.store._put["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$4(s,coll,k,v) : m__5518__auto__.call(null,s,coll,k,v));
} else {
throw cljs.core.missing_protocol("IStore.-put",s);
}
}
});
/**
 * Idempotent put of value `v` at `[coll k]`; returns v.
 */
kotobase.store._put = (function kotobase$store$_put(s,coll,k,v){
if((((!((s == null)))) && ((!((s.kotobase$store$IStore$_put$arity$4 == null)))))){
return s.kotobase$store$IStore$_put$arity$4(s,coll,k,v);
} else {
return kotobase$store$IStore$_put$dyn_10812(s,coll,k,v);
}
});

var kotobase$store$IStore$_get$dyn_10813 = (function (s,coll,k){
var x__5519__auto__ = (((s == null))?null:s);
var m__5520__auto__ = (kotobase.store._get[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$3(s,coll,k) : m__5520__auto__.call(null,s,coll,k));
} else {
var m__5518__auto__ = (kotobase.store._get["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$3(s,coll,k) : m__5518__auto__.call(null,s,coll,k));
} else {
throw cljs.core.missing_protocol("IStore.-get",s);
}
}
});
/**
 * Read `[coll k]` or nil.
 */
kotobase.store._get = (function kotobase$store$_get(s,coll,k){
if((((!((s == null)))) && ((!((s.kotobase$store$IStore$_get$arity$3 == null)))))){
return s.kotobase$store$IStore$_get$arity$3(s,coll,k);
} else {
return kotobase$store$IStore$_get$dyn_10813(s,coll,k);
}
});

var kotobase$store$IStore$_list$dyn_10814 = (function (s,coll){
var x__5519__auto__ = (((s == null))?null:s);
var m__5520__auto__ = (kotobase.store._list[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$2(s,coll) : m__5520__auto__.call(null,s,coll));
} else {
var m__5518__auto__ = (kotobase.store._list["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$2(s,coll) : m__5518__auto__.call(null,s,coll));
} else {
throw cljs.core.missing_protocol("IStore.-list",s);
}
}
});
/**
 * Keys present in `coll` (vector).
 */
kotobase.store._list = (function kotobase$store$_list(s,coll){
if((((!((s == null)))) && ((!((s.kotobase$store$IStore$_list$arity$2 == null)))))){
return s.kotobase$store$IStore$_list$arity$2(s,coll);
} else {
return kotobase$store$IStore$_list$dyn_10814(s,coll);
}
});

var kotobase$store$IStore$_append$dyn_10815 = (function (s,stream,event){
var x__5519__auto__ = (((s == null))?null:s);
var m__5520__auto__ = (kotobase.store._append[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$3(s,stream,event) : m__5520__auto__.call(null,s,stream,event));
} else {
var m__5518__auto__ = (kotobase.store._append["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$3(s,stream,event) : m__5518__auto__.call(null,s,stream,event));
} else {
throw cljs.core.missing_protocol("IStore.-append",s);
}
}
});
/**
 * Append `event` to `stream`; returns it stamped with :seq.
 */
kotobase.store._append = (function kotobase$store$_append(s,stream,event){
if((((!((s == null)))) && ((!((s.kotobase$store$IStore$_append$arity$3 == null)))))){
return s.kotobase$store$IStore$_append$arity$3(s,stream,event);
} else {
return kotobase$store$IStore$_append$dyn_10815(s,stream,event);
}
});

var kotobase$store$IStore$_read$dyn_10816 = (function (s,stream,since){
var x__5519__auto__ = (((s == null))?null:s);
var m__5520__auto__ = (kotobase.store._read[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$3(s,stream,since) : m__5520__auto__.call(null,s,stream,since));
} else {
var m__5518__auto__ = (kotobase.store._read["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$3(s,stream,since) : m__5518__auto__.call(null,s,stream,since));
} else {
throw cljs.core.missing_protocol("IStore.-read",s);
}
}
});
/**
 * Events in `stream` with :seq > `since` (0/nil = from start), :seq-ordered.
 */
kotobase.store._read = (function kotobase$store$_read(s,stream,since){
if((((!((s == null)))) && ((!((s.kotobase$store$IStore$_read$arity$3 == null)))))){
return s.kotobase$store$IStore$_read$arity$3(s,stream,since);
} else {
return kotobase$store$IStore$_read$dyn_10816(s,stream,since);
}
});


/**
 * Optional strong extension to IStore. A snapshot is read at one tenant
 *   revision; transact atomically compares that revision and publishes every
 *   document mutation and stream append at one new revision.
 * @interface
 */
kotobase.store.ITransactionalStore = function(){};

var kotobase$store$ITransactionalStore$_snapshot$dyn_10817 = (function (s,scope){
var x__5519__auto__ = (((s == null))?null:s);
var m__5520__auto__ = (kotobase.store._snapshot[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$2(s,scope) : m__5520__auto__.call(null,s,scope));
} else {
var m__5518__auto__ = (kotobase.store._snapshot["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$2(s,scope) : m__5518__auto__.call(null,s,scope));
} else {
throw cljs.core.missing_protocol("ITransactionalStore.-snapshot",s);
}
}
});
/**
 * Read one revision. SCOPE is {:collections [...] :streams [...]} and the
 *  result is {:revision n :docs {...} :streams {...}}.
 */
kotobase.store._snapshot = (function kotobase$store$_snapshot(s,scope){
if((((!((s == null)))) && ((!((s.kotobase$store$ITransactionalStore$_snapshot$arity$2 == null)))))){
return s.kotobase$store$ITransactionalStore$_snapshot$arity$2(s,scope);
} else {
return kotobase$store$ITransactionalStore$_snapshot$dyn_10817(s,scope);
}
});

var kotobase$store$ITransactionalStore$_transact$dyn_10818 = (function (s,request){
var x__5519__auto__ = (((s == null))?null:s);
var m__5520__auto__ = (kotobase.store._transact[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$2(s,request) : m__5520__auto__.call(null,s,request));
} else {
var m__5518__auto__ = (kotobase.store._transact["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$2(s,request) : m__5518__auto__.call(null,s,request));
} else {
throw cljs.core.missing_protocol("ITransactionalStore.-transact",s);
}
}
});
/**
 * Atomically apply {:tx-id :expected-revision :puts :deletes :appends}.
 *  Replaying a tx-id returns its original receipt; a stale expected revision
 *  throws RevisionConflict without applying any mutation.
 */
kotobase.store._transact = (function kotobase$store$_transact(s,request){
if((((!((s == null)))) && ((!((s.kotobase$store$ITransactionalStore$_transact$arity$2 == null)))))){
return s.kotobase$store$ITransactionalStore$_transact$arity$2(s,request);
} else {
return kotobase$store$ITransactionalStore$_transact$dyn_10818(s,request);
}
});

kotobase.store.store_QMARK_ = (function kotobase$store$store_QMARK_(x){
if((!((x == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === x.kotobase$store$IStore$)))){
return true;
} else {
if((!x.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(kotobase.store.IStore,x);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(kotobase.store.IStore,x);
}
});
kotobase.store.transactional_store_QMARK_ = (function kotobase$store$transactional_store_QMARK_(x){
if((!((x == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === x.kotobase$store$ITransactionalStore$)))){
return true;
} else {
if((!x.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(kotobase.store.ITransactionalStore,x);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(kotobase.store.ITransactionalStore,x);
}
});

//# sourceMappingURL=kotobase.store.js.map
