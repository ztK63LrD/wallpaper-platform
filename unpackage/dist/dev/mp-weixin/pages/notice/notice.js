"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home = require("../../api/home.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    const notice = common_vendor.ref({});
    const getNoticeDetail = async (id) => {
      let res = await api_home.apiNoticeDetail({ id });
      notice.value = res.data;
    };
    common_vendor.onLoad((e) => {
      let { id = null } = e;
      getNoticeDetail(id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: notice.value
      }, notice.value ? common_vendor.e({
        b: notice.value.select
      }, notice.value.select ? {
        c: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        })
      } : {}, {
        d: common_vendor.t(notice.value.title),
        e: common_vendor.t(notice.value.author),
        f: common_vendor.p({
          date: notice.value.publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        g: notice.value.content,
        h: common_vendor.t(notice.value.view_count)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c2e4c1e"]]);
wx.createPage(MiniProgramPage);
