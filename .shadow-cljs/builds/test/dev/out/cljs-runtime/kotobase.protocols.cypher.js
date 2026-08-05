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
var G__12724 = (j + (2));
var G__12725 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"`");
j = G__12724;
acc = G__12725;
continue;
} else {
if(cljs.core.empty_QMARK_(acc)){
throw kotobase.protocols.cypher.syntax_err((""+"empty backtick-quoted identifier at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)));
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(j + (1))], null);
}
}
} else {
var G__12726 = (j + (1));
var G__12727 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,j,(j + (1)))));
j = G__12726;
acc = G__12727;
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
var G__12728 = (i__$1 + (2));
var G__12729 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__12728;
acc = G__12729;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,"n")){
var G__12730 = (i__$1 + (2));
var G__12731 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__12730;
acc = G__12731;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,"t")){
var G__12732 = (i__$1 + (2));
var G__12733 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__12732;
acc = G__12733;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,quote)){
var G__12734 = (i__$1 + (2));
var G__12735 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(quote));
i__$1 = G__12734;
acc = G__12735;
continue;
} else {
var G__12736 = (i__$1 + (2));
var G__12737 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e));
i__$1 = G__12736;
acc = G__12737;
continue;

}
}
}
}
} else {
var G__12738 = (i__$1 + (1));
var G__12739 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__12738;
acc = G__12739;
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
var G__12740 = (i + (1));
var G__12741 = toks;
i = G__12740;
toks = G__12741;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"(")){
var G__12742 = (i + (1));
var G__12743 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lparen","lparen",-1339862485)], null));
i = G__12742;
toks = G__12743;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,")")){
var G__12744 = (i + (1));
var G__12745 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"rparen","rparen",302222095)], null));
i = G__12744;
toks = G__12745;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"[")){
var G__12746 = (i + (1));
var G__12747 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lbracket","lbracket",-321099444)], null));
i = G__12746;
toks = G__12747;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"]")){
var G__12748 = (i + (1));
var G__12749 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"rbracket","rbracket",1012978606)], null));
i = G__12748;
toks = G__12749;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,":")){
var G__12750 = (i + (1));
var G__12751 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"colon","colon",-965200945)], null));
i = G__12750;
toks = G__12751;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,".")){
var G__12752 = (i + (1));
var G__12753 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dot","dot",1442709401)], null));
i = G__12752;
toks = G__12753;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,",")){
var G__12754 = (i + (1));
var G__12755 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"comma","comma",1699024745)], null));
i = G__12754;
toks = G__12755;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"<")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),"=")))){
var G__12756 = (i + (2));
var G__12757 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lte","lte",1005402135)], null));
i = G__12756;
toks = G__12757;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"<")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),">")))){
var G__12758 = (i + (2));
var G__12759 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"neq","neq",1883246164)], null));
i = G__12758;
toks = G__12759;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,">")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),"=")))){
var G__12760 = (i + (2));
var G__12761 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"gte","gte",1000474126)], null));
i = G__12760;
toks = G__12761;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"<")){
var G__12762 = (i + (1));
var G__12763 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lt","lt",421989243)], null));
i = G__12762;
toks = G__12763;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,">")){
var G__12764 = (i + (1));
var G__12765 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"gt","gt",-1797443692)], null));
i = G__12764;
toks = G__12765;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"=")){
var G__12766 = (i + (1));
var G__12767 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"eq","eq",-618539067)], null));
i = G__12766;
toks = G__12767;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"*")){
var G__12768 = (i + (1));
var G__12769 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"star","star",279424429)], null));
i = G__12768;
toks = G__12769;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"-")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i + (1)),cljs.core.min.cljs$core$IFn$_invoke$arity$2(n,(i + (2)))),">")){
var G__12770 = (i + (2));
var G__12771 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"arrow","arrow",1071351425)], null));
i = G__12770;
toks = G__12771;
continue;
} else {
var G__12772 = (i + (1));
var G__12773 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dash","dash",23821356)], null));
i = G__12772;
toks = G__12773;
continue;
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"$")){
var m = cljs.core.re_find(/^[A-Za-z_][A-Za-z0-9_]*/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,(i + (1))));
if(cljs.core.truth_(m)){
var G__12774 = ((i + (1)) + cljs.core.count(m));
var G__12775 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"param","param",2013631823),new cljs.core.Keyword(null,"val","val",128701612),m], null));
i = G__12774;
toks = G__12775;
continue;
} else {
throw kotobase.protocols.cypher.syntax_err((""+"expected an identifier after '$' at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"`")){
var vec__12497 = kotobase.protocols.cypher.tokenize_backticked(s,i);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12497,(0),null);
var i_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12497,(1),null);
var G__12776 = i_SINGLEQUOTE_;
var G__12777 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ident","ident",-742346),new cljs.core.Keyword(null,"val","val",128701612),v], null));
i = G__12776;
toks = G__12777;
continue;
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"'")) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")))){
var vec__12500 = kotobase.protocols.cypher.tokenize_string(s,i,c);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12500,(0),null);
var i_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12500,(1),null);
var G__12778 = i_SINGLEQUOTE_;
var G__12779 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"val","val",128701612),v], null));
i = G__12778;
toks = G__12779;
continue;
} else {
if(cljs.core.truth_(cljs.core.re_matches(/[0-9]/,c))){
var m = cljs.core.re_find(/^[0-9]+(?:\.[0-9]+)?/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
var numv = ((clojure.string.includes_QMARK_(m,"."))?parseFloat(m):parseInt(m,(10)));
var G__12780 = (i + cljs.core.count(m));
var G__12781 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438),new cljs.core.Keyword(null,"val","val",128701612),numv], null));
i = G__12780;
toks = G__12781;
continue;
} else {
if(cljs.core.truth_(cljs.core.re_matches(/[A-Za-z_]/,c))){
var m = cljs.core.re_find(/^[A-Za-z_][A-Za-z0-9_]*/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
var G__12782 = (i + cljs.core.count(m));
var G__12783 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(toks,(function (){var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.keyword_tokens,clojure.string.upper_case(m));
if(cljs.core.truth_(temp__5823__auto__)){
var kwtype = temp__5823__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),kwtype], null);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ident","ident",-742346),new cljs.core.Keyword(null,"val","val",128701612),m], null);
}
})());
i = G__12782;
toks = G__12783;
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
var G__12503 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__12503)){
return "end of input";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"number","number",1570378438),G__12503)){
return (""+"number "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t)));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"string","string",-1989541586),G__12503)){
return "string literal";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"gte","gte",1000474126),G__12503)){
return "'>='";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"param","param",2013631823),G__12503)){
return (""+"parameter '$"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t))+"'");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"neq","neq",1883246164),G__12503)){
return "'<>'";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"gt","gt",-1797443692),G__12503)){
return "'>'";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ident","ident",-742346),G__12503)){
return (""+"identifier '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"val","val",128701612).cljs$core$IFn$_invoke$arity$1(t))+"'");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"lte","lte",1005402135),G__12503)){
return "'<='";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"lt","lt",421989243),G__12503)){
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
var vec__12504 = kotobase.protocols.cypher.take_ident(toks__$1);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12504,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12504,(1),null);
var vec__12507 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"colon","colon",-965200945),kotobase.protocols.cypher.peek_type(toks__$2)))?(function (){var toks__$3 = cljs.core.rest(toks__$2);
return kotobase.protocols.cypher.take_ident(toks__$3);
})():(function (){throw kotobase.protocols.cypher.syntax_err((""+"node pattern '("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+")' has no label -- v0.1 requires"+" every node pattern to be labeled, e.g. ("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+":users)"))})());
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12507,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12507,(1),null);
var toks__$4 = kotobase.protocols.cypher.expect(toks__$3,new cljs.core.Keyword(null,"rparen","rparen",302222095));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"label","label",1718410804),label], null),toks__$4], null);
});
kotobase.protocols.cypher.parse_rel = (function kotobase$protocols$cypher$parse_rel(toks){
var toks__$1 = kotobase.protocols.cypher.expect(toks,new cljs.core.Keyword(null,"dash","dash",23821356));
var toks__$2 = kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"lbracket","lbracket",-321099444));
var toks__$3 = kotobase.protocols.cypher.expect(toks__$2,new cljs.core.Keyword(null,"colon","colon",-965200945));
var vec__12510 = kotobase.protocols.cypher.take_ident(toks__$3);
var reltype = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12510,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12510,(1),null);
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
var G__12516 = kotobase.protocols.cypher.parse_node(toks);
var vec__12517 = G__12516;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12517,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12517,(1),null);
var nodes = cljs.core.PersistentVector.EMPTY;
var rels = cljs.core.PersistentVector.EMPTY;
var G__12516__$1 = G__12516;
var nodes__$1 = nodes;
var rels__$1 = rels;
while(true){
var vec__12526 = G__12516__$1;
var n__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12526,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12526,(1),null);
var nodes__$2 = nodes__$1;
var rels__$2 = rels__$1;
var nodes__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nodes__$2,n__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"dash","dash",23821356),kotobase.protocols.cypher.peek_type(toks__$2))){
var vec__12529 = kotobase.protocols.cypher.parse_rel(toks__$2);
var reltype = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12529,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12529,(1),null);
var G__12784 = kotobase.protocols.cypher.parse_node(toks__$3);
var G__12785 = nodes__$3;
var G__12786 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(rels__$2,reltype);
G__12516__$1 = G__12784;
nodes__$1 = G__12785;
rels__$1 = G__12786;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"nodes","nodes",-2099585805),nodes__$3,new cljs.core.Keyword(null,"rels","rels",1770187185),rels__$2], null),toks__$2], null);
}
break;
}
});
kotobase.protocols.cypher.parse_value = (function kotobase$protocols$cypher$parse_value(toks){
var t = cljs.core.first(toks);
var G__12532 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(t);
var G__12532__$1 = (((G__12532 instanceof cljs.core.Keyword))?G__12532.fqn:null);
switch (G__12532__$1) {
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
var vec__12533 = kotobase.protocols.cypher.take_ident(toks);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12533,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12533,(1),null);
var toks__$2 = kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"dot","dot",1442709401));
var vec__12536 = kotobase.protocols.cypher.take_ident(toks__$2);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12536,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12536,(1),null);
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
var vec__12539 = kotobase.protocols.cypher.parse_value(cljs.core.rest(toks__$3));
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12539,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12539,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop,new cljs.core.Keyword(null,"op","op",-1882987955),f,new cljs.core.Keyword(null,"value","value",305978217),val], null),toks__$4], null);
} else {
if(cljs.core.truth_((function (){var or__5162__auto__ = op;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"eq","eq",-618539067),op_type);
}
})())){
var vec__12542 = kotobase.protocols.cypher.parse_value(cljs.core.rest(toks__$3));
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12542,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12542,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__12545 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop,new cljs.core.Keyword(null,"value","value",305978217),val], null);
if(cljs.core.truth_(op)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12545,new cljs.core.Keyword(null,"op","op",-1882987955),op);
} else {
return G__12545;
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
var vec__12546 = (function (){var G__12549 = cljs.core.rest(toks);
return (kotobase.protocols.cypher.parse_not_expr.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.parse_not_expr.cljs$core$IFn$_invoke$arity$1(G__12549) : kotobase.protocols.cypher.parse_not_expr.call(null,G__12549));
})();
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12546,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12546,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"not","not",-595976884),new cljs.core.Keyword(null,"arg","arg",-1747261837),e], null),toks__$1], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"lparen","lparen",-1339862485),kotobase.protocols.cypher.peek_type(toks))){
var vec__12550 = (function (){var G__12553 = cljs.core.rest(toks);
return (kotobase.protocols.cypher.parse_or_expr.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.parse_or_expr.cljs$core$IFn$_invoke$arity$1(G__12553) : kotobase.protocols.cypher.parse_or_expr.call(null,G__12553));
})();
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12550,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12550,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"rparen","rparen",302222095))], null);
} else {
var vec__12554 = kotobase.protocols.cypher.parse_predicate(toks);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12554,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12554,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p,new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"cmp","cmp",575646375)),toks__$1], null);

}
}
});
kotobase.protocols.cypher.parse_and_expr = (function kotobase$protocols$cypher$parse_and_expr(toks){
var G__12560 = kotobase.protocols.cypher.parse_not_expr(toks);
var vec__12561 = G__12560;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12561,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12561,(1),null);
var args = cljs.core.PersistentVector.EMPTY;
var G__12560__$1 = G__12560;
var args__$1 = args;
while(true){
var vec__12567 = G__12560__$1;
var e__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12567,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12567,(1),null);
var args__$2 = args__$1;
var args__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(args__$2,e__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"and","and",-971899817),kotobase.protocols.cypher.peek_type(toks__$2))){
var G__12788 = kotobase.protocols.cypher.parse_not_expr(cljs.core.rest(toks__$2));
var G__12789 = args__$3;
G__12560__$1 = G__12788;
args__$1 = G__12789;
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
var G__12573 = kotobase.protocols.cypher.parse_and_expr(toks);
var vec__12574 = G__12573;
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12574,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12574,(1),null);
var args = cljs.core.PersistentVector.EMPTY;
var G__12573__$1 = G__12573;
var args__$1 = args;
while(true){
var vec__12580 = G__12573__$1;
var e__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12580,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12580,(1),null);
var args__$2 = args__$1;
var args__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(args__$2,e__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"or","or",235744169),kotobase.protocols.cypher.peek_type(toks__$2))){
var G__12790 = kotobase.protocols.cypher.parse_and_expr(cljs.core.rest(toks__$2));
var G__12791 = args__$3;
G__12573__$1 = G__12790;
args__$1 = G__12791;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(args__$3)))?cljs.core.first(args__$3):new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"args","args",1315556576),args__$3], null)),toks__$2], null);
}
break;
}
});
kotobase.protocols.cypher.parse_where = (function kotobase$protocols$cypher$parse_where(toks){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"where","where",-2044795965),kotobase.protocols.cypher.peek_type(toks))){
var vec__12583 = kotobase.protocols.cypher.parse_or_expr(cljs.core.rest(toks));
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12583,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12583,(1),null);
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
var vec__12586 = ((agg_QMARK_)?(function (){var toks__$1 = cljs.core.rest(cljs.core.rest(toks));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"star","star",279424429),kotobase.protocols.cypher.peek_type(toks__$1))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"agg","agg",-2001869296),new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Keyword(null,"star?","star?",-803901336),true], null),kotobase.protocols.cypher.expect(cljs.core.rest(toks__$1),new cljs.core.Keyword(null,"rparen","rparen",302222095))], null);
} else {
var vec__12592 = kotobase.protocols.cypher.take_ident(toks__$1);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12592,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12592,(1),null);
var toks__$3 = kotobase.protocols.cypher.expect(toks__$2,new cljs.core.Keyword(null,"dot","dot",1442709401));
var vec__12595 = kotobase.protocols.cypher.take_ident(toks__$3);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12595,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12595,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"agg","agg",-2001869296),new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop], null),kotobase.protocols.cypher.expect(toks__$4,new cljs.core.Keyword(null,"rparen","rparen",302222095))], null);
}
})():(function (){var vec__12598 = kotobase.protocols.cypher.take_ident(toks);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12598,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12598,(1),null);
var toks__$2 = kotobase.protocols.cypher.expect(toks__$1,new cljs.core.Keyword(null,"dot","dot",1442709401));
var vec__12601 = kotobase.protocols.cypher.take_ident(toks__$2);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12601,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12601,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"var","var",-769682797),v,new cljs.core.Keyword(null,"prop","prop",-515168332),prop], null),toks__$3], null);
})());
var item = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12586,(0),null);
var toks__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12586,(1),null);
var alias_QMARK_ = (kotobase.protocols.cypher.kw_ident_QMARK_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.kw_ident_QMARK_.cljs$core$IFn$_invoke$arity$2(toks__$1,"AS") : kotobase.protocols.cypher.kw_ident_QMARK_.call(null,toks__$1,"AS"));
var vec__12589 = (cljs.core.truth_(alias_QMARK_)?kotobase.protocols.cypher.take_ident(cljs.core.rest(toks__$1)):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,toks__$1], null));
var alias = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12589,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12589,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__12604 = item;
if(cljs.core.truth_(alias)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12604,new cljs.core.Keyword(null,"as","as",1148689641),alias);
} else {
return G__12604;
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
var vec__12608 = kotobase.protocols.cypher.parse_return_item(toks__$3);
var item = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12608,(0),null);
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12608,(1),null);
var items__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,item);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"comma","comma",1699024745),kotobase.protocols.cypher.peek_type(toks__$4))){
var G__12792 = cljs.core.rest(toks__$4);
var G__12793 = items__$1;
toks__$3 = G__12792;
items = G__12793;
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
var vec__12615 = kotobase.protocols.cypher.parse_return_item(toks__$2);
var map__12618 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12615,(0),null);
var map__12618__$1 = cljs.core.__destructure_map(map__12618);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12618__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12618__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12615,(1),null);
var desc_QMARK_ = kotobase.protocols.cypher.kw_ident_QMARK_(toks__$3,"DESC");
var toks__$4 = ((((desc_QMARK_) || (kotobase.protocols.cypher.kw_ident_QMARK_(toks__$3,"ASC"))))?cljs.core.rest(toks__$3):toks__$3);
var items__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),var$,new cljs.core.Keyword(null,"prop","prop",-515168332),prop,new cljs.core.Keyword(null,"desc?","desc?",-713120712),desc_QMARK_], null));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"comma","comma",1699024745),kotobase.protocols.cypher.peek_type(toks__$4))){
var G__12794 = cljs.core.rest(toks__$4);
var G__12795 = items__$1;
toks__$2 = G__12794;
items = G__12795;
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
var G__12619 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__12619)){
return cljs.core.PersistentVector.EMPTY;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cmp","cmp",575646375),G__12619)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [e], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"not","not",-595976884),G__12619)){
var G__12620 = new cljs.core.Keyword(null,"arg","arg",-1747261837).cljs$core$IFn$_invoke$arity$1(e);
return (kotobase.protocols.cypher.where_leaves.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.where_leaves.cljs$core$IFn$_invoke$arity$1(G__12620) : kotobase.protocols.cypher.where_leaves.call(null,G__12620));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"and","and",-971899817),G__12619)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.where_leaves),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"or","or",235744169),G__12619)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.where_leaves),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e));
} else {
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12619))));

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
var vec__12621 = kotobase.protocols.cypher.parse_pattern(toks__$1);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12621,(0),null);
var toks__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12621,(1),null);
var vec__12624 = kotobase.protocols.cypher.parse_where(toks__$2);
var wpreds = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12624,(0),null);
var toks__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12624,(1),null);
var vec__12627 = kotobase.protocols.cypher.parse_return(toks__$3);
var map__12630 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12627,(0),null);
var map__12630__$1 = cljs.core.__destructure_map(map__12630);
var ritems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12630__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var distinct_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12630__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810));
var toks__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12627,(1),null);
var vec__12631 = kotobase.protocols.cypher.parse_order_by(toks__$4);
var order_items = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12631,(0),null);
var toks__$5 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12631,(1),null);
var vec__12634 = kotobase.protocols.cypher.parse_count(toks__$5,"SKIP");
var skip = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12634,(0),null);
var toks__$6 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12634,(1),null);
var vec__12637 = kotobase.protocols.cypher.parse_count(toks__$6,"LIMIT");
var limit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12637,(0),null);
var toks__$7 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12637,(1),null);
if(cljs.core.seq(toks__$7)){
throw kotobase.protocols.cypher.syntax_err((""+"unexpected trailing input starting at "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.describe_tok(cljs.core.first(toks__$7)))));
} else {
}

if(cljs.core.empty_QMARK_(ritems)){
throw kotobase.protocols.cypher.syntax_err("RETURN must project at least one property (var.prop)");
} else {
}

var declared_12796 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"nodes","nodes",-2099585805).cljs$core$IFn$_invoke$arity$1(pattern)));
var check_var_12797 = (function (v,where_desc){
if(cljs.core.contains_QMARK_(declared_12796,v)){
return null;
} else {
throw kotobase.protocols.cypher.semantic_err((""+"unknown variable '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)+"' in "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(where_desc)+" -- not declared in the MATCH pattern"));
}
});
var seq__12640_12798 = cljs.core.seq(kotobase.protocols.cypher.where_leaves(wpreds));
var chunk__12641_12799 = null;
var count__12642_12800 = (0);
var i__12643_12801 = (0);
while(true){
if((i__12643_12801 < count__12642_12800)){
var p_12802 = chunk__12641_12799.cljs$core$IIndexed$_nth$arity$2(null,i__12643_12801);
check_var_12797(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(p_12802),"WHERE");


var G__12803 = seq__12640_12798;
var G__12804 = chunk__12641_12799;
var G__12805 = count__12642_12800;
var G__12806 = (i__12643_12801 + (1));
seq__12640_12798 = G__12803;
chunk__12641_12799 = G__12804;
count__12642_12800 = G__12805;
i__12643_12801 = G__12806;
continue;
} else {
var temp__5825__auto___12807 = cljs.core.seq(seq__12640_12798);
if(temp__5825__auto___12807){
var seq__12640_12808__$1 = temp__5825__auto___12807;
if(cljs.core.chunked_seq_QMARK_(seq__12640_12808__$1)){
var c__5694__auto___12809 = cljs.core.chunk_first(seq__12640_12808__$1);
var G__12810 = cljs.core.chunk_rest(seq__12640_12808__$1);
var G__12811 = c__5694__auto___12809;
var G__12812 = cljs.core.count(c__5694__auto___12809);
var G__12813 = (0);
seq__12640_12798 = G__12810;
chunk__12641_12799 = G__12811;
count__12642_12800 = G__12812;
i__12643_12801 = G__12813;
continue;
} else {
var p_12814 = cljs.core.first(seq__12640_12808__$1);
check_var_12797(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(p_12814),"WHERE");


var G__12815 = cljs.core.next(seq__12640_12808__$1);
var G__12816 = null;
var G__12817 = (0);
var G__12818 = (0);
seq__12640_12798 = G__12815;
chunk__12641_12799 = G__12816;
count__12642_12800 = G__12817;
i__12643_12801 = G__12818;
continue;
}
} else {
}
}
break;
}

var seq__12644_12819 = cljs.core.seq(ritems);
var chunk__12646_12820 = null;
var count__12647_12821 = (0);
var i__12648_12822 = (0);
while(true){
if((i__12648_12822 < count__12647_12821)){
var r_12823 = chunk__12646_12820.cljs$core$IIndexed$_nth$arity$2(null,i__12648_12822);
if(cljs.core.truth_(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_12823))){
check_var_12797(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_12823),"RETURN");


var G__12824 = seq__12644_12819;
var G__12825 = chunk__12646_12820;
var G__12826 = count__12647_12821;
var G__12827 = (i__12648_12822 + (1));
seq__12644_12819 = G__12824;
chunk__12646_12820 = G__12825;
count__12647_12821 = G__12826;
i__12648_12822 = G__12827;
continue;
} else {
var G__12828 = seq__12644_12819;
var G__12829 = chunk__12646_12820;
var G__12830 = count__12647_12821;
var G__12831 = (i__12648_12822 + (1));
seq__12644_12819 = G__12828;
chunk__12646_12820 = G__12829;
count__12647_12821 = G__12830;
i__12648_12822 = G__12831;
continue;
}
} else {
var temp__5825__auto___12832 = cljs.core.seq(seq__12644_12819);
if(temp__5825__auto___12832){
var seq__12644_12833__$1 = temp__5825__auto___12832;
if(cljs.core.chunked_seq_QMARK_(seq__12644_12833__$1)){
var c__5694__auto___12834 = cljs.core.chunk_first(seq__12644_12833__$1);
var G__12835 = cljs.core.chunk_rest(seq__12644_12833__$1);
var G__12836 = c__5694__auto___12834;
var G__12837 = cljs.core.count(c__5694__auto___12834);
var G__12838 = (0);
seq__12644_12819 = G__12835;
chunk__12646_12820 = G__12836;
count__12647_12821 = G__12837;
i__12648_12822 = G__12838;
continue;
} else {
var r_12839 = cljs.core.first(seq__12644_12833__$1);
if(cljs.core.truth_(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_12839))){
check_var_12797(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(r_12839),"RETURN");


var G__12840 = cljs.core.next(seq__12644_12833__$1);
var G__12841 = null;
var G__12842 = (0);
var G__12843 = (0);
seq__12644_12819 = G__12840;
chunk__12646_12820 = G__12841;
count__12647_12821 = G__12842;
i__12648_12822 = G__12843;
continue;
} else {
var G__12844 = cljs.core.next(seq__12644_12833__$1);
var G__12845 = null;
var G__12846 = (0);
var G__12847 = (0);
seq__12644_12819 = G__12844;
chunk__12646_12820 = G__12845;
count__12647_12821 = G__12846;
i__12648_12822 = G__12847;
continue;
}
}
} else {
}
}
break;
}

var seq__12650_12848 = cljs.core.seq(order_items);
var chunk__12651_12849 = null;
var count__12652_12850 = (0);
var i__12653_12851 = (0);
while(true){
if((i__12653_12851 < count__12652_12850)){
var o_12852 = chunk__12651_12849.cljs$core$IIndexed$_nth$arity$2(null,i__12653_12851);
check_var_12797(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(o_12852),"ORDER BY");


var G__12853 = seq__12650_12848;
var G__12854 = chunk__12651_12849;
var G__12855 = count__12652_12850;
var G__12856 = (i__12653_12851 + (1));
seq__12650_12848 = G__12853;
chunk__12651_12849 = G__12854;
count__12652_12850 = G__12855;
i__12653_12851 = G__12856;
continue;
} else {
var temp__5825__auto___12857 = cljs.core.seq(seq__12650_12848);
if(temp__5825__auto___12857){
var seq__12650_12858__$1 = temp__5825__auto___12857;
if(cljs.core.chunked_seq_QMARK_(seq__12650_12858__$1)){
var c__5694__auto___12859 = cljs.core.chunk_first(seq__12650_12858__$1);
var G__12860 = cljs.core.chunk_rest(seq__12650_12858__$1);
var G__12861 = c__5694__auto___12859;
var G__12862 = cljs.core.count(c__5694__auto___12859);
var G__12863 = (0);
seq__12650_12848 = G__12860;
chunk__12651_12849 = G__12861;
count__12652_12850 = G__12862;
i__12653_12851 = G__12863;
continue;
} else {
var o_12864 = cljs.core.first(seq__12650_12858__$1);
check_var_12797(new cljs.core.Keyword(null,"var","var",-769682797).cljs$core$IFn$_invoke$arity$1(o_12864),"ORDER BY");


var G__12865 = cljs.core.next(seq__12650_12858__$1);
var G__12866 = null;
var G__12867 = (0);
var G__12868 = (0);
seq__12650_12848 = G__12865;
chunk__12651_12849 = G__12866;
count__12652_12850 = G__12867;
i__12653_12851 = G__12868;
continue;
}
} else {
}
}
break;
}

var returned_12869 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"var","var",-769682797)),cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"prop","prop",-515168332)))),ritems);
var seq__12654_12870 = cljs.core.seq(order_items);
var chunk__12655_12871 = null;
var count__12656_12872 = (0);
var i__12657_12873 = (0);
while(true){
if((i__12657_12873 < count__12656_12872)){
var map__12660_12874 = chunk__12655_12871.cljs$core$IIndexed$_nth$arity$2(null,i__12657_12873);
var map__12660_12875__$1 = cljs.core.__destructure_map(map__12660_12874);
var var_12876 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12660_12875__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop_12877 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12660_12875__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
if(cljs.core.contains_QMARK_(returned_12869,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [var_12876,prop_12877], null))){
} else {
throw kotobase.protocols.cypher.semantic_err((""+"ORDER BY "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var_12876)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop_12877)+" is not in the RETURN list --"+" ordering by an unreturned property is not supported yet"));
}


var G__12878 = seq__12654_12870;
var G__12879 = chunk__12655_12871;
var G__12880 = count__12656_12872;
var G__12881 = (i__12657_12873 + (1));
seq__12654_12870 = G__12878;
chunk__12655_12871 = G__12879;
count__12656_12872 = G__12880;
i__12657_12873 = G__12881;
continue;
} else {
var temp__5825__auto___12882 = cljs.core.seq(seq__12654_12870);
if(temp__5825__auto___12882){
var seq__12654_12883__$1 = temp__5825__auto___12882;
if(cljs.core.chunked_seq_QMARK_(seq__12654_12883__$1)){
var c__5694__auto___12884 = cljs.core.chunk_first(seq__12654_12883__$1);
var G__12885 = cljs.core.chunk_rest(seq__12654_12883__$1);
var G__12886 = c__5694__auto___12884;
var G__12887 = cljs.core.count(c__5694__auto___12884);
var G__12888 = (0);
seq__12654_12870 = G__12885;
chunk__12655_12871 = G__12886;
count__12656_12872 = G__12887;
i__12657_12873 = G__12888;
continue;
} else {
var map__12661_12889 = cljs.core.first(seq__12654_12883__$1);
var map__12661_12890__$1 = cljs.core.__destructure_map(map__12661_12889);
var var_12891 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12661_12890__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop_12892 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12661_12890__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
if(cljs.core.contains_QMARK_(returned_12869,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [var_12891,prop_12892], null))){
} else {
throw kotobase.protocols.cypher.semantic_err((""+"ORDER BY "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var_12891)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop_12892)+" is not in the RETURN list --"+" ordering by an unreturned property is not supported yet"));
}


var G__12893 = cljs.core.next(seq__12654_12883__$1);
var G__12894 = null;
var G__12895 = (0);
var G__12896 = (0);
seq__12654_12870 = G__12893;
chunk__12655_12871 = G__12894;
count__12656_12872 = G__12895;
i__12657_12873 = G__12896;
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
var G__12662 = cljs.core.last(k);
if((G__12662 == null)){
return null;
} else {
return (kotobase.protocols.cypher.leaf_name.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.leaf_name.cljs$core$IFn$_invoke$arity$1(G__12662) : kotobase.protocols.cypher.leaf_name.call(null,G__12662));
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
if(cljs.core.truth_(cljs.core.some((function (p1__12663_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__12663_SHARP_,label);
}),available__$1))){
return label;
} else {
var matches = cljs.core.filterv((function (p1__12664_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.leaf_name(p1__12664_SHARP_),label);
}),available__$1);
var G__12665 = cljs.core.count(matches);
switch (G__12665) {
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
kotobase.protocols.cypher.resolve_collections = (function kotobase$protocols$cypher$resolve_collections(available,p__12668){
var map__12669 = p__12668;
var map__12669__$1 = cljs.core.__destructure_map(map__12669);
var translated = map__12669__$1;
var coll_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12669__$1,new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12669__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
if(cljs.core.not(cljs.core.seq(available))){
return translated;
} else {
var sub = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,(function (p1__12666_SHARP_){
return kotobase.protocols.cypher.resolve_label(available,p1__12666_SHARP_);
}))),coll_keys);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(translated,new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__12667_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(sub,p1__12667_SHARP_,p1__12667_SHARP_);
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
kotobase.protocols.cypher.cmp_clauses = (function kotobase$protocols$cypher$cmp_clauses(p__12670,parameters){
var map__12671 = p__12670;
var map__12671__$1 = cljs.core.__destructure_map(map__12671);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12671__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12671__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12671__$1,new cljs.core.Keyword(null,"value","value",305978217));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12671__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var null_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12671__$1,new cljs.core.Keyword(null,"null?","null?",1275152357));
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
var G__12672 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
var G__12672__$1 = (((G__12672 instanceof cljs.core.Keyword))?G__12672.fqn:null);
switch (G__12672__$1) {
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
var map__12673 = e;
var map__12673__$1 = cljs.core.__destructure_map(map__12673);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12673__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var null_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12673__$1,new cljs.core.Keyword(null,"null?","null?",1275152357));
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
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12672__$1))));

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
var G__12676 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
var G__12676__$1 = (((G__12676 instanceof cljs.core.Keyword))?G__12676.fqn:null);
switch (G__12676__$1) {
case "cmp":
var cs = kotobase.protocols.cypher.cmp_clauses(e,parameters);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(cs))){
return cljs.core.first(cs);
} else {
return cljs.core.cons(new cljs.core.Symbol(null,"and","and",668631710,null),cs);
}

break;
case "not":
var G__12677 = kotobase.protocols.cypher.negate(new cljs.core.Keyword(null,"arg","arg",-1747261837).cljs$core$IFn$_invoke$arity$1(e));
var G__12678 = parameters;
return (kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2(G__12677,G__12678) : kotobase.protocols.cypher.branch_clause.call(null,G__12677,G__12678));

break;
case "and":
return cljs.core.cons(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p1__12674_SHARP_){
return (kotobase.protocols.cypher.branch_clause_STAR_.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.branch_clause_STAR_.cljs$core$IFn$_invoke$arity$2(p1__12674_SHARP_,parameters) : kotobase.protocols.cypher.branch_clause_STAR_.call(null,p1__12674_SHARP_,parameters));
})),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e)));

break;
case "or":
return cljs.core.cons(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__12675_SHARP_){
return (kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.branch_clause.cljs$core$IFn$_invoke$arity$2(p1__12675_SHARP_,parameters) : kotobase.protocols.cypher.branch_clause.call(null,p1__12675_SHARP_,parameters));
}),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e)));

break;
default:
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12676__$1))));

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
var G__12681 = new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(e);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__12681)){
return cljs.core.PersistentVector.EMPTY;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cmp","cmp",575646375),G__12681)){
return kotobase.protocols.cypher.cmp_clauses(e,parameters);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"and","and",-971899817),G__12681)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p1__12679_SHARP_){
return (kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2(p1__12679_SHARP_,parameters) : kotobase.protocols.cypher.translate_where.call(null,p1__12679_SHARP_,parameters));
})),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"not","not",-595976884),G__12681)){
var G__12682 = kotobase.protocols.cypher.negate(new cljs.core.Keyword(null,"arg","arg",-1747261837).cljs$core$IFn$_invoke$arity$1(e));
var G__12683 = parameters;
return (kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.translate_where.cljs$core$IFn$_invoke$arity$2(G__12682,G__12683) : kotobase.protocols.cypher.translate_where.call(null,G__12682,G__12683));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"or","or",235744169),G__12681)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cons(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__12680_SHARP_){
return kotobase.protocols.cypher.branch_clause(p1__12680_SHARP_,parameters);
}),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(e)))], null);
} else {
throw (new Error((""+"No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12681))));

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
kotobase.protocols.cypher.translate = (function kotobase$protocols$cypher$translate(p__12686,parameters){
var map__12687 = p__12686;
var map__12687__$1 = cljs.core.__destructure_map(map__12687);
var pattern = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12687__$1,new cljs.core.Keyword(null,"pattern","pattern",242135423));
var where = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12687__$1,new cljs.core.Keyword(null,"where","where",-2044795965));
var return$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12687__$1,new cljs.core.Keyword(null,"return","return",-1891502105));
var distinct_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12687__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810));
var order_by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12687__$1,new cljs.core.Keyword(null,"order-by","order-by",1527318070));
var skip = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12687__$1,new cljs.core.Keyword(null,"skip","skip",602715391));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12687__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var nodes = new cljs.core.Keyword(null,"nodes","nodes",-2099585805).cljs$core$IFn$_invoke$arity$1(pattern);
var rels = new cljs.core.Keyword(null,"rels","rels",1770187185).cljs$core$IFn$_invoke$arity$1(pattern);
var node_clauses = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12688){
var map__12689 = p__12688;
var map__12689__$1 = cljs.core.__destructure_map(map__12689);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12689__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12689__$1,new cljs.core.Keyword(null,"label","label",1718410804));
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
var bound = cljs.core.filterv((function (p1__12684_SHARP_){
return cljs.core.not(new cljs.core.Keyword(null,"star?","star?",-803901336).cljs$core$IFn$_invoke$arity$1(p1__12684_SHARP_));
}),return$);
var agg_QMARK_ = cljs.core.boolean$(cljs.core.some((function (p1__12685_SHARP_){
var or__5162__auto__ = new cljs.core.Keyword(null,"agg","agg",-2001869296).cljs$core$IFn$_invoke$arity$1(p1__12685_SHARP_);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return new cljs.core.Keyword(null,"star?","star?",-803901336).cljs$core$IFn$_invoke$arity$1(p1__12685_SHARP_);
}
}),return$));
var entity_syms = ((agg_QMARK_)?cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.var_sym,new cljs.core.Keyword(null,"var","var",-769682797)),nodes):cljs.core.PersistentVector.EMPTY);
var prop_syms = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12690){
var map__12691 = p__12690;
var map__12691__$1 = cljs.core.__destructure_map(map__12691);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12691__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12691__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((""+"?"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"__"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)));
}),bound);
var return_syms = cljs.core.into.cljs$core$IFn$_invoke$arity$2(entity_syms,prop_syms);
var return_clauses = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (p__12692,rsym){
var map__12693 = p__12692;
var map__12693__$1 = cljs.core.__destructure_map(map__12693);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12693__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12693__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kotobase.protocols.cypher.var_sym(var$),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(prop),rsym], null);
}),bound,prop_syms);
var columns = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12694){
var map__12695 = p__12694;
var map__12695__$1 = cljs.core.__destructure_map(map__12695);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12695__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12695__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var as = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12695__$1,new cljs.core.Keyword(null,"as","as",1148689641));
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12695__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12695__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12696){
var map__12697 = p__12696;
var map__12697__$1 = cljs.core.__destructure_map(map__12697);
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12697__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12697__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
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
})(),new cljs.core.Keyword(null,"distinct?","distinct?",970077810),cljs.core.boolean$(distinct_QMARK_),new cljs.core.Keyword(null,"order-by","order-by",1527318070),(function (){var col__GT_idx = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$1((function (i,p__12698){
var map__12699 = p__12698;
var map__12699__$1 = cljs.core.__destructure_map(map__12699);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12699__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12699__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var as = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12699__$1,new cljs.core.Keyword(null,"as","as",1148689641));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12699__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12699__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var G__12700 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__5162__auto__ = as;
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
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__12700,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(var$)+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop)),i], null));
} else {
return G__12700;
}
})),cljs.core.cat),return$);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12701){
var map__12702 = p__12701;
var map__12702__$1 = cljs.core.__destructure_map(map__12702);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12702__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var prop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12702__$1,new cljs.core.Keyword(null,"prop","prop",-515168332));
var desc_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12702__$1,new cljs.core.Keyword(null,"desc?","desc?",-713120712));
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__12703_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(row,new cljs.core.Keyword(null,"index","index",-1531685915).cljs$core$IFn$_invoke$arity$1(p1__12703_SHARP_),null);
}),project);
}),rows);
} else {
var key_fn = (function (row){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__12704_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(row,new cljs.core.Keyword(null,"index","index",-1531685915).cljs$core$IFn$_invoke$arity$1(p1__12704_SHARP_),null);
}),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"agg","agg",-2001869296),project));
});
var groups = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,row){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(m,key_fn(row),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),row);
}),cljs.core.PersistentArrayMap.EMPTY,rows);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12706){
var vec__12707 = p__12706;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12707,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12707,(1),null);
var ks = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((-1));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__12710){
var map__12711 = p__12710;
var map__12711__$1 = cljs.core.__destructure_map(map__12711);
var agg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12711__$1,new cljs.core.Keyword(null,"agg","agg",-2001869296));
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12711__$1,new cljs.core.Keyword(null,"index","index",-1531685915));
var star_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12711__$1,new cljs.core.Keyword(null,"star?","star?",-803901336));
if(cljs.core.truth_(star_QMARK_)){
return cljs.core.count(group);
} else {
if(cljs.core.truth_(agg)){
return cljs.core.count(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__12705_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p1__12705_SHARP_,index,null);
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
var map__12712 = cljs.core.first(os);
var map__12712__$1 = cljs.core.__destructure_map(map__12712);
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12712__$1,new cljs.core.Keyword(null,"index","index",-1531685915));
var desc_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12712__$1,new cljs.core.Keyword(null,"desc?","desc?",-713120712));
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(x,index,null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(y,index,null);
var c = (((((a == null)) && ((b == null))))?(0):(((a == null))?(-1):(((b == null))?(1):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.type(a),cljs.core.type(b)))?(function (){try{return cljs.core.compare(a,b);
}catch (e12713){var _ = e12713;
return cljs.core.compare((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(b)));
}})():cljs.core.compare((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(a))),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(b))))
))));
var c__$1 = (cljs.core.truth_(desc_QMARK_)?(- c):c);
if((c__$1 === (0))){
var G__12900 = cljs.core.next(os);
os = G__12900;
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
var G__12715 = arguments.length;
switch (G__12715) {
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
var map__12716 = kotobase.protocols.cypher.resolve_collections(new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070).cljs$core$IFn$_invoke$arity$1(ctx),translated);
var map__12716__$1 = cljs.core.__destructure_map(map__12716);
var coll_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12716__$1,new cljs.core.Keyword(null,"coll-keys","coll-keys",-1263792070));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12716__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var distinct_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12716__$1,new cljs.core.Keyword(null,"distinct?","distinct?",970077810));
var order_by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12716__$1,new cljs.core.Keyword(null,"order-by","order-by",1527318070));
var skip = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12716__$1,new cljs.core.Keyword(null,"skip","skip",602715391));
var limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12716__$1,new cljs.core.Keyword(null,"limit","limit",-1355822363));
var project = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12716__$1,new cljs.core.Keyword(null,"project","project",1124394579));
var rows = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,kotobase.query.bridge.q.cljs$core$IFn$_invoke$arity$3(kotobase.query.bridge.db_for(ctx,store,coll_keys),query,visible_QMARK_));
var rows__$1 = kotobase.protocols.cypher.apply_project(project,rows);
var rows__$2 = (cljs.core.truth_(distinct_QMARK_)?cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(rows__$1):rows__$1);
var rows__$3 = ((cljs.core.seq(order_by))?cljs.core.sort.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.row_comparator(order_by),rows__$2):cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2((function (row){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.str,row);
}),rows__$2));
var rows__$4 = (function (){var G__12717 = rows__$3;
var G__12717__$1 = (cljs.core.truth_((function (){var and__5160__auto__ = skip;
if(cljs.core.truth_(and__5160__auto__)){
return (skip > (0));
} else {
return and__5160__auto__;
}
})())?cljs.core.drop.cljs$core$IFn$_invoke$arity$2(skip,G__12717):G__12717);
if(cljs.core.truth_(limit)){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(limit,G__12717__$1);
} else {
return G__12717__$1;
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
}catch (e12718){var e = e12718;
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
kotobase.protocols.cypher.handle = (function kotobase$protocols$cypher$handle(p__12719,req){
var map__12720 = p__12719;
var map__12720__$1 = cljs.core.__destructure_map(map__12720);
var ctx = map__12720__$1;
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12720__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12720__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
var now = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12720__$1,new cljs.core.Keyword(null,"now","now",-1650525531));
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
}catch (e12721){var _ = e12721;
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
var map__12723 = kotobase.protocols.cypher.run_statement(ctx,store,visible_QMARK_,now,cljs.core.first(stmts));
var map__12723__$1 = cljs.core.__destructure_map(map__12723);
var ok = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12723__$1,new cljs.core.Keyword(null,"ok","ok",967785236));
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12723__$1,new cljs.core.Keyword(null,"result","result",1415092211));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12723__$1,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(ok)){
var G__12902 = cljs.core.rest(stmts);
var G__12903 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(results,result);
stmts = G__12902;
results = G__12903;
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
