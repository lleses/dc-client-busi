var app = getApp()
Page({
  data: {
    tc: null
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/tc/get',
      data: {
        id: option.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          tc: res.data
        });
      }
    });
  },
  toUrl: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})

