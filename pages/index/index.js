//index.js
//获取应用实例
const app = getApp()
const ajax = require("../../utils/ajax.js")

Page({
  data: {
    pageCur: 'aHome',
  },

  onLoad: function (options) {
    console.log("indexOnload");
    this.wxLoginIndex();
  },

  onShow: function () {

  },

  wxLoginIndex: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        console.log("index userLogin -> wx.login", res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.globalData.code = res.code

        that.userLogin();
      }
    })
  },

  userLogin: function () {
    var that = this;
    
    console.log("index userLogin send", app.globalData);
    this.selectComponent("#toast").toastShowForever("稍等", "fa-spinner fa-pulse")
    console.log("index userLogin code", app.globalData.code);
    wx.request({
      url: ajax.api + '/user/loginWithCode',
      method: 'POST',
      data: {
        "code": app.globalData.code,
      },
      success: res => {
        console.log("userLoginRes", res)
        app.globalData.userId = res.data.openId; 
        if (res.data.state === "fail") {
          that.selectComponent("#toast").toastShow("登录失败", "fa-remove", 1000)
        } else if (res.data.state === "ok") {
          app.globalData.sessionId = res.data.sessionKey;
          app.globalData.userInfo = res.data.userInfo;
          app.globalData.canIUseGetUserProfile = true;
          app.globalData.hasUserInfo = true;
          app.globalData.userType = res.data.userType;
          that.setData({
            userType: res.data.userType
          })

          // 判断管理
          that.selectComponent("#toast").toastShow("登录成功", "fa-check", 1000);
        }
      },
      fail: err => {
        console.log("loginErr", err)
      }
    })
  },

  barChange(e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur
    })
  },
})