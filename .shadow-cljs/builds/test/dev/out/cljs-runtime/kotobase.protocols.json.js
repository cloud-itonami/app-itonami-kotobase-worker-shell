goog.provide('kotobase.protocols.json');
kotobase.protocols.json.escape_str = (function kotobase$protocols$json$escape_str(s){
return clojure.string.replace(s,/[\"\\\u0000-\u001f]/,(function (c){
var G__13035 = c;
switch (G__13035) {
case "\"":
return "\\\"";

break;
case "\\":
return "\\\\";

break;
case "\n":
return "\\n";

break;
case "\r":
return "\\r";

break;
case "\t":
return "\\t";

break;
case "\b":
return "\\b";

break;
case "\f":
return "\\f";

break;
default:
var code = c.charCodeAt((0));
var hexs = code.toString((16)).padStart((4),"0");
return (""+"\\u"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(hexs));

}
}));
});
/**
 * EDN value → JSON string. Map keys may be keywords or strings;
 *   keywords render as their name (no leading colon).
 */
kotobase.protocols.json.encode = (function kotobase$protocols$json$encode(x){
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
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.json.escape_str(x))+"\"");
} else {
if((x instanceof cljs.core.Keyword)){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.json.escape_str(cljs.core.name(x)))+"\"");
} else {
if(cljs.core.map_QMARK_(x)){
return (""+"{"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__13036){
var vec__13037 = p__13036;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13037,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13037,(1),null);
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__13040 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
return (kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1(G__13040) : kotobase.protocols.json.encode.call(null,G__13040));
})())+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1(v) : kotobase.protocols.json.encode.call(null,v))));
}),x)))+"}");
} else {
if(cljs.core.sequential_QMARK_(x)){
return (""+"["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.json.encode,x)))+"]");
} else {
var G__13041 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
return (kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1(G__13041) : kotobase.protocols.json.encode.call(null,G__13041));

}
}
}
}
}
}
}
}
});
kotobase.protocols.json.fail = (function kotobase$protocols$json$fail(msg,i){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"JSON parse error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)+" at "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.json","parse-error","kotobase.protocols.json/parse-error",-1011649877),new cljs.core.Keyword(null,"index","index",-1531685915),i], null));
});
kotobase.protocols.json.ch = (function kotobase$protocols$json$ch(s,i){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i,(i + (1)));
});
kotobase.protocols.json.skip_ws = (function kotobase$protocols$json$skip_ws(s,i){
var i__$1 = i;
while(true){
if((((i__$1 < cljs.core.count(s))) && (clojure.string.includes_QMARK_(" \t\n\r",kotobase.protocols.json.ch(s,i__$1))))){
var G__13073 = (i__$1 + (1));
i__$1 = G__13073;
continue;
} else {
return i__$1;
}
break;
}
});
kotobase.protocols.json.parse_string_STAR_ = (function kotobase$protocols$json$parse_string_STAR_(s,i){
var i__$1 = (i + (1));
var acc = "";
while(true){
if((i__$1 >= cljs.core.count(s))){
kotobase.protocols.json.fail("unterminated string",i__$1);
} else {
}

var c = kotobase.protocols.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\\")){
var e = kotobase.protocols.json.ch(s,(i__$1 + (1)));
var G__13042 = e;
switch (G__13042) {
case "\"":
var G__13075 = (i__$1 + (2));
var G__13076 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\"");
i__$1 = G__13075;
acc = G__13076;
continue;

break;
case "\\":
var G__13077 = (i__$1 + (2));
var G__13078 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__13077;
acc = G__13078;
continue;

break;
case "/":
var G__13079 = (i__$1 + (2));
var G__13080 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"/");
i__$1 = G__13079;
acc = G__13080;
continue;

break;
case "n":
var G__13081 = (i__$1 + (2));
var G__13082 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__13081;
acc = G__13082;
continue;

break;
case "r":
var G__13083 = (i__$1 + (2));
var G__13084 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\r");
i__$1 = G__13083;
acc = G__13084;
continue;

break;
case "t":
var G__13085 = (i__$1 + (2));
var G__13086 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__13085;
acc = G__13086;
continue;

break;
case "b":
var G__13087 = (i__$1 + (2));
var G__13088 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\b");
i__$1 = G__13087;
acc = G__13088;
continue;

break;
case "f":
var G__13089 = (i__$1 + (2));
var G__13090 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\f");
i__$1 = G__13089;
acc = G__13090;
continue;

break;
case "u":
var hexs = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i__$1 + (2)),(i__$1 + (6)));
var code = parseInt(hexs,(16));
var G__13091 = (i__$1 + (6));
var G__13092 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code)));
i__$1 = G__13091;
acc = G__13092;
continue;

break;
default:
return kotobase.protocols.json.fail((""+"bad escape \\"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),i__$1);

}
} else {
var G__13093 = (i__$1 + (1));
var G__13094 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__13093;
acc = G__13094;
continue;

}
}
break;
}
});
kotobase.protocols.json.parse_number_STAR_ = (function kotobase$protocols$json$parse_number_STAR_(s,i){
var m = cljs.core.re_find(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
if(cljs.core.truth_(m)){
} else {
kotobase.protocols.json.fail("bad number",i);
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(cljs.core.re_find(/[.eE]/,m))?parseFloat(m):parseInt(m,(10))),(i + cljs.core.count(m))], null);
});
kotobase.protocols.json.parse_array_STAR_ = (function kotobase$protocols$json$parse_array_STAR_(s,i){
var i__$1 = kotobase.protocols.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.protocols.json.fail("unterminated array",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.json.ch(s,i__$1),"]")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var vec__13047 = (kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2(s,i__$1) : kotobase.protocols.json.parse_value.call(null,s,i__$1));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13047,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13047,(1),null);
var i__$3 = kotobase.protocols.json.skip_ws(s,i__$2);
var G__13050 = kotobase.protocols.json.ch(s,i__$3);
switch (G__13050) {
case ",":
var G__13096 = kotobase.protocols.json.skip_ws(s,(i__$3 + (1)));
var G__13097 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v);
i__$1 = G__13096;
acc = G__13097;
continue;

break;
case "]":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v),(i__$3 + (1))], null);

break;
default:
return kotobase.protocols.json.fail("expected , or ]",i__$3);

}

}
}
break;
}
});
kotobase.protocols.json.parse_object_STAR_ = (function kotobase$protocols$json$parse_object_STAR_(s,i){
var i__$1 = kotobase.protocols.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.protocols.json.fail("unterminated object",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.json.ch(s,i__$1),"}")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var _ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.json.ch(s,i__$1),"\""))?null:kotobase.protocols.json.fail("expected key string",i__$1));
var vec__13060 = kotobase.protocols.json.parse_string_STAR_(s,i__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13060,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13060,(1),null);
var i__$3 = kotobase.protocols.json.skip_ws(s,i__$2);
var ___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.json.ch(s,i__$3),":"))?null:kotobase.protocols.json.fail("expected :",i__$3));
var vec__13063 = (function (){var G__13066 = s;
var G__13067 = kotobase.protocols.json.skip_ws(s,(i__$3 + (1)));
return (kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2(G__13066,G__13067) : kotobase.protocols.json.parse_value.call(null,G__13066,G__13067));
})();
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13063,(0),null);
var i__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13063,(1),null);
var i__$5 = kotobase.protocols.json.skip_ws(s,i__$4);
var G__13068 = kotobase.protocols.json.ch(s,i__$5);
switch (G__13068) {
case ",":
var G__13099 = kotobase.protocols.json.skip_ws(s,(i__$5 + (1)));
var G__13100 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v);
i__$1 = G__13099;
acc = G__13100;
continue;

break;
case "}":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v),(i__$5 + (1))], null);

break;
default:
return kotobase.protocols.json.fail("expected , or }",i__$5);

}

}
}
break;
}
});
kotobase.protocols.json.parse_value = (function kotobase$protocols$json$parse_value(s,i){
var i__$1 = kotobase.protocols.json.skip_ws(s,i);
if((i__$1 >= cljs.core.count(s))){
kotobase.protocols.json.fail("unexpected end of input",i__$1);
} else {
}

var c = kotobase.protocols.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return kotobase.protocols.json.parse_string_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"{")){
return kotobase.protocols.json.parse_object_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"[")){
return kotobase.protocols.json.parse_array_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"t")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"true")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(i__$1 + (4))], null);
} else {
return kotobase.protocols.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"f")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (5))),"false")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,(i__$1 + (5))], null);
} else {
return kotobase.protocols.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"n")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"null")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(i__$1 + (4))], null);
} else {
return kotobase.protocols.json.fail("bad literal",i__$1);
}
} else {
return kotobase.protocols.json.parse_number_STAR_(s,i__$1);

}
}
}
}
}
}
});
/**
 * JSON string → EDN (map keys stay strings). Throws ex-info ::parse-error.
 */
kotobase.protocols.json.parse = (function kotobase$protocols$json$parse(s){
var vec__13069 = kotobase.protocols.json.parse_value(s,(0));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13069,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13069,(1),null);
var i__$1 = kotobase.protocols.json.skip_ws(s,i);
if((i__$1 < cljs.core.count(s))){
kotobase.protocols.json.fail("trailing content",i__$1);
} else {
}

return v;
});

//# sourceMappingURL=kotobase.protocols.json.js.map
