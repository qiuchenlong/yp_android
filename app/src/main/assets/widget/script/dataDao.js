
(function(window){
    
    var dataDao = function(dbname){
        this.dbname = dbname;
    }
    
    dataDao.prototype.openDatabase = function(callback){
        var db = api.require('db');
        var dbname = this.dbname;
       
        
		db.openDatabase({
		    name: dbname
		}, function(ret, err){        
		    if( ret.status ){
		         db.executeSql({
	                name:dbname,
	                sql:'CREATE TABLE App_code4(Name varchar(255) NOT NULL UNIQUE, Data varchar(255))'
	                
	             },function(ret,err){
	               
	                if(ret.status){
	                   
	                    callback && callback();
	                }else{
	                    
	                    callback && callback();
	                }
	             })
		    }else{
		       
		    }
		});
    }
    
    dataDao.prototype.updateData = function(name,data,callback){
        var db = api.require('db');
        var dbname = this.dbname;
        
        var sql = 'update App_code4 set Data="'+data+'" where Name="'+name+'"';
        
        db.executeSql({
	       name:dbname,
	       sql:sql
	    },function(ret,err){
	        
	        if(ret.status){
	           callback&&callback();
	        }else{
	           
	        }
	    })
    }
    
    dataDao.prototype.insertData = function(name,data,yescallback,errcallback){
        var db = api.require('db');
        var dbname = this.dbname;
       
        var sql = 'INSERT INTO App_code4 VALUES ("'+name+'","'+data+'")'
        
        db.executeSql({
	       name:dbname,
	       sql:sql
	    },function(ret,err){
	        
	        if(ret.status){
	            yescallback&&yescallback()
	        }else{
	            errcallback&&errcallback()
	        }
	    })
	}
	
	dataDao.prototype.selectData = function(name,callback){
	    var db = api.require('db');
        var dbname = this.dbname;
       
        
        db.selectSql({
		    name: dbname,
		    sql: 'SELECT * FROM App_code4 where Name="'+name+'"'
		}, function(ret, err){      
		    
		    if( ret.status ){
		       
		       var data = ret.data;
		      
		       if(data == null  || data ==undefined){
		          return;
		       }
		       callback && callback(data);
		    }else{
		      
		    }
		});
	}

    window.dataDao = dataDao;
})(window)