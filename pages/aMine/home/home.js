// pages/aMine/home/home.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Component({
  options: {
    addGlobalClass: true,
  },

  properties: {

  },

  lifetimes: {
    attached: function () {
      var that = this;
      // 在组件实例进入页面节点树时执行
      console.log("mine attached");
      that.setData({
        userInfo: app.globalData.userInfo,
        userId: app.globalData.userId,
        canIUseGetUserProfile: app.globalData.canIUseGetUserProfile,
        hasUserInfo: app.globalData.hasUserInfo,
      })
      console.log("mine data", that.data);
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
        app.globalData.canIUseGetUserProfile = true;
      }
    },

    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log("mine detached");
    },
  },

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    // mainBgUrl: "https://www.linjuliwhu.tech:8089/mynote/resources/static/minebg.jpg",
    // waveBgUrl: "https://www.linjuliwhu.tech:8089/mynote/resources/static/wave.gif",

    mainBgUrl: ajax.api + "/resources/static/minebg.jpg",
    waveBgUrl: ajax.api + "/resources/static/wave.gif",

    thingsMenu: [{
      "icon": "roundadd",
      "color": "orange",
      "name": "发起的问题",
      "url": "/pages/aMine/queAdd/queAdd",
    }, {
      "icon": "video",
      "color": "purple",
      "name": "待处理问题",
      "url": "/pages/aMine/queDuring/queDuring",
    }, {
      "icon": "roundcheck",
      "color": "red",
      "name": "已回复问题",
      "url": "/pages/aMine/queComplete/queComplete",
    }],

    mainMenu: [{
      "icon": "service",
      "color": "orange",
      "name": "在线客服",
      "url": "/pages/aMine/aboutService/aboutService",
    }, 
    // {
    //   "icon": "notice",
    //   "color": "blue",
    //   "name": "消息通知",
    //   "url": "/pages/aMine/aboutNotice/aboutNotice",
    // }, {
    //   "icon": "settings",
    //   "color": "brown",
    //   "name": "个人设置",
    //   "url": "/pages/aMine/aboutSetting/aboutSetting",
    // }, 
    {
      "icon": "addressbook",
      "color": "cyan",
      "name": "关于我们",
      "url": "/pages/aMine/aboutUs/aboutUs",
    }]
  },

  methods: {
    gotoMenuPage: function (e) {
      console.log("gotoMenuPage", e);
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    },

    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      var that = this;
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log("wx.getUserProfile", res);
          app.globalData.userInfo = res.userInfo;
          app.globalData.hasUserInfo = true;
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          that.userLogin();
        }
      })
    },

    getUserInfo: function (e) {
      var that = this;
      console.log("getUserInfor", e)
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      that.userLogin()
    },

    userLogin: function (e) {
      var that = this;

      console.log("mine userLogin send", app.globalData);
      this.selectComponent("#toast").toastShowForever("稍等", "fa-spinner fa-pulse")

      wx.request({
        url: ajax.api + '/user/login',
        method: 'POST',
        data: {
          "userId": app.globalData.userId,
          "code": app.globalData.code,
          "userInfo": app.globalData.userInfo,
        },
        success: res => {
          console.log("userLoginRes", res)
          if (res.data.state === "insertFail") {
            that.selectComponent("#toast").toastShow("注册失败", "fa-remove", 1000)
          } else if (res.data.state === "updateFail") {
            that.selectComponent("#toast").toastShow("登录失败", "fa-remove", 1000)
          } else if (res.data.state === "fail") {
            that.selectComponent("#toast").toastShow("登录失败", "fa-remove", 1000)
          } else if (res.data.state === "ok") {
            app.globalData.userId = res.data.openId;
            app.globalData.sessionId = res.data.sessionKey;
            app.globalData.userType = res.data.userType;
            that.setData({
              userInfo: res.data.userInfo,
              userId: res.data.openId,
            })
            console.log("res assigned", that.data);
            // 判断管理
            that.selectComponent("#toast").toastShow("登录成功", "fa-check", 1000)
          }
        },
        fail: err => {
          console.log("loginErr", err)
        }
      })
    },
  }

})