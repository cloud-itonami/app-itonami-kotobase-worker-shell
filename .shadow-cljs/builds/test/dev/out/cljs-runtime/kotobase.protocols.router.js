goog.provide('kotobase.protocols.router');
/**
 * Single-origin fallbacks, as [prefix label strip?].
 * 
 *   `strip?` drops the mount prefix before the handler sees it, which /s3,
 *   /git and /issues need because their wire formats are rooted at the mount
 *   point. /ipfs, /ipns, /xrpc and /pins carry protocol-inherent prefixes their
 *   handlers expect to receive intact.
 */
kotobase.protocols.router.default_prefixes = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/ipfs/","ipfs",false], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/ipns/","ipfs",false], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/xrpc/","atproto",false], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/pins","pinning",false], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/s3/","s3",true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/git/","git",true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/issues/","issues",true], null)], null);
/**
 * Every surface this request may reach. Unlike the facade's version there is
 *   nothing to merge with: the shell's `:surfaces` is the registry.
 */
kotobase.protocols.router.surfaces_for = (function kotobase$protocols$router$surfaces_for(ctx){
var or__5162__auto__ = new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421).cljs$core$IFn$_invoke$arity$1(ctx);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});
/**
 * "s3.kotobase.net" + apex "kotobase.net" → "s3"; nil when host
 *   is not a single label in front of the apex.
 */
kotobase.protocols.router.surface_of = (function kotobase$protocols$router$surface_of(host,apex){
if(cljs.core.truth_((function (){var and__5160__auto__ = host;
if(cljs.core.truth_(and__5160__auto__)){
return clojure.string.ends_with_QMARK_(host,(""+"."+cljs.core.str.cljs$core$IFn$_invoke$arity$1(apex)));
} else {
return and__5160__auto__;
}
})())){
var label = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(host,(0),(cljs.core.count(host) - (cljs.core.count(apex) + (1))));
if(((cljs.core.seq(label)) && ((!(clojure.string.includes_QMARK_(label,".")))))){
return label;
} else {
return null;
}
} else {
return null;
}
});
kotobase.protocols.router.strip_prefix = (function kotobase$protocols$router$strip_prefix(req,prefix){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(req,new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req),cljs.core.count(prefix)));
});
/**
 * A shell-injected single-origin mount, checked before the built-in
 *   prefixes so a shell can mount /sparql or /cypher on the one hostname it
 *   owns. The prefix is NOT stripped: those protocols specify their own
 *   absolute paths (SPARQL 1.1 Protocol, Neo4j's
 *   /db/data/transaction/commit) and stripping would break the handlers'
 *   own path checks.
 */
kotobase.protocols.router.mounted = (function kotobase$protocols$router$mounted(ctx,req){
var all = kotobase.protocols.router.surfaces_for(ctx);
var path = (function (){var or__5162__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})();
return cljs.core.some((function (p__10858){
var vec__10859 = p__10858;
var prefix = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10859,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10859,(1),null);
if(clojure.string.starts_with_QMARK_(path,prefix)){
var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(all,label);
if(cljs.core.truth_(temp__5825__auto__)){
var h = temp__5825__auto__;
return (h.cljs$core$IFn$_invoke$arity$2 ? h.cljs$core$IFn$_invoke$arity$2(ctx,req) : h.call(null,ctx,req));
} else {
return null;
}
} else {
return null;
}
}),new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274).cljs$core$IFn$_invoke$arity$1(ctx));
});
/**
 * Route `req` to its protocol surface. ctx: {:store ... :now ...
 *   :apex "kotobase.net" :surfaces {label handler} :path-surfaces
 *   {prefix label}}.
 */
kotobase.protocols.router.handle = (function kotobase$protocols$router$handle(p__10862,req){
var map__10863 = p__10862;
var map__10863__$1 = cljs.core.__destructure_map(map__10863);
var ctx = map__10863__$1;
var apex = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__10863__$1,new cljs.core.Keyword(null,"apex","apex",328192413),"kotobase.net");
var path = (function (){var or__5162__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})();
var all = kotobase.protocols.router.surfaces_for(ctx);
var surface = kotobase.protocols.router.surface_of(new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(req),apex);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/health",path)) && (cljs.core.contains_QMARK_(all,surface)))))){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),new cljs.core.PersistentArrayMap(null, 2, ["content-type","application/edn; charset=utf-8","cache-control","no-store"], null),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ok","ok",967785236),true,new cljs.core.Keyword(null,"service","service",-1963054559),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1((""+"kotobase.protocols/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(surface))),new cljs.core.Keyword(null,"surface","surface",699915646),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(surface),new cljs.core.Keyword(null,"apex","apex",328192413),apex], null)], 0)));
} else {
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(all,surface);
if(cljs.core.truth_(temp__5823__auto__)){
var handler = temp__5823__auto__;
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(ctx,req) : handler.call(null,ctx,req));
} else {
var or__5162__auto__ = kotobase.protocols.router.mounted(ctx,req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
var temp__5823__auto____$1 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__10864){
var vec__10865 = p__10864;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10865,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10865,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10865,(2),null);
var and__5160__auto__ = clojure.string.starts_with_QMARK_(path,p);
if(and__5160__auto__){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(all,l);
} else {
return and__5160__auto__;
}
}),kotobase.protocols.router.default_prefixes));
if(cljs.core.truth_(temp__5823__auto____$1)){
var vec__10868 = temp__5823__auto____$1;
var prefix = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10868,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10868,(1),null);
var strip_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10868,(2),null);
var G__10872 = ctx;
var G__10873 = (cljs.core.truth_(strip_QMARK_)?kotobase.protocols.router.strip_prefix(req,cljs.core.subs.cljs$core$IFn$_invoke$arity$3(prefix,(0),(cljs.core.count(prefix) - (1)))):req);
var fexpr__10871 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(all,label);
return (fexpr__10871.cljs$core$IFn$_invoke$arity$2 ? fexpr__10871.cljs$core$IFn$_invoke$arity$2(G__10872,G__10873) : fexpr__10871.call(null,G__10872,G__10873));
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1("no protocol surface for this host/path");
}
}
}
}
});

//# sourceMappingURL=kotobase.protocols.router.js.map
