var footerJson = [];
var maincolor;

var foot_tx=$api.getStorage('footer_tx');
var firstHeader = $api.byId('firstHeader');
var secHeader = $api.byId('secHeader');
var thirdHeader = $api.byId('thridHeader');
var fortheader = $api.byId('fortheader');
var fiveheader = $api.byId('fiveheader');
var firstHeaderOffset;

var main = $api.byId('main');
var mainPos = $api.offset(main);

var footer = $api.byId('footer');
var footerPos = $api.offset(footer);

var gFrameIndex;


// 随意切换按钮
function randomSwitchBtn(name, index){
    var lis = $api.domAll('.bottom_btn');

    var curLi = lis[index];


    for(var i=0; i<lis.length; i++){
       var thisLi = lis[i];
       var nowFooter = footerJson[i];

       if(thisLi === curLi){
           $api.addCls(thisLi,'activebtn');
           continue;
       }else{
           if($api.hasCls(thisLi,'activebtn')){
               $api.removeCls(thisLi,'activebtn');
           }
       }
    }

    var headlis = $api.domAll('.titlebar');
    var headcurLi = headlis[index];

    for(var i=0;i<headlis.length;i++){
        var thisLi = headlis[i];

        if(thisLi ==headcurLi){
            $api.addCls(thisLi,'activebar');
            continue;
        }else{
            if($api.hasCls(thisLi, 'activebar')){
            	$api.removeCls(thisLi, 'activebar');
            }
        }
    }
}


// 隐藏所有的一级frame
function hideAllFrame(){

    api.setFrameAttr({
        name: 'frame0',
        hidden:true
    });

    api.setFrameGroupAttr({
	    name: 'frame1Group',
	    hidden:true
    });
    api.setFrameAttr({
        name: 'frame2',
        hidden:true
    });
    api.setFrameAttr({
        name: 'frame3',
        hidden:true
    });
    api.setFrameAttr({
	    name: 'frame4',
	    hidden:true
    });
}

//打开frame
function openframeinstance( frame, marginTop, isBounce,reload){
    var $main = $api.byId('main');
	if(frame=='frame0'){
	    var systemType = api.systemType;

        if(systemType=="ios"){
		    MH = window.innerHeight-footerPos.h-20;
	        $main.style.height = MH+'px';
        }else{
            MH = window.innerHeight-footerPos.h-25;
	        $main.style.height = MH+'px';
        }
        api.openFrame ({
	        name: frame,
	        url: 'html/' + frame+'.html',
	        rect:{
	            x:0,
	            y:0,
	            w:'auto',
	            h:api.frameHeight - footerPos.h
	        },
	        reload:reload,
	        bounces:isBounce,
	        vScrollBarEnabled:false,
	        hScrollBarEnabled:false,
	        delay:200
	     });
	}else if(frame == 'frame4'){
        var MH;

        var systemType = api.systemType;

        if(systemType=="ios"){

	        MH = window.innerHeight-footerPos.h-20;
	        $main.style.height = MH+'px';
	        api.openFrame ({
		        name: frame,
		        url: 'html/' + frame+'.html',
		        rect:{
		            x:0,
		            y:20,
		            w:'auto',
		            h:api.frameHeight - 20 - footerPos.h
		        },
		        reload:reload,
		        bounces:isBounce,
		        vScrollBarEnabled:false,
		        hScrollBarEnabled:false,
		        delay:200
		     });

        }else{
            MH = window.innerHeight-footerPos.h-25;
	        $main.style.height = MH+'px';
	        api.openFrame ({
		        name: frame,
		        url: 'html/' + frame+'.html',
		        rect:{
		            x:0,
		            y:25,
		            w:'auto',
		            h:api.frameHeight - 25 - footerPos.h
		        },
		        reload:reload,
		        bounces:isBounce,
		        vScrollBarEnabled:false,
		        hScrollBarEnabled:false,
		        delay:200
		     });
        }



    }else if(frame == "frame1"){

        var nameArr = ['html/frame1/fen_lei','html/frame1/pin_pai'];
        var sysType = api.systemType;

        if(sysType == 'ios'){

            var o = $api.offset($('.navbs')[0]);

		    util.openGroup('frame1Group',nameArr,66+o.h,function(ret){

			    var index = ret.index;
			    if(index == 0){
					$('.line').css('left','21%');
				}
				if(index == 1){
					$('.line').css('left','71%');
				}
			},true);

			var MH = window.innerHeight-98-o.h-20;

            $main.style.height = MH+'px';
		}else{
		    var o = $api.offset($('.navbs')[0]);

		    util.openGroup('frame1Group',nameArr,71+o.h,function(ret){
			    var index = ret.index;
			    if(index == 0){
					$('.line').css('left','21%');
				}
				if(index == 1){
					$('.line').css('left','71%');
				}
			},true);
			var MH = window.innerHeight-98-o.h-25;
            $main.style.height = MH+'px';
		}

		$('.navbs li').click(function(){
	        //$(this).addClass('active').siblings().removeClass('active');


	        var index = $(this).index();

			if(index == 0){
				$('.line').css('left','21%');
			}
			if(index == 1){
				$('.line').css('left','68%');
			}
	        api.setFrameGroupIndex({
		        name: 'frame1Group',
		        index:index,
		        scroll: true
	        });

	    })

    }else{
        var systemType = api.systemType;

        if(systemType=='ios'){
	        api.openFrame ({
		        name: frame,
		        url: 'html/' + frame+'.html',
		        rect:{
		            x:0,
		            y:marginTop,
		            w:'auto',
		            h:api.frameHeight - marginTop - footerPos.h
		        },
		        reload:reload,
		        bounces:isBounce,
		        vScrollBarEnabled:false,
		        hScrollBarEnabled:false,
		        delay:200
		    });

		    var MH = window.innerHeight-46-footerPos.h-20;
	        $main.style.height = MH+'px';
        }else{
            api.openFrame ({
		        name: frame,
		        url: 'html/' + frame+'.html',
		        rect:{
		            x:0,
		            y:marginTop,
		            w:'auto',
		            h:api.frameHeight - marginTop - footerPos.h
		        },
		        reload:reload,
		        bounces:isBounce,
		        vScrollBarEnabled:false,
		        hScrollBarEnabled:false,
		        delay:200
		    });

		    var MH = window.innerHeight-46-footerPos.h-25;
	        $main.style.height = MH+'px';
        }

    }


}

 // ===================================
// 响应底部按钮的切换frame
// ===================================
function switchframe(type, _index){
	var userid = $api.getStorage('userid');


   switch(type){
       case 'first_frame':
                randomSwitchBtn('frame0', 0);
                hideAllFrame();
                openframeinstance('frame0', firstHeaderOffset.h, false,false);

       break;
       case 'second_frame':
            randomSwitchBtn('frame1', 1);
            hideAllFrame();
            openframeinstance('frame1', firstHeaderOffset.h, false,false);

        break;
        case 'third_frame':
            randomSwitchBtn('frame2', 2);
            hideAllFrame();
            openframeinstance('frame2', firstHeaderOffset.h, false,false);

        break;
        case 'forth_frame':
        if(!userid){
				    api.openWin({
				        name: 'login',
				        url: 'html/user/login.html',
				        slidBackEnabled:false
			        });
			        return false;
            	}
            randomSwitchBtn('frame3', 3);
            hideAllFrame();
            openframeinstance('frame3', firstHeaderOffset.h, false,false);

        break;

        case 'five_frame':
          if(!userid){
				    api.openWin({
				        name: 'login',
				        url: 'html/user/login.html',
				        slidBackEnabled:false
			        });
			        return false;
            	}
            var is_shang = $api.getStorage('shang_state');
            if(is_shang == 1){
            	if($api.getStorage('userid') == 1){
            		$api.setStorage('userid', '')
				    api.openWin({
				        name: 'login',
				        url: 'html/user/login.html',
				        slidBackEnabled:false
			        });
			        return false;
            	}

            }
            randomSwitchBtn('frame4', 4);
            hideAllFrame();
            openframeinstance('frame4', 0, false,false);
        default:
        break;
   }
}

//初始化颜色
function styleInit(){
    init();
}
var sysType;
function init(){
    //$api.fixStatusBar( $api.dom('header') );
    // 设置ios7的标题栏字体变亮，全局用一个就行了
    var SBColor = $api.getStorage('SBColor');

    sysType = api.systemType;
	api.setStatusBarStyle({
        style: 'light', // 'rgb(0,0,0)' || '#fff'
    });

    $api.fixStatusBar(firstHeader);
    $api.fixStatusBar(secHeader);
    $api.fixStatusBar(thirdHeader);
    $api.fixStatusBar(fortheader);
    $api.fixStatusBar(fiveheader);
    firstHeaderOffset = $api.offset(firstHeader);
    firstHeaderOffset.h = firstHeaderOffset.h+46;

    var is_close=false;

    function closeApp(){

        if(!is_close){
           api.toast({
	           msg:'再按一次退出程序'
           });
           is_close=true;
           setTimeout(function(){
               is_close = false;
           },2000)
        }else{
           api.closeWidget({
              silent:true
           });
        }

    }


    api.addEventListener({
	    name:'keyback'
	}, function(ret, err){
	    closeApp();
	});


    gFrameIndex=0;

    randomSwitchBtn('first_frame',0);
    var sysType = api.systemType;

    api.openFrame ({
        name: 'frame0',
        url: 'html/frame0.html',
        rect:{
        x:0,
        y:0,
        w:'auto',
        h:api.winHeight -footerPos.h
        },
        bounces: false,

    });


}

apiready = function(){
	getTheme();
	changeTheme();
    init();
	var $main = $api.byId('main');
	var sysType = api.systemType;
	if(sysType == 'ios'){
       var MH = window.innerHeight-52-20;
       $main.style.height = MH+'px';
    }else{
       var MH = window.innerHeight-52-25;
       $main.style.height = MH+'px';
    }

    api.addEventListener({
	    name:'shoppingCar'
    },function(ret,err){
    	switchframe('forth_frame');
    });
    api.addEventListener({
	    name:'personalCenter'
    },function(ret,err){
    	switchframe('five_frame');
    });
    getData();
}




//拿一些固定的参数下来，
function getData(){
	$api.post(phpurl+'System/Find',function(ret){
		ret = ret|| {result:[{}]};

		$api.setStorage('System',ret);
	});
};
