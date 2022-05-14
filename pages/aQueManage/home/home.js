// pages/aQueManage/home/home.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Component({
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached: function () {
      this.getIconList();
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    newQueRoot() {
      wx.navigateTo({
        url: '/pages/aQueManage/addQueRoot/addQueRoot',
      })
    },

    gotoQueManage(e) {
      console.log("gotoQueManage", e);
      var queId = e.currentTarget.dataset.queid;
      wx.navigateTo({
        url: '/pages/aQueManage/queManage/queManage?queId=' + queId,
      })
    },

    getIconList() {
      var that = this;
      ajax.requestWithoutAuth({
        url: '/visitor/que/getIconList',
        method: 'POST',
        data: {
          userId: app.globalData.userId,
        },
        success: res => {
          console.log("getIconList", res);
          that.setData({
            iconList: res.data.iconList,
          })
        },
        fail: err => {
          console.log("getIconListErr", err)
        }
      })
    },
  }
})