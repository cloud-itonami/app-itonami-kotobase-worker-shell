goog.provide('kotobase.protocols.graphql');

/**
* @constructor
 * @implements {graphql.ports.IResolver}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
kotobase.protocols.graphql.t_kotobase$protocols$graphql13018 = (function (resolver_map,meta13019){
this.resolver_map = resolver_map;
this.meta13019 = meta13019;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13020,meta13019__$1){
var self__ = this;
var _13020__$1 = this;
return (new kotobase.protocols.graphql.t_kotobase$protocols$graphql13018(self__.resolver_map,meta13019__$1));
}));

(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13020){
var self__ = this;
var _13020__$1 = this;
return self__.meta13019;
}));

(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.prototype.graphql$ports$IResolver$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.prototype.graphql$ports$IResolver$resolve$arity$6 = (function (_,type_name,field_name,parent,args,ctx){
var self__ = this;
var ___$1 = this;
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.resolver_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type_name,field_name], null));
if(cljs.core.truth_(temp__5823__auto__)){
var f = temp__5823__auto__;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(parent,args,ctx) : f.call(null,parent,args,ctx));
} else {
var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(parent,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(field_name));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(parent,field_name);
}
}
}));

(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"resolver-map","resolver-map",648998235,null),new cljs.core.Symbol(null,"meta13019","meta13019",-1148274092,null)], null);
}));

(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.cljs$lang$type = true);

(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.cljs$lang$ctorStr = "kotobase.protocols.graphql/t_kotobase$protocols$graphql13018");

(kotobase.protocols.graphql.t_kotobase$protocols$graphql13018.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase.protocols.graphql/t_kotobase$protocols$graphql13018");
}));

/**
 * Positional factory function for kotobase.protocols.graphql/t_kotobase$protocols$graphql13018.
 */
kotobase.protocols.graphql.__GT_t_kotobase$protocols$graphql13018 = (function kotobase$protocols$graphql$__GT_t_kotobase$protocols$graphql13018(resolver_map,meta13019){
return (new kotobase.protocols.graphql.t_kotobase$protocols$graphql13018(resolver_map,meta13019));
});


/**
 * Build a `graphql.ports/IResolver` from `resolver-map`, `{[type-name
 *   field-name] (fn [parent args ctx] value)}` (string keys, matching
 *   `graphql.execute`'s own `type-name`/`field-name` string arguments
 *   exactly -- e.g. `{["Query" "user"] (fn [_ args ctx] ...)}`).
 * 
 *   Any `[type-name field-name]` pair NOT present in `resolver-map` falls
 *   back to `graphql.execute/default-ports`'s plain-map field access
 *   (`(get parent (keyword field-name))`, string-key fallback) -- so scalar
 *   passthrough fields on an already-resolved object (e.g. `User.name` once
 *   a parent resolver has returned `{:name "Alice" ...}`) don't need their
 *   own registry entry, only fields that must themselves query
 *   `kotobase.query.bridge` do.
 */
kotobase.protocols.graphql.resolver = (function kotobase$protocols$graphql$resolver(resolver_map){
return (new kotobase.protocols.graphql.t_kotobase$protocols$graphql13018(resolver_map,cljs.core.PersistentArrayMap.EMPTY));
});
kotobase.protocols.graphql.gql_error = (function kotobase$protocols$graphql$gql_error(var_args){
var G__13022 = arguments.length;
switch (G__13022) {
case 1:
return kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1 = (function (msg){
return new cljs.core.PersistentArrayMap(null, 1, ["message",msg], null);
}));

(kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$2 = (function (msg,extra){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, ["message",msg], null),extra], 0));
}));

(kotobase.protocols.graphql.gql_error.cljs$lang$maxFixedArity = 2);

/**
 * `graphql.query/parse-query` does not bind `$name` variable references
 *   (see the library's own README) -- detect them up front so we reject
 *   loudly instead of silently mis-tokenizing them as enum-shaped string
 *   literals. A `$` followed by an identifier char is unambiguous inside a
 *   GraphQL document (no other legal use of `$`).
 */
kotobase.protocols.graphql.variables_unsupported_QMARK_ = (function kotobase$protocols$graphql$variables_unsupported_QMARK_(query_str){
return cljs.core.boolean$(cljs.core.re_find(/\$[A-Za-z_]/,query_str));
});
/**
 * `{ ... }` / `query ...` -> :query, `mutation ...` -> :mutation,
 *   `subscription ...` -> :subscription, anything else -> :unknown.
 *   Comments (`# ...` to end of line, same syntax `graphql.query/tokenize`
 *   strips) are removed before inspecting the leading keyword, so a query
 *   that merely starts with a comment is still classified correctly.
 */
kotobase.protocols.graphql.operation_kind = (function kotobase$protocols$graphql$operation_kind(query_str){
var trimmed = clojure.string.trim(clojure.string.replace(query_str,/#[^\n]*/,""));
if(clojure.string.starts_with_QMARK_(trimmed,"{")){
return new cljs.core.Keyword(null,"query","query",-1288509510);
} else {
if(cljs.core.truth_(cljs.core.re_find(/^mutation\b/i,trimmed))){
return new cljs.core.Keyword(null,"mutation","mutation",-285823378);
} else {
if(cljs.core.truth_(cljs.core.re_find(/^subscription\b/i,trimmed))){
return new cljs.core.Keyword(null,"subscription","subscription",1949009182);
} else {
if(cljs.core.truth_(cljs.core.re_find(/^query\b/i,trimmed))){
return new cljs.core.Keyword(null,"query","query",-1288509510);
} else {
return new cljs.core.Keyword(null,"unknown","unknown",-935977881);

}
}
}
}
});
/**
 * Recursively check that every field in `selections` exists on
 *   `type-name` in `schema`, and that a field with sub-selections resolves
 *   to an object/interface/union type that itself has fields to select
 *   (never a scalar). Returns a vector of GraphQL-shaped error maps
 *   (`{"message" ...}`), empty when the selection set is valid.
 * 
 *   This is the query-level check `graphql.validate` deliberately does not
 *   do (that namespace validates the SCHEMA's own structural well-formedness
 *   only, not a particular request's selections against it) -- see ns
 *   docstring's "Division of labour" section.
 */
kotobase.protocols.graphql.validate_selections = (function kotobase$protocols$graphql$validate_selections(schema,type_name,selections){
var type_def = graphql.model.get_type(schema,type_name);
if((type_def == null)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1((""+"Unknown type \""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type_name)+"\"."))], null);
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (errs,sel){
var fname = new cljs.core.Keyword("graphql","field","graphql/field",-1549739757).cljs$core$IFn$_invoke$arity$1(sel);
var field = graphql.model.field_by_name(type_def,fname);
if((field == null)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(errs,kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1((""+"Cannot query field \""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(fname)+"\" on type \""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type_name)+"\".")));
} else {
if(((cljs.core.seq(new cljs.core.Keyword("graphql","selections","graphql/selections",-1556956402).cljs$core$IFn$_invoke$arity$1(sel))) && ((graphql.model.get_type(schema,new cljs.core.Keyword("graphql","type","graphql/type",1313045893).cljs$core$IFn$_invoke$arity$1(field)) == null)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(errs,kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1((""+"Field \""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(fname)+"\" must not have a selection"+" since type \""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("graphql","type","graphql/type",1313045893).cljs$core$IFn$_invoke$arity$1(field))+"\" has no subfields.")));
} else {
if(cljs.core.seq(new cljs.core.Keyword("graphql","selections","graphql/selections",-1556956402).cljs$core$IFn$_invoke$arity$1(sel))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(errs,(function (){var G__13023 = schema;
var G__13024 = new cljs.core.Keyword("graphql","type","graphql/type",1313045893).cljs$core$IFn$_invoke$arity$1(field);
var G__13025 = new cljs.core.Keyword("graphql","selections","graphql/selections",-1556956402).cljs$core$IFn$_invoke$arity$1(sel);
return (kotobase.protocols.graphql.validate_selections.cljs$core$IFn$_invoke$arity$3 ? kotobase.protocols.graphql.validate_selections.cljs$core$IFn$_invoke$arity$3(G__13023,G__13024,G__13025) : kotobase.protocols.graphql.validate_selections.call(null,G__13023,G__13024,G__13025));
})());
} else {
return errs;

}
}
}
}),cljs.core.PersistentVector.EMPTY,selections);
}
});
kotobase.protocols.graphql.audit_BANG_ = (function kotobase$protocols$graphql$audit_BANG_(store,op,query_text,now,extra){
return kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"graphql","graphql",-218428840),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"query","query",-1288509510),query_text,new cljs.core.Keyword(null,"now","now",-1650525531),now], null),extra], 0)));
});
/**
 * Decode+validate+execute one GraphQL-over-HTTP request body (already
 *   JSON-parsed, string keys). Returns `{:ok bool :status int :data v
 *   :errors [...]}` -- never throws (every failure inside the GraphQL
 *   pipeline is caught here, per the ns docstring's request-error/
 *   execution-error split).
 */
kotobase.protocols.graphql.run_request = (function kotobase$protocols$graphql$run_request(p__13026,body){
var map__13027 = p__13026;
var map__13027__$1 = cljs.core.__destructure_map(map__13027);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13027__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13027__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
var schema = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13027__$1,new cljs.core.Keyword(null,"schema","schema",-1582001791));
var resolvers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13027__$1,new cljs.core.Keyword(null,"resolvers","resolvers",-1037942130));
var now = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13027__$1,new cljs.core.Keyword(null,"now","now",-1650525531));
var query_text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(body,"query");
if((!(typeof query_text === 'string'))){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"status","status",-1997798413),(400),new cljs.core.Keyword(null,"errors","errors",-908790718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1("must provide a \"query\" string")], null)], null);
} else {
if(kotobase.protocols.graphql.variables_unsupported_QMARK_(query_text)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"status","status",-1997798413),(400),new cljs.core.Keyword(null,"errors","errors",-908790718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1((""+"$variable references are not supported by graphql-clj's"+" query parser in v0.1 -- inline literal argument values"+" instead (see ns docstring)"))], null)], null);
} else {
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutation","mutation",-285823378),null,new cljs.core.Keyword(null,"subscription","subscription",1949009182),null], null), null),kotobase.protocols.graphql.operation_kind(query_text))){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"status","status",-1997798413),(400),new cljs.core.Keyword(null,"errors","errors",-908790718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(kotobase.protocols.graphql.operation_kind(query_text)))+" operations are not supported -- org-graphql-http v0.1 is a"+" query-only surface (ADR-2607172500)"))], null)], null);
} else {
var ast = graphql.query.parse_query(query_text);
if(cljs.core.empty_QMARK_(ast)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"status","status",-1997798413),(400),new cljs.core.Keyword(null,"errors","errors",-908790718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1("Syntax Error: query does not contain a valid selection set")], null)], null);
} else {
var root = graphql.model.query_root(schema);
if((root == null)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"status","status",-1997798413),(400),new cljs.core.Keyword(null,"errors","errors",-908790718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1("schema has no query root type defined")], null)], null);
} else {
var verrs = kotobase.protocols.graphql.validate_selections(schema,root,ast);
if(cljs.core.seq(verrs)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"status","status",-1997798413),(400),new cljs.core.Keyword(null,"errors","errors",-908790718),verrs], null);
} else {
try{var ports = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"resolver","resolver",-1740553583),kotobase.protocols.graphql.resolver(resolvers)], null);
var data = graphql.execute.execute_query(ports,schema,ast,null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"store","store",1512230022),store,new cljs.core.Keyword(null,"visible?","visible?",2129863715),visible_QMARK_], null));
kotobase.protocols.graphql.audit_BANG_(store,new cljs.core.Keyword(null,"query","query",-1288509510),query_text,now,cljs.core.PersistentArrayMap.EMPTY);

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ok","ok",967785236),true,new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"data","data",-232669377),data], null);
}catch (e13028){var e = e13028;
var msg = (function (){var or__5162__auto__ = e.message;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e));
}
})();
kotobase.protocols.graphql.audit_BANG_(store,new cljs.core.Keyword(null,"query-error","query-error",-898801975),query_text,now,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),msg], null));

return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"data","data",-232669377),null,new cljs.core.Keyword(null,"errors","errors",-908790718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1(msg)], null)], null);
}}
}

}

}
}
}
});
kotobase.protocols.graphql.json_response = (function kotobase$protocols$graphql$json_response(status,m){
return kotobase.protocols.graphql.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),kotobase.protocols.graphql.json.encode(m));
});
/**
 * `POST /graphql` handler -- GraphQL over HTTP shaped (see ns docstring
 *   for the exact request/response JSON and the v0.1 scope boundary). `ctx`
 *   is `{:store IStore :visible? (fn [datom] boolean?) :schema
 *   graphql.model-schema :resolvers {[type field] resolver-fn ...} :now
 *   optional-ISO-string}`.
 * 
 *   `:visible?` and `:schema` are REQUIRED -- throws immediately (a ctx bug,
 *   not a wire error) if either is missing; no permissive default
 *   (ADR-2607050500).
 */
kotobase.protocols.graphql.handle = (function kotobase$protocols$graphql$handle(p__13029,req){
var map__13030 = p__13029;
var map__13030__$1 = cljs.core.__destructure_map(map__13030);
var ctx = map__13030__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13030__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13030__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
var schema = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13030__$1,new cljs.core.Keyword(null,"schema","schema",-1582001791));
var resolvers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13030__$1,new cljs.core.Keyword(null,"resolvers","resolvers",-1037942130));
if(cljs.core.fn_QMARK_(visible_QMARK_)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"kotobase.protocols.graphql/handle requires ctx :visible? -- a REQUIRED"+" predicate fn over materialized datoms, no permissive default"+" (ADR-2607050500). Pass (constantly true) to see everything."),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("graphql","ctx-error","graphql/ctx-error",-724004219),true], null));
}

if(cljs.core.map_QMARK_(schema)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"kotobase.protocols.graphql/handle requires ctx :schema -- a graphql.model"+" EDN schema map (e.g. from graphql.sdl/parse-schema); this repo does not"+" auto-derive one (ADR-2607172500, rejected as v0.1 scope creep)"),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("graphql","ctx-error","graphql/ctx-error",-724004219),true], null));
}

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["graphql"], null),kotobase.protocols.graphql.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req)))){
return kotobase.protocols.graphql.http.not_found.cljs$core$IFn$_invoke$arity$0();
} else {
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))){
return kotobase.protocols.graphql.http.method_not_allowed();
} else {
var parsed = (function (){try{return kotobase.protocols.graphql.json.parse((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "{}";
}
})());
}catch (e13031){var _ = e13031;
return new cljs.core.Keyword("kotobase.protocols.graphql","malformed","kotobase.protocols.graphql/malformed",-1693322599);
}})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(parsed,new cljs.core.Keyword("kotobase.protocols.graphql","malformed","kotobase.protocols.graphql/malformed",-1693322599))){
return kotobase.protocols.graphql.json_response((400),new cljs.core.PersistentArrayMap(null, 1, ["errors",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.graphql.gql_error.cljs$core$IFn$_invoke$arity$1("malformed JSON body")], null)], null));
} else {
var map__13032 = kotobase.protocols.graphql.run_request(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ctx,new cljs.core.Keyword(null,"resolvers","resolvers",-1037942130),(function (){var or__5162__auto__ = resolvers;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})()),parsed);
var map__13032__$1 = cljs.core.__destructure_map(map__13032);
var ok = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13032__$1,new cljs.core.Keyword(null,"ok","ok",967785236));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13032__$1,new cljs.core.Keyword(null,"status","status",-1997798413));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13032__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var errors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13032__$1,new cljs.core.Keyword(null,"errors","errors",-908790718));
if(cljs.core.truth_(ok)){
return kotobase.protocols.graphql.json_response(status,(function (){var G__13033 = new cljs.core.PersistentArrayMap(null, 1, ["data",data], null);
if(cljs.core.seq(errors)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__13033,"errors",errors);
} else {
return G__13033;
}
})());
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),status)){
return kotobase.protocols.graphql.json_response(status,new cljs.core.PersistentArrayMap(null, 2, ["data",data,"errors",errors], null));
} else {
return kotobase.protocols.graphql.json_response(status,new cljs.core.PersistentArrayMap(null, 1, ["errors",errors], null));

}
}
}

}
}
});

//# sourceMappingURL=kotobase.protocols.graphql.js.map
