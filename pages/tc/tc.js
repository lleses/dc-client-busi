var app = getApp()
Page({
  data: {
    tcs: {}
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/tc/list',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          tcs: res.data
        });
      }
    });
  },
  toUrl: function (e) {
    wx.navigateTo({
      url: '../tc_detail/tc_detail?id=' + e.target.dataset.selid,
    })
  }
})

