$(function() {
	var volume = 1;

	video = $("video").get(0);  // 把jquery对象转换成dom对象

	video.oncanplay = function() {
		// 1.视频加载完成，隐藏load图片
		$(".v-player").removeClass("load"); // 清除背景
		$("video").show(); // 显示视频

		// 2.计算视频时间，显示视频总时长，转化为 00:00:00
		var timeIn = timefor(video.duration); // 视频总时长

		$(".total").html(timeIn);

		// 3.点击播放键，开始播放视频，fa-play-->fa-pause
		$(".btn-1").click(function() {
			if($(".btn-1>i").hasClass("fa-play")) {
				video.play();
				$(".btn-1>i").removeClass("fa-play").addClass("fa-pause");
			}else {
				video.pause();
				$(".btn-1>i").removeClass("fa-pause").addClass("fa-play");
			}
			
		});

		// var volumeOn = video.volume; // 当前音量 最大音量为1

		var w = video.volume * 100 + "%";

		$(".volume-line").css("width",w);

	}
	video.ontimeupdate = function() {
		// 4.开始计算视频当前时间，转化为 00:00:00
		var timeOn = timefor(video.currentTime); // 视频当前时长
		// console.log(timeOn);
		$(".current").html(timeOn);

		// 5.播放后，进度条开始移动，视频当前时间/视频总时长*100，修改line的widht时，记得添加"%"
		var w = video.currentTime / video.duration * 100 + "%";

		$(".line").css("width",w);

	}

	// 6.全屏操作，fa-arrows-alt-->fa-compress
	// 问题1: 全屏后，视频的菜单不是我制作的那个
	// 问题2: 全屏时，无法显示我制作的那个视频菜单
	$(".btn-5").click(function() {
		if($(".btn-5>i").hasClass("fa-arrows-alt")){
			// video.webkitRequestFullScreen(); //全屏显示
			// 兼容性
			if(video.requestFullScreen) {  // 正常浏览器 
			 	video.requestFullScreen();
			} else if (video.webkitRequestFullScreen) {  // webkit 内核
			 	video.webkitRequestFullScreen();
			} else if (video.mozRequestFullScreen) {  // moz
			 	video.mozRequestFullScreen();
			} else if (video.msRequestFullscreen) {  // ms 微软  这里面有个坑 别掉进去了
			 	video.msRequestFullscreen(); //  ms 里面这样写msRequestFullscreen()     s是小写的  
			} else {   // 欧朋
			 	video.RequestFullScreen();
			}
			$(".btn-5>i").removeClass("fa-arrows-alt").addClass("fa-compress");
		}else {
			document.webkitCancelFullScreen(); //取消全屏显示 与元素无关
			$(".btn-5>i").removeClass("fa-compress").addClass("fa-arrows-alt");
		}
	});
	
	
	// 制作时分秒函数  将秒转换成00:00:00
	function timefor(time) {
		var h = Math.floor(time / 3600); //小时  取整 (time / 3600)
		var m = Math.floor(time % 3600 / 60); //分钟 取余(time % 3600) 再取整 (* / 60)
		var s = Math.floor(time % 60); //秒 取余(time % 60)  能被60整除的部分均可换化为小时和分钟
		// 00:00:00 ===> 时:分:秒
		return (h<10 ? "0" +h : h) +":"+ (m<10 ? "0" +m : m) +":"+ (s<10 ? "0" +s : s);
	}
	
	// 7.拖动进度条，实现视频跳转
	// 鼠标在进度条上面就获取位置
	$(".btn-2").mousemove(function(event) {
		$(".bar").css("width",event.offsetX);
		// console.log(123);
	});

	// 鼠标离开就恢复为0
	$(".btn-2").mouseleave(function(event) {
		$(".bar").css("width",0);
	});

	// 鼠标点击，就跳转
	// 跳转完后，就无法点击暂停
	$(".btn-2").mouseup(function() {
		if(video.duration > 0 ) {
			if($(".bar").width() < $(".line").width()) {
				var timec =  $(".line").width() / $(".btn-2").width() * video.duration - $(".bar").width() / $(".btn-2").width() *video.duration;
				// console.log("后退了"+timec+"s");
				tis("后退了"+Math.round(timec)+"s");
			}else {
				var timec =  $(".bar").width() / $(".btn-2").width() * video.duration - $(".line").width() / $(".btn-2").width() *video.duration;
				// console.log("快进了"+timec+"s");
				tis("快进了"+Math.round(timec)+"s");
			}
			video.currentTime = $(".bar").width() / $(".btn-2").width() * video.duration;
			// console.log($(".bar").width() / $(".btn-2").width() * video.duration);
		}
	});
	
	
	// 8.音量键，点击静音 *-->fa-volume-off ，再点击恢复音量 fa-volume-off-->*
	$(".btn-4").click(function() {
		if($(".btn-4>i").hasClass("fa-volume-off")) {
			video.volume = volume;
		}else {
			video.volume = 0;
		}
	});

	// 9.音量条
	video.onvolumechange = function() {
		var w = video.volume * 100 + "%";

		$(".volume-line").css("width",w);

		if(video.volume >= 0.5) {
			$(".btn-4>i").removeClass("fa-volume-down fa-volume-off").addClass("fa-volume-up");
		}
		if(video.volume < 0.5 && video.volume > 0) {
			$(".btn-4>i").removeClass("fa-volume-up fa-volume-off").addClass("fa-volume-down");
		}
		if(video.volume == 0) {
			$(".btn-4>i").removeClass("fa-volume-up fa-volume-down").addClass("fa-volume-off");
		}
	}
	
	$(".volume").mousemove(function(event) {
		$(".volume-bar").css("width",event.offsetX);
	});

	// 鼠标离开就恢复为0
	$(".volume").mouseleave(function(event) {
		$(".volume-bar").css("width",0);
	});

	// 鼠标点击，修改音量
	$(".volume").mouseup(function() {
		if(video.duration > 0 ) {
			if($(".volume-bar").width() < $(".volume-line").width()) {
				var volumec =  $(".volume-line").width() / $(".volume").width() - $(".volume-bar").width() / $(".volume").width();
				// console.log("音量减少了"+volumec*100);
				tis("音量减少了"+Math.round(volumec*100));
			}else {
				var volumec =  $(".volume-bar").width() / $(".volume").width() - $(".volume-line").width() / $(".volume").width();
				// console.log("音量增加了"+volumec*100);
				tis("音量增加了"+Math.round(volumec*100));
			}
			video.volume = $(".volume-bar").width() / $(".volume").width();
			volume = video.volume
			//console.log($(".volume-bar").width() / $(".volume").width());
		}
	});
	// 10.播放完毕，重置操作
	video.onended = function() {
		video.currentTime = 0;
		$(".btn-1>i").removeClass("fa-pause").addClass("fa-play");
		$(".btn-5>i").removeClass("fa-compress").addClass("fa-arrows-alt");
	}
	// 11.菜单显示 5s消失
	// 鼠标悬停时，显示,停止5s 消失
	var hide = 0;
	$(".v-player").mousemove(function(event) {
		clearInterval(hide);
		$(".menu").show();
		hide = setInterval(function() {
			$(".menu").hide();
		},5000);
	});

	// 鼠标离开时，消失
	$(".v-player").mouseleave(function() {
		$(".menu").hide();
	});
	
	// 
	// 进度条/音量提示
	function tis(Text) {
		$(".tis").html(Text);
		// var TextW = $(".tis").get(0).scrollWidth+10;
		var TextW = $(".tis").width()+10;
		console.log(TextW);
		if($(".tis").css("opacity") == 0) {
			$(".tis").animate({"opacity":1,"width":TextW},500,function() {
				$(".tis").animate({"opacity":0},2000,function() {
					$(".tis").attr("style","");
				});
			});
		}if($(".tis").css("opacity") > 0) {
			$(".tis").animate({"opacity":1,"width":TextW},500,function() {
				$(".tis").attr("style","");
			});
		}
	}

	// 额外. 添加播放任意视频，FileRead操作
	var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
	$("#btnUrl").click(function() {
		if($("#url").val() == "") {
			$("#url").val("请输入视频链接");
		}else if($("#url").val() != "" ) {
			if(!reg.test($("#url").val())){
				$("#url").val("这网址不是以http://或https://开头，或者不是网址！");
			}else{
				$("video").attr("src",$("#url").val());
				// video.load();
				// 刷新按钮
				video.currentTime = 0;
				$(".btn-1>i").removeClass("fa-pause").addClass("fa-play");
				$(".btn-5>i").removeClass("fa-compress").addClass("fa-arrows-alt");
			}
		}
	});

});




