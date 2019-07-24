(function(window) {
	var otherLogin = function() {

	}
	//微信登录
	otherLogin.prototype.wx_register = function(callback) {

		var wx = api.require('wx');

		wx.auth({
			apiKey : ''
		}, function(ret, err) {

			if (ret.status) {
				api.showProgress({
					style : 'default',
					animationType : 'fade',
					title : '登录中...',
					text : '请稍后...',
					modal : false
				});
				wx.getToken({
					code : ret.code
				}, function(ret, err) {

					if (ret.status) {
						//获取用户信息
						var accessToken = ret.accessToken;
						var openId = ret.openId;
						wx.getUserInfo({
							accessToken : ret.accessToken,
							openId : ret.openId
						}, function(ret, err) {

							if (ret.status) {
								var oid = ret.openid;
								var nm = ret.nickname;
								var sex = ret.sex;

								//var sex = ret.info.gender;
								var returndata = {
									openid : oid,
									sex : sex === 0 ? 1 : 0,
									name : nm,
								}
								var pic_headimg = ret.headimgurl;
								api.hideProgress();
								callback && callback(returndata, pic_headimg, 0);

							} else {

							}
						});
					}
				});

			} else {

				if (api.systemType == 'android' && err.code == 3) {

				}
			}
		})
	};

	//QQ登录 hfui5JGPp7tyVjrw  1106054822
	otherLogin.prototype.qq_register = function(callback) {
		var obj = api.require('qq');
		var data = {
			apiKey : '1106054822'
		}
		if (api.systemType == 'ios') {
			obj.login(logins);
		} else {
			obj.login(data, logins);
		}
		var apiKey = 'KEYQ5Cv09Aw1eAzVJfX';
		function logins(ret, err) {
			if (ret.status) {
				api.showProgress({
					style : 'default',
					animationType : 'fade',
					title : '登录中...',
					text : '请稍后...',
					modal : false
				});
				//验证成功
				var openId = ret.openId;
				var accessToken = ret.accessToken;
				console.log(11111)
				//获取用户基本信息
				obj.getUserInfo(function(ret, err) {
					api.hideProgress();
					console.log(542452)
					if (ret.status) {
						var sex = ret.info.gender;
						var returndata = {
							openid : openId,
							sex : sex,
							name : ret.info.nickname,
						}
						var pic_headimg = ret.info.figureurl_qq_2;
						api.hideProgress();
						callback && callback(returndata, pic_headimg, 1);
					} else {
						api.toast({
							msg : '获取用户信息失败'
						});
					}
				});
			} else {
				api.toast({
					msg : '登录失败'
				});
			}
		}
	}
	
	
	//微博登陆
	otherLogin.prototype.wb_register = function(callback) {
		var weibo = api.require('weibo');
		weibo.auth(function(ret, err) {
			if (ret.status) {
				var tk = ret.token;
				var uid = ret.userId;
				api.showProgress({
					style : 'default',
					animationType : 'fade',
					title : '登录中...',
					text : '请稍后...',
					modal : false
				});
				var weibo = api.require('weibo');
				weibo.getUserInfo({
					token : tk,
					userId : uid
				}, function(ret, err) {
					if (ret.status) {
						var name = ret.userInfo.name;
						var sex = ret.userInfo.gender;
						var openId = ret.userInfo.idstr;
						if (sex == "m") {
							sex = 0;
						} else {
							sex = 1;
						}
						var returndata = {
							openid : openId,
							sex : sex,
							name : name,
						}
						var pic_headimg = ret.userInfo.profile_image_url;
						api.hideProgress();
						callback && callback(returndata, pic_headimg, 2);

					}
				});
			} else {
				api.toast({
					msg : '获取用户信息失败'
				});
			}
		});
	}
	window.otherLogin = otherLogin;
})(window)

//微博登陆 end	