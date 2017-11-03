var app = getApp()
Page({
  data: {
    motto: 'Hellobb Worlda',
    titleColsNum: 1,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  titleCols: function(e){
    this.setData({
      titleColsNum: e.target.dataset.num
    })
  },
  toUrl:function(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})

