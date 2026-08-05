goog.provide('multiformats.base32');
multiformats.base32.alphabet = "abcdefghijklmnopqrstuvwxyz234567";
multiformats.base32.alphabet_index = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,c){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,i], null);
}),multiformats.base32.alphabet));
multiformats.base32.alphabet_char = (function multiformats$base32$alphabet_char(i){
return multiformats.base32.alphabet.charAt(i);
});
/**
 * Bytes to lowercase RFC 4648 base32 without padding.
 */
multiformats.base32.encode = (function multiformats$base32$encode(bytes){
var bits = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (byte$){
var v = ((byte$ | 0) & (255));
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__6008_SHARP_){
return ((v >> p1__6008_SHARP_) & (1));
}),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [(7),(6),(5),(4),(3),(2),(1),(0)], null));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.seq(bytes)], 0));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (chunk){
var padded = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(chunk,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((5) - cljs.core.count(chunk)),(0)));
return multiformats.base32.alphabet_char(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,bit){
return ((acc * (2)) + bit);
}),(0),padded));
}),cljs.core.partition.cljs$core$IFn$_invoke$arity$4((5),(5),null,bits)));
});
/**
 * Lowercase RFC 4648 base32 without padding to bytes; reject bad input.
 */
multiformats.base32.decode = (function multiformats$base32$decode(text){
var out = (function (){var chars = cljs.core.seq(text);
var buffer = (0);
var bit_count = (0);
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(chars)){
return acc;
} else {
var ch = cljs.core.first(chars);
var idx = (function (){var or__5162__auto__ = (multiformats.base32.alphabet_index.cljs$core$IFn$_invoke$arity$1 ? multiformats.base32.alphabet_index.cljs$core$IFn$_invoke$arity$1(ch) : multiformats.base32.alphabet_index.call(null,ch));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("multiformats: invalid base32 character",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"char","char",-641587586),ch], null));
}
})();
var buffer__$1 = ((buffer << (5)) | idx);
var bit_count__$1 = (bit_count + (5));
if((bit_count__$1 >= (8))){
var G__6009 = cljs.core.rest(chars);
var G__6010 = buffer__$1;
var G__6011 = (bit_count__$1 - (8));
var G__6012 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,((buffer__$1 >>> (bit_count__$1 - (8))) & (255)));
chars = G__6009;
buffer = G__6010;
bit_count = G__6011;
acc = G__6012;
continue;
} else {
var G__6013 = cljs.core.rest(chars);
var G__6014 = buffer__$1;
var G__6015 = bit_count__$1;
var G__6016 = acc;
chars = G__6013;
buffer = G__6014;
bit_count = G__6015;
acc = G__6016;
continue;
}
}
break;
}
})();
return cljs.core.vec(out);
});

//# sourceMappingURL=multiformats.base32.js.map
