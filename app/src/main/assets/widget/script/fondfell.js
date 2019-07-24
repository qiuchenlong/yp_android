

//初始化配置参数
(function(window){

    window.FIconconfig = {
        appcodeid:146,
        footernum:4,
        startTime:3000,
        loadingImage:'image/index_images/loading.png',
        titleArr:['首页','书架','分类','我的'],
        noactiveimageArray:['../image/index_images/button1.png','../image/index_images/button2.png','../image/index_images/button2.png','../image/index_images/button3.png'],
        activeimageArray:['../image/index_images/button01.png','../image/index_images/button02.png','../image/index_images/button2.png','../image/index_images/button03.png'],
        ImageArrayFiled:['noactiveimage','activeimage','loadingimage'], //图片数组字段
        TextFiled:['appcolor','appHeaderBg','htxcolor','appname','seller','partner','rsaPriKey','rsaPubKey','subject','body','messageorders','footer_bg','footer_tx','weiTitle','weiDescription','weiThumb','qqTitle','qqDescription','qqimgUrl','wxyin'],//文字字段
        TextArrayFiled:['footertitle'], //文字数组字段
    }
})(window);
$api.setStorage('appId',window.FIconconfig.appcodeid);
$api.setStorage('Mphpurl','http://www.fondfell.com/superDao/apis/');

var result;
//保存初始化数据到数据表
(function(window){

    var AppDao = {};
    var M_JS_FILE_NAME = "data.txt";
    var M_ROOT_DIR = "fs://mode1/";

    AppDao.saveLocal = function(filename,data){//保存本地
        var fs = api.require('fs');
		fs.createDir({
		    path: 'fs://mode1'
		}, function(ret, err){

		   write(filename+M_JS_FILE_NAME,data,function(ret){
			   if(ret.status){

			   }
		   });

		});
    }

	//写进文件
	function write(fileName,data,callback){

        api.writeFile({
		    path: 'fs://mode1/'+fileName,
		    data: data
		},callback);
	}

    //读取文件
    AppDao.Read = function(fileName,callback,errorCallback){

        api.readFile({
		    path: M_ROOT_DIR+fileName+M_JS_FILE_NAME
		}, function(ret, err){
		    if(ret.status){
		         var data = ret.data;
		         callback&&callback(ret.data)
		    }else{
		       errorCallback&&errorCallback()
		    }
		});

    }



    window.AppDao = AppDao;

})(window);




function toHtml(){

   api.removeLaunchView();
   var $tiaoguo = $api.dom('.tiaoguo');
   var $daotime = $api.byId('daotime');

   $tiaoguo.onclick=function(){
       try {

            api.openWin({
	            name: 'login',
	            url: 'html/homeSlid.html',
	            slidBackEnabled:false,
	            animation:{

				    type:"fade",                //动画类型（详见动画类型常量）
				    subType:"from_right",       //动画子类型（详见动画子类型常量）
				    duration:300                //动画过渡时间，默认300毫秒

	            }
            });
       } catch (e) {
//          alert(e)
       }
       clearTimeout(qidongtimeID);
    }


    setTimeout(function(){
       var loadingimage=$api.getStorage('loadingimage');

       if(!loadingimage){
           loadingimage = FIconconfig.loadingImage;
       }

       var $img = $api.byId('ad');

       $img.src=loadingimage;

       $img.onload = function(){
          $img.style.display="block";
          setTimeout(function(){
             $tiaoguo.style.display="block";
             setInterval(function(){
                   var time=$daotime.innerText;
                   if(parseInt(time)>0){
                       var nowtime = parseInt(time)-1;
                       $daotime.innerText=nowtime;
                   }


             },1000)
          },1000)

       }

    },1000)
    //三秒后显示,启动3秒
   var qidongtimeID =setTimeout(function(){
        var loadingimage=$api.getStorage('loadingimage');
        var navimage = $api.getStorage('navimage');
        var loadingimage=$api.getStorage('loadingimage');

        var noactiveimageArray = $api.getStorage('noactiveimage');

        if(!noactiveimageArray || !$api.getStorage('activeimage')){
              $api.setStorage('noactiveimage',FIconconfig.noactiveimageArray);
		      $api.setStorage('activeimage',FIconconfig.activeimageArray);
		      $api.setStorage('footertitle',FIconconfig.titleArr);
		      $api.setStorage('appname','微云财富');
        }


        try {
            api.openWin({
	            name: 'login',
	            url: 'html/homeSlid.html',
	            slidBackEnabled:false,
	            animation:{

				    type:"fade",                //动画类型（详见动画类型常量）
				    subType:"from_right",       //动画子类型（详见动画子类型常量）
				    duration:300                //动画过渡时间，默认300毫秒

	            }
            });
        } catch (e) {
//          alert(e)
        }
   },5000)
}

var upDateArray=[];
var len = FIconconfig.ImageArrayFiled.length;
var myDataDao = new dataDao('data');
var count=0;

//初始默认值
(function(window){

   var FIcon = {};



   FIcon.Init = function(){
        $api.setStorage('noactiveimage',FIconconfig.noactiveimageArray);
	    $api.setStorage('activeimage',FIconconfig.activeimageArray);

	    var nonum = FIconconfig.noactiveimageArray.length;
	    var num = FIconconfig.activeimageArray.length;

	    var $body = $api.byId('ad');

	    var firstBaseRead = $api.getStorage('firstRead');

	    if(FIconconfig.footernum != nonum || FIconconfig.footernum != num){
	         alert('你是猪啊，传入的图片数量与设置的底部个数不符');
	    }
	    var mType = api.systemType;


	    myDataDao.openDatabase(function(){

	        myDataDao.insertData('Ashangjia',result[0]['Ashangjia'],function(){
	             if(result[0]['Ashangjia']==1&& mType == "android"){
             	    $api.setStorage('appId',82);
                    $api.setStorage('Mphpurl','http://www.fondfell.com/superDao/apis/');
             	 }
	             $api.setStorage('Ashangjia',result[0]['Ashangjia']);


	        },function(){

	             myDataDao.selectData('Ashangjia',function(data){

	                 if(data[0]['Data'] == 1){
	                 	$api.setStorage('Ashangjia',result[0]['Ashangjia']);
	                 	if(result[0]['Ashangjia']==1&& mType == "android"){
	                 	    $api.setStorage('appId',82);
	                        $api.setStorage('Mphpurl','http://www.fondfell.com/superDao/apis/');
	                 	}else if(result[0]['Ashangjia'] == 0){
					         $api.setStorage('userid',"");
					    }
	                 	myDataDao.updateData('Ashangjia',result[0]['Ashangjia'],function(){
	                 	})
	                 }else if(data[0]['Data'] == 0){

	                 }
	             })
	        })

	        myDataDao.insertData('shangjia',result[0]['shangjia'],function(){

	             $api.setStorage('shangjia',result[0]['shangjia']);
	             if(result[0]['shangjia']==1 &&mType == 'ios'){
			         $api.setStorage('appId',82);
			         $api.setStorage('Mphpurl','http://www.fondfell.com/superDao/apis/');
			     }
	        },function(){

	             myDataDao.selectData('shangjia',function(data){

	                 if(data[0]['Data'] == 1){
	                 	$api.setStorage('shangjia',result[0]['shangjia']);
	                 	if(result[0]['shangjia']==1 &&mType == 'ios'){
					         $api.setStorage('appId',82);
					         $api.setStorage('Mphpurl','http://www.fondfell.com/superDao/apis/');
					    }else if(result[0]['shangjia'] == 0){
					         $api.setStorage('userid',"");
					    }
	                 	myDataDao.updateData('shangjia',result[0]['shangjia'],function(){

	                 	})
	                 }else if(data[0]['Data'] == 0){

	                 }
	             })
	        })

        })


	    if(firstBaseRead=='no'||result[0]['isUpdate']==1){

	        myDataDao.openDatabase(function(){

	            createFiled();
	        })
	    }

	    //获取多张图片，通过文件读取
	    for(var i=0;i<FIconconfig.ImageArrayFiled.length;i++){
	         (function(i){
	              var type = FIconconfig.ImageArrayFiled[i];
	              AppDao.Read(type,function(text){
				        var dataArray = text.split('%');
				        $api.setStorage(type,dataArray);
				  })
	         })(i)
	    }
   }

   //第一次创建字段
	function createFiled(){
	    for(var i=0;i<FIconconfig.ImageArrayFiled.length;i++){

	         (function(i){

	                  myDataDao.insertData(FIconconfig.ImageArrayFiled[i],"",function(){
	                       count++;

	                       if(count == FIconconfig.ImageArrayFiled.length){

	                          myDataDao.updateData('firstRead','yes',function(){

	                          });
	                          FIcon.checkUpdate(0,function(){

						           if(upDateArray.length>0){
						           		FIcon.upDateImage(0,function(){});
						           }else{

						           }
						       })
	                       }
	                  },function(){
	                       FIcon.checkUpdate(0,function(){
				               myDataDao.updateData('firstRead','yes',function(){

	                           });
					           if(upDateArray.length>0){
					           		FIcon.upDateImage(0,function(){});
					           }else{

					           }
					       })
	                  });


	         })(i)
	    }
	}



	//检测要更新的图片
	FIcon.checkUpdate=function(currentIndex,callback){
	     var datatype = FIconconfig.ImageArrayFiled[currentIndex];
	     var resultData = result[0];


	     if(currentIndex == len){
	        callback&&callback();
	        return;
	     }
	     ++currentIndex;
	     myDataDao.openDatabase(function(){

	              myDataDao.selectData(datatype,function(data){


		               var Data = data[0].Data;
		               var Obj = $api.getStorage(datatype);
		               var isShai = false;

		               if(datatype == 'loadingimage'){
		                   if(FIconconfig.loadingImage == Obj){
		                       isShai = true;
		                   }
		               }else if(datatype == 'noactiveimage'){
		                   if(FIconconfig.noactiveimageArray == Obj){
		                       isShai = true;
		                   }
		               }else if(datatype == 'activeimage'){
		                   if(FIconconfig.activeimageArray == Obj){
		                       isShai = true;
		                   }
		               }

		               if(Data != resultData[datatype]){
		                   myDataDao.updateData(datatype,resultData[datatype],function(){
		                       var updateObject={};
		                       updateObject.datatype = datatype;
		                       updateObject.datacontent = resultData[datatype];
		                       upDateArray.push(updateObject);
		                       FIcon.checkUpdate(currentIndex,callback);
		                   })
		               }else{
		                   FIcon.checkUpdate(currentIndex,callback);
		               }
		          })

	     })
	}


	//更新图片
	FIcon.upDateImage = function(currentIndex,callback){

	    var len = upDateArray.length;

	    if(currentIndex == len){
	       callback&&callback();
	       return;
	    }
	    var item = upDateArray[currentIndex];
	    var datacontent = item.datacontent;

	    var datatype = item.datatype;
	    var MyEvent = new EventToll();
	    var myLoadQueue = new LoadQueue(MyEvent);
	    var source = datacontent.split(',');
	    if(datatype == 'loadingimage'){
	       myLoadQueue.add(source,'download');
	    }else{
	       myLoadQueue.add(source,'base64');
	    }

	    myLoadQueue.start();


	    ++currentIndex;
	    myLoadQueue._MyEvent.on('complete',function(loadArray){

	        if(datatype == 'loadingimage'){

	            $api.setStorage(datatype,loadArray[0]);
	        }else{
	           saveImgtoFile(datatype,loadArray);
	        }


	        FIcon.upDateImage(currentIndex,callback);
	    })
	}

	//将图片存储到文件
	function saveImgtoFile(itemtype,loadArray){
	  var newImageString = "";

	  for(var k=0;k<loadArray.length;k++){
	      newImageString += loadArray[k]+'%';
	  }
	  var newImageString = newImageString.substring(0,newImageString.length-1);
	  $api.setStorage(itemtype,loadArray);

	  AppDao.saveLocal(itemtype,newImageString);
	}

	//组装css文件
	FIcon.createCssFile=function(maincolor){
	    var cssString = '.appcolor_bg{background:'+maincolor+';} .appcolor_tx{color:'+maincolor+'} .appcolor_bc{border-color:'+maincolor+' !important}';
	    return cssString;
	}

	window.FIcon = FIcon;


})(window)

 function inits() {

          api.openSlidLayout({
            type: 'left',
            fixedPane: {
                name: 'wo',
                url: 'html/wo.html'
            },
            slidPane: {
                name: 'homeSlid',
                url: 'html/homeSlid.html'
            },
            slidPaneStyle: {
                leftEdge: window.innerWidth * 0.2
            }
        }, function(ret, err) {

        });

    }

//首次进入app载入的js
apiready = function () {
         inits();

		$api.fixStatusBar($api.dom('header'));
		api.setStatusBarStyle({
	        style: 'light', // 'rgb(0,0,0)' || '#fff'
	    });
	    toHtml();//定时打开广告图和跳转到app首页

	    getBg();//从服务器获取头部背景色,字体颜色
       var firstBaseRead = true;


	   api.ajax({
	       url:'http://www.fondfell.com/superDao/lg/21/index.php?c=AppCode&a=getCode&id='+FIconconfig.appcodeid,
	       method:'get',
	       timeout:6
       },function(ret,err){

           if(ret){
                   var data = ret;
	               if(data.error == 0){

				       result = data.result;

				       for(var i=0;i<FIconconfig.TextFiled.length;i++){

				           var type = FIconconfig.TextFiled[i];

				           var value = result[0][type];
				           $api.setStorage(type,value);
				       }
				       $api.setStorage('footertitle',FIconconfig.titleArr);
				       for(var i=0;i<FIconconfig.TextArrayFiled.length;i++){
				           var type = FIconconfig.TextArrayFiled[i];
				           var valueArray = result[0][type].split(',');
				           $api.setStorage(type,valueArray);
				       }


				       myDataDao.openDatabase(function(){
					        myDataDao.insertData('firstRead','no',function(){
					             $api.setStorage('firstRead','no');
					             var firstRead = $api.getStorage('firstRead');
						         FIcon.Init();

					        },function(){
					             myDataDao.selectData('firstRead',function(data){
					                 $api.setStorage('firstRead',data[0]['Data']);
					                 var firstRead = $api.getStorage('firstRead');

							         if(firstRead == 'yes'){
								         FIcon.checkUpdate(0,function(){

								             if(upDateArray.length>0){
								           		FIcon.upDateImage(0,function(){});
								             }else{

								             }
								         })
							         }
							         FIcon.Init();
					             })

					        })

				        })
				        var maincolor = result[0]['appcolor'];
		        }
           }else{

	              api.toast({
	                  msg:'你没有网络,开启网络会有更好的app体验'
                  });
                  var noactiveimage = $api.getStorage('noactiveimage');
                  var activeimage = $api.getStorage('noactiveimage');
                  if(!noactiveimage || !activeimage){
                      $api.setStorage('noactiveimage',FIconconfig.noactiveimageArray);
				      $api.setStorage('activeimage',FIconconfig.activeimageArray);
				      $api.setStorage('footertitle',FIconconfig.titleArr);
				      $api.setStorage('appname','微云财富');
                  }

	        }
       });

}







