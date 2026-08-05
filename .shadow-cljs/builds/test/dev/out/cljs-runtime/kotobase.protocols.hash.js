goog.provide('kotobase.protocols.hash');
kotobase.protocols.hash.char_code = (function kotobase$protocols$hash$char_code(s,i){
return s.charCodeAt(i);
});
/**
 * 32-bit FNV-1a over the UTF-16 code units of `s`, from `seed`.
 */
kotobase.protocols.hash.fnv1a_32 = (function kotobase$protocols$hash$fnv1a_32(s,seed){
var n = cljs.core.count(s);
var i = (0);
var h = cljs.core.long$(seed);
while(true){
if((i < n)){
var h__$1 = (h ^ kotobase.protocols.hash.char_code(s,i));
var h__$2 = (Math.imul(h__$1,(16777619)) >>> (0));
var G__8240 = (i + (1));
var G__8241 = cljs.core.long$(h__$2);
i = G__8240;
h = G__8241;
continue;
} else {
return h;
}
break;
}
});
kotobase.protocols.hash.hex8 = (function kotobase$protocols$hash$hex8(h){
return (h >>> (0)).toString((16)).padStart((8),"0");
});
/**
 * 16-hex-char deterministic fingerprint of string `s` (two seeded
 *   FNV-1a-32 lanes). Stable across clj and cljs.
 */
kotobase.protocols.hash.fingerprint = (function kotobase$protocols$hash$fingerprint(s){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.hash.hex8(kotobase.protocols.hash.fnv1a_32(s,(2166136261))))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.hash.hex8(kotobase.protocols.hash.fnv1a_32(s,(16777623)))));
});

//# sourceMappingURL=kotobase.protocols.hash.js.map
