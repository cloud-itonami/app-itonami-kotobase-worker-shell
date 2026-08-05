goog.provide('graphql.ports');

/**
 * GraphQL フィールドの解決。フィールドセレクションごとに一度呼ばれる。
 * 
 *   - type-name:  解決中の GraphQL 型名 (String)
 *   - field-name: フィールド名 (String)
 *   - parent:     親オブジェクト(任意の値。ルートフィールドでは nil またはルート値)
 *   - args:        クエリからパースされた引数マップ {field-name → value}
 *   - ctx:         execute-query から透過的に渡されるコンテキスト値
 * @interface
 */
graphql.ports.IResolver = function(){};

var graphql$ports$IResolver$resolve$dyn_7833 = (function (this$,type_name,field_name,parent,args,ctx){
var x__5519__auto__ = (((this$ == null))?null:this$);
var m__5520__auto__ = (graphql.ports.resolve[goog.typeOf(x__5519__auto__)]);
if((!((m__5520__auto__ == null)))){
return (m__5520__auto__.cljs$core$IFn$_invoke$arity$6 ? m__5520__auto__.cljs$core$IFn$_invoke$arity$6(this$,type_name,field_name,parent,args,ctx) : m__5520__auto__.call(null,this$,type_name,field_name,parent,args,ctx));
} else {
var m__5518__auto__ = (graphql.ports.resolve["_"]);
if((!((m__5518__auto__ == null)))){
return (m__5518__auto__.cljs$core$IFn$_invoke$arity$6 ? m__5518__auto__.cljs$core$IFn$_invoke$arity$6(this$,type_name,field_name,parent,args,ctx) : m__5518__auto__.call(null,this$,type_name,field_name,parent,args,ctx));
} else {
throw cljs.core.missing_protocol("IResolver.resolve",this$);
}
}
});
/**
 * type-name field-name parent args ctx → 解決された値
 */
graphql.ports.resolve = (function graphql$ports$resolve(this$,type_name,field_name,parent,args,ctx){
if((((!((this$ == null)))) && ((!((this$.graphql$ports$IResolver$resolve$arity$6 == null)))))){
return this$.graphql$ports$IResolver$resolve$arity$6(this$,type_name,field_name,parent,args,ctx);
} else {
return graphql$ports$IResolver$resolve$dyn_7833(this$,type_name,field_name,parent,args,ctx);
}
});


//# sourceMappingURL=graphql.ports.js.map
