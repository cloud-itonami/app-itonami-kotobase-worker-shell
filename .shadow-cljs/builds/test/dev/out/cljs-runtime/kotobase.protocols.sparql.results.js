goog.provide('kotobase.protocols.sparql.results');
kotobase.protocols.sparql.results.xsd = "http://www.w3.org/2001/XMLSchema#";
/**
 * Best-effort XSD datatype IRI for a literal's raw `:value`, derived from
 *   its runtime type (the term itself carries no datatype tag -- see
 *   `kotobase.protocols.sparql.quads` for why). `nil` for plain strings (the
 *   JSON Results spec's `literal` binding needs no `datatype` key at all for
 *   a plain string -- omitting it, not emitting `xsd:string`, is the
 *   spec-conformant default).
 */
kotobase.protocols.sparql.results.literal_datatype = (function kotobase$protocols$sparql$results$literal_datatype(v){
if(v === true){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.results.xsd)+"boolean");
} else {
if(v === false){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.results.xsd)+"boolean");
} else {
if(((typeof v === 'number') && (cljs.core.integer_QMARK_(v)))){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.results.xsd)+"integer");
} else {
if(typeof v === 'number'){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.results.xsd)+"double");
} else {
return null;

}
}
}
}
});
/**
 * One `kotobase.protocols.sparql.quads` term map -> the JSON Results
 *   Format's per-variable binding object (still EDN here -- `encode` is a
 *   separate final step in the HTTP handler).
 */
kotobase.protocols.sparql.results.term__GT_binding = (function kotobase$protocols$sparql$results$term__GT_binding(p__13205){
var map__13206 = p__13205;
var map__13206__$1 = cljs.core.__destructure_map(map__13206);
var term = map__13206__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13206__$1,new cljs.core.Keyword("rdf","type","rdf/type",1175423232));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13206__$1,new cljs.core.Keyword(null,"value","value",305978217));
var G__13207 = type;
var G__13207__$1 = (((G__13207 instanceof cljs.core.Keyword))?G__13207.fqn:null);
switch (G__13207__$1) {
case "iri":
return new cljs.core.PersistentArrayMap(null, 2, ["type","uri","value",(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(value))], null);

break;
case "literal":
var dt = kotobase.protocols.sparql.results.literal_datatype(value);
var G__13208 = new cljs.core.PersistentArrayMap(null, 2, ["type","literal","value",(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(value))], null);
if(cljs.core.truth_(dt)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__13208,"datatype",dt);
} else {
return G__13208;
}

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unrecognized RDF term",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"term","term",-1817390416),term], null));

}
});
kotobase.protocols.sparql.results.binding_row__GT_json = (function kotobase$protocols$sparql$results$binding_row__GT_json(row){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__13209){
var vec__13210 = p__13209;
var var_sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13210,(0),null);
var term = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13210,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_sym),(1)),kotobase.protocols.sparql.results.term__GT_binding(term)], null);
})),row);
});
/**
 * `output-vars` (a seq of `'?var` symbols, in `head.vars` order -- `nil`
 *   falls back to the union of every var seen across `rows`, first-seen
 *   order, for `SELECT *`) + `rows` (the seq/vec `sparql.core/select`
 *   returns) -> the full SPARQL JSON Results Format EDN structure (still
 *   needs `kotobase.protocols.sparql.json/encode` to become a JSON string).
 */
kotobase.protocols.sparql.results.select__GT_json = (function kotobase$protocols$sparql$results$select__GT_json(output_vars,rows){
var vars = (function (){var or__5162__auto__ = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13213_SHARP_){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cljs.core.name(p1__13213_SHARP_),(1));
}),output_vars));
if(or__5162__auto__){
return or__5162__auto__;
} else {
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (row){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13214_SHARP_){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cljs.core.name(p1__13214_SHARP_),(1));
}),cljs.core.keys(row));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rows], 0)));
}
})();
return new cljs.core.PersistentArrayMap(null, 2, ["head",new cljs.core.PersistentArrayMap(null, 1, ["vars",cljs.core.vec(vars)], null),"results",new cljs.core.PersistentArrayMap(null, 1, ["bindings",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.sparql.results.binding_row__GT_json,rows)], null)], null);
});
/**
 * `sparql.core/ask`'s boolean -> the SPARQL JSON Results Format's ASK
 *   shape: `{"head": {}, "boolean": <bool>}`.
 */
kotobase.protocols.sparql.results.ask__GT_json = (function kotobase$protocols$sparql$results$ask__GT_json(bool_result){
return new cljs.core.PersistentArrayMap(null, 2, ["head",cljs.core.PersistentArrayMap.EMPTY,"boolean",cljs.core.boolean$(bool_result)], null);
});

//# sourceMappingURL=kotobase.protocols.sparql.results.js.map
