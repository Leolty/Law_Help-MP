// pages/aMine/queDuring/queDuring.js
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
    this.getMyAsksDuring();
  },

  getMyAsksDuring() {
    var that = this;
    ajax.requestWithAuth({
      url: '/visitor/ask/getMyAskByStatus',
      method: 'POST',
      data: {
        userId: app.globalData.userId,
        askStatus: 0,
      },
      success: res => {
        console.log("getMyAsksDuring", res);
        that.setData({
          queUserAskList: res.data.queUserAskList,
        })
      },
      fail: err => {
        console.log("getMyAsksDuring Err", err)
      }
    })
  },

  gotoQueAskAns(e) {
    console.log("gotoQueAskAns", e);
    wx.navigateTo({
      url: '/pages/aHome/queAskAns/queAskAns?askId=' + e.currentTarget.dataset.askid,
    })
  }
})