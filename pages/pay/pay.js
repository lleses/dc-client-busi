//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    titleColsNum: 1,
    userInfo: {},
    shoppingCarts: {},
    zj: 0
  },
  onLoad: function () {
    var that = this;
    app.getUserId(function (userId) {
      wx.request({
        url: 'http://localhost:8080/shoppingCart/index',
        data: {
          userId: userId
        },
        success: function (res) {
          var _shoppingCarts = res.data;
          var _zj = 0;
          for (var i = 0; i < _shoppingCarts.length; i++) {
            _zj = _zj + _shoppingCarts[i].money;
          }
          that.setData({
            shoppingCarts: _shoppingCarts,
            zj: _zj
          })
        }
      });
    });
  },
  onShow: function () {
    var that = this;
    app.getUserId(function (userId) {
      wx.request({
        url: 'http://localhost:8080/shoppingCart/index',
        data: {
          userId: userId
        },
        success: function (res) {
          var _shoppingCarts = res.data;
          var _zj = 0;
          for (var i = 0; i < _shoppingCarts.length; i++) {
            _zj = _zj + _shoppingCarts[i].money;
          }
          that.setData({
            shoppingCarts: _shoppingCarts,
            zj: _zj
          })
        }
      });
    });
  },
  paySuss: function () {
    var that = this;
    app.getUserId(function (userId) {
      wx.request({
        url: 'http://localhost:8080/bill/save',
        data: {
          userId: userId
        },
        success: function (res) {
          wx.showToast({
            title: '支付成功',
            success: function () {

            }
          });
        }
      });
    });

  }
})

