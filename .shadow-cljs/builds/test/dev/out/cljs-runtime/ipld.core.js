goog.provide('ipld.core');
ipld.core.link = ipld.link.link;
ipld.core.link_QMARK_ = ipld.link.link_QMARK_;
ipld.core.link_cid = ipld.link.link_cid;
ipld.core.link__GT_tag = ipld.link.link__GT_tag;
ipld.core.tag__GT_link = ipld.link.tag__GT_link;
ipld.core.__GT_cbor_data = (function ipld$core$__GT_cbor_data(x){
if(cljs.core.truth_((ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : ipld.core.link_QMARK_.call(null,x)))){
return (ipld.core.link__GT_tag.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link__GT_tag.cljs$core$IFn$_invoke$arity$1(x) : ipld.core.link__GT_tag.call(null,x));
} else {
if(cbor.core.tagged_QMARK_(x)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: raw cbor tags are not IPLD data \u2014 construct links with ipld.core/link",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),cbor.core.tag_number(x)], null));
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__11284){
var vec__11285 = p__11284;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11285,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11285,(1),null);
if(((typeof k === 'string') || ((k instanceof cljs.core.Keyword)))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: DAG-CBOR map keys must be strings",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),k], null));
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(ipld.core.__GT_cbor_data.cljs$core$IFn$_invoke$arity$1 ? ipld.core.__GT_cbor_data.cljs$core$IFn$_invoke$arity$1(v) : ipld.core.__GT_cbor_data.call(null,v))], null);
})),x);
} else {
if(cljs.core.sequential_QMARK_(x)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.core.__GT_cbor_data,x);
} else {
return x;

}
}
}
}
});
ipld.core._LT__cbor_data = (function ipld$core$_LT__cbor_data(x){
if(cbor.core.tagged_QMARK_(x)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((42),cbor.core.tag_number(x))){
return (ipld.core.tag__GT_link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.tag__GT_link.cljs$core$IFn$_invoke$arity$1(x) : ipld.core.tag__GT_link.call(null,x));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: DAG-CBOR allows tag 42 only",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),cbor.core.tag_number(x)], null));
}
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__11288){
var vec__11289 = p__11288;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11289,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11289,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(ipld.core._LT__cbor_data.cljs$core$IFn$_invoke$arity$1 ? ipld.core._LT__cbor_data.cljs$core$IFn$_invoke$arity$1(v) : ipld.core._LT__cbor_data.call(null,v))], null);
})),x);
} else {
if(cljs.core.sequential_QMARK_(x)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.core._LT__cbor_data,x);
} else {
return x;

}
}
}
});
/**
 * Canonical DAG-CBOR bytes for `node` (Clojure data; `Link`s become tag 42).
 */
ipld.core.encode = (function ipld$core$encode(node){
return cbor.core.encode(ipld.core.__GT_cbor_data(node));
});
/**
 * DAG-CBOR bytes → Clojure data; tag 42 becomes a `Link`, any other tag throws.
 */
ipld.core.decode = (function ipld$core$decode(bytes){
return ipld.core._LT__cbor_data(cbor.core.decode(bytes));
});
/**
 * CIDv1 dag-cbor sha2-256 of already-encoded block bytes.
 */
ipld.core.cid = (function ipld$core$cid(bytes){
return multiformats.core.cidv1_dag_cbor(bytes);
});
/**
 * Encode `node` and address it: `{:cid <string> :bytes <bytes>}`.
 */
ipld.core.node__GT_block = (function ipld$core$node__GT_block(node){
var bytes = ipld.core.encode(node);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cid","cid",-1940591320),ipld.core.cid(bytes),new cljs.core.Keyword(null,"bytes","bytes",1175866680),bytes], null);
});
/**
 * Encode `node`, CID it, `(put! cid bytes)`, return the CID string — the
 *   same storage-port convention prolly-tree/quad-store/commit-dag use.
 */
ipld.core.put_node_BANG_ = (function ipld$core$put_node_BANG_(put_BANG_,node){
var map__11292 = ipld.core.node__GT_block(node);
var map__11292__$1 = cljs.core.__destructure_map(map__11292);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11292__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
var bytes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11292__$1,new cljs.core.Keyword(null,"bytes","bytes",1175866680));
(put_BANG_.cljs$core$IFn$_invoke$arity$2 ? put_BANG_.cljs$core$IFn$_invoke$arity$2(cid,bytes) : put_BANG_.call(null,cid,bytes));

return cid;
});
/**
 * Fetch bytes at `expected-cid` and recompute their CID before returning them.
 *   Missing blocks return nil; a storage adapter returning different bytes under
 *   a CID fails closed. This is the only conforming read across a storage trust
 *   boundary.
 */
ipld.core.get_verified_block = (function ipld$core$get_verified_block(get_fn,expected_cid){
var temp__5825__auto__ = (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(expected_cid) : get_fn.call(null,expected_cid));
if(cljs.core.truth_(temp__5825__auto__)){
var bytes = temp__5825__auto__;
var actual = ipld.core.cid(bytes);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected_cid,actual)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: block CID mismatch",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ipld","cid-mismatch","ipld/cid-mismatch",1738594899),new cljs.core.Keyword(null,"expected-cid","expected-cid",-860224801),expected_cid,new cljs.core.Keyword(null,"actual-cid","actual-cid",-884324624),actual], null));
}

return bytes;
} else {
return null;
}
});
/**
 * Fetch and decode the node at `cid-str` via `(get-fn cid) -> bytes`.
 *   Returns nil when `get-fn` does (block not present). Bytes are rehashed before
 *   decode; callers cannot accidentally treat a CID-keyed lookup as verification.
 */
ipld.core.get_node = (function ipld$core$get_node(get_fn,cid_str){
var temp__5825__auto__ = ipld.core.get_verified_block(get_fn,cid_str);
if(cljs.core.truth_(temp__5825__auto__)){
var bytes = temp__5825__auto__;
return ipld.core.decode(bytes);
} else {
return null;
}
});
/**
 * Promise variant for async object stores; applies the identical CID
 *   recomputation before decode.
 */
ipld.core.get_node_async = (function ipld$core$get_node_async(get_fn,expected_cid){
return (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(expected_cid) : get_fn.call(null,expected_cid)).then((function (bytes){
if(cljs.core.truth_(bytes)){
var actual = ipld.core.cid(bytes);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected_cid,actual)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: block CID mismatch",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ipld","cid-mismatch","ipld/cid-mismatch",1738594899),new cljs.core.Keyword(null,"expected-cid","expected-cid",-860224801),expected_cid,new cljs.core.Keyword(null,"actual-cid","actual-cid",-884324624),actual], null));
}

return ipld.core.decode(bytes);
} else {
return null;
}
}));
});
/**
 * Every Link CID reachable inside `node` (deep, document order). This is
 *   the generic block-graph walk: hydrate loops and GC traverse a DAG by
 *   `links` alone, with zero knowledge of any node schema.
 */
ipld.core.links = (function ipld$core$links(node){
if(cljs.core.truth_((ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1(node) : ipld.core.link_QMARK_.call(null,node)))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(node) : ipld.core.link_cid.call(null,node))], null);
} else {
if(cljs.core.map_QMARK_(node)){
return cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(ipld.core.links,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.vals(node)], 0)));
} else {
if(cljs.core.sequential_QMARK_(node)){
return cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(ipld.core.links,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([node], 0)));
} else {
return cljs.core.PersistentVector.EMPTY;

}
}
}
});

//# sourceMappingURL=ipld.core.js.map
