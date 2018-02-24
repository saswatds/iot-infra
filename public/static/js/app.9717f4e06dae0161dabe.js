webpackJsonp([1],{0:function(e,t){},NGHf:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),o=n("zL8q"),r=n.n(o),l=(n("tvR6"),n("wUZ8")),p=n.n(l),a=(n("kX7f"),n("h636"),n("Dukv"),{render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]});var s=n("VU/8")({name:"App"},a,!1,function(e){n("NGHf")},null,null).exports,u=n("/ocq"),c=n("woOf"),m=n.n(c),d=n("o4sT"),f=n.n(d),v={computed:{pipelines:function(){return this.$store.getters["pipeline/list"]}},methods:{handleDelete:function(e,t){confirm("Are you sure?")&&this.$store.dispatch("pipeline/remove",t._id)}},beforeCreate:function(){this.$store.dispatch("pipeline/find")}},h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.pipelines}},[n("el-table-column",{attrs:{prop:"name",label:"Name"}}),e._v(" "),n("el-table-column",{attrs:{label:"Input"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.input&&t.row.input.length&&t.row.input.join(", "))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Output"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.output&&t.row.output.length&&t.row.output.join(", "))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Function"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.operations,function(t){return n("el-popover",{key:t.name,attrs:{trigger:"hover",placement:"bottom"}},[n("i",[e._v("function")]),e._v(" trigger(data, done) {"),n("br"),e._v(" "),n("span",{staticStyle:{"margin-left":"20px"}},[e._v(e._s(t.func))]),e._v(" "),n("br"),e._v("}\n          "),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.name))])],1)])})}}])}),e._v(" "),n("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){e.handleDelete(t.$index,t.row)}}},[e._v("Delete")])]}}])})],1)],1)},staticRenderFns:[]};var _=n("VU/8")(v,h,!1,function(e){n("zR3d")},null,null).exports,g={name:"Home",components:{editor:f.a,Pipeline:_},data:function(){return{pipelineForm:{name:"",input:[],output:[],code:""},doneRegx:/done\(([\sa-zA-Z"']+),([\sa-zA-Z0-9\(\)"'\{\}:]+)\)/}},methods:{createPipeline:function(){if(!this.pipelineForm.name)return this.$message.error("Opps, Pipeline name is required");if(!this.pipelineForm.input||!this.pipelineForm.input.length)return this.$message.error("Opps, atleast one input topic is needed");if(!this.pipelineForm.output||!this.pipelineForm.output.length)return this.$message.error("Opps, atleast one output topic is needed");if(!this.pipelineForm.code.match(this.doneRegx))return this.$message.error("Oops, done has to be called with both parameters");var e=m()({},{name:this.pipelineForm.name,input:this.pipelineForm.input,output:this.pipelineForm.output,operations:[{name:"tigger",func:this.pipelineForm.code}]});console.log("creating new pipeline"),this.$store.dispatch("pipeline/create",e)},resetForm:function(e){console.log(e),this.$refs[e].resetFields()}}},F={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[e._v("Pipeline Commander")]),e._v(" "),n("el-main",[n("el-row",[n("el-col",{attrs:{md:24,lg:12}},[n("el-form",{ref:"pipelineForm",attrs:{model:e.pipelineForm,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"Pipeline",prop:"name"}},[n("el-input",{attrs:{type:"text",placeholder:"Sample Pipeline"},model:{value:e.pipelineForm.name,callback:function(t){e.$set(e.pipelineForm,"name",t)},expression:"pipelineForm.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Inputs",prop:"input"}},[n("el-select",{attrs:{multiple:"",filterable:"","allow-create":"",placeholder:"Choose input topics"},model:{value:e.pipelineForm.input,callback:function(t){e.$set(e.pipelineForm,"input",t)},expression:"pipelineForm.input"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Outputs",prop:"output"}},[n("el-select",{attrs:{multiple:"",filterable:"","allow-create":"",placeholder:"Choose output topics"},model:{value:e.pipelineForm.output,callback:function(t){e.$set(e.pipelineForm,"output",t)},expression:"pipelineForm.output"}},[n("el-option",{attrs:{label:"log",value:"log"}})],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"Function",prop:"code"}},[e._v("\n          trigger (\n          "),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"type: String",placement:"top-start"}},[n("el-tag",{attrs:{size:"mini"}},[e._v("data")])],1),e._v(" ,\n          "),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Invoke done with (err, response)",placement:"top-start"}},[n("el-tag",{attrs:{size:"mini"}},[e._v("done")])],1),e._v(") {\n          "),n("editor",{attrs:{lang:"javascript",height:"300"},model:{value:e.pipelineForm.code,callback:function(t){e.$set(e.pipelineForm,"code",t)},expression:"pipelineForm.code"}}),e._v("\n          }\n          ")],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.createPipeline}},[e._v("Create")]),e._v(" "),n("el-button",{on:{click:function(t){e.resetForm("pipelineForm")}}},[e._v("Reset")])],1)],1)],1),e._v(" "),n("el-col",{attrs:{md:24,lg:12}},[n("pipeline")],1)],1)],1)],1)},staticRenderFns:[]};var b=n("VU/8")(g,F,!1,function(e){n("vIrW")},"data-v-1126587a",null).exports;i.default.use(u.a);var w=new u.a({routes:[{path:"/",name:"Home",component:b}]}),k=n("NYxO"),$=n("ddF3"),x=n.n($),y=n("Vjoj"),R=n.n(y),S=n("g0X3"),z=n.n(S),O=n("P7rh"),P=n.n(O),C=n("DmT9"),j=n.n(C)()("https://iot-infra.herokuapp.com/",{transports:["websocket"]}),A=R()().configure(z()(j)).configure(P()({storage:window.localStorage})),H=x()(A,{idField:"_id"}),N=H.service,D=H.auth;i.default.use(k.a);var I=new k.a.Store({plugins:[N("pipeline"),D()]});i.default.config.productionTip=!1,i.default.use(r.a,{locale:p.a}),new i.default({el:"#app",router:w,store:I,components:{App:s},template:"<App/>"})},tvR6:function(e,t){},vIrW:function(e,t){},zR3d:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.9717f4e06dae0161dabe.js.map