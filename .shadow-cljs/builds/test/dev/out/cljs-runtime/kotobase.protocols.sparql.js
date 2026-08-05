goog.provide('kotobase.protocols.sparql');
kotobase.protocols.sparql.query_param = (function kotobase$protocols$sparql$query_param(req,k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"query","query",-1288509510).cljs$core$IFn$_invoke$arity$1(req),k);
});
kotobase.protocols.sparql.header = (function kotobase$protocols$sparql$header(req,k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),clojure.string.lower_case(k));
});
kotobase.protocols.sparql.response = (function kotobase$protocols$sparql$response(var_args){
var G__13324 = arguments.length;
switch (G__13324) {
case 3:
return kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$3 = (function (status,headers,body){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"headers","headers",-835030129),headers,new cljs.core.Keyword(null,"body","body",-2049205669),body], null);
}));

(kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$2 = (function (status,body){
return kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$3(status,cljs.core.PersistentArrayMap.EMPTY,body);
}));

(kotobase.protocols.sparql.response.cljs$lang$maxFixedArity = 3);

kotobase.protocols.sparql.json_response = (function kotobase$protocols$sparql$json_response(status,body_edn){
return kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/sparql-results+json"], null),kotobase.protocols.sparql.json.encode(body_edn));
});
kotobase.protocols.sparql.error_response = (function kotobase$protocols$sparql$error_response(status,msg){
return kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","text/plain; charset=utf-8"], null),msg);
});
kotobase.protocols.sparql.hex__GT_int = (function kotobase$protocols$sparql$hex__GT_int(hex){
return parseInt(hex,(16));
});
kotobase.protocols.sparql.char__GT_byte = (function kotobase$protocols$sparql$char__GT_byte(c){
return c.charCodeAt((0));
});
kotobase.protocols.sparql.decode_utf8_bytes = (function kotobase$protocols$sparql$decode_utf8_bytes(bytes){
return (new TextDecoder("utf-8")).decode(Uint8Array.from(cljs.core.clj__GT_js(bytes)));
});
/**
 * application/x-www-form-urlencoded value -> decoded string. `+` -> space;
 *   `%XX` runs are collected as raw bytes and UTF-8-decoded together (so a
 *   multi-byte percent-encoded UTF-8 sequence like `%E3%81%82` decodes
 *   correctly, not byte-by-byte); every other input character is ASCII-range
 *   by the content-type's own contract (a producer of this content-type MUST
 *   percent-escape anything outside that range).
 */
kotobase.protocols.sparql.percent_decode = (function kotobase$protocols$sparql$percent_decode(s){
var s__$1 = clojure.string.replace(s,"+"," ");
var i = (0);
var bytes = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if((i >= ((s__$1).length))){
return kotobase.protocols.sparql.decode_utf8_bytes(cljs.core.persistent_BANG_(bytes));
} else {
var c = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s__$1,i,(i + (1)));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"%")) && (((i + (3)) <= ((s__$1).length))))){
var G__13338 = (i + (3));
var G__13339 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(bytes,kotobase.protocols.sparql.hex__GT_int(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s__$1,(i + (1)),(i + (3)))));
i = G__13338;
bytes = G__13339;
continue;
} else {
var G__13340 = (i + (1));
var G__13341 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(bytes,kotobase.protocols.sparql.char__GT_byte(c));
i = G__13340;
bytes = G__13341;
continue;
}
}
break;
}
});
kotobase.protocols.sparql.parse_form_urlencoded = (function kotobase$protocols$sparql$parse_form_urlencoded(body){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (pair){
var vec__13325 = clojure.string.split.cljs$core$IFn$_invoke$arity$3(pair,/=/,(2));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13325,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13325,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.sparql.percent_decode((function (){var or__5162__auto__ = k;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})()),kotobase.protocols.sparql.percent_decode((function (){var or__5162__auto__ = v;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})())], null);
})),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(clojure.string.blank_QMARK_,clojure.string.split.cljs$core$IFn$_invoke$arity$2((function (){var or__5162__auto__ = body;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),/&/)));
});
/**
 * True if `accept` (the raw `Accept` header, possibly nil/absent/`* /*`/a
 *   comma-separated list with `;q=` params we ignore -- v0.1 does no real
 *   q-value ranking, just membership) is satisfied by
 *   `application/sparql-results+json`. No `Accept` header, or one containing
 *   `* /*`, defaults to yes (JSON is the only format offered, so `* /*` can
 *   only mean JSON here).
 */
kotobase.protocols.sparql.accepts_json_QMARK_ = (function kotobase$protocols$sparql$accepts_json_QMARK_(accept){
var or__5162__auto__ = clojure.string.blank_QMARK_((function (){var or__5162__auto__ = accept;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})());
if(or__5162__auto__){
return or__5162__auto__;
} else {
var types = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13328_SHARP_){
return clojure.string.trim(cljs.core.first(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__13328_SHARP_,/;/)));
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(accept,/,/));
return cljs.core.boolean$(cljs.core.some((function (p1__13329_SHARP_){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("*/*",p1__13329_SHARP_)) || (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("application/sparql-results+json",p1__13329_SHARP_)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("application/json",p1__13329_SHARP_)))));
}),types));
}
});
/**
 * The SPARQL query text out of `req`, or nil if none was supplied. See ns
 *   docstring for exactly which GET/POST shapes are read.
 */
kotobase.protocols.sparql.extract_query = (function kotobase$protocols$sparql$extract_query(req){
var G__13330 = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var G__13330__$1 = (((G__13330 instanceof cljs.core.Keyword))?G__13330.fqn:null);
switch (G__13330__$1) {
case "get":
return kotobase.protocols.sparql.query_param(req,"query");

break;
case "post":
var ctype = clojure.string.lower_case((function (){var or__5162__auto__ = kotobase.protocols.sparql.header(req,"content-type");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})());
if(clojure.string.starts_with_QMARK_(ctype,"application/sparql-query")){
return new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
} else {
if(clojure.string.starts_with_QMARK_(ctype,"application/x-www-form-urlencoded")){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.sparql.parse_form_urlencoded(new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req)),"query");
} else {
return null;

}
}

break;
default:
return null;

}
});
/**
 * The two forms whose answer is an RDF graph rather than a solution table.
 */
kotobase.protocols.sparql.graph_forms = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"describe-solutions","describe-solutions",1712829123),null,new cljs.core.Keyword(null,"describe","describe",1369790582),null,new cljs.core.Keyword(null,"construct","construct",692547932),null], null), null);
kotobase.protocols.sparql.graph_form_QMARK_ = (function kotobase$protocols$sparql$graph_form_QMARK_(form){
return cljs.core.contains_QMARK_(kotobase.protocols.sparql.graph_forms,form);
});
/**
 * Whether the client will take N-Triples. `* /*` and a missing header count,
 *   same as the JSON path: a client that expressed no preference gets the one
 *   format there is rather than a 406 telling it so.
 */
kotobase.protocols.sparql.accepts_ntriples_QMARK_ = (function kotobase$protocols$sparql$accepts_ntriples_QMARK_(accept){
var a = clojure.string.lower_case((function (){var or__5162__auto__ = accept;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})());
return ((clojure.string.blank_QMARK_(a)) || (((clojure.string.includes_QMARK_(a,"*/*")) || (((clojure.string.includes_QMARK_(a,kotobase.protocols.sparql.ntriples.content_type)) || (clojure.string.includes_QMARK_(a,"text/plain")))))));
});
kotobase.protocols.sparql.ntriples_response = (function kotobase$protocols$sparql$ntriples_response(graph){
return kotobase.protocols.sparql.response.cljs$core$IFn$_invoke$arity$3((200),new cljs.core.PersistentArrayMap(null, 2, ["content-type",(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.ntriples.content_type)+"; charset=utf-8"),"cache-control","no-store"], null),kotobase.protocols.sparql.ntriples.graph__GT_ntriples(graph));
});
/**
 * Every `[s p o]` a parsed query needs from a `datom.source/IPatternSource`.
 * 
 *   Public because the prefetch is the DEPLOY SHELL's job, not this handler's:
 *   scanning the source is asynchronous and this handler is synchronous by
 *   contract, so a shell parses, prefetches, and only then calls `handle` with
 *   `:source` in ctx, using `kotobase.protocols.sparql.parser/parse`.
 * 
 *   DESCRIBE has no algebra — it names terms and wants every triple they appear
 *   in, which is a scan per term in each position.
 */
kotobase.protocols.sparql.scan_patterns = (function kotobase$protocols$sparql$scan_patterns(parsed){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"describe","describe",1369790582),new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(parsed))){
return kotobase.protocols.sparql.quads.describe_scan_patterns(new cljs.core.Keyword(null,"terms","terms",-1556977978).cljs$core$IFn$_invoke$arity$1(parsed));
} else {
return kotobase.protocols.sparql.quads.algebra__GT_scan_patterns(new cljs.core.Keyword(null,"algebra","algebra",-1451384007).cljs$core$IFn$_invoke$arity$1(parsed));
}
});
/**
 * SPARQL 1.1 Protocol handler. `ctx` is `{:store IStore, :coll-keys
 *   ["coll1" ...], :visible? (fn [{:keys [s p o]}]) -> bool}`. `:coll-keys`
 *   is the fixed set of `kotobase.store` collections this endpoint exposes as
 *   its RDF dataset (there is no per-request dataset selection -- SPARQL's
 *   own `default-graph-uri`/`named-graph-uri` protocol params are out of
 *   scope, matching `kotoba-lang/sparql`'s own no-named-graphs boundary).
 *   `:visible?` is REQUIRED, same discipline as `kotobase.query.bridge`/
 *   `arrangement.datalog` (ADR-2607050500) -- see `kotobase.protocols.sparql.
 *   quads` ns docstring for why it is enforced here rather than via
 *   `bridge/q`.
 * 
 *   ctx may instead carry `:source` -- a `datom.source/IPatternSource` the
 *   deploy shell has already prefetched for this query's patterns (see
 *   `scan-patterns`). Then `:store`/`:coll-keys` are not read at all and what
 *   the query costs is its own patterns rather than the whole plane
 *   (superproject ADR-2608039970).
 * 
 *   Without `:source`, v0.1 re-materializes `:coll-keys` from `:store` on EVERY
 *   request (no caching between requests) -- the same linear-scan limitation
 *   `kotobase.query.bridge/materialize` itself documents; this handler adds
 *   no caching on top of it.
 */
kotobase.protocols.sparql.handle = (function kotobase$protocols$sparql$handle(p__13331,req){
var map__13332 = p__13331;
var map__13332__$1 = cljs.core.__destructure_map(map__13332);
var ctx = map__13332__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13332__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var coll_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13332__$1,new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13332__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
if(cljs.core.not((function (){var G__13334 = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var fexpr__13333 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"post","post",269697687),null], null), null);
return (fexpr__13333.cljs$core$IFn$_invoke$arity$1 ? fexpr__13333.cljs$core$IFn$_invoke$arity$1(G__13334) : fexpr__13333.call(null,G__13334));
})())){
return kotobase.protocols.sparql.error_response((405),"method not allowed: GET and POST only");
} else {
if((!(cljs.core.ifn_QMARK_(visible_QMARK_)))){
return kotobase.protocols.sparql.error_response((500),"server misconfigured: ctx :visible? is required (ADR-2607050500)");
} else {
var query_text = kotobase.protocols.sparql.extract_query(req);
if(clojure.string.blank_QMARK_((function (){var or__5162__auto__ = query_text;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})())){
return kotobase.protocols.sparql.error_response((400),"missing 'query' -- GET ?query=..., POST application/sparql-query body, or POST application/x-www-form-urlencoded 'query' field");
} else {
var parsed = (function (){try{return kotobase.protocols.sparql.parser.parse(query_text);
}catch (e13335){var e = e13335;
return e;
}})();
if((parsed instanceof Error)){
return kotobase.protocols.sparql.error_response((400),(""+"SPARQL parse error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(parsed.message)));
} else {
if(((kotobase.protocols.sparql.graph_form_QMARK_(new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(parsed))) && ((!(kotobase.protocols.sparql.accepts_ntriples_QMARK_(kotobase.protocols.sparql.header(req,"accept"))))))){
return kotobase.protocols.sparql.error_response((406),(""+"CONSTRUCT and DESCRIBE return an RDF graph; only "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.ntriples.content_type)+" is supported (no Turtle or RDF/XML yet)"));
} else {
if((((!(kotobase.protocols.sparql.graph_form_QMARK_(new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(parsed))))) && ((!(kotobase.protocols.sparql.accepts_json_QMARK_(kotobase.protocols.sparql.header(req,"accept"))))))){
return kotobase.protocols.sparql.error_response((406),"only application/sparql-results+json is supported for SELECT and ASK (no XML/CSV yet)");
} else {
var quad_seq = (function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(ctx);
if(cljs.core.truth_(temp__5823__auto__)){
var source = temp__5823__auto__;
return kotobase.protocols.sparql.quads.source__GT_quads(source,kotobase.protocols.sparql.scan_patterns(parsed),visible_QMARK_);
} else {
return kotobase.protocols.sparql.quads.datoms__GT_quads(kotobase.query.bridge.db_for(ctx,store,coll_keys),visible_QMARK_);
}
})();
var G__13336 = new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(parsed);
var G__13336__$1 = (((G__13336 instanceof cljs.core.Keyword))?G__13336.fqn:null);
switch (G__13336__$1) {
case "select":
return kotobase.protocols.sparql.json_response((200),kotobase.protocols.sparql.results.select__GT_json(new cljs.core.Keyword(null,"output-vars","output-vars",891537724).cljs$core$IFn$_invoke$arity$1(parsed),sparql.core.select(new cljs.core.Keyword(null,"algebra","algebra",-1451384007).cljs$core$IFn$_invoke$arity$1(parsed),quad_seq)));

break;
case "ask":
return kotobase.protocols.sparql.json_response((200),kotobase.protocols.sparql.results.ask__GT_json(sparql.core.ask(new cljs.core.Keyword(null,"algebra","algebra",-1451384007).cljs$core$IFn$_invoke$arity$1(parsed),quad_seq)));

break;
case "construct":
return kotobase.protocols.sparql.ntriples_response(sparql.core.construct(new cljs.core.Keyword(null,"template","template",-702405684).cljs$core$IFn$_invoke$arity$1(parsed),new cljs.core.Keyword(null,"algebra","algebra",-1451384007).cljs$core$IFn$_invoke$arity$1(parsed),quad_seq));

break;
case "describe":
return kotobase.protocols.sparql.ntriples_response(sparql.core.describe(new cljs.core.Keyword(null,"terms","terms",-1556977978).cljs$core$IFn$_invoke$arity$1(parsed),quad_seq));

break;
case "describe-solutions":
return kotobase.protocols.sparql.ntriples_response(sparql.core.describe_solutions(new cljs.core.Keyword(null,"output-vars","output-vars",891537724).cljs$core$IFn$_invoke$arity$1(parsed),new cljs.core.Keyword(null,"algebra","algebra",-1451384007).cljs$core$IFn$_invoke$arity$1(parsed),quad_seq));

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__13336__$1))));

}

}
}
}

}

}
}
});

//# sourceMappingURL=kotobase.protocols.sparql.js.map
