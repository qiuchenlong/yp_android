var footerJson = [];
var maincolor;
var foot_tx = $api.getStorage('footer_tx');
var firstHeader = $api.byId('firstHeader');
var secHeader = $api.byId('secHeader');
var thirdHeader = $api.byId('thridHeader');
var foreHeader = $api.byId('foreHeader');
var firstHeaderOffset;
//获取第一个头部的高度及距离顶部的高度[注意：子元素使用了fixed定位]
var firstH = $('#firstHeader .breadcrumbs').height();
var firstT = $('#firstHeader .breadcrumbs').offset().top;
var firstHeadHeight = firstH + firstT;
var main = $api.byId('main');
var mainPos = $api.offset(main);
var footer = $api.byId('footer');
var footerPos = $api.offset(footer);
var gFrameIndex;
// 随意切换按钮
function randomSwitchBtn(name, index) {
    var lis = $api.domAll('.bottom_btn');
    var curLi = lis[index];
    for (var i = 0; i < lis.length; i++) {
        var thisLi = lis[i];
        var nowFooter = footerJson[i];
        if (thisLi === curLi) {
            thisLi.style.backgroundImage = 'url(' + footerJson[index]['active'] + ')';
            thisLi.style.color = '#fd7656';
            $api.addCls(thisLi, 'activebtn');
            continue;
        } else {
            if ($api.hasCls(thisLi, 'activebtn')) {
                thisLi.style.backgroundImage = 'url(' + footerJson[i]['noactive'] + ')';
                thisLi.style.color = '#999999';
                $api.removeCls(thisLi, 'activebtn');
            }
        }
    }
    var headlis = $api.domAll('.titlebar');
    var headcurLi = headlis[index];
    for (var i = 0; i < headlis.length; i++) {
        var thisLi = headlis[i];
        if (thisLi == headcurLi) {
            $api.addCls(thisLi, 'activebar');
            continue;
        } else {
            if ($api.hasCls(thisLi, 'activebar')) {
                $api.removeCls(thisLi, 'activebar');
            }
        }
    }
}
// 隐藏所有的一级frame
function hideAllFrame() {
    api.setFrameAttr({
        name   : 'frame0',
        hidden : true,
    });
    api.setFrameAttr({
        name   : 'frame1',
        hidden : true,
    });
    api.setFrameAttr({
        name   : 'frame2',
        hidden : true,
    });
    api.setFrameAttr({
        name   : 'frame3',
        hidden : true,
    });
}
//打开frame
function openframeinstance(frame, marginTop, isBounce, reload) {
    var $main = $api.byId('main');
    if (frame == 'frame0') {
        // var MH;
        funIniGroup();
        // if (sysType == 'ios') {
        //     MH = api.frameHeight - 52 - 20;
        //     $main.style.height = MH + 'px';
        // api.openFrame({
        //     name: frame,
        //     url: './' + frame + '.html',
        //     rect: {
        //         x: 0,
        //         y: firstHeadHeight,
        //         w: 'auto',
        //         h: api.frameHeight - footerPos.h - 20
        //     },
        //     reload: reload,
        //     bounces: isBounce,
        //     vScrollBarEnabled: false,
        //     hScrollBarEnabled: false,
        //     delay: 200
        // });
        // } else {
        //     MH = window.innerHeight - 52 - 25;
        //     $main.style.height = MH + 'px';
        // api.openFrame({
        //     name: frame,
        //     url: './' + frame + '.html',
        //     rect: {
        //         x: 0,
        //         y: firstHeadHeight,
        //         w: 'auto',
        //         h: api.frameHeight - footerPos.h - 110
        //     },
        //     reload: reload,
        //     bounces: isBounce,
        //     vScrollBarEnabled: false,
        //     hScrollBarEnabled: false,
        //     delay: 200
        // });
        // }
    } else if (frame == 'frame1') {
        if (sysType == 'ios') {
            api.openFrame({
                name              : frame,
                url               : './' + frame + '.html',
                rect              : {
                    x : 0,
                    y : marginTop + 0,
                    w : 'auto',
                    h : api.winHeight - marginTop - footerPos.h,
                },
                reload            : reload,
                bounces           : isBounce,
                vScrollBarEnabled : false,
                hScrollBarEnabled : false,
                delay             : 200,
            });
            var MH = window.innerHeight - 98 - 20;
            $main.style.height = MH + 'px';
        } else {
            api.openFrame({
                name              : frame,
                url               : './' + frame + '.html',
                rect              : {
                    x : 0,
                    y : marginTop,
                    w : 'auto',
                    h : api.winHeight - marginTop - footerPos.h,
                },
                reload            : reload,
                bounces           : isBounce,
                vScrollBarEnabled : false,
                hScrollBarEnabled : false,
                delay             : 200,
            });
            var MH = window.innerHeight - 98 - 25;
            $main.style.height = MH + 'px';
        }
    } else if (frame == 'frame2') {
        funShuChengGroup();
    } else {
        var MH;
        if (sysType == 'ios') {
            MH = api.frameHeight - 52 - 20;
            $main.style.height = MH + 'px';
            api.openFrame({
                name              : frame,
                url               : './' + frame + '.html',
                rect              : {
                    x : 0,
                    y : 0,
                    w : 'auto',
                    h : api.frameHeight - footerPos.h - 0,
                },
                reload            : reload,
                bounces           : isBounce,
                vScrollBarEnabled : false,
                hScrollBarEnabled : false,
                delay             : 200,
            });
        } else {
            MH = window.innerHeight - 52 - 25;
            $main.style.height = MH + 'px';
            api.openFrame({
                name              : frame,
                url               : './' + frame + '.html',
                rect              : {
                    x : 0,
                    y : 0,
                    w : 'auto',
                    h : api.frameHeight - footerPos.h - 0,
                },
                reload            : reload,
                bounces           : isBounce,
                vScrollBarEnabled : false,
                hScrollBarEnabled : false,
                delay             : 200,
            });
        }
    }
}
// ===================================
// 响应底部按钮的切换frame
// ===================================
function switchframe(type, _index) {
    // console.log('api.winHeight: ' + api.winHeight);
    // console.log('footerPos.h: ' + footerPos.h);
    if (gFrameIndex == 0) {
    }
    // console.log('_index：'+_index);
    // console.log('gFrameIndex：'+gFrameIndex);
    var userid = $api.getStorage('userid');
    if (_index == gFrameIndex) {
        return;
    } else {
        // api.closeFrame({
        //     name: 'frame' + gFrameIndex
        // })
        gFrameIndex = _index;
    }
    switch (type) {
        case 'first_frame':
            randomSwitchBtn('frame0', 0);
            hideAllFrame();
            openframeinstance('frame0', 0, false, false);
            break;
        case 'second_frame':
            $api.send('shua_shujia');
            randomSwitchBtn('frame1', 1);
            hideAllFrame();
            openframeinstance('frame1', 0, false, false);
            break;
        case 'third_frame':
            randomSwitchBtn('frame2', 2);
            $api.send('mian_fei', {
                hao : 1,
            });
            hideAllFrame();
            openframeinstance('frame2', firstHeaderOffset.h, false, false);
            break;
        case 'fore_frame':
            api.closeFrameGroup({
                name : 'frame0_Group'
            });
            api.closeFrameGroup({
                name : 'frame2_Group'
            });
            randomSwitchBtn('frame3', 3);
            hideAllFrame();
            openframeinstance('frame3', firstHeaderOffset.h, false, false);
            break;
        default:
            break;
    }
}
//初始化颜色
function styleInit() {
    var noactiveArr = $api.getStorage('noactiveimage');
    var activeArr = $api.getStorage('activeimage');
    var titleArr = $api.getStorage('footertitle');
    for (var i = 0; i < noactiveArr.length; i++) {
        var newObject = {
            noactive : noactiveArr[i],
            active   : activeArr[i],
            title    : titleArr[i],
        };
        footerJson.push(newObject);
    }
    var maincolorDom = document.querySelectorAll('.main_tx');
    var mainbgDom = document.querySelectorAll('.main_bg');
    var switchDom = document.querySelectorAll('.bottom_btn');
    var tx_arr = toArray(maincolorDom);
    var bg_arr = toArray(mainbgDom);
    var sw_arr = toArray(switchDom);
    maincolor = $api.getStorage('appcolor');
    for (var i = 0; i < tx_arr.length; i++) {
        tx_arr[i].style.color = maincolor;
    }
    for (var i = 0; i < bg_arr.length; i++) {
        bg_arr[i].style.background = maincolor;
    }
    for (var i = 0; i < sw_arr.length; i++) {
        sw_arr[i].style.color = foot_tx;
    }
    sw_arr.forEach(function(element, index) {
        if ($api.hasCls(element, 'active')) {
            element.style.backgroundImage = 'url(' + footerJson[index]['active'] + ')';
            element.innerText = footerJson[index]['title'];
        } else {
            element.innerText = footerJson[index]['title'];
            element.style.backgroundImage = 'url(' + footerJson[index]['noactive'] + ')';
        }
    });
    init();
}
var sysType;
function init() {
    //$api.fixStatusBar( $api.dom('header') );
    // 设置ios7的标题栏字体变亮，全局用一个就行了
    var SBColor = $api.getStorage('SBColor');
    sysType = api.systemType;
    api.setStatusBarStyle({
        style : 'light', // 'rgb(0,0,0)' || '#fff'
    });
    $api.fixStatusBar(firstHeader);
    $api.fixStatusBar(secHeader);
    $api.fixStatusBar(thirdHeader);
    $api.fixStatusBar(foreHeader);
    firstHeaderOffset = $api.offset(firstHeader);
    firstHeaderOffset.h = firstHeaderOffset.h + 46;
    var userid = $api.getStorage('userid');
    var is_close = false;
    function closeApp() {
        if (!is_close) {
            api.toast({
                msg : '再按一次退出程序',
            });
            is_close = true;
            setTimeout(function() {
                is_close = false;
            }, 2000);
        } else {
            api.closeWidget({
                silent : true,
            });
        }
    }
    api.addEventListener({
        name : 'keyback',
    }, function(ret, err) {
        closeApp();
    });
    gFrameIndex = 0;
    // randomSwitchBtn('first_frame', 0);
    // api.openFrame({
    //     name: 'frame0',
    //     url: './frame0.html',
    //     rect: {
    //         x: 0,
    //         y: 25,
    //         w: 'auto',
    //         h: api.winHeight - footerPos.h - 25
    //     },
    //     bounces: false,
    // });
}
apiready = function() {
    var titleArr           = ['精选', '书架', '书城', '发现'],
        noactiveimageArray = ['../image/index_images/jingxuan.png', '../image/index_images/shujia.png', '../image/index_images/mianfei.png', '../image/index_images/fenlei.png'],
        activeimageArray   = [
            '../image/index_images/jingxuan2.png',
            '../image/index_images/shujia2.png',
            '../image/index_images/mianfei2.png',
            '../image/index_images/fenlei2.png',
        ];
    $api.setStorage('noactiveimage', noactiveimageArray);
    $api.setStorage('activeimage', activeimageArray);
    $api.setStorage('footertitle', titleArr);
    styleInit();
    funIniGroup();
    // init();
    //  inits();//左拖动
    //  function inits() {
    //
    //        api.openSlidLayout({
    //          type: 'left',
    //          fixedPane: {
    //              name: 'wo',
    //              url: 'wo.html'
    //          },
    //          slidPane: {
    //              name: 'homeSlid',
    //              url: 'homeSlid.html'
    //          },
    //          slidPaneStyle: {
    //              leftEdge: window.innerWidth * 0.2
    //          }
    //      }, function(ret, err) {
    //
    //      });
    //
    //  }
    //监听进货单状态的改变，  和信息点击回调，
    function jian_ting_ding_dan() {
        var ajpush = api.require('ajpush');
        ajpush.init(function(ret) {
            if (ret && ret.status) {
            }
        });
        var param = {
            alias : 'myalias',
            tags  : [], // 这个是监听的标签
        };
        ajpush.bindAliasAndTags(param, function(ret, err) {
            var statusCode = ret.statusCode;
        });
        ajpush.setListener(function(ret) { //推送事件回调 只要在app 推送就可以收到这个事件
        });
        var systemType = api.systemType;
        if (systemType == 'ios') {
            api.addEventListener({ //苹果推送点击事件回调
                name : 'noticeclicked',
            }, function(ret, err) {
                if (ret && ret.value) {
                    var ajpush = ret.value;
                    var id = ajpush.id;
                    var title = ajpush.title;
                    var extra = ajpush.extras;
                    openM(extra.msg, extra.id);
                }
            });
        } else {
            api.addEventListener({
                name : 'appintent',
            }, function(ret, err) { //安卓推送点击事件回调
                if (ret && ret.appParam.ajpush) {
                    var ajpush = ret.appParam.ajpush;
                    var id = ajpush.id;
                    var title = ajpush.title;
                    var extra = ajpush.extras;
                    openM(extra.msg, extra.id);
                }
            });
        }
        ;
        function openM(title, content) {
            api.openWin({
                name      : 'win_fdfheader',
                url       : 'win_header.html',
                pageParam : {
                    frm_name : 'goodfdfs_detail',
                    frm_url  : 'frames0/mei_ri_yi_tiao_detail.html',
                    title    : title,
                    data     : {
                        id : id,
                    },
                },
            });
        }
    };
    footerBgTxColor();
    var $main = $api.byId('main');
    if (sysType == 'ios') {
        var MH = api.frameHeight - 52 - 20;
        $main.style.height = MH + 'px';
    } else {
        var MH = api.frameHeight - 52 - 25;
        $main.style.height = MH + 'px';
    }
    api.addEventListener({
        name : 'gohome',
    }, function(ret, err) {
        gohome();
    });
};
// 首页导航切换
$(function() {
    $('.nav_b').on('click', function() {
        var index = $(this).index();
        api.setFrameGroupIndex({ //设置 frame 组当前可见 frame
            name  : 'frame0_Group',
            index : index,
            // scroll: true
        });
    });
});
//首页导航绘制
function funIniGroup() {
    frames_url = ['frame0.html', 'frame0_male.html', 'frame0_publish.html', 'frame0_gratis.html'];
    var navLis = $('.nav .nav_b'),
        frames = [];
    var systemType = api.systemType;
    // console.log('文档高度：'+document.documentElement.offsetHeight);
    // console.log('窗口高度：'+window.innerHeight);
    if (systemType == 'android') {
        for (var i = 0, len = navLis.length; i < len; i++) {
            frames.push({
                name    : 'frame00' + i,
                url     : frames_url[i],
                bgColor : '#eee',
                bounces : false,
                // pageParam: {
                //     'headerH': h
                // }
            });
        }
        ;
        api.openFrameGroup({
            name          : 'frame0_Group',
            scrollEnabled : false,
            preload       : 0,
            rect          : {
                x : 0,
                y : 0,
                w : api.winWidth,
                h : api.winHeight - footerPos.h - 0,
                // marginBottom: 60
            },
            index         : 0,
            frames        : frames,
        }, function(ret, err) {});
    } else {
        for (var i = 0, len = navLis.length; i < len; i++) {
            frames.push({
                name    : 'frame00' + i,
                url     : frames_url[i],
                bgColor : '#eee',
                bounces : false,
                // pageParam: {
                //     'headerH': h
                // }
            });
        }
        ;
        api.openFrameGroup({
            name          : 'frame0_Group',
            scrollEnabled : false,
            preload       : 0,
            rect          : {
                x : 0,
                y : 0,
                w : api.winWidth,
                h : api.winHeight - footerPos.h - 0,
            },
            index         : 0,
            frames        : frames,
        }, function(ret, err) {});
    }
};
// 金币导航切换
$(function() {
    $('.nav_thrid').on('click', function() {
        var index = $(this).index();
        api.setFrameGroupIndex({ //设置 frame 组当前可见 frame
            name  : 'frame2_Group',
            index : index,
            // scroll: true
        });
    });
});
//金币导航绘制
function funShuChengGroup() {
    frames2_url = ['frame2.html', 'nan.html', 'chuban.html', 'mianfei.html'];
    var navLis  = $('.nav .nav_thrid'),
        frames2 = [];
    var systemType = api.systemType;
    // console.log('文档高度：'+document.documentElement.offsetHeight);
    // console.log('窗口高度：'+window.innerHeight);
    if (systemType == 'android') {
        for (var i = 0, len = navLis.length; i < len; i++) {
            frames2.push({
                name    : 'frame02' + i,
                url     : frames2_url[i],
                bgColor : '#eee',
                bounces : false,
                // pageParam: {
                //     'headerH': h
                // }
            });
        }
        ;
        api.openFrameGroup({
            name          : 'frame2_Group',
            scrollEnabled : false,
            preload       : 0,
            rect          : {
                x : 0,
                y : 0,
                w : api.winWidth,
                h : api.winHeight - footerPos.h - 0,
                // marginBottom: 60
            },
            index         : 0,
            frames        : frames2,
        }, function(ret, err) {});
    } else {
        for (var i = 0, len = navLis.length; i < len; i++) {
            frames2.push({
                name    : 'frame02' + i,
                url     : frames2_url[i],
                bgColor : '#eee',
                bounces : false,
                // pageParam: {
                //     'headerH': h
                // }
            });
        }
        ;
        api.openFrameGroup({
            name          : 'frame2_Group',
            scrollEnabled : false,
            preload       : 0,
            rect          : {
                x : 0,
                y : 0,
                w : api.winWidth,
                h : api.winHeight - footerPos.h - 0,
            },
            index         : 0,
            frames        : frames2,
        }, function(ret, err) {});
    }
};
function toArray(domArray) {
    var newarr = [];
    for (var i = 0; i < domArray.length; i++) {
        newarr[i] = domArray[i];
    }
    return newarr;
}
//8.18,黄庭达
//向页面添加底部背景色和字体颜色和app名字的类
function footerBgTxColor() {
    var footer_bg = $api.getStorage('footer_bg');
    var footer_tx = $api.getStorage('footer_tx');
    var appname = $api.getStorage('appname');
    var app_name = $api.byId('app_name');
    footer_Bg_Tx_Color = '.footer_Bg_Tx_Color{background:' + footer_bg + ';color:' + footer_tx + '}';
    var style = document.createElement('style');
    style.innerHTML = footer_Bg_Tx_Color;
    var hed = document.getElementsByTagName('head')[0];
    hed.appendChild(style);
}
