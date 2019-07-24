//支付的js
(function(window) {
	var pay = function pay(price, ordersid, phpurl, type) {
		console.log(price +'   '+ ordersid+'   '+phpurl+'  '+type)
		this.price = price;
		this.ordersid = ordersid;
		this.phpurl = phpurl;
		this.type = type;
		//判断是充值还是供养 1为充值， 2 为供养
		
	}
	//支付宝支付
	pay.prototype.zhifubao = function( callback) {
		var obj = api.require('aliPay');
		var subject = ZhiFuConfig.subject;
		var body = ZhiFuConfig.body;
		var notifyURL = this.phpurl + 'pay/notify_url.php';
		var types =  this.type;
		var phpurl = this.phpurl;
		//支付异步通知借口（前端勿管）
		var price = this.price;
		var ordersid = this.ordersid;
		
		obj.config({
			partner : ZhiFuConfig.partner, //
			seller : ZhiFuConfig.seller, //
			rsaPriKey : ZhiFuConfig.rsaPriKey, //
			rsaPubKey : ZhiFuConfig.rsaPubKey, //
			notifyURL : notifyURL//
		}, function(ret, err) {
			console.log($api.jsonToStr(ret));
			console.log($api.jsonToStr(err));
		});
		
//		alert($api.jsonToStr({
//			subject : subject,
//			body : body,
//			amount : price,
//			tradeNO : ordersid
//		}))


		obj.pay({
			subject : subject,
			body : body,
			amount : price,
			tradeNO : ordersid
		}, function(ret, err) {
			if (ret.code == 9000) {
				callback && callback(true);
			}  else if (ret.code == 4000) {
                alert('系统异常,错误码:4000')
                callback && callback(false)
            } else if (ret.code == 4001) {
                alert('数据格式不正确,错误码:4001')
                callback && callback(false)
            } else if (ret.code == 4003) {
                alert('支付宝账户被冻结或不允许支付,错误码:4003')
                callback && callback(false)
            } else if (ret.code == 4003) {
                alert('支付宝账户被冻结或不允许支付,错误码:4003')
                callback && callback(false)
            } else if (ret.code == 4006) {
                alert('订单支付失败,错误码:4006')
                callback && callback(false)
            } else if (ret.code == 6001) {
                api.toast({
                    msg: '订单支付已被取消'
                });
                callback && callback(false)
            } else if (ret.code == 0001) {
                alert('支付模块缺少商户id等商户配置信息,错误码:0001')
                callback && callback(false)
            } else if (ret.code == 0002) {
                alert('支付模块缺少（subject、body、amount、tradeNO）等参数,错误码:0002')
                callback && callback(false)
            } else if (ret.code == 0003) {
                alert('支付模块中的公钥密钥与支付宝上配置的不一致,错误码:0003')
                callback && callback(false)
            } else {
                
                callback && callback(false)
            }
		});
	}
	//微信支付
	pay.prototype.weixinzhifu = function(callback) {
		var phpurl = this.phpurl;
		var price = this.price;
		var types =  this.type;
		var ordersid = this.ordersid;
		
		console.log($api.jsonToStr( {
					type : "login",
					zongjia : price, //支付的价格
					danhao : ordersid //单号
				}))
		api.ajax({
			url : phpurl + "weixin/example/app.php", // 调取微信支付借口（前端勿管）  后台工程师配置：http://www.fondfell.com/m/api/weixin/lib/WxPay.Config.php 即可         安卓获取签名工具 ：http://www.fondfell.com/zentaopms/www/doc-view-24.html
			method : 'POST',
			timeout : '30',
			dataType : 'json',
			returnAll : false,
			cache : true,
			data : {
				values : {
					type : "login",
					zongjia : price, //支付的价格
					danhao : ordersid //单号
				}
			}
		}, function(ret, err) {
			console.log($api.jsonToStr(ret))
			console.log($api.jsonToStr(err))
			if (ret) {
				var back_info = ret;
				var weiXin = api.require('weiXin');
				weiXin.registerApp(function(ret, err) {
					if (ret.status) {
						weiXin.payOrder({
							orderId : back_info.prepayid,
							partnerId : back_info.partnerid,
							nonceStr : back_info.noncestr ,
							timeStamp : back_info.timestamp,
							package : back_info.package,
							sign : back_info.sign
						}, function(ret, err) {
							if (ret.status) {
								callback && callback(true);
							} else {
								callback && callback(false);
								if (err.code == 2) {
									api.toast({
										msg : '支付失败'
									});
								}
							}
						});
					}else{
						callback && callback(false);
						$api.t('未知错误无法支付2');
					}
				});
			} else {
				callback && callback(false);
				$api.t('未知错误无法支付1');
			}
		});
	}
	window.pay = pay;
	var ZhiFuConfig = {
		subject : '飞鸟订单', //订单名称
		body : '飞鸟', //收款方名称
		seller : 'fonfree123@163.com',//商户账号
		partner : '2088912824540933',//合作者ID
		//商户私钥
		rsaPriKey :'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKSPMtsUQtevRNNtRA1fLYxa5V1MS5o9J6XdKV6I/irvnrCUiOKExgpCoaj3WkqpEOKLISLId20VMvVsR4mOvnenrPBTwrE8nqN1LjvSS/CY0lKtcCx6E+w8cexQlOExt6qQ7PtknjW3RRFMolPpk6CZjIx08HSUxZ71LGFDY4sHAgMBAAECgYAbzwM2GIdvMXQ9EnL0m4fz9wxZpuIDz5/anLQ4AIiLMvErP/6d4Pgilb4B8sL0aPusfPx9h0j/SxzQcproORIgmvqFvjqvvkCDqBdbu4QW6cUaIcm04yu/wtzE8hwh1Un7K9PeVXZGSFewyW186HfpK0QE1siyP6nWiiZmTU82WQJBAM9gxLKlLASaEnz0UQZYS/8fAS3hfz/feNv0gHRO9ezF1mpH3GiZEMOuhg0Oza6Qk68lI/f66wNrXJI4A9y0GVUCQQDLJF9jzdfbV+X/BZDEJJdEJqpDTMhvy00zIDPVCUoT6/hOs91gR4lxGpMU5j7gCPQEPgeYFXtSD7VWnMtX5yLrAkA/pYF5GryBxQ+7jfh4LA1XBZsFC9pULjAXwdjS2ZEc1DNUdy2sZJ4CkMPPqiVyWCkbbhi1+Sq75+2Hau20hQnpAkEArjmz1lVlHKp2iBKt5ou7cKf4v1/LSJaEz6R+z+f3sL5haJ667yhrqKWyH+qZYmxLXJgWy0khS3BNhstTW0DRoQJAEkLJoQvMA88tZKbShigzWpFPzpO3lXcel2+3P12zBjpaifhQ4qFmC5JFmnoZYo27Ids+0C85/vMdbe/Lhe9lbA==',
		//商户公钥
		rsaPubKey : 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkjzLbFELXr0TTbUQNXy2MWuVdTEuaPSel3SleiP4q756wlIjihMYKQqGo91pKqRDiiyEiyHdtFTL1bEeJjr53p6zwU8KxPJ6jdS470kvwmNJSrXAsehPsPHHsUJThMbeqkOz7ZJ41t0URTKJT6ZOgmYyMdPB0lMWe9SxhQ2OLBwIDAQAB',
	};
})(window)

