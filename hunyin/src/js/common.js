window.onload =function(){
	document.getElementById("bgsound").play();
}

/********背景音乐*********/
function audioAutoPlay(id){
    var audio = document.getElementById(id);
//  audio.loop=true;
//  audio.play();
    document.addEventListener("WeixinJSBridgeReady",function(){
            audio.play();
    }, false);
    
}
audioAutoPlay('bgsound');
    var music = document.getElementById("bgsound");
$(".music").click(function() {
	$(".music").toggleClass("icon-yinleguanbi icon-yinle1");
	if(music.paused){
        music.play();
    }else{
        music.pause();
    }
})

/**************取消按钮****************/
function cancel(){
	$(".quxiao").on("click", function() {
		$(".shade").css("display", "none")
	})
}
cancel();


