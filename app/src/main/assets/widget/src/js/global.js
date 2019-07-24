'use strict';

/**
 * Created by HJH on 2018/4/9.
 */
var gRem = { max: 750, min: 350, px: 100 };
var gApi = {
    host: '?',
    get rankList() {
        return this.host + '/?';
    }
};
function GetValueByLocation() {
    var l = window.location;
    l.search && function () {
        this.search = {};
        var args = l.search.split('?')[1].split('&');
        for (var i = 0; i < args.length; i++) {
            var a = args[i].split('=');
            this.search[a[0]] = a[1];
        }
    }.call(this);
    l.pathname && function () {
        this.pathname = l.pathname.split('/');
    }.call(this);
};
$(window).on('resize', function () {
    var width = $(this).width();
    if (width < gRem.min) {
        width = gRem.min;
    } else if (width > gRem.max) {
        width = gRem.max;
    }
    $('html').css('font-size', gRem.px * width / gRem.max + 'px');
}).trigger('resize');
$(function ($) {});


//# sourceMappingURL=global.js.map
