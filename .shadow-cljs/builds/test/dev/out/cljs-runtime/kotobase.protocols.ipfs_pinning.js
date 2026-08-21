goog.provide('kotobase.protocols.ipfs_pinning');
kotobase.protocols.ipfs_pinning.pins_coll = new cljs.core.Keyword("kotobase.protocols","pins","kotobase.protocols/pins",1287163304);
kotobase.protocols.ipfs_pinning.json_response = (function kotobase$protocols$ipfs_pinning$json_response(status,m){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),kotobase.protocols.json.encode(m));
});
kotobase.protocols.ipfs_pinning.pin_error = (function kotobase$protocols$ipfs_pinning$pin_error(status,reason){
return kotobase.protocols.ipfs_pinning.json_response(status,new cljs.core.PersistentArrayMap(null, 1, ["error",reason], null));
});
kotobase.protocols.ipfs_pinning.audit_BANG_ = (function kotobase$protocols$ipfs_pinning$audit_BANG_(store,op,requestid,cid){
return kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"ipfs-pinning","ipfs-pinning",-1024790159),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"requestid","requestid",591796241),requestid,new cljs.core.Keyword(null,"cid","cid",-1940591320),cid], null));
});
/**
 * Monotonic counter used only to keep generated request ids unique — see
 *   the id scheme note in the namespace docstring.
 */
kotobase.protocols.ipfs_pinning.next_seq_BANG_ = (function kotobase$protocols$ipfs_pinning$next_seq_BANG_(store){
return new cljs.core.Keyword(null,"seq","seq",-1817803783).cljs$core$IFn$_invoke$arity$1(kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols.ipfs-pinning","id-seq","kotobase.protocols.ipfs-pinning/id-seq",1485625737),cljs.core.PersistentArrayMap.EMPTY));
});
kotobase.protocols.ipfs_pinning.gen_requestid = (function kotobase$protocols$ipfs_pinning$gen_requestid(store,cid,now){
return kotobase.protocols.hash.fingerprint((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid)+"|"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(now)+"|"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.ipfs_pinning.next_seq_BANG_(store))));
});
/**
 * Live pinned request ids for `cid`. Tombstones (`nil`) and failed
 *   requests do not count — they never advertised.
 */
kotobase.protocols.ipfs_pinning.pinned_request_ids = (function kotobase$protocols$ipfs_pinning$pinned_request_ids(store,cid){
return cljs.core.vec(cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (id){
var temp__5825__auto__ = kotobase.store._get(store,kotobase.protocols.ipfs_pinning.pins_coll,id);
if(cljs.core.truth_(temp__5825__auto__)){
var d = temp__5825__auto__;
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cid,new cljs.core.Keyword("pin","cid","pin/cid",-1940480883).cljs$core$IFn$_invoke$arity$1(d))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("pinned",new cljs.core.Keyword("pin","status","pin/status",-1997623494).cljs$core$IFn$_invoke$arity$1(d))))){
return id;
} else {
return null;
}
} else {
return null;
}
}),kotobase.store._list(store,kotobase.protocols.ipfs_pinning.pins_coll)));
});
/**
 * Call injected `:advertise` if present. Never throws. Never rewrites
 *   `:cid`. Absence is not a pass dressed as success — it is simply not
 *   this library's transport.
 */
kotobase.protocols.ipfs_pinning.fire_advertise = (function kotobase$protocols$ipfs_pinning$fire_advertise(ctx,event){
var f = new cljs.core.Keyword(null,"advertise","advertise",-716947021).cljs$core$IFn$_invoke$arity$1(ctx);
if(cljs.core.ifn_QMARK_(f)){
try{var ret = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(event) : f.call(null,event));
if(((cljs.core.map_QMARK_(ret)) && (new cljs.core.Keyword(null,"ok?","ok?",447310304).cljs$core$IFn$_invoke$arity$1(ret) === false))){
kotobase.protocols.ipfs_pinning.audit_BANG_(new cljs.core.Keyword(null,"store","store",1512230022).cljs$core$IFn$_invoke$arity$1(ctx),new cljs.core.Keyword(null,"advertise-rejected","advertise-rejected",-1519477581),new cljs.core.Keyword(null,"requestid","requestid",591796241).cljs$core$IFn$_invoke$arity$1(event),new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(event));
} else {
}

return ret;
}catch (e12536){var e = e12536;
kotobase.protocols.ipfs_pinning.audit_BANG_(new cljs.core.Keyword(null,"store","store",1512230022).cljs$core$IFn$_invoke$arity$1(ctx),new cljs.core.Keyword(null,"advertise-error","advertise-error",-102949591),new cljs.core.Keyword(null,"requestid","requestid",591796241).cljs$core$IFn$_invoke$arity$1(event),new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(event));

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok?","ok?",447310304),false,new cljs.core.Keyword(null,"reason","reason",-2070751759),new cljs.core.Keyword(null,"advertise-error","advertise-error",-102949591),new cljs.core.Keyword(null,"detail","detail",-1545345025),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))], null);
}} else {
return null;
}
});
/**
 * Pin doc → PinStatus JSON map (ipfs.github.io pinning-services-api-spec
 *   shape). `delegates` is always empty — this library has no peer identity to
 *   delegate to.
 */
kotobase.protocols.ipfs_pinning.pin__GT_json = (function kotobase$protocols$ipfs_pinning$pin__GT_json(requestid,p__12537){
var map__12538 = p__12537;
var map__12538__$1 = cljs.core.__destructure_map(map__12538);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12538__$1,new cljs.core.Keyword("pin","cid","pin/cid",-1940480883));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12538__$1,new cljs.core.Keyword("pin","name","pin/name",1843757524));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12538__$1,new cljs.core.Keyword("pin","status","pin/status",-1997623494));
var created = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12538__$1,new cljs.core.Keyword("pin","created","pin/created",-705012355));
var origins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12538__$1,new cljs.core.Keyword("pin","origins","pin/origins",-1970139017));
var G__12539 = new cljs.core.PersistentArrayMap(null, 5, ["requestid",requestid,"status",status,"created",created,"pin",(function (){var G__12540 = new cljs.core.PersistentArrayMap(null, 1, ["cid",cid], null);
var G__12540__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12540,"name",name):G__12540);
if(cljs.core.seq(origins)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12540__$1,"origins",origins);
} else {
return G__12540__$1;
}
})(),"delegates",cljs.core.PersistentVector.EMPTY], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("failed",status)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12539,"info",new cljs.core.PersistentArrayMap(null, 1, ["reason",(""+"cid not present in local block space; "+"v0.1 has no pinning daemon to fetch it "+"from origins")], null));
} else {
return G__12539;
}
});
kotobase.protocols.ipfs_pinning.create_pin = (function kotobase$protocols$ipfs_pinning$create_pin(ctx,now,body){
var store = new cljs.core.Keyword(null,"store","store",1512230022).cljs$core$IFn$_invoke$arity$1(ctx);
var map__12541 = body;
var map__12541__$1 = cljs.core.__destructure_map(map__12541);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12541__$1,"cid");
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12541__$1,"name");
var origins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12541__$1,"origins");
if((!(typeof cid === 'string'))){
return kotobase.protocols.ipfs_pinning.pin_error((400),"cid is required");
} else {
var already = cljs.core.seq(kotobase.protocols.ipfs_pinning.pinned_request_ids(store,cid));
var requestid = kotobase.protocols.ipfs_pinning.gen_requestid(store,cid,now);
var status = (cljs.core.truth_(kotobase.protocols.blocks.get_block(ctx,cid))?"pinned":"failed");
var doc = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("pin","cid","pin/cid",-1940480883),cid,new cljs.core.Keyword("pin","name","pin/name",1843757524),name,new cljs.core.Keyword("pin","status","pin/status",-1997623494),status,new cljs.core.Keyword("pin","created","pin/created",-705012355),now,new cljs.core.Keyword("pin","origins","pin/origins",-1970139017),cljs.core.vec(origins)], null);
kotobase.store._put(store,kotobase.protocols.ipfs_pinning.pins_coll,requestid,doc);

kotobase.protocols.ipfs_pinning.audit_BANG_(store,new cljs.core.Keyword(null,"create-pin","create-pin",748014131),requestid,cid);

if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("pinned",status)) && (cljs.core.not(already)))){
kotobase.protocols.ipfs_pinning.fire_advertise(ctx,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid,new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"advertise","advertise",-716947021),new cljs.core.Keyword(null,"requestid","requestid",591796241),requestid,new cljs.core.Keyword(null,"context-id","context-id",1979873501),requestid,new cljs.core.Keyword(null,"mutates-cid?","mutates-cid?",-1563132977),false], null));
} else {
}

return kotobase.protocols.ipfs_pinning.json_response((202),kotobase.protocols.ipfs_pinning.pin__GT_json(requestid,doc));
}
});
kotobase.protocols.ipfs_pinning.get_pin = (function kotobase$protocols$ipfs_pinning$get_pin(store,requestid){
var temp__5823__auto__ = kotobase.store._get(store,kotobase.protocols.ipfs_pinning.pins_coll,requestid);
if(cljs.core.truth_(temp__5823__auto__)){
var doc = temp__5823__auto__;
return kotobase.protocols.ipfs_pinning.json_response((200),kotobase.protocols.ipfs_pinning.pin__GT_json(requestid,doc));
} else {
return kotobase.protocols.ipfs_pinning.pin_error((404),"pin request not found");
}
});
kotobase.protocols.ipfs_pinning.list_pins = (function kotobase$protocols$ipfs_pinning$list_pins(store,req){
var cid_filter = kotobase.protocols.http.query_param(req,"cid");
var status_filter = kotobase.protocols.http.query_param(req,"status");
var entries = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__12542){
var vec__12543 = p__12542;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12543,(0),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12543,(1),null);
return (((status_filter == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(status_filter,new cljs.core.Keyword("pin","status","pin/status",-1997623494).cljs$core$IFn$_invoke$arity$1(d))));
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__12546){
var vec__12547 = p__12546;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12547,(0),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12547,(1),null);
return (((cid_filter == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cid_filter,new cljs.core.Keyword("pin","cid","pin/cid",-1940480883).cljs$core$IFn$_invoke$arity$1(d))));
}),cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (id){
var temp__5825__auto__ = kotobase.store._get(store,kotobase.protocols.ipfs_pinning.pins_coll,id);
if(cljs.core.truth_(temp__5825__auto__)){
var d = temp__5825__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,d], null);
} else {
return null;
}
}),cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.store._list(store,kotobase.protocols.ipfs_pinning.pins_coll)))));
return kotobase.protocols.ipfs_pinning.json_response((200),new cljs.core.PersistentArrayMap(null, 2, ["count",cljs.core.count(entries),"results",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12550){
var vec__12551 = p__12550;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12551,(0),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12551,(1),null);
return kotobase.protocols.ipfs_pinning.pin__GT_json(id,d);
}),entries)], null));
});
kotobase.protocols.ipfs_pinning.delete_pin = (function kotobase$protocols$ipfs_pinning$delete_pin(ctx,requestid){
var store = new cljs.core.Keyword(null,"store","store",1512230022).cljs$core$IFn$_invoke$arity$1(ctx);
var temp__5823__auto__ = kotobase.store._get(store,kotobase.protocols.ipfs_pinning.pins_coll,requestid);
if(cljs.core.truth_(temp__5823__auto__)){
var doc = temp__5823__auto__;
var cid = new cljs.core.Keyword("pin","cid","pin/cid",-1940480883).cljs$core$IFn$_invoke$arity$1(doc);
kotobase.store._put(store,kotobase.protocols.ipfs_pinning.pins_coll,requestid,null);

kotobase.protocols.ipfs_pinning.audit_BANG_(store,new cljs.core.Keyword(null,"delete-pin","delete-pin",-108622337),requestid,cid);

if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("pinned",new cljs.core.Keyword("pin","status","pin/status",-1997623494).cljs$core$IFn$_invoke$arity$1(doc))) && (cljs.core.empty_QMARK_(kotobase.protocols.ipfs_pinning.pinned_request_ids(store,cid))))){
kotobase.protocols.ipfs_pinning.fire_advertise(ctx,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid,new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"remove","remove",-131428414),new cljs.core.Keyword(null,"requestid","requestid",591796241),requestid,new cljs.core.Keyword(null,"context-id","context-id",1979873501),requestid,new cljs.core.Keyword(null,"mutates-cid?","mutates-cid?",-1563132977),false], null));
} else {
}

return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((202),cljs.core.PersistentArrayMap.EMPTY,null);
} else {
return kotobase.protocols.ipfs_pinning.pin_error((404),"pin request not found");
}
});
kotobase.protocols.ipfs_pinning.parse_body = (function kotobase$protocols$ipfs_pinning$parse_body(req){
try{return kotobase.protocols.json.parse((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "{}";
}
})());
}catch (e12554){var _ = e12554;
return null;
}});
/**
 * IPFS Pinning Service API handler. `ctx` is {:store IStore, :now optional
 *   ISO string, optional `:advertise` (fn [event]), and optionally the
 *   `:blocks`/`:cid-of` block plane kotobase.protocols.blocks documents}.
 *   Dispatches POST/GET /pins and GET/DELETE /pins/{requestid}.
 */
kotobase.protocols.ipfs_pinning.handle = (function kotobase$protocols$ipfs_pinning$handle(p__12555,req){
var map__12556 = p__12555;
var map__12556__$1 = cljs.core.__destructure_map(map__12556);
var ctx = map__12556__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12556__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var now = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12556__$1,new cljs.core.Keyword(null,"now","now",-1650525531));
var segs = kotobase.protocols.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req));
var method = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var n = cljs.core.count(segs);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("pins",cljs.core.first(segs))){
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),n)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),method)))){
var body = kotobase.protocols.ipfs_pinning.parse_body(req);
if((body == null)){
return kotobase.protocols.ipfs_pinning.pin_error((400),"malformed JSON body");
} else {
return kotobase.protocols.ipfs_pinning.create_pin(ctx,now,body);
}
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),n)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),method)))){
return kotobase.protocols.ipfs_pinning.list_pins(store,req);
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),n)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),method)))){
return kotobase.protocols.ipfs_pinning.get_pin(store,cljs.core.second(segs));
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),n)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete","delete",-1768633620),method)))){
return kotobase.protocols.ipfs_pinning.delete_pin(ctx,cljs.core.second(segs));
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),n)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),n)))){
return kotobase.protocols.http.method_not_allowed();
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();

}
}
}
}
}
}
});

//# sourceMappingURL=kotobase.protocols.ipfs_pinning.js.map
