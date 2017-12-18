//获取应用实例
var app = getApp()
Page({
  data: {
    server: app.globalData.server,
    screenHeight: 110,
    productTypes: {},
    typeIndex: 0,
    isShow: 100,//100:隐藏 1:显示
    productId: null,
    productStatus: "SJ" // SJ:上架 XJ:下架 GQ:沽清
  },
  onShow: function () {
    console.log("onLoad--");
    var _that = this;
    wx.getSystemInfo({
      success: function (rs) {
        var _screenHeight = rs.windowHeight - 41;
        console.log("getSystemInfo success,screenHeight=" + _screenHeight);
        _that.setData({
          screenHeight: _screenHeight
        });

        wx.request({
          url: app.globalData.server + '/busi/product/list',
          data: {
            storeId: app.globalData.storeId
          },
          success: function (res) {
            wx.hideLoading();
            if (!res.statusCode == 200) {
              console.log(res.errMsg);
              return;
            }
            var _rs = res.data;
            console.log("list,返回信息----");
            console.log(_rs);
            if (_rs.code == 100) {
              console.log(_rs.message);
              return;
            }
            _that.setData({
              productTypes: _rs.data.productTypes,
              typeIndex: 0
            });
          }
        })
      }
    });
  },
  selType: function (e) {
    this.setData({
      typeIndex: e.target.dataset.typeIndex
    });
  },
  toSaveProduct: function () {
    wx.navigateTo({
      url: '../product_save/product_save',
    })
  },
  showBox: function (e) {
    this.setData({
      isShow: 1,
      productStatus: e.currentTarget.dataset.productStatus,
      productId: e.currentTarget.dataset.productId
    });
  },
  hideBox: function () {
    this.setData({
      isShow: 100
    });
  },
  updateProductStatus: function (e) {
    var _that = this;
    wx.request({
      url: app.globalData.server + '/busi/product/updateProductStatus',
      data: {
        productStatus: e.currentTarget.dataset.productStatus,
        storeId: app.globalData.storeId,
        productId: _that.data.productId
      },
      success: function (res) {
        wx.hideLoading();
        if (!res.statusCode == 200) {
          console.log(res.errMsg);
          return;
        }
        var _rs = res.data;
        console.log("updateProductStatus,返回信息----");
        console.log(_rs);
        if (_rs.code == 100) {
          console.log(_rs.message);
          return;
        }
        wx.showToast({
          title: '操作成功',
          success: function () {
            setTimeout(function () {
              _that.setData({
                productTypes: _rs.data.productTypes
              });
            }, 1500)
          }
        });
      }
    })
  },
  batchUpdateProductStatus: function (e) {
    var _that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要批量操作吗?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.server + '/busi/product/batchUpdateProductStatus',
            data: {
              productStatus: e.currentTarget.dataset.productStatus,
              storeId: app.globalData.storeId
            },
            success: function (res) {
              wx.hideLoading();
              if (!res.statusCode == 200) {
                console.log(res.errMsg);
                return;
              }
              var _rs = res.data;
              console.log("updateProductStatus,返回信息----");
              console.log(_rs);
              if (_rs.code == 100) {
                console.log(_rs.message);
                return;
              }
              wx.showToast({
                title: '操作成功',
                success: function () {
                  setTimeout(function () {
                    _that.setData({
                      productTypes: _rs.data.productTypes
                    });
                  }, 1500)
                }
              });
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  toEditProduct: function (e) {
    wx.navigateTo({
      url: '../product_save/product_save?id=' + this.data.productId
    })
  }
})
