goog.provide('kotobase_protocols_worker.cacao');
kotobase_protocols_worker.cacao.expired_QMARK_ = (function kotobase_protocols_worker$cacao$expired_QMARK_(exp){
var or__5162__auto__ = (exp == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
var t = (new Date(exp)).getTime();
var or__5162__auto____$1 = Number.isNaN(t);
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return (t < Date.now());
}
}
});
/**
 * base64(DAG-CBOR) CACAO string → issuer did:key string, or nil.
 *   Verbatim port of kotobase-cljc-worker's worker.cljs `verify-cacao`.
 */
kotobase_protocols_worker.cacao.verify_cacao = (function kotobase_protocols_worker$cacao$verify_cacao(cacao_b64){
try{var env = shadow.js.shim.module$$ipld$dag_cbor.decode(kotobase.cacao.base64__GT_bytes(cacao_b64));
var p = env.p;
var iss = p.iss;
var pub = kotobase.cid.did_key__GT_ed25519_pub(iss);
var exp = p.exp;
var p_clj = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"aud","aud",357659490),new cljs.core.Keyword(null,"iss","iss",1130086696),new cljs.core.Keyword(null,"exp","exp",-261706262),new cljs.core.Keyword(null,"domain","domain",1847214937),new cljs.core.Keyword(null,"version","version",425292698),new cljs.core.Keyword(null,"nonce","nonce",564330331),new cljs.core.Keyword(null,"resources","resources",1632806811),new cljs.core.Keyword(null,"iat","iat",-353315170)],[p.statement,p.aud,iss,exp,p.domain,p.version,p.nonce,cljs.core.vec(p.resources),p.iat]);
var msg = kotobase.cacao.cacao_siwe_message(p_clj);
var sig = kotobase.cacao.base64url__GT_bytes(env.s.s);
if(cljs.core.truth_((function (){var and__5160__auto__ = pub;
if(cljs.core.truth_(and__5160__auto__)){
var and__5160__auto____$1 = cljs.core.not(kotobase_protocols_worker.cacao.expired_QMARK_(exp));
if(and__5160__auto____$1){
return shadow.js.shim.module$$noble$curves$ed25519.ed25519.verify(sig,kotobase.cid.text__GT_bytes(msg),pub);
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
return iss;
} else {
return null;
}
}catch (e10322){var _ = e10322;
return null;
}});
/**
 * Pull the CACAO out of a ring req: JSON body field `cacao_b64` (matches
 *   kotobase-cljc-worker's own client contract) or an
 *   `authorization: CACAO <b64>` header, body field taking precedence.
 */
kotobase_protocols_worker.cacao.from_request = (function kotobase_protocols_worker$cacao$from_request(p__10323,parsed_body){
var map__10324 = p__10323;
var map__10324__$1 = cljs.core.__destructure_map(map__10324);
var req = map__10324__$1;
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10324__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed_body,"cacao_b64");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var G__10325 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(headers,"authorization");
if((G__10325 == null)){
return null;
} else {
var a = G__10325;
if(clojure.string.starts_with_QMARK_(a,"CACAO ")){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(a,(6));
} else {
return null;
}
}
}
});
/**
 * issuer ∈ allowlist. allowlist is a CSV string (possibly nil/blank = no
 *   CACAO-as-admin at all — fail closed, mirrors kotobase-cljc-worker's own
 *   KOTOBASE_OPERATOR_DIDS empty-string-means-open convention being
 *   explicitly opted OUT of here: an absent allowlist means CACAO grants
 *   NOTHING on non-atproto surfaces, not everything.
 */
kotobase_protocols_worker.cacao.operator_allowed_QMARK_ = (function kotobase_protocols_worker$cacao$operator_allowed_QMARK_(issuer,allowlist_csv){
return cljs.core.boolean$((function (){var and__5160__auto__ = issuer;
if(cljs.core.truth_(and__5160__auto__)){
return ((typeof allowlist_csv === 'string') && (((cljs.core.seq(clojure.string.trim(allowlist_csv))) && (cljs.core.contains_QMARK_(cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(allowlist_csv,/,/))),issuer)))));
} else {
return and__5160__auto__;
}
})());
});

//# sourceMappingURL=kotobase_protocols_worker.cacao.js.map
