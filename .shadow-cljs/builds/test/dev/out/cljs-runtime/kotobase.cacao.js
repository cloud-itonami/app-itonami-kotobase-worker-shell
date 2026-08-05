goog.provide('kotobase.cacao');
kotobase.cacao.bytes__GT_base64 = (function kotobase$cacao$bytes__GT_base64(b){
if((typeof Buffer !== 'undefined')){
return Buffer.from(b).toString("base64");
} else {
return btoa(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2(String.fromCharCode,cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(b))));
}
});
kotobase.cacao.base64__GT_bytes = (function kotobase$cacao$base64__GT_bytes(s){
if((typeof Buffer !== 'undefined')){
return (new Uint8Array(Buffer.from(s,"base64")));
} else {
var bin = atob(s);
var n = bin.length;
var out = (new Uint8Array(n));
var n__5762__auto___10278 = n;
var i_10279 = (0);
while(true){
if((i_10279 < n__5762__auto___10278)){
(out[i_10279] = bin.charCodeAt(i_10279));

var G__10280 = (i_10279 + (1));
i_10279 = G__10280;
continue;
} else {
}
break;
}

return out;
}
});
kotobase.cacao.bytes__GT_base64url = (function kotobase$cacao$bytes__GT_base64url(b){
return clojure.string.replace(clojure.string.replace(clojure.string.replace(kotobase.cacao.bytes__GT_base64(b),"+","-"),"/","_"),/=+$/,"");
});
kotobase.cacao.base64url__GT_bytes = (function kotobase$cacao$base64url__GT_bytes(s){
var pad = (function (){var G__10269 = cljs.core.mod(((s).length),(4));
switch (G__10269) {
case (2):
return "==";

break;
case (3):
return "=";

break;
default:
return "";

}
})();
return kotobase.cacao.base64__GT_bytes((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(clojure.string.replace(s,"-","+"),"_","/"))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(pad)));
});
kotobase.cacao.utc_seconds = (function kotobase$cacao$utc_seconds(date){
return clojure.string.replace(date.toISOString(),/\.\d{3}Z$/,"Z");
});
/**
 * The signed SIWE/CAIP-122 message for a CACAO payload map `p`.
 */
kotobase.cacao.cacao_siwe_message = (function kotobase$cacao$cacao_siwe_message(p__10271){
var map__10272 = p__10271;
var map__10272__$1 = cljs.core.__destructure_map(map__10272);
var domain = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"domain","domain",1847214937));
var version = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"version","version",425292698));
var nonce = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"nonce","nonce",564330331));
var resources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"resources","resources",1632806811));
var iat = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"iat","iat",-353315170));
var statement = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"statement","statement",-32780863));
var aud = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"aud","aud",357659490));
var iss = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"iss","iss",1130086696));
var exp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10272__$1,new cljs.core.Keyword(null,"exp","exp",-261706262));
var parts = clojure.string.split.cljs$core$IFn$_invoke$arity$2(iss,/:/);
var address = (function (){var or__5162__auto__ = cljs.core.last(parts);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return iss;
}
})();
var chain_id = ((clojure.string.starts_with_QMARK_(iss,"did:key:"))?"1":(function (){var n = cljs.core.count(parts);
if((n >= (2))){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(parts,(n - (2)));
} else {
return "1";
}
})());
var lines = (function (){var G__10273 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5162__auto__ = domain;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})())+" wants you to sign in with your Ethereum account:"),address,""], null);
var G__10273__$1 = (cljs.core.truth_(statement)?cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(G__10273,statement,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([""], 0)):G__10273);
var G__10273__$2 = cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(G__10273__$1,(""+"URI: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(aud)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(""+"Version: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(version)),(""+"Chain ID: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(chain_id)),(""+"Nonce: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(nonce)),(""+"Issued At: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(iat))], 0))
;
var G__10273__$3 = (cljs.core.truth_(exp)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__10273__$2,(""+"Expiration Time: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(exp))):G__10273__$2);
if(cljs.core.seq(resources)){
var ls = G__10273__$3;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.conj,ls,"Resources:",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__10270_SHARP_){
return (""+"- "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__10270_SHARP_));
}),resources));
} else {
return G__10273__$3;
}
})();
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",lines);
});
kotobase.cacao.random_nonce = (function kotobase$cacao$random_nonce(){
var s = clojure.string.replace(kotobase.cacao.bytes__GT_base64(crypto.getRandomValues((new Uint8Array((12))))),/[^a-zA-Z0-9]/,"");
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(0),cljs.core.min.cljs$core$IFn$_invoke$arity$2((16),((s).length)));
});
/**
 * Mint a base64(DAG-CBOR) CACAO. Returns {:cacao-b64 :did :graph}.
 * 
 *   opts: :secret-key (32-byte Uint8Array seed), :aud (operator DID),
 *      :capability (e.g. "datom:transact" / "datom:read"),
 *      :extra-capabilities (e.g. ["tx:create"]), :graph (graph CID),
 *      :ttl-sec (default 300), :now-ms / :nonce (deterministic test overrides),
 *      :sig-encoding — :base64url (default; the pod's decode_sig_bytes needs
 *      URL_SAFE_NO_PAD, see ns docstring) or :base64 (plain, no URL-safe
 *      substitution/padding-strip — kotobase-storage-d1's own
 *      verifyAuthenticationCacao decodes the signature with plain atob(),
 *      which does NOT understand base64url's `-`/`_` alphabet; a
 *      base64url-encoded signature silently fails ed25519 verification
 *      there with a generic 401 Unauthenticated, no specific error surfaced
 *      to the caller — use :base64 for that verifier),
 *      :tenant — when given, `kotoba://tenant/<tenant>` is added to the
 *      SIGNED resource list. `kotobase-server`'s
 *      `kotobase.server.security.authority/verify-grant` builds exactly that
 *      string and, under `:require-tenant-binding? true`, refuses a grant
 *      that does not carry it; its resource allowlist admits only the graph
 *      resource, the tenant resource and `kotoba://can/*`. Absent, the bytes
 *      are unchanged — this is additive, and a verifier that does not require
 *      the binding is unaffected either way.
 *      :statement — the SIWE statement field, signed. nil (the default) is
 *      the previous behaviour.
 */
kotobase.cacao.mint_cacao = (function kotobase$cacao$mint_cacao(p__10275){
var map__10276 = p__10275;
var map__10276__$1 = cljs.core.__destructure_map(map__10276);
var nonce = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"nonce","nonce",564330331));
var tenant = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"tenant","tenant",269491712));
var statement = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"statement","statement",-32780863));
var now_ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"now-ms","now-ms",-641991870));
var aud = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"aud","aud",357659490));
var sig_encoding = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10276__$1,new cljs.core.Keyword(null,"sig-encoding","sig-encoding",-1544096501),new cljs.core.Keyword(null,"base64url","base64url",-1345744970));
var capability = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"capability","capability",-223324340));
var secret_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"secret-key","secret-key",129235534));
var extra_capabilities = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10276__$1,new cljs.core.Keyword(null,"extra-capabilities","extra-capabilities",1212829359),cljs.core.PersistentVector.EMPTY);
var ttl_sec = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10276__$1,new cljs.core.Keyword(null,"ttl-sec","ttl-sec",539462801),(300));
var graph = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10276__$1,new cljs.core.Keyword(null,"graph","graph",1558099509));
var pub = shadow.js.shim.module$$noble$curves$ed25519.ed25519.getPublicKey(secret_key);
var did = kotobase.cid.did_key_from_ed25519_pub(pub);
var now = (((!((now_ms == null))))?(new Date(now_ms)):(new Date()));
var nonce__$1 = (function (){var or__5162__auto__ = nonce;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase.cacao.random_nonce();
}
})();
var iat = kotobase.cacao.utc_seconds(now);
var exp = kotobase.cacao.utc_seconds((new Date((now.getTime() + (ttl_sec * (1000))))));
var resources = (function (){var G__10277 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__10274_SHARP_){
return (""+"kotoba://can/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__10274_SHARP_));
}),cljs.core.cons(capability,extra_capabilities)),(""+"kotoba://graph/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(graph)));
if(cljs.core.truth_(tenant)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__10277,(""+"kotoba://tenant/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tenant)));
} else {
return G__10277;
}
})();
var p = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"aud","aud",357659490),new cljs.core.Keyword(null,"iss","iss",1130086696),new cljs.core.Keyword(null,"exp","exp",-261706262),new cljs.core.Keyword(null,"domain","domain",1847214937),new cljs.core.Keyword(null,"version","version",425292698),new cljs.core.Keyword(null,"nonce","nonce",564330331),new cljs.core.Keyword(null,"resources","resources",1632806811),new cljs.core.Keyword(null,"iat","iat",-353315170)],[statement,aud,did,exp,"kotobase.net","1",nonce__$1,resources,iat]);
var msg = kotobase.cacao.cacao_siwe_message(p);
var sig = shadow.js.shim.module$$noble$curves$ed25519.ed25519.sign(kotobase.cid.text__GT_bytes(msg),secret_key);
var sig_str = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"base64","base64",167760174),sig_encoding))?kotobase.cacao.bytes__GT_base64(sig):kotobase.cacao.bytes__GT_base64url(sig));
var cacao = ({"h": ({"t": "caip122"}), "p": cljs.core.clj__GT_js(p), "s": ({"t": "EdDSA", "s": sig_str})});
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"cacao-b64","cacao-b64",468512525),kotobase.cacao.bytes__GT_base64(shadow.js.shim.module$$ipld$dag_cbor.encode(cacao)),new cljs.core.Keyword(null,"did","did",593382517),did,new cljs.core.Keyword(null,"graph","graph",1558099509),graph], null);
});

//# sourceMappingURL=kotobase.cacao.js.map
