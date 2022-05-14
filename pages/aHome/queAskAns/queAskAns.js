// pages/aHome/queAskAns/queAskAns.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queUserAsk: null,
    fatherQueList: [],
    queAnsList: [],
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
      url: '/visitor/ask/getAskFatherQues',
      method: 'POST',
      data: {
        askId: askId,
      },
      success: res => {
        console.log("getAskFatherQues", res);
        var queContentList = res.data.queUserAsk.queContent.split('\n');
        that.setData({
          queUserAsk: res.data.queUserAsk,
          fatherQueList: res.data.fatherQueList,
          queContentList: queContentList,
        })
        // 可能没有回答
        if(res.data.queUserAsk.askStatus === 1){
          var queAnsList = res.data.queUserAsk.queAnswer.split('\n');
          this.setData({
            queAnsList: queAnsList,
          })
        }
      },
      fail: err => {
        console.log("getAskFatherQues Err", err)
      }
    })
  },
})