goog.provide('graphql.query');
/**
 * 文字列リテラル・数値・識別子・クエリ区切り記号にマッチするトークン正規表現。
 */
graphql.query.tok_re = /\"(?:[^\"\\]|\\.)*\"|[A-Za-z_][A-Za-z0-9_]*|-?[0-9]+(?:\.[0-9]+)?|[:{}\[\]()|!$@=]/;
/**
 * # コメントを除去してトークン列(文字列 vector)を返す。
 */
graphql.query.tokenize = (function graphql$query$tokenize(s){
var no_comments = clojure.string.replace(s,/#[^\n]*/,"");
return cljs.core.vec(cljs.core.re_seq(graphql.query.tok_re,no_comments));
});
graphql.query.at = (function graphql$query$at(tokens,i){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(tokens,i,null);
});
/**
 * 引数値リテラルをパースし [value next-i] を返す。
 *   対応: 文字列(クォート除去)・整数・浮動小数点・真偽値・列挙値(文字列として返す)。
 */
graphql.query.parse_value = (function graphql$query$parse_value(tokens,i){
var tok = graphql.query.at(tokens,i);
if((tok == null)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,i], null);
} else {
if(clojure.string.starts_with_QMARK_(tok,"\"")){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(tok,(1),(cljs.core.count(tok) - (1))),(i + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("true",tok)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(i + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("false",tok)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,(i + (1))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("null",tok)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(i + (1))], null);
} else {
if(cljs.core.truth_(cljs.core.re_matches(/-?[0-9]+\.[0-9]+/,tok))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [parseFloat(tok),(i + (1))], null);
} else {
if(cljs.core.truth_(cljs.core.re_matches(/-?[0-9]+/,tok))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [parseInt(tok,(10)),(i + (1))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tok,(i + (1))], null);

}
}
}
}
}
}
}
});
/**
 * 引数リスト '(' (name ':' value)* ')' をパースし [args-map next-i] を返す。
 *   i は '(' の位置。
 */
graphql.query.parse_args = (function graphql$query$parse_args(tokens,i){
var i__$1 = (i + (1));
var args = cljs.core.PersistentArrayMap.EMPTY;
while(true){
var tok = graphql.query.at(tokens,i__$1);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(")",tok)) || ((tok == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [args,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(")",tok))?(i__$1 + (1)):i__$1)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@",tok)){
var G__12936 = (i__$1 + (2));
var G__12937 = args;
i__$1 = G__12936;
args = G__12937;
continue;
} else {
var name = tok;
var i2 = (i__$1 + (1));
var i3 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(":",graphql.query.at(tokens,i2)))?(i2 + (1)):i2);
var vec__12912 = graphql.query.parse_value(tokens,i3);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12912,(0),null);
var i4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12912,(1),null);
var G__12938 = i4;
var G__12939 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(args,name,value);
i__$1 = G__12938;
args = G__12939;
continue;

}
}
break;
}
});
/**
 * フィールドセレクションをパースし [selection-map next-i] を返す。
 */
graphql.query.parse_field = (function graphql$query$parse_field(tokens,i){
var first_name = graphql.query.at(tokens,i);
var i2 = (i + (1));
var vec__12915 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(":",graphql.query.at(tokens,i2)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [graphql.query.at(tokens,(i2 + (1))),(i2 + (2))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [first_name,i2], null));
var field_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12915,(0),null);
var i3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12915,(1),null);
var vec__12918 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("(",graphql.query.at(tokens,i3)))?graphql.query.parse_args(tokens,i3):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,i3], null));
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12918,(0),null);
var i4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12918,(1),null);
var vec__12921 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("{",graphql.query.at(tokens,i4)))?(graphql.query.parse_selection_set.cljs$core$IFn$_invoke$arity$2 ? graphql.query.parse_selection_set.cljs$core$IFn$_invoke$arity$2(tokens,i4) : graphql.query.parse_selection_set.call(null,tokens,i4)):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,i4], null));
var sels = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12921,(0),null);
var i5 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12921,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("graphql","field","graphql/field",-1549739757),field_name,new cljs.core.Keyword("graphql","args","graphql/args",523331817),args,new cljs.core.Keyword("graphql","selections","graphql/selections",-1556956402),sels], null),i5], null);
});
/**
 * セレクションセット '{' selection* '}' をパースし [selections next-i] を返す。
 *   i は '{' の位置。
 */
graphql.query.parse_selection_set = (function graphql$query$parse_selection_set(tokens,i){
var i__$1 = (i + (1));
var sels = cljs.core.PersistentVector.EMPTY;
while(true){
var tok = graphql.query.at(tokens,i__$1);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok)) || ((tok == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sels,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok))?(i__$1 + (1)):i__$1)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("...",tok)){
var i2 = (i__$1 + (1));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("on",graphql.query.at(tokens,i2))){
var i3 = (i2 + (2));
var vec__12930 = (graphql.query.parse_selection_set.cljs$core$IFn$_invoke$arity$2 ? graphql.query.parse_selection_set.cljs$core$IFn$_invoke$arity$2(tokens,i3) : graphql.query.parse_selection_set.call(null,tokens,i3));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12930,(0),null);
var i4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12930,(1),null);
var G__12940 = i4;
var G__12941 = sels;
i__$1 = G__12940;
sels = G__12941;
continue;
} else {
var G__12942 = (i2 + (1));
var G__12943 = sels;
i__$1 = G__12942;
sels = G__12943;
continue;
}
} else {
var vec__12933 = graphql.query.parse_field(tokens,i__$1);
var field = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12933,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12933,(1),null);
var G__12944 = i2;
var G__12945 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(sels,field);
i__$1 = G__12944;
sels = G__12945;
continue;

}
}
break;
}
});
/**
 * GraphQL クエリ/ミューテーション文字列をセレクション AST(マップの vector)にパースする。
 * 
 *   ショートハンド形式 '{ ... }' と名前付き操作 'query Name? { ... }' の両方を処理する。
 */
graphql.query.parse_query = (function graphql$query$parse_query(query_str){
var tokens = graphql.query.tokenize(query_str);
var tok0 = graphql.query.at(tokens,(0));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("{",tok0)){
return cljs.core.first(graphql.query.parse_selection_set(tokens,(0)));
} else {
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["query",null,"mutation",null,"subscription",null], null), null),tok0)){
var i1 = (1);
var i2 = (cljs.core.truth_((function (){var and__5160__auto__ = graphql.query.at(tokens,i1);
if(cljs.core.truth_(and__5160__auto__)){
return ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("{",graphql.query.at(tokens,i1))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("(",graphql.query.at(tokens,i1))));
} else {
return and__5160__auto__;
}
})())?(i1 + (1)):i1);
var i3 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("(",graphql.query.at(tokens,i2)))?cljs.core.second(graphql.query.parse_args(tokens,i2)):i2);
return cljs.core.first(graphql.query.parse_selection_set(tokens,i3));
} else {
return cljs.core.PersistentVector.EMPTY;

}
}
});

//# sourceMappingURL=graphql.query.js.map
