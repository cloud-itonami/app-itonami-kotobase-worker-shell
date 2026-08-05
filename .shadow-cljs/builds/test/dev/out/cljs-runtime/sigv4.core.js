goog.provide('sigv4.core');
sigv4.core.algorithm = "AWS4-HMAC-SHA256";
sigv4.core.terminator = "aws4_request";
/**
 * Most callers in this workspace sign against S3-compatible object stores
 *   (Storj Gateway-MT, Backblaze B2, kotobase's own S3 surface). Other AWS
 *   services pass `:service` explicitly.
 */
sigv4.core.default_service = "s3";
/**
 * Payload-hash sentinel for presigned URLs and streaming bodies, where the
 *   content hash is not known (or not wanted) at signing time.
 */
sigv4.core.unsigned_payload = "UNSIGNED-PAYLOAD";
/**
 * SHA-256 of the empty string — the payload hash of every GET/HEAD/DELETE.
 *   Hardcoded rather than computed so the pure layer needs no digest provider.
 */
sigv4.core.empty_payload_sha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
sigv4.core.unreserved = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~";
sigv4.core.hex_digits = "0123456789ABCDEF";
/**
 * → seq of unsigned byte values (0-255) for `s`.
 */
sigv4.core.utf8_bytes = (function sigv4$core$utf8_bytes(s){
return cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1((new TextEncoder()).encode(s));
});
sigv4.core.pct = (function sigv4$core$pct(b){
return (""+"%"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sigv4.core.hex_digits,(b >> (4))))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sigv4.core.hex_digits,(b & (15)))));
});
/**
 * Percent-encode `s` per RFC 3986 with uppercase hex — S3's canonicalization
 *   rule. Only A-Z a-z 0-9 - _ . ~ survive unencoded; `/` IS encoded (callers that
 *   need path separators preserved split first — see `object-path`).
 */
sigv4.core.uri_encode = (function sigv4$core$uri_encode(s){
var s__$1 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(s));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,(function (){var iter__5649__auto__ = (function sigv4$core$uri_encode_$_iter__14796(s__14797){
return (new cljs.core.LazySeq(null,(function (){
var s__14797__$1 = s__14797;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__14797__$1);
if(temp__5825__auto__){
var s__14797__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14797__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__14797__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__14799 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__14798 = (0);
while(true){
if((i__14798 < size__5648__auto__)){
var b = cljs.core._nth(c__5647__auto__,i__14798);
var c = cljs.core.char$(b);
cljs.core.chunk_append(b__14799,(((((b < (128))) && (clojure.string.includes_QMARK_(sigv4.core.unreserved,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c))))))?(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)):sigv4.core.pct(b)));

var G__14824 = (i__14798 + (1));
i__14798 = G__14824;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14799),sigv4$core$uri_encode_$_iter__14796(cljs.core.chunk_rest(s__14797__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14799),null);
}
} else {
var b = cljs.core.first(s__14797__$2);
var c = cljs.core.char$(b);
return cljs.core.cons((((((b < (128))) && (clojure.string.includes_QMARK_(sigv4.core.unreserved,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c))))))?(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)):sigv4.core.pct(b)),sigv4$core$uri_encode_$_iter__14796(cljs.core.rest(s__14797__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(sigv4.core.utf8_bytes(s__$1));
})());
});
/**
 * Path-style canonical URI for a bucket itself: `/<bucket>`.
 */
sigv4.core.bucket_path = (function sigv4$core$bucket_path(bucket){
return (""+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(sigv4.core.uri_encode(bucket)));
});
/**
 * Path-style canonical URI for `key` in `bucket`: `/<bucket>/<key>`, with each
 *   `/`-separated key segment encoded independently so the separators survive.
 *   An empty/blank `key` degrades to `bucket-path`.
 */
sigv4.core.object_path = (function sigv4$core$object_path(bucket,key){
if(clojure.string.blank_QMARK_((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)))){
return sigv4.core.bucket_path(bucket);
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(sigv4.core.bucket_path(bucket))+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.map.cljs$core$IFn$_invoke$arity$2(sigv4.core.uri_encode,clojure.string.split.cljs$core$IFn$_invoke$arity$3((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)),/\//,(-1))))));
}
});
/**
 * Canonical query string from a map of string→string: each key and value
 *   percent-encoded, then sorted by encoded key (ties broken by encoded value) and
 *   joined with `&`. Returns `""` for an empty/nil map.
 */
sigv4.core.canonical_query = (function sigv4$core$canonical_query(params){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__14800){
var vec__14801 = p__14800;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14801,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14801,(1),null);
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)+"="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v));
}),cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__14804){
var vec__14805 = p__14804;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14805,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14805,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sigv4.core.uri_encode(cljs.core.name(k)),sigv4.core.uri_encode((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))], null);
}),params))));
});
/**
 * ISO-8601 instant → `{:long "20130524T000000Z" :short "20130524"}`.
 * 
 *   Pure string surgery on an instant the *caller* supplies (`(.toISOString
 *   (js/Date.))` / `(str (java.time.Instant/now))`) — this namespace never reads a
 *   clock, which is what makes the reference vectors reproducible.
 */
sigv4.core.amz_dates = (function sigv4$core$amz_dates(iso){
var long_form = clojure.string.replace(clojure.string.replace((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(iso)),/\.\d+/,""),/[:-]/,"");
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"long","long",-171452093),long_form,new cljs.core.Keyword(null,"short","short",1928760516),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(long_form,(0),(8))], null);
});
/**
 * The canonical header block for `signed-headers` (already lowercase, sorted):
 *   `name:trimmed-value\n` per line. Split out because the verification side
 *   reconstructs it from a header list rather than a map.
 */
sigv4.core.canonical_headers = (function sigv4$core$canonical_headers(headers,signed_headers){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,(function (){var iter__5649__auto__ = (function sigv4$core$canonical_headers_$_iter__14808(s__14809){
return (new cljs.core.LazySeq(null,(function (){
var s__14809__$1 = s__14809;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__14809__$1);
if(temp__5825__auto__){
var s__14809__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14809__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__14809__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__14811 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__14810 = (0);
while(true){
if((i__14810 < size__5648__auto__)){
var h = cljs.core._nth(c__5647__auto__,i__14810);
cljs.core.chunk_append(b__14811,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(h)+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.trim((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(headers,h)))))+"\n"));

var G__14825 = (i__14810 + (1));
i__14810 = G__14825;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14811),sigv4$core$canonical_headers_$_iter__14808(cljs.core.chunk_rest(s__14809__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14811),null);
}
} else {
var h = cljs.core.first(s__14809__$2);
return cljs.core.cons((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(h)+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.trim((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(headers,h)))))+"\n"),sigv4$core$canonical_headers_$_iter__14808(cljs.core.rest(s__14809__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(signed_headers);
})());
});
/**
 * → `{:canonical-request <str> :signed-headers <str>}`.
 * 
 *   `headers` is a map of name→value; names are lowercased and values trimmed and
 *   sorted, per spec. `payload-hash` is the hex SHA-256 of the body (or
 *   `unsigned-payload`) and must match the `x-amz-content-sha256` header you send.
 */
sigv4.core.canonical_request = (function sigv4$core$canonical_request(p__14812){
var map__14813 = p__14812;
var map__14813__$1 = cljs.core.__destructure_map(map__14813);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14813__$1,new cljs.core.Keyword(null,"method","method",55703592));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14813__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14813__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14813__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var payload_hash = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14813__$1,new cljs.core.Keyword(null,"payload-hash","payload-hash",1436757062));
var hs = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__14814){
var vec__14815 = p__14814;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14815,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14815,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.string.lower_case(cljs.core.name(k)),clojure.string.trim((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))], null);
}),headers));
var signed = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.first,hs);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"signed-headers","signed-headers",-1530859860),clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",signed),new cljs.core.Keyword(null,"canonical-request","canonical-request",1547947524),clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.string.upper_case(cljs.core.name(method)),path,(function (){var or__5162__auto__ = query;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),sigv4.core.canonical_headers(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,hs),signed),clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",signed),payload_hash], null))], null);
});
/**
 * `<yyyymmdd>/<region>/<service>/aws4_request`.
 */
sigv4.core.credential_scope = (function sigv4$core$credential_scope(var_args){
var G__14819 = arguments.length;
switch (G__14819) {
case 2:
return sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$2 = (function (short_date,region){
return sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$3(short_date,region,sigv4.core.default_service);
}));

(sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$3 = (function (short_date,region,service){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [short_date,region,service,sigv4.core.terminator], null));
}));

(sigv4.core.credential_scope.cljs$lang$maxFixedArity = 3);

/**
 * The four-line string whose HMAC under the derived signing key is the
 *   signature. `canonical-request-hash` is the hex SHA-256 of `:canonical-request`.
 */
sigv4.core.string_to_sign = (function sigv4$core$string_to_sign(long_date,scope,canonical_request_hash){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sigv4.core.algorithm,long_date,scope,canonical_request_hash], null));
});
/**
 * Ordered inputs for the SigV4 key-derivation ladder:
 * 
 *    kDate    = HMAC("AWS4" + secret, short-date)
 *    kRegion  = HMAC(kDate,    region)
 *    kService = HMAC(kRegion,  service)
 *    kSigning = HMAC(kService, "aws4_request")
 * 
 *   → `{:seed "AWS4<secret>" :steps [short-date region service "aws4_request"]}`.
 *   The host folds its own HMAC over `:steps` starting from `:seed`, which is how
 *   this namespace derives keys without owning a crypto primitive. `:seed` is
 *   named for what it is — the prefixed secret, not the secret.
 */
sigv4.core.signing_key_chain = (function sigv4$core$signing_key_chain(var_args){
var G__14821 = arguments.length;
switch (G__14821) {
case 3:
return sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$3 = (function (secret,short_date,region){
return sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$4(secret,short_date,region,sigv4.core.default_service);
}));

(sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$4 = (function (secret,short_date,region,service){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"seed","seed",68613327),(""+"AWS4"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(secret)),new cljs.core.Keyword(null,"steps","steps",-128433302),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [short_date,region,service,sigv4.core.terminator], null)], null);
}));

(sigv4.core.signing_key_chain.cljs$lang$maxFixedArity = 4);

/**
 * The `Authorization` header value for a signed (non-presigned) request.
 */
sigv4.core.authorization_header = (function sigv4$core$authorization_header(key_id,scope,signed_headers,signature){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(sigv4.core.algorithm)+" Credential="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(key_id)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(scope)+", SignedHeaders="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(signed_headers)+", Signature="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(signature));
});
/**
 * The `X-Amz-*` query parameters of a presigned URL, *before* the signature is
 *   appended. Merge with any operation parameters, feed through `canonical-query`,
 *   sign, then add `X-Amz-Signature`.
 * 
 *   `expires-seconds` is capped by S3 at 604800 (7 days).
 */
sigv4.core.presign_params = (function sigv4$core$presign_params(p__14822){
var map__14823 = p__14822;
var map__14823__$1 = cljs.core.__destructure_map(map__14823);
var key_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14823__$1,new cljs.core.Keyword(null,"key-id","key-id",433432263));
var scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14823__$1,new cljs.core.Keyword(null,"scope","scope",-439358418));
var long_date = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14823__$1,new cljs.core.Keyword(null,"long-date","long-date",1819658467));
var expires_seconds = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14823__$1,new cljs.core.Keyword(null,"expires-seconds","expires-seconds",-645770730));
var signed_headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14823__$1,new cljs.core.Keyword(null,"signed-headers","signed-headers",-1530859860));
return new cljs.core.PersistentArrayMap(null, 5, ["X-Amz-Algorithm",sigv4.core.algorithm,"X-Amz-Credential",(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(key_id)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(scope)),"X-Amz-Date",long_date,"X-Amz-Expires",(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expires_seconds)),"X-Amz-SignedHeaders",signed_headers], null);
});

//# sourceMappingURL=sigv4.core.js.map
