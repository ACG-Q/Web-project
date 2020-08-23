$(function(){
	var k = $(window).height(); // 当前屏幕的高度
	//var flag = false; //判断动画加载
	$(".next").click(function() {
		$.fn.fullpage.moveSectionDown();
	});
	$('#fullpage').fullpage({
		// fullpage 方法里面接收json对象形式
		// 是否显示项目导航--布尔--默认false
		navigation: true,
		// 项目导航对齐--字符串--默认"right"
		navigationPosition: "right",
		// 如果需要同时使用loopBottom、loopTop，那么就用continuousVertical
		// // 滚动到底部是否滚回顶部--布尔--默认false
		// loopBottom: true,
		// // 滚动到顶部是否滚回底部--布尔--默认false
		// loopTop: true,
		// 是否循环滚动--布尔--默认false，与loopBottom、loopTop不兼容
		// continuousVertical: true,
		// 是否使用键盘方向键导航--布尔--默认true
		keyboardScroiling: true,
		// 滚动速度，单位为毫秒--整数--默认700
		scrollingSpeed: 500,
		// 内容是否垂直居中--布尔--默认true
		verticalCentered: false,

		// 回调函数 滚动到的时候调用
		afterLoad: function(anchorLink, index) {
			if(index == 1) {
				$(".next").fadeIn();
			}
			if(index == 2) {
				// easeOutBack  缓动动画 添加在时间之后
				$(".search").show().animate({"right":370},1500,"easeOutBack",function() {
					// 方块走进来，沙发2字显示
					$(".search-words").animate({"opacity":1},500,function() {
						$(".search").hide();
						// 图片 右上角 缩小
						$(".search-02-1").show().animate({"height": 30,"right": 250,"bottom": 452},1000);
						// 图片 右上角 变大
						$(".goods-02").show().animate({"height": 210,"right": 290},1000);
						// 同时 白色文字渐渐显示出来
						$(".words-02").animate({"opacity": 1},500,function() {
							$(".next").fadeIn();
						});
					});
				});
			}
		},

		// 刚开始滚动就触发函数 onLeave
		onLeave: function(index,nextIndex,directon) {
			$(".next").fadeOut(); // fadeOut 使用淡出效果消失
			// 2-->3
			if(index == 2 && nextIndex == 3) {
				// 当从第二屏向第三屏滚动的时候,沙发显示并往第三屏炮  白色盒子显示
				// 沙发要往第三屏幕走  走的距离 就是 当前屏幕的高度- main到底部的高度(bottom)-沙发到main底部的距离     (当前屏幕-250)
				$(".shirt-02").show().animate({"bottom": -(k-250),"width":207,"left":260},2000,function() {
					$(".img-01-a").animate({"opacity":1},500,function() {
						$(".btn-01-a").animate({"opacity":1},500,function() {
							$(".next").fadeIn(); //fadeIn 使用淡入效果显示
						});
					});
				});
				$(".cover").show();
			}

			// 3-->4
			if(index == 3 && nextIndex == 4) {
				$(".shirt-02").hide();
				// 沙发的移动距离   当前屏幕的高度 - 250 +第三屏幕的 50
				$(".t1f").show().animate({"bottom": -((k-250)+50),"left":246},2000,function() {
					$(this).hide();
					$(".car-img").show();
					// 购物车往右走
					$(".car").animate({"left":"150%"},3000,"easeInElastic",function() {
						$(".note").show();
						$(".note-img,.word-04-a").animate({"opacity":1},1000,function() {
							$(".next").fadeIn();
						});
					});
				});
			}

			// 4-->5
			if(index == 4 && nextIndex == 5) {
				$(".hand-05").animate({"bottom":0},1500,function() {
					$(".mouse-05-a").animate({"opacity":1});
					$(".t1f-05").show().animate({"bottom":70},1000,function() {
						$(".order-05").animate({"bottom":395},function() {
							$(".next").fadeIn();
						});
					});
				});
			}

			// 5-->6
			if(index == 5 && nextIndex == 6) {
				$(".t1f-05").animate({"bottom": -(k-500),"left":"40%","width":65},1500,function() {
					$(".t1f-05").hide();
				});
				$(".box-06").animate({"left":"38%"},1500,function() {
					$(".box-06").animate({"bottom":40},500,function() {
						$(".box-06").hide();

						// 行走的过程就是 背景的移动
						// 背景Jquery 里面改变比较麻烦   backgroundPositionX  可以改变背景X坐标
						$(".section6").animate({"backgroundPositionX":"100%"},4000,function() {
							$(".boy").animate({"height":305,"bottom":116},1000,function() {
								$(".boy").animate({"right":500},500,function() {
									$(".door").animate({"opacity":1},200,function() {
										$(".girl").show().animate({"height":305,"right":350},500,function() {
											$(".pop-07").show();
										});
									});
								});
							});
						});
						$(".words-06-a").show().animate({"left":"30%"},2000,"easeOutElastic",function() {
							$(".next").fadeIn();
						});
						$(".pop-06").show();
					});
				});
			}


			// 6-->7
			if(index == 6 && nextIndex == 7) {
				setTimeout(function() {
					$(".star").animate({"width":120},1500,function() {
						$(".good-07").show();
						$(".next").fadeIn();
					});
				},1000);
			}

			// 这是第八屏动画
			// $(".beginShoping").mouseenter(function(event) {
			// 	$(".btn-08-a").show();
			// }).mouseout(function(event) {
			// 	$(".btn-08-a").hide();
			// });
			// 这个在这也没效果
			
			// 用hover更简洁，以后一个盒子鼠标经过显示离开隐藏 我们就可以用hover和toggle混搭相比也是极好的
			$(".beginShoping").hover(function(event) {
				//$(".btn-08-a").toggle(); // toggle  显示和隐藏的切换  不知为何toggle在这里的没有效果
				if (event.type == "mouseenter") {
					$(".btn-08-a").show();
				}
				if (event.type == "mouseleave") {
					$(".btn-08-a").hide();
				}
			});


			// 大手根据鼠标移动
			$(document).mousemove(function(event) {
				// 把 鼠标在页面中的坐标 给 hand 手  left  top
				var x = event.pageX - $(".hand-08").width() / 2;
				var y = event.pageY + 10;
				// 手的top值不可小于 这个大小(当前屏幕的高度k - 手的高度449)
				var minY = k - 449;
				if (y < minY) {
					y = minY;
				}
				$(".hand-08").css({"left": x,"top": y});
			});


			// 再来一次 点击按钮返回顶部
			$(".again").click(function(event) {
				// 1.返回第一屏幕
				$.fn.fullpage.moveTo(1);  // 返回第一屏
				// 2.所有的动画复原
				// 核心理论就是  让我们的图片 清除行内样式 即可
				$("img,.move").attr("style","");
			});
			
		},
	});
});