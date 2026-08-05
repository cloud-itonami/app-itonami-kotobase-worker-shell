goog.provide('kotobase.cid');
kotobase.cid.b58_alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
kotobase.cid.b32_alphabet = "abcdefghijklmnopqrstuvwxyz234567";
kotobase.cid.b36_alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
kotobase.cid.text__GT_bytes = (function kotobase$cid$text__GT_bytes(s){
return (new TextEncoder()).encode(s);
});
/**
 * base58btc(multibase 'z' payload). Port of the edge's base58btcEncode.
 */
kotobase.cid.base58btc = (function kotobase$cid$base58btc(bytes){
var len = bytes.length;
var zeros = (function (){var i = (0);
while(true){
if((((i < len)) && (((bytes[i]) === (0))))){
var G__10231 = (i + (1));
i = G__10231;
continue;
} else {
return i;
}
break;
}
})();
var digits = [];
var i_10232 = zeros;
while(true){
if((i_10232 < len)){
var carry_10233 = cljs.core.volatile_BANG_((bytes[i_10232]));
var n__5762__auto___10234 = digits.length;
var j_10235 = (0);
while(true){
if((j_10235 < n__5762__auto___10234)){
var c_10236 = (cljs.core.deref(carry_10233) + ((digits[j_10235]) << (8)));
(digits[j_10235] = cljs.core.mod(c_10236,(58)));

cljs.core.vreset_BANG_(carry_10233,cljs.core.quot(c_10236,(58)));

var G__10237 = (j_10235 + (1));
j_10235 = G__10237;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10233) > (0))){
digits.push(cljs.core.mod(cljs.core.deref(carry_10233),(58)));

cljs.core.vreset_BANG_(carry_10233,cljs.core.quot(cljs.core.deref(carry_10233),(58)));

continue;
} else {
}
break;
}

var G__10238 = (i_10232 + (1));
i_10232 = G__10238;
continue;
} else {
}
break;
}

return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(zeros,"1")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__10215_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(kotobase.cid.b58_alphabet,p1__10215_SHARP_);
}),cljs.core.reverse(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(digits))))));
});
/**
 * CIDv1 base32-lower, no padding (multibase 'b' payload). Port of the edge's
 *   base32LowerNoPad — 32-bit accumulator, drains 5-bit groups MSB-first.
 */
kotobase.cid.base32_lower_no_pad = (function kotobase$cid$base32_lower_no_pad(bytes){
var st = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__10217,b){
var map__10218 = p__10217;
var map__10218__$1 = cljs.core.__destructure_map(map__10218);
var bits = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10218__$1,new cljs.core.Keyword(null,"bits","bits",-1206785969));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10218__$1,new cljs.core.Keyword(null,"value","value",305978217));
var out = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10218__$1,new cljs.core.Keyword(null,"out","out",-910545517));
var value__$1 = ((value << (8)) | b);
var bits__$1 = (bits + (8));
var bits__$2 = bits__$1;
var out__$1 = out;
while(true){
if((bits__$2 >= (5))){
var G__10239 = (bits__$2 - (5));
var G__10240 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(out__$1)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(kotobase.cid.b32_alphabet,((value__$1 >>> (bits__$2 - (5))) & (31)))));
bits__$2 = G__10239;
out__$1 = G__10240;
continue;
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"bits","bits",-1206785969),bits__$2,new cljs.core.Keyword(null,"value","value",305978217),value__$1,new cljs.core.Keyword(null,"out","out",-910545517),out__$1], null);
}
break;
}
}),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"bits","bits",-1206785969),(0),new cljs.core.Keyword(null,"value","value",305978217),(0),new cljs.core.Keyword(null,"out","out",-910545517),""], null),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(bytes));
var map__10216 = st;
var map__10216__$1 = cljs.core.__destructure_map(map__10216);
var bits = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10216__$1,new cljs.core.Keyword(null,"bits","bits",-1206785969));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10216__$1,new cljs.core.Keyword(null,"value","value",305978217));
var out = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10216__$1,new cljs.core.Keyword(null,"out","out",-910545517));
if((bits > (0))){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(out)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(kotobase.cid.b32_alphabet,((value << ((5) - bits)) & (31)))));
} else {
return out;
}
});
/**
 * Inverse of base58btc: base58 string → Uint8Array. Throws on bad chars.
 */
kotobase.cid.base58btc_decode = (function kotobase$cid$base58btc_decode(s){
var idx = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,c){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,i], null);
}),kotobase.cid.b58_alphabet));
var zeros = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__10219_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__10219_SHARP_,"1");
}),s));
var b256 = [];
var seq__10220_10241 = cljs.core.seq(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(zeros,s));
var chunk__10221_10242 = null;
var count__10222_10243 = (0);
var i__10223_10244 = (0);
while(true){
if((i__10223_10244 < count__10222_10243)){
var c_10245 = chunk__10221_10242.cljs$core$IIndexed$_nth$arity$2(null,i__10223_10244);
var carry_10246 = cljs.core.volatile_BANG_((function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(idx,c_10245);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw (new Error((""+"base58: bad char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_10245))));
}
})());
var n__5762__auto___10247 = b256.length;
var j_10248 = (0);
while(true){
if((j_10248 < n__5762__auto___10247)){
var x_10249 = (((b256[j_10248]) * (58)) + cljs.core.deref(carry_10246));
(b256[j_10248] = (x_10249 & (255)));

cljs.core.vreset_BANG_(carry_10246,(x_10249 >> (8)));

var G__10250 = (j_10248 + (1));
j_10248 = G__10250;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10246) > (0))){
b256.push((cljs.core.deref(carry_10246) & (255)));

cljs.core.vreset_BANG_(carry_10246,(cljs.core.deref(carry_10246) >> (8)));

continue;
} else {
}
break;
}


var G__10251 = seq__10220_10241;
var G__10252 = chunk__10221_10242;
var G__10253 = count__10222_10243;
var G__10254 = (i__10223_10244 + (1));
seq__10220_10241 = G__10251;
chunk__10221_10242 = G__10252;
count__10222_10243 = G__10253;
i__10223_10244 = G__10254;
continue;
} else {
var temp__5825__auto___10255 = cljs.core.seq(seq__10220_10241);
if(temp__5825__auto___10255){
var seq__10220_10256__$1 = temp__5825__auto___10255;
if(cljs.core.chunked_seq_QMARK_(seq__10220_10256__$1)){
var c__5694__auto___10257 = cljs.core.chunk_first(seq__10220_10256__$1);
var G__10258 = cljs.core.chunk_rest(seq__10220_10256__$1);
var G__10259 = c__5694__auto___10257;
var G__10260 = cljs.core.count(c__5694__auto___10257);
var G__10261 = (0);
seq__10220_10241 = G__10258;
chunk__10221_10242 = G__10259;
count__10222_10243 = G__10260;
i__10223_10244 = G__10261;
continue;
} else {
var c_10262 = cljs.core.first(seq__10220_10256__$1);
var carry_10263 = cljs.core.volatile_BANG_((function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(idx,c_10262);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw (new Error((""+"base58: bad char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_10262))));
}
})());
var n__5762__auto___10264 = b256.length;
var j_10265 = (0);
while(true){
if((j_10265 < n__5762__auto___10264)){
var x_10266 = (((b256[j_10265]) * (58)) + cljs.core.deref(carry_10263));
(b256[j_10265] = (x_10266 & (255)));

cljs.core.vreset_BANG_(carry_10263,(x_10266 >> (8)));

var G__10267 = (j_10265 + (1));
j_10265 = G__10267;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10263) > (0))){
b256.push((cljs.core.deref(carry_10263) & (255)));

cljs.core.vreset_BANG_(carry_10263,(cljs.core.deref(carry_10263) >> (8)));

continue;
} else {
}
break;
}


var G__10268 = cljs.core.next(seq__10220_10256__$1);
var G__10269 = null;
var G__10270 = (0);
var G__10271 = (0);
seq__10220_10241 = G__10268;
chunk__10221_10242 = G__10269;
count__10222_10243 = G__10270;
i__10223_10244 = G__10271;
continue;
}
} else {
}
}
break;
}

var n = b256.length;
var out = (new Uint8Array((zeros + n)));
var n__5762__auto___10272 = n;
var j_10273 = (0);
while(true){
if((j_10273 < n__5762__auto___10272)){
(out[(zeros + j_10273)] = (b256[((n - (1)) - j_10273)]));

var G__10274 = (j_10273 + (1));
j_10273 = G__10274;
continue;
} else {
}
break;
}

return out;
});
/**
 * Inverse of the multibase base36 `ipns.core/base36` uses: lowercase base36
 *   string → Uint8Array. Throws on bad chars.
 * 
 *   A deliberate second implementation of `kotoba-lang/tech-ipfs-specs-ipns`'s
 *   portable `.cljc` codec, not a shared dependency — this repo is consumed by
 *   its workers as a bare shadow-cljs `:source-path` (see the aozora workers'
 *   `shadow-cljs.edn`), so a `deps.edn` git dep here would not resolve in their
 *   builds and a new `(:require [ipns.core])` would break them. Same reason and
 *   same shape as this namespace's existing did:key/base58 duplication of the
 *   JVM stack (ADR-2607050100): byte compatibility is the contract, held by
 *   golden vectors in `cid_test`, not by sharing code.
 * 
 *   Two copies of a codec is a drift risk and the vectors are the mitigation:
 *   they are the literals `ipns.core-test` asserts, including the one taken from
 *   a real Kubo node.
 */
kotobase.cid.base36_decode = (function kotobase$cid$base36_decode(s){
var idx = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,c){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,i], null);
}),kotobase.cid.b36_alphabet));
var zeros = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__10224_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__10224_SHARP_,"0");
}),s));
var b256 = [];
var seq__10225_10275 = cljs.core.seq(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(zeros,s));
var chunk__10226_10276 = null;
var count__10227_10277 = (0);
var i__10228_10278 = (0);
while(true){
if((i__10228_10278 < count__10227_10277)){
var c_10279 = chunk__10226_10276.cljs$core$IIndexed$_nth$arity$2(null,i__10228_10278);
var carry_10280 = cljs.core.volatile_BANG_((function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(idx,c_10279);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw (new Error((""+"base36: bad char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_10279))));
}
})());
var n__5762__auto___10281 = b256.length;
var j_10282 = (0);
while(true){
if((j_10282 < n__5762__auto___10281)){
var x_10283 = (((b256[j_10282]) * (36)) + cljs.core.deref(carry_10280));
(b256[j_10282] = (x_10283 & (255)));

cljs.core.vreset_BANG_(carry_10280,(x_10283 >> (8)));

var G__10284 = (j_10282 + (1));
j_10282 = G__10284;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10280) > (0))){
b256.push((cljs.core.deref(carry_10280) & (255)));

cljs.core.vreset_BANG_(carry_10280,(cljs.core.deref(carry_10280) >> (8)));

continue;
} else {
}
break;
}


var G__10285 = seq__10225_10275;
var G__10286 = chunk__10226_10276;
var G__10287 = count__10227_10277;
var G__10288 = (i__10228_10278 + (1));
seq__10225_10275 = G__10285;
chunk__10226_10276 = G__10286;
count__10227_10277 = G__10287;
i__10228_10278 = G__10288;
continue;
} else {
var temp__5825__auto___10289 = cljs.core.seq(seq__10225_10275);
if(temp__5825__auto___10289){
var seq__10225_10290__$1 = temp__5825__auto___10289;
if(cljs.core.chunked_seq_QMARK_(seq__10225_10290__$1)){
var c__5694__auto___10291 = cljs.core.chunk_first(seq__10225_10290__$1);
var G__10292 = cljs.core.chunk_rest(seq__10225_10290__$1);
var G__10293 = c__5694__auto___10291;
var G__10294 = cljs.core.count(c__5694__auto___10291);
var G__10295 = (0);
seq__10225_10275 = G__10292;
chunk__10226_10276 = G__10293;
count__10227_10277 = G__10294;
i__10228_10278 = G__10295;
continue;
} else {
var c_10296 = cljs.core.first(seq__10225_10290__$1);
var carry_10297 = cljs.core.volatile_BANG_((function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(idx,c_10296);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw (new Error((""+"base36: bad char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_10296))));
}
})());
var n__5762__auto___10298 = b256.length;
var j_10299 = (0);
while(true){
if((j_10299 < n__5762__auto___10298)){
var x_10300 = (((b256[j_10299]) * (36)) + cljs.core.deref(carry_10297));
(b256[j_10299] = (x_10300 & (255)));

cljs.core.vreset_BANG_(carry_10297,(x_10300 >> (8)));

var G__10301 = (j_10299 + (1));
j_10299 = G__10301;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10297) > (0))){
b256.push((cljs.core.deref(carry_10297) & (255)));

cljs.core.vreset_BANG_(carry_10297,(cljs.core.deref(carry_10297) >> (8)));

continue;
} else {
}
break;
}


var G__10302 = cljs.core.next(seq__10225_10290__$1);
var G__10303 = null;
var G__10304 = (0);
var G__10305 = (0);
seq__10225_10275 = G__10302;
chunk__10226_10276 = G__10303;
count__10227_10277 = G__10304;
i__10228_10278 = G__10305;
continue;
}
} else {
}
}
break;
}

var n = b256.length;
var out = (new Uint8Array((zeros + n)));
var n__5762__auto___10306 = n;
var j_10307 = (0);
while(true){
if((j_10307 < n__5762__auto___10306)){
(out[(zeros + j_10307)] = (b256[((n - (1)) - j_10307)]));

var G__10308 = (j_10307 + (1));
j_10307 = G__10308;
continue;
} else {
}
break;
}

return out;
});
/**
 * `k51…` libp2p-key IPNS name → the 32-byte Ed25519 public key it names, or
 *   nil. The cljs counterpart of `ipns.core/name->pubkey*`.
 * 
 *   Structurally exact, not merely prefix-shaped: CIDv1 (0x01) + libp2p-key
 *   codec (0x72) + identity multihash (0x00) + a libp2p PublicKey protobuf of
 *   EXACTLY 36 bytes with header `08 01 12 20`. A length check that only
 *   enforced a floor would fold trailing garbage into the returned key, which
 *   is a forged name that verifies.
 * 
 *   Fail-closed: nil for anything malformed, never a throw.
 */
kotobase.cid.ipns_name__GT_ed25519_pub = (function kotobase$cid$ipns_name__GT_ed25519_pub(name){
try{if(((typeof name === 'string') && (clojure.string.starts_with_QMARK_(name,"k")))){
var cid = kotobase.cid.base36_decode(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(name,(1)));
if((((cid.length >= (4))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),(cid[(0)]))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((114),(cid[(1)]))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),(cid[(2)]))))))))){
var len = (cid[(3)]);
var pb = cid.subarray((4),((4) + len));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((36),len)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((36),pb.length)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((8),(pb[(0)]))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),(pb[(1)]))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((18),(pb[(2)]))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((32),(pb[(3)]))))))))))))){
return pb.slice((4),(36));
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
}catch (e10229){if((e10229 instanceof Error)){
var _ = e10229;
return null;
} else {
throw e10229;

}
}});
/**
 * Does `name` name exactly `pub`? The cljs counterpart of
 *   `ipns.core/name-matches-pubkey?`, and the check that makes "the name is the
 *   key" true rather than decorative — see that function's docstring and
 *   `kotobase.ipns/verify-head`. Fail-closed.
 */
kotobase.cid.ipns_name_matches_pub_QMARK_ = (function kotobase$cid$ipns_name_matches_pub_QMARK_(name,pub){
return cljs.core.boolean$((function (){var temp__5825__auto__ = kotobase.cid.ipns_name__GT_ed25519_pub(name);
if(cljs.core.truth_(temp__5825__auto__)){
var expected = temp__5825__auto__;
var and__5160__auto__ = pub;
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected.length,pub.length)) && (cljs.core.every_QMARK_(cljs.core.true_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._EQ_,cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(expected),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(pub)))));
} else {
return and__5160__auto__;
}
} else {
return null;
}
})());
});
/**
 * did:key:z<base58btc(0xed 0x01 || pub32)> → the 32-byte Ed25519 public key,
 *   or nil when the DID isn't an Ed25519 did:key -- including when the
 *   base58 payload itself is malformed (base58btc-decode throws on a
 *   character outside its alphabet), not just when the decoded multicodec
 *   header is wrong.
 */
kotobase.cid.did_key__GT_ed25519_pub = (function kotobase$cid$did_key__GT_ed25519_pub(did){
if(clojure.string.starts_with_QMARK_(did,"did:key:z")){
var mc = (function (){try{return kotobase.cid.base58btc_decode(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(did,(("did:key:z").length)));
}catch (e10230){if((e10230 instanceof Error)){
var _ = e10230;
return null;
} else {
throw e10230;

}
}})();
if(cljs.core.truth_((function (){var and__5160__auto__ = mc;
if(cljs.core.truth_(and__5160__auto__)){
return (((mc.length >= (34))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((237),(mc[(0)]))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),(mc[(1)]))))));
} else {
return and__5160__auto__;
}
})())){
return mc.slice((2),(34));
} else {
return null;
}
} else {
return null;
}
});
/**
 * did:key:z<base58btc(0xed 0x01 || pub32)> for an Ed25519 public key.
 */
kotobase.cid.did_key_from_ed25519_pub = (function kotobase$cid$did_key_from_ed25519_pub(pub){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((32),pub.length)){
throw (new Error("Ed25519 public key must be 32 bytes"));
} else {
}

var mc = (new Uint8Array((34)));
(mc[(0)] = (237));

(mc[(1)] = (1));

mc.set(pub,(2));

return (""+"did:key:z"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.cid.base58btc(mc)));
});
/**
 * KotobaCid::from_bytes(name).to_multibase(): SHA-256(name) behind a
 *   CIDv1/dag-cbor/sha2-256 header (0x01 0x71 0x12 0x20), base32-lower 'b'.
 */
kotobase.cid.graph_cid_from_name = (function kotobase$cid$graph_cid_from_name(name){
var hash = shadow.js.shim.module$$noble$hashes$sha2.sha256(kotobase.cid.text__GT_bytes(name));
var cid = (new Uint8Array((36)));
(cid[(0)] = (1));

(cid[(1)] = (113));

(cid[(2)] = (18));

(cid[(3)] = (32));

cid.set(hash,(4));

return (""+"b"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.cid.base32_lower_no_pad(cid)));
});
/**
 * The deterministic graph CID for one of your databases. The edge recomputes
 *   exactly this from your DID + db-name and pins it into every write.
 */
kotobase.cid.canonical_graph = (function kotobase$cid$canonical_graph(did,db_name){
return kotobase.cid.graph_cid_from_name((""+"kotobase/db/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(did)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(db_name)));
});

//# sourceMappingURL=kotobase.cid.js.map
