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

var datom$source$IPatternSource$_scan$dyn_6128 = (function (this$,pattern){
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
return datom$source$IPatternSource$_scan$dyn_6128(this$,pattern);
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
/**
 * Stable order across mixed types so `compare` is never asked to throw.
 *   nil < bool < number < string < keyword < symbol < everything else.
 */
datom.source.type_rank = (function datom$source$type_rank(x){
if((x == null)){
return (0);
} else {
if(cljs.core.boolean_QMARK_(x)){
return (1);
} else {
if(typeof x === 'number'){
return (2);
} else {
if(typeof x === 'string'){
return (3);
} else {
if((x instanceof cljs.core.Keyword)){
return (4);
} else {
if((x instanceof cljs.core.Symbol)){
return (5);
} else {
return (6);

}
}
}
}
}
}
});
/**
 * Total order used by range cuts. Mixed types compare by `type-rank`,
 *   then within a rank by `compare` (or `pr-str` for the catch-all).
 */
datom.source.value_compare = (function datom$source$value_compare(a,b){
var ra = datom.source.type_rank(a);
var rb = datom.source.type_rank(b);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(ra,rb)){
return cljs.core.compare(ra,rb);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((6),ra)){
return cljs.core.compare(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([a], 0)),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([b], 0)));
} else {
return cljs.core.compare(a,b);
}
}
});
/**
 * True when `v` is in the interval described by `lo`/`hi`/`opts`.
 *   Default `opts` is `{ :lo-open? false :hi-open? true }` — `[lo, hi)`.
 *   A nil bound is unbounded.
 */
datom.source.in_range_QMARK_ = (function datom$source$in_range_QMARK_(var_args){
var G__6009 = arguments.length;
switch (G__6009) {
case 3:
return datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$3 = (function (v,lo,hi){
return datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$4(v,lo,hi,cljs.core.PersistentArrayMap.EMPTY);
}));

(datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$4 = (function (v,lo,hi,p__6010){
var map__6011 = p__6010;
var map__6011__$1 = cljs.core.__destructure_map(map__6011);
var lo_open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__6011__$1,new cljs.core.Keyword(null,"lo-open?","lo-open?",1169535129),false);
var hi_open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__6011__$1,new cljs.core.Keyword(null,"hi-open?","hi-open?",-315123739),true);
var c_lo = (((!((lo == null))))?datom.source.value_compare(v,lo):null);
var c_hi = (((!((hi == null))))?datom.source.value_compare(v,hi):null);
var and__5160__auto__ = (function (){var or__5162__auto__ = (c_lo == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
if(cljs.core.truth_(lo_open_QMARK_)){
return (c_lo > (0));
} else {
return (!((c_lo < (0))));
}
}
})();
if(and__5160__auto__){
var or__5162__auto__ = (c_hi == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
if(cljs.core.truth_(hi_open_QMARK_)){
return (c_hi < (0));
} else {
return (!((c_hi > (0))));
}
}
} else {
return and__5160__auto__;
}
}));

(datom.source.in_range_QMARK_.cljs$lang$maxFixedArity = 4);


/**
 * Optional. A source that can cut `[lo, hi)` on one attribute without
 *   scanning every value of that attribute.
 * 
 *   `attr` is the predicate (ground). `lo`/`hi` are value bounds; nil is
 *   unbounded. `opts` is `{:lo-open? bool :hi-open? bool}`.
 * 
 *   Implementations MUST return every matching quad exactly once and MUST
 *   not return a quad whose `:p` is not `attr` or whose `:o` fails
 *   `in-range?`. Order is not guaranteed — same contract as `-scan`.
 * 
 *   A source that cannot prune (HMAC-blinded keys, hash maps) MAY still
 *   implement this by scanning the attribute and filtering: the protocol
 *   is the call shape, not a promise of I/O savings. Callers that need
 *   to know whether the cut was cheap must measure, the way `counting`
 *   already does for scans.
 * @interface
 */
datom.source.IRangeSource = function(){};

var datom$source$IRangeSource$_scan_range$dyn_6130 = (function (this$,attr,lo,hi,opts){
var x__5519__auto__ = (((this$ == null))?null:this$);
var m__5520__auto__ = (datom.source._scan_range[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$5 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$5(this$,attr,lo,hi,opts) : m__5520__auto__.call(null,this$,attr,lo,hi,opts));
} else {
var m__5518__auto__ = (datom.source._scan_range["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$5 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$5(this$,attr,lo,hi,opts) : m__5518__auto__.call(null,this$,attr,lo,hi,opts));
} else {
throw cljs.core.missing_protocol("IRangeSource.-scan-range",this$);
}
}
});
datom.source._scan_range = (function datom$source$_scan_range(this$,attr,lo,hi,opts){
if((((!((this$ == null)))) && ((!((this$.datom$source$IRangeSource$_scan_range$arity$5 == null)))))){
return this$.datom$source$IRangeSource$_scan_range$arity$5(this$,attr,lo,hi,opts);
} else {
return datom$source$IRangeSource$_scan_range$dyn_6130(this$,attr,lo,hi,opts);
}
});

/**
 * Attribute prefix + `in-range?`. Correct for every IPatternSource, and
 *   the thing a source that does not implement IRangeSource degrades to.
 */
datom.source.fallback_range = (function datom$source$fallback_range(src,attr,lo,hi,opts){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__6012_SHARP_){
return datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(p1__6012_SHARP_),lo,hi,opts);
})),datom.source.scan(src,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,attr,null], null)));
});
/**
 * Quads of `attr` whose object is in `[lo, hi)` (see `in-range?`).
 * 
 *   Uses `IRangeSource` when the source implements it; otherwise the
 *   attribute scan plus a value filter. That fallback is correct and
 *   may be the whole tree — which is why lake/columnar and prolly-tree
 *   implement the protocol rather than relying on it.
 */
datom.source.scan_range = (function datom$source$scan_range(var_args){
var G__6014 = arguments.length;
switch (G__6014) {
case 4:
return datom.source.scan_range.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return datom.source.scan_range.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datom.source.scan_range.cljs$core$IFn$_invoke$arity$4 = (function (src,attr,lo,hi){
return datom.source.scan_range.cljs$core$IFn$_invoke$arity$5(src,attr,lo,hi,cljs.core.PersistentArrayMap.EMPTY);
}));

(datom.source.scan_range.cljs$core$IFn$_invoke$arity$5 = (function (src,attr,lo,hi,opts){
if((((!((src == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === src.datom$source$IRangeSource$))))?true:(((!src.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(datom.source.IRangeSource,src):false)):cljs.core.native_satisfies_QMARK_(datom.source.IRangeSource,src))){
return datom.source._scan_range(src,attr,lo,hi,opts);
} else {
return datom.source.fallback_range(src,attr,lo,hi,opts);
}
}));

(datom.source.scan_range.cljs$lang$maxFixedArity = 5);

datom.source.matches_QMARK_ = (function datom$source$matches_QMARK_(p__6016,p__6017){
var map__6018 = p__6016;
var map__6018__$1 = cljs.core.__destructure_map(map__6018);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6018__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6018__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6018__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var vec__6019 = p__6017;
var ps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6019,(0),null);
var pp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6019,(1),null);
var po = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6019,(2),null);
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
 * @implements {datom.source.IRangeSource}
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

(datom.source.SeqSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6024,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6028 = k6024;
var G__6028__$1 = (((G__6028 instanceof cljs.core.Keyword))?G__6028.fqn:null);
switch (G__6028__$1) {
case "quads":
return self__.quads;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6024,else__5472__auto__);

}
}));

(datom.source.SeqSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6029){
var vec__6030 = p__6029;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6030,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6030,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.SeqSource.prototype.datom$source$IRangeSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.SeqSource.prototype.datom$source$IRangeSource$_scan_range$arity$5 = (function (_,attr,lo,hi,opts){
var self__ = this;
var ___$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (q){
return (((((attr == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(attr,new cljs.core.Keyword(null,"p","p",151049309).cljs$core$IFn$_invoke$arity$1(q))))) && (datom.source.in_range_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"o","o",-1350007228).cljs$core$IFn$_invoke$arity$1(q),lo,hi,opts)));
}),self__.quads));
}));

(datom.source.SeqSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.SeqSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads],null))], null),self__.__extmap));
}));

(datom.source.SeqSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6023){
var self__ = this;
var G__6023__$1 = this;
return (new cljs.core.RecordIter((0),G__6023__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"quads","quads",1347497505)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(datom.source.SeqSource.prototype.datom$source$IPatternSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.SeqSource.prototype.datom$source$IPatternSource$_scan$arity$2 = (function (_,pattern){
var self__ = this;
var ___$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__6022_SHARP_){
return datom.source.matches_QMARK_(p1__6022_SHARP_,pattern);
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

(datom.source.SeqSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6025,other6026){
var self__ = this;
var this6025__$1 = this;
return (((!((other6026 == null)))) && ((((this6025__$1.constructor === other6026.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6025__$1.quads,other6026.quads)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6025__$1.__extmap,other6026.__extmap)))))));
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

(datom.source.SeqSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6024){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6033 = k6024;
var G__6033__$1 = (((G__6033 instanceof cljs.core.Keyword))?G__6033.fqn:null);
switch (G__6033__$1) {
case "quads":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6024);

}
}));

(datom.source.SeqSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6023){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6034 = cljs.core.keyword_identical_QMARK_;
var expr__6035 = k__5478__auto__;
if(cljs.core.truth_((pred__6034.cljs$core$IFn$_invoke$arity$2 ? pred__6034.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6035) : pred__6034.call(null,new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6035)))){
return (new datom.source.SeqSource(G__6023,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.SeqSource(self__.quads,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6023),null));
}
}));

(datom.source.SeqSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads,null))], null),self__.__extmap));
}));

(datom.source.SeqSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6023){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.SeqSource(self__.quads,G__6023,self__.__extmap,self__.__hash));
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
datom.source.map__GT_SeqSource = (function datom$source$map__GT_SeqSource(G__6027){
var extmap__5511__auto__ = (function (){var G__6037 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__6027,new cljs.core.Keyword(null,"quads","quads",1347497505));
if(cljs.core.record_QMARK_(G__6027)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6037);
} else {
return G__6037;
}
})();
return (new datom.source.SeqSource(new cljs.core.Keyword(null,"quads","quads",1347497505).cljs$core$IFn$_invoke$arity$1(G__6027),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
 * @implements {datom.source.IRangeSource}
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

(datom.source.MergedSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6039,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6043 = k6039;
var G__6043__$1 = (((G__6043 instanceof cljs.core.Keyword))?G__6043.fqn:null);
switch (G__6043__$1) {
case "sources":
return self__.sources;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6039,else__5472__auto__);

}
}));

(datom.source.MergedSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6044){
var vec__6045 = p__6044;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6045,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6045,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.MergedSource.prototype.datom$source$IRangeSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.MergedSource.prototype.datom$source$IRangeSource$_scan_range$arity$5 = (function (_,attr,lo,hi,opts){
var self__ = this;
var ___$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,s){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(acc,datom.source.scan_range.cljs$core$IFn$_invoke$arity$5(s,attr,lo,hi,opts));
}),cljs.core.PersistentHashSet.EMPTY,self__.sources);
}));

(datom.source.MergedSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.MergedSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"sources","sources",-321166424),self__.sources],null))], null),self__.__extmap));
}));

(datom.source.MergedSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6038){
var self__ = this;
var G__6038__$1 = this;
return (new cljs.core.RecordIter((0),G__6038__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sources","sources",-321166424)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.MergedSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6040,other6041){
var self__ = this;
var this6040__$1 = this;
return (((!((other6041 == null)))) && ((((this6040__$1.constructor === other6041.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6040__$1.sources,other6041.sources)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6040__$1.__extmap,other6041.__extmap)))))));
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

(datom.source.MergedSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6039){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6048 = k6039;
var G__6048__$1 = (((G__6048 instanceof cljs.core.Keyword))?G__6048.fqn:null);
switch (G__6048__$1) {
case "sources":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6039);

}
}));

(datom.source.MergedSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6038){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6049 = cljs.core.keyword_identical_QMARK_;
var expr__6050 = k__5478__auto__;
if(cljs.core.truth_((pred__6049.cljs$core$IFn$_invoke$arity$2 ? pred__6049.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sources","sources",-321166424),expr__6050) : pred__6049.call(null,new cljs.core.Keyword(null,"sources","sources",-321166424),expr__6050)))){
return (new datom.source.MergedSource(G__6038,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.MergedSource(self__.sources,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6038),null));
}
}));

(datom.source.MergedSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"sources","sources",-321166424),self__.sources,null))], null),self__.__extmap));
}));

(datom.source.MergedSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6038){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.MergedSource(self__.sources,G__6038,self__.__extmap,self__.__hash));
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
datom.source.map__GT_MergedSource = (function datom$source$map__GT_MergedSource(G__6042){
var extmap__5511__auto__ = (function (){var G__6052 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__6042,new cljs.core.Keyword(null,"sources","sources",-321166424));
if(cljs.core.record_QMARK_(G__6042)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6052);
} else {
return G__6052;
}
})();
return (new datom.source.MergedSource(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(G__6042),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
 * @implements {datom.source.IRangeSource}
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

(datom.source.FilteredSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6054,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6058 = k6054;
var G__6058__$1 = (((G__6058 instanceof cljs.core.Keyword))?G__6058.fqn:null);
switch (G__6058__$1) {
case "src":
return self__.src;

break;
case "pred":
return self__.pred;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6054,else__5472__auto__);

}
}));

(datom.source.FilteredSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6059){
var vec__6060 = p__6059;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6060,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6060,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.FilteredSource.prototype.datom$source$IRangeSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.FilteredSource.prototype.datom$source$IRangeSource$_scan_range$arity$5 = (function (_,attr,lo,hi,opts){
var self__ = this;
var ___$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(self__.pred),datom.source.scan_range.cljs$core$IFn$_invoke$arity$5(self__.src,attr,lo,hi,opts));
}));

(datom.source.FilteredSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.FilteredSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"src","src",-1651076051),self__.src],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"pred","pred",1927423397),self__.pred],null))], null),self__.__extmap));
}));

(datom.source.FilteredSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6053){
var self__ = this;
var G__6053__$1 = this;
return (new cljs.core.RecordIter((0),G__6053__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"pred","pred",1927423397)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.FilteredSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6055,other6056){
var self__ = this;
var this6055__$1 = this;
return (((!((other6056 == null)))) && ((((this6055__$1.constructor === other6056.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6055__$1.src,other6056.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6055__$1.pred,other6056.pred)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6055__$1.__extmap,other6056.__extmap)))))))));
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

(datom.source.FilteredSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6054){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6063 = k6054;
var G__6063__$1 = (((G__6063 instanceof cljs.core.Keyword))?G__6063.fqn:null);
switch (G__6063__$1) {
case "src":
case "pred":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6054);

}
}));

(datom.source.FilteredSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6053){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6064 = cljs.core.keyword_identical_QMARK_;
var expr__6065 = k__5478__auto__;
if(cljs.core.truth_((pred__6064.cljs$core$IFn$_invoke$arity$2 ? pred__6064.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__6065) : pred__6064.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__6065)))){
return (new datom.source.FilteredSource(G__6053,self__.pred,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6064.cljs$core$IFn$_invoke$arity$2 ? pred__6064.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pred","pred",1927423397),expr__6065) : pred__6064.call(null,new cljs.core.Keyword(null,"pred","pred",1927423397),expr__6065)))){
return (new datom.source.FilteredSource(self__.src,G__6053,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.FilteredSource(self__.src,self__.pred,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6053),null));
}
}
}));

(datom.source.FilteredSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"pred","pred",1927423397),self__.pred,null))], null),self__.__extmap));
}));

(datom.source.FilteredSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6053){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.FilteredSource(self__.src,self__.pred,G__6053,self__.__extmap,self__.__hash));
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
datom.source.map__GT_FilteredSource = (function datom$source$map__GT_FilteredSource(G__6057){
var extmap__5511__auto__ = (function (){var G__6067 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6057,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"pred","pred",1927423397)], 0));
if(cljs.core.record_QMARK_(G__6057)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6067);
} else {
return G__6067;
}
})();
return (new datom.source.FilteredSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__6057),new cljs.core.Keyword(null,"pred","pred",1927423397).cljs$core$IFn$_invoke$arity$1(G__6057),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
 * @implements {datom.source.IRangeSource}
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

(datom.source.CountingSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6069,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6073 = k6069;
var G__6073__$1 = (((G__6073 instanceof cljs.core.Keyword))?G__6073.fqn:null);
switch (G__6073__$1) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6069,else__5472__auto__);

}
}));

(datom.source.CountingSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6074){
var vec__6075 = p__6074;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6075,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6075,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.CountingSource.prototype.datom$source$IRangeSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.CountingSource.prototype.datom$source$IRangeSource$_scan_range$arity$5 = (function (_,attr,lo,hi,opts){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.calls,cljs.core.inc);

var r = datom.source.scan_range.cljs$core$IFn$_invoke$arity$5(self__.src,attr,lo,hi,opts);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.quads,cljs.core._PLUS_,cljs.core.count(r));

return r;
}));

(datom.source.CountingSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.CountingSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"src","src",-1651076051),self__.src],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"calls","calls",-433802344),self__.calls],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads],null))], null),self__.__extmap));
}));

(datom.source.CountingSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6068){
var self__ = this;
var G__6068__$1 = this;
return (new cljs.core.RecordIter((0),G__6068__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"calls","calls",-433802344),new cljs.core.Keyword(null,"quads","quads",1347497505)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.CountingSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6070,other6071){
var self__ = this;
var this6070__$1 = this;
return (((!((other6071 == null)))) && ((((this6070__$1.constructor === other6071.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6070__$1.src,other6071.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6070__$1.calls,other6071.calls)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6070__$1.quads,other6071.quads)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6070__$1.__extmap,other6071.__extmap)))))))))));
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

(datom.source.CountingSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6069){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6078 = k6069;
var G__6078__$1 = (((G__6078 instanceof cljs.core.Keyword))?G__6078.fqn:null);
switch (G__6078__$1) {
case "src":
case "calls":
case "quads":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6069);

}
}));

(datom.source.CountingSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6068){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6079 = cljs.core.keyword_identical_QMARK_;
var expr__6080 = k__5478__auto__;
if(cljs.core.truth_((pred__6079.cljs$core$IFn$_invoke$arity$2 ? pred__6079.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__6080) : pred__6079.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__6080)))){
return (new datom.source.CountingSource(G__6068,self__.calls,self__.quads,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6079.cljs$core$IFn$_invoke$arity$2 ? pred__6079.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"calls","calls",-433802344),expr__6080) : pred__6079.call(null,new cljs.core.Keyword(null,"calls","calls",-433802344),expr__6080)))){
return (new datom.source.CountingSource(self__.src,G__6068,self__.quads,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6079.cljs$core$IFn$_invoke$arity$2 ? pred__6079.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6080) : pred__6079.call(null,new cljs.core.Keyword(null,"quads","quads",1347497505),expr__6080)))){
return (new datom.source.CountingSource(self__.src,self__.calls,G__6068,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6068),null));
}
}
}
}));

(datom.source.CountingSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"calls","calls",-433802344),self__.calls,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"quads","quads",1347497505),self__.quads,null))], null),self__.__extmap));
}));

(datom.source.CountingSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6068){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.CountingSource(self__.src,self__.calls,self__.quads,G__6068,self__.__extmap,self__.__hash));
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
datom.source.map__GT_CountingSource = (function datom$source$map__GT_CountingSource(G__6072){
var extmap__5511__auto__ = (function (){var G__6082 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6072,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"calls","calls",-433802344),new cljs.core.Keyword(null,"quads","quads",1347497505)], 0));
if(cljs.core.record_QMARK_(G__6072)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6082);
} else {
return G__6082;
}
})();
return (new datom.source.CountingSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__6072),new cljs.core.Keyword(null,"calls","calls",-433802344).cljs$core$IFn$_invoke$arity$1(G__6072),new cljs.core.Keyword(null,"quads","quads",1347497505).cljs$core$IFn$_invoke$arity$1(G__6072),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Wrap a source so scans and returned-quad counts are recorded in the atoms
 *   it carries. Comparing architectures needs a number that is not wall-clock —
 *   wall-clock on a warm in-memory store measures the JVM, while scans and quads
 *   measure the DESIGN.
 */
datom.source.counting = (function datom$source$counting(var_args){
var G__6084 = arguments.length;
switch (G__6084) {
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
datom.source.bound_positions = (function datom$source$bound_positions(p__6085){
var vec__6086 = p__6085;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6086,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6086,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6086,(2),null);
var G__6089 = cljs.core.PersistentHashSet.EMPTY;
var G__6089__$1 = (cljs.core.truth_(s)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__6089,new cljs.core.Keyword(null,"s","s",1705939918)):G__6089);
var G__6089__$2 = (cljs.core.truth_(p)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__6089__$1,new cljs.core.Keyword(null,"p","p",151049309)):G__6089__$1);
if(cljs.core.truth_(o)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__6089__$2,new cljs.core.Keyword(null,"o","o",-1350007228));
} else {
return G__6089__$2;
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
 * @implements {datom.source.IRangeSource}
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

(datom.source.ViewSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6091,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6095 = k6091;
var G__6095__$1 = (((G__6095 instanceof cljs.core.Keyword))?G__6095.fqn:null);
switch (G__6095__$1) {
case "answers":
return self__.answers;

break;
case "fallback":
return self__.fallback;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6091,else__5472__auto__);

}
}));

(datom.source.ViewSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6096){
var vec__6097 = p__6096;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6097,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6097,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.ViewSource.prototype.datom$source$IRangeSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.ViewSource.prototype.datom$source$IRangeSource$_scan_range$arity$5 = (function (_,attr,lo,hi,opts){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.fallback)){
return datom.source.scan_range.cljs$core$IFn$_invoke$arity$5(self__.fallback,attr,lo,hi,opts);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("range not covered by this view, and no fallback",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"problem","problem",1168155148),new cljs.core.Keyword("datom.source","uncovered-range","datom.source/uncovered-range",138283638),new cljs.core.Keyword(null,"attr","attr",-604132353),attr,new cljs.core.Keyword(null,"lo","lo",-931799889),lo,new cljs.core.Keyword(null,"hi","hi",-1821422114),hi], null));
}
}));

(datom.source.ViewSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.ViewSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"answers","answers",-2066449770),self__.answers],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"fallback","fallback",761637929),self__.fallback],null))], null),self__.__extmap));
}));

(datom.source.ViewSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6090){
var self__ = this;
var G__6090__$1 = this;
return (new cljs.core.RecordIter((0),G__6090__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"answers","answers",-2066449770),new cljs.core.Keyword(null,"fallback","fallback",761637929)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.ViewSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6092,other6093){
var self__ = this;
var this6092__$1 = this;
return (((!((other6093 == null)))) && ((((this6092__$1.constructor === other6093.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6092__$1.answers,other6093.answers)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6092__$1.fallback,other6093.fallback)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6092__$1.__extmap,other6093.__extmap)))))))));
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

(datom.source.ViewSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6091){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6100 = k6091;
var G__6100__$1 = (((G__6100 instanceof cljs.core.Keyword))?G__6100.fqn:null);
switch (G__6100__$1) {
case "answers":
case "fallback":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6091);

}
}));

(datom.source.ViewSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6090){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6101 = cljs.core.keyword_identical_QMARK_;
var expr__6102 = k__5478__auto__;
if(cljs.core.truth_((pred__6101.cljs$core$IFn$_invoke$arity$2 ? pred__6101.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"answers","answers",-2066449770),expr__6102) : pred__6101.call(null,new cljs.core.Keyword(null,"answers","answers",-2066449770),expr__6102)))){
return (new datom.source.ViewSource(G__6090,self__.fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6101.cljs$core$IFn$_invoke$arity$2 ? pred__6101.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"fallback","fallback",761637929),expr__6102) : pred__6101.call(null,new cljs.core.Keyword(null,"fallback","fallback",761637929),expr__6102)))){
return (new datom.source.ViewSource(self__.answers,G__6090,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.ViewSource(self__.answers,self__.fallback,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6090),null));
}
}
}));

(datom.source.ViewSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"answers","answers",-2066449770),self__.answers,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"fallback","fallback",761637929),self__.fallback,null))], null),self__.__extmap));
}));

(datom.source.ViewSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6090){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.ViewSource(self__.answers,self__.fallback,G__6090,self__.__extmap,self__.__hash));
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
datom.source.map__GT_ViewSource = (function datom$source$map__GT_ViewSource(G__6094){
var extmap__5511__auto__ = (function (){var G__6104 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6094,new cljs.core.Keyword(null,"answers","answers",-2066449770),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"fallback","fallback",761637929)], 0));
if(cljs.core.record_QMARK_(G__6094)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6104);
} else {
return G__6104;
}
})();
return (new datom.source.ViewSource(new cljs.core.Keyword(null,"answers","answers",-2066449770).cljs$core$IFn$_invoke$arity$1(G__6094),new cljs.core.Keyword(null,"fallback","fallback",761637929).cljs$core$IFn$_invoke$arity$1(G__6094),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
var G__6107 = arguments.length;
switch (G__6107) {
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

(datom.source.view.cljs$core$IFn$_invoke$arity$3 = (function (src,patterns,p__6108){
var map__6109 = p__6108;
var map__6109__$1 = cljs.core.__destructure_map(map__6109);
var fallback_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__6109__$1,new cljs.core.Keyword(null,"fallback?","fallback?",-1074968796),true);
return datom.source.__GT_ViewSource(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,(function (p1__6105_SHARP_){
return datom.source.scan_set(src,p1__6105_SHARP_);
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
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,pattern,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cached,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p1__6110_SHARP_){
return datom.source.pattern_matches_QMARK_(pattern,p1__6110_SHARP_);
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
 * @implements {datom.source.IRangeSource}
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

(datom.source.CachedSource.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6112,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6116 = k6112;
var G__6116__$1 = (((G__6116 instanceof cljs.core.Keyword))?G__6116.fqn:null);
switch (G__6116__$1) {
case "src":
return self__.src;

break;
case "cache":
return self__.cache;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6112,else__5472__auto__);

}
}));

(datom.source.CachedSource.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6117){
var vec__6118 = p__6117;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6118,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6118,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(datom.source.CachedSource.prototype.datom$source$IRangeSource$ = cljs.core.PROTOCOL_SENTINEL);

(datom.source.CachedSource.prototype.datom$source$IRangeSource$_scan_range$arity$5 = (function (_,attr,lo,hi,opts){
var self__ = this;
var ___$1 = this;
var k = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"range","range",1639692286),attr,lo,hi,opts], null);
var temp__5823__auto__ = cljs.core.find(cljs.core.deref(self__.cache),k);
if(cljs.core.truth_(temp__5823__auto__)){
var hit = temp__5823__auto__;
return cljs.core.val(hit);
} else {
var r = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,datom.source.scan_range.cljs$core$IFn$_invoke$arity$5(self__.src,attr,lo,hi,opts));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cache,cljs.core.assoc,k,r);

return r;
}
}));

(datom.source.CachedSource.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#datom.source.CachedSource{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"src","src",-1651076051),self__.src],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cache","cache",-1237023054),self__.cache],null))], null),self__.__extmap));
}));

(datom.source.CachedSource.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6111){
var self__ = this;
var G__6111__$1 = this;
return (new cljs.core.RecordIter((0),G__6111__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"cache","cache",-1237023054)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(datom.source.CachedSource.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6113,other6114){
var self__ = this;
var this6113__$1 = this;
return (((!((other6114 == null)))) && ((((this6113__$1.constructor === other6114.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6113__$1.src,other6114.src)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6113__$1.cache,other6114.cache)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6113__$1.__extmap,other6114.__extmap)))))))));
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

(datom.source.CachedSource.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6112){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6121 = k6112;
var G__6121__$1 = (((G__6121 instanceof cljs.core.Keyword))?G__6121.fqn:null);
switch (G__6121__$1) {
case "src":
case "cache":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6112);

}
}));

(datom.source.CachedSource.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6111){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6122 = cljs.core.keyword_identical_QMARK_;
var expr__6123 = k__5478__auto__;
if(cljs.core.truth_((pred__6122.cljs$core$IFn$_invoke$arity$2 ? pred__6122.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),expr__6123) : pred__6122.call(null,new cljs.core.Keyword(null,"src","src",-1651076051),expr__6123)))){
return (new datom.source.CachedSource(G__6111,self__.cache,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__6122.cljs$core$IFn$_invoke$arity$2 ? pred__6122.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cache","cache",-1237023054),expr__6123) : pred__6122.call(null,new cljs.core.Keyword(null,"cache","cache",-1237023054),expr__6123)))){
return (new datom.source.CachedSource(self__.src,G__6111,self__.__meta,self__.__extmap,null));
} else {
return (new datom.source.CachedSource(self__.src,self__.cache,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6111),null));
}
}
}));

(datom.source.CachedSource.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"src","src",-1651076051),self__.src,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"cache","cache",-1237023054),self__.cache,null))], null),self__.__extmap));
}));

(datom.source.CachedSource.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6111){
var self__ = this;
var this__5468__auto____$1 = this;
return (new datom.source.CachedSource(self__.src,self__.cache,G__6111,self__.__extmap,self__.__hash));
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
datom.source.map__GT_CachedSource = (function datom$source$map__GT_CachedSource(G__6115){
var extmap__5511__auto__ = (function (){var G__6125 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__6115,new cljs.core.Keyword(null,"src","src",-1651076051),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"cache","cache",-1237023054)], 0));
if(cljs.core.record_QMARK_(G__6115)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6125);
} else {
return G__6125;
}
})();
return (new datom.source.CachedSource(new cljs.core.Keyword(null,"src","src",-1651076051).cljs$core$IFn$_invoke$arity$1(G__6115),new cljs.core.Keyword(null,"cache","cache",-1237023054).cljs$core$IFn$_invoke$arity$1(G__6115),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
var G__6127 = arguments.length;
switch (G__6127) {
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
