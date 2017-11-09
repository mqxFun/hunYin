/*
 * 参数：null;
 * return:null;
 * 功能：获取json,返回json
 */
function getjson(_method, _url, handle) {
	var xhr = new XMLHttpRequest();
	xhr.open(_method, _url, true);
	xhr.send();
	xhr.addEventListener("readystatechange", function() {
		/*4:接收**/
		if(xhr.readyState == 4 && xhr.status == 200) {
			var bgg = JSON.parse(xhr.responseText);
			handle("#Table", bgg);
		}
	})
}

//排行榜
var mf = function(_id, _json) {
	//选取表格元素
	var _table = document.querySelector(_id);
	var _tbody = _table.querySelector(".tbody");

	/*
	 * 参数：null;
	 * return:null;
	 * 功能：ID排序
	 */
	function idSort() {
		//获取行索引，要更改的序号
		var _tr = _table.getElementsByClassName("tr"),
			_id = _table.getElementsByClassName("id");
		//排序
		for(var i = 0; i < _tr.length; i++) {
			_id[i].textContent = (i + 1);
		}
	}
	idSort();
	/*
	 * 参数：null
	 * return:null
	 * 功能：动态插入皇冠
	 */
	function topThree() {
		var _Id = _table.getElementsByClassName("tdId");

		var ranking = ["\"../images/first.png\"", "\"../images/second.png\"", "\"../images/third.png\""];

		for(var m = 0; m < _json.length; m++) {
			if(m == ranking.length) {
				break;
			}
			_Id[m].innerHTML += "<div class='topThree'><img src=" + ranking[m] + " /></div>";
		}
	}
	/*
	 * 参数：null;
	 * return:null;
	 * 功能：宾客数量排序
	 */
	function numberSort() {
		for(var k = 0; k < _json.length; k++) {
			for(var m = k + 1; m < _json.length; m++) {
				if(_json[k].number < _json[m].number) {
					var tmp = null;
					tmp = _json[k];
					_json[k] = _json[m];
					_json[m] = tmp;
				}
			}
		}
	}
	numberSort();

	/*
	 * 参数：null；
	 * return：null；
	 * 功能：实时插入tr
	 */
	function addTr() {
		for(var j = 0; j < _json.length; j++) {
			if(j == 100) {
				break;
			}
			//行
			var msg;
			msg = "<div class='tr'>";
			msg += "<div class='td tdId'><p class='id'>1</p></div>";
			msg += "<div class='td tdImg'><img src=" + _json[j].headPortrait + " class='headPortrait'/></div>";
			msg += "<div class='td tdName'>" + _json[j].name + "</div>";
			msg += "<div class='td tdNumber'>" + _json[j].number + "位宾客</div>";
			msg += "</div>";

			//添加
			_tbody.innerHTML += msg;
		}
		idSort();
		topThree();
	}
	addTr();

	/*
	 * 
	 */
	function myRanking(i) {
		var _tr = _table.getElementsByClassName("tr");
		_tr[i - 1].className = "tr active";
		if(i <= 9) {
			_tr[i - 1].className = "tr active2";
		} else {
			_tbody.onscroll = function() {
				var _tr = _table.getElementsByClassName("tr");

				if(this.scrollTop >= (_tr[0].offsetHeight * (i - 9)) ) {
					_tr[i - 1].className = "tr active2";
				} else {
					_tr[i - 1].className = "tr active";
				}
			}
		}
	}
	myRanking(15);
}
getjson("get", "../js/data/list.json", mf);