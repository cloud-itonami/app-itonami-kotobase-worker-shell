goog.provide('chain.core');
chain.core.verified_block = (function chain$core$verified_block(get_fn,expected_cid){
var temp__5825__auto__ = (get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(expected_cid) : get_fn.call(null,expected_cid));
if(cljs.core.truth_(temp__5825__auto__)){
var bytes = temp__5825__auto__;
var actual = ipld.core.cid(bytes);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected_cid,actual)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("chain: block CID mismatch",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ipld","cid-mismatch","ipld/cid-mismatch",1738594899),new cljs.core.Keyword(null,"expected-cid","expected-cid",-860224801),expected_cid,new cljs.core.Keyword(null,"actual-cid","actual-cid",-884324624),actual], null));
}

return bytes;
} else {
return null;
}
});
chain.core.encode_commit = (function chain$core$encode_commit(var_args){
var G__11449 = arguments.length;
switch (G__11449) {
case 3:
return chain.core.encode_commit.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return chain.core.encode_commit.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(chain.core.encode_commit.cljs$core$IFn$_invoke$arity$3 = (function (state,prev_cid,seq_num){
return chain.core.encode_commit.cljs$core$IFn$_invoke$arity$4(state,prev_cid,seq_num,null);
}));

(chain.core.encode_commit.cljs$core$IFn$_invoke$arity$4 = (function (state,prev_cid,seq_num,p__11450){
var map__11451 = p__11450;
var map__11451__$1 = cljs.core.__destructure_map(map__11451);
var causes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11451__$1,new cljs.core.Keyword(null,"causes","causes",320696351));
var authority = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11451__$1,new cljs.core.Keyword(null,"authority","authority",-551669367));
var actor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11451__$1,new cljs.core.Keyword(null,"actor","actor",-1830560481));
var lamport = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11451__$1,new cljs.core.Keyword(null,"lamport","lamport",-699539966));
return ipld.core.encode((function (){var G__11452 = new cljs.core.PersistentArrayMap(null, 3, ["state",state,"prev",(function (){var G__11453 = prev_cid;
if((G__11453 == null)){
return null;
} else {
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__11453) : ipld.core.link.call(null,G__11453));
}
})(),"seq",seq_num], null);
var G__11452__$1 = ((cljs.core.seq(causes))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11452,"causes",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.core.link,causes)):G__11452);
var G__11452__$2 = (cljs.core.truth_(authority)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11452__$1,"authority",(ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(authority) : ipld.core.link.call(null,authority))):G__11452__$1);
var G__11452__$3 = (cljs.core.truth_(actor)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11452__$2,"actor",actor):G__11452__$2);
if(cljs.core.truth_(lamport)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11452__$3,"lamport",lamport);
} else {
return G__11452__$3;
}
})());
}));

(chain.core.encode_commit.cljs$lang$maxFixedArity = 4);

chain.core.commit_map = (function chain$core$commit_map(get_fn,cid){
return ipld.core.decode(chain.core.verified_block(get_fn,cid));
});
/**
 * A parent's logical time. A commit written before `lamport` existed falls
 * back to its `seq`, which for a linear chain IS a Lamport clock -- so a
 * causal commit can name a pre-causal parent without inventing a number.
 */
chain.core.clock_of = (function chain$core$clock_of(m){
return cljs.core.long$((function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"lamport");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"seq");
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return (0);
}
}
})());
});
/**
 * Append a commit, calling `(put! cid bytes)`. Returns the new commit's CID.
 * 
 * `prev-cid` is nil for the genesis commit (seq 0); otherwise `seq` is
 * `(inc (:seq prev-commit))`.
 * 
 * The 5-arity takes `{:causes [cid ...] :authority cid :actor string}` and
 * additionally derives `lamport`. Omit it and the commit is byte-identical
 * to what the 4-arity always produced.
 */
chain.core.commit_BANG_ = (function chain$core$commit_BANG_(var_args){
var G__11456 = arguments.length;
switch (G__11456) {
case 4:
return chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (put_BANG_,get_fn,state,prev_cid){
return chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5(put_BANG_,get_fn,state,prev_cid,null);
}));

(chain.core.commit_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (put_BANG_,get_fn,state,prev_cid,opts){
var prev_m = (cljs.core.truth_(prev_cid)?chain.core.commit_map(get_fn,prev_cid):null);
var seq_num = (cljs.core.truth_(prev_m)?(cljs.core.long$(cljs.core.get.cljs$core$IFn$_invoke$arity$2(prev_m,"seq")) + (1)):(0));
var causes = cljs.core.vec(new cljs.core.Keyword(null,"causes","causes",320696351).cljs$core$IFn$_invoke$arity$1(opts));
var cause_ms = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__11454_SHARP_){
return chain.core.commit_map(get_fn,p1__11454_SHARP_);
}),causes);
var lamport = (cljs.core.truth_(opts)?(function (){var parents = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.cons(prev_m,cause_ms));
if(cljs.core.seq(parents)){
return (cljs.core.long$(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2(chain.core.clock_of,parents))) + (1));
} else {
return (0);
}
})():null);
var bytes = chain.core.encode_commit.cljs$core$IFn$_invoke$arity$4(state,prev_cid,seq_num,(cljs.core.truth_(opts)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(opts,new cljs.core.Keyword(null,"causes","causes",320696351),causes,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"lamport","lamport",-699539966),lamport], 0)):null));
var cid = ipld.core.cid(bytes);
(put_BANG_.cljs$core$IFn$_invoke$arity$2 ? put_BANG_.cljs$core$IFn$_invoke$arity$2(cid,bytes) : put_BANG_.call(null,cid,bytes));

return cid;
}));

(chain.core.commit_BANG_.cljs$lang$maxFixedArity = 5);

/**
 * Decode the commit at `cid` into
 * `{:cid :state :prev :seq :causes :authority :actor :lamport}`.
 * 
 * `:prev` is nil at genesis; the causal keys are nil (or empty) on a commit
 * that did not carry them, which is every commit written before they
 * existed.
 */
chain.core.commit_info = (function chain$core$commit_info(get_fn,cid){
var m = chain.core.commit_map(get_fn,cid);
var prev = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"prev");
var causes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"causes");
var authority = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"authority");
var G__11457 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid,new cljs.core.Keyword(null,"state","state",-1988618099),cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"state"),new cljs.core.Keyword(null,"prev","prev",-1597069226),(function (){var G__11458 = prev;
if((G__11458 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__11458) : ipld.core.link_cid.call(null,G__11458));
}
})(),new cljs.core.Keyword(null,"seq","seq",-1817803783),cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"seq")], null);
var G__11457__$1 = ((cljs.core.seq(causes))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11457,new cljs.core.Keyword(null,"causes","causes",320696351),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(ipld.core.link_cid,causes)):G__11457);
var G__11457__$2 = (cljs.core.truth_(authority)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11457__$1,new cljs.core.Keyword(null,"authority","authority",-551669367),(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(authority) : ipld.core.link_cid.call(null,authority))):G__11457__$1);
var G__11457__$3 = (cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"actor"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11457__$2,new cljs.core.Keyword(null,"actor","actor",-1830560481),cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"actor")):G__11457__$2);
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"lamport"))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11457__$3,new cljs.core.Keyword(null,"lamport","lamport",-699539966),cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"lamport"));
} else {
return G__11457__$3;
}
});
/**
 * The bytes a commit-info must hash back to.
 * 
 *   A commit carrying causal fields is reconstructed with them; one carrying
 *   none is reconstructed plain, which is what makes an old commit still
 *   verify byte-for-byte.
 */
chain.core.re_encode = (function chain$core$re_encode(p__11459){
var map__11460 = p__11459;
var map__11460__$1 = cljs.core.__destructure_map(map__11460);
var seq_num = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11460__$1,new cljs.core.Keyword(null,"seq","seq",-1817803783));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11460__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var prev = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11460__$1,new cljs.core.Keyword(null,"prev","prev",-1597069226));
var causes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11460__$1,new cljs.core.Keyword(null,"causes","causes",320696351));
var authority = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11460__$1,new cljs.core.Keyword(null,"authority","authority",-551669367));
var actor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11460__$1,new cljs.core.Keyword(null,"actor","actor",-1830560481));
var lamport = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11460__$1,new cljs.core.Keyword(null,"lamport","lamport",-699539966));
if(cljs.core.truth_((function (){var or__5162__auto__ = cljs.core.seq(causes);
if(or__5162__auto__){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = authority;
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
var or__5162__auto____$2 = actor;
if(cljs.core.truth_(or__5162__auto____$2)){
return or__5162__auto____$2;
} else {
return lamport;
}
}
}
})())){
return chain.core.encode_commit.cljs$core$IFn$_invoke$arity$4(state,prev,seq_num,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"causes","causes",320696351),causes,new cljs.core.Keyword(null,"authority","authority",-551669367),authority,new cljs.core.Keyword(null,"actor","actor",-1830560481),actor,new cljs.core.Keyword(null,"lamport","lamport",-699539966),lamport], null));
} else {
return chain.core.encode_commit.cljs$core$IFn$_invoke$arity$3(state,prev,seq_num);
}
});
/**
 * Walk commit history from `cid` back to genesis via `:prev` links. Returns a
 * seq of `commit-info` maps, oldest (seq 0) first.
 */
chain.core.chain = (function chain$core$chain(get_fn,cid){
var cid__$1 = cid;
var acc = cljs.core.List.EMPTY;
while(true){
if(cljs.core.not(cid__$1)){
return acc;
} else {
var map__11462 = chain.core.commit_info(get_fn,cid__$1);
var map__11462__$1 = cljs.core.__destructure_map(map__11462);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11462__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var prev = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11462__$1,new cljs.core.Keyword(null,"prev","prev",-1597069226));
var seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11462__$1,new cljs.core.Keyword(null,"seq","seq",-1817803783));
var G__11478 = prev;
var G__11479 = cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid__$1,new cljs.core.Keyword(null,"state","state",-1988618099),state,new cljs.core.Keyword(null,"prev","prev",-1597069226),prev,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq], null),acc);
cid__$1 = G__11478;
acc = G__11479;
continue;
}
break;
}
});
/**
 * True iff every commit in the chain rooted at `cid`:
 *   (a) re-derives to its own CID from its own {state, prev, seq} bytes --
 *       tamper-evidence against a store that lies about a CID's contents;
 *   (b) has `:seq` increasing by exactly 1 per step, starting at 0.
 * False on the first violation found; also false if the chain is empty
 * (a bare `cid` that doesn't decode).
 */
chain.core.verify_chain = (function chain$core$verify_chain(get_fn,cid){
try{var entries = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__11463_SHARP_){
return chain.core.commit_info(get_fn,new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(p1__11463_SHARP_));
}),chain.core.chain(get_fn,cid));
return ((cljs.core.seq(entries)) && (((cljs.core.every_QMARK_((function (p1__11464_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cid","cid",-1940591320).cljs$core$IFn$_invoke$arity$1(p1__11464_SHARP_),ipld.core.cid(chain.core.re_encode(p1__11464_SHARP_)));
}),entries)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"seq","seq",-1817803783),entries),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(entries)))))));
}catch (e11465){var _ = e11465;
return false;
}});
/**
 * The commit-info AT `cid` — `cid` is by definition the chain's tip (every
 * caller passes the CID they last recorded as "current head"), so this is
 * ONE block fetch, O(1) — not a walk to genesis. Provably equivalent to the
 * original `(last (chain get-fn cid))`: `chain`'s loop conses each ancestor
 * onto the FRONT of its accumulator and starts from `cid` itself, so `cid`'s
 * own commit-info is always the LAST element chain returns; `head` used to
 * pay for the whole walk just to hand back the first thing it read. Reading
 * the current state on every write (ADR-2607032430 D1's novelty-log commit!)
 * made this the hot path — an O(N) chain-length read on every O(tx) write
 * would have defeated the point.
 */
chain.core.head = (function chain$core$head(get_fn,cid){
if(cljs.core.truth_(cid)){
return chain.core.commit_info(get_fn,cid);
} else {
return null;
}
});
/**
 * Every parent of a commit: its own `prev` plus its `causes`.
 * 
 *   A chain is the special case where this returns at most one.
 */
chain.core.causal_parents = (function chain$core$causal_parents(info){
return cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.cons(new cljs.core.Keyword(null,"prev","prev",-1597069226).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"causes","causes",320696351).cljs$core$IFn$_invoke$arity$1(info))));
});
/**
 * Reachable history from `cid` over BOTH `prev` and `causes`.
 * 
 *   Returns `{:commits {cid info} :order [cid ...] :truncated? bool}` --
 *   `:order` is the visit order, deduplicated, so a commit reachable by two
 *   routes appears once.
 * 
 *   Bounded by `max-visits` (default 4096) and it SAYS when it stopped rather
 *   than returning a short history as if it were the whole one.
 */
chain.core.walk_causal = (function chain$core$walk_causal(var_args){
var G__11467 = arguments.length;
switch (G__11467) {
case 2:
return chain.core.walk_causal.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return chain.core.walk_causal.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(chain.core.walk_causal.cljs$core$IFn$_invoke$arity$2 = (function (get_fn,cid){
return chain.core.walk_causal.cljs$core$IFn$_invoke$arity$3(get_fn,cid,(4096));
}));

(chain.core.walk_causal.cljs$core$IFn$_invoke$arity$3 = (function (get_fn,cid,max_visits){
var frontier = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cid], null);
var seen = cljs.core.PersistentArrayMap.EMPTY;
var order = cljs.core.PersistentVector.EMPTY;
var n = (0);
while(true){
if(cljs.core.empty_QMARK_(frontier)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"commits","commits",1045759893),seen,new cljs.core.Keyword(null,"order","order",-1254677256),order,new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),false], null);
} else {
if((n >= max_visits)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"commits","commits",1045759893),seen,new cljs.core.Keyword(null,"order","order",-1254677256),order,new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),true], null);
} else {
var c = cljs.core.first(frontier);
if(cljs.core.contains_QMARK_(seen,c)){
var G__11481 = cljs.core.rest(frontier);
var G__11482 = seen;
var G__11483 = order;
var G__11484 = n;
frontier = G__11481;
seen = G__11482;
order = G__11483;
n = G__11484;
continue;
} else {
var temp__5823__auto__ = (function (){try{return chain.core.commit_info(get_fn,c);
}catch (e11469){var _ = e11469;
return null;
}})();
if(cljs.core.truth_(temp__5823__auto__)){
var info = temp__5823__auto__;
var G__11485 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.rest(frontier)),chain.core.causal_parents(info));
var G__11486 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(seen,c,info);
var G__11487 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(order,c);
var G__11488 = (n + (1));
frontier = G__11485;
seen = G__11486;
order = G__11487;
n = G__11488;
continue;
} else {
var G__11489 = cljs.core.vec(cljs.core.rest(frontier));
var G__11490 = seen;
var G__11491 = order;
var G__11492 = (n + (1));
frontier = G__11489;
seen = G__11490;
order = G__11491;
n = G__11492;
continue;
}
}

}
}
break;
}
}));

(chain.core.walk_causal.cljs$lang$maxFixedArity = 3);

/**
 * Verify the DAG reachable from `cid`.
 * 
 *   Returns a REPORT rather than a boolean:
 * 
 *    {:ok? bool :visited n :truncated? bool :reason kw :at cid}
 * 
 *   `verify-chain` answers true/false, which cannot distinguish "this history
 *   is sound" from "something threw and we caught it" -- and those need
 *   different responses. Checks:
 * 
 *   - every commit re-derives to its own CID from its own bytes;
 *   - every parent named is actually fetchable (a cited parent that does not
 *  exist reads as provenance while being nothing);
 *   - `lamport`, where present, is exactly 1 + the maximum over its parents, so
 *  the clock cannot disagree with the edges it summarises;
 *   - the walk terminated on its own rather than on the visit bound.
 */
chain.core.verify_causal = (function chain$core$verify_causal(var_args){
var G__11473 = arguments.length;
switch (G__11473) {
case 2:
return chain.core.verify_causal.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return chain.core.verify_causal.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(chain.core.verify_causal.cljs$core$IFn$_invoke$arity$2 = (function (get_fn,cid){
return chain.core.verify_causal.cljs$core$IFn$_invoke$arity$3(get_fn,cid,(4096));
}));

(chain.core.verify_causal.cljs$core$IFn$_invoke$arity$3 = (function (get_fn,cid,max_visits){
try{var map__11475 = chain.core.walk_causal.cljs$core$IFn$_invoke$arity$3(get_fn,cid,max_visits);
var map__11475__$1 = cljs.core.__destructure_map(map__11475);
var commits = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11475__$1,new cljs.core.Keyword(null,"commits","commits",1045759893));
var order = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11475__$1,new cljs.core.Keyword(null,"order","order",-1254677256));
var truncated_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11475__$1,new cljs.core.Keyword(null,"truncated?","truncated?",1556855098));
if(cljs.core.empty_QMARK_(order)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ok?","ok?",447310304),false,new cljs.core.Keyword(null,"reason","reason",-2070751759),new cljs.core.Keyword(null,"empty","empty",767870958),new cljs.core.Keyword(null,"visited","visited",-1610853875),(0),new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),false], null);
} else {
if(cljs.core.truth_(truncated_QMARK_)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ok?","ok?",447310304),false,new cljs.core.Keyword(null,"reason","reason",-2070751759),new cljs.core.Keyword(null,"visit-bound-reached","visit-bound-reached",-1693075133),new cljs.core.Keyword(null,"visited","visited",-1610853875),cljs.core.count(order),new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),true], null);
} else {
var or__5162__auto__ = cljs.core.some((function (c){
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(commits,c);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,ipld.core.cid(chain.core.re_encode(info)))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ok?","ok?",447310304),false,new cljs.core.Keyword(null,"reason","reason",-2070751759),new cljs.core.Keyword(null,"cid-mismatch","cid-mismatch",1758660980),new cljs.core.Keyword(null,"at","at",1476951349),c,new cljs.core.Keyword(null,"visited","visited",-1610853875),cljs.core.count(order),new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),false], null);
} else {
if(cljs.core.truth_(cljs.core.some((function (p1__11470_SHARP_){
return (cljs.core.get.cljs$core$IFn$_invoke$arity$2(commits,p1__11470_SHARP_) == null);
}),chain.core.causal_parents(info)))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ok?","ok?",447310304),false,new cljs.core.Keyword(null,"reason","reason",-2070751759),new cljs.core.Keyword(null,"missing-parent","missing-parent",503673948),new cljs.core.Keyword(null,"at","at",1476951349),c,new cljs.core.Keyword(null,"visited","visited",-1610853875),cljs.core.count(order),new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),false], null);
} else {
if(cljs.core.truth_((function (){var and__5160__auto__ = new cljs.core.Keyword(null,"lamport","lamport",-699539966).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(and__5160__auto__)){
var ps = chain.core.causal_parents(info);
var expect = ((cljs.core.seq(ps))?(cljs.core.long$(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__11471_SHARP_){
return cljs.core.long$((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"lamport","lamport",-699539966).cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(commits,p1__11471_SHARP_));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = new cljs.core.Keyword(null,"seq","seq",-1817803783).cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(commits,p1__11471_SHARP_));
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return (0);
}
}
})());
}),ps))) + (1)):(0));
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.long$(new cljs.core.Keyword(null,"lamport","lamport",-699539966).cljs$core$IFn$_invoke$arity$1(info)),expect);
} else {
return and__5160__auto__;
}
})())){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ok?","ok?",447310304),false,new cljs.core.Keyword(null,"reason","reason",-2070751759),new cljs.core.Keyword(null,"lamport-disagrees-with-edges","lamport-disagrees-with-edges",-1420497986),new cljs.core.Keyword(null,"at","at",1476951349),c,new cljs.core.Keyword(null,"visited","visited",-1610853875),cljs.core.count(order),new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),false], null);
} else {
return null;

}
}
}
}),order);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok?","ok?",447310304),true,new cljs.core.Keyword(null,"visited","visited",-1610853875),cljs.core.count(order),new cljs.core.Keyword(null,"truncated?","truncated?",1556855098),false], null);
}

}
}
}catch (e11474){var e = e11474;
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok?","ok?",447310304),false,new cljs.core.Keyword(null,"reason","reason",-2070751759),new cljs.core.Keyword(null,"threw","threw",17630075),new cljs.core.Keyword(null,"message","message",-406056002),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))], null);
}}));

(chain.core.verify_causal.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=chain.core.js.map
