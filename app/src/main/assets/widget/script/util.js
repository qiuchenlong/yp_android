(function(window){
    var util={};
    
    var _parseMD = function(o){
		return o<10?'0'+o:o;
	}
	
	var _parseDate = function(y,m,d){
		return y+'-'+_parseMD(m)+'-'+_parseMD(d);
	}
	
	var _parseDateTime = function(y,m,d,h,i,s){
		return _parseDate(y,m,d)+ ' '+ _parseMD(h)+':'+_parseMD(i)+':'+_parseMD(s);
	}
	
	util.getState = function(state){
	   
	    var returnState="";
	    switch(state){
	        case '1':
	           
	           returnState="待付款";
	           break;
	        case '2':
	           returnState="待发货";
	           break;
	        case '3':
	           returnState="待收货";
	           break;
	        case '4':
	           returnState="已完成订单";
	           break;
	           
	    }
	    
	    return returnState; 
	}
	
	util.checkLogin = function(){
	    var userid = $api.getStorage('userid');
        
        if(!userid){
            api.toast({
	            msg:'你还未登录,请先登录'
            });
            $api.openWin(
		    	"login",
		    	"../win_header", 
		    	{	
		    		frm_name:"login.html",
		    		frm_url:"user/login.html",
		    		title :"登录",
	    	});
	    	return false;
        }
        return true;
	}
	
	util.getButtonState = function(state){
	    var returnState="";
	    switch(state){
	        case '1':
	           
	           returnState="立即付款";
	           break;
	        case '2':
	           returnState="提醒发货";
	           break;
	        case '3':
	           returnState="查看物流";
	           break;
	        case '4':
	           returnState="已完成订单";
	           break;
	    }
	    
	    return returnState; 
	}
	
	util.getFaJiangState = function(state){
	    var returnState="";
	    switch(state){
	        case '0':
	           
	           returnState="确认收货地址";
	           break;
	        case '1':
	           returnState="待收货";
	           break;
	        case '4':
	           returnState="待发货";
	           break;
	        case '2':
	           returnState="等待确认收货";
	           break;
	        case '5':
	           returnState="发表晒单"
	           break;
	        case '6':
	           returnState="晒单成功"
	           break;
	    }
	    
	    return returnState; 
	}
	
	util.getEndTime = function(endtime){
	     var date = new Date(endtime);
	   
         var y =date.getFullYear();
	     var m =date.getMonth()+1;
	     var d =date.getDate();
	     var h =date.getHours();
	     var i =date.getMinutes()
	     var s =date.getSeconds()
	     return _parseDateTime(y,m,d,h,i,s);
	}
	
	util.getDay = function(){
	    var date = new Date();
	    var currentdate = date.getDay();
	    return currentdate;
	}
	
	
	util.clipImage = function(){
	    $('.clip').each(function(){
	        var load = $(this).attr('load');
	        var $parent = $(this).parent();
	        
	        var parentWidth = $parent.width();
	        $parent.css({
	           height:parentWidth
	        })
	        
	        var parentHeight = $parent.height();
	        if(!load){
	            $(this).load(function(){
	                var height = $(this).height();
	                var width = $(this).width();
	                
	                if(width>height){
	                    var left = (width/height*parentWidth-parentWidth)/2;
	                    $(this).css({
	                       height:parentWidth+'px',
	                       width:'auto',
	                       left:-left+'px'
	                    })
	                    
	                }else if(width<height){
	                    var top = (height/width*parentWidth-parentWidth)/2;
	                    $(this).css({
	                       width:parentWidth+'px',
	                       height:'auto',
	                       top:-top+'px'
	                    })
	                    
	                }else{
	                    $(this).css({
	                       width:parentWidth+'px',
	                       height:parentWidth+'px',
	                    })
	                }
	                
	                $(this).attr('load',true);
	            })
	        }
	    })
	}
	
	util.getADandOpen = function(result){
	    if(result.length>0){
	        var $swiper_wrapper = $api.dom('.swiper-wrapper');
	        var html="";
	        for(var i=0;i<result.length;i++){
	          var pic = Imageurl+result[i].pic_images;
	          html+='<div  class="swiper-slide adcls" data-hash="slide2"  ><img src='+pic+' /></div>';
	        }
	        $swiper_wrapper.innerHTML=html;
	        
	        $('.adcls').each(function(index){
	            var _this = $(this);
	            $(this).click(function(){
	                var adDt = result[index];
	                
	                var type = adDt.whether;
	                if(type == 1){
	                    api.openWin({
					       name: 'win_header',
					       url: 'win_header.html',
					       pageParam:{
				               frm_name:'goods_detaidfdlfdfd',
				               frm_url:'./guanggao/AD.html',
				               title:'广告详情',
				               data:{
				                  content:adDt.adcontent
				               }
					       }
				        });
	                }else if(type == 3){
	                    var periodid = adDt.periodsid;
	                    api.ajax({
	                        url:config.phpurl+'index.php?c=Periods&a=getPXQ&id='+periodid,
	                        method:'get'
                        },function(ret,err){
                            
                        	if(ret){
                        	   var code = ret.code;
                        	   if(code == 200){
                        	       var result = ret.result;
                        	       if(result.length>0){
                        	            api.openWin({
									       name: 'win_header',
									       url: 'win_headerDetail.html',
									       animation:{
											    type:"ripple",                //动画类型（详见动画类型常量）
											    subType:"from_right",       //动画子类型（详见动画子类型常量）
											    duration:300                //动画过渡时间，默认300毫秒
										   },
									       pageParam:{
								               frm_name:'goods_detail',
								               frm_url:'../html/frames0/goods_detail.html',
								               title:'奖品详情',
								               data:{
								                  goodsid:result[0]['fk_goodsid'],
								                  fk_number:result[0]['fk_number'],
								                  state:result[0]['state'],
								                  is_merchant_period:result[0]['is_merchant_period'],
								                  shopid:result[0]['merchat_id']
								               } 
									       }
								       });
                        	       }
                        	   }
                        	}
                        });
	                }else{
	                     var adlink = adDt.adlink;
	                     var sysType = api.systemType;
	                    
	                     if(sysType == 'ios'){
		                     api.openApp({
							    iosUrl: adlink
							 }, function(ret, err) {
							    if (ret) {
							       
							    } else {
							    }
							 });
						 }else{
						    
						    api.openApp({
							    
							    mimeType: 'text/html',
							    uri: adlink
							}, function(ret, err) {
							    if (ret) {
							        
							    } else {
							       
							    }
							});
						 }
	                     
	                }
	            })
	        })
	       
	        var mySwiper = new Swiper('.swiper-container',{
				    pagination: '.swiper-pagination',
				    loop:true,
				    grabCursor: true,
				    paginationClickable: true,
            });
	    }
	}
	/*function getMonthArray(year){
	    var dateArr = [];
	    if(year%4==0){
	       dateArr=['31','29','31','30','31','30','31','31','30','31','30','31'];
	    }else{
	       dateArr=['31','28','31','30','31','30','31','31','30','31','30','31'];
	    }
	    return dateArr;
	}
	function getDate(y,m,d,cha){
	    var arr = getMonthArray(y);
	    if(d-cha<1){
	       m=m-1;
	       
	    }else if(d-cha>1){
	       
	    }
	}*/
	
	util.getDayArray = function(){
	    var date = new Date();
	    var nowTime = date.getTime();
	    var m =date.getMonth()+1;
	    var d =date.getDate();
	    var y =date.getFullYear();
	    var dateArr=[];
	    var currentdate = date.getDay();
	    var returnArray = new Array(7);
	    if(currentdate == 0){
	        for(var i=0;i<returnArray.length;i++){
	            if(i == 6){
	               returnArray[i] = "今天";
	            }else{
			        var cha = 6-i;
		            var addTime = nowTime-cha*3600000*24;
		            var addDate = new Date(addTime);
		            var m =addDate.getMonth()+1;
		            var d =addDate.getDate();
		            if(m<10){
		                m='0'+m;
		            }
		            returnArray[i]=m+'.'+d;
	            }
            }
	        return returnArray;
	    }
	    --currentdate;
	    
	    for(var i=0;i<returnArray.length;i++){
	        if(i<currentdate){
	            var cha = currentdate-i;
	            var addTime = nowTime-cha*3600000*24;
	            var addDate = new Date(addTime);
	            var m =addDate.getMonth()+1;
	            var d =addDate.getDate();
	            if(m<10){
	                m='0'+m;
	            }
	            returnArray[i]=m+'.'+d;
	        }else if(i==currentdate){
	            returnArray[i]='今天'
	        }else if(i-currentdate == 1){
	            returnArray[i]='明天';
	        }else{
	            var cha = i-currentdate;
	            var addTime = nowTime+cha*3600000*24;
	            var addDate = new Date(addTime);
	            var m =addDate.getMonth()+1;
	            var d =addDate.getDate();
	            if(m<10){
	                m='0'+m;
	            }
	            returnArray[i]=m+'.'+d;
	        }
	    }
	    return returnArray;
	}
    
    util.openGroup = function(groupname,nameArray,offsetHeight,callback,haft,paramA){
	    var frames = [];
	    for(var i=0;i<nameArray.length;i++){
	           if(paramA){
		           frames.push({ 
		                name: nameArray[i], 
		                url: nameArray[i]+'.html', 
		                bgColor : 'rgba(0,0,0,.2)',
		                pageParam:{
		                   type:paramA[i]
		                }
		           })
	           }else{
	               frames.push({ 
		                name: nameArray[i], 
		                url: nameArray[i]+'.html', 
		                bgColor : 'rgba(0,0,0,.2)',
		           })
	           }
	    }
	    
	    
	    if(haft){
		    api.openFrameGroup({
		        name: groupname,
		        scrollEnabled: true,
		        rect: {
		            x: 0, 
		            y: offsetHeight,
		            w: 'auto', 
		            h: api.winHeight-offsetHeight-52
		        },
		        index: 0,
		        frames: frames
		    }, function (ret, err) {
		        callback&&callback(ret)
		    });
	    }else{
	        api.openFrameGroup({
		        name: groupname,
		        scrollEnabled: true,
		        rect: {
		            x: 0, 
		            y: offsetHeight,
		            w: 'auto', 
		            h: api.winHeight-offsetHeight
		        },
		        index: 0,
		        frames: frames
		    }, function (ret, err) {
		        callback&&callback(ret)
		    });
	    }
	}
	
	util.get_ding_dan_hao = function(){
		var date = new Date();
		
		var Y = date.getFullYear();
		var M = date.getMonth()+1;
		M = M<10?'0'+M:M;
		var D = date.getDate();
		D = M<10?'0'+D:D;
		var h = date.getHours();
		h = h<10?'0'+h:h;
		var m = date.getMinutes();
		m = m<10?'0'+m:m;
		var s = date.getSeconds();
		 s =  s<10?'0'+ s: s;
		
		var r =Math.floor( Math.random(0,1)*1000)-1;
		return ''+Y+M+D+h+m+s+r;
	}
	
	util.get_name = function() {
	    var iCodeRd = "", nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	    var chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	
	    for (var i = 0; i < 4; i++) {
	        var id = Math.ceil(Math.random() * (chars.length - 1));
	        iCodeRd += chars[id];
	    }
	    
	    for (var i = 0; i < 4; i++) {
	        var id = Math.ceil(Math.random() * (nums.length - 1));
	        iCodeRd += nums[id];
	    }
	
	    return iCodeRd;
	}
	
	util.checkMobile = function(Mobile){ 
	    if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(Mobile))){ 
	        return false; 
	    }else{
	        return true;
	    } 
	} 
	
	util.showComfirm = function(msg,callback){
	     api.confirm({
			title:'提示消息',
			msg:msg
	     },function(ret,err){
	        if(ret.buttonIndex == 2){
	           callback&&callback();
	        }
	     })
	}
	
	
	util.showComfirmM = function(inputs,dcallback,scallback){
	    var $container = document.createElement('div');
	    var $backdrop = document.createElement('div');
	    
	    $backdrop.className = "mui-popup-backdrop";
	    var $body = $api.dom('body');
	    $container.className = "mui-popup";
	    var comfirmHtml = '<div class="mui-popup-inner">'+
	                             '<div class="mui-popup-title">确认支付宝</div>'+
	                             '<div class="mui-popup-text">请务必填写正确</div>'+
	                             '<div class="mui-popup-input">';
	    for(var i=0;i<inputs.length;i++){
	       comfirmHtml+='<input placeholder="'+inputs[i].placeholder+'" type="text" id="'+inputs[i].id+'"/>'
	    }
	    comfirmHtml+='</div></div>';
	    comfirmHtml+='<div class="mui-popup-buttons">'+
	                     '<span class="mui-popup-button" id="cancel">取消</span>'+
	                     '<span class="mui-popup-button mui-popup-button-bold" id="queding">确定</span></div>';
	    
	    
	   
	    $container.innerHTML = comfirmHtml;
	    $body.appendChild($container);
	    $body.appendChild($backdrop);
	    
	    var $cancel = $api.byId('cancel');
	    var $queding = $api.byId('queding');
	    $cancel.onclick = function(){
	        var $mui_popup = $api.dom('.mui-popup');
	        
			    var $mui_backdrop = $api.dom('.mui-popup-backdrop');
			    $body.removeChild($mui_popup);
			    $body.removeChild($mui_backdrop);
	    }
	    
	    $queding.onclick = function(){
	        scallback&&scallback(function(){
	           
	           var $mui_popup = $api.dom('.mui-popup');
	        
			    var $mui_backdrop = $api.dom('.mui-popup-backdrop');
			    $body.removeChild($mui_popup);
			    $body.removeChild($mui_backdrop);
	        });
	    }
	    setTimeout(function(){
	        var $mui_popup = $api.dom('.mui-popup');
	        
		    var $mui_backdrop = $api.dom('.mui-popup-backdrop');
		    $api.addCls($mui_popup, 'mui-popup-in');
		    $api.addCls($mui_backdrop, 'mui-active');
	    },200)
	    
	    
	   
	}
	
	util.getIPCon = function(callback){
	    api.ajax({
	        url:'http://www.fondfell.com/superDao/69/index.php?c=IP&a=getIP',
	        method:'get'
        },function(ret,err){
        	var code = ret.error;
        	if(code == 0){
        	    var ip = ret.ip;
        	   
        	    $.ajax({
        	       url:'http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&ip='+ip+'&coor=bd09ll',
        	      
        	       method:'get'
        	    }).done(function(data){
        	       var address_detail = data.content.address_detail;
        	       address_detail['ip'] = ip;
        	       callback&&callback(address_detail);
        	    })
        	   
        	}
        });
	}
	
	util.longAjax = function(url,time,callback){
	     url+='&time='+time;
	   
	     (function longPolling() {
              api.ajax({
	              url:url,
	              method:'get',
	              timeout:80
              },function(ret,err){
              	  if(ret){
              	     var code = ret.code;
              	     if(code == 200){
              	        var result = ret.result;
              	        callback&&callback(result);
              	        longPolling();
              	     }else{
              	        longPolling();
              	     }
              	  }else{
              	     longPolling();
              	  }
              });    
         })();
	}
	
	
	
	
	window.util = util;

})(window)