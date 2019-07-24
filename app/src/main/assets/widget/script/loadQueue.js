//下载队列
var LoadQueue = function(MyEvent){
    this._loadArray=[];
    this._MyEvent = MyEvent;
}

LoadQueue.prototype = {

    maxConnections: 2, //TODO: 应该是每个host的最大连接数。

    _source: [],
    _loaded: 0,
    _connections: 0,
    _currentIndex: -1,
    
    _type:null,
    
    
    add: function(source,type){
        var me = this;
        if(source){
            source = source instanceof Array ? source : [source];
            me._source = me._source.concat(source);
        }
        me._type=type;
        return me;
    },

    loaded:function(){
        var me = this;
        var load;
        switch(me._type){
           case 'base64':
              load= convertImgToBase64;
              break;
           
           case 'download':
              load= downLoadImage;
              break;             
        }
        return load;
    },
  
    start: function(){
        var me = this;
        me._loadNext();
        return me;
    },

    
    _loadNext: function(){
        var me = this, source = me._source, len = me._source.length,load;
        
        load=me.loaded();        
        //all items loaded
        if(me._loaded >= len){
            me._MyEvent.emit('complete',me._loadArray);
            return;
        }

        if(me._currentIndex < len - 1){
            var index = ++me._currentIndex;
            var item = me._source[index];
            
            load(item,function(url){
             
                if(!url){
                    me._onItemError();
                }else{
                    me._loadArray.push(url);
                    me._onItemLoad();
                }
               
            })
           
        }
    },
    
    
    _onItemLoad: function(){
        var me = this;
        
        me._loaded++;
        me._loadNext();
    },

    _onItemError: function(){
        var me = this;
        me._loaded++;
        me._loadNext();
    }
}

//图片转换成base64编码
function convertImgToBase64(url,callback){
    var canvas = document.createElement('canvas');
    var $body = document.getElementsByTagName('body')[0];
    
    
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.style.display = 'none';
    img.src = url;
    
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0);
        var base64url = canvas.toDataURL('image/png');
        callback.call(this,base64url);   
    }
    
    img.onerror = function(){
        callback.call(this,false);   
    }
    
    $body.appendChild(img);
}

//下载图片
function downLoadImage(url,callback){
    
    api.download({
	    url: url,
	    savePath: 'fs://'+url,
	    report: true,
	    allowResume: true
	}, function(ret, err) {
	    if (ret.state == 1) {
	       callback.call(this,ret['savePath']);
	    } else {
	       callback.call(this,false);
	    }
	});
}
