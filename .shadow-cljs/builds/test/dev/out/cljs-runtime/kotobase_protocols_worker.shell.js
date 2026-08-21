goog.provide('kotobase_protocols_worker.shell');
kotobase_protocols_worker.shell.text_encoder = (new TextEncoder());
kotobase_protocols_worker.shell.text_decoder = (new TextDecoder());
kotobase_protocols_worker.shell.te = (function kotobase_protocols_worker$shell$te(s){
return kotobase_protocols_worker.shell.text_encoder.encode(s);
});
kotobase_protocols_worker.shell.ab__GT_b64 = (function kotobase_protocols_worker$shell$ab__GT_b64(ab){
var u8 = (new Uint8Array(ab));
var n = u8.length;
var i = (0);
var s = "";
while(true){
if((i < n)){
var G__12506 = (i + (32768));
var G__12507 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode.apply(null,u8.subarray(i,cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (32768)))))));
i = G__12506;
s = G__12507;
continue;
} else {
return btoa(s);
}
break;
}
});
kotobase_protocols_worker.shell.b64__GT_u8 = (function kotobase_protocols_worker$shell$b64__GT_u8(b64){
var bin = atob(b64);
return Uint8Array.from(bin,(function (c){
return c.charCodeAt((0));
}));
});
kotobase_protocols_worker.shell.ab__GT_hex = (function kotobase_protocols_worker$shell$ab__GT_hex(ab){
var u8 = (new Uint8Array(ab));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s,i){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)+cljs.core.str.cljs$core$IFn$_invoke$arity$1((u8[i]).toString((16)).padStart((2),"0")));
}),"",cljs.core.range.cljs$core$IFn$_invoke$arity$1(u8.length));
});
kotobase_protocols_worker.shell.sha256 = (function kotobase_protocols_worker$shell$sha256(data){
return crypto.subtle.digest("SHA-256",data);
});
kotobase_protocols_worker.shell.signer_crypto = sigv4.crypto.crypto();
/**
 * Promise<boolean>: recompute the request signature from the secrets and the
 *   RAW payload, require the declared payload hash to match.
 * 
 *   Canonicalization, the HMAC ladder and the comparison all come from
 *   kotoba-lang/sigv4 — this worker used to carry its own, and the copy encoded
 *   with charCodeAt, so any non-ASCII key or query value signed as UTF-16 and
 *   disagreed with every S3 client. What is left here is this worker's own
 *   policy: which access key is accepted, and that the declared payload hash
 *   must match the body we actually received.
 * 
 *   Public so `worker-test` can drive it with a request signed by the same shared
 *   library a real S3 client would use — the one behaviour extracting the signer
 *   could have broken, and which nothing here covered before.
 */
kotobase_protocols_worker.shell.sigv4_verify = (function kotobase_protocols_worker$shell$sigv4_verify(env,req,body_ab){
var p = sigv4.verify.parse_authorization(cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),"authorization"));
var akid = env.S3_ACCESS_KEY_ID;
var secret = env.S3_SECRET_ACCESS_KEY;
var declared = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),"x-amz-content-sha256");
if(cljs.core.not((function (){var and__5160__auto__ = p;
if(cljs.core.truth_(and__5160__auto__)){
var and__5160__auto____$1 = akid;
if(cljs.core.truth_(and__5160__auto____$1)){
var and__5160__auto____$2 = secret;
if(cljs.core.truth_(and__5160__auto____$2)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"akid","akid",-523542555).cljs$core$IFn$_invoke$arity$1(p),akid);
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
return Promise.resolve(false);
} else {
return kotobase_protocols_worker.shell.sha256(body_ab).then(kotobase_protocols_worker.shell.ab__GT_hex).then((function (actual_hash){
var payload_hash = (function (){var or__5162__auto__ = declared;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return actual_hash;
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = declared;
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(declared,"UNSIGNED-PAYLOAD")) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(declared,actual_hash)));
} else {
return and__5160__auto__;
}
})())){
return false;
} else {
return sigv4.verify.expected_signature(kotobase_protocols_worker.shell.signer_crypto,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"secret-key","secret-key",129235534),secret,new cljs.core.Keyword(null,"parsed","parsed",-819589156),p,new cljs.core.Keyword(null,"amz-date","amz-date",113835954),cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),"x-amz-date"),new cljs.core.Keyword(null,"payload-hash","payload-hash",1436757062),payload_hash,new cljs.core.Keyword(null,"request","request",1772954723),req], null)).then((function (p1__12471_SHARP_){
return sigv4.verify.constant_time_eq_QMARK_(new cljs.core.Keyword(null,"signature","signature",1463754794).cljs$core$IFn$_invoke$arity$1(p),p1__12471_SHARP_);
}));
}
}));
}
});
/**
 * Promise<boolean>. Parses the body only on this fallback path (Bearer
 *   and SigV4 never need it) — a large S3/ipfs write body is never
 *   JSON-parsed just to look for a CACAO that isn't there.
 */
kotobase_protocols_worker.shell.cacao_authorized_QMARK_ = (function kotobase_protocols_worker$shell$cacao_authorized_QMARK_(env,req){
var parsed = (function (){try{return kotobase.protocols.json.parse((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "{}";
}
})());
}catch (e12472){var _ = e12472;
return cljs.core.PersistentArrayMap.EMPTY;
}})();
var token = kotobase_protocols_worker.cacao.from_request(req,parsed);
var issuer = (function (){var G__12473 = token;
if((G__12473 == null)){
return null;
} else {
return kotobase_protocols_worker.cacao.verify_cacao(G__12473);
}
})();
return Promise.resolve(cljs.core.boolean$((function (){var and__5160__auto__ = issuer;
if(cljs.core.truth_(and__5160__auto__)){
if(kotobase_protocols_worker.graph.atproto_surface_QMARK_(req)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(issuer,cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed,"repo"));
} else {
return kotobase_protocols_worker.cacao.operator_allowed_QMARK_(issuer,env.CACAO_OPERATOR_DIDS);
}
} else {
return and__5160__auto__;
}
})()));
});
/**
 * The one authorization ladder, used by reads and writes alike:
 *   Bearer WRITE_TOKEN (full admin) → AWS SigV4 over the raw payload →
 *   CACAO. Reads reuse it verbatim because every credential that may
 *   write may obviously also read, and a second ladder would be a second
 *   place to get it wrong.
 */
kotobase_protocols_worker.shell.credential_ok_QMARK_ = (function kotobase_protocols_worker$shell$credential_ok_QMARK_(env,req,body_ab){
if(kotobase_protocols_worker.core.authorized_write_QMARK_(req,env.WRITE_TOKEN)){
return Promise.resolve(true);
} else {
if(cljs.core.truth_((function (){var G__12474 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),"authorization");
if((G__12474 == null)){
return null;
} else {
return clojure.string.starts_with_QMARK_(G__12474,"AWS4-HMAC-SHA256 ");
}
})())){
return kotobase_protocols_worker.shell.sigv4_verify(env,req,body_ab);
} else {
return kotobase_protocols_worker.shell.cacao_authorized_QMARK_(env,req);

}
}
});
kotobase_protocols_worker.shell.entries__GT_map = (function kotobase_protocols_worker$shell$entries__GT_map(entries){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (e){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(e[(0)]),(e[(1)])], null);
})),Array.from(entries));
});
kotobase_protocols_worker.shell.req__GT_ring = (function kotobase_protocols_worker$shell$req__GT_ring(request,body){
var url = (new URL(request.url));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"method","method",55703592),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.lower_case(request.method)),new cljs.core.Keyword(null,"host","host",-1558485167),url.hostname,new cljs.core.Keyword(null,"path","path",-188191168),url.pathname,new cljs.core.Keyword(null,"query","query",-1288509510),kotobase_protocols_worker.shell.entries__GT_map(url.searchParams.entries()),new cljs.core.Keyword(null,"headers","headers",-835030129),kotobase_protocols_worker.core.normalize_headers(kotobase_protocols_worker.shell.entries__GT_map(request.headers.entries())),new cljs.core.Keyword(null,"body","body",-2049205669),((cljs.core.seq(body))?body:null)], null);
});
kotobase_protocols_worker.shell.ring__GT_response = (function kotobase_protocols_worker$shell$ring__GT_response(p__12475){
var map__12476 = p__12475;
var map__12476__$1 = cljs.core.__destructure_map(map__12476);
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12476__$1,new cljs.core.Keyword(null,"status","status",-1997798413));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12476__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12476__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var body_encoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12476__$1,new cljs.core.Keyword(null,"body-encoding","body-encoding",-1446963485));
return (new Response((((body == null))?undefined:((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"base64","base64",167760174),body_encoding))?kotobase_protocols_worker.shell.b64__GT_u8(body):body
)),cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"headers","headers",-835030129),(function (){var or__5162__auto__ = headers;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})()], null))));
});
kotobase_protocols_worker.shell.security_response_headers = new cljs.core.PersistentArrayMap(null, 5, ["strict-transport-security","max-age=31536000; includeSubDomains","x-content-type-options","nosniff","x-frame-options","DENY","referrer-policy","no-referrer","permissions-policy","camera=(), geolocation=(), microphone=()"], null);
kotobase_protocols_worker.shell.safe_request_id = (function kotobase_protocols_worker$shell$safe_request_id(request){
var candidate = request.headers.get("x-request-id");
if(cljs.core.truth_((function (){var and__5160__auto__ = candidate;
if(cljs.core.truth_(and__5160__auto__)){
var and__5160__auto____$1 = (cljs.core.count(candidate) <= (128));
if(and__5160__auto____$1){
return cljs.core.re_matches(/[A-Za-z0-9._:-]+/,candidate);
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
return candidate;
} else {
return (""+"kotobase-protocols-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(crypto.randomUUID()));
}
});
/**
 * Apply the same non-secret response boundary to every HTTP protocol surface.
 * 
 *   Handlers remain free to choose protocol-specific content types and caching;
 *   transport security and correlation cannot drift per adapter.
 */
kotobase_protocols_worker.shell.response_boundary = (function kotobase_protocols_worker$shell$response_boundary(request,response){
var headers = (new Headers(response.headers));
var seq__12477_12508 = cljs.core.seq(kotobase_protocols_worker.shell.security_response_headers);
var chunk__12478_12509 = null;
var count__12479_12510 = (0);
var i__12480_12511 = (0);
while(true){
if((i__12480_12511 < count__12479_12510)){
var vec__12487_12512 = chunk__12478_12509.cljs$core$IIndexed$_nth$arity$2(null,i__12480_12511);
var k_12513 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12487_12512,(0),null);
var v_12514 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12487_12512,(1),null);
headers.set(k_12513,v_12514);


var G__12515 = seq__12477_12508;
var G__12516 = chunk__12478_12509;
var G__12517 = count__12479_12510;
var G__12518 = (i__12480_12511 + (1));
seq__12477_12508 = G__12515;
chunk__12478_12509 = G__12516;
count__12479_12510 = G__12517;
i__12480_12511 = G__12518;
continue;
} else {
var temp__5825__auto___12519 = cljs.core.seq(seq__12477_12508);
if(temp__5825__auto___12519){
var seq__12477_12520__$1 = temp__5825__auto___12519;
if(cljs.core.chunked_seq_QMARK_(seq__12477_12520__$1)){
var c__5694__auto___12521 = cljs.core.chunk_first(seq__12477_12520__$1);
var G__12522 = cljs.core.chunk_rest(seq__12477_12520__$1);
var G__12523 = c__5694__auto___12521;
var G__12524 = cljs.core.count(c__5694__auto___12521);
var G__12525 = (0);
seq__12477_12508 = G__12522;
chunk__12478_12509 = G__12523;
count__12479_12510 = G__12524;
i__12480_12511 = G__12525;
continue;
} else {
var vec__12490_12526 = cljs.core.first(seq__12477_12520__$1);
var k_12527 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12490_12526,(0),null);
var v_12528 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12490_12526,(1),null);
headers.set(k_12527,v_12528);


var G__12529 = cljs.core.next(seq__12477_12520__$1);
var G__12530 = null;
var G__12531 = (0);
var G__12532 = (0);
seq__12477_12508 = G__12529;
chunk__12478_12509 = G__12530;
count__12479_12510 = G__12531;
i__12480_12511 = G__12532;
continue;
}
} else {
}
}
break;
}

headers.set("x-kotobase-request-id",kotobase_protocols_worker.shell.safe_request_id(request));

return (new Response(response.body,({"status": response.status, "statusText": response.statusText, "headers": headers})));
});
kotobase_protocols_worker.shell.ipfs_post_response = (function kotobase_protocols_worker$shell$ipfs_post_response(store,p__12493){
var map__12494 = p__12493;
var map__12494__$1 = cljs.core.__destructure_map(map__12494);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12494__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
var b64 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12494__$1,new cljs.core.Keyword(null,"b64","b64",2079087092));
var content_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12494__$1,new cljs.core.Keyword(null,"content-type","content-type",-508222634));
kotobase.protocols.blocks.put_block_BANG_(store,cid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"bytes","bytes",1175866680),b64,new cljs.core.Keyword(null,"encoding","encoding",1728578272),"base64",new cljs.core.Keyword(null,"content-type","content-type",-508222634),content_type], null));

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(201),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 2, ["content-type","application/json","location",(""+"/ipfs/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cid))], null),new cljs.core.Keyword(null,"body","body",-2049205669),kotobase.protocols.json.encode(new cljs.core.PersistentArrayMap(null, 1, ["cid",cid], null))], null);
});
/**
 * `cfg` is {:surfaces {label handler} :path-surfaces {prefix label}} — what
 *   THIS deployment carries. kotobase-protocol-core's router has no built-in
 *   surface table (ADR-2608051000), so a shell that names nothing serves nothing.
 * 
 *   extra may carry :ipfs-post {:cid :b64 :content-type} — a shell-level
 *   write that bypasses the (read-only) ipfs HTTP surface. One full
 *   hydrate→run→diff→commit cycle against the real chain — reads
 *   naturally no-op (their after-state never differs from the hydrated
 *   seed) via kotobase-store's own :docs/:streams diff, no separate
 *   write?/state-changed? gate needed here anymore.
 */
kotobase_protocols_worker.shell.run_once = (function kotobase_protocols_worker$shell$run_once(cfg,env,req,extra){
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(env.STATE_BUCKET,(function (){var or__5162__auto__ = env.KOTOBASE_R2_PREFIX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),kotobase_protocols_worker.graph.for_request(req),(function (seed,chain__$1){
var map__12495 = kotobase_protocols_worker.core.make_store(seed);
var map__12495__$1 = cljs.core.__destructure_map(map__12495);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12495__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12495__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var apex = (function (){var or__5162__auto__ = env.APEX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "kotobase.net";
}
})();
var enriched = kotobase_protocols_worker.query.enrich.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"store","store",1512230022),store,new cljs.core.Keyword(null,"apex","apex",328192413),apex,new cljs.core.Keyword(null,"now","now",-1650525531),(new Date()).toISOString()], null),seed,kotobase_protocols_worker.core.effective_surface(req,apex));
var labels = cljs.core.keys(new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421).cljs$core$IFn$_invoke$arity$1(cfg));
var ctx = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(enriched,new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421),cljs.core.select_keys(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421).cljs$core$IFn$_invoke$arity$1(enriched),new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421).cljs$core$IFn$_invoke$arity$1(cfg)], 0)),labels),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274),cljs.core.select_keys(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274).cljs$core$IFn$_invoke$arity$1(enriched),new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274).cljs$core$IFn$_invoke$arity$1(cfg)], 0)),cljs.core.keys(new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274).cljs$core$IFn$_invoke$arity$1(cfg)))], 0));
var resp = (function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"ipfs-post","ipfs-post",-190768916).cljs$core$IFn$_invoke$arity$1(extra);
if(cljs.core.truth_(temp__5823__auto__)){
var ip = temp__5823__auto__;
return kotobase_protocols_worker.shell.ipfs_post_response(store,ip);
} else {
return kotobase.protocols.router.handle(ctx,req);
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),cljs.core.deref(state),new cljs.core.Keyword(null,"response","response",-1068424192),resp], null);
}));
});
kotobase_protocols_worker.shell.with_retries = (function kotobase_protocols_worker$shell$with_retries(cfg,env,req,extra){
var attempt = (function kotobase_protocols_worker$shell$with_retries_$_attempt(n){
return kotobase_protocols_worker.shell.run_once(cfg,env,req,extra).then((function (p__12498){
var map__12499 = p__12498;
var map__12499__$1 = cljs.core.__destructure_map(map__12499);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12499__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
var persisted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12499__$1,new cljs.core.Keyword(null,"persisted","persisted",-900171345));
if(cljs.core.truth_(persisted)){
return kotobase_protocols_worker.shell.ring__GT_response(response);
} else {
if((n > (0))){
return kotobase_protocols_worker$shell$with_retries_$_attempt((n - (1)));
} else {
return kotobase_protocols_worker.shell.ring__GT_response(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(503),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 2, ["content-type","text/plain; charset=utf-8","retry-after","1"], null),new cljs.core.Keyword(null,"body","body",-2049205669),"state write conflict, retry"], null));

}
}
}));
});
return attempt((2));
});
kotobase_protocols_worker.shell.ipfs_post_QMARK_ = (function kotobase_protocols_worker$shell$ipfs_post_QMARK_(req){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/ipfs",new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req))) || (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/",new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ipfs",kotobase.protocols.router.surface_of(new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(req),"kotobase.net"))))))));
});
kotobase_protocols_worker.shell.diag_health_QMARK_ = (function kotobase_protocols_worker$shell$diag_health_QMARK_(req){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/_diag/health",new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req))));
});
kotobase_protocols_worker.shell.diag_query_memo_QMARK_ = (function kotobase_protocols_worker$shell$diag_query_memo_QMARK_(req){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/_diag/query-memo",new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req))));
});
/**
 * GET /health, answered WITHOUT hydrating. Public for tests.
 * 
 *   `kotobase.protocols.router/handle` answers /health from four constants and
 *   touches no store, but the hydrate in `run-once` is unconditional and sits
 *   ABOVE the router: every request rebuilt the whole graph and then called a
 *   branch that reads none of it.
 * 
 *   Measured 2026-08-17 on the combined deployment before the same fix landed
 *   there: ~1,364 CPU-ms, 85 R2 GETs and 11.4 MB per call, to return a constant,
 *   on the most polled route a service has. After that fix every host served by
 *   the combined worker answered /health in 60-180 ms while cypher.kotobase.net
 *   -- this shell -- still took 8.9 s. That is what a fix applied to a copy
 *   rather than to the shared code looks like from outside.
 * 
 *   Takes the surfaces from `cfg` rather than from a constant, so a shell that
 *   mounts a subset (ADR-2608051000: a shell cannot serve a capability it did
 *   not ask for) declines /health for a host it does not carry, exactly as the
 *   router would. Returns nil in that case so the fall-through keeps the old
 *   path.
 */
kotobase_protocols_worker.shell.static_health = (function kotobase_protocols_worker$shell$static_health(cfg,env,req){
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/health",new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req))))){
var apex = (function (){var or__5162__auto__ = env.APEX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "kotobase.net";
}
})();
var ctx = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.select_keys(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421),new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274)], null)),new cljs.core.Keyword(null,"apex","apex",328192413),apex);
if(cljs.core.contains_QMARK_(kotobase.protocols.router.surfaces_for(ctx),kotobase.protocols.router.surface_of(new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(req),apex))){
return kotobase_protocols_worker.shell.ring__GT_response(kotobase.protocols.router.handle(ctx,req));
} else {
return null;
}
} else {
return null;
}
});
kotobase_protocols_worker.shell.capabilities_QMARK_ = (function kotobase_protocols_worker$shell$capabilities_QMARK_(req){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["/.well-known/kotobase-capabilities",null,"/capabilities",null], null), null),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req))));
});
kotobase_protocols_worker.shell.capabilities_response = (function kotobase_protocols_worker$shell$capabilities_response(_env,_req){
return kotobase_protocols_worker.shell.ring__GT_response(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 3, ["content-type","application/json; charset=utf-8","cache-control","public, max-age=300","access-control-allow-origin","*"], null),new cljs.core.Keyword(null,"body","body",-2049205669),kotobase.protocols.json.encode(kotobase_protocols_worker.query.capabilities)], null));
});
/**
 * Counters for this ISOLATE's query memo (ADR-2607310900 L1).
 * 
 *   Public and unauthenticated because it carries no tenant data — four integers
 *   and a capacity — and because the thing it answers is whether the memo is
 *   earning its memory, which is a question about the deployment rather than
 *   about anyone's graph.
 * 
 *   Per-isolate is the whole point and also the caveat: two requests to the same
 *   hostname can be served by different isolates in different colos, so these
 *   numbers describe ONE of them and successive reads may not be monotonic. A
 *   hit rate is only meaningful over a window in which the isolate stayed alive,
 *   which is why `:caveat` says so in the response rather than in a doc nobody
 *   reads next to the number.
 */
kotobase_protocols_worker.shell.diag_query_memo_response = (function kotobase_protocols_worker$shell$diag_query_memo_response(_env,_req){
return kotobase_protocols_worker.shell.ring__GT_response(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 3, ["content-type","application/json; charset=utf-8","cache-control","no-store","access-control-allow-origin","*"], null),new cljs.core.Keyword(null,"body","body",-2049205669),kotobase.protocols.json.encode(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kotobase_protocols_worker.query.memo_stats(),new cljs.core.PersistentArrayMap(null, 3, ["surfaces",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["sparql","cypher","gremlin","graphql"], null),"keyed_on","the :docs of the state this request hydrated (NOT the chain head)","caveat",(""+"per-isolate and per-colo. Two reads may hit "+"different isolates, so these counters are not "+"monotonic across requests and a hit rate is only "+"meaningful within one isolate's lifetime.")], null)], 0)))], null));
});
/**
 * Read-only, public, out-of-band from kotobase.protocols.router
 *   entirely — never touches LocalStore/the pure handlers, just the
 *   engine's own novelty state for `graph` (default the shared graph;
 *   `?graph=atproto-repo/<did>` inspects a tenant's own chain). Exists
 *   because ADR-2607177500's unfolded-novelty incident had to be
 *   diagnosed by manually timing a plain read and guessing at the cause
 *   (ADR-2607178500) — this makes that observable directly.
 */
kotobase_protocols_worker.shell.diag_health_response = (function kotobase_protocols_worker$shell$diag_health_response(env,req){
var g = (function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"query","query",-1288509510).cljs$core$IFn$_invoke$arity$1(req),"graph");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase_protocols_worker.graph.shared_graph;
}
})();
return kotobase_protocols_worker.kotobase_store.diagnose_BANG_(env.STATE_BUCKET,(function (){var or__5162__auto__ = env.KOTOBASE_R2_PREFIX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),g).then((function (p__12500){
var map__12501 = p__12500;
var map__12501__$1 = cljs.core.__destructure_map(map__12501);
var chain_present_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12501__$1,new cljs.core.Keyword(null,"chain-present?","chain-present?",-1908398428));
var novelty_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12501__$1,new cljs.core.Keyword(null,"novelty-size","novelty-size",1317935361));
var should_fold_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12501__$1,new cljs.core.Keyword(null,"should-fold?","should-fold?",-264664095));
return kotobase_protocols_worker.shell.ring__GT_response(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 2, ["content-type","application/json","cache-control","no-store"], null),new cljs.core.Keyword(null,"body","body",-2049205669),kotobase.protocols.json.encode(new cljs.core.PersistentArrayMap(null, 4, ["graph",g,"chain_present",chain_present_QMARK_,"novelty_size",novelty_size,"should_fold",should_fold_QMARK_], null))], null));
})).catch((function (e){
return kotobase_protocols_worker.shell.ring__GT_response(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(500),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),new cljs.core.Keyword(null,"body","body",-2049205669),kotobase.protocols.json.encode(new cljs.core.PersistentArrayMap(null, 2, ["error","DiagnosticFailed","message",e.message], null))], null));
}));
});
kotobase_protocols_worker.shell.handle_request = (function kotobase_protocols_worker$shell$handle_request(cfg,env,req,body_ab){
var temp__5823__auto__ = kotobase_protocols_worker.shell.static_health(cfg,env,req);
if(cljs.core.truth_(temp__5823__auto__)){
var health = temp__5823__auto__;
return health;
} else {
if(kotobase_protocols_worker.shell.capabilities_QMARK_(req)){
return kotobase_protocols_worker.shell.capabilities_response(env,req);
} else {
if(kotobase_protocols_worker.shell.diag_query_memo_QMARK_(req)){
return kotobase_protocols_worker.shell.diag_query_memo_response(env,req);
} else {
if(kotobase_protocols_worker.shell.diag_health_QMARK_(req)){
return kotobase_protocols_worker.shell.diag_health_response(env,req);
} else {
var apex = (function (){var or__5162__auto__ = env.APEX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "kotobase.net";
}
})();
var write_QMARK_ = kotobase_protocols_worker.core.write_QMARK_.cljs$core$IFn$_invoke$arity$2(req,apex);
var read_auth_QMARK_ = kotobase_protocols_worker.core.read_auth_required_QMARK_(req,apex);
return ((((write_QMARK_) || (read_auth_QMARK_)))?kotobase_protocols_worker.shell.credential_ok_QMARK_(env,req,body_ab):Promise.resolve(true)).then((function (ok_QMARK_){
if(cljs.core.not(ok_QMARK_)){
return kotobase_protocols_worker.shell.ring__GT_response(kotobase_protocols_worker.core.unauthorized_response.cljs$core$IFn$_invoke$arity$2((!((env.WRITE_TOKEN == null))),((write_QMARK_)?new cljs.core.Keyword(null,"write","write",-1857649168):new cljs.core.Keyword(null,"read","read",1140058661))));
} else {
if(kotobase_protocols_worker.shell.ipfs_post_QMARK_(req)){
return kotobase_protocols_worker.shell.sha256(body_ab).then((function (digest){
return kotobase_protocols_worker.shell.with_retries(env,req,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ipfs-post","ipfs-post",-190768916),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"cid","cid",-1940591320),kotobase.protocols.cid.cidv1_raw_sha256(cljs.core.vec(Array.from((new Uint8Array(digest))))),new cljs.core.Keyword(null,"b64","b64",2079087092),kotobase_protocols_worker.shell.ab__GT_b64(body_ab),new cljs.core.Keyword(null,"content-type","content-type",-508222634),(function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),"content-type");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "application/octet-stream";
}
})()], null)], null));
}));
} else {
return kotobase_protocols_worker.shell.with_retries(cfg,env,req,null);

}
}
}));
}
}
}
}
});
kotobase_protocols_worker.shell.gremlin_upgrade_QMARK_ = (function kotobase_protocols_worker$shell$gremlin_upgrade_QMARK_(request,req,apex){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("websocket",clojure.string.lower_case((function (){var or__5162__auto__ = request.headers.get("upgrade");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})()))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("gremlin",kotobase.protocols.router.surface_of(new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(req),apex))) || (clojure.string.starts_with_QMARK_((function (){var or__5162__auto____$1 = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return "";
}
})(),"/gremlin")))));
});
/**
 * Accept the upgrade and answer each text frame from a FRESHLY hydrated
 *   store.
 * 
 *   Hydrating per message rather than once per connection is deliberate: a
 *   socket outlives the request that opened it, and a store captured at accept
 *   time would keep answering from a snapshot that gets older the longer a
 *   client stays connected — a query surface that silently serves stale data is
 *   worse than one that costs a read per message. These are read-only
 *   traversals, so `hydrate-run-persist!` finds no diff and commits nothing.
 */
kotobase_protocols_worker.shell.gremlin_socket_response = (function kotobase_protocols_worker$shell$gremlin_socket_response(env,req){
var pair = (new WebSocketPair());
var client = (pair["0"]);
var server = (pair["1"]);
server.accept();

server.addEventListener("message",(function (ev){
var text = ev.data;
return kotobase_protocols_worker.kotobase_store.hydrate_run_persist_BANG_(env.STATE_BUCKET,(function (){var or__5162__auto__ = env.KOTOBASE_R2_PREFIX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),kotobase_protocols_worker.graph.for_request(req),(function (seed,_chain){
var map__12502 = kotobase_protocols_worker.core.make_store(seed);
var map__12502__$1 = cljs.core.__destructure_map(map__12502);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12502__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12502__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var ctx = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"store","store",1512230022),store,new cljs.core.Keyword(null,"apex","apex",328192413),(function (){var or__5162__auto__ = env.APEX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "kotobase.net";
}
})(),new cljs.core.Keyword(null,"now","now",-1650525531),(new Date()).toISOString()], null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"after-state","after-state",918332654),cljs.core.deref(state),new cljs.core.Keyword(null,"response","response",-1068424192),kotobase_protocols_worker.query.gremlin_message(ctx,seed,text)], null);
})).then((function (p__12503){
var map__12504 = p__12503;
var map__12504__$1 = cljs.core.__destructure_map(map__12504);
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12504__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
return server.send(response);
})).catch((function (e){
return server.send(kotobase_protocols_worker.query.gremlin_error((""+"server error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message))));
}));
}));

return (new Response(null,({"status": (101), "webSocket": client})));
});
/**
 * Build a Worker `fetch` export for a deployment carrying exactly `cfg`.
 * 
 *   cfg: {:surfaces {"cypher" h} :path-surfaces {"/db/data/" "cypher"}}
 * 
 *   Each per-capability shell (net-kotobase-s3, -cypher, ...) calls this with
 *   its one surface. The combined deployment calls it with all of them. There
 *   is no default: ADR-2608051000 makes a shell state what it carries, so it
 *   cannot serve a capability it did not ask for.
 */
kotobase_protocols_worker.shell.make_handler = (function kotobase_protocols_worker$shell$make_handler(cfg){
return ({"fetch": (function (request,env,_ctx){
var req0 = kotobase_protocols_worker.shell.req__GT_ring(request,"");
var apex = (function (){var or__5162__auto__ = env.APEX;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "kotobase.net";
}
})();
if(kotobase_protocols_worker.shell.gremlin_upgrade_QMARK_(request,req0,apex)){
return kotobase_protocols_worker.shell.credential_ok_QMARK_(env,req0,(new ArrayBuffer((0)))).then((function (ok_QMARK_){
if(cljs.core.truth_(ok_QMARK_)){
return kotobase_protocols_worker.shell.gremlin_socket_response(env,req0);
} else {
return kotobase_protocols_worker.shell.response_boundary(request,kotobase_protocols_worker.shell.ring__GT_response(kotobase_protocols_worker.core.unauthorized_response.cljs$core$IFn$_invoke$arity$2((!((env.WRITE_TOKEN == null))),new cljs.core.Keyword(null,"read","read",1140058661))));
}
}));
} else {
return request.arrayBuffer().then((function (ab){
var body = kotobase_protocols_worker.shell.text_decoder.decode(ab);
return kotobase_protocols_worker.shell.handle_request(cfg,env,kotobase_protocols_worker.shell.req__GT_ring(request,body),ab);
})).catch((function (e){
return (new Response((""+"internal error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.message)),({"status": (500)})));
})).then((function (p1__12505_SHARP_){
return kotobase_protocols_worker.shell.response_boundary(request,p1__12505_SHARP_);
}));
}
})});
});

//# sourceMappingURL=kotobase_protocols_worker.shell.js.map
