goog.provide('datom.source');

/**
 * The one operation. `pattern` is a 3-vector `[s p o]`; nil in a position is
 *   a wildcard. Returns a seqable of `{:s :p :o}` maps.
 * 
 *   Implementations MUST:
 *   - return every matching quad exactly once (a set, not a bag),
 *   - treat `[nil nil nil]` as `everything`,
 *   - never return a quad that contradicts the bound positions.
 * 
 *   Implementations MAY return quads in any order. Callers that need order
 *   must impose it; a source that happens to be sorted must not be relied on
 *   for sortedness, or swapping in another source silently changes results.
 * @interface
 */
datom.source.IPatternSource = function(){};

var datom$source$IPatternSource$_scan$dyn_6744 = (function (this$,pattern){
var x__5519__auto__ = (((this$ == null))?null:this$);
var m__5520__auto__ = (datom.source._scan[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$2(this$,pattern) : m__5520__auto__.call(null,this$,pattern));
} else {
var m__5518__auto__ = (datom.source._scan["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$2(this$,pattern) : m__5518__auto__.call(null,this$,pattern));
} else {
throw cljs.core.missing_protocol("IPatternSource.-scan",this$);
}
}
});
datom.source._scan = (function datom$source$_scan(this$,pattern){
if((((!((this$ == null)))) && ((!((this$.datom$source$IPatternSource$_scan$arity$2 == null)))))){
return this$.datom$source$IPatternSource$_scan$arity$2(this$,pattern);
} else {
return datom$source$IPatternSource$_scan$dyn_6744(this$,pattern);
}
});

/**
 * Quads matching `pattern` in `src`. See IPatternSource.
 */
datom.source.scan = (function datom$source$scan(src,pattern){
return datom.source._scan(src,pattern);
});
/**
 * `scan` as a set. Convenience for callers comparing sources — which is most
 *   of them, since interchangeability is the point.
 */
datom.source.scan_set = (function datom$source$scan_set(src,pattern){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,datom.source.scan(src,pattern));
});
datom.source.matches_QMARK_ = (function datom$source$matches_QMARK_(p__6632,p__6633){
var map__6634 = p__6632;
var map__6634__$1 = cljs.core.__destructure_map(map__6634);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6634__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6634__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6634__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var vec__6635 = p__6633;
var ps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6635,(0),null);
var pp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6635,(1),null);
var po = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6635,(2),null);
return (((((ps == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ps,s)))) && ((((((pp == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(pp,p)))) && ((((po == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(po,o)))))));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {datom.source.IPatternSource}
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
datom.source.SeqSource = (function (quads,__meta,__extmap,__hash){
this.quads = quads;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(datom.source.SeqSource.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(datom.source.SeqSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6640,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6644 = k6640;
var G__6644__$1 = (((G__6644 instanceof cljs.core.Keyword))?G__6644.fqn:null);
switch (G__6644__$1) {
case "quads":
return self__.quads;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6640,else__5472__auto__);

}
}));

(datom.source.SeqSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6645){
var vec__6646 = p__6645;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6646,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6646,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.SeqSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.SeqSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads],null))], null),self__.__extmap));
}));

(datom.source.SeqSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6639){
var self__ = this;
var G__6639__$1 = this;
return (new cljs.core.RecordIter((0),G__6639__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"quads","quads",1347497505)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.SeqSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.SeqSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__6638_SHARP_){
return datom.source.matches_QMARK_(p1__6638_SHARP_,pattern);
})),self__.quads);
}));

(datom.source.SeqSource.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(datom.source.SeqSource.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new datom.source.SeqSource(self__.quads,self__.__meta,self__.__extmap,self__.__hash));
}));

(datom.source.SeqSource.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(datom.source.SeqSource.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (2054913313 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(datom.source.SeqSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6641,other6642){
var self__ = this;
var this6641__$1 = this;
return (((!((other6642 == null)))) && ((((this6641__$1.constructor === other6642.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6641__$1.quads,other6642.quads)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6641__$1.__extmap,other6642.__extmap)))))));
}));

(datom.source.SeqSource.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"quads","quads",1347497505),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new datom.source.SeqSource(self__.quads,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(datom.source.SeqSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6640){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6649 = k6640;
var G__6649__$1 = (((G__6649 instanceof cljs.core.Keyword))?G__6649.fqn:null);
switch (G__6649__$1) {
case "quads":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6640);

}
}));

(datom.source.SeqSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6639){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6650 = cljs.core.keyword_identical_QMARK_;
var expr__6651 = k__5478__auto__;
if(cljs.core.truth_((pred__6650.cljs$core$IFn$_invoke$arity$2 ? pred__6650.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6651) : pred__6650.call(null,new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6651)))){
return (new datom.source.SeqSource(G__6639,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.SeqSource(self__.quads,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6639),null));
}
}));

(datom.source.SeqSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads,null))], null),self__.__extmap));
}));

(datom.source.SeqSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6639){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.SeqSource(self__.quads,G__6639,self__.__extmap,self__.__hash));
}));

(datom.source.SeqSource.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(datom.source.SeqSource.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"quads","quads",-1306938264,null)], null);
}));

(datom.source.SeqSource.cljs$lang$type = true);

(datom.source.SeqSource.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"datom.source/SeqSource",null,(1),null));
}));

(datom.source.SeqSource.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"datom.source/SeqSource");
}));

/**
 * Positional factory function for datom.source/SeqSource.
 */
datom.source.__GT_SeqSource = (function datom$source$__GT_SeqSource(quads){
return (new datom.source.SeqSource(quads,null,null,null));
});

/**
 * Factory function for datom.source/SeqSource, taking a map of keywords to field values.
 */
datom.source.map__GT_SeqSource = (function datom$source$map__GT_SeqSource(G__6643){
var extmap__5511__auto__ = (function (){var G__6653 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__6643,new cljs.core.Keyword(null,"quads","quads",1347497505));
if(cljs.core.record_QMARK_(G__6643)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6653);
} else {
return G__6653;
}
})();
return (new datom.source.SeqSource(new cljs.core.Keyword(null,"quads","quads",1347497505).cljs$core$IFn$_invoke$arity$1(G__6643),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * The reference source: a seq of quads, filtered per scan. O(n) per query and
 *   meant to be — it exists to be the thing every other implementation is
 *   checked AGAINST, not to be fast.
 */
datom.source.of_quads = (function datom$source$of_quads(quads){
return datom.source.__GT_SeqSource(cljs.core.vec(quads));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {datom.source.IPatternSource}
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
datom.source.MergedSource = (function (sources,__meta,__extmap,__hash){
this.sources = sources;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(datom.source.MergedSource.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(datom.source.MergedSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6655,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6659 = k6655;
var G__6659__$1 = (((G__6659 instanceof cljs.core.Keyword))?G__6659.fqn:null);
switch (G__6659__$1) {
case "sources":
return self__.sources;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6655,else__5472__auto__);

}
}));

(datom.source.MergedSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6660){
var vec__6661 = p__6660;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6661,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6661,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.MergedSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.MergedSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"sources","sources",-321166424),self__.sources],null))], null),self__.__extmap));
}));

(datom.source.MergedSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6654){
var self__ = this;
var G__6654__$1 = this;
return (new cljs.core.RecordIter((0),G__6654__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sources","sources",-321166424)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.MergedSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.MergedSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,s){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(acc,datom.source.scan(s,pattern));
}),cljs.core.PersistentHashSet.EMPTY,self__.sources);
}));

(datom.source.MergedSource.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(datom.source.MergedSource.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new datom.source.MergedSource(self__.sources,self__.__meta,self__.__extmap,self__.__hash));
}));

(datom.source.MergedSource.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(datom.source.MergedSource.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (1686523650 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(datom.source.MergedSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6656,other6657){
var self__ = this;
var this6656__$1 = this;
return (((!((other6657 == null)))) && ((((this6656__$1.constructor === other6657.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6656__$1.sources,other6657.sources)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6656__$1.__extmap,other6657.__extmap)))))));
}));

(datom.source.MergedSource.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sources","sources",-321166424),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new datom.source.MergedSource(self__.sources,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(datom.source.MergedSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6655){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6664 = k6655;
var G__6664__$1 = (((G__6664 instanceof cljs.core.Keyword))?G__6664.fqn:null);
switch (G__6664__$1) {
case "sources":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6655);

}
}));

(datom.source.MergedSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6654){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6665 = cljs.core.keyword_identical_QMARK_;
var expr__6666 = k__5478__auto__;
if(cljs.core.truth_((pred__6665.cljs$core$IFn$_invoke$arity$2 ? pred__6665.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sources","sources",-321166424),expr__6666) : pred__6665.call(null,new cljs.core.Keyword(null,"sources","sources",-321166424),expr__6666)))){
return (new datom.source.MergedSource(G__6654,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.MergedSource(self__.sources,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6654),null));
}
}));

(datom.source.MergedSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"sources","sources",-321166424),self__.sources,null))], null),self__.__extmap));
}));

(datom.source.MergedSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6654){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.MergedSource(self__.sources,G__6654,self__.__extmap,self__.__hash));
}));

(datom.source.MergedSource.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(datom.source.MergedSource.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sources","sources",1319365103,null)], null);
}));

(datom.source.MergedSource.cljs$lang$type = true);

(datom.source.MergedSource.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"datom.source/MergedSource",null,(1),null));
}));

(datom.source.MergedSource.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"datom.source/MergedSource");
}));

/**
 * Positional factory function for datom.source/MergedSource.
 */
datom.source.__GT_MergedSource = (function datom$source$__GT_MergedSource(sources){
return (new datom.source.MergedSource(sources,null,null,null));
});

/**
 * Factory function for datom.source/MergedSource, taking a map of keywords to field values.
 */
datom.source.map__GT_MergedSource = (function datom$source$map__GT_MergedSource(G__6658){
var extmap__5511__auto__ = (function (){var G__6668 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__6658,new cljs.core.Keyword(null,"sources","sources",-321166424));
if(cljs.core.record_QMARK_(G__6658)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6668);
} else {
return G__6668;
}
})();
return (new datom.source.MergedSource(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(G__6658),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * One source over many. This is what a partitioned root reads through: each
 *   writer owns a partition, and the reader sees their union as a single plane.
 * 
 *   The union is a SET, so a quad asserted independently into two partitions
 *   appears once — the answer stays correct under duplication, only the bytes
 *   are wasted. That property is why partitioning does not have to coordinate.
 */
datom.source.merged = (function datom$source$merged(sources){
return datom.source.__GT_MergedSource(cljs.core.vec(sources));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {datom.source.IPatternSource}
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
datom.source.FilteredSource = (function (src,pred,__meta,__extmap,__hash){
this.src = src;
this.pred = pred;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(datom.source.FilteredSource.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(datom.source.FilteredSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6670,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6674 = k6670;
var G__6674__$1 = (((G__6674 instanceof cljs.core.Keyword))?G__6674.fqn:null);
switch (G__6674__$1) {
case "src":
return self__.src;

break;
case "pred":
return self__.pred;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6670,else__5472__auto__);

}
}));

(datom.source.FilteredSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6675){
var vec__6676 = p__6675;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6676,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6676,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.FilteredSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.FilteredSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"src","src",-1651076051),self__.src],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"pred","pred",1927423397),self__.pred],null))], null),self__.__extmap));
}));

(datom.source.FilteredSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6669){
var self__ = this;
var G__6669__$1 = this;
return (new cljs.core.RecordIter((0),G__6669__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"pred","pred",1927423397)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.FilteredSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.FilteredSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(self__.pred),datom.source.scan(self__.src,pattern));
}));

(datom.source.FilteredSource.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(datom.source.FilteredSource.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new datom.source.FilteredSource(self__.src,self__.pred,self__.__meta,self__.__extmap,self__.__hash));
}));

(datom.source.FilteredSource.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(datom.source.FilteredSource.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (49935252 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(datom.source.FilteredSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6671,other6672){
var self__ = this;
var this6671__$1 = this;
return (((!((other6672 == null)))) && ((((this6671__$1.constructor === other6672.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6671__$1.src,other6672.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6671__$1.pred,other6672.pred)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6671__$1.__extmap,other6672.__extmap)))))))));
}));

(datom.source.FilteredSource.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pred","pred",1927423397),null,new cljs.core.Keyword(null,"src","src",-1651076051),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new datom.source.FilteredSource(self__.src,self__.pred,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(datom.source.FilteredSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6670){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6679 = k6670;
var G__6679__$1 = (((G__6679 instanceof cljs.core.Keyword))?G__6679.fqn:null);
switch (G__6679__$1) {
case "src":
case "pred":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6670);

}
}));

(datom.source.FilteredSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6669){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6680 = cljs.core.keyword_identical_QMARK_;
var expr__6681 = k__5478__auto__;
if(cljs.core.truth_((pred__6680.cljs$core$IFn$_invoke$arity$2 ? pred__6680.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__6681) : pred__6680.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__6681)))){
return (new datom.source.FilteredSource(G__6669,self__.pred,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6680.cljs$core$IFn$_invoke$arity$2 ? pred__6680.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pred","pred",1927423397),expr__6681) : pred__6680.call(null,new cljs.core.Keyword(null,"pred","pred",1927423397),expr__6681)))){
return (new datom.source.FilteredSource(self__.src,G__6669,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.FilteredSource(self__.src,self__.pred,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6669),null));
}
}
}));

(datom.source.FilteredSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"pred","pred",1927423397),self__.pred,null))], null),self__.__extmap));
}));

(datom.source.FilteredSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6669){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.FilteredSource(self__.src,self__.pred,G__6669,self__.__extmap,self__.__hash));
}));

(datom.source.FilteredSource.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(datom.source.FilteredSource.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"src","src",-10544524,null),new cljs.core.Symbol(null,"pred","pred",-727012372,null)], null);
}));

(datom.source.FilteredSource.cljs$lang$type = true);

(datom.source.FilteredSource.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"datom.source/FilteredSource",null,(1),null));
}));

(datom.source.FilteredSource.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"datom.source/FilteredSource");
}));

/**
 * Positional factory function for datom.source/FilteredSource.
 */
datom.source.__GT_FilteredSource = (function datom$source$__GT_FilteredSource(src,pred){
return (new datom.source.FilteredSource(src,pred,null,null,null));
});

/**
 * Factory function for datom.source/FilteredSource, taking a map of keywords to field values.
 */
datom.source.map__GT_FilteredSource = (function datom$source$map__GT_FilteredSource(G__6673){
var extmap__5511__auto__ = (function (){var G__6683 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6673,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"pred","pred",1927423397)], 0));
if(cljs.core.record_QMARK_(G__6673)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6683);
} else {
return G__6683;
}
})();
return (new datom.source.FilteredSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__6673),new cljs.core.Keyword(null,"pred","pred",1927423397).cljs$core$IFn$_invoke$arity$1(G__6673),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Post-filter every quad, e.g. the `visible?` predicate `arrangement.query`
 *   requires. Kept as a combinator rather than a parameter of `-scan` so that an
 *   implementation cannot forget to apply it: wrapping is visible at the call
 *   site, a forgotten argument is not.
 */
datom.source.filtered = (function datom$source$filtered(src,pred){
return datom.source.__GT_FilteredSource(src,pred);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {datom.source.IPatternSource}
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
datom.source.CountingSource = (function (src,calls,quads,__meta,__extmap,__hash){
this.src = src;
this.calls = calls;
this.quads = quads;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(datom.source.CountingSource.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(datom.source.CountingSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6685,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6689 = k6685;
var G__6689__$1 = (((G__6689 instanceof cljs.core.Keyword))?G__6689.fqn:null);
switch (G__6689__$1) {
case "src":
return self__.src;

break;
case "calls":
return self__.calls;

break;
case "quads":
return self__.quads;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6685,else__5472__auto__);

}
}));

(datom.source.CountingSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6690){
var vec__6691 = p__6690;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6691,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6691,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.CountingSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.CountingSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"src","src",-1651076051),self__.src],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"calls","calls",-433802344),self__.calls],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads],null))], null),self__.__extmap));
}));

(datom.source.CountingSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6684){
var self__ = this;
var G__6684__$1 = this;
return (new cljs.core.RecordIter((0),G__6684__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"calls","calls",-433802344),new cljs.core.Keyword(null,"quads","quads",1347497505)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.CountingSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.CountingSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.calls,cljs.core.inc);

var r = datom.source.scan(self__.src,pattern);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.quads,cljs.core._PLUS_,cljs.core.count(r));

return r;
}));

(datom.source.CountingSource.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(datom.source.CountingSource.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,self__.__meta,self__.__extmap,self__.__hash));
}));

(datom.source.CountingSource.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
}));

(datom.source.CountingSource.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (-357533952 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(datom.source.CountingSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6686,other6687){
var self__ = this;
var this6686__$1 = this;
return (((!((other6687 == null)))) && ((((this6686__$1.constructor === other6687.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6686__$1.src,other6687.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6686__$1.calls,other6687.calls)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6686__$1.quads,other6687.quads)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6686__$1.__extmap,other6687.__extmap)))))))))));
}));

(datom.source.CountingSource.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"quads","quads",1347497505),null,new cljs.core.Keyword(null,"src","src",-1651076051),null,new cljs.core.Keyword(null,"calls","calls",-433802344),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(datom.source.CountingSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6685){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6694 = k6685;
var G__6694__$1 = (((G__6694 instanceof cljs.core.Keyword))?G__6694.fqn:null);
switch (G__6694__$1) {
case "src":
case "calls":
case "quads":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6685);

}
}));

(datom.source.CountingSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6684){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6695 = cljs.core.keyword_identical_QMARK_;
var expr__6696 = k__5478__auto__;
if(cljs.core.truth_((pred__6695.cljs$core$IFn$_invoke$arity$2 ? pred__6695.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__6696) : pred__6695.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__6696)))){
return (new datom.source.CountingSource(G__6684,self__.calls,self__.quads,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6695.cljs$core$IFn$_invoke$arity$2 ? pred__6695.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"calls","calls",-433802344),expr__6696) : pred__6695.call(null,new cljs.core.Keyword(null,"calls","calls",-433802344),expr__6696)))){
return (new datom.source.CountingSource(self__.src,G__6684,self__.quads,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6695.cljs$core$IFn$_invoke$arity$2 ? pred__6695.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6696) : pred__6695.call(null,new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6696)))){
return (new datom.source.CountingSource(self__.src,self__.calls,G__6684,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6684),null));
}
}
}
}));

(datom.source.CountingSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"calls","calls",-433802344),self__.calls,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads,null))], null),self__.__extmap));
}));

(datom.source.CountingSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6684){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,G__6684,self__.__extmap,self__.__hash));
}));

(datom.source.CountingSource.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(datom.source.CountingSource.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"src","src",-10544524,null),new cljs.core.Symbol(null,"calls","calls",1206729183,null),new cljs.core.Symbol(null,"quads","quads",-1306938264,null)], null);
}));

(datom.source.CountingSource.cljs$lang$type = true);

(datom.source.CountingSource.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"datom.source/CountingSource",null,(1),null));
}));

(datom.source.CountingSource.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"datom.source/CountingSource");
}));

/**
 * Positional factory function for datom.source/CountingSource.
 */
datom.source.__GT_CountingSource = (function datom$source$__GT_CountingSource(src,calls,quads){
return (new datom.source.CountingSource(src,calls,quads,null,null,null));
});

/**
 * Factory function for datom.source/CountingSource, taking a map of keywords to field values.
 */
datom.source.map__GT_CountingSource = (function datom$source$map__GT_CountingSource(G__6688){
var extmap__5511__auto__ = (function (){var G__6698 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6688,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"calls","calls",-433802344),new cljs.core.Keyword(null,"quads","quads",1347497505)], 0));
if(cljs.core.record_QMARK_(G__6688)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6698);
} else {
return G__6698;
}
})();
return (new datom.source.CountingSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__6688),new cljs.core.Keyword(null,"calls","calls",-433802344).cljs$core$IFn$_invoke$arity$1(G__6688),new cljs.core.Keyword(null,"quads","quads",1347497505).cljs$core$IFn$_invoke$arity$1(G__6688),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Wrap a source so scans and returned-quad counts are recorded in the atoms
 *   it carries. Comparing architectures needs a number that is not wall-clock —
 *   wall-clock on a warm in-memory store measures the JVM, while scans and quads
 *   measure the DESIGN.
 */
datom.source.counting = (function datom$source$counting(var_args){
var G__6700 = arguments.length;
switch (G__6700) {
case 1:
return datom.source.counting.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return datom.source.counting.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datom.source.counting.cljs$core$IFn$_invoke$arity$1 = (function (src){
return datom.source.counting.cljs$core$IFn$_invoke$arity$3(src,cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)),cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)));
}));

(datom.source.counting.cljs$core$IFn$_invoke$arity$3 = (function (src,calls,quads){
return datom.source.__GT_CountingSource(src,calls,quads);
}));

(datom.source.counting.cljs$lang$maxFixedArity = 3);

datom.source.counts = (function datom$source$counts(src){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scans","scans",183440284),cljs.core.deref(src.calls),new cljs.core.Keyword(null,"quads","quads",1347497505),cljs.core.deref(src.quads)], null);
});
/**
 * Which of `[s p o]` are bound. The shape of this is what an implementation
 *   dispatches on to pick an index, so it is defined once here rather than
 *   re-derived (differently) in each one.
 */
datom.source.bound_positions = (function datom$source$bound_positions(p__6701){
var vec__6702 = p__6701;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6702,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6702,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6702,(2),null);
var G__6705 = cljs.core.PersistentHashSet.EMPTY;
var G__6705__$1 = (cljs.core.truth_(s)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__6705,new cljs.core.Keyword(null,"s","s",1705939918)):G__6705);
var G__6705__$2 = (cljs.core.truth_(p)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__6705__$1,new cljs.core.Keyword(null,"p","p",151049309)):G__6705__$1);
if(cljs.core.truth_(o)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__6705__$2,new cljs.core.Keyword(null,"o","o",-1350007228));
} else {
return G__6705__$2;
}
});
/**
 * A crude ordering key: fewer wildcards first. Query planners that want to
 *   run the most selective clause first can use this without every source
 *   having to expose statistics it may not have.
 */
datom.source.selectivity_hint = (function datom$source$selectivity_hint(pattern){
return ((3) - cljs.core.count(datom.source.bound_positions(pattern)));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {datom.source.IPatternSource}
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
datom.source.ViewSource = (function (answers,fallback,__meta,__extmap,__hash){
this.answers = answers;
this.fallback = fallback;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(datom.source.ViewSource.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(datom.source.ViewSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6707,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6711 = k6707;
var G__6711__$1 = (((G__6711 instanceof cljs.core.Keyword))?G__6711.fqn:null);
switch (G__6711__$1) {
case "answers":
return self__.answers;

break;
case "fallback":
return self__.fallback;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6707,else__5472__auto__);

}
}));

(datom.source.ViewSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6712){
var vec__6713 = p__6712;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6713,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6713,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.ViewSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.ViewSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"answers","answers",-2066449770),self__.answers],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"fallback","fallback",761637929),self__.fallback],null))], null),self__.__extmap));
}));

(datom.source.ViewSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6706){
var self__ = this;
var G__6706__$1 = this;
return (new cljs.core.RecordIter((0),G__6706__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"answers","answers",-2066449770),new cljs.core.Keyword(null,"fallback","fallback",761637929)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.ViewSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.ViewSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.answers,pattern);
if(cljs.core.truth_(temp__5823__auto__)){
var cached = temp__5823__auto__;
return cached;
} else {
if(cljs.core.truth_(self__.fallback)){
return datom.source.scan(self__.fallback,pattern);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("pattern not covered by this view, and no fallback",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"problem","problem",1168155148),new cljs.core.Keyword("datom.source","uncovered-pattern","datom.source/uncovered-pattern",136327701),new cljs.core.Keyword(null,"pattern","pattern",242135423),pattern,new cljs.core.Keyword(null,"covered","covered",-409185091),cljs.core.vec(cljs.core.keys(self__.answers))], null));
}
}
}));

(datom.source.ViewSource.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(datom.source.ViewSource.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new datom.source.ViewSource(self__.answers,self__.fallback,self__.__meta,self__.__extmap,self__.__hash));
}));

(datom.source.ViewSource.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(datom.source.ViewSource.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (2055597666 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(datom.source.ViewSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6708,other6709){
var self__ = this;
var this6708__$1 = this;
return (((!((other6709 == null)))) && ((((this6708__$1.constructor === other6709.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6708__$1.answers,other6709.answers)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6708__$1.fallback,other6709.fallback)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6708__$1.__extmap,other6709.__extmap)))))))));
}));

(datom.source.ViewSource.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fallback","fallback",761637929),null,new cljs.core.Keyword(null,"answers","answers",-2066449770),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new datom.source.ViewSource(self__.answers,self__.fallback,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(datom.source.ViewSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6707){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6716 = k6707;
var G__6716__$1 = (((G__6716 instanceof cljs.core.Keyword))?G__6716.fqn:null);
switch (G__6716__$1) {
case "answers":
case "fallback":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6707);

}
}));

(datom.source.ViewSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6706){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6717 = cljs.core.keyword_identical_QMARK_;
var expr__6718 = k__5478__auto__;
if(cljs.core.truth_((pred__6717.cljs$core$IFn$_invoke$arity$2 ? pred__6717.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"answers","answers",-2066449770),expr__6718) : pred__6717.call(null,new cljs.core.Keyword(null,"answers","answers",-2066449770),expr__6718)))){
return (new datom.source.ViewSource(G__6706,self__.fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6717.cljs$core$IFn$_invoke$arity$2 ? pred__6717.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"fallback","fallback",761637929),expr__6718) : pred__6717.call(null,new cljs.core.Keyword(null,"fallback","fallback",761637929),expr__6718)))){
return (new datom.source.ViewSource(self__.answers,G__6706,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.ViewSource(self__.answers,self__.fallback,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6706),null));
}
}
}));

(datom.source.ViewSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"answers","answers",-2066449770),self__.answers,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"fallback","fallback",761637929),self__.fallback,null))], null),self__.__extmap));
}));

(datom.source.ViewSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6706){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.ViewSource(self__.answers,self__.fallback,G__6706,self__.__extmap,self__.__hash));
}));

(datom.source.ViewSource.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(datom.source.ViewSource.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"answers","answers",-425918243,null),new cljs.core.Symbol(null,"fallback","fallback",-1892797840,null)], null);
}));

(datom.source.ViewSource.cljs$lang$type = true);

(datom.source.ViewSource.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"datom.source/ViewSource",null,(1),null));
}));

(datom.source.ViewSource.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"datom.source/ViewSource");
}));

/**
 * Positional factory function for datom.source/ViewSource.
 */
datom.source.__GT_ViewSource = (function datom$source$__GT_ViewSource(answers,fallback){
return (new datom.source.ViewSource(answers,fallback,null,null,null));
});

/**
 * Factory function for datom.source/ViewSource, taking a map of keywords to field values.
 */
datom.source.map__GT_ViewSource = (function datom$source$map__GT_ViewSource(G__6710){
var extmap__5511__auto__ = (function (){var G__6720 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6710,new cljs.core.Keyword(null,"answers","answers",-2066449770),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"fallback","fallback",761637929)], 0));
if(cljs.core.record_QMARK_(G__6710)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6720);
} else {
return G__6720;
}
})();
return (new datom.source.ViewSource(new cljs.core.Keyword(null,"answers","answers",-2066449770).cljs$core$IFn$_invoke$arity$1(G__6710),new cljs.core.Keyword(null,"fallback","fallback",761637929).cljs$core$IFn$_invoke$arity$1(G__6710),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Precompute `patterns` against `src`. A scan for a covered pattern is a map
 *   lookup; anything else falls through to `src`.
 * 
 *   Two things a caller has to know, because neither announces itself:
 * 
 *   1. **A view does not follow its source.** Facts asserted after construction
 *   are invisible until `absorb`ed. That is what makes the read cheap and it
 *   is also how a view goes quietly stale — the answer stays confident.
 *   2. **Coverage is exact.** `[nil "knows" nil]` being covered says nothing
 *   about `["alice" "knows" nil]`. Pass `:fallback? false` to make an
 *   uncovered pattern throw instead of silently costing a full scan, which
 *   is what you want when the view is there to bound latency.
 */
datom.source.view = (function datom$source$view(var_args){
var G__6723 = arguments.length;
switch (G__6723) {
case 2:
return datom.source.view.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return datom.source.view.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datom.source.view.cljs$core$IFn$_invoke$arity$2 = (function (src,patterns){
return datom.source.view.cljs$core$IFn$_invoke$arity$3(src,patterns,cljs.core.PersistentArrayMap.EMPTY);
}));

(datom.source.view.cljs$core$IFn$_invoke$arity$3 = (function (src,patterns,p__6724){
var map__6725 = p__6724;
var map__6725__$1 = cljs.core.__destructure_map(map__6725);
var fallback_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__6725__$1,new cljs.core.Keyword(null,"fallback?","fallback?",-1074968796),true);
return datom.source.__GT_ViewSource(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,(function (p1__6721_SHARP_){
return datom.source.scan_set(src,p1__6721_SHARP_);
}))),patterns),(cljs.core.truth_(fallback_QMARK_)?src:null));
}));

(datom.source.view.cljs$lang$maxFixedArity = 3);

datom.source.pattern_matches_QMARK_ = (function datom$source$pattern_matches_QMARK_(pattern,quad){
return datom.source.matches_QMARK_(quad,pattern);
});
/**
 * Fold newly-asserted `quads` into a view, incrementally.
 * 
 *   Only the covered patterns are touched, and only by the quads that match
 *   them — the cost is O(new-quads x patterns), not O(database). This is the
 *   write-time half of the trade: a view is cheap to read exactly to the extent
 *   that somebody keeps paying this.
 * 
 *   RETRACTIONS ARE NOT SUPPORTED. Folding an assertion into a set is
 *   monotonic; removing one is not, and a view that quietly kept a retracted
 *   fact would be worse than no view. Rebuild with `view` after a retraction.
 */
datom.source.absorb = (function datom$source$absorb(v,quads){
return datom.source.__GT_ViewSource(cljs.core.reduce_kv((function (m,pattern,cached){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,pattern,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cached,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__6726_SHARP_){
return datom.source.pattern_matches_QMARK_(pattern,p1__6726_SHARP_);
})),quads));
}),cljs.core.PersistentArrayMap.EMPTY,v.answers),v.fallback);
});
/**
 * Which patterns this view answers without falling through.
 */
datom.source.coverage = (function datom$source$coverage(v){
return cljs.core.set(cljs.core.keys(v.answers));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {datom.source.IPatternSource}
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
datom.source.CachedSource = (function (src,cache,__meta,__extmap,__hash){
this.src = src;
this.cache = cache;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(datom.source.CachedSource.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(datom.source.CachedSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6728,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6732 = k6728;
var G__6732__$1 = (((G__6732 instanceof cljs.core.Keyword))?G__6732.fqn:null);
switch (G__6732__$1) {
case "src":
return self__.src;

break;
case "cache":
return self__.cache;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6728,else__5472__auto__);

}
}));

(datom.source.CachedSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6733){
var vec__6734 = p__6733;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6734,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6734,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.CachedSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.CachedSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"src","src",-1651076051),self__.src],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cache","cache",-1237023054),self__.cache],null))], null),self__.__extmap));
}));

(datom.source.CachedSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6727){
var self__ = this;
var G__6727__$1 = this;
return (new cljs.core.RecordIter((0),G__6727__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"cache","cache",-1237023054)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.CachedSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.CachedSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
var temp__5823__auto__ = cljs.core.find(cljs.core.deref(self__.cache),pattern);
if(cljs.core.truth_(temp__5823__auto__)){
var hit = temp__5823__auto__;
return cljs.core.val(hit);
} else {
var r = datom.source.scan_set(self__.src,pattern);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cache,cljs.core.assoc,pattern,r);

return r;
}
}));

(datom.source.CachedSource.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(datom.source.CachedSource.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new datom.source.CachedSource(self__.src,self__.cache,self__.__meta,self__.__extmap,self__.__hash));
}));

(datom.source.CachedSource.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(datom.source.CachedSource.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (1829760066 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(datom.source.CachedSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6729,other6730){
var self__ = this;
var this6729__$1 = this;
return (((!((other6730 == null)))) && ((((this6729__$1.constructor === other6730.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6729__$1.src,other6730.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6729__$1.cache,other6730.cache)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6729__$1.__extmap,other6730.__extmap)))))))));
}));

(datom.source.CachedSource.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),null,new cljs.core.Keyword(null,"cache","cache",-1237023054),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new datom.source.CachedSource(self__.src,self__.cache,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(datom.source.CachedSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6728){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6737 = k6728;
var G__6737__$1 = (((G__6737 instanceof cljs.core.Keyword))?G__6737.fqn:null);
switch (G__6737__$1) {
case "src":
case "cache":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6728);

}
}));

(datom.source.CachedSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6727){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6738 = cljs.core.keyword_identical_QMARK_;
var expr__6739 = k__5478__auto__;
if(cljs.core.truth_((pred__6738.cljs$core$IFn$_invoke$arity$2 ? pred__6738.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__6739) : pred__6738.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__6739)))){
return (new datom.source.CachedSource(G__6727,self__.cache,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6738.cljs$core$IFn$_invoke$arity$2 ? pred__6738.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cache","cache",-1237023054),expr__6739) : pred__6738.call(null,new cljs.core.Keyword(null,"cache","cache",-1237023054),expr__6739)))){
return (new datom.source.CachedSource(self__.src,G__6727,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.CachedSource(self__.src,self__.cache,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6727),null));
}
}
}));

(datom.source.CachedSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"cache","cache",-1237023054),self__.cache,null))], null),self__.__extmap));
}));

(datom.source.CachedSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6727){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.CachedSource(self__.src,self__.cache,G__6727,self__.__extmap,self__.__hash));
}));

(datom.source.CachedSource.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(datom.source.CachedSource.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"src","src",-10544524,null),new cljs.core.Symbol(null,"cache","cache",403508473,null)], null);
}));

(datom.source.CachedSource.cljs$lang$type = true);

(datom.source.CachedSource.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"datom.source/CachedSource",null,(1),null));
}));

(datom.source.CachedSource.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"datom.source/CachedSource");
}));

/**
 * Positional factory function for datom.source/CachedSource.
 */
datom.source.__GT_CachedSource = (function datom$source$__GT_CachedSource(src,cache){
return (new datom.source.CachedSource(src,cache,null,null,null));
});

/**
 * Factory function for datom.source/CachedSource, taking a map of keywords to field values.
 */
datom.source.map__GT_CachedSource = (function datom$source$map__GT_CachedSource(G__6731){
var extmap__5511__auto__ = (function (){var G__6741 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6731,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"cache","cache",-1237023054)], 0));
if(cljs.core.record_QMARK_(G__6731)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6741);
} else {
return G__6741;
}
})();
return (new datom.source.CachedSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__6731),new cljs.core.Keyword(null,"cache","cache",-1237023054).cljs$core$IFn$_invoke$arity$1(G__6731),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Memoize scans by pattern.
 * 
 *   **Scope this to one query, not to a source that outlives writes.** Unlike
 *   `block-cache`, whose key is content-addressed and therefore cannot go
 *   stale, a PATTERN is not a version — the same pattern against the same
 *   source returns different answers after a write. The safe lifetime is a
 *   single query, or a source you know to be an immutable snapshot. Handing a
 *   long-lived `cached` to a mutating store is how a database starts answering
 *   from the past.
 * 
 *   `cache-atom` is exposed so a caller can share one cache across several
 *   queries it knows to be against the same snapshot, and inspect it.
 */
datom.source.cached = (function datom$source$cached(var_args){
var G__6743 = arguments.length;
switch (G__6743) {
case 1:
return datom.source.cached.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return datom.source.cached.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datom.source.cached.cljs$core$IFn$_invoke$arity$1 = (function (src){
return datom.source.cached.cljs$core$IFn$_invoke$arity$2(src,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY));
}));

(datom.source.cached.cljs$core$IFn$_invoke$arity$2 = (function (src,cache_atom){
return datom.source.__GT_CachedSource(src,cache_atom);
}));

(datom.source.cached.cljs$lang$maxFixedArity = 2);

/**
 * `{:patterns n :quads n}` for a `cached` source.
 */
datom.source.cache_stats = (function datom$source$cache_stats(c){
var m = cljs.core.deref(c.cache);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"patterns","patterns",1164082024),cljs.core.count(m),new cljs.core.Keyword(null,"quads","quads",1347497505),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,cljs.core.vals(m)))], null);
});

//# sourceMappingURL=datom.source.js.map
