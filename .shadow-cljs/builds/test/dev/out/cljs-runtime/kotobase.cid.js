goog.provide('kotobase.cid');
kotobase.cid.b58_alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
kotobase.cid.b32_alphabet = "abcdefghijklmnopqrstuvwxyz234567";
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
var G__10225 = (i + (1));
i = G__10225;
continue;
} else {
return i;
}
break;
}
})();
var digits = [];
var i_10226 = zeros;
while(true){
if((i_10226 < len)){
var carry_10227 = cljs.core.volatile_BANG_((bytes[i_10226]));
var n__5762__auto___10228 = digits.length;
var j_10229 = (0);
while(true){
if((j_10229 < n__5762__auto___10228)){
var c_10230 = (cljs.core.deref(carry_10227) + ((digits[j_10229]) << (8)));
(digits[j_10229] = cljs.core.mod(c_10230,(58)));

cljs.core.vreset_BANG_(carry_10227,cljs.core.quot(c_10230,(58)));

var G__10231 = (j_10229 + (1));
j_10229 = G__10231;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10227) > (0))){
digits.push(cljs.core.mod(cljs.core.deref(carry_10227),(58)));

cljs.core.vreset_BANG_(carry_10227,cljs.core.quot(cljs.core.deref(carry_10227),(58)));

continue;
} else {
}
break;
}

var G__10232 = (i_10226 + (1));
i_10226 = G__10232;
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
var G__10233 = (bits__$2 - (5));
var G__10234 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(out__$1)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(kotobase.cid.b32_alphabet,((value__$1 >>> (bits__$2 - (5))) & (31)))));
bits__$2 = G__10233;
out__$1 = G__10234;
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
var seq__10220_10235 = cljs.core.seq(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(zeros,s));
var chunk__10221_10236 = null;
var count__10222_10237 = (0);
var i__10223_10238 = (0);
while(true){
if((i__10223_10238 < count__10222_10237)){
var c_10239 = chunk__10221_10236.cljs$core$IIndexed$_nth$arity$2(null,i__10223_10238);
var carry_10240 = cljs.core.volatile_BANG_((function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(idx,c_10239);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw (new Error((""+"base58: bad char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_10239))));
}
})());
var n__5762__auto___10241 = b256.length;
var j_10242 = (0);
while(true){
if((j_10242 < n__5762__auto___10241)){
var x_10243 = (((b256[j_10242]) * (58)) + cljs.core.deref(carry_10240));
(b256[j_10242] = (x_10243 & (255)));

cljs.core.vreset_BANG_(carry_10240,(x_10243 >> (8)));

var G__10244 = (j_10242 + (1));
j_10242 = G__10244;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10240) > (0))){
b256.push((cljs.core.deref(carry_10240) & (255)));

cljs.core.vreset_BANG_(carry_10240,(cljs.core.deref(carry_10240) >> (8)));

continue;
} else {
}
break;
}


var G__10245 = seq__10220_10235;
var G__10246 = chunk__10221_10236;
var G__10247 = count__10222_10237;
var G__10248 = (i__10223_10238 + (1));
seq__10220_10235 = G__10245;
chunk__10221_10236 = G__10246;
count__10222_10237 = G__10247;
i__10223_10238 = G__10248;
continue;
} else {
var temp__5825__auto___10249 = cljs.core.seq(seq__10220_10235);
if(temp__5825__auto___10249){
var seq__10220_10250__$1 = temp__5825__auto___10249;
if(cljs.core.chunked_seq_QMARK_(seq__10220_10250__$1)){
var c__5694__auto___10251 = cljs.core.chunk_first(seq__10220_10250__$1);
var G__10252 = cljs.core.chunk_rest(seq__10220_10250__$1);
var G__10253 = c__5694__auto___10251;
var G__10254 = cljs.core.count(c__5694__auto___10251);
var G__10255 = (0);
seq__10220_10235 = G__10252;
chunk__10221_10236 = G__10253;
count__10222_10237 = G__10254;
i__10223_10238 = G__10255;
continue;
} else {
var c_10256 = cljs.core.first(seq__10220_10250__$1);
var carry_10257 = cljs.core.volatile_BANG_((function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(idx,c_10256);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw (new Error((""+"base58: bad char "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_10256))));
}
})());
var n__5762__auto___10258 = b256.length;
var j_10259 = (0);
while(true){
if((j_10259 < n__5762__auto___10258)){
var x_10260 = (((b256[j_10259]) * (58)) + cljs.core.deref(carry_10257));
(b256[j_10259] = (x_10260 & (255)));

cljs.core.vreset_BANG_(carry_10257,(x_10260 >> (8)));

var G__10261 = (j_10259 + (1));
j_10259 = G__10261;
continue;
} else {
}
break;
}

while(true){
if((cljs.core.deref(carry_10257) > (0))){
b256.push((cljs.core.deref(carry_10257) & (255)));

cljs.core.vreset_BANG_(carry_10257,(cljs.core.deref(carry_10257) >> (8)));

continue;
} else {
}
break;
}


var G__10262 = cljs.core.next(seq__10220_10250__$1);
var G__10263 = null;
var G__10264 = (0);
var G__10265 = (0);
seq__10220_10235 = G__10262;
chunk__10221_10236 = G__10263;
count__10222_10237 = G__10264;
i__10223_10238 = G__10265;
continue;
}
} else {
}
}
break;
}

var n = b256.length;
var out = (new Uint8Array((zeros + n)));
var n__5762__auto___10266 = n;
var j_10267 = (0);
while(true){
if((j_10267 < n__5762__auto___10266)){
(out[(zeros + j_10267)] = (b256[((n - (1)) - j_10267)]));

var G__10268 = (j_10267 + (1));
j_10267 = G__10268;
continue;
} else {
}
break;
}

return out;
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
}catch (e10224){if((e10224 instanceof Error)){
var _ = e10224;
return null;
} else {
throw e10224;

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
