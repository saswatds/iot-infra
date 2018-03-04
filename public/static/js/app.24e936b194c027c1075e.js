webpackJsonp([1],{0:function(e,t){},"0jz5":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),o=n("zL8q"),r=n.n(o),l=(n("tvR6"),n("wUZ8")),p=n.n(l),s=(n("kX7f"),n("h636"),n("Dukv"),{render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]});var a=n("VU/8")({name:"App"},s,!1,function(e){n("qeGn")},null,null).exports,u=n("/ocq"),c=n("woOf"),m=n.n(c),d=n("o4sT"),f=n.n(d),v={computed:{pipelines:function(){return this.$store.getters["pipeline/list"]}},methods:{handleDelete:function(e,t){confirm("Are you sure?")&&this.$store.dispatch("pipeline/remove",t._id)}},beforeCreate:function(){this.$store.dispatch("pipeline/find")}},h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.pipelines}},[n("el-table-column",{attrs:{prop:"name",label:"Name"}}),e._v(" "),n("el-table-column",{attrs:{label:"Input"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.input&&t.row.input.length&&t.row.input.join(", "))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Output"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.output&&t.row.output.length&&t.row.output.join(", "))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Function"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.operations,function(t){return n("el-popover",{key:t.name,attrs:{trigger:"hover",placement:"bottom"}},[n("i",[e._v("function")]),e._v(" trigger(data, done) {"),n("br"),e._v(" "),n("span",{staticStyle:{"margin-left":"20px"}},[e._v(e._s(t.func))]),e._v(" "),n("br"),e._v("}\n          "),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.name))])],1)])})}}])}),e._v(" "),n("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){e.handleDelete(t.$index,t.row)}}},[e._v("Delete")])]}}])})],1)],1)},staticRenderFns:[]};var _=n("VU/8")(v,h,!1,function(e){n("zR3d")},null,null).exports,g={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{margin:"20px"}},e._l(e.logs,function(t,i){return n("span",{key:t.timestamp},[e._v("\n    "+e._s(t.origin||i+1)+" : "+e._s(t.message)),n("br")])}))},staticRenderFns:[]};var b=n("VU/8")({computed:{logs:function(){return this.$store.getters["log/list"]}},beforeCreate:function(){this.$store.dispatch("log/find")}},g,!1,function(e){n("YfIb")},null,null).exports,F={name:"Home",components:{editor:f.a,Pipeline:_,Log:b},data:function(){return{pipelineForm:{name:"",input:[],output:[],code:""},mode:!1,doneRegx:/done\(([\sa-zA-Z"']+),([\w\W]+)\)/}},computed:{options:function(){return{input:this.$store.getters["topic/list"].filter(function(e){return"input"===e.type}),output:this.$store.getters["topic/list"].filter(function(e){return"output"===e.type})}}},methods:{createPipeline:function(){if(!this.pipelineForm.name)return this.$message.error("Opps, Pipeline name is required");if(!this.pipelineForm.input||!this.pipelineForm.input.length)return this.$message.error("Opps, atleast one input topic is needed");if(!this.pipelineForm.output||!this.pipelineForm.output.length)return this.$message.error("Opps, atleast one output topic is needed");if(!this.pipelineForm.code.match(this.doneRegx))return this.$message.error("Oops, done has to be called with both parameters");var e=m()({},{name:this.pipelineForm.name,input:this.pipelineForm.input,output:this.pipelineForm.output,operations:[{name:"trigger",func:this.pipelineForm.code}]});console.log("creating new pipeline"),this.$store.dispatch("pipeline/create",e)},resetForm:function(e){console.log(e),this.$refs[e].resetFields()}},beforeCreate:function(){this.$store.dispatch("topic/find")}},w={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[e._v("Pipeline Commander")]),e._v(" "),n("el-main",[n("el-row",[n("el-col",{attrs:{md:24,lg:12}},[n("el-form",{ref:"pipelineForm",attrs:{model:e.pipelineForm,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"Pipeline",prop:"name"}},[n("el-input",{attrs:{type:"text",placeholder:"Sample Pipeline"},model:{value:e.pipelineForm.name,callback:function(t){e.$set(e.pipelineForm,"name",t)},expression:"pipelineForm.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Inputs",prop:"input"}},[n("el-select",{attrs:{multiple:"",filterable:"",placeholder:"Choose input topics"},model:{value:e.pipelineForm.input,callback:function(t){e.$set(e.pipelineForm,"input",t)},expression:"pipelineForm.input"}},e._l(e.options.input,function(e){return n("el-option",{key:e.topic,attrs:{label:e.topic,value:e.topic}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"Outputs",prop:"output"}},[n("el-select",{attrs:{multiple:"",filterable:"",placeholder:"Choose output topics"},model:{value:e.pipelineForm.output,callback:function(t){e.$set(e.pipelineForm,"output",t)},expression:"pipelineForm.output"}},[n("el-option",{attrs:{label:"log",value:"log"}}),e._v(" "),n("el-option",{attrs:{label:"store",value:"store"}}),e._v(" "),e._l(e.options.output,function(e){return n("el-option",{key:e.topic,attrs:{label:e.topic,value:e.topic}})})],2)],1),e._v(" "),n("el-form-item",{attrs:{label:"Function",prop:"code"}},[e._v("\n          trigger (\n          "),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"type: String",placement:"top-start"}},[n("el-tag",{attrs:{size:"mini"}},[e._v("data")])],1),e._v(" ,\n          "),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Invoke done with (err, response)",placement:"top-start"}},[n("el-tag",{attrs:{size:"mini"}},[e._v("done")])],1),e._v(") {\n          "),n("editor",{attrs:{lang:"javascript",height:"300"},model:{value:e.pipelineForm.code,callback:function(t){e.$set(e.pipelineForm,"code",t)},expression:"pipelineForm.code"}}),e._v("\n          }\n          ")],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.createPipeline}},[e._v("Create")]),e._v(" "),n("el-button",{on:{click:function(t){e.resetForm("pipelineForm")}}},[e._v("Reset")])],1)],1)],1),e._v(" "),n("el-col",{attrs:{md:24,lg:12}},[n("el-switch",{staticStyle:{float:"right"},attrs:{"active-text":"Logs","inactive-text":"Pipelines"},model:{value:e.mode,callback:function(t){e.mode=t},expression:"mode"}}),e._v(" "),e.mode?n("log"):n("pipeline")],1)],1)],1)],1)},staticRenderFns:[]};var k=n("VU/8")(F,w,!1,function(e){n("0jz5")},"data-v-0d4e27f2",null).exports;i.default.use(u.a);var $=new u.a({routes:[{path:"/",name:"Home",component:k}]}),y=n("NYxO"),x=n("ddF3"),R=n.n(x),S=n("Vjoj"),z=n.n(S),C=n("g0X3"),O=n.n(C),P=n("DmT9"),j=n.n(P)()("https://iot-infra.herokuapp.com/",{transports:["websocket"]}),q=z()().configure(O()(j)),A=R()(q,{idField:"_id"}).service;i.default.use(y.a);var D=new y.a.Store({plugins:[A("pipeline"),A("log"),A("topic")]});i.default.config.productionTip=!1,i.default.use(r.a,{locale:p.a}),new i.default({el:"#app",router:$,store:D,components:{App:a},template:"<App/>"})},YfIb:function(e,t){},qeGn:function(e,t){},tvR6:function(e,t){},zR3d:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.24e936b194c027c1075e.js.map