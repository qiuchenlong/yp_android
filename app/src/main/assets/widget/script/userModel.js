(function(window){
	var user = {};
	
	user.login = function(phone,password){
	  
	    api.ajax({
	        url:phpurl+'User/login?phone='+phone+'&password='+password,
	        method:'get',
	        dataType: 'json'
        },function(ret,err){
        
        	if(ret){
        	   var code = ret.code;
        	   if(code == 200){
        	       var result = ret.result[0];
        	       if(result){
						api.toast({
		                    msg:'登录成功!'
	                    });
	                    $api.setStorage('userid',result['user_id']);
	                    api.sendEvent({
	                    	name:'login_ok'
	                    });
	                    
	                    api.sendEvent({
	                        name:'frame4_login_ok'
	                    })
	                   
	                    $api.closeloadding();
	                    
	                    var checkedTheme = $api.getStorage("checkedTheme");
	                    $api.send('changeOk');//退出再登录刷新用户数据
	                    $api.post(phpurl+'User/isShang',function(ret){
	                    	if(ret.code == 200){
	                    		var is_shang = ret.ashang;
	                    		var changebg = ret.changebg;
	                    		$api.setStorage('changebg',changebg);
	                    		if(is_shang == 1){
			                    	setTimeout(function(){
			                    		api.openWin({
								            name: 'root1',
								            url: '../../index.html',
								            slidBackEnabled:false,
								            animation:{				              
											    type:"fade",                //动画类型（详见动画类型常量）
											    subType:"from_right",       //动画子类型（详见动画子类型常量）
											    duration:300                //动画过渡时间，默认300毫秒
								            }
							             });
			                    	},600)
			                    }else{
			                    
			                    	if(checkedTheme){
				                    	setTimeout(function(){
				                    		api.openWin({
									            name: 'root1',
									            url: '../../index.html',
									            slidBackEnabled:false,
									            animation:{				              
												    type:"fade",                //动画类型（详见动画类型常量）
												    subType:"from_right",       //动画子类型（详见动画子类型常量）
												    duration:300                //动画过渡时间，默认300毫秒
									            }
								             });
				                    	},600)
				                    }else{
				                    	setTimeout(function(){
				                    		api.openWin({
									            name: 'chooseTheme_win',
									            url: 'win_header.html',
									            slidBackEnabled:false,
									            pageParam:{
									            	frm_name:'changeTheme',
									                frm_url:'changeTheme.html',
									                title:'选择你喜欢的主题颜色',
									                data:{
									                	xg:'theme'
									                }
									            },
									            animation:{				              
												    type:"fade",                //动画类型（详见动画类型常量）
												    subType:"from_right",       //动画子类型（详见动画子类型常量）
												    duration:300                //动画过渡时间，默认300毫秒
													
									            }
								             });
				                    	},600)
				                    }
			                    
			                    }
	                    	}
	                    })
	                    
					}
        	   }else{
        	        api.toast({
	                    msg:'请检查账号密码是否正确'
                    });
                    $api.closeloadding();
        	   }
        	}
        });
	}
	
	
	user.findOne = function(userid,callback){
	   
	    api.ajax({
	        url:config.phpurl+'index.php?m=Api&c=User&a=findOne&userid='+userid,
	        method:'get'
        },function(ret,err){
        	if(ret){
        	  
        	   var code = ret.code;
        	   if(code ==  200){
        	        var result = ret.result;
        	        callback&&callback(result);
        	   }
        	}
        });
	}
	
	//其他登陆
	user.otherLogin = function(obj,headimg,type){
	    $api.post(phpurl+'User/otherlogin',{
	       values:{
	          openid:obj.openid
	       } 
	    },function(ret){
	       var code = ret.code;
	       if(code ==200){
	          var result = ret.result;
    	      if(result.length>0){
					api.toast({
	                    msg:'登录成功!'
	                });
	                $api.setStorage('userid',result[0]['user_id']);
	                var checkedTheme = $api.getStorage("checkedTheme");
	                $api.send('changeOk');//退出再登录刷新用户数据
                    if(checkedTheme){
                    	setTimeout(function(){
                    		api.openWin({
					            name: 'root1',
					            url: '../../index.html',
					            slidBackEnabled:false,
					            animation:{				              
								    type:"fade",                //动画类型（详见动画类型常量）
								    subType:"from_right",       //动画子类型（详见动画子类型常量）
								    duration:300                //动画过渡时间，默认300毫秒
					            }
				             });
                    	},600)
                    }else{
                    	setTimeout(function(){
                    		api.openWin({
					            name: 'chooseTheme_win',
					            url: '../Win.html',
					            slidBackEnabled:false,
					            pageParam:{
					            	frm_name:'changeTheme',
					                frm_url:'user/changeTheme.html',
					                title:'选择你喜欢的主题颜色',
					                data:{
					                	xg:'theme',
					                	
					                }
					            },
					            animation:{				              
								    type:"fade",                //动画类型（详见动画类型常量）
								    subType:"from_right",       //动画子类型（详见动画子类型常量）
								    duration:300                //动画过渡时间，默认300毫秒
									
					            }
				             });
                    	},600)
                    }
	                
    	      }else{
    	            user.otherregister(obj,headimg,type)
    	      }
	       }
	    })

	}
	
	
	
	
	user.setNewPassword = function(phone,password,callback){
	    api.ajax({
	        url:config.phpurl+'m=Api&index.php?c=User&a=resetPassword&phone='+phone+'&password='+password,
	        method:'get'
        },function(ret,err){
        	if(ret){
        	   var code = ret.code;
        	   if(code == 200){
        	       callback&&callback();
        	   }
        	}
        });
	}
	
	user.updateOne = function(userid,type,value,callback){
	    api.ajax({
	        url:config.phpurl+'index.php?c=User&a=updateOne&userid='+userid+'&'+type+'='+value,
	        method:'get'
        },function(ret,err){
            if(ret){
	        	if(ret.code == 200){
	        	    callback&&callback();
	        	}
        	}
        });
	}
	
	user.upDateOne = function(userid,type,value,callback){
	    
	    
	    api.ajax({
	        url:config.phpurl+'index.php?c=User&a=updateOne&userid='+userid+'&'+type+'='+value,
	        method:'get'
        },function(ret,err){
            if(ret){
	        	if(ret.code == 200){
	        	    callback&&callback();
	        	}
        	}
        });
	}
	
	user.changeHead = function(headimg,callback){
	    
	    
	    var userid = $api.getStorage('userid');
	    
	    $api.post(config.phpurl+'index.php?c=User&a=uploadUserImg',{
	        values:{
              userid:userid
            },
            files:{file:headimg}
	    },function(ret,err){
        	if(ret){
        	   var code = ret.code;
        	   if(code == 200){
        	       callback&&callback(headimg);
        	   }
        	}
        })
	    
	}
	
	user.getMoney = function(userid,callback){
	    api.ajax({
	        url:config.phpurl+'index.php?c=User&a=getUserMoney&userid='+userid,
	        method:'get'
        },function(ret,err){
        	if(ret){
        	   var code = ret.code;
        	   if(code == 200){
        	       var result = ret.result;
        	       if(result.length>0){
        	           var yu_e = parseFloat(result[0].money);
					   callback&&callback(yu_e);
        	       }
        	   }
        	}
        });
	}
	
	user.reduceMoney = function(price,callback){
	   var userid = $api.getStorage('userid');
	   api.ajax({
	       url:config.phpurl+'index.php?c=User&a=reduceMoney&userid='+userid+'&price='+price,
	       method:'get'
       },function(ret,err){
           if(ret){
	       	   if(ret.code == 200){
	       	      callback&&callback(true);
	       	   }else{
	       	      callback&&callback(false);
	       	   }
       	   }
       });
	  
	}
	
	user.otherregister = function(obj,headimg,type){
	    
	    util.downLoadImage(headimg,function(base64headimg){
	        
	        if(base64headimg){
		        $api.post(phpurl+'User/otherRegister',{
		            values:{
		               sex:obj.sex,
		               openid:obj.openid,
		               name:obj.name,
		               type:type
		            },
		            files:{file:base64headimg}
		            
		        },function(ret,err){
		           
		           if(ret){
	            	   if(ret.code == 200){
			               $api.setStorage('userid',ret.id);
			               setTimeout(function(){
	                    		api.openWin({
						            name: 'chooseTheme_win',
						            url: '../Win.html',
						            slidBackEnabled:false,
						            pageParam:{
						            	frm_name:'changeTheme',
						                frm_url:'user/changeTheme.html',
						                title:'选择你喜欢的主题颜色',
						                data:{
						                	xg:'theme',
						                	
						                }
						            },
						            animation:{				              
									    type:"fade",                //动画类型（详见动画类型常量）
									    subType:"from_right",       //动画子类型（详见动画子类型常量）
									    duration:300                //动画过渡时间，默认300毫秒
										
						            }
					             });
	                       },600)
	            	   }
	            	}
		            
		        },'json');
	        }else{
	            api.toast({
	                msg:'拉取数据失败,请重新授权登录'
                });
	        }
	    })
	    
	    
	}
	
	user.register = function(phone,password,callback){
	    if(phone == ""||password==""){
	       api.toast({
	           msg:'必须填写必填资料'
           });
           return;
	    }
	    
	    api.ajax({
	        url:config.phpurl+'m=Api&index.php?c=User&a=register&phone='+phone+'&password='+password,
	        method:'get',
	        timeout:6
        },function(ret,err){
        	if(ret){
        	   var code = ret.code;
        	   if(code == 200){
        	       var id = ret.id;
        	       
        	       
		        	var snatchid = ret.snatchid;
		        	var username = util.get_name();
		        	$api.setStorage('userid',id);
		        	$api.send('changeOk');//退出再登录刷新用户数据
		        	api.ajax({
                        url:config.phpurl+'index.php?c=User&a=registerWan',
                        method:'post',
                        data:{
                            values:{
                               name:username,
                               sex:1,
                               
                               userid:id
                            }
                        }
                    },function(ret,err){
                        if(ret){
                            var code = ret.code;
                            if(code == 200){
	                        	callback&&callback();
				        	    api.sendEvent({
				                    name:'frame4_login_ok'
				                })
				                api.sendEvent({
					              	name:'login_ok'
					             });
				                setTimeout(function(){
				                    $api.openWin(
							    	"rechangefdfdffddord",
							    	"../yao_win", 
							    	{	
							    		frm_name:"my_newsfdfsfd",
							    		frm_url:"user/yaoqing.html",
							    		title :"填写邀请码",
							    		
							    	});
				              	api.closeWin();
				               },500);
			                }
		                }
                    });
			        	
			      
        	   }
        	}
        });
	    
	}
	
	
	
	
	
	window.user = user;


})(window);