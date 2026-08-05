goog.provide('multiformats.core');
multiformats.core.b58_alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
multiformats.core.b58_idx = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,c){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,i], null);
}),multiformats.core.b58_alphabet));
multiformats.core.__GT_ints = (function multiformats$core$__GT_ints(data){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__6017_SHARP_){
return ((p1__6017_SHARP_ | 0) & (255));
}),cljs.core.seq(data));
});
/**
 * Bytes (a byte-array, Uint8Array, or a seq of 0..255 ints) → base58btc
 * (Bitcoin alphabet) String. Pure integer arithmetic — clj + cljs.
 */
multiformats.core.base58btc = (function multiformats$core$base58btc(data){
var in$ = multiformats.core.__GT_ints(data);
var digits = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (digits,b){
var vec__6019 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__6022,d){
var vec__6023 = p__6022;
var ds = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6023,(0),null);
var carry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6023,(1),null);
var v = ((d * (256)) + carry);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ds,cljs.core.rem(v,(58))),cljs.core.quot(v,(58))], null);
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,b], null),digits);
var digits__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6019,(0),null);
var carry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6019,(1),null);
var digits__$2 = digits__$1;
var carry__$1 = carry;
while(true){
if((carry__$1 > (0))){
var G__6046 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(digits__$2,cljs.core.rem(carry__$1,(58)));
var G__6047 = cljs.core.quot(carry__$1,(58));
digits__$2 = G__6046;
carry__$1 = G__6047;
continue;
} else {
return digits__$2;
}
break;
}
}),cljs.core.PersistentVector.EMPTY,in$);
var nzeros = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.zero_QMARK_,in$));
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(nzeros,"1")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__6018_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(multiformats.core.b58_alphabet,p1__6018_SHARP_);
}),cljs.core.rseq(digits)))));
});
/**
 * base58btc String → raw bytes (a byte-array on :clj, a vector of ints on
 * :cljs). Leading '1's decode to leading zero bytes. Pure integer
 * arithmetic, portable.
 */
multiformats.core.base58btc_decode = (function multiformats$core$base58btc_decode(s){
var bytes = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (bs,c){
var idx = (function (){var or__5162__auto__ = (multiformats.core.b58_idx.cljs$core$IFn$_invoke$arity$1 ? multiformats.core.b58_idx.cljs$core$IFn$_invoke$arity$1(c) : multiformats.core.b58_idx.call(null,c));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("multiformats: invalid base58btc character",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"char","char",-641587586),c], null));
}
})();
var vec__6027 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__6030,d){
var vec__6031 = p__6030;
var acc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6031,(0),null);
var carry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6031,(1),null);
var v = ((d * (58)) + carry);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,cljs.core.rem(v,(256))),cljs.core.quot(v,(256))], null);
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,idx], null),bs);
var bs__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6027,(0),null);
var carry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6027,(1),null);
var bs__$2 = bs__$1;
var carry__$1 = carry;
while(true){
if((carry__$1 > (0))){
var G__6048 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bs__$2,cljs.core.rem(carry__$1,(256)));
var G__6049 = cljs.core.quot(carry__$1,(256));
bs__$2 = G__6048;
carry__$1 = G__6049;
continue;
} else {
return bs__$2;
}
break;
}
}),cljs.core.PersistentVector.EMPTY,cljs.core.seq(s));
var nzeros = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__6026_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("1",p1__6026_SHARP_);
}),s));
var out = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(nzeros,(0)),cljs.core.rseq(bytes));
return cljs.core.vec(out);
});
/**
 * SHA-256 digest bytes. :clj — java.security.MessageDigest. :cljs —
 * the noble/hashes sha2 implementation (pure JS, sync).
 */
multiformats.core.sha256 = (function multiformats$core$sha256(b){
return shadow.js.shim.module$$noble$hashes$sha2.sha256(b);
});
/**
 * SHA-384 digest bytes (48 bytes). Same two backends as `sha256`.
 * 
 *   RDFC-1.0 names SHA-384 as an optional canonicalization hash. SHA-384
 *   is not a truncation of SHA-512, so both backends compute it directly.
 */
multiformats.core.sha384 = (function multiformats$core$sha384(b){
return shadow.js.shim.module$$noble$hashes$sha2.sha384(b);
});
multiformats.core.varint = (function multiformats$core$varint(n){
var v = n;
var out = cljs.core.PersistentVector.EMPTY;
while(true){
if((v < (128))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(out,v);
} else {
var G__6050 = (v >>> (7));
var G__6051 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(out,((v & (127)) | (128)));
v = G__6050;
out = G__6051;
continue;
}
break;
}
});
multiformats.core.base32 = multiformats.base32.encode;
multiformats.core.base32_decode = multiformats.base32.decode;
multiformats.core.b64url_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
multiformats.core.b64url_idx = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,c){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,i], null);
}),multiformats.core.b64url_alphabet));
/**
 * Bytes to base64url without padding (RFC 4648 §5).
 */
multiformats.core.base64url = (function multiformats$core$base64url(bytes){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (chunk){
var n = cljs.core.count(chunk);
var vec__6035 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(chunk,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((3) - n),(0)));
var b0 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6035,(0),null);
var b1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6035,(1),null);
var b2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6035,(2),null);
var v = (((b0 << (16)) | (b1 << (8))) | b2);
var chars = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [((v >> (18)) & (63)),((v >> (12)) & (63)),((v >> (6)) & (63)),(v & (63))], null);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__6034_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(multiformats.core.b64url_alphabet,p1__6034_SHARP_);
}),cljs.core.take.cljs$core$IFn$_invoke$arity$2((n + (1)),chars));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.partition.cljs$core$IFn$_invoke$arity$4((3),(3),null,multiformats.core.__GT_ints(bytes))], 0)));
});
/**
 * base64url to raw bytes. Padding is tolerated; bad input is rejected.
 */
multiformats.core.base64url_decode = (function multiformats$core$base64url_decode(text){
var text__$1 = clojure.string.replace(text,/=+$/,"");
var out = (function (){var chars = cljs.core.seq(text__$1);
var buffer = (0);
var bit_count = (0);
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(chars)){
return acc;
} else {
var ch = cljs.core.first(chars);
var idx = (function (){var or__5162__auto__ = (multiformats.core.b64url_idx.cljs$core$IFn$_invoke$arity$1 ? multiformats.core.b64url_idx.cljs$core$IFn$_invoke$arity$1(ch) : multiformats.core.b64url_idx.call(null,ch));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("multiformats: invalid base64url character",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"char","char",-641587586),ch], null));
}
})();
var buffer__$1 = ((buffer << (6)) | idx);
var bit_count__$1 = (bit_count + (6));
if((bit_count__$1 >= (8))){
var G__6052 = cljs.core.rest(chars);
var G__6053 = buffer__$1;
var G__6054 = (bit_count__$1 - (8));
var G__6055 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,((buffer__$1 >>> (bit_count__$1 - (8))) & (255)));
chars = G__6052;
buffer = G__6053;
bit_count = G__6054;
acc = G__6055;
continue;
} else {
var G__6056 = cljs.core.rest(chars);
var G__6057 = buffer__$1;
var G__6058 = bit_count__$1;
var G__6059 = acc;
chars = G__6056;
buffer = G__6057;
bit_count = G__6058;
acc = G__6059;
continue;
}
}
break;
}
})();
return cljs.core.vec(out);
});
multiformats.core.multihash_sha256 = (function multiformats$core$multihash_sha256(b){
var h = multiformats.core.sha256(b);
var out = (new Uint8Array(((2) + h.length)));
(out[(0)] = (18));

(out[(1)] = (32));

out.set(h,(2));

return out;
});
multiformats.core.codec_raw = (85);
multiformats.core.codec_dag_cbor = (113);
/**
 * CIDv1 string from a content codec + a multihash. base32 'b' multibase.
 */
multiformats.core.cidv1 = (function multiformats$core$cidv1(codec,multihash){
var body = cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(multiformats.core.varint((1))),cljs.core.seq(multiformats.core.varint(codec)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.seq(multihash)], 0));
return (""+"b"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__6038 = cljs.core.vec(body);
return (multiformats.core.base32.cljs$core$IFn$_invoke$arity$1 ? multiformats.core.base32.cljs$core$IFn$_invoke$arity$1(G__6038) : multiformats.core.base32.call(null,G__6038));
})()));
});
/**
 * CIDv1 of raw bytes (codec 0x55). Byte-identical to
 * `ipfs add --cid-version=1 --raw-leaves` for a single block (input ≤ 256 KiB).
 */
multiformats.core.cidv1_raw = (function multiformats$core$cidv1_raw(b){
return multiformats.core.cidv1(multiformats.core.codec_raw,multiformats.core.multihash_sha256(b));
});
/**
 * CIDv1 with the dag-cbor codec (0x71) over sha2-256 of the given bytes.
 */
multiformats.core.cidv1_dag_cbor = (function multiformats$core$cidv1_dag_cbor(b){
return multiformats.core.cidv1(multiformats.core.codec_dag_cbor,multiformats.core.multihash_sha256(b));
});
/**
 * KotobaCid::from_bytes(name) — CIDv1 dag-cbor sha2-256 of the UTF-8 name string.
 * Matches the kotoba node's graph/RID content addressing.
 */
multiformats.core.kotoba_cid = (function multiformats$core$kotoba_cid(name){
return multiformats.core.cidv1_dag_cbor((new TextEncoder()).encode(name));
});
/**
 * Decode a base32 'b' multibase CIDv1 back to its (version,codec,multihash) bytes.
 */
multiformats.core.cid__GT_bytes = (function multiformats$core$cid__GT_bytes(cid){
if(clojure.string.starts_with_QMARK_(cid,"b")){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("expected base32 'b' multibase CID",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid], null));
}

var G__6039 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cid,(1));
return (multiformats.core.base32_decode.cljs$core$IFn$_invoke$arity$1 ? multiformats.core.base32_decode.cljs$core$IFn$_invoke$arity$1(G__6039) : multiformats.core.base32_decode.call(null,G__6039));
});
multiformats.core.single_block_limit = (262144);
multiformats.core.cid_of_file = (function multiformats$core$cid_of_file(var_args){
var args__5903__auto__ = [];
var len__5897__auto___6060 = arguments.length;
var i__5898__auto___6061 = (0);
while(true){
if((i__5898__auto___6061 < len__5897__auto___6060)){
args__5903__auto__.push((arguments[i__5898__auto___6061]));

var G__6062 = (i__5898__auto___6061 + (1));
i__5898__auto___6061 = G__6062;
continue;
} else {
}
break;
}

var argseq__5904__auto__ = ((((0) < args__5903__auto__.length))?(new cljs.core.IndexedSeq(args__5903__auto__.slice((0)),(0),null)):null);
return multiformats.core.cid_of_file.cljs$core$IFn$_invoke$arity$variadic(argseq__5904__auto__);
});

(multiformats.core.cid_of_file.cljs$core$IFn$_invoke$arity$variadic = (function (_){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("multiformats.core/cid-of-file is :clj-only (file I/O)",cljs.core.PersistentArrayMap.EMPTY);
}));

(multiformats.core.cid_of_file.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(multiformats.core.cid_of_file.cljs$lang$applyTo = (function (seq6040){
var self__5883__auto__ = this;
return self__5883__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq6040));
}));

multiformats.core.hexify = (function multiformats$core$hexify(b){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (x){
var h = (x & (255)).toString((16));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(h))){
return (""+"0"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(h));
} else {
return h;
}
}),cljs.core.seq(b)));
});
multiformats.core.unhex = (function multiformats$core$unhex(s){
var s__$1 = clojure.string.replace(s,/\s/,"");
if(cljs.core.odd_QMARK_(((s__$1).length))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unhex: odd-length hex string",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"s","s",1705939918),s__$1], null));
} else {
}

var pairs = cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),s__$1);
return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__6042){
var vec__6043 = p__6042;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6043,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6043,(1),null);
return parseInt((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(b)),(16));
}),pairs));
});

//# sourceMappingURL=multiformats.core.js.map
