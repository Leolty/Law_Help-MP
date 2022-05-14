// pages/aHome/home/home.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Component({
  options: {
    addGlobalClass: true,
  },

  lifetimes: {
    attached: function () {
      this.getIconList();
      this.getRepliedPublicAsk();
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    iconList: [{
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '星座'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 22,
      name: '穿搭'
    }],
    gridCol: 3,
    queUserAskList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoQuestion(e) {
      console.log("gotoQuestion", e);
      var queId = e.currentTarget.dataset.queid;
      wx.navigateTo({
        url: '/pages/aHome/question/question?queId=' + queId,
      })
    },

    gotoQueAskAns(e) {
      console.log("gotoQueAskAns", e);
      wx.navigateTo({
        url: '/pages/aHome/queAskAns/queAskAns?askId=' + e.currentTarget.dataset.askid,
      })
    },

    getIconList() {
      var that = this;
      ajax.requestWithoutAuth({
        url: '/visitor/que/getIconList',
        method: 'POST',
        data: {
          userId: app.globalData.userId,
        },
        success: res => {
          console.log("getIconList", res);
          that.setData({
            iconList: res.data.iconList,
          })
        },
        fail: err => {
          console.log("getIconListErr", err)
        }
      })
    },

    getRepliedPublicAsk() {
      var that = this;
      ajax.requestWithAuth({
        url: '/visitor/ask/getRepliedPublicAsk',
        method: 'POST',
        data: {
          userId: app.globalData.userId,
        },
        success: res => {
          console.log("getRepliedPublicAsk", res);
          that.setData({
            queUserAskList: res.data.queUserAskList,
          })
        },
        fail: err => {
          console.log("getRepliedPublicAsk Err", err)
        }
      })
    },
  }
})