goog.provide('datalog.query');
/**
 * Matching quads as a SEQ, in index order, routed exactly as the ns docstring
 *   describes. `query` turns this into a set; `cardinality` counts it without
 *   ever building one.
 * 
 *   This used to build the set inline, so a caller that only wanted to know HOW
 *   MANY rows a pattern matches still paid to hash every quad into a set and then
 *   discarded it. That caller exists and is not rare: the query planner estimates
 *   every clause this way on every query
 *   (kotobase-peer.core/datalog-query-plan), and one such estimate -- 361,246
 *   rows for a both-ends-unbound `knows` clause -- measured as 38% of an LDBC
 *   IC09 query's total time (kotobase-peer
 *   bench/results/2026-08-02-scan-instrumentation.edn).
 */
datalog.query.query_seq = (function datalog$query$query_seq(db,p__6508){
var vec__6509 = p__6508;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6509,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6509,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6509,(2),null);
if((!((s == null)))){
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__6512(s__6513){
return (new cljs.core.LazySeq(null,(function (){
var s__6513__$1 = s__6513;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__6513__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__6518 = cljs.core.first(xs__6385__auto__);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6518,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6518,(1),null);
if((((p == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p,p2)))){
var iterys__5645__auto__ = ((function (s__6513__$1,vec__6518,p2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function datalog$query$query_seq_$_iter__6512_$_iter__6514(s__6515){
return (new cljs.core.LazySeq(null,((function (s__6513__$1,vec__6518,p2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function (){
var s__6515__$1 = s__6515;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__6515__$1);
if(temp__5825__auto____$1){
var s__6515__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__6515__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__6515__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__6517 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__6516 = (0);
while(true){
if((i__6516 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__6516);
if((((o == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)))){
cljs.core.chunk_append(b__6517,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__6562 = (i__6516 + (1));
i__6516 = G__6562;
continue;
} else {
var G__6563 = (i__6516 + (1));
i__6516 = G__6563;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6517),datalog$query$query_seq_$_iter__6512_$_iter__6514(cljs.core.chunk_rest(s__6515__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6517),null);
}
} else {
var o2 = cljs.core.first(s__6515__$2);
if((((o == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)))){
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__6512_$_iter__6514(cljs.core.rest(s__6515__$2)));
} else {
var G__6564 = cljs.core.rest(s__6515__$2);
s__6515__$1 = G__6564;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__6513__$1,vec__6518,p2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
,null,null));
});})(s__6513__$1,vec__6518,p2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__6512(cljs.core.rest(s__6513__$1)));
} else {
var G__6565 = cljs.core.rest(s__6513__$1);
s__6513__$1 = G__6565;
continue;
}
} else {
var G__6566 = cljs.core.rest(s__6513__$1);
s__6513__$1 = G__6566;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(datalog.index.entity_attrs(db,s));
} else {
if((((!((p == null)))) && ((!((o == null)))))){
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__6521(s__6522){
return (new cljs.core.LazySeq(null,(function (){
var s__6522__$1 = s__6522;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__6522__$1);
if(temp__5825__auto__){
var s__6522__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__6522__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__6522__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__6524 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__6523 = (0);
while(true){
if((i__6523 < size__5648__auto__)){
var s2 = cljs.core._nth(c__5647__auto__,i__6523);
cljs.core.chunk_append(b__6524,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null));

var G__6567 = (i__6523 + (1));
i__6523 = G__6567;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6524),datalog$query$query_seq_$_iter__6521(cljs.core.chunk_rest(s__6522__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6524),null);
}
} else {
var s2 = cljs.core.first(s__6522__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null),datalog$query$query_seq_$_iter__6521(cljs.core.rest(s__6522__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(datalog.index.by_predicate_value(db,p,o));
} else {
if((!((p == null)))){
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__6525(s__6526){
return (new cljs.core.LazySeq(null,(function (){
var s__6526__$1 = s__6526;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__6526__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__6531 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6531,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6531,(1),null);
var iterys__5645__auto__ = ((function (s__6526__$1,vec__6531,s2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function datalog$query$query_seq_$_iter__6525_$_iter__6527(s__6528){
return (new cljs.core.LazySeq(null,((function (s__6526__$1,vec__6531,s2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function (){
var s__6528__$1 = s__6528;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__6528__$1);
if(temp__5825__auto____$1){
var s__6528__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__6528__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__6528__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__6530 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__6529 = (0);
while(true){
if((i__6529 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__6529);
cljs.core.chunk_append(b__6530,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__6568 = (i__6529 + (1));
i__6529 = G__6568;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6530),datalog$query$query_seq_$_iter__6525_$_iter__6527(cljs.core.chunk_rest(s__6528__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6530),null);
}
} else {
var o2 = cljs.core.first(s__6528__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__6525_$_iter__6527(cljs.core.rest(s__6528__$2)));
}
} else {
return null;
}
break;
}
});})(s__6526__$1,vec__6531,s2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
,null,null));
});})(s__6526__$1,vec__6531,s2,os,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__6525(cljs.core.rest(s__6526__$1)));
} else {
var G__6569 = cljs.core.rest(s__6526__$1);
s__6526__$1 = G__6569;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(datalog.index.by_predicate(db,p));
} else {
if((!((o == null)))){
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__6534(s__6535){
return (new cljs.core.LazySeq(null,(function (){
var s__6535__$1 = s__6535;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__6535__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__6542 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6542,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6542,(1),null);
var iterys__5645__auto__ = ((function (s__6535__$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function datalog$query$query_seq_$_iter__6534_$_iter__6536(s__6537){
return (new cljs.core.LazySeq(null,((function (s__6535__$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function (){
var s__6537__$1 = s__6537;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__6537__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__6545 = cljs.core.first(xs__6385__auto____$1);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6545,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6545,(1),null);
var iterys__5645__auto__ = ((function (s__6537__$1,s__6535__$1,vec__6545,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function datalog$query$query_seq_$_iter__6534_$_iter__6536_$_iter__6538(s__6539){
return (new cljs.core.LazySeq(null,((function (s__6537__$1,s__6535__$1,vec__6545,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function (){
var s__6539__$1 = s__6539;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__6539__$1);
if(temp__5825__auto____$2){
var s__6539__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__6539__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__6539__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__6541 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__6540 = (0);
while(true){
if((i__6540 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__6540);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)){
cljs.core.chunk_append(b__6541,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__6570 = (i__6540 + (1));
i__6540 = G__6570;
continue;
} else {
var G__6571 = (i__6540 + (1));
i__6540 = G__6571;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6541),datalog$query$query_seq_$_iter__6534_$_iter__6536_$_iter__6538(cljs.core.chunk_rest(s__6539__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6541),null);
}
} else {
var o2 = cljs.core.first(s__6539__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)){
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__6534_$_iter__6536_$_iter__6538(cljs.core.rest(s__6539__$2)));
} else {
var G__6572 = cljs.core.rest(s__6539__$2);
s__6539__$1 = G__6572;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__6537__$1,s__6535__$1,vec__6545,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
,null,null));
});})(s__6537__$1,s__6535__$1,vec__6545,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__6534_$_iter__6536(cljs.core.rest(s__6537__$1)));
} else {
var G__6573 = cljs.core.rest(s__6537__$1);
s__6537__$1 = G__6573;
continue;
}
} else {
return null;
}
break;
}
});})(s__6535__$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
,null,null));
});})(s__6535__$1,vec__6542,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__6534(cljs.core.rest(s__6535__$1)));
} else {
var G__6574 = cljs.core.rest(s__6535__$1);
s__6535__$1 = G__6574;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db));
} else {
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__6548(s__6549){
return (new cljs.core.LazySeq(null,(function (){
var s__6549__$1 = s__6549;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__6549__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__6556 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6556,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6556,(1),null);
var iterys__5645__auto__ = ((function (s__6549__$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function datalog$query$query_seq_$_iter__6548_$_iter__6550(s__6551){
return (new cljs.core.LazySeq(null,((function (s__6549__$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function (){
var s__6551__$1 = s__6551;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__6551__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__6559 = cljs.core.first(xs__6385__auto____$1);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6559,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6559,(1),null);
var iterys__5645__auto__ = ((function (s__6551__$1,s__6549__$1,vec__6559,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function datalog$query$query_seq_$_iter__6548_$_iter__6550_$_iter__6552(s__6553){
return (new cljs.core.LazySeq(null,((function (s__6551__$1,s__6549__$1,vec__6559,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o){
return (function (){
var s__6553__$1 = s__6553;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__6553__$1);
if(temp__5825__auto____$2){
var s__6553__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__6553__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__6553__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__6555 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__6554 = (0);
while(true){
if((i__6554 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__6554);
cljs.core.chunk_append(b__6555,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__6575 = (i__6554 + (1));
i__6554 = G__6575;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6555),datalog$query$query_seq_$_iter__6548_$_iter__6550_$_iter__6552(cljs.core.chunk_rest(s__6553__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6555),null);
}
} else {
var o2 = cljs.core.first(s__6553__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__6548_$_iter__6550_$_iter__6552(cljs.core.rest(s__6553__$2)));
}
} else {
return null;
}
break;
}
});})(s__6551__$1,s__6549__$1,vec__6559,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
,null,null));
});})(s__6551__$1,s__6549__$1,vec__6559,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__6548_$_iter__6550(cljs.core.rest(s__6551__$1)));
} else {
var G__6576 = cljs.core.rest(s__6551__$1);
s__6551__$1 = G__6576;
continue;
}
} else {
return null;
}
break;
}
});})(s__6549__$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
,null,null));
});})(s__6549__$1,vec__6556,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__6509,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__6548(cljs.core.rest(s__6549__$1)));
} else {
var G__6577 = cljs.core.rest(s__6549__$1);
s__6549__$1 = G__6577;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db));

}
}
}
}
});
/**
 * `pattern` is `[s p o]`, any position `nil` for wildcard. `visible?` is
 *   applied as a post-filter over every candidate quad before it's returned
 *   -- see the ns docstring. Returns a set of matching `{:s :p :o}` quads.
 */
datalog.query.query = (function datalog$query$query(db,pattern,visible_QMARK_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1(visible_QMARK_),datalog.query.query_seq(db,pattern));
});
/**
 * How many quads `pattern` matches under `visible?` -- the same number as
 *   `(count (query db pattern visible?))`, without building the set.
 * 
 *   Same `visible?` contract as `query`: REQUIRED, and applied to every
 *   candidate, so a count can never report rows a read would not return. What is
 *   skipped is only the set -- no hashing, no membership checks, no retained
 *   collection.
 * 
 *   `query` returns a set, so in principle it could report fewer rows than this
 *   counts if a pattern could yield the same quad twice. None can: every branch
 *   of `query-seq` walks its index once and each quad appears at one position in
 *   it. The equivalence test asserts that rather than assuming it.
 */
datalog.query.cardinality = (function datalog$query$cardinality(db,pattern,visible_QMARK_){
return cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(visible_QMARK_,datalog.query.query_seq(db,pattern)));
});

//# sourceMappingURL=datalog.query.js.map
