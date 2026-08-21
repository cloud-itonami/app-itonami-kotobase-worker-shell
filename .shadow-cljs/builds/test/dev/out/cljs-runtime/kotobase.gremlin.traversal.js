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

var vidx_9809 = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,t){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(t))){
return i;
} else {
return null;
}
}),bytecode));
if(cljs.core.truth_(vidx_9809)){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","missing-terminal-values","gremlin/missing-terminal-values",275201033),(""+"bytecode must contain exactly one [:values prop] step"+" (the projection step) -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.last(bytecode)], 0)))));
}

if(cljs.core.truth_(cljs.core.some((function (p1__9757_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(p1__9757_SHARP_));
}),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((vidx_9809 + (1)),bytecode)))){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","values-not-terminal","gremlin/values-not-terminal",-794432038),".values(prop) is only supported ONCE, as the projection step");
} else {
}

var post_9810 = cljs.core.vec(cljs.core.drop.cljs$core$IFn$_invoke$arity$2((vidx_9809 + (1)),bytecode));
var seq__9760_9811 = cljs.core.seq(post_9810);
var chunk__9761_9812 = null;
var count__9762_9813 = (0);
var i__9763_9814 = (0);
while(true){
if((i__9763_9814 < count__9762_9813)){
var t_9815 = chunk__9761_9812.cljs$core$IIndexed$_nth$arity$2(null,i__9763_9814);
if(cljs.core.contains_QMARK_(kotobase.gremlin.traversal.post_steps,kotobase.gremlin.traversal.step_name(t_9815))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","step-after-values","gremlin/step-after-values",-600589914),(""+"only "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.traversal.post_steps)], 0)))+" may follow"+" .values(prop) -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([t_9815], 0)))));
}


var G__9816 = seq__9760_9811;
var G__9817 = chunk__9761_9812;
var G__9818 = count__9762_9813;
var G__9819 = (i__9763_9814 + (1));
seq__9760_9811 = G__9816;
chunk__9761_9812 = G__9817;
count__9762_9813 = G__9818;
i__9763_9814 = G__9819;
continue;
} else {
var temp__5825__auto___9820 = cljs.core.seq(seq__9760_9811);
if(temp__5825__auto___9820){
var seq__9760_9821__$1 = temp__5825__auto___9820;
if(cljs.core.chunked_seq_QMARK_(seq__9760_9821__$1)){
var c__5694__auto___9822 = cljs.core.chunk_first(seq__9760_9821__$1);
var G__9823 = cljs.core.chunk_rest(seq__9760_9821__$1);
var G__9824 = c__5694__auto___9822;
var G__9825 = cljs.core.count(c__5694__auto___9822);
var G__9826 = (0);
seq__9760_9811 = G__9823;
chunk__9761_9812 = G__9824;
count__9762_9813 = G__9825;
i__9763_9814 = G__9826;
continue;
} else {
var t_9827 = cljs.core.first(seq__9760_9821__$1);
if(cljs.core.contains_QMARK_(kotobase.gremlin.traversal.post_steps,kotobase.gremlin.traversal.step_name(t_9827))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","step-after-values","gremlin/step-after-values",-600589914),(""+"only "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.traversal.post_steps)], 0)))+" may follow"+" .values(prop) -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([t_9827], 0)))));
}


var G__9828 = cljs.core.next(seq__9760_9821__$1);
var G__9829 = null;
var G__9830 = (0);
var G__9831 = (0);
seq__9760_9811 = G__9828;
chunk__9761_9812 = G__9829;
count__9762_9813 = G__9830;
i__9763_9814 = G__9831;
continue;
}
} else {
}
}
break;
}

var seq__9764_9832 = cljs.core.seq(cljs.core.butlast(post_9810));
var chunk__9765_9833 = null;
var count__9766_9834 = (0);
var i__9767_9835 = (0);
while(true){
if((i__9767_9835 < count__9766_9834)){
var t_9836 = chunk__9765_9833.cljs$core$IIndexed$_nth$arity$2(null,i__9767_9835);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"count","count",2139924085),kotobase.gremlin.traversal.step_name(t_9836))){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","count-not-last","gremlin/count-not-last",-1247142637),".count() reduces the traversal to a number, so nothing may follow it");
} else {
}


var G__9837 = seq__9764_9832;
var G__9838 = chunk__9765_9833;
var G__9839 = count__9766_9834;
var G__9840 = (i__9767_9835 + (1));
seq__9764_9832 = G__9837;
chunk__9765_9833 = G__9838;
count__9766_9834 = G__9839;
i__9767_9835 = G__9840;
continue;
} else {
var temp__5825__auto___9841 = cljs.core.seq(seq__9764_9832);
if(temp__5825__auto___9841){
var seq__9764_9842__$1 = temp__5825__auto___9841;
if(cljs.core.chunked_seq_QMARK_(seq__9764_9842__$1)){
var c__5694__auto___9843 = cljs.core.chunk_first(seq__9764_9842__$1);
var G__9844 = cljs.core.chunk_rest(seq__9764_9842__$1);
var G__9845 = c__5694__auto___9843;
var G__9846 = cljs.core.count(c__5694__auto___9843);
var G__9847 = (0);
seq__9764_9832 = G__9844;
chunk__9765_9833 = G__9845;
count__9766_9834 = G__9846;
i__9767_9835 = G__9847;
continue;
} else {
var t_9848 = cljs.core.first(seq__9764_9842__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"count","count",2139924085),kotobase.gremlin.traversal.step_name(t_9848))){
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","count-not-last","gremlin/count-not-last",-1247142637),".count() reduces the traversal to a number, so nothing may follow it");
} else {
}


var G__9849 = cljs.core.next(seq__9764_9842__$1);
var G__9850 = null;
var G__9851 = (0);
var G__9852 = (0);
seq__9764_9832 = G__9849;
chunk__9765_9833 = G__9850;
count__9766_9834 = G__9851;
i__9767_9835 = G__9852;
continue;
}
} else {
}
}
break;
}

var seq__9768_9853 = cljs.core.seq(post_9810);
var chunk__9769_9854 = null;
var count__9770_9855 = (0);
var i__9771_9856 = (0);
while(true){
if((i__9771_9856 < count__9770_9855)){
var t_9857 = chunk__9769_9854.cljs$core$IIndexed$_nth$arity$2(null,i__9771_9856);
var vec__9778_9858 = t_9857;
var seq__9779_9859 = cljs.core.seq(vec__9778_9858);
var first__9780_9860 = cljs.core.first(seq__9779_9859);
var seq__9779_9861__$1 = cljs.core.next(seq__9779_9859);
var op_9862 = first__9780_9860;
var args_9863 = seq__9779_9861__$1;
var want_9864 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363),op_9862))?(1):(0));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(want_9864,cljs.core.count(args_9863))){
kotobase.gremlin.traversal.step_arity_err(op_9862,want_9864,args_9863);
} else {
}


var G__9865 = seq__9768_9853;
var G__9866 = chunk__9769_9854;
var G__9867 = count__9770_9855;
var G__9868 = (i__9771_9856 + (1));
seq__9768_9853 = G__9865;
chunk__9769_9854 = G__9866;
count__9770_9855 = G__9867;
i__9771_9856 = G__9868;
continue;
} else {
var temp__5825__auto___9869 = cljs.core.seq(seq__9768_9853);
if(temp__5825__auto___9869){
var seq__9768_9870__$1 = temp__5825__auto___9869;
if(cljs.core.chunked_seq_QMARK_(seq__9768_9870__$1)){
var c__5694__auto___9871 = cljs.core.chunk_first(seq__9768_9870__$1);
var G__9872 = cljs.core.chunk_rest(seq__9768_9870__$1);
var G__9873 = c__5694__auto___9871;
var G__9874 = cljs.core.count(c__5694__auto___9871);
var G__9875 = (0);
seq__9768_9853 = G__9872;
chunk__9769_9854 = G__9873;
count__9770_9855 = G__9874;
i__9771_9856 = G__9875;
continue;
} else {
var t_9876 = cljs.core.first(seq__9768_9870__$1);
var vec__9781_9877 = t_9876;
var seq__9782_9878 = cljs.core.seq(vec__9781_9877);
var first__9783_9879 = cljs.core.first(seq__9782_9878);
var seq__9782_9880__$1 = cljs.core.next(seq__9782_9878);
var op_9881 = first__9783_9879;
var args_9882 = seq__9782_9880__$1;
var want_9883 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363),op_9881))?(1):(0));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(want_9883,cljs.core.count(args_9882))){
kotobase.gremlin.traversal.step_arity_err(op_9881,want_9883,args_9882);
} else {
}


var G__9884 = cljs.core.next(seq__9768_9870__$1);
var G__9885 = null;
var G__9886 = (0);
var G__9887 = (0);
seq__9768_9853 = G__9884;
chunk__9769_9854 = G__9885;
count__9770_9855 = G__9886;
i__9771_9856 = G__9887;
continue;
}
} else {
}
}
break;
}

var temp__5825__auto___9888 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__9758_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"limit","limit",-1355822363),kotobase.gremlin.traversal.step_name(p1__9758_SHARP_));
}),post_9810));
if(cljs.core.truth_(temp__5825__auto___9888)){
var vec__9784_9889 = temp__5825__auto___9888;
var __9890 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9784_9889,(0),null);
var n_9891 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9784_9889,(1),null);
if(((cljs.core.integer_QMARK_(n_9891)) && ((!((n_9891 < (0))))))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","bad-limit","gremlin/bad-limit",742081479),(""+".limit(n) expects a non-negative integer -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([n_9891], 0)))));
}
} else {
}

var steps = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__9759_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(p1__9759_SHARP_));
}),cljs.core.rest(bytecode));
var cur_var = kotobase.gremlin.traversal.var_sym((0));
var next_id = (1);
var where = cljs.core.PersistentVector.EMPTY;
while(true){
var tup = cljs.core.first(steps);
var vec__9796 = tup;
var seq__9797 = cljs.core.seq(vec__9796);
var first__9798 = cljs.core.first(seq__9797);
var seq__9797__$1 = cljs.core.next(seq__9797);
var op = first__9798;
var args = seq__9797__$1;
if((tup == null)){
var vidx = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2(((function (steps,cur_var,next_id,where,tup,vec__9796,seq__9797,first__9798,seq__9797__$1,op,args){
return (function (i,t){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"values","values",372645556),kotobase.gremlin.traversal.step_name(t))){
return i;
} else {
return null;
}
});})(steps,cur_var,next_id,where,tup,vec__9796,seq__9797,first__9798,seq__9797__$1,op,args))
,bytecode));
var vec__9799 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(bytecode,vidx);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9799,(0),null);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9799,(1),null);
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

var G__9892 = cljs.core.rest(steps);
var G__9893 = cur_var;
var G__9894 = next_id;
var G__9895 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,new cljs.core.Keyword("kotobase","coll","kotobase/coll",-1195202821),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args)))], null));
steps = G__9892;
cur_var = G__9893;
next_id = G__9894;
where = G__9895;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"has","has",1466247447),op)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(args))){
kotobase.gremlin.traversal.step_arity_err(op,(2),args);
} else {
}

var vec__9802 = args;
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9802,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9802,(1),null);
var G__9896 = cljs.core.rest(steps);
var G__9897 = cur_var;
var G__9898 = next_id;
var G__9899 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop))),v], null));
steps = G__9896;
cur_var = G__9897;
next_id = G__9898;
where = G__9899;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"hasNot","hasNot",-855001609),op)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args))){
kotobase.gremlin.traversal.step_arity_err(op,(1),args);
} else {
}

var G__9900 = cljs.core.rest(steps);
var G__9901 = cur_var;
var G__9902 = next_id;
var G__9903 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args)))),new cljs.core.Symbol(null,"_","_",-1201019570,null)], null),null,(1),null)),(2),null)));
steps = G__9900;
cur_var = G__9901;
next_id = G__9902;
where = G__9903;
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
var G__9904 = cljs.core.rest(steps);
var G__9905 = new_var;
var G__9906 = (next_id + (1));
var G__9907 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(edge_label),fk_var], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_var,new cljs.core.Keyword("kotobase","key","kotobase/key",-1670563723),fk_var], null));
steps = G__9904;
cur_var = G__9905;
next_id = G__9906;
where = G__9907;
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
var G__9908 = cljs.core.rest(steps);
var G__9909 = new_var;
var G__9910 = (next_id + (1));
var G__9911 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(where,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_var,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(edge_label),fk_var], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur_var,new cljs.core.Keyword("kotobase","key","kotobase/key",-1670563723),fk_var], null));
steps = G__9908;
cur_var = G__9909;
next_id = G__9910;
where = G__9911;
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
kotobase.gremlin.traversal.execute = (function kotobase$gremlin$traversal$execute(p__9805,bytecode){
var map__9806 = p__9805;
var map__9806__$1 = cljs.core.__destructure_map(map__9806);
var ctx = map__9806__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9806__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var vertex_colls = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9806__$1,new cljs.core.Keyword(null,"vertex-colls","vertex-colls",-1707425754));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9806__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
if(cljs.core.fn_QMARK_(visible_QMARK_)){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","missing-visible","gremlin/missing-visible",-902188430),(""+"kotobase.gremlin.traversal/execute requires ctx :visible? -- a"+" REQUIRED predicate fn over materialized datoms, no permissive"+" default (ADR-2607050500). Pass (constantly true) to see"+" everything materialized."));
}

if(((cljs.core.sequential_QMARK_(vertex_colls)) && (cljs.core.seq(vertex_colls)))){
} else {
throw kotobase.gremlin.traversal.gremlin_err(new cljs.core.Keyword("gremlin","missing-vertex-colls","gremlin/missing-vertex-colls",-1291991589),(""+"kotobase.gremlin.traversal/execute requires ctx :vertex-colls --"+" a REQUIRED, non-empty seq of kotobase.store collection"+" identifiers to materialize as the graph's vertices (see ns"+" docstring's \"Vertex collections MUST be declared explicitly\""+" section). Got: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([vertex_colls], 0)))));
}

var map__9807 = kotobase.gremlin.traversal.translate(bytecode);
var map__9807__$1 = cljs.core.__destructure_map(map__9807);
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9807__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var post = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9807__$1,new cljs.core.Keyword(null,"post","post",269697687));
var rows = kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$3(kotobase.query.bridge.db_for(ctx,store,vertex_colls),query,visible_QMARK_);
var vals = cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,rows)));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,tup){
var G__9808 = kotobase.gremlin.traversal.step_name(tup);
var G__9808__$1 = (((G__9808 instanceof cljs.core.Keyword))?G__9808.fqn:null);
switch (G__9808__$1) {
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
