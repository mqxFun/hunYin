function sugar() {
	//产生糖果
	var sugar = document.querySelector(".sugar");
	for(var i = 0; i < 40; i++) {
		sugar.innerHTML += '<img src="../images/money.jpg" style="width:25px;z-index:9999;position: absolute;left:' + Math.random() * 350+10 + 'px ;top:' + Math.random() * (-1000) + 'px;  " > ' 
	}

	//糖果掉落
	for(var k = 0; k < 40; k++) {
		$("img").eq(k).transition({
			top: Math.random() * 300 + 260,
			rotate: Math.random()*100+300+"deg",
			opacity: 0
		}, Math.random()*3000+2200,function(){
				$(this).remove();
				
		})
	}

}
sugar();