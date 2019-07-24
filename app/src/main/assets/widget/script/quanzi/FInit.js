(function(window) {
	//SuperDao
	
	var appId = $api.getStorage('appId');
	var Mphpurl = $api.getStorage('Mphpurl');
	
	window.config = {
		appId : appId,
		appKey : '1bye0PT9eu',
		bgColorId:appId,
		phpurl:'http://www.youdingb.com/zihuijia/'
	}
	window.SuperDao = {
		init : function(a, c, b) {
			this.appID = a;
			this.apiKey = c;
			this.globalUrl = b
		},
		keyword : {
			field_file : "file_",
			field_picture : "pic_",
			field_fk : "fk_",
			post_param : {
				tableName : "table_name",
				appID : "appid",
				where : "where",
				update : "updates"
			}
		}
	};
	function Dao(a) {
		this.tableName = a;
		this.add = {
			addValues : {},
			dao : this
		};
		this.add.begin = function() {
			this.addValues = {};
			return this
		};
		this.add.set = function(c, b) {
			if (c.indexOf(SuperDao.keyword.field_file) == 0 || c.indexOf(SuperDao.keyword.field_picture) == 0) {
				if ( b instanceof File) {
					alert("apicloud_superdao.js 不支持File对象，请传入文件路径");
					return
				}
			}
			this.addValues[c] = b;
			return this
		};
		this.add.save = function(b) {
			Dao.prototype.save(this.dao.tableName, this.addValues, b)
		};
		this.find = {
			dao : this
		};
		this.find.select = function(b, c) {
			c = convertLikeCondition2(c);
			this.selectCondition[this.selectCondition.length] = {
				field : this.dao.tableName + "." + b,
				value : c,
				type : "none"
			};
			return this
		};
		this.find.and = function(d, e, c) {
			if ( typeof (c) == "undefined") {
				c = true
			}
			e = convertLikeCondition2(e);
			if (c == false) {
				e = e.replace(/\"/g, "")
			}
			var b = c == true ? this.dao.tableName + "." : "";
			this.selectCondition[this.selectCondition.length] = {
				field : b + d,
				value : e,
				type : "and"
			};
			return this
		};
		this.find.or = function(b, c) {
			c = convertLikeCondition2(c);
			this.selectCondition[this.selectCondition.length] = {
				field : this.dao.tableName + "." + b,
				value : c,
				type : "or"
			};
			return this
		};
		this.find.limit = function(c, b) {
			this.limitCondition[0] = c;
			this.limitCondition[1] = b;
			return this
		};
		this.find.orderASC = function(b) {
			this.orderCondition[this.orderCondition.length] = {
				field : this.dao.tableName + "." + b,
				order : "ASC"
			};
			return this
		};
		this.find.orderDESC = function(b) {
			this.orderCondition[this.orderCondition.length] = {
				field : this.dao.tableName + "." + b,
				order : "DESC"
			};
			return this
		};
		this.find.filter = function(b) {
			if (this.filterResult.length > 0 && this.filterResult[0].indexOf(this.dao.tableName + ".*") >= 0) {
				this.filterResult.shift()
			}
			var c = b.split(",");
			for ( i = -1; ++i < c.length; ) {
				c[i] = c[i].replace(/^\s+|\s+$/g, "");
				if (this.filterResult.toString().indexOf(c[i]) == -1) {
					this.filterResult.push(this.dao.tableName + "." + c[i])
				}
			}
			return this
		};
		this.find.join = function(c, b, d) {
			this.jsonTableName.push(c);
			var f = "";
			if (d.indexOf("?") > 0) {
				f = "?"
			}
			if (d.indexOf("!=") > 0) {
				f = "!="
			}
			if (d.indexOf("=") > 0) {
				f = "="
			}
			if (d.indexOf(">=") > 0) {
				f = ">="
			}
			if (d.indexOf("<=") > 0) {
				f = "<="
			}
			if (d.indexOf("<") > 0) {
				f = "<"
			}
			if (d.indexOf(">") > 0) {
				f = ">"
			}
			var e = d.split(f);
			this.and(e[0], f + e[1], false);
			if (this.filterResult.length == 0) {
				this.filterResult.push(this.dao.tableName + ".*")
			}
			var g = b.split(",");
			for ( i = -1; ++i < g.length; ) {
				g[i] = g[i].replace(/^\s+|\s+$/g, "");
				if (this.filterResult.toString().indexOf(g[i]) == -1) {
					this.filterResult.push(c + "." + g[i])
				}
			}
			return this
		};
		this.find.begin = function() {
			this.orderCondition = new Array();
			this.limitCondition = new Array();
			this.selectCondition = new Array();
			this.filterResult = new Array();
			this.jsonTableName = new Array();
			return this
		};
		this.find.end = function(b) {
			Dao.prototype.find(this.dao.tableName, this.selectCondition, this.limitCondition, this.orderCondition, this.filterResult, this.jsonTableName, b)
		};
		this.remove = {
			dao : this
		};
		this.remove.select = function(b, c) {
			c = convertLikeCondition2(c);
			this.removeCondition[this.removeCondition.length] = {
				field : b,
				value : c,
				type : "none"
			};
			return this
		};
		this.remove.and = function(b, c) {
			c = convertLikeCondition2(c);
			this.removeCondition[this.removeCondition.length] = {
				field : b,
				value : c,
				type : "and"
			};
			return this
		};
		this.remove.or = function(b, c) {
			c = convertLikeCondition2(c);
			this.removeCondition[this.removeCondition.length] = {
				field : b,
				value : c,
				type : "or"
			};
			return this
		};
		this.remove.begin = function() {
			this.removeCondition = new Array();
			return this
		};
		this.remove.end = function(b) {
			Dao.prototype.remove(this.dao.tableName, this.removeCondition, b)
		};
		this.modify = {
			dao : this
		};
		this.modify.set = function(c, b) {
			if (c.indexOf(SuperDao.keyword.field_file) == 0 || c.indexOf(SuperDao.keyword.field_picture) == 0) {
				if ( b instanceof File) {
					alert("apicloud_superdao.js 不支持File对象，请传入文件路径");
					return this
				} else {
					this.modifyFiles[c] = b;
					return this
				}
			} else {
				this.modifyValues[this.modifyValues.length] = {
					field : c,
					value : b
				}
			}
			return this
		};
		this.modify.select = function(b, c) {
			c = convertLikeCondition2(c);
			this.modiryCondition[this.modiryCondition.length] = {
				field : b,
				value : c,
				type : "none"
			};
			return this
		};
		this.modify.and = function(b, c) {
			c = convertLikeCondition2(c);
			this.modiryCondition[this.modiryCondition.length] = {
				field : b,
				value : c,
				type : "and"
			};
			return this
		};
		this.modify.or = function(b, c) {
			c = convertLikeCondition2(c);
			this.modiryCondition[this.modiryCondition.length] = {
				field : b,
				value : c,
				type : "or"
			};
			return this
		};
		this.modify.begin = function() {
			this.modifyFiles = {};
			this.modifyValues = new Array();
			this.modiryCondition = new Array();
			return this
		};
		this.modify.end = function(b) {
			Dao.prototype.modify(this.dao.tableName, this.modiryCondition, this.modifyValues, this.modifyFiles, b)
		}
	}
	Dao.prototype.save = function(f, d, g) {
		var a = {};
		var b = {};
		for (var e in d) {
			if ( typeof (d[e]) != "function") {
				if (e.indexOf(SuperDao.keyword.field_file) == 0 || e.indexOf(SuperDao.keyword.field_picture) == 0) {
					a[e] = d[e]
				} else {
					b[e] = d[e]
				}
			}
		}
		b.table_name = f;
		b.appid = SuperDao.appID;
		var c = {
			values : b,
			files : a
		};
		httpPost(SuperDao.globalUrl + "/superDao/model/JSDao/add/index.php", c, function(h) {
			g(h)
		})
	};
	Dao.prototype.find = function(c, e, f, j, b, d, k) {
		var h = {};
		h.table_name = c;
		for (var g = 0; g < d.length; g++) {
			h.table_name += ", " + d[g]
		}
		h.appid = SuperDao.appID;
		h.where = JSON.stringify(e);
		h.limit = JSON.stringify(f);
		h.order = JSON.stringify(j);
		h.filter = JSON.stringify(b);
		var a = {
			values : h
		};
		httpPost(SuperDao.globalUrl + "/superDao/model/JSDao/find/index.php", a, function(l) {
			k(l)
		})
	};
	Dao.prototype.remove = function(d, a, e) {
		var b = {};
		b.table_name = d;
		b.appid = SuperDao.appID;
		b.where = JSON.stringify(a);
		var c = {
			values : b
		};
		httpPost(SuperDao.globalUrl + "/superDao/model/JSDao/remove/index.php", c, function(f) {
			e(f)
		})
	};
	Dao.prototype.modify = function(f, c, b, h, g) {
		var d = {};
		d.table_name = f;
		d.appid = SuperDao.appID;
		d.where = JSON.stringify(c);
		d.updates = JSON.stringify(b);
		var a = h;
		var e = {
			values : d,
			files : a
		};
		httpPost(SuperDao.globalUrl + "/superDao/model/JSDao/modify/index.php", e, function(j) {
			g(j)
		})
	};
	function convertLikeCondition2(d) {
		var c = /^\s*[?\uff1f]\s*/i;
		if (c.test(d)) {
			var b = d.replace(c, "");
			b = b.replace(/\\/g, "\\\\\\\\");
			b = b.replace(/\"/g, '\\"');
			b = b.replace(/%/g, "\\%");
			b = ' like "%' + b + '%"';
			return b
		}
		c = /^\s*like\s*/i;
		if (c.test(d)) {
			var b = d.replace(c, "");
			b = b.replace(/\\/, "\\\\\\\\");
			b = b.replace(/\"/g, '\\"');
			b = ' like "' + b + '"';
			return b
		}
		c = /^\s*(!=|>=|<=|=|>|<)\s*/;
		var a = c.exec(d);
		if (a != null) {
			var b = d.replace(c, "");
			if (/^(\d)*$/.test(b)) {
				return a[0] + '"' + b + '"'
			} else {
				b = b.replace(/\"/g, '\\"');
				return a[0] + '"' + b + '"'
			}
		}
		alert("条件格式错误 : " + d);
		throw "条件格式错误 : " + d
	}

	function getUrlCache(a, b) {
		api.getPrefs({
			key : a
		}, function(c, d) {
			if (c) {
				b(c.value)
			} else {
				b(null)
			}
		})
	}

	function setUrlCache(a, b) {
		api.setPrefs({
			key : a,
			value : b
		})
	}

	function httpPost(a, b, c) {
		parseUniqueStrByParam(b);
		api.ajax({
			url : a,
			method : "post",
			data : b
		}, function(e, f) {
			if (e) {
				var d = JSON.stringify(e);
				c(JSON.parse(d));
				setUrlCache(a + parseUniqueStrByParam(b), d)
			} else {
				if (f.statusCode == 500) {
					if (f.statusCode == 500) {
						f.msg = "服务器错误"
					}
					c({
						code : +f.statusCode,
						msg : f.msg
					})
				} else {
					
					getUrlCache(a + parseUniqueStrByParam(b), function(g) {
						if (f.statusCode == 0 && (g == null || g == "")) {
							f.statusCode = -1;
							c({
								code : f.statusCode,
								msg : f.msg
							})
						} else {
							if (g != null && g != "") {
								c(JSON.parse(g))
							} else {
								c({
									code : f.statusCode,
									msg : f.msg
								})
							}
						}
					})
				}
			}
		})
	}

	function parseUniqueStrByParam(d) {
		var b = "";
		var c = d.values;
		for (var a in c) {
			b += (a + c[a])
		}
		return b
	};

	window.Dao = Dao;
	SuperDao.init(config.appId, config.appKey, 'http://www.fondfell.com');
})(window);

//laytpl
(function(window) {"use strict";
	var f, b = {
		open : "{{",
		close : "}}"
	}, c = {
		exp : function(a) {
			return new RegExp(a, "g")
		},
		query : function(a, c, e) {
			var f = ["#([\\s\\S])+?","([^{#}])*?"][a || 0];
			return d((c || "") + b.open + f + b.close + (e || ""))
		},
		escape : function(a) {
			return String(a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
		},
		error : function(a, b) {
			var c = "Laytpl Error：";
			return "object" == typeof console && console.error(c + a + "\n" + (b || "")), c + a
		}
	}, d = c.exp, e = function(a) {
		this.tpl = a
	};
	e.pt = e.prototype, e.pt.parse = function(a, e) {
		var f = this, g = a, h = d("^" + b.open + "#", ""), i = d(b.close + "$", "");
		a = a.replace(/[\r\t\n]/g, " ").replace(d(b.open + "#"), b.open + "# ").replace(d(b.close + "}"), "} " + b.close).replace(/\\/g, "\\\\").replace(/(?="|')/g, "\\").replace(c.query(), function(a) {
			return a = a.replace(h, "").replace(i, ""), '";' + a.replace(/\\/g, "") + '; view+="'
		}).replace(c.query(1), function(a) {
			var c = '"+(';
			return a.replace(/\s/g, "") === b.open + b.close ? "" : ( a = a.replace(d(b.open + "|" + b.close), ""), /^=/.test(a) && ( a = a.replace(/^=/, ""), c = '"+_escape_('), c + a.replace(/\\/g, "") + ')+"')
		}), a = '"use strict";var view = "' + a + '";return view;';
		try {
			return f.cache = a = new Function("d, _escape_", a), a(e, c.escape)
		} catch(j) {
			return
			delete f.cache, c.error(j, g)
		}
	}, e.pt.render = function(a, b) {
		var e, d = this;
		return a ? ( e = d.cache ? d.cache(a, c.escape) : d.parse(d.tpl, a), b ? (b(e),
		void 0) : e) : c.error("no data")
	}, f = function(a) {
		return "string" != typeof a ? c.error("Template not found") : new e(a)
	}, f.config = function(a) {
		a = a || {};
		for (var c in a)
		b[c] = a[c]
	}, f.v = "1.1", "function" == typeof define ? define(function() {
		return f
	}) : "undefined" != typeof exports ? module.exports = f : window.laytpl = f
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

	//初始化数据库
	function init() {
		SuperDao.init("14", "YnZIlyjsnL", "http://www.fondfell.com");
	}

	//获取数据表
	function getTable() {
		return new Dao("liaoliao_code");
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
	//还原SuperDao init
	function resetInit() {
		SuperDao.init(config.appId, config.appKey, 'http://www.fondfell.com');
	}


	window.require = require;
	window.defind = function(callback) {
		callback && callback(module);

	}
	window.resetInit = resetInit;

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
			init();
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
            	    
            	    appHeaderColor = appHeaderColor||".appHeaderColor{background:#de344e !important;color:#434343 !important}";
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
		     resetInit();
	}
	
//	给win页面头部设定背景色与字体颜色
	var getBg2 = function(){
		var appHeaderColor = $api.getStorage('appHeaderColor');
		appHeaderColor = appHeaderColor||".appHeaderColor{background:#de344e !important;color:#434343 !important}";
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





