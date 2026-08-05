goog.provide('kotobase.protocols.sparql.parser');
/**
 * [type regex], tried in order, each regex anchored to match at the START
 *   of the remaining input (`^...`). Order matters: more specific patterns
 *   (string/iriref/pname) must be tried before the generic `:ident` catch-all,
 *   numbers before pname (a bare `-5` shouldn't tokenize as an operator run),
 *   and operators like `!=`/`<=` before their single-char prefixes (`!`/`<`).
 */
kotobase.protocols.sparql.parser.token_specs = new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws","ws",86841443),/^[ \t\r\n]+/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"comment","comment",532206069),/^#[^\r\n]*/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"iriref","iriref",-1698702518),/^<[^<>\"{}|^`\\\x00-\x20]*>/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"string","string",-1989541586),/^\"(?:[^\"\\]|\\.)*\"(?:@[A-Za-z]+(?:-[A-Za-z0-9]+)*)?(?:\^\^(?:<[^<>]*>|[A-Za-z_][A-Za-z0-9_-]*:[A-Za-z_0-9.-]*))?/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"string","string",-1989541586),/^'(?:[^'\\]|\\.)*'(?:@[A-Za-z]+(?:-[A-Za-z0-9]+)*)?(?:\^\^(?:<[^<>]*>|[A-Za-z_][A-Za-z0-9_-]*:[A-Za-z_0-9.-]*))?/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"var","var",-769682797),/^[?$][A-Za-z_][A-Za-z0-9_]*/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"number","number",1570378438),/^[+-]?(?:[0-9]+\.[0-9]+(?:[eE][+-]?[0-9]+)?|\.[0-9]+(?:[eE][+-]?[0-9]+)?|[0-9]+(?:[eE][+-]?[0-9]+)?)/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pname","pname",175120060),/^([A-Za-z_][A-Za-z0-9_-]*)?:[A-Za-z_0-9.-]*/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"op","op",-1882987955),/^(&&|\|\||!=|<=|>=|=|<|>|!)/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"punct","punct",1807261997),/^[{}().,;*]/], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ident","ident",-742346),/^[A-Za-z][A-Za-z0-9_]*/], null)], null);
kotobase.protocols.sparql.parser.unescape_string = (function kotobase$protocols$sparql$parser$unescape_string(s){
return clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace(s,"\\\"","\""),"\\'","'"),"\\n","\n"),"\\r","\r"),"\\t","\t"),"\\\\","\\");
});
/**
 * Strip the quotes and any `@lang`/`^^datatype` suffix, unescape the body.
 *   We deliberately DROP lang/datatype (see ns docstring on the 2-key literal
 *   term shape) -- the suffix is consumed here just so it doesn't leak into
 *   the next token.
 */
kotobase.protocols.sparql.parser.string_token_value = (function kotobase$protocols$sparql$parser$string_token_value(text){
var quote = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(text,(0),(1));
var end = clojure.string.index_of.cljs$core$IFn$_invoke$arity$3(text,quote,(1));
return kotobase.protocols.sparql.parser.unescape_string(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(text,(1),end));
});
/**
 * Same integer-vs-decimal split `kotobase.protocols.json`'s number parser
 *   uses (integer literal -> integral type, `.`/`e`/`E` present -> float) --
 *   this is what keeps a query-text literal `900000` `=`-equal to a
 *   materialized doc's `:budget 900000` on BOTH runtimes (cljs: only one
 *   number type, always equal; JVM :test compat suite: `Long` must meet
 *   `Long`, `Double` must meet `Double`, per `clojure.core/=`'s type-category
 *   rule).
 */
kotobase.protocols.sparql.parser.parse_number_token = (function kotobase$protocols$sparql$parser$parse_number_token(text){
if(cljs.core.truth_(cljs.core.re_find(/[.eE]/,text))){
return parseFloat(text);
} else {
return parseInt(text,(10));
}
});
/**
 * Query text -> vector of `{:type :text ...}` tokens, `:ws`/`:comment`
 *   dropped. Each token additionally carries a type-specific payload:
 *   `:var` -> `:name` (no `?`/`$`); `:string` -> `:value` (unescaped,
 *   unquoted); `:number` -> `:value` (parsed); `:iriref` -> `:value`
 *   (bracket contents); `:pname` -> `:prefix`/`:local`.
 */
kotobase.protocols.sparql.parser.tokenize = (function kotobase$protocols$sparql$parser$tokenize(s){
var i = (0);
var out = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if((i >= cljs.core.count(s))){
return cljs.core.persistent_BANG_(out);
} else {
var remaining = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i);
var vec__8057 = cljs.core.some(((function (i,out,remaining){
return (function (p__8060){
var vec__8061 = p__8060;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8061,(0),null);
var re = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8061,(1),null);
var temp__5825__auto__ = cljs.core.re_find(re,remaining);
if(cljs.core.truth_(temp__5825__auto__)){
var m = temp__5825__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,((cljs.core.vector_QMARK_(m))?cljs.core.first(m):m)], null);
} else {
return null;
}
});})(i,out,remaining))
,kotobase.protocols.sparql.parser.token_specs);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8057,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8057,(1),null);
if(cljs.core.truth_(type)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"SPARQL parse error: unexpected character at "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.sparql.parser","tokenize-error","kotobase.protocols.sparql.parser/tokenize-error",2063101052),new cljs.core.Keyword(null,"index","index",-1531685915),i,new cljs.core.Keyword(null,"remaining","remaining",-138926777),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(remaining,(0),cljs.core.min.cljs$core$IFn$_invoke$arity$2((20),((remaining).length)))], null));
}

var len = cljs.core.count(m);
var i_SINGLEQUOTE_ = (i + len);
var G__8064 = type;
var G__8064__$1 = (((G__8064 instanceof cljs.core.Keyword))?G__8064.fqn:null);
switch (G__8064__$1) {
case "ws":
case "comment":
var G__8084 = i_SINGLEQUOTE_;
var G__8085 = out;
i = G__8084;
out = G__8085;
continue;

break;
case "var":
var G__8086 = i_SINGLEQUOTE_;
var G__8087 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(out,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"text","text",-1790561697),m,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(m,(1))], null));
i = G__8086;
out = G__8087;
continue;

break;
case "string":
var G__8088 = i_SINGLEQUOTE_;
var G__8089 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(out,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"text","text",-1790561697),m,new cljs.core.Keyword(null,"value","value",305978217),kotobase.protocols.sparql.parser.string_token_value(m)], null));
i = G__8088;
out = G__8089;
continue;

break;
case "number":
var G__8090 = i_SINGLEQUOTE_;
var G__8091 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(out,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438),new cljs.core.Keyword(null,"text","text",-1790561697),m,new cljs.core.Keyword(null,"value","value",305978217),kotobase.protocols.sparql.parser.parse_number_token(m)], null));
i = G__8090;
out = G__8091;
continue;

break;
case "iriref":
var G__8092 = i_SINGLEQUOTE_;
var G__8093 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(out,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"iriref","iriref",-1698702518),new cljs.core.Keyword(null,"text","text",-1790561697),m,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(m,(1),(cljs.core.count(m) - (1)))], null));
i = G__8092;
out = G__8093;
continue;

break;
case "pname":
var ci = clojure.string.index_of.cljs$core$IFn$_invoke$arity$2(m,":");
var G__8094 = i_SINGLEQUOTE_;
var G__8095 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(out,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"pname","pname",175120060),new cljs.core.Keyword(null,"text","text",-1790561697),m,new cljs.core.Keyword(null,"prefix","prefix",-265908465),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(m,(0),ci),new cljs.core.Keyword(null,"local","local",-1497766724),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(m,(ci + (1)))], null));
i = G__8094;
out = G__8095;
continue;

break;
default:
var G__8096 = i_SINGLEQUOTE_;
var G__8097 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(out,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"text","text",-1790561697),m], null));
i = G__8096;
out = G__8097;
continue;

}
}
break;
}
});
kotobase.protocols.sparql.parser.peek1 = (function kotobase$protocols$sparql$parser$peek1(state){
return cljs.core.first(new cljs.core.Keyword(null,"toks","toks",1351803481).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)));
});
kotobase.protocols.sparql.parser.advance_BANG_ = (function kotobase$protocols$sparql$parser$advance_BANG_(state){
var toks = new cljs.core.Keyword(null,"toks","toks",1351803481).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state));
if(cljs.core.empty_QMARK_(toks)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("SPARQL parse error: unexpected end of input",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.sparql.parser","parse-error","kotobase.protocols.sparql.parser/parse-error",1645981905)], null));
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword(null,"toks","toks",1351803481),cljs.core.subvec,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(1)], 0));

return cljs.core.first(toks);
});
kotobase.protocols.sparql.parser.kw_tok_QMARK_ = (function kotobase$protocols$sparql$parser$kw_tok_QMARK_(tok,kw){
var and__5160__auto__ = tok;
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(tok))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kw,clojure.string.upper_case(new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(tok)))));
} else {
return and__5160__auto__;
}
});
kotobase.protocols.sparql.parser.punct_tok_QMARK_ = (function kotobase$protocols$sparql$parser$punct_tok_QMARK_(tok,ch){
var and__5160__auto__ = tok;
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"punct","punct",1807261997),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(tok))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(tok))));
} else {
return and__5160__auto__;
}
});
kotobase.protocols.sparql.parser.op_tok_QMARK_ = (function kotobase$protocols$sparql$parser$op_tok_QMARK_(tok,op){
var and__5160__auto__ = tok;
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(tok))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(tok))));
} else {
return and__5160__auto__;
}
});
kotobase.protocols.sparql.parser.peek_kw_QMARK_ = (function kotobase$protocols$sparql$parser$peek_kw_QMARK_(state,kw){
return kotobase.protocols.sparql.parser.kw_tok_QMARK_(kotobase.protocols.sparql.parser.peek1(state),kw);
});
kotobase.protocols.sparql.parser.peek_punct_QMARK_ = (function kotobase$protocols$sparql$parser$peek_punct_QMARK_(state,ch){
return kotobase.protocols.sparql.parser.punct_tok_QMARK_(kotobase.protocols.sparql.parser.peek1(state),ch);
});
kotobase.protocols.sparql.parser.peek_op_QMARK_ = (function kotobase$protocols$sparql$parser$peek_op_QMARK_(state,op){
return kotobase.protocols.sparql.parser.op_tok_QMARK_(kotobase.protocols.sparql.parser.peek1(state),op);
});
kotobase.protocols.sparql.parser.fail_BANG_ = (function kotobase$protocols$sparql$parser$fail_BANG_(msg,tok){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"SPARQL parse error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)+cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(tok)?(""+" (got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(tok)], 0)))+")"):null))),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.sparql.parser","parse-error","kotobase.protocols.sparql.parser/parse-error",1645981905),new cljs.core.Keyword(null,"token","token",-1211463215),tok], null));
});
kotobase.protocols.sparql.parser.expect_punct_BANG_ = (function kotobase$protocols$sparql$parser$expect_punct_BANG_(state,ch){
var t = kotobase.protocols.sparql.parser.advance_BANG_(state);
if(cljs.core.truth_(kotobase.protocols.sparql.parser.punct_tok_QMARK_(t,ch))){
} else {
kotobase.protocols.sparql.parser.fail_BANG_((""+"expected '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(ch)+"'"),t);
}

return t;
});
kotobase.protocols.sparql.parser.expect_kw_BANG_ = (function kotobase$protocols$sparql$parser$expect_kw_BANG_(state,kw){
var t = kotobase.protocols.sparql.parser.advance_BANG_(state);
if(cljs.core.truth_(kotobase.protocols.sparql.parser.kw_tok_QMARK_(t,kw))){
} else {
kotobase.protocols.sparql.parser.fail_BANG_((""+"expected "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kw)),t);
}

return t;
});
kotobase.protocols.sparql.parser.resolve_pname = (function kotobase$protocols$sparql$parser$resolve_pname(prefixes,p__8065){
var map__8066 = p__8065;
var map__8066__$1 = cljs.core.__destructure_map(map__8066);
var prefix = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8066__$1,new cljs.core.Keyword(null,"prefix","prefix",-265908465));
var local = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8066__$1,new cljs.core.Keyword(null,"local","local",-1497766724));
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(prefixes,prefix);
if(cljs.core.truth_(temp__5823__auto__)){
var base = temp__5823__auto__;
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(base)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(local));
} else {
return kotobase.protocols.sparql.parser.fail_BANG_((""+"unknown prefix '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)+"'"),null);
}
});
kotobase.protocols.sparql.parser.parse_prologue_BANG_ = (function kotobase$protocols$sparql$parser$parse_prologue_BANG_(state){
var prefixes = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"PREFIX"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var pname_tok = kotobase.protocols.sparql.parser.advance_BANG_(state);
var _ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"pname","pname",175120060),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(pname_tok)))?null:kotobase.protocols.sparql.parser.fail_BANG_("expected prefix:",pname_tok));
var iri_tok = kotobase.protocols.sparql.parser.advance_BANG_(state);
var ___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"iriref","iriref",-1698702518),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iri_tok)))?null:kotobase.protocols.sparql.parser.fail_BANG_("expected <iri> after PREFIX",iri_tok));
var G__8098 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(prefixes,new cljs.core.Keyword(null,"prefix","prefix",-265908465).cljs$core$IFn$_invoke$arity$1(pname_tok),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(iri_tok));
prefixes = G__8098;
continue;
} else {
return prefixes;
}
break;
}
});
kotobase.protocols.sparql.parser.parse_term_BANG_ = (function kotobase$protocols$sparql$parser$parse_term_BANG_(state,prefixes){
var t = kotobase.protocols.sparql.parser.advance_BANG_(state);
var G__8067 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t);
var G__8067__$1 = (((G__8067 instanceof cljs.core.Keyword))?G__8067.fqn:null);
switch (G__8067__$1) {
case "var":
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(t))));

break;
case "iriref":
return kotobase.protocols.sparql.quads.iri(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(t));

break;
case "pname":
return kotobase.protocols.sparql.quads.iri(kotobase.protocols.sparql.parser.resolve_pname(prefixes,t));

break;
case "string":
return kotobase.protocols.sparql.quads.__GT_literal(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(t));

break;
case "number":
return kotobase.protocols.sparql.quads.__GT_literal(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(t));

break;
case "ident":
var u = clojure.string.upper_case(new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(t));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(u,"TRUE")){
return kotobase.protocols.sparql.quads.__GT_literal(true);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(u,"FALSE")){
return kotobase.protocols.sparql.quads.__GT_literal(false);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(u,"A")){
return kotobase.protocols.sparql.quads.iri("urn:kotobase:rdf/type");
} else {
return kotobase.protocols.sparql.parser.fail_BANG_("expected an RDF term (IRI/prefixed-name/var/literal)",t);

}
}
}

break;
default:
return kotobase.protocols.sparql.parser.fail_BANG_("expected an RDF term (IRI/prefixed-name/var/literal)",t);

}
});
kotobase.protocols.sparql.parser.comparison_ops = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, ["!=",null,"=",null,"<=",null,">=",null,"<",null,">",null], null), null);
kotobase.protocols.sparql.parser.operand_value = (function kotobase$protocols$sparql$parser$operand_value(term,bindings){
if((term instanceof cljs.core.Symbol)){
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(bindings,term));
} else {
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(term);
}
});
kotobase.protocols.sparql.parser.compile_relational = (function kotobase$protocols$sparql$parser$compile_relational(op,left,right){
var f = (function (){var G__8068 = op;
switch (G__8068) {
case "=":
return cljs.core._EQ_;

break;
case "!=":
return cljs.core.not_EQ_;

break;
case "<":
return cljs.core._LT_;

break;
case ">":
return cljs.core._GT_;

break;
case "<=":
return cljs.core._LT__EQ_;

break;
case ">=":
return cljs.core._GT__EQ_;

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8068))));

}
})();
return (function (b){
return cljs.core.boolean$((function (){var G__8069 = kotobase.protocols.sparql.parser.operand_value(left,b);
var G__8070 = kotobase.protocols.sparql.parser.operand_value(right,b);
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__8069,G__8070) : f.call(null,G__8069,G__8070));
})());
});
});
kotobase.protocols.sparql.parser.parse_primary_expr_BANG_ = (function kotobase$protocols$sparql$parser$parse_primary_expr_BANG_(state,prefixes){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"("))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var and_chain = (function kotobase$protocols$sparql$parser$parse_primary_expr_BANG__$_and_chain(){
var left = (kotobase.protocols.sparql.parser.parse_unary_expr_BANG_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.sparql.parser.parse_unary_expr_BANG_.cljs$core$IFn$_invoke$arity$2(state,prefixes) : kotobase.protocols.sparql.parser.parse_unary_expr_BANG_.call(null,state,prefixes));
while(true){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_op_QMARK_(state,"&&"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var right = (kotobase.protocols.sparql.parser.parse_unary_expr_BANG_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.sparql.parser.parse_unary_expr_BANG_.cljs$core$IFn$_invoke$arity$2(state,prefixes) : kotobase.protocols.sparql.parser.parse_unary_expr_BANG_.call(null,state,prefixes));
var G__8101 = ((function (left,right){
return (function (b){
var and__5160__auto__ = (left.cljs$core$IFn$_invoke$arity$1 ? left.cljs$core$IFn$_invoke$arity$1(b) : left.call(null,b));
if(cljs.core.truth_(and__5160__auto__)){
return (right.cljs$core$IFn$_invoke$arity$1 ? right.cljs$core$IFn$_invoke$arity$1(b) : right.call(null,b));
} else {
return and__5160__auto__;
}
});})(left,right))
;
left = G__8101;
continue;
} else {
return left;
}
break;
}
});
var left = and_chain();
while(true){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_op_QMARK_(state,"||"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var right = and_chain();
var G__8102 = ((function (left,right){
return (function (b){
var or__5162__auto__ = (left.cljs$core$IFn$_invoke$arity$1 ? left.cljs$core$IFn$_invoke$arity$1(b) : left.call(null,b));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (right.cljs$core$IFn$_invoke$arity$1 ? right.cljs$core$IFn$_invoke$arity$1(b) : right.call(null,b));
}
});})(left,right))
;
left = G__8102;
continue;
} else {
kotobase.protocols.sparql.parser.expect_punct_BANG_(state,")");

return left;
}
break;
}
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.kw_tok_QMARK_(kotobase.protocols.sparql.parser.peek1(state),"BOUND"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

kotobase.protocols.sparql.parser.expect_punct_BANG_(state,"(");

var v = kotobase.protocols.sparql.parser.parse_term_BANG_(state,prefixes);
kotobase.protocols.sparql.parser.expect_punct_BANG_(state,")");

return (function (b){
return cljs.core.contains_QMARK_(b,v);
});
} else {
var left = kotobase.protocols.sparql.parser.parse_term_BANG_(state,prefixes);
var t = kotobase.protocols.sparql.parser.peek1(state);
if(cljs.core.truth_((function (){var and__5160__auto__ = t;
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t))) && (cljs.core.contains_QMARK_(kotobase.protocols.sparql.parser.comparison_ops,new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(t))));
} else {
return and__5160__auto__;
}
})())){
kotobase.protocols.sparql.parser.advance_BANG_(state);

return kotobase.protocols.sparql.parser.compile_relational(new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(t),left,kotobase.protocols.sparql.parser.parse_term_BANG_(state,prefixes));
} else {
return kotobase.protocols.sparql.parser.fail_BANG_("expected a comparison operator",t);
}

}
}
});
kotobase.protocols.sparql.parser.parse_unary_expr_BANG_ = (function kotobase$protocols$sparql$parser$parse_unary_expr_BANG_(state,prefixes){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_op_QMARK_(state,"!"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var inner = kotobase.protocols.sparql.parser.parse_primary_expr_BANG_(state,prefixes);
return (function (b){
return cljs.core.not((inner.cljs$core$IFn$_invoke$arity$1 ? inner.cljs$core$IFn$_invoke$arity$1(b) : inner.call(null,b)));
});
} else {
return kotobase.protocols.sparql.parser.parse_primary_expr_BANG_(state,prefixes);
}
});
kotobase.protocols.sparql.parser.parse_filter_BANG_ = (function kotobase$protocols$sparql$parser$parse_filter_BANG_(state,prefixes){
return kotobase.protocols.sparql.parser.parse_primary_expr_BANG_(state,prefixes);
});
kotobase.protocols.sparql.parser.parse_triple_BANG_ = (function kotobase$protocols$sparql$parser$parse_triple_BANG_(state,prefixes){
var s = kotobase.protocols.sparql.parser.parse_term_BANG_(state,prefixes);
var p = kotobase.protocols.sparql.parser.parse_term_BANG_(state,prefixes);
var o = kotobase.protocols.sparql.parser.parse_term_BANG_(state,prefixes);
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"."))){
kotobase.protocols.sparql.parser.advance_BANG_(state);
} else {
}

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [s,p,o], null);
});
kotobase.protocols.sparql.parser.add_triple = (function kotobase$protocols$sparql$parser$add_triple(acc,tp){
if((acc == null)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"bgp","bgp",-2004304401),new cljs.core.Keyword(null,"patterns","patterns",1164082024),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tp], null)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"bgp","bgp",-2004304401),new cljs.core.Keyword("sparql","op","sparql/op",1260997734).cljs$core$IFn$_invoke$arity$1(acc))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,new cljs.core.Keyword(null,"patterns","patterns",1164082024),cljs.core.conj,tp);
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"join","join",-758861890),new cljs.core.Keyword(null,"left","left",-399115937),acc,new cljs.core.Keyword(null,"right","right",-452581833),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"bgp","bgp",-2004304401),new cljs.core.Keyword(null,"patterns","patterns",1164082024),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tp], null)], null)], null);

}
}
});
kotobase.protocols.sparql.parser.combine = (function kotobase$protocols$sparql$parser$combine(acc,pattern){
if((acc == null)){
return pattern;
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"join","join",-758861890),new cljs.core.Keyword(null,"left","left",-399115937),acc,new cljs.core.Keyword(null,"right","right",-452581833),pattern], null);
}
});
kotobase.protocols.sparql.parser.parse_union_chain_BANG_ = (function kotobase$protocols$sparql$parser$parse_union_chain_BANG_(state,prefixes,first_pattern){
var combined = first_pattern;
while(true){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"UNION"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var G__8103 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"union","union",2142937499),new cljs.core.Keyword(null,"left","left",-399115937),combined,new cljs.core.Keyword(null,"right","right",-452581833),(kotobase.protocols.sparql.parser.parse_group_BANG_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.sparql.parser.parse_group_BANG_.cljs$core$IFn$_invoke$arity$2(state,prefixes) : kotobase.protocols.sparql.parser.parse_group_BANG_.call(null,state,prefixes))], null);
combined = G__8103;
continue;
} else {
return combined;
}
break;
}
});
/**
 * Parse one `{ ... }` GroupGraphPattern into a `:sparql/op` algebra node.
 *   Always returns a node (an empty `{}` becomes an always-true empty `:bgp`).
 */
kotobase.protocols.sparql.parser.parse_group_BANG_ = (function kotobase$protocols$sparql$parser$parse_group_BANG_(state,prefixes){
kotobase.protocols.sparql.parser.expect_punct_BANG_(state,"{");

var acc = null;
var filters = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"}"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (acc,filters){
return (function (p,pred){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"filter","filter",-948537934),new cljs.core.Keyword(null,"pred","pred",1927423397),pred,new cljs.core.Keyword(null,"pattern","pattern",242135423),p], null);
});})(acc,filters))
,(function (){var or__5162__auto__ = acc;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"bgp","bgp",-2004304401),new cljs.core.Keyword(null,"patterns","patterns",1164082024),cljs.core.PersistentVector.EMPTY], null);
}
})(),filters);
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"OPTIONAL"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var inner = (kotobase.protocols.sparql.parser.parse_group_BANG_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.sparql.parser.parse_group_BANG_.cljs$core$IFn$_invoke$arity$2(state,prefixes) : kotobase.protocols.sparql.parser.parse_group_BANG_.call(null,state,prefixes));
var G__8104 = (cljs.core.truth_(acc)?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"optional","optional",2053951509),new cljs.core.Keyword(null,"left","left",-399115937),acc,new cljs.core.Keyword(null,"right","right",-452581833),inner], null):inner);
var G__8105 = filters;
acc = G__8104;
filters = G__8105;
continue;
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"FILTER"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var G__8106 = acc;
var G__8107 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(filters,kotobase.protocols.sparql.parser.parse_filter_BANG_(state,prefixes));
acc = G__8106;
filters = G__8107;
continue;
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"{"))){
var pattern = kotobase.protocols.sparql.parser.parse_union_chain_BANG_(state,prefixes,(kotobase.protocols.sparql.parser.parse_group_BANG_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.sparql.parser.parse_group_BANG_.cljs$core$IFn$_invoke$arity$2(state,prefixes) : kotobase.protocols.sparql.parser.parse_group_BANG_.call(null,state,prefixes)));
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"."))){
kotobase.protocols.sparql.parser.advance_BANG_(state);
} else {
}

var G__8108 = kotobase.protocols.sparql.parser.combine(acc,pattern);
var G__8109 = filters;
acc = G__8108;
filters = G__8109;
continue;
} else {
var G__8110 = kotobase.protocols.sparql.parser.add_triple(acc,kotobase.protocols.sparql.parser.parse_triple_BANG_(state,prefixes));
var G__8111 = filters;
acc = G__8110;
filters = G__8111;
continue;

}
}
}
}
break;
}
});
kotobase.protocols.sparql.parser.parse_var_list_BANG_ = (function kotobase$protocols$sparql$parser$parse_var_list_BANG_(state){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"*"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

return null;
} else {
var vars = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.parser.peek1(state)))){
var G__8112 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(vars,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.parser.advance_BANG_(state))))));
vars = G__8112;
continue;
} else {
return vars;
}
break;
}
}
});
kotobase.protocols.sparql.parser.parse_order_by_BANG_ = (function kotobase$protocols$sparql$parser$parse_order_by_BANG_(state){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"ORDER"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

kotobase.protocols.sparql.parser.expect_kw_BANG_(state,"BY");

var vars = cljs.core.PersistentVector.EMPTY;
var desc = cljs.core.PersistentHashSet.EMPTY;
while(true){
if(cljs.core.truth_((function (){var or__5162__auto__ = kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"ASC");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"DESC");
}
})())){
var desc_QMARK_ = kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"DESC");
kotobase.protocols.sparql.parser.advance_BANG_(state);

kotobase.protocols.sparql.parser.expect_punct_BANG_(state,"(");

var v = kotobase.protocols.sparql.parser.advance_BANG_(state);
var sym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(v))));
kotobase.protocols.sparql.parser.expect_punct_BANG_(state,")");

var G__8113 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(vars,sym);
var G__8114 = (function (){var G__8072 = desc;
if(cljs.core.truth_(desc_QMARK_)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8072,sym);
} else {
return G__8072;
}
})();
vars = G__8113;
desc = G__8114;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.parser.peek1(state)))){
var G__8115 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(vars,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.parser.advance_BANG_(state))))));
var G__8116 = desc;
vars = G__8115;
desc = G__8116;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vars,desc], null);

}
}
break;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,cljs.core.PersistentHashSet.EMPTY], null);
}
});
kotobase.protocols.sparql.parser.parse_limit_offset_BANG_ = (function kotobase$protocols$sparql$parser$parse_limit_offset_BANG_(state){
var limit = null;
var offset = null;
while(true){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"LIMIT"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var G__8117 = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.parser.advance_BANG_(state));
var G__8118 = offset;
limit = G__8117;
offset = G__8118;
continue;
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"OFFSET"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

var G__8119 = limit;
var G__8120 = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(kotobase.protocols.sparql.parser.advance_BANG_(state));
limit = G__8119;
offset = G__8120;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [limit,offset], null);

}
}
break;
}
});
/**
 * SPARQL query text -> `{:form :select|:ask|:construct|:describe|:describe-solutions
 *                         :output-vars [sym...] or nil (SELECT * / ASK)
 *                         :algebra <full sparql.core algebra tree>
 *                         :warnings [string...]}`.
 *   `:algebra` already has ORDER BY / SELECT projection / DISTINCT / LIMIT-
 *   OFFSET applied (in that order -- order-by needs the projected-out vars
 *   still present, so it must wrap BEFORE :project). For `ASK`, `:algebra` is
 *   the bare WHERE pattern (ASK ignores DISTINCT/ORDER/LIMIT/OFFSET, matching
 *   the SPARQL spec -- `sparql.core/ask` only checks non-emptiness).
 *   Throws `ex-info` (`:type ::parse-error` or `::tokenize-error`) on
 *   malformed input -- callers (the HTTP handler) turn that into a 400.
 */
kotobase.protocols.sparql.parser.parse = (function kotobase$protocols$sparql$parser$parse(query_text){
var state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"toks","toks",1351803481),kotobase.protocols.sparql.parser.tokenize(query_text)], null));
var prefixes = kotobase.protocols.sparql.parser.parse_prologue_BANG_(state);
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"SELECT"))){
var _ = kotobase.protocols.sparql.parser.advance_BANG_(state);
var distinct_QMARK_ = kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"DISTINCT");
var ___$1 = (cljs.core.truth_(distinct_QMARK_)?kotobase.protocols.sparql.parser.advance_BANG_(state):null);
var output_vars = kotobase.protocols.sparql.parser.parse_var_list_BANG_(state);
var ___$2 = (cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"WHERE"))?kotobase.protocols.sparql.parser.advance_BANG_(state):null);
var pattern = kotobase.protocols.sparql.parser.parse_group_BANG_(state,prefixes);
var vec__8073 = kotobase.protocols.sparql.parser.parse_order_by_BANG_(state);
var order_vars = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8073,(0),null);
var order_desc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8073,(1),null);
var vec__8076 = kotobase.protocols.sparql.parser.parse_limit_offset_BANG_(state);
var limit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8076,(0),null);
var offset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8076,(1),null);
var base = ((cljs.core.seq(order_vars))?(function (){var G__8079 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"order-by","order-by",1527318070),new cljs.core.Keyword(null,"vars","vars",-2046957217),order_vars,new cljs.core.Keyword(null,"pattern","pattern",242135423),pattern], null);
if(cljs.core.seq(order_desc)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__8079,new cljs.core.Keyword(null,"desc","desc",2093485764),order_desc);
} else {
return G__8079;
}
})():pattern);
var base__$1 = (cljs.core.truth_(output_vars)?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"project","project",1124394579),new cljs.core.Keyword(null,"vars","vars",-2046957217),output_vars,new cljs.core.Keyword(null,"pattern","pattern",242135423),base], null):base);
var base__$2 = (cljs.core.truth_(distinct_QMARK_)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"distinct","distinct",-1788879121),new cljs.core.Keyword(null,"pattern","pattern",242135423),base__$1], null):base__$1);
var base__$3 = (cljs.core.truth_((function (){var or__5162__auto__ = limit;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return offset;
}
})())?new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"slice","slice",-1993607756),new cljs.core.Keyword(null,"offset","offset",296498311),(function (){var or__5162__auto__ = offset;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"limit","limit",-1355822363),limit,new cljs.core.Keyword(null,"pattern","pattern",242135423),base__$2], null):base__$2);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword(null,"output-vars","output-vars",891537724),output_vars,new cljs.core.Keyword(null,"algebra","algebra",-1451384007),base__$3,new cljs.core.Keyword(null,"warnings","warnings",-735437651),cljs.core.PersistentVector.EMPTY], null);
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"CONSTRUCT"))){
var _ = kotobase.protocols.sparql.parser.advance_BANG_(state);
var ___$1 = kotobase.protocols.sparql.parser.expect_punct_BANG_(state,"{");
var template = (function (){var ts = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"}"))){
kotobase.protocols.sparql.parser.advance_BANG_(state);

return ts;
} else {
var G__8121 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ts,kotobase.protocols.sparql.parser.parse_triple_BANG_(state,prefixes));
ts = G__8121;
continue;
}
break;
}
})();
var ___$2 = (cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"WHERE"))?kotobase.protocols.sparql.parser.advance_BANG_(state):null);
var pattern = kotobase.protocols.sparql.parser.parse_group_BANG_(state,prefixes);
var vec__8080 = kotobase.protocols.sparql.parser.parse_limit_offset_BANG_(state);
var limit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8080,(0),null);
var offset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8080,(1),null);
var base = (cljs.core.truth_((function (){var or__5162__auto__ = limit;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return offset;
}
})())?new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("sparql","op","sparql/op",1260997734),new cljs.core.Keyword(null,"slice","slice",-1993607756),new cljs.core.Keyword(null,"offset","offset",296498311),(function (){var or__5162__auto__ = offset;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"limit","limit",-1355822363),limit,new cljs.core.Keyword(null,"pattern","pattern",242135423),pattern], null):pattern);
if(cljs.core.empty_QMARK_(template)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("SPARQL parse error: CONSTRUCT template is empty -- there is nothing to build",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.sparql.parser","parse-error","kotobase.protocols.sparql.parser/parse-error",1645981905)], null));
} else {
}

return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.Keyword(null,"construct","construct",692547932),new cljs.core.Keyword(null,"template","template",-702405684),template,new cljs.core.Keyword(null,"output-vars","output-vars",891537724),null,new cljs.core.Keyword(null,"algebra","algebra",-1451384007),base,new cljs.core.Keyword(null,"warnings","warnings",-735437651),cljs.core.PersistentVector.EMPTY], null);
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"DESCRIBE"))){
var _ = kotobase.protocols.sparql.parser.advance_BANG_(state);
var terms = (function (){var ts = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.truth_((function (){var or__5162__auto__ = (kotobase.protocols.sparql.parser.peek1(state) == null);
if(or__5162__auto__){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"WHERE");
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"{");
}
}
})())){
return ts;
} else {
var G__8122 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ts,kotobase.protocols.sparql.parser.parse_term_BANG_(state,prefixes));
ts = G__8122;
continue;
}
break;
}
})();
var ___$1 = ((cljs.core.empty_QMARK_(terms))?(function (){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("SPARQL parse error: DESCRIBE needs at least one IRI or variable",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.sparql.parser","parse-error","kotobase.protocols.sparql.parser/parse-error",1645981905)], null))})():null);
var has_where_QMARK_ = (function (){var or__5162__auto__ = kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"WHERE");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase.protocols.sparql.parser.peek_punct_QMARK_(state,"{");
}
})();
var ___$2 = (cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"WHERE"))?kotobase.protocols.sparql.parser.advance_BANG_(state):null);
var pattern = (cljs.core.truth_(has_where_QMARK_)?kotobase.protocols.sparql.parser.parse_group_BANG_(state,prefixes):null);
if(cljs.core.truth_(pattern)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.Keyword(null,"describe-solutions","describe-solutions",1712829123),new cljs.core.Keyword(null,"output-vars","output-vars",891537724),cljs.core.filterv(cljs.core.symbol_QMARK_,terms),new cljs.core.Keyword(null,"algebra","algebra",-1451384007),pattern,new cljs.core.Keyword(null,"warnings","warnings",-735437651),cljs.core.PersistentVector.EMPTY], null);
} else {
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.Keyword(null,"describe","describe",1369790582),new cljs.core.Keyword(null,"terms","terms",-1556977978),terms,new cljs.core.Keyword(null,"output-vars","output-vars",891537724),null,new cljs.core.Keyword(null,"algebra","algebra",-1451384007),null,new cljs.core.Keyword(null,"warnings","warnings",-735437651),cljs.core.PersistentVector.EMPTY], null);
}
} else {
if(cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"ASK"))){
var _ = kotobase.protocols.sparql.parser.advance_BANG_(state);
var ___$1 = (cljs.core.truth_(kotobase.protocols.sparql.parser.peek_kw_QMARK_(state,"WHERE"))?kotobase.protocols.sparql.parser.advance_BANG_(state):null);
var pattern = kotobase.protocols.sparql.parser.parse_group_BANG_(state,prefixes);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.Keyword(null,"ask","ask",707712414),new cljs.core.Keyword(null,"output-vars","output-vars",891537724),null,new cljs.core.Keyword(null,"algebra","algebra",-1451384007),pattern,new cljs.core.Keyword(null,"warnings","warnings",-735437651),cljs.core.PersistentVector.EMPTY], null);
} else {
return kotobase.protocols.sparql.parser.fail_BANG_("expected SELECT or ASK",kotobase.protocols.sparql.parser.peek1(state));

}
}
}
}
});

//# sourceMappingURL=kotobase.protocols.sparql.parser.js.map
