// pages/aMine/queComplete/queComplete.js
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
    this.getMyAsksComplete();
  },

  getMyAsksComplete() {
    var that = this;
    ajax.requestWithAuth({
      url: '/visitor/ask/getMyAskByStatus',
      method: 'POST',
      data: {
        userId: app.globalData.userId,
        askStatus: 1,
      },
      success: res => {
        console.log("getMyAskByStatus", res);
        that.setData({
          queUserAskList: res.data.queUserAskList,
        })
      },
      fail: err => {
        console.log("getMyAskByStatus Err", err)
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