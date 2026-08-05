goog.provide('kotobase.protocols.sparql.ntriples');
kotobase.protocols.sparql.ntriples.content_type = "application/n-triples";
/**
 * RDF 1.1 §7 ECHAR/UCHAR for a literal's lexical form. The five that MUST be
 *   escaped, and nothing else — a serializer that escapes more still parses, but
 *   a serializer that escapes less produces a document that does not.
 */
kotobase.protocols.sparql.ntriples.escape = (function kotobase$protocols$sparql$ntriples$escape(v){
return clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)),"\\","\\\\"),"\"","\\\""),"\n","\\n"),"\r","\\r"),"\t","\\t");
});
/**
 * One term. An IRI is angle-bracketed; anything else is written as a literal,
 *   with the numeric and boolean datatypes spelled out because an untyped `"1"`
 *   and an `xsd:integer` 1 are different terms and collapsing them would lose the
 *   distinction the store already made.
 */
kotobase.protocols.sparql.ntriples.term__GT_nt = (function kotobase$protocols$sparql$ntriples$term__GT_nt(t){
var v = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(t);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"iri","iri",423917494),new cljs.core.Keyword("rdf","type","rdf/type",1175423232).cljs$core$IFn$_invoke$arity$1(t))){
return (""+"<"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.ntriples.escape(v))+">");
} else {
if(cljs.core.boolean_QMARK_(v)){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+"\"^^<http://www.w3.org/2001/XMLSchema#boolean>");
} else {
if(cljs.core.integer_QMARK_(v)){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+"\"^^<http://www.w3.org/2001/XMLSchema#integer>");
} else {
if(typeof v === 'number'){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+"\"^^<http://www.w3.org/2001/XMLSchema#double>");
} else {
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.ntriples.escape(v))+"\"");

}
}
}
}
});
/**
 * A set of quad maps -> an N-Triples document.
 * 
 *   Sorted, because the input is a SET and an unordered document would make two
 *   identical graphs serialize differently — which turns a diff or a cache key
 *   into noise. The order is not part of RDF's meaning; the determinism is for
 *   whoever has to read the output twice.
 */
kotobase.protocols.sparql.ntriples.graph__GT_ntriples = (function kotobase$protocols$sparql$ntriples$graph__GT_ntriples(graph){
return (function (p1__13109_SHARP_){
if(clojure.string.blank_QMARK_(p1__13109_SHARP_)){
return "";
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__13109_SHARP_)+"\n");
}
})(clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__13110){
var map__13111 = p__13110;
var map__13111__$1 = cljs.core.__destructure_map(map__13111);
var subject = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13111__$1,new cljs.core.Keyword(null,"subject","subject",-1411880451));
var predicate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13111__$1,new cljs.core.Keyword(null,"predicate","predicate",-1742501860));
var object = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13111__$1,new cljs.core.Keyword(null,"object","object",1474613949));
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.ntriples.term__GT_nt(subject))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.ntriples.term__GT_nt(predicate))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.ntriples.term__GT_nt(object))+" .");
}),graph))));
});

//# sourceMappingURL=kotobase.protocols.sparql.ntriples.js.map
