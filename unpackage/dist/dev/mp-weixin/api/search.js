"use strict";
const utils_request = require("../utils/request.js");
function apiSearchData(data = {}) {
  return utils_request.request({
    url: "/searchWall",
    data
  });
}
exports.apiSearchData = apiSearchData;
