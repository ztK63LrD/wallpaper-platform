"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    let selectData = common_vendor.ref([
      { url: "/pages/classlist/classlist?name=我的下载&type=download", icon: "download-filled", color: "#008c8c", name: "我的下载", text: "0" },
      { url: "/pages/classlist/classlist?name=我的评分&type=score", icon: "star-filled", color: "#FFD700", name: "我的评分", text: "0" },
      { url: "", icon: "chatboxes-filled", color: "#4169E1", name: "联系客服", text: "0" },
      { url: "", icon: "notification-filled", color: "#5F9EA0", name: "订阅更新", text: "0" },
      { url: "/pages/notice/notice?id=6536358ce0ec19c8d67fbe82", icon: "info-filled", color: "#DC143C", name: "常见问题", text: "0" }
    ]);
    const getUserInfo = async () => {
      let res = await api_user.apiUserInfo();
      userInfo.value = res.data;
      selectData.value[0].text = res.data.downloadSize;
      selectData.value[1].text = res.data.scoreSize;
      selectData.value[2].text = res.data.downloadSize;
      selectData.value[3].text = res.data.downloadSize;
      selectData.value[4].text = res.data.downloadSize;
    };
    common_vendor.onLoad((e) => {
      getUserInfo();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: userInfo.value
      }, userInfo.value ? {
        b: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        c: common_assets._imports_0,
        d: common_vendor.t(userInfo.value.IP),
        e: common_vendor.t(((_a = userInfo.value.address) == null ? void 0 : _a.city) || ((_b = userInfo.value.address) == null ? void 0 : _b.province) || ((_c = userInfo.value.address) == null ? void 0 : _c.country)),
        f: common_vendor.f(common_vendor.unref(selectData).slice(0, 3), (item, k0, i0) => {
          return {
            a: "0f7520f0-0-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "24",
              color: item.color
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.text),
            e: "0f7520f0-1-" + i0,
            f: item,
            g: item.url
          };
        }),
        g: common_vendor.p({
          type: "right",
          size: "18",
          color: "#aaa"
        }),
        h: common_vendor.f(common_vendor.unref(selectData).slice(3), (item, k0, i0) => {
          return {
            a: "0f7520f0-2-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "24",
              color: item.color
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.text),
            e: "0f7520f0-3-" + i0,
            f: item,
            g: item.url
          };
        }),
        i: common_vendor.p({
          type: "right",
          size: "18",
          color: "#aaa"
        })
      } : {
        j: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        k: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
