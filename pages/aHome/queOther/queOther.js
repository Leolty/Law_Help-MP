// pages/aHome/queOther/queOther.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queId: null,
    queText: null,

    queTitle: null,
    queContent: null,
    strNumNow: 0,
    strNumMax: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options", options);
    this.setData({
      queId: options.queId,
      queText: options.queText,
    })
  },

  // 文本长度监督
  textChange: function (e) {
    var length = e.detail.value.length
    var text = e.detail.value
    this.setData({
      strNumNow: length,
      queContent: text
    })
  },

  submit() {
    if (this.data.queContent != null && this.data.queContent.length != "" && this.data.queTitle != null && this.data.queTitle != "") {
      this.submitAux();
    } else {
      this.selectComponent("#toast").toastShow("内容不能为空", "fa-remove", 1000);
    }
  },

  submitAux() {
    var that = this;
    console.log("aNew submit", this.data);
    this.selectComponent("#toast").toastShowForever("稍等", "fa-spinner fa-pulse");
    ajax.requestWithAuth({
      url: '/user/ask/addAsk',
      method: 'POST',
      data: {
        userId: app.globalData.userId,
        queId: that.data.queId,
        queContent: that.data.queContent,
        queTitle: that.data.queTitle,
      },
      success: res => {
        console.log("submit", res);
        that.selectComponent("#toast").toastShow("已提交", "fa-check", 1000);
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: err => {
        console.log("submit Err", err)
      }
    })
  },

  queTitleInput(e) {
    console.log("queTitleInput", e)
    this.setData({
      queTitle: e.detail.value
    })
  },
})