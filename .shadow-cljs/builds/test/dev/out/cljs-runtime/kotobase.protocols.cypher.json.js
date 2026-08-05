goog.provide('kotobase.protocols.cypher.json');
kotobase.protocols.cypher.json.escape_str = (function kotobase$protocols$cypher$json$escape_str(s){
return clojure.string.replace(s,/[\"\\\x00-\x1f]/,(function (c){
var G__12425 = c;
switch (G__12425) {
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
kotobase.protocols.cypher.json.encode = (function kotobase$protocols$cypher$json$encode(x){
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
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.json.escape_str(x))+"\"");
} else {
if((x instanceof cljs.core.Keyword)){
return (""+"\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.cypher.json.escape_str(cljs.core.name(x)))+"\"");
} else {
if(cljs.core.map_QMARK_(x)){
return (""+"{"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__12426){
var vec__12427 = p__12426;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12427,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12427,(1),null);
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__12430 = (((k instanceof cljs.core.Keyword))?cljs.core.name(k):(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)));
return (kotobase.protocols.cypher.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.json.encode.cljs$core$IFn$_invoke$arity$1(G__12430) : kotobase.protocols.cypher.json.encode.call(null,G__12430));
})())+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((kotobase.protocols.cypher.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.json.encode.cljs$core$IFn$_invoke$arity$1(v) : kotobase.protocols.cypher.json.encode.call(null,v))));
}),x)))+"}");
} else {
if(cljs.core.sequential_QMARK_(x)){
return (""+"["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.json.encode,x)))+"]");
} else {
var G__12431 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
return (kotobase.protocols.cypher.json.encode.cljs$core$IFn$_invoke$arity$1 ? kotobase.protocols.cypher.json.encode.cljs$core$IFn$_invoke$arity$1(G__12431) : kotobase.protocols.cypher.json.encode.call(null,G__12431));

}
}
}
}
}
}
}
}
});
kotobase.protocols.cypher.json.fail = (function kotobase$protocols$cypher$json$fail(msg,i){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"JSON parse error: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)+" at "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("kotobase.protocols.cypher.json","parse-error","kotobase.protocols.cypher.json/parse-error",-803753988),new cljs.core.Keyword(null,"index","index",-1531685915),i], null));
});
kotobase.protocols.cypher.json.ch = (function kotobase$protocols$cypher$json$ch(s,i){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i,(i + (1)));
});
kotobase.protocols.cypher.json.skip_ws = (function kotobase$protocols$cypher$json$skip_ws(s,i){
var i__$1 = i;
while(true){
if((((i__$1 < cljs.core.count(s))) && (clojure.string.includes_QMARK_(" \t\n\r",kotobase.protocols.cypher.json.ch(s,i__$1))))){
var G__12463 = (i__$1 + (1));
i__$1 = G__12463;
continue;
} else {
return i__$1;
}
break;
}
});
kotobase.protocols.cypher.json.parse_string_STAR_ = (function kotobase$protocols$cypher$json$parse_string_STAR_(s,i){
var i__$1 = (i + (1));
var acc = "";
while(true){
if((i__$1 >= cljs.core.count(s))){
kotobase.protocols.cypher.json.fail("unterminated string",i__$1);
} else {
}

var c = kotobase.protocols.cypher.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\\")){
var e = kotobase.protocols.cypher.json.ch(s,(i__$1 + (1)));
var G__12432 = e;
switch (G__12432) {
case "\"":
var G__12465 = (i__$1 + (2));
var G__12466 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\"");
i__$1 = G__12465;
acc = G__12466;
continue;

break;
case "\\":
var G__12467 = (i__$1 + (2));
var G__12468 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\\");
i__$1 = G__12467;
acc = G__12468;
continue;

break;
case "/":
var G__12469 = (i__$1 + (2));
var G__12470 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"/");
i__$1 = G__12469;
acc = G__12470;
continue;

break;
case "n":
var G__12471 = (i__$1 + (2));
var G__12472 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\n");
i__$1 = G__12471;
acc = G__12472;
continue;

break;
case "r":
var G__12473 = (i__$1 + (2));
var G__12474 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\r");
i__$1 = G__12473;
acc = G__12474;
continue;

break;
case "t":
var G__12475 = (i__$1 + (2));
var G__12476 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\t");
i__$1 = G__12475;
acc = G__12476;
continue;

break;
case "b":
var G__12477 = (i__$1 + (2));
var G__12478 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\b");
i__$1 = G__12477;
acc = G__12478;
continue;

break;
case "f":
var G__12479 = (i__$1 + (2));
var G__12480 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+"\f");
i__$1 = G__12479;
acc = G__12480;
continue;

break;
case "u":
var hexs = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,(i__$1 + (2)),(i__$1 + (6)));
var code = parseInt(hexs,(16));
var G__12481 = (i__$1 + (6));
var G__12482 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(String.fromCharCode(code)));
i__$1 = G__12481;
acc = G__12482;
continue;

break;
default:
return kotobase.protocols.cypher.json.fail((""+"bad escape \\"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),i__$1);

}
} else {
var G__12483 = (i__$1 + (1));
var G__12484 = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c));
i__$1 = G__12483;
acc = G__12484;
continue;

}
}
break;
}
});
kotobase.protocols.cypher.json.parse_number_STAR_ = (function kotobase$protocols$cypher$json$parse_number_STAR_(s,i){
var m = cljs.core.re_find(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s,i));
if(cljs.core.truth_(m)){
} else {
kotobase.protocols.cypher.json.fail("bad number",i);
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(cljs.core.re_find(/[.eE]/,m))?parseFloat(m):parseInt(m,(10))),(i + cljs.core.count(m))], null);
});
kotobase.protocols.cypher.json.parse_array_STAR_ = (function kotobase$protocols$cypher$json$parse_array_STAR_(s,i){
var i__$1 = kotobase.protocols.cypher.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.protocols.cypher.json.fail("unterminated array",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.json.ch(s,i__$1),"]")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var vec__12437 = (kotobase.protocols.cypher.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.json.parse_value.cljs$core$IFn$_invoke$arity$2(s,i__$1) : kotobase.protocols.cypher.json.parse_value.call(null,s,i__$1));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12437,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12437,(1),null);
var i__$3 = kotobase.protocols.cypher.json.skip_ws(s,i__$2);
var G__12440 = kotobase.protocols.cypher.json.ch(s,i__$3);
switch (G__12440) {
case ",":
var G__12486 = kotobase.protocols.cypher.json.skip_ws(s,(i__$3 + (1)));
var G__12487 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v);
i__$1 = G__12486;
acc = G__12487;
continue;

break;
case "]":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,v),(i__$3 + (1))], null);

break;
default:
return kotobase.protocols.cypher.json.fail("expected , or ]",i__$3);

}

}
}
break;
}
});
kotobase.protocols.cypher.json.parse_object_STAR_ = (function kotobase$protocols$cypher$json$parse_object_STAR_(s,i){
var i__$1 = kotobase.protocols.cypher.json.skip_ws(s,(i + (1)));
var acc = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if((i__$1 >= cljs.core.count(s))){
return kotobase.protocols.cypher.json.fail("unterminated object",i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.json.ch(s,i__$1),"}")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [acc,(i__$1 + (1))], null);
} else {
var _ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.json.ch(s,i__$1),"\""))?null:kotobase.protocols.cypher.json.fail("expected key string",i__$1));
var vec__12450 = kotobase.protocols.cypher.json.parse_string_STAR_(s,i__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12450,(0),null);
var i__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12450,(1),null);
var i__$3 = kotobase.protocols.cypher.json.skip_ws(s,i__$2);
var ___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kotobase.protocols.cypher.json.ch(s,i__$3),":"))?null:kotobase.protocols.cypher.json.fail("expected :",i__$3));
var vec__12453 = (function (){var G__12456 = s;
var G__12457 = kotobase.protocols.cypher.json.skip_ws(s,(i__$3 + (1)));
return (kotobase.protocols.cypher.json.parse_value.cljs$core$IFn$_invoke$arity$2 ? kotobase.protocols.cypher.json.parse_value.cljs$core$IFn$_invoke$arity$2(G__12456,G__12457) : kotobase.protocols.cypher.json.parse_value.call(null,G__12456,G__12457));
})();
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12453,(0),null);
var i__$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12453,(1),null);
var i__$5 = kotobase.protocols.cypher.json.skip_ws(s,i__$4);
var G__12458 = kotobase.protocols.cypher.json.ch(s,i__$5);
switch (G__12458) {
case ",":
var G__12489 = kotobase.protocols.cypher.json.skip_ws(s,(i__$5 + (1)));
var G__12490 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v);
i__$1 = G__12489;
acc = G__12490;
continue;

break;
case "}":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,v),(i__$5 + (1))], null);

break;
default:
return kotobase.protocols.cypher.json.fail("expected , or }",i__$5);

}

}
}
break;
}
});
kotobase.protocols.cypher.json.parse_value = (function kotobase$protocols$cypher$json$parse_value(s,i){
var i__$1 = kotobase.protocols.cypher.json.skip_ws(s,i);
if((i__$1 >= cljs.core.count(s))){
kotobase.protocols.cypher.json.fail("unexpected end of input",i__$1);
} else {
}

var c = kotobase.protocols.cypher.json.ch(s,i__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"\"")){
return kotobase.protocols.cypher.json.parse_string_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"{")){
return kotobase.protocols.cypher.json.parse_object_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"[")){
return kotobase.protocols.cypher.json.parse_array_STAR_(s,i__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"t")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"true")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(i__$1 + (4))], null);
} else {
return kotobase.protocols.cypher.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"f")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (5))),"false")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,(i__$1 + (5))], null);
} else {
return kotobase.protocols.cypher.json.fail("bad literal",i__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,"n")){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(s,i__$1,(i__$1 + (4))),"null")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(i__$1 + (4))], null);
} else {
return kotobase.protocols.cypher.json.fail("bad literal",i__$1);
}
} else {
return kotobase.protocols.cypher.json.parse_number_STAR_(s,i__$1);

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
kotobase.protocols.cypher.json.parse = (function kotobase$protocols$cypher$json$parse(s){
var vec__12459 = kotobase.protocols.cypher.json.parse_value(s,(0));
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12459,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12459,(1),null);
var i__$1 = kotobase.protocols.cypher.json.skip_ws(s,i);
if((i__$1 < cljs.core.count(s))){
kotobase.protocols.cypher.json.fail("trailing content",i__$1);
} else {
}

return v;
});

//# sourceMappingURL=kotobase.protocols.cypher.json.js.map
