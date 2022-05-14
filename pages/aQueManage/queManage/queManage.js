// pages/aQueManage/queManage/queManage.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queId: null,
    queIdSelected: null,
    progressNum: 10,
    que: null,
    ops: null,
    ans: null,
    // que: {
    //   "queText": "你是哪个星座的？"
    // },
    // ops: [{
    //   queId: "0001",
    //   queOption: "单选操作1",
    // }, {
    //   queId: "0002",
    //   queOption: "单选操作2",
    // }],
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
      queIdSelected: queId,
    })
  },

  gotoAddOps(e) {
    wx.navigateTo({
      url: '/pages/aQueManage/addOps/addOps?queId=' + this.data.que.queId,
    })
  },

  confirm(e) {
    if (this.data.queIdSelected === null || this.data.queIdSelected === "") {
      this.selectComponent("#toast").toastShow("请先点击圆框选择", "fa-remove", 1500)
    } else {
      console.log('栈个数', getCurrentPages().length);
      if (getCurrentPages().length > 11) {
        this.selectComponent("#toast").toastShow("问题数量嵌套过多", "fa-remove", 1500)
      } else {

        wx.redirectTo({
          url: '/pages/aQueManage/queManage/queManage?queId=' + this.data.queIdSelected + '&progressNum=' + this.data.progressNum,
        })
      }
    }
  }
})