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

(cbor.core.OrderedMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11135,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11139 = k11135;
var G__11139__$1 = (((G__11139 instanceof cljs.core.Keyword))?G__11139.fqn:null);
switch (G__11139__$1) {
case "pairs":
return self__.pairs;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11135,else__5472__auto__);

}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11140){
var vec__11141 = p__11140;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11141,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11141,(1),null);
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

(cbor.core.OrderedMap.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11134){
var self__ = this;
var G__11134__$1 = this;
return (new cljs.core.RecordIter((0),G__11134__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pairs","pairs",614609779)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(cbor.core.OrderedMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11136,other11137){
var self__ = this;
var this11136__$1 = this;
return (((!((other11137 == null)))) && ((((this11136__$1.constructor === other11137.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11136__$1.pairs,other11137.pairs)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11136__$1.__extmap,other11137.__extmap)))))));
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

(cbor.core.OrderedMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11135){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11144 = k11135;
var G__11144__$1 = (((G__11144 instanceof cljs.core.Keyword))?G__11144.fqn:null);
switch (G__11144__$1) {
case "pairs":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11135);

}
}));

(cbor.core.OrderedMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11134){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11145 = cljs.core.keyword_identical_QMARK_;
var expr__11146 = k__5478__auto__;
if(cljs.core.truth_((pred__11145.cljs$core$IFn$_invoke$arity$2 ? pred__11145.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pairs","pairs",614609779),expr__11146) : pred__11145.call(null,new cljs.core.Keyword(null,"pairs","pairs",614609779),expr__11146)))){
return (new cbor.core.OrderedMap(G__11134,self__.__meta,self__.__extmap,null));
} else {
return (new cbor.core.OrderedMap(self__.pairs,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11134),null));
}
}));

(cbor.core.OrderedMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"pairs","pairs",614609779),self__.pairs,null))], null),self__.__extmap));
}));

(cbor.core.OrderedMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11134){
var self__ = this;
var this__5468__auto____$1 = this;
return (new cbor.core.OrderedMap(self__.pairs,G__11134,self__.__extmap,self__.__hash));
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
cbor.core.map__GT_OrderedMap = (function cbor$core$map__GT_OrderedMap(G__11138){
var extmap__5511__auto__ = (function (){var G__11148 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__11138,new cljs.core.Keyword(null,"pairs","pairs",614609779));
if(cljs.core.record_QMARK_(G__11138)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11148);
} else {
return G__11148;
}
})();
return (new cbor.core.OrderedMap(new cljs.core.Keyword(null,"pairs","pairs",614609779).cljs$core$IFn$_invoke$arity$1(G__11138),null,cljs.core.not_empty(extmap__5511__auto__),null));
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

(cbor.core.Tagged.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11150,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11154 = k11150;
var G__11154__$1 = (((G__11154 instanceof cljs.core.Keyword))?G__11154.fqn:null);
switch (G__11154__$1) {
case "n":
return self__.n;

break;
case "value":
return self__.value;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11150,else__5472__auto__);

}
}));

(cbor.core.Tagged.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11155){
var vec__11156 = p__11155;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11156,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11156,(1),null);
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

(cbor.core.Tagged.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11149){
var self__ = this;
var G__11149__$1 = this;
return (new cljs.core.RecordIter((0),G__11149__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Keyword(null,"value","value",305978217)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(cbor.core.Tagged.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11151,other11152){
var self__ = this;
var this11151__$1 = this;
return (((!((other11152 == null)))) && ((((this11151__$1.constructor === other11152.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11151__$1.n,other11152.n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11151__$1.value,other11152.value)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11151__$1.__extmap,other11152.__extmap)))))))));
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

(cbor.core.Tagged.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11150){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11159 = k11150;
var G__11159__$1 = (((G__11159 instanceof cljs.core.Keyword))?G__11159.fqn:null);
switch (G__11159__$1) {
case "n":
case "value":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11150);

}
}));

(cbor.core.Tagged.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11149){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11160 = cljs.core.keyword_identical_QMARK_;
var expr__11161 = k__5478__auto__;
if(cljs.core.truth_((pred__11160.cljs$core$IFn$_invoke$arity$2 ? pred__11160.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"n","n",562130025),expr__11161) : pred__11160.call(null,new cljs.core.Keyword(null,"n","n",562130025),expr__11161)))){
return (new cbor.core.Tagged(G__11149,self__.value,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__11160.cljs$core$IFn$_invoke$arity$2 ? pred__11160.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217),expr__11161) : pred__11160.call(null,new cljs.core.Keyword(null,"value","value",305978217),expr__11161)))){
return (new cbor.core.Tagged(self__.n,G__11149,self__.__meta,self__.__extmap,null));
} else {
return (new cbor.core.Tagged(self__.n,self__.value,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11149),null));
}
}
}));

(cbor.core.Tagged.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"n","n",562130025),self__.n,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"value","value",305978217),self__.value,null))], null),self__.__extmap));
}));

(cbor.core.Tagged.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11149){
var self__ = this;
var this__5468__auto____$1 = this;
return (new cbor.core.Tagged(self__.n,self__.value,G__11149,self__.__extmap,self__.__hash));
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
cbor.core.map__GT_Tagged = (function cbor$core$map__GT_Tagged(G__11153){
var extmap__5511__auto__ = (function (){var G__11163 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__11153,new cljs.core.Keyword(null,"n","n",562130025),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"value","value",305978217)], 0));
if(cljs.core.record_QMARK_(G__11153)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11163);
} else {
return G__11163;
}
})();
return (new cbor.core.Tagged(new cljs.core.Keyword(null,"n","n",562130025).cljs$core$IFn$_invoke$arity$1(G__11153),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(G__11153),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
var seq__11164 = cljs.core.seq(cljs.core.seq(bs));
var chunk__11165 = null;
var count__11166 = (0);
var i__11167 = (0);
while(true){
if((i__11167 < count__11166)){
var b = chunk__11165.cljs$core$IIndexed$_nth$arity$2(null,i__11167);
o.push(((b | 0) & (255)));


var G__11214 = seq__11164;
var G__11215 = chunk__11165;
var G__11216 = count__11166;
var G__11217 = (i__11167 + (1));
seq__11164 = G__11214;
chunk__11165 = G__11215;
count__11166 = G__11216;
i__11167 = G__11217;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__11164);
if(temp__5825__auto__){
var seq__11164__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11164__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__11164__$1);
var G__11218 = cljs.core.chunk_rest(seq__11164__$1);
var G__11219 = c__5694__auto__;
var G__11220 = cljs.core.count(c__5694__auto__);
var G__11221 = (0);
seq__11164 = G__11218;
chunk__11165 = G__11219;
count__11166 = G__11220;
i__11167 = G__11221;
continue;
} else {
var b = cljs.core.first(seq__11164__$1);
o.push(((b | 0) & (255)));


var G__11222 = cljs.core.next(seq__11164__$1);
var G__11223 = null;
var G__11224 = (0);
var G__11225 = (0);
seq__11164 = G__11222;
chunk__11165 = G__11223;
count__11166 = G__11224;
i__11167 = G__11225;
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
var map__11168 = cljs.core.deref(in$);
var map__11168__$1 = cljs.core.__destructure_map(map__11168);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11168__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11168__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
if((pos < data.length)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(in$,cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",-864607220),(pos + (1)));

return ((data[pos]) & (255));
} else {
return (-1);
}
});
cbor.core.read_bytes_BANG_ = (function cbor$core$read_bytes_BANG_(in$,n){
var map__11169 = cljs.core.deref(in$);
var map__11169__$1 = cljs.core.__destructure_map(map__11169);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11169__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11169__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
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

var seq__11170 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(24),(16),(8),(0)], null));
var chunk__11171 = null;
var count__11172 = (0);
var i__11173 = (0);
while(true){
if((i__11173 < count__11172)){
var s = chunk__11171.cljs$core$IIndexed$_nth$arity$2(null,i__11173);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__11226 = seq__11170;
var G__11227 = chunk__11171;
var G__11228 = count__11172;
var G__11229 = (i__11173 + (1));
seq__11170 = G__11226;
chunk__11171 = G__11227;
count__11172 = G__11228;
i__11173 = G__11229;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__11170);
if(temp__5825__auto__){
var seq__11170__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11170__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__11170__$1);
var G__11230 = cljs.core.chunk_rest(seq__11170__$1);
var G__11231 = c__5694__auto__;
var G__11232 = cljs.core.count(c__5694__auto__);
var G__11233 = (0);
seq__11170 = G__11230;
chunk__11171 = G__11231;
count__11172 = G__11232;
i__11173 = G__11233;
continue;
} else {
var s = cljs.core.first(seq__11170__$1);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__11234 = cljs.core.next(seq__11170__$1);
var G__11235 = null;
var G__11236 = (0);
var G__11237 = (0);
seq__11170 = G__11234;
chunk__11171 = G__11235;
count__11172 = G__11236;
i__11173 = G__11237;
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

var seq__11174 = cljs.core.seq(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [(56),(48),(40),(32),(24),(16),(8),(0)], null));
var chunk__11175 = null;
var count__11176 = (0);
var i__11177 = (0);
while(true){
if((i__11177 < count__11176)){
var s = chunk__11175.cljs$core$IIndexed$_nth$arity$2(null,i__11177);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__11238 = seq__11174;
var G__11239 = chunk__11175;
var G__11240 = count__11176;
var G__11241 = (i__11177 + (1));
seq__11174 = G__11238;
chunk__11175 = G__11239;
count__11176 = G__11240;
i__11177 = G__11241;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__11174);
if(temp__5825__auto__){
var seq__11174__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11174__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__11174__$1);
var G__11242 = cljs.core.chunk_rest(seq__11174__$1);
var G__11243 = c__5694__auto__;
var G__11244 = cljs.core.count(c__5694__auto__);
var G__11245 = (0);
seq__11174 = G__11242;
chunk__11175 = G__11243;
count__11176 = G__11244;
i__11177 = G__11245;
continue;
} else {
var s = cljs.core.first(seq__11174__$1);
cbor.core.write_byte_BANG_(o,cbor.core.byte_at(n,s));


var G__11246 = cljs.core.next(seq__11174__$1);
var G__11247 = null;
var G__11248 = (0);
var G__11249 = (0);
seq__11174 = G__11246;
chunk__11175 = G__11247;
count__11176 = G__11248;
i__11177 = G__11249;
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
var G__11250 = (i + (1));
i = G__11250;
continue;

}
}
break;
}
}
});
cbor.core.encode_pairs = (function cbor$core$encode_pairs(o,pairs){
cbor.core.write_head(o,(5),cljs.core.count(pairs));

var seq__11178 = cljs.core.seq(pairs);
var chunk__11179 = null;
var count__11180 = (0);
var i__11181 = (0);
while(true){
if((i__11181 < count__11180)){
var vec__11192 = chunk__11179.cljs$core$IIndexed$_nth$arity$2(null,i__11181);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11192,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11192,(1),null);
var G__11195_11251 = o;
var G__11196_11252 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):k);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__11195_11251,G__11196_11252) : cbor.core.encode_into.call(null,G__11195_11251,G__11196_11252));

(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,v) : cbor.core.encode_into.call(null,o,v));


var G__11253 = seq__11178;
var G__11254 = chunk__11179;
var G__11255 = count__11180;
var G__11256 = (i__11181 + (1));
seq__11178 = G__11253;
chunk__11179 = G__11254;
count__11180 = G__11255;
i__11181 = G__11256;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__11178);
if(temp__5825__auto__){
var seq__11178__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11178__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__11178__$1);
var G__11257 = cljs.core.chunk_rest(seq__11178__$1);
var G__11258 = c__5694__auto__;
var G__11259 = cljs.core.count(c__5694__auto__);
var G__11260 = (0);
seq__11178 = G__11257;
chunk__11179 = G__11258;
count__11180 = G__11259;
i__11181 = G__11260;
continue;
} else {
var vec__11197 = cljs.core.first(seq__11178__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11197,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11197,(1),null);
var G__11200_11261 = o;
var G__11201_11262 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):k);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__11200_11261,G__11201_11262) : cbor.core.encode_into.call(null,G__11200_11261,G__11201_11262));

(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,v) : cbor.core.encode_into.call(null,o,v));


var G__11263 = cljs.core.next(seq__11178__$1);
var G__11264 = null;
var G__11265 = (0);
var G__11266 = (0);
seq__11178 = G__11263;
chunk__11179 = G__11264;
count__11180 = G__11265;
i__11181 = G__11266;
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

var G__11202 = o;
var G__11203 = cbor.core.tag_value(x);
return (cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(G__11202,G__11203) : cbor.core.encode_into.call(null,G__11202,G__11203));
} else {
if((x instanceof cbor.core.OrderedMap)){
return cbor.core.encode_pairs(o,x.pairs);
} else {
if(cljs.core.map_QMARK_(x)){
return cbor.core.encode_pairs(o,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.key,cbor.core.dag_cbor_key_LT_,cljs.core.seq(x)));
} else {
if(cljs.core.sequential_QMARK_(x)){
cbor.core.write_head(o,(4),cljs.core.count(x));

var seq__11204 = cljs.core.seq(x);
var chunk__11205 = null;
var count__11206 = (0);
var i__11207 = (0);
while(true){
if((i__11207 < count__11206)){
var e = chunk__11205.cljs$core$IIndexed$_nth$arity$2(null,i__11207);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,e) : cbor.core.encode_into.call(null,o,e));


var G__11267 = seq__11204;
var G__11268 = chunk__11205;
var G__11269 = count__11206;
var G__11270 = (i__11207 + (1));
seq__11204 = G__11267;
chunk__11205 = G__11268;
count__11206 = G__11269;
i__11207 = G__11270;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__11204);
if(temp__5825__auto__){
var seq__11204__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11204__$1)){
var c__5694__auto__ = cljs.core.chunk_first(seq__11204__$1);
var G__11271 = cljs.core.chunk_rest(seq__11204__$1);
var G__11272 = c__5694__auto__;
var G__11273 = cljs.core.count(c__5694__auto__);
var G__11274 = (0);
seq__11204 = G__11271;
chunk__11205 = G__11272;
count__11206 = G__11273;
i__11207 = G__11274;
continue;
} else {
var e = cljs.core.first(seq__11204__$1);
(cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2 ? cbor.core.encode_into.cljs$core$IFn$_invoke$arity$2(o,e) : cbor.core.encode_into.call(null,o,e));


var G__11275 = cljs.core.next(seq__11204__$1);
var G__11276 = null;
var G__11277 = (0);
var G__11278 = (0);
seq__11204 = G__11275;
chunk__11205 = G__11276;
count__11206 = G__11277;
i__11207 = G__11278;
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
var G__11279 = (i + (1));
var G__11280 = ((acc * (256)) + cbor.core.read_byte_BANG_(in$));
i = G__11279;
acc = G__11280;
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
var G__11208 = (major | 0);
switch (G__11208) {
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
var G__11209 = (info | 0);
switch (G__11209) {
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
