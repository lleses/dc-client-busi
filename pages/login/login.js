var app = getApp()
Page({
  data: {
    username: '',
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
            app.globalData.storeId = _rs.data.storeId;
            wx.switchTab({
              url: '../index/index',
            })
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
  },
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  toLogin: function (e) {
    var _that = this;
    var _msg = "";
    // 验证
    if (!_that.data.username) {
      _msg = "名称不能为空";
    } else if (!_that.data.password) {
      _msg = "分类不能为空";
    }
    if (!!_msg) {
      wx.showModal({
        title: '温馨提示',
        content: _msg,
        showCancel: false
      });
      return;
    }
    wx.showLoading({
      title: '加载中',
    });
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/busi/user/login',
        data: {
          sessionId: p_sessionId,
          username: _that.data.username,
          password: _that.data.password
        },
        success: function (res) {
          wx.hideLoading();
          if (!res.statusCode == 200) {
            console.log(res.errMsg);
            return;
          }
          var _rs = res.data;
          console.log("login,返回信息----");
          console.log(_rs);
          if (_rs.code == 100) {
            console.log(_rs.message);
            return;
          } else if (_rs.code == 30) {// 跳转登陆页

          } else if (_rs.code == 31) {// 跳转门店列表页

          } else if (_rs.code == 32) {// 跳转首页
            app.globalData.storeId = _rs.data.storeId;
            wx.switchTab({
              url: '../index/index',
            })
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