function Shade_tier() {
	var shadeTier = document.getElementsByClassName("shadeTier")[0],
		btnCancel = shadeTier.querySelector(".cancel"),
		btnSubmit = document.getElementsByClassName("submit")[0],
		iptName = document.querySelector(".name"),
		iptTel = document.querySelector(".tel");

	//正则匹配Tel
	var regT = /(^1[3578])([0-9]{9})/g;
	//正则匹配姓名
	var regN = /^[\u4E00-\u9FA5]+$/g

	btnCancel.addEventListener("click", function() {
		shadeTier.style.display = "none";
	}, false);

	btnSubmit.addEventListener("click", function() {
		var strT = iptTel.value + "";
		var strN = iptName.value + "";
		if(strT.match(regT) && strN.match(regN)) {
			shadeTier.style.display = "block";
		}
	}, false);
}
Shade_tier();