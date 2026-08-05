goog.provide('sigv4.verify');
/**
 * `"AWS4-HMAC-SHA256 Credential=AKID/date/region/service/aws4_request,
 *   SignedHeaders=a;b, Signature=hex"` → a map, or `nil` when malformed.
 * 
 *   Returns `nil` rather than throwing: a malformed header is ordinary untrusted
 *   input on this side, not an exceptional condition.
 */
sigv4.verify.parse_authorization = (function sigv4$verify$parse_authorization(auth){
if(((typeof auth === 'string') && (clojure.string.starts_with_QMARK_(auth,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(sigv4.core.algorithm)+" "))))){
var kvs = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$1((function (part){
var vec__14828 = clojure.string.split.cljs$core$IFn$_invoke$arity$3(clojure.string.trim(part),/=/,(2));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14828,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14828,(1),null);
if(cljs.core.truth_((function (){var and__5160__auto__ = k;
if(cljs.core.truth_(and__5160__auto__)){
return v;
} else {
return and__5160__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
} else {
return null;
}
})),clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(auth,(((sigv4.core.algorithm).length) + (1))),/,/));
var cred = (function (){var G__14831 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kvs,"Credential");
if((G__14831 == null)){
return null;
} else {
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(G__14831,/\//);
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((5),cljs.core.count((function (){var or__5162__auto__ = cred;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})()));
if(and__5160__auto__){
var and__5160__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kvs,"SignedHeaders");
if(cljs.core.truth_(and__5160__auto____$1)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(kvs,"Signature");
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
var vec__14832 = cred;
var akid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14832,(0),null);
var date = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14832,(1),null);
var region = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14832,(2),null);
var service = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14832,(3),null);
var terminal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14832,(4),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(sigv4.core.terminator,terminal)){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"akid","akid",-523542555),akid,new cljs.core.Keyword(null,"date","date",-1463434462),date,new cljs.core.Keyword(null,"region","region",270415120),region,new cljs.core.Keyword(null,"service","service",-1963054559),service,new cljs.core.Keyword(null,"signed-headers","signed-headers",-1530859860),clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(kvs,"SignedHeaders"),/;/),new cljs.core.Keyword(null,"signature","signature",1463754794),cljs.core.get.cljs$core$IFn$_invoke$arity$2(kvs,"Signature")], null);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
/**
 * Credential scope from a parsed authorization header.
 */
sigv4.verify.scope = (function sigv4$verify$scope(p__14835){
var map__14836 = p__14835;
var map__14836__$1 = cljs.core.__destructure_map(map__14836);
var date = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14836__$1,new cljs.core.Keyword(null,"date","date",-1463434462));
var region = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14836__$1,new cljs.core.Keyword(null,"region","region",270415120));
var service = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14836__$1,new cljs.core.Keyword(null,"service","service",-1963054559));
return sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$3(date,region,service);
});
/**
 * Rebuild the canonical request from an incoming request and the header list
 *   the client claims to have signed.
 * 
 *   `req` is `{:method :path :query :headers}` with lowercased header names;
 *   `signed-headers` comes from `parse-authorization` and fixes both *which*
 *   headers participate and *in what order* — the client's claim, which is what
 *   makes the recomputation reproduce their signature or fail to.
 */
sigv4.verify.canonical_request = (function sigv4$verify$canonical_request(req,signed_headers,payload_hash){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.string.upper_case(cljs.core.name(new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))),(function (){var or__5162__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "/";
}
})(),sigv4.core.canonical_query(new cljs.core.Keyword(null,"query","query",-1288509510).cljs$core$IFn$_invoke$arity$1(req)),sigv4.core.canonical_headers(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),signed_headers),clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",signed_headers),payload_hash], null));
});
sigv4.verify.then = (function sigv4$verify$then(v,f){
return Promise.resolve(v).then(f);
});
/**
 * Recompute the signature the client should have sent. → hex string (a Promise
 *   of one on ClojureScript).
 * 
 *   Compare with `constant-time-eq?`, never with `=` on the raw strings.
 */
sigv4.verify.expected_signature = (function sigv4$verify$expected_signature(crypto,p__14839){
var map__14840 = p__14839;
var map__14840__$1 = cljs.core.__destructure_map(map__14840);
var secret_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14840__$1,new cljs.core.Keyword(null,"secret-key","secret-key",129235534));
var parsed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14840__$1,new cljs.core.Keyword(null,"parsed","parsed",-819589156));
var request = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14840__$1,new cljs.core.Keyword(null,"request","request",1772954723));
var payload_hash = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14840__$1,new cljs.core.Keyword(null,"payload-hash","payload-hash",1436757062));
var amz_date = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14840__$1,new cljs.core.Keyword(null,"amz-date","amz-date",113835954));
var map__14841 = sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$4(secret_key,new cljs.core.Keyword(null,"date","date",-1463434462).cljs$core$IFn$_invoke$arity$1(parsed),new cljs.core.Keyword(null,"region","region",270415120).cljs$core$IFn$_invoke$arity$1(parsed),new cljs.core.Keyword(null,"service","service",-1963054559).cljs$core$IFn$_invoke$arity$1(parsed));
var map__14841__$1 = cljs.core.__destructure_map(map__14841);
var seed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14841__$1,new cljs.core.Keyword(null,"seed","seed",68613327));
var steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14841__$1,new cljs.core.Keyword(null,"steps","steps",-128433302));
var cr = sigv4.verify.canonical_request(request,new cljs.core.Keyword(null,"signed-headers","signed-headers",-1530859860).cljs$core$IFn$_invoke$arity$1(parsed),payload_hash);
return sigv4.verify.then(sigv4.protocols._sha256_hex(crypto,cr),(function (cr_hash){
var sts = sigv4.core.string_to_sign(amz_date,sigv4.verify.scope(parsed),cr_hash);
return sigv4.verify.then(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (k,step){
return sigv4.verify.then(k,(function (p1__14837_SHARP_){
return sigv4.protocols._hmac(crypto,p1__14837_SHARP_,step);
}));
}),seed,steps),(function (signing_key){
return sigv4.verify.then(sigv4.protocols._hmac(crypto,signing_key,sts),(function (p1__14838_SHARP_){
return sigv4.protocols._hex(crypto,p1__14838_SHARP_);
}));
}));
}));
});
/**
 * Compare two hex signatures without leaking where they diverge.
 * 
 *   `=` on strings short-circuits at the first differing character, and the
 *   resulting timing difference is enough to recover a signature byte by byte
 *   against a service that will answer repeatedly. Always compare this way.
 */
sigv4.verify.constant_time_eq_QMARK_ = (function sigv4$verify$constant_time_eq_QMARK_(a,b){
var a__$1 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a));
var b__$1 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(b));
var code = (function (c){
return c.charCodeAt((0));
});
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(((a__$1).length),((b__$1).length))) && ((cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.bit_or,(0),cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (x,y){
return (code(x) ^ code(y));
}),a__$1,b__$1)) === (0))));
});

//# sourceMappingURL=sigv4.verify.js.map
