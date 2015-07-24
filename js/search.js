var milkcocoa = new MilkCocoa("noteibxtd2w3.mlkcca.com");

var lpmDataStore = milkcocoa.dataStore('LostProperty');
var nameTextArea, categoryArea, addressRadioArea0, addressRadioArea1, addressRadioArea2, addTextArea, board, resultTable,latArea,lngArea, addrMapArea;
var lpcount, page, tr, markers,resultMap, allDataMap;


window.onload = function(){
  markers = new Array();
  alldatas = new Array();
  allDataMap = new google.maps.Map(document.getElementById("alldata_map"), {
    zoom: 8,
    center: new google.maps.LatLng(36.083486, 140.076642),
    scrollwheel: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  page = 1;
	nameTextArea = document.getElementById("name");
  addrTextArea = document.getElementById("address");
  resultHeader = document.getElementById("result_p");
  resultTable = document.getElementById('search_result');
  latArea = document.getElementById('id_lat');
  lngArea = document.getElementById('id_lng');
  addrMapArea = document.getElementById('area_name');
  tr = document.getElementsByClassName("main_row");
  $("#null_alert").css("display", "none");
  $("#map_div").css("display", "none");
  $("#result_map").css("display", "none");
  $(".div_pagination").css("text-align", "center");
  $("#page_prev").css("cursor", "pointer");
  $("#page_next").css("cursor", "pointer");
  ShowAllData();
}

// milkcocoa のテストデータを push する
function TestDataPush(name,category,imagePath, pickUpLatitude, pickUpLongitude, pickUpAddress) {
  lpmDataStore.push({name:name, category:category, pickUpLatitude:pickUpLatitude, pickUpLongitude:pickUpLongitude, pickUpAddress
    :pickUpAddress})
}

// 検索結果のテーブルをリセットする
function resultBoardInit() {
  resultTable.innerHTML = "";
}

// 検索条件を表示
function addTextResult(name, cate, addr) {
  name = escape_html(name);
  cate = escape_html(cate);
  addr = escape_html(addr);
  resultHeader.innerHTML = "名前[" + name + "] カテゴリー["+ cate + "] 住所[" + addr + "] の検索結果";
}

// 検索結果のテーブルのヘッダーを表示する
function addTableHead() {
  var head = resultTable.insertRow(0);
  head.className = "info";
  var cell1 = document.createElement("th");
  var cell2 = document.createElement("th");
  var cell3 = document.createElement("th");
  cell1.innerHTML = "名前";
  cell2.innerHTML = "カテゴリ";
  cell3.innerHTML = "住所";
  head.appendChild(cell1);
  head.appendChild(cell2);
  head.appendChild(cell3);
}

// 落し物一覧を表示する
function ShowAllData() {
  resultHeader.innerHTML = "落し物一覧";
  var count = 1;
  lpmDataStore.stream().sort("desc").size(999).next(function(err, lpm) {
    addTableHead();
    lpm.forEach(function(lp) {
      addText(lp.value.name, lp.value.category, lp.value.pickUpAddress);
      alldatas.push({position: new google.maps.LatLng(lp.value.pickUpLatitude, lp.value.pickUpLongitude), content: lp.value.name});
      var lpMarker = new google.maps.Marker({
        position: alldatas[count-1].position,
        map: allDataMap
      });
      attachMessage(lpMarker, lp.value.name, lp.value.category, lp.value.pickUpAddress);
      count++;
    })
    drawTable();
    $("#alldata_map").show();
    $("#resultmap_btn").hide();
  })
}

// ページネーションの prev を押したとき
$(document).on("click", "#page_prev" ,function() {
  if(page > 1) {
    page--;
    drawTable();
  }
});

// ページネーションの next を押したとき
$(document).on("click", "#page_next" ,function() {
  if(page < ($("tr").size() - 1) / 10) {
    page++;
    drawTable();
  }
});

// テーブルを更新
function drawTable() {
  if(page === 1) {
    $("#page_prev").addClass("disabled");
  } else {
    $("#page_prev").removeClass("disabled");
  }
  if((page > (($("tr").size() - 1) / 10)) || (Math.floor(($("tr").size() - 1) / 10) === 0)) {
    $("#page_next").addClass("disabled");
  } else {
    $("#page_next").removeClass("disabled");
  }
  $("#now_page").html(page);
  $("#now_page").addClass("active");
  $("tr").css("display", "none");
  $("tr:first, tr:gt(" + (page - 1) * 10 + "):lt(10)").show();
}

function escape_html(name){
  return name.replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, '&#39;');
}

// 検索結果の落し物の一覧を表示
function addText(name, category, address){
  var row = resultTable.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = escape_html(name);
  cell2.innerHTML = escape_html(category);
  cell3.innerHTML = escape_html(address);
  row.className = "main_row";
}

// search ボタンをクリックしたとき
function clickSearch(){
	var name = nameTextArea.value;
  categoryArea = document.forms.formCategory.select;
  var cateNo = categoryArea.selectedIndex;
  var cateName = categoryArea.options[cateNo].value;
  var addr = addrTextArea.value;
  var imagePath = "";
  var pickUpLatitude = latArea.innerHTML;
  var pickUpLongitude = lngArea.innerHTML;
  var pickUpAddress = addrMapArea.innerHTML;
  addressRadioArea0 = document.forms.formAddress.notSelectRadioBtn.checked;
  addressRadioArea1 = document.forms.formAddress.wordRadioBtn.checked;
  addressRadioArea2 = document.forms.formAddress.mapRadioBtn.checked;
  lpcount = 0;
  if(name === "" && cateNo === 0 && ((addressRadioArea1 === true && addr === "") || addressRadioArea0 === true)) {
    searchError();
  } else {
    $('#null_alert').hide();
    $("#resultmap_btn").hide();
    $("#alldata_map").hide();
    $("#search_result").show();
    $(".div_pagination").show();
    $("#result_map").hide();
    // 地図から検索するときは検索結果の地図バージョンを作成
    if(addressRadioArea2 === true) {
      // show にしてから初期化
      $("#result_map").show();
      resultMap = new google.maps.Map(document.getElementById("result_map"), {
        zoom: 12,
        center: new google.maps.LatLng(pickUpLatitude, pickUpLongitude),
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }
    if(addressRadioArea0 === true) {
      addTextResult(name, cateName, addr);
      search(cateNo, cateName, addr, pickUpLatitude, pickUpLongitude, name, 0);
    } else if(addressRadioArea1 === true) {
      addTextResult(name, cateName, addr);
      search(cateNo, cateName, addr, pickUpLatitude, pickUpLongitude, name, 1);
    } else {
      addTextResult(name, cateName, (pickUpAddress + "周辺") );
      search(cateNo, cateName, addr, pickUpLatitude, pickUpLongitude, name, 2);
    }
  }
}

function search(cat, cateName, addr, lat, lng, namae, addrNum){
	// Table をクリアにする
	resultBoardInit();

	// 検索して結果を表示する
  lpmDataStore.stream().sort("desc").size(999).next(function(err, lpm) {
  	lpm.forEach(function(lp) {
      // 0.009度 =~ 1km
  		if(((lp.value.name).indexOf(namae) != -1 || namae === "") &&
         ((addrNum === 2 && (((lp.value.pickUpLatitude - lat) < 0.018) && ((lp.value.pickUpLatitude - lat) > -0.018)) && (((lp.value.pickUpLongitude - lng) < 0.018)) && ((lp.value.pickUpLongitude - lng) > -0.018)) ||
          (addrNum === 1 && (lp.value.pickUpAddress).indexOf(addr) != -1) ||
          (addrNum === 0 && addr === "")) &&
        (cateName === lp.value.category || cat === 0)){
        if(lpcount === 0) {
          addTableHead();
          lpcount++;
  			}
  			addText(lp.value.name, lp.value.category, lp.value.pickUpAddress);
        if(addressRadioArea2 === true) {
          markers.push({position: new google.maps.LatLng(lp.value.pickUpLatitude, lp.value.pickUpLongitude), content: lp.value.name});
          var searchMarker = new google.maps.Marker({
            position: markers[lpcount-1].position,
            map: resultMap
          });
          attachMessage(searchMarker, lp.value.name, lp.value.category, lp.value.pickUpAddress);
          }
  			lpcount++;
  		}
  	});
  	// 検索結果が1件も見つからなかったとき
  	if(lpcount === 0) {
  		resultHeader.innerHTML = "検索条件に合致する落し物が見つかりませんでした。";
      $(".div_pagination").hide();
  	}
    drawTable();
    // 地図検索のとき
    if(addrNum === 2 && lpcount != 0) {
      $("#resultmap_btn").show();
      $("#result_list").hide();
    } else {
      $("#resultmap_btn").hide();
    }
  })
}

// どの項目も入力されていないとき
function searchError() {
  resultBoardInit();
  $("#null_alert").css("display", "block");
  ShowAllData();
}

// アラートを消す
function clickCloseAlert() {
  $('#null_alert').css("display", "none");
}

// 検索条件の地図を表示/非表示
$(document).on("click", "#mapRadioBtn" ,function() {
  $("#map_div").show();
});
$(document).on("click", "#notSelectRadioBtn" ,function() {
  $("#map_div").hide();
});
$(document).on("click", "#wordRadioBtn" ,function() {
  $("#map_div").hide();
});

// 検索結果の地図上のマーカーをクリックした時
function attachMessage(marker, name, category, address) {
  google.maps.event.addListener(marker, 'click', function(event) {
    new google.maps.InfoWindow({
      content: '<p class="text-info"><strong>' + name  + '</strong> (カテゴリ: ' + category + ')'  + '</p>'+ '' + address
    }).open(marker.getMap(), marker);
  });
}

// 検索結果の地図を表示/非表示
$(document).on("click", "#resultmap_btn" ,function() {
  $("#result_map").toggle();
  $("#result_list").toggle();
});
