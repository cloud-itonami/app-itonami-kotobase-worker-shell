goog.provide('kotobase.protocols.sparql.quads');
/**
 * A materialized entity or attribute keyword -> a `urn:kotobase:...` IRI
 *   string. `:users/u1` -> `"urn:kotobase:users/u1"`; a bare (no-namespace)
 *   keyword like `:role` -> `"urn:kotobase:role"`. Deterministic and
 *   collision-free across every materialized collection (mirrors
 *   `kotobase.query.bridge`'s own entity-id scheme: `(keyword coll k)`), so
 *   the same source keyword always round-trips to the same IRI term, which is
 *   what BGP-pattern equality (`sparql.core/term=` is plain `=`) depends on.
 * 
 *   Total over what a datom attribute can actually be, not just over what it
 *   should be. `kotobase.query.bridge` now normalises document keys to keywords,
 *   which is the real fix for the case that found this — but before it did, a
 *   JSON-authored document put a STRING here, ClojureScript's `namespace` threw
 *   `Doesn't support namespace: <x>`, and every SPARQL query against that graph
 *   failed with an internal error whatever the query said (production,
 *   2026-07-31). A query surface should degrade to a usable IRI rather than 500
 *   when it meets an identifier shape it did not expect, so a non-`INamed`
 *   attribute is stringified rather than thrown on.
 * 
 *   A string `"v2"` and the keyword `:v2` therefore produce the SAME IRI. That
 *   is a deliberate conflation of two things the store can distinguish, and it is
 *   the right trade here only because the bridge no longer emits the string form;
 *   if it ever does again, the two collapse instead of erroring, and this comment
 *   is the warning.
 */
kotobase.protocols.sparql.quads.kw__GT_iri_string = (function kotobase$protocols$sparql$quads$kw__GT_iri_string(kw){
if((((kw instanceof cljs.core.Keyword)) || ((kw instanceof cljs.core.Symbol)))){
return (""+"urn:kotobase:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var temp__5823__auto__ = cljs.core.namespace(kw);
if(cljs.core.truth_(temp__5823__auto__)){
var ns = temp__5823__auto__;
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(kw)));
} else {
return cljs.core.name(kw);
}
})()));
} else {
return (""+"urn:kotobase:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kw));
}
});
/**
 * Inverse of `kw->iri-string`, for callers that need to go back from a
 *   bound `?var`'s IRI value to the originating keyword (e.g. to look up
 *   `:kotobase/coll`/`:kotobase/key` for a matched entity). Only handles the
 *   `urn:kotobase:...` scheme this namespace emits -- returns nil for
 *   anything else.
 */
kotobase.protocols.sparql.quads.iri_string__GT_kw = (function kotobase$protocols$sparql$quads$iri_string__GT_kw(s){
if(clojure.string.starts_with_QMARK_(s,"urn:kotobase:")){
var rest_SINGLEQUOTE_ = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(("urn:kotobase:").length));
var temp__5823__auto__ = clojure.string.index_of.cljs$core$IFn$_invoke$arity$2(rest_SINGLEQUOTE_,"/");
if(cljs.core.truth_(temp__5823__auto__)){
var i = temp__5823__auto__;
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(rest_SINGLEQUOTE_,(0),i),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(rest_SINGLEQUOTE_,(i + (1))));
} else {
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rest_SINGLEQUOTE_);
}
} else {
return null;
}
});
kotobase.protocols.sparql.quads.iri = (function kotobase$protocols$sparql$quads$iri(v){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("rdf","type","rdf/type",1175423232),new cljs.core.Keyword(null,"iri","iri",423917494),new cljs.core.Keyword(null,"value","value",305978217),v], null);
});
/**
 * Plain literal term for `v` -- `{:rdf/type :literal :value v}`, `v`
 *   UNCOERCED (kept as the real Clojure/js value: string/number/boolean).
 *   Deliberately just these two keys, no `:datatype`/`:lang` -- see the ns
 *   docstring's equality note: `kotobase.protocols.sparql.parser` parses
 *   query-text literals into this exact same two-key shape so a query-side
 *   `900000` and a materialized doc's `:budget 900000` compare `=` (the
 *   datatype/lang tag SPARQL results output wants is derived from `v`'s
 *   runtime type at output time by `kotobase.protocols.sparql.results`, not
 *   carried on the term).
 */
kotobase.protocols.sparql.quads.__GT_literal = (function kotobase$protocols$sparql$quads$__GT_literal(v){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("rdf","type","rdf/type",1175423232),new cljs.core.Keyword(null,"literal","literal",1664775605),new cljs.core.Keyword(null,"value","value",305978217),v], null);
});
/**
 * One materialized `:o` value -> a SPARQL term. `:kotobase/coll`/
 *   `:kotobase/key` synthetic attrs and doc-map keyword attrs alike become
 *   plain literals here EXCEPT the special case below: `kotobase.query.
 *   bridge` stores a document's own keyword-valued reference fields (e.g.
 *   `:dept-key "d1"`) as plain strings, not as entity keywords -- so a
 *   cross-collection join (see `kotobase-query`'s own worked example) is
 *   written in SPARQL the same way it's written in Datalog: joining a
 *   literal `?dk` against the target's `:kotobase/key` LITERAL, not against
 *   an IRI. `:o` is therefore always a literal here; entities only ever
 *   appear as `:s` (via `->subject-term`).
 */
kotobase.protocols.sparql.quads.__GT_term = (function kotobase$protocols$sparql$quads$__GT_term(o){
return kotobase.protocols.sparql.quads.__GT_literal(o);
});
/**
 * A materialized `:s` (always a keyword entity id, `kotobase.query.
 *   bridge/materialize`'s `entity-id`) -> an IRI term.
 */
kotobase.protocols.sparql.quads.__GT_subject_term = (function kotobase$protocols$sparql$quads$__GT_subject_term(s){
return kotobase.protocols.sparql.quads.iri(kotobase.protocols.sparql.quads.kw__GT_iri_string(s));
});
/**
 * A materialized `:p` (a keyword attr, doc-native or one of the two
 *   `:kotobase/*` synthetic attrs) -> an IRI term.
 */
kotobase.protocols.sparql.quads.__GT_predicate_term = (function kotobase$protocols$sparql$quads$__GT_predicate_term(p){
return kotobase.protocols.sparql.quads.iri(kotobase.protocols.sparql.quads.kw__GT_iri_string(p));
});
/**
 * `urn:kotobase:alice` -> `"alice"` -- the RAW suffix, as a source's `:s`/
 *   `:p` carries it.
 * 
 *   Deliberately not `iri-string->kw`, which returns a KEYWORD because
 *   `kotobase.query.bridge/materialize` mints keyword entities. A source over
 *   the Datomic API's index reads carries the entity/attribute strings the rows
 *   themselves carry (`{e a v_edn added}`), and a keyword would match none of
 *   them. Two backends, two identities, one IRI form.
 */
kotobase.protocols.sparql.quads.iri_string__GT_component = (function kotobase$protocols$sparql$quads$iri_string__GT_component(s){
if(((typeof s === 'string') && (clojure.string.starts_with_QMARK_(s,"urn:kotobase:")))){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(("urn:kotobase:").length));
} else {
return null;
}
});
/**
 * One SPARQL term (or a `?var` symbol) -> the value a source pattern binds
 *   in that position, or nil for a wildcard.
 * 
 *   A variable is a wildcard. An IRI is an entity/attribute identity. A literal
 *   binds its own value -- objects are stored as wire strings, and the parser
 *   produces the same two-key literal shape from query text, so the comparison
 *   is the one the source can actually make.
 */
kotobase.protocols.sparql.quads.term__GT_component = (function kotobase$protocols$sparql$quads$term__GT_component(t){
if((t == null)){
return null;
} else {
if((t instanceof cljs.core.Symbol)){
return null;
} else {
if(((cljs.core.map_QMARK_(t)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"iri","iri",423917494),new cljs.core.Keyword("rdf","type","rdf/type",1175423232).cljs$core$IFn$_invoke$arity$1(t))))){
return kotobase.protocols.sparql.quads.iri_string__GT_component(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(t));
} else {
if(((cljs.core.map_QMARK_(t)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"literal","literal",1664775605),new cljs.core.Keyword("rdf","type","rdf/type",1175423232).cljs$core$IFn$_invoke$arity$1(t))))){
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(t);
} else {
return null;

}
}
}
}
});
/**
 * A SPARQL triple pattern -> the `[s p o]` a source scans.
 */
kotobase.protocols.sparql.quads.triple_pattern__GT_scan = (function kotobase$protocols$sparql$quads$triple_pattern__GT_scan(p__8041){
var vec__8042 = p__8041;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8042,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8042,(1),null);
var o = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8042,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.sparql.quads.term__GT_component(s),kotobase.protocols.sparql.quads.term__GT_component(p),kotobase.protocols.sparql.quads.term__GT_component(o)], null);
});
/**
 * Every `[s p o]` an algebra tree will need, deduplicated.
 * 
 *   Walks `:patterns` (BGP) and recurses through the shapes
 *   `kotoba-lang/sparql` defines: `:pattern` (filter/project/distinct/
 *   order-by/slice) and `:left`/`:right` (join/union/optional). An unknown node
 *   contributes nothing rather than throwing -- a missed pattern is a missing
 *   read, which surfaces as a wrong answer in a test, whereas a throw here
 *   would take out queries that are otherwise fine. Add the node shape when one
 *   appears; do not make this lenient by design.
 */
kotobase.protocols.sparql.quads.algebra__GT_scan_patterns = (function kotobase$protocols$sparql$quads$algebra__GT_scan_patterns(algebra){
var walk = (function kotobase$protocols$sparql$quads$algebra__GT_scan_patterns_$_walk(node){
if(cljs.core.map_QMARK_(node)){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.map.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.sparql.quads.triple_pattern__GT_scan,new cljs.core.Keyword(null,"patterns","patterns",1164082024).cljs$core$IFn$_invoke$arity$1(node)),kotobase$protocols$sparql$quads$algebra__GT_scan_patterns_$_walk(new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(node)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kotobase$protocols$sparql$quads$algebra__GT_scan_patterns_$_walk(new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(node)),kotobase$protocols$sparql$quads$algebra__GT_scan_patterns_$_walk(new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(node))], 0));
} else {
return null;
}
});
return cljs.core.vec(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(walk(algebra)));
});
/**
 * DESCRIBE has no algebra: it names terms and wants every triple they appear
 *   in. That is two scans per term -- as subject, and as object.
 * 
 *   The object-position scan has no index behind it (see
 *   `kotobase.datom-source`'s plan table: `:vaet` covers ref-valued attributes
 *   only), so a DESCRIBE costs a full scan per term. Stated here rather than
 *   discovered in production.
 */
kotobase.protocols.sparql.quads.describe_scan_patterns = (function kotobase$protocols$sparql$quads$describe_scan_patterns(terms){
return cljs.core.vec(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (t){
var c = kotobase.protocols.sparql.quads.term__GT_component(t);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,null,null], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null,c], null)], null);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([terms], 0))));
});
/**
 * `db` (the return of `kotobase.query.bridge/materialize`) -> a vector of
 *   `kotoba-lang/sparql`-shaped RDF quads (`{:subject :predicate :object}`
 *   term maps), ready to hand to `sparql.core/select`/`sparql.core/ask`.
 * 
 *   `visible?` is REQUIRED -- `(fn [{:keys [s p o]}]) -> bool`, the SAME
 *   triple-map shape `kotobase.query.bridge`'s access paths use, applied to
 *   every `{:s :p :o}` BEFORE the term transform. `bridge/datoms` applies it
 *   to the scan; the check below is this repo's own, at this repo's boundary,
 *   so a caller gets this repo's error rather than one from underneath it.
 *   Pass `(constantly true)` to see everything materialized; that is a
 *   caller's explicit choice, never this fn's default (there is no 3-arity
 *   that omits it).
 */
kotobase.protocols.sparql.quads.datoms__GT_quads = (function kotobase$protocols$sparql$quads$datoms__GT_quads(db,visible_QMARK_){
if(cljs.core.ifn_QMARK_(visible_QMARK_)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("datoms->quads: visible? is required (no permissive default, ADR-2607050500)",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.sparql.quads","visible?-required","kotobase.protocols.sparql.quads/visible?-required",-643781059)], null));
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__8045){
var map__8046 = p__8045;
var map__8046__$1 = cljs.core.__destructure_map(map__8046);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8046__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8046__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8046__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"subject","subject",-1411880451),kotobase.protocols.sparql.quads.__GT_subject_term(s),new cljs.core.Keyword(null,"predicate","predicate",-1742501860),kotobase.protocols.sparql.quads.__GT_predicate_term(p),new cljs.core.Keyword(null,"object","object",1474613949),kotobase.protocols.sparql.quads.__GT_term(o)], null);
})),kotobase.query.bridge.datoms(db,visible_QMARK_));
});
/**
 * `patterns` scanned against a `datom.source/IPatternSource` -> the same RDF
 *   quads `datoms->quads` produces from a materialized db.
 * 
 *   The difference is what gets read. `datoms->quads` takes the whole plane and
 *   then runs an algebra over it; this takes the patterns the algebra names.
 *   For a query naming two predicates that is two index ranges, whatever the
 *   graph's size (superproject ADR-2608039970; the source itself is
 *   `kotobase.datom-source`).
 * 
 *   The union is a SET before the term transform: two patterns of a query
 *   routinely overlap (`[?s :knows ?o]` and `[?s ?p "bob"]` both return the
 *   same datom), and a bag here would make `sparql.core`'s DISTINCT and its
 *   solution counts wrong in a way no test of this fn alone would catch.
 * 
 *   `visible?` is REQUIRED, same discipline and same triple-map shape as
 *   `datoms->quads`, applied before the term transform.
 */
kotobase.protocols.sparql.quads.source__GT_quads = (function kotobase$protocols$sparql$quads$source__GT_quads(source,patterns,visible_QMARK_){
if(cljs.core.ifn_QMARK_(visible_QMARK_)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("source->quads: visible? is required (no permissive default, ADR-2607050500)",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.sparql.quads","visible?-required","kotobase.protocols.sparql.quads/visible?-required",-643781059)], null));
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(visible_QMARK_),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__8047){
var map__8048 = p__8047;
var map__8048__$1 = cljs.core.__destructure_map(map__8048);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8048__$1,new cljs.core.Keyword(null,"s","s",1705939918));
var p = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8048__$1,new cljs.core.Keyword(null,"p","p",151049309));
var o = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8048__$1,new cljs.core.Keyword(null,"o","o",-1350007228));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"subject","subject",-1411880451),kotobase.protocols.sparql.quads.__GT_subject_term(s),new cljs.core.Keyword(null,"predicate","predicate",-1742501860),kotobase.protocols.sparql.quads.__GT_predicate_term(p),new cljs.core.Keyword(null,"object","object",1474613949),kotobase.protocols.sparql.quads.__GT_term(o)], null);
}))),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,pattern){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(acc,datom.source.scan(source,pattern));
}),cljs.core.PersistentHashSet.EMPTY,patterns));
});

//# sourceMappingURL=kotobase.protocols.sparql.quads.js.map
