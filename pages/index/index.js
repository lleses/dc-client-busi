var app = getApp()
Page({
  data: {
    tabIndex: 1
  },
  onLoad: function (option) {
    console.log("onLoad--login");
    var _that = this;
    wx.showLoading({
      title: '加载中',
    });
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/busi/index',
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
          console.log("busi,返回信息----");
          console.log(_rs);


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
  },
  updateTabIndex: function (e) {
    this.setData({
      tabIndex: e.target.dataset.tabIndex
    });
  }


})
