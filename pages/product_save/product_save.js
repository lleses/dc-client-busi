var app = getApp()
Page({
	data : {
		server : app.globalData.server,
		id : "",
		productTypes : "",
		product : "",
		units : "",// 单位
		typeIndex : 0,//菜单分类选择列表的index
		inputTypeName : "",//添加菜品分类的input名称
		selTypeId : null,//删除菜品，选中的菜单ID
		isShow : 100,
		imgPath : "",
		unitIndex : 0,// 单位选择列表的index

		typeId : ""
	},
	onLoad : function(option) {
		console.log("onLoad--");
		var _that = this;
		var _id = option.id;
		if (!!_id) {
			_that.setData({
				id : _id
			});
		}
		wx.request({
			url : app.globalData.server + '/busi/product/toSave',
			data : {
				storeId : app.globalData.storeId,
				id : _that.data.id
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
					var _product = _rs.data.product;
					//选择单位
					var _unitIndex = 0;
					var _units = _rs.data.units;
					for (var i = 0; i < _units.length; i++) {
						if(_units[i]==_product.unit){
							_unitIndex = i;
						}
					}
					//选择菜品类型
					var _typeIndex = 0;
					var _productTypes = _rs.data.productTypes;
					for (var i = 0; i < _productTypes.length; i++) {
						if(_productTypes[i].id == _rs.data.selTypeId){
							_typeIndex = i;
						}
					}
					_that.setData({
						productTypes : _rs.data.productTypes,//菜品类型
						units : _units,//菜品单位
						product : _product,
						imgPath : _product.imgPath,
						unitIndex : _unitIndex,
						typeIndex : _typeIndex
					});
				} else {// 新增
					_that.setData({
						productTypes : _rs.data.productTypes,//菜品类型
						units : _rs.data.units//菜品单位
					});
				}
			}
		})
	},
	//添加分类
	saveType : function(e) {
		var _that = this;
		var _inputTypeName = _that.data.inputTypeName;
		if (!_inputTypeName) {
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
				name : _inputTypeName
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
						title : '操作成功',
						success : function() {
							setTimeout(function() {
								_that.setData({
									isShow : 100,//关闭弹框
									inputTypeName : null,
									productTypes : _rs.data
								});
							}, 1500)
						}
					});
				}
			}
		})
	},
	//删除分类
	delType : function(e) {
		var _that = this;
		var _selTypeId = _that.data.selTypeId;
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
				storeId : app.globalData.storeId,
				id : _selTypeId
			},
			success : function(res) {
				wx.hideLoading();
				if (!res.statusCode == 200) {
					console.log(res.errMsg);
					return;
				}
				var _rs = res.data;
				console.log("del,返回信息----");
				console.log(_rs);
				if (_rs.code == 100) {
					wx.showToast({
						title : _rs.message
					});
				} else {
					wx.showToast({
						title : '操作成功',
						success : function() {
							var _typeIndex = parseInt(_that.data.typeIndex);
							if(!!_rs.data && _rs.data.length < (_typeIndex+1)){
								_typeIndex = 0;
							}
							setTimeout(function() {
								_that.setData({
									isShow : 100,//关闭弹框
									inputTypeName : "",
									productTypes : _rs.data,
									selTypeId : null,
									typeIndex : _typeIndex
								});
							}, 1500)
						}
					});
				}
			}
		})
	},
	//分类picker
	typePicker : function(e) {
		this.setData({
			typeIndex : e.detail.value,
			typeId : e.target.dataset.typeid
		})
	},
	//菜品单位picker
	unitsPicker : function(e) {
		this.setData({
			unitIndex : e.detail.value
		})
	},
	//删除分类->选择类型
	selType : function(e) {
		this.setData({
			selTypeId : e.target.dataset.selTypeId
		})
	},
	typeNameInput : function(e) {
		this.setData({
			inputTypeName : e.detail.value
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
						wx.hideLoading();
						if (!res.statusCode == 200) {
							console.log(res.errMsg);
							return;
						}
						var data = res.data;
						var _msg = "上传失败";
						if (!!data) {
							that.setData({
								imgPath : data
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
		var _that = this;
		var _msg = "";
		// 验证
		if (!e.detail.value.name) {
			_msg = "名称不能为空";
		} else if (!e.detail.value.type) {
			_msg = "分类不能为空";
		} else if (!e.detail.value.price) {
			_msg = "原价不能为空";
		} else if (!e.detail.value.memberPrice) {
			_msg = "会员价不能为空";
		} else if (!_that.data.imgPath) {
			_msg = "请上传图片";
		}
		if (!!_msg) {
			wx.showModal({
				title : '温馨提示',
				content : _msg,
				showCancel : false
			});
			return;
		}
		// 提交表单
		wx.request({
			url : app.globalData.server + '/busi/product/save',
			data : {
				id : _that.data.id,
				storeId : app.globalData.storeId,
				productTypeId : e.detail.value.type,	
				name : e.detail.value.name,
				imgPath : _that.data.imgPath,
				remark : e.detail.value.remark,
				price : e.detail.value.price,//原价
				memberPrice : e.detail.value.memberPrice,//会员价
				unit : e.detail.value.unit
			},
			success : function(res) {
				wx.hideLoading();
				if (!res.statusCode == 200) {
					console.log(res.errMsg);
					return;
				}
				var _rs = res.data;
				console.log("product -> save,返回信息----");
				console.log(_rs);
				if (_rs.code == 100) {
					wx.showToast({
						title : _rs.message
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
						title : "操作成功",
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
