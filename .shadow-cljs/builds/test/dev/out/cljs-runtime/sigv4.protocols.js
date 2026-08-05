goog.provide('sigv4.protocols');

/**
 * SHA-256 and HMAC-SHA-256. Deliberately tiny: SigV4 needs nothing else, and a
 *   small surface is one a host can implement in a few lines on any runtime.
 * @interface
 */
sigv4.protocols.ICrypto = function(){};

var sigv4$protocols$ICrypto$_sha256_hex$dyn_14770 = (function (this$,data){
var x__5519__auto__ = (((this$ == null))?null:this$);
var m__5520__auto__ = (sigv4.protocols._sha256_hex[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$2(this$,data) : m__5520__auto__.call(null,this$,data));
} else {
var m__5518__auto__ = (sigv4.protocols._sha256_hex["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$2(this$,data) : m__5518__auto__.call(null,this$,data));
} else {
throw cljs.core.missing_protocol("ICrypto.-sha256-hex",this$);
}
}
});
/**
 * Hex-encoded (lowercase) SHA-256 of `data` — a string or a byte container.
 */
sigv4.protocols._sha256_hex = (function sigv4$protocols$_sha256_hex(this$,data){
if((((!((this$ == null)))) && ((!((this$.sigv4$protocols$ICrypto$_sha256_hex$arity$2 == null)))))){
return this$.sigv4$protocols$ICrypto$_sha256_hex$arity$2(this$,data);
} else {
return sigv4$protocols$ICrypto$_sha256_hex$dyn_14770(this$,data);
}
});

var sigv4$protocols$ICrypto$_hmac$dyn_14771 = (function (this$,key,data){
var x__5519__auto__ = (((this$ == null))?null:this$);
var m__5520__auto__ = (sigv4.protocols._hmac[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$3(this$,key,data) : m__5520__auto__.call(null,this$,key,data));
} else {
var m__5518__auto__ = (sigv4.protocols._hmac["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$3(this$,key,data) : m__5518__auto__.call(null,this$,key,data));
} else {
throw cljs.core.missing_protocol("ICrypto.-hmac",this$);
}
}
});
/**
 * HMAC-SHA-256 of the string `data` under `key` (a string, or the raw byte
 *  output of a previous `-hmac` — the key-derivation ladder chains them).
 *  Returns raw bytes.
 */
sigv4.protocols._hmac = (function sigv4$protocols$_hmac(this$,key,data){
if((((!((this$ == null)))) && ((!((this$.sigv4$protocols$ICrypto$_hmac$arity$3 == null)))))){
return this$.sigv4$protocols$ICrypto$_hmac$arity$3(this$,key,data);
} else {
return sigv4$protocols$ICrypto$_hmac$dyn_14771(this$,key,data);
}
});

var sigv4$protocols$ICrypto$_hex$dyn_14772 = (function (this$,bytes){
var x__5519__auto__ = (((this$ == null))?null:this$);
var m__5520__auto__ = (sigv4.protocols._hex[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$2(this$,bytes) : m__5520__auto__.call(null,this$,bytes));
} else {
var m__5518__auto__ = (sigv4.protocols._hex["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$2(this$,bytes) : m__5518__auto__.call(null,this$,bytes));
} else {
throw cljs.core.missing_protocol("ICrypto.-hex",this$);
}
}
});
/**
 * Lowercase hex encoding of raw bytes, for the final signature.
 */
sigv4.protocols._hex = (function sigv4$protocols$_hex(this$,bytes){
if((((!((this$ == null)))) && ((!((this$.sigv4$protocols$ICrypto$_hex$arity$2 == null)))))){
return this$.sigv4$protocols$ICrypto$_hex$arity$2(this$,bytes);
} else {
return sigv4$protocols$ICrypto$_hex$dyn_14772(this$,bytes);
}
});


//# sourceMappingURL=sigv4.protocols.js.map
