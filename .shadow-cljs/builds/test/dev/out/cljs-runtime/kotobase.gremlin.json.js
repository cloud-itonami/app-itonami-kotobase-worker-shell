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
var G__11003 = (i + (1));
var G__11004 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(acc,piece);
i = G__11003;
acc = G__11004;
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
return (""+"{"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__10967){
var vec__10968 = p__10967;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10968,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10968,(1),null);
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__10971 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
return (kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1(G__10971) : kotobase.gremlin.json.encode.call(null,G__10971));
})())+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1(v) : kotobase.gremlin.json.encode.call(null,v))));
}),x)))+"}");
} else {
if(cljs.core.sequential_QMARK_(x)){
return (""+"["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kotobase.gremlin.json.encode,x)))+"]");
} else {
var G__10972 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
return (kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.gremlin.json.encode.cljs$core$IFn$_invoke$arity$1(G__10972) : kotobase.gremlin.json.encode.call(null,G__10972));

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
var G__11005 = (i__$1 + (1));
i__$1 = G__11005;
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
var G__10973 = e;
switch (G__10973) {
case "\"":
var G__11007 = (i__$1 + (2));
var G__11008 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\"");
i__$1 = G__11007;
acc = G__11008;
continue;

break;
case "\\":
var G__11009 = (i__$1 + (2));
var G__11010 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__11009;
acc = G__11010;
continue;

break;
case "/":
var G__11011 = (i__$1 + (2));
var G__11012 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"/");
i__$1 = G__11011;
acc = G__11012;
continue;

break;
case "n":
var G__11013 = (i__$1 + (2));
var G__11014 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__11013;
acc = G__11014;
continue;

break;
case "r":
var G__11015 = (i__$1 + (2));
var G__11016 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\r");
i__$1 = G__11015;
acc = G__11016;
continue;

break;
case "t":
var G__11017 = (i__$1 + (2));
var G__11018 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__11017;
acc = G__11018;
continue;

break;
case "b":
var G__11019 = (i__$1 + (2));
var G__11020 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\b");
i__$1 = G__11019;
acc = G__11020;
continue;

break;
case "f":
var G__11021 = (i__$1 + (2));
var G__11022 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\f");
i__$1 = G__11021;
acc = G__11022;
continue;

break;
case "u":
var hexs = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i__$1 + (2)),(i__$1 + (6)));
var code = parseInt(hexs,(16));
var G__11023 = (i__$1 + (6));
var G__11024 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code)));
i__$1 = G__11023;
acc = G__11024;
continue;

break;
default:
return kotobase.gremlin.json.fail((""+"bad escape \\"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),i__$1);

}
} else {
var G__11025 = (i__$1 + (1));
var G__11026 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__11025;
acc = G__11026;
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
var vec__10978 = (kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2(s,i__$1) : kotobase.gremlin.json.parse_value.call(null,s,i__$1));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10978,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10978,(1),null);
var i__$3 = kotobase.gremlin.json.skip_ws(s,i__$2);
var G__10981 = kotobase.gremlin.json.ch(s,i__$3);
switch (G__10981) {
case ",":
var G__11028 = kotobase.gremlin.json.skip_ws(s,(i__$3 + (1)));
var G__11029 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v);
i__$1 = G__11028;
acc = G__11029;
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
var vec__10991 = kotobase.gremlin.json.parse_string_STAR_(s,i__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10991,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10991,(1),null);
var i__$3 = kotobase.gremlin.json.skip_ws(s,i__$2);
var ___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.gremlin.json.ch(s,i__$3),":"))?null:kotobase.gremlin.json.fail("expected :",i__$3));
var vec__10994 = (function (){var G__10997 = s;
var G__10998 = kotobase.gremlin.json.skip_ws(s,(i__$3 + (1)));
return (kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.gremlin.json.parse_value.cljs$core$IFn$_invoke$arity$2(G__10997,G__10998) : kotobase.gremlin.json.parse_value.call(null,G__10997,G__10998));
})();
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10994,(0),null);
var i__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10994,(1),null);
var i__$5 = kotobase.gremlin.json.skip_ws(s,i__$4);
var G__10999 = kotobase.gremlin.json.ch(s,i__$5);
switch (G__10999) {
case ",":
var G__11031 = kotobase.gremlin.json.skip_ws(s,(i__$5 + (1)));
var G__11032 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v);
i__$1 = G__11031;
acc = G__11032;
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
var vec__11000 = kotobase.gremlin.json.parse_value(s,(0));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11000,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11000,(1),null);
var i__$1 = kotobase.gremlin.json.skip_ws(s,i);
if((i__$1 < cljs.core.count(s))){
kotobase.gremlin.json.fail("trailing content",i__$1);
} else {
}

return v;
});

//# sourceMappingURL=kotobase.gremlin.json.js.map
