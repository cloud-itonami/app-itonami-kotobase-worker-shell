goog.provide('kotobase.protocols.graphql.http');
/**
 * Path → vector of decoded, non-empty segments: "/a//b" → ["a" "b"].
 */
kotobase.protocols.graphql.http.segments = (function kotobase$protocols$graphql$http$segments(path){
return cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(clojure.string.blank_QMARK_,clojure.string.split.cljs$core$IFn$_invoke$arity$2((function (){var or__5162__auto__ = path;
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),/\//)));
});
kotobase.protocols.graphql.http.query_param = (function kotobase$protocols$graphql$http$query_param(req,k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"query","query",-1288509510).cljs$core$IFn$_invoke$arity$1(req),k);
});
kotobase.protocols.graphql.http.header = (function kotobase$protocols$graphql$http$header(req,k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(req),clojure.string.lower_case(k));
});
kotobase.protocols.graphql.http.response = (function kotobase$protocols$graphql$http$response(var_args){
var G__12947 = arguments.length;
switch (G__12947) {
case 3:
return kotobase.protocols.graphql.http.response.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return kotobase.protocols.graphql.http.response.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.protocols.graphql.http.response.cljs$core$IFn$_invoke$arity$3 = (function (status,headers,body){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"headers","headers",-835030129),headers,new cljs.core.Keyword(null,"body","body",-2049205669),body], null);
}));

(kotobase.protocols.graphql.http.response.cljs$core$IFn$_invoke$arity$2 = (function (status,body){
return kotobase.protocols.graphql.http.response.cljs$core$IFn$_invoke$arity$3(status,cljs.core.PersistentArrayMap.EMPTY,body);
}));

(kotobase.protocols.graphql.http.response.cljs$lang$maxFixedArity = 3);

kotobase.protocols.graphql.http.text = (function kotobase$protocols$graphql$http$text(status,body){
return kotobase.protocols.graphql.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","text/plain; charset=utf-8"], null),body);
});
kotobase.protocols.graphql.http.not_found = (function kotobase$protocols$graphql$http$not_found(var_args){
var G__12949 = arguments.length;
switch (G__12949) {
case 0:
return kotobase.protocols.graphql.http.not_found.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return kotobase.protocols.graphql.http.not_found.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(kotobase.protocols.graphql.http.not_found.cljs$core$IFn$_invoke$arity$0 = (function (){
return kotobase.protocols.graphql.http.not_found.cljs$core$IFn$_invoke$arity$1("not found");
}));

(kotobase.protocols.graphql.http.not_found.cljs$core$IFn$_invoke$arity$1 = (function (msg){
return kotobase.protocols.graphql.http.text((404),msg);
}));

(kotobase.protocols.graphql.http.not_found.cljs$lang$maxFixedArity = 1);

kotobase.protocols.graphql.http.method_not_allowed = (function kotobase$protocols$graphql$http$method_not_allowed(){
return kotobase.protocols.graphql.http.text((405),"method not allowed");
});
kotobase.protocols.graphql.http.xml_escape = (function kotobase$protocols$graphql$http$xml_escape(s){
return clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)),"&","&amp;"),"<","&lt;"),">","&gt;"),"\"","&quot;");
});

//# sourceMappingURL=kotobase.protocols.graphql.http.js.map
