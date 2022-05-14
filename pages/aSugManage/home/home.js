// pages/aSugManage/home/home.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Component({
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached: function () {
      this.getAsksToBeReply();
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    queUserAskList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAsksToBeReply() {
      var that = this;
      ajax.requestWithAuth({
        url: '/admin/ask/getAsksToBeReply',
        method: 'POST',
        data: {
          userId: app.globalData.userId,
        },
        success: res => {
          console.log("getAsksToBeReply", res);
          that.setData({
            queUserAskList: res.data.queUserAskList,
          })
        },
        fail: err => {
          console.log("getAsksToBeReply Err", err)
        }
      })
    },

    gotoReplySug(e) {
      console.log("gotoReplySug", e);
      wx.navigateTo({
        url: '/pages/aSugManage/replySug/replySug?askId=' + e.currentTarget.dataset.askid,
      })
    },

    gotoAllSug(e){
      wx.navigateTo({
        url: '/pages/aSugManage/allSug/allSug',
      })
    },

  }
})