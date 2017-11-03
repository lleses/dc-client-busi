//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    titleColsNum: 1,
    commodity: null
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/index/detail',
      data: {
        id: option.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          commodity: res.data
        });
      }
    });
  }
})

