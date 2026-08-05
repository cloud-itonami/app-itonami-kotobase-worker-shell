goog.provide('graphql.model');
graphql.model.builtin_scalars = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, ["ID",null,"String",null,"Int",null,"Float",null,"Boolean",null], null), null);
graphql.model.type_kinds = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"enum","enum",1679018432),null,new cljs.core.Keyword(null,"interface","interface",394869923),null,new cljs.core.Keyword(null,"scalar","scalar",1611359571),null,new cljs.core.Keyword(null,"input","input",556931961),null,new cljs.core.Keyword(null,"union","union",2142937499),null,new cljs.core.Keyword(null,"object","object",1474613949),null], null), null);
/**
 * 空のスキーマを返す。
 */
graphql.model.schema = (function graphql$model$schema(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("graphql","types","graphql/types",971068154),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("graphql","query-root","graphql/query-root",-483655131),null], null);
});
/**
 * 型定義をスキーマに追加する。:graphql/name がキーになる。
 */
graphql.model.add_type = (function graphql$model$add_type(schema,type_def){
return cljs.core.assoc_in(schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("graphql","types","graphql/types",971068154),new cljs.core.Keyword("graphql","name","graphql/name",-575568856).cljs$core$IFn$_invoke$arity$1(type_def)], null),type_def);
});
/**
 * クエリルート型名をスキーマに設定する。
 */
graphql.model.set_query_root = (function graphql$model$set_query_root(schema,name){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(schema,new cljs.core.Keyword("graphql","query-root","graphql/query-root",-483655131),name);
});
/**
 * 型定義マップを構築する。kind は type-kinds の要素。
 */
graphql.model.type_def = (function graphql$model$type_def(var_args){
var G__10925 = arguments.length;
switch (G__10925) {
case 2:
return graphql.model.type_def.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return graphql.model.type_def.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(graphql.model.type_def.cljs$core$IFn$_invoke$arity$2 = (function (name,kind){
return graphql.model.type_def.cljs$core$IFn$_invoke$arity$3(name,kind,cljs.core.PersistentVector.EMPTY);
}));

(graphql.model.type_def.cljs$core$IFn$_invoke$arity$3 = (function (name,kind,fields){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name,new cljs.core.Keyword("graphql","kind","graphql/kind",-1534877602),kind,new cljs.core.Keyword("graphql","fields","graphql/fields",-1688646079),fields], null);
}));

(graphql.model.type_def.cljs$lang$maxFixedArity = 3);

/**
 * フィールド定義マップを構築する。opts: {:list? :non-null? :args}。
 */
graphql.model.field_def = (function graphql$model$field_def(var_args){
var G__10927 = arguments.length;
switch (G__10927) {
case 2:
return graphql.model.field_def.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return graphql.model.field_def.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(graphql.model.field_def.cljs$core$IFn$_invoke$arity$2 = (function (name,type_name){
return graphql.model.field_def.cljs$core$IFn$_invoke$arity$3(name,type_name,cljs.core.PersistentArrayMap.EMPTY);
}));

(graphql.model.field_def.cljs$core$IFn$_invoke$arity$3 = (function (name,type_name,opts){
var G__10928 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name,new cljs.core.Keyword("graphql","type","graphql/type",1313045893),type_name,new cljs.core.Keyword("graphql","list?","graphql/list?",778008377),cljs.core.boolean$(new cljs.core.Keyword(null,"list?","list?",-1642026156).cljs$core$IFn$_invoke$arity$1(opts)),new cljs.core.Keyword("graphql","non-null?","graphql/non-null?",959218937),cljs.core.boolean$(new cljs.core.Keyword(null,"non-null?","non-null?",670069040).cljs$core$IFn$_invoke$arity$1(opts))], null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__10928,new cljs.core.Keyword("graphql","args","graphql/args",523331817),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(opts));
} else {
return G__10928;
}
}));

(graphql.model.field_def.cljs$lang$maxFixedArity = 3);

/**
 * 引数定義マップを構築する。opts: {:list? :non-null?}。
 */
graphql.model.arg_def = (function graphql$model$arg_def(var_args){
var G__10930 = arguments.length;
switch (G__10930) {
case 2:
return graphql.model.arg_def.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return graphql.model.arg_def.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",arguments.length].join("")));

}
});

(graphql.model.arg_def.cljs$core$IFn$_invoke$arity$2 = (function (name,type_name){
return graphql.model.arg_def.cljs$core$IFn$_invoke$arity$3(name,type_name,cljs.core.PersistentArrayMap.EMPTY);
}));

(graphql.model.arg_def.cljs$core$IFn$_invoke$arity$3 = (function (name,type_name,opts){
var G__10931 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("graphql","name","graphql/name",-575568856),name,new cljs.core.Keyword("graphql","type","graphql/type",1313045893),type_name,new cljs.core.Keyword("graphql","non-null?","graphql/non-null?",959218937),cljs.core.boolean$(new cljs.core.Keyword(null,"non-null?","non-null?",670069040).cljs$core$IFn$_invoke$arity$1(opts))], null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"list?","list?",-1642026156).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__10931,new cljs.core.Keyword("graphql","list?","graphql/list?",778008377),true);
} else {
return G__10931;
}
}));

(graphql.model.arg_def.cljs$lang$maxFixedArity = 3);

graphql.model.get_type = (function graphql$model$get_type(schema,name){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("graphql","types","graphql/types",971068154),name], null));
});
graphql.model.all_types = (function graphql$model$all_types(schema){
return cljs.core.vals(new cljs.core.Keyword("graphql","types","graphql/types",971068154).cljs$core$IFn$_invoke$arity$1(schema));
});
graphql.model.query_root = (function graphql$model$query_root(schema){
return new cljs.core.Keyword("graphql","query-root","graphql/query-root",-483655131).cljs$core$IFn$_invoke$arity$1(schema);
});
graphql.model.fields = (function graphql$model$fields(type_def){
return new cljs.core.Keyword("graphql","fields","graphql/fields",-1688646079).cljs$core$IFn$_invoke$arity$1(type_def);
});
/**
 * 型定義からフィールド名でフィールドを検索する。
 */
graphql.model.field_by_name = (function graphql$model$field_by_name(type_def,fname){
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__10932_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(fname,new cljs.core.Keyword("graphql","name","graphql/name",-575568856).cljs$core$IFn$_invoke$arity$1(p1__10932_SHARP_));
}),new cljs.core.Keyword("graphql","fields","graphql/fields",-1688646079).cljs$core$IFn$_invoke$arity$1(type_def)));
});

//# sourceMappingURL=graphql.model.js.map
