$(".btnD").on("click", function() {
	var val = $("#val").val();
	if(val == "广东") {
		$(".hn").removeClass("active");
		$(".gd").addClass("active");
		$("#val").val("海南");
		$(".i").css({
			"transform": "rotate(360deg)"
		})
	} else if(val == "海南") {
		$(".gd").removeClass("active");
		$(".hn").addClass("active");
		$("#val").val("广东");
	}
})
/**************求和****************/
function sum() {
	var sum = 0;
	$(".lingqu .num").each(function() {
		sum += parseInt($(this).text());
	});
	$(".font .num").text(9999 - sum);
}
sum();

/**************取消按钮****************/
function cancel(){
	$(".quxiao").on("click", function() {
		$(".succeed").css("display", "none")
	})
}
cancel();


/**************兑换页面***************/
function con() {
	/***兑换码***/
	var Code=[
		{"code":123456},
		{"code":654321},
		{"code":111111},
		{"code":222222},
		{"code":333333},
		{"code":444444},
		{"code":555555},
		{"code":666666},
		{"code":777777},
		{"code":888888},
		{"code":999999}
	];
	
	var bgg =true;
	$(".affirm").click(function(){
		for(var i=0;i<Code.length;i++){
			if($(".cod").val() == Code[i].code) {
				bgg =false;
			}
		}
		if(bgg === false) {
			bgg =true;
			$(".win").css("display", "block");
		} else {
			$(".be").css("display", "block");
		}
	})
	$(".shuru").click(function() {
		$(".be").css("display", "none");
	})
}
con();