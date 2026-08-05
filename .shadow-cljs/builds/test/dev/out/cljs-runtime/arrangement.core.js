goog.provide('arrangement.core');
/**
 * A db with all four indices empty. Just a map -- nothing to close, nothing
 *   to open, safe to hold in an atom or thread through pure functions.
 * 
 *   Delegates to `datalog.index/empty-db`.
 */
arrangement.core.empty_db = (function arrangement$core$empty_db(){
return datalog.index.empty_db();
});
/**
 * Add `{:s :p :o}` to `db`'s 4 indices. `ref?` (default: `ipld.core/link?`)
 *   decides whether `:o` is also indexed in `:ocp` for reverse-reference
 *   lookup.
 * 
 *   Delegates to `datalog.index/assert-quad`, supplying the `ipld.core/link?`
 *   default that namespace deliberately refuses to guess at.
 */
arrangement.core.assert_quad = (function arrangement$core$assert_quad(var_args){
var G__6450 = arguments.length;
switch (G__6450) {
case 2:
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$2 = (function (db,q){
return datalog.index.assert_quad(db,q,ipld.core.link_QMARK_);
}));

(arrangement.core.assert_quad.cljs$core$IFn$_invoke$arity$3 = (function (db,q,ref_QMARK_){
return datalog.index.assert_quad(db,q,ref_QMARK_);
}));

(arrangement.core.assert_quad.cljs$lang$maxFixedArity = 3);

/**
 * Remove `{:s :p :o}` from `db`'s 4 indices. `ref?` (default:
 *   `ipld.core/link?`) must agree with the one used to assert the same quad,
 *   otherwise the `:ocp` entry is left behind.
 * 
 *   Delegates to `datalog.index/retract-quad`, supplying the `ipld.core/link?`
 *   default that namespace deliberately refuses to guess at.
 */
arrangement.core.retract_quad = (function arrangement$core$retract_quad(var_args){
var G__6452 = arguments.length;
switch (G__6452) {
case 2:
return arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$2 = (function (db,q){
return datalog.index.retract_quad(db,q,ipld.core.link_QMARK_);
}));

(arrangement.core.retract_quad.cljs$core$IFn$_invoke$arity$3 = (function (db,q,ref_QMARK_){
return datalog.index.retract_quad(db,q,ref_QMARK_);
}));

(arrangement.core.retract_quad.cljs$lang$maxFixedArity = 3);

/**
 * All `{p #{o...}}` for subject `s` (EAVT-style).
 * 
 *   Delegates to `datalog.index/entity-attrs`.
 */
arrangement.core.entity_attrs = (function arrangement$core$entity_attrs(db,s){
return datalog.index.entity_attrs(db,s);
});
/**
 * All `{s #{o...}}` for predicate `p` (AEVT-style scan).
 * 
 *   Delegates to `datalog.index/by-predicate`.
 */
arrangement.core.by_predicate = (function arrangement$core$by_predicate(db,p){
return datalog.index.by_predicate(db,p);
});
/**
 * All subjects `s` where `[s p o]` holds (AVET-style point lookup).
 * 
 *   Delegates to `datalog.index/by-predicate-value`.
 */
arrangement.core.by_predicate_value = (function arrangement$core$by_predicate_value(db,p,o){
return datalog.index.by_predicate_value(db,p,o);
});
/**
 * All `{p #{s...}}` referencing object `o` (VAET-style reverse lookup) --
 *   only populated for quads asserted with a truthy `ref?`.
 * 
 *   Delegates to `datalog.index/refs-to`.
 */
arrangement.core.refs_to = (function arrangement$core$refs_to(db,o){
return datalog.index.refs_to(db,o);
});
/**
 * A Link becomes `["ipld/link" cid]`; anything else passes through.
 */
arrangement.core.link__GT_edn = (function arrangement$core$link__GT_edn(v){
if(cljs.core.truth_((ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1(v) : ipld.core.link_QMARK_.call(null,v)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["ipld/link",(ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(v) : ipld.core.link_cid.call(null,v))], null);
} else {
return v;
}
});
/**
 * Inverse of `link->edn`: reconstructs the Link, or passes through anything
 *   that isn't the `["ipld/link" cid]` shape.
 */
arrangement.core.edn__GT_link = (function arrangement$core$edn__GT_link(v){
if(((cljs.core.vector_QMARK_(v)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(v))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ipld/link",cljs.core.first(v))))))){
var G__6453 = cljs.core.second(v);
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__6453) : ipld.core.link.call(null,G__6453));
} else {
return v;
}
});
/**
 * What `blind-fn` sees for one s/p/o component.
 * 
 *   PUBLIC because deriving it is exactly how a cold reader seeks by prefix
 *   without materializing the db (`arrangement.source/cursor`, and
 *   `kotobase-peer`'s `cold-datoms` before it). Keeping it private forced every
 *   such reader to re-implement it, which is how two copies of a crypto input
 *   drift apart.
 * 
 *   Deliberately NOT the `kotoba.value.v1` bytes: `blind-fn` is a caller-supplied
 *   keyed MAC whose output a cold reader re-derives to seek by prefix
 *   (`kotobase-peer`'s `cold-datoms`), so changing its input is a cross-repo
 *   crypto change, not a local one. Typed round-tripping is the VALUE slot's job
 *   — which is exactly where a component's type was being lost before.
 */
arrangement.core.blind_input = (function arrangement$core$blind_input(component){
if(cljs.core.truth_((function (){var or__5162__auto__ = (component == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = cljs.core.boolean_QMARK_(component);
if(or__5162__auto____$1){
return or__5162__auto____$1;
} else {
var or__5162__auto____$2 = cljs.core.integer_QMARK_(component);
if(or__5162__auto____$2){
return or__5162__auto____$2;
} else {
var or__5162__auto____$3 = typeof component === 'string';
if(or__5162__auto____$3){
return or__5162__auto____$3;
} else {
var or__5162__auto____$4 = (component instanceof cljs.core.Keyword);
if(or__5162__auto____$4){
return or__5162__auto____$4;
} else {
var or__5162__auto____$5 = (component instanceof cljs.core.Symbol);
if(or__5162__auto____$5){
return or__5162__auto____$5;
} else {
return (ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_QMARK_.cljs$core$IFn$_invoke$arity$1(component) : ipld.core.link_QMARK_.call(null,component));
}
}
}
}
}
}
})())){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("arrangement: component is not a blindable scalar",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"problem","problem",1168155148),new cljs.core.Keyword("arrangement","component-not-blindable","arrangement/component-not-blindable",-411787989),new cljs.core.Keyword(null,"component-type","component-type",-1666062480),cljs.core.type(component)], null));
}

return arrangement.core.link__GT_edn(component);
});
/**
 * cljs only: map `f` (returns a `js/Promise`) over `coll` concurrently,
 *   return one `js/Promise` of the resolved results, order-preserved --
 *   `js/Promise.all`, cljs-idiomatic (`vec`-in, `vec`-out).
 */
arrangement.core.pmap_async = (function arrangement$core$pmap_async(f,coll){
return Promise.all(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,coll))).then((function (arr){
return cljs.core.vec(arr);
}));
});
/**
 * Flatten one index map into sorted `[key val]` prolly-tree entries and
 *   build a tree from it (ADR-2607051000, ciphertext-over-CID persistence:
 *   accepted 2026-07-06, this fn implements its corrected key/value split —
 *   see ADR-2607061800's addendum for why the original ADR text was wrong
 *   about the value slot).
 * 
 *   `key` is `(pr-str [(blind-fn a) (blind-fn b) (blind-fn c)])` (each position
 *   passed through `blind-input` first, then `blind-fn` — a keyed, deterministic
 *   MAC, e.g. HMAC-SHA256 — so the leaf key is queryable by prefix for a caller
 *   who already knows the plaintext component, but is NOT the plaintext, and is
 *   NOT order-preserving/full ciphertext).
 * 
 *   `val` is `(encrypt-fn (ipld.value/encode-value [a b c]))` — an AEAD
 *   ciphertext blob of the REAL triple. This is the correction: the ORIGINAL
 *   triple lived only in the (now-blinded, one-way, unrecoverable) key, so once
 *   the key stopped being plaintext there was nowhere left to read the actual
 *   s/p/o payload back from — `val` now carries it, encrypted, so `cold-datoms`
 *   (in `kotoba-lang/kotobase-peer`) can decrypt a matched leaf's value to
 *   reconstruct the row instead of trying to invert the key.
 * 
 *   **schema-version 2** (ADR-kotoba-canonical-value-codec, VC3): the value slot
 *   encodes with `kotoba.value.v1` instead of `ipld/encode`. `ipld/encode` is a
 *   NODE codec — it writes a keyword as text and hands back a string, and has no
 *   defined order for a set — so a typed component did not survive the
 *   round-trip even though its CID verified. The value codec is what makes the
 *   s/p/o this repo's own `assert-quad` already accepts (ordinary map keys, any
 *   value) actually persistable. The KEY path is deliberately unchanged; see
 *   `blind-input`.
 * 
 *   `blind-fn`/`encrypt-fn` are REQUIRED (no default — matching this
 *   codebase's no-silent-default stance, ADR-2607050700, same as
 *   `schema-version` below): synchronous on JVM (`(blind-fn blind-input-
 *   component) -> string`, `(encrypt-fn bytes) -> bytes`); Promise-returning
 *   on cljs (see the platform-contract note above). Returns the root CID
 *   directly on JVM, a `js/Promise` of it on cljs.
 */
arrangement.core.index_root = (function arrangement$core$index_root(put_BANG_,m,blind_fn,encrypt_fn){
var triples = cljs.core.vec((function (){var iter__5649__auto__ = (function arrangement$core$index_root_$_iter__6455(s__6456){
return (new cljs.core.LazySeq(null,(function (){
var s__6456__$1 = s__6456;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__6456__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var vec__6463 = cljs.core.first(xs__6385__auto__);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6463,(0),null);
var m2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6463,(1),null);
var iterys__5645__auto__ = ((function (s__6456__$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__){
return (function arrangement$core$index_root_$_iter__6455_$_iter__6457(s__6458){
return (new cljs.core.LazySeq(null,((function (s__6456__$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__6458__$1 = s__6458;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__6458__$1);
if(temp__5825__auto____$1){
var xs__6385__auto____$1 = temp__5825__auto____$1;
var vec__6466 = cljs.core.first(xs__6385__auto____$1);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6466,(0),null);
var os = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6466,(1),null);
var iterys__5645__auto__ = ((function (s__6458__$1,s__6456__$1,vec__6466,b,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__){
return (function arrangement$core$index_root_$_iter__6455_$_iter__6457_$_iter__6459(s__6460){
return (new cljs.core.LazySeq(null,((function (s__6458__$1,s__6456__$1,vec__6466,b,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__){
return (function (){
var s__6460__$1 = s__6460;
while(true){
var temp__5825__auto____$2 = cljs.core.seq(s__6460__$1);
if(temp__5825__auto____$2){
var s__6460__$2 = temp__5825__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__6460__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__6460__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__6462 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__6461 = (0);
while(true){
if((i__6461 < size__5648__auto__)){
var o = cljs.core._nth(c__5647__auto__,i__6461);
cljs.core.chunk_append(b__6462,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b,o], null));

var G__6503 = (i__6461 + (1));
i__6461 = G__6503;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6462),arrangement$core$index_root_$_iter__6455_$_iter__6457_$_iter__6459(cljs.core.chunk_rest(s__6460__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6462),null);
}
} else {
var o = cljs.core.first(s__6460__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b,o], null),arrangement$core$index_root_$_iter__6455_$_iter__6457_$_iter__6459(cljs.core.rest(s__6460__$2)));
}
} else {
return null;
}
break;
}
});})(s__6458__$1,s__6456__$1,vec__6466,b,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__6458__$1,s__6456__$1,vec__6466,b,os,xs__6385__auto____$1,temp__5825__auto____$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(os));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,arrangement$core$index_root_$_iter__6455_$_iter__6457(cljs.core.rest(s__6458__$1)));
} else {
var G__6504 = cljs.core.rest(s__6458__$1);
s__6458__$1 = G__6504;
continue;
}
} else {
return null;
}
break;
}
});})(s__6456__$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__))
,null,null));
});})(s__6456__$1,vec__6463,a,m2,xs__6385__auto__,temp__5825__auto__))
;
var fs__5646__auto__ = cljs.core.seq(iterys__5645__auto__(m2));
if(fs__5646__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5646__auto__,arrangement$core$index_root_$_iter__6455(cljs.core.rest(s__6456__$1)));
} else {
var G__6505 = cljs.core.rest(s__6456__$1);
s__6456__$1 = G__6505;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(m);
})());
return arrangement.core.pmap_async((function (triple){
return arrangement.core.pmap_async(blind_fn,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(arrangement.core.blind_input,triple)).then((function (blinded){
return (function (){var G__6469 = ipld.value.encode_value(triple);
return (encrypt_fn.cljs$core$IFn$_invoke$arity$1 ? encrypt_fn.cljs$core$IFn$_invoke$arity$1(G__6469) : encrypt_fn.call(null,G__6469));
})().then((function (ct){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([blinded], 0)),ct], null);
}));
}));
}),triples).then((function (entries){
return prolly_tree.core.build_tree(put_BANG_,cljs.core.vec(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,entries)));
}));
});
/**
 * The current `"schema-version"` value for this index shape
 *   (ADR-2607050500, "Schema evolution"). Not a hidden default -- `commit!`
 *   requires the caller to pass a version explicitly (see below); this is
 *   just the value to pass when you have no other one in mind. Bump this --
 *   and give callers a migration path keyed on the old value -- the day the
 *   4-index shape changes incompatibly.
 * 
 *   **2** (was 1): the leaf VALUE slot moved from `ipld/encode` (a node codec,
 *   which loses a keyword's type and has no defined order for a set) to
 *   `kotoba.value.v1` via `ipld.value` — ADR-kotoba-canonical-value-codec, VC3.
 *   The migration is read-compatible, not a rewrite: `restore` still reads a
 *   version-1 snapshot through the old codec (see `supported-schema-versions`).
 *   What a version-1 snapshot CANNOT do is retroactively recover a type it never
 *   persisted — a keyword written under version 1 comes back as the string it
 *   was stored as. New writes are version 2.
 */
arrangement.core.current_schema_version = (2);
/**
 * Snapshot versions `restore` can read. Writing is always
 *   `current-schema-version`; reading accepts the older shape so an existing
 *   store keeps opening. Anything outside this set is rejected by name rather
 *   than interpreted under the current index shape.
 */
arrangement.core.supported_schema_versions = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(1),null,(2),null], null), null);
/**
 * Snapshot `db`'s 4 indices into 4 prolly-trees via `put!`
 *   (`prolly-tree.core`-shaped port: `(put! cid bytes)`), CID-address the
 *   commit itself (dag-cbor of `{schema-version index-roots prev}`, where
 *   every root and `prev` is a REAL tag-42 IPLD link via `kotoba-lang/ipld`
 *   -- an empty index snapshots as null), and return the commit CID string.
 *   `prev` is the previous commit CID, or nil for the first commit.
 * 
 *   `schema-version` is REQUIRED (ADR-2607050500: schema evolution is a
 *   caller-declared choice, not a silently-assumed default) -- pass
 *   `current-schema-version` if you have no other version in mind, but state
 *   it. Content-addressed: committing the same `db` + `prev` + `schema-
 *   version` twice returns the same CID.
 * 
 *   `blind-fn`/`encrypt-fn` are REQUIRED (ADR-2607051000, accepted
 *   2026-07-06) and threaded unchanged to `index-root` for all 4 indices —
 *   see `index-root`'s docstring for their contract, including the
 *   synchronous-JVM/Promise-cljs platform split. Returns the commit CID
 *   directly on JVM, a `js/Promise` of it on cljs.
 */
arrangement.core.commit_BANG_ = (function arrangement$core$commit_BANG_(put_BANG_,db,prev,schema_version,blind_fn,encrypt_fn){
var __GT_link = (function (p1__6470_SHARP_){
var G__6471 = p1__6470_SHARP_;
if((G__6471 == null)){
return null;
} else {
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__6471) : ipld.core.link.call(null,G__6471));
}
});
return arrangement.core.pmap_async((function (k){
return arrangement.core.index_root(put_BANG_,cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,k),blind_fn,encrypt_fn);
}),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spo","spo",734923469),new cljs.core.Keyword(null,"pso","pso",1415685955),new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.Keyword(null,"ocp","ocp",448959679)], null)).then((function (p__6472){
var vec__6473 = p__6472;
var spo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6473,(0),null);
var pso = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6473,(1),null);
var pos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6473,(2),null);
var ocp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6473,(3),null);
return ipld.core.put_node_BANG_(put_BANG_,new cljs.core.PersistentArrayMap(null, 3, ["schema-version",schema_version,"index-roots",new cljs.core.PersistentArrayMap(null, 4, ["spo",__GT_link(spo),"pso",__GT_link(pso),"pos",__GT_link(pos),"ocp",__GT_link(ocp)], null),"prev",__GT_link(prev)], null));
}));
});
/**
 * Rebuild a complete in-memory arrangement from a snapshot produced by
 *   `commit!`. Reads only the persisted `spo` covering index and derives the
 *   other three indexes by re-asserting every recovered triple. `get-fn` is
 *   `(fn [cid] bytes)` and `decrypt-fn` is the inverse of the encrypt function
 *   supplied to `commit!` (synchronous on clj, Promise-returning on cljs).
 * 
 *   A nil snapshot returns an empty db. Unknown schema versions are rejected
 *   instead of being interpreted with the current index shape; a version this
 *   build still supports (`supported-schema-versions`) is decoded with the codec
 *   that WROTE it, never reinterpreted under the current one. Returns a db on
 *   clj and a Promise of a db on cljs.
 */
arrangement.core.restore = (function arrangement$core$restore(get_fn,snapshot_cid,decrypt_fn){
if((snapshot_cid == null)){
return Promise.resolve(datalog.index.empty_db());
} else {
var snapshot = ipld.core.decode((get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(snapshot_cid) : get_fn.call(null,snapshot_cid)));
var schema_version = cljs.core.get.cljs$core$IFn$_invoke$arity$2(snapshot,"schema-version");
var _ = ((cljs.core.contains_QMARK_(arrangement.core.supported_schema_versions,schema_version))?null:(function (){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Unsupported arrangement snapshot schema",new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"problem","problem",1168155148),new cljs.core.Keyword("arrangement","unsupported-schema-version","arrangement/unsupported-schema-version",608227450),new cljs.core.Keyword(null,"supported","supported",495067239),arrangement.core.supported_schema_versions,new cljs.core.Keyword(null,"current","current",-1088038603),arrangement.core.current_schema_version,new cljs.core.Keyword(null,"actual","actual",107306363),schema_version,new cljs.core.Keyword(null,"snapshot-cid","snapshot-cid",2054649011),snapshot_cid], null))})());
var decode_leaf = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),schema_version))?(function (bytes){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(arrangement.core.edn__GT_link,ipld.core.decode(bytes));
}):ipld.value.decode_value);
var root_cid = (function (){var G__6476 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(snapshot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["index-roots","spo"], null));
if((G__6476 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__6476) : ipld.core.link_cid.call(null,G__6476));
}
})();
var entries = (cljs.core.truth_(root_cid)?prolly_tree.core.scan_prefix(get_fn,root_cid,""):cljs.core.PersistentVector.EMPTY);
var build = (function (triples){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db,p__6477){
var vec__6478 = p__6477;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6478,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6478,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6478,(2),null);
return datalog.index.assert_quad(db,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"s","s",1705939918),s,new cljs.core.Keyword(null,"p","p",151049309),p,new cljs.core.Keyword(null,"o","o",-1350007228),o], null),ipld.core.link_QMARK_);
}),datalog.index.empty_db(),triples);
});
return Promise.all(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__6481){
var vec__6482 = p__6481;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6482,(0),null);
var ciphertext = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6482,(1),null);
return (decrypt_fn.cljs$core$IFn$_invoke$arity$1 ? decrypt_fn.cljs$core$IFn$_invoke$arity$1(ciphertext) : decrypt_fn.call(null,ciphertext)).then(decode_leaf);
}),entries))).then((function (triples){
return build(cljs.core.vec(triples));
}));
}
});
/**
 * The triple `index` stores for quad `{s p o}`, or nil when that index skips
 *   it. Mirrors `assert-quad`'s four `upd` calls exactly; if those ever diverge,
 *   a delta commit stops matching a full one and the tests below say so.
 */
arrangement.core.index_triple = (function arrangement$core$index_triple(index,p__6485,ref_QMARK_){
var map__6486 = p__6485;
var map__6486__$1 = cljs.core.__destructure_map(map__6486);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6486__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6486__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6486__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
var G__6487 = index;
var G__6487__$1 = (((G__6487 instanceof cljs.core.Keyword))?G__6487.fqn:null);
switch (G__6487__$1) {
case "spo":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null);

break;
case "pso":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,s,o], null);

break;
case "pos":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,o,s], null);

break;
case "ocp":
if(cljs.core.truth_((ref_QMARK_.cljs$core$IFn$_invoke$arity$1 ? ref_QMARK_.cljs$core$IFn$_invoke$arity$1(o) : ref_QMARK_.call(null,o)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [o,p,s], null);
} else {
return null;
}

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__6487__$1))));

}
});
arrangement.core.index_names = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spo","spo",734923469),"spo"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pso","pso",1415685955),"pso"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pos","pos",-864607220),"pos"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ocp","ocp",448959679),"ocp"], null)], null);
/**
 * Root CID of one index in a previously committed snapshot, or nil.
 */
arrangement.core.prev_root = (function arrangement$core$prev_root(snapshot,name){
var G__6488 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(snapshot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["index-roots",name], null));
if((G__6488 == null)){
return null;
} else {
return (ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link_cid.cljs$core$IFn$_invoke$arity$1(G__6488) : ipld.core.link_cid.call(null,G__6488));
}
});
/**
 * Commit `quads` ON TOP of `prev-commit-cid` without rebuilding the indices,
 *   and return the new commit CID.
 * 
 *   `commit!` flattens four in-memory index maps and builds four trees from
 *   scratch, so a caller holding a large graph must materialize all of it to add
 *   one fact. That is why a fold is O(graph) however little novelty it has, and
 *   why folding a million-entity graph does not fit in a Worker's budget. Here
 *   each index's previous tree is extended in place through
 *   `prolly-tree/insert-many`: only the leaves the new keys land in are read and
 *   rewritten, and the internal levels are re-chunked once.
 * 
 *   The result is CID-IDENTICAL to `(commit! put! db prev schema-version ...)`
 *   for the db that would result from asserting the same quads — the tests treat
 *   any divergence as a failure. It has to be: the whole point of a
 *   content-addressed snapshot is that the same content has the same name, and a
 *   delta path that produced a different CID for the same graph would break
 *   every equality check above it — CAS, dedup, replication — while looking like
 *   it worked.
 * 
 *   `prev-commit-cid` nil commits the quads as a first snapshot. `quads` is a
 *   seq of `{:s :p :o}`. `ref?` (default `ipld.core/link?`) decides whether `:o`
 *   is also indexed in `:ocp`, matching `assert-quad`. `get-fn` reads blocks;
 *   everything else matches `commit!`'s contract, including its
 *   synchronous-JVM / Promise-cljs split.
 */
arrangement.core.commit_delta_BANG_ = (function arrangement$core$commit_delta_BANG_(var_args){
var G__6493 = arguments.length;
switch (G__6493) {
case 7:
return arrangement.core.commit_delta_BANG_.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 8:
return arrangement.core.commit_delta_BANG_.cljs$core$IFn$_invoke$arity$8((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(arrangement.core.commit_delta_BANG_.cljs$core$IFn$_invoke$arity$7 = (function (put_BANG_,get_fn,prev_commit_cid,quads,schema_version,blind_fn,encrypt_fn){
return arrangement.core.commit_delta_BANG_.cljs$core$IFn$_invoke$arity$8(put_BANG_,get_fn,prev_commit_cid,quads,schema_version,blind_fn,encrypt_fn,ipld.core.link_QMARK_);
}));

(arrangement.core.commit_delta_BANG_.cljs$core$IFn$_invoke$arity$8 = (function (put_BANG_,get_fn,prev_commit_cid,quads,schema_version,blind_fn,encrypt_fn,ref_QMARK_){
var snapshot = (cljs.core.truth_(prev_commit_cid)?ipld.core.decode((get_fn.cljs$core$IFn$_invoke$arity$1 ? get_fn.cljs$core$IFn$_invoke$arity$1(prev_commit_cid) : get_fn.call(null,prev_commit_cid))):null);
var __GT_link = (function (p1__6489_SHARP_){
var G__6494 = p1__6489_SHARP_;
if((G__6494 == null)){
return null;
} else {
return (ipld.core.link.cljs$core$IFn$_invoke$arity$1 ? ipld.core.link.cljs$core$IFn$_invoke$arity$1(G__6494) : ipld.core.link.call(null,G__6494));
}
});
var triples_for = (function (index){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__6490_SHARP_){
return arrangement.core.index_triple(index,p1__6490_SHARP_,ref_QMARK_);
}),quads);
});
return arrangement.core.pmap_async((function (p__6495){
var vec__6496 = p__6495;
var index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6496,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6496,(1),null);
return arrangement.core.pmap_async((function (t){
return arrangement.core.pmap_async(blind_fn,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(arrangement.core.blind_input,t)).then((function (blinded){
return (function (){var G__6499 = ipld.value.encode_value(t);
return (encrypt_fn.cljs$core$IFn$_invoke$arity$1 ? encrypt_fn.cljs$core$IFn$_invoke$arity$1(G__6499) : encrypt_fn.call(null,G__6499));
})().then((function (ct){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([blinded], 0)),ct], null);
}));
}));
}),cljs.core.vec(triples_for(index))).then((function (entries){
return prolly_tree.core.insert_many_async(put_BANG_,get_fn,arrangement.core.prev_root(snapshot,name),cljs.core.vec(entries)).then((function (root){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,__GT_link(root)], null);
}));
}));
}),arrangement.core.index_names).then((function (pairs){
var map__6500 = ipld.core.node__GT_block(new cljs.core.PersistentArrayMap(null, 3, ["schema-version",schema_version,"index-roots",cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,pairs),"prev",__GT_link(prev_commit_cid)], null));
var map__6500__$1 = cljs.core.__destructure_map(map__6500);
var cid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6500__$1,new cljs.core.Keyword(null,"cid","cid",-1940591320));
var bytes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6500__$1,new cljs.core.Keyword(null,"bytes","bytes",1175866680));
return Promise.resolve((put_BANG_.cljs$core$IFn$_invoke$arity$2 ? put_BANG_.cljs$core$IFn$_invoke$arity$2(cid,bytes) : put_BANG_.call(null,cid,bytes))).then((function (_){
return cid;
}));
}));
}));

(arrangement.core.commit_delta_BANG_.cljs$lang$maxFixedArity = 8);


//# sourceMappingURL=arrangement.core.js.map
