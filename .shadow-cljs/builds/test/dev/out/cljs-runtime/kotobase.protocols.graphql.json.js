goog.provide('kotobase.protocols.graphql.json');
kotobase.protocols.graphql.json.escape_str = (function kotobase$protocols$graphql$json$escape_str(s){
return clojure.string.replace(s,/[\"\\\u0000-\u001f]/,(function (c){
var G__7881 = c;
switch (G__7881) {
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
kotobase.protocols.graphql.json.encode = (function kotobase$protocols$graphql$json$encode(x){
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
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.graphql.json.escape_str(x))+"\"");
} else {
if((x instanceof cljs.core.Keyword)){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.graphql.json.escape_str(cljs.core.name(x)))+"\"");
} else {
if(cljs.core.map_QMARK_(x)){
return (""+"{"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__7882){
var vec__7883 = p__7882;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7883,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7883,(1),null);
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__7886 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
return (kotobase.protocols.graphql.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.graphql.json.encode.cljs$core$IFn$_invoke$arity$1(G__7886) : kotobase.protocols.graphql.json.encode.call(null,G__7886));
})())+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((kotobase.protocols.graphql.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.graphql.json.encode.cljs$core$IFn$_invoke$arity$1(v) : kotobase.protocols.graphql.json.encode.call(null,v))));
}),x)))+"}");
} else {
if(cljs.core.sequential_QMARK_(x)){
return (""+"["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.graphql.json.encode,x)))+"]");
} else {
var G__7887 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
return (kotobase.protocols.graphql.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.graphql.json.encode.cljs$core$IFn$_invoke$arity$1(G__7887) : kotobase.protocols.graphql.json.encode.call(null,G__7887));

}
}
}
}
}
}
}
}
});
kotobase.protocols.graphql.json.fail = (function kotobase$protocols$graphql$json$fail(msg,i){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"JSON parse error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)+" at "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.graphql.json","parse-error","kotobase.protocols.graphql.json/parse-error",2030216336),new cljs.core.Keyword(null,"index","index",-1531685915),i], null));
});
kotobase.protocols.graphql.json.ch = (function kotobase$protocols$graphql$json$ch(s,i){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i,(i + (1)));
});
kotobase.protocols.graphql.json.skip_ws = (function kotobase$protocols$graphql$json$skip_ws(s,i){
var i__$1 = i;
while(true){
if((((i__$1 < cljs.core.count(s))) && (clojure.string.includes_QMARK_(" \t\n\r",kotobase.protocols.graphql.json.ch(s,i__$1))))){
var G__7919 = (i__$1 + (1));
i__$1 = G__7919;
continue;
} else {
return i__$1;
}
break;
}
});
kotobase.protocols.graphql.json.parse_string_STAR_ = (function kotobase$protocols$graphql$json$parse_string_STAR_(s,i){
var i__$1 = (i + (1));
var acc = "";
while(true){
if((i__$1 >= cljs.core.count(s))){
kotobase.protocols.graphql.json.fail("unterminated string",i__$1);
} else {
}

var c = kotobase.protocols.graphql.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\\")){
var e = kotobase.protocols.graphql.json.ch(s,(i__$1 + (1)));
var G__7888 = e;
switch (G__7888) {
case "\"":
var G__7921 = (i__$1 + (2));
var G__7922 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\"");
i__$1 = G__7921;
acc = G__7922;
continue;

break;
case "\\":
var G__7923 = (i__$1 + (2));
var G__7924 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__7923;
acc = G__7924;
continue;

break;
case "/":
var G__7925 = (i__$1 + (2));
var G__7926 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"/");
i__$1 = G__7925;
acc = G__7926;
continue;

break;
case "n":
var G__7927 = (i__$1 + (2));
var G__7928 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__7927;
acc = G__7928;
continue;

break;
case "r":
var G__7929 = (i__$1 + (2));
var G__7930 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\r");
i__$1 = G__7929;
acc = G__7930;
continue;

break;
case "t":
var G__7931 = (i__$1 + (2));
var G__7932 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__7931;
acc = G__7932;
continue;

break;
case "b":
var G__7933 = (i__$1 + (2));
var G__7934 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\b");
i__$1 = G__7933;
acc = G__7934;
continue;

break;
case "f":
var G__7935 = (i__$1 + (2));
var G__7936 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\f");
i__$1 = G__7935;
acc = G__7936;
continue;

break;
case "u":
var hexs = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i__$1 + (2)),(i__$1 + (6)));
var code = parseInt(hexs,(16));
var G__7937 = (i__$1 + (6));
var G__7938 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code)));
i__$1 = G__7937;
acc = G__7938;
continue;

break;
default:
return kotobase.protocols.graphql.json.fail((""+"bad escape \\"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),i__$1);

}
} else {
var G__7939 = (i__$1 + (1));
var G__7940 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__7939;
acc = G__7940;
continue;

}
}
break;
}
});
kotobase.protocols.graphql.json.parse_number_STAR_ = (function kotobase$protocols$graphql$json$parse_number_STAR_(s,i){
var m = cljs.core.re_find(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
if(cljs.core.truth_(m)){
} else {
kotobase.protocols.graphql.json.fail("bad number",i);
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(cljs.core.re_find(/[.eE]/,m))?parseFloat(m):parseInt(m,(10))),(i + cljs.core.count(m))], null);
});
kotobase.protocols.graphql.json.parse_array_STAR_ = (function kotobase$protocols$graphql$json$parse_array_STAR_(s,i){
var i__$1 = kotobase.protocols.graphql.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.protocols.graphql.json.fail("unterminated array",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.graphql.json.ch(s,i__$1),"]")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var vec__7893 = (kotobase.protocols.graphql.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.graphql.json.parse_value.cljs$core$IFn$_invoke$arity$2(s,i__$1) : kotobase.protocols.graphql.json.parse_value.call(null,s,i__$1));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7893,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7893,(1),null);
var i__$3 = kotobase.protocols.graphql.json.skip_ws(s,i__$2);
var G__7896 = kotobase.protocols.graphql.json.ch(s,i__$3);
switch (G__7896) {
case ",":
var G__7942 = kotobase.protocols.graphql.json.skip_ws(s,(i__$3 + (1)));
var G__7943 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v);
i__$1 = G__7942;
acc = G__7943;
continue;

break;
case "]":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v),(i__$3 + (1))], null);

break;
default:
return kotobase.protocols.graphql.json.fail("expected , or ]",i__$3);

}

}
}
break;
}
});
kotobase.protocols.graphql.json.parse_object_STAR_ = (function kotobase$protocols$graphql$json$parse_object_STAR_(s,i){
var i__$1 = kotobase.protocols.graphql.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.protocols.graphql.json.fail("unterminated object",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.graphql.json.ch(s,i__$1),"}")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var _ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.graphql.json.ch(s,i__$1),"\""))?null:kotobase.protocols.graphql.json.fail("expected key string",i__$1));
var vec__7906 = kotobase.protocols.graphql.json.parse_string_STAR_(s,i__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7906,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7906,(1),null);
var i__$3 = kotobase.protocols.graphql.json.skip_ws(s,i__$2);
var ___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.graphql.json.ch(s,i__$3),":"))?null:kotobase.protocols.graphql.json.fail("expected :",i__$3));
var vec__7909 = (function (){var G__7912 = s;
var G__7913 = kotobase.protocols.graphql.json.skip_ws(s,(i__$3 + (1)));
return (kotobase.protocols.graphql.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.graphql.json.parse_value.cljs$core$IFn$_invoke$arity$2(G__7912,G__7913) : kotobase.protocols.graphql.json.parse_value.call(null,G__7912,G__7913));
})();
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7909,(0),null);
var i__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7909,(1),null);
var i__$5 = kotobase.protocols.graphql.json.skip_ws(s,i__$4);
var G__7914 = kotobase.protocols.graphql.json.ch(s,i__$5);
switch (G__7914) {
case ",":
var G__7945 = kotobase.protocols.graphql.json.skip_ws(s,(i__$5 + (1)));
var G__7946 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v);
i__$1 = G__7945;
acc = G__7946;
continue;

break;
case "}":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v),(i__$5 + (1))], null);

break;
default:
return kotobase.protocols.graphql.json.fail("expected , or }",i__$5);

}

}
}
break;
}
});
kotobase.protocols.graphql.json.parse_value = (function kotobase$protocols$graphql$json$parse_value(s,i){
var i__$1 = kotobase.protocols.graphql.json.skip_ws(s,i);
if((i__$1 >= cljs.core.count(s))){
kotobase.protocols.graphql.json.fail("unexpected end of input",i__$1);
} else {
}

var c = kotobase.protocols.graphql.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return kotobase.protocols.graphql.json.parse_string_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"{")){
return kotobase.protocols.graphql.json.parse_object_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"[")){
return kotobase.protocols.graphql.json.parse_array_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"t")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"true")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(i__$1 + (4))], null);
} else {
return kotobase.protocols.graphql.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"f")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (5))),"false")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,(i__$1 + (5))], null);
} else {
return kotobase.protocols.graphql.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"n")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"null")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(i__$1 + (4))], null);
} else {
return kotobase.protocols.graphql.json.fail("bad literal",i__$1);
}
} else {
return kotobase.protocols.graphql.json.parse_number_STAR_(s,i__$1);

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
kotobase.protocols.graphql.json.parse = (function kotobase$protocols$graphql$json$parse(s){
var vec__7915 = kotobase.protocols.graphql.json.parse_value(s,(0));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7915,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__7915,(1),null);
var i__$1 = kotobase.protocols.graphql.json.skip_ws(s,i);
if((i__$1 < cljs.core.count(s))){
kotobase.protocols.graphql.json.fail("trailing content",i__$1);
} else {
}

return v;
});

//# sourceMappingURL=kotobase.protocols.graphql.json.js.map
