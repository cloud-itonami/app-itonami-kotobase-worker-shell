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
kotobase_protocols_worker.shell_test.sign_request = (function kotobase_protocols_worker$shell_test$sign_request(p__14999){
var map__15000 = p__14999;
var map__15000__$1 = cljs.core.__destructure_map(map__15000);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15000__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15000__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var payload_hash_p = kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_sha256_hex$arity$2(null,body);
return payload_hash_p.then((function (payload_hash){
var headers = new cljs.core.PersistentArrayMap(null, 3, ["host","s3.kotobase.net","x-amz-content-sha256",payload_hash,"x-amz-date",kotobase_protocols_worker.shell_test.amz_date], null);
var map__15001 = sigv4.core.canonical_request(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"query","query",-1288509510),"",new cljs.core.Keyword(null,"headers","headers",-835030129),headers,new cljs.core.Keyword(null,"payload-hash","payload-hash",1436757062),payload_hash], null));
var map__15001__$1 = cljs.core.__destructure_map(map__15001);
var canonical_request = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15001__$1,new cljs.core.Keyword(null,"canonical-request","canonical-request",1547947524));
var signed_headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15001__$1,new cljs.core.Keyword(null,"signed-headers","signed-headers",-1530859860));
var scope = sigv4.core.credential_scope.cljs$core$IFn$_invoke$arity$2(kotobase_protocols_worker.shell_test.short_date,kotobase_protocols_worker.shell_test.region);
var map__15002 = sigv4.core.signing_key_chain.cljs$core$IFn$_invoke$arity$3(kotobase_protocols_worker.shell_test.secret,kotobase_protocols_worker.shell_test.short_date,kotobase_protocols_worker.shell_test.region);
var map__15002__$1 = cljs.core.__destructure_map(map__15002);
var seed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15002__$1,new cljs.core.Keyword(null,"seed","seed",68613327));
var steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15002__$1,new cljs.core.Keyword(null,"steps","steps",-128433302));
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_sha256_hex$arity$2(null,canonical_request).then((function (cr_hash){
var sts = sigv4.core.string_to_sign(kotobase_protocols_worker.shell_test.amz_date,scope,cr_hash);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (pr,step){
return pr.then((function (p1__14996_SHARP_){
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_hmac$arity$3(null,p1__14996_SHARP_,step);
}));
}),Promise.resolve(seed),steps).then((function (p1__14997_SHARP_){
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_hmac$arity$3(null,p1__14997_SHARP_,sts);
})).then((function (p1__14998_SHARP_){
return kotobase_protocols_worker.shell_test.c.sigv4$protocols$ICrypto$_hex$arity$2(null,p1__14998_SHARP_);
}));
})).then((function (signature){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"query","query",-1288509510),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"body","body",-2049205669),body,new cljs.core.Keyword(null,"headers","headers",-835030129),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(headers,"authorization",sigv4.core.authorization_header(kotobase_protocols_worker.shell_test.akid,scope,signed_headers,signature))], null);
}));
}));
});

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004 = (function (meta15005){
this.meta15005 = meta15005;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15006,meta15005__$1){
var self__ = this;
var _15006__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004(meta15005__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15006){
var self__ = this;
var _15006__$1 = this;
return self__.meta15005;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15008 = (arguments.length - (1));
switch (G__15008) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.prototype.apply = (function (self__,args15007){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15007.length > (20)))?(function (){var G__15009 = args15007.slice((0),(20));
G__15009.push(args15007.slice((20)));

return G__15009;
})():args15007)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("hello kotobase");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"hello kotobase",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__15003_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,p1__15003_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___15120 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___15121 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___15120);
if(cljs.core.truth_(result__1984__auto___15121)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",43,new cljs.core.Keyword(null,"pass","pass",1574159993),32,83,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),83,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___15120),"a request signed by a real S3 client must verify"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",43,new cljs.core.Keyword(null,"fail","fail",1706214930),32,83,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),83,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___15120),null,(1),null)),(2),null)),"a request signed by a real S3 client must verify"]));
}

}catch (e15010){var t__2020__auto___15122 = e15010;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",43,new cljs.core.Keyword(null,"error","error",-978969032),32,83,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),83,t__2020__auto___15122,"a request signed by a real S3 client must verify"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15123 = false;
if(value__1987__auto___15123){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15123,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15123,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15011){var t__2020__auto___15124 = e15011;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15124,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15005","meta15005",1229891335,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15004");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15004");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15004.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15004 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15004(meta15005){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004(meta15005));
});


kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted = (function kotobase_protocols_worker$shell_test$a_correctly_signed_write_is_accepted(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15004(null));
});

(kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-correctly-signed-write-is-accepted","kotobase-protocols-worker.shell-test/a-correctly-signed-write-is-accepted",1135124252,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-correctly-signed-write-is-accepted","a-correctly-signed-write-is-accepted",1789554444,null),"kotobase_protocols_worker/shell_test.cljs",46,1,78,78,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted)?kotobase_protocols_worker.shell_test.a_correctly_signed_write_is_accepted.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013 = (function (meta15014){
this.meta15014 = meta15014;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15015,meta15014__$1){
var self__ = this;
var _15015__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013(meta15014__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15015){
var self__ = this;
var _15015__$1 = this;
return self__.meta15014;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15017 = (arguments.length - (1));
switch (G__15017) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.prototype.apply = (function (self__,args15016){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15016.length > (20)))?(function (){var G__15018 = args15016.slice((0),(20));
G__15018.push(args15016.slice((20)));

return G__15018;
})():args15016)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("x");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"x",new cljs.core.Keyword(null,"path","path",-188191168),sigv4.core.object_path("bkt","\u65E5\u672C\u8A9E file.txt")], null)).then((function (p1__15012_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,p1__15012_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___15126 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___15127 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___15126);
if(cljs.core.truth_(result__1984__auto___15127)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",45,new cljs.core.Keyword(null,"pass","pass",1574159993),34,93,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),93,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___15126),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",45,new cljs.core.Keyword(null,"fail","fail",1706214930),34,93,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),93,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___15126),null,(1),null)),(2),null)),null]));
}

}catch (e15019){var t__2020__auto___15128 = e15019;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",45,new cljs.core.Keyword(null,"error","error",-978969032),34,93,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),93,t__2020__auto___15128,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15129 = false;
if(value__1987__auto___15129){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15129,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15129,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15020){var t__2020__auto___15130 = e15020;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15130,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15014","meta15014",-641606652,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15013");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15013");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15013.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15013 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15013(meta15014){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013(meta15014));
});


kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted = (function kotobase_protocols_worker$shell_test$a_non_ascii_key_is_accepted(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$test = (function (){
cljs.test.update_current_env_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["the copy this replaced encoded with charCodeAt, so a non-ASCII key\n            signed as UTF-16 and could never have verified"], 0));

try{return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15013(null));
}finally {cljs.test.update_current_env_BANG_(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"testing-contexts","testing-contexts",-1485646523)], null),cljs.core.rest);
}});

(kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-non-ascii-key-is-accepted","kotobase-protocols-worker.shell-test/a-non-ascii-key-is-accepted",-59311472,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-non-ascii-key-is-accepted","a-non-ascii-key-is-accepted",125086432,null),"kotobase_protocols_worker/shell_test.cljs",37,1,86,86,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted)?kotobase_protocols_worker.shell_test.a_non_ascii_key_is_accepted.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022 = (function (meta15023){
this.meta15023 = meta15023;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15024,meta15023__$1){
var self__ = this;
var _15024__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022(meta15023__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15024){
var self__ = this;
var _15024__$1 = this;
return self__.meta15023;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15026 = (arguments.length - (1));
switch (G__15026) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.prototype.apply = (function (self__,args15025){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15025.length > (20)))?(function (){var G__15027 = args15025.slice((0),(20));
G__15027.push(args15025.slice((20)));

return G__15027;
})():args15025)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"hello kotobase",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__15021_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,p1__15021_SHARP_,kotobase_protocols_worker.shell_test.body_bytes("hello attacker"));
})).then((function (ok_QMARK_){
try{var values__1983__auto___15132 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___15133 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___15132);
if(cljs.core.truth_(result__1984__auto___15133)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",42,new cljs.core.Keyword(null,"pass","pass",1574159993),30,100,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),100,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15132),"the declared payload hash must match the body received"]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",42,new cljs.core.Keyword(null,"fail","fail",1706214930),30,100,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),100,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15132),null,(1),null)),(2),null)),"the declared payload hash must match the body received"]));
}

}catch (e15028){var t__2020__auto___15134 = e15028;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",42,new cljs.core.Keyword(null,"error","error",-978969032),30,100,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),100,t__2020__auto___15134,"the declared payload hash must match the body received"]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15135 = false;
if(value__1987__auto___15135){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15135,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15135,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15029){var t__2020__auto___15136 = e15029;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15136,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15023","meta15023",-1740157958,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15022");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15022");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15022.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15022 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15022(meta15023){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022(meta15023));
});


kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected = (function kotobase_protocols_worker$shell_test$a_tampered_body_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15022(null));
});

(kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-tampered-body-is-rejected","kotobase-protocols-worker.shell-test/a-tampered-body-is-rejected",888022148,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-tampered-body-is-rejected","a-tampered-body-is-rejected",502035700,null),"kotobase_protocols_worker/shell_test.cljs",37,1,96,96,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected)?kotobase_protocols_worker.shell_test.a_tampered_body_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031 = (function (meta15032){
this.meta15032 = meta15032;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15033,meta15032__$1){
var self__ = this;
var _15033__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031(meta15032__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15033){
var self__ = this;
var _15033__$1 = this;
return self__.meta15032;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15035 = (arguments.length - (1));
switch (G__15035) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.prototype.apply = (function (self__,args15034){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15034.length > (20)))?(function (){var G__15036 = args15034.slice((0),(20));
G__15036.push(args15034.slice((20)));

return G__15036;
})():args15034)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("hello kotobase");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"hello kotobase",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__15030_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(kotobase_protocols_worker.shell_test.env,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__15030_SHARP_,new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/elsewhere.txt"),body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___15138 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___15139 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___15138);
if(cljs.core.truth_(result__1984__auto___15139)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),32,108,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),108,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15138),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),32,108,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),108,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15138),null,(1),null)),(2),null)),null]));
}

}catch (e15037){var t__2020__auto___15140 = e15037;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),32,108,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),108,t__2020__auto___15140,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15141 = false;
if(value__1987__auto___15141){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15141,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15141,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15038){var t__2020__auto___15142 = e15038;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15142,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15032","meta15032",1566708387,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15031");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15031");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15031.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15031 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15031(meta15032){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031(meta15032));
});


kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected = (function kotobase_protocols_worker$shell_test$a_tampered_path_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15031(null));
});

(kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-tampered-path-is-rejected","kotobase-protocols-worker.shell-test/a-tampered-path-is-rejected",-1196929747,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-tampered-path-is-rejected","a-tampered-path-is-rejected",-1750196963,null),"kotobase_protocols_worker/shell_test.cljs",37,1,103,103,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected)?kotobase_protocols_worker.shell_test.a_tampered_path_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040 = (function (meta15041){
this.meta15041 = meta15041;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15042,meta15041__$1){
var self__ = this;
var _15042__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040(meta15041__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15042){
var self__ = this;
var _15042__$1 = this;
return self__.meta15041;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15044 = (arguments.length - (1));
switch (G__15044) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.prototype.apply = (function (self__,args15043){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15043.length > (20)))?(function (){var G__15045 = args15043.slice((0),(20));
G__15045.push(args15043.slice((20)));

return G__15045;
})():args15043)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("x");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"x",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__15039_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(({"S3_ACCESS_KEY_ID": "OTHER", "S3_SECRET_ACCESS_KEY": kotobase_protocols_worker.shell_test.secret}),p1__15039_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___15144 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___15145 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___15144);
if(cljs.core.truth_(result__1984__auto___15145)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),32,118,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),118,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15144),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),32,118,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),118,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15144),null,(1),null)),(2),null)),null]));
}

}catch (e15046){var t__2020__auto___15146 = e15046;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),32,118,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),118,t__2020__auto___15146,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15147 = false;
if(value__1987__auto___15147){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15147,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15147,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15047){var t__2020__auto___15148 = e15047;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15148,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15041","meta15041",-1208597202,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15040");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15040");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15040.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15040 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15040(meta15041){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040(meta15041));
});


kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected = (function kotobase_protocols_worker$shell_test$an_unknown_access_key_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15040(null));
});

(kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","an-unknown-access-key-is-rejected","kotobase-protocols-worker.shell-test/an-unknown-access-key-is-rejected",1297187622,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"an-unknown-access-key-is-rejected","an-unknown-access-key-is-rejected",-1706085610,null),"kotobase_protocols_worker/shell_test.cljs",43,1,111,111,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected)?kotobase_protocols_worker.shell_test.an_unknown_access_key_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049 = (function (meta15050){
this.meta15050 = meta15050;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15051,meta15050__$1){
var self__ = this;
var _15051__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049(meta15050__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15051){
var self__ = this;
var _15051__$1 = this;
return self__.meta15050;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15053 = (arguments.length - (1));
switch (G__15053) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.prototype.apply = (function (self__,args15052){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15052.length > (20)))?(function (){var G__15054 = args15052.slice((0),(20));
G__15054.push(args15052.slice((20)));

return G__15054;
})():args15052)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var body = kotobase_protocols_worker.shell_test.body_bytes("x");
return kotobase_protocols_worker.shell_test.sign_request(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"body","body",-2049205669),"x",new cljs.core.Keyword(null,"path","path",-188191168),"/bkt/a.txt"], null)).then((function (p1__15048_SHARP_){
return kotobase_protocols_worker.shell.sigv4_verify(({"S3_ACCESS_KEY_ID": kotobase_protocols_worker.shell_test.akid, "S3_SECRET_ACCESS_KEY": "not-the-secret"}),p1__15048_SHARP_,body);
})).then((function (ok_QMARK_){
try{var values__1983__auto___15150 = (new cljs.core.List(null,ok_QMARK_,null,(1),null));
var result__1984__auto___15151 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.false_QMARK_,values__1983__auto___15150);
if(cljs.core.truth_(result__1984__auto___15151)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"pass","pass",1574159993),32,128,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),128,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15150),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"fail","fail",1706214930),32,128,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),128,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),values__1983__auto___15150),null,(1),null)),(2),null)),null]));
}

}catch (e15055){var t__2020__auto___15152 = e15055;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",44,new cljs.core.Keyword(null,"error","error",-978969032),32,128,cljs.core.list(new cljs.core.Symbol(null,"false?","false?",-1522377573,null),new cljs.core.Symbol(null,"ok?","ok?",2087841831,null)),128,t__2020__auto___15152,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15153 = false;
if(value__1987__auto___15153){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15153,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15153,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15056){var t__2020__auto___15154 = e15056;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15154,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15050","meta15050",-1107866073,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15049");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15049");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15049.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15049 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15049(meta15050){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049(meta15050));
});


kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected = (function kotobase_protocols_worker$shell_test$a_wrong_secret_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15049(null));
});

(kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-wrong-secret-is-rejected","kotobase-protocols-worker.shell-test/a-wrong-secret-is-rejected",991709063,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-wrong-secret-is-rejected","a-wrong-secret-is-rejected",1646147575,null),"kotobase_protocols_worker/shell_test.cljs",36,1,121,121,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected)?kotobase_protocols_worker.shell_test.a_wrong_secret_is_rejected.cljs$lang$test:null)])));
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
return kotobase_protocols_worker.shell_test.handler.fetch(req,env,({})).then((function (p1__15057_SHARP_){
return p1__15057_SHARP_.status;
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
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058 = (function (meta15059){
this.meta15059 = meta15059;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15060,meta15059__$1){
var self__ = this;
var _15060__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058(meta15059__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15060){
var self__ = this;
var _15060__$1 = this;
return self__.meta15059;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15062 = (arguments.length - (1));
switch (G__15062) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.prototype.apply = (function (self__,args15061){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15061.length > (20)))?(function (){var G__15063 = args15061.slice((0),(20));
G__15063.push(args15061.slice((20)));

return G__15063;
})():args15061)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var req = (new Request("https://cypher.kotobase.net/.well-known/kotobase-capabilities",({"headers": ({"x-request-id": "enterprise-smoke-1"})})));
return kotobase_protocols_worker.shell_test.response_of(kotobase_protocols_worker.shell_test.no_r2,req).then((function (response){
try{var values__1983__auto___15156 = (new cljs.core.List(null,(200),(new cljs.core.List(null,response.status,null,(1),null)),(2),null));
var result__1984__auto___15157 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15156);
if(cljs.core.truth_(result__1984__auto___15157)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"pass","pass",1574159993),24,157,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),157,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15156),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"fail","fail",1706214930),24,157,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),157,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15156),null,(1),null)),(2),null)),null]));
}

}catch (e15064){var t__2020__auto___15158 = e15064;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"error","error",-978969032),24,157,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(200),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),157,t__2020__auto___15158,null]));
}
try{var values__1983__auto___15159 = (new cljs.core.List(null,"enterprise-smoke-1",(new cljs.core.List(null,response.headers.get("x-kotobase-request-id"),null,(1),null)),(2),null));
var result__1984__auto___15160 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15159);
if(cljs.core.truth_(result__1984__auto___15160)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",79,new cljs.core.Keyword(null,"pass","pass",1574159993),24,158,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"enterprise-smoke-1",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),159,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15159),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",79,new cljs.core.Keyword(null,"fail","fail",1706214930),24,158,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"enterprise-smoke-1",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),159,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15159),null,(1),null)),(2),null)),null]));
}

}catch (e15065){var t__2020__auto___15161 = e15065;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",79,new cljs.core.Keyword(null,"error","error",-978969032),24,158,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"enterprise-smoke-1",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),159,t__2020__auto___15161,null]));
}
try{var values__1983__auto___15162 = (new cljs.core.List(null,"max-age=31536000; includeSubDomains",(new cljs.core.List(null,response.headers.get("strict-transport-security"),null,(1),null)),(2),null));
var result__1984__auto___15163 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15162);
if(cljs.core.truth_(result__1984__auto___15163)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"pass","pass",1574159993),24,160,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"max-age=31536000; includeSubDomains",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"strict-transport-security")),161,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15162),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"fail","fail",1706214930),24,160,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"max-age=31536000; includeSubDomains",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"strict-transport-security")),161,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15162),null,(1),null)),(2),null)),null]));
}

}catch (e15066){var t__2020__auto___15164 = e15066;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"error","error",-978969032),24,160,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"max-age=31536000; includeSubDomains",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"strict-transport-security")),161,t__2020__auto___15164,null]));
}
try{var values__1983__auto___15165 = (new cljs.core.List(null,"DENY",(new cljs.core.List(null,response.headers.get("x-frame-options"),null,(1),null)),(2),null));
var result__1984__auto___15166 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15165);
if(cljs.core.truth_(result__1984__auto___15166)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",80,new cljs.core.Keyword(null,"pass","pass",1574159993),24,162,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"DENY",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-frame-options")),162,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15165),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",80,new cljs.core.Keyword(null,"fail","fail",1706214930),24,162,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"DENY",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-frame-options")),162,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15165),null,(1),null)),(2),null)),null]));
}

}catch (e15067){var t__2020__auto___15167 = e15067;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",80,new cljs.core.Keyword(null,"error","error",-978969032),24,162,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"DENY",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-frame-options")),162,t__2020__auto___15167,null]));
}
return response.json();
})).then((function (body){
try{var values__1983__auto___15168 = (new cljs.core.List(null,(1),(new cljs.core.List(null,(body["schema_version"]),null,(1),null)),(2),null));
var result__1984__auto___15169 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15168);
if(cljs.core.truth_(result__1984__auto___15169)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"pass","pass",1574159993),24,165,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"schema_version")),165,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15168),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"fail","fail",1706214930),24,165,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"schema_version")),165,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15168),null,(1),null)),(2),null)),null]));
}

}catch (e15068){var t__2020__auto___15170 = e15068;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"error","error",-978969032),24,165,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"schema_version")),165,t__2020__auto___15170,null]));
}
try{var values__1983__auto___15171 = (new cljs.core.List(null,"documented-subset",(new cljs.core.List(null,(body["surfaces"]["cypher"]["compatibility"]),null,(1),null)),(2),null));
var result__1984__auto___15172 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15171);
if(cljs.core.truth_(result__1984__auto___15172)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"pass","pass",1574159993),24,166,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"documented-subset",cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","cypher","compatibility")),167,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15171),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"fail","fail",1706214930),24,166,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"documented-subset",cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","cypher","compatibility")),167,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15171),null,(1),null)),(2),null)),null]));
}

}catch (e15069){var t__2020__auto___15173 = e15069;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"error","error",-978969032),24,166,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"documented-subset",cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","cypher","compatibility")),167,t__2020__auto___15173,null]));
}
try{var values__1983__auto___15174 = (new cljs.core.List(null,(body["surfaces"]["sparql"]["read_only"]),null,(1),null));
var result__1984__auto___15175 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.true_QMARK_,values__1983__auto___15174);
if(cljs.core.truth_(result__1984__auto___15175)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"pass","pass",1574159993),24,168,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","sparql","read_only")),168,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___15174),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"fail","fail",1706214930),24,168,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","sparql","read_only")),168,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),values__1983__auto___15174),null,(1),null)),(2),null)),null]));
}

}catch (e15070){var t__2020__auto___15176 = e15070;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",75,new cljs.core.Keyword(null,"error","error",-978969032),24,168,cljs.core.list(new cljs.core.Symbol(null,"true?","true?",-1600332395,null),cljs.core.list(new cljs.core.Symbol(null,"aget","aget",1491056546,null),new cljs.core.Symbol(null,"body","body",-408674142,null),"surfaces","sparql","read_only")),168,t__2020__auto___15176,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15177 = false;
if(value__1987__auto___15177){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15177,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15177,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15071){var t__2020__auto___15178 = e15071;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15178,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15059","meta15059",-250841055,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15058");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15058");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15058.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15058 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15058(meta15059){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058(meta15059));
});


kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest = (function kotobase_protocols_worker$shell_test$capability_discovery_needs_no_storage_and_is_honest(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15058(null));
});

(kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","capability-discovery-needs-no-storage-and-is-honest","kotobase-protocols-worker.shell-test/capability-discovery-needs-no-storage-and-is-honest",-63425429,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"capability-discovery-needs-no-storage-and-is-honest","capability-discovery-needs-no-storage-and-is-honest",-1761180549,null),"kotobase_protocols_worker/shell_test.cljs",61,1,150,150,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest)?kotobase_protocols_worker.shell_test.capability_discovery_needs_no_storage_and_is_honest.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072 = (function (meta15073){
this.meta15073 = meta15073;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15074,meta15073__$1){
var self__ = this;
var _15074__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072(meta15073__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15074){
var self__ = this;
var _15074__$1 = this;
return self__.meta15073;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15076 = (arguments.length - (1));
switch (G__15076) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.prototype.apply = (function (self__,args15075){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15075.length > (20)))?(function (){var G__15077 = args15075.slice((0),(20));
G__15077.push(args15075.slice((20)));

return G__15077;
})():args15075)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return kotobase_protocols_worker.shell_test.response_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/bkt/secret.txt")).then((function (response){
try{var values__1983__auto___15180 = (new cljs.core.List(null,(401),(new cljs.core.List(null,response.status,null,(1),null)),(2),null));
var result__1984__auto___15181 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15180);
if(cljs.core.truth_(result__1984__auto___15181)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",49,new cljs.core.Keyword(null,"pass","pass",1574159993),22,177,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),177,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15180),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",49,new cljs.core.Keyword(null,"fail","fail",1706214930),22,177,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),177,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15180),null,(1),null)),(2),null)),null]));
}

}catch (e15078){var t__2020__auto___15182 = e15078;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",49,new cljs.core.Keyword(null,"error","error",-978969032),22,177,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),177,t__2020__auto___15182,null]));
}
try{var values__1983__auto___15183 = (new cljs.core.List(null,/kotobase-protocols-[0-9a-f-]+/,(new cljs.core.List(null,response.headers.get("x-kotobase-request-id"),null,(1),null)),(2),null));
var result__1984__auto___15184 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.re_matches,values__1983__auto___15183);
if(cljs.core.truth_(result__1984__auto___15184)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",86,new cljs.core.Keyword(null,"pass","pass",1574159993),22,178,cljs.core.list(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),/kotobase-protocols-[0-9a-f-]+/,cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),179,cljs.core.cons(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),values__1983__auto___15183),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",86,new cljs.core.Keyword(null,"fail","fail",1706214930),22,178,cljs.core.list(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),/kotobase-protocols-[0-9a-f-]+/,cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),179,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),values__1983__auto___15183),null,(1),null)),(2),null)),null]));
}

}catch (e15079){var t__2020__auto___15185 = e15079;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",86,new cljs.core.Keyword(null,"error","error",-978969032),22,178,cljs.core.list(new cljs.core.Symbol(null,"re-matches","re-matches",-1865705768,null),/kotobase-protocols-[0-9a-f-]+/,cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-kotobase-request-id")),179,t__2020__auto___15185,null]));
}
try{var values__1983__auto___15186 = (new cljs.core.List(null,"nosniff",(new cljs.core.List(null,response.headers.get("x-content-type-options"),null,(1),null)),(2),null));
var result__1984__auto___15187 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15186);
if(cljs.core.truth_(result__1984__auto___15187)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",88,new cljs.core.Keyword(null,"pass","pass",1574159993),22,180,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),180,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15186),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",88,new cljs.core.Keyword(null,"fail","fail",1706214930),22,180,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),180,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15186),null,(1),null)),(2),null)),null]));
}

}catch (e15080){var t__2020__auto___15188 = e15080;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",88,new cljs.core.Keyword(null,"error","error",-978969032),22,180,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),180,t__2020__auto___15188,null]));
}
try{var values__1983__auto___15189 = (new cljs.core.List(null,"no-referrer",(new cljs.core.List(null,response.headers.get("referrer-policy"),null,(1),null)),(2),null));
var result__1984__auto___15190 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15189);
if(cljs.core.truth_(result__1984__auto___15190)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"pass","pass",1574159993),22,181,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"no-referrer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"referrer-policy")),181,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15189),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"fail","fail",1706214930),22,181,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"no-referrer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"referrer-policy")),181,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15189),null,(1),null)),(2),null)),null]));
}

}catch (e15081){var t__2020__auto___15191 = e15081;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",85,new cljs.core.Keyword(null,"error","error",-978969032),22,181,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"no-referrer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"referrer-policy")),181,t__2020__auto___15191,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15192 = false;
if(value__1987__auto___15192){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15192,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15192,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15082){var t__2020__auto___15193 = e15082;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15193,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15073","meta15073",1411997262,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15072");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15072");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15072.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15072 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15072(meta15073){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072(meta15073));
});


kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors = (function kotobase_protocols_worker$shell_test$generated_request_ids_and_security_headers_cover_errors(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15072(null));
});

(kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","generated-request-ids-and-security-headers-cover-errors","kotobase-protocols-worker.shell-test/generated-request-ids-and-security-headers-cover-errors",1629276773,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"generated-request-ids-and-security-headers-cover-errors","generated-request-ids-and-security-headers-cover-errors",1578965621,null),"kotobase_protocols_worker/shell_test.cljs",65,1,172,172,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors)?kotobase_protocols_worker.shell_test.generated_request_ids_and_security_headers_cover_errors.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083 = (function (meta15084){
this.meta15084 = meta15084;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15085,meta15084__$1){
var self__ = this;
var _15085__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083(meta15084__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15085){
var self__ = this;
var _15085__$1 = this;
return self__.meta15084;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15087 = (arguments.length - (1));
switch (G__15087) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.prototype.apply = (function (self__,args15086){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15086.length > (20)))?(function (){var G__15088 = args15086.slice((0),(20));
G__15088.push(args15086.slice((20)));

return G__15088;
})():args15086)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return Promise.all([kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/bkt?list-type=2")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/bkt/secret.txt")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("HEAD","https://s3.kotobase.net/bkt/secret.txt")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://kotobase.net/s3/bkt/secret.txt"))]).then((function (statuses){
try{var values__1983__auto___15195 = (new cljs.core.List(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),(new cljs.core.List(null,cljs.core.vec(statuses),null,(1),null)),(2),null));
var result__1984__auto___15196 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15195);
if(cljs.core.truth_(result__1984__auto___15196)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"pass","pass",1574159993),22,197,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),cljs.core.list(new cljs.core.Symbol(null,"vec","vec",982683596,null),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null))),197,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15195),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"fail","fail",1706214930),22,197,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),cljs.core.list(new cljs.core.Symbol(null,"vec","vec",982683596,null),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null))),197,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15195),null,(1),null)),(2),null)),null]));
}

}catch (e15089){var t__2020__auto___15197 = e15089;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",58,new cljs.core.Keyword(null,"error","error",-978969032),22,197,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(401),(401),(401),(401)], null),cljs.core.list(new cljs.core.Symbol(null,"vec","vec",982683596,null),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null))),197,t__2020__auto___15197,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15198 = false;
if(value__1987__auto___15198){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15198,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15198,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15090){var t__2020__auto___15199 = e15090;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15199,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15084","meta15084",-403993123,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15083");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15083");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15083.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15083 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15083(meta15084){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083(meta15084));
});


kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected = (function kotobase_protocols_worker$shell_test$an_anonymous_s3_read_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15083(null));
});

(kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","an-anonymous-s3-read-is-rejected","kotobase-protocols-worker.shell-test/an-anonymous-s3-read-is-rejected",-852629969,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"an-anonymous-s3-read-is-rejected","an-anonymous-s3-read-is-rejected",-1808837089,null),"kotobase_protocols_worker/shell_test.cljs",42,1,185,185,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected)?kotobase_protocols_worker.shell_test.an_anonymous_s3_read_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091 = (function (meta15092){
this.meta15092 = meta15092;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15093,meta15092__$1){
var self__ = this;
var _15093__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091(meta15092__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15093){
var self__ = this;
var _15093__$1 = this;
return self__.meta15092;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15095 = (arguments.length - (1));
switch (G__15095) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.prototype.apply = (function (self__,args15094){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15094.length > (20)))?(function (){var G__15096 = args15094.slice((0),(20));
G__15096.push(args15094.slice((20)));

return G__15096;
})():args15094)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var env = ({"APEX": "kotobase.net", "WRITE_TOKEN": "t0k3n", "CACAO_OPERATOR_DIDS": ""});
var req = (new Request("https://s3.kotobase.net/bkt/secret.txt",({"method": "GET", "headers": ({"authorization": "Bearer t0k3n"})})));
return kotobase_protocols_worker.shell_test.status_of(env,req).then((function (status){
try{var values__1983__auto___15201 = (new cljs.core.List(null,(401),(new cljs.core.List(null,status,null,(1),null)),(2),null));
var result__1984__auto___15202 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.not_EQ_,values__1983__auto___15201);
if(cljs.core.truth_(result__1984__auto___15202)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",52,new cljs.core.Keyword(null,"pass","pass",1574159993),35,211,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"status","status",-357266886,null)),211,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___15201),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",52,new cljs.core.Keyword(null,"fail","fail",1706214930),35,211,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"status","status",-357266886,null)),211,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"not=","not=",1466536204,null),values__1983__auto___15201),null,(1),null)),(2),null)),null]));
}

}catch (e15097){var t__2020__auto___15203 = e15097;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",52,new cljs.core.Keyword(null,"error","error",-978969032),35,211,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"status","status",-357266886,null)),211,t__2020__auto___15203,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15204 = false;
if(value__1987__auto___15204){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15204,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15204,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15098){var t__2020__auto___15205 = e15098;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15205,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15092","meta15092",-507735669,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15091");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15091");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15091.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15091 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15091(meta15092){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091(meta15092));
});


kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate = (function kotobase_protocols_worker$shell_test$a_bearer_credential_passes_the_read_gate(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15091(null));
});

(kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","a-bearer-credential-passes-the-read-gate","kotobase-protocols-worker.shell-test/a-bearer-credential-passes-the-read-gate",132750703,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"a-bearer-credential-passes-the-read-gate","a-bearer-credential-passes-the-read-gate",-253072033,null),"kotobase_protocols_worker/shell_test.cljs",50,1,201,201,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate)?kotobase_protocols_worker.shell_test.a_bearer_credential_passes_the_read_gate.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099 = (function (meta15100){
this.meta15100 = meta15100;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15101,meta15100__$1){
var self__ = this;
var _15101__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099(meta15100__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15101){
var self__ = this;
var _15101__$1 = this;
return self__.meta15100;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15103 = (arguments.length - (1));
switch (G__15103) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.prototype.apply = (function (self__,args15102){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15102.length > (20)))?(function (){var G__15104 = args15102.slice((0),(20));
G__15104.push(args15102.slice((20)));

return G__15104;
})():args15102)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
var req = (new Request("https://gremlin.kotobase.net/gremlin",({"method": "GET", "headers": ({"upgrade": "websocket", "connection": "Upgrade", "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==", "sec-websocket-version": "13"})})));
return kotobase_protocols_worker.shell_test.response_of(kotobase_protocols_worker.shell_test.no_r2,req).then((function (response){
try{var values__1983__auto___15207 = (new cljs.core.List(null,(401),(new cljs.core.List(null,response.status,null,(1),null)),(2),null));
var result__1984__auto___15208 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15207);
if(cljs.core.truth_(result__1984__auto___15208)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"pass","pass",1574159993),24,229,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),229,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15207),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"fail","fail",1706214930),24,229,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),229,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15207),null,(1),null)),(2),null)),null]));
}

}catch (e15105){var t__2020__auto___15209 = e15105;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",51,new cljs.core.Keyword(null,"error","error",-978969032),24,229,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(401),cljs.core.list(new cljs.core.Symbol(null,".-status",".-status",1871143706,null),new cljs.core.Symbol(null,"response","response",572107335,null))),229,t__2020__auto___15209,null]));
}
try{var values__1983__auto___15210 = (new cljs.core.List(null,"Bearer",(new cljs.core.List(null,response.headers.get("www-authenticate"),null,(1),null)),(2),null));
var result__1984__auto___15211 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15210);
if(cljs.core.truth_(result__1984__auto___15211)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"pass","pass",1574159993),24,230,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"Bearer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"www-authenticate")),230,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15210),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"fail","fail",1706214930),24,230,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"Bearer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"www-authenticate")),230,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15210),null,(1),null)),(2),null)),null]));
}

}catch (e15106){var t__2020__auto___15212 = e15106;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",83,new cljs.core.Keyword(null,"error","error",-978969032),24,230,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"Bearer",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"www-authenticate")),230,t__2020__auto___15212,null]));
}
try{var values__1983__auto___15213 = (new cljs.core.List(null,"nosniff",(new cljs.core.List(null,response.headers.get("x-content-type-options"),null,(1),null)),(2),null));
var result__1984__auto___15214 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,values__1983__auto___15213);
if(cljs.core.truth_(result__1984__auto___15214)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",90,new cljs.core.Keyword(null,"pass","pass",1574159993),24,231,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),231,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15213),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",90,new cljs.core.Keyword(null,"fail","fail",1706214930),24,231,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),231,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"=","=",-1501502141,null),values__1983__auto___15213),null,(1),null)),(2),null)),null]));
}

}catch (e15107){var t__2020__auto___15215 = e15107;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",90,new cljs.core.Keyword(null,"error","error",-978969032),24,231,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),"nosniff",cljs.core.list(new cljs.core.Symbol(null,".get",".get",1446963300,null),cljs.core.list(new cljs.core.Symbol(null,".-headers",".-headers",-1447582754,null),new cljs.core.Symbol(null,"response","response",572107335,null)),"x-content-type-options")),231,t__2020__auto___15215,null]));
}
return response.text();
})).then((function (body){
try{var values__1983__auto___15216 = (new cljs.core.List(null,/reads require a credential/,(new cljs.core.List(null,body,null,(1),null)),(2),null));
var result__1984__auto___15217 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.re_find,values__1983__auto___15216);
if(cljs.core.truth_(result__1984__auto___15217)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",68,new cljs.core.Keyword(null,"pass","pass",1574159993),24,234,cljs.core.list(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),/reads require a credential/,new cljs.core.Symbol(null,"body","body",-408674142,null)),234,cljs.core.cons(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),values__1983__auto___15216),null]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",68,new cljs.core.Keyword(null,"fail","fail",1706214930),24,234,cljs.core.list(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),/reads require a credential/,new cljs.core.Symbol(null,"body","body",-408674142,null)),234,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),values__1983__auto___15216),null,(1),null)),(2),null)),null]));
}

}catch (e15108){var t__2020__auto___15218 = e15108;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",68,new cljs.core.Keyword(null,"error","error",-978969032),24,234,cljs.core.list(new cljs.core.Symbol(null,"re-find","re-find",1143444147,null),/reads require a credential/,new cljs.core.Symbol(null,"body","body",-408674142,null)),234,t__2020__auto___15218,null]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15219 = false;
if(value__1987__auto___15219){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15219,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15219,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15109){var t__2020__auto___15220 = e15109;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15220,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15100","meta15100",1307408954,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15099");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15099");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15099.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15099 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15099(meta15100){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099(meta15100));
});


kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected = (function kotobase_protocols_worker$shell_test$an_anonymous_gremlin_websocket_handshake_is_rejected(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15099(null));
});

(kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","an-anonymous-gremlin-websocket-handshake-is-rejected","kotobase-protocols-worker.shell-test/an-anonymous-gremlin-websocket-handshake-is-rejected",1948595262,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"an-anonymous-gremlin-websocket-handshake-is-rejected","an-anonymous-gremlin-websocket-handshake-is-rejected",1294656558,null),"kotobase_protocols_worker/shell_test.cljs",62,1,214,214,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected)?kotobase_protocols_worker.shell_test.an_anonymous_gremlin_websocket_handshake_is_rejected.cljs$lang$test:null)])));

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.test.IAsyncTest}
 * @implements {cljs.core.IWithMeta}
*/
kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111 = (function (meta15112){
this.meta15112 = meta15112;
this.cljs$lang$protocol_mask$partition0$ = 393217;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15113,meta15112__$1){
var self__ = this;
var _15113__$1 = this;
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111(meta15112__$1));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15113){
var self__ = this;
var _15113__$1 = this;
return self__.meta15112;
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.prototype.cljs$test$IAsyncTest$ = cljs.core.PROTOCOL_SENTINEL);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.prototype.call = (function (unused__2343__auto__){
var self__ = this;
var self__ = this;
var G__15115 = (arguments.length - (1));
switch (G__15115) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
default:
throw (new Error((""+"Invalid arity: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1))))));

}
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.prototype.apply = (function (self__,args15114){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat((((args15114.length > (20)))?(function (){var G__15116 = args15114.slice((0),(20));
G__15116.push(args15114.slice((20)));

return G__15116;
})():args15114)));
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.prototype.cljs$core$IFn$_invoke$arity$1 = (function (done){
var self__ = this;
var ___2031__auto__ = this;
return (async function (){
return Promise.all([kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://ipfs.kotobase.net/ipfs/bafyfake")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://git.kotobase.net/r/info/refs")),kotobase_protocols_worker.shell_test.status_of(kotobase_protocols_worker.shell_test.no_r2,kotobase_protocols_worker.shell_test.fetch_req("GET","https://s3.kotobase.net/health"))]).then((function (statuses){
try{var values__1983__auto___15222 = (new cljs.core.List(null,(function (p1__15110_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((401),p1__15110_SHARP_);
}),(new cljs.core.List(null,statuses,null,(1),null)),(2),null));
var result__1984__auto___15223 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.every_QMARK_,values__1983__auto___15222);
if(cljs.core.truth_(result__1984__auto___15223)){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",53,new cljs.core.Keyword(null,"pass","pass",1574159993),22,248,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__15110#","p1__15110#",-1933657412,null)], null),cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"p1__15110#","p1__15110#",-1933657412,null))),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null)),248,cljs.core.cons(new cljs.core.Symbol(null,"every?","every?",2083724064,null),values__1983__auto___15222),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(statuses)))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",53,new cljs.core.Keyword(null,"fail","fail",1706214930),22,248,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__15110#","p1__15110#",-1933657412,null)], null),cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"p1__15110#","p1__15110#",-1933657412,null))),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null)),248,(new cljs.core.List(null,new cljs.core.Symbol(null,"not","not",1044554643,null),(new cljs.core.List(null,cljs.core.cons(new cljs.core.Symbol(null,"every?","every?",2083724064,null),values__1983__auto___15222),null,(1),null)),(2),null)),(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(statuses)))]));
}

}catch (e15117){var t__2020__auto___15224 = e15117;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],["kotobase_protocols_worker/shell_test.cljs",53,new cljs.core.Keyword(null,"error","error",-978969032),22,248,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__15110#","p1__15110#",-1933657412,null)], null),cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),(401),new cljs.core.Symbol(null,"p1__15110#","p1__15110#",-1933657412,null))),new cljs.core.Symbol(null,"statuses","statuses",-1943513723,null)),248,t__2020__auto___15224,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(statuses)))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
})).catch((function (e){
try{var value__1987__auto___15225 = false;
if(value__1987__auto___15225){
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"pass","pass",1574159993),null,null,false,null,value__1987__auto___15225,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
} else {
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"fail","fail",1706214930),null,null,false,null,value__1987__auto___15225,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}

}catch (e15118){var t__2020__auto___15226 = e15118;
cljs.test.report.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"expected","expected",1583670997),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"actual","actual",107306363),new cljs.core.Keyword(null,"message","message",-406056002)],[null,null,new cljs.core.Keyword(null,"error","error",-978969032),null,null,false,null,t__2020__auto___15226,(""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e))]));
}
return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
})();
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta15112","meta15112",459452257,null)], null);
}));

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.cljs$lang$type = true);

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.cljs$lang$ctorStr = "kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15111");

(kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15111");
}));

/**
 * Positional factory function for kotobase-protocols-worker.shell-test/t_kotobase_protocols_worker$shell_test15111.
 */
kotobase_protocols_worker.shell_test.__GT_t_kotobase_protocols_worker$shell_test15111 = (function kotobase_protocols_worker$shell_test$__GT_t_kotobase_protocols_worker$shell_test15111(meta15112){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111(meta15112));
});


kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous = (function kotobase_protocols_worker$shell_test$public_surfaces_are_still_anonymous(){
return cljs.test.test_var(kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$var);
});
kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$test = (function (){
return (new kotobase_protocols_worker.shell_test.t_kotobase_protocols_worker$shell_test15111(null));
});

(kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$var = new cljs.core.Var(function(){return kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous;},new cljs.core.Symbol("kotobase-protocols-worker.shell-test","public-surfaces-are-still-anonymous","kotobase-protocols-worker.shell-test/public-surfaces-are-still-anonymous",1754659102,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[cljs.core.with_meta(new cljs.core.Symbol(null,"kotobase-protocols-worker.shell-test","kotobase-protocols-worker.shell-test",1627519214,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),"The SigV4 write-auth path, driven end to end.\n\n  Canonicalization and the HMAC ladder moved to kotoba-lang/sigv4, which proves\n  them against AWS's published vectors. What that cannot prove is that *this*\n  worker still composes them correctly \u2014 the akid check, the payload-hash\n  check, and the header set it feeds the verifier. So these tests sign a\n  request with the shared library, exactly as an S3 client would, and require\n  the worker to accept it \u2014 then require it to reject each way it should."], null)),new cljs.core.Symbol(null,"public-surfaces-are-still-anonymous","public-surfaces-are-still-anonymous",-1315567346,null),"kotobase_protocols_worker/shell_test.cljs",45,1,238,238,cljs.core.List.EMPTY,null,(cljs.core.truth_(kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous)?kotobase_protocols_worker.shell_test.public_surfaces_are_still_anonymous.cljs$lang$test:null)])));

//# sourceMappingURL=kotobase_protocols_worker.shell_test.js.map
