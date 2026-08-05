goog.provide('graphql.sdl');
/**
 * 文字列リテラル・識別子・SDL 区切り記号にマッチするトークン正規表現。
 */
graphql.sdl.tok_re = /\"(?:[^\"\\]|\\.)*\"|[A-Za-z_][A-Za-z0-9_]*|[!:{}\[\]()|=@]/;
/**
 * # コメントを除去してトークン列(文字列 vector)を返す。
 */
graphql.sdl.tokenize = (function graphql$sdl$tokenize(s){
var no_comments = clojure.string.replace(s,/#[^\n]*/,"");
return cljs.core.vec(cljs.core.re_seq(graphql.sdl.tok_re,no_comments));
});
graphql.sdl.at = (function graphql$sdl$at(tokens,i){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(tokens,i,null);
});
/**
 * tokens[i] が expected であることを検証し i+1 を返す。
 */
graphql.sdl.expect = (function graphql$sdl$expect(tokens,i,expected){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected,graphql.sdl.at(tokens,i))){
return (i + (1));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"SDL parse error: expected '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expected)+"' but got '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(graphql.sdl.at(tokens,i))+"' at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pos","pos",-864607220),i,new cljs.core.Keyword(null,"got","got",-1674745710),graphql.sdl.at(tokens,i),new cljs.core.Keyword(null,"expected","expected",1583670997),expected], null));
}
});
/**
 * 型参照をパースし [{:graphql/type T :graphql/list? B :graphql/non-null? B} next-i] を返す。
 *   List 型は最外殻の nullability と要素型のみ保持する(ネスト list 非対応)。
 */
graphql.sdl.parse_type_ref = (function graphql$sdl$parse_type_ref(tokens,i){
var tok = graphql.sdl.at(tokens,i);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("[",tok)){
var vec__10936 = (function (){var G__10939 = tokens;
var G__10940 = (i + (1));
return (graphql.sdl.parse_type_ref.cljs$core$IFn$_invoke$arity$2 ? graphql.sdl.parse_type_ref.cljs$core$IFn$_invoke$arity$2(G__10939,G__10940) : graphql.sdl.parse_type_ref.call(null,G__10939,G__10940));
})();
var inner = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10936,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10936,(1),null);
var i3 = graphql.sdl.expect(tokens,i2,"]");
var non_null_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("!",graphql.sdl.at(tokens,i3));
var i4 = ((non_null_QMARK_)?(i3 + (1)):i3);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inner,new cljs.core.Keyword("graphql","list?","graphql/list?",778008377),true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("graphql","non-null?","graphql/non-null?",959218937),non_null_QMARK_], 0)),i4], null);
} else {
if(cljs.core.truth_((function (){var and__5160__auto__ = tok;
if(cljs.core.truth_(and__5160__auto__)){
return cljs.core.re_matches(/[A-Za-z_][A-Za-z0-9_]*/,tok);
} else {
return and__5160__auto__;
}
})())){
var i2 = (i + (1));
var non_null_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("!",graphql.sdl.at(tokens,i2));
var i3 = ((non_null_QMARK_)?(i2 + (1)):i2);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("graphql","type","graphql/type",1313045893),tok,new cljs.core.Keyword("graphql","list?","graphql/list?",778008377),false,new cljs.core.Keyword("graphql","non-null?","graphql/non-null?",959218937),non_null_QMARK_], null),i3], null);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((""+"SDL parse error: expected type name or '[' at position "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pos","pos",-864607220),i,new cljs.core.Keyword(null,"tok","tok",2091731382),tok], null));

}
}
});
/**
 * 引数定義 name: TypeRef (= default)? をパースし [arg-map next-i] を返す。
 */
graphql.sdl.parse_arg_def = (function graphql$sdl$parse_arg_def(tokens,i){
var name = graphql.sdl.at(tokens,i);
var i2 = graphql.sdl.expect(tokens,(i + (1)),":");
var vec__10941 = graphql.sdl.parse_type_ref(tokens,i2);
var type_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10941,(0),null);
var i3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10941,(1),null);
var i4 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("=",graphql.sdl.at(tokens,i3)))?(i3 + (2)):i3);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name], null),type_info], 0)),i4], null);
});
/**
 * 引数リスト '(' arg-def* ')' をパースし [args next-i] を返す。i は '(' の位置。
 */
graphql.sdl.parse_arg_defs = (function graphql$sdl$parse_arg_defs(tokens,i){
var i__$1 = (i + (1));
var args = cljs.core.PersistentVector.EMPTY;
while(true){
var tok = graphql.sdl.at(tokens,i__$1);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(")",tok)) || ((tok == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [args,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(")",tok))?(i__$1 + (1)):i__$1)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@",tok)){
var G__10988 = (i__$1 + (2));
var G__10989 = args;
i__$1 = G__10988;
args = G__10989;
continue;
} else {
var vec__10947 = graphql.sdl.parse_arg_def(tokens,i__$1);
var arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10947,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10947,(1),null);
var G__10990 = i2;
var G__10991 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(args,arg);
i__$1 = G__10990;
args = G__10991;
continue;

}
}
break;
}
});
/**
 * フィールド定義 name args? ':' TypeRef をパースし [field-map next-i] を返す。
 */
graphql.sdl.parse_field_def = (function graphql$sdl$parse_field_def(tokens,i){
var name = graphql.sdl.at(tokens,i);
var i2 = (i + (1));
var vec__10950 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("(",graphql.sdl.at(tokens,i2)))?graphql.sdl.parse_arg_defs(tokens,i2):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,i2], null));
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10950,(0),null);
var i3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10950,(1),null);
var i4 = graphql.sdl.expect(tokens,i3,":");
var vec__10953 = graphql.sdl.parse_type_ref(tokens,i4);
var type_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10953,(0),null);
var i5 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10953,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__10956 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name], null),type_info], 0));
if(cljs.core.seq(args)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__10956,new cljs.core.Keyword("graphql","args","graphql/args",523331817),args);
} else {
return G__10956;
}
})(),i5], null);
});
/**
 * 型本体 '{' field-def* '}' をパースし [fields next-i] を返す。i は '{' の位置。
 */
graphql.sdl.parse_fields = (function graphql$sdl$parse_fields(tokens,i){
var i__$1 = graphql.sdl.expect(tokens,i,"{");
var i__$2 = i__$1;
var fields = cljs.core.PersistentVector.EMPTY;
while(true){
var tok = graphql.sdl.at(tokens,i__$2);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok)) || ((tok == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fields,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok))?(i__$2 + (1)):i__$2)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@",tok)){
var G__10992 = (i__$2 + (2));
var G__10993 = fields;
i__$2 = G__10992;
fields = G__10993;
continue;
} else {
var vec__10960 = graphql.sdl.parse_field_def(tokens,i__$2);
var field = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10960,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10960,(1),null);
var G__10994 = i2;
var G__10995 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(fields,field);
i__$2 = G__10994;
fields = G__10995;
continue;

}
}
break;
}
});
/**
 * enum 本体 '{' NAME* '}' をパースし [values next-i] を返す。i は '{' の位置。
 */
graphql.sdl.parse_enum_values = (function graphql$sdl$parse_enum_values(tokens,i){
var i__$1 = graphql.sdl.expect(tokens,i,"{");
var i__$2 = i__$1;
var vals = cljs.core.PersistentVector.EMPTY;
while(true){
var tok = graphql.sdl.at(tokens,i__$2);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok)) || ((tok == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vals,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok))?(i__$2 + (1)):i__$2)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@",tok)){
var G__10996 = (i__$2 + (2));
var G__10997 = vals;
i__$2 = G__10996;
vals = G__10997;
continue;
} else {
var G__10998 = (i__$2 + (1));
var G__10999 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(vals,tok);
i__$2 = G__10998;
vals = G__10999;
continue;

}
}
break;
}
});
/**
 * union メンバー '=' Name ('|' Name)* をパースし [members next-i] を返す。i は '=' の位置。
 */
graphql.sdl.parse_union_members = (function graphql$sdl$parse_union_members(tokens,i){
var i__$1 = graphql.sdl.expect(tokens,i,"=");
var n0 = graphql.sdl.at(tokens,i__$1);
var i__$2 = (i__$1 + (1));
var members = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [n0], null);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("|",graphql.sdl.at(tokens,i__$2))){
var n = graphql.sdl.at(tokens,(i__$2 + (1)));
var G__11000 = (i__$2 + (2));
var G__11001 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(members,n);
i__$2 = G__11000;
members = G__11001;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [members,i__$2], null);
}
break;
}
});
/**
 * schema ブロック '{' ... '}' をパースし [roots-map next-i] を返す。i は '{' の位置。
 */
graphql.sdl.parse_schema_block = (function graphql$sdl$parse_schema_block(tokens,i){
var i__$1 = graphql.sdl.expect(tokens,i,"{");
var i__$2 = i__$1;
var roots = cljs.core.PersistentArrayMap.EMPTY;
while(true){
var tok = graphql.sdl.at(tokens,i__$2);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok)) || ((tok == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [roots,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("}",tok))?(i__$2 + (1)):i__$2)], null);
} else {
var role = tok;
var i2 = graphql.sdl.expect(tokens,(i__$2 + (1)),":");
var tname = graphql.sdl.at(tokens,i2);
var G__11002 = (i2 + (1));
var G__11003 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(roots,role,tname);
i__$2 = G__11002;
roots = G__11003;
continue;

}
break;
}
});
/**
 * implements キーワードに続くインタフェース名列を '{' まで読み飛ばす。
 */
graphql.sdl.skip_implements = (function graphql$sdl$skip_implements(tokens,i){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("implements",graphql.sdl.at(tokens,i))){
var j = (i + (1));
while(true){
var t = graphql.sdl.at(tokens,j);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("{",t)) || ((t == null)))){
return j;
} else {
var G__11004 = (j + (1));
j = G__11004;
continue;
}
break;
}
} else {
return i;
}
});
/**
 * 一つのトップレベル定義をパースし [next-i updated-schema] を返す。
 */
graphql.sdl.parse_definition = (function graphql$sdl$parse_definition(tokens,i,schema){
var kw = graphql.sdl.at(tokens,i);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("type",kw)){
var name = graphql.sdl.at(tokens,(i + (1)));
var i2 = graphql.sdl.skip_implements(tokens,(i + (2)));
var vec__10963 = graphql.sdl.parse_fields(tokens,i2);
var fields = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10963,(0),null);
var i3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10963,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i3,graphql.model.add_type(schema,graphql.model.type_def.cljs$core$IFn$_invoke$arity$3(name,new cljs.core.Keyword(null,"object","object",1474613949),fields))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("input",kw)){
var name = graphql.sdl.at(tokens,(i + (1)));
var vec__10966 = graphql.sdl.parse_fields(tokens,(i + (2)));
var fields = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10966,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10966,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i2,graphql.model.add_type(schema,graphql.model.type_def.cljs$core$IFn$_invoke$arity$3(name,new cljs.core.Keyword(null,"input","input",556931961),fields))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("interface",kw)){
var name = graphql.sdl.at(tokens,(i + (1)));
var i2 = graphql.sdl.skip_implements(tokens,(i + (2)));
var vec__10969 = graphql.sdl.parse_fields(tokens,i2);
var fields = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10969,(0),null);
var i3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10969,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i3,graphql.model.add_type(schema,graphql.model.type_def.cljs$core$IFn$_invoke$arity$3(name,new cljs.core.Keyword(null,"interface","interface",394869923),fields))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("enum",kw)){
var name = graphql.sdl.at(tokens,(i + (1)));
var vec__10972 = graphql.sdl.parse_enum_values(tokens,(i + (2)));
var vals = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10972,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10972,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i2,graphql.model.add_type(schema,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name,new cljs.core.Keyword("graphql","kind","graphql/kind",-1534877602),new cljs.core.Keyword(null,"enum","enum",1679018432),new cljs.core.Keyword("graphql","values","graphql/values",88099451),vals,new cljs.core.Keyword("graphql","fields","graphql/fields",-1688646079),cljs.core.PersistentVector.EMPTY], null))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("union",kw)){
var name = graphql.sdl.at(tokens,(i + (1)));
var vec__10975 = graphql.sdl.parse_union_members(tokens,(i + (2)));
var members = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10975,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10975,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i2,graphql.model.add_type(schema,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name,new cljs.core.Keyword("graphql","kind","graphql/kind",-1534877602),new cljs.core.Keyword(null,"union","union",2142937499),new cljs.core.Keyword("graphql","members","graphql/members",435174967),members,new cljs.core.Keyword("graphql","fields","graphql/fields",-1688646079),cljs.core.PersistentVector.EMPTY], null))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("scalar",kw)){
var name = graphql.sdl.at(tokens,(i + (1)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(i + (2)),graphql.model.add_type(schema,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name,new cljs.core.Keyword("graphql","kind","graphql/kind",-1534877602),new cljs.core.Keyword(null,"scalar","scalar",1611359571),new cljs.core.Keyword("graphql","fields","graphql/fields",-1688646079),cljs.core.PersistentVector.EMPTY], null))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("schema",kw)){
var vec__10978 = graphql.sdl.parse_schema_block(tokens,(i + (1)));
var roots = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10978,(0),null);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10978,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i2,(function (){var G__10981 = schema;
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(roots,"query"))){
return graphql.model.set_query_root(G__10981,cljs.core.get.cljs$core$IFn$_invoke$arity$2(roots,"query"));
} else {
return G__10981;
}
})()], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(i + (1)),schema], null);

}
}
}
}
}
}
}
});
/**
 * GraphQL SDL 文字列を graphql.model スキーママップにパースする。
 * 
 *   schema ブロックが存在しない場合、GraphQL 仕様のデフォルトとして
 *   'Query' 型が存在すればそれをクエリルートに設定する。
 */
graphql.sdl.parse_schema = (function graphql$sdl$parse_schema(sdl){
var tokens = graphql.sdl.tokenize(sdl);
var i = (0);
var schema = graphql.model.schema();
while(true){
if((i >= cljs.core.count(tokens))){
if((((new cljs.core.Keyword("graphql","query-root","graphql/query-root",-483655131).cljs$core$IFn$_invoke$arity$1(schema) == null)) && (cljs.core.contains_QMARK_(new cljs.core.Keyword("graphql","types","graphql/types",971068154).cljs$core$IFn$_invoke$arity$1(schema),"Query")))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(schema,new cljs.core.Keyword("graphql","query-root","graphql/query-root",-483655131),"Query");
} else {
return schema;
}
} else {
var vec__10985 = graphql.sdl.parse_definition(tokens,i,schema);
var i2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10985,(0),null);
var schema2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10985,(1),null);
var G__11005 = i2;
var G__11006 = schema2;
i = G__11005;
schema = G__11006;
continue;
}
break;
}
});

//# sourceMappingURL=graphql.sdl.js.map
