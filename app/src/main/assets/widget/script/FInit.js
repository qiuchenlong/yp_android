(function(window) {
	//SuperDao
	
	var appId = $api.getStorage('appId');
	var Mphpurl = $api.getStorage('Mphpurl');
	
	window.config = {
		appId : appId,
		appKey : '1bye0PT9eu',
		bgColorId:appId,
		phpurl:'http://www.fondfell.com/superDao/apis/141/'
	}
	
})(window);



// require module

(function(window) {
	var module = {}

	var FS_DIR = 'fs://mode/';
	var M_ROOT_DIR = null;

	var M_CSS_FILE_NAME = '_fondfell.css';

	var M_JS_FILE_NAME = '_fondfell.js';
	function addjs(scriptText) {
		var hed = document.getElementsByTagName('head')[0];
		var scripts = document.createElement('script');
		scripts.text = scriptText;
		hed.appendChild(scripts);

	}

	function addcss(cssText) {
		var hed = document.getElementsByTagName('head')[0];
		var link = document.createElement('style');
		link.textContent = cssText;
		hed.appendChild(link);

	}

	/*
	 * 插入模块
	 *
	 *
	 */
	function appendModule(mName, scriptText, callback) {
		addjs(scriptText);
		appendCss(mName);
		callback && callback(module[mName]);
	}

	function appendCss(name) {
		var http = window.XMLHttpRequest && new XMLHttpRequest();
		//本地模块地址
		var url = M_ROOT_DIR + name + M_CSS_FILE_NAME;
		http.onreadystatechange = function() {
			if (http.readyState == 3) {
				var file_text = http.responseText;
				addcss(file_text);
			}
		}
		http.open("GET", url, true);
		http.send(null);

	}

	//提示
	function toast(str) {
		api.toast({
			msg : str
		});
	}

	//读取
	function redy(name, callback) {
		api.ajax({
	       url:'http://www.fondfell.com/superDao/lg/21/index.php?c=LiaoLiaoCode&a=getLiaoCode&name='+name,
	       method:'get',
	       timeout:6
       },function(text,err){
			if(text){
//				getTable().find.begin().select('name', '=' + name).end(function(text) {
					resetInit();
					//还原
					var data = text;
					if (data.code == 200) {
						var result = data.result[0];
						if (result) {
							addjs(result.mode_js);
							addcss(result.mode_css);
							saveLocal(name, result);
		
						}
					}
			}else{
				toast('网络不太好,请检查一下网络~');
			}
			callback && callback(data);

		});

	}

	//保存本地
	function saveLocal(name, result) {
		var fs = api.require('fs');
		fs.createDir({
			path : 'fs://mode'
		}, function(ret, err) {
			write(name + M_JS_FILE_NAME, result.mode_js, function(ret) {
				if (ret.status) {
					write(name + M_CSS_FILE_NAME, result.mode_css, function(ret2) {
						if (ret2.status) {
							$api.setStorage(name, {
								version : result.version
							});

						}
					});
				}
			});

		});

	}

	//写进文件
	function write(fileName, model, callback) {
		var fs = api.require('fs');
		fs.createFile({
			path : 'fs://mode/' + fileName,
		}, function(ret, err) {
			if (ret.status) {
				api.writeFile({
					path : 'fs://mode/' + fileName,
					data : model
				}, callback);
			}
		});

	}

	/*
	 * 检测本地模块
	 * name 模块名
	 * callback 回调   parameter file_is_true 是否跟新 true表示存在   file_text =>js文本
	 */
	function getLocalModule(name, callback) {
		var http = window.XMLHttpRequest && new XMLHttpRequest();
		//本地模块地址
		var url = M_ROOT_DIR + name + M_JS_FILE_NAME;

		var file_is_true = true;
		http.onreadystatechange = function() {
			if (http.readyState == 3) {
				var file_text = http.responseText;
				callback && callback(file_is_true, file_text);
			}
		}
		http.onerror = function(err) {
			file_is_true = false;
			callback && callback(file_is_true);
		}
		http.open("GET", url, true);
		http.send(null);

	}

	/*
	 * 检测版本号
	 * name 模块名
	 * version 本地版本号
	 * callback 回调方法     parameter is_news 是否跟新 true表示跟新
	 *
	 */
	function getVersion(name, callback) {
		api.ajax({
	       url:'http://www.fondfell.com/superDao/lg/21/index.php?c=LiaoLiaoCode&a=getVersion&name='+name,
	       method:'get',
	       timeout:6
       },function(text,err){
			if(text){
//		getTable().find.begin().filter('version').select('name', '=' + name).end(function(text) {

				var data = text;
				var is_news = false;
				if (data.code == 200) {
					var result = data.result[0];
					if (result) {
						var versionObj = $api.getStorage(name) || {};
						var version = parseFloat(versionObj['version']);
						var v = parseFloat(result.version);
	
						if (version < v) {
							is_news = true;
	
						}
					} else {
						toast('网络模块不存在');
					}
				} else {
					toast('错误消息:' + data.msg);
				}
			}else{
				toast('网络不太好,请检查一下网络~');
			}
			callback && callback(is_news);
		});
	}

	var require = function(mName, callback) {
		if (module[mName]) {
			callback && callback(module[mName]);
			return;
		}
		M_ROOT_DIR = api.fsDir + '/mode/';
		init();

		getLocalModule(mName, function(fileBoll, fileText) {
			//本地模块存在
			if (fileBoll) {
				getVersion(mName, function(is_news) {
					//版本没有更新

					if (!is_news) {
						resetInit();
						//还原
						//插入js和css

						appendModule(mName, fileText, callback);

						//版本跟新
					} else {
						init();
						redy(mName, function(data) {
							if (data.code == -100) {
								appendModule(mName, fileText, callback);
								return;
							}

							callback && callback(module[mName]);
						});

					}

				});

				//模块不存在
			} else {
				//读取
				init();
				redy(mName, function(data) {
					if (data.code == -100) {
						toast('网络错误!!!');
						return;
					}
					callback && callback(module[mName]);

				});

			}

		});

	}
	


	window.require = require;
	window.defind = function(callback) {
		callback && callback(module);

	}
	

	/*
	 * fondfell JavaScript Library
	 * Copyright (c) 2016-6-21
	 */
	function parseArguments(url, data, fnSuc, dataType, timeout) {

		if ( typeof (data) == 'function') {
			timeout = dataType;
			dataType = fnSuc;
			fnSuc = data;
			data = undefined;

		}
		if ( typeof (fnSuc) != 'function') {
			timeout = dataType;
			dataType = fnSuc;
			fnSuc = undefined;
		}
		return {
			url : url,
			data : data,
			fnSuc : fnSuc,
			dataType : dataType,
			timeout : timeout || 6
		};
	}
	
	/*$api.get = function(url,callback){
	    var timeout = timeout || 6;
	    api.ajax({
	        url:url,
	        method:'get',
	        timeout:6
        },function(ret,err){
            $api.closeloadingDialog();
        	if(ret){
        	   var code = ret.code;
        	   if(code == 200){
        	       var result = ret.result;
        	       var returnObj = {
        	           code:code,
        	           result:result
        	       }
        	       callback&&callback(returnObj);
        	   }
        	}else{
        	   var returnObj = {
        	      code:1
        	   };
        	   callback&&callback(returnObj);
        	}
        });
	}*/
	
	$api.get = function() {
	    
		var argsToJson = parseArguments.apply(null, arguments);
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		//argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'json';
		}
		json.timeout = argsToJson.timeout;
		json.method = 'get';
		api.ajax(json, function(ret, err) {
			if(ret){
		        
		        fnSuc && fnSuc(ret, err);
		    }else{
		        api.ajax(json,function(ret,err){
                	if(ret){
                	    fnSuc && fnSuc(ret, err);
                	}else{
                	    var ret={
				           code:1
				        }
				        fnSuc && fnSuc(ret, err);
                	}
                }); 
		        
		    }
		});
	};
	
	$api.post = function() {
	    
		var argsToJson = parseArguments.apply(null, arguments);
		alert(JSON.stringify(argsToJson));
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'json';
		}
		json.timeout = argsToJson.timeout;
		
		json.method = 'post';
		alert(JSON.stringify(json))
		api.ajax(json, function(ret, err) {
		    if(err){
		        api.ajax(json,function(ret,err){
                	if(err){
                	    var ret={
				           code:1
				        }
				        fnSuc && fnSuc(ret, err);
                	}else{
                	    fnSuc && fnSuc(ret, err);
                	}
                });
		       
		    }else{
		        fnSuc && fnSuc(ret, err);
		    }
			
		});
	};


	/*$api.post = function() {
		var argsToJson = parseArguments.apply(null, arguments);
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'json';
		}
		json.timeout = argsToJson.timeout;
		json.method = 'post';
		api.ajax(json, function(ret, err) {
			fnSuc && fnSuc(ret, err);
		});
	};*/
	/*$api.get = function() {
		var argsToJson = parseArguments.apply(null, arguments);
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		//argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'text';
		}
		json.timeout = argsToJson.timeout;
		json.method = 'get';
		api.ajax(json, function(ret, err) {
			fnSuc && fnSuc(ret, err);
		});
	};*/
	
	
	var proportion = 1;
	//改变图片尺寸
	var changeImageSize = function(images){
	    for(var i=0;i<images.length;i++){
	        var width = images[i].offsetWidth;
	        images[i].style.height = width*proportion+'px';
	    }
	}

    //渲染状态栏与自动调整头部状态栏字体颜色
	var getStatusBarStyle = function(colorCode){
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	    var sColor = colorCode.toLowerCase();
	    if(sColor && reg.test(sColor)){
	        if(sColor.length === 4){
	            var sColorNew = "#";
	                for(var i=1; i<4; i+=1){
	                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));        
	                }
	                sColor = sColorNew;
	        }
	        var sColorChange = [];
	        for(var i=1; i<7; i+=2){
	            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));        
	        }
	        return sColorChange[0]*0.299+sColorChange[1]*0.587+sColorChange[2]*0.114 > 200 ? 'dark':'light';
	    }else if(sColor.indexOf('rgb')==0 ){
	    	sColor = sColor.replace('rgb(','');
	    	sColor = colorCode.subcolorCodeing(0,colorCode.length-1).split(',');
	        return parseInt(sColor[0])*0.299+parseInt(sColor[1])*0.587+parseInt(sColor[2])*0.114  > 200 ? 'dark':'light';
	    }else{
	    	return 'dark';
	    }
    };
	
//	首次启动页面加载头部页面颜色信息
	var getBg = function(){
			
			var SBColor = $api.getStorage('SBColor');//app主色调
			var appHeaderColor = $api.getStorage('appHeaderColor');//app头部色调
			var app_color = $api.getStorage('app_color');
			
		    var tiID = setTimeout(function(){
		    	appHeaderColor = appHeaderColor||".appHeaderColor{background:#f8f8f8 !important;color:#fff !important}";
		    	SBColor = SBColor||"#f8f8f8";
		    	app_color = app_color||".appcolor_bg{background:#de344e !important;} .appcolor_bc{border:1px solid #de344e !important;} .appcolor_tx{color:#434343;}";
		    	$api.setStorage('appHeaderColor',appHeaderColor);
		    	$api.setStorage('SBColor',SBColor);
		    	$api.setStorage('app_color',app_color);
				var style = document.createElement('style');
				style.innerHTML =  appHeaderColor;
				var hed = document.getElementsByTagName('head')[0];
				hed.appendChild(style);
		    },2000);
		    var coid = $api.getStorage('appId');
		    api.ajax({
	            url:'http://www.fondfell.com/superDao/lg/21/index.php?c=AppCode&a=getCode&id='+coid,
	            method:'get',
	            timeout:5
            },function(ret,err){
            	var data = ret;
            	if(ret){
	            	if(ret.error == 0){
	            	    if(ret.result.length > 0){
			   				var appHeaderBg = ret.result[0].appHeaderBg;//appHeaderColor为app的头部背景色
			   				var htxcolor =  ret.result[0].htxcolor;//SBColor为app的头部字体颜色
			   				var appcolor = ret.result[0].appcolor;//app_color为app的主色调
			   				SBColor = appHeaderBg;
			   				appHeaderColor = ".appHeaderColor{background:"+appHeaderBg+ "!important;color:"+htxcolor+" !important}";
			   				//appcolor_bg为主色调背景颜色,appcolor_bc为主色调边框颜色,appcolor_tx为主色调字体颜色
			   				app_color = ".appcolor_bg{background:"+appcolor+" !important;} .appcolor_bc{border:1px solid "+appcolor+" !important;} .appcolor_tx{color:"+appcolor+" !important;}";
			   				$api.setStorage('appHeaderColor',appHeaderColor);
			   				$api.setStorage('SBColor',SBColor);
			   				$api.setStorage('app_color',app_color);
							var style = document.createElement('style');
							style.innerHTML =  appHeaderColor;
							var hed = document.getElementsByTagName('head')[0];
							hed.appendChild(style);
			   			}
	            	}
            	}else{
            	    
            	    appHeaderColor = appHeaderColor||".appHeaderColor{background:#21232F !important;color:#434343 !important}";
			    	app_color = app_color||".appcolor_bg{background:#de344e !important;} .appcolor_bc{border:1px solid #de344e !important;} .appcolor_tx{color:#434343 !important;}";
			    	SBColor = SBColor||"#f8f8f8";
			    	$api.setStorage('appHeaderColor',appHeaderColor);
			    	$api.setStorage('SBColor',SBColor);
			    	$api.setStorage('app_color',app_color);
					var style = document.createElement('style');
					style.innerHTML =  appHeaderColor;
					var hed = document.getElementsByTagName('head')[0];
					hed.appendChild(style);
            	}
            });
		 
	}
	
//	给win页面头部设定背景色与字体颜色
	var getBg2 = function(){
		var appHeaderColor = $api.getStorage('appHeaderColor');
		appHeaderColor = appHeaderColor||".appHeaderColor{background:#21232F !important;color:#434343 !important}";
		var app_color = $api.getStorage('app_color');
			var style = document.createElement('style');
			style.innerHTML =  appHeaderColor+app_color;
			var hed = document.getElementsByTagName('head')[0];
			hed.appendChild(style);
	}
	getBg2();
	window.getBg = getBg;
	window.getStatusBarStyle = getStatusBarStyle;
	window.changeImageSize = changeImageSize;
})(window);





