//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hellobb Worlda',
    titleColsNum: 1,
    types: {},
    typeNum: 0,
    typeId: null,
    selId: null,
    commodityList: {},
    userInfo: {},
    screenHeight:110
  },
  onShow: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight - 41
        });
      }
    });
    app.getUserId(function (userId) {
      //更新数据
      that.setData({
        userId: userId
      });

      wx.request({
        url: 'http://localhost:8080/commodity_type/init_data',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            types: res.data.types,
            typeNum: 0,
            typeId: null,
            commoditys: res.data.commoditys
          });
        }
      });
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight-41
        });
      }
    });
    app.getUserId(function (userId) {
      //更新数据
      that.setData({
        userId: userId
      });

      wx.request({
        url: 'http://localhost:8080/commodity_type/init_data',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            types: res.data.types,
            typeNum: 0,
            typeId: null,
            commoditys: res.data.commoditys
          });
        }
      });
    });
  },
  titleCols: function (e) {
    this.setData({
      titleColsNum: e.target.dataset.num
    })
  },
  selType: function (e) {
    var that = this;
    that.setData({
      typeNum: e.target.dataset.typeNum,
      typeId: e.target.dataset.typeId
    });
    wx.request({
      url: 'http://localhost:8080/commodity_type/init_data',
      data: {
        commodityTypeId: e.target.dataset.typeId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          commoditys: res.data.commoditys
        });
      }
    });
  },
  toUrl: function () {
    wx.navigateTo({
      url: '../commodity_add/commodity_add',
    })
  },
  toEditUrl: function (e) {
    wx.navigateTo({
      url: '../commodity_edit/commodity_edit?id=' + e.target.dataset.selid
    })
  }
})

