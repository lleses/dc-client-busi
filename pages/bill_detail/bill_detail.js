//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    orders:{},
    zj:0
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/bill/detail',
      data: {
        billId: option.id
      },
      success: function (res) {
        var _orders = res.data;
        var _zj=0;
        for (var i = 0; i < _orders.length;i++){
          _zj = _zj + _orders[i].money;
        }
        that.setData({
          orders: _orders,
          zj: _zj
        })
      }
    });
  }
})

