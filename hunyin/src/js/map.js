function showMap() {
	var map, geolocation;
	var map = new AMap.Map("map", {
		resizeEnable: true,
		zoom: 13
	});
	map.plugin('AMap.Geolocation', function() {
		geolocation = new AMap.Geolocation({
			enableHighAccuracy: true, //是否使用高精度定位，默认:true
			timeout: 10000, //超过10秒后停止定位，默认：无穷大
			buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			buttonPosition: 'RB'
		});
		map.addControl(geolocation);
		geolocation.getCurrentPosition();
		AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
		AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
	});
	//解析定位结果
	function onComplete(data) {
		Lng = data.position.getLng();
		Lat = data.position.getLat();
		request();
		console.log(Lng);
		console.log(Lat);
	}
	//定位失败后后执行
	function onError(data) {
		$(".succeed").css("display", "block")
	}

	//请求数据
	function request() {
		var xhr = new XMLHttpRequest(); //创建
		xhr.open("get", "../js/data/data.json"); //打开
		xhr.send(); //发送
		xhr.addEventListener("readystatechange", function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				show(JSON.parse(xhr.responseText));
				console.log(JSON.parse(xhr.responseText));
			}
		})
	}

	function show(res) {
		var arr = [];
		var dis;
		for(var i = 0; i < res.length; i++) {
			var dis = Math.hypot((res[i].JD - Lng), (res[i].WD - Lat));
			arr.push({
				"shopinfo": res[i],
				"dis": dis
			})
		}

		var _min = arr[0].dis,
			_minobj = {};
		for(var j = 1; j < arr.length; j++) {
			if(_min > arr[j].dis) {
				_min = arr[j].dis;
				_minobj.dis = arr[j].dis;
				_minobj.shopinfo = arr[j].shopinfo;
			}
		}
		console.log(_minobj.shopinfo.JD);
		console.log(_minobj.shopinfo.WD);
		contents = '<div class="info-title">' + _minobj.shopinfo.shop_name + '</div>' +
			'<div class="info-content">' +
			'<p>地址：' + _minobj.shopinfo.address + '</p>' +
			'<p>电话：' + _minobj.shopinfo.mobile + '</p>' +
			'<p>联系人：' + _minobj.shopinfo.contact1 + '</p>' +
			'</div>';
		var marker = new AMap.Marker({
			position: [_minobj.shopinfo.JD, _minobj.shopinfo.WD]
		});
		marker.setMap(map);
		map.plugin('AMap.AdvancedInfoWindow', function() {
			infowindow = new AMap.AdvancedInfoWindow({
				content: contents,
				offset: new AMap.Pixel(0, -30),
				// transit:true
				// driving:true,
				// walking:true,
				// asDestination:true,
			});
			infowindow.open(map, [_minobj.shopinfo.JD, _minobj.shopinfo.WD]);
		});
		marker.on('click', function() {
			infowindow.open(map, [_minobj.shopinfo.JD, _minobj.shopinfo.WD]);
		});
	}
}
showMap();