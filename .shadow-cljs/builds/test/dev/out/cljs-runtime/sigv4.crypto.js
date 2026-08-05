goog.provide('sigv4.crypto');
sigv4.crypto.hex_digits = "0123456789abcdef";
sigv4.crypto.__GT_bytes = (function sigv4$crypto$__GT_bytes(x){
if(typeof x === 'string'){
return (new TextEncoder()).encode(x);
} else {
if((x instanceof ArrayBuffer)){
return (new Uint8Array(x));
} else {
return x;

}
}
});
sigv4.crypto.bytes__GT_hex = (function sigv4$crypto$bytes__GT_hex(bs){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,(function (){var iter__5649__auto__ = (function sigv4$crypto$bytes__GT_hex_$_iter__14773(s__14774){
return (new cljs.core.LazySeq(null,(function (){
var s__14774__$1 = s__14774;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__14774__$1);
if(temp__5825__auto__){
var s__14774__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14774__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__14774__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__14776 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__14775 = (0);
while(true){
if((i__14775 < size__5648__auto__)){
var v = cljs.core._nth(c__5647__auto__,i__14775);
cljs.core.chunk_append(b__14776,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sigv4.crypto.hex_digits,(v >> (4))))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sigv4.crypto.hex_digits,(v & (15))))));

var G__14793 = (i__14775 + (1));
i__14775 = G__14793;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14776),sigv4$crypto$bytes__GT_hex_$_iter__14773(cljs.core.chunk_rest(s__14774__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14776),null);
}
} else {
var v = cljs.core.first(s__14774__$2);
return cljs.core.cons((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sigv4.crypto.hex_digits,(v >> (4))))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sigv4.crypto.hex_digits,(v & (15))))),sigv4$crypto$bytes__GT_hex_$_iter__14773(cljs.core.rest(s__14774__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(sigv4.crypto.__GT_bytes(bs)));
})());
});
/**
 * WebCrypto, or a clear error. Absent in a plain `http://` page and in Node
 *   below 18 — worth naming, since the failure would otherwise surface as a
 *   null-pointer deep inside signing.
 */
sigv4.crypto.subtle = (function sigv4$crypto$subtle(){
var or__5162__auto__ = (function (){var G__14777 = globalThis;
var G__14777__$1 = (((G__14777 == null))?null:G__14777.crypto);
if((G__14777__$1 == null)){
return null;
} else {
return G__14777__$1.subtle;
}
})();
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
throw (new Error("WebCrypto (crypto.subtle) is unavailable in this runtime"));
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {sigv4.protocols.ICrypto}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
sigv4.crypto.PlatformCrypto = (function (__meta,__extmap,__hash){
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(sigv4.crypto.PlatformCrypto.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k14780,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__14784 = k14780;
switch (G__14784) {
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k14780,else__5472__auto__);

}
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__14785){
var vec__14786 = p__14785;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14786,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14786,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#sigv4.crypto.PlatformCrypto{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,self__.__extmap));
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__14779){
var self__ = this;
var G__14779__$1 = this;
return (new cljs.core.RecordIter((0),G__14779__$1,0,cljs.core.PersistentVector.EMPTY,(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new sigv4.crypto.PlatformCrypto(self__.__meta,self__.__extmap,self__.__hash));
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (0 + cljs.core.count(self__.__extmap));
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (1512262155 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this14781,other14782){
var self__ = this;
var this14781__$1 = this;
return (((!((other14782 == null)))) && ((((this14781__$1.constructor === other14782.constructor)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this14781__$1.__extmap,other14782.__extmap)))));
}));

(sigv4.crypto.PlatformCrypto.prototype.sigv4$protocols$ICrypto$ = cljs.core.PROTOCOL_SENTINEL);

(sigv4.crypto.PlatformCrypto.prototype.sigv4$protocols$ICrypto$_sha256_hex$arity$2 = (function (_,data){
var self__ = this;
var ___$1 = this;
return sigv4.crypto.subtle().digest("SHA-256",sigv4.crypto.__GT_bytes(data)).then(sigv4.crypto.bytes__GT_hex);
}));

(sigv4.crypto.PlatformCrypto.prototype.sigv4$protocols$ICrypto$_hmac$arity$3 = (function (_,key,data){
var self__ = this;
var ___$1 = this;
return sigv4.crypto.subtle().importKey("raw",sigv4.crypto.__GT_bytes(key),({"name": "HMAC", "hash": "SHA-256"}),false,["sign"]).then((function (p1__14778_SHARP_){
return sigv4.crypto.subtle().sign("HMAC",p1__14778_SHARP_,sigv4.crypto.__GT_bytes(data));
}));
}));

(sigv4.crypto.PlatformCrypto.prototype.sigv4$protocols$ICrypto$_hex$arity$2 = (function (_,bs){
var self__ = this;
var ___$1 = this;
return sigv4.crypto.bytes__GT_hex(bs);
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(cljs.core.PersistentHashSet.EMPTY,k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new sigv4.crypto.PlatformCrypto(self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k14780){
var self__ = this;
var this__5476__auto____$1 = this;
return cljs.core.contains_QMARK_(self__.__extmap,k14780);
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__14779){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__14789 = cljs.core.keyword_identical_QMARK_;
var expr__14790 = k__5478__auto__;
return (new sigv4.crypto.PlatformCrypto(self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__14779),null));
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,self__.__extmap));
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__14779){
var self__ = this;
var this__5468__auto____$1 = this;
return (new sigv4.crypto.PlatformCrypto(G__14779,self__.__extmap,self__.__hash));
}));

(sigv4.crypto.PlatformCrypto.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(sigv4.crypto.PlatformCrypto.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(sigv4.crypto.PlatformCrypto.cljs$lang$type = true);

(sigv4.crypto.PlatformCrypto.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"sigv4.crypto/PlatformCrypto",null,(1),null));
}));

(sigv4.crypto.PlatformCrypto.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"sigv4.crypto/PlatformCrypto");
}));

/**
 * Positional factory function for sigv4.crypto/PlatformCrypto.
 */
sigv4.crypto.__GT_PlatformCrypto = (function sigv4$crypto$__GT_PlatformCrypto(){
return (new sigv4.crypto.PlatformCrypto(null,null,null));
});

/**
 * Factory function for sigv4.crypto/PlatformCrypto, taking a map of keywords to field values.
 */
sigv4.crypto.map__GT_PlatformCrypto = (function sigv4$crypto$map__GT_PlatformCrypto(G__14783){
var extmap__5511__auto__ = (function (){var G__14792 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$1(G__14783);
if(cljs.core.record_QMARK_(G__14783)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__14792);
} else {
return G__14792;
}
})();
return (new sigv4.crypto.PlatformCrypto(null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * The platform `ICrypto`. Stateless — hold one and reuse it.
 */
sigv4.crypto.crypto = (function sigv4$crypto$crypto(){
return sigv4.crypto.__GT_PlatformCrypto();
});

//# sourceMappingURL=sigv4.crypto.js.map
