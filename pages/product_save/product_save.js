//index.js
//获取应用实例
var app = getApp()
Page({
	data : {
		id : null,
		productTypes : null,
		product : null,

		isShow : 10,
		isShowImg : 2,

		typeName : null,
		typeIndex : 0,
		typeId : null,
		selTypeId : null,
		// 单位
		priceType : [ '碟', '半打', '锅', '2只', '份', '串', '条', '包', '打', '大煲', '中煲', '小煲', '碗', '煲', '时价', '例', '斤', '只', '半只' ],
		priceIndex : 0,
		priceTypeName : '碟',
		uploadImgPath : "",
		uploadImgSrc : ""
	},
	onLoad : function(option) {
		console.log("onLoad--commodity_add");
		var _that = this;
		var _id = option.id;
		if (!!_id) {
			_that.setData({
				id : _id
			});
		}
		app.getSessionId(function(p_sessionId) {
			console.log("p_sessionId:" + p_sessionId);
			wx.request({
				url : app.globalData.server + '/busi/product/toSave',
				data : {
					storeId : app.globalData.storeId,
					id : _id
				},
				success : function(res) {
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
					if (!!_id) {// 修改
						_that.setData({
							productTypes : _rs.data.productTypes,
							product : _rs.data.product
						});
					} else {// 新增
						_that.setData({
							// //菜品类型
							productTypes : _rs.data.productTypes
						});
					}
				}
			})
		});
	},
	saveType : function(e) {
		var that = this;
		var _typeName = that.data.typeName;
		if (!_typeName) {
			wx.showModal({
				title : '温馨提示',
				content : '名称不能为空',
				showCancel : false
			});
			return;
		}
		wx.request({
			url : app.globalData.server + '/busi/productType/save',
			data : {
				storeId : app.globalData.storeId,
				name : _typeName
			},
			success : function(res) {
				wx.hideLoading();
				if (!res.statusCode == 200) {
					console.log(res.errMsg);
					return;
				}
				var _rs = res.data;
				console.log("save,返回信息----");
				console.log(_rs);
				if (_rs.code == 100) {
					wx.showToast({
						title : _rs.message
					});
				} else {
					wx.showToast({
						title : '处理成功',
						success : function() {
							setTimeout(function() {
								that.setData({
									isShow : 10,
									typeName : null,
									typeList : res.data
								});
							}, 1500)
						}
					});
				}
			}
		})
	},
	delType : function(e) {
		var that = this;
		var _selTypeId = that.data.selTypeId;
		if (!_selTypeId) {
			wx.showModal({
				title : '温馨提示',
				content : '请选择名称',
				showCancel : false
			});
			return;
		}
		wx.request({
			url : app.globalData.server + '/busi/productType/del',
			data : {
				id : _selTypeId
			},
			success : function(res) {
				if (res.data == "0") {
					wx.showToast({
						title : '名称重复'
					});
				} else {
					wx.showToast({
						title : '处理成功',
						success : function() {
							setTimeout(function() {
								that.setData({
									isShow : 10,
									typeName : null,
									typeList : res.data,
									selTypeId : null
								});
							}, 1500)
						}
					});
				}
			}
		})
	},
	typePicker : function(e) {
		this.setData({
			typeIndex : e.detail.value,
			typeId : e.target.dataset.typeid
		})
	},
	pricePicker : function(e) {
		this.setData({
			priceIndex : e.detail.value,
			priceTypeName : e.target.dataset.pricename
		})
	},
	selType : function(e) {
		this.setData({
			selTypeId : e.target.dataset.selTypeId
		})
	},
	typeNameInput : function(e) {
		this.setData({
			typeName : e.detail.value
		})
	},
	showAddTypeView : function(e) {
		this.setData({
			isShow : e.target.dataset.num
		})
	},
	showEidtTypeView : function(e) {
		this.setData({
			isShow : e.target.dataset.num,
			selTypeId : null
		})
	},
	uploadImg : function(e) {
		var that = this;
		wx.chooseImage({
			success : function(res) {
				var tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					url : app.globalData.server + '/upload/img', // 仅为示例，非真实的接口地址
					filePath : tempFilePaths[0],
					name : 'file',
					formData : {},
					success : function(res) {
						var data = res.data;
						var _msg = "上传失败";
						if (!!data) {
							that.setData({
								uploadImgPath : data,
								uploadImgSrc : app.globalData.server + data,
								isShowImg : 1
							});
							_msg = "上传成功";
						}

						wx.showToast({
							title : _msg
						});
					}
				})
			}
		})
	},
	formSubmit : function(e) {
		var that = this;
		var msg = "";
		// 验证
		if (!e.detail.value.name) {
			msg = "名称不能为空";
		} else if (!e.detail.value.type) {
			msg = "分类不能为空";
		} else if (!e.detail.value.price) {
			msg = "原价不能为空";
		} else if (!e.detail.value.memberPrice) {
			msg = "会员价不能为空";
		} else if (!that.data.uploadImgPath) {
			msg = "请上传图片";
		}
		if (!!msg) {
			wx.showModal({
				title : '温馨提示',
				content : msg,
				showCancel : false
			});
			return;
		}

		// 提交表单
		wx.request({
			url : app.globalData.server + '/commodity/add',
			data : {
				name : e.detail.value.name,
				commodityTypeId : e.detail.value.type,
				remark : e.detail.value.remark,
				price : e.detail.value.price,
				memberPrice : e.detail.value.memberPrice,
				priceType : e.detail.value.priceType,
				imgPath : that.data.uploadImgPath
			},
			success : function(res) {
				if (res.data == "0") {
					wx.showModal({
						title : '温馨提示',
						content : '名称重复',
						showCancel : false
					});
				} else {
					// 获取页面栈
					var pages = getCurrentPages();
					if (pages.length > 1) {
						// 上一个页面实例对象
						var prePage = pages[pages.length - 2];
						// 关键在这里
						prePage.onLoad();
					}
					wx.showToast({
						title : "成功",
						success : function() {
							setTimeout(function() {
								wx.navigateBack({
									delta : 1
								});
							}, 1500)
						}
					});
				}
			}
		})
	}
})
