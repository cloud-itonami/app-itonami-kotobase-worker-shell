goog.provide('ipld.link');

/**
 * The one way to read a Link's CID.
 * 
 *   `ipld.core`'s own docstring already states the rule this exists to keep:
 *   "Access NEVER goes through deftype fields at call sites (`.-cid`) — nbb and
 *   other lighter cljs runtimes don't implement direct field access, which is
 *   exactly how earlier portability bugs stayed invisible." This namespace was
 *   the place that broke it, in `link-cid` and in both equality implementations.
 * 
 *   Under nbb the consequences were: `link-cid` returned nil, so `link->tag`
 *   threw on `(subs nil 1)` and NO node containing a link could be encoded at
 *   all; and two links to the same CID compared unequal while hashing equal,
 *   which is a broken equality contract — a set of links silently kept
 *   duplicates and a map keyed by link silently missed lookups.
 * 
 *   shadow-cljs compiles deftype fields to real properties, so its suite passed,
 *   and this repo runs its ClojureScript tests under shadow-cljs. A protocol
 *   method works on every runtime, which is the point.
 * @interface
 */
ipld.link.ILink = function(){};

var ipld$link$ILink$_link_cid$dyn_6373 = (function (this$){
var x__5519__auto__ = (((this$ == null))?null:this$);
var m__5520__auto__ = (ipld.link._link_cid[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5520__auto__.call(null,this$));
} else {
var m__5518__auto__ = (ipld.link._link_cid["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5518__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("ILink.-link-cid",this$);
}
}
});
ipld.link._link_cid = (function ipld$link$_link_cid(this$){
if((((!((this$ == null)))) && ((!((this$.ipld$link$ILink$_link_cid$arity$1 == null)))))){
return this$.ipld$link$ILink$_link_cid$arity$1(this$);
} else {
return ipld$link$ILink$_link_cid$dyn_6373(this$);
}
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {ipld.link.ILink}
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
ipld.link.Link = (function (cid,__meta,__extmap,__hash){
this.cid = cid;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(ipld.link.Link.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(ipld.link.Link.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k6358,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__6362 = k6358;
var G__6362__$1 = (((G__6362 instanceof cljs.core.Keyword))?G__6362.fqn:null);
switch (G__6362__$1) {
case "cid":
return self__.cid;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k6358,else__5472__auto__);

}
}));

(ipld.link.Link.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__6363){
var vec__6364 = p__6363;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6364,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6364,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(ipld.link.Link.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#ipld.link.Link{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cid","cid",-1940591320),self__.cid],null))], null),self__.__extmap));
}));

(ipld.link.Link.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__6357){
var self__ = this;
var G__6357__$1 = this;
return (new cljs.core.RecordIter((0),G__6357__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cid","cid",-1940591320)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(ipld.link.Link.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(ipld.link.Link.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new ipld.link.Link(self__.cid,self__.__meta,self__.__extmap,self__.__hash));
}));

(ipld.link.Link.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(ipld.link.Link.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (-866890404 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(ipld.link.Link.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this6359,other6360){
var self__ = this;
var this6359__$1 = this;
return (((!((other6360 == null)))) && ((((this6359__$1.constructor === other6360.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6359__$1.cid,other6360.cid)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this6359__$1.__extmap,other6360.__extmap)))))));
}));

(ipld.link.Link.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cid","cid",-1940591320),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new ipld.link.Link(self__.cid,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(ipld.link.Link.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k6358){
var self__ = this;
var this__5476__auto____$1 = this;
var G__6367 = k6358;
var G__6367__$1 = (((G__6367 instanceof cljs.core.Keyword))?G__6367.fqn:null);
switch (G__6367__$1) {
case "cid":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k6358);

}
}));

(ipld.link.Link.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__6357){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__6368 = cljs.core.keyword_identical_QMARK_;
var expr__6369 = k__5478__auto__;
if(cljs.core.truth_((pred__6368.cljs$core$IFn$_invoke$arity$2 ? pred__6368.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cid","cid",-1940591320),expr__6369) : pred__6368.call(null,new cljs.core.Keyword(null,"cid","cid",-1940591320),expr__6369)))){
return (new ipld.link.Link(G__6357,self__.__meta,self__.__extmap,null));
} else {
return (new ipld.link.Link(self__.cid,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__6357),null));
}
}));

(ipld.link.Link.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"cid","cid",-1940591320),self__.cid,null))], null),self__.__extmap));
}));

(ipld.link.Link.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__6357){
var self__ = this;
var this__5468__auto____$1 = this;
return (new ipld.link.Link(self__.cid,G__6357,self__.__extmap,self__.__hash));
}));

(ipld.link.Link.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(ipld.link.Link.prototype.ipld$link$ILink$ = cljs.core.PROTOCOL_SENTINEL);

(ipld.link.Link.prototype.ipld$link$ILink$_link_cid$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.cid;
}));

(ipld.link.Link.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"cid","cid",-300059793,null)], null);
}));

(ipld.link.Link.cljs$lang$type = true);

(ipld.link.Link.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"ipld.link/Link",null,(1),null));
}));

(ipld.link.Link.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"ipld.link/Link");
}));

/**
 * Positional factory function for ipld.link/Link.
 */
ipld.link.__GT_Link = (function ipld$link$__GT_Link(cid){
return (new ipld.link.Link(cid,null,null,null));
});

/**
 * Factory function for ipld.link/Link, taking a map of keywords to field values.
 */
ipld.link.map__GT_Link = (function ipld$link$map__GT_Link(G__6361){
var extmap__5511__auto__ = (function (){var G__6371 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__6361,new cljs.core.Keyword(null,"cid","cid",-1940591320));
if(cljs.core.record_QMARK_(G__6361)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__6371);
} else {
return G__6371;
}
})();
return (new ipld.link.Link(new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(G__6361),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

/**
 * Wrap a base32 `b`-multibase CIDv1 string as an IPLD link.
 */
ipld.link.link = (function ipld$link$link(cid){
if(((typeof cid === 'string') && (clojure.string.starts_with_QMARK_(cid,"b")))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: link expects a base32 'b' multibase CID string",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid], null));
}

return (new ipld.link.Link(cid,null,null,null));
});
ipld.link.link_QMARK_ = (function ipld$link$link_QMARK_(x){
return (x instanceof ipld.link.Link);
});
/**
 * The CID string inside a Link. Protocol dispatch, never field access —
 *   see `ILink`.
 */
ipld.link.link_cid = (function ipld$link$link_cid(value){
return ipld.link._link_cid(value);
});
ipld.link.link__GT_tag_bytes = (function ipld$link$link__GT_tag_bytes(cid){
var body = multiformats.base32.decode(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cid,(1)));
return (new Uint8Array(cljs.core.clj__GT_js(cljs.core.cons((0),cljs.core.seq(body)))));
});
ipld.link.tag_bytes__GT_link = (function ipld$link$tag_bytes__GT_link(bytes){
var unsigned = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__6372_SHARP_){
return ((p1__6372_SHARP_ | 0) & (255));
}),cljs.core.seq(bytes));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.first(unsigned))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: tag-42 byte string must start with the 0x00 identity multibase prefix",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-byte","first-byte",1559322059),cljs.core.first(unsigned)], null));
}

return (new ipld.link.Link((""+"b"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(multiformats.base32.encode(cljs.core.rest(unsigned)))),null,null,null));
});
/**
 * A Link as tag 42 wrapping `0x00 ++ <binary CID>`.
 */
ipld.link.link__GT_tag = (function ipld$link$link__GT_tag(value){
if(ipld.link.link_QMARK_(value)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: link->tag expects a Link",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),value], null));
}

return cbor.core.tagged((42),ipld.link.link__GT_tag_bytes(ipld.link.link_cid(value)));
});
/**
 * Inverse of `link->tag`; reject every tag other than 42.
 */
ipld.link.tag__GT_link = (function ipld$link$tag__GT_link(tagged){
if(((cbor.core.tagged_QMARK_(tagged)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((42),cbor.core.tag_number(tagged))))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: tag->link expects cbor tag 42",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),((cbor.core.tagged_QMARK_(tagged))?cbor.core.tag_number(tagged):null)], null));
}

return ipld.link.tag_bytes__GT_link(cbor.core.tag_value(tagged));
});

//# sourceMappingURL=ipld.link.js.map
