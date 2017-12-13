var app = getApp()
Page({
  data: {
    phone: '',
    password: ''
  },
  onLoad: function (options) {
    console.log("onLoad--login");
    var _that = this;
    wx.showLoading({
      title: '加载中',
    });
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/busi/user/checkBind',
        data: {
          sessionId: p_sessionId
        },
        success: function (res) {
          wx.hideLoading();
          if (!res.statusCode == 200) {
            console.log(res.errMsg);
            return;
          }
          var _rs = res.data;
          console.log("checkBind,返回信息----");
          console.log(_rs);
          if (_rs.code == 100) {
            console.log(_rs.message);
            return;
          } else if (_rs.code == 30) {// 跳转登陆页

          } else if (_rs.code == 31) {// 跳转门店列表页

          } else if (_rs.code == 32) {// 跳转首页

          } else {
            console.log("逻辑错误");
            return;
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常',
            success: function () {
            }
          });
        }
      });
    });
  }
})