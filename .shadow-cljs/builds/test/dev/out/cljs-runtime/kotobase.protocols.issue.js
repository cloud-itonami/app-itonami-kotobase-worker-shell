goog.provide('kotobase.protocols.issue');
kotobase.protocols.issue.issues_coll = (function kotobase$protocols$issue$issues_coll(repo){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.issue","issues","kotobase.issue/issues",-737470366),repo], null);
});
kotobase.protocols.issue.proposals_coll = (function kotobase$protocols$issue$proposals_coll(repo){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.issue","proposals","kotobase.issue/proposals",223765291),repo], null);
});
kotobase.protocols.issue.reviews_coll = (function kotobase$protocols$issue$reviews_coll(repo){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.issue","reviews","kotobase.issue/reviews",2069902558),repo], null);
});
kotobase.protocols.issue.valid_verdicts = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["request-changes",null,"reject",null,"approve",null], null), null);
kotobase.protocols.issue.edn_response = (function kotobase$protocols$issue$edn_response(status,m){
return kotobase.protocols.http.response.cljs$core$IFn$_invoke$arity$3(status,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/edn"], null),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([m], 0)));
});
kotobase.protocols.issue.issue_error = (function kotobase$protocols$issue$issue_error(status,reason){
return kotobase.protocols.issue.edn_response(status,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),reason], null));
});
kotobase.protocols.issue.audit_BANG_ = (function kotobase$protocols$issue$audit_BANG_(store,repo,op,id){
return kotobase.store._append(store,new cljs.core.Keyword("kotobase.protocols","audit","kotobase.protocols/audit",-1547253939),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"surface","surface",699915646),new cljs.core.Keyword(null,"issue","issue",1725456421),new cljs.core.Keyword(null,"op","op",-1882987955),op,new cljs.core.Keyword(null,"repo","repo",-1999060679),repo,new cljs.core.Keyword(null,"id","id",-1388402092),id], null));
});
/**
 * Monotonic id, scoped per-repo, via the same append-a-throwaway-event
 *   trick `kotobase.protocols.ipfs-pinning/next-seq!` uses — keeps this
 *   namespace a pure function of the injected store, no local counter
 *   state to lose across Worker invocations.
 */
kotobase.protocols.issue.next_id_BANG_ = (function kotobase$protocols$issue$next_id_BANG_(store,repo){
return (""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"seq","seq",-1817803783).cljs$core$IFn$_invoke$arity$1(kotobase.store._append(store,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("kotobase.issue","id-seq","kotobase.issue/id-seq",-1442036141),repo], null),cljs.core.PersistentArrayMap.EMPTY))));
});
kotobase.protocols.issue.parse_body = (function kotobase$protocols$issue$parse_body(req){
try{return clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1((function (){var or__5162__auto__ = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return "{}";
}
})());
}catch (e14953){var _ = e14953;
return null;
}});
kotobase.protocols.issue.issue__GT_edn = (function kotobase$protocols$issue$issue__GT_edn(p__14954){
var map__14955 = p__14954;
var map__14955__$1 = cljs.core.__destructure_map(map__14955);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14955__$1,new cljs.core.Keyword("issue","id","issue/id",-1288019621));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14955__$1,new cljs.core.Keyword("issue","title","issue/title",737339144));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14955__$1,new cljs.core.Keyword("issue","body","issue/body",2011067204));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14955__$1,new cljs.core.Keyword("issue","status","issue/status",2129311486));
var author = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14955__$1,new cljs.core.Keyword("issue","author","issue/author",1939041495));
var created = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14955__$1,new cljs.core.Keyword("issue","created","issue/created",-805409215));
var G__14956 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"title","title",636505583),title,new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"created","created",-704993748),created], null);
var G__14956__$1 = (cljs.core.truth_(body)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14956,new cljs.core.Keyword(null,"body","body",-2049205669),body):G__14956);
if(cljs.core.truth_(author)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14956__$1,new cljs.core.Keyword(null,"author","author",2111686192),author);
} else {
return G__14956__$1;
}
});
kotobase.protocols.issue.proposal__GT_edn = (function kotobase$protocols$issue$proposal__GT_edn(p__14957){
var map__14958 = p__14957;
var map__14958__$1 = cljs.core.__destructure_map(map__14958);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14958__$1,new cljs.core.Keyword("proposal","id","proposal/id",-393404606));
var issue_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14958__$1,new cljs.core.Keyword("proposal","issue-id","proposal/issue-id",24794383));
var rationale = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14958__$1,new cljs.core.Keyword("proposal","rationale","proposal/rationale",356024752));
var risk = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14958__$1,new cljs.core.Keyword("proposal","risk","proposal/risk",887979804));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14958__$1,new cljs.core.Keyword("proposal","status","proposal/status",1069414629));
var author = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14958__$1,new cljs.core.Keyword("proposal","author","proposal/author",950545086));
var created = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14958__$1,new cljs.core.Keyword("proposal","created","proposal/created",-1905708262));
var G__14959 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"issue-id","issue-id",-976697347),issue_id,new cljs.core.Keyword(null,"rationale","rationale",-827383118),rationale,new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"created","created",-704993748),created], null);
var G__14959__$1 = (cljs.core.truth_(risk)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14959,new cljs.core.Keyword(null,"risk","risk",2004621358),risk):G__14959);
if(cljs.core.truth_(author)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14959__$1,new cljs.core.Keyword(null,"author","author",2111686192),author);
} else {
return G__14959__$1;
}
});
kotobase.protocols.issue.review__GT_edn = (function kotobase$protocols$issue$review__GT_edn(p__14960){
var map__14961 = p__14960;
var map__14961__$1 = cljs.core.__destructure_map(map__14961);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14961__$1,new cljs.core.Keyword("review","id","review/id",-167271716));
var proposal_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14961__$1,new cljs.core.Keyword("review","proposal-id","review/proposal-id",-2133716325));
var verdict = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14961__$1,new cljs.core.Keyword("review","verdict","review/verdict",257331598));
var comment = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14961__$1,new cljs.core.Keyword("review","comment","review/comment",394775117));
var reviewer = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14961__$1,new cljs.core.Keyword("review","reviewer","review/reviewer",-33371918));
var created = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14961__$1,new cljs.core.Keyword("review","created","review/created",-1377067324));
var G__14962 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"proposal-id","proposal-id",2019625155),proposal_id,new cljs.core.Keyword(null,"verdict","verdict",1468502582),verdict,new cljs.core.Keyword(null,"created","created",-704993748),created], null);
var G__14962__$1 = (cljs.core.truth_(comment)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14962,new cljs.core.Keyword(null,"comment","comment",532206069),comment):G__14962);
if(cljs.core.truth_(reviewer)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__14962__$1,new cljs.core.Keyword(null,"reviewer","reviewer",88854586),reviewer);
} else {
return G__14962__$1;
}
});
kotobase.protocols.issue.list_coll = (function kotobase$protocols$issue$list_coll(store,coll){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (id){
var temp__5825__auto__ = kotobase.store._get(store,coll,id);
if(cljs.core.truth_(temp__5825__auto__)){
var d = temp__5825__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,d], null);
} else {
return null;
}
}),cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.store._list(store,coll)));
});
kotobase.protocols.issue.create_issue = (function kotobase$protocols$issue$create_issue(store,now,repo,body){
var map__14963 = body;
var map__14963__$1 = cljs.core.__destructure_map(map__14963);
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14963__$1,new cljs.core.Keyword(null,"title","title",636505583));
var body_text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14963__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var author = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14963__$1,new cljs.core.Keyword(null,"author","author",2111686192));
if((!(typeof title === 'string'))){
return kotobase.protocols.issue.issue_error((400),"title is required");
} else {
var id = kotobase.protocols.issue.next_id_BANG_(store,repo);
var doc = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword("issue","id","issue/id",-1288019621),id,new cljs.core.Keyword("issue","title","issue/title",737339144),title,new cljs.core.Keyword("issue","body","issue/body",2011067204),body_text,new cljs.core.Keyword("issue","status","issue/status",2129311486),"open",new cljs.core.Keyword("issue","author","issue/author",1939041495),author,new cljs.core.Keyword("issue","created","issue/created",-805409215),now], null);
kotobase.store._put(store,kotobase.protocols.issue.issues_coll(repo),id,doc);

kotobase.protocols.issue.audit_BANG_(store,repo,new cljs.core.Keyword(null,"create-issue","create-issue",69105034),id);

return kotobase.protocols.issue.edn_response((201),kotobase.protocols.issue.issue__GT_edn(doc));
}
});
kotobase.protocols.issue.get_issue = (function kotobase$protocols$issue$get_issue(store,repo,id){
var temp__5823__auto__ = kotobase.store._get(store,kotobase.protocols.issue.issues_coll(repo),id);
if(cljs.core.truth_(temp__5823__auto__)){
var doc = temp__5823__auto__;
var proposal_ids = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__14964){
var vec__14965 = p__14964;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14965,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14965,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,new cljs.core.Keyword("proposal","issue-id","proposal/issue-id",24794383).cljs$core$IFn$_invoke$arity$1(p));
}),kotobase.protocols.issue.list_coll(store,kotobase.protocols.issue.proposals_coll(repo))));
return kotobase.protocols.issue.edn_response((200),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(kotobase.protocols.issue.issue__GT_edn(doc),new cljs.core.Keyword(null,"proposal-ids","proposal-ids",-1841813459),cljs.core.vec(proposal_ids)));
} else {
return kotobase.protocols.issue.issue_error((404),"issue not found");
}
});
kotobase.protocols.issue.list_issues = (function kotobase$protocols$issue$list_issues(store,repo,req){
var status_filter = kotobase.protocols.http.query_param(req,"status");
var entries = (function (){var G__14968 = kotobase.protocols.issue.list_coll(store,kotobase.protocols.issue.issues_coll(repo));
if(cljs.core.truth_(status_filter)){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__14969){
var vec__14970 = p__14969;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14970,(0),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14970,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(status_filter,new cljs.core.Keyword("issue","status","issue/status",2129311486).cljs$core$IFn$_invoke$arity$1(d));
}),G__14968);
} else {
return G__14968;
}
})();
return kotobase.protocols.issue.edn_response((200),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"count","count",2139924085),cljs.core.count(entries),new cljs.core.Keyword(null,"results","results",-1134170113),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__14973){
var vec__14974 = p__14973;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14974,(0),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14974,(1),null);
return kotobase.protocols.issue.issue__GT_edn(d);
}),entries)], null));
});
kotobase.protocols.issue.create_proposal = (function kotobase$protocols$issue$create_proposal(store,now,repo,issue_id,body){
if(cljs.core.not(kotobase.store._get(store,kotobase.protocols.issue.issues_coll(repo),issue_id))){
return kotobase.protocols.issue.issue_error((404),"issue not found");
} else {
var map__14977 = body;
var map__14977__$1 = cljs.core.__destructure_map(map__14977);
var rationale = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14977__$1,new cljs.core.Keyword(null,"rationale","rationale",-827383118));
var risk = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14977__$1,new cljs.core.Keyword(null,"risk","risk",2004621358));
var author = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14977__$1,new cljs.core.Keyword(null,"author","author",2111686192));
if((!(typeof rationale === 'string'))){
return kotobase.protocols.issue.issue_error((400),"rationale is required");
} else {
var id = kotobase.protocols.issue.next_id_BANG_(store,repo);
var doc = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("proposal","id","proposal/id",-393404606),id,new cljs.core.Keyword("proposal","issue-id","proposal/issue-id",24794383),issue_id,new cljs.core.Keyword("proposal","rationale","proposal/rationale",356024752),rationale,new cljs.core.Keyword("proposal","risk","proposal/risk",887979804),risk,new cljs.core.Keyword("proposal","status","proposal/status",1069414629),"open",new cljs.core.Keyword("proposal","author","proposal/author",950545086),author,new cljs.core.Keyword("proposal","created","proposal/created",-1905708262),now], null);
kotobase.store._put(store,kotobase.protocols.issue.proposals_coll(repo),id,doc);

kotobase.protocols.issue.audit_BANG_(store,repo,new cljs.core.Keyword(null,"propose","propose",-1884570868),id);

return kotobase.protocols.issue.edn_response((201),kotobase.protocols.issue.proposal__GT_edn(doc));
}
}
});
kotobase.protocols.issue.get_proposal = (function kotobase$protocols$issue$get_proposal(store,repo,id){
var temp__5823__auto__ = kotobase.store._get(store,kotobase.protocols.issue.proposals_coll(repo),id);
if(cljs.core.truth_(temp__5823__auto__)){
var doc = temp__5823__auto__;
var reviews = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__14978){
var vec__14979 = p__14978;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14979,(0),null);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14979,(1),null);
return kotobase.protocols.issue.review__GT_edn(r);
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__14982){
var vec__14983 = p__14982;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14983,(0),null);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14983,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,new cljs.core.Keyword("review","proposal-id","review/proposal-id",-2133716325).cljs$core$IFn$_invoke$arity$1(r));
}),kotobase.protocols.issue.list_coll(store,kotobase.protocols.issue.reviews_coll(repo))));
return kotobase.protocols.issue.edn_response((200),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(kotobase.protocols.issue.proposal__GT_edn(doc),new cljs.core.Keyword(null,"reviews","reviews",-315606921),cljs.core.vec(reviews)));
} else {
return kotobase.protocols.issue.issue_error((404),"proposal not found");
}
});
kotobase.protocols.issue.create_review = (function kotobase$protocols$issue$create_review(store,now,repo,proposal_id,body){
if(cljs.core.not(kotobase.store._get(store,kotobase.protocols.issue.proposals_coll(repo),proposal_id))){
return kotobase.protocols.issue.issue_error((404),"proposal not found");
} else {
var map__14986 = body;
var map__14986__$1 = cljs.core.__destructure_map(map__14986);
var verdict = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14986__$1,new cljs.core.Keyword(null,"verdict","verdict",1468502582));
var comment = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14986__$1,new cljs.core.Keyword(null,"comment","comment",532206069));
var reviewer = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14986__$1,new cljs.core.Keyword(null,"reviewer","reviewer",88854586));
if((!(cljs.core.contains_QMARK_(kotobase.protocols.issue.valid_verdicts,verdict)))){
return kotobase.protocols.issue.issue_error((400),(""+"verdict must be one of "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",cljs.core.sort.cljs$core$IFn$_invoke$arity$1(kotobase.protocols.issue.valid_verdicts)))));
} else {
var id = kotobase.protocols.issue.next_id_BANG_(store,repo);
var doc = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword("review","id","review/id",-167271716),id,new cljs.core.Keyword("review","proposal-id","review/proposal-id",-2133716325),proposal_id,new cljs.core.Keyword("review","verdict","review/verdict",257331598),verdict,new cljs.core.Keyword("review","comment","review/comment",394775117),comment,new cljs.core.Keyword("review","reviewer","review/reviewer",-33371918),reviewer,new cljs.core.Keyword("review","created","review/created",-1377067324),now], null);
kotobase.store._put(store,kotobase.protocols.issue.reviews_coll(repo),id,doc);

kotobase.protocols.issue.audit_BANG_(store,repo,new cljs.core.Keyword(null,"review","review",1101692435),id);

return kotobase.protocols.issue.edn_response((201),kotobase.protocols.issue.review__GT_edn(doc));
}

}
});
kotobase.protocols.issue.approved_QMARK_ = (function kotobase$protocols$issue$approved_QMARK_(store,repo,proposal_id){
return (!((cljs.core.some((function (p__14987){
var vec__14988 = p__14987;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14988,(0),null);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14988,(1),null);
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(proposal_id,new cljs.core.Keyword("review","proposal-id","review/proposal-id",-2133716325).cljs$core$IFn$_invoke$arity$1(r))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("approve",new cljs.core.Keyword("review","verdict","review/verdict",257331598).cljs$core$IFn$_invoke$arity$1(r))));
}),kotobase.protocols.issue.list_coll(store,kotobase.protocols.issue.reviews_coll(repo))) == null)));
});
kotobase.protocols.issue.merge_proposal = (function kotobase$protocols$issue$merge_proposal(store,repo,proposal_id){
var doc = kotobase.store._get(store,kotobase.protocols.issue.proposals_coll(repo),proposal_id);
if((doc == null)){
return kotobase.protocols.issue.issue_error((404),"proposal not found");
} else {
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("open",new cljs.core.Keyword("proposal","status","proposal/status",1069414629).cljs$core$IFn$_invoke$arity$1(doc))){
return kotobase.protocols.issue.issue_error((409),(""+"proposal already "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("proposal","status","proposal/status",1069414629).cljs$core$IFn$_invoke$arity$1(doc))));
} else {
if((!(kotobase.protocols.issue.approved_QMARK_(store,repo,proposal_id)))){
return kotobase.protocols.issue.issue_error((409),"no approving review yet");
} else {
var merged = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(doc,new cljs.core.Keyword("proposal","status","proposal/status",1069414629),"merged");
kotobase.store._put(store,kotobase.protocols.issue.proposals_coll(repo),proposal_id,merged);

kotobase.protocols.issue.audit_BANG_(store,repo,new cljs.core.Keyword(null,"merge","merge",-1804319409),proposal_id);

return kotobase.protocols.issue.edn_response((200),kotobase.protocols.issue.proposal__GT_edn(merged));

}
}
}
});
/**
 * First 2 segments joined as "org/repo", remaining segments as a
 *   vector — mirrors the org/repo convention every product repo in this
 *   workspace already uses (gftdcojp/local-manimani etc), simpler than
 *   git.cljc's variable-depth scan since issue tracking has no nested-path
 *   use case to support.
 */
kotobase.protocols.issue.repo_PLUS_rest = (function kotobase$protocols$issue$repo_PLUS_rest(segs){
if((cljs.core.count(segs) >= (3))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(segs,(0),(2))),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(segs,(2))], null);
} else {
return null;
}
});
/**
 * ctx: {:store IStore :now ISO-string}.
 */
kotobase.protocols.issue.handle = (function kotobase$protocols$issue$handle(p__14991,req){
var map__14992 = p__14991;
var map__14992__$1 = cljs.core.__destructure_map(map__14992);
var store = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14992__$1,new cljs.core.Keyword(null,"store","store",1512230022));
var now = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14992__$1,new cljs.core.Keyword(null,"now","now",-1650525531));
var segs = kotobase.protocols.http.segments(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(req));
var method = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
var temp__5823__auto__ = kotobase.protocols.issue.repo_PLUS_rest(segs);
if(cljs.core.truth_(temp__5823__auto__)){
var vec__14993 = temp__5823__auto__;
var repo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14993,(0),null);
var rest = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14993,(1),null);
var n = cljs.core.count(rest);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("issues",cljs.core.first(rest))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),method)))))){
var body = kotobase.protocols.issue.parse_body(req);
if((body == null)){
return kotobase.protocols.issue.issue_error((400),"malformed EDN body");
} else {
return kotobase.protocols.issue.create_issue(store,now,repo,body);
}
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("issues",cljs.core.first(rest))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),method)))))){
return kotobase.protocols.issue.list_issues(store,repo,req);
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("issues",cljs.core.first(rest))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),method)))))){
return kotobase.protocols.issue.get_issue(store,repo,cljs.core.second(rest));
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("issues",cljs.core.first(rest))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("proposals",cljs.core.nth.cljs$core$IFn$_invoke$arity$2(rest,(2)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),method)))))))){
var body = kotobase.protocols.issue.parse_body(req);
if((body == null)){
return kotobase.protocols.issue.issue_error((400),"malformed EDN body");
} else {
return kotobase.protocols.issue.create_proposal(store,now,repo,cljs.core.second(rest),body);
}
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("proposals",cljs.core.first(rest))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get","get",1683182755),method)))))){
return kotobase.protocols.issue.get_proposal(store,repo,cljs.core.second(rest));
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("proposals",cljs.core.first(rest))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("reviews",cljs.core.nth.cljs$core$IFn$_invoke$arity$2(rest,(2)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),method)))))))){
var body = kotobase.protocols.issue.parse_body(req);
if((body == null)){
return kotobase.protocols.issue.issue_error((400),"malformed EDN body");
} else {
return kotobase.protocols.issue.create_review(store,now,repo,cljs.core.second(rest),body);
}
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),n)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("proposals",cljs.core.first(rest))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("merge",cljs.core.nth.cljs$core$IFn$_invoke$arity$2(rest,(2)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"post","post",269697687),method)))))))){
return kotobase.protocols.issue.merge_proposal(store,repo,cljs.core.second(rest));
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$0();

}
}
}
}
}
}
}
} else {
return kotobase.protocols.http.not_found.cljs$core$IFn$_invoke$arity$1("org/repo path required, e.g. /gftdcojp/local-manimani/issues");
}
});

//# sourceMappingURL=kotobase.protocols.issue.js.map
