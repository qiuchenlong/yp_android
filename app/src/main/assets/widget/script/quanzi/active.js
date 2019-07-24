
var app = angular.module('myApp',[]);
var index;
var baoType;
app.controller('activeList',['$scope',function($scope){
	$scope.listData = [];
	$scope.imgurl = Imageurl;
	
	$scope.goBaoMing = function(activity_id){
		if(index == 1){
			api.openWin({
		        name: 'bao_ming_lie_biao_win',
		        url: 'bao_ming_lie_biao_win.html',
		        pageParam:{
		        	type:activity_id
		        }
	        });
		}
	}
	
	EventT.on('apiready',function(type){
		index = type;
		getData(0);
		$api.up(function(page,callback){
            getData(page,function(ret){
	           callback&&callback(ret);
	        })
	    })
	    
	    $api.pull(function(callback){
	        getData(0,function(){
	            callback&&callback();
	        })
	    })
	})
	
	function getData(page,callback){
		$api.loadding(name,0);
		$api.post(phpurl+'Activity/getMyActivity',{
			values:{
				user_id:userid,
				type:index,
				page:page
			}
		},function(ret){
			if(ret.code == 200){
				if(ret.result.length > 0){
					if(page == 0){
						$scope.listData = [];
					}
					$scope.listData = $scope.listData.concat(ret.result);
					$scope.$apply();
					$api.closeNoDate();
				}else if(ret.result.length <= 0 && page == 0){
					$api.noDate();
				}
				$api.closeloadding();
			}else{
				$api.closeloadding();
			}
			callback&&callback(ret);
		})
	}
}])

//报名列表
app.controller("enrollData",["$scope",function($scope){
	$scope.enrollList = [];
	$scope.imgurl = Imageurl;
	
	
	$scope.enrolls = function(id,type,e){
		$api.loadding('bao_ming_lie_biao0',0);
		$api.post(phpurl+'Activity/ShenHe',{
			values:{
				signup_id:id,
				type:type
			}
		},function(ret){
			if(ret.code == 200){
				api.toast({
	                msg:'操作成功'
                });
                if(type == 1){
                	$(e.target).css('display','none');
                }
				if(type == 2){
					$(e.target).css('display','none');
					$(e.target).siblings().css('display','none');
				}
                $api.closeloadding();
			}
		})
	}
	
	EventT.on('apiready',function(types){
		baoType = types;
		getData(0);
		$api.up(function(page,callback){
            getData(page,function(ret){
	           callback&&callback(ret);
	        })
	    });
	    $api.pull(function(callback){
	        getData(0,function(){
	            callback&&callback();
	        })
	    })
	})
	
	
	function getData(page,callback){
		$api.loadding(name,0);
		$api.post(phpurl+'Activity/getBaoList',{
			values:{
				user_id:userid,
				activity_id:active_id,
				type:baoType,
				page:page
			}
		},function(ret){
			if(ret.code == 200){
				if(ret.result.length > 0){
					if(page == 0){
						$scope.enrollList = [];
					}
					$scope.enrollList = $scope.enrollList.concat(ret.result);
					$scope.$apply();
					$api.closeNoDate();
				}else if(ret.result.length <= 0 && page == 0){
					$api.noDate();
				}
				$api.closeloadding();
			}else{
				$api.closeloadding();
			}
			callback&&callback(ret);
		})
	}
}])


//frame2

//手势监控指令
"use strict";
app
.directive("ngTouchstart", function () {
    return {
        controller: ["$scope", "$element", function ($scope, $element) {

            $element.bind("touchstart", onTouchStart);
            function onTouchStart(event) {
                var method = $element.attr("ng-touchstart");
                $scope.$apply(method);
            }

        }]
    }
})
app.controller("recommendedActivities",["$scope",function($scope){
	$scope.recommendedList = [];//活动推荐
	$scope.HotTopic = [];//热门话题
	$scope.selectDynamic = [];//精选动态
	$scope.lunBo = [];//轮播图
	
	$scope.imgurl = Imageurl;
	$scope.page = 0;
	$scope.page1 = 0;
	$scope.goDetail = function(id){
		openW({
			frm_url :  'frame2/huo_dong_xiang_qing.html',
			title : '活动详情',
			data : {
				r_txt:'<span class="iconfont icon-gengduo" onclick="sheZhi()">',
				activeId:id
			}
		})
	}
	
	
	$scope.openAdContent = function(content){
		openW({
			frm_url :  'frame2/guang_gao_xiang_qing.html',
			title : '广告详情',
			data : {
				adContent:content
			}
		})
	}
	
	$scope.goTopic = function(topicid){
	
		openW({
			frm_url : 'frame2/hua_ti_xiang_qing.html',
			title : '话题详情',
			data : {
				is_win:false,
				topic_id:topicid
			}
		})
	}
	
	$scope.goDynamic = function(dynamicid){
		openW({
			frm_url : 'frame2/dong_tai_xiang_qing.html',
			title : '动态详情',
			data : {
				dynamic_id:dynamicid
			}
		})
	}
	
	$scope.zan = function(dynamicid,index){
		$api.loadding('frame2',2);
		$api.post(phpurl+'CircleTalk/addLike',{
			values:{
				user_id:userid,
				circletalk_id:dynamicid
			}
		},function(ret){
			if(ret.code == 200){
				api.toast({
	                msg:'点赞成功'
                });
                $scope.selectDynamic[index].isdan = 1;
                $scope.selectDynamic[index].likenum = parseInt($scope.selectDynamic[index].likenum)+1;
                $scope.$apply();
                $api.closeloadding();
			}else{
				$api.closeloadding();
			}
		});
		event.stopPropagation();
	}
	
	$scope.zan1 = function(){
		api.toast({
            msg:'不能重复点赞哦'
        });
        event.stopPropagation();
	}
	
	$scope.attentions = function(id,index){
	  	  if(!userid){
		    api.toast({
                msg:'请登录谢谢'
            });
			        return false;
			        }
		$api.loadding('frame2',2);
		if(userid == id){
			api.toast({
                msg:'不能关注自己'
            });
            $api.closeloadding();
            return false;
		}
		$api.post(phpurl+'Activity/addFriend',{
			values:{
				user_id:userid,
				touserid:id 
			}
		},function(ret){
			if(ret.code == 200){
				api.toast({
                    msg:'关注成功'
                });
                $scope.selectDynamic[index].guan = 1;
                $scope.$apply();
                $api.closeloadding();
			}else if ((+ret.code) === 201 ){
			 	$scope.selectDynamic[index].guan = 0;
                $scope.$apply();
				$api.closeloadding();
			} else {
				$api.closeloadding();
			}
		});
		
		event.stopPropagation();
	}
	
	$scope.goGoodDetal = function(id){
		$api.go_goodsDes(id);
	}
	
	EventT.on('apiready',function(){
		getLunBo();
		getData2(0);
		if(showindex == 0){
//    		getData2(0);//精选动态
    		$api.up(function(page,callback){
    			$scope.page = page;
        		getData2(page,function(ret){
		           callback&&callback(ret);
		        })
		    })
    	}
		api.addEventListener({
	        name:'loadmore'
        },function(ret,err){
        	if(showindex == 2){
        		getData(0);//活动推荐
        		$api.up(function(page,callback){
	        		getData(page,function(ret){
			           callback&&callback(ret);
			        })
			    })
        	}
        	if(showindex == 1){
        		getData1(0);//热门话题
        		$api.up(function(page,callback){
	        		getData1(page,function(ret){
			           callback&&callback(ret);
			        })
			    })
        	}
	        if(showindex == 0){
        		getData2(0);//精选动态
        		$api.up(function(page,callback){
        			$scope.page = page;
	        		getData2(page,function(ret){
			           callback&&callback(ret);
			        })
			    })
        	}
        });
        
        api.addEventListener({
	        name:'sheQuChange'
        },function(ret,err){
        	getData(0);
        	getData1(0);
        	getData2(0);
        });
	})
	
	function getLunBo(){
		$api.post(phpurl+'Index/getSheLun',function(ret){
			if(ret.code == 200 && ret.result.length>0){
				$scope.lunBo = ret.result;
				$scope.$apply();
				var mySwiper = new Swiper('#swiper1', {
					autoplay: 5000,//可选选项，自动滑动
					pagination: '.swiper-pagination',
					slidesPerView: 1,
					paginationClickable: true,
					spaceBetween: 0,
//					loop: true
				})
			}
		})
	}
	
	function getData(page,callback){
		$api.loadding('frame2',0);
		$api.post(phpurl+'Activity/getHotActivity',{
			values:{
				page:page,
				
			}
		},function(ret){
			
			if(ret.code == 200){
				if(ret.result.length > 0){
					if(page == 0){
						$scope.recommendedList = [];
					}
					$scope.recommendedList = $scope.recommendedList.concat(ret.result);
					$scope.$apply();
					api.parseTapmode();
//					$api.closeNoDate();
//					setTimeout(function(){
//						$scope.img_hs = (api.winWidth-12)*0.3333;
//						$('.huo_dong_lie_biao .sumbimages'+$scope.page).jqthumb({
//							width: $scope.img_hs,
//							height: $scope.img_hs,
//							after: function(imgObj){imgObj.css('opacity', 0).animate({opacity: 1},500)}
//						});
//					},1500)
					
				}else if(ret.result.length <= 0 && page == 0){
//					$api.noDate();
				}
				$api.closeloadding();
			}else{
				$api.closeloadding();
			}
			
			callback&&callback(ret);
		})
	}
	
	function getData1(page,callback){
		$api.loadding('frame2',0);
		$api.post(phpurl+'Topic/getHotTopic',{
			values:{
				page:page
			}
		},function(ret){
			if(ret.code == 200){
				if(ret.result.length > 0){
					if(page == 0){
						$scope.HotTopic = [];
					}
					
					
					$scope.HotTopic = $scope.HotTopic.concat(ret.result);
					$scope.$apply();
//					$api.closeNoDate();
					$(".hua_ti_img").lazyload({
					    effect : "fadeIn"
				  	});
				  	api.parseTapmode();
//					changeImageSize($api.domAll('.hua_ti_img'));
				}else if(ret.result.length <= 0 && page == 0){
//					$api.noDate();
				}
				$api.closeloadding();
			}else{
				$api.closeloadding();
			}
			callback&&callback(ret);
		})
	}
	
	
	
	function getData2(page,callback){
		$api.loadding('frame2',0);
		var site = $api.getStorage('site')||{};
		var lon = site.lon;
		var lat = site.lat;
		$api.post(phpurl+'CircleTalk/getHotTalk',{
			values:{
				page:page,
				lon:lon,
				lat:lat,
				user_id:userid
			}
		},function(ret){
			
			if(ret.code == 200){
				if(ret.result.length > 0){
					if(page == 0){
						$scope.selectDynamic = [];
					}
					
					for(var i=0;i<ret.result.length;i++){
					
						if(ret.result[i].sumbimages == ''){
							ret.result[i].sumbimages = [];
						}else{
							ret.result[i].sumbimages = ret.result[i].sumbimages.split(',');
						}
						ret.result[i].page = page;
					}
					
					$scope.selectDynamic = $scope.selectDynamic.concat(ret.result);
					$scope.$apply();
					
					
					api.parseTapmode();
					setTimeout(function(){
						$scope.img_h = (api.winWidth-12)*0.32;

						$('.sumbimages'+$scope.page).jqthumb({
							width: $scope.img_h,
							height: $scope.img_h,
							after: function(imgObj){
								imgObj.css('opacity', 0).animate({
									opacity: 1
								},500);
							}
						});

					},100)
					
					
//					$api.closeNoDate();
				}else if(ret.result.length <= 0 && page == 0){
//					$api.noDate();
				}
				$api.closeloadding();
			}else{
				$api.closeloadding();
			}
			callback&&callback(ret);
		})
	}
}])

