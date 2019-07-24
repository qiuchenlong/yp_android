(function(window) {
	var is_code = '';
	//安卓通过的验证变量
	var sendid;
	var myyanzhengurl;
	var CAPTCHA_click = true;
	var code = parseInt(1000 + (Math.random() * 8999)), phone = 0;
    var phpurl = "http://www.fondfell.com/superDao/zihuijia/";
	//orders

	var sendCode = function(orders, yanzhengurl, smsVerify) {
		this.orders = orders;
		this.smsVerify = smsVerify;
		myyanzhengurl = yanzhengurl;
		this.init();
	}
	function checkMobile(Mobile) {
		if (!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(Mobile))) {
			return false;
		} else {
			return true;
		}
	}
	//公司自营扣费
	function charGing(orders) {
		var chargingurl = "http://www.fondfell.com/api_mode/user/successful.php?sendid=" + sendid + '&orders=' + orders;
		api.ajax({
			url : chargingurl,
			method : 'get'
		}, function(ret, err) {
			var resultcode = ret[0]['code'];
			if (resultcode == 100) {

			} else if (resultcode == 200) {
				api.toast({
					msg : '尚未建立短信模块'
				});
			} else {
				api.toast({
					msg : '费用不够'
				});
			}
		});
	}

	//验证手机是否注册过并获取sendid;
	function yanzhengPhone(phone, orders, callback, Failure) {

		//var yanzhengurl = "http://www.fondfell.com/laihai/api/user/verify.php?phone="+phone;
		var sendurl = "http://www.fondfell.com/api_mode/user/sends.php?phone=" + phone + '&orders=' + orders;
		$api.post(myyanzhengurl, {
			values : {
				phone : phone,
			}
		}, function(ret, err) {
		
			if (ret) {
				console.log($api.jsonToStr(ret) + Failure)
				$api.close_load && $api.close_load();
				var resultCode = ret.code;
				if (resultCode == 201 && !Failure) {
					$api.t('手机注册过了')
				} else {
					if (resultCode == 202 && Failure==1) {
						$api.t('手机还没有注册过！')
					} else {
						callback && callback();
					}
				}

			}
		});

	}

	//初始化
	sendCode.prototype.init = function() {
		this.smsVerify.register(function(ret, err) {
			if (ret.status) {
				
				//console.log('注册成功');
			} else {
				
			}
		});
	}
	//校验验证码
	sendCode.prototype.verify = function(phones, codes, callback) {
		if (phone === phones && code === codes) {
			callback && callback(phone);
		} else {
			api.hideProgress();
			api.toast({
				msg : '验证失败'
			});
		}
		
	}
	//提交操作
	sendCode.prototype.submit = function($phone, $code, callback) {
		var phones = $phone.value;
		var codes = $code.value;
		console.log(codes+'  ' +codes)
		if (phones == "") {
			api.toast({
				msg : '手机号不能为空'
			});
			return;
		} else if (codes == "") {
			api.toast({
				msg : '验证码不能为空'
			});

			return;
		}

		//api.showProgress({});
		
		if ((code == codes) && (phones == phone)) {

			callback && callback(phone);
		} else {
			$api.t('验证码不对!');
			callback&&callback(phone,201);
		}
	}
	//发送验证码
	sendCode.prototype.sms = function($send, $phone, Failure) {
		phone = $phone.value;

		var orders = this.orders;
		var smsVerify = this.smsVerify;
		
		if (phone == "") {
			api.toast({
				msg : '手机号不能为空'
			});
			return;
			
		} else if (!checkMobile(phone)) {
			api.toast({
				msg : '不是有效的手机号码'
			});
			return;
		}

		if ($send.innerHTML.indexOf('后重新获取') != -1) {
			return;
		} 

		$api.load && $api.load();
		yanzhengPhone(phone, orders, function() {

			if (phone && CAPTCHA_click) {
				CAPTCHA_click = false;
				var i = 60, timer = setInterval(function() {
					i--;
					$send.innerHTML = i + '秒后重新获取';
					if (i == -1) {
						$send.innerHTML = '重新获取';
						CAPTCHA_click = true;
						clearInterval(timer);
					}
				}, 1000);
               alert(phone);
				$.ajax({
					url:'http://www.51zhihuijia.com/index.php/Api?c=User&a=sendMsg',
					type:'post',
					dataType:'json',
					data:{'mobile':phone},
					success:function(res){
						if(res.code==200){
							code = res.verifyCode;
							alert('发送成功，若未收到，请一分钟后重试');
						}else{
							alert(res.msg);
						}
					}
				});
				
			}
		}, Failure)
	}
	

	window.sendCode = sendCode;
})(window)