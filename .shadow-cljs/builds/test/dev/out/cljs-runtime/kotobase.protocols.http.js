goog.provide('kotobase.protocols.http');
/**
 * Path → vector of decoded, non-empty segments: "/a//b" → ["a" "b"].
 */
kotobase.protocols.http.segments = (function kotobase$protocols$http$segments(path){
return cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(clojure.string.blank_QMARK_,clojure.string.split.cljs$core$IFn$_invoke$arity$2((function (){var or__5162__auto__ = path;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),/\//)));
});
kotobase.protocols.http.query_param = (function kotobase$protocols$http$query_param(req,k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"query","query",-1288509510).cljs$core$IFn$_invoke$arity$1(req),k);
});
kotobase.protocols.http.header = (function kotobase$protocols$http$header(req,k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),clojure.string.lower_case(k));
});
kotobase.protocols.http.response = (function kotobase$protocols$http$response(var_args){
var G__10853 = arguments.length;
switch (G__10853) {
case 3:
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3 = (function (status,headers,body){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"headers","headers",-835030129),headers,new cljs.core.Keyword(null,"body","body",-2049205669),body], null);
}));

(kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$2 = (function (status,body){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3(status,cljs.core.PersistentArrayMap.EMPTY,body);
}));

(kotobase.protocols.http.response.cljs$lang$maxFixedArity = 3);

kotobase.protocols.http.text = (function kotobase$protocols$http$text(status,body){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","text/plain; charset=utf-8"], null),body);
});
kotobase.protocols.http.not_found = (function kotobase$protocols$http$not_found(var_args){
var G__10855 = arguments.length;
switch (G__10855) {
case 0:
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0 = (function (){
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1("not found");
}));

(kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1 = (function (msg){
return kotobase.protocols.http.text((404),msg);
}));

(kotobase.protocols.http.not_found.cljs$lang$maxFixedArity = 1);

kotobase.protocols.http.method_not_allowed = (function kotobase$protocols$http$method_not_allowed(){
return kotobase.protocols.http.text((405),"method not allowed");
});
kotobase.protocols.http.xml_escape = (function kotobase$protocols$http$xml_escape(s){
return clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)),"&","&amp;"),"<","&lt;"),">","&gt;"),"\"","&quot;");
});

//# sourceMappingURL=kotobase.protocols.http.js.map
