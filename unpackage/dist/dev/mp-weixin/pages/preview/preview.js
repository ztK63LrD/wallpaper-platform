"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_preview = require("../../api/preview.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref();
    const scorePopup = common_vendor.ref();
    const userScore = common_vendor.ref(0);
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const readImgs = common_vendor.ref([]);
    const currentInfo = common_vendor.ref(null);
    const classList = common_vendor.ref([]);
    const isScore = common_vendor.ref(false);
    let information = common_vendor.ref([
      // 遮罩文本信息
      { name: "信息", icon: "info", color: "orange" },
      { name: "评分", icon: "star", color: "yellow" },
      { name: "下载", icon: "download", color: "green" }
    ]);
    let popData = common_vendor.ref([
      // 弹框文本数据
      { label: "壁纸ID:", value: "52315631563" },
      { label: "发布者:", value: "author" },
      { label: "评分:", value: "5分" },
      { label: "摘要:", value: "52315123123" },
      { label: "标签:", tabs: ["标签名", "标签名", "标签名"] }
    ]);
    const storgClassList = common_vendor.index.getStorageSync("storgClassList") || [];
    classList.value = storgClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const readImgFun = () => {
      readImgs.value.push(
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
      readImgs.value = [...new Set(readImgs.value)];
    };
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      if (e.type == "share") {
        let res = await api_preview.apiDetailWall({ id: currentId.value });
        classList.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
      currentInfo.value = classList.value[currentIndex.value];
      if (currentInfo.value) {
        information.value[1].name = currentInfo.value.score + "分";
        popData.value[0].value = currentInfo.value._id;
        popData.value[1].value = currentInfo.value.nickname;
        popData.value[2].value = currentInfo.value.score + "分";
        popData.value[3].value = currentInfo.value.description;
        popData.value[4].tabs = currentInfo.value.tabs;
      }
      readImgFun();
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
      if (currentInfo.value) {
        information.value[1].name = currentInfo.value.score + "分";
        popData.value[0].value = currentInfo.value._id;
        popData.value[1].value = currentInfo.value.nickname;
        popData.value[2].value = currentInfo.value.score + "分";
        popData.value[3].value = currentInfo.value.description;
        popData.value[4].tabs = currentInfo.value.tabs;
      }
      readImgFun();
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
          common_vendor.index.navigateBack();
        },
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const handleTap = async (name) => {
      if (name == "信息") {
        infoPopup.value.open();
      } else if (name.includes("分")) {
        if (currentInfo.value.userScore) {
          isScore.value = true;
          userScore.value = currentInfo.value.userScore;
        }
        scorePopup.value.open();
      } else if (name == "下载") {
        try {
          common_vendor.index.showLoading({
            title: "下载中...",
            mask: true
          });
          let { classid, _id: wallId } = currentInfo.value;
          let res = await api_preview.apiWriteDownload({
            classid,
            wallId
          });
          if (res.errCode != 0)
            throw res;
          common_vendor.index.getImageInfo({
            src: currentInfo.value.picurl,
            success: (res2) => {
              common_vendor.index.saveImageToPhotosAlbum({
                filePath: res2.path,
                success(res3) {
                  common_vendor.index.showToast({
                    title: "保存成功，请到相册查看",
                    icon: "none"
                  });
                },
                fail: (err) => {
                  if (err.errMsg === "saveTmageToPhotosAlbum:fail cancel") {
                    common_vendor.index.showToast({
                      title: "保存失败，请重新点击下载",
                      icon: "none"
                    });
                    return;
                  }
                  common_vendor.index.showModal({
                    title: "授权提示",
                    content: "需要授权保存相册",
                    success: (res3) => {
                      if (res3.confirm) {
                        common_vendor.index.openSetting({
                          success: (setting) => {
                            if (setting.authSetting["scope.writePhotosAlbum"]) {
                              common_vendor.index.showToast({
                                title: "获取授权成功",
                                icon: "none"
                              });
                            } else {
                              common_vendor.index.showToast({
                                title: "获取权限失败",
                                icon: "none"
                              });
                            }
                          }
                        });
                      }
                    }
                  });
                },
                complete: () => {
                  common_vendor.index.hideLoading();
                }
              });
            }
          });
        } catch (e) {
          common_vendor.index.hideLoading();
        }
      }
    };
    const handleClose = () => {
      infoPopup.value.close();
    };
    const handleScoreClose = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let { classid, _id: wallId } = currentInfo.value;
      let res = await api_preview.apiSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        handleScoreClose();
      }
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "看我分享的图片",
        path: "/pages/preview/preview?id=" + currentId.value + "&type=share"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "朋友圈分享啦",
        query: "id=" + currentId.value + "&type=share"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? {
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: currentIndex.value,
        d: common_vendor.o(swiperChange),
        e: common_vendor.p({
          type: "back",
          size: "24",
          color: "#fff"
        }),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.o(goBack),
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t(classList.value.length),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        l: common_vendor.f(common_vendor.unref(information), (item, k0, i0) => {
          return {
            a: "2dad6c07-3-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "28",
              color: item.color
            }),
            c: common_vendor.t(item.name),
            d: item,
            e: common_vendor.o(($event) => handleTap(item.name), item)
          };
        }),
        m: maskState.value,
        n: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        o: common_vendor.o(handleClose),
        p: common_vendor.f(common_vendor.unref(popData), (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.label),
            b: item.label == "评分:"
          }, item.label == "评分:" ? {
            c: "2dad6c07-6-" + i0 + ",2dad6c07-4",
            d: common_vendor.p({
              readonly: true,
              touchable: true,
              value: "3.5",
              size: "16"
            }),
            e: common_vendor.t(item.value)
          } : item.label == "标签:" ? {
            g: common_vendor.f(item.tabs, (tab, k1, i1) => {
              return {
                a: common_vendor.t(tab),
                b: tab
              };
            })
          } : {
            h: common_vendor.t(item.value)
          }, {
            f: item.label == "标签:",
            i: item
          });
        }),
        q: common_vendor.sr(infoPopup, "2dad6c07-4", {
          "k": "infoPopup"
        }),
        r: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        }),
        s: common_vendor.t(isScore.value ? "评分过了~" : "壁纸评分"),
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(handleScoreClose),
        w: common_vendor.o(($event) => userScore.value = $event),
        x: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        y: common_vendor.t(userScore.value),
        z: common_vendor.o(submitScore),
        A: !userScore.value || isScore.value,
        B: common_vendor.sr(scorePopup, "2dad6c07-7", {
          "k": "scorePopup"
        }),
        C: common_vendor.p({
          ["is-mask-click"]: false
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
