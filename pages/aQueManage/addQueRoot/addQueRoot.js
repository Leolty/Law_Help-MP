// pages/aQueManage/addQueRoot/addQueRoot.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootName: "",
    queText: "",
    rootVersionLevel: ['审核测试', '正式上线', '内部测试'],
    rootVersionIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  submit() {
    var that = this;
    console.log("submit", this.data);
    this.selectComponent("#toast").toastShowForever("稍等", "fa-spinner fa-pulse");
    ajax.requestWithAuth({
      url: '/admin/que/newQueRoot',
      method: 'POST',
      data: {
        userId: app.globalData.userId,
        rootName: that.data.rootName,
        queText: that.data.queText,
        rootVersion: that.data.rootVersionIndex,
      },
      success: res => {
        console.log("submitAux", res);
        that.selectComponent("#toast").toastShow("已提交", "fa-check", 1000);
      },
      fail: err => {
        console.log("submitAux Err", err)
      }
    })
  },

  rootVersionChange(e) {
    console.log("rootVersionChange", e);
    this.setData({
      rootVersionIndex: e.detail.value
    })
  },

  queTextInput(e) {
    console.log("queTextInput", e)
    this.setData({
      queText: e.detail.value
    })
  },

  rootNameInput(e) {
    console.log("rootNameInput", e)
    this.setData({
      rootName: e.detail.value
    })
  },
})