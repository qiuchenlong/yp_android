function openWin (name, url, frm_name, frm_url, title,data, bck ){
	data.frm_name=frm_name;
	data.frm_url=frm_url;
	data.title=title;
	data.bck=bck;
	api.openWin({
	    name: name,
	    url: url,
	    bgColor:'rgba(0,0,0,.2)' ,
	    pageParam: data
    });
}

	
function closeWin(){
	api.closeWin();
}	


function newwin(){	
    
	//任意打开新页面的函数,可任意传值
	var newwin_list = $api.domAll('*[newwin]');
	//列表的点击函数
	for(var i=0,len = newwin_list.length; i < len;i++){
		newwin_list[i].onclick = function() {
			var nwewin = $api.strToJson($api.attr(this,'newwin'));
            if(nwewin.fn){
                nwewin.fn();
            }
			api.openWin({
		        name:nwewin.name,
		        url:nwewin.url,
		        pageParam:nwewin
	        });
		};
	};
};	
/*打开子窗口函数*/
	function openFrm (frm_name, frm_url, datas){
		api.openFrame({
		    name: frm_name,
		    url: frm_url,
		    rect: {
			    x:0,
			    y: $api.dom('header').offsetHeight,
			    w: api.winWidth,
			    h: $api.dom('#main').offsetHeight
		    },
		    pageParam:{
		    	data: datas
		    }
		});
	}
	/*打开子窗口函数结束*/

/*加入清单点击事件*/
function addOrder(){	
	var aAdd = $api.domAll('.add');
	for (var i=0, len=aAdd.length; i<len; i++){
		aAdd[i].onclick = function(){
            api.execScript({
				name: 'homeSlid',
			    script: 'add_order_num();'
			});
            api.execScript({
               	name: 'homeSlid',
               	frameName: 'frame2',
                script: 'add_order();'
            });
            api.toast({
	            msg:'添加成功'
            });
            if (event.stopPropagation) event.stopPropagation();//防冒泡;
		} 
	}
}
//点击一些按钮回到主页面，并切到相应的子窗口
function go_homeWin(n){
			closeWin();
			api.execScript({
	            name: "homeSlid",
	            script: 'car_show("'+n+'");'
            });
	}

/*加入清单点击事件结束*/



function open_goods(id){

	var fn = '$api.openWin("win_header48454","html/win_header", {"frm_name":"add_address","frm_url":"frames0/goods_detail.html","title":"奖品详情","data":"{goodsid:'+id +' }"});';
	api.execScript({
	    name: "root",
	    script: fn
    });
}






