// pages/aSugManage/allSug/allSug.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queUserAskList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAsksAll();
  },

  getAsksAll() {
    var that = this;
    ajax.requestWithAuth({
      url: '/admin/ask/getAllAsks',
      method: 'POST',
      data: {
        userId: app.globalData.userId,
      },
      success: res => {
        console.log("getAllAsks", res);
        that.setData({
          queUserAskList: res.data.queUserAskList,
        })
      },
      fail: err => {
        console.log("getAllAsks Err", err)
      }
    })
  },
})