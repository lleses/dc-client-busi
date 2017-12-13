//app.js
App({
  onLaunch: function () {
   
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
