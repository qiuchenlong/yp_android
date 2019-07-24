var info = $api.getStorage('user');
var app = angular.module("myApp",[]);
var type,userid;
app.controller("controllerame",["$scope",function($scope){
	$scope.listData = [];
	$scope.myName = info.name;
	$scope.imgurl = Imageurl;
	
	$scope.dongTaiDetail = function(id,messageid,type,index){

		$scope.listData[index].isRead = 1;
		$api.post(phpurl+'/Home/Message/ReadMessage',{
			values:{
				type:type,
				oid:messageid,
				user_id:userid
			}
		},function(ret){})
		
					api.openWin({
	       name: 'win_headertie',
	       url: '../../Wins.html',
	       pageParam:{
               frm_name:'shuquan',
               frm_url:'quanzi/dong_tai_xiang_qing.html',
               title:'动态详情',
               data : {
					dynamic_id : id,	
				}
	       }
        });
	}

	$scope.goDetail = function(msg,noticeid,type){
		$api.post(phpurl+'Message/ReadMessage',{
			values:{
				type:type,
				oid:noticeid,
				user_id:userid
			}
		},function(ret){});
		openW({
			frm_url : 'frame0/tong_zhi/tong_zhi/detail.html',
			title : '详情',
			data:{
				contents:msg
			}
		})	
	}
	
	$scope.goQiangHongBao = function(circleId,begins,noticeid,type){//抢红包
		$api.post(phpurl+'Message/ReadMessage',{
			values:{
				type:type,
				oid:noticeid
			}
		},function(ret){})
		if(begins == 0){
			api.toast({
	            msg:'活动还未开始'
            });
		}
		if(begins == 1){
			openW({
				frm_url : 'frame2/qiang_hong_bao.html',
				title : '抢红包',
				data:{
//					is_win:false,
					circle_id:circleId
				}
			})
		}
		
	}
	
	EventT.on("apiready",function(types){
	   userid=$api.getStorage('user_id');
		type = types.types;

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
//		$api.loadding(api.frameName,0);
console.log('userid'+userid);
console.log('type'+type);
console.log('page'+page);
		$api.post(phpurl+'Message/getMessage',{
			values:{
				user_id:userid,
				type:type,
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
					$('.null img').attr('src','../../../image/NULL.png');
				}
				
				setTimeout(function(){
					$api.closeloadding();
				},300)
			}else{
				setTimeout(function(){
					$api.closeloadding();
				},300)
			}
			callback&&callback(ret);
		})
	}
}])