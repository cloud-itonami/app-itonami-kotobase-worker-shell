goog.provide('kotobase.protocols.blocks');
/**
 * The legacy document collection: one `IStore` collection keyed by CID.
 *   Used when `ctx` carries no `:blocks` port.
 */
kotobase.protocols.blocks.coll = new cljs.core.Keyword("kotobase.protocols","blocks","kotobase.protocols/blocks",-1513626286);
/**
 * The legacy plane: blocks as documents in one `IStore` collection.
 */
kotobase.protocols.blocks.doc_port = (function kotobase$protocols$blocks$doc_port(store){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"get","get",1683182755),(function (cid){
return kotobase.store._get(store,kotobase.protocols.blocks.coll,cid);
}),new cljs.core.Keyword(null,"put!","put!",2123215223),(function (cid,block){
return kotobase.store._put(store,kotobase.protocols.blocks.coll,cid,block);
}),new cljs.core.Keyword(null,"list","list",765357683),(function (){
return kotobase.store._list(store,kotobase.protocols.blocks.coll);
})], null);
});
/**
 * True when the caller passed a bare `IStore` rather than a ctx map --
 *   the arity `kotobase-protocols-worker` still calls.
 */
kotobase.protocols.blocks.store_arity_QMARK_ = (function kotobase$protocols$blocks$store_arity_QMARK_(target){
if((!((target == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === target.kotobase$store$IStore$)))){
return true;
} else {
if((!target.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(kotobase.store.IStore,target);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(kotobase.store.IStore,target);
}
});
kotobase.protocols.blocks.port = (function kotobase$protocols$blocks$port(target){
if(kotobase.protocols.blocks.store_arity_QMARK_(target)){
return kotobase.protocols.blocks.doc_port(target);
} else {
var or__5162__auto__ = new cljs.core.Keyword(null,"blocks","blocks",-610462153).cljs$core$IFn$_invoke$arity$1(target);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase.protocols.blocks.doc_port(new cljs.core.Keyword(null,"store","store",1512230022).cljs$core$IFn$_invoke$arity$1(target));
}
}
});
kotobase.protocols.blocks.cid_fn = (function kotobase$protocols$blocks$cid_fn(target){
if(kotobase.protocols.blocks.store_arity_QMARK_(target)){
return null;
} else {
return new cljs.core.Keyword(null,"cid-of","cid-of",869574371).cljs$core$IFn$_invoke$arity$1(target);
}
});
/**
 * Audit stays on the document plane: it is metadata about the write, not
 *   the bytes. A ctx with a port and no `:store` has nowhere to put it, and
 *   says so by having no store rather than by failing.
 */
kotobase.protocols.blocks.audit_BANG_ = (function kotobase$protocols$blocks$audit_BANG_(target,event){
var temp__5825__auto__ = ((kotobase.protocols.blocks.store_arity_QMARK_(target))?target:new cljs.core.Keyword(null,"store","store",1512230022).cljs$core$IFn$_invoke$arity$1(target));
if(cljs.core.truth_(temp__5825__auto__)){
var store = temp__5825__auto__;
return kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),event);
} else {
return null;
}
});
kotobase.protocols.blocks.verify_BANG_ = (function kotobase$protocols$blocks$verify_BANG_(op,cid_of,cid,block){
if(cljs.core.truth_((function (){var and__5160__auto__ = cid_of;
if(cljs.core.truth_(and__5160__auto__)){
return block;
} else {
return and__5160__auto__;
}
})())){
var actual = (cid_of.cljs$core$IFn$_invoke$arity$1 ? cid_of.cljs$core$IFn$_invoke$arity$1(block) : cid_of.call(null,block));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(actual,cid)){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"block does not hash to the CID it is keyed by: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols","cid-mismatch","kotobase.protocols/cid-mismatch",2128058381),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"cid","cid",-1940591320),cid,new cljs.core.Keyword(null,"actual","actual",107306363),actual], null));
}
} else {
return null;
}
});
/**
 * The block stored under `cid`, or nil. `target` is a ctx map (see the ns
 *   docstring) or, for compatibility, a bare `IStore`.
 * 
 *   Throws `:kotobase.protocols/cid-mismatch` when `ctx` carries `:cid-of`
 *   and the stored block does not hash to `cid`: a miss is nil, a tampered
 *   block is an error. The ns docstring says why those differ.
 */
kotobase.protocols.blocks.get_block = (function kotobase$protocols$blocks$get_block(target,cid){
var block = (function (){var fexpr__14751 = new cljs.core.Keyword(null,"get","get",1683182755).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.blocks.port(target));
return (fexpr__14751.cljs$core$IFn$_invoke$arity$1 ? fexpr__14751.cljs$core$IFn$_invoke$arity$1(cid) : fexpr__14751.call(null,cid));
})();
kotobase.protocols.blocks.verify_BANG_(new cljs.core.Keyword(null,"get","get",1683182755),kotobase.protocols.blocks.cid_fn(target),cid,block);

return block;
});
/**
 * Every CID in the block plane.
 */
kotobase.protocols.blocks.list_cids = (function kotobase$protocols$blocks$list_cids(target){
var fexpr__14752 = new cljs.core.Keyword(null,"list","list",765357683).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.blocks.port(target));
return (fexpr__14752.cljs$core$IFn$_invoke$arity$0 ? fexpr__14752.cljs$core$IFn$_invoke$arity$0() : fexpr__14752.call(null));
});
/**
 * Store `block` under caller-computed `cid`. Idempotent -- content
 *   addressed, so the same cid means the same bytes. Returns the block as
 *   stored (with `:content-type` defaulted).
 * 
 *   Throws `:kotobase.protocols/cid-mismatch` before writing anything when
 *   `ctx` carries `:cid-of` and the block does not hash to `cid`. Bytes are
 *   never stored under a key they do not hash to.
 */
kotobase.protocols.blocks.put_block_BANG_ = (function kotobase$protocols$blocks$put_block_BANG_(target,cid,p__14753){
var map__14754 = p__14753;
var map__14754__$1 = cljs.core.__destructure_map(map__14754);
var bytes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14754__$1,new cljs.core.Keyword(null,"bytes","bytes",1175866680));
var content_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14754__$1,new cljs.core.Keyword(null,"content-type","content-type",-508222634));
var encoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14754__$1,new cljs.core.Keyword(null,"encoding","encoding",1728578272));
if(typeof cid === 'string'){
} else {
throw (new Error("Assert failed: (string? cid)"));
}

if(typeof bytes === 'string'){
} else {
throw (new Error("Assert failed: (string? bytes)"));
}

var block = (function (){var G__14755 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"bytes","bytes",1175866680),bytes,new cljs.core.Keyword(null,"content-type","content-type",-508222634),(function (){var or__5162__auto__ = content_type;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "application/octet-stream";
}
})()], null);
if(cljs.core.truth_(encoding)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14755,new cljs.core.Keyword(null,"encoding","encoding",1728578272),encoding);
} else {
return G__14755;
}
})();
kotobase.protocols.blocks.verify_BANG_(new cljs.core.Keyword(null,"put","put",1299772570),kotobase.protocols.blocks.cid_fn(target),cid,block);

var fexpr__14756_14757 = new cljs.core.Keyword(null,"put!","put!",2123215223).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.blocks.port(target));
(fexpr__14756_14757.cljs$core$IFn$_invoke$arity$2 ? fexpr__14756_14757.cljs$core$IFn$_invoke$arity$2(cid,block) : fexpr__14756_14757.call(null,cid,block));

kotobase.protocols.blocks.audit_BANG_(target,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"blocks","blocks",-610462153),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"cid","cid",-1940591320),cid,new cljs.core.Keyword(null,"size","size",1098693007),cljs.core.count(bytes)], null));

return block;
});

//# sourceMappingURL=kotobase.protocols.blocks.js.map
