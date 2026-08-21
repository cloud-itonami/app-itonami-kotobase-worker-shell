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
datalog.query.query_seq = (function datalog$query$query_seq(db,p__9237){
var vec__9238 = p__9237;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9238,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9238,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9238,(2),null);
if((!((s == null)))){
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__9241(s__9242){
return (new cljs.core.LazySeq(null,(function (){
var s__9242__$1 = s__9242;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__9242__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__9247 = cljs.core.first(xs__6385__auto__);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9247,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9247,(1),null);
if((((p == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p,p2)))){
var iterys__5645__auto__ = ((function (s__9242__$1,vec__9247,p2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function datalog$query$query_seq_$_iter__9241_$_iter__9243(s__9244){
return (new cljs.core.LazySeq(null,((function (s__9242__$1,vec__9247,p2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function (){
var s__9244__$1 = s__9244;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__9244__$1);
if(temp__5825__auto____$1){
var s__9244__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__9244__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__9244__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__9246 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__9245 = (0);
while(true){
if((i__9245 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__9245);
if((((o == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)))){
cljs.core.chunk_append(b__9246,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__9301 = (i__9245 + (1));
i__9245 = G__9301;
continue;
} else {
var G__9302 = (i__9245 + (1));
i__9245 = G__9302;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9246),datalog$query$query_seq_$_iter__9241_$_iter__9243(cljs.core.chunk_rest(s__9244__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9246),null);
}
} else {
var o2 = cljs.core.first(s__9244__$2);
if((((o == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)))){
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__9241_$_iter__9243(cljs.core.rest(s__9244__$2)));
} else {
var G__9303 = cljs.core.rest(s__9244__$2);
s__9244__$1 = G__9303;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__9242__$1,vec__9247,p2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
,null,null));
});})(s__9242__$1,vec__9247,p2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__9241(cljs.core.rest(s__9242__$1)));
} else {
var G__9304 = cljs.core.rest(s__9242__$1);
s__9242__$1 = G__9304;
continue;
}
} else {
var G__9305 = cljs.core.rest(s__9242__$1);
s__9242__$1 = G__9305;
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__9250(s__9251){
return (new cljs.core.LazySeq(null,(function (){
var s__9251__$1 = s__9251;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__9251__$1);
if(temp__5825__auto__){
var s__9251__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__9251__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__9251__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__9253 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__9252 = (0);
while(true){
if((i__9252 < size__5648__auto__)){
var s2 = cljs.core._nth(c__5647__auto__,i__9252);
cljs.core.chunk_append(b__9253,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null));

var G__9306 = (i__9252 + (1));
i__9252 = G__9306;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9253),datalog$query$query_seq_$_iter__9250(cljs.core.chunk_rest(s__9251__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9253),null);
}
} else {
var s2 = cljs.core.first(s__9251__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null),datalog$query$query_seq_$_iter__9250(cljs.core.rest(s__9251__$2)));
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__9254(s__9255){
return (new cljs.core.LazySeq(null,(function (){
var s__9255__$1 = s__9255;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__9255__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__9260 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9260,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9260,(1),null);
var iterys__5645__auto__ = ((function (s__9255__$1,vec__9260,s2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function datalog$query$query_seq_$_iter__9254_$_iter__9256(s__9257){
return (new cljs.core.LazySeq(null,((function (s__9255__$1,vec__9260,s2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function (){
var s__9257__$1 = s__9257;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__9257__$1);
if(temp__5825__auto____$1){
var s__9257__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__9257__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__9257__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__9259 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__9258 = (0);
while(true){
if((i__9258 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__9258);
cljs.core.chunk_append(b__9259,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__9307 = (i__9258 + (1));
i__9258 = G__9307;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9259),datalog$query$query_seq_$_iter__9254_$_iter__9256(cljs.core.chunk_rest(s__9257__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9259),null);
}
} else {
var o2 = cljs.core.first(s__9257__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__9254_$_iter__9256(cljs.core.rest(s__9257__$2)));
}
} else {
return null;
}
break;
}
});})(s__9255__$1,vec__9260,s2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
,null,null));
});})(s__9255__$1,vec__9260,s2,os,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__9254(cljs.core.rest(s__9255__$1)));
} else {
var G__9308 = cljs.core.rest(s__9255__$1);
s__9255__$1 = G__9308;
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__9263(s__9264){
return (new cljs.core.LazySeq(null,(function (){
var s__9264__$1 = s__9264;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__9264__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__9271 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9271,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9271,(1),null);
var iterys__5645__auto__ = ((function (s__9264__$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function datalog$query$query_seq_$_iter__9263_$_iter__9265(s__9266){
return (new cljs.core.LazySeq(null,((function (s__9264__$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function (){
var s__9266__$1 = s__9266;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__9266__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__9274 = cljs.core.first(xs__6385__auto____$1);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9274,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9274,(1),null);
var iterys__5645__auto__ = ((function (s__9266__$1,s__9264__$1,vec__9274,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function datalog$query$query_seq_$_iter__9263_$_iter__9265_$_iter__9267(s__9268){
return (new cljs.core.LazySeq(null,((function (s__9266__$1,s__9264__$1,vec__9274,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function (){
var s__9268__$1 = s__9268;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__9268__$1);
if(temp__5825__auto____$2){
var s__9268__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__9268__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__9268__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__9270 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__9269 = (0);
while(true){
if((i__9269 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__9269);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)){
cljs.core.chunk_append(b__9270,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__9309 = (i__9269 + (1));
i__9269 = G__9309;
continue;
} else {
var G__9310 = (i__9269 + (1));
i__9269 = G__9310;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9270),datalog$query$query_seq_$_iter__9263_$_iter__9265_$_iter__9267(cljs.core.chunk_rest(s__9268__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9270),null);
}
} else {
var o2 = cljs.core.first(s__9268__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(o,o2)){
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__9263_$_iter__9265_$_iter__9267(cljs.core.rest(s__9268__$2)));
} else {
var G__9311 = cljs.core.rest(s__9268__$2);
s__9268__$1 = G__9311;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__9266__$1,s__9264__$1,vec__9274,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
,null,null));
});})(s__9266__$1,s__9264__$1,vec__9274,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__9263_$_iter__9265(cljs.core.rest(s__9266__$1)));
} else {
var G__9312 = cljs.core.rest(s__9266__$1);
s__9266__$1 = G__9312;
continue;
}
} else {
return null;
}
break;
}
});})(s__9264__$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
,null,null));
});})(s__9264__$1,vec__9271,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__9263(cljs.core.rest(s__9264__$1)));
} else {
var G__9313 = cljs.core.rest(s__9264__$1);
s__9264__$1 = G__9313;
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
var iter__5649__auto__ = (function datalog$query$query_seq_$_iter__9277(s__9278){
return (new cljs.core.LazySeq(null,(function (){
var s__9278__$1 = s__9278;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__9278__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__9285 = cljs.core.first(xs__6385__auto__);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9285,(0),null);
var pm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9285,(1),null);
var iterys__5645__auto__ = ((function (s__9278__$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function datalog$query$query_seq_$_iter__9277_$_iter__9279(s__9280){
return (new cljs.core.LazySeq(null,((function (s__9278__$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function (){
var s__9280__$1 = s__9280;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__9280__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__9288 = cljs.core.first(xs__6385__auto____$1);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9288,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9288,(1),null);
var iterys__5645__auto__ = ((function (s__9280__$1,s__9278__$1,vec__9288,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function datalog$query$query_seq_$_iter__9277_$_iter__9279_$_iter__9281(s__9282){
return (new cljs.core.LazySeq(null,((function (s__9280__$1,s__9278__$1,vec__9288,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o){
return (function (){
var s__9282__$1 = s__9282;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__9282__$1);
if(temp__5825__auto____$2){
var s__9282__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__9282__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__9282__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__9284 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__9283 = (0);
while(true){
if((i__9283 < size__5648__auto__)){
var o2 = cljs.core._nth(c__5647__auto__,i__9283);
cljs.core.chunk_append(b__9284,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null));

var G__9314 = (i__9283 + (1));
i__9283 = G__9314;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9284),datalog$query$query_seq_$_iter__9277_$_iter__9279_$_iter__9281(cljs.core.chunk_rest(s__9282__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9284),null);
}
} else {
var o2 = cljs.core.first(s__9282__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s2,new cljs.core.Keyword(null,"p","p",151049309),p2,new cljs.core.Keyword(null,"o","o",-1350007228),o2], null),datalog$query$query_seq_$_iter__9277_$_iter__9279_$_iter__9281(cljs.core.rest(s__9282__$2)));
}
} else {
return null;
}
break;
}
});})(s__9280__$1,s__9278__$1,vec__9288,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
,null,null));
});})(s__9280__$1,s__9278__$1,vec__9288,p2,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__9277_$_iter__9279(cljs.core.rest(s__9280__$1)));
} else {
var G__9315 = cljs.core.rest(s__9280__$1);
s__9280__$1 = G__9315;
continue;
}
} else {
return null;
}
break;
}
});})(s__9278__$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
,null,null));
});})(s__9278__$1,vec__9285,s2,pm,xs__6385__auto__,temp__5825__auto__,vec__9238,s,p,o))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(pm));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,datalog$query$query_seq_$_iter__9277(cljs.core.rest(s__9278__$1)));
} else {
var G__9316 = cljs.core.rest(s__9278__$1);
s__9278__$1 = G__9316;
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
 * Quads of `attr` whose object is in `[lo, hi)` under `visible?`.
 * 
 *   Same `visible?` contract as `query`. Default interval is `[lo, hi)`
 *   (`:lo-open? false`, `:hi-open? true`). This is the in-memory form of
 *   Datomic `index-range`; it filters `:pos` rather than cutting a tree.
 */
datalog.query.query_range = (function datalog$query$query_range(var_args){
var G__9292 = arguments.length;
switch (G__9292) {
case 5:
return datalog.query.query_range.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return datalog.query.query_range.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(datalog.query.query_range.cljs$core$IFn$_invoke$arity$5 = (function (db,attr,lo,hi,visible_QMARK_){
return datalog.query.query_range.cljs$core$IFn$_invoke$arity$6(db,attr,lo,hi,visible_QMARK_,cljs.core.PersistentArrayMap.EMPTY);
}));

(datalog.query.query_range.cljs$core$IFn$_invoke$arity$6 = (function (db,attr,lo,hi,visible_QMARK_,opts){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p__9293){
var vec__9294 = p__9293;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9294,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9294,(1),null);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (o){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),attr,new cljs.core.Keyword(null,"o","o",-1350007228),o], null);
}),os);
})),cljs.core.filter.cljs$core$IFn$_invoke$arity$1(visible_QMARK_)),datalog.index.by_predicate_range.cljs$core$IFn$_invoke$arity$5(db,attr,lo,hi,opts));
}));

(datalog.query.query_range.cljs$lang$maxFixedArity = 6);

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
/**
 * Cheap upper bound for how many quads `pattern` can match, derived directly
 *   from the covering indexes without constructing quads or invoking a
 *   visibility predicate.
 * 
 *   This is deliberately NOT `cardinality`: authorization may hide some of the
 *   indexed rows, so the result can be larger than a visible query's result.
 *   That makes it suitable for a query planner's cost hint (an overestimate can
 *   choose a less aggressive strategy but cannot expose a row or change an
 *   answer), while callers that need an exact visible count must continue to use
 *   `cardinality`.
 * 
 *   The common graph-planning cases are proportional to index groups rather than
 *   matching rows: predicate-only patterns sum the sizes of the predicate's
 *   subject buckets, and a fully unbound pattern sums the subject/attribute
 *   buckets. In particular, no `{:s :p :o}` maps are allocated and no set is
 *   built merely to learn a planning number.
 */
datalog.query.estimate_cardinality = (function datalog$query$estimate_cardinality(db,p__9297){
var vec__9298 = p__9297;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9298,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9298,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9298,(2),null);
if((!((s == null)))){
var attrs = datalog.index.entity_attrs(db,s);
if((!((p == null)))){
var os = cljs.core.get.cljs$core$IFn$_invoke$arity$3(attrs,p,cljs.core.PersistentHashSet.EMPTY);
if((!((o == null)))){
if(cljs.core.contains_QMARK_(os,o)){
return (1);
} else {
return (0);
}
} else {
return cljs.core.count(os);
}
} else {
if((!((o == null)))){
return cljs.core.reduce_kv((function (n,_,os){
if(cljs.core.contains_QMARK_(os,o)){
return (n + (1));
} else {
return n;
}
}),(0),attrs);
} else {
return cljs.core.reduce_kv((function (n,_,os){
return (n + cljs.core.count(os));
}),(0),attrs);

}
}
} else {
if((((!((p == null)))) && ((!((o == null)))))){
return cljs.core.count(datalog.index.by_predicate_value(db,p,o));
} else {
if((!((p == null)))){
return cljs.core.reduce_kv((function (n,_,os){
return (n + cljs.core.count(os));
}),(0),datalog.index.by_predicate(db,p));
} else {
if((!((o == null)))){
return cljs.core.reduce_kv((function (n,_,attrs){
return (n + cljs.core.reduce_kv((function (m,___$1,os){
if(cljs.core.contains_QMARK_(os,o)){
return (m + (1));
} else {
return m;
}
}),(0),attrs));
}),(0),new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db));
} else {
return cljs.core.reduce_kv((function (n,_,attrs){
return (n + cljs.core.reduce_kv((function (m,___$1,os){
return (m + cljs.core.count(os));
}),(0),attrs));
}),(0),new cljs.core.Keyword(null,"spo","spo",734923469).cljs$core$IFn$_invoke$arity$1(db));

}
}
}
}
});

//# sourceMappingURL=datalog.query.js.map
