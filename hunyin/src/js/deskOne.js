//点击取消进入界面的默认遮罩层
function loginBtn() {
	$(".start .popup .in").on("mousedown", function() {
		$(".start").css("display", "none");
	})
	$(".start .popup i").on("mousedown", function() {
		$(".start").css("display", "none");
	})
}

loginBtn();

//点击控制音乐开关
function musicBtn() {
	$(".audioBtn").on("mousedown", function() {
		if($(".music")[0].paused) {
			$(".music")[0].play();
			$(".audioBtn i").removeClass("icon-yinleguanbi").addClass("icon-yinle1");
		} else {
			$(".music")[0].pause();
			$(".audioBtn i").removeClass("icon-yinle1").addClass("icon-yinleguanbi");
		}
	})
}

musicBtn();

//点击添加桌子
function addDesk() {
	var i = 5;
	$(".deskS p").on("mousedown", function() {
		
		i++;
		var add = '<div class="next"><div class="bigCircle  deski"><p>第' + i + '席</p><div class="smallCircle postOne"><i class="iconfont icon-geren" datevalue="1"></i></div><div class="smallCircle postTwo"><i class="iconfont icon-geren" datevalue="2"></i></div><div class="smallCircle postThr"><i class="iconfont icon-geren" datevalue="3"></i></div><div class="smallCircle postFou"><i class="iconfont icon-geren" datevalue="4"></i></div><div class="smallCircle postFiv"><i class="iconfont icon-geren" datevalue="5"></i></div><div class="smallCircle postSix"><i class="iconfont icon-geren" datevalue="6"></i></div></div></div>';
		$(this).parent().parent().before(add);
		
		chooseSeat();
		inSeat();
	})
}

addDesk();

//点击放大桌子，挑选座位
function chooseSeat() {
	
	$(".deski p").on("mousedown", changeBig)

	function changeBig() {
		btn=true;
		xm = $(this);
		//获取屏幕中心点位置
		var top = document.querySelector("body").clientHeight / 2;
		var left = document.querySelector("body").clientWidth / 2;
		//获取点击桌子的宽高
		var height = $(this).height();
		var width = $(this).width();
		//获取点击桌子当前的位置
		var deskLeft = $(this).offset().left;
		var deskTop = $(this).offset().top;
		//计算当前位置与屏幕中点的距离
		var distanceTop = top - deskTop;
		var distanceLeft = left - deskLeft;
		xm.off("mousedown");

		//桌子放大动画
		$(this).parent().transition({
			y: distanceTop - height / 2,
			x: distanceLeft - width / 2,
			scale: 2
		}, 1000, function() {
			$(this).addClass('active');
		})

		//其余部分隐藏
		for(var k = 0; k < $(".deski").length; k++) {
			$(".deski").eq(k).css("opacity", 0);
		}
		$(this).parent().css("opacity", 1);
		$(this).parent().parent().append("<div class='bgg'></div>"); //添加隔断层
		$(".deskS").css("opacity", 0); //添加桌子隐藏
		$(".font .rank").css("display", "none"); //底部文字隐藏
		$(".homePage").css("display", "none"); //返回主页图标隐藏
		$(".desk").css("overflow","hidden");
		//点击取消新婚祝福遮罩层
		$(".shade .popup .close").on("click", function() {
			$(".shade").css("display", "none")
		})

		//点击隔断层缩小桌子
		$(".bgg").on("click", function() {
			if(btn == true) {
				btn = false;
				xm.parent().removeClass('active');
				$(".font p.var").css("display", "none");
				xm.parent().transition({
					x: 0,
					y: 0,
					scale: [1, 1]
				}, 1000, function() {
					$(".deskS").css("opacity", 1);
					$(".font .rank").css("display", "block");
					$(".homePage").css("display", "block");
					$(".bgg").remove();
					$(".desk").css("overflow","scroll");
					xm.on("mousedown", changeBig);
					for(var k = 0; k < $(".deski").length; k++) {
						$(".deski").eq(k).css("opacity", 1);
					}
				})
			}

		})
		//点击除桌子以外的其余部分缩小
		//					$(document).mousedown(function(e) {                  
		//						var cont = $('.smallCircle');
		//						if(!cont.is(e.target) && cont.has(e.target).length === 2) {
		//							xm.parent().transition({
		//								x: 0,
		//								y: 0,
		//								scale: [1, 1]
		//							}, 1000, function() {
		//								$(".desk").css("overflow", "scroll");
		//								xm.removeClass('active');
		//								$(".font p.var").css("display", "none");
		//								$(".deskS").css("opacity", 1);
		//								$(".font .rank").css("display", "block");
		//								$(".homePage").css("display", "block");
		//								$(".bgg").remove()
		//			
		//								for(var k = 0; k < $(".deski").length; k++) {
		//									$(".deski").eq(k).css("opacity", 1);
		//								}
		//							})
		//						}
		//					});

	}
}
chooseSeat();

//用户点击入席	
function inSeat() {
	$(".smallCircle i").off("click").on("click", function() {
		if($(this).parent().parent().hasClass("active") == true) { //只有在桌子放大情况下才能选座位
			console.log($(this).css("color"));
//			alert(123);
			if($(this).css("color") == "rgb(255, 255, 0)") {
//				alert(123);
				alert("这个座位有人啦");
				return;
			} else {
				for(var k = 0; k < $(".smallCircle i").length; k++) {
					$(".smallCircle i").eq(k).css("color", "rgb(191, 12, 33)");
					$(this).css("color", "rgb(255, 255, 0)");
					$(".shade").css("display", "block"); //遮罩层出现
					$(".font p.var").css("display", "block"); //座位字出现
					$(".dsekNum").text($(this).parent().parent().children("p").text()); //座位可变字获取
					$(".postNum").text($(this).attr("datevalue"));
				}
			}

		}
	})
}
inSeat();
