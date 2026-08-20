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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__6484){
var vec__6485 = p__6484;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6485,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6485,(1),null);
if(typeof k === 'string'){
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__6488){
var vec__6489 = p__6488;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6489,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6489,(1),null);
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
ipld.data_model.validate_BANG_.cljs$core$IFn$_invoke$arity$1(node);

return cbor.core.encode(ipld.core.__GT_cbor_data(node));
});
ipld.core.byte_vector = (function ipld$core$byte_vector(value){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__6492_SHARP_){
return (p1__6492_SHARP_ & (255));
}),cljs.core.seq(value));
});
/**
 * DAG-CBOR bytes → Clojure data; tag 42 becomes a `Link`, any other tag throws.
 * 
 *   DAG-CBOR is a *canonical* codec: for any node there is exactly one valid
 *   encoding. Decoding alone does not enforce that, and the ways it fails to are
 *   not exotic -- `18 05` reads as the integer 5, out-of-order map keys read as a
 *   map, and duplicate map keys read as the last one wins. Bytes the encoder
 *   would never have produced would then be accepted as the node they merely
 *   resemble, which is the one thing a content-addressed identity layer cannot
 *   afford: two byte strings would denote one value while having different CIDs.
 * 
 *   So the round trip is required to be an identity, not a coincidence. The cost
 *   is one extra encode per decode, paid at the layer whose entire job is
 *   canonical form.
 */
ipld.core.decode = (function ipld$core$decode(bytes){
var node = ipld.core._LT__cbor_data(cbor.core.decode(bytes));
ipld.data_model.validate_BANG_.cljs$core$IFn$_invoke$arity$1(node);

var canonical_6495 = cbor.core.encode(ipld.core.__GT_cbor_data(node));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ipld.core.byte_vector(bytes),ipld.core.byte_vector(canonical_6495))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: bytes are not canonical DAG-CBOR",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("ipld","problem","ipld/problem",1167005995),new cljs.core.Keyword(null,"non-canonical-dag-cbor","non-canonical-dag-cbor",1547849044),new cljs.core.Keyword(null,"given-bytes","given-bytes",-1188992405),cljs.core.count(ipld.core.byte_vector(bytes)),new cljs.core.Keyword(null,"canonical-bytes","canonical-bytes",-376571414),cljs.core.count(ipld.core.byte_vector(canonical_6495))], null));
}

return node;
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
var map__6493 = ipld.core.node__GT_block(node);
var map__6493__$1 = cljs.core.__destructure_map(map__6493);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6493__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
var bytes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6493__$1,new cljs.core.Keyword(null,"bytes","bytes",1175866680));
(put_BANG_.cljs$core$IFn$_invoke$arity$2 ? put_BANG_.cljs$core$IFn$_invoke$arity$2(cid,bytes) : put_BANG_.call(null,cid,bytes));

return cid;
});
/**
 * Unsigned LEB128 at OFFSET of a byte vector, or nil. Bounded at 5 groups so
 * a malformed header cannot spin.
 */
ipld.core.read_varint = (function ipld$core$read_varint(bytes,offset){
var i = offset;
var shift = (0);
var value = (0);
while(true){
if((((i < cljs.core.count(bytes))) && ((shift < (35))))){
var b = (cljs.core.long$(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(bytes,i)) & (255));
var value__$1 = (value + ((b & (127)) << shift));
if(((b & (128)) === (0))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),value__$1,new cljs.core.Keyword(null,"next","next",-117701485),(i + (1))], null);
} else {
var G__6496 = (i + (1));
var G__6497 = (shift + (7));
var G__6498 = value__$1;
i = G__6496;
shift = G__6497;
value = G__6498;
continue;
}
} else {
return null;
}
break;
}
});
/**
 * Codec number a CIDv1 string declares, or nil when it cannot be read.
 * 
 * Reading it is what lets a foreign codec be reported as a foreign codec.
 * Recomputing a dag-cbor CID over a raw block's bytes produces a different
 * string, so without this the traversal reports a CID mismatch -- which sends
 * whoever reads the error looking for a corrupt store, when the store was
 * right and the link simply pointed at something this codec cannot decode.
 */
ipld.core.cid_codec = (function ipld$core$cid_codec(cid){
try{var bytes = cljs.core.vec(multiformats.core.cid__GT_bytes(cid));
var version = ipld.core.read_varint(bytes,(0));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(version))){
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(ipld.core.read_varint(bytes,new cljs.core.Keyword(null,"next","next",-117701485).cljs$core$IFn$_invoke$arity$1(version)));
} else {
return null;
}
}catch (e6494){var _ = e6494;
return null;
}});
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
var codec_6499 = ipld.core.cid_codec(expected_cid);
if(cljs.core.truth_((function (){var and__5160__auto__ = codec_6499;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(codec_6499,multiformats.core.codec_dag_cbor);
} else {
return and__5160__auto__;
}
})())){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: block codec is not dag-cbor",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ipld","unsupported-codec","ipld/unsupported-codec",-928171872),new cljs.core.Keyword(null,"cid","cid",-1940591320),expected_cid,new cljs.core.Keyword(null,"codec","codec",2063917266),codec_6499], null));
} else {
}

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
return cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(ipld.core.links,cljs.core.val),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.key,node)], 0)));
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
