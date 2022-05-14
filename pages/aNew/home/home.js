// pages/aNew/home/home.js
const app = getApp();
const ajax = require("../../../utils/ajax.js");

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  // lifetimes: {
  //   attached: function () {

  //   }
  // },

  /**
   * 组件的初始数据
   */
  data: {
    queTitle: null,
    queContent: null,
    strNumNow: 0,
    strNumMax: 1000,
    imgList: [],
    imgNumMax: 9,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit(){
      var that = this;
      console.log("aNew submit", this.data);
      this.selectComponent("#toast").toastShowForever("稍等", "fa-spinner fa-pulse");
      ajax.requestWithAuth({
        url: '/user/ask/addAsk',
        method: 'POST',
        data: {
          userId: app.globalData.userId,
          queContent: that.data.queContent,
          queTitle: that.data.queTitle,
        },
        success: res => {
          console.log("submit", res);
          that.selectComponent("#toast").toastShow("已提交", "fa-check", 1000);
        },
        fail: err => {
          console.log("submit Err", err)
        }
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

    queTitleInput(e) {
      console.log("queTitleInput", e)
      this.setData({
        queTitle: e.detail.value
      })
    },

    ChooseImage() {
      var imgNumLeft = this.data.imgNumMax - this.data.imgList.length;
      wx.chooseImage({
        count: imgNumLeft, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })
          }
        }
      });
    },

    ViewImage(e) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
    },

    DelImg(e) {
      wx.showModal({
        title: '删除提示',
        content: '确定要删除这张图片吗？',
        cancelText: '取消删除',
        confirmText: '确定删除',
        success: res => {
          if (res.confirm) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList
            })
          }
        }
      })
    },
  }
})