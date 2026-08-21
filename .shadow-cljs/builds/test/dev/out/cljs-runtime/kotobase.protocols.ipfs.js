goog.provide('kotobase.protocols.ipfs');
kotobase.protocols.ipfs.content_type_allowlist = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 16, ["application/json",null,"image/gif",null,"image/png",null,"application/vnd.ipld.car",null,"application/vnd.ipld.dag-json",null,"model/gltf-binary",null,"audio/mpeg",null,"application/vnd.ipld.raw",null,"text/plain; charset=utf-8",null,"image/webp",null,"application/octet-stream",null,"image/jpeg",null,"video/mp4",null,"text/plain",null,"application/cbor",null,"application/vnd.ipld.dag-cbor",null], null), null);
kotobase.protocols.ipfs.sanitize_content_type = (function kotobase$protocols$ipfs$sanitize_content_type(ct){
if(cljs.core.contains_QMARK_(kotobase.protocols.ipfs.content_type_allowlist,ct)){
return ct;
} else {
return "application/octet-stream";
}
});
/**
 * Read one CID from the block plane. `cid` is whatever the caller
 *   asked for — content or advertisement. This helper does not rewrite it.
 */
kotobase.protocols.ipfs.serve_block = (function kotobase$protocols$ipfs$serve_block(ctx,req,cid,extra_headers){
var temp__5823__auto__ = kotobase.protocols.blocks.get_block(ctx,cid);
if(cljs.core.truth_(temp__5823__auto__)){
var b = temp__5823__auto__;
var G__12533 = kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 3, ["content-type",kotobase.protocols.ipfs.sanitize_content_type(new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(b)),"etag",(""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)+"\""),"cache-control","public, max-age=29030400, immutable"], null),extra_headers], 0)),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req)))?new cljs.core.Keyword(null,"bytes","bytes",1175866680).cljs$core$IFn$_invoke$arity$1(b):null));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("base64",new cljs.core.Keyword(null,"encoding","encoding",1728578272).cljs$core$IFn$_invoke$arity$1(b))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12533,new cljs.core.Keyword(null,"body-encoding","body-encoding",-1446963485),new cljs.core.Keyword(null,"base64","base64",167760174));
} else {
return G__12533;
}
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1((""+"block not found: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)));
}
});
/**
 * IPFS gateway + IPNI publisher handler. Serves GET/HEAD /ipfs/{cid},
 *   /ipni/v1/ad/{cid}, and /ipni/v1/head from ctx's block plane — the
 *   `:blocks` port when the shell supplies one, the `:store` document
 *   collection otherwise (kotobase.protocols.blocks). `:ipni-head-cid`
 *   is the advertisement-chain tip, optional.
 */
kotobase.protocols.ipfs.handle = (function kotobase$protocols$ipfs$handle(ctx,req){
var segs = kotobase.protocols.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.not((function (){var G__12535 = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var fexpr__12534 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"head","head",-771383919),null], null), null);
return (fexpr__12534.cljs$core$IFn$_invoke$arity$1 ? fexpr__12534.cljs$core$IFn$_invoke$arity$1(G__12535) : fexpr__12534.call(null,G__12535));
})())){
return kotobase.protocols.http.method_not_allowed();
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ipfs",cljs.core.first(segs))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(segs))))){
var cid = cljs.core.second(segs);
return kotobase.protocols.ipfs.serve_block(ctx,req,cid,new cljs.core.PersistentArrayMap(null, 1, ["x-ipfs-path",(""+"/ipfs/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid))], null));
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((4),cljs.core.count(segs))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ipni",cljs.core.first(segs))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("v1",cljs.core.second(segs))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ad",cljs.core.nth.cljs$core$IFn$_invoke$arity$2(segs,(2)))))))))){
var cid = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(segs,(3));
return kotobase.protocols.ipfs.serve_block(ctx,req,cid,cljs.core.PersistentArrayMap.EMPTY);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["ipni","v1","head"], null),segs)){
var temp__5823__auto__ = new cljs.core.Keyword(null,"ipni-head-cid","ipni-head-cid",-1461634087).cljs$core$IFn$_invoke$arity$1(ctx);
if(cljs.core.truth_(temp__5823__auto__)){
var head_cid = temp__5823__auto__;
return kotobase.protocols.ipfs.serve_block(ctx,req,head_cid,cljs.core.PersistentArrayMap.EMPTY);
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1("ipni head not published");
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ipns",cljs.core.first(segs))){
return kotobase.protocols.http.text((501),"ipns not implemented (mutable heads resolve via KRP signed heads)");
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();

}
}
}
}
}
});

//# sourceMappingURL=kotobase.protocols.ipfs.js.map
