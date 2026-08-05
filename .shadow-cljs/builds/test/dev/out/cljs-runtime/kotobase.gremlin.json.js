goog.provide('kotobase.gremlin.json');
kotobase.gremlin.json.char_code_at = (function kotobase$gremlin$json$char_code_at(s,i){
return s.charCodeAt(i);
});
/**
 * Escape a string for JSON output, char-by-char (not a regex character
 *   class over a literal control-byte range -- see `nostr.json`'s own
 *   docstring for why that form is deliberately avoided here too). Every char
 *   code below 32 gets a `\uXXXX` escape; `"` and `\` get their named
 *   two-char escapes; everything else (including all non-ASCII Unicode)
 *   passes through unchanged.
 */
kotobase.gremlin.json.escape_str = (function kotobase$gremlin$json$escape_str(s){
var n = cljs.core.count(s);
var i = (0);
var acc = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,n)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.persistent_BANG_(acc));
} else {
var code = kotobase.gremlin.json.char_code_at(s,i);
var c = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i,(i + (1)));
var piece = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\""))?"\\\"":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\\"))?"\\\\":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(code,(10)))?"\\n":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(code,(13)))?"\\r":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(code,(9)))?"\\t":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(code,(8)))?"\\b":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(code,(12)))?"\\f":(((code < (32)))?(""+"\\u"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(code.toString((16)).padStart((4),"0"))):c
))))))));
var G__11043 = (i + (1));
var G__11044 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(acc,piece);
i = G__11043;
acc = G__11044;
continue;
}
break;
}
});
/**
 * EDN value -> JSON string. Map keys may be keywords or strings; keywords
 *   render as their name (no leading colon).
 */
kotobase.gremlin.json.encode = (function kotobase$gremlin$json$encode(x){
if((x == null)){
return "null";
} else {
if(x === true){
return "true";
} else {
if(x === false){
return "false";
} else {
if(typeof x === 'number'){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
} else {
if(typeof x === 'string'){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.json.escape_str(x))+"\"");
} else {
if((x instanceof cljs.core.Keyword)){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.gremlin.json.escape_str(cljs.core.name(x)))+"\"");
} else {
if(cljs.core.map_QMARK_(x)){
return (""+"{"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__11007){
var vec__11008 = p__11007;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11008,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11008,(1),null);
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__11011 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
return (kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1(G__11011) : kotobase.gremlin.json.encode.call(null,G__11011));
})())+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1(v) : kotobase.gremlin.json.encode.call(null,v))));
}),x)))+"}");
} else {
if(cljs.core.sequential_QMARK_(x)){
return (""+"["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kotobase.gremlin.json.encode,x)))+"]");
} else {
var G__11012 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
return (kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1(G__11012) : kotobase.gremlin.json.encode.call(null,G__11012));

}
}
}
}
}
}
}
}
});
kotobase.gremlin.json.fail = (function kotobase$gremlin$json$fail(msg,i){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"JSON parse error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)+" at "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.gremlin.json","parse-error","kotobase.gremlin.json/parse-error",436456984),new cljs.core.Keyword(null,"index","index",-1531685915),i], null));
});
kotobase.gremlin.json.ch = (function kotobase$gremlin$json$ch(s,i){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i,(i + (1)));
});
kotobase.gremlin.json.skip_ws = (function kotobase$gremlin$json$skip_ws(s,i){
var i__$1 = i;
while(true){
if((((i__$1 < cljs.core.count(s))) && (clojure.string.includes_QMARK_(" \t\n\r",kotobase.gremlin.json.ch(s,i__$1))))){
var G__11045 = (i__$1 + (1));
i__$1 = G__11045;
continue;
} else {
return i__$1;
}
break;
}
});
kotobase.gremlin.json.parse_string_STAR_ = (function kotobase$gremlin$json$parse_string_STAR_(s,i){
var i__$1 = (i + (1));
var acc = "";
while(true){
if((i__$1 >= cljs.core.count(s))){
kotobase.gremlin.json.fail("unterminated string",i__$1);
} else {
}

var c = kotobase.gremlin.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\\")){
var e = kotobase.gremlin.json.ch(s,(i__$1 + (1)));
var G__11013 = e;
switch (G__11013) {
case "\"":
var G__11047 = (i__$1 + (2));
var G__11048 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\"");
i__$1 = G__11047;
acc = G__11048;
continue;

break;
case "\\":
var G__11049 = (i__$1 + (2));
var G__11050 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__11049;
acc = G__11050;
continue;

break;
case "/":
var G__11051 = (i__$1 + (2));
var G__11052 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"/");
i__$1 = G__11051;
acc = G__11052;
continue;

break;
case "n":
var G__11053 = (i__$1 + (2));
var G__11054 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__11053;
acc = G__11054;
continue;

break;
case "r":
var G__11055 = (i__$1 + (2));
var G__11056 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\r");
i__$1 = G__11055;
acc = G__11056;
continue;

break;
case "t":
var G__11057 = (i__$1 + (2));
var G__11058 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__11057;
acc = G__11058;
continue;

break;
case "b":
var G__11059 = (i__$1 + (2));
var G__11060 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\b");
i__$1 = G__11059;
acc = G__11060;
continue;

break;
case "f":
var G__11061 = (i__$1 + (2));
var G__11062 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\f");
i__$1 = G__11061;
acc = G__11062;
continue;

break;
case "u":
var hexs = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i__$1 + (2)),(i__$1 + (6)));
var code = parseInt(hexs,(16));
var G__11063 = (i__$1 + (6));
var G__11064 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code)));
i__$1 = G__11063;
acc = G__11064;
continue;

break;
default:
return kotobase.gremlin.json.fail((""+"bad escape \\"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),i__$1);

}
} else {
var G__11065 = (i__$1 + (1));
var G__11066 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__11065;
acc = G__11066;
continue;

}
}
break;
}
});
kotobase.gremlin.json.parse_number_STAR_ = (function kotobase$gremlin$json$parse_number_STAR_(s,i){
var m = cljs.core.re_find(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
if(cljs.core.truth_(m)){
} else {
kotobase.gremlin.json.fail("bad number",i);
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(cljs.core.re_find(/[.eE]/,m))?parseFloat(m):parseInt(m,(10))),(i + cljs.core.count(m))], null);
});
kotobase.gremlin.json.parse_array_STAR_ = (function kotobase$gremlin$json$parse_array_STAR_(s,i){
var i__$1 = kotobase.gremlin.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.gremlin.json.fail("unterminated array",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.gremlin.json.ch(s,i__$1),"]")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var vec__11018 = (kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2(s,i__$1) : kotobase.gremlin.json.parse_value.call(null,s,i__$1));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11018,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11018,(1),null);
var i__$3 = kotobase.gremlin.json.skip_ws(s,i__$2);
var G__11021 = kotobase.gremlin.json.ch(s,i__$3);
switch (G__11021) {
case ",":
var G__11068 = kotobase.gremlin.json.skip_ws(s,(i__$3 + (1)));
var G__11069 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v);
i__$1 = G__11068;
acc = G__11069;
continue;

break;
case "]":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v),(i__$3 + (1))], null);

break;
default:
return kotobase.gremlin.json.fail("expected , or ]",i__$3);

}

}
}
break;
}
});
kotobase.gremlin.json.parse_object_STAR_ = (function kotobase$gremlin$json$parse_object_STAR_(s,i){
var i__$1 = kotobase.gremlin.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.gremlin.json.fail("unterminated object",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.gremlin.json.ch(s,i__$1),"}")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var _ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.gremlin.json.ch(s,i__$1),"\""))?null:kotobase.gremlin.json.fail("expected key string",i__$1));
var vec__11031 = kotobase.gremlin.json.parse_string_STAR_(s,i__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11031,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11031,(1),null);
var i__$3 = kotobase.gremlin.json.skip_ws(s,i__$2);
var ___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.gremlin.json.ch(s,i__$3),":"))?null:kotobase.gremlin.json.fail("expected :",i__$3));
var vec__11034 = (function (){var G__11037 = s;
var G__11038 = kotobase.gremlin.json.skip_ws(s,(i__$3 + (1)));
return (kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2(G__11037,G__11038) : kotobase.gremlin.json.parse_value.call(null,G__11037,G__11038));
})();
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11034,(0),null);
var i__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11034,(1),null);
var i__$5 = kotobase.gremlin.json.skip_ws(s,i__$4);
var G__11039 = kotobase.gremlin.json.ch(s,i__$5);
switch (G__11039) {
case ",":
var G__11071 = kotobase.gremlin.json.skip_ws(s,(i__$5 + (1)));
var G__11072 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v);
i__$1 = G__11071;
acc = G__11072;
continue;

break;
case "}":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v),(i__$5 + (1))], null);

break;
default:
return kotobase.gremlin.json.fail("expected , or }",i__$5);

}

}
}
break;
}
});
kotobase.gremlin.json.parse_value = (function kotobase$gremlin$json$parse_value(s,i){
var i__$1 = kotobase.gremlin.json.skip_ws(s,i);
if((i__$1 >= cljs.core.count(s))){
kotobase.gremlin.json.fail("unexpected end of input",i__$1);
} else {
}

var c = kotobase.gremlin.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return kotobase.gremlin.json.parse_string_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"{")){
return kotobase.gremlin.json.parse_object_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"[")){
return kotobase.gremlin.json.parse_array_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"t")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"true")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(i__$1 + (4))], null);
} else {
return kotobase.gremlin.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"f")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (5))),"false")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,(i__$1 + (5))], null);
} else {
return kotobase.gremlin.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"n")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"null")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(i__$1 + (4))], null);
} else {
return kotobase.gremlin.json.fail("bad literal",i__$1);
}
} else {
return kotobase.gremlin.json.parse_number_STAR_(s,i__$1);

}
}
}
}
}
}
});
/**
 * JSON string -> EDN (map keys stay strings). Throws ex-info ::parse-error.
 */
kotobase.gremlin.json.parse = (function kotobase$gremlin$json$parse(s){
var vec__11040 = kotobase.gremlin.json.parse_value(s,(0));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11040,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11040,(1),null);
var i__$1 = kotobase.gremlin.json.skip_ws(s,i);
if((i__$1 < cljs.core.count(s))){
kotobase.gremlin.json.fail("trailing content",i__$1);
} else {
}

return v;
});

//# sourceMappingURL=kotobase.gremlin.json.js.map
