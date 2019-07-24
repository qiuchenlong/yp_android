/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */

var Imageurl = "http://s.xiao12888.com/appapi/";
var phpurl = "http://s.xiao12888.com/appapi/index.php/Home/";


(function(window){
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function(){
        var ls = window.localStorage;
        if(isAndroid){
           ls = os.localStorage();
        }
        return ls;
    };
    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof(data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof(fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url: url,
            data: data,
            fnSuc: fnSuc,
            dataType: dataType
        };
    }
    
//  自己扩展的
    
     u.each = function(obj, fn) {
		if (obj) {
			for (var i = 0, l = obj.length; i < l; i++) {
				fn && fn(obj[i], i)
			}
		}
	}
	u.t = function(text, time, loc) {
		api.toast({
			msg : text,
			duration : time || 2000,
			location : loc || 'middle'
		});
	};
	
	
//	官方的api
    
    
    
    u.trim = function(str){
        if(String.prototype.trim){
            return str == null ? "" : String.prototype.trim.call(str);
        }else{
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    
   
    u.trimAll = function(str){
        return str.replace(/\s*/g,'');
    };
    u.isElement = function(obj){
        return !!(obj && obj.nodeType == 1);
    };
    u.isArray = function(obj){
        if(Array.isArray){
            return Array.isArray(obj);
        }else{
            return obj instanceof Array;
        }
    };
    u.isEmptyObject = function(obj){
        if(JSON.stringify(obj) === '{}'){
            return true;
        }
        return false;
    };
    u.addEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if(el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function(){
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelectorAll){
                return document.querySelectorAll(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelectorAll){
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function(id){
        return document.getElementById(id);
    };
    u.first = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$api.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':first-child');
        }
    };
    u.last = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$api.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':last-child');
        }
    };
    u.eq = function(el, index){
        return this.dom(el, ':nth-child('+ index +')');
    };
    u.not = function(el, selector){
        return this.domAll(el, ':not('+ selector +')');
    };
    u.prev = function(el){
        if(!u.isElement(el)){
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function(el){
        if(!u.isElement(el)){
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function(el, selector){
        if(!u.isElement(el)){
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function(doms, el){
            var i = 0, len = doms.length;
            for(i; i<len; i++){
                if(doms[i].isEqualNode(el)){
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function(el, selector){
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while(!targetDom){
                el = el.parentNode;
                if(el != null && el.nodeType == el.DOCUMENT_NODE){
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function(parent,el){
        var mark = false;
        if(el === parent){
            mark = true;
            return mark;
        }else{
            do{
                el = el.parentNode;
                if(el === parent){
                    mark = true;
                    return mark;
                }
            }while(el === document.body || el === document.documentElement);

            return mark;
        }
        
    };
    u.remove = function(el){
        if(el && el.parentNode){
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function(el, name, value){
        if(!u.isElement(el)){
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function(el, name){
        if(!u.isElement(el)){
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            el.removeAttribute(name);
        }
    };
    u.hasCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    u.addCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
       if('classList' in el){
            el.classList.toggle(cls);
        }else{
            if(u.hasCls(el, cls)){
                u.removeCls(el, cls);
            }else{
                u.addCls(el, cls);
            }
        }
        return el;
    };
    u.val = function(el, val){
        if(!u.isElement(el)){
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            switch(el.tagName){
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if(arguments.length === 2){
            switch(el.tagName){
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }
        
    };
    u.prepend = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.innerHTML;
        }else if(arguments.length === 2){
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function(el, txt){
        if(!u.isElement(el)){
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.textContent;
        }else if(arguments.length === 2){
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function(el){
        if(!u.isElement(el)){
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function(el, css){
        if(!u.isElement(el)){
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if(typeof css == 'string' && css.indexOf(':') > 0){
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function(el, prop){
        if(!u.isElement(el)){
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }
    };
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }
    };
    u.setStorage = function(key, value){
        if(arguments.length === 2){
            var v = value;
            if(typeof v == 'object'){
                v = JSON.stringify(v);
                v = 'obj-'+ v;
            }else{
                v = 'str-'+ v;
            }
            var ls = uzStorage();
            if(ls){
                ls.setItem(key, v);
            }
        }
    };
    u.getStorage = function(key){
        var ls = uzStorage();
        if(ls){
            var v = ls.getItem(key);
            if(!v){return;}
            if(v.indexOf('obj-') === 0){
                v = v.slice(4);
                return JSON.parse(v);
            }else if(v.indexOf('str-') === 0){
                return v.slice(4);
            }
        }
    };
    u.rmStorage = function(key){
        var ls = uzStorage();
        if(ls && key){
            ls.removeItem(key);
        }
    };
    u.clearStorage = function(){
        var ls = uzStorage();
        if(ls){
            ls.clear();
        }
    };

   
    /*by king*/
    u.fixIos7Bar = function(el){
        if(!u.isElement(el)){
            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
            return;
        };
        var strDM = api.systemType;
        if (strDM == 'ios') {
            var strSV = api.systemVersion;
            var numSV = parseInt(strSV,10);
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                el.style.paddingTop = '20px';
            }
        }
    };
    u.fixStatusBar = function(el){
        if(!u.isElement(el)){
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return;
        }
        var sysType = api.systemType;
        if(sysType == 'ios'){
            u.fixIos7Bar(el);
        }else if(sysType == 'android'){
            var ver = api.systemVersion;
            ver = parseFloat(ver);
            if(ver >= 4.4){
                el.style.paddingTop = '25px';
            }
        }
    };
    u.toast = function(title, text, time){
        var opts = {};
        var show = function(opts, time){
            api.showProgress(opts);
            setTimeout(function(){
                api.hideProgress();
            },time);
        };
        if(arguments.length === 1){
            var time = time || 500;
            if(typeof title === 'number'){
                time = title;
            }else{
                opts.title = title+'';
            }
            show(opts, time);
        }else if(arguments.length === 2){
            var time = time || 500;
            var text = text;
            if(typeof text === "number"){
                var tmp = text;
                time = tmp;
                text = null;
            }
            if(title){
                opts.title = title;
            }
            if(text){
                opts.text = text;
            }
            show(opts, time);
        }
        if(title){
            opts.title = title;
        }
        if(text){
            opts.text = text;
        }
        time = time || 500;
        show(opts, time);
    };
    u.post = function(/*url,data,fnSuc,dataType*/){
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        argsToJson.data && (json.data = argsToJson.data);
        if(argsToJson.dataType){
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text'||type == 'json') {
                json.dataType = type;
            }
        }else{
            json.dataType = 'json';
        }
        json.method = 'post';
        json.timeout = '6';
        getAjax(json,fnSuc);
    };
    
    function getAjax(json,fnSuc){
        api.ajax(json,
            function(ret,err){
                
                if (ret) {
                    fnSuc && fnSuc(ret);
                }else{
                    var code = err.code;
                    if(code == 0){
                        // api.toast({
	                    //     // msg:'没有网络,请连接网络'
                        // });
                        $api.closeloadding();
                    }else if(code == 1){
                        getAjax(json,fnSuc);
                    }
                }
            }
        );
    }
    
    u.get = function(/*url,fnSuc,dataType*/){
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        //argsToJson.data && (json.data = argsToJson.data);
        if(argsToJson.dataType){
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text'||type == 'json') {
                json.dataType = type;
            }
        }else{
            json.dataType = 'text';
        }
        json.method = 'get';
        api.ajax(json,
            function(ret,err){
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };
	
	u.send = function(name,data){
    	api.sendEvent({
		    name: name,
		    extra: data
		});
    } 
/*end*/
//  var loading_id=0;
	u.loadding = function(name,type){
		console.log(type);
		var text = $api.dom('html').className.replace('htmlWeiLei' , '').replace('htmlWeiLei-bg' , '').replace('htmlWeiLei-no-bg' , '');
		
		if(type == 0 ){
			$api.dom('html').className= text+ ' htmlWeiLei htmlWeiLei-bg';
		}
		
		if(type == 1 ){
			$api.dom('html').className=text+' htmlWeiLei';
		}
		if(type == 2 ){
			$api.dom('html').className=text+' htmlWeiLei htmlWeiLei-no-bg';
		}
		
		
//		console.log($api.dom('html').className);
//		$('body').append('<div class="lh-covers">'
//							+'<div class="lh-contents">'
//								+'<img src="../../gif/613779.gif" alt="" />'
//							+'</div>'
//						+'</div>');
//  	var UILoading = api.require('UILoading');
//  	
//  	if(type == 0){
//			UILoading.keyFrame({
//			    rect: {
//			        w: api.winWidth,
//			        h: api.winHeight
//			    },
//			    styles: {
//			        bg: 'rgba(0,0,0,.3)',
//			       
//			        interval: 50,
//			        frame: {
//			            w:100,
//			            h:100
//			        }
//			    },
//			    size: 30,
//			    fixed: true,
//			    fixedOn: name,
//			    
//			    
//			}, function(ret) {
//			    loading_id = ret.id;
//	 		 	
//			});
//		}else if(type == 1){

//		    UILoading.keyFrame({
//			    rect: {
//			        w: api.winWidth,
//			        h: api.winHeight
//			    },
//			    styles: {
//			        bg: 'rgba(255,255,255,1)',
//			       
//			        interval: 50,
//			        frame: {
//			            w:100,
//			            h:100
//			        }
//			    },
//			    size: 30,
//			    fixed: true,
//			    fixedOn: name,
//			    
//			    
//			}, function(ret) {
//			    loading_id = ret.id;
//	 		 	
//			});
//		}else if(type == 2){
//			UILoading.keyFrame({
//			    rect: {
//			        w: api.winWidth,
//			        h: api.winHeight
//			    },
//			    styles: {
//			        bg: 'rgba(0,0,0,0)',
//			       
//			        interval: 50,
//			        frame: {
//			            w:100,
//			            h:100
//			        }
//			    },
//			    size: 30,
//			    fixed: true,
//			    fixedOn: name,
//			    
//			    
//			}, function(ret) {
//			    loading_id = ret.id;
//	 		 	
//			});
//		}
    }
    
	u.closeloadding = function(){
	
		$api.removeCls($api.dom('html'), 'htmlWeiLei');
		$api.removeCls($api.dom('html'), 'htmlWeiLei-no-bg');
		$api.removeCls($api.dom('html'), 'htmlWeiLei-bg');
	}
	u.go_goodsDes = function(id){
		openW({
			frm_url:'frame0/shang_pin_xiang_qing.html',
			title:'商品详情概述',
			data:{
				r_txt:'<span class="img"><span class="fen_xiang iconfont icon-share" onclick="shareShow()"><b>奖</b></span></span>',
				goodsid: id
			}
		})
		
	}
	var isXL = false;
	
	u.setisXL = function(){
	    isXL = true;
	}
	//下拉刷新显示更多
	u.up = function(callback){
	   var $bottom_loadmore = $api.dom('.bottom_loadmore');
	   var loadmore = '<span>正在加载更多...</span>';
	   var nomore = '<span>没有更多数据</span>';
	   var nonet = '<span>没有网络,点击重新加载</span>';
	   var is_return=true;
	   var page = 0;
	   
	   function clickEvent(){
	       $bottom_loadmore.innerHTML=loadmore;
	       callback&&callback(page,fn);
	   }
	   
	   function fn(ret){
	       is_return = true;
	       
	       if(ret.code == 200){
	          var result = ret.result;
	          if(result.length>0){
	              $bottom_loadmore.innerHTML = loadmore;
	              $bottom_loadmore.style.visibility = "hidden";
	          }else{
	              --page;
	              $bottom_loadmore.innerHTML = nomore;
	              $bottom_loadmore.style.visibility="visible";
	              $bottom_loadmore.removeEventListener('click',function(){});
	              $bottom_loadmore.addEventListener('click',function(){
	                  
	              });
	          }
	       }else if(ret.code == 1){
	          $bottom_loadmore.innerHTML = nonet;
	          $bottom_loadmore.style.visibility="visible";
	          $bottom_loadmore.removeEventListener('click',clickEvent);
	          $bottom_loadmore.addEventListener('click',clickEvent);
	          
	       }
	   }	      
       api.addEventListener({
	        name:'scrolltobottom',
		    extra:{
		        threshold:-20          
		    }
       },function(ret,err){
            if(isXL){
               page = 0;
               isXL = false;
            }
       	    if(is_return){
       	       is_return = false;
       	       ++page;
       	       $bottom_loadmore.innerHTML = loadmore;
       	      
       	       $bottom_loadmore.style.visibility="visible";
       	       callback&&callback(page,fn);
       	    }
       });
       api.addEventListener({
	       name:'pageRefresh'
       },function(ret,err){
           page = 0;
       });
	}
	var hasL = true;
	u.setHasL = function(hs){
	    hasL = hs;
	}
	u.mpull = function(callback){
	   var $bottom_loadmore = $api.dom('.bottom_loadmore');
	   var loadmore = '<span>正在加载更多...</span>';
	   var nomore = '<span>没有更多数据</span>';
	   var nonet = '<span>没有网络,点击重新加载</span>';
	   var is_return=true;
	   var page = 0;
	   
	   function clickEvent(){
	       $bottom_loadmore.innerHTML=loadmore;
	       callback&&callback(page,fn);
	   }
	   
	   function fn(ret){
	       is_return = true;
	       
	       if(ret.code == 200){
	          var result = ret.result;
	          if(result.length>0){
	              $bottom_loadmore.innerHTML = loadmore;
	              $bottom_loadmore.style.visibility = "hidden";
	          }else{
	              --page;
	              $bottom_loadmore.innerHTML = nomore;
	              $bottom_loadmore.style.visibility="visible";
	              $bottom_loadmore.removeEventListener('click',function(){});
	              $bottom_loadmore.addEventListener('click',function(){
	                  
	              });
	          }
	       }else if(ret.code == 1){
	          $bottom_loadmore.innerHTML = nonet;
	          $bottom_loadmore.style.visibility="visible";
	          $bottom_loadmore.removeEventListener('click',clickEvent);
	          $bottom_loadmore.addEventListener('click',clickEvent);
	          
	       }
	   }	      
       api.addEventListener({
	        name:'scrolltobottom',
		    extra:{
		        threshold:-20          
		    }
       },function(ret,err){
            if(isXL){
               page = 0;
               isXL = false;
            }
       	    if(is_return&&hasL){
       	       is_return = false;
       	       ++page;
       	       $bottom_loadmore.innerHTML = loadmore;
       	      
       	       $bottom_loadmore.style.visibility="visible";
       	       callback&&callback(page,fn);
       	    }
       });
       api.addEventListener({
	       name:'pageRefresh'
       },function(ret,err){
           page = 0;
       });
       
	}
	
	//下拉刷新
	u.pull = function(callback){
		api.setRefreshHeaderInfo({
		    visible: true,
		    loadingImg: 'widget://image/refresh.png',
		    bgColor: '#ccc',
		    textColor: '#fff',
		    textDown: '下拉刷新...',
		    textUp: '松开刷新...',
		    showTime: true
		}, function( ret, err ){
		api.refreshHeaderLoadDone();
		    isXL = true;
		    var $bottom_loadmore = $api.dom('.bottom_loadmore');
		    $bottom_loadmore.style.visibility = "hidden";
			callback&&callback(api.refreshHeaderLoadDone);
			
			 //无网络取消刷新
			  if (api.connectionType == "none" || api.connectionType == "unknown") {
            api.refreshHeaderLoadDone();
            return;
               }
               
		});
	
	}
	
	u.noDate = function(){//无数据返回
    	$api.append($api.dom('body'), '<div id="body"><div class="null"><img src="../../image/null.png" alt="" /><p>没有数据哦</p></div></div>');
    	$api.byId('body').style.display = 'block';
    }
	u.closeNoDate = function(){
		$api.append($api.dom('body'), '<div id="body"><div class="null"><img src="../../image/null.png" alt="" /><p>没有数据哦</p></div></div>');
    	$api.byId('body').style.display = 'none';
    }
    
    u.openT
    //data : '名字,id'
	u.open_user = function (data){
		var arr = data.split(','),
			id = arr[1],
			name = arr[0],
			e = e || event;
		openW({
			frm_url:'frame2/wo_de_di_pan.html',
			title:'用户' ,
			winName:'wo_de_di_pan'+(new Date()).getTime(),
			data:{
				is_win:false	,
				id:id,
			}
		});
		if (e.stopPropagation) e.stopPropagation();//防冒泡
	}
	
	
	u.confirm = function(obj) {
		api.confirm({
			title : obj.title || '提示',
			msg : obj.msg,
			buttons : obj.buttons_arr || ['确定', '取消']
		}, function(ret, err) {
			if (ret.buttonIndex == 1) {
				obj.fn_arr[0] && obj.fn_arr[0]();
			} else {
				obj.fn_arr[1] && obj.fn_arr[1]();
			}
		});
	}

	//拿话题列表的接口
	
	u.getCircleTalk = function(obj){
		var site = $api.getStorage('site');	
		obj = obj || {};	
		var values = {
			user_id:userid,
		}
		
	
		if(obj.circle_id) {
			values.circle_id = obj.circle_id;
		}
		if(obj.topic_id){
			values.topic_id = obj.topic_id;
		}
		
		if(obj.to_user_id){
			values.to_user_id = obj.to_user_id
		}
		
//		if(obj.city){
//			values.city = obj.city
//		}
		
		function get(page , callback){
			values.page = page ; 
			$api.post(phpurl+'CircleTalk/getCircleTalk', {
				values:values
			},function(ret){
//			alert($api.jsonToStr(ret));
				callback&&callback(page, ret);
			});	
		}
		return get;
	}
	
	
	//表单验证和过滤html标签
	u.biao_dan_yan_zheng = function (str) {
		if (str == '') {
			//$api.t('不能没有内容');
			return false;
		}
		str = str.replace(/<\/?[^>]*>/g, '')
		if (!clearBr(str)) {
			//$api.t('不能没有内容');
			return false;
		}
		function clearBr(key) {
			key = $api.trimAll(key);
			key = key.replace(/<\/?.+?>/g, "");
			key = key.replace(/[\r\n]/g, "");
			return key;
		}
		return clearBr(str);
	}
	
	//加轮播图  //要mui.main.js支持
//auto_play: 默认是自动播放的，如果要不自动播放就要传这个参数
	u.add_slider = function(obj, data, auto_play, fn ,imgUrl) {
		if (document.querySelector(obj)) {
			obj = document.querySelector(obj);
		};
		var dot = '<div class="mui-slider-indicator">' + '<div class="mui-indicator mui-active"></div>';
		var html = '<div class="mui-slider">' + '<div class="mui-slider-group mui-slider-loop">' + '<div class="mui-slider-item mui-slider-item-duplicate">' + '<img onclick="$api.add_slider.click(' + (data.length - 1) + ')" src="' + imgUrl + data[data.length - 1].url + '" />' + '</div>';
		for (var i = 0, l = data.length; i < l; i++) {
			html += '<div class="mui-slider-item"><img  onclick="$api.add_slider.click(' + i + ')" src="' + imgUrl + data[i].url + '" /></div>';
			if (i != 0) {
				dot += '<div class="mui-indicator"></div>';
			}
		}
		html += '<div class="mui-slider-item mui-slider-item-duplicate">' + '<img   onclick="$api.add_slider.click(0)" src="' + imgUrl + data[0].url + '" />' + '</div></div>' + dot + '</div></div>';
		obj.innerHTML = html;
		console.log(html)
		var gallery = mui('.mui-slider');
		var m = 0;
		if (auto_play) {
			m = auto_play;
		}
		u.add_slider.click = function(i) {
			fn && fn(i, data[i]);
		}
		gallery.slider({
			interval : m //自动轮播周期，若为0则不自动播放，默认为0；
		});
	}
    window.$api = u;
})(window);
var userid = $api.getStorage('userid');
