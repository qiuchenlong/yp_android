/**
 * 开发时间：2016/5/24
 * 开发人员：boxUnll
 * 开发项目：移动端滑动验证代码
 */
function Hua1(callback) {
	var oBtn = document.getElementById('wwanc');
	var oW, oLeft;
	var oSlider = document.getElementById('slider1');
	var oTrack = document.getElementById('track1');
	var flag = 1;
	var ismoveCallback = false;
	var isendCallback = false;
	
	

	oBtn.addEventListener('touchstart', function(e) {
		if (flag == 1) {
			var touches = e.touches[0];
			oW = touches.clientX;
			oBtn.className = "button";
		}
	}, false);
	
	

	oBtn.addEventListener("touchmove", function(e) {
		event.preventDefault();
		if (flag == 1) {
			var touches = e.touches[0];
			oLeft = touches.clientX - oW;

			if (oLeft < 0) {
				oLeft = 0;
			} else if (oLeft >= oSlider.offsetWidth - oBtn.offsetWidth) {
				if (!ismoveCallback && !isendCallback) {

					ismoveCallback = true;
					isendCallback = true;
					callback && callback(function() {
						ismoveCallback = false;
						isendCallback = false;
					});
					oLeft = 0;
					return;
					oLeft = oBtn.offsetWidth - oSlider.offsetWidth;
				}
				//callback&&callback();													
			}
			oBtn.style.left = oLeft + "px";
			//oTrack.style.left = window.innerWidth*0.5+oLeft+'px';
			//oTrack.style.right=oLeft+ 'px';
		}
	}, false);
	
	
	
	oBtn.addEventListener("touchend", function() {
		oBtn.className = "button-on";
		setTimeout(function() {
			if (oLeft >= (oSlider.offsetWidth) / 3) {
				oBtn.style.left = (oSlider.offsetWidth - oBtn.offsetWidth) + 'px';
				// oTrack.style.right= (document.documentElement.clientWidth - oBtn.offsetWidth-30);
				if (!isendCallback && !ismoveCallback) {
					isendCallback = true;
					ismoveCallback = true;
					setTimeout(function() {
						callback && callback(function() {
							isendCallback = false;
							ismoveCallback = false;
						});
					}, 500)
				}
			} else {
				oBtn.style.left = '5px';
				oTrack.style.left = '100%';
			}
		}, 50)
		// oBtn.className="iconfont icon-fanhui apptxtcolor button-on";
	}, false);
}
