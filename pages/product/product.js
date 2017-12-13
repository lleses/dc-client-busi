//获取应用实例
var app = getApp()
Page({
  data: {
    titleColsNum: 1,
    types: {},
    typeNum: 0,
    typeId: null,
    selId: null,
    commodityList: {},
    server: app.globalData.server,
    screenHeight: 110
  },
  onShow: function () {
    console.log("onLoad--commodity");
    var _that = this;
    wx.getSystemInfo({
      success: function (rs) {
        var _screenHeight = rs.windowHeight - 41;
        console.log("getSystemInfo success,screenHeight=" + _screenHeight);
        _that.setData({
          screenHeight: _screenHeight
        });
        app.getSessionId(function (p_sessionId) {
          console.log("p_sessionId:" + p_sessionId);
          wx.request({
            url: app.globalData.server + '/commodity_type/init_data',
            data: {
              sessionId: p_sessionId,
              appId: app.globalData.appId
            },
            success: function (res) {
              _that.setData({
                types: res.data.types,
                typeNum: 0,
                typeId: null,
                commoditys: res.data.commoditys
              });
            }
          });
        });
      }
    });
  },
  titleCols: function (e) {
    this.setData({
      titleColsNum: e.target.dataset.num
    })
  },
  selType: function (e) {
    console.log("onLoad--commodity");
    var _that = this;
    app.getSessionId(function (p_sessionId) {
      _that.setData({
        typeNum: e.target.dataset.typeNum,
        typeId: e.target.dataset.typeId
      });
      wx.request({
        url: app.globalData.server + '/commodity_type/selType',
        data: {
          sessionId: p_sessionId,
          commodityTypeId: e.target.dataset.typeId
        },
        success: function (res) {
          _that.setData({
            commoditys: res.data.commoditys
          });
        }
      });
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

