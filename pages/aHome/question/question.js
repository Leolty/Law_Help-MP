// pages/aHome/question/question.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queIdSelected: null,
    progressNum: 10,
    otherTrue: 1,
    otherNow: false,

    que: null,
    ops: null,
    ans: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad", options);
    if (options.progressNum != null) {
      this.setData({
        progressNum: parseInt(options.progressNum) + 10,
      });
    };
    this.getQueList(options.queId);
  },

  getQueList(queId) {
    var that = this;
    ajax.requestWithoutAuth({
      url: '/visitor/que/getQueList',
      method: 'POST',
      data: {
        queId: queId,
      },
      success: res => {
        console.log("getQueList", res);
        if (res.data.ops != null) {
          that.setData({
            que: res.data.que,
            ops: res.data.ops, // 可以继续嵌套
          })
        } else if (res.data.ans != null) {
          var ansStrList = res.data.ans.ansText.split('\n');
          console.log("ansStrList", ansStrList);
          that.setData({
            que: res.data.que,
            ans: res.data.ans, // 是个答案
            ansStrList: ansStrList,
          })
        }else{
          that.selectComponent("#toast").toastShow("未知错误", "fa-remove", 2000);
          wx.navigateBack({
            delta: 1,
          });
        }
      },
      fail: err => {
        console.log("getQueList Err", err)
      }
    })
  },

  radioChange(e) {
    console.log("radioChange", e);
    var queId = e.currentTarget.dataset.id;
    this.setData({
      otherNow: false,
      queIdSelected: queId,
    })
  },

  radioOther(e) {
    // console.log("radioOther", e);
    this.setData({
      otherNow: true,
    })
  },
  BackToHome(e){
    wx.navigateTo({
      url: '/pages/index/index',
    })

  },
  confirm(e) {
    if (this.data.otherNow === true) {
      wx.navigateTo({
        url: '/pages/aHome/queOther/queOther?queId=' + this.data.que.queId + '&queText=' + this.data.que.queText,
      })
    } else if (this.data.queIdSelected === null || this.data.queIdSelected === "") {
      this.selectComponent("#toast").toastShow("请先点击圆框选择", "fa-remove", 1500)
    } else {
      console.log('栈个数', getCurrentPages().length);
      if (getCurrentPages().length > 9) {
        this.selectComponent("#toast").toastShow("问题数量嵌套过多", "fa-remove", 1500)
      } else {
        wx.navigateTo({
          url: '/pages/aHome/question/question?queId=' + this.data.queIdSelected + '&progressNum=' + this.data.progressNum,
        })
      }
    }
  }
})