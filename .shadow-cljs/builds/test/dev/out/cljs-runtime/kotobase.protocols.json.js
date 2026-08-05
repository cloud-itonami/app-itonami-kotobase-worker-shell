goog.provide('kotobase.protocols.json');
kotobase.protocols.json.escape_str = (function kotobase$protocols$json$escape_str(s){
return clojure.string.replace(s,/[\"\\\u0000-\u001f]/,(function (c){
var G__7964 = c;
switch (G__7964) {
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
return (""+"{"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__7965){
var vec__7966 = p__7965;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7966,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7966,(1),null);
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__7969 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
return (kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1(G__7969) : kotobase.protocols.json.encode.call(null,G__7969));
})())+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1(v) : kotobase.protocols.json.encode.call(null,v))));
}),x)))+"}");
} else {
if(cljs.core.sequential_QMARK_(x)){
return (""+"["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.json.encode,x)))+"]");
} else {
var G__7970 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
return (kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.json.encode.cljs$core$IFn$_invoke$arity$1(G__7970) : kotobase.protocols.json.encode.call(null,G__7970));

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
var G__8002 = (i__$1 + (1));
i__$1 = G__8002;
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
var G__7971 = e;
switch (G__7971) {
case "\"":
var G__8004 = (i__$1 + (2));
var G__8005 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\"");
i__$1 = G__8004;
acc = G__8005;
continue;

break;
case "\\":
var G__8006 = (i__$1 + (2));
var G__8007 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__8006;
acc = G__8007;
continue;

break;
case "/":
var G__8008 = (i__$1 + (2));
var G__8009 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"/");
i__$1 = G__8008;
acc = G__8009;
continue;

break;
case "n":
var G__8010 = (i__$1 + (2));
var G__8011 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__8010;
acc = G__8011;
continue;

break;
case "r":
var G__8012 = (i__$1 + (2));
var G__8013 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\r");
i__$1 = G__8012;
acc = G__8013;
continue;

break;
case "t":
var G__8014 = (i__$1 + (2));
var G__8015 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__8014;
acc = G__8015;
continue;

break;
case "b":
var G__8016 = (i__$1 + (2));
var G__8017 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\b");
i__$1 = G__8016;
acc = G__8017;
continue;

break;
case "f":
var G__8018 = (i__$1 + (2));
var G__8019 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\f");
i__$1 = G__8018;
acc = G__8019;
continue;

break;
case "u":
var hexs = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i__$1 + (2)),(i__$1 + (6)));
var code = parseInt(hexs,(16));
var G__8020 = (i__$1 + (6));
var G__8021 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code)));
i__$1 = G__8020;
acc = G__8021;
continue;

break;
default:
return kotobase.protocols.json.fail((""+"bad escape \\"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),i__$1);

}
} else {
var G__8022 = (i__$1 + (1));
var G__8023 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__8022;
acc = G__8023;
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
var vec__7976 = (kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2(s,i__$1) : kotobase.protocols.json.parse_value.call(null,s,i__$1));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7976,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7976,(1),null);
var i__$3 = kotobase.protocols.json.skip_ws(s,i__$2);
var G__7979 = kotobase.protocols.json.ch(s,i__$3);
switch (G__7979) {
case ",":
var G__8025 = kotobase.protocols.json.skip_ws(s,(i__$3 + (1)));
var G__8026 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v);
i__$1 = G__8025;
acc = G__8026;
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
var vec__7989 = kotobase.protocols.json.parse_string_STAR_(s,i__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7989,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7989,(1),null);
var i__$3 = kotobase.protocols.json.skip_ws(s,i__$2);
var ___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.json.ch(s,i__$3),":"))?null:kotobase.protocols.json.fail("expected :",i__$3));
var vec__7992 = (function (){var G__7995 = s;
var G__7996 = kotobase.protocols.json.skip_ws(s,(i__$3 + (1)));
return (kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.json.parse_value.cljs$core$IFn$_invoke$arity$2(G__7995,G__7996) : kotobase.protocols.json.parse_value.call(null,G__7995,G__7996));
})();
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7992,(0),null);
var i__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7992,(1),null);
var i__$5 = kotobase.protocols.json.skip_ws(s,i__$4);
var G__7997 = kotobase.protocols.json.ch(s,i__$5);
switch (G__7997) {
case ",":
var G__8028 = kotobase.protocols.json.skip_ws(s,(i__$5 + (1)));
var G__8029 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v);
i__$1 = G__8028;
acc = G__8029;
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
var vec__7998 = kotobase.protocols.json.parse_value(s,(0));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7998,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7998,(1),null);
var i__$1 = kotobase.protocols.json.skip_ws(s,i);
if((i__$1 < cljs.core.count(s))){
kotobase.protocols.json.fail("trailing content",i__$1);
} else {
}

return v;
});

//# sourceMappingURL=kotobase.protocols.json.js.map
