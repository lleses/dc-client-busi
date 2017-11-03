//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    //登陆
    wx.login({
      success: function (e) {
        if (e.code) {
          var code = e.code;
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: that.data.server+'/user/check',
                data: {
                  code: code,
                  name: res.userInfo.nickName
                },
                success: function (res) {
                  that.globalData.userId=res.data;
                }
              });
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUserId: function (cb) {
    var that = this
    if (this.globalData.userId) {
      typeof cb == "function" && cb(this.globalData.userId)
    } else {
      //后续处理
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  },
  data:{
    server: "http://localhost:8080"
  }
})
