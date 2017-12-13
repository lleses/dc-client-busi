var app = getApp()
Page({
  data: {
    phone: '',
    password: '',
    tabStrs = ['店内', '提前', '外卖'];
  },
  onLoad: function (options) {
    var that = this;

  },
  // 获取输入账号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  }
})  