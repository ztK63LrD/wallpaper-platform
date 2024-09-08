"use strict";
const utils_request = require("../utils/request.js");
function apiSetupScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
function apiWriteDownload(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
}
function apiDetailWall(data = {}) {
  return utils_request.request({
    url: "/detailWall",
    data
  });
}
exports.apiDetailWall = apiDetailWall;
exports.apiSetupScore = apiSetupScore;
exports.apiWriteDownload = apiWriteDownload;
