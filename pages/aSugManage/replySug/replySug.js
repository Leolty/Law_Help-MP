// pages/aSugManage/replySug/replySug.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queUserAsk: null,
    fatherQueList: [],
    queAnswer: null,
    queContentList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad", options);
    this.getAskFatherQues(options.askId);
  },

  getAskFatherQues(askId){
    var that = this;
    ajax.requestWithAuth({
      url: '/admin/ask/getAskFatherQues',
      method: 'POST',
      data: {
        askId: askId,
      },
      success: res => {
        console.log("getAskFatherQues", res);
        var queContentList = res.data.queUserAsk.queContent.split('\n');
        console.log("queContentList", queContentList);
        that.setData({
          queUserAsk: res.data.queUserAsk,
          fatherQueList: res.data.fatherQueList,
          queContentList: queContentList,
        })
      },
      fail: err => {
        console.log("getAskFatherQues Err", err)
      }
    })
  },

  replyAsk(){
    var that = this;
    this.selectComponent("#toast").toastShowForever("提交中，请稍等", "fa-spinner fa-pulse");
    ajax.requestWithAuth({
      url: '/admin/ask/replyAsk',
      method: 'POST',
      data: {
        askId: that.data.queUserAsk.askId,
        answerUserId: app.globalData.userId,
        queAnswer: that.data.queAnswer,
      },
      success: res => {
        console.log("replyAsk", res);
        that.selectComponent("#toast").toastShow("已提交回复", "fa-check", 2000);
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: err => {
        console.log("replyAsk Err", err)
        that.selectComponent("#toast").toastShow("提交失败，请重试", "fa-remove", 1000);
      }
    })
  },

  textChange: function (e) {
    var length = e.detail.value.length
    var text = e.detail.value
    this.setData({
      strNumNow: length,
      queAnswer: text
    })
  },
})