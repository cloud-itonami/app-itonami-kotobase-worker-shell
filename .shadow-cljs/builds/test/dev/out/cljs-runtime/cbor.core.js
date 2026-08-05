goog.provide('cbor.core');

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
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
cbor.core.OrderedMap = (function (pairs,__meta,__extmap,__hash){
this.pairs = pairs;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(cbor.core.OrderedMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(cbor.core.OrderedMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6064,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6068 = k6064;
var G__6068__$1 = (((G__6068 instanceof cljs.core.Keyword))?G__6068.fqn:null);
switch (G__6068__$1) {
case "pairs":
return self__.pairs;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6064,else__5472__auto__);

}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6069){
var vec__6070 = p__6069;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6070,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6070,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(cbor.core.OrderedMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#cbor.core.OrderedMap{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"pairs","pairs",614609779),self__.pairs],null))], null),self__.__extmap));
}));

(cbor.core.OrderedMap.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6063){
var self__ = this;
var G__6063__$1 = this;
return (new cljs.core.RecordIter((0),G__6063__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pairs","pairs",614609779)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(cbor.core.OrderedMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(cbor.core.OrderedMap.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new cbor.core.OrderedMap(self__.pairs,self__.__meta,self__.__extmap,self__.__hash));
}));

(cbor.core.OrderedMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(cbor.core.OrderedMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (-1893276700 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6065,other6066){
var self__ = this;
var this6065__$1 = this;
return (((!((other6066 == null)))) && ((((this6065__$1.constructor === other6066.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6065__$1.pairs,other6066.pairs)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6065__$1.__extmap,other6066.__extmap)))))));
}));

(cbor.core.OrderedMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pairs","pairs",614609779),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new cbor.core.OrderedMap(self__.pairs,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6064){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6073 = k6064;
var G__6073__$1 = (((G__6073 instanceof cljs.core.Keyword))?G__6073.fqn:null);
switch (G__6073__$1) {
case "pairs":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6064);

}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6063){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6074 = cljs.core.keyword_identical_QMARK_;
var expr__6075 = k__5478__auto__;
if(cljs.core.truth_((pred__6074.cljs$core$IFn$_invoke$arity$2 ? pred__6074.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pairs","pairs",614609779),expr__6075) : pred__6074.call(null,new cljs.core.Keyword(null,"pairs","pairs",614609779),expr__6075)))){
return (new cbor.core.OrderedMap(G__6063,self__.__meta,self__.__extmap,null));
} else {
return (new cbor.core.OrderedMap(self__.pairs,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6063),null));
}
}));

(cbor.core.OrderedMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"pairs","pairs",614609779),self__.pairs,null))], null),self__.__extmap));
}));

(cbor.core.OrderedMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6063){
var self__ = this;
var this__5468__auto____$1 = this;
return (new cbor.core.OrderedMap(self__.pairs,G__6063,self__.__extmap,self__.__hash));
}));

(cbor.core.OrderedMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(cbor.core.OrderedMap.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pairs","pairs",-2039825990,null)], null);
}));

(cbor.core.OrderedMap.cljs$lang$type = true);

(cbor.core.OrderedMap.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"cbor.core/OrderedMap",null,(1),null));
}));

(cbor.core.OrderedMap.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"cbor.core/OrderedMap");
}));

/**
 * Positional factory function for cbor.core/OrderedMap.
 */
cbor.core.__GT_OrderedMap = (function cbor$core$__GT_OrderedMap(pairs){
return (new cbor.core.OrderedMap(pairs,null,null,null));
});

/**
 * Factory function for cbor.core/OrderedMap, taking a map of keywords to field values.
 */
cbor.core.map__GT_OrderedMap = (function cbor$core$map__GT_OrderedMap(G__6067){
var extmap__5511__auto__ = (function (){var G__6077 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__6067,new cljs.core.Keyword(null,"pairs","pairs",614609779));
if(cljs.core.record_QMARK_(G__6067)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6077);
} else {
return G__6077;
}
})();
return (new cbor.core.OrderedMap(new cljs.core.Keyword(null,"pairs","pairs",614609779).cljs$core$IFn$_invoke$arity$1(G__6067),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Wrap an ordered seq of [k v] pairs as a map whose key order `encode` preserves.
 */
cbor.core.ordered = (function cbor$core$ordered(pairs){
return (new cbor.core.OrderedMap(pairs,null,null,null));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
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
cbor.core.Tagged = (function (n,value,__meta,__extmap,__hash){
this.n = n;
this.value = value;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(cbor.core.Tagged.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(cbor.core.Tagged.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6079,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6083 = k6079;
var G__6083__$1 = (((G__6083 instanceof cljs.core.Keyword))?G__6083.fqn:null);
switch (G__6083__$1) {
case "n":
return self__.n;

break;
case "value":
return self__.value;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6079,else__5472__auto__);

}
}));

(cbor.core.Tagged.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6084){
var vec__6085 = p__6084;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6085,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6085,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(cbor.core.Tagged.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#cbor.core.Tagged{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"n","n",562130025),self__.n],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"value","value",305978217),self__.value],null))], null),self__.__extmap));
}));

(cbor.core.Tagged.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6078){
var self__ = this;
var G__6078__$1 = this;
return (new cljs.core.RecordIter((0),G__6078__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Keyword(null,"value","value",305978217)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(cbor.core.Tagged.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(cbor.core.Tagged.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new cbor.core.Tagged(self__.n,self__.value,self__.__meta,self__.__extmap,self__.__hash));
}));

(cbor.core.Tagged.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(cbor.core.Tagged.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (932294375 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(cbor.core.Tagged.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6080,other6081){
var self__ = this;
var this6080__$1 = this;
return (((!((other6081 == null)))) && ((((this6080__$1.constructor === other6081.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6080__$1.n,other6081.n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6080__$1.value,other6081.value)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6080__$1.__extmap,other6081.__extmap)))))))));
}));

(cbor.core.Tagged.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"n","n",562130025),null,new cljs.core.Keyword(null,"value","value",305978217),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new cbor.core.Tagged(self__.n,self__.value,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(cbor.core.Tagged.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6079){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6088 = k6079;
var G__6088__$1 = (((G__6088 instanceof cljs.core.Keyword))?G__6088.fqn:null);
switch (G__6088__$1) {
case "n":
case "value":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6079);

}
}));

(cbor.core.Tagged.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6078){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6089 = cljs.core.keyword_identical_QMARK_;
var expr__6090 = k__5478__auto__;
if(cljs.core.truth_((pred__6089.cljs$core$IFn$_invoke$arity$2 ? pred__6089.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"n","n",562130025),expr__6090) : pred__6089.call(null,new cljs.core.Keyword(null,"n","n",562130025),expr__6090)))){
return (new cbor.core.Tagged(G__6078,self__.value,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6089.cljs$core$IFn$_invoke$arity$2 ? pred__6089.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217),expr__6090) : pred__6089.call(null,new cljs.core.Keyword(null,"value","value",305978217),expr__6090)))){
return (new cbor.core.Tagged(self__.n,G__6078,self__.__meta,self__.__extmap,null));
} else {
return (new cbor.core.Tagged(self__.n,self__.value,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6078),null));
}
}
}));

(cbor.core.Tagged.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"n","n",562130025),self__.n,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"value","value",305978217),self__.value,null))], null),self__.__extmap));
}));

(cbor.core.Tagged.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6078){
var self__ = this;
var this__5468__auto____$1 = this;
return (new cbor.core.Tagged(self__.n,self__.value,G__6078,self__.__extmap,self__.__hash));
}));

(cbor.core.Tagged.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(cbor.core.Tagged.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"n","n",-2092305744,null),new cljs.core.Symbol(null,"value","value",1946509744,null)], null);
}));

(cbor.core.Tagged.cljs$lang$type = true);

(cbor.core.Tagged.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"cbor.core/Tagged",null,(1),null));
}));

(cbor.core.Tagged.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"cbor.core/Tagged");
}));

/**
 * Positional factory function for cbor.core/Tagged.
 */
cbor.core.__GT_Tagged = (function cbor$core$__GT_Tagged(n,value){
return (new cbor.core.Tagged(n,value,null,null,null));
});

/**
 * Factory function for cbor.core/Tagged, taking a map of keywords to field values.
 */
cbor.core.map__GT_Tagged = (function cbor$core$map__GT_Tagged(G__6082){
var extmap__5511__auto__ = (function (){var G__6092 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6082,new cljs.core.Keyword(null,"n","n",562130025),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"value","value",305978217)], 0));
if(cljs.core.record_QMARK_(G__6082)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6092);
} else {
return G__6092;
}
})();
return (new cbor.core.Tagged(new cljs.core.Keyword(null,"n","n",562130025).cljs$core$IFn$_invoke$arity$1(G__6082),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(G__6082),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Wrap `value` in CBOR tag `n` (major type 6). `n` is a non-negative integer.
 */
cbor.core.tagged = (function cbor$core$tagged(n,value){
return (new cbor.core.Tagged(n,value,null,null,null));
});
cbor.core.tagged_QMARK_ = (function cbor$core$tagged_QMARK_(x){
return (x instanceof cbor.core.Tagged);
});
cbor.core.tag_number = (function cbor$core$tag_number(t){
return new cljs.core.Keyword(null,"n","n",562130025).cljs$core$IFn$_invoke$arity$1(t);
});
cbor.core.tag_value = (function cbor$core$tag_value(t){
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(t);
});
cbor.core.new_out = (function cbor$core$new_out(){
return [];
});
cbor.core.write_byte_BANG_ = (function cbor$core$write_byte_BANG_(o,b){
return o.push((b & (255)));
});
cbor.core.write_bytes_BANG_ = (function cbor$core$write_bytes_BANG_(o,bs){
var seq__6093 = cljs.core.seq(cljs.core.seq(bs));
var chunk__6094 = null;
var count__6095 = (0);
var i__6096 = (0);
while(true){
if((i__6096 < count__6095)){
var b = chunk__6094.cljs$core$IIndexed$_nth$arity$2(null,i__6096);
o.push(((b | 0) & (255)));


var G__6143 = seq__6093;
var G__6144 = chunk__6094;
var G__6145 = count__6095;
var G__6146 = (i__6096 + (1));
seq__6093 = G__6143;
chunk__6094 = G__6144;
count__6095 = G__6145;
i__6096 = G__6146;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6093);
if(temp__5825__auto__){
var seq__6093__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6093__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6093__$1);
var G__6147 = cljs.core.chunk_rest(seq__6093__$1);
var G__6148 = c__5694__auto__;
var G__6149 = cljs.core.count(c__5694__auto__);
var G__6150 = (0);
seq__6093 = G__6147;
chunk__6094 = G__6148;
count__6095 = G__6149;
i__6096 = G__6150;
continue;
} else {
var b = cljs.core.first(seq__6093__$1);
o.push(((b | 0) & (255)));


var G__6151 = cljs.core.next(seq__6093__$1);
var G__6152 = null;
var G__6153 = (0);
var G__6154 = (0);
seq__6093 = G__6151;
chunk__6094 = G__6152;
count__6095 = G__6153;
i__6096 = G__6154;
continue;
}
} else {
return null;
}
}
break;
}
});
cbor.core.out__GT_bytes = (function cbor$core$out__GT_bytes(o){
return (new Uint8Array(o));
});
cbor.core.new_in = (function cbor$core$new_in(b){
return cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),b,new cljs.core.Keyword(null,"pos","pos",-864607220),(0)], null));
});
cbor.core.read_byte_BANG_ = (function cbor$core$read_byte_BANG_(in$){
var map__6097 = cljs.core.deref(in$);
var map__6097__$1 = cljs.core.__destructure_map(map__6097);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6097__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6097__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
if((pos < data.length)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(in$,cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",-864607220),(pos + (1)));

return ((data[pos]) & (255));
} else {
return (-1);
}
});
cbor.core.read_bytes_BANG_ = (function cbor$core$read_bytes_BANG_(in$,n){
var map__6098 = cljs.core.deref(in$);
var map__6098__$1 = cljs.core.__destructure_map(map__6098);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6098__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6098__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var out = data.slice(pos,(pos + n));
if((out.length < n)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: unexpected end of input",cljs.core.PersistentArrayMap.EMPTY);
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(in$,cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",-864607220),(pos + n));

return out;
});
cbor.core.bytes__GT_str = (function cbor$core$bytes__GT_str(b){
return (new TextDecoder()).decode(b);
});
cbor.core.str__GT_bytes = (function cbor$core$str__GT_bytes(s){
return (new TextEncoder()).encode(s);
});
cbor.core.byte_at = (function cbor$core$byte_at(n,s){
return cljs.core.mod(Math.floor((n / Math.pow((2),s))),(256));
});
cbor.core.write_head = (function cbor$core$write_head(o,major,n){
var mt = (major << (5));
if((n < (24))){
return cbor.core.write_byte_BANG_(o,(mt | n));
} else {
if((n < (256))){
cbor.core.write_byte_BANG_(o,(mt | (24)));

return cbor.core.write_byte_BANG_(o,n);
} else {
if((n < (65536))){
cbor.core.write_byte_BANG_(o,(mt | (25)));

cbor.core.write_byte_BANG_(o,((n >> (8)) & (255)));

return cbor.core.write_byte_BANG_(o,(n & (255)));
} else {
if((n < (4294967296))){
cbor.core.write_byte_BANG_(o,(mt | (26)));

var seq__6099 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(24),(16),(8),(0)], null));
var chunk__6100 = null;
var count__6101 = (0);
var i__6102 = (0);
while(true){
if((i__6102 < count__6101)){
var s = chunk__6100.cljs$core$IIndexed$_nth$arity$2(null,i__6102);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6155 = seq__6099;
var G__6156 = chunk__6100;
var G__6157 = count__6101;
var G__6158 = (i__6102 + (1));
seq__6099 = G__6155;
chunk__6100 = G__6156;
count__6101 = G__6157;
i__6102 = G__6158;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6099);
if(temp__5825__auto__){
var seq__6099__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6099__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6099__$1);
var G__6159 = cljs.core.chunk_rest(seq__6099__$1);
var G__6160 = c__5694__auto__;
var G__6161 = cljs.core.count(c__5694__auto__);
var G__6162 = (0);
seq__6099 = G__6159;
chunk__6100 = G__6160;
count__6101 = G__6161;
i__6102 = G__6162;
continue;
} else {
var s = cljs.core.first(seq__6099__$1);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6163 = cljs.core.next(seq__6099__$1);
var G__6164 = null;
var G__6165 = (0);
var G__6166 = (0);
seq__6099 = G__6163;
chunk__6100 = G__6164;
count__6101 = G__6165;
i__6102 = G__6166;
continue;
}
} else {
return null;
}
}
break;
}
} else {
cbor.core.write_byte_BANG_(o,(mt | (27)));

var seq__6103 = cljs.core.seq(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [(56),(48),(40),(32),(24),(16),(8),(0)], null));
var chunk__6104 = null;
var count__6105 = (0);
var i__6106 = (0);
while(true){
if((i__6106 < count__6105)){
var s = chunk__6104.cljs$core$IIndexed$_nth$arity$2(null,i__6106);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6167 = seq__6103;
var G__6168 = chunk__6104;
var G__6169 = count__6105;
var G__6170 = (i__6106 + (1));
seq__6103 = G__6167;
chunk__6104 = G__6168;
count__6105 = G__6169;
i__6106 = G__6170;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6103);
if(temp__5825__auto__){
var seq__6103__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6103__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6103__$1);
var G__6171 = cljs.core.chunk_rest(seq__6103__$1);
var G__6172 = c__5694__auto__;
var G__6173 = cljs.core.count(c__5694__auto__);
var G__6174 = (0);
seq__6103 = G__6171;
chunk__6104 = G__6172;
count__6105 = G__6173;
i__6106 = G__6174;
continue;
} else {
var s = cljs.core.first(seq__6103__$1);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6175 = cljs.core.next(seq__6103__$1);
var G__6176 = null;
var G__6177 = (0);
var G__6178 = (0);
seq__6103 = G__6175;
chunk__6104 = G__6176;
count__6105 = G__6177;
i__6106 = G__6178;
continue;
}
} else {
return null;
}
}
break;
}

}
}
}
}
});
cbor.core.key_bytes = (function cbor$core$key_bytes(k){
return cbor.core.str__GT_bytes(((typeof k === 'string')?k:(((k instanceof cljs.core.Keyword))?cljs.core.name(k):(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k))
)));
});
cbor.core.encoded_byte_count = (function cbor$core$encoded_byte_count(b){
return b.length;
});
cbor.core.unsigned_key_byte = (function cbor$core$unsigned_key_byte(b,i){
return ((b[i]) & (255));
});
cbor.core.dag_cbor_key_LT_ = (function cbor$core$dag_cbor_key_LT_(a,b){
var ka = cbor.core.key_bytes(a);
var kb = cbor.core.key_bytes(b);
var la = cbor.core.encoded_byte_count(ka);
var lb = cbor.core.encoded_byte_count(kb);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(la,lb)){
return (la < lb);
} else {
var i = (0);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,la)){
return false;
} else {
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cbor.core.unsigned_key_byte(ka,i),cbor.core.unsigned_key_byte(kb,i))){
return (cbor.core.unsigned_key_byte(ka,i) < cbor.core.unsigned_key_byte(kb,i));
} else {
var G__6179 = (i + (1));
i = G__6179;
continue;

}
}
break;
}
}
});
cbor.core.encode_pairs = (function cbor$core$encode_pairs(o,pairs){
cbor.core.write_head(o,(5),cljs.core.count(pairs));

var seq__6107 = cljs.core.seq(pairs);
var chunk__6108 = null;
var count__6109 = (0);
var i__6110 = (0);
while(true){
if((i__6110 < count__6109)){
var vec__6121 = chunk__6108.cljs$core$IIndexed$_nth$arity$2(null,i__6110);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6121,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6121,(1),null);
var G__6124_6180 = o;
var G__6125_6181 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):k);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__6124_6180,G__6125_6181) : cbor.core.encode_into.call(null,G__6124_6180,G__6125_6181));

(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,v) : cbor.core.encode_into.call(null,o,v));


var G__6182 = seq__6107;
var G__6183 = chunk__6108;
var G__6184 = count__6109;
var G__6185 = (i__6110 + (1));
seq__6107 = G__6182;
chunk__6108 = G__6183;
count__6109 = G__6184;
i__6110 = G__6185;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6107);
if(temp__5825__auto__){
var seq__6107__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6107__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6107__$1);
var G__6186 = cljs.core.chunk_rest(seq__6107__$1);
var G__6187 = c__5694__auto__;
var G__6188 = cljs.core.count(c__5694__auto__);
var G__6189 = (0);
seq__6107 = G__6186;
chunk__6108 = G__6187;
count__6109 = G__6188;
i__6110 = G__6189;
continue;
} else {
var vec__6126 = cljs.core.first(seq__6107__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6126,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6126,(1),null);
var G__6129_6190 = o;
var G__6130_6191 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):k);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__6129_6190,G__6130_6191) : cbor.core.encode_into.call(null,G__6129_6190,G__6130_6191));

(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,v) : cbor.core.encode_into.call(null,o,v));


var G__6192 = cljs.core.next(seq__6107__$1);
var G__6193 = null;
var G__6194 = (0);
var G__6195 = (0);
seq__6107 = G__6192;
chunk__6108 = G__6193;
count__6109 = G__6194;
i__6110 = G__6195;
continue;
}
} else {
return null;
}
}
break;
}
});
cbor.core.bytes_like_QMARK_ = (function cbor$core$bytes_like_QMARK_(x){
return (((x instanceof Uint8Array)) || ((x instanceof Int8Array)));
});
cbor.core.encode_into = (function cbor$core$encode_into(o,x){
if((x == null)){
return cbor.core.write_byte_BANG_(o,(246));
} else {
if(x === true){
return cbor.core.write_byte_BANG_(o,(245));
} else {
if(x === false){
return cbor.core.write_byte_BANG_(o,(244));
} else {
if(cljs.core.integer_QMARK_(x)){
if((x < (0))){
return cbor.core.write_head(o,(1),((- x) - (1)));
} else {
return cbor.core.write_head(o,(0),x);
}
} else {
if(typeof x === 'string'){
var b = cbor.core.str__GT_bytes(x);
cbor.core.write_head(o,(3),cbor.core.encoded_byte_count(b));

return cbor.core.write_bytes_BANG_(o,b);
} else {
if((x instanceof cljs.core.Keyword)){
var b = cbor.core.str__GT_bytes(cljs.core.name(x));
cbor.core.write_head(o,(3),cbor.core.encoded_byte_count(b));

return cbor.core.write_bytes_BANG_(o,b);
} else {
if(cbor.core.bytes_like_QMARK_(x)){
cbor.core.write_head(o,(2),cbor.core.encoded_byte_count(x));

return cbor.core.write_bytes_BANG_(o,x);
} else {
if((x instanceof cbor.core.Tagged)){
cbor.core.write_head(o,(6),cbor.core.tag_number(x));

var G__6131 = o;
var G__6132 = cbor.core.tag_value(x);
return (cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__6131,G__6132) : cbor.core.encode_into.call(null,G__6131,G__6132));
} else {
if((x instanceof cbor.core.OrderedMap)){
return cbor.core.encode_pairs(o,x.pairs);
} else {
if(cljs.core.map_QMARK_(x)){
return cbor.core.encode_pairs(o,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.key,cbor.core.dag_cbor_key_LT_,cljs.core.seq(x)));
} else {
if(cljs.core.sequential_QMARK_(x)){
cbor.core.write_head(o,(4),cljs.core.count(x));

var seq__6133 = cljs.core.seq(x);
var chunk__6134 = null;
var count__6135 = (0);
var i__6136 = (0);
while(true){
if((i__6136 < count__6135)){
var e = chunk__6134.cljs$core$IIndexed$_nth$arity$2(null,i__6136);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,e) : cbor.core.encode_into.call(null,o,e));


var G__6196 = seq__6133;
var G__6197 = chunk__6134;
var G__6198 = count__6135;
var G__6199 = (i__6136 + (1));
seq__6133 = G__6196;
chunk__6134 = G__6197;
count__6135 = G__6198;
i__6136 = G__6199;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6133);
if(temp__5825__auto__){
var seq__6133__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6133__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6133__$1);
var G__6200 = cljs.core.chunk_rest(seq__6133__$1);
var G__6201 = c__5694__auto__;
var G__6202 = cljs.core.count(c__5694__auto__);
var G__6203 = (0);
seq__6133 = G__6200;
chunk__6134 = G__6201;
count__6135 = G__6202;
i__6136 = G__6203;
continue;
} else {
var e = cljs.core.first(seq__6133__$1);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,e) : cbor.core.encode_into.call(null,o,e));


var G__6204 = cljs.core.next(seq__6133__$1);
var G__6205 = null;
var G__6206 = (0);
var G__6207 = (0);
seq__6133 = G__6204;
chunk__6134 = G__6205;
count__6135 = G__6206;
i__6136 = G__6207;
continue;
}
} else {
return null;
}
}
break;
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: unsupported type",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(x),new cljs.core.Keyword(null,"value","value",305978217),x], null));

}
}
}
}
}
}
}
}
}
}
}
});
/**
 * Deterministic CBOR bytes for Clojure data. Map keys are sorted dag-cbor style.
 */
cbor.core.encode = (function cbor$core$encode(x){
var o = cbor.core.new_out();
cbor.core.encode_into(o,x);

return cbor.core.out__GT_bytes(o);
});
/**
 * CBOR-encode a MAP given as an ordered seq of [k v] pairs — keys emitted in the
 * given order (NOT sorted). For CAIP-122 CACAO and other order-sensitive formats.
 */
cbor.core.encode_ordered = (function cbor$core$encode_ordered(pairs){
var o = cbor.core.new_out();
cbor.core.encode_pairs(o,pairs);

return cbor.core.out__GT_bytes(o);
});
cbor.core.read_n = (function cbor$core$read_n(in$,cnt){
var i = (0);
var acc = (0);
while(true){
if((i < cnt)){
var G__6208 = (i + (1));
var G__6209 = ((acc * (256)) + cbor.core.read_byte_BANG_(in$));
i = G__6208;
acc = G__6209;
continue;
} else {
return acc;
}
break;
}
});
cbor.core.read_arg = (function cbor$core$read_arg(in$,info){
if((info < (24))){
return info;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(info,(24))){
return cbor.core.read_byte_BANG_(in$);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(info,(25))){
return cbor.core.read_n(in$,(2));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(info,(26))){
return cbor.core.read_n(in$,(4));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(info,(27))){
return cbor.core.read_n(in$,(8));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: indefinite/reserved length unsupported",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",-317069002),info], null));

}
}
}
}
}
});
cbor.core.decode_from = (function cbor$core$decode_from(in$){
var ib = cbor.core.read_byte_BANG_(in$);
if((ib < (0))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: unexpected end of input",cljs.core.PersistentArrayMap.EMPTY);
} else {
}

var major = (ib >> (5));
var info = (ib & (31));
var G__6137 = (major | 0);
switch (G__6137) {
case (0):
return cbor.core.read_arg(in$,info);

break;
case (1):
return ((- cbor.core.read_arg(in$,info)) - (1));

break;
case (2):
return cbor.core.read_bytes_BANG_(in$,cbor.core.read_arg(in$,info));

break;
case (3):
return cbor.core.bytes__GT_str(cbor.core.read_bytes_BANG_(in$,cbor.core.read_arg(in$,info)));

break;
case (4):
return cljs.core.vec(cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$2(cbor.core.read_arg(in$,info),(function (){
return (cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1 ? cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1(in$) : cbor.core.decode_from.call(null,in$));
})));

break;
case (5):
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$2(cbor.core.read_arg(in$,info),(function (){
var k = (cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1 ? cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1(in$) : cbor.core.decode_from.call(null,in$));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1 ? cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1(in$) : cbor.core.decode_from.call(null,in$))], null);
})));

break;
case (6):
return (new cbor.core.Tagged(cbor.core.read_arg(in$,info),(cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1 ? cbor.core.decode_from.cljs$core$IFn$_invoke$arity$1(in$) : cbor.core.decode_from.call(null,in$)),null,null,null));

break;
case (7):
var G__6138 = (info | 0);
switch (G__6138) {
case (20):
return false;

break;
case (21):
return true;

break;
case (22):
return null;

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: unsupported simple/float",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",-317069002),info], null));

}

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: unsupported major type",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"major","major",-27376078),major], null));

}
});
/**
 * Decode CBOR bytes → Clojure data. Maps → {}, arrays → [], text → String,
 * byte-strings → bytes (byte-array on :clj, Uint8Array on :cljs), ints →
 * Long/number, true/false/null.
 */
cbor.core.decode = (function cbor$core$decode(b){
return cbor.core.decode_from(cbor.core.new_in(b));
});

//# sourceMappingURL=cbor.core.js.map
