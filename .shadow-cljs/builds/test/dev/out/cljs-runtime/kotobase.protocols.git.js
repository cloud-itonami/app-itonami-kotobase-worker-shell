goog.provide('kotobase.protocols.git');
kotobase.protocols.git.refs_coll = (function kotobase$protocols$git$refs_coll(repo){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.git","refs","kotobase.git/refs",1079268372),repo], null);
});
kotobase.protocols.git.objects_coll = (function kotobase$protocols$git$objects_coll(repo){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.git","objects","kotobase.git/objects",435635114),repo], null);
});
/**
 * Store loose-object `bytes` for `sha` (40 hex chars) in `repo`.
 */
kotobase.protocols.git.put_object_BANG_ = (function kotobase$protocols$git$put_object_BANG_(store,repo,sha,bytes){
if(cljs.core.truth_(cljs.core.re_matches(/[0-9a-f]{40}/,sha))){
} else {
throw (new Error("Assert failed: (re-matches #\"[0-9a-f]{40}\" sha)"));
}

kotobase.store._put(store,kotobase.protocols.git.objects_coll(repo),sha,bytes);

kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"git","git",-163493751),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"put-object","put-object",-47597800),new cljs.core.Keyword(null,"repo","repo",-1999060679),repo,new cljs.core.Keyword(null,"sha","sha",-950317251),sha], null));

return sha;
});
/**
 * Point `refname` (e.g. "refs/heads/main") at `sha` in `repo`.
 */
kotobase.protocols.git.set_ref_BANG_ = (function kotobase$protocols$git$set_ref_BANG_(store,repo,refname,sha){
kotobase.store._put(store,kotobase.protocols.git.refs_coll(repo),refname,sha);

kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"git","git",-163493751),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"set-ref","set-ref",1822254458),new cljs.core.Keyword(null,"repo","repo",-1999060679),repo,new cljs.core.Keyword(null,"ref","ref",1289896967),refname,new cljs.core.Keyword(null,"sha","sha",-950317251),sha], null));

return sha;
});
/**
 * Make HEAD a symref to `branch-ref` (e.g. "refs/heads/main").
 */
kotobase.protocols.git.set_head_BANG_ = (function kotobase$protocols$git$set_head_BANG_(store,repo,branch_ref){
return kotobase.store._put(store,kotobase.protocols.git.refs_coll(repo),"HEAD",(""+"ref: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(branch_ref)));
});
kotobase.protocols.git.info_refs = (function kotobase$protocols$git$info_refs(store,repo){
var refnames = cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__14911_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("HEAD",p1__14911_SHARP_);
}),kotobase.store._list(store,kotobase.protocols.git.refs_coll(repo))));
if(cljs.core.empty_QMARK_(refnames)){
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1((""+"repository not found: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(repo)));
} else {
return kotobase.protocols.http.text((200),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,(function (){var iter__5649__auto__ = (function kotobase$protocols$git$info_refs_$_iter__14912(s__14913){
return (new cljs.core.LazySeq(null,(function (){
var s__14913__$1 = s__14913;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__14913__$1);
if(temp__5825__auto__){
var s__14913__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14913__$2)){
var c__5647__auto__ = cljs.core.chunk_first(s__14913__$2);
var size__5648__auto__ = cljs.core.count(c__5647__auto__);
var b__14915 = cljs.core.chunk_buffer(size__5648__auto__);
if((function (){var i__14914 = (0);
while(true){
if((i__14914 < size__5648__auto__)){
var r = cljs.core._nth(c__5647__auto__,i__14914);
cljs.core.chunk_append(b__14915,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.store._get(store,kotobase.protocols.git.refs_coll(repo),r))+"\t"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(r)+"\n"));

var G__14928 = (i__14914 + (1));
i__14914 = G__14928;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14915),kotobase$protocols$git$info_refs_$_iter__14912(cljs.core.chunk_rest(s__14913__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14915),null);
}
} else {
var r = cljs.core.first(s__14913__$2);
return cljs.core.cons((""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(kotobase.store._get(store,kotobase.protocols.git.refs_coll(repo),r))+"\t"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(r)+"\n"),kotobase$protocols$git$info_refs_$_iter__14912(cljs.core.rest(s__14913__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5649__auto__(refnames);
})()));
}
});
kotobase.protocols.git.head_line = (function kotobase$protocols$git$head_line(store,repo){
var temp__5823__auto__ = kotobase.store._get(store,kotobase.protocols.git.refs_coll(repo),"HEAD");
if(cljs.core.truth_(temp__5823__auto__)){
var h = temp__5823__auto__;
return kotobase.protocols.http.text((200),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(h)+"\n"));
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1((""+"repository not found: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(repo)));
}
});
kotobase.protocols.git.loose_object = (function kotobase$protocols$git$loose_object(store,repo,d2,d38){
var sha = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(d2)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(d38));
var stored = kotobase.store._get(store,kotobase.protocols.git.objects_coll(repo),sha);
if((stored == null)){
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1((""+"object not found: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(sha)));
} else {
if(cljs.core.map_QMARK_(stored)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/x-git-loose-object"], null),new cljs.core.Keyword(null,"b64","b64",2079087092).cljs$core$IFn$_invoke$arity$1(stored)),new cljs.core.Keyword(null,"body-encoding","body-encoding",-1446963485),new cljs.core.Keyword(null,"base64","base64",167760174));
} else {
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3((200),new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/x-git-loose-object"], null),stored);

}
}
});
kotobase.protocols.git.base64_body_QMARK_ = (function kotobase$protocols$git$base64_body_QMARK_(req){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("base64",kotobase.protocols.http.header(req,"x-kotobase-body"));
});
/**
 * [… "objects" "aa" "38hex"] tail?
 */
kotobase.protocols.git.object_path_QMARK_ = (function kotobase$protocols$git$object_path_QMARK_(segs,n){
var and__5160__auto__ = (n >= (4));
if(and__5160__auto__){
var and__5160__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("objects",(function (){var G__14916 = (n - (3));
return (segs.cljs$core$IFn$_invoke$arity$1 ? segs.cljs$core$IFn$_invoke$arity$1(G__14916) : segs.call(null,G__14916));
})());
if(and__5160__auto____$1){
var and__5160__auto____$2 = cljs.core.re_matches(/[0-9a-f]{2}/,(function (){var G__14917 = (n - (2));
return (segs.cljs$core$IFn$_invoke$arity$1 ? segs.cljs$core$IFn$_invoke$arity$1(G__14917) : segs.call(null,G__14917));
})());
if(cljs.core.truth_(and__5160__auto____$2)){
return cljs.core.re_matches(/[0-9a-f]{38}/,(function (){var G__14918 = (n - (1));
return (segs.cljs$core$IFn$_invoke$arity$1 ? segs.cljs$core$IFn$_invoke$arity$1(G__14918) : segs.call(null,G__14918));
})());
} else {
return and__5160__auto____$2;
}
} else {
return and__5160__auto____$1;
}
} else {
return and__5160__auto__;
}
});
kotobase.protocols.git.handle_get = (function kotobase$protocols$git$handle_get(store,segs,n){
if((((n >= (3))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["info","refs"], null),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(segs,(n - (2))))))){
return kotobase.protocols.git.info_refs(store,clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(segs,(0),(n - (2)))));
} else {
if((((n >= (2))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("HEAD",cljs.core.peek(segs))))){
return kotobase.protocols.git.head_line(store,clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(segs,(0),(n - (1)))));
} else {
if((((n >= (4))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["objects","info","packs"], null),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(segs,(n - (3))))))){
return kotobase.protocols.http.text((200),"");
} else {
if((((n >= (4))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["objects","info","alternates"], null),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(segs,(n - (3))))))){
return kotobase.protocols.http.text((200),"");
} else {
if(cljs.core.truth_(kotobase.protocols.git.object_path_QMARK_(segs,n))){
return kotobase.protocols.git.loose_object(store,clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(segs,(0),(n - (3)))),(function (){var G__14919 = (n - (2));
return (segs.cljs$core$IFn$_invoke$arity$1 ? segs.cljs$core$IFn$_invoke$arity$1(G__14919) : segs.call(null,G__14919));
})(),(function (){var G__14920 = (n - (1));
return (segs.cljs$core$IFn$_invoke$arity$1 ? segs.cljs$core$IFn$_invoke$arity$1(G__14920) : segs.call(null,G__14920));
})());
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();

}
}
}
}
}
});
/**
 * HTTP write surface (the deploy shell's write auth gates every PUT).
 *   Bodies with header `x-kotobase-body: base64` are stored as
 *   {:b64 …} and served back with :body-encoding :base64.
 */
kotobase.protocols.git.handle_put = (function kotobase$protocols$git$handle_put(store,req,segs,n){
var body = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if((((n >= (2))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("HEAD",cljs.core.peek(segs))) && (cljs.core.not_any_QMARK_((function (p1__14921_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("refs",p1__14921_SHARP_);
}),segs)))))){
var repo = clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(segs,(0),(n - (1))));
if(cljs.core.truth_((function (){var and__5160__auto__ = body;
if(cljs.core.truth_(and__5160__auto__)){
return clojure.string.starts_with_QMARK_(body,"ref: refs/");
} else {
return and__5160__auto__;
}
})())){
kotobase.store._put(store,kotobase.protocols.git.refs_coll(repo),"HEAD",clojure.string.trim(body));

return kotobase.protocols.http.text((200),"ok");
} else {
return kotobase.protocols.http.text((400),"HEAD body must be a 'ref: refs/\u2026' symref line");
}
} else {
if(cljs.core.truth_(kotobase.protocols.git.object_path_QMARK_(segs,n))){
var repo = clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(segs,(0),(n - (3))));
var sha = (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__14922 = (n - (2));
return (segs.cljs$core$IFn$_invoke$arity$1 ? segs.cljs$core$IFn$_invoke$arity$1(G__14922) : segs.call(null,G__14922));
})())+cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__14923 = (n - (1));
return (segs.cljs$core$IFn$_invoke$arity$1 ? segs.cljs$core$IFn$_invoke$arity$1(G__14923) : segs.call(null,G__14923));
})()));
if(cljs.core.seq(body)){
kotobase.store._put(store,kotobase.protocols.git.objects_coll(repo),sha,((kotobase.protocols.git.base64_body_QMARK_(req))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"b64","b64",2079087092),body], null):body));

kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"git","git",-163493751),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"put-object","put-object",-47597800),new cljs.core.Keyword(null,"repo","repo",-1999060679),repo,new cljs.core.Keyword(null,"sha","sha",-950317251),sha], null));

return kotobase.protocols.http.text((200),sha);
} else {
return kotobase.protocols.http.text((400),"empty object body");
}
} else {
var temp__5823__auto__ = cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,s){
if((((i > (0))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("refs",s)))){
return i;
} else {
return null;
}
}),segs));
if(cljs.core.truth_(temp__5823__auto__)){
var i = temp__5823__auto__;
var repo = clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(segs,(0),i));
var refname = clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(segs,i));
var sha = (function (){var G__14924 = body;
if((G__14924 == null)){
return null;
} else {
return clojure.string.trim(G__14924);
}
})();
if(cljs.core.truth_((function (){var and__5160__auto__ = sha;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.re_matches(/[0-9a-f]{40}/,sha);
} else {
return and__5160__auto__;
}
})())){
kotobase.protocols.git.set_ref_BANG_(store,repo,refname,sha);

return kotobase.protocols.http.text((200),sha);
} else {
return kotobase.protocols.http.text((400),"ref body must be a 40-hex sha");
}
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();
}

}
}
});
/**
 * git dumb-HTTP handler: GET serves clone/fetch, PUT seeds
 *   refs/objects/HEAD. Repo path = every segment before the protocol
 *   suffix, joined with '/', so org/repo nesting works.
 */
kotobase.protocols.git.handle = (function kotobase$protocols$git$handle(p__14925,req){
var map__14926 = p__14925;
var map__14926__$1 = cljs.core.__destructure_map(map__14926);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14926__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var segs = kotobase.protocols.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req));
var n = cljs.core.count(segs);
var G__14927 = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var G__14927__$1 = (((G__14927 instanceof cljs.core.Keyword))?G__14927.fqn:null);
switch (G__14927__$1) {
case "get":
return kotobase.protocols.git.handle_get(store,segs,n);

break;
case "put":
return kotobase.protocols.git.handle_put(store,req,segs,n);

break;
default:
return kotobase.protocols.http.method_not_allowed();

}
});

//# sourceMappingURL=kotobase.protocols.git.js.map
