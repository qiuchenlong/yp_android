//分享模块
(function(window) {
	var obj = {}, fn =function (){}; 
	var Share = function(o ,fns) {
		obj = o || {};
		fn = fns ; 
	}
	//分享至微信
	Share.prototype.shareWinXin = function( ) {
		if(obj.thumb.indexOf('http')!=-1){
			download(obj.thumb ,function(o){
				obj.thumb = o.url;
				s(obj);
			})
		}else{
			s(obj);
		}
		 
		if (obj.type === 'timeline') {
			obj.title = obj.description; 
			//朋友圈只显示描述就行了，名字会在下面的
		}
		
		function s(obj){
			var weiXin = api.require('wx');
			weiXin.shareWebpage({
				apiKey : '',
				scene : obj.type, //session（会话） timeline（朋友圈） favorite（收藏）
				title : obj.title || api.appName, //标题
				description : obj.description || '', //分享网页的描述。由于微信平台限制，对不同平台部分场景本参数无效
				thumb : obj.thumb || '', ///分享网页的缩略图地址，要求本地路径（fs://、widget://）大小不能超过32K,需要路径包含图片格式后缀，否则如果原图片为非png格式，会分享失败
				contentUrl : obj.url
			}, function(ret, err) {
				api.hideProgress();
	
				if (ret.status) {
					fn && fn(true);
				} else {
					fn && fn(false, err);
				}
			});		
		}
	};
	
	//分享至qq
	Share.prototype.shareQQ = function() {
	
		if(obj.thumb.indexOf('icon150x150')!=-1){
			obj.thumb = 'http://www.youdingb.com/zihuijia/Uploads/logo.png'
		}
		s(obj);
		
		function s(obj){
			var qq = api.require('qq');
			qq.shareNews({
				url : obj.url, //要分享的新闻链接地址
				title : obj.title, //要分享的新闻标题
				description : obj.description, //要分享的新闻描述
				type : obj.type, //分享内容到好友或空间，取值范围：QZone、QFriend
				imgUrl : obj.thumb ||'', //要分享的新闻缩略图的url（网络/本地资源图片），若 type 为 QZone 则本参数在 Android 上仅支持网络图片
			}, function(ret,err) {
				
				if (ret&&ret.status) {
					fn && fn(true);
				} else {
					fn && fn(false, err);
				}
			});
		}
	};
	
	Share.prototype.shareWeiBo = function() {
		if(obj.thumb.indexOf('http')!=-1){
			download(obj.thumb ,function(o){
				obj.thumb = o.url;
				s(obj);
			})
		}else{
			s(obj);
		}
		
		function s(obj){
			var weibo = api.require('weibo');
			
			weibo.shareWebPage({
				apiKey:'',
			    text: obj.description, // 
			    title: obj.title,//'测试标题',
			    description:  obj.description, //'分享内容的描述',
			    thumb: obj.thumb ,//'widget://a.jpg',
			    contentUrl: obj.url //  'http://apicloud.com'
			}, function(ret, err) {
			   if (ret.status) {
					fn && fn(true);
				} else {
					fn && fn(false, err);
				}
			});	
		}
	};
	window.Share = Share;
	function download(download_url, fn){
		console.log(download_url)
		var  quality = 0 , size = 0 ; 
		var url =  'fs://Share'+ (new Date()).getTime()  +'.png';
		api.download({
		    url: download_url,
		    savePath: url,
		    report: true,
		    cache: false,
		    allowResume: true
		}, function(ret, err) {
			size = ret.fileSize;
		    if (ret&&ret.state == 1) {
		    	if(size/1024>32){
		    		quality = (30 / (size/1024));
		    		compress(url ,quality ,function(url){
		    			fn&&fn({ state:true, url:url })
		    		})
		    	}else{
		    		fn&&fn({ state:true, url:url })
		    	}
		    } else if(ret&&ret.state==2) {
				fn&&fn({ state:true, url:url })
		    }
		});
		
		function compress(url , quality , fn){
			var imageFilter = api.require('imageFilter');
			var name = 'Share'+ (new Date()).getTime()  +'.png';
			imageFilter.compress({
			    img: url,
			    quality:quality,
			    save:{
			    	album:false,
			    	imgPath:  'fs://',             //(可选项)保存的文件路径,字符串类型，无默认值,不传或传空则不保存，若路径不存在文件夹则创建此目录
       				imgName: name
			    }
			}, function(ret, err) {
			    if (ret.status) {
			        fn&&fn( 'fs://'+name)
			    } else {
			        fn&&fn(url)
			    }
			});
		}
	};
})(window);


function shares(n,obj ,fn){
		var System = ($api.getStorage('System') || {result:[{}]}).result[0];
		var obj = obj || {
			type:'',
			title: System.title||'飞鸟',
			description:System.description||'飞鸟不玩套路：一亿礼品库，注册必送礼！',
			thumb:System.thumb||'http://www.youdingb.com/zihuijia/Uploads/logo.png',
			url:System.shareurl||'http://a.app.qq.com/o/simple.jsp?pkgname=com.s609915198.hhy&from=singlemessage&isappinstalled=1',
		};
		if(obj.url.indexOf('http')==-1){
			obj.url = 'http://'+obj.url
		}
		var s = new  Share(obj,function(is){
			if(is){ //分享成功 
				fn&&fn(true);
				$api.post(phpurl+'User/UserShare',{
					values:{
						user_id:userid
					}
				},function(ret){
					if(ret&&ret.code==200){
						$api.t('您已经分享成功了！获得了一个摇一摇的机会！' , 6000)
					}
				})	
			}else{
				fn&&fn(false);
			}
			
			if($&&$('.shareList').length&&$('.shareCover').length){
				$('.shareList').slideUp(300);
				setTimeout(function(){
					$('.shareCover').hide();
				},200)
			}
			
		});
		if(n==0||n==1){
			if(n==0){
				obj.type = 'QFriend'
			}else{
				obj.type = 'QZone'
			}
			s.shareQQ();
			return ;
		}
		if(n==2||n==3){
			if(n==2){
				obj.type = 'session'
			}else{
				obj.type = 'timeline'
			}
			s.shareWinXin();
			return ;
		}
		if(n==4){
			s.shareWeiBo();
		}
	}