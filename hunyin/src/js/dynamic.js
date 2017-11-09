///*动态改变根元素字体大小*/
//function recalc() {
//var clientWidth = document.documentElement.clientWidth; //等于html的宽
//if(!clientWidth) return; //不支持clientWidth指令时退出
//document.documentElement.style.fontSize = 100 * (clientWidth / 640) + 'px'; //(clientWidth / 640)用html的宽除以设计图的宽度
//}
//
//function initRecalc() {
//recalc();
//var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//if(!document.addEventListener) return; //不支持监听事件直接退出
//window.addEventListener(resizeEvt, recalc, false);
//document.addEventListener('DOMContentLoaded', recalc, false);
//}
//initRecalc();

function recalc() {
	var n = document.documentElement.clientWidth;
	n && (document.documentElement.style.fontSize = n / 750 * 40 + "px")
}

function initRecalc() {
	recalc();
	var n = "osrientationchange" in window ? "orientationchange" : "resize";
	document.addEventListener && (window.addEventListener(n, recalc, !1), document.addEventListener("DOMContentLoaded", recalc, !1))
}
initRecalc();
var Anchor_li = document.querySelectorAll("#anchor li");
Anchor_li.forEach(function(n, e) {
	Anchor_li[e].addEventListener("touchstart", function() {}), Anchor_li[e].addEventListener("touchend", function() {
		n.style.background = "none", window.location.href = "#" + n.innerHTML
	})
});