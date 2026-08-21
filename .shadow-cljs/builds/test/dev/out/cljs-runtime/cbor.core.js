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

(cbor.core.OrderedMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6209,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6213 = k6209;
var G__6213__$1 = (((G__6213 instanceof cljs.core.Keyword))?G__6213.fqn:null);
switch (G__6213__$1) {
case "pairs":
return self__.pairs;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6209,else__5472__auto__);

}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6214){
var vec__6215 = p__6214;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6215,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6215,(1),null);
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

(cbor.core.OrderedMap.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6208){
var self__ = this;
var G__6208__$1 = this;
return (new cljs.core.RecordIter((0),G__6208__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pairs","pairs",614609779)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(cbor.core.OrderedMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6210,other6211){
var self__ = this;
var this6210__$1 = this;
return (((!((other6211 == null)))) && ((((this6210__$1.constructor === other6211.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6210__$1.pairs,other6211.pairs)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6210__$1.__extmap,other6211.__extmap)))))));
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

(cbor.core.OrderedMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6209){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6218 = k6209;
var G__6218__$1 = (((G__6218 instanceof cljs.core.Keyword))?G__6218.fqn:null);
switch (G__6218__$1) {
case "pairs":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6209);

}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6208){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6219 = cljs.core.keyword_identical_QMARK_;
var expr__6220 = k__5478__auto__;
if(cljs.core.truth_((pred__6219.cljs$core$IFn$_invoke$arity$2 ? pred__6219.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pairs","pairs",614609779),expr__6220) : pred__6219.call(null,new cljs.core.Keyword(null,"pairs","pairs",614609779),expr__6220)))){
return (new cbor.core.OrderedMap(G__6208,self__.__meta,self__.__extmap,null));
} else {
return (new cbor.core.OrderedMap(self__.pairs,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6208),null));
}
}));

(cbor.core.OrderedMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"pairs","pairs",614609779),self__.pairs,null))], null),self__.__extmap));
}));

(cbor.core.OrderedMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6208){
var self__ = this;
var this__5468__auto____$1 = this;
return (new cbor.core.OrderedMap(self__.pairs,G__6208,self__.__extmap,self__.__hash));
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
cbor.core.map__GT_OrderedMap = (function cbor$core$map__GT_OrderedMap(G__6212){
var extmap__5511__auto__ = (function (){var G__6222 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__6212,new cljs.core.Keyword(null,"pairs","pairs",614609779));
if(cljs.core.record_QMARK_(G__6212)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6222);
} else {
return G__6222;
}
})();
return (new cbor.core.OrderedMap(new cljs.core.Keyword(null,"pairs","pairs",614609779).cljs$core$IFn$_invoke$arity$1(G__6212),null,cljs.core.not_empty(extmap__5511__auto__),null));
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

(cbor.core.Tagged.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6224,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6228 = k6224;
var G__6228__$1 = (((G__6228 instanceof cljs.core.Keyword))?G__6228.fqn:null);
switch (G__6228__$1) {
case "n":
return self__.n;

break;
case "value":
return self__.value;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6224,else__5472__auto__);

}
}));

(cbor.core.Tagged.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6229){
var vec__6230 = p__6229;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6230,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6230,(1),null);
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

(cbor.core.Tagged.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6223){
var self__ = this;
var G__6223__$1 = this;
return (new cljs.core.RecordIter((0),G__6223__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Keyword(null,"value","value",305978217)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(cbor.core.Tagged.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6225,other6226){
var self__ = this;
var this6225__$1 = this;
return (((!((other6226 == null)))) && ((((this6225__$1.constructor === other6226.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6225__$1.n,other6226.n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6225__$1.value,other6226.value)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6225__$1.__extmap,other6226.__extmap)))))))));
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

(cbor.core.Tagged.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6224){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6233 = k6224;
var G__6233__$1 = (((G__6233 instanceof cljs.core.Keyword))?G__6233.fqn:null);
switch (G__6233__$1) {
case "n":
case "value":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6224);

}
}));

(cbor.core.Tagged.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6223){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6234 = cljs.core.keyword_identical_QMARK_;
var expr__6235 = k__5478__auto__;
if(cljs.core.truth_((pred__6234.cljs$core$IFn$_invoke$arity$2 ? pred__6234.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"n","n",562130025),expr__6235) : pred__6234.call(null,new cljs.core.Keyword(null,"n","n",562130025),expr__6235)))){
return (new cbor.core.Tagged(G__6223,self__.value,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6234.cljs$core$IFn$_invoke$arity$2 ? pred__6234.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217),expr__6235) : pred__6234.call(null,new cljs.core.Keyword(null,"value","value",305978217),expr__6235)))){
return (new cbor.core.Tagged(self__.n,G__6223,self__.__meta,self__.__extmap,null));
} else {
return (new cbor.core.Tagged(self__.n,self__.value,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6223),null));
}
}
}));

(cbor.core.Tagged.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"n","n",562130025),self__.n,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"value","value",305978217),self__.value,null))], null),self__.__extmap));
}));

(cbor.core.Tagged.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6223){
var self__ = this;
var this__5468__auto____$1 = this;
return (new cbor.core.Tagged(self__.n,self__.value,G__6223,self__.__extmap,self__.__hash));
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
cbor.core.map__GT_Tagged = (function cbor$core$map__GT_Tagged(G__6227){
var extmap__5511__auto__ = (function (){var G__6237 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6227,new cljs.core.Keyword(null,"n","n",562130025),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"value","value",305978217)], 0));
if(cljs.core.record_QMARK_(G__6227)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6237);
} else {
return G__6237;
}
})();
return (new cbor.core.Tagged(new cljs.core.Keyword(null,"n","n",562130025).cljs$core$IFn$_invoke$arity$1(G__6227),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(G__6227),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
var seq__6238 = cljs.core.seq(cljs.core.seq(bs));
var chunk__6239 = null;
var count__6240 = (0);
var i__6241 = (0);
while(true){
if((i__6241 < count__6240)){
var b = chunk__6239.cljs$core$IIndexed$_nth$arity$2(null,i__6241);
o.push(((b | 0) & (255)));


var G__6288 = seq__6238;
var G__6289 = chunk__6239;
var G__6290 = count__6240;
var G__6291 = (i__6241 + (1));
seq__6238 = G__6288;
chunk__6239 = G__6289;
count__6240 = G__6290;
i__6241 = G__6291;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6238);
if(temp__5825__auto__){
var seq__6238__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6238__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6238__$1);
var G__6292 = cljs.core.chunk_rest(seq__6238__$1);
var G__6293 = c__5694__auto__;
var G__6294 = cljs.core.count(c__5694__auto__);
var G__6295 = (0);
seq__6238 = G__6292;
chunk__6239 = G__6293;
count__6240 = G__6294;
i__6241 = G__6295;
continue;
} else {
var b = cljs.core.first(seq__6238__$1);
o.push(((b | 0) & (255)));


var G__6296 = cljs.core.next(seq__6238__$1);
var G__6297 = null;
var G__6298 = (0);
var G__6299 = (0);
seq__6238 = G__6296;
chunk__6239 = G__6297;
count__6240 = G__6298;
i__6241 = G__6299;
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
var map__6242 = cljs.core.deref(in$);
var map__6242__$1 = cljs.core.__destructure_map(map__6242);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6242__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6242__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
if((pos < data.length)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(in$,cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",-864607220),(pos + (1)));

return ((data[pos]) & (255));
} else {
return (-1);
}
});
cbor.core.read_bytes_BANG_ = (function cbor$core$read_bytes_BANG_(in$,n){
var map__6243 = cljs.core.deref(in$);
var map__6243__$1 = cljs.core.__destructure_map(map__6243);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6243__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6243__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
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
cbor.core.finite_number_QMARK_ = (function cbor$core$finite_number_QMARK_(x){
var and__5160__auto__ = typeof x === 'number';
if(and__5160__auto__){
return Number.isFinite(x);
} else {
return and__5160__auto__;
}
});
cbor.core.float64_bytes = (function cbor$core$float64_bytes(x){
var buffer = (new ArrayBuffer((8)));
(new DataView(buffer)).setFloat64((0),x,false);

return (new Uint8Array(buffer));
});
cbor.core.bytes__GT_float64 = (function cbor$core$bytes__GT_float64(bytes){
return (new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength)).getFloat64((0),false);
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

var seq__6244 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(24),(16),(8),(0)], null));
var chunk__6245 = null;
var count__6246 = (0);
var i__6247 = (0);
while(true){
if((i__6247 < count__6246)){
var s = chunk__6245.cljs$core$IIndexed$_nth$arity$2(null,i__6247);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6300 = seq__6244;
var G__6301 = chunk__6245;
var G__6302 = count__6246;
var G__6303 = (i__6247 + (1));
seq__6244 = G__6300;
chunk__6245 = G__6301;
count__6246 = G__6302;
i__6247 = G__6303;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6244);
if(temp__5825__auto__){
var seq__6244__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6244__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6244__$1);
var G__6304 = cljs.core.chunk_rest(seq__6244__$1);
var G__6305 = c__5694__auto__;
var G__6306 = cljs.core.count(c__5694__auto__);
var G__6307 = (0);
seq__6244 = G__6304;
chunk__6245 = G__6305;
count__6246 = G__6306;
i__6247 = G__6307;
continue;
} else {
var s = cljs.core.first(seq__6244__$1);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6308 = cljs.core.next(seq__6244__$1);
var G__6309 = null;
var G__6310 = (0);
var G__6311 = (0);
seq__6244 = G__6308;
chunk__6245 = G__6309;
count__6246 = G__6310;
i__6247 = G__6311;
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

var seq__6248 = cljs.core.seq(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [(56),(48),(40),(32),(24),(16),(8),(0)], null));
var chunk__6249 = null;
var count__6250 = (0);
var i__6251 = (0);
while(true){
if((i__6251 < count__6250)){
var s = chunk__6249.cljs$core$IIndexed$_nth$arity$2(null,i__6251);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6312 = seq__6248;
var G__6313 = chunk__6249;
var G__6314 = count__6250;
var G__6315 = (i__6251 + (1));
seq__6248 = G__6312;
chunk__6249 = G__6313;
count__6250 = G__6314;
i__6251 = G__6315;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6248);
if(temp__5825__auto__){
var seq__6248__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6248__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6248__$1);
var G__6316 = cljs.core.chunk_rest(seq__6248__$1);
var G__6317 = c__5694__auto__;
var G__6318 = cljs.core.count(c__5694__auto__);
var G__6319 = (0);
seq__6248 = G__6316;
chunk__6249 = G__6317;
count__6250 = G__6318;
i__6251 = G__6319;
continue;
} else {
var s = cljs.core.first(seq__6248__$1);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__6320 = cljs.core.next(seq__6248__$1);
var G__6321 = null;
var G__6322 = (0);
var G__6323 = (0);
seq__6248 = G__6320;
chunk__6249 = G__6321;
count__6250 = G__6322;
i__6251 = G__6323;
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
var G__6324 = (i + (1));
i = G__6324;
continue;

}
}
break;
}
}
});
cbor.core.encode_pairs = (function cbor$core$encode_pairs(o,pairs){
cbor.core.write_head(o,(5),cljs.core.count(pairs));

var seq__6252 = cljs.core.seq(pairs);
var chunk__6253 = null;
var count__6254 = (0);
var i__6255 = (0);
while(true){
if((i__6255 < count__6254)){
var vec__6266 = chunk__6253.cljs$core$IIndexed$_nth$arity$2(null,i__6255);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6266,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6266,(1),null);
var G__6269_6325 = o;
var G__6270_6326 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):k);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__6269_6325,G__6270_6326) : cbor.core.encode_into.call(null,G__6269_6325,G__6270_6326));

(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,v) : cbor.core.encode_into.call(null,o,v));


var G__6327 = seq__6252;
var G__6328 = chunk__6253;
var G__6329 = count__6254;
var G__6330 = (i__6255 + (1));
seq__6252 = G__6327;
chunk__6253 = G__6328;
count__6254 = G__6329;
i__6255 = G__6330;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6252);
if(temp__5825__auto__){
var seq__6252__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6252__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6252__$1);
var G__6331 = cljs.core.chunk_rest(seq__6252__$1);
var G__6332 = c__5694__auto__;
var G__6333 = cljs.core.count(c__5694__auto__);
var G__6334 = (0);
seq__6252 = G__6331;
chunk__6253 = G__6332;
count__6254 = G__6333;
i__6255 = G__6334;
continue;
} else {
var vec__6271 = cljs.core.first(seq__6252__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6271,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6271,(1),null);
var G__6274_6335 = o;
var G__6275_6336 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):k);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__6274_6335,G__6275_6336) : cbor.core.encode_into.call(null,G__6274_6335,G__6275_6336));

(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,v) : cbor.core.encode_into.call(null,o,v));


var G__6337 = cljs.core.next(seq__6252__$1);
var G__6338 = null;
var G__6339 = (0);
var G__6340 = (0);
seq__6252 = G__6337;
chunk__6253 = G__6338;
count__6254 = G__6339;
i__6255 = G__6340;
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
if(typeof x === 'number'){
if(cljs.core.truth_(cbor.core.finite_number_QMARK_(x))){
cbor.core.write_byte_BANG_(o,(251));

return cbor.core.write_bytes_BANG_(o,cbor.core.float64_bytes(x));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: non-finite float unsupported",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),x], null));
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

var G__6276 = o;
var G__6277 = cbor.core.tag_value(x);
return (cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__6276,G__6277) : cbor.core.encode_into.call(null,G__6276,G__6277));
} else {
if((x instanceof cbor.core.OrderedMap)){
return cbor.core.encode_pairs(o,x.pairs);
} else {
if(cljs.core.map_QMARK_(x)){
return cbor.core.encode_pairs(o,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.key,cbor.core.dag_cbor_key_LT_,cljs.core.seq(x)));
} else {
if(cljs.core.sequential_QMARK_(x)){
cbor.core.write_head(o,(4),cljs.core.count(x));

var seq__6278 = cljs.core.seq(x);
var chunk__6279 = null;
var count__6280 = (0);
var i__6281 = (0);
while(true){
if((i__6281 < count__6280)){
var e = chunk__6279.cljs$core$IIndexed$_nth$arity$2(null,i__6281);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,e) : cbor.core.encode_into.call(null,o,e));


var G__6341 = seq__6278;
var G__6342 = chunk__6279;
var G__6343 = count__6280;
var G__6344 = (i__6281 + (1));
seq__6278 = G__6341;
chunk__6279 = G__6342;
count__6280 = G__6343;
i__6281 = G__6344;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__6278);
if(temp__5825__auto__){
var seq__6278__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6278__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__6278__$1);
var G__6345 = cljs.core.chunk_rest(seq__6278__$1);
var G__6346 = c__5694__auto__;
var G__6347 = cljs.core.count(c__5694__auto__);
var G__6348 = (0);
seq__6278 = G__6345;
chunk__6279 = G__6346;
count__6280 = G__6347;
i__6281 = G__6348;
continue;
} else {
var e = cljs.core.first(seq__6278__$1);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,e) : cbor.core.encode_into.call(null,o,e));


var G__6349 = cljs.core.next(seq__6278__$1);
var G__6350 = null;
var G__6351 = (0);
var G__6352 = (0);
seq__6278 = G__6349;
chunk__6279 = G__6350;
count__6280 = G__6351;
i__6281 = G__6352;
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
var G__6353 = (i + (1));
var G__6354 = ((acc * (256)) + cbor.core.read_byte_BANG_(in$));
i = G__6353;
acc = G__6354;
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
var G__6282 = (major | 0);
switch (G__6282) {
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
var G__6283 = (info | 0);
switch (G__6283) {
case (20):
return false;

break;
case (21):
return true;

break;
case (22):
return null;

break;
case (27):
var value = cbor.core.bytes__GT_float64(cbor.core.read_bytes_BANG_(in$,(8)));
if(cljs.core.truth_(cbor.core.finite_number_QMARK_(value))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: non-finite float unsupported",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),value], null));
}

return value;

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
 * Decode exactly one CBOR value. Maps → {}, arrays → [], text → String,
 * byte-strings → bytes (byte-array on :clj, Uint8Array on :cljs), ints and
 * finite float64 → numbers, true/false/null. Trailing bytes are rejected.
 */
cbor.core.decode = (function cbor$core$decode(b){
var in$ = cbor.core.new_in(b);
var value = cbor.core.decode_from(in$);
if((cbor.core.read_byte_BANG_(in$) < (0))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cbor: trailing bytes after top-level value",cljs.core.PersistentArrayMap.EMPTY);
}

return value;
});

//# sourceMappingURL=cbor.core.js.map
