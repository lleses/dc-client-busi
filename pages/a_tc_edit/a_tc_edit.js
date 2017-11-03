var app = getApp()
Page({
  data: {
    isShowImg: 1,
    uploadImgPath: "",
    uploadImgSrc: "",
    tcId: null,
    tc: null
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/tc/to_edit',
      data: {
        id: option.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          tc: res.data,
          tcId: res.data.id,
          uploadImgPath: res.data.imgPath,
          uploadImgSrc: "http://localhost:8080" + res.data.imgPath
        });
      }
    })
  },
  uploadImg: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost:8080/commodity/upload_img', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            var data = res.data;
            var _msg = "上传失败";
            if (!!data) {
              that.setData({
                uploadImgPath: data,
                uploadImgSrc: "http://localhost:8080" + data,
                isShowImg: 1
              });
              _msg = "上传成功";
            }
            wx.showToast({
              title: _msg
            });
          }
        })
      }
    })
  },
  deleteTc: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/tc/del',
      data: {
        id: that.data.tcId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //获取页面栈
        var pages = getCurrentPages();
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里
          prePage.onLoad();
        }
        wx.showToast({
          title: "删除成功",
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 1500)
          }
        });
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var msg = "";
    //验证
    if (!e.detail.value.name) {
      msg = "名称不能为空";
    } else if (!e.detail.value.price) {
      msg = "原价不能为空";
    } else if (!e.detail.value.memberPrice) {
      msg = "会员价不能为空";
    } else if (!that.data.uploadImgPath) {
      msg = "请上传图片";
    }
    if (!!msg) {
      wx.showModal({
        title: '温馨提示',
        content: msg,
        showCancel: false
      });
      return;
    }
    //提交表单
    wx.request({
      url: 'http://localhost:8080/tc/save',
      data: {
        name: e.detail.value.name,
        remark: e.detail.value.remark,
        price: e.detail.value.price,
        memberPrice: e.detail.value.memberPrice,
        priceType: "",
        imgPath: that.data.uploadImgPath,
        id: e.detail.value.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //获取页面栈
        var pages = getCurrentPages();
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          prePage.onLoad();
        }
        wx.showToast({
          title: "成功",
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 1500)
          }
        });
      }
    })
  }
})

