
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
		$api.post(phpurl+'Activity/MyPartActivity',{
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

