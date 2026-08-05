goog.provide('kotobase.protocols.cid');
kotobase.protocols.cid.b32_alphabet = "abcdefghijklmnopqrstuvwxyz234567";
/**
 * RFC 4648 base32 (lower-case, no padding) over a seq of byte ints.
 *   The accumulator is re-masked to its live bits after every byte so it
 *   never exceeds 12 bits — safe under cljs 32-bit bit ops.
 */
kotobase.protocols.cid.base32_lower = (function kotobase$protocols$cid$base32_lower(bytes){
var vec__14758 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__14761,b){
var vec__14762 = p__14761;
var out = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14762,(0),null);
var acc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14762,(1),null);
var bits = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14762,(2),null);
var acc__$1 = ((acc << (8)) | (cljs.core.long$(b) & (255)));
var bits__$1 = (bits + (8));
var vec__14765 = (function (){var out__$1 = out;
var bits__$2 = bits__$1;
while(true){
if((bits__$2 >= (5))){
var G__14768 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(out__$1)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cid.b32_alphabet,((acc__$1 >> (bits__$2 - (5))) & (31)))));
var G__14769 = (bits__$2 - (5));
out__$1 = G__14768;
bits__$2 = G__14769;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [out__$1,bits__$2], null);
}
break;
}
})();
var out__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14765,(0),null);
var bits_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14765,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [out__$1,(acc__$1 & (((1) << bits_SINGLEQUOTE_) - (1))),bits_SINGLEQUOTE_], null);
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["",(0),(0)], null),bytes);
var out = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14758,(0),null);
var acc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14758,(1),null);
var bits = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14758,(2),null);
if((bits > (0))){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(out)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cid.b32_alphabet,((acc << ((5) - bits)) & (31)))));
} else {
return out;
}
});
/**
 * 32-byte sha2-256 digest (seq of ints) → CIDv1 string
 *   (multibase b + version 1 + codec raw 0x55 + multihash 0x12 0x20).
 */
kotobase.protocols.cid.cidv1_raw_sha256 = (function kotobase$protocols$cid$cidv1_raw_sha256(digest_bytes){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((32),cljs.core.count(digest_bytes))){
} else {
throw (new Error("Assert failed: (= 32 (count digest-bytes))"));
}

return (""+"b"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cid.base32_lower(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(85),(18),(32)], null),digest_bytes))));
});
/**
 * Cheap shape check for the CIDs this library mints.
 */
kotobase.protocols.cid.cid_QMARK_ = (function kotobase$protocols$cid$cid_QMARK_(s){
return cljs.core.boolean$((function (){var and__5160__auto__ = typeof s === 'string';
if(and__5160__auto__){
return cljs.core.re_matches(/bafkrei[a-z2-7]{52}/,s);
} else {
return and__5160__auto__;
}
})());
});

//# sourceMappingURL=kotobase.protocols.cid.js.map
