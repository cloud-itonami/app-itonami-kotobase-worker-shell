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
datalog.query.query_seq = (function datalog$query$query_seq(db,p__11579){
var vec__11580 = p__11579;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11580,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11580,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11580,(2),null);
if((!((s == null)))){
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__11583(s__11584){
return (new cljs.core.LazySeq(null,(function (){
var s__11584__$1 = s__11584;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11584__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11589 = cljs.core.first(xs__6385__auto__);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11589,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11589,(1),null);
if((((p == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p,p2)))){
var iterys__5645__auto__ = ((function (s__11584__$1,vec__11589,p2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function datalog$query$query_seq_$_iter__11583_$_iter__11585(s__11586){
return (new cljs.core.LazySeq(null,((function (s__11584__$1,vec__11589,p2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function (){
var s__11586__$1 = s__11586;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11586__$1);
if(temp__5825__auto____$1){
var s__11586__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11586__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11586__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11588 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11587 = (0);
while(true){
if((i__11587 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__11587);
if((((o == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)))){
cljs.core.chunk_append(b__11588,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__11633 = (i__11587 + (1));
i__11587 = G__11633;
continue;
} else {
var G__11634 = (i__11587 + (1));
i__11587 = G__11634;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11588),datalog$query$query_seq_$_iter__11583_$_iter__11585(cljs.core.chunk_rest(s__11586__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11588),null);
}
} else {
var o2 = cljs.core.first(s__11586__$2);
if((((o == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)))){
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__11583_$_iter__11585(cljs.core.rest(s__11586__$2)));
} else {
var G__11635 = cljs.core.rest(s__11586__$2);
s__11586__$1 = G__11635;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__11584__$1,vec__11589,p2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
,null,null));
});})(s__11584__$1,vec__11589,p2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__11583(cljs.core.rest(s__11584__$1)));
} else {
var G__11636 = cljs.core.rest(s__11584__$1);
s__11584__$1 = G__11636;
continue;
}
} else {
var G__11637 = cljs.core.rest(s__11584__$1);
s__11584__$1 = G__11637;
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__11592(s__11593){
return (new cljs.core.LazySeq(null,(function (){
var s__11593__$1 = s__11593;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11593__$1);
if(temp__5825__auto__){
var s__11593__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11593__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11593__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11595 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11594 = (0);
while(true){
if((i__11594 < size__5648__auto__)){
var s2 = cljs.core._nth(c__5647__auto__,i__11594);
cljs.core.chunk_append(b__11595,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null));

var G__11638 = (i__11594 + (1));
i__11594 = G__11638;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11595),datalog$query$query_seq_$_iter__11592(cljs.core.chunk_rest(s__11593__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11595),null);
}
} else {
var s2 = cljs.core.first(s__11593__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null),datalog$query$query_seq_$_iter__11592(cljs.core.rest(s__11593__$2)));
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__11596(s__11597){
return (new cljs.core.LazySeq(null,(function (){
var s__11597__$1 = s__11597;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11597__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11602 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11602,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11602,(1),null);
var iterys__5645__auto__ = ((function (s__11597__$1,vec__11602,s2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function datalog$query$query_seq_$_iter__11596_$_iter__11598(s__11599){
return (new cljs.core.LazySeq(null,((function (s__11597__$1,vec__11602,s2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function (){
var s__11599__$1 = s__11599;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11599__$1);
if(temp__5825__auto____$1){
var s__11599__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__11599__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11599__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11601 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11600 = (0);
while(true){
if((i__11600 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__11600);
cljs.core.chunk_append(b__11601,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__11639 = (i__11600 + (1));
i__11600 = G__11639;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11601),datalog$query$query_seq_$_iter__11596_$_iter__11598(cljs.core.chunk_rest(s__11599__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11601),null);
}
} else {
var o2 = cljs.core.first(s__11599__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__11596_$_iter__11598(cljs.core.rest(s__11599__$2)));
}
} else {
return null;
}
break;
}
});})(s__11597__$1,vec__11602,s2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
,null,null));
});})(s__11597__$1,vec__11602,s2,os,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__11596(cljs.core.rest(s__11597__$1)));
} else {
var G__11640 = cljs.core.rest(s__11597__$1);
s__11597__$1 = G__11640;
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__11605(s__11606){
return (new cljs.core.LazySeq(null,(function (){
var s__11606__$1 = s__11606;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11606__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11613 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11613,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11613,(1),null);
var iterys__5645__auto__ = ((function (s__11606__$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function datalog$query$query_seq_$_iter__11605_$_iter__11607(s__11608){
return (new cljs.core.LazySeq(null,((function (s__11606__$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function (){
var s__11608__$1 = s__11608;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11608__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__11616 = cljs.core.first(xs__6385__auto____$1);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11616,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11616,(1),null);
var iterys__5645__auto__ = ((function (s__11608__$1,s__11606__$1,vec__11616,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function datalog$query$query_seq_$_iter__11605_$_iter__11607_$_iter__11609(s__11610){
return (new cljs.core.LazySeq(null,((function (s__11608__$1,s__11606__$1,vec__11616,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function (){
var s__11610__$1 = s__11610;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__11610__$1);
if(temp__5825__auto____$2){
var s__11610__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__11610__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11610__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11612 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11611 = (0);
while(true){
if((i__11611 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__11611);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)){
cljs.core.chunk_append(b__11612,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__11641 = (i__11611 + (1));
i__11611 = G__11641;
continue;
} else {
var G__11642 = (i__11611 + (1));
i__11611 = G__11642;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11612),datalog$query$query_seq_$_iter__11605_$_iter__11607_$_iter__11609(cljs.core.chunk_rest(s__11610__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11612),null);
}
} else {
var o2 = cljs.core.first(s__11610__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)){
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__11605_$_iter__11607_$_iter__11609(cljs.core.rest(s__11610__$2)));
} else {
var G__11643 = cljs.core.rest(s__11610__$2);
s__11610__$1 = G__11643;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__11608__$1,s__11606__$1,vec__11616,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
,null,null));
});})(s__11608__$1,s__11606__$1,vec__11616,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__11605_$_iter__11607(cljs.core.rest(s__11608__$1)));
} else {
var G__11644 = cljs.core.rest(s__11608__$1);
s__11608__$1 = G__11644;
continue;
}
} else {
return null;
}
break;
}
});})(s__11606__$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
,null,null));
});})(s__11606__$1,vec__11613,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__11605(cljs.core.rest(s__11606__$1)));
} else {
var G__11645 = cljs.core.rest(s__11606__$1);
s__11606__$1 = G__11645;
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__11619(s__11620){
return (new cljs.core.LazySeq(null,(function (){
var s__11620__$1 = s__11620;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__11620__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__11627 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11627,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11627,(1),null);
var iterys__5645__auto__ = ((function (s__11620__$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function datalog$query$query_seq_$_iter__11619_$_iter__11621(s__11622){
return (new cljs.core.LazySeq(null,((function (s__11620__$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function (){
var s__11622__$1 = s__11622;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__11622__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__11630 = cljs.core.first(xs__6385__auto____$1);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11630,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11630,(1),null);
var iterys__5645__auto__ = ((function (s__11622__$1,s__11620__$1,vec__11630,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function datalog$query$query_seq_$_iter__11619_$_iter__11621_$_iter__11623(s__11624){
return (new cljs.core.LazySeq(null,((function (s__11622__$1,s__11620__$1,vec__11630,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o){
return (function (){
var s__11624__$1 = s__11624;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__11624__$1);
if(temp__5825__auto____$2){
var s__11624__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__11624__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__11624__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__11626 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__11625 = (0);
while(true){
if((i__11625 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__11625);
cljs.core.chunk_append(b__11626,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__11646 = (i__11625 + (1));
i__11625 = G__11646;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11626),datalog$query$query_seq_$_iter__11619_$_iter__11621_$_iter__11623(cljs.core.chunk_rest(s__11624__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11626),null);
}
} else {
var o2 = cljs.core.first(s__11624__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__11619_$_iter__11621_$_iter__11623(cljs.core.rest(s__11624__$2)));
}
} else {
return null;
}
break;
}
});})(s__11622__$1,s__11620__$1,vec__11630,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
,null,null));
});})(s__11622__$1,s__11620__$1,vec__11630,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__11619_$_iter__11621(cljs.core.rest(s__11622__$1)));
} else {
var G__11647 = cljs.core.rest(s__11622__$1);
s__11622__$1 = G__11647;
continue;
}
} else {
return null;
}
break;
}
});})(s__11620__$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
,null,null));
});})(s__11620__$1,vec__11627,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__11580,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__11619(cljs.core.rest(s__11620__$1)));
} else {
var G__11648 = cljs.core.rest(s__11620__$1);
s__11620__$1 = G__11648;
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
