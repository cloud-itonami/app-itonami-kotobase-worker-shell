goog.provide('kotobase.gremlin.envelope');
/**
 * GraphSON-approximation `args.gremlin` JSON value (a JSON array of JSON
 *   arrays, e.g. `[["V"] ["hasLabel" "users"] ["values" "name"]]`,
 *   already JSON-parsed to EDN vectors of STRINGS by `kotobase.gremlin.json`)
 *   -> `kotobase.gremlin.traversal`'s bytecode shape (vectors whose first
 *   element is a KEYWORD step name, see that ns's docstring).
 */
kotobase.gremlin.envelope.bytecode_json__GT_edn = (function kotobase$gremlin$envelope$bytecode_json__GT_edn(gremlin){
if(cljs.core.sequential_QMARK_(gremlin)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("args.gremlin must be a JSON array of [step, ...args] arrays",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("gremlin","code","gremlin/code",-1917770120),new cljs.core.Keyword("gremlin","malformed-request","gremlin/malformed-request",-1689278221)], null));
}

return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (tup){
if(((cljs.core.sequential_QMARK_(tup)) && (((cljs.core.seq(tup)) && (typeof cljs.core.first(tup) === 'string'))))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"each args.gremlin entry must be a non-empty array whose"+" first element is a step-name string -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([tup], 0)))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("gremlin","code","gremlin/code",-1917770120),new cljs.core.Keyword("gremlin","malformed-request","gremlin/malformed-request",-1689278221)], null));
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.first(tup))], null),cljs.core.rest(tup));
}),gremlin);
});
/**
 * Parsed RequestMessage JSON (string keys) -> `[request-id bytecode]`, or
 *   throws (`(:gremlin/code (ex-data e))` = `:gremlin/malformed-request`) for
 *   anything outside the v0.1 wire subset.
 */
kotobase.gremlin.envelope.request_message__GT_bytecode = (function kotobase$gremlin$envelope$request_message__GT_bytecode(p__9913){
var map__9914 = p__9913;
var map__9914__$1 = cljs.core.__destructure_map(map__9914);
var requestId = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9914__$1,"requestId");
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9914__$1,"op");
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9914__$1,"args");
if(typeof requestId === 'string'){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("RequestMessage missing string \"requestId\"",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("gremlin","code","gremlin/code",-1917770120),new cljs.core.Keyword("gremlin","malformed-request","gremlin/malformed-request",-1689278221)], null));
}

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("bytecode",op)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"unsupported \"op\": "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([op], 0)))+" -- v0.1 only supports \"op\": \"bytecode\" (no \"eval\", ADR-2607172500)"),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("gremlin","code","gremlin/code",-1917770120),new cljs.core.Keyword("gremlin","malformed-request","gremlin/malformed-request",-1689278221)], null));
} else {
}

if(cljs.core.map_QMARK_(args)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("RequestMessage missing \"args\" object",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("gremlin","code","gremlin/code",-1917770120),new cljs.core.Keyword("gremlin","malformed-request","gremlin/malformed-request",-1689278221)], null));
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [requestId,kotobase.gremlin.envelope.bytecode_json__GT_edn(cljs.core.get.cljs$core$IFn$_invoke$arity$2(args,"gremlin"))], null);
});
/**
 * Build a GraphSON RequestMessage JSON string for `bytecode` (this repo's
 *   own EDN bytecode shape, see `kotobase.gremlin.traversal` ns docstring).
 * 
 *   The one-arity form generates a request id from the clock, which is a
 *   test/demo convenience — real clients supply their own unique id, and a
 *   caller that needs a reproducible envelope must use the two-arity form.
 */
kotobase.gremlin.envelope.encode_request = (function kotobase$gremlin$envelope$encode_request(var_args){
var G__9916 = arguments.length;
switch (G__9916) {
case 1:
return kotobase.gremlin.envelope.encode_request.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kotobase.gremlin.envelope.encode_request.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.gremlin.envelope.encode_request.cljs$core$IFn$_invoke$arity$1 = (function (bytecode){
return kotobase.gremlin.envelope.encode_request.cljs$core$IFn$_invoke$arity$2(bytecode,(""+"req-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(Date.now())));
}));

(kotobase.gremlin.envelope.encode_request.cljs$core$IFn$_invoke$arity$2 = (function (bytecode,request_id){
return kotobase.gremlin.json.encode(new cljs.core.PersistentArrayMap(null, 4, ["requestId",request_id,"op","bytecode","processor","traversal","args",new cljs.core.PersistentArrayMap(null, 1, ["gremlin",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__9917){
var vec__9918 = p__9917;
var seq__9919 = cljs.core.seq(vec__9918);
var first__9920 = cljs.core.first(seq__9919);
var seq__9919__$1 = cljs.core.next(seq__9919);
var step = first__9920;
var args = seq__9919__$1;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(step)], null),args);
}),bytecode)], null)], null));
}));

(kotobase.gremlin.envelope.encode_request.cljs$lang$maxFixedArity = 2);

kotobase.gremlin.envelope.status_code__GT_message = (function kotobase$gremlin$envelope$status_code__GT_message(code){
var G__9921 = code;
switch (G__9921) {
case (200):
return "";

break;
default:
return "";

}
});
/**
 * Build a GraphSON ResponseMessage JSON string. `result` -> `{:data [...]}`
 *   on success (`code` 200); `error` -> `{:message "..."}` on failure (`code`
 *   597 or 598).
 */
kotobase.gremlin.envelope.encode_response = (function kotobase$gremlin$envelope$encode_response(request_id,code,p__9922){
var map__9923 = p__9922;
var map__9923__$1 = cljs.core.__destructure_map(map__9923);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9923__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9923__$1,new cljs.core.Keyword(null,"message","message",-406056002));
return kotobase.gremlin.json.encode(new cljs.core.PersistentArrayMap(null, 3, ["requestId",request_id,"status",new cljs.core.PersistentArrayMap(null, 3, ["code",code,"message",(function (){var or__5162__auto__ = message;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase.gremlin.envelope.status_code__GT_message(code);
}
})(),"attributes",cljs.core.PersistentArrayMap.EMPTY], null),"result",new cljs.core.PersistentArrayMap(null, 2, ["data",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(code,(200)))?data:null),"meta",cljs.core.PersistentArrayMap.EMPTY], null)], null));
});
/**
 * Parse a ResponseMessage JSON string (test/client convenience) ->
 *   `{:request-id :code :message :data}`.
 */
kotobase.gremlin.envelope.decode_response = (function kotobase$gremlin$envelope$decode_response(s){
var map__9924 = kotobase.gremlin.json.parse(s);
var map__9924__$1 = cljs.core.__destructure_map(map__9924);
var requestId = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9924__$1,"requestId");
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9924__$1,"status");
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9924__$1,"result");
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"request-id","request-id",-985684093),requestId,new cljs.core.Keyword(null,"code","code",1586293142),cljs.core.get.cljs$core$IFn$_invoke$arity$2(status,"code"),new cljs.core.Keyword(null,"message","message",-406056002),cljs.core.get.cljs$core$IFn$_invoke$arity$2(status,"message"),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.get.cljs$core$IFn$_invoke$arity$2(result,"data")], null);
});
/**
 * One incoming WebSocket text-frame payload (a GraphSON RequestMessage
 *   JSON string) -> a GraphSON ResponseMessage JSON string. Pure w.r.t. `ctx`
 *   (`{:store :vertex-colls :visible?}`, passed straight to
 *   `kotobase.gremlin.traversal/execute`) — no socket concepts in this fn, which
 *   is why it is the half a Worker can host.
 * 
 *   Never throws: a malformed request, an unsupported `op`, or a traversal
 *   error all come back as a ResponseMessage with a Gremlin status code, because
 *   a transport that closes the socket on a bad query tells the client nothing
 *   it can act on.
 */
kotobase.gremlin.envelope.handle_request_text = (function kotobase$gremlin$envelope$handle_request_text(ctx,text){
var parsed = (function (){try{return kotobase.gremlin.json.parse(text);
}catch (e9925){var _ = e9925;
return new cljs.core.Keyword("kotobase.gremlin.envelope","parse-error","kotobase.gremlin.envelope/parse-error",-1354599568);
}})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(parsed,new cljs.core.Keyword("kotobase.gremlin.envelope","parse-error","kotobase.gremlin.envelope/parse-error",-1354599568))){
return kotobase.gremlin.envelope.encode_response("",(598),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),"malformed JSON request body"], null));
} else {
var request_id = cljs.core.get.cljs$core$IFn$_invoke$arity$3(parsed,"requestId","");
try{var vec__9927 = kotobase.gremlin.envelope.request_message__GT_bytecode(parsed);
var request_id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9927,(0),null);
var bytecode = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9927,(1),null);
var data = kotobase.gremlin.traversal.execute(ctx,bytecode);
return kotobase.gremlin.envelope.encode_response(request_id__$1,(200),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null));
}catch (e9926){var e = e9926;
var ed = cljs.core.ex_data(e);
var code = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("gremlin","malformed-request","gremlin/malformed-request",-1689278221),new cljs.core.Keyword("gremlin","code","gremlin/code",-1917770120).cljs$core$IFn$_invoke$arity$1(ed)))?(598):(597));
var msg = (function (){var or__5162__auto__ = new cljs.core.Keyword("gremlin","message","gremlin/message",-147861088).cljs$core$IFn$_invoke$arity$1(ed);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = cljs.core.ex_message(e);
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e));
}
}
})();
return kotobase.gremlin.envelope.encode_response(request_id,code,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null));
}}
});

//# sourceMappingURL=kotobase.gremlin.envelope.js.map
