"use strict";const e=require("../../common/vendor.js"),a=require("../../api/classlist.js"),s=require("../../api/user.js");if(!Array){e.resolveComponent("uni-load-more")()}Math;const t={__name:"classlist",setup(t){const l=e.ref([]),i=e.ref(!1),n={pageNum:1,pageSize:12};let o=null;const r=async()=>{let t;n.classid&&(t=await a.apiGetClassList(n)),n.type&&(t=await s.apiGetHistoryList(n)),l.value=[...l.value,...t.data],n.pageSize>t.data.length&&(i.value=!0),e.index.setStorageSync("storgClassList",l.value)};return e.onLoad((a=>{let{id:s=null,name:t=null,type:l=null}=a;l&&(n.type=l),s&&(n.classid=s),n.classid=s,o=t,e.index.setNavigationBarTitle({title:t}),r()})),e.onShareAppMessage((e=>({title:"看我分享的图片"+o,path:"/pages/classlist/classlist?id="+n.classid+"&name="+o}))),e.onShareTimeline((()=>({title:"朋友圈分享啦"+o,query:"id="+n.classid+"&name="+o}))),e.onReachBottom((()=>{i.value||(n.pageNum++,r())})),e.onUnload((()=>{e.index.removeStorageSync("storgClassList")})),(a,s)=>e.e({a:!l.value.length&&!i.value},l.value.length||i.value?{}:{b:e.p({status:"loading"})},{c:e.f(l.value,((e,a,s)=>({a:e.smallPicurl,b:"/pages/preview/preview?id="+e._id,c:e._id}))),d:l.value.length||i.value},l.value.length||i.value?{e:e.p({status:i.value?"noMore":"loading"})}:{})}},l=e._export_sfc(t,[["__scopeId","data-v-e7474060"]]);t.__runtimeHooks=6,wx.createPage(l);
