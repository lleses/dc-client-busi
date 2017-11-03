//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    titleColsNum: 1,
    types: null,
    typeIndex: 0,
    typeId: null,
    commoditys: {},
    shoppingCarts: {},
    userId: null
  },
  onShow: function(){
    var that = this;
    app.getUserId(function (userId) {
      //更新数据
      that.setData({
        userId: userId
      });

      wx.request({
        url: App.data.server+'/commodity_type/init_data',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            types: res.data.types,
            commoditys: res.data.commoditys,
            shoppingCarts: res.data.shoppingCarts,
            typeIndex:0
          });
        }
      });
    });
  },
  onLoad: function () {
    var that = this;
    app.getUserId(function (userId) {
      //更新数据
      that.setData({
        userId: userId
      });

      wx.request({
        url: App.data.server+'/commodity_type/init_data',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            types: res.data.types,
            commoditys: res.data.commoditys,
            shoppingCarts: res.data.shoppingCarts,
            typeIndex:0
          });
        }
      });
    });

    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },
  selType: function (e) {
    var that = this;
    that.setData({
      typeIndex: e.target.dataset.typeIndex,
      typeId: e.target.dataset.typeId
    });
    wx.request({
      url: 'http://localhost:8080/commodity_type/selType',
      data: {
        commodityTypeId: e.target.dataset.typeId,
        userId: that.data.userId
      },
      success: function (res) {
        that.setData({
          commoditys: res.data
        });
      }
    });
  },
  toUrl: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.selid,
    })
  },
  addBuyNum: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/shoppingCart/add',
      data: {
        userId: that.data.userId,
        commodityId: e.target.dataset.buyId,
        price: e.target.dataset.comPrice
      },
      success: function (res) {
        var commoditys = that.data.commoditys;
        for (var i = 0; i < commoditys.length; i++) {
          var _commodity = commoditys[i];
          if (_commodity.id == e.target.dataset.buyId) {
            _commodity.orderNum++;
          }
        }
        that.setData({
          commoditys: commoditys
        });
      }
    });
  },
  lessBuyNum: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/shoppingCart/less',
      data: {
        userId: that.data.userId,
        commodityId: e.target.dataset.buyId,
        price: e.target.dataset.comPrice
      },
      success: function (res) {
        var commoditys = that.data.commoditys;
        for (var i = 0; i < commoditys.length; i++) {
          var _commodity = commoditys[i];
          if (_commodity.id == e.target.dataset.buyId) {
            if (_commodity.orderNum != 0) {
              _commodity.orderNum--;
            }
          }
        }
        that.setData({
          commoditys: commoditys
        });
      }
    });
  }
})

