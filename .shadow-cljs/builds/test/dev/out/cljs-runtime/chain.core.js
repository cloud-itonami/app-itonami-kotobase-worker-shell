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
chain.core.encode_commit = (function chain$core$encode_commit(state,prev_cid,seq){
return ipld.core.encode(new cljs.core.PersistentArrayMap(null, 3, ["state",state,"prev",(function (){var G__8704 = prev_cid;
if((G__8704 == null)){
return null;
} else {
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__8704) : ipld.core.link.call(null,G__8704));
}
})(),"seq",seq], null));
});
/**
 * Append a `{state, prev, seq}` commit, calling `(put! cid bytes)`. Returns
 * the new commit's CID. `prev-cid` is nil for the genesis commit (seq 0);
 * otherwise `seq` is `(inc (:seq prev-commit))`.
 */
chain.core.commit_BANG_ = (function chain$core$commit_BANG_(put_BANG_,get_fn,state,prev_cid){
var seq = (cljs.core.truth_(prev_cid)?(cljs.core.long$(cljs.core.get.cljs$core$IFn$_invoke$arity$2(ipld.core.decode(chain.core.verified_block(get_fn,prev_cid)),"seq")) + (1)):(0));
var bytes = chain.core.encode_commit(state,prev_cid,seq);
var cid = ipld.core.cid(bytes);
(put_BANG_.cljs$core$IFn$_invoke$arity$2 ? put_BANG_.cljs$core$IFn$_invoke$arity$2(cid,bytes) : put_BANG_.call(null,cid,bytes));

return cid;
});
/**
 * Decode the commit at `cid` into `{:cid :state :prev :seq}`. `:prev` is nil
 * at genesis.
 */
chain.core.commit_info = (function chain$core$commit_info(get_fn,cid){
var m = ipld.core.decode(chain.core.verified_block(get_fn,cid));
var prev = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"prev");
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid,new cljs.core.Keyword(null,"state","state",-1988618099),cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"state"),new cljs.core.Keyword(null,"prev","prev",-1597069226),(function (){var G__8705 = prev;
if((G__8705 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__8705) : ipld.core.link_cid.call(null,G__8705));
}
})(),new cljs.core.Keyword(null,"seq","seq",-1817803783),cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"seq")], null);
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
var map__8707 = chain.core.commit_info(get_fn,cid__$1);
var map__8707__$1 = cljs.core.__destructure_map(map__8707);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8707__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var prev = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8707__$1,new cljs.core.Keyword(null,"prev","prev",-1597069226));
var seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8707__$1,new cljs.core.Keyword(null,"seq","seq",-1817803783));
var G__8711 = prev;
var G__8712 = cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"cid","cid",-1940591320),cid__$1,new cljs.core.Keyword(null,"state","state",-1988618099),state,new cljs.core.Keyword(null,"prev","prev",-1597069226),prev,new cljs.core.Keyword(null,"seq","seq",-1817803783),seq], null),acc);
cid__$1 = G__8711;
acc = G__8712;
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
try{var entries = chain.core.chain(get_fn,cid);
return ((cljs.core.seq(entries)) && (((cljs.core.every_QMARK_((function (p__8709){
var map__8710 = p__8709;
var map__8710__$1 = cljs.core.__destructure_map(map__8710);
var cid__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8710__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8710__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var prev = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8710__$1,new cljs.core.Keyword(null,"prev","prev",-1597069226));
var seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8710__$1,new cljs.core.Keyword(null,"seq","seq",-1817803783));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cid__$1,ipld.core.cid(chain.core.encode_commit(state,prev,seq)));
}),entries)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"seq","seq",-1817803783),entries),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(entries)))))));
}catch (e8708){var _ = e8708;
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

//# sourceMappingURL=chain.core.js.map
