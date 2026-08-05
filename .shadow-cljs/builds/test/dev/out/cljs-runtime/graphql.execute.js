goog.provide('graphql.execute');
/**
 * 一つのフィールドセレクションを `parent`(type-name 型)に対して解決する。
 */
graphql.execute.execute_field = (function graphql$execute$execute_field(ports,schema,type_name,parent,selection,ctx){
var field_name = new cljs.core.Keyword("graphql","field","graphql/field",-1549739757).cljs$core$IFn$_invoke$arity$1(selection);
var args = new cljs.core.Keyword("graphql","args","graphql/args",523331817).cljs$core$IFn$_invoke$arity$1(selection);
var sels = new cljs.core.Keyword("graphql","selections","graphql/selections",-1556956402).cljs$core$IFn$_invoke$arity$1(selection);
var value = graphql.ports.resolve(new cljs.core.Keyword(null,"resolver","resolver",-1740553583).cljs$core$IFn$_invoke$arity$1(ports),type_name,field_name,parent,args,ctx);
if(cljs.core.seq(sels)){
var type_def = graphql.model.get_type(schema,type_name);
var field_meta = graphql.model.field_by_name(type_def,field_name);
var ret_type = new cljs.core.Keyword("graphql","type","graphql/type",1313045893).cljs$core$IFn$_invoke$arity$1(field_meta);
if(cljs.core.sequential_QMARK_(value)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__12905_SHARP_){
return (graphql.execute.execute_selections.cljs$core$IFn$_invoke$arity$6 ? graphql.execute.execute_selections.cljs$core$IFn$_invoke$arity$6(ports,schema,ret_type,p1__12905_SHARP_,sels,ctx) : graphql.execute.execute_selections.call(null,ports,schema,ret_type,p1__12905_SHARP_,sels,ctx));
}),value);
} else {
if((value == null)){
return null;
} else {
return (graphql.execute.execute_selections.cljs$core$IFn$_invoke$arity$6 ? graphql.execute.execute_selections.cljs$core$IFn$_invoke$arity$6(ports,schema,ret_type,value,sels,ctx) : graphql.execute.execute_selections.call(null,ports,schema,ret_type,value,sels,ctx));

}
}
} else {
return value;
}
});
/**
 * セレクションリストを `parent`(type-name 型)に対して解決し、
 *   フィールド名 → 値 のマップを返す。
 */
graphql.execute.execute_selections = (function graphql$execute$execute_selections(ports,schema,type_name,parent,selections,ctx){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,sel){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,new cljs.core.Keyword("graphql","field","graphql/field",-1549739757).cljs$core$IFn$_invoke$arity$1(sel),graphql.execute.execute_field(ports,schema,type_name,parent,sel,ctx));
}),cljs.core.PersistentArrayMap.EMPTY,selections);
});
/**
 * パース済みクエリ AST をスキーマとポートに対して実行し、結果マップを返す。
 * 
 *   - ports:       {:resolver IResolver} を含むマップ
 *   - schema:      graphql.model スキーマ
 *   - query-ast:   graphql.query/parse-query が返すセレクション vector
 *   - root-value:  ルートフィールド解決時に parent として渡される値
 *   - ctx:         全リゾルバに透過的に渡されるコンテキスト値
 * 
 *   戻り値: {field-name → resolved-value} のマップ
 */
graphql.execute.execute_query = (function graphql$execute$execute_query(ports,schema,query_ast,root_value,ctx){
var query_root_name = graphql.model.query_root(schema);
return graphql.execute.execute_selections(ports,schema,query_root_name,root_value,query_ast,ctx);
});

/**
* @constructor
 * @implements {graphql.ports.IResolver}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
graphql.execute.t_graphql$execute12906 = (function (meta12907){
this.meta12907 = meta12907;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(graphql.execute.t_graphql$execute12906.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12908,meta12907__$1){
var self__ = this;
var _12908__$1 = this;
return (new graphql.execute.t_graphql$execute12906(meta12907__$1));
}));

(graphql.execute.t_graphql$execute12906.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12908){
var self__ = this;
var _12908__$1 = this;
return self__.meta12907;
}));

(graphql.execute.t_graphql$execute12906.prototype.graphql$ports$IResolver$ = cljs.core.PROTOCOL_SENTINEL);

(graphql.execute.t_graphql$execute12906.prototype.graphql$ports$IResolver$resolve$arity$6 = (function (_,_type_name,field_name,parent,_args,_ctx){
var self__ = this;
var ___$1 = this;
var or__5162__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(parent,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(field_name));
if(cljs.core.truth_(or__5162__auto__)){
return or__5162__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(parent,field_name);
}
}));

(graphql.execute.t_graphql$execute12906.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta12907","meta12907",1243157046,null)], null);
}));

(graphql.execute.t_graphql$execute12906.cljs$lang$type = true);

(graphql.execute.t_graphql$execute12906.cljs$lang$ctorStr = "graphql.execute/t_graphql$execute12906");

(graphql.execute.t_graphql$execute12906.cljs$lang$ctorPrWriter = (function (this__5455__auto__,writer__5456__auto__,opt__5457__auto__){
return cljs.core._write(writer__5456__auto__,"graphql.execute/t_graphql$execute12906");
}));

/**
 * Positional factory function for graphql.execute/t_graphql$execute12906.
 */
graphql.execute.__GT_t_graphql$execute12906 = (function graphql$execute$__GT_t_graphql$execute12906(meta12907){
return (new graphql.execute.t_graphql$execute12906(meta12907));
});


/**
 * デフォルトリゾルバ: (get parent (keyword field-name)) で解決し、
 *   見つからない場合は文字列キー (get parent field-name) にフォールバックする。
 *   plain map のフィールドアクセスで任意のモデルをホスト実装なしで実行できる。
 */
graphql.execute.default_ports = (function graphql$execute$default_ports(){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"resolver","resolver",-1740553583),(new graphql.execute.t_graphql$execute12906(cljs.core.PersistentArrayMap.EMPTY))], null);
});

//# sourceMappingURL=graphql.execute.js.map
