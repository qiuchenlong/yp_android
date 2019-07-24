/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
//var imageUrl = "http://www.youdingb.com/";
//
//var uimgUrl = "http://www.youdingb.com/xiangmu/book/";
//var phpurl = "http://www.youdingb.com/xiangmu/book/index.php/";

// var imageUrl = "http://106.52.204.57/Public/";
// var uimgUrl = "http://106.52.204.57/book/books/Public/";
// var phpurl = "http://106.52.204.57/book/index.php/";
// var userimg = "http://106.52.204.57/Public/";

var imageUrl = "http://106.52.204.57/Public/";
var uimgUrl = "http://106.52.204.57/book/books/Public/";
var phpurl = "http://106.52.204.57/book/index.php/";
var userimg = "http://106.52.204.57/Public/";


(function (window) {
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function () {
        var ls = window.localStorage;
        if (isAndroid) {
            ls = os.localStorage();
        }
        return ls;
    };

    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof (data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof (fnSuc) != 'function') {
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
    u.trim = function (str) {
        if (String.prototype.trim) {
            return str == null ? "" : String.prototype.trim.call(str);
        } else {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    u.trimAll = function (str) {
        return str.replace(/\s*/g, '');
    };
    u.isElement = function (obj) {
        return !!(obj && obj.nodeType == 1);
    };
    u.isArray = function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        } else {
            return obj instanceof Array;
        }
    };
    u.isEmptyObject = function (obj) {
        if (JSON.stringify(obj) === '{}') {
            return true;
        }
        return false;
    };
    u.addEvt = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function () {
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function (el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelector) {
                return document.querySelector(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelector) {
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function (el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelectorAll) {
                return document.querySelectorAll(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelectorAll) {
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function (id) {
        return document.getElementById(id);
    };
    u.first = function (el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':first-child');
        }
    };
    u.last = function (el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':last-child');
        }
    };
    u.eq = function (el, index) {
        return this.dom(el, ':nth-child(' + index + ')');
    };
    u.not = function (el, selector) {
        return this.domAll(el, ':not(' + selector + ')');
    };
    u.prev = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function (el, selector) {
        if (!u.isElement(el)) {
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function (doms, el) {
            var i = 0,
                len = doms.length;
            for (i; i < len; i++) {
                if (doms[i].isEqualNode(el)) {
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function (el, selector) {
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while (!targetDom) {
                el = el.parentNode;
                if (el != null && el.nodeType == el.DOCUMENT_NODE) {
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function (parent, el) {
        var mark = false;
        if (el === parent) {
            mark = true;
            return mark;
        } else {
            do {
                el = el.parentNode;
                if (el === parent) {
                    mark = true;
                    return mark;
                }
            } while (el === document.body || el === document.documentElement);

            return mark;
        }

    };
    u.remove = function (el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function (el, name, value) {
        if (!u.isElement(el)) {
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length == 2) {
            return el.getAttribute(name);
        } else if (arguments.length == 3) {
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function (el, name) {
        if (!u.isElement(el)) {
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            el.removeAttribute(name);
        }
    };
    u.hasCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if (el.className.indexOf(cls) > -1) {
            return true;
        } else {
            return false;
        }
    };
    u.addCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.add(cls);
        } else {
            var preCls = el.className;
            var newCls = preCls + ' ' + cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.remove(cls);
        } else {
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.toggle(cls);
        } else {
            if (u.hasCls(el, cls)) {
                u.removeCls(el, cls);
            } else {
                u.addCls(el, cls);
            }
        }
        return el;
    };
    u.val = function (el, val) {
        if (!u.isElement(el)) {
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            switch (el.tagName) {
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
        if (arguments.length === 2) {
            switch (el.tagName) {
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
    u.prepend = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.innerHTML;
        } else if (arguments.length === 2) {
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function (el, txt) {
        if (!u.isElement(el)) {
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.textContent;
        } else if (arguments.length === 2) {
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function (el) {
        if (!u.isElement(el)) {
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
    u.css = function (el, css) {
        if (!u.isElement(el)) {
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if (typeof css == 'string' && css.indexOf(':') > 0) {
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function (el, prop) {
        if (!u.isElement(el)) {
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function (json) {
        if (typeof json === 'object') {
            return JSON && JSON.stringify(json);
        }
    };
    u.strToJson = function (str) {
        if (typeof str === 'string') {
            return JSON && JSON.parse(str);
        }
    };
    u.setStorage = function (key, value) {
        if (arguments.length === 2) {
            var v = value;
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = uzStorage();
            if (ls) {
                ls.setItem(key, v);
            }
        }
    };
    u.getStorage = function (key) {
        var ls = uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) {
                return;
            }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        }
    };
    u.rmStorage = function (key) {
        var ls = uzStorage();
        if (ls && key) {
            ls.removeItem(key);
        }
    };
    u.clearStorage = function () {
        var ls = uzStorage();
        if (ls) {
            ls.clear();
        }
    };


    /*by king*/
    u.fixIos7Bar = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
            return;
        }
        var strDM = api.systemType;
        if (strDM == 'ios') {
            var strSV = api.systemVersion;
            var numSV = parseInt(strSV, 10);
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;

            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                //el.style.marginTop = '20px';
                el.style.paddingTop = '20px';
            }
        }
    };
    u.fixStatusBar = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return;
        }
        var sysType = api.systemType;
        if (sysType == 'ios') {
            u.fixIos7Bar(el);

        } else if (sysType == 'android') {
            var ver = api.systemVersion;
            ver = parseFloat(ver);
            if (ver >= 4.4) {
                el.style.paddingTop = '25px';
            }
        }
    };
    u.toast = function (title, text, time) {
        var opts = {};
        var show = function (opts, time) {
            api.showProgress(opts);
            setTimeout(function () {
                api.hideProgress();
            }, time);
        };
        if (arguments.length === 1) {
            var time = time || 500;
            if (typeof title === 'number') {
                time = title;
            } else {
                opts.title = title + '';
            }
            show(opts, time);
        } else if (arguments.length === 2) {
            var time = time || 500;
            var text = text;
            if (typeof text === "number") {
                var tmp = text;
                time = tmp;
                text = null;
            }
            if (title) {
                opts.title = title;
            }
            if (text) {
                opts.text = text;
            }
            show(opts, time);
        }
        if (title) {
            opts.title = title;
        }
        if (text) {
            opts.text = text;
        }
        time = time || 500;
        show(opts, time);
    };
    u.post = function ( /*url,data,fnSuc,dataType*/ ) {
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
        json.method = 'post';
        api.ajax(json,
            function (ret, err) {
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };


    u.get = function ( /*url,fnSuc,dataType*/ ) {
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
        json.method = 'get';
        api.ajax(json,
            function (ret, err) {
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };

    /*end*/

    //打开窗口
    u.openWin = function (name, url, data) {
        api.openWin({
            name: name,
            url: url + '.html',
            reload: false,
            pageParam: data
        });

    }
    var isXL = false;

    u.setisXL = function () {
        isXL = true;
    }
    //下拉刷新显示更多
    u.up = function (callback) {
        var $bottom_loadmore = $api.dom('.bottom_loadmore');
        var loadmore = '<span>正在加载更多...</span>';
        var nomore = '<span>没有更多数据</span>';
        var nonet = '<span>没有网络,点击重新加载</span>';
        var is_return = true;
        var page = 0;

        function clickEvent() {
            $bottom_loadmore.innerHTML = loadmore;

            callback && callback(page, fn);
        }

        function fn(ret) {
            is_return = true;
            console.log(JSON.stringify(ret))
            // console.log(ret.code)
            if (ret.code == 200) {
                var result = ret.result;
                console.log(result.length)
                if (result.length > 0) {
                    $bottom_loadmore.innerHTML = loadmore;
                    $bottom_loadmore.style.visibility = "hidden";
                } else {
                    --page;
                    $bottom_loadmore.innerHTML = nomore;
                    $bottom_loadmore.style.visibility = "visible";
                    $bottom_loadmore.removeEventListener('click', function () {});
                    $bottom_loadmore.addEventListener('click', function () {

                    });
                }
            } else if (ret.code == 1) {
                $bottom_loadmore.innerHTML = nonet;
                $bottom_loadmore.style.visibility = "visible";
                $bottom_loadmore.removeEventListener('click', clickEvent);
                $bottom_loadmore.addEventListener('click', clickEvent);

            }
        }
        api.addEventListener({
            name: 'scrolltobottom',
            extra: {
                threshold: -20
            }
        }, function (ret, err) {
            if (isXL) {
                page = 0;
                isXL = false;
            }
            if (is_return) {
                is_return = false;
                ++page;
                $bottom_loadmore.innerHTML = loadmore;

                $bottom_loadmore.style.visibility = "visible";
                callback && callback(page, fn);
            }
        });
    }

    //下拉刷新显示更多--不是通过result.length进行判断刷新
    u.cyUp = function (callback) {
        var $bottom_loadmore = $api.dom('.bottom_loadmore');
        var loadmore = '<span>正在加载更多...</span>';
        var nomore = '<span>没有更多数据</span>';
        var nonet = '<span>没有网络,点击重新加载</span>';
        var is_return = true;
        var page = 0;

        function clickEvent() {
            $bottom_loadmore.innerHTML = loadmore;

            callback && callback(page, fn);
        }

        function fn(page, ret, par_len) {
            is_return = true;
            // console.log(JSON.stringify(ret))
            // console.log(JSON.stringify(par_len));
            if (ret.code == 200) {
                // console.log(par_len.length);
                // var result = ret.result;
                if (par_len > 0) {
                    $bottom_loadmore.innerHTML = loadmore;
                    $bottom_loadmore.style.visibility = "hidden";
                } else {
                    --page;
                    $bottom_loadmore.innerHTML = nomore;
                    $bottom_loadmore.style.visibility = "visible";
                    $bottom_loadmore.removeEventListener('click', function () {});
                    $bottom_loadmore.addEventListener('click', function () {

                    });
                }
            } else if (ret.code == 1) {
                $bottom_loadmore.innerHTML = nonet;
                $bottom_loadmore.style.visibility = "visible";
                $bottom_loadmore.removeEventListener('click', clickEvent);
                $bottom_loadmore.addEventListener('click', clickEvent);

            }
        }
        api.addEventListener({
            name: 'scrolltobottom',
            extra: {
                threshold: -20
            }
        }, function (ret, err) {
            if (isXL) {
                page = 0;
                isXL = false;
            }
            if (is_return) {
                is_return = false;
                ++page;
                $bottom_loadmore.innerHTML = loadmore;

                $bottom_loadmore.style.visibility = "visible";
                callback && callback(page, fn);
            }
        });
    }

    u.mpull = function () {

    }

    //下拉刷新
    u.pull = function (callback) {
        api.setRefreshHeaderInfo({
            visible: true,
            loadingImg: 'widget://image/refresh.png',
            bgColor: '#ccc',
            textColor: '#fff',
            textDown: '下拉刷新...',
            textUp: '松开刷新...',
            showTime: true
        }, function (ret, err) {
            console.log(JSON.stringify(ret))
            console.log(JSON.stringify(err))
            isXL = true;
            var $bottom_loadmore = $api.dom('.bottom_loadmore');
            $bottom_loadmore.style.visibility = "hidden";
            callback && callback(api.refreshHeaderLoadDone);
        });

    }



    u.t = function (text, time, loc) {
        api.toast({
            msg: text,
            duration: time || 2000,
            location: loc || 'middle'
        });
    };

    //上啦加载
    u.down = function (callback) {
        return new DownLoad(callback);

    }


    u.Down = function (callback) {

        var is_return = true;
        api.addEventListener({
            name: 'scrolltobottom',
            extra: {
                threshold: 20
            }
        }, function (ret, err) {
            if (is_return) {
                is_return = false;
                callback && callback();
            }
        });

        return {
            setIsReturn: function () {
                is_return = true;
            }
        }
    }

    function DownLoad(callback) {
        this.is_return = true;
        var _this = this;
        api.addEventListener({
            name: 'scrolltobottom',
            extra: {
                threshold: 20
            }
        }, function (ret, err) {
            if (_this.is_return) {
                _this.is_return = false;
                callback && callback.call(_this, _this);
            }
        });

    }

    u.showloadingDialog = function (hasbg) {
        var $body = $api.dom('body');
        var $dialogContainer = document.createElement('div');
        $dialogContainer.className = "loading_dialog";
        var loadinghtml = '<img src="../image/ic_loading_inner_white.png"/>' +
            '<img src="../image/ic_loading_wrapper_white.png" class="loadingrotate"/>' +
            '<span>数据加载中</span>';

        $dialogContainer.innerHTML = loadinghtml;
        $body.appendChild($dialogContainer);
    }

    u.closeloadingDialog = function () {
        var $cotainer = $api.dom('.loading_dialog');
        var $backdrop = $api.dom('.dialogbackdrop');
        if ($cotainer) {
            document.body.removeChild($cotainer);
        }
        if ($backdrop) {
            document.body.removeChild($backdrop);
        }
    }

    //没有数据
    u.showNoData = function (img, title, callback) {
        var $body = $api.dom('body');
        var $dialogContainer = document.createElement('div');
        $dialogContainer.className = 'no_data';
        var html = '<img src="' + img + '"/>' +
            '<p class="title">' + title + '</p>' +
            '<p class="duobao appcolor_bg">立即夺宝</p>';

        $dialogContainer.innerHTML = html;


        $body.appendChild($dialogContainer);
        $api.dom('.duobao').onclick = function () {
            callback && callback();
        }
    }

    //超时网络时显示
    u.showNoNet = function (hasNetWork) {
        //显示重新加载
        var $nonet = $api.dom('.no_network');

        if ($nonet) {
            return;
        }
        var $noNetWork = document.createElement('div');
        $noNetWork.className = 'no_network';

        var $body = $api.dom('body');
        var html = '<img src="../../image/img_net_work_error.png">' +
            '<p class="tip">网络状态差,请重新加载</p>' +
            '<div class="angin_load" tapmode="active">重新加载</div>';
        $noNetWork.innerHTML = html;

        $body.appendChild($noNetWork);
        var $angin_load = $api.dom('.angin_load');
        $angin_load.addEventListener("click", function () {
            event.stopPropagation();
            var anginType = api.connectionType;
            if (anginType == "none") {} else {

                var $body = $api.dom('body');
                var $no_network = $api.dom('.no_network');

                $nonetwork.style.display = "block";
                $body.removeChild($no_network)

                hasNetWork && hasNetWork();
            }
        })
    }



    //检测网络
    u.checkNetWork = function (hasNetWork, noNetWork) {
        //第一次检测
        var connectionType = api.connectionType;
        if (connectionType == "none") {
            var $noNetWork = document.createElement('div');
            $noNetWork.className = 'no_network';
            var $nonetwork = $api.dom('.nonetwork');
            var $body = $api.dom('body');
            var html = '<img src="../image/img_net_work_error.png">' +
                '<p class="tip">没有网络,请检查网络设置</p>' +
                '<div class="angin_load" tapmode="active">重新加载</div>';
            $noNetWork.innerHTML = html;
            $nonetwork.style.display = "none";
            $body.appendChild($noNetWork);
            var $angin_load = $api.dom('.angin_load');

            $angin_load.addEventListener("click", function () {
                event.stopPropagation();
                var anginType = api.connectionType;
                if (anginType == "none") {} else {
                    var $nonetwork = $api.dom('.nonetwork');
                    var $body = $api.dom('body');
                    var $no_network = $api.dom('.no_network');

                    $nonetwork.style.display = "block";
                    $body.removeChild($no_network)

                    hasNetWork && hasNetWork();
                }
            })
            noNetWork && noNetWork();
        } else {
            hasNetWork && hasNetWork();
        }


    }

    //判断是否为android上架状态
    u.isAndroid = function () {
        var Ashangjia = $api.getStorage('Ashangjia');
        var sysType = api.systemType;
        if (Ashangjia == 1 && sysType == 'android') {
            return true;
        }
        return false;
    }


    //noBg要不要白色背景
    u.load = function (noBg) {
        if (noBg) {
            $api.addCls($api.dom('html'), 'load')
            $api.addCls($api.dom('html'), 'no-bg')
        } else {
            $api.addCls($api.dom('html'), 'load')
        };
    };

    u.close_load = function () {
        $api.removeCls($api.dom('html'), 'load');
        $api.removeCls($api.dom('html'), 'no-bg');
    }
    u.openBrowser = function (array, index) {
        for (var i in array) {
            array[i] = Imageurl + array[i];
        }
        var imageBrowser = api.require('imageBrowser');
        imageBrowser.openImages({
            imageUrls: array,
            activeIndex: index,
            showList: false,
            tapClose: true
        });

    }
    u.each = function (arr, call) {
        for (var i = 0; i < arr.length; i++) {
            call && call.call(arr[i], i, arr[i]);
        }
    }
    var loading_id = 0;
    u.loadding = function (name, type) {
        var UILoading = api.require('UILoading');

        if (type == 0) {
            UILoading.keyFrame({
                rect: {
                    w: api.winWidth,
                    h: api.winHeight
                },
                styles: {
                    bg: 'rgba(0,0,0,0.3)',

                    interval: 50,
                    frame: {
                        w: 100,
                        h: 100
                    }
                },
                size: 30,
                fixed: true,
                fixedOn: name,


            }, function (ret) {
                loading_id = ret.id;

            });
        } else if (type == 1) {

            UILoading.keyFrame({
                rect: {
                    w: api.winWidth,
                    h: api.winHeight
                },
                styles: {
                    bg: 'rgba(255,255,255,1)',

                    interval: 50,
                    frame: {
                        w: 100,
                        h: 100
                    }
                },
                size: 30,
                fixed: true,
                fixedOn: name,


            }, function (ret) {
                loading_id = ret.id;

            });
        }
    }

       u.closeloadding = function(){
//     	var UILoading = api.require('UILoading');
       	$api.removeCls($api.dom('html'), 'htmlWeiLei');
//     	var $backdrop = $api.dom('.dialogbackdrop');
//     	UILoading.closeKeyFrame({
//     	    id: loading_id
//     	});
       }


    u.send = function (name, data) {
        api.sendEvent({
            name: name,
            extra: data
        });
    }

    u.noDate = function () { //无数据返回
        $api.append($api.dom('body'), '<div id="body"><div class="null"><img src="../../image/null.png" alt="" /><p>没有数据哦</p></div></div>');
        $api.byId('body').style.display = 'block';
    }
    u.closeNoDate = function () {
        $api.append($api.dom('body'), '<div id="body"><div class="null"><img src="../../image/null.png" alt="" /><p>没有数据哦</p></div></div>');
        $api.byId('body').style.display = 'none';
    }

    u.setBounces = function (isHas) {
        if (isHas) {
            api.setFrameAttr({
                name: api.frameName,
                bounces: false
            });
        } else {
            api.setFrameAttr({
                name: api.frameName,
                bounces: true
            });
        }
    }

    window.$api = u;

})(window);



function network_error() {
    $api.dom('body').innerHTML = '<p class="network_error">网络错误</p>'
}
