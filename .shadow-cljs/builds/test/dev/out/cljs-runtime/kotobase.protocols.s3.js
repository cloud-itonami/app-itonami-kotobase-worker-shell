goog.provide('kotobase.protocols.s3');
kotobase.protocols.s3.objects_coll = (function kotobase$protocols$s3$objects_coll(bucket){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.s3","objects","kotobase.s3/objects",124090920),bucket], null);
});
/**
 * Byte length of an object, whichever era its record is from.
 * 
 *   An object value used to be REQUIRED to carry its body inline as
 *   `:bytes`. A deploy shell may now keep the bytes on a block plane and
 *   store `{:cid … :size …}` here instead — which is what
 *   s3.kotobase.net does, because bodies do not belong on the datom
 *   plane (superproject ADR-2608039970) and because the inline path was
 *   binary-unsafe.
 * 
 *   `:size` is therefore preferred and `(count (:bytes o))` is the
 *   fallback, never the other way round: for a record without inline
 *   bytes the fallback yields 0, and a listing that reports every object
 *   as empty is wrong in the one way nobody notices — it parses, it
 *   validates, and every size is a lie.
 */
kotobase.protocols.s3.object_size = (function kotobase$protocols$s3$object_size(o){
var or__5162__auto__ = new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(o);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = cljs.core.count(new cljs.core.Keyword(null,"bytes","bytes",1175866680).cljs$core$IFn$_invoke$arity$1(o));
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return (0);
}
}
});
kotobase.protocols.s3.audit_BANG_ = (function kotobase$protocols$s3$audit_BANG_(store,op,bucket,k){
return kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"s3","s3",969970109),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"bucket","bucket",1126218366),bucket,new cljs.core.Keyword(null,"key","key",-1516042587),k], null));
});
kotobase.protocols.s3.xml_response = (function kotobase$protocols$s3$xml_response(status,body){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/xml"], null),(""+"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(body)));
});
kotobase.protocols.s3.error_xml = (function kotobase$protocols$s3$error_xml(status,code,msg){
return kotobase.protocols.s3.xml_response(status,(""+"<Error><Code>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code)+"</Code><Message>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.http.xml_escape(msg))+"</Message></Error>"));
});
kotobase.protocols.s3.list_objects = (function kotobase$protocols$s3$list_objects(store,bucket,prefix){
var entries = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (k){
var temp__5825__auto__ = kotobase.store._get(store,kotobase.protocols.s3.objects_coll(bucket),k);
if(cljs.core.truth_(temp__5825__auto__)){
var o = temp__5825__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,o], null);
} else {
return null;
}
}),cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__10477_SHARP_){
return clojure.string.starts_with_QMARK_(p1__10477_SHARP_,(function (){var or__5162__auto__ = prefix;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})());
}),kotobase.store._list(store,kotobase.protocols.s3.objects_coll(bucket)))));
return kotobase.protocols.s3.xml_response((200),(""+"<ListBucketResult>"+"<Name>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.http.xml_escape(bucket))+"</Name>"+"<Prefix>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.http.xml_escape((function (){var or__5162__auto__ = prefix;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})()))+"</Prefix>"+"<KeyCount>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(entries))+"</KeyCount>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,(function (){var iter__5649__auto__ = (function kotobase$protocols$s3$list_objects_$_iter__10478(s__10479){
return (new cljs.core.LazySeq(null,(function (){
var s__10479__$1 = s__10479;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__10479__$1);
if(temp__5825__auto__){
var s__10479__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__10479__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__10479__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__10481 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__10480 = (0);
while(true){
if((i__10480 < size__5648__auto__)){
var vec__10482 = cljs.core._nth(c__5647__auto__,i__10480);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10482,(0),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10482,(1),null);
cljs.core.chunk_append(b__10481,(""+"<Contents>"+"<Key>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.http.xml_escape(k))+"</Key>"+"<ETag>&quot;"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"etag","etag",-329255476).cljs$core$IFn$_invoke$arity$1(o))+"&quot;</ETag>"+"<Size>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.s3.object_size(o))+"</Size>"+"</Contents>"));

var G__10495 = (i__10480 + (1));
i__10480 = G__10495;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__10481),kotobase$protocols$s3$list_objects_$_iter__10478(cljs.core.chunk_rest(s__10479__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__10481),null);
}
} else {
var vec__10485 = cljs.core.first(s__10479__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10485,(0),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10485,(1),null);
return cljs.core.cons((""+"<Contents>"+"<Key>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.http.xml_escape(k))+"</Key>"+"<ETag>&quot;"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"etag","etag",-329255476).cljs$core$IFn$_invoke$arity$1(o))+"&quot;</ETag>"+"<Size>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.s3.object_size(o))+"</Size>"+"</Contents>"),kotobase$protocols$s3$list_objects_$_iter__10478(cljs.core.rest(s__10479__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(entries);
})()))+"</ListBucketResult>"));
});
kotobase.protocols.s3.object_headers = (function kotobase$protocols$s3$object_headers(o){
var G__10488 = new cljs.core.PersistentArrayMap(null, 3, ["content-type",new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(o),"etag",(""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"etag","etag",-329255476).cljs$core$IFn$_invoke$arity$1(o))+"\""),"content-length",(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.s3.object_size(o)))], null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"last-modified","last-modified",1593411791).cljs$core$IFn$_invoke$arity$1(o))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__10488,"last-modified",new cljs.core.Keyword(null,"last-modified","last-modified",1593411791).cljs$core$IFn$_invoke$arity$1(o));
} else {
return G__10488;
}
});
/**
 * S3 surface handler. `ctx` is {:store IStore, :now optional ISO string}.
 */
kotobase.protocols.s3.handle = (function kotobase$protocols$s3$handle(p__10489,req){
var map__10490 = p__10489;
var map__10490__$1 = cljs.core.__destructure_map(map__10490);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10490__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var now = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10490__$1,new cljs.core.Keyword(null,"now","now",-1650525531));
var vec__10491 = kotobase.protocols.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req));
var seq__10492 = cljs.core.seq(vec__10491);
var first__10493 = cljs.core.first(seq__10492);
var seq__10492__$1 = cljs.core.next(seq__10492);
var bucket = first__10493;
var ks = seq__10492__$1;
var k = ((cljs.core.seq(ks))?clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",ks):null);
if((bucket == null)){
return kotobase.protocols.s3.error_xml((400),"InvalidRequest","bucket missing");
} else {
if((k == null)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))){
return kotobase.protocols.s3.list_objects(store,bucket,kotobase.protocols.http.query_param(req,"prefix"));
} else {
return kotobase.protocols.s3.error_xml((405),"MethodNotAllowed","unsupported bucket operation");
}
} else {
var G__10494 = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var G__10494__$1 = (((G__10494 instanceof cljs.core.Keyword))?G__10494.fqn:null);
switch (G__10494__$1) {
case "put":
var body = (function (){var or__5162__auto__ = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})();
var o = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"bytes","bytes",1175866680),body,new cljs.core.Keyword(null,"content-type","content-type",-508222634),(function (){var or__5162__auto__ = kotobase.protocols.http.header(req,"content-type");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "application/octet-stream";
}
})(),new cljs.core.Keyword(null,"etag","etag",-329255476),kotobase.protocols.hash.fingerprint(body),new cljs.core.Keyword(null,"last-modified","last-modified",1593411791),now], null);
kotobase.store._put(store,kotobase.protocols.s3.objects_coll(bucket),k,o);

kotobase.protocols.s3.audit_BANG_(store,new cljs.core.Keyword(null,"put-object","put-object",-47597800),bucket,k);

return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),new cljs.core.PersistentArrayMap(null, 1, ["etag",(""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"etag","etag",-329255476).cljs$core$IFn$_invoke$arity$1(o))+"\"")], null),null);

break;
case "get":
case "head":
var temp__5823__auto__ = kotobase.store._get(store,kotobase.protocols.s3.objects_coll(bucket),k);
if(cljs.core.truth_(temp__5823__auto__)){
var o = temp__5823__auto__;
if(cljs.core.truth_((function (){var and__5160__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req));
if(and__5160__auto__){
var and__5160__auto____$1 = (new cljs.core.Keyword(null,"bytes","bytes",1175866680).cljs$core$IFn$_invoke$arity$1(o) == null);
if(and__5160__auto____$1){
return new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(o);
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
return kotobase.protocols.s3.error_xml((501),"NotImplemented",(""+"object bytes are stored off this plane; "+"the deploy shell serves them"));
} else {
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),kotobase.protocols.s3.object_headers(o),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req)))?new cljs.core.Keyword(null,"bytes","bytes",1175866680).cljs$core$IFn$_invoke$arity$1(o):null));
}
} else {
return kotobase.protocols.s3.error_xml((404),"NoSuchKey",(""+"no such key: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
}

break;
case "delete":
kotobase.store._put(store,kotobase.protocols.s3.objects_coll(bucket),k,null);

kotobase.protocols.s3.audit_BANG_(store,new cljs.core.Keyword(null,"delete-object","delete-object",-145652655),bucket,k);

return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((204),cljs.core.PersistentArrayMap.EMPTY,null);

break;
default:
return kotobase.protocols.s3.error_xml((405),"MethodNotAllowed","unsupported object operation");

}

}
}
});

//# sourceMappingURL=kotobase.protocols.s3.js.map
