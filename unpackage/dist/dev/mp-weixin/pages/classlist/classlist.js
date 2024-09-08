"use strict";
const common_vendor = require("../../common/vendor.js");
const api_classlist = require("../../api/classlist.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    let pageName = null;
    const getClassList = async () => {
      let res;
      if (queryParams.classid)
        res = await api_classlist.apiGetClassList(queryParams);
      if (queryParams.type)
        res = await api_user.apiGetHistoryList(queryParams);
      classList.value = [...classList.value, ...res.data];
      if (queryParams.pageSize > res.data.length)
        noData.value = true;
      common_vendor.index.setStorageSync("storgClassList", classList.value);
    };
    common_vendor.onLoad((e) => {
      let { id = null, name = null, type = null } = e;
      if (type)
        queryParams.type = type;
      if (id)
        queryParams.classid = id;
      queryParams.classid = id;
      pageName = name;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getClassList();
    });
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "看我分享的图片" + pageName,
        path: "/pages/classlist/classlist?id=" + queryParams.classid + "&name=" + pageName
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "朋友圈分享啦" + pageName,
        query: "id=" + queryParams.classid + "&name=" + pageName
      };
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.pageNum++;
      getClassList();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length && !noData.value
      }, !classList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        d: classList.value.length || noData.value
      }, classList.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
