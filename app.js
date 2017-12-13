App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  getSessionId: function (f_callback) {
    var _that = this;
    var _sessionId = wx.getStorageSync('sessionId');
    console.log("get sessionId, sessionId=" + _sessionId);
    if (!!f_callback != null && typeof f_callback === "function") {
      _that.wxLogin(_sessionId, f_callback);
    } else {
      console.log("getSessionId callback is not function");
    }
  },
  wxLogin: function (p_sessionId, f_callback) {
    var _that = this;
    wx.login({
      success: function (e) {
        var _code = e.code;
        console.log("login success ,code=" + _code);
        if (_code) {
          wx.request({
            url: _that.globalData.server + '/wx/createSession',
            data: {
              sessionId: p_sessionId,
              code: _code,
              appId: _that.globalData.appId,
              clientType: "busi"
            },
            success: function (res) {
              if (!res.statusCode == 200) {
                console.log(res.errMsg);
                return;
              }
              var _rs = res.data;
              if (_rs.code == 100) {
                console.log(_rs.message);
                return;
              }
              var _sessionId = _rs.data;
              if (!_sessionId) {
                console.log("getSessionId is null");
                return;
              }
              console.log("save sessionId,  sessionId=" + _sessionId);
              wx.setStorageSync('sessionId', _sessionId);
              if (!!f_callback != null && typeof f_callback === "function") {
                f_callback(_sessionId);
              } else {
                console.log("getSessionId callback is not function");
              }
            }
          });
        } else {
          console.log('获取用户登录态失败！' + e.errMsg)
        }
      },
      fail: function (e) {
        console.log('login fail');
      },
    });
  },
  getUserInfo: function (cb) {
    var _that = this
    if (_that.globalData.userInfo) {
      typeof cb == "function" && cb(_that.globalData.userInfo)
    } else {
      //调用登录接口
      console.log("request getUserInfo");
      wx.getUserInfo({
        success: function (res) {
          console.log("getUserInfo succ;");
          _that.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(_that.globalData.userInfo);
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    appId: "wx198ab4de814c9787",
    server: 'http://localhost:8080'
  }
})