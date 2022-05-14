// pages/aMine/queAdd/queAdd.js
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
    this.getMyAsksAll();
  },

  getMyAsksAll() {
    var that = this;
    ajax.requestWithAuth({
      url: '/visitor/ask/getMyAskAll',
      method: 'POST',
      data: {
        userId: app.globalData.userId,
      },
      success: res => {
        console.log("getMyAsksAll", res);
        that.setData({
          queUserAskList: res.data.queUserAskList,
        })
      },
      fail: err => {
        console.log("getMyAsksAll Err", err)
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