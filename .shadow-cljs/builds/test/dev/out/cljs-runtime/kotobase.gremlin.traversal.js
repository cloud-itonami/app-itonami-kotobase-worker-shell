goog.provide('kotobase.gremlin.traversal');
/**
 * An `ex-info` for any traversal-translation failure -- out-of-scope step,
 *   malformed bytecode, missing/duplicate terminal step, wrong arity. `code`
 *   is a short machine-readable keyword (mirrors `kotobase.protocols.cypher`'s
 *   `:cypher/code` convention, this repo's own naming); `msg` is the
 *   human-readable message callers (including `kotobase.gremlin.wire`) should
 *   surface.
 */
kotobase.gremlin.traversal.gremlin_err = (function kotobase$gremlin$traversal$gremlin_err(code,msg){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("gremlin","code","gremlin/code",-1917770120),code,new cljs.core.Keyword("gremlin","message","gremlin/message",-147861088),msg], null));
});
/**
 * The full v0.1 step vocabulary -- anything else is rejected by `translate`
 *   with a clear, explicit error naming both what WAS given and the
 *   out-of-scope list this repo does not implement (ADR-2607172500).
 */
kotobase.gremlin.traversal.known_steps = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Keyword(null,"hasLabel","hasLabel",672737249),null,new cljs.core.Keyword(null,"limit","limit",-1355822363),null,new cljs.core.Keyword(null,"out","out",-910545517),null,new cljs.core.Keyword(null,"values","values",372645556),null,new cljs.core.Keyword(null,"count","count",2139924085),null,new cljs.core.Keyword(null,"dedup","dedup",-353714954),null,new cljs.core.Keyword(null,"has","has",1466247447),null,new cljs.core.Keyword(null,"hasNot","hasNot",-855001609),null,new cljs.core.Keyword(null,"order","order",-1254677256),null,new cljs.core.Keyword(null,"V","V",-1169284006),null,new cljs.core.Keyword(null,"in","in",-1531184865),null], null), null);
/**
 * Steps that operate on the PROJECTED RESULTS rather than on the traversal.
 * 
 *   They come after `.values(prop)` and are applied by `execute` to the result
 *   vector, because that is what they mean: `.limit(2)` bounds the answer, not
 *   the join. Pushing them into the Datalog `:where` would require the bridge
 *   to have a notion of order and of a row window, which it does not.
 * 
 *   `.order()` is bare — TinkerPop's `.by()` modulators (`.order().by('age',
 *   desc)`) are out of scope, and `.order()` with no `.by()` is natural
 *   ascending in TinkerPop too, so the bare form means what it means there.
 * 
 *   `.dedup()` is accepted and is a NO-OP on this backend: the bridge's Datalog
 *   `q` already has set semantics, so results arrive distinct. It is kept
 *   because a Gremlin user writes it habitually and erroring would be hostile,
 *   and it is documented as a no-op because claiming it collapses something
 *   would misplace where the collapse happens.
 */
kotobase.gremlin.traversal.post_steps = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"limit","limit",-1355822363),null,new cljs.core.Keyword(null,"count","count",2139924085),null,new cljs.core.Keyword(null,"dedup","dedup",-353714954),null,new cljs.core.Keyword(null,"order","order",-1254677256),null], null), null);
kotobase.gremlin.traversal.out_of_scope_note = "Explicitly OUT OF SCOPE for v0.1 (ADR-2607172500): full Gremlin script eval, .repeat()/variable-length paths, lambda/closure steps, mutation steps (addV/addE/drop/property), transactions, GraphBinary serialization, multi-key .values(k1,k2,...) fan-out, .hasLabel/.has OR-semantics.";
kotobase.gremlin.traversal.step_arity_err = (function kotobase$gremlin$traversal$step_arity_err(step_name,n,args){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","bad-arity","gremlin/bad-arity",1926437185),(""+"step "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(step_name))+" expects exactly "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)+" argument"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(n,(1)))?"s":null))+", got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))+": "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([args], 0)))));
});
kotobase.gremlin.traversal.unknown_step_err = (function kotobase$gremlin$traversal$unknown_step_err(tup){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","unsupported-step","gremlin/unsupported-step",696333344),(""+"unsupported traversal step "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([tup], 0)))+" -- v0.1 only supports "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.traversal.known_steps))], 0)))+". "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.traversal.out_of_scope_note)));
});
kotobase.gremlin.traversal.var_sym = (function kotobase$gremlin$traversal$var_sym(n){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?v"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)));
});
kotobase.gremlin.traversal.step_name = (function kotobase$gremlin$traversal$step_name(tup){
if(((cljs.core.vector_QMARK_(tup)) && (((cljs.core.seq(tup)) && ((cljs.core.first(tup) instanceof cljs.core.Keyword)))))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","malformed-step","gremlin/malformed-step",-7569097),(""+"each bytecode step must be a vector starting with a keyword"+" step name, e.g. [:hasLabel \"users\"] -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([tup], 0)))));
}

return cljs.core.first(tup);
});
/**
 * `bytecode` (a vector of `[step-name & args]` tuples, see ns docstring) ->
 *   a `kotobase.query.bridge`-shaped query descriptor:
 *   `{:query {:find [...] :where [...]} :terminal-prop "..."}`.
 * 
 *   Throws `ex-info` (`(:gremlin/code (ex-data e))`, `(:gremlin/message
 *   (ex-data e))`) for anything outside the v0.1 subset -- see ns docstring's
 *   step table. Never silently accepts or partially executes out-of-scope
 *   syntax.
 * 
 *   `bytecode` MUST start with `[:V]` and end with exactly one `[:values
 *   prop]` step (the terminal/projection step) -- both requirements are this
 *   repo's own v0.1 convention (documented in the ns docstring), not
 *   something TinkerPop itself mandates for every traversal.
 */
kotobase.gremlin.traversal.translate = (function kotobase$gremlin$traversal$translate(bytecode){
if(((cljs.core.sequential_QMARK_(bytecode)) && (cljs.core.seq(bytecode)))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","empty-bytecode","gremlin/empty-bytecode",-1299830706),"bytecode must be a non-empty vector of [step-name & args] tuples");
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"V","V",-1169284006),kotobase.gremlin.traversal.step_name(cljs.core.first(bytecode)))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","missing-V","gremlin/missing-V",1006214286),(""+"bytecode must start with [:V] (g.V()) -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.first(bytecode)], 0)))));
}

var vidx_12296 = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,t){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(t))){
return i;
} else {
return null;
}
}),bytecode));
if(cljs.core.truth_(vidx_12296)){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","missing-terminal-values","gremlin/missing-terminal-values",275201033),(""+"bytecode must contain exactly one [:values prop] step"+" (the projection step) -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.last(bytecode)], 0)))));
}

if(cljs.core.truth_(cljs.core.some((function (p1__12244_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(p1__12244_SHARP_));
}),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((vidx_12296 + (1)),bytecode)))){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","values-not-terminal","gremlin/values-not-terminal",-794432038),".values(prop) is only supported ONCE, as the projection step");
} else {
}

var post_12297 = cljs.core.vec(cljs.core.drop.cljs$core$IFn$_invoke$arity$2((vidx_12296 + (1)),bytecode));
var seq__12247_12298 = cljs.core.seq(post_12297);
var chunk__12248_12299 = null;
var count__12249_12300 = (0);
var i__12250_12301 = (0);
while(true){
if((i__12250_12301 < count__12249_12300)){
var t_12302 = chunk__12248_12299.cljs$core$IIndexed$_nth$arity$2(null,i__12250_12301);
if(cljs.core.contains_QMARK_(kotobase.gremlin.traversal.post_steps,kotobase.gremlin.traversal.step_name(t_12302))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","step-after-values","gremlin/step-after-values",-600589914),(""+"only "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.traversal.post_steps)], 0)))+" may follow"+" .values(prop) -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([t_12302], 0)))));
}


var G__12303 = seq__12247_12298;
var G__12304 = chunk__12248_12299;
var G__12305 = count__12249_12300;
var G__12306 = (i__12250_12301 + (1));
seq__12247_12298 = G__12303;
chunk__12248_12299 = G__12304;
count__12249_12300 = G__12305;
i__12250_12301 = G__12306;
continue;
} else {
var temp__5825__auto___12307 = cljs.core.seq(seq__12247_12298);
if(temp__5825__auto___12307){
var seq__12247_12308__$1 = temp__5825__auto___12307;
if(cljs.core.chunked_seq_QMARK_(seq__12247_12308__$1)){
var c__5694__auto___12309 = cljs.core.chunk_first(seq__12247_12308__$1);
var G__12310 = cljs.core.chunk_rest(seq__12247_12308__$1);
var G__12311 = c__5694__auto___12309;
var G__12312 = cljs.core.count(c__5694__auto___12309);
var G__12313 = (0);
seq__12247_12298 = G__12310;
chunk__12248_12299 = G__12311;
count__12249_12300 = G__12312;
i__12250_12301 = G__12313;
continue;
} else {
var t_12314 = cljs.core.first(seq__12247_12308__$1);
if(cljs.core.contains_QMARK_(kotobase.gremlin.traversal.post_steps,kotobase.gremlin.traversal.step_name(t_12314))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","step-after-values","gremlin/step-after-values",-600589914),(""+"only "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.traversal.post_steps)], 0)))+" may follow"+" .values(prop) -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([t_12314], 0)))));
}


var G__12315 = cljs.core.next(seq__12247_12308__$1);
var G__12316 = null;
var G__12317 = (0);
var G__12318 = (0);
seq__12247_12298 = G__12315;
chunk__12248_12299 = G__12316;
count__12249_12300 = G__12317;
i__12250_12301 = G__12318;
continue;
}
} else {
}
}
break;
}

var seq__12251_12319 = cljs.core.seq(cljs.core.butlast(post_12297));
var chunk__12252_12320 = null;
var count__12253_12321 = (0);
var i__12254_12322 = (0);
while(true){
if((i__12254_12322 < count__12253_12321)){
var t_12323 = chunk__12252_12320.cljs$core$IIndexed$_nth$arity$2(null,i__12254_12322);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"count","count",2139924085),kotobase.gremlin.traversal.step_name(t_12323))){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","count-not-last","gremlin/count-not-last",-1247142637),".count() reduces the traversal to a number, so nothing may follow it");
} else {
}


var G__12324 = seq__12251_12319;
var G__12325 = chunk__12252_12320;
var G__12326 = count__12253_12321;
var G__12327 = (i__12254_12322 + (1));
seq__12251_12319 = G__12324;
chunk__12252_12320 = G__12325;
count__12253_12321 = G__12326;
i__12254_12322 = G__12327;
continue;
} else {
var temp__5825__auto___12328 = cljs.core.seq(seq__12251_12319);
if(temp__5825__auto___12328){
var seq__12251_12329__$1 = temp__5825__auto___12328;
if(cljs.core.chunked_seq_QMARK_(seq__12251_12329__$1)){
var c__5694__auto___12330 = cljs.core.chunk_first(seq__12251_12329__$1);
var G__12331 = cljs.core.chunk_rest(seq__12251_12329__$1);
var G__12332 = c__5694__auto___12330;
var G__12333 = cljs.core.count(c__5694__auto___12330);
var G__12334 = (0);
seq__12251_12319 = G__12331;
chunk__12252_12320 = G__12332;
count__12253_12321 = G__12333;
i__12254_12322 = G__12334;
continue;
} else {
var t_12335 = cljs.core.first(seq__12251_12329__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"count","count",2139924085),kotobase.gremlin.traversal.step_name(t_12335))){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","count-not-last","gremlin/count-not-last",-1247142637),".count() reduces the traversal to a number, so nothing may follow it");
} else {
}


var G__12336 = cljs.core.next(seq__12251_12329__$1);
var G__12337 = null;
var G__12338 = (0);
var G__12339 = (0);
seq__12251_12319 = G__12336;
chunk__12252_12320 = G__12337;
count__12253_12321 = G__12338;
i__12254_12322 = G__12339;
continue;
}
} else {
}
}
break;
}

var seq__12255_12340 = cljs.core.seq(post_12297);
var chunk__12256_12341 = null;
var count__12257_12342 = (0);
var i__12258_12343 = (0);
while(true){
if((i__12258_12343 < count__12257_12342)){
var t_12344 = chunk__12256_12341.cljs$core$IIndexed$_nth$arity$2(null,i__12258_12343);
var vec__12265_12345 = t_12344;
var seq__12266_12346 = cljs.core.seq(vec__12265_12345);
var first__12267_12347 = cljs.core.first(seq__12266_12346);
var seq__12266_12348__$1 = cljs.core.next(seq__12266_12346);
var op_12349 = first__12267_12347;
var args_12350 = seq__12266_12348__$1;
var want_12351 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363),op_12349))?(1):(0));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(want_12351,cljs.core.count(args_12350))){
kotobase.gremlin.traversal.step_arity_err(op_12349,want_12351,args_12350);
} else {
}


var G__12352 = seq__12255_12340;
var G__12353 = chunk__12256_12341;
var G__12354 = count__12257_12342;
var G__12355 = (i__12258_12343 + (1));
seq__12255_12340 = G__12352;
chunk__12256_12341 = G__12353;
count__12257_12342 = G__12354;
i__12258_12343 = G__12355;
continue;
} else {
var temp__5825__auto___12356 = cljs.core.seq(seq__12255_12340);
if(temp__5825__auto___12356){
var seq__12255_12357__$1 = temp__5825__auto___12356;
if(cljs.core.chunked_seq_QMARK_(seq__12255_12357__$1)){
var c__5694__auto___12358 = cljs.core.chunk_first(seq__12255_12357__$1);
var G__12359 = cljs.core.chunk_rest(seq__12255_12357__$1);
var G__12360 = c__5694__auto___12358;
var G__12361 = cljs.core.count(c__5694__auto___12358);
var G__12362 = (0);
seq__12255_12340 = G__12359;
chunk__12256_12341 = G__12360;
count__12257_12342 = G__12361;
i__12258_12343 = G__12362;
continue;
} else {
var t_12363 = cljs.core.first(seq__12255_12357__$1);
var vec__12268_12364 = t_12363;
var seq__12269_12365 = cljs.core.seq(vec__12268_12364);
var first__12270_12366 = cljs.core.first(seq__12269_12365);
var seq__12269_12367__$1 = cljs.core.next(seq__12269_12365);
var op_12368 = first__12270_12366;
var args_12369 = seq__12269_12367__$1;
var want_12370 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363),op_12368))?(1):(0));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(want_12370,cljs.core.count(args_12369))){
kotobase.gremlin.traversal.step_arity_err(op_12368,want_12370,args_12369);
} else {
}


var G__12371 = cljs.core.next(seq__12255_12357__$1);
var G__12372 = null;
var G__12373 = (0);
var G__12374 = (0);
seq__12255_12340 = G__12371;
chunk__12256_12341 = G__12372;
count__12257_12342 = G__12373;
i__12258_12343 = G__12374;
continue;
}
} else {
}
}
break;
}

var temp__5825__auto___12375 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__12245_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363),kotobase.gremlin.traversal.step_name(p1__12245_SHARP_));
}),post_12297));
if(cljs.core.truth_(temp__5825__auto___12375)){
var vec__12271_12376 = temp__5825__auto___12375;
var __12377 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12271_12376,(0),null);
var n_12378 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12271_12376,(1),null);
if(((cljs.core.integer_QMARK_(n_12378)) && ((!((n_12378 < (0))))))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","bad-limit","gremlin/bad-limit",742081479),(""+".limit(n) expects a non-negative integer -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([n_12378], 0)))));
}
} else {
}

var steps = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__12246_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(p1__12246_SHARP_));
}),cljs.core.rest(bytecode));
var cur_var = kotobase.gremlin.traversal.var_sym((0));
var next_id = (1);
var where = cljs.core.PersistentVector.EMPTY;
while(true){
var tup = cljs.core.first(steps);
var vec__12283 = tup;
var seq__12284 = cljs.core.seq(vec__12283);
var first__12285 = cljs.core.first(seq__12284);
var seq__12284__$1 = cljs.core.next(seq__12284);
var op = first__12285;
var args = seq__12284__$1;
if((tup == null)){
var vidx = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2(((function (steps,cur_var,next_id,where,tup,vec__12283,seq__12284,first__12285,seq__12284__$1,op,args){
return (function (i,t){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(t))){
return i;
} else {
return null;
}
});})(steps,cur_var,next_id,where,tup,vec__12283,seq__12284,first__12285,seq__12284__$1,op,args))
,bytecode));
var vec__12286 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(bytecode,vidx);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12286,(0),null);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12286,(1),null);
var result_var = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?r"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(next_id)));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(bytecode,vidx)))){
kotobase.gremlin.traversal.step_arity_err(new cljs.core.Keyword(null,"values","values",372645556),(1),cljs.core.rest(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(bytecode,vidx)));
} else {
}

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [result_var], null),new cljs.core.Keyword(null,"where","where",-2044795965),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop))),result_var], null))], null),new cljs.core.Keyword(null,"vertex-var","vertex-var",1566096661),cur_var,new cljs.core.Keyword(null,"post","post",269697687),cljs.core.vec(cljs.core.drop.cljs$core$IFn$_invoke$arity$2((vidx + (1)),bytecode))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"V","V",-1169284006),op)){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","duplicate-V","gremlin/duplicate-V",-149692505),"[:V] (g.V()) is only supported as the FIRST step in v0.1");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"hasLabel","hasLabel",672737249),op)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args))){
kotobase.gremlin.traversal.step_arity_err(op,(1),args);
} else {
}

var G__12379 = cljs.core.rest(steps);
var G__12380 = cur_var;
var G__12381 = next_id;
var G__12382 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,new cljs.core.Keyword("kotobase","coll","kotobase/coll",-1195202821),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args)))], null));
steps = G__12379;
cur_var = G__12380;
next_id = G__12381;
where = G__12382;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"has","has",1466247447),op)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(args))){
kotobase.gremlin.traversal.step_arity_err(op,(2),args);
} else {
}

var vec__12289 = args;
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12289,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12289,(1),null);
var G__12383 = cljs.core.rest(steps);
var G__12384 = cur_var;
var G__12385 = next_id;
var G__12386 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop))),v], null));
steps = G__12383;
cur_var = G__12384;
next_id = G__12385;
where = G__12386;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"hasNot","hasNot",-855001609),op)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args))){
kotobase.gremlin.traversal.step_arity_err(op,(1),args);
} else {
}

var G__12387 = cljs.core.rest(steps);
var G__12388 = cur_var;
var G__12389 = next_id;
var G__12390 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args)))),new cljs.core.Symbol(null,"_","_",-1201019570,null)], null),null,(1),null)),(2),null)));
steps = G__12387;
cur_var = G__12388;
next_id = G__12389;
where = G__12390;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"out","out",-910545517),op)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args))){
kotobase.gremlin.traversal.step_arity_err(op,(1),args);
} else {
}

var edge_label = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args)));
var fk_var = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?fk"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(next_id)));
var new_var = kotobase.gremlin.traversal.var_sym(next_id);
var G__12391 = cljs.core.rest(steps);
var G__12392 = new_var;
var G__12393 = (next_id + (1));
var G__12394 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(edge_label),fk_var], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_var,new cljs.core.Keyword("kotobase","key","kotobase/key",-1670563723),fk_var], null));
steps = G__12391;
cur_var = G__12392;
next_id = G__12393;
where = G__12394;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"in","in",-1531184865),op)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args))){
kotobase.gremlin.traversal.step_arity_err(op,(1),args);
} else {
}

var edge_label = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args)));
var fk_var = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?fk"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(next_id)));
var new_var = kotobase.gremlin.traversal.var_sym(next_id);
var G__12395 = cljs.core.rest(steps);
var G__12396 = new_var;
var G__12397 = (next_id + (1));
var G__12398 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(edge_label),fk_var], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,new cljs.core.Keyword("kotobase","key","kotobase/key",-1670563723),fk_var], null));
steps = G__12395;
cur_var = G__12396;
next_id = G__12397;
where = G__12398;
continue;
} else {
return kotobase.gremlin.traversal.unknown_step_err(tup);

}
}
}
}
}
}
}
break;
}
});
/**
 * Run bytecode-shaped `bytecode` (see ns docstring) against `ctx`:
 *   `{:store IStore :vertex-colls [coll-key ...] :visible? (fn [datom] bool)}`.
 * 
 *   Translates `bytecode` (via `translate`) into a `kotobase.query.bridge`
 *   query, materializes `:vertex-colls` from `:store`, runs the query filtered
 *   by the REQUIRED `:visible?` predicate, and returns a SORTED vector of
 *   projected `.values(prop)` results (see ns docstring's "Result semantics"
 *   section).
 * 
 *   Post-projection steps -- `.dedup()`, `.order()`, `.limit(n)`, `.count()` --
 *   are applied here, in the order they were written, because that is what they
 *   mean: `.limit(2)` bounds the answer, not the join. `.count()` reduces to a
 *   one-element vector holding the number.
 * 
 *   Throws immediately (a ctx-construction bug, not a traversal error) if
 *   `:visible?` is missing, or if `:vertex-colls` is missing/empty (ADR-
 *   2607050500 discipline, same as `kotobase.query.bridge`/
 *   `kotobase.protocols.cypher`).
 */
kotobase.gremlin.traversal.execute = (function kotobase$gremlin$traversal$execute(p__12292,bytecode){
var map__12293 = p__12292;
var map__12293__$1 = cljs.core.__destructure_map(map__12293);
var ctx = map__12293__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12293__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var vertex_colls = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12293__$1,new cljs.core.Keyword(null,"vertex-colls","vertex-colls",-1707425754));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12293__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
if(cljs.core.fn_QMARK_(visible_QMARK_)){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","missing-visible","gremlin/missing-visible",-902188430),(""+"kotobase.gremlin.traversal/execute requires ctx :visible? -- a"+" REQUIRED predicate fn over materialized datoms, no permissive"+" default (ADR-2607050500). Pass (constantly true) to see"+" everything materialized."));
}

if(((cljs.core.sequential_QMARK_(vertex_colls)) && (cljs.core.seq(vertex_colls)))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","missing-vertex-colls","gremlin/missing-vertex-colls",-1291991589),(""+"kotobase.gremlin.traversal/execute requires ctx :vertex-colls --"+" a REQUIRED, non-empty seq of kotobase.store collection"+" identifiers to materialize as the graph's vertices (see ns"+" docstring's \"Vertex collections MUST be declared explicitly\""+" section). Got: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([vertex_colls], 0)))));
}

var map__12294 = kotobase.gremlin.traversal.translate(bytecode);
var map__12294__$1 = cljs.core.__destructure_map(map__12294);
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12294__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var post = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12294__$1,new cljs.core.Keyword(null,"post","post",269697687));
var rows = kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$3(kotobase.query.bridge.db_for(ctx,store,vertex_colls),query,visible_QMARK_);
var vals = cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,rows)));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,tup){
var G__12295 = kotobase.gremlin.traversal.step_name(tup);
var G__12295__$1 = (((G__12295 instanceof cljs.core.Keyword))?G__12295.fqn:null);
switch (G__12295__$1) {
case "dedup":
return cljs.core.vec(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(acc));

break;
case "order":
return cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.str,acc));

break;
case "limit":
return cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.second(tup),acc));

break;
case "count":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.count(acc)], null);

break;
default:
return acc;

}
}),vals,post);
});

//# sourceMappingURL=kotobase.gremlin.traversal.js.map
