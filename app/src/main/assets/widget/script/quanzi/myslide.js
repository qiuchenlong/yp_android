(function(){
	$.fn.extend({
		Slide:function(){
           $(this).click(function(){
                _this = $(this);
                var flag = _this.attr('flag');
                if(flag == 'false'){
					_this.parent().next().slideUp();
					_this.css('transform','rotate(0deg)');
					_this.attr('flag',true);
				}else{
					_this.parent().next().slideDown();
					_this.css('transform','rotate(180deg)');
					_this.attr('flag',false);
				}
           }) 
        },
	})
})(jQuery)