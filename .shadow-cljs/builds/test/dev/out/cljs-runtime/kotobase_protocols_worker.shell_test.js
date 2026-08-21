goog.provide('kotobase_protocols_worker.shell_test');
kotobase_protocols_worker.shell_test.handler = kotobase_protocols_worker.shell.make_handler(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 6, ["s3",kotobase.protocols.s3.handle,"ipfs",kotobase.protocols.ipfs.handle,"atproto",kotobase.protocols.atproto.handle,"git",kotobase.protocols.git.handle,"pinning",kotobase.protocols.ipfs_pinning.handle,"issues",kotobase.protocols.issue.handle], null),kotobase_protocols_worker.query.surfaces], 0)),new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274),kotobase_protocols_worker.query.path_surfaces], null));
kotobase_protocols_worker.shell_test.akid = "AKIDEXAMPLE";
kotobase_protocols_worker.shell_test.secret = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
kotobase_protocols_worker.shell_test.env = ({"S3_ACCESS_KEY_ID": kotobase_protocols_worker.shell_test.akid, "S3_SECRET_ACCESS_KEY": kotobase_protocols_worker.shell_test.secret});
kotobase_protocols_worker.shell_test.c = sigv4.crypto.crypto();
kotobase_protocols_worker.shell_test.amz_date = "20260725T120000Z";
kotobase_protocols_worker.shell_test.short_date = "20260725";
kotobase_protocols_worker.shell_test.region = "auto";
kotobase_protocols_worker.shell_test.body_bytes = (function kotobase_protocols_worker$shell_test$body_bytes(s){
return (new TextEncoder()).encode(s).buffer;
});
/**
 * Build a request signed the way an S3 client signs it. → Promise<req>.
 */
kotobase_protocols_worker.shell_test.sign_request = (function kotobase_protocols_worker$shell_test$sign_request(p__12560){
var map__12561 = p__12560;
var map__12561__$1 = cljs.core.__destructure_map(map__12561);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12561__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12561__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var payload_hash_p = kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_sha256_hex$arity$2(null,body);
return payload_hash_p.then((function (payload_hash){
var headers = new cljs.core.PersistentArrayMap(null, 3, ["host","s3.kotobase.net","x-amz-content-sha256",payload_hash,"x-amz-date",kotobase_protocols_worker.shell_test.amz_date], null);
var map__12562 = sigv4.core.canonical_request(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"query","query",-1288509510),"",new cljs.core.Keyword(null,"headers","headers",-835030129),headers,new cljs.core.Keyword(null,"payload-hash","payload-hash",1436757062),payload_hash], null));
var map__12562__$1 = cljs.core.__destructure_map(map__12562);
var canonical_request = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12562__$1,new cljs.core.Keyword(null,"canonical-request","canonical-request",1547947524));
var signed_headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12562__$1,new cljs.core.Keyword(null,"signed-headers","signed-headers",-1530859860));
var scope = sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$2(kotobase_protocols_worker.shell_test.short_date,kotobase_protocols_worker.shell_test.region);
var map__12563 = sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$3(kotobase_protocols_worker.shell_test.secret,kotobase_protocols_worker.shell_test.short_date,kotobase_protocols_worker.shell_test.region);
var map__12563__$1 = cljs.core.__destructure_map(map__12563);
var seed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12563__$1,new cljs.core.Keyword(null,"seed","seed",68613327));
var steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12563__$1,new cljs.core.Keyword(null,"steps","steps",-128433302));
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_sha256_hex$arity$2(null,canonical_request).then((function (cr_hash){
var sts = sigv4.core.string_to_sign(kotobase_protocols_worker.shell_test.amz_date,scope,cr_hash);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (pr,step){
return pr.then((function (p1__12557_SHARP_){
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_hmac$arity$3(null,p1__12557_SHARP_,step);
}));
}),Promise.resolve(seed),steps).then((function (p1__12558_SHARP_){
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_hmac$arity$3(null,p1__12558_SHARP_,sts);
})).then((function (p1__12559_SHARP_){
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_hex$arity$2(null,p1__12559_SHARP_);
}));
})).then((function (signature){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"query","query",-1288509510),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"body","body",-2049205669),body,new cljs.core.Keyword(null,"headers","headers",-835030129),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(headers,"authorization",sigv4.core.authorization_header(kotobase_protocols_worker.shell_test.akid,scope,signed_headers,signature))], null);
}));
}));
});
kotobase_protocols_worker.shell_test.health_answers_without_a_store_and_only_for_what_this_shell_mounts = (function kotobase_protocols_worker$shell_test$health_answers_without_a_store_and_only_for_what_this_shell_mounts(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.health_answers_without_a_store_and_only_for_what_this_shell_mounts.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.health_answers_without_a_store_and_only_for_what_this_shell_mounts.cljs$lang$test = (function (){
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["the router answers /health from four constants and reads no store,\n            but the hydrate is unconditional and sits ABOVE the router, so\n            every request rebuilt the graph and then called a branch that\n            reads none of it. Measured 2026-08-17 after the same fix landed in\n            the combined worker: its hosts answered /health in 60-180 ms while\n            cypher.kotobase.net -- this shell -- still took 8.9 s"], 0));

try{var cfg_12686 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421),cljs.core.select_keys(kotobase_protocols_worker.query.surfaces,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["cypher"], null)),new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274),new cljs.core.PersistentArrayMap(null, 1, ["/db/data/","cypher"], null)], null);
var env_12687 = ({"APEX": "kotobase.net"});
var resp_12688 = kotobase_protocols_worker.shell.static_health(cfg_12686,env_12687,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null));
try{var values__1983__auto___12689 = (new cljs.core.List(null,resp_12688,null,(1),null));
var result__1984__auto___12690 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.some_QMARK_,values__1983__auto___12689);
if(cljs.core.truth_(result__1984__auto___12690)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",23,new cljs.core.Keyword(null,"pass","pass",1574159993),11,90,cljs.core.list(new cljs.core.Symbol(null,"some?","some?",234752293,null),new cljs.core.Symbol(null,"resp","resp",-1235733393,null)),90,cljs.core.cons(new cljs.core.Symbol(null,"some?","some?",234752293,null),values__1983__auto___12689),"the surface this shell mounts answers"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",23,new cljs.core.Keyword(null,"fail","fail",1706214930),11,90,cljs.core.list(new cljs.core.Symbol(null,"some?","some?",234752293,null),new cljs.core.Symbol(null,"resp","resp",-1235733393,null)),90,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"some?","some?",234752293,null),values__1983__auto___12689),null,(1),null)),(2),null)),"the surface this shell mounts answers"]));
}

}catch (e12564){var t__2020__auto___12691 = e12564;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",23,new cljs.core.Keyword(null,"error","error",-978969032),11,90,cljs.core.list(new cljs.core.Symbol(null,"some?","some?",234752293,null),new cljs.core.Symbol(null,"resp","resp",-1235733393,null)),90,t__2020__auto___12691,"the surface this shell mounts answers"]));
}
try{var values__1983__auto___12692 = (new cljs.core.List(null,(200),(new cljs.core.List(null,resp_12688.status,null,(1),null)),(2),null));
var result__1984__auto___12693 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12692);
if(cljs.core.truth_(result__1984__auto___12693)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",34,new cljs.core.Keyword(null,"pass","pass",1574159993),11,91,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"resp","resp",-1235733393,null))),91,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12692),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",34,new cljs.core.Keyword(null,"fail","fail",1706214930),11,91,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"resp","resp",-1235733393,null))),91,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12692),null,(1),null)),(2),null)),null]));
}

}catch (e12565){var t__2020__auto___12694 = e12565;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",34,new cljs.core.Keyword(null,"error","error",-978969032),11,91,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"resp","resp",-1235733393,null))),91,t__2020__auto___12694,null]));
}}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["and it declines for a surface this shell does NOT mount --\n            ADR-2608051000: a shell cannot serve a capability it did not ask\n            for, so taking the surfaces from a constant instead of from cfg\n            would make a single-capability deploy answer for all of them"], 0));

try{var cfg_12695 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421),cljs.core.select_keys(kotobase_protocols_worker.query.surfaces,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["cypher"], null)),new cljs.core.Keyword(null,"path-surfaces","path-surfaces",-639241274),new cljs.core.PersistentArrayMap(null, 1, ["/db/data/","cypher"], null)], null);
var env_12696 = ({"APEX": "kotobase.net"});
try{var values__1983__auto___12697 = (new cljs.core.List(null,kotobase_protocols_worker.shell.static_health(cfg_12695,env_12696,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"nosuchsurface.kotobase.net"], null)),null,(1),null));
var result__1984__auto___12698 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,values__1983__auto___12697);
if(cljs.core.truth_(result__1984__auto___12698)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"pass","pass",1574159993),11,100,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"nosuchsurface.kotobase.net"], null))),101,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12697),"a surface nobody defines must fall through, not answer"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"fail","fail",1706214930),11,100,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"nosuchsurface.kotobase.net"], null))),101,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12697),null,(1),null)),(2),null)),"a surface nobody defines must fall through, not answer"]));
}

}catch (e12566){var t__2020__auto___12699 = e12566;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"error","error",-978969032),11,100,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"nosuchsurface.kotobase.net"], null))),101,t__2020__auto___12699,"a surface nobody defines must fall through, not answer"]));
}
try{var values__1983__auto___12700 = (new cljs.core.List(null,kotobase_protocols_worker.shell.static_health(cfg_12695,env_12696,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"sparql.kotobase.net"], null)),null,(1),null));
var result__1984__auto___12701 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,values__1983__auto___12700);
if(cljs.core.truth_(result__1984__auto___12701)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"pass","pass",1574159993),11,114,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"sparql.kotobase.net"], null))),115,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12700),"a surface this shell did NOT mount must fall through"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"fail","fail",1706214930),11,114,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"sparql.kotobase.net"], null))),115,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12700),null,(1),null)),(2),null)),"a surface this shell did NOT mount must fall through"]));
}

}catch (e12567){var t__2020__auto___12702 = e12567;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"error","error",-978969032),11,114,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"sparql.kotobase.net"], null))),115,t__2020__auto___12702,"a surface this shell did NOT mount must fall through"]));
}}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["and it claims only GET /health"], 0));

try{var cfg = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"surfaces","surfaces",-2030326421),cljs.core.select_keys(kotobase_protocols_worker.query.surfaces,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["cypher"], null))], null);
var env = ({"APEX": "kotobase.net"});
try{var values__1983__auto___12703 = (new cljs.core.List(null,kotobase_protocols_worker.shell.static_health(cfg,env,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null)),null,(1),null));
var result__1984__auto___12704 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,values__1983__auto___12703);
if(cljs.core.truth_(result__1984__auto___12704)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"pass","pass",1574159993),11,121,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null))),122,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12703),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"fail","fail",1706214930),11,121,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null))),122,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto___12703),null,(1),null)),(2),null)),null]));
}

}catch (e12568){var t__2020__auto___12705 = e12568;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"error","error",-978969032),11,121,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"path","path",-188191168),"/health",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null))),122,t__2020__auto___12705,null]));
}
try{var values__1983__auto__ = (new cljs.core.List(null,kotobase_protocols_worker.shell.static_health(cfg,env,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/healthz",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null)),null,(1),null));
var result__1984__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,values__1983__auto__);
if(cljs.core.truth_(result__1984__auto__)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"pass","pass",1574159993),11,123,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/healthz",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null))),124,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto__),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"fail","fail",1706214930),11,123,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/healthz",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null))),124,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),values__1983__auto__),null,(1),null)),(2),null)),null]));
}

return result__1984__auto__;
}catch (e12569){var t__2020__auto__ = e12569;
return cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",78,new cljs.core.Keyword(null,"error","error",-978969032),11,123,cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),cljs.core.list(new cljs.core.Symbol("worker","static-health","worker/static-health",1921783800,null),new cljs.core.Symbol(null,"cfg","cfg",-96549177,null),new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"path","path",-188191168),"/healthz",new cljs.core.Keyword(null,"host","host",-1558485167),"cypher.kotobase.net"], null))),124,t__2020__auto__,null]));
}}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}});

(kotobase_protocols_worker.shell_test.health_answers_without_a_store_and_only_for_what_this_shell_mounts.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.health_answers_without_a_store_and_only_for_what_this_shell_mounts;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","health-answers-without-a-store-and-only-for-what-this-shell-mounts","kotobase-protocols-worker.shell-test/health-answers-without-a-store-and-only-for-what-this-shell-mounts",-1179318455,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"health-answers-without-a-store-and-only-for-what-this-shell-mounts","health-answers-without-a-store-and-only-for-what-this-shell-mounts",-1833699463,null),"kotobase_protocols_worker/shell_test.cljs",76,1,78,78,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.health_answers_without_a_store_and_only_for_what_this_shell_mounts)?kotobase_protocols_worker.shell_test.health_answers_without_a_store_and_only_for_what_this_shell_mounts.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571 = (function (meta12572){
this.meta12572 = meta12572;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12573,meta12572__$1){
var self__ = this;
var _12573__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571(meta12572__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12573){
var self__ = this;
var _12573__$1 = this;
return self__.meta12572;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12575 = (arguments.length - (1));
switch (G__12575) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.prototype.apply = (function (self__,args12574){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12574.length > (20)))?(function (){var G__12576 = args12574.slice((0),(20));
G__12576.push(args12574.slice((20)));

return G__12576;
})():args12574)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("hello kotobase");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"hello kotobase",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__12570_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,p1__12570_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___12707 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___12708 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___12707);
if(cljs.core.truth_(result__1984__auto___12708)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",43,new cljs.core.Keyword(null,"pass","pass",1574159993),32,131,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),131,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12707),"a request signed by a real S3 client must verify"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",43,new cljs.core.Keyword(null,"fail","fail",1706214930),32,131,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),131,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12707),null,(1),null)),(2),null)),"a request signed by a real S3 client must verify"]));
}

}catch (e12577){var t__2020__auto___12709 = e12577;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",43,new cljs.core.Keyword(null,"error","error",-978969032),32,131,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),131,t__2020__auto___12709,"a request signed by a real S3 client must verify"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12710 = false;
if(value__1987__auto___12710){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12710,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12710,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12578){var t__2020__auto___12711 = e12578;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12711,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12572","meta12572",705024773,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12571");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12571");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12571.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12571 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12571(meta12572){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571(meta12572));
});


kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted = (function kotobase_protocols_worker$shell_test$a_correctly_signed_write_is_accepted(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12571(null));
});

(kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-correctly-signed-write-is-accepted","kotobase-protocols-worker.shell-test/a-correctly-signed-write-is-accepted",1135124252,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-correctly-signed-write-is-accepted","a-correctly-signed-write-is-accepted",1789554444,null),"kotobase_protocols_worker/shell_test.cljs",46,1,126,126,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted)?kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580 = (function (meta12581){
this.meta12581 = meta12581;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12582,meta12581__$1){
var self__ = this;
var _12582__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580(meta12581__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12582){
var self__ = this;
var _12582__$1 = this;
return self__.meta12581;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12584 = (arguments.length - (1));
switch (G__12584) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.prototype.apply = (function (self__,args12583){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12583.length > (20)))?(function (){var G__12585 = args12583.slice((0),(20));
G__12585.push(args12583.slice((20)));

return G__12585;
})():args12583)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("x");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"x",new cljs.core.Keyword(null,"path","path",-188191168),sigv4.core.object_path("bkt","\u65E5\u672C\u8A9E file.txt")], null)).then((function (p1__12579_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,p1__12579_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___12713 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___12714 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___12713);
if(cljs.core.truth_(result__1984__auto___12714)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",45,new cljs.core.Keyword(null,"pass","pass",1574159993),34,141,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),141,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12713),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",45,new cljs.core.Keyword(null,"fail","fail",1706214930),34,141,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),141,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12713),null,(1),null)),(2),null)),null]));
}

}catch (e12586){var t__2020__auto___12715 = e12586;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",45,new cljs.core.Keyword(null,"error","error",-978969032),34,141,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),141,t__2020__auto___12715,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12716 = false;
if(value__1987__auto___12716){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12716,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12716,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12587){var t__2020__auto___12717 = e12587;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12717,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12581","meta12581",107656655,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12580");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12580");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12580.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12580 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12580(meta12581){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580(meta12581));
});


kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted = (function kotobase_protocols_worker$shell_test$a_non_ascii_key_is_accepted(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$test = (function (){
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["the copy this replaced encoded with charCodeAt, so a non-ASCII key\n            signed as UTF-16 and could never have verified"], 0));

try{return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12580(null));
}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}});

(kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-non-ascii-key-is-accepted","kotobase-protocols-worker.shell-test/a-non-ascii-key-is-accepted",-59311472,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-non-ascii-key-is-accepted","a-non-ascii-key-is-accepted",125086432,null),"kotobase_protocols_worker/shell_test.cljs",37,1,134,134,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted)?kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589 = (function (meta12590){
this.meta12590 = meta12590;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12591,meta12590__$1){
var self__ = this;
var _12591__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589(meta12590__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12591){
var self__ = this;
var _12591__$1 = this;
return self__.meta12590;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12593 = (arguments.length - (1));
switch (G__12593) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.prototype.apply = (function (self__,args12592){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12592.length > (20)))?(function (){var G__12594 = args12592.slice((0),(20));
G__12594.push(args12592.slice((20)));

return G__12594;
})():args12592)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"hello kotobase",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__12588_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,p1__12588_SHARP_,kotobase_protocols_worker.shell_test.body_bytes("hello attacker"));
})).then((function (ok_QMARK_){
try{var values__1983__auto___12719 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___12720 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___12719);
if(cljs.core.truth_(result__1984__auto___12720)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",42,new cljs.core.Keyword(null,"pass","pass",1574159993),30,148,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),148,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12719),"the declared payload hash must match the body received"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",42,new cljs.core.Keyword(null,"fail","fail",1706214930),30,148,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),148,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12719),null,(1),null)),(2),null)),"the declared payload hash must match the body received"]));
}

}catch (e12595){var t__2020__auto___12721 = e12595;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",42,new cljs.core.Keyword(null,"error","error",-978969032),30,148,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),148,t__2020__auto___12721,"the declared payload hash must match the body received"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12722 = false;
if(value__1987__auto___12722){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12722,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12722,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12596){var t__2020__auto___12723 = e12596;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12723,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12590","meta12590",-455989966,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12589");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12589");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12589.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12589 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12589(meta12590){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589(meta12590));
});


kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected = (function kotobase_protocols_worker$shell_test$a_tampered_body_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12589(null));
});

(kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-tampered-body-is-rejected","kotobase-protocols-worker.shell-test/a-tampered-body-is-rejected",888022148,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-tampered-body-is-rejected","a-tampered-body-is-rejected",502035700,null),"kotobase_protocols_worker/shell_test.cljs",37,1,144,144,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected)?kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598 = (function (meta12599){
this.meta12599 = meta12599;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12600,meta12599__$1){
var self__ = this;
var _12600__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598(meta12599__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12600){
var self__ = this;
var _12600__$1 = this;
return self__.meta12599;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12602 = (arguments.length - (1));
switch (G__12602) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.prototype.apply = (function (self__,args12601){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12601.length > (20)))?(function (){var G__12603 = args12601.slice((0),(20));
G__12603.push(args12601.slice((20)));

return G__12603;
})():args12601)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("hello kotobase");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"hello kotobase",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__12597_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__12597_SHARP_,new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/elsewhere.txt"),body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___12725 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___12726 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___12725);
if(cljs.core.truth_(result__1984__auto___12726)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),32,156,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),156,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12725),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),32,156,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),156,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12725),null,(1),null)),(2),null)),null]));
}

}catch (e12604){var t__2020__auto___12727 = e12604;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),32,156,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),156,t__2020__auto___12727,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12728 = false;
if(value__1987__auto___12728){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12728,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12728,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12605){var t__2020__auto___12729 = e12605;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12729,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12599","meta12599",-1386150188,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12598");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12598");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12598.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12598 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12598(meta12599){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598(meta12599));
});


kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected = (function kotobase_protocols_worker$shell_test$a_tampered_path_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12598(null));
});

(kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-tampered-path-is-rejected","kotobase-protocols-worker.shell-test/a-tampered-path-is-rejected",-1196929747,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-tampered-path-is-rejected","a-tampered-path-is-rejected",-1750196963,null),"kotobase_protocols_worker/shell_test.cljs",37,1,151,151,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected)?kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607 = (function (meta12608){
this.meta12608 = meta12608;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12609,meta12608__$1){
var self__ = this;
var _12609__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607(meta12608__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12609){
var self__ = this;
var _12609__$1 = this;
return self__.meta12608;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12611 = (arguments.length - (1));
switch (G__12611) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.prototype.apply = (function (self__,args12610){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12610.length > (20)))?(function (){var G__12612 = args12610.slice((0),(20));
G__12612.push(args12610.slice((20)));

return G__12612;
})():args12610)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("x");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"x",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__12606_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(({"S3_ACCESS_KEY_ID": "OTHER", "S3_SECRET_ACCESS_KEY": kotobase_protocols_worker.shell_test.secret}),p1__12606_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___12731 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___12732 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___12731);
if(cljs.core.truth_(result__1984__auto___12732)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),32,166,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),166,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12731),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),32,166,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),166,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12731),null,(1),null)),(2),null)),null]));
}

}catch (e12613){var t__2020__auto___12733 = e12613;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),32,166,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),166,t__2020__auto___12733,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12734 = false;
if(value__1987__auto___12734){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12734,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12734,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12614){var t__2020__auto___12735 = e12614;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12735,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12608","meta12608",562112340,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12607");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12607");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12607.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12607 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12607(meta12608){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607(meta12608));
});


kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected = (function kotobase_protocols_worker$shell_test$an_unknown_access_key_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12607(null));
});

(kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","an-unknown-access-key-is-rejected","kotobase-protocols-worker.shell-test/an-unknown-access-key-is-rejected",1297187622,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"an-unknown-access-key-is-rejected","an-unknown-access-key-is-rejected",-1706085610,null),"kotobase_protocols_worker/shell_test.cljs",43,1,159,159,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected)?kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616 = (function (meta12617){
this.meta12617 = meta12617;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12618,meta12617__$1){
var self__ = this;
var _12618__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616(meta12617__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12618){
var self__ = this;
var _12618__$1 = this;
return self__.meta12617;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12620 = (arguments.length - (1));
switch (G__12620) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.prototype.apply = (function (self__,args12619){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12619.length > (20)))?(function (){var G__12621 = args12619.slice((0),(20));
G__12621.push(args12619.slice((20)));

return G__12621;
})():args12619)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("x");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"x",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__12615_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(({"S3_ACCESS_KEY_ID": kotobase_protocols_worker.shell_test.akid, "S3_SECRET_ACCESS_KEY": "not-the-secret"}),p1__12615_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___12737 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___12738 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___12737);
if(cljs.core.truth_(result__1984__auto___12738)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),32,176,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),176,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12737),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),32,176,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),176,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___12737),null,(1),null)),(2),null)),null]));
}

}catch (e12622){var t__2020__auto___12739 = e12622;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),32,176,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),176,t__2020__auto___12739,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12740 = false;
if(value__1987__auto___12740){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12740,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12740,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12623){var t__2020__auto___12741 = e12623;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12741,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12617","meta12617",-1993180270,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12616");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12616");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12616.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12616 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12616(meta12617){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616(meta12617));
});


kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected = (function kotobase_protocols_worker$shell_test$a_wrong_secret_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12616(null));
});

(kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-wrong-secret-is-rejected","kotobase-protocols-worker.shell-test/a-wrong-secret-is-rejected",991709063,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-wrong-secret-is-rejected","a-wrong-secret-is-rejected",1646147575,null),"kotobase_protocols_worker/shell_test.cljs",36,1,169,169,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected)?kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$test:null)])));
/**
 * An env with NO STATE_BUCKET on purpose. A rejected read must be
 *   rejected before any storage is touched, so binding-free is exactly
 *   the right shape here: if the 401 ever regresses into a 200, this
 *   test does not quietly pass against a fake bucket — it explodes on a
 *   nil binding.
 */
kotobase_protocols_worker.shell_test.no_r2 = ({"APEX": "kotobase.net", "CACAO_OPERATOR_DIDS": ""});
kotobase_protocols_worker.shell_test.fetch_req = (function kotobase_protocols_worker$shell_test$fetch_req(method,url){
return (new Request(url,({"method": method})));
});
kotobase_protocols_worker.shell_test.status_of = (function kotobase_protocols_worker$shell_test$status_of(env,req){
return kotobase_protocols_worker.shell_test.handler.fetch(req,env,({})).then((function (p1__12624_SHARP_){
return p1__12624_SHARP_.status;
}));
});
kotobase_protocols_worker.shell_test.response_of = (function kotobase_protocols_worker$shell_test$response_of(env,req){
return kotobase_protocols_worker.shell_test.handler.fetch(req,env,({}));
});

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625 = (function (meta12626){
this.meta12626 = meta12626;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12627,meta12626__$1){
var self__ = this;
var _12627__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625(meta12626__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12627){
var self__ = this;
var _12627__$1 = this;
return self__.meta12626;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12629 = (arguments.length - (1));
switch (G__12629) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.prototype.apply = (function (self__,args12628){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12628.length > (20)))?(function (){var G__12630 = args12628.slice((0),(20));
G__12630.push(args12628.slice((20)));

return G__12630;
})():args12628)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var req = (new Request("https://cypher.kotobase.net/.well-known/kotobase-capabilities",({"headers": ({"x-request-id": "enterprise-smoke-1"})})));
return kotobase_protocols_worker.shell_test.response_of(kotobase_protocols_worker.shell_test.no_r2,req).then((function (response){
try{var values__1983__auto___12743 = (new cljs.core.List(null,(200),(new cljs.core.List(null,response.status,null,(1),null)),(2),null));
var result__1984__auto___12744 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12743);
if(cljs.core.truth_(result__1984__auto___12744)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"pass","pass",1574159993),24,205,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),205,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12743),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"fail","fail",1706214930),24,205,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),205,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12743),null,(1),null)),(2),null)),null]));
}

}catch (e12631){var t__2020__auto___12745 = e12631;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"error","error",-978969032),24,205,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),205,t__2020__auto___12745,null]));
}
try{var values__1983__auto___12746 = (new cljs.core.List(null,"enterprise-smoke-1",(new cljs.core.List(null,response.headers.get("x-kotobase-request-id"),null,(1),null)),(2),null));
var result__1984__auto___12747 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12746);
if(cljs.core.truth_(result__1984__auto___12747)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",79,new cljs.core.Keyword(null,"pass","pass",1574159993),24,206,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"enterprise-smoke-1",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),207,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12746),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",79,new cljs.core.Keyword(null,"fail","fail",1706214930),24,206,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"enterprise-smoke-1",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),207,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12746),null,(1),null)),(2),null)),null]));
}

}catch (e12632){var t__2020__auto___12748 = e12632;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",79,new cljs.core.Keyword(null,"error","error",-978969032),24,206,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"enterprise-smoke-1",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),207,t__2020__auto___12748,null]));
}
try{var values__1983__auto___12749 = (new cljs.core.List(null,"max-age=31536000; includeSubDomains",(new cljs.core.List(null,response.headers.get("strict-transport-security"),null,(1),null)),(2),null));
var result__1984__auto___12750 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12749);
if(cljs.core.truth_(result__1984__auto___12750)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"pass","pass",1574159993),24,208,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"max-age=31536000; includeSubDomains",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"strict-transport-security")),209,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12749),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"fail","fail",1706214930),24,208,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"max-age=31536000; includeSubDomains",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"strict-transport-security")),209,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12749),null,(1),null)),(2),null)),null]));
}

}catch (e12633){var t__2020__auto___12751 = e12633;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"error","error",-978969032),24,208,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"max-age=31536000; includeSubDomains",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"strict-transport-security")),209,t__2020__auto___12751,null]));
}
try{var values__1983__auto___12752 = (new cljs.core.List(null,"DENY",(new cljs.core.List(null,response.headers.get("x-frame-options"),null,(1),null)),(2),null));
var result__1984__auto___12753 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12752);
if(cljs.core.truth_(result__1984__auto___12753)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",80,new cljs.core.Keyword(null,"pass","pass",1574159993),24,210,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"DENY",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-frame-options")),210,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12752),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",80,new cljs.core.Keyword(null,"fail","fail",1706214930),24,210,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"DENY",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-frame-options")),210,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12752),null,(1),null)),(2),null)),null]));
}

}catch (e12634){var t__2020__auto___12754 = e12634;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",80,new cljs.core.Keyword(null,"error","error",-978969032),24,210,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"DENY",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-frame-options")),210,t__2020__auto___12754,null]));
}
return response.json();
})).then((function (body){
try{var values__1983__auto___12755 = (new cljs.core.List(null,(1),(new cljs.core.List(null,(body["schema_version"]),null,(1),null)),(2),null));
var result__1984__auto___12756 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12755);
if(cljs.core.truth_(result__1984__auto___12756)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"pass","pass",1574159993),24,213,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"schema_version")),213,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12755),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"fail","fail",1706214930),24,213,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"schema_version")),213,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12755),null,(1),null)),(2),null)),null]));
}

}catch (e12635){var t__2020__auto___12757 = e12635;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"error","error",-978969032),24,213,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"schema_version")),213,t__2020__auto___12757,null]));
}
try{var values__1983__auto___12758 = (new cljs.core.List(null,"documented-subset",(new cljs.core.List(null,(body["surfaces"]["cypher"]["compatibility"]),null,(1),null)),(2),null));
var result__1984__auto___12759 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12758);
if(cljs.core.truth_(result__1984__auto___12759)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"pass","pass",1574159993),24,214,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"documented-subset",cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","cypher","compatibility")),215,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12758),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"fail","fail",1706214930),24,214,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"documented-subset",cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","cypher","compatibility")),215,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12758),null,(1),null)),(2),null)),null]));
}

}catch (e12636){var t__2020__auto___12760 = e12636;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"error","error",-978969032),24,214,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"documented-subset",cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","cypher","compatibility")),215,t__2020__auto___12760,null]));
}
try{var values__1983__auto___12761 = (new cljs.core.List(null,(body["surfaces"]["sparql"]["read_only"]),null,(1),null));
var result__1984__auto___12762 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___12761);
if(cljs.core.truth_(result__1984__auto___12762)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"pass","pass",1574159993),24,216,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","sparql","read_only")),216,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12761),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"fail","fail",1706214930),24,216,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","sparql","read_only")),216,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___12761),null,(1),null)),(2),null)),null]));
}

}catch (e12637){var t__2020__auto___12763 = e12637;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"error","error",-978969032),24,216,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","sparql","read_only")),216,t__2020__auto___12763,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12764 = false;
if(value__1987__auto___12764){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12764,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12764,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12638){var t__2020__auto___12765 = e12638;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12765,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12626","meta12626",-1983201187,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12625");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12625");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12625.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12625 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12625(meta12626){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625(meta12626));
});


kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest = (function kotobase_protocols_worker$shell_test$capability_discovery_needs_no_storage_and_is_honest(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12625(null));
});

(kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","capability-discovery-needs-no-storage-and-is-honest","kotobase-protocols-worker.shell-test/capability-discovery-needs-no-storage-and-is-honest",-63425429,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"capability-discovery-needs-no-storage-and-is-honest","capability-discovery-needs-no-storage-and-is-honest",-1761180549,null),"kotobase_protocols_worker/shell_test.cljs",61,1,198,198,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest)?kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639 = (function (meta12640){
this.meta12640 = meta12640;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12641,meta12640__$1){
var self__ = this;
var _12641__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639(meta12640__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12641){
var self__ = this;
var _12641__$1 = this;
return self__.meta12640;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12643 = (arguments.length - (1));
switch (G__12643) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.prototype.apply = (function (self__,args12642){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12642.length > (20)))?(function (){var G__12644 = args12642.slice((0),(20));
G__12644.push(args12642.slice((20)));

return G__12644;
})():args12642)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.shell_test.response_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/bkt/secret.txt")).then((function (response){
try{var values__1983__auto___12767 = (new cljs.core.List(null,(401),(new cljs.core.List(null,response.status,null,(1),null)),(2),null));
var result__1984__auto___12768 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12767);
if(cljs.core.truth_(result__1984__auto___12768)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),22,225,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),225,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12767),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),22,225,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),225,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12767),null,(1),null)),(2),null)),null]));
}

}catch (e12645){var t__2020__auto___12769 = e12645;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),22,225,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),225,t__2020__auto___12769,null]));
}
try{var values__1983__auto___12770 = (new cljs.core.List(null,/kotobase-protocols-[0-9a-f-]+/,(new cljs.core.List(null,response.headers.get("x-kotobase-request-id"),null,(1),null)),(2),null));
var result__1984__auto___12771 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.re_matches,values__1983__auto___12770);
if(cljs.core.truth_(result__1984__auto___12771)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",86,new cljs.core.Keyword(null,"pass","pass",1574159993),22,226,cljs.core.list(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),/kotobase-protocols-[0-9a-f-]+/,cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),227,cljs.core.cons(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),values__1983__auto___12770),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",86,new cljs.core.Keyword(null,"fail","fail",1706214930),22,226,cljs.core.list(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),/kotobase-protocols-[0-9a-f-]+/,cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),227,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),values__1983__auto___12770),null,(1),null)),(2),null)),null]));
}

}catch (e12646){var t__2020__auto___12772 = e12646;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",86,new cljs.core.Keyword(null,"error","error",-978969032),22,226,cljs.core.list(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),/kotobase-protocols-[0-9a-f-]+/,cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),227,t__2020__auto___12772,null]));
}
try{var values__1983__auto___12773 = (new cljs.core.List(null,"nosniff",(new cljs.core.List(null,response.headers.get("x-content-type-options"),null,(1),null)),(2),null));
var result__1984__auto___12774 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12773);
if(cljs.core.truth_(result__1984__auto___12774)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",88,new cljs.core.Keyword(null,"pass","pass",1574159993),22,228,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),228,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12773),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",88,new cljs.core.Keyword(null,"fail","fail",1706214930),22,228,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),228,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12773),null,(1),null)),(2),null)),null]));
}

}catch (e12647){var t__2020__auto___12775 = e12647;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",88,new cljs.core.Keyword(null,"error","error",-978969032),22,228,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),228,t__2020__auto___12775,null]));
}
try{var values__1983__auto___12776 = (new cljs.core.List(null,"no-referrer",(new cljs.core.List(null,response.headers.get("referrer-policy"),null,(1),null)),(2),null));
var result__1984__auto___12777 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12776);
if(cljs.core.truth_(result__1984__auto___12777)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"pass","pass",1574159993),22,229,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"no-referrer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"referrer-policy")),229,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12776),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"fail","fail",1706214930),22,229,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"no-referrer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"referrer-policy")),229,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12776),null,(1),null)),(2),null)),null]));
}

}catch (e12648){var t__2020__auto___12778 = e12648;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"error","error",-978969032),22,229,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"no-referrer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"referrer-policy")),229,t__2020__auto___12778,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12779 = false;
if(value__1987__auto___12779){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12779,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12779,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12649){var t__2020__auto___12780 = e12649;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12780,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12640","meta12640",-1532402072,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12639");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12639");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12639.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12639 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12639(meta12640){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639(meta12640));
});


kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors = (function kotobase_protocols_worker$shell_test$generated_request_ids_and_security_headers_cover_errors(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12639(null));
});

(kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","generated-request-ids-and-security-headers-cover-errors","kotobase-protocols-worker.shell-test/generated-request-ids-and-security-headers-cover-errors",1629276773,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"generated-request-ids-and-security-headers-cover-errors","generated-request-ids-and-security-headers-cover-errors",1578965621,null),"kotobase_protocols_worker/shell_test.cljs",65,1,220,220,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors)?kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650 = (function (meta12651){
this.meta12651 = meta12651;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12652,meta12651__$1){
var self__ = this;
var _12652__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650(meta12651__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12652){
var self__ = this;
var _12652__$1 = this;
return self__.meta12651;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12654 = (arguments.length - (1));
switch (G__12654) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.prototype.apply = (function (self__,args12653){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12653.length > (20)))?(function (){var G__12655 = args12653.slice((0),(20));
G__12655.push(args12653.slice((20)));

return G__12655;
})():args12653)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return Promise.all([kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/bkt?list-type=2")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/bkt/secret.txt")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("HEAD","https://s3.kotobase.net/bkt/secret.txt")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://kotobase.net/s3/bkt/secret.txt"))]).then((function (statuses){
try{var values__1983__auto___12782 = (new cljs.core.List(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),(new cljs.core.List(null,cljs.core.vec(statuses),null,(1),null)),(2),null));
var result__1984__auto___12783 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12782);
if(cljs.core.truth_(result__1984__auto___12783)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"pass","pass",1574159993),22,245,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),cljs.core.list(new cljs.core.Symbol(null,"vec","vec",982683596,null),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null))),245,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12782),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"fail","fail",1706214930),22,245,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),cljs.core.list(new cljs.core.Symbol(null,"vec","vec",982683596,null),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null))),245,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12782),null,(1),null)),(2),null)),null]));
}

}catch (e12656){var t__2020__auto___12784 = e12656;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"error","error",-978969032),22,245,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),cljs.core.list(new cljs.core.Symbol(null,"vec","vec",982683596,null),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null))),245,t__2020__auto___12784,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12785 = false;
if(value__1987__auto___12785){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12785,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12785,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12657){var t__2020__auto___12786 = e12657;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12786,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12651","meta12651",23786523,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12650");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12650");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12650.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12650 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12650(meta12651){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650(meta12651));
});


kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected = (function kotobase_protocols_worker$shell_test$an_anonymous_s3_read_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12650(null));
});

(kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","an-anonymous-s3-read-is-rejected","kotobase-protocols-worker.shell-test/an-anonymous-s3-read-is-rejected",-852629969,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"an-anonymous-s3-read-is-rejected","an-anonymous-s3-read-is-rejected",-1808837089,null),"kotobase_protocols_worker/shell_test.cljs",42,1,233,233,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected)?kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658 = (function (meta12659){
this.meta12659 = meta12659;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12660,meta12659__$1){
var self__ = this;
var _12660__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658(meta12659__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12660){
var self__ = this;
var _12660__$1 = this;
return self__.meta12659;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12662 = (arguments.length - (1));
switch (G__12662) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.prototype.apply = (function (self__,args12661){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12661.length > (20)))?(function (){var G__12663 = args12661.slice((0),(20));
G__12663.push(args12661.slice((20)));

return G__12663;
})():args12661)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var env = ({"APEX": "kotobase.net", "WRITE_TOKEN": "t0k3n", "CACAO_OPERATOR_DIDS": ""});
var req = (new Request("https://s3.kotobase.net/bkt/secret.txt",({"method": "GET", "headers": ({"authorization": "Bearer t0k3n"})})));
return kotobase_protocols_worker.shell_test.status_of(env,req).then((function (status){
try{var values__1983__auto___12788 = (new cljs.core.List(null,(401),(new cljs.core.List(null,status,null,(1),null)),(2),null));
var result__1984__auto___12789 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.not_EQ_,values__1983__auto___12788);
if(cljs.core.truth_(result__1984__auto___12789)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",52,new cljs.core.Keyword(null,"pass","pass",1574159993),35,259,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"status","status",-357266886,null)),259,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___12788),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",52,new cljs.core.Keyword(null,"fail","fail",1706214930),35,259,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"status","status",-357266886,null)),259,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___12788),null,(1),null)),(2),null)),null]));
}

}catch (e12664){var t__2020__auto___12790 = e12664;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",52,new cljs.core.Keyword(null,"error","error",-978969032),35,259,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"status","status",-357266886,null)),259,t__2020__auto___12790,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12791 = false;
if(value__1987__auto___12791){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12791,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12791,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12665){var t__2020__auto___12792 = e12665;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12792,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12659","meta12659",462088658,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12658");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12658");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12658.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12658 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12658(meta12659){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658(meta12659));
});


kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate = (function kotobase_protocols_worker$shell_test$a_bearer_credential_passes_the_read_gate(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12658(null));
});

(kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-bearer-credential-passes-the-read-gate","kotobase-protocols-worker.shell-test/a-bearer-credential-passes-the-read-gate",132750703,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-bearer-credential-passes-the-read-gate","a-bearer-credential-passes-the-read-gate",-253072033,null),"kotobase_protocols_worker/shell_test.cljs",50,1,249,249,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate)?kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666 = (function (meta12667){
this.meta12667 = meta12667;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12668,meta12667__$1){
var self__ = this;
var _12668__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666(meta12667__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12668){
var self__ = this;
var _12668__$1 = this;
return self__.meta12667;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12670 = (arguments.length - (1));
switch (G__12670) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.prototype.apply = (function (self__,args12669){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12669.length > (20)))?(function (){var G__12671 = args12669.slice((0),(20));
G__12671.push(args12669.slice((20)));

return G__12671;
})():args12669)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var req = (new Request("https://gremlin.kotobase.net/gremlin",({"method": "GET", "headers": ({"upgrade": "websocket", "connection": "Upgrade", "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==", "sec-websocket-version": "13"})})));
return kotobase_protocols_worker.shell_test.response_of(kotobase_protocols_worker.shell_test.no_r2,req).then((function (response){
try{var values__1983__auto___12794 = (new cljs.core.List(null,(401),(new cljs.core.List(null,response.status,null,(1),null)),(2),null));
var result__1984__auto___12795 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12794);
if(cljs.core.truth_(result__1984__auto___12795)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"pass","pass",1574159993),24,277,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),277,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12794),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"fail","fail",1706214930),24,277,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),277,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12794),null,(1),null)),(2),null)),null]));
}

}catch (e12672){var t__2020__auto___12796 = e12672;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"error","error",-978969032),24,277,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),277,t__2020__auto___12796,null]));
}
try{var values__1983__auto___12797 = (new cljs.core.List(null,"Bearer",(new cljs.core.List(null,response.headers.get("www-authenticate"),null,(1),null)),(2),null));
var result__1984__auto___12798 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12797);
if(cljs.core.truth_(result__1984__auto___12798)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"pass","pass",1574159993),24,278,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"Bearer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"www-authenticate")),278,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12797),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"fail","fail",1706214930),24,278,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"Bearer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"www-authenticate")),278,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12797),null,(1),null)),(2),null)),null]));
}

}catch (e12673){var t__2020__auto___12799 = e12673;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"error","error",-978969032),24,278,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"Bearer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"www-authenticate")),278,t__2020__auto___12799,null]));
}
try{var values__1983__auto___12800 = (new cljs.core.List(null,"nosniff",(new cljs.core.List(null,response.headers.get("x-content-type-options"),null,(1),null)),(2),null));
var result__1984__auto___12801 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___12800);
if(cljs.core.truth_(result__1984__auto___12801)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",90,new cljs.core.Keyword(null,"pass","pass",1574159993),24,279,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),279,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12800),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",90,new cljs.core.Keyword(null,"fail","fail",1706214930),24,279,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),279,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___12800),null,(1),null)),(2),null)),null]));
}

}catch (e12674){var t__2020__auto___12802 = e12674;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",90,new cljs.core.Keyword(null,"error","error",-978969032),24,279,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),279,t__2020__auto___12802,null]));
}
return response.text();
})).then((function (body){
try{var values__1983__auto___12803 = (new cljs.core.List(null,/reads require a credential/,(new cljs.core.List(null,body,null,(1),null)),(2),null));
var result__1984__auto___12804 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.re_find,values__1983__auto___12803);
if(cljs.core.truth_(result__1984__auto___12804)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",68,new cljs.core.Keyword(null,"pass","pass",1574159993),24,282,cljs.core.list(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),/reads require a credential/,new cljs.core.Symbol(null,"body","body",-408674142,null)),282,cljs.core.cons(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),values__1983__auto___12803),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",68,new cljs.core.Keyword(null,"fail","fail",1706214930),24,282,cljs.core.list(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),/reads require a credential/,new cljs.core.Symbol(null,"body","body",-408674142,null)),282,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),values__1983__auto___12803),null,(1),null)),(2),null)),null]));
}

}catch (e12675){var t__2020__auto___12805 = e12675;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",68,new cljs.core.Keyword(null,"error","error",-978969032),24,282,cljs.core.list(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),/reads require a credential/,new cljs.core.Symbol(null,"body","body",-408674142,null)),282,t__2020__auto___12805,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12806 = false;
if(value__1987__auto___12806){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12806,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12806,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12676){var t__2020__auto___12807 = e12676;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12807,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12667","meta12667",-254215007,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12666");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12666");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12666.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12666 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12666(meta12667){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666(meta12667));
});


kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected = (function kotobase_protocols_worker$shell_test$an_anonymous_gremlin_websocket_handshake_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12666(null));
});

(kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","an-anonymous-gremlin-websocket-handshake-is-rejected","kotobase-protocols-worker.shell-test/an-anonymous-gremlin-websocket-handshake-is-rejected",1948595262,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"an-anonymous-gremlin-websocket-handshake-is-rejected","an-anonymous-gremlin-websocket-handshake-is-rejected",1294656558,null),"kotobase_protocols_worker/shell_test.cljs",62,1,262,262,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected)?kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678 = (function (meta12679){
this.meta12679 = meta12679;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12680,meta12679__$1){
var self__ = this;
var _12680__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678(meta12679__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12680){
var self__ = this;
var _12680__$1 = this;
return self__.meta12679;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__12682 = (arguments.length - (1));
switch (G__12682) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.prototype.apply = (function (self__,args12681){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args12681.length > (20)))?(function (){var G__12683 = args12681.slice((0),(20));
G__12683.push(args12681.slice((20)));

return G__12683;
})():args12681)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return Promise.all([kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://ipfs.kotobase.net/ipfs/bafyfake")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://git.kotobase.net/r/info/refs")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/health"))]).then((function (statuses){
try{var values__1983__auto___12809 = (new cljs.core.List(null,(function (p1__12677_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((401),p1__12677_SHARP_);
}),(new cljs.core.List(null,statuses,null,(1),null)),(2),null));
var result__1984__auto___12810 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.every_QMARK_,values__1983__auto___12809);
if(cljs.core.truth_(result__1984__auto___12810)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",53,new cljs.core.Keyword(null,"pass","pass",1574159993),22,296,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__12677#","p1__12677#",1548665877,null)], null),cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"p1__12677#","p1__12677#",1548665877,null))),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null)),296,cljs.core.cons(new cljs.core.Symbol(null,"every?","every?",2083724064,null),values__1983__auto___12809),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(statuses)))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",53,new cljs.core.Keyword(null,"fail","fail",1706214930),22,296,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__12677#","p1__12677#",1548665877,null)], null),cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"p1__12677#","p1__12677#",1548665877,null))),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null)),296,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"every?","every?",2083724064,null),values__1983__auto___12809),null,(1),null)),(2),null)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(statuses)))]));
}

}catch (e12684){var t__2020__auto___12811 = e12684;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",53,new cljs.core.Keyword(null,"error","error",-978969032),22,296,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__12677#","p1__12677#",1548665877,null)], null),cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"p1__12677#","p1__12677#",1548665877,null))),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null)),296,t__2020__auto___12811,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(statuses)))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___12812 = false;
if(value__1987__auto___12812){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___12812,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___12812,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e12685){var t__2020__auto___12813 = e12685;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___12813,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12679","meta12679",280096201,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12678");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12678");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test12678.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test12678 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test12678(meta12679){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678(meta12679));
});


kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous = (function kotobase_protocols_worker$shell_test$public_surfaces_are_still_anonymous(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test12678(null));
});

(kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","public-surfaces-are-still-anonymous","kotobase-protocols-worker.shell-test/public-surfaces-are-still-anonymous",1754659102,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"public-surfaces-are-still-anonymous","public-surfaces-are-still-anonymous",-1315567346,null),"kotobase_protocols_worker/shell_test.cljs",45,1,286,286,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous)?kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$test:null)])));

//# sourceMappingURL=kotobase_protocols_worker.shell_test.js.map
