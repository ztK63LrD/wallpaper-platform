"use strict";
const utils_request = require("../utils/request.js");
function apiGetClassList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
exports.apiGetClassList = apiGetClassList;
