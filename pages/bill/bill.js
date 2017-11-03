//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bills: {},
    userId: null
  },
  onLoad: function () {
    var that = this;
    app.getUserId(function (userId) {
      //更新数据
      that.setData({
        userId: userId
      });
      wx.request({
        url: 'http://localhost:8080/bill/list',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            bills: res.data
          })
        }
      });
    });
  },
  onShow: function () {
    var that = this;
    app.getUserId(function (userId) {
      that.setData({
        userId: userId
      });
      wx.request({
        url: 'http://localhost:8080/bill/list',
        data: {
          userId: userId
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            bills: res.data
          })
        }
      });
    });
  },
  toUrl: function (e) {
    wx.navigateTo({
      url: '../bill_detail/bill_detail?id=' + e.target.dataset.bId
    })
  }
})

