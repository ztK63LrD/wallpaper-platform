"use strict";
const utils_request = require("../utils/request.js");
function apiUserInfo(data = {}) {
  return utils_request.request({
    url: "/userInfo",
    data
  });
}
function apiGetHistoryList(data = {}) {
  return utils_request.request({
    url: "/userWallList",
    data
  });
}
exports.apiGetHistoryList = apiGetHistoryList;
exports.apiUserInfo = apiUserInfo;
