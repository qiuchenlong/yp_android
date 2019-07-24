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
		var notifyURL = this.phpurl + 'ypay/notify_url.php';
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
			console.log($api.jsonToStr(ret)+' 222222222');
			console.log($api.jsonToStr(err)+' 88888');
			
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
			url : phpurl + "yweixin/example/app.php", // 调取微信支付借口（前端勿管）  后台工程师配置：http://www.fondfell.com/m/api/weixin/lib/WxPay.Config.php 即可         安卓获取签名工具 ：http://www.fondfell.com/zentaopms/www/doc-view-24.html
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
		seller : '76774024@qq.com',//商户账号
		partner : '2088421612731360',//合作者ID
		//商户私钥
		rsaPriKey :'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALGPYBYi1Mnzg2KdQrs7J688CuSSwok5Fy7hMNL3Ql1m9sM0JqujVvg9Tbt31Pbatx7Q7pFWJ5UYkKRjv3h2fmRLpty/twXVO7j/ebUTngD5zj9CrgpWSbzvEezvHFYv7RALoD/0uze8xZp+39BEgaguHF3xxyeF8O3s95+XCm4BAgMBAAECgYA4jHkFk8JBLxTA62S9THGvFWhCs5rRKSWBAKcUCTtRk+Ey+gD22OZx2NRQyDFDDRUU82WHU/D3QwON11a7fsFxlz3caDgS/eGeudvB6GxT+vOKkO841Ao4rBxOpu1lir7Md24bD0CRgmop0AywN5weEFMHeuY2huM5F7tpB78tgQJBAOyBCLzTxaiO8M4iEX/YBhOYIOuZRrUXhL9qYYIDZGM7yeZ/cuwZM9+OPSERpoQ0Ey4aZPEFKyCa+TFsuf7knb0CQQDAMnDuhYFBIDcHHpV+mcVugjGEZDimKbkjhj9XjyBn3jk29GtWM+m6JEb3rceTmrv/gPHdj2+HQ7SfbKp8eYuVAkBE1DS3x6YRrS/1vcJ8A2GZWD/UcTI7x9FxZ8Ni9BvGKYNT2qmWfqszF5FAy4M7nHAsja/s2QU5IwD82lizDtO9AkEAq4QYHfPMLkdGdDcJ6AnoE79h2yjpGPgA/T/PhR74J1k8K9uhcjMvsGqxXlSZ1xJuFQyIS1W2jLqSFPePiTeapQJAIf7calrqqXDrEA7dmTrUuFQ3KpV9xnpiC5DqFHJwB52aPv9osxfrYp9u5xlyXdCaE8dpGncTzovkbtxZsJu/mQ==',
		//商户公钥
		rsaPubKey : 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxj2AWItTJ84NinUK7OyevPArkksKJORcu4TDS90JdZvbDNCaro1b4PU27d9T22rce0O6RVieVGJCkY794dn5kS6bcv7cF1Tu4/3m1E54A+c4/Qq4KVkm87xHs7xxWL+0QC6A/9Ls3vMWaft/QRIGoLhxd8ccnhfDt7PeflwpuAQIDAQAB',
	};
})(window)

