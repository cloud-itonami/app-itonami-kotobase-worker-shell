goog.provide('ipld.value');
ipld.value.codec_id = "kotoba.value.v1";
ipld.value.code_nil = (0);
ipld.value.code_boolean = (1);
ipld.value.code_integer = (2);
ipld.value.code_float = (3);
ipld.value.code_string = (4);
ipld.value.code_keyword = (5);
ipld.value.code_symbol = (6);
ipld.value.code_bytes = (7);
ipld.value.code_link = (8);
ipld.value.code_int64 = (9);
ipld.value.code_vector = (16);
ipld.value.code_list = (17);
ipld.value.code_set = (18);
ipld.value.code_map = (19);
ipld.value.max_safe_integer = (9007199254740991);
ipld.value.min_safe_integer = (-9007199254740991);
ipld.value.max_int64_decimal = "9223372036854775807";
ipld.value.min_int64_decimal = "-9223372036854775808";
ipld.value.reject_BANG_ = (function ipld$value$reject_BANG_(problem,data){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"ipld.value: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(problem))),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(data,new cljs.core.Keyword(null,"problem","problem",1168155148),problem,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"codec","codec",2063917266),ipld.value.codec_id], 0)));
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
ipld.value.Float64 = (function (value,__meta,__extmap,__hash){
this.value = value;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(ipld.value.Float64.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(ipld.value.Float64.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k9048,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__9052 = k9048;
var G__9052__$1 = (((G__9052 instanceof cljs.core.Keyword))?G__9052.fqn:null);
switch (G__9052__$1) {
case "value":
return self__.value;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k9048,else__5472__auto__);

}
}));

(ipld.value.Float64.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__9053){
var vec__9054 = p__9053;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9054,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9054,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(ipld.value.Float64.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#ipld.value.Float64{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"value","value",305978217),self__.value],null))], null),self__.__extmap));
}));

(ipld.value.Float64.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__9047){
var self__ = this;
var G__9047__$1 = this;
return (new cljs.core.RecordIter((0),G__9047__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"value","value",305978217)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(ipld.value.Float64.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(ipld.value.Float64.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new ipld.value.Float64(self__.value,self__.__meta,self__.__extmap,self__.__hash));
}));

(ipld.value.Float64.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(ipld.value.Float64.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (948052685 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(ipld.value.Float64.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this9049,other9050){
var self__ = this;
var this9049__$1 = this;
return (((!((other9050 == null)))) && ((((this9049__$1.constructor === other9050.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this9049__$1.value,other9050.value)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this9049__$1.__extmap,other9050.__extmap)))))));
}));

(ipld.value.Float64.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new ipld.value.Float64(self__.value,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(ipld.value.Float64.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k9048){
var self__ = this;
var this__5476__auto____$1 = this;
var G__9057 = k9048;
var G__9057__$1 = (((G__9057 instanceof cljs.core.Keyword))?G__9057.fqn:null);
switch (G__9057__$1) {
case "value":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k9048);

}
}));

(ipld.value.Float64.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__9047){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__9058 = cljs.core.keyword_identical_QMARK_;
var expr__9059 = k__5478__auto__;
if(cljs.core.truth_((pred__9058.cljs$core$IFn$_invoke$arity$2 ? pred__9058.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217),expr__9059) : pred__9058.call(null,new cljs.core.Keyword(null,"value","value",305978217),expr__9059)))){
return (new ipld.value.Float64(G__9047,self__.__meta,self__.__extmap,null));
} else {
return (new ipld.value.Float64(self__.value,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__9047),null));
}
}));

(ipld.value.Float64.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"value","value",305978217),self__.value,null))], null),self__.__extmap));
}));

(ipld.value.Float64.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__9047){
var self__ = this;
var this__5468__auto____$1 = this;
return (new ipld.value.Float64(self__.value,G__9047,self__.__extmap,self__.__hash));
}));

(ipld.value.Float64.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(ipld.value.Float64.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"value","value",1946509744,null)], null);
}));

(ipld.value.Float64.cljs$lang$type = true);

(ipld.value.Float64.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"ipld.value/Float64",null,(1),null));
}));

(ipld.value.Float64.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"ipld.value/Float64");
}));

/**
 * Positional factory function for ipld.value/Float64.
 */
ipld.value.__GT_Float64 = (function ipld$value$__GT_Float64(value){
return (new ipld.value.Float64(value,null,null,null));
});

/**
 * Factory function for ipld.value/Float64, taking a map of keywords to field values.
 */
ipld.value.map__GT_Float64 = (function ipld$value$map__GT_Float64(G__9051){
var extmap__5511__auto__ = (function (){var G__9061 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__9051,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.record_QMARK_(G__9051)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__9061);
} else {
return G__9061;
}
})();
return (new ipld.value.Float64(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(G__9051),null,cljs.core.not_empty(extmap__5511__auto__),null));
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
ipld.value.Int64 = (function (decimal,__meta,__extmap,__hash){
this.decimal = decimal;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(ipld.value.Int64.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5469__auto__,k__5470__auto__){
var self__ = this;
var this__5469__auto____$1 = this;
return this__5469__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5470__auto__,null);
}));

(ipld.value.Int64.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5471__auto__,k9063,else__5472__auto__){
var self__ = this;
var this__5471__auto____$1 = this;
var G__9067 = k9063;
var G__9067__$1 = (((G__9067 instanceof cljs.core.Keyword))?G__9067.fqn:null);
switch (G__9067__$1) {
case "decimal":
return self__.decimal;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k9063,else__5472__auto__);

}
}));

(ipld.value.Int64.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5489__auto__,f__5490__auto__,init__5491__auto__){
var self__ = this;
var this__5489__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5492__auto__,p__9068){
var vec__9069 = p__9068;
var k__5493__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9069,(0),null);
var v__5494__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9069,(1),null);
return (f__5490__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5490__auto__.cljs$core$IFn$_invoke$arity$3(ret__5492__auto__,k__5493__auto__,v__5494__auto__) : f__5490__auto__.call(null,ret__5492__auto__,k__5493__auto__,v__5494__auto__));
}),init__5491__auto__,this__5489__auto____$1);
}));

(ipld.value.Int64.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5484__auto__,writer__5485__auto__,opts__5486__auto__){
var self__ = this;
var this__5484__auto____$1 = this;
var pr_pair__5487__auto__ = (function (keyval__5488__auto__){
return cljs.core.pr_sequential_writer(writer__5485__auto__,cljs.core.pr_writer,""," ","",opts__5486__auto__,keyval__5488__auto__);
});
return cljs.core.pr_sequential_writer(writer__5485__auto__,pr_pair__5487__auto__,"#ipld.value.Int64{",", ","}",opts__5486__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"decimal","decimal",-170212044),self__.decimal],null))], null),self__.__extmap));
}));

(ipld.value.Int64.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__9062){
var self__ = this;
var G__9062__$1 = this;
return (new cljs.core.RecordIter((0),G__9062__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"decimal","decimal",-170212044)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(ipld.value.Int64.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5467__auto__){
var self__ = this;
var this__5467__auto____$1 = this;
return self__.__meta;
}));

(ipld.value.Int64.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5464__auto__){
var self__ = this;
var this__5464__auto____$1 = this;
return (new ipld.value.Int64(self__.decimal,self__.__meta,self__.__extmap,self__.__hash));
}));

(ipld.value.Int64.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5473__auto__){
var self__ = this;
var this__5473__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(ipld.value.Int64.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5465__auto__){
var self__ = this;
var this__5465__auto____$1 = this;
var h__5272__auto__ = self__.__hash;
if((!((h__5272__auto__ == null)))){
return h__5272__auto__;
} else {
var h__5272__auto____$1 = (function (coll__5466__auto__){
return (1246942123 ^ cljs.core.hash_unordered_coll(coll__5466__auto__));
})(this__5465__auto____$1);
(self__.__hash = h__5272__auto____$1);

return h__5272__auto____$1;
}
}));

(ipld.value.Int64.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this9064,other9065){
var self__ = this;
var this9064__$1 = this;
return (((!((other9065 == null)))) && ((((this9064__$1.constructor === other9065.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this9064__$1.decimal,other9065.decimal)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this9064__$1.__extmap,other9065.__extmap)))))));
}));

(ipld.value.Int64.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5479__auto__,k__5480__auto__){
var self__ = this;
var this__5479__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"decimal","decimal",-170212044),null], null), null),k__5480__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5479__auto____$1),self__.__meta),k__5480__auto__);
} else {
return (new ipld.value.Int64(self__.decimal,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5480__auto__)),null));
}
}));

(ipld.value.Int64.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5476__auto__,k9063){
var self__ = this;
var this__5476__auto____$1 = this;
var G__9072 = k9063;
var G__9072__$1 = (((G__9072 instanceof cljs.core.Keyword))?G__9072.fqn:null);
switch (G__9072__$1) {
case "decimal":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k9063);

}
}));

(ipld.value.Int64.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5477__auto__,k__5478__auto__,G__9062){
var self__ = this;
var this__5477__auto____$1 = this;
var pred__9073 = cljs.core.keyword_identical_QMARK_;
var expr__9074 = k__5478__auto__;
if(cljs.core.truth_((pred__9073.cljs$core$IFn$_invoke$arity$2 ? pred__9073.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"decimal","decimal",-170212044),expr__9074) : pred__9073.call(null,new cljs.core.Keyword(null,"decimal","decimal",-170212044),expr__9074)))){
return (new ipld.value.Int64(G__9062,self__.__meta,self__.__extmap,null));
} else {
return (new ipld.value.Int64(self__.decimal,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5478__auto__,G__9062),null));
}
}));

(ipld.value.Int64.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5482__auto__){
var self__ = this;
var this__5482__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"decimal","decimal",-170212044),self__.decimal,null))], null),self__.__extmap));
}));

(ipld.value.Int64.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5468__auto__,G__9062){
var self__ = this;
var this__5468__auto____$1 = this;
return (new ipld.value.Int64(self__.decimal,G__9062,self__.__extmap,self__.__hash));
}));

(ipld.value.Int64.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5474__auto__,entry__5475__auto__){
var self__ = this;
var this__5474__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5475__auto__)){
return this__5474__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5475__auto__,(0)),cljs.core._nth(entry__5475__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5474__auto____$1,entry__5475__auto__);
}
}));

(ipld.value.Int64.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"decimal","decimal",1470319483,null)], null);
}));

(ipld.value.Int64.cljs$lang$type = true);

(ipld.value.Int64.cljs$lang$ctorPrSeq = (function (this__5515__auto__){
return (new cljs.core.List(null,"ipld.value/Int64",null,(1),null));
}));

(ipld.value.Int64.cljs$lang$ctorPrWriter = (function (this__5515__auto__,writer__5516__auto__){
return cljs.core._write(writer__5516__auto__,"ipld.value/Int64");
}));

/**
 * Positional factory function for ipld.value/Int64.
 */
ipld.value.__GT_Int64 = (function ipld$value$__GT_Int64(decimal){
return (new ipld.value.Int64(decimal,null,null,null));
});

/**
 * Factory function for ipld.value/Int64, taking a map of keywords to field values.
 */
ipld.value.map__GT_Int64 = (function ipld$value$map__GT_Int64(G__9066){
var extmap__5511__auto__ = (function (){var G__9076 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__9066,new cljs.core.Keyword(null,"decimal","decimal",-170212044));
if(cljs.core.record_QMARK_(G__9066)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__9076);
} else {
return G__9076;
}
})();
return (new ipld.value.Int64(new cljs.core.Keyword(null,"decimal","decimal",-170212044).cljs$core$IFn$_invoke$arity$1(G__9066),null,cljs.core.not_empty(extmap__5511__auto__),null));
});

ipld.value.float64_QMARK_ = (function ipld$value$float64_QMARK_(x){
return (x instanceof ipld.value.Float64);
});
/**
 * The double inside a Float64. Never read `.-value` at a call site — nbb does
 *   not implement direct field access (see `ipld.core`'s Link note).
 */
ipld.value.float64_value = (function ipld$value$float64_value(x){
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(x);
});
ipld.value.int64_QMARK_ = (function ipld$value$int64_QMARK_(x){
return (x instanceof ipld.value.Int64);
});
ipld.value.cljs_bigint_QMARK_ = (function ipld$value$cljs_bigint_QMARK_(x){
return (((!((x == null)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(BigInt,x.constructor)));
});
ipld.value.normalize_int64_decimal = (function ipld$value$normalize_int64_decimal(x){
var n = ((ipld.value.cljs_bigint_QMARK_(x))?x:(cljs.core.truth_((function (){var and__5160__auto__ = typeof x === 'number';
if(and__5160__auto__){
return Number.isSafeInteger(x);
} else {
return and__5160__auto__;
}
})())?BigInt(x):ipld.value.reject_BANG_(new cljs.core.Keyword("value","int64-not-an-exact-integer","value/int64-not-an-exact-integer",931480906),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),x], null))
));
var min_n = BigInt(ipld.value.min_int64_decimal);
var max_n = BigInt(ipld.value.max_int64_decimal);
if((((n < min_n)) || ((n > max_n)))){
ipld.value.reject_BANG_(new cljs.core.Keyword("value","int64-out-of-range","value/int64-out-of-range",-1269754376),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),n.toString(),new cljs.core.Keyword(null,"min","min",444991522),ipld.value.min_int64_decimal,new cljs.core.Keyword(null,"max","max",61366548),ipld.value.max_int64_decimal], null));
} else {
}

return n.toString();
});
/**
 * Wrap an exact signed 64-bit integer. JVM integers and JavaScript BigInts are
 *   normalized to one decimal identity; a JS Number is accepted only while it is
 *   a safe integer.
 */
ipld.value.int64 = (function ipld$value$int64(x){
return ipld.value.__GT_Int64(ipld.value.normalize_int64_decimal(x));
});
/**
 * Return the wrapped exact value as a JVM long or JavaScript BigInt.
 */
ipld.value.int64_value = (function ipld$value$int64_value(x){
if(ipld.value.int64_QMARK_(x)){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","not-int64","value/not-int64",-111059591),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),x], null));
}

return BigInt(new cljs.core.Keyword(null,"decimal","decimal",-170212044).cljs$core$IFn$_invoke$arity$1(x));
});
ipld.value.not_a_number_QMARK_ = (function ipld$value$not_a_number_QMARK_(d){
return Number.isNaN(d);
});
ipld.value.inf_QMARK_ = (function ipld$value$inf_QMARK_(d){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(d,Infinity)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(d,-Infinity)));
});
ipld.value.negative_zero_QMARK_ = (function ipld$value$negative_zero_QMARK_(d){
return ((typeof d === 'number') && ((((d === (0))) && (((1.0 / d) < (0))))));
});
ipld.value.check_finite_BANG_ = (function ipld$value$check_finite_BANG_(d,where){
if(typeof d === 'number'){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","float-not-a-number","value/float-not-a-number",644611157),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"where","where",-2044795965),where,new cljs.core.Keyword(null,"value","value",305978217),d], null));
}

if(cljs.core.truth_(ipld.value.not_a_number_QMARK_(d))){
ipld.value.reject_BANG_(new cljs.core.Keyword("value","float-nan","value/float-nan",1327820099),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"where","where",-2044795965),where], null));
} else {
}

if(ipld.value.inf_QMARK_(d)){
ipld.value.reject_BANG_(new cljs.core.Keyword("value","float-infinite","value/float-infinite",-1964130297),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"where","where",-2044795965),where,new cljs.core.Keyword(null,"value","value",305978217),d], null));
} else {
}

if(ipld.value.negative_zero_QMARK_(d)){
ipld.value.reject_BANG_(new cljs.core.Keyword("value","float-negative-zero","value/float-negative-zero",1168379887),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"where","where",-2044795965),where], null));
} else {
}

return d;
});
/**
 * Wrap a finite double as an explicit float value. NaN, ±Infinity, and -0.0
 *   are rejected here, at the earliest boundary.
 */
ipld.value.float64 = (function ipld$value$float64(d){
return ipld.value.__GT_Float64(ipld.value.check_finite_BANG_(d,new cljs.core.Keyword(null,"float64","float64",1881838306)));
});
ipld.value.float64__GT_bytes = (function ipld$value$float64__GT_bytes(d){
var buf = (new ArrayBuffer((8)));
(new DataView(buf)).setFloat64((0),d,false);

return (new Uint8Array(buf));
});
ipld.value.bytes__GT_float64 = (function ipld$value$bytes__GT_float64(bs){
var u = (new Uint8Array(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__9077_SHARP_){
return (p1__9077_SHARP_ & (255));
}),cljs.core.seq(bs)))));
return (new DataView(u.buffer)).getFloat64((0),false);
});
ipld.value.int64__GT_bytes = (function ipld$value$int64__GT_bytes(x){
var buf = (new ArrayBuffer((8)));
(new DataView(buf)).setBigInt64((0),ipld.value.int64_value(x),false);

return (new Uint8Array(buf));
});
ipld.value.bytes__GT_int64 = (function ipld$value$bytes__GT_int64(bs){
var u = (new Uint8Array(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__9078_SHARP_){
return (p1__9078_SHARP_ & (255));
}),cljs.core.seq(bs)))));
return ipld.value.__GT_Int64((new DataView(u.buffer)).getBigInt64((0),false).toString());
});
ipld.value.bytes_like_QMARK_ = (function ipld$value$bytes_like_QMARK_(x){
return (((x instanceof Uint8Array)) || ((x instanceof Int8Array)));
});
ipld.value.byte_count = (function ipld$value$byte_count(bs){
return bs.length;
});
ipld.value.order_key = (function ipld$value$order_key(form){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__9079_SHARP_){
return (p1__9079_SHARP_ & (255));
}),cljs.core.seq(cbor.core.encode(form)));
});
ipld.value.strictly_ascending_BANG_ = (function ipld$value$strictly_ascending_BANG_(forms,problem){
var prev = null;
var xs = cljs.core.seq(forms);
while(true){
var temp__5825__auto__ = cljs.core.first(xs);
if(cljs.core.truth_(temp__5825__auto__)){
var f = temp__5825__auto__;
var k = ipld.value.order_key(f);
if(cljs.core.truth_((function (){var and__5160__auto__ = prev;
if(cljs.core.truth_(and__5160__auto__)){
return (!((cljs.core.compare(prev,k) < (0))));
} else {
return and__5160__auto__;
}
})())){
ipld.value.reject_BANG_(problem,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"duplicate-or-unordered-at","duplicate-or-unordered-at",370941368),(cljs.core.count(forms) - cljs.core.count(xs))], null));
} else {
}

var G__9102 = k;
var G__9103 = cljs.core.next(xs);
prev = G__9102;
xs = G__9103;
continue;
} else {
return null;
}
break;
}
});
ipld.value.named_text_BANG_ = (function ipld$value$named_text_BANG_(x,to_text,from_text,problem){
var text = (to_text.cljs$core$IFn$_invoke$arity$1 ? to_text.cljs$core$IFn$_invoke$arity$1(x) : to_text.call(null,x));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,(from_text.cljs$core$IFn$_invoke$arity$1 ? from_text.cljs$core$IFn$_invoke$arity$1(text) : from_text.call(null,text)))){
} else {
ipld.value.reject_BANG_(problem,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),x,new cljs.core.Keyword(null,"text","text",-1790561697),text], null));
}

return text;
});
ipld.value.pair__GT_form = (function ipld$value$pair__GT_form(p__9080){
var vec__9081 = p__9080;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9081,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9081,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(ipld.value.value__GT_form.cljs$core$IFn$_invoke$arity$1 ? ipld.value.value__GT_form.cljs$core$IFn$_invoke$arity$1(k) : ipld.value.value__GT_form.call(null,k)),(ipld.value.value__GT_form.cljs$core$IFn$_invoke$arity$1 ? ipld.value.value__GT_form.cljs$core$IFn$_invoke$arity$1(v) : ipld.value.value__GT_form.call(null,v))], null);
});
/**
 * The canonical `[type-code payload]` data for `x`, before CBOR encoding.
 *   Exposed because callers that embed values in a larger canonical structure
 *   (the semantic definition IR) need the form, not a second round of bytes.
 */
ipld.value.value__GT_form = (function ipld$value$value__GT_form(x){
if((x == null)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),null], null);
} else {
if(cljs.core.boolean_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),x], null);
} else {
if(ipld.value.float64_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),ipld.value.float64__GT_bytes(ipld.value.check_finite_BANG_(ipld.value.float64_value(x),new cljs.core.Keyword(null,"encode","encode",-1753429702)))], null);
} else {
if(ipld.value.int64_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(9),ipld.value.int64__GT_bytes(x)], null);
} else {
if(cljs.core.integer_QMARK_(x)){
if((((ipld.value.min_safe_integer <= x)) && ((x <= ipld.value.max_safe_integer)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),x], null);
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","integer-out-of-range","value/integer-out-of-range",-1892269906),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),x,new cljs.core.Keyword(null,"min","min",444991522),ipld.value.min_safe_integer,new cljs.core.Keyword(null,"max","max",61366548),ipld.value.max_safe_integer], null));
}
} else {
if(typeof x === 'number'){
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","unwrapped-number","value/unwrapped-number",-213347131),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),x,new cljs.core.Keyword(null,"hint","hint",439639918),"wrap a float with ipld.value/float64; a bare number is admitted only when integral"], null));
} else {
if(typeof x === 'string'){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(4),x], null);
} else {
if((x instanceof cljs.core.Keyword)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(5),ipld.value.named_text_BANG_(x,(function (p1__9084_SHARP_){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__9084_SHARP_)),(1));
}),cljs.core.keyword,new cljs.core.Keyword("value","keyword-not-round-trippable","value/keyword-not-round-trippable",511511407))], null);
} else {
if((x instanceof cljs.core.Symbol)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(6),ipld.value.named_text_BANG_(x,cljs.core.str,cljs.core.symbol,new cljs.core.Keyword("value","symbol-not-round-trippable","value/symbol-not-round-trippable",536392753))], null);
} else {
if(ipld.value.bytes_like_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(7),x], null);
} else {
if(ipld.link.link_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(8),ipld.link.link__GT_tag(x)], null);
} else {
if(cljs.core.record_QMARK_(x)){
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","record-unsupported","value/record-unsupported",-1804207449),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(x)], null));
} else {
if(cljs.core.vector_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(16),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.value.value__GT_form,x)], null);
} else {
if(cljs.core.set_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(18),cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(ipld.value.order_key,cljs.core.map.cljs$core$IFn$_invoke$arity$2(ipld.value.value__GT_form,x)))], null);
} else {
if(cljs.core.map_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(19),cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(ipld.value.order_key,cljs.core.first),cljs.core.map.cljs$core$IFn$_invoke$arity$2(ipld.value.pair__GT_form,x)))], null);
} else {
if(cljs.core.sequential_QMARK_(x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(17),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.value.value__GT_form,x)], null);
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","unsupported-type","value/unsupported-type",-790209811),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(x),new cljs.core.Keyword(null,"value","value",305978217),x], null));

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
}
}
}
}
});
ipld.value.decoded_pair = (function ipld$value$decoded_pair(p){
if(((cljs.core.vector_QMARK_(p)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(p))))){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","map-entry-malformed","value/map-entry-malformed",-1452611975),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"entry","entry",505168823),p], null));
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__9085 = cljs.core.first(p);
return (ipld.value.form__GT_value.cljs$core$IFn$_invoke$arity$1 ? ipld.value.form__GT_value.cljs$core$IFn$_invoke$arity$1(G__9085) : ipld.value.form__GT_value.call(null,G__9085));
})(),(function (){var G__9086 = cljs.core.second(p);
return (ipld.value.form__GT_value.cljs$core$IFn$_invoke$arity$1 ? ipld.value.form__GT_value.cljs$core$IFn$_invoke$arity$1(G__9086) : ipld.value.form__GT_value.call(null,G__9086));
})()], null);
});
/**
 * Inverse of `value->form`, fail-closed on anything the codec did not produce.
 */
ipld.value.form__GT_value = (function ipld$value$form__GT_value(form){
if(((cljs.core.vector_QMARK_(form)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(form))) && (cljs.core.integer_QMARK_(cljs.core.first(form))))))){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","form-malformed","value/form-malformed",1793427029),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"form","form",-1624062471),form], null));
}

var vec__9088 = form;
var code = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9088,(0),null);
var payload = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9088,(1),null);
var seq_payload_BANG_ = (function (problem){
if(cljs.core.vector_QMARK_(payload)){
} else {
ipld.value.reject_BANG_(problem,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}

return payload;
});
var pred__9091 = cljs.core._EQ_;
var expr__9092 = (code | 0);
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((0),expr__9092) : pred__9091.call(null,(0),expr__9092)))){
if((payload == null)){
return null;
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","nil-payload","value/nil-payload",120540389),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((1),expr__9092) : pred__9091.call(null,(1),expr__9092)))){
if(cljs.core.boolean_QMARK_(payload)){
return payload;
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","boolean-payload","value/boolean-payload",858818227),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((2),expr__9092) : pred__9091.call(null,(2),expr__9092)))){
if(((cljs.core.integer_QMARK_(payload)) && ((((ipld.value.min_safe_integer <= payload)) && ((payload <= ipld.value.max_safe_integer)))))){
return payload;
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","integer-payload","value/integer-payload",366784681),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((3),expr__9092) : pred__9091.call(null,(3),expr__9092)))){
if(((ipld.value.bytes_like_QMARK_(payload)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((8),ipld.value.byte_count(payload))))){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","float-payload","value/float-payload",1753242030),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}

return ipld.value.__GT_Float64(ipld.value.check_finite_BANG_(ipld.value.bytes__GT_float64(payload),new cljs.core.Keyword(null,"decode","decode",-1306165281)));
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((9),expr__9092) : pred__9091.call(null,(9),expr__9092)))){
if(((ipld.value.bytes_like_QMARK_(payload)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((8),ipld.value.byte_count(payload))))){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","int64-payload","value/int64-payload",-2082358209),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}

return ipld.value.bytes__GT_int64(payload);
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((4),expr__9092) : pred__9091.call(null,(4),expr__9092)))){
if(typeof payload === 'string'){
return payload;
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","string-payload","value/string-payload",742509562),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((5),expr__9092) : pred__9091.call(null,(5),expr__9092)))){
if(typeof payload === 'string'){
var k = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(payload);
ipld.value.named_text_BANG_(k,(function (p1__9087_SHARP_){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__9087_SHARP_)),(1));
}),cljs.core.keyword,new cljs.core.Keyword("value","keyword-not-round-trippable","value/keyword-not-round-trippable",511511407));

return k;
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","keyword-payload","value/keyword-payload",-1258411543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((6),expr__9092) : pred__9091.call(null,(6),expr__9092)))){
if(typeof payload === 'string'){
var s = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(payload);
ipld.value.named_text_BANG_(s,cljs.core.str,cljs.core.symbol,new cljs.core.Keyword("value","symbol-not-round-trippable","value/symbol-not-round-trippable",536392753));

return s;
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","symbol-payload","value/symbol-payload",-1103107404),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((7),expr__9092) : pred__9091.call(null,(7),expr__9092)))){
if(ipld.value.bytes_like_QMARK_(payload)){
return payload;
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","bytes-payload","value/bytes-payload",-1621560904),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"payload","payload",-383036092),payload], null));
}
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((8),expr__9092) : pred__9091.call(null,(8),expr__9092)))){
return ipld.link.tag__GT_link(payload);
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((16),expr__9092) : pred__9091.call(null,(16),expr__9092)))){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.value.form__GT_value,seq_payload_BANG_(new cljs.core.Keyword("value","vector-payload","value/vector-payload",-208536127)));
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((17),expr__9092) : pred__9091.call(null,(17),expr__9092)))){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.list,cljs.core.map.cljs$core$IFn$_invoke$arity$2(ipld.value.form__GT_value,seq_payload_BANG_(new cljs.core.Keyword("value","list-payload","value/list-payload",1174651019))));
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((18),expr__9092) : pred__9091.call(null,(18),expr__9092)))){
var items = seq_payload_BANG_(new cljs.core.Keyword("value","set-payload","value/set-payload",-757722108));
ipld.value.strictly_ascending_BANG_(items,new cljs.core.Keyword("value","set-not-canonical","value/set-not-canonical",-629655118));

return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(ipld.value.form__GT_value),items);
} else {
if(cljs.core.truth_((pred__9091.cljs$core$IFn$_invoke$arity$2 ? pred__9091.cljs$core$IFn$_invoke$arity$2((19),expr__9092) : pred__9091.call(null,(19),expr__9092)))){
var pairs = seq_payload_BANG_(new cljs.core.Keyword("value","map-payload","value/map-payload",-2039010728));
var seq__9094_9104 = cljs.core.seq(pairs);
var chunk__9095_9105 = null;
var count__9096_9106 = (0);
var i__9097_9107 = (0);
while(true){
if((i__9097_9107 < count__9096_9106)){
var p_9108 = chunk__9095_9105.cljs$core$IIndexed$_nth$arity$2(null,i__9097_9107);
if(((cljs.core.vector_QMARK_(p_9108)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(p_9108))))){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","map-entry-malformed","value/map-entry-malformed",-1452611975),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"entry","entry",505168823),p_9108], null));
}


var G__9109 = seq__9094_9104;
var G__9110 = chunk__9095_9105;
var G__9111 = count__9096_9106;
var G__9112 = (i__9097_9107 + (1));
seq__9094_9104 = G__9109;
chunk__9095_9105 = G__9110;
count__9096_9106 = G__9111;
i__9097_9107 = G__9112;
continue;
} else {
var temp__5825__auto___9113 = cljs.core.seq(seq__9094_9104);
if(temp__5825__auto___9113){
var seq__9094_9114__$1 = temp__5825__auto___9113;
if(cljs.core.chunked_seq_QMARK_(seq__9094_9114__$1)){
var c__5694__auto___9115 = cljs.core.chunk_first(seq__9094_9114__$1);
var G__9116 = cljs.core.chunk_rest(seq__9094_9114__$1);
var G__9117 = c__5694__auto___9115;
var G__9118 = cljs.core.count(c__5694__auto___9115);
var G__9119 = (0);
seq__9094_9104 = G__9116;
chunk__9095_9105 = G__9117;
count__9096_9106 = G__9118;
i__9097_9107 = G__9119;
continue;
} else {
var p_9120 = cljs.core.first(seq__9094_9114__$1);
if(((cljs.core.vector_QMARK_(p_9120)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(p_9120))))){
} else {
ipld.value.reject_BANG_(new cljs.core.Keyword("value","map-entry-malformed","value/map-entry-malformed",-1452611975),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"entry","entry",505168823),p_9120], null));
}


var G__9121 = cljs.core.next(seq__9094_9114__$1);
var G__9122 = null;
var G__9123 = (0);
var G__9124 = (0);
seq__9094_9104 = G__9121;
chunk__9095_9105 = G__9122;
count__9096_9106 = G__9123;
i__9097_9107 = G__9124;
continue;
}
} else {
}
}
break;
}

ipld.value.strictly_ascending_BANG_(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,pairs),new cljs.core.Keyword("value","map-not-canonical","value/map-not-canonical",430050967));

return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(ipld.value.decoded_pair),pairs);
} else {
return ipld.value.reject_BANG_(new cljs.core.Keyword("value","unknown-type-code","value/unknown-type-code",-2029032604),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"code","code",1586293142),code], null));
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
}
}
});
/**
 * Canonical `kotoba.value.v1` bytes for an admitted EDN value.
 */
ipld.value.encode_value = (function ipld$value$encode_value(x){
return cbor.core.encode(ipld.value.value__GT_form(x));
});
/**
 * Bytes produced by `encode-value` back to the original value.
 */
ipld.value.decode_value = (function ipld$value$decode_value(bs){
return ipld.value.form__GT_value(cbor.core.decode(bs));
});

//# sourceMappingURL=ipld.value.js.map
