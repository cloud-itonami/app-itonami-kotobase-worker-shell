goog.provide('kotobase.protocols.atproto');
kotobase.protocols.atproto.records_coll = (function kotobase$protocols$atproto$records_coll(did,nsid){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.at","records","kotobase.at/records",-2124997391),did,nsid], null);
});
kotobase.protocols.atproto.at_uri = (function kotobase$protocols$atproto$at_uri(did,nsid,rkey){
return (""+"at://"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(did)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(nsid)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(rkey));
});
kotobase.protocols.atproto.json_response = (function kotobase$protocols$atproto$json_response(status,m){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),kotobase.protocols.json.encode(m));
});
kotobase.protocols.atproto.xrpc_error = (function kotobase$protocols$atproto$xrpc_error(status,error,msg){
return kotobase.protocols.atproto.json_response(status,new cljs.core.PersistentArrayMap(null, 2, ["error",error,"message",msg], null));
});
kotobase.protocols.atproto.audit_BANG_ = (function kotobase$protocols$atproto$audit_BANG_(store,op,did,nsid,rkey){
return kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"atproto","atproto",-794792181),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"did","did",593382517),did,new cljs.core.Keyword(null,"collection","collection",-683361892),nsid,new cljs.core.Keyword(null,"rkey","rkey",-1712336442),rkey], null));
});
kotobase.protocols.atproto.parse_body = (function kotobase$protocols$atproto$parse_body(req){
try{return kotobase.protocols.json.parse((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "{}";
}
})());
}catch (e14904){var _ = e14904;
return null;
}});
kotobase.protocols.atproto.get_record = (function kotobase$protocols$atproto$get_record(store,req){
var did = kotobase.protocols.http.query_param(req,"repo");
var nsid = kotobase.protocols.http.query_param(req,"collection");
var rkey = kotobase.protocols.http.query_param(req,"rkey");
if(cljs.core.not((function (){var and__5160__auto__ = did;
if(cljs.core.truth_(and__5160__auto__)){
var and__5160__auto____$1 = nsid;
if(cljs.core.truth_(and__5160__auto____$1)){
return rkey;
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
return kotobase.protocols.atproto.xrpc_error((400),"InvalidRequest","repo, collection and rkey are required");
} else {
var temp__5823__auto__ = kotobase.store._get(store,kotobase.protocols.atproto.records_coll(did,nsid),rkey);
if(cljs.core.truth_(temp__5823__auto__)){
var record = temp__5823__auto__;
return kotobase.protocols.atproto.json_response((200),new cljs.core.PersistentArrayMap(null, 2, ["uri",kotobase.protocols.atproto.at_uri(did,nsid,rkey),"value",record], null));
} else {
return kotobase.protocols.atproto.xrpc_error((400),"RecordNotFound",(""+"record not found: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.atproto.at_uri(did,nsid,rkey))));
}
}
});
kotobase.protocols.atproto.list_records = (function kotobase$protocols$atproto$list_records(store,req){
var did = kotobase.protocols.http.query_param(req,"repo");
var nsid = kotobase.protocols.http.query_param(req,"collection");
if(cljs.core.not((function (){var and__5160__auto__ = did;
if(cljs.core.truth_(and__5160__auto__)){
return nsid;
} else {
return and__5160__auto__;
}
})())){
return kotobase.protocols.atproto.xrpc_error((400),"InvalidRequest","repo and collection are required");
} else {
var records = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (rkey){
var temp__5825__auto__ = kotobase.store._get(store,kotobase.protocols.atproto.records_coll(did,nsid),rkey);
if(cljs.core.truth_(temp__5825__auto__)){
var v = temp__5825__auto__;
return new cljs.core.PersistentArrayMap(null, 2, ["uri",kotobase.protocols.atproto.at_uri(did,nsid,rkey),"value",v], null);
} else {
return null;
}
}),cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.store._list(store,kotobase.protocols.atproto.records_coll(did,nsid))));
return kotobase.protocols.atproto.json_response((200),new cljs.core.PersistentArrayMap(null, 1, ["records",cljs.core.vec(records)], null));
}
});
kotobase.protocols.atproto.put_record = (function kotobase$protocols$atproto$put_record(store,req){
var b = kotobase.protocols.atproto.parse_body(req);
var map__14905 = b;
var map__14905__$1 = cljs.core.__destructure_map(map__14905);
var repo = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14905__$1,"repo");
var collection = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14905__$1,"collection");
var rkey = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14905__$1,"rkey");
var record = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14905__$1,"record");
if(cljs.core.not((function (){var and__5160__auto__ = repo;
if(cljs.core.truth_(and__5160__auto__)){
var and__5160__auto____$1 = collection;
if(cljs.core.truth_(and__5160__auto____$1)){
var and__5160__auto____$2 = rkey;
if(cljs.core.truth_(and__5160__auto____$2)){
return cljs.core.map_QMARK_(record);
} else {
return and__5160__auto____$2;
}
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
return kotobase.protocols.atproto.xrpc_error((400),"InvalidRequest","body must carry repo, collection, rkey and a record object");
} else {
kotobase.store._put(store,kotobase.protocols.atproto.records_coll(repo,collection),rkey,record);

kotobase.protocols.atproto.audit_BANG_(store,new cljs.core.Keyword(null,"put-record","put-record",-864371564),repo,collection,rkey);

return kotobase.protocols.atproto.json_response((200),new cljs.core.PersistentArrayMap(null, 1, ["uri",kotobase.protocols.atproto.at_uri(repo,collection,rkey)], null));
}
});
kotobase.protocols.atproto.delete_record = (function kotobase$protocols$atproto$delete_record(store,req){
var map__14906 = kotobase.protocols.atproto.parse_body(req);
var map__14906__$1 = cljs.core.__destructure_map(map__14906);
var repo = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14906__$1,"repo");
var collection = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14906__$1,"collection");
var rkey = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14906__$1,"rkey");
if(cljs.core.not((function (){var and__5160__auto__ = repo;
if(cljs.core.truth_(and__5160__auto__)){
var and__5160__auto____$1 = collection;
if(cljs.core.truth_(and__5160__auto____$1)){
return rkey;
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
return kotobase.protocols.atproto.xrpc_error((400),"InvalidRequest","body must carry repo, collection and rkey");
} else {
kotobase.store._put(store,kotobase.protocols.atproto.records_coll(repo,collection),rkey,null);

kotobase.protocols.atproto.audit_BANG_(store,new cljs.core.Keyword(null,"delete-record","delete-record",1162843537),repo,collection,rkey);

return kotobase.protocols.atproto.json_response((200),cljs.core.PersistentArrayMap.EMPTY);
}
});
kotobase.protocols.atproto.get_blob = (function kotobase$protocols$atproto$get_blob(ctx,req){
var did = kotobase.protocols.http.query_param(req,"did");
var cid = kotobase.protocols.http.query_param(req,"cid");
if(cljs.core.not((function (){var and__5160__auto__ = did;
if(cljs.core.truth_(and__5160__auto__)){
return cid;
} else {
return and__5160__auto__;
}
})())){
return kotobase.protocols.atproto.xrpc_error((400),"InvalidRequest","did and cid are required");
} else {
var temp__5823__auto__ = kotobase.protocols.blocks.get_block(ctx,cid);
if(cljs.core.truth_(temp__5823__auto__)){
var b = temp__5823__auto__;
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),new cljs.core.PersistentArrayMap(null, 1, ["content-type",new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(b)], null),new cljs.core.Keyword(null,"bytes","bytes",1175866680).cljs$core$IFn$_invoke$arity$1(b));
} else {
return kotobase.protocols.atproto.xrpc_error((400),"BlobNotFound",(""+"blob not found: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)));
}
}
});
/**
 * XRPC handler. Dispatches /xrpc/{nsid}; unknown NSIDs → 501.
 */
kotobase.protocols.atproto.handle = (function kotobase$protocols$atproto$handle(p__14907,req){
var map__14908 = p__14907;
var map__14908__$1 = cljs.core.__destructure_map(map__14908);
var ctx = map__14908__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14908__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var segs = kotobase.protocols.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req));
if((!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("xrpc",cljs.core.first(segs))))){
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();
} else {
var nsid = cljs.core.second(segs);
var get_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req));
var post_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req));
var G__14909 = nsid;
switch (G__14909) {
case "com.atproto.repo.getRecord":
if(get_QMARK_){
return kotobase.protocols.atproto.get_record(store,req);
} else {
return kotobase.protocols.http.method_not_allowed();
}

break;
case "com.atproto.repo.listRecords":
if(get_QMARK_){
return kotobase.protocols.atproto.list_records(store,req);
} else {
return kotobase.protocols.http.method_not_allowed();
}

break;
case "com.atproto.repo.putRecord":
if(post_QMARK_){
return kotobase.protocols.atproto.put_record(store,req);
} else {
return kotobase.protocols.http.method_not_allowed();
}

break;
case "com.atproto.repo.deleteRecord":
if(post_QMARK_){
return kotobase.protocols.atproto.delete_record(store,req);
} else {
return kotobase.protocols.http.method_not_allowed();
}

break;
case "com.atproto.sync.getBlob":
if(get_QMARK_){
return kotobase.protocols.atproto.get_blob(ctx,req);
} else {
return kotobase.protocols.http.method_not_allowed();
}

break;
default:
return kotobase.protocols.atproto.xrpc_error((501),"MethodNotImplemented",(""+"unsupported nsid: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5162__auto__ = nsid;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})())));

}
}
});

//# sourceMappingURL=kotobase.protocols.atproto.js.map
