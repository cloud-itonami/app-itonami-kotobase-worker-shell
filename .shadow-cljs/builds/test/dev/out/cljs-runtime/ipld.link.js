goog.provide('ipld.link');

/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
*/
ipld.link.Link = (function (cid){
this.cid = cid;
this.cljs$lang$protocol_mask$partition0$ = 6291456;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(ipld.link.Link.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof ipld.link.Link)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.cid,other.cid)));
}));

(ipld.link.Link.prototype.cljs$core$IHash$_hash$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.hash(self__.cid);
}));

(ipld.link.Link.prototype.toString = (function (){
var self__ = this;
var _ = this;
return (""+"#ipld/link \""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.cid)+"\"");
}));

(ipld.link.Link.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"cid","cid",-300059793,null)], null);
}));

(ipld.link.Link.cljs$lang$type = true);

(ipld.link.Link.cljs$lang$ctorStr = "ipld.link/Link");

(ipld.link.Link.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"ipld.link/Link");
}));

/**
 * Positional factory function for ipld.link/Link.
 */
ipld.link.__GT_Link = (function ipld$link$__GT_Link(cid){
return (new ipld.link.Link(cid));
});

/**
 * Wrap a base32 `b`-multibase CIDv1 string as an IPLD link.
 */
ipld.link.link = (function ipld$link$link(cid){
if(((typeof cid === 'string') && (clojure.string.starts_with_QMARK_(cid,"b")))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: link expects a base32 'b' multibase CID string",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid], null));
}

return (new ipld.link.Link(cid));
});
ipld.link.link_QMARK_ = (function ipld$link$link_QMARK_(x){
return (x instanceof ipld.link.Link);
});
ipld.link.link_cid = (function ipld$link$link_cid(value){
return value.cid;
});
ipld.link.link__GT_tag_bytes = (function ipld$link$link__GT_tag_bytes(cid){
var body = multiformats.base32.decode(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cid,(1)));
return (new Uint8Array(cljs.core.clj__GT_js(cljs.core.cons((0),cljs.core.seq(body)))));
});
ipld.link.tag_bytes__GT_link = (function ipld$link$tag_bytes__GT_link(bytes){
var unsigned = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__6212_SHARP_){
return ((p1__6212_SHARP_ | 0) & (255));
}),cljs.core.seq(bytes));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.first(unsigned))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("ipld: tag-42 byte string must start with the 0x00 identity multibase prefix",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-byte","first-byte",1559322059),cljs.core.first(unsigned)], null));
}

return (new ipld.link.Link((""+"b"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(multiformats.base32.encode(cljs.core.rest(unsigned))))));
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
