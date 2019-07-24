(function(window){
   var imageBrowser;
   var imageFilter;
   var UIMediaScanner;
   
   var ya_times=0;
   //定义1M
   var need_ya_min = 1024*1024;
   
   var need_ya_min = 1024*1024;
   //定义0.75M
   var min_ya_suo = need_ya_min*0.75;
   //定义1.5M
   var max_ya_suo = need_ya_min*1.5;
	//定义2M
   var ya_suo_2m = need_ya_min*2;
	//定义8M
	var ya_suo_8m = need_ya_min*8;
	//记录压缩次数
	var ya_times = 0;
	//有图片需要压缩,提示语的控制元素
	var deng_dai = 0;
	
	var isIOS ;
   var selectImage = function(maxsize,callback){
       //设置最大上传图片数
       this.max_size=maxsize;
       this.okcallback = callback;
       
       
       isIOS = api.systemType;
       this.init();
   }
   
   selectImage.prototype.init = function(){
      UIMediaScanner = api.require('UIMediaScanner');
      this.currentsize = 0;
      this.imageArray = [];
      //	// 引入图片浏览模块
	  //imageBrowser = api.require('imageBrowser');
     //	// 引入过滤压缩模块
	  imageFilter = api.require("imageFilter");
   }
   
   selectImage.prototype.getImageArray = function(){
      return imageArray;
   }
   
   selectImage.prototype.getCurrent = function(){
      return currentsize;
   }
   
   selectImage.prototype.upload = function(){
      var _this = this;
 	  if(this.currentsize<this.max_size){
    	    api.actionSheet({
				title : '选择图片来源',
				buttons : ['优雅自拍', '浏览相册']
			}, function(ret, err) {
				var index = ret.buttonIndex;
				if(index==1){_this.pai_zhao();}
				else if(index==2){_this.xiang_ce();}
				else{return}
			});
		}else{
			api.toast({
		        msg:'最多上传'+this.currentsize+'张图片'
	        });
        }
     
    }
    
    selectImage.prototype.xiang_ce = function(){
       var mysize = this.max_size-this.currentsize;
       var _this = this;

		UIMediaScanner.open({
			type : 'picture',
			column : 4,
			classify : true,
			max :mysize,
			sort : {
				key : 'time',
				order : 'desc'
			},
			texts : {
				stateText : '已选*项',
				cancelText : '取消',
				finishText : '完成'
			},
			styles : {
				bg : '#fff',
				mark : {
					icon : '',
					position : 'bottom_right',
					size : 20
				},
				nav : {
					bg : '#b23e4b',
					stateColor : '#fff',
					stateSize : 18,
					cancelBg : 'rgba(0,0,0,0)',
					cancelColor : '#fff',
					cancelSize : 18,
					finishBg : 'rgba(0,0,0,0)',
					finishColor : '#fff',
					finishSize : 18
				}
			}
		}, function(ret,err) {
			if (ret) {
			    if(ret.eventType == "cancel"){
			        return;
			    }
				var selectImg = ret.list;
				var selectImgArray=[];
			    xiang_ce_num=0;
			    
				xiang_ce_tu(selectImg,function(selectImg){
				    ya_times=0;
				    for(var i=0;i<selectImg.length;i++){
					    selectImgArray.push(selectImg[i]['path'])
					}
				    ya_suo(selectImgArray,function(lastArray){
				        selectImgArray = [];
				        for(var i=0;i<lastArray.length;i++){
				           _this.imageArray.push(lastArray[i]);
				        }
				        _thiscurrentsize=_this.imageArray.length;
						_this.okcallback&&_this.okcallback(lastArray)
				    })
						
				})
			}
		});
    }
    
    
   
    
   
    // 打开拍照    
	function pai_zhao(){
		var _this = this;
		api.getPicture({
			sourceType : "camera",
			encodingType : "jpg",
			destinationType : "url",
			mediaValue : "pic",
			quality : 50,
			saveToPhotoAlbum : true
		}, function(ret, err) {
			if (ret && ret.data) {
				// 拍照返回的本地路径
				var returnUrl = ret.data;
				_this.imageArray.concat([returnUrl])
				_this.currentsize=_this.imageArray.length;
				_this.okcallback&&_this.okcallback([returnUrl])	
			} else {
				api.toast({
					msg : '没有拍照'
				});
			}
		});
	}
	selectImage.prototype.pai_zhao = pai_zhao;
	selectImage.prototype.deleteImage = function(imgDom,callback){
       var parentDom = imgDom.parentNode;
       var delDom = $api.dom(parentDom,'.myImage');
       var src = delDom.src;
       src = src.substring(7,src.length);
       var index = imageArray.indexOf(src);
       imageArray.splice(index,1);
       currentsize=imageArray.length;
       var $uP = $api.dom('.uploadPic');
       $uP.removeChild(parentDom)
       callback&&callback();
    }
	
	function ya_suo(imageArray,callback){
	    if(ya_times == imageArray.length){
			callback&&callback(imageArray);
			return;
	    }
	   
	    imageFilter.getAttr({
		    path: imageArray[ya_times]
		},function(ret, err){
		    var size = ret['size'];
		    if(size>min_ya_suo){
		    	//图片的压缩率
		    	var ya_suo_lu;
		    	if(size<ya_suo_2m){
		    		ya_suo_lu = min_ya_suo/size;
		    		//需要等更长时间提示语,只出现一次
		    		if(deng_dai<1){
		    			api.toast({
	                        msg:'图片较大,请耐心等候哦~'
	                    });
	                    deng_dai++;
		    		}
		    	}
		    	else if(size>ya_suo_8m){
		    		ya_suo_lu=0.2;
		    		//需要等更长时间提示语,只出现一次
		    		if(deng_dai<1){
		    			api.toast({
	                        msg:'图片较大,请耐心等候哦~'
	                    });
	                    deng_dai++;
		    		}
		    	}
		    	else{
	    			ya_suo_lu = max_ya_suo/size;
		    		//需要等更长时间提示语,只出现一次
		    		if(deng_dai<1){
		    			api.toast({
	                        msg:'图片较大,请耐心等候哦~'
	                    });
	                    deng_dai++;
		    		}
	            }
		        //获取图片的后缀名
	    		var pos = imageArray[ya_times].lastIndexOf(".");
	 			var hou_zhui_ming = imageArray[ya_times].substring(pos,imageArray[ya_times].length)
	    		// 压缩文件的保存目录
				var savePath = api.cacheDir + "/" + getNowFormatDate() + "/";
				// 压缩文件生成的随机文件名称
				var savename = NewGuid()  + hou_zhui_ming;
		        imageFilter.compress({
				img : imageArray[ya_times],
				quality : ya_suo_lu,
				scale : ya_suo_lu,
				save : {
					album : false,
					imgPath : savePath,
					imgName : savename
				}
				}, function(ret, err) {
					if (ret) {
						imageArray[ya_times]=savePath + savename;
						++ya_times;
						ya_suo(imageArray,callback);
					} else {
					
					}
			});
		    }else{
		       ++ya_times;
			   ya_suo(imageArray,callback);
		    }
		});
	}
	
	var xiang_ce_num = 0;
	function xiang_ce_tu(tag,callback){
	     
	      if(tag.length == xiang_ce_num){
	         callback&&callback(tag);
	         return;
	      }
	      if (isIOS == 'ios') {
	         UIMediaScanner.transPath({
				path:tag[xiang_ce_num].path
			 },function(ret, err){
			    tag[xiang_ce_num].path = ret.path;
			    ++xiang_ce_num;
			    xiang_ce_tu(tag,callback);
			 })
	      }else{
	         ++xiang_ce_num;
	         xiang_ce_tu(tag,callback);
	      }
	}
	
	
	
	// 生成guid,主要用于生成随机文件名
	function NewGuid() {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
	
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}
	
	// 获取当前的时间，拼接成2015-11-09这样的格式，主要用于对图片进行时间分类
	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate
		return currentdate;
	}
		
	window.selectImage = selectImage;
})(window)