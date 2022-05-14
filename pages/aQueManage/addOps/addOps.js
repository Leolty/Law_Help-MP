// pages/aQueManage/addOps/addOps.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queFatherId: "", // father's queId

    queOption: "",
    queOptionHasAnswer: false,

    queText: "",
    queHasOther: true,

    queAnswer: "",
    strNumNow: 0,
    strNumMax: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad", options);
    this.setData({
      queFatherId: options.queId,
    });
  },

  submit() {
    var that = this;
    if (that.data.queOption != "") {
      if (that.data.queOptionHasAnswer && that.data.queAnswer != "") { // 答案
        that.submitAns();
      } else if (!that.data.queOptionHasAnswer && that.data.queText != "") { // 选项
        that.submitQue();
      } else {
        that.selectComponent("#toast").toastShow("请填写完整", "fa-remove", 2000);
      }
    } else {
      that.selectComponent("#toast").toastShow("请填写完整", "fa-remove", 2000);
    }
  },

  // 文本长度监督
  answerTextChange: function (e) {
    var length = e.detail.value.length
    var text = e.detail.value
    this.setData({
      strNumNow: length,
      queAnswer: text
    })
  },

  queTextInput(e) {
    console.log("queTextInput", e)
    this.setData({
      queText: e.detail.value
    })
  },

  queOptionInput(e) {
    console.log("queOptionInput", e)
    this.setData({
      queOption: e.detail.value
    })
  },

  hasAnswerChange(e) {
    console.log("hasAnswerChange", e);
    var queOptionHasAnswerNew = !this.data.queOptionHasAnswer;
    console.log("queOptionHasAnswerNew", queOptionHasAnswerNew);
    this.setData({
      queOptionHasAnswer: queOptionHasAnswerNew,
    });
  },

  hasOtherChange(e) {
    console.log("hasOtherChange", e);
    var queHasOtherNew = !this.data.queHasOther;
    console.log("queHasOtherNew", queHasOtherNew);
    this.setData({
      queHasOther: queHasOtherNew,
    });
  },

  submitAns() {
    var that = this;
    console.log("aNew submit", this.data);
    this.selectComponent("#toast").toastShowForever("稍等", "fa-spinner fa-pulse");
    ajax.requestWithAuth({
      url: '/admin/que/newAns',
      method: 'POST',
      data: {
        upId: app.globalData.userId,
        queFatherId: that.data.queFatherId,
        queOption: that.data.queOption,
        queAnswer: that.data.queAnswer,
      },
      success: res => {
        console.log("userLoginRes", res);
        that.selectComponent("#toast").toastShow("已提交", "fa-check", 1000);
      },
      fail: err => {
        console.log("submitErr", err)
      }
    })
  },

  submitQue() {
    var that = this;
    var queHasOtherInt = that.data.queHasOther ? 1 : 0;

    console.log("aNew submit", that.data);
    that.selectComponent("#toast").toastShowForever("稍等", "fa-spinner fa-pulse");
    ajax.requestWithAuth({
      url: '/admin/que/newQue',
      method: 'POST',
      data: {
        upId: app.globalData.userId,
        queFatherId: that.data.queFatherId,
        queOption: that.data.queOption,
        queText: that.data.queText,
        queHasOther: queHasOtherInt,
      },
      success: res => {
        console.log("submitQue", res);
        that.selectComponent("#toast").toastShow("已提交", "fa-check", 1000);
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: err => {
        console.log("submitQue Err", err)
        that.selectComponent("#toast").toastShow("未知错误", "fa-remove", 1000);
      }
    })
  },
})