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

var datom$source$IPatternSource$_scan$dyn_11815 = (function (this$,pattern){
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
return datom$source$IPatternSource$_scan$dyn_11815(this$,pattern);
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
datom.source.matches_QMARK_ = (function datom$source$matches_QMARK_(p__11703,p__11704){
var map__11705 = p__11703;
var map__11705__$1 = cljs.core.__destructure_map(map__11705);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11705__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11705__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11705__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var vec__11706 = p__11704;
var ps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11706,(0),null);
var pp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11706,(1),null);
var po = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11706,(2),null);
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

(datom.source.SeqSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11711,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11715 = k11711;
var G__11715__$1 = (((G__11715 instanceof cljs.core.Keyword))?G__11715.fqn:null);
switch (G__11715__$1) {
case "quads":
return self__.quads;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11711,else__5472__auto__);

}
}));

(datom.source.SeqSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11716){
var vec__11717 = p__11716;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11717,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11717,(1),null);
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

(datom.source.SeqSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11710){
var self__ = this;
var G__11710__$1 = this;
return (new cljs.core.RecordIter((0),G__11710__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"quads","quads",1347497505)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.SeqSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.SeqSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__11709_SHARP_){
return datom.source.matches_QMARK_(p1__11709_SHARP_,pattern);
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

(datom.source.SeqSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11712,other11713){
var self__ = this;
var this11712__$1 = this;
return (((!((other11713 == null)))) && ((((this11712__$1.constructor === other11713.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11712__$1.quads,other11713.quads)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11712__$1.__extmap,other11713.__extmap)))))));
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

(datom.source.SeqSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11711){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11720 = k11711;
var G__11720__$1 = (((G__11720 instanceof cljs.core.Keyword))?G__11720.fqn:null);
switch (G__11720__$1) {
case "quads":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11711);

}
}));

(datom.source.SeqSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11710){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11721 = cljs.core.keyword_identical_QMARK_;
var expr__11722 = k__5478__auto__;
if(cljs.core.truth_((pred__11721.cljs$core$IFn$_invoke$arity$2 ? pred__11721.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"quads","quads",1347497505),expr__11722) : pred__11721.call(null,new cljs.core.Keyword(null,"quads","quads",1347497505),expr__11722)))){
return (new datom.source.SeqSource(G__11710,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.SeqSource(self__.quads,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11710),null));
}
}));

(datom.source.SeqSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads,null))], null),self__.__extmap));
}));

(datom.source.SeqSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11710){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.SeqSource(self__.quads,G__11710,self__.__extmap,self__.__hash));
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
datom.source.map__GT_SeqSource = (function datom$source$map__GT_SeqSource(G__11714){
var extmap__5511__auto__ = (function (){var G__11724 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__11714,new cljs.core.Keyword(null,"quads","quads",1347497505));
if(cljs.core.record_QMARK_(G__11714)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11724);
} else {
return G__11724;
}
})();
return (new datom.source.SeqSource(new cljs.core.Keyword(null,"quads","quads",1347497505).cljs$core$IFn$_invoke$arity$1(G__11714),null,cljs.core.not_empty(extmap__5511__auto__),null));
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

(datom.source.MergedSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11726,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11730 = k11726;
var G__11730__$1 = (((G__11730 instanceof cljs.core.Keyword))?G__11730.fqn:null);
switch (G__11730__$1) {
case "sources":
return self__.sources;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11726,else__5472__auto__);

}
}));

(datom.source.MergedSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11731){
var vec__11732 = p__11731;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11732,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11732,(1),null);
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

(datom.source.MergedSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11725){
var self__ = this;
var G__11725__$1 = this;
return (new cljs.core.RecordIter((0),G__11725__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sources","sources",-321166424)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.MergedSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11727,other11728){
var self__ = this;
var this11727__$1 = this;
return (((!((other11728 == null)))) && ((((this11727__$1.constructor === other11728.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11727__$1.sources,other11728.sources)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11727__$1.__extmap,other11728.__extmap)))))));
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

(datom.source.MergedSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11726){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11735 = k11726;
var G__11735__$1 = (((G__11735 instanceof cljs.core.Keyword))?G__11735.fqn:null);
switch (G__11735__$1) {
case "sources":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11726);

}
}));

(datom.source.MergedSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11725){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11736 = cljs.core.keyword_identical_QMARK_;
var expr__11737 = k__5478__auto__;
if(cljs.core.truth_((pred__11736.cljs$core$IFn$_invoke$arity$2 ? pred__11736.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sources","sources",-321166424),expr__11737) : pred__11736.call(null,new cljs.core.Keyword(null,"sources","sources",-321166424),expr__11737)))){
return (new datom.source.MergedSource(G__11725,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.MergedSource(self__.sources,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11725),null));
}
}));

(datom.source.MergedSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"sources","sources",-321166424),self__.sources,null))], null),self__.__extmap));
}));

(datom.source.MergedSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11725){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.MergedSource(self__.sources,G__11725,self__.__extmap,self__.__hash));
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
datom.source.map__GT_MergedSource = (function datom$source$map__GT_MergedSource(G__11729){
var extmap__5511__auto__ = (function (){var G__11739 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__11729,new cljs.core.Keyword(null,"sources","sources",-321166424));
if(cljs.core.record_QMARK_(G__11729)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11739);
} else {
return G__11739;
}
})();
return (new datom.source.MergedSource(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(G__11729),null,cljs.core.not_empty(extmap__5511__auto__),null));
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

(datom.source.FilteredSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11741,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11745 = k11741;
var G__11745__$1 = (((G__11745 instanceof cljs.core.Keyword))?G__11745.fqn:null);
switch (G__11745__$1) {
case "src":
return self__.src;

break;
case "pred":
return self__.pred;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11741,else__5472__auto__);

}
}));

(datom.source.FilteredSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11746){
var vec__11747 = p__11746;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11747,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11747,(1),null);
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

(datom.source.FilteredSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11740){
var self__ = this;
var G__11740__$1 = this;
return (new cljs.core.RecordIter((0),G__11740__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"pred","pred",1927423397)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.FilteredSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11742,other11743){
var self__ = this;
var this11742__$1 = this;
return (((!((other11743 == null)))) && ((((this11742__$1.constructor === other11743.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11742__$1.src,other11743.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11742__$1.pred,other11743.pred)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11742__$1.__extmap,other11743.__extmap)))))))));
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

(datom.source.FilteredSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11741){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11750 = k11741;
var G__11750__$1 = (((G__11750 instanceof cljs.core.Keyword))?G__11750.fqn:null);
switch (G__11750__$1) {
case "src":
case "pred":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11741);

}
}));

(datom.source.FilteredSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11740){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11751 = cljs.core.keyword_identical_QMARK_;
var expr__11752 = k__5478__auto__;
if(cljs.core.truth_((pred__11751.cljs$core$IFn$_invoke$arity$2 ? pred__11751.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__11752) : pred__11751.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__11752)))){
return (new datom.source.FilteredSource(G__11740,self__.pred,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__11751.cljs$core$IFn$_invoke$arity$2 ? pred__11751.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pred","pred",1927423397),expr__11752) : pred__11751.call(null,new cljs.core.Keyword(null,"pred","pred",1927423397),expr__11752)))){
return (new datom.source.FilteredSource(self__.src,G__11740,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.FilteredSource(self__.src,self__.pred,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11740),null));
}
}
}));

(datom.source.FilteredSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"pred","pred",1927423397),self__.pred,null))], null),self__.__extmap));
}));

(datom.source.FilteredSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11740){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.FilteredSource(self__.src,self__.pred,G__11740,self__.__extmap,self__.__hash));
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
datom.source.map__GT_FilteredSource = (function datom$source$map__GT_FilteredSource(G__11744){
var extmap__5511__auto__ = (function (){var G__11754 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__11744,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"pred","pred",1927423397)], 0));
if(cljs.core.record_QMARK_(G__11744)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11754);
} else {
return G__11754;
}
})();
return (new datom.source.FilteredSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__11744),new cljs.core.Keyword(null,"pred","pred",1927423397).cljs$core$IFn$_invoke$arity$1(G__11744),null,cljs.core.not_empty(extmap__5511__auto__),null));
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

(datom.source.CountingSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11756,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11760 = k11756;
var G__11760__$1 = (((G__11760 instanceof cljs.core.Keyword))?G__11760.fqn:null);
switch (G__11760__$1) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11756,else__5472__auto__);

}
}));

(datom.source.CountingSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11761){
var vec__11762 = p__11761;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11762,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11762,(1),null);
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

(datom.source.CountingSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11755){
var self__ = this;
var G__11755__$1 = this;
return (new cljs.core.RecordIter((0),G__11755__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"calls","calls",-433802344),new cljs.core.Keyword(null,"quads","quads",1347497505)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.CountingSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11757,other11758){
var self__ = this;
var this11757__$1 = this;
return (((!((other11758 == null)))) && ((((this11757__$1.constructor === other11758.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11757__$1.src,other11758.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11757__$1.calls,other11758.calls)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11757__$1.quads,other11758.quads)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11757__$1.__extmap,other11758.__extmap)))))))))));
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

(datom.source.CountingSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11756){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11765 = k11756;
var G__11765__$1 = (((G__11765 instanceof cljs.core.Keyword))?G__11765.fqn:null);
switch (G__11765__$1) {
case "src":
case "calls":
case "quads":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11756);

}
}));

(datom.source.CountingSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11755){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11766 = cljs.core.keyword_identical_QMARK_;
var expr__11767 = k__5478__auto__;
if(cljs.core.truth_((pred__11766.cljs$core$IFn$_invoke$arity$2 ? pred__11766.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__11767) : pred__11766.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__11767)))){
return (new datom.source.CountingSource(G__11755,self__.calls,self__.quads,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__11766.cljs$core$IFn$_invoke$arity$2 ? pred__11766.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"calls","calls",-433802344),expr__11767) : pred__11766.call(null,new cljs.core.Keyword(null,"calls","calls",-433802344),expr__11767)))){
return (new datom.source.CountingSource(self__.src,G__11755,self__.quads,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__11766.cljs$core$IFn$_invoke$arity$2 ? pred__11766.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"quads","quads",1347497505),expr__11767) : pred__11766.call(null,new cljs.core.Keyword(null,"quads","quads",1347497505),expr__11767)))){
return (new datom.source.CountingSource(self__.src,self__.calls,G__11755,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11755),null));
}
}
}
}));

(datom.source.CountingSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"calls","calls",-433802344),self__.calls,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads,null))], null),self__.__extmap));
}));

(datom.source.CountingSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11755){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,G__11755,self__.__extmap,self__.__hash));
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
datom.source.map__GT_CountingSource = (function datom$source$map__GT_CountingSource(G__11759){
var extmap__5511__auto__ = (function (){var G__11769 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__11759,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"calls","calls",-433802344),new cljs.core.Keyword(null,"quads","quads",1347497505)], 0));
if(cljs.core.record_QMARK_(G__11759)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11769);
} else {
return G__11769;
}
})();
return (new datom.source.CountingSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__11759),new cljs.core.Keyword(null,"calls","calls",-433802344).cljs$core$IFn$_invoke$arity$1(G__11759),new cljs.core.Keyword(null,"quads","quads",1347497505).cljs$core$IFn$_invoke$arity$1(G__11759),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Wrap a source so scans and returned-quad counts are recorded in the atoms
 *   it carries. Comparing architectures needs a number that is not wall-clock —
 *   wall-clock on a warm in-memory store measures the JVM, while scans and quads
 *   measure the DESIGN.
 */
datom.source.counting = (function datom$source$counting(var_args){
var G__11771 = arguments.length;
switch (G__11771) {
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
datom.source.bound_positions = (function datom$source$bound_positions(p__11772){
var vec__11773 = p__11772;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11773,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11773,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11773,(2),null);
var G__11776 = cljs.core.PersistentHashSet.EMPTY;
var G__11776__$1 = (cljs.core.truth_(s)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__11776,new cljs.core.Keyword(null,"s","s",1705939918)):G__11776);
var G__11776__$2 = (cljs.core.truth_(p)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__11776__$1,new cljs.core.Keyword(null,"p","p",151049309)):G__11776__$1);
if(cljs.core.truth_(o)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__11776__$2,new cljs.core.Keyword(null,"o","o",-1350007228));
} else {
return G__11776__$2;
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

(datom.source.ViewSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11778,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11782 = k11778;
var G__11782__$1 = (((G__11782 instanceof cljs.core.Keyword))?G__11782.fqn:null);
switch (G__11782__$1) {
case "answers":
return self__.answers;

break;
case "fallback":
return self__.fallback;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11778,else__5472__auto__);

}
}));

(datom.source.ViewSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11783){
var vec__11784 = p__11783;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11784,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11784,(1),null);
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

(datom.source.ViewSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11777){
var self__ = this;
var G__11777__$1 = this;
return (new cljs.core.RecordIter((0),G__11777__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"answers","answers",-2066449770),new cljs.core.Keyword(null,"fallback","fallback",761637929)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.ViewSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11779,other11780){
var self__ = this;
var this11779__$1 = this;
return (((!((other11780 == null)))) && ((((this11779__$1.constructor === other11780.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11779__$1.answers,other11780.answers)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11779__$1.fallback,other11780.fallback)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11779__$1.__extmap,other11780.__extmap)))))))));
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

(datom.source.ViewSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11778){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11787 = k11778;
var G__11787__$1 = (((G__11787 instanceof cljs.core.Keyword))?G__11787.fqn:null);
switch (G__11787__$1) {
case "answers":
case "fallback":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11778);

}
}));

(datom.source.ViewSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11777){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11788 = cljs.core.keyword_identical_QMARK_;
var expr__11789 = k__5478__auto__;
if(cljs.core.truth_((pred__11788.cljs$core$IFn$_invoke$arity$2 ? pred__11788.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"answers","answers",-2066449770),expr__11789) : pred__11788.call(null,new cljs.core.Keyword(null,"answers","answers",-2066449770),expr__11789)))){
return (new datom.source.ViewSource(G__11777,self__.fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__11788.cljs$core$IFn$_invoke$arity$2 ? pred__11788.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"fallback","fallback",761637929),expr__11789) : pred__11788.call(null,new cljs.core.Keyword(null,"fallback","fallback",761637929),expr__11789)))){
return (new datom.source.ViewSource(self__.answers,G__11777,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.ViewSource(self__.answers,self__.fallback,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11777),null));
}
}
}));

(datom.source.ViewSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"answers","answers",-2066449770),self__.answers,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"fallback","fallback",761637929),self__.fallback,null))], null),self__.__extmap));
}));

(datom.source.ViewSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11777){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.ViewSource(self__.answers,self__.fallback,G__11777,self__.__extmap,self__.__hash));
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
datom.source.map__GT_ViewSource = (function datom$source$map__GT_ViewSource(G__11781){
var extmap__5511__auto__ = (function (){var G__11791 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__11781,new cljs.core.Keyword(null,"answers","answers",-2066449770),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"fallback","fallback",761637929)], 0));
if(cljs.core.record_QMARK_(G__11781)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11791);
} else {
return G__11791;
}
})();
return (new datom.source.ViewSource(new cljs.core.Keyword(null,"answers","answers",-2066449770).cljs$core$IFn$_invoke$arity$1(G__11781),new cljs.core.Keyword(null,"fallback","fallback",761637929).cljs$core$IFn$_invoke$arity$1(G__11781),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
var G__11794 = arguments.length;
switch (G__11794) {
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

(datom.source.view.cljs$core$IFn$_invoke$arity$3 = (function (src,patterns,p__11795){
var map__11796 = p__11795;
var map__11796__$1 = cljs.core.__destructure_map(map__11796);
var fallback_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__11796__$1,new cljs.core.Keyword(null,"fallback?","fallback?",-1074968796),true);
return datom.source.__GT_ViewSource(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,(function (p1__11792_SHARP_){
return datom.source.scan_set(src,p1__11792_SHARP_);
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
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,pattern,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cached,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__11797_SHARP_){
return datom.source.pattern_matches_QMARK_(pattern,p1__11797_SHARP_);
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

(datom.source.CachedSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k11799,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__11803 = k11799;
var G__11803__$1 = (((G__11803 instanceof cljs.core.Keyword))?G__11803.fqn:null);
switch (G__11803__$1) {
case "src":
return self__.src;

break;
case "cache":
return self__.cache;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k11799,else__5472__auto__);

}
}));

(datom.source.CachedSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__11804){
var vec__11805 = p__11804;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11805,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11805,(1),null);
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

(datom.source.CachedSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11798){
var self__ = this;
var G__11798__$1 = this;
return (new cljs.core.RecordIter((0),G__11798__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"cache","cache",-1237023054)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.CachedSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this11800,other11801){
var self__ = this;
var this11800__$1 = this;
return (((!((other11801 == null)))) && ((((this11800__$1.constructor === other11801.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11800__$1.src,other11801.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11800__$1.cache,other11801.cache)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this11800__$1.__extmap,other11801.__extmap)))))))));
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

(datom.source.CachedSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k11799){
var self__ = this;
var this__5476__auto____$1 = this;
var G__11808 = k11799;
var G__11808__$1 = (((G__11808 instanceof cljs.core.Keyword))?G__11808.fqn:null);
switch (G__11808__$1) {
case "src":
case "cache":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k11799);

}
}));

(datom.source.CachedSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__11798){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__11809 = cljs.core.keyword_identical_QMARK_;
var expr__11810 = k__5478__auto__;
if(cljs.core.truth_((pred__11809.cljs$core$IFn$_invoke$arity$2 ? pred__11809.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__11810) : pred__11809.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__11810)))){
return (new datom.source.CachedSource(G__11798,self__.cache,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__11809.cljs$core$IFn$_invoke$arity$2 ? pred__11809.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cache","cache",-1237023054),expr__11810) : pred__11809.call(null,new cljs.core.Keyword(null,"cache","cache",-1237023054),expr__11810)))){
return (new datom.source.CachedSource(self__.src,G__11798,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.CachedSource(self__.src,self__.cache,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__11798),null));
}
}
}));

(datom.source.CachedSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"cache","cache",-1237023054),self__.cache,null))], null),self__.__extmap));
}));

(datom.source.CachedSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__11798){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.CachedSource(self__.src,self__.cache,G__11798,self__.__extmap,self__.__hash));
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
datom.source.map__GT_CachedSource = (function datom$source$map__GT_CachedSource(G__11802){
var extmap__5511__auto__ = (function (){var G__11812 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__11802,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"cache","cache",-1237023054)], 0));
if(cljs.core.record_QMARK_(G__11802)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__11812);
} else {
return G__11812;
}
})();
return (new datom.source.CachedSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__11802),new cljs.core.Keyword(null,"cache","cache",-1237023054).cljs$core$IFn$_invoke$arity$1(G__11802),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
var G__11814 = arguments.length;
switch (G__11814) {
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
