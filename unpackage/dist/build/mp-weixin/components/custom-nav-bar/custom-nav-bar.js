"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/system.js");if(!Array){e.resolveComponent("uni-icons")()}Math;const r={__name:"custom-nav-bar",props:{title:{type:String,default:"壁纸"}},setup(r){const s=r;return(r,n)=>({a:e.unref(t.getStatusBarHeight)()+"px",b:e.t(s.title),c:e.p({type:"search",size:"18",color:"#888"}),d:e.unref(t.getTitleBarHeight)()+"px",e:e.unref(t.getNavBarHeight)()+"px"})}},s=e._export_sfc(r,[["__scopeId","data-v-b52dd02b"]]);wx.createComponent(s);
