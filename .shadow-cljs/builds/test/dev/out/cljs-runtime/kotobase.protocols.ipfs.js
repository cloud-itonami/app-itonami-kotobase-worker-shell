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
 * IPFS gateway handler. Serves GET/HEAD /ipfs/{cid} from ctx's block
 *   plane -- the `:blocks` port when the shell supplies one, the `:store`
 *   document collection otherwise (kotobase.protocols.blocks).
 */
kotobase.protocols.ipfs.handle = (function kotobase$protocols$ipfs$handle(ctx,req){
var segs = kotobase.protocols.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.not((function (){var G__14931 = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var fexpr__14930 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"head","head",-771383919),null], null), null);
return (fexpr__14930.cljs$core$IFn$_invoke$arity$1 ? fexpr__14930.cljs$core$IFn$_invoke$arity$1(G__14931) : fexpr__14930.call(null,G__14931));
})())){
return kotobase.protocols.http.method_not_allowed();
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ipfs",cljs.core.first(segs))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(segs))))){
var cid = cljs.core.second(segs);
var temp__5823__auto__ = kotobase.protocols.blocks.get_block(ctx,cid);
if(cljs.core.truth_(temp__5823__auto__)){
var b = temp__5823__auto__;
var G__14932 = kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),new cljs.core.PersistentArrayMap(null, 4, ["content-type",kotobase.protocols.ipfs.sanitize_content_type(new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(b)),"etag",(""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)+"\""),"x-ipfs-path",(""+"/ipfs/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)),"cache-control","public, max-age=29030400, immutable"], null),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req)))?new cljs.core.Keyword(null,"bytes","bytes",1175866680).cljs$core$IFn$_invoke$arity$1(b):null));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("base64",new cljs.core.Keyword(null,"encoding","encoding",1728578272).cljs$core$IFn$_invoke$arity$1(b))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14932,new cljs.core.Keyword(null,"body-encoding","body-encoding",-1446963485),new cljs.core.Keyword(null,"base64","base64",167760174));
} else {
return G__14932;
}
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1((""+"block not found: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ipns",cljs.core.first(segs))){
return kotobase.protocols.http.text((501),"ipns not implemented (mutable heads resolve via KRP signed heads)");
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();

}
}
}
});

//# sourceMappingURL=kotobase.protocols.ipfs.js.map
