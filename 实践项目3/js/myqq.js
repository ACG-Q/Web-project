$(function() {
	setTimeout(function() {
		$(".section1").addClass("in");
	},200);
	$('#fullpage').fullpage({
		// 显示项目符号
		navigation: true,
		// 循环滚动
		loopBottom: true,

		onLeave: function(index, nextIndex, directon) {
			if (nextIndex == 1) {
				$(".section1").addClass("in");
			}
			if (nextIndex !=1 ) {
				$("#bg").addClass("rotate");
			}else {
				$("#bg").removeClass("rotate");
			}

			// 第二屏幕的制作
			if (nextIndex == 2) {
				// 我们的Jquery 里面的animate 不支持 transform
				$(".p2").css("transform","translate(-50%,-50%) translateZ(0px) scale(1)");
			}else if (index ==2 && nextIndex == 3){
				$(".p2").css("transform","translate(-50%,-50%) translateZ(2000px) scale(1)");

			}

			// 第三屏幕
			if (nextIndex == 3) {
				$(".p3").css("transform","translateZ(-50px) rotateX(45deg)");
				$(".title3").css("transform","translateZ(0px) rotateY(0deg)");
			}

			if (nextIndex == 4) {
				$(".p3").css("transform","translateZ(-200px) rotateX(-45deg) tanslateX(3000px)");
				$(".title3").css("transform","translateZ(1200px) rotateY(-60deg)");
			}

			if (index == 4 && nextIndex == 3) {
				$(".p4").css("transform","translate(-3000px,-50%) translateZ(200px)");
				$(".p2t1").css("transform","translate(-3000px,-50%) translateZ(200px)");
			}else if (index == 3 && nextIndex == 4) {
				$(".p4").css("transform","translate(-50%,-50%)");
				$(".p2t1").css("transform","translate(-50%,-50%)");
			}
		}
	});
});