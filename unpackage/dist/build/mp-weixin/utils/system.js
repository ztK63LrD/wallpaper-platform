"use strict";const t=require("../common/vendor.js"),e=t.index.getSystemInfoSync(),n=()=>e.statusBarHeight||40,i=()=>{if(t.index.getMenuButtonBoundingClientRect){let{top:e,height:i}=t.index.getMenuButtonBoundingClientRect();return i+2*(e-n())}return 40};exports.getNavBarHeight=()=>n()+i(),exports.getStatusBarHeight=n,exports.getTitleBarHeight=i;
