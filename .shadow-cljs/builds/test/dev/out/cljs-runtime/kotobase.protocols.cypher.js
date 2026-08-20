goog.provide('kotobase.protocols.cypher');
kotobase.protocols.cypher.syntax_err = (function kotobase$protocols$cypher$syntax_err(msg){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("cypher","code","cypher/code",-1370471509),"Neo.ClientError.Statement.SyntaxError",new cljs.core.Keyword("cypher","message","cypher/message",-1743687207),msg], null));
});
kotobase.protocols.cypher.semantic_err = (function kotobase$protocols$cypher$semantic_err(msg){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("cypher","code","cypher/code",-1370471509),"Neo.ClientError.Statement.SemanticError",new cljs.core.Keyword("cypher","message","cypher/message",-1743687207),msg], null));
});
kotobase.protocols.cypher.param_err = (function kotobase$protocols$cypher$param_err(msg){
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("cypher","code","cypher/code",-1370471509),"Neo.ClientError.Request.InvalidFormat",new cljs.core.Keyword("cypher","message","cypher/message",-1743687207),msg], null));
});
/**
 * `s`, index `i` at the opening backtick -> `[identifier-name
 *   index-after-closing-backtick]`.
 * 
 *   openCypher quotes an identifier in backticks when it is not a bare
 *   `[A-Za-z_][A-Za-z0-9_]*` word, and that is not a nicety here: this surface
 *   names a `kotobase.store` collection with a label, and the collections it is
 *   actually deployed beside are `[:kotobase.s3/objects bucket]` and
 *   `[:kotobase.at/records did nsid]`. Their addressable leaf names are bucket
 *   names (`my-bucket`) and nsids (`app.bsky.feed.post`) -- a hyphen scans as
 *   `:dash` and a dot as `:dot`, so without this both are unsayable and the
 *   collection is invisible rather than merely awkward to reach.
 * 
 *   A literal backtick inside is written doubled, as openCypher specifies.
 *   Unterminated and empty are errors: an empty identifier would name nothing
 *   and silently match nothing.
 */
kotobase.protocols.cypher.tokenize_backticked = (function kotobase$protocols$cypher$tokenize_backticked(s,i){
var n = cljs.core.count(s);
var j = (i + (1));
var acc = "";
while(true){
if((j >= n)){
throw kotobase.protocols.cypher.syntax_err((""+"unterminated backtick-quoted identifier "+"starting at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("`",cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,j,(j + (1))))){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("`",cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(j + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(j + (2)))))){
var G__10165 = (j + (2));
var G__10166 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"`");
j = G__10165;
acc = G__10166;
continue;
} else {
if(cljs.core.empty_QMARK_(acc)){
throw kotobase.protocols.cypher.syntax_err((""+"empty backtick-quoted identifier at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)));
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(j + (1))], null);
}
}
} else {
var G__10167 = (j + (1));
var G__10168 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,j,(j + (1)))));
j = G__10167;
acc = G__10168;
continue;

}
}
break;
}
});
/**
 * `s`, index `i` at the opening quote char `quote` -> `[unescaped-value
 *   index-after-closing-quote]`.
 */
kotobase.protocols.cypher.tokenize_string = (function kotobase$protocols$cypher$tokenize_string(s,i,quote){
var i__$1 = (i + (1));
var acc = "";
while(true){
if((i__$1 >= cljs.core.count(s))){
throw kotobase.protocols.cypher.syntax_err("unterminated string literal");
} else {
var c = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (1)));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,quote)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\\")){
var e = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i__$1 + (1)),(i__$1 + (2)));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,"\\")){
var G__10169 = (i__$1 + (2));
var G__10170 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__10169;
acc = G__10170;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,"n")){
var G__10171 = (i__$1 + (2));
var G__10172 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__10171;
acc = G__10172;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,"t")){
var G__10173 = (i__$1 + (2));
var G__10174 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__10173;
acc = G__10174;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,quote)){
var G__10175 = (i__$1 + (2));
var G__10176 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(quote));
i__$1 = G__10175;
acc = G__10176;
continue;
} else {
var G__10177 = (i__$1 + (2));
var G__10178 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e));
i__$1 = G__10177;
acc = G__10178;
continue;

}
}
}
}
} else {
var G__10179 = (i__$1 + (1));
var G__10180 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__10179;
acc = G__10180;
continue;

}
}
}
break;
}
});
kotobase.protocols.cypher.keyword_tokens = cljs.core.PersistentHashMap.fromArrays(["NULL","IS","WHERE","NOT","AND","MATCH","RETURN","TRUE","OR","FALSE"],[new cljs.core.Keyword(null,"null","null",-180137709),new cljs.core.Keyword(null,"is","is",369128998),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.Keyword(null,"not","not",-595976884),new cljs.core.Keyword(null,"and","and",-971899817),new cljs.core.Keyword(null,"match","match",1220059550),new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"true","true",-1114210334),new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"false","false",1277713805)]);
/**
 * Cypher statement string -> vector of token maps `{:type kw :val v}`.
 *   Hand-rolled (no regex-based/3rd-party Cypher parser -- v0.1's grammar is
 *   small enough that a scanner + recursive-descent parser over these tokens
 *   is the right size of tool).
 */
kotobase.protocols.cypher.tokenize = (function kotobase$protocols$cypher$tokenize(s){
var n = cljs.core.count(s);
var i = (0);
var toks = cljs.core.PersistentVector.EMPTY;
while(true){
if((i >= n)){
return toks;
} else {
var c = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i,(i + (1)));
if(cljs.core.truth_(cljs.core.re_matches(/[ \t\n\r]/,c))){
var G__10181 = (i + (1));
var G__10182 = toks;
i = G__10181;
toks = G__10182;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"(")){
var G__10183 = (i + (1));
var G__10184 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lparen","lparen",-1339862485)], null));
i = G__10183;
toks = G__10184;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,")")){
var G__10185 = (i + (1));
var G__10186 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"rparen","rparen",302222095)], null));
i = G__10185;
toks = G__10186;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"[")){
var G__10187 = (i + (1));
var G__10188 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lbracket","lbracket",-321099444)], null));
i = G__10187;
toks = G__10188;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"]")){
var G__10189 = (i + (1));
var G__10190 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"rbracket","rbracket",1012978606)], null));
i = G__10189;
toks = G__10190;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,":")){
var G__10191 = (i + (1));
var G__10192 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"colon","colon",-965200945)], null));
i = G__10191;
toks = G__10192;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,".")){
var G__10193 = (i + (1));
var G__10194 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dot","dot",1442709401)], null));
i = G__10193;
toks = G__10194;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,",")){
var G__10195 = (i + (1));
var G__10196 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"comma","comma",1699024745)], null));
i = G__10195;
toks = G__10196;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"<")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),"=")))){
var G__10197 = (i + (2));
var G__10198 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lte","lte",1005402135)], null));
i = G__10197;
toks = G__10198;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"<")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),">")))){
var G__10199 = (i + (2));
var G__10200 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"neq","neq",1883246164)], null));
i = G__10199;
toks = G__10200;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,">")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),"=")))){
var G__10201 = (i + (2));
var G__10202 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"gte","gte",1000474126)], null));
i = G__10201;
toks = G__10202;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"<")){
var G__10203 = (i + (1));
var G__10204 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lt","lt",421989243)], null));
i = G__10203;
toks = G__10204;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,">")){
var G__10205 = (i + (1));
var G__10206 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"gt","gt",-1797443692)], null));
i = G__10205;
toks = G__10206;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"=")){
var G__10207 = (i + (1));
var G__10208 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"eq","eq",-618539067)], null));
i = G__10207;
toks = G__10208;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"*")){
var G__10209 = (i + (1));
var G__10210 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"star","star",279424429)], null));
i = G__10209;
toks = G__10210;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"-")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),">")){
var G__10211 = (i + (2));
var G__10212 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"arrow","arrow",1071351425)], null));
i = G__10211;
toks = G__10212;
continue;
} else {
var G__10213 = (i + (1));
var G__10214 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dash","dash",23821356)], null));
i = G__10213;
toks = G__10214;
continue;
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"$")){
var m = cljs.core.re_find(/^[A-Za-z_][A-Za-z0-9_]*/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(i + (1))));
if(cljs.core.truth_(m)){
var G__10215 = ((i + (1)) + cljs.core.count(m));
var G__10216 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"param","param",2013631823),new cljs.core.Keyword(null,"val","val",128701612),m], null));
i = G__10215;
toks = G__10216;
continue;
} else {
throw kotobase.protocols.cypher.syntax_err((""+"expected an identifier after '$' at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"`")){
var vec__9938 = kotobase.protocols.cypher.tokenize_backticked(s,i);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9938,(0),null);
var i_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9938,(1),null);
var G__10217 = i_SINGLEQUOTE_;
var G__10218 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ident","ident",-742346),new cljs.core.Keyword(null,"val","val",128701612),v], null));
i = G__10217;
toks = G__10218;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"'")) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")))){
var vec__9941 = kotobase.protocols.cypher.tokenize_string(s,i,c);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9941,(0),null);
var i_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9941,(1),null);
var G__10219 = i_SINGLEQUOTE_;
var G__10220 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"val","val",128701612),v], null));
i = G__10219;
toks = G__10220;
continue;
} else {
if(cljs.core.truth_(cljs.core.re_matches(/[0-9]/,c))){
var m = cljs.core.re_find(/^[0-9]+(?:\.[0-9]+)?/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
var numv = ((clojure.string.includes_QMARK_(m,"."))?parseFloat(m):parseInt(m,(10)));
var G__10221 = (i + cljs.core.count(m));
var G__10222 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438),new cljs.core.Keyword(null,"val","val",128701612),numv], null));
i = G__10221;
toks = G__10222;
continue;
} else {
if(cljs.core.truth_(cljs.core.re_matches(/[A-Za-z_]/,c))){
var m = cljs.core.re_find(/^[A-Za-z_][A-Za-z0-9_]*/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
var G__10223 = (i + cljs.core.count(m));
var G__10224 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,(function (){var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.keyword_tokens,clojure.string.upper_case(m));
if(cljs.core.truth_(temp__5823__auto__)){
var kwtype = temp__5823__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),kwtype], null);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ident","ident",-742346),new cljs.core.Keyword(null,"val","val",128701612),m], null);
}
})());
i = G__10223;
toks = G__10224;
continue;
} else {
throw kotobase.protocols.cypher.syntax_err((""+"unexpected character '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)+"' at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)));

}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
break;
}
});
kotobase.protocols.cypher.peek_type = (function kotobase$protocols$cypher$peek_type(toks){
return new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks));
});
kotobase.protocols.cypher.describe_tok = (function kotobase$protocols$cypher$describe_tok(t){
var G__9944 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__9944)){
return "end of input";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"number","number",1570378438),G__9944)){
return (""+"number "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t)));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"string","string",-1989541586),G__9944)){
return "string literal";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"gte","gte",1000474126),G__9944)){
return "'>='";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"param","param",2013631823),G__9944)){
return (""+"parameter '$"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t))+"'");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"neq","neq",1883246164),G__9944)){
return "'<>'";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"gt","gt",-1797443692),G__9944)){
return "'>'";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),G__9944)){
return (""+"identifier '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t))+"'");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"lte","lte",1005402135),G__9944)){
return "'<='";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"lt","lt",421989243),G__9944)){
return "'<'";
} else {
return cljs.core.name(new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t));

}
}
}
}
}
}
}
}
}
}
});
kotobase.protocols.cypher.expect = (function kotobase$protocols$cypher$expect(toks,type){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type,kotobase.protocols.cypher.peek_type(toks))){
return cljs.core.rest(toks);
} else {
throw kotobase.protocols.cypher.syntax_err((""+"expected "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name(type))+", got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks)))));
}
});
kotobase.protocols.cypher.take_ident = (function kotobase$protocols$cypher$take_ident(toks){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),kotobase.protocols.cypher.peek_type(toks))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks)),cljs.core.rest(toks)], null);
} else {
throw kotobase.protocols.cypher.syntax_err((""+"expected an identifier, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks)))));
}
});
kotobase.protocols.cypher.unsupported_clause_keywords = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, ["DELETE",null,"SET",null,"REMOVE",null,"LOAD",null,"CALL",null,"MERGE",null,"FOREACH",null,"UNWIND",null,"CREATE",null,"DETACH",null], null), null);
kotobase.protocols.cypher.expect_match = (function kotobase$protocols$cypher$expect_match(toks){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"match","match",1220059550),kotobase.protocols.cypher.peek_type(toks))){
return cljs.core.rest(toks);
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),kotobase.protocols.cypher.peek_type(toks))) && (cljs.core.contains_QMARK_(kotobase.protocols.cypher.unsupported_clause_keywords,clojure.string.upper_case(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks))))))){
throw kotobase.protocols.cypher.syntax_err((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.upper_case(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks))))+" is not supported -- org-opencypher-cypher v0.1 is a"+" READ-ONLY query surface (MATCH/WHERE/RETURN only;"+" ADR-2607172300)"));
} else {
throw kotobase.protocols.cypher.syntax_err((""+"expected MATCH, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks)))));

}
}
});
kotobase.protocols.cypher.parse_node = (function kotobase$protocols$cypher$parse_node(toks){
var toks__$1 = kotobase.protocols.cypher.expect(toks,new cljs.core.Keyword(null,"lparen","lparen",-1339862485));
var vec__9945 = kotobase.protocols.cypher.take_ident(toks__$1);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9945,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9945,(1),null);
var vec__9948 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"colon","colon",-965200945),kotobase.protocols.cypher.peek_type(toks__$2)))?(function (){var toks__$3 = cljs.core.rest(toks__$2);
return kotobase.protocols.cypher.take_ident(toks__$3);
})():(function (){throw kotobase.protocols.cypher.syntax_err((""+"node pattern '("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+")' has no label -- v0.1 requires"+" every node pattern to be labeled, e.g. ("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+":users)"))})());
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9948,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9948,(1),null);
var toks__$4 = kotobase.protocols.cypher.expect(toks__$3,new cljs.core.Keyword(null,"rparen","rparen",302222095));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"label","label",1718410804),label], null),toks__$4], null);
});
kotobase.protocols.cypher.parse_rel = (function kotobase$protocols$cypher$parse_rel(toks){
var toks__$1 = kotobase.protocols.cypher.expect(toks,new cljs.core.Keyword(null,"dash","dash",23821356));
var toks__$2 = kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"lbracket","lbracket",-321099444));
var toks__$3 = kotobase.protocols.cypher.expect(toks__$2,new cljs.core.Keyword(null,"colon","colon",-965200945));
var vec__9951 = kotobase.protocols.cypher.take_ident(toks__$3);
var reltype = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9951,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9951,(1),null);
var _ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"star","star",279424429),kotobase.protocols.cypher.peek_type(toks__$4)))?(function (){throw kotobase.protocols.cypher.syntax_err("variable-length relationship patterns ([:REL*..]) are not supported in v0.1")})():null);
var toks__$5 = kotobase.protocols.cypher.expect(toks__$4,new cljs.core.Keyword(null,"rbracket","rbracket",1012978606));
var toks__$6 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"arrow","arrow",1071351425),kotobase.protocols.cypher.peek_type(toks__$5)))?cljs.core.rest(toks__$5):(function (){throw kotobase.protocols.cypher.syntax_err((""+"only directed rightward relationship patterns -[:REL]-> are"+" supported in v0.1 (no <-, no undirected --); got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks__$5)))))})());
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reltype,toks__$6], null);
});
/**
 * `(a:A)-[:R]->(b:B)-[:S]->(c:C)` -> `{:nodes [...] :rels [reltype ...]}`.
 * 
 *   `:rels` has exactly one fewer entry than `:nodes`, so hop i joins node i to
 *   node i+1. A single node is `{:nodes [n] :rels []}`, which is the shape every
 *   caller already handled as `:rel-type nil`.
 */
kotobase.protocols.cypher.parse_pattern = (function kotobase$protocols$cypher$parse_pattern(toks){
var G__9957 = kotobase.protocols.cypher.parse_node(toks);
var vec__9958 = G__9957;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9958,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9958,(1),null);
var nodes = cljs.core.PersistentVector.EMPTY;
var rels = cljs.core.PersistentVector.EMPTY;
var G__9957__$1 = G__9957;
var nodes__$1 = nodes;
var rels__$1 = rels;
while(true){
var vec__9967 = G__9957__$1;
var n__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9967,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9967,(1),null);
var nodes__$2 = nodes__$1;
var rels__$2 = rels__$1;
var nodes__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nodes__$2,n__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"dash","dash",23821356),kotobase.protocols.cypher.peek_type(toks__$2))){
var vec__9970 = kotobase.protocols.cypher.parse_rel(toks__$2);
var reltype = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9970,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9970,(1),null);
var G__10225 = kotobase.protocols.cypher.parse_node(toks__$3);
var G__10226 = nodes__$3;
var G__10227 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(rels__$2,reltype);
G__9957__$1 = G__10225;
nodes__$1 = G__10226;
rels__$1 = G__10227;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"nodes","nodes",-2099585805),nodes__$3,new cljs.core.Keyword(null,"rels","rels",1770187185),rels__$2], null),toks__$2], null);
}
break;
}
});
kotobase.protocols.cypher.parse_value = (function kotobase$protocols$cypher$parse_value(toks){
var t = cljs.core.first(toks);
var G__9973 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t);
var G__9973__$1 = (((G__9973 instanceof cljs.core.Keyword))?G__9973.fqn:null);
switch (G__9973__$1) {
case "string":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t),cljs.core.rest(toks)], null);

break;
case "number":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t),cljs.core.rest(toks)], null);

break;
case "true":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,cljs.core.rest(toks)], null);

break;
case "false":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,cljs.core.rest(toks)], null);

break;
case "null":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.rest(toks)], null);

break;
case "param":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cypher","param","cypher/param",74759970),new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t)], null),cljs.core.rest(toks)], null);

break;
case "dash":
var t2 = cljs.core.second(toks);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"number","number",1570378438),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t2))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t2)),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((2),toks)], null);
} else {
throw kotobase.protocols.cypher.syntax_err("expected a number after '-'");
}

break;
default:
throw kotobase.protocols.cypher.syntax_err((""+"expected a value (string, number, true/false, null, or $parameter), got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(t))));

}
});
/**
 * Cypher comparison token -> the `arrangement.datalog` whitelisted function
 *   the translated predicate clause calls.
 * 
 *   `=` is deliberately NOT in here: an equality predicate translates to a
 *   literal in the triple itself, which the index can look up directly, and
 *   routing it through a predicate clause would turn an index probe into a scan
 *   plus a filter. Same operator, two very different plans.
 */
kotobase.protocols.cypher.comparison_ops = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"lt","lt",421989243),new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Keyword(null,"gt","gt",-1797443692),new cljs.core.Symbol(null,">",">",1085014381,null),new cljs.core.Keyword(null,"lte","lte",1005402135),new cljs.core.Symbol(null,"<=","<=",1244895369,null),new cljs.core.Keyword(null,"gte","gte",1000474126),new cljs.core.Symbol(null,">=",">=",1016916022,null),new cljs.core.Keyword(null,"neq","neq",1883246164),new cljs.core.Symbol(null,"not=","not=",1466536204,null)], null);
/**
 * Cypher-ish string predicates, mapped onto `arrangement.datalog`'s whitelist.
 * 
 *   `CONTAINS`/`STARTS WITH`/`ENDS WITH` are Cypher's own spelling; the single
 *   identifier form is accepted for `CONTAINS` only, since the other two are two
 *   words in Cypher and splitting them here would invent syntax.
 */
kotobase.protocols.cypher.string_fns = new cljs.core.PersistentArrayMap(null, 1, ["CONTAINS",new cljs.core.Symbol(null,"includes?","includes?",-2049283381,null)], null);
kotobase.protocols.cypher.parse_predicate = (function kotobase$protocols$cypher$parse_predicate(toks){
var vec__9974 = kotobase.protocols.cypher.take_ident(toks);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9974,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9974,(1),null);
var toks__$2 = kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"dot","dot",1442709401));
var vec__9977 = kotobase.protocols.cypher.take_ident(toks__$2);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9977,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9977,(1),null);
var op_type = kotobase.protocols.cypher.peek_type(toks__$3);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.comparison_ops,op_type);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"is","is",369128998),op_type)){
var toks__$4 = cljs.core.rest(toks__$3);
var negated_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"not","not",-595976884),kotobase.protocols.cypher.peek_type(toks__$4));
var toks__$5 = ((negated_QMARK_)?cljs.core.rest(toks__$4):toks__$4);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"null","null",-180137709),kotobase.protocols.cypher.peek_type(toks__$5))){
} else {
throw kotobase.protocols.cypher.syntax_err((""+"expected NULL after IS"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((negated_QMARK_)?" NOT":null))+" -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks__$5)))));
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop,new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"cmp","cmp",575646375),new cljs.core.Keyword(null,"null?","null?",1275152357),(!(negated_QMARK_))], null),cljs.core.rest(toks__$5)], null);
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),op_type)) && (cljs.core.contains_QMARK_(kotobase.protocols.cypher.string_fns,clojure.string.upper_case((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks__$3))))))))){
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.string_fns,clojure.string.upper_case((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks__$3))))));
var vec__9980 = kotobase.protocols.cypher.parse_value(cljs.core.rest(toks__$3));
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9980,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9980,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop,new cljs.core.Keyword(null,"op","op",-1882987955),f,new cljs.core.Keyword(null,"value","value",305978217),val], null),toks__$4], null);
} else {
if(cljs.core.truth_((function (){var or__5162__auto__ = op;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"eq","eq",-618539067),op_type);
}
})())){
var vec__9983 = kotobase.protocols.cypher.parse_value(cljs.core.rest(toks__$3));
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9983,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9983,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__9986 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop,new cljs.core.Keyword(null,"value","value",305978217),val], null);
if(cljs.core.truth_(op)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__9986,new cljs.core.Keyword(null,"op","op",-1882987955),op);
} else {
return G__9986;
}
})(),toks__$4], null);
} else {
throw kotobase.protocols.cypher.syntax_err((""+"expected a comparison operator (=, <, >, <=, >=, <>),"+" CONTAINS, or IS [NOT] NULL after "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)+" -- got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks__$3)))));

}
}
}
});
/**
 * `[NOT] comparison`, or a parenthesised expression.
 */
kotobase.protocols.cypher.parse_not_expr = (function kotobase$protocols$cypher$parse_not_expr(toks){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"not","not",-595976884),kotobase.protocols.cypher.peek_type(toks))){
var vec__9987 = (function (){var G__9990 = cljs.core.rest(toks);
return (kotobase.protocols.cypher.parse_not_expr.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.parse_not_expr.cljs$core$IFn$_invoke$arity$1(G__9990) : kotobase.protocols.cypher.parse_not_expr.call(null,G__9990));
})();
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9987,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9987,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"not","not",-595976884),new cljs.core.Keyword(null,"arg","arg",-1747261837),e], null),toks__$1], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"lparen","lparen",-1339862485),kotobase.protocols.cypher.peek_type(toks))){
var vec__9991 = (function (){var G__9994 = cljs.core.rest(toks);
return (kotobase.protocols.cypher.parse_or_expr.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.parse_or_expr.cljs$core$IFn$_invoke$arity$1(G__9994) : kotobase.protocols.cypher.parse_or_expr.call(null,G__9994));
})();
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9991,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9991,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"rparen","rparen",302222095))], null);
} else {
var vec__9995 = kotobase.protocols.cypher.parse_predicate(toks);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9995,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9995,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p,new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"cmp","cmp",575646375)),toks__$1], null);

}
}
});
kotobase.protocols.cypher.parse_and_expr = (function kotobase$protocols$cypher$parse_and_expr(toks){
var G__10001 = kotobase.protocols.cypher.parse_not_expr(toks);
var vec__10002 = G__10001;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10002,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10002,(1),null);
var args = cljs.core.PersistentVector.EMPTY;
var G__10001__$1 = G__10001;
var args__$1 = args;
while(true){
var vec__10008 = G__10001__$1;
var e__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10008,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10008,(1),null);
var args__$2 = args__$1;
var args__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(args__$2,e__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"and","and",-971899817),kotobase.protocols.cypher.peek_type(toks__$2))){
var G__10229 = kotobase.protocols.cypher.parse_not_expr(cljs.core.rest(toks__$2));
var G__10230 = args__$3;
G__10001__$1 = G__10229;
args__$1 = G__10230;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args__$3)))?cljs.core.first(args__$3):new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"and","and",-971899817),new cljs.core.Keyword(null,"args","args",1315556576),args__$3], null)),toks__$2], null);
}
break;
}
});
/**
 * `WHERE` boolean expression. Precedence is Cypher's: OR looser than AND,
 *   AND looser than NOT, NOT looser than a comparison. Parsing them at one level
 *   would make `a OR b AND c` mean `(a OR b) AND c` -- a wrong answer, not a
 *   rejected query.
 */
kotobase.protocols.cypher.parse_or_expr = (function kotobase$protocols$cypher$parse_or_expr(toks){
var G__10014 = kotobase.protocols.cypher.parse_and_expr(toks);
var vec__10015 = G__10014;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10015,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10015,(1),null);
var args = cljs.core.PersistentVector.EMPTY;
var G__10014__$1 = G__10014;
var args__$1 = args;
while(true){
var vec__10021 = G__10014__$1;
var e__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10021,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10021,(1),null);
var args__$2 = args__$1;
var args__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(args__$2,e__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"or","or",235744169),kotobase.protocols.cypher.peek_type(toks__$2))){
var G__10231 = kotobase.protocols.cypher.parse_and_expr(cljs.core.rest(toks__$2));
var G__10232 = args__$3;
G__10014__$1 = G__10231;
args__$1 = G__10232;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args__$3)))?cljs.core.first(args__$3):new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"args","args",1315556576),args__$3], null)),toks__$2], null);
}
break;
}
});
kotobase.protocols.cypher.parse_where = (function kotobase$protocols$cypher$parse_where(toks){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"where","where",-2044795965),kotobase.protocols.cypher.peek_type(toks))){
var vec__10024 = kotobase.protocols.cypher.parse_or_expr(cljs.core.rest(toks));
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10024,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10024,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,toks__$1], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,toks], null);
}
});
/**
 * One RETURN projection: `var.prop`, `count(*)`, or `count(var.prop)`,
 *   optionally `AS alias`.
 * 
 *   `count` is the only aggregate. Cypher has many; implementing one and naming
 *   it is better than implementing a family badly, and the grouping rule below is
 *   the part that generalises.
 */
kotobase.protocols.cypher.parse_return_item = (function kotobase$protocols$cypher$parse_return_item(toks){
var agg_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),kotobase.protocols.cypher.peek_type(toks))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("COUNT",clojure.string.upper_case((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks))))))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"lparen","lparen",-1339862485),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(cljs.core.second(toks)))))));
var vec__10027 = ((agg_QMARK_)?(function (){var toks__$1 = cljs.core.rest(cljs.core.rest(toks));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"star","star",279424429),kotobase.protocols.cypher.peek_type(toks__$1))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"agg","agg",-2001869296),new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Keyword(null,"star?","star?",-803901336),true], null),kotobase.protocols.cypher.expect(cljs.core.rest(toks__$1),new cljs.core.Keyword(null,"rparen","rparen",302222095))], null);
} else {
var vec__10033 = kotobase.protocols.cypher.take_ident(toks__$1);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10033,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10033,(1),null);
var toks__$3 = kotobase.protocols.cypher.expect(toks__$2,new cljs.core.Keyword(null,"dot","dot",1442709401));
var vec__10036 = kotobase.protocols.cypher.take_ident(toks__$3);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10036,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10036,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"agg","agg",-2001869296),new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop], null),kotobase.protocols.cypher.expect(toks__$4,new cljs.core.Keyword(null,"rparen","rparen",302222095))], null);
}
})():(function (){var vec__10039 = kotobase.protocols.cypher.take_ident(toks);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10039,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10039,(1),null);
var toks__$2 = kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"dot","dot",1442709401));
var vec__10042 = kotobase.protocols.cypher.take_ident(toks__$2);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10042,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10042,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop], null),toks__$3], null);
})());
var item = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10027,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10027,(1),null);
var alias_QMARK_ = (kotobase.protocols.cypher.kw_ident_QMARK_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.kw_ident_QMARK_.cljs$core$IFn$_invoke$arity$2(toks__$1,"AS") : kotobase.protocols.cypher.kw_ident_QMARK_.call(null,toks__$1,"AS"));
var vec__10030 = (cljs.core.truth_(alias_QMARK_)?kotobase.protocols.cypher.take_ident(cljs.core.rest(toks__$1)):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,toks__$1], null));
var alias = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10030,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10030,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__10045 = item;
if(cljs.core.truth_(alias)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__10045,new cljs.core.Keyword(null,"as","as",1148689641),alias);
} else {
return G__10045;
}
})(),toks__$2], null);
});
kotobase.protocols.cypher.parse_return = (function kotobase$protocols$cypher$parse_return(toks){
var toks__$1 = kotobase.protocols.cypher.expect(toks,new cljs.core.Keyword(null,"return","return",-1891502105));
var distinct_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),kotobase.protocols.cypher.peek_type(toks__$1))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("DISTINCT",clojure.string.upper_case((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks__$1))))))));
var toks__$2 = ((distinct_QMARK_)?cljs.core.rest(toks__$1):toks__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),kotobase.protocols.cypher.peek_type(toks__$2))){
} else {
throw kotobase.protocols.cypher.syntax_err("RETURN must project at least one property (var.prop)");
}

var toks__$3 = toks__$2;
var items = cljs.core.PersistentVector.EMPTY;
while(true){
var vec__10049 = kotobase.protocols.cypher.parse_return_item(toks__$3);
var item = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10049,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10049,(1),null);
var items__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,item);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"comma","comma",1699024745),kotobase.protocols.cypher.peek_type(toks__$4))){
var G__10233 = cljs.core.rest(toks__$4);
var G__10234 = items__$1;
toks__$3 = G__10233;
items = G__10234;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1031954938),items__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810),distinct_QMARK_], null),toks__$4], null);
}
break;
}
});
/**
 * True when the next token is the identifier `word`, case-insensitively.
 */
kotobase.protocols.cypher.kw_ident_QMARK_ = (function kotobase$protocols$cypher$kw_ident_QMARK_(toks,word){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),kotobase.protocols.cypher.peek_type(toks))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(word,clojure.string.upper_case((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(cljs.core.first(toks))))))));
});
/**
 * `ORDER BY item [ASC|DESC] [, ...]` -> `[[{:var :prop :desc?} ...] toks]`.
 */
kotobase.protocols.cypher.parse_order_by = (function kotobase$protocols$cypher$parse_order_by(toks){
if((!(kotobase.protocols.cypher.kw_ident_QMARK_(toks,"ORDER")))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,toks], null);
} else {
var toks__$1 = cljs.core.rest(toks);
if(kotobase.protocols.cypher.kw_ident_QMARK_(toks__$1,"BY")){
} else {
throw kotobase.protocols.cypher.syntax_err("expected BY after ORDER");
}

var toks__$2 = cljs.core.rest(toks__$1);
var items = cljs.core.PersistentVector.EMPTY;
while(true){
var vec__10056 = kotobase.protocols.cypher.parse_return_item(toks__$2);
var map__10059 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10056,(0),null);
var map__10059__$1 = cljs.core.__destructure_map(map__10059);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10059__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10059__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10056,(1),null);
var desc_QMARK_ = kotobase.protocols.cypher.kw_ident_QMARK_(toks__$3,"DESC");
var toks__$4 = ((((desc_QMARK_) || (kotobase.protocols.cypher.kw_ident_QMARK_(toks__$3,"ASC"))))?cljs.core.rest(toks__$3):toks__$3);
var items__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),var$,new cljs.core.Keyword(null,"prop","prop",-515168332),prop,new cljs.core.Keyword(null,"desc?","desc?",-713120712),desc_QMARK_], null));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"comma","comma",1699024745),kotobase.protocols.cypher.peek_type(toks__$4))){
var G__10235 = cljs.core.rest(toks__$4);
var G__10236 = items__$1;
toks__$2 = G__10235;
items = G__10236;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [items__$1,toks__$4], null);
}
break;
}
}
});
/**
 * `WORD n` -> `[n toks]` for SKIP/LIMIT. A negative or fractional count is
 *   rejected at parse time rather than left for `drop`/`take` to reinterpret.
 */
kotobase.protocols.cypher.parse_count = (function kotobase$protocols$cypher$parse_count(toks,word){
if((!(kotobase.protocols.cypher.kw_ident_QMARK_(toks,word)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,toks], null);
} else {
var toks__$1 = cljs.core.rest(toks);
var t = cljs.core.first(toks__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"number","number",1570378438),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t))){
} else {
throw kotobase.protocols.cypher.syntax_err((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(word)+" expects a number, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(t))));
}

var v = new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t);
if(((cljs.core.integer_QMARK_(v)) && ((!((v < (0))))))){
} else {
throw kotobase.protocols.cypher.syntax_err((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(word)+" expects a non-negative integer, got "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)));
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,cljs.core.rest(toks__$1)], null);
}
});
/**
 * Every comparison leaf in a WHERE expression tree, in written order.
 */
kotobase.protocols.cypher.where_leaves = (function kotobase$protocols$cypher$where_leaves(e){
var G__10060 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__10060)){
return cljs.core.PersistentVector.EMPTY;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cmp","cmp",575646375),G__10060)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [e], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"not","not",-595976884),G__10060)){
var G__10061 = new cljs.core.Keyword(null,"arg","arg",-1747261837).cljs$core$IFn$_invoke$arity$1(e);
return (kotobase.protocols.cypher.where_leaves.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.where_leaves.cljs$core$IFn$_invoke$arity$1(G__10061) : kotobase.protocols.cypher.where_leaves.call(null,G__10061));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"and","and",-971899817),G__10060)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.where_leaves),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"or","or",235744169),G__10060)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.where_leaves),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e));
} else {
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__10060))));

}
}
}
}
}
});
/**
 * Parse one Cypher v0.1 statement string into an AST map:
 *   `{:pattern {:nodes [{:var :label} ...] :rels [rel-type ...]}
 *  :where [{:var :prop :value} ...]
 *  :return [{:var :prop} ...]}`.
 * 
 *   Throws `ex-info` (`(:cypher/code (ex-data e))` is a
 *   `"Neo.ClientError.Statement.*"` string, `(:cypher/message (ex-data e))`
 *   a human-readable message) for anything outside the v0.1 subset -- see the
 *   ns docstring's grammar section. Never silently accepts or partially
 *   executes out-of-scope syntax.
 */
kotobase.protocols.cypher.parse = (function kotobase$protocols$cypher$parse(s){
var toks = kotobase.protocols.cypher.tokenize(s);
var toks__$1 = kotobase.protocols.cypher.expect_match(toks);
var vec__10062 = kotobase.protocols.cypher.parse_pattern(toks__$1);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10062,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10062,(1),null);
var vec__10065 = kotobase.protocols.cypher.parse_where(toks__$2);
var wpreds = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10065,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10065,(1),null);
var vec__10068 = kotobase.protocols.cypher.parse_return(toks__$3);
var map__10071 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10068,(0),null);
var map__10071__$1 = cljs.core.__destructure_map(map__10071);
var ritems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10071__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var distinct_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10071__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810));
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10068,(1),null);
var vec__10072 = kotobase.protocols.cypher.parse_order_by(toks__$4);
var order_items = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10072,(0),null);
var toks__$5 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10072,(1),null);
var vec__10075 = kotobase.protocols.cypher.parse_count(toks__$5,"SKIP");
var skip = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10075,(0),null);
var toks__$6 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10075,(1),null);
var vec__10078 = kotobase.protocols.cypher.parse_count(toks__$6,"LIMIT");
var limit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10078,(0),null);
var toks__$7 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10078,(1),null);
if(cljs.core.seq(toks__$7)){
throw kotobase.protocols.cypher.syntax_err((""+"unexpected trailing input starting at "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks__$7)))));
} else {
}

if(cljs.core.empty_QMARK_(ritems)){
throw kotobase.protocols.cypher.syntax_err("RETURN must project at least one property (var.prop)");
} else {
}

var declared_10237 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"nodes","nodes",-2099585805).cljs$core$IFn$_invoke$arity$1(pattern)));
var check_var_10238 = (function (v,where_desc){
if(cljs.core.contains_QMARK_(declared_10237,v)){
return null;
} else {
throw kotobase.protocols.cypher.semantic_err((""+"unknown variable '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+"' in "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(where_desc)+" -- not declared in the MATCH pattern"));
}
});
var seq__10081_10239 = cljs.core.seq(kotobase.protocols.cypher.where_leaves(wpreds));
var chunk__10082_10240 = null;
var count__10083_10241 = (0);
var i__10084_10242 = (0);
while(true){
if((i__10084_10242 < count__10083_10241)){
var p_10243 = chunk__10082_10240.cljs$core$IIndexed$_nth$arity$2(null,i__10084_10242);
check_var_10238(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(p_10243),"WHERE");


var G__10244 = seq__10081_10239;
var G__10245 = chunk__10082_10240;
var G__10246 = count__10083_10241;
var G__10247 = (i__10084_10242 + (1));
seq__10081_10239 = G__10244;
chunk__10082_10240 = G__10245;
count__10083_10241 = G__10246;
i__10084_10242 = G__10247;
continue;
} else {
var temp__5825__auto___10248 = cljs.core.seq(seq__10081_10239);
if(temp__5825__auto___10248){
var seq__10081_10249__$1 = temp__5825__auto___10248;
if(cljs.core.chunked_seq_QMARK_(seq__10081_10249__$1)){
var c__5694__auto___10250 = cljs.core.chunk_first(seq__10081_10249__$1);
var G__10251 = cljs.core.chunk_rest(seq__10081_10249__$1);
var G__10252 = c__5694__auto___10250;
var G__10253 = cljs.core.count(c__5694__auto___10250);
var G__10254 = (0);
seq__10081_10239 = G__10251;
chunk__10082_10240 = G__10252;
count__10083_10241 = G__10253;
i__10084_10242 = G__10254;
continue;
} else {
var p_10255 = cljs.core.first(seq__10081_10249__$1);
check_var_10238(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(p_10255),"WHERE");


var G__10256 = cljs.core.next(seq__10081_10249__$1);
var G__10257 = null;
var G__10258 = (0);
var G__10259 = (0);
seq__10081_10239 = G__10256;
chunk__10082_10240 = G__10257;
count__10083_10241 = G__10258;
i__10084_10242 = G__10259;
continue;
}
} else {
}
}
break;
}

var seq__10085_10260 = cljs.core.seq(ritems);
var chunk__10087_10261 = null;
var count__10088_10262 = (0);
var i__10089_10263 = (0);
while(true){
if((i__10089_10263 < count__10088_10262)){
var r_10264 = chunk__10087_10261.cljs$core$IIndexed$_nth$arity$2(null,i__10089_10263);
if(cljs.core.truth_(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_10264))){
check_var_10238(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_10264),"RETURN");


var G__10265 = seq__10085_10260;
var G__10266 = chunk__10087_10261;
var G__10267 = count__10088_10262;
var G__10268 = (i__10089_10263 + (1));
seq__10085_10260 = G__10265;
chunk__10087_10261 = G__10266;
count__10088_10262 = G__10267;
i__10089_10263 = G__10268;
continue;
} else {
var G__10269 = seq__10085_10260;
var G__10270 = chunk__10087_10261;
var G__10271 = count__10088_10262;
var G__10272 = (i__10089_10263 + (1));
seq__10085_10260 = G__10269;
chunk__10087_10261 = G__10270;
count__10088_10262 = G__10271;
i__10089_10263 = G__10272;
continue;
}
} else {
var temp__5825__auto___10273 = cljs.core.seq(seq__10085_10260);
if(temp__5825__auto___10273){
var seq__10085_10274__$1 = temp__5825__auto___10273;
if(cljs.core.chunked_seq_QMARK_(seq__10085_10274__$1)){
var c__5694__auto___10275 = cljs.core.chunk_first(seq__10085_10274__$1);
var G__10276 = cljs.core.chunk_rest(seq__10085_10274__$1);
var G__10277 = c__5694__auto___10275;
var G__10278 = cljs.core.count(c__5694__auto___10275);
var G__10279 = (0);
seq__10085_10260 = G__10276;
chunk__10087_10261 = G__10277;
count__10088_10262 = G__10278;
i__10089_10263 = G__10279;
continue;
} else {
var r_10280 = cljs.core.first(seq__10085_10274__$1);
if(cljs.core.truth_(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_10280))){
check_var_10238(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_10280),"RETURN");


var G__10281 = cljs.core.next(seq__10085_10274__$1);
var G__10282 = null;
var G__10283 = (0);
var G__10284 = (0);
seq__10085_10260 = G__10281;
chunk__10087_10261 = G__10282;
count__10088_10262 = G__10283;
i__10089_10263 = G__10284;
continue;
} else {
var G__10285 = cljs.core.next(seq__10085_10274__$1);
var G__10286 = null;
var G__10287 = (0);
var G__10288 = (0);
seq__10085_10260 = G__10285;
chunk__10087_10261 = G__10286;
count__10088_10262 = G__10287;
i__10089_10263 = G__10288;
continue;
}
}
} else {
}
}
break;
}

var seq__10091_10289 = cljs.core.seq(order_items);
var chunk__10092_10290 = null;
var count__10093_10291 = (0);
var i__10094_10292 = (0);
while(true){
if((i__10094_10292 < count__10093_10291)){
var o_10293 = chunk__10092_10290.cljs$core$IIndexed$_nth$arity$2(null,i__10094_10292);
check_var_10238(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(o_10293),"ORDER BY");


var G__10294 = seq__10091_10289;
var G__10295 = chunk__10092_10290;
var G__10296 = count__10093_10291;
var G__10297 = (i__10094_10292 + (1));
seq__10091_10289 = G__10294;
chunk__10092_10290 = G__10295;
count__10093_10291 = G__10296;
i__10094_10292 = G__10297;
continue;
} else {
var temp__5825__auto___10298 = cljs.core.seq(seq__10091_10289);
if(temp__5825__auto___10298){
var seq__10091_10299__$1 = temp__5825__auto___10298;
if(cljs.core.chunked_seq_QMARK_(seq__10091_10299__$1)){
var c__5694__auto___10300 = cljs.core.chunk_first(seq__10091_10299__$1);
var G__10301 = cljs.core.chunk_rest(seq__10091_10299__$1);
var G__10302 = c__5694__auto___10300;
var G__10303 = cljs.core.count(c__5694__auto___10300);
var G__10304 = (0);
seq__10091_10289 = G__10301;
chunk__10092_10290 = G__10302;
count__10093_10291 = G__10303;
i__10094_10292 = G__10304;
continue;
} else {
var o_10305 = cljs.core.first(seq__10091_10299__$1);
check_var_10238(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(o_10305),"ORDER BY");


var G__10306 = cljs.core.next(seq__10091_10299__$1);
var G__10307 = null;
var G__10308 = (0);
var G__10309 = (0);
seq__10091_10289 = G__10306;
chunk__10092_10290 = G__10307;
count__10093_10291 = G__10308;
i__10094_10292 = G__10309;
continue;
}
} else {
}
}
break;
}

var returned_10310 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"var","var",-769682797)),cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"prop","prop",-515168332)))),ritems);
var seq__10095_10311 = cljs.core.seq(order_items);
var chunk__10096_10312 = null;
var count__10097_10313 = (0);
var i__10098_10314 = (0);
while(true){
if((i__10098_10314 < count__10097_10313)){
var map__10101_10315 = chunk__10096_10312.cljs$core$IIndexed$_nth$arity$2(null,i__10098_10314);
var map__10101_10316__$1 = cljs.core.__destructure_map(map__10101_10315);
var var_10317 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10101_10316__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop_10318 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10101_10316__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
if(cljs.core.contains_QMARK_(returned_10310,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [var_10317,prop_10318], null))){
} else {
throw kotobase.protocols.cypher.semantic_err((""+"ORDER BY "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var_10317)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop_10318)+" is not in the RETURN list --"+" ordering by an unreturned property is not supported yet"));
}


var G__10319 = seq__10095_10311;
var G__10320 = chunk__10096_10312;
var G__10321 = count__10097_10313;
var G__10322 = (i__10098_10314 + (1));
seq__10095_10311 = G__10319;
chunk__10096_10312 = G__10320;
count__10097_10313 = G__10321;
i__10098_10314 = G__10322;
continue;
} else {
var temp__5825__auto___10323 = cljs.core.seq(seq__10095_10311);
if(temp__5825__auto___10323){
var seq__10095_10324__$1 = temp__5825__auto___10323;
if(cljs.core.chunked_seq_QMARK_(seq__10095_10324__$1)){
var c__5694__auto___10325 = cljs.core.chunk_first(seq__10095_10324__$1);
var G__10326 = cljs.core.chunk_rest(seq__10095_10324__$1);
var G__10327 = c__5694__auto___10325;
var G__10328 = cljs.core.count(c__5694__auto___10325);
var G__10329 = (0);
seq__10095_10311 = G__10326;
chunk__10096_10312 = G__10327;
count__10097_10313 = G__10328;
i__10098_10314 = G__10329;
continue;
} else {
var map__10102_10330 = cljs.core.first(seq__10095_10324__$1);
var map__10102_10331__$1 = cljs.core.__destructure_map(map__10102_10330);
var var_10332 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10102_10331__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop_10333 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10102_10331__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
if(cljs.core.contains_QMARK_(returned_10310,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [var_10332,prop_10333], null))){
} else {
throw kotobase.protocols.cypher.semantic_err((""+"ORDER BY "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var_10332)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop_10333)+" is not in the RETURN list --"+" ordering by an unreturned property is not supported yet"));
}


var G__10334 = cljs.core.next(seq__10095_10324__$1);
var G__10335 = null;
var G__10336 = (0);
var G__10337 = (0);
seq__10095_10311 = G__10334;
chunk__10096_10312 = G__10335;
count__10097_10313 = G__10336;
i__10098_10314 = G__10337;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"pattern","pattern",242135423),pattern,new cljs.core.Keyword(null,"where","where",-2044795965),wpreds,new cljs.core.Keyword(null,"return","return",-1891502105),ritems,new cljs.core.Keyword(null,"distinct?","distinct?",970077810),distinct_QMARK_,new cljs.core.Keyword(null,"order-by","order-by",1527318070),order_items,new cljs.core.Keyword(null,"skip","skip",602715391),skip,new cljs.core.Keyword(null,"limit","limit",-1355822363),limit], null);
});
/**
 * The bare name a collection key is addressable by from Cypher: the last
 *   element of a vector key, `name` of a keyword, a string as itself.
 */
kotobase.protocols.cypher.leaf_name = (function kotobase$protocols$cypher$leaf_name(k){
if(cljs.core.vector_QMARK_(k)){
var G__10103 = cljs.core.last(k);
if((G__10103 == null)){
return null;
} else {
return (kotobase.protocols.cypher.leaf_name.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.leaf_name.cljs$core$IFn$_invoke$arity$1(G__10103) : kotobase.protocols.cypher.leaf_name.call(null,G__10103));
}
} else {
if((k instanceof cljs.core.Keyword)){
return cljs.core.name(k);
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k));

}
}
});
/**
 * A Cypher label -> the `kotobase.store` collection key it names, given
 *   `available` (the keys that exist). See the ns docstring's label section.
 * 
 *   Returns the label unchanged when `available` is empty (no ctx said what
 *   exists), when the label is itself a key, or when nothing matches. Throws on
 *   an ambiguous leaf rather than choosing.
 */
kotobase.protocols.cypher.resolve_label = (function kotobase$protocols$cypher$resolve_label(available,label){
var available__$1 = cljs.core.seq(available);
if(cljs.core.not(available__$1)){
return label;
} else {
if(cljs.core.truth_(cljs.core.some((function (p1__10104_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__10104_SHARP_,label);
}),available__$1))){
return label;
} else {
var matches = cljs.core.filterv((function (p1__10105_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.leaf_name(p1__10105_SHARP_),label);
}),available__$1);
var G__10106 = cljs.core.count(matches);
switch (G__10106) {
case (0):
return label;

break;
case (1):
return cljs.core.first(matches);

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"label "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([label], 0)))+" is ambiguous: it names "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(matches))+" collections ("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([matches], 0)))+"). Cypher has no syntax to disambiguate them, so "+"this query cannot be run as written."),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("cypher","code","cypher/code",-1370471509),"Neo.ClientError.Statement.SemanticError",new cljs.core.Keyword(null,"label","label",1718410804),label,new cljs.core.Keyword(null,"candidates","candidates",1964038664),matches], null));

}
}
}
});
/**
 * Rewrite a translation so every label names a collection that exists.
 * 
 *   Both places a label appears have to move together -- `:coll-keys` decides
 *   what gets materialized and the `:kotobase/coll` clauses decide what matches
 *   once it has -- so they are substituted from one map rather than resolved
 *   twice. They do not take the same VALUE, though: `bridge/materialize` asserts
 *   `{:p :kotobase/coll :o (str coll)}`, so the clause wants the stringified key
 *   and `:coll-keys` wants the real one. That difference is invisible while every
 *   key is a string, which is exactly why it is worth a sentence.
 */
kotobase.protocols.cypher.resolve_collections = (function kotobase$protocols$cypher$resolve_collections(available,p__10109){
var map__10110 = p__10109;
var map__10110__$1 = cljs.core.__destructure_map(map__10110);
var translated = map__10110__$1;
var coll_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10110__$1,new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10110__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
if(cljs.core.not(cljs.core.seq(available))){
return translated;
} else {
var sub = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,(function (p1__10107_SHARP_){
return kotobase.protocols.cypher.resolve_label(available,p1__10107_SHARP_);
}))),coll_keys);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(translated,new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__10108_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(sub,p1__10108_SHARP_,p1__10108_SHARP_);
})),cljs.core.distinct.cljs$core$IFn$_invoke$arity$0()),coll_keys)),new cljs.core.Keyword(null,"query","query",-1288509510),cljs.core.update.cljs$core$IFn$_invoke$arity$3(query,new cljs.core.Keyword(null,"where","where",-2044795965),(function (clauses){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (c){
if(((cljs.core.vector_QMARK_(c)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(c))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("kotobase","coll","kotobase/coll",-1195202821),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(c,(1)))))))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c,(2),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$3(sub,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(c,(2)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(c,(2))))));
} else {
return c;
}
}),clauses);
})));
}
});
kotobase.protocols.cypher.var_sym = (function kotobase$protocols$cypher$var_sym(v){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)));
});
/**
 * Relationship-type -> foreign-key attribute convention for the
 *   (bonus, non-required) relationship-pattern join -- see ns docstring.
 */
kotobase.protocols.cypher.fk_attr = (function kotobase$protocols$cypher$fk_attr(rel_type){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.lower_case(rel_type));
});
kotobase.protocols.cypher.resolve_value = (function kotobase$protocols$cypher$resolve_value(v,parameters){
if(((cljs.core.map_QMARK_(v)) && (cljs.core.contains_QMARK_(v,new cljs.core.Keyword("cypher","param","cypher/param",74759970))))){
var pname = new cljs.core.Keyword("cypher","param","cypher/param",74759970).cljs$core$IFn$_invoke$arity$1(v);
if(cljs.core.contains_QMARK_(parameters,pname)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(parameters,pname);
} else {
throw kotobase.protocols.cypher.param_err((""+"missing parameter: $"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(pname)));
}
} else {
return v;
}
});
/**
 * The datalog clauses one comparison leaf becomes.
 * 
 *   Equality is a single triple with the literal in it, which the index probes.
 *   `IS NULL` is `(not [?e :prop _])` -- absence, since neither Cypher nor this
 *   store distinguishes a missing property from a null one. Everything else binds
 *   the property to a fresh lvar and constrains it, which is TWO clauses.
 */
kotobase.protocols.cypher.cmp_clauses = (function kotobase$protocols$cypher$cmp_clauses(p__10111,parameters){
var map__10112 = p__10111;
var map__10112__$1 = cljs.core.__destructure_map(map__10112);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10112__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10112__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10112__$1,new cljs.core.Keyword(null,"value","value",305978217));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10112__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var null_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10112__$1,new cljs.core.Keyword(null,"null?","null?",1275152357));
var v = kotobase.protocols.cypher.var_sym(var$);
var a = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(prop);
if(null_QMARK_ === true){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,a,new cljs.core.Symbol(null,"_","_",-1201019570,null)], null),null,(1),null)),(2),null))], null);
} else {
if(null_QMARK_ === false){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,a,new cljs.core.Symbol(null,"_","_",-1201019570,null)], null)], null);
} else {
if(cljs.core.truth_(op)){
var cmp = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("?__cmp");
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,a,cmp], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.List(null,op,(new cljs.core.List(null,cmp,(new cljs.core.List(null,kotobase.protocols.cypher.resolve_value(value,parameters),null,(1),null)),(2),null)),(3),null))], null)], null);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,a,kotobase.protocols.cypher.resolve_value(value,parameters)], null)], null);

}
}
}
});
/**
 *  Operator negation, for pushing NOT down to the leaves.
 * 
 *   Cypher's logic is three-valued: `NOT n.age > 18` on a node with no `age` is
 *   `NOT NULL`, which is NULL, which does not match. Negating the OPERATOR keeps
 *   that -- the property still has to exist -- whereas wrapping the whole
 *   comparison in a datalog `not` would INCLUDE the rows missing it, which is a
 *   different query. Equality is negated the same way and for the same reason,
 *   rather than becoming `(not [e a v])`.
 */
kotobase.protocols.cypher.negated_op = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,">=",">=",1016916022,null),new cljs.core.Symbol(null,">",">",1085014381,null),new cljs.core.Symbol(null,"<=","<=",1244895369,null),new cljs.core.Symbol(null,"<=","<=",1244895369,null),new cljs.core.Symbol(null,">",">",1085014381,null),new cljs.core.Symbol(null,">=",">=",1016916022,null),new cljs.core.Symbol(null,"<","<",993667236,null),new cljs.core.Symbol(null,"not=","not=",1466536204,null),null,new cljs.core.Symbol(null,"includes?","includes?",-2049283381,null),null], null);
/**
 *  Push a NOT down to the leaves (De Morgan), so the clauses handed to datalog
 *   never need a negated conjunction -- which `arrangement.datalog`'s `not` does
 *   not take, and which would have the wrong three-valued semantics anyway.
 * 
 *   `IS NULL` flips to `IS NOT NULL`. A predicate with no operator negation
 *   available (CONTAINS, and `<>` which has no dedicated form here) becomes an
 *   explicit refusal rather than a guess.
 */
kotobase.protocols.cypher.negate = (function kotobase$protocols$cypher$negate(e){
var G__10113 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
var G__10113__$1 = (((G__10113 instanceof cljs.core.Keyword))?G__10113.fqn:null);
switch (G__10113__$1) {
case "and":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.negate,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e))], null);

break;
case "or":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"and","and",-971899817),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.negate,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e))], null);

break;
case "not":
return new cljs.core.Keyword(null,"arg","arg",-1747261837).cljs$core$IFn$_invoke$arity$1(e);

break;
case "cmp":
var map__10114 = e;
var map__10114__$1 = cljs.core.__destructure_map(map__10114);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10114__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var null_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10114__$1,new cljs.core.Keyword(null,"null?","null?",1275152357));
if((!((null_QMARK_ == null)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e,new cljs.core.Keyword(null,"null?","null?",1275152357),cljs.core.not(null_QMARK_));
} else {
if((op == null)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e,new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Symbol(null,"not=","not=",1466536204,null));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"not=","not=",1466536204,null),op)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(e,new cljs.core.Keyword(null,"op","op",-1882987955));
} else {
if(cljs.core.contains_QMARK_(kotobase.protocols.cypher.negated_op,op)){
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.negated_op,op);
if(cljs.core.truth_(temp__5823__auto__)){
var n = temp__5823__auto__;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e,new cljs.core.Keyword(null,"op","op",-1882987955),n);
} else {
throw kotobase.protocols.cypher.semantic_err((""+"NOT over "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(op)+" is not supported -- there is no negated form"+" of it in the whitelisted predicate set, and guessing one"+" would change which rows come back"));
}
} else {
throw kotobase.protocols.cypher.semantic_err((""+"NOT over "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(op)+" is not supported"));

}
}
}
}

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__10113__$1))));

}
});
/**
 * One `or`/`not` branch as a SINGLE datalog clause.
 * 
 *   A leaf that needs several clauses is wrapped in `(and ...)`, which
 *   `arrangement.datalog` takes as a conjunction branch -- so a comparison, or
 *   `IS NULL`, inside a disjunction is expressible now. This is what the earlier
 *   'OR is only supported over equalities' error existed to refuse; the
 *   limitation was the engine's, and it is gone.
 */
kotobase.protocols.cypher.branch_clause = (function kotobase$protocols$cypher$branch_clause(e,parameters){
var G__10117 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
var G__10117__$1 = (((G__10117 instanceof cljs.core.Keyword))?G__10117.fqn:null);
switch (G__10117__$1) {
case "cmp":
var cs = kotobase.protocols.cypher.cmp_clauses(e,parameters);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(cs))){
return cljs.core.first(cs);
} else {
return cljs.core.cons(new cljs.core.Symbol(null,"and","and",668631710,null),cs);
}

break;
case "not":
var G__10118 = kotobase.protocols.cypher.negate(new cljs.core.Keyword(null,"arg","arg",-1747261837).cljs$core$IFn$_invoke$arity$1(e));
var G__10119 = parameters;
return (kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2(G__10118,G__10119) : kotobase.protocols.cypher.branch_clause.call(null,G__10118,G__10119));

break;
case "and":
return cljs.core.cons(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p1__10115_SHARP_){
return (kotobase.protocols.cypher.branch_clause_STAR_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.branch_clause_STAR_.cljs$core$IFn$_invoke$arity$2(p1__10115_SHARP_,parameters) : kotobase.protocols.cypher.branch_clause_STAR_.call(null,p1__10115_SHARP_,parameters));
})),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e)));

break;
case "or":
return cljs.core.cons(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__10116_SHARP_){
return (kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2(p1__10116_SHARP_,parameters) : kotobase.protocols.cypher.branch_clause.call(null,p1__10116_SHARP_,parameters));
}),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e)));

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__10117__$1))));

}
});
/**
 * `branch-clause` flattened: an `(and ...)` contributes its members rather
 *   than nesting, so a nested AND inside an OR branch does not build a tower.
 */
kotobase.protocols.cypher.branch_clause_STAR_ = (function kotobase$protocols$cypher$branch_clause_STAR_(e,parameters){
var c = kotobase.protocols.cypher.branch_clause(e,parameters);
if(((cljs.core.seq_QMARK_(c)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.first(c))))){
return cljs.core.rest(c);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [c], null);
}
});
/**
 * WHERE expression tree -> a vector of `arrangement.datalog` clauses.
 * 
 *   Top level is a conjunction, which is the shape `:where` already is, so `AND`
 *   flattens. `OR` and `NOT` become `(or ...)` / `(not ...)`, and their branches
 *   may now be `(and ...)` conjunctions -- so a comparison inside a disjunction
 *   works. That needed `arrangement.datalog` to accept multi-clause branches; it
 *   does since kotoba-lang/arrangement#13, and this file's previous 'only
 *   equalities' refusal is deleted rather than merely relaxed.
 */
kotobase.protocols.cypher.translate_where = (function kotobase$protocols$cypher$translate_where(e,parameters){
var G__10122 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__10122)){
return cljs.core.PersistentVector.EMPTY;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cmp","cmp",575646375),G__10122)){
return kotobase.protocols.cypher.cmp_clauses(e,parameters);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"and","and",-971899817),G__10122)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p1__10120_SHARP_){
return (kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2(p1__10120_SHARP_,parameters) : kotobase.protocols.cypher.translate_where.call(null,p1__10120_SHARP_,parameters));
})),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"not","not",-595976884),G__10122)){
var G__10123 = kotobase.protocols.cypher.negate(new cljs.core.Keyword(null,"arg","arg",-1747261837).cljs$core$IFn$_invoke$arity$1(e));
var G__10124 = parameters;
return (kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2(G__10123,G__10124) : kotobase.protocols.cypher.translate_where.call(null,G__10123,G__10124));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"or","or",235744169),G__10122)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cons(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__10121_SHARP_){
return kotobase.protocols.cypher.branch_clause(p1__10121_SHARP_,parameters);
}),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e)))], null);
} else {
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__10122))));

}
}
}
}
}
});
/**
 * AST (from `parse`) + `parameters` (a string-keyed map -- the JSON-parsed
 *   `"parameters"` object from the request statement) -> a
 *   `kotobase.query.bridge`-shaped query descriptor:
 *   `{:coll-keys [...] :query {:find [...] :where [...]} :columns [...]}`,
 *   `:columns` in `:find`/row order (`"n.prop"` strings, Neo4j-style).
 */
kotobase.protocols.cypher.translate = (function kotobase$protocols$cypher$translate(p__10127,parameters){
var map__10128 = p__10127;
var map__10128__$1 = cljs.core.__destructure_map(map__10128);
var pattern = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10128__$1,new cljs.core.Keyword(null,"pattern","pattern",242135423));
var where = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10128__$1,new cljs.core.Keyword(null,"where","where",-2044795965));
var return$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10128__$1,new cljs.core.Keyword(null,"return","return",-1891502105));
var distinct_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10128__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810));
var order_by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10128__$1,new cljs.core.Keyword(null,"order-by","order-by",1527318070));
var skip = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10128__$1,new cljs.core.Keyword(null,"skip","skip",602715391));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10128__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var nodes = new cljs.core.Keyword(null,"nodes","nodes",-2099585805).cljs$core$IFn$_invoke$arity$1(pattern);
var rels = new cljs.core.Keyword(null,"rels","rels",1770187185).cljs$core$IFn$_invoke$arity$1(pattern);
var node_clauses = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__10129){
var map__10130 = p__10129;
var map__10130__$1 = cljs.core.__destructure_map(map__10130);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10130__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10130__$1,new cljs.core.Keyword(null,"label","label",1718410804));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.cypher.var_sym(var$),new cljs.core.Keyword("kotobase","coll","kotobase/coll",-1195202821),label], null);
}),nodes);
var rel_clauses = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$1((function (i,reltype){
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(nodes,i);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(nodes,(i + (1)));
var fk = kotobase.protocols.cypher.fk_attr(reltype);
var fk_var = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?__fk"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)+"_"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(a))+"_"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(b))));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.cypher.var_sym(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(a)),fk,fk_var], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.cypher.var_sym(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(b)),new cljs.core.Keyword("kotobase","key","kotobase/key",-1670563723),fk_var], null)], null);
})),cljs.core.cat),rels);
var where_clauses = kotobase.protocols.cypher.translate_where(where,parameters);
var bound = cljs.core.filterv((function (p1__10125_SHARP_){
return cljs.core.not(new cljs.core.Keyword(null,"star?","star?",-803901336).cljs$core$IFn$_invoke$arity$1(p1__10125_SHARP_));
}),return$);
var agg_QMARK_ = cljs.core.boolean$(cljs.core.some((function (p1__10126_SHARP_){
var or__5162__auto__ = new cljs.core.Keyword(null,"agg","agg",-2001869296).cljs$core$IFn$_invoke$arity$1(p1__10126_SHARP_);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"star?","star?",-803901336).cljs$core$IFn$_invoke$arity$1(p1__10126_SHARP_);
}
}),return$));
var entity_syms = ((agg_QMARK_)?cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.var_sym,new cljs.core.Keyword(null,"var","var",-769682797)),nodes):cljs.core.PersistentVector.EMPTY);
var prop_syms = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__10131){
var map__10132 = p__10131;
var map__10132__$1 = cljs.core.__destructure_map(map__10132);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10132__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10132__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"__"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)));
}),bound);
var return_syms = cljs.core.into.cljs$core$IFn$_invoke$arity$2(entity_syms,prop_syms);
var return_clauses = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (p__10133,rsym){
var map__10134 = p__10133;
var map__10134__$1 = cljs.core.__destructure_map(map__10134);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10134__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10134__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.cypher.var_sym(var$),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(prop),rsym], null);
}),bound,prop_syms);
var columns = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__10135){
var map__10136 = p__10135;
var map__10136__$1 = cljs.core.__destructure_map(map__10136);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10136__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10136__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var as = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10136__$1,new cljs.core.Keyword(null,"as","as",1148689641));
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10136__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10136__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
var or__5162__auto__ = as;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
if(cljs.core.truth_(star_QMARK_)){
return "count(*)";
} else {
if(cljs.core.truth_(agg)){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(agg)+"("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)+")");
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop));

}
}
}
}),return$);
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"label","label",1718410804),nodes)),new cljs.core.Keyword(null,"query","query",-1288509510),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"find","find",496279456),return_syms,new cljs.core.Keyword(null,"where","where",-2044795965),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,node_clauses),rel_clauses),where_clauses),return_clauses)], null),new cljs.core.Keyword(null,"columns","columns",1998437288),columns,new cljs.core.Keyword(null,"project","project",1124394579),(function (){var idx = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((cljs.core.count(entity_syms) - (1)));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__10137){
var map__10138 = p__10137;
var map__10138__$1 = cljs.core.__destructure_map(map__10138);
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10138__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10138__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
if(cljs.core.truth_(star_QMARK_)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"agg","agg",-2001869296),new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Keyword(null,"star?","star?",-803901336),true], null);
} else {
var i = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(idx,cljs.core.inc);
if(cljs.core.truth_(agg)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"agg","agg",-2001869296),agg,new cljs.core.Keyword(null,"index","index",-1531685915),i], null);
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"index","index",-1531685915),i], null);
}
}
}),return$);
})(),new cljs.core.Keyword(null,"distinct?","distinct?",970077810),cljs.core.boolean$(distinct_QMARK_),new cljs.core.Keyword(null,"order-by","order-by",1527318070),(function (){var col__GT_idx = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$1((function (i,p__10139){
var map__10140 = p__10139;
var map__10140__$1 = cljs.core.__destructure_map(map__10140);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10140__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10140__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var as = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10140__$1,new cljs.core.Keyword(null,"as","as",1148689641));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10140__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10140__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var G__10141 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__5162__auto__ = as;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
if(cljs.core.truth_(star_QMARK_)){
return "count(*)";
} else {
if(cljs.core.truth_(agg)){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(agg)+"("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)+")");
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop));

}
}
}
})(),i], null)], null);
if(cljs.core.truth_((function (){var and__5160__auto__ = as;
if(cljs.core.truth_(and__5160__auto__)){
var and__5160__auto____$1 = var$;
if(cljs.core.truth_(and__5160__auto____$1)){
var and__5160__auto____$2 = prop;
if(cljs.core.truth_(and__5160__auto____$2)){
return cljs.core.not(agg);
} else {
return and__5160__auto____$2;
}
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
})())){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__10141,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)),i], null));
} else {
return G__10141;
}
})),cljs.core.cat),return$);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__10142){
var map__10143 = p__10142;
var map__10143__$1 = cljs.core.__destructure_map(map__10143);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10143__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10143__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var desc_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10143__$1,new cljs.core.Keyword(null,"desc?","desc?",-713120712));
var k = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop));
if(cljs.core.contains_QMARK_(col__GT_idx,k)){
} else {
throw kotobase.protocols.cypher.semantic_err((""+"ORDER BY "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)+" is not in the RETURN list"));
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"index","index",-1531685915),cljs.core.get.cljs$core$IFn$_invoke$arity$2(col__GT_idx,k),new cljs.core.Keyword(null,"desc?","desc?",-713120712),cljs.core.boolean$(desc_QMARK_)], null);
}),order_by);
})(),new cljs.core.Keyword(null,"skip","skip",602715391),skip,new cljs.core.Keyword(null,"limit","limit",-1355822363),limit], null);
});
/**
 * Map bound-column rows onto the projected output columns, aggregating when
 *   any output column is an aggregate.
 * 
 *   Grouping follows Cypher: the non-aggregate outputs are the group key. With no
 *   aggregate this is a pure reordering.
 * 
 *   **`count` counts the rows this engine produces, and datalog has SET
 *   semantics** -- duplicate solutions never arrive here, so `count(*)` counts
 *   DISTINCT solutions. Real Cypher counts a bag. Stated rather than discovered,
 *   because the two agree on most queries and differ exactly where someone is
 *   counting duplicates on purpose.
 */
kotobase.protocols.cypher.apply_project = (function kotobase$protocols$cypher$apply_project(project,rows){
if(cljs.core.not(cljs.core.seq(project))){
return rows;
} else {
if(cljs.core.not(cljs.core.some(new cljs.core.Keyword(null,"agg","agg",-2001869296),project))){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (row){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__10144_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(row,new cljs.core.Keyword(null,"index","index",-1531685915).cljs$core$IFn$_invoke$arity$1(p1__10144_SHARP_),null);
}),project);
}),rows);
} else {
var key_fn = (function (row){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__10145_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(row,new cljs.core.Keyword(null,"index","index",-1531685915).cljs$core$IFn$_invoke$arity$1(p1__10145_SHARP_),null);
}),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"agg","agg",-2001869296),project));
});
var groups = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,row){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(m,key_fn(row),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),row);
}),cljs.core.PersistentArrayMap.EMPTY,rows);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__10147){
var vec__10148 = p__10147;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10148,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10148,(1),null);
var ks = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((-1));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__10151){
var map__10152 = p__10151;
var map__10152__$1 = cljs.core.__destructure_map(map__10152);
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10152__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10152__$1,new cljs.core.Keyword(null,"index","index",-1531685915));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10152__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
if(cljs.core.truth_(star_QMARK_)){
return cljs.core.count(group);
} else {
if(cljs.core.truth_(agg)){
return cljs.core.count(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__10146_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p1__10146_SHARP_,index,null);
}),group)));
} else {
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(k,cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ks,cljs.core.inc),null);

}
}
}),project);
}),groups);
}
}
});
/**
 *  Comparator over result rows for `order-by` entries `{:index :desc?}`.
 * 
 *   Written out rather than `sort-by` + `juxt` because that form can only sort
 *   every key the same direction, and `ORDER BY a, b DESC` needs two. Values are
 *   compared inside a type and across types by type name, with nil first, so a
 *   heterogeneous column orders rather than throwing -- a result set binds
 *   whatever the documents hold and does not promise homogeneity.
 */
kotobase.protocols.cypher.row_comparator = (function kotobase$protocols$cypher$row_comparator(order_by){
return (function (x,y){
var os = cljs.core.seq(order_by);
while(true){
if(cljs.core.not(os)){
return (0);
} else {
var map__10153 = cljs.core.first(os);
var map__10153__$1 = cljs.core.__destructure_map(map__10153);
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10153__$1,new cljs.core.Keyword(null,"index","index",-1531685915));
var desc_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10153__$1,new cljs.core.Keyword(null,"desc?","desc?",-713120712));
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(x,index,null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(y,index,null);
var c = (((((a == null)) && ((b == null))))?(0):(((a == null))?(-1):(((b == null))?(1):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.type(a),cljs.core.type(b)))?(function (){try{return cljs.core.compare(a,b);
}catch (e10154){var _ = e10154;
return cljs.core.compare((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(b)));
}})():cljs.core.compare((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(a))),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(b))))
))));
var c__$1 = (cljs.core.truth_(desc_QMARK_)?(- c):c);
if((c__$1 === (0))){
var G__10341 = cljs.core.next(os);
os = G__10341;
continue;
} else {
return c__$1;
}
}
break;
}
});
});
/**
 * parse + translate in one call, for tests that assert on translate-time
 *   rejections. Not part of the HTTP path, which catches these into the
 *   response error shape.
 */
kotobase.protocols.cypher.parse_and_translate_probe = (function kotobase$protocols$cypher$parse_and_translate_probe(q){
return kotobase.protocols.cypher.translate(kotobase.protocols.cypher.parse(q),cljs.core.PersistentArrayMap.EMPTY);
});
/**
 *  Run a `translate`d query descriptor against `store` via
 *   `kotobase.query.bridge/query` (materialize + q), filtered by the REQUIRED
 *   `visible?` predicate. Returns a vector of result rows in `:columns` order.
 * 
 *   DISTINCT, ORDER BY, SKIP and LIMIT are applied here, in Cypher's own clause
 *   order (distinct, then order, then skip, then limit) -- getting that order
 *   wrong changes answers, e.g. LIMIT before DISTINCT returns fewer rows than
 *   asked for.
 * 
 *   With no ORDER BY the rows are still sorted by stringified value, which is
 *   what this function has always done: the bridge does not promise an order and
 *   an unstable result set is worse than an arbitrary but repeatable one.
 */
kotobase.protocols.cypher.execute = (function kotobase$protocols$cypher$execute(var_args){
var G__10156 = arguments.length;
switch (G__10156) {
case 3:
return kotobase.protocols.cypher.execute.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return kotobase.protocols.cypher.execute.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.protocols.cypher.execute.cljs$core$IFn$_invoke$arity$3 = (function (store,translated,visible_QMARK_){
return kotobase.protocols.cypher.execute.cljs$core$IFn$_invoke$arity$4(cljs.core.PersistentArrayMap.EMPTY,store,translated,visible_QMARK_);
}));

(kotobase.protocols.cypher.execute.cljs$core$IFn$_invoke$arity$4 = (function (ctx,store,translated,visible_QMARK_){
var map__10157 = kotobase.protocols.cypher.resolve_collections(new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070).cljs$core$IFn$_invoke$arity$1(ctx),translated);
var map__10157__$1 = cljs.core.__destructure_map(map__10157);
var coll_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10157__$1,new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10157__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var distinct_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10157__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810));
var order_by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10157__$1,new cljs.core.Keyword(null,"order-by","order-by",1527318070));
var skip = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10157__$1,new cljs.core.Keyword(null,"skip","skip",602715391));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10157__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var project = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10157__$1,new cljs.core.Keyword(null,"project","project",1124394579));
var rows = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$3(kotobase.query.bridge.db_for(ctx,store,coll_keys),query,visible_QMARK_));
var rows__$1 = kotobase.protocols.cypher.apply_project(project,rows);
var rows__$2 = (cljs.core.truth_(distinct_QMARK_)?cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(rows__$1):rows__$1);
var rows__$3 = ((cljs.core.seq(order_by))?cljs.core.sort.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.row_comparator(order_by),rows__$2):cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2((function (row){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.str,row);
}),rows__$2));
var rows__$4 = (function (){var G__10158 = rows__$3;
var G__10158__$1 = (cljs.core.truth_((function (){var and__5160__auto__ = skip;
if(cljs.core.truth_(and__5160__auto__)){
return (skip > (0));
} else {
return and__5160__auto__;
}
})())?cljs.core.drop.cljs$core$IFn$_invoke$arity$2(skip,G__10158):G__10158);
if(cljs.core.truth_(limit)){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(limit,G__10158__$1);
} else {
return G__10158__$1;
}
})();
return cljs.core.vec(rows__$4);
}));

(kotobase.protocols.cypher.execute.cljs$lang$maxFixedArity = 4);

kotobase.protocols.cypher.json_response = (function kotobase$protocols$cypher$json_response(status,m){
return kotobase.protocols.cypher.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),kotobase.protocols.cypher.json.encode(m));
});
kotobase.protocols.cypher.audit_BANG_ = (function kotobase$protocols$cypher$audit_BANG_(store,op,statement,now,extra){
return kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"cypher","cypher",-2096552012),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"statement","statement",-32780863),statement,new cljs.core.Keyword(null,"now","now",-1650525531),now], null),extra], 0)));
});
/**
 * Parse + translate + execute one `{"statement" "..." "parameters"
 *   {...}}` map. Returns `{:ok true :result {...}}` or `{:ok false :error
 *   {...}}` -- never throws (all failures inside the Cypher pipeline are
 *   caught here and turned into the response's `errors` shape).
 */
kotobase.protocols.cypher.run_statement = (function kotobase$protocols$cypher$run_statement(ctx,store,visible_QMARK_,now,stmt){
var statement = cljs.core.get.cljs$core$IFn$_invoke$arity$2(stmt,"statement");
var parameters = (function (){var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(stmt,"parameters");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
try{if((!(typeof statement === 'string'))){
throw kotobase.protocols.cypher.param_err("each statement must have a string \"statement\" field");
} else {
var ast = kotobase.protocols.cypher.parse(statement);
var translated = kotobase.protocols.cypher.translate(ast,parameters);
var rows = kotobase.protocols.cypher.execute.cljs$core$IFn$_invoke$arity$4(ctx,store,translated,visible_QMARK_);
kotobase.protocols.cypher.audit_BANG_(store,new cljs.core.Keyword(null,"query","query",-1288509510),statement,now,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"row-count","row-count",1060167988),cljs.core.count(rows)], null));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ok","ok",967785236),true,new cljs.core.Keyword(null,"result","result",1415092211),new cljs.core.PersistentArrayMap(null, 2, ["columns",new cljs.core.Keyword(null,"columns","columns",1998437288).cljs$core$IFn$_invoke$arity$1(translated),"data",cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (row){
return new cljs.core.PersistentArrayMap(null, 2, ["row",cljs.core.vec(row),"meta",cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(row),null))], null);
}),rows)], null)], null);
}
}catch (e10159){var e = e10159;
var data = cljs.core.ex_data(e);
var code = (function (){var or__5162__auto__ = new cljs.core.Keyword("cypher","code","cypher/code",-1370471509).cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "Neo.ClientError.Statement.SyntaxError";
}
})();
var msg = (function (){var or__5162__auto__ = new cljs.core.Keyword("cypher","message","cypher/message",-1743687207).cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var or__5162__auto____$1 = e.message;
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e));
}
}
})();
kotobase.protocols.cypher.audit_BANG_(store,new cljs.core.Keyword(null,"query-error","query-error",-898801975),statement,now,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"code","code",1586293142),code,new cljs.core.Keyword(null,"error","error",-978969032),msg], null));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ok","ok",967785236),false,new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.PersistentArrayMap(null, 2, ["code",code,"message",msg], null)], null);
}});
/**
 * `POST /db/data/transaction/commit` handler -- Neo4j HTTP Cypher
 *   transaction-endpoint-shaped (see ns docstring for the exact request/
 *   response JSON and the v0.1 Cypher subset). `ctx` is
 *   `{:store IStore :visible? (fn [datom] boolean?) :now optional-ISO-string}`.
 * 
 *   `:visible?` is REQUIRED -- throws immediately (a ctx bug, not a wire
 *   error) if missing; no permissive default (ADR-2607050500).
 */
kotobase.protocols.cypher.handle = (function kotobase$protocols$cypher$handle(p__10160,req){
var map__10161 = p__10160;
var map__10161__$1 = cljs.core.__destructure_map(map__10161);
var ctx = map__10161__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10161__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10161__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
var now = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10161__$1,new cljs.core.Keyword(null,"now","now",-1650525531));
if(cljs.core.fn_QMARK_(visible_QMARK_)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"kotobase.protocols.cypher/handle requires ctx :visible? -- a REQUIRED"+" predicate fn over materialized datoms, no permissive default"+" (ADR-2607050500). Pass (constantly true) to see everything."),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cypher","ctx-error","cypher/ctx-error",871459059),true], null));
}

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["db","data","transaction","commit"], null),kotobase.protocols.cypher.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req)))){
return kotobase.protocols.cypher.http.not_found.cljs$core$IFn$_invoke$arity$0();
} else {
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))){
return kotobase.protocols.cypher.http.method_not_allowed();
} else {
var parsed = (function (){try{return kotobase.protocols.cypher.json.parse((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "{}";
}
})());
}catch (e10162){var _ = e10162;
return new cljs.core.Keyword("kotobase.protocols.cypher","malformed","kotobase.protocols.cypher/malformed",1269827021);
}})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(parsed,new cljs.core.Keyword("kotobase.protocols.cypher","malformed","kotobase.protocols.cypher/malformed",1269827021))){
return kotobase.protocols.cypher.json_response((400),new cljs.core.PersistentArrayMap(null, 2, ["results",cljs.core.PersistentVector.EMPTY,"errors",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, ["code","Neo.ClientError.Request.InvalidFormat","message","malformed JSON body"], null)], null)], null));
} else {
if((!(cljs.core.sequential_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed,"statements"))))){
return kotobase.protocols.cypher.json_response((400),new cljs.core.PersistentArrayMap(null, 2, ["results",cljs.core.PersistentVector.EMPTY,"errors",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, ["code","Neo.ClientError.Request.InvalidFormat","message","body must be {\"statements\": [...]}"], null)], null)], null));
} else {
var stmts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(parsed,"statements");
var results = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(stmts)){
return kotobase.protocols.cypher.json_response((200),new cljs.core.PersistentArrayMap(null, 2, ["results",results,"errors",cljs.core.PersistentVector.EMPTY], null));
} else {
var map__10164 = kotobase.protocols.cypher.run_statement(ctx,store,visible_QMARK_,now,cljs.core.first(stmts));
var map__10164__$1 = cljs.core.__destructure_map(map__10164);
var ok = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10164__$1,new cljs.core.Keyword(null,"ok","ok",967785236));
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10164__$1,new cljs.core.Keyword(null,"result","result",1415092211));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10164__$1,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(ok)){
var G__10343 = cljs.core.rest(stmts);
var G__10344 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(results,result);
stmts = G__10343;
results = G__10344;
continue;
} else {
return kotobase.protocols.cypher.json_response((200),new cljs.core.PersistentArrayMap(null, 2, ["results",results,"errors",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [error], null)], null));
}
}
break;
}

}
}

}
}
});

//# sourceMappingURL=kotobase.protocols.cypher.js.map
