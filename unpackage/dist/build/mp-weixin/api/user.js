"use strict";const t=require("../utils/request.js");exports.apiGetHistoryList=function(r={}){return t.request({url:"/userWallList",data:r})},exports.apiUserInfo=function(r={}){return t.request({url:"/userInfo",data:r})};
