goog.provide('kotobase_protocols_worker.graph');
kotobase_protocols_worker.graph.shared_graph = "kotobase-protocols-v2";
kotobase_protocols_worker.graph.atproto_record_nsids = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["com.atproto.repo.deleteRecord",null,"com.atproto.repo.listRecords",null,"com.atproto.repo.putRecord",null,"com.atproto.repo.getRecord",null], null), null);
/**
 * Same host/path shape kotobase.protocols.router uses to route to the
 *   atproto handler — checked independently here so the per-DID rules
 *   (this ns and kotobase-protocols-worker.cacao) apply to exactly the
 *   requests that will land on that surface.
 */
kotobase_protocols_worker.graph.atproto_surface_QMARK_ = (function kotobase_protocols_worker$graph$atproto_surface_QMARK_(req){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("atproto",kotobase.protocols.router.surface_of(new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(req),"kotobase.net"))) || (clojure.string.starts_with_QMARK_((function (){var or__5162__auto____$1 = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return "";
}
})(),"/xrpc/")));
});
kotobase_protocols_worker.graph.repo_of = (function kotobase_protocols_worker$graph$repo_of(req){
var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"query","query",-1288509510).cljs$core$IFn$_invoke$arity$1(req),"repo");
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2((function (){try{return kotobase.protocols.json.parse((function (){var or__5162__auto____$1 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto____$1)){
return or__5162__auto____$1;
} else {
return "{}";
}
})());
}catch (e8658){var _ = e8658;
return cljs.core.PersistentArrayMap.EMPTY;
}})(),"repo");
}
});
/**
 * Cheap for every non-atproto request (two checks, no parsing); only a
 *   matching atproto repo.*Record request parses its body/query for
 *   `repo` — never a large S3/ipfs binary body.
 */
kotobase_protocols_worker.graph.for_request = (function kotobase_protocols_worker$graph$for_request(req){
var or__5162__auto__ = (cljs.core.truth_((function (){var and__5160__auto__ = kotobase_protocols_worker.graph.atproto_surface_QMARK_(req);
if(and__5160__auto__){
return cljs.core.some(kotobase_protocols_worker.graph.atproto_record_nsids,clojure.string.split.cljs$core$IFn$_invoke$arity$2((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "";
}
})(),/\//));
} else {
return and__5160__auto__;
}
})())?(function (){var temp__5825__auto__ = kotobase_protocols_worker.graph.repo_of(req);
if(cljs.core.truth_(temp__5825__auto__)){
var repo = temp__5825__auto__;
return (""+"atproto-repo/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(repo));
} else {
return null;
}
})():null);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return kotobase_protocols_worker.graph.shared_graph;
}
});

//# sourceMappingURL=kotobase_protocols_worker.graph.js.map
