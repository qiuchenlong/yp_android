
var app = angular.module('myApp',[]);
app.controller('heardYouLikeController',['$scope',function($scope){
	$scope.youLikeList = [];//猜你喜欢
	$scope.collectionList = [];//我的收藏
	$scope.footprintList = [];//我的足迹
	$scope.imgurl = Imageurl;
	
	$scope.goGoodsDel = function(goodsid){

		$api.go_goodsDes(goodsid);
	}
	
	$scope.go_activityDes = function(activeid){
		openW({
			frm_url :  'frame2/huo_dong_xiang_qing.html',
			title : '活动详情',
			data : {
				r_txt:'<span class="iconfont icon-gengduo" onclick="sheZhi()">',
				activeId:activeid
			}
		})
	}
	
	$scope.delCollection = function(collectionid){//删除收藏
		$api.loadding('wo_de_shou_cang',0);

		$api.post(phpurl+'Goods/DelCollect',{
			values:{
				collect_id:collectionid
			}
		},function(ret,err){

			if(ret.code == 200){
				api.toast({
	                msg:'删除成功'
                });
                myCollection();
                $api.closeloadding();
			}else{
				$api.closeloadding();
			}
		})
		event.stopPropagation();
	}
	$scope.delFootprint = function(ids){
		$api.post(phpurl+'Activity/delBro',{
			values:{
				browse_id:ids,
//				user_id:userid
			}
		},function(ret){
			if(ret.code == 200){
				api.toast({
	                msg:'删除成功'
                });
                myFootprint();
			}
		})
		event.stopPropagation();
	}
	
	EventT.on('apiready',function(){
		myFootprint();
		getData(0);
		myCollection();
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
		$api.loadding('frame3',0);
		$api.post(phpurl+'Goods/getLike',{
			values:{
				page:page,
				user_id:userid
			}
		},function(ret){
			if(ret.code == 200){
				if(ret.result.length > 0){
					if(page == 0){
						$scope.youLikeList = [];
					}
					$scope.youLikeList = $scope.youLikeList.concat(ret.result);
					$scope.$apply();
					
					var imgHeight2 = $('.guessGoodsPicture img').width();
				    $('.guessGoodsPicture img').css('height',imgHeight2+'px');
				    $api.closeloadding();
					
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
	
	function myCollection(){//我的收藏
		$api.post(phpurl+'Goods/getCollectList',{
			values:{
				user_id:userid
			}
		},function(ret){
			if(ret.code == 200){
				if(ret.result.length > 0){
					$scope.collectionList = ret.result;
					$scope.$apply();
					$api.closeloadding();
				}else if(ret.result.length <= 0){
					$('.CollectionList1').html('<div class="noCollection">'
													+'<img src="../../image/null.png"/>'
													+'<p>空空如也~~</p>'
											   +'</div>');
					$api.closeloadding();
				}
			}
		})
	}
	
	function myFootprint(){//我的足迹
		$api.loadding(api.frameName,0);
		$api.post(phpurl+'Activity/BroList',{
			values:{
				user_id:userid
			}
		},function(ret){
			if(ret.length > 0){
				$scope.footprintList = ret;
				$scope.$apply();
				
				var imgHeight1 = $('.goodsPicture img').width();
				$('.goodsPicture img').css('height',imgHeight1+'px');
				$('.goodsDescribe').css('height',imgHeight1+'px');
				
	
				
				$api.closeloadding();
				
			}else if(ret.length <= 0){
				$('.CollectionList2').html('<div class="noCollection">'
												+'<img src="../../image/null.png"/>'
												+'<p>空空如也~~</p>'
										   +'</div>');
				$api.closeloadding();
			}
		})
	}
}])
