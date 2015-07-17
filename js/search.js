var milkcocoa = new MilkCocoa("noteibxtd2w3.mlkcca.com");

var lpmDataStore = milkcocoa.dataStore('LostProperty');
var nameTextArea, categoryArea, addTextArea, board, resultTable,latArea,lngArea, addrMapArea;
var lpcount, page, tr;


window.onload = function(){
  //TestDataPush();
  page = 1;
	nameTextArea = document.getElementById("name");
  categoryArea = document.forms.form.select;
  addrTextArea = document.getElementById("address");
  resultHeader = document.getElementById("result_p");
  resultTable = document.getElementById('search_result');
  latArea = document.getElementById('id_lat');
  lngArea = document.getElementById('id_lng');
  addrMapArea = document.getElementById('id_address');
  tr =  document.getElementsByClassName("main_row");
  $("#null_alert").css("display", "none");
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
  resultHeader.innerHTML = "名前[" + name + "] カテゴリー["+ cate + "] 住所[" + addr + "]の検索結果";
}

// 検索結果のテーブルのヘッダーを表示する
function addTableHead() {
  var head = resultTable.insertRow(0);
  head.className = "info";
  var cell1 = document.createElement("th");
  var cell2 = document.createElement("th");
  var cell3 = document.createElement("th");
  var cell4 = document.createElement("th");
  var cell5 = document.createElement("th");
  cell1.innerHTML = "名前";
  cell2.innerHTML = "カテゴリ";
  cell3.innerHTML = "住所";
  cell4.innerHTML = "緯度";
  cell5.innerHTML = "経度";
  head.appendChild(cell1);
  head.appendChild(cell2);
  head.appendChild(cell3);
  head.appendChild(cell4);
  head.appendChild(cell5);
}

// 落し物一覧を表示する
function ShowAllData() {
  resultHeader.innerHTML = "落し物一覧";
  var count = 1;
  lpmDataStore.stream().size(100).next(function(err, lpm) {
    addTableHead();
    lpm.forEach(function(lp) {
      addText(lp.value.name, lp.value.category, lp.value.pickUpAddress, lp.value.pickUpLatitude, lp.value.pickUpLongitude);
      count++;
    })
    drawTable();
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
  if(page > (($("tr").size() - 1) / 10)) {
    $("#page_next").addClass("disabled");
  } else {
    $("#page_next").removeClass("disabled");
  }
  $("#now_page").html(page);
  $("now_page").addClass("active");
  $("tr").css("display", "none");
  $("tr:first, tr:gt(" + (page - 1) * 10 + "):lt(10)").show();
}


// 検索結果の落し物の一覧を表示
function addText(name, category, address, latitude, longitude){
  var row = resultTable.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = name;
  cell2.innerHTML = category;
  cell3.innerHTML = address;
  cell4.innerHTML = latitude;
  cell5.innerHTML = longitude;
  row.className = "main_row";
}

// search ボタンをクリックしたとき
function clickSearch(){
	var name = nameTextArea.value;
  var cateNo = categoryArea.selectedIndex;
  var cateName = categoryArea.options[cateNo].value;
  var addr = addrTextArea.value;
  var imagePath = "";
  var pickUpLatitude = latArea.innerHTML;
  var pickUpLongitude = lngArea.innerHTML;
  var pickUpAddress = addrMapArea.innerHTML;
  //TestDataPush(name, cateName, imagePath, pickUpLatitude, pickUpLongitude, pickUpAddress);
  lpcount = 0;
  if(name === "" && cateNo === 0 && addr === "") {
    searchError();
  } else {
    addTextResult(name, cateName, addr);
    search(cateNo, cateName, addr, name);
  }
}

function search(cat, cateName, addr, namae){
	// Table をクリアにする
	resultBoardInit();

	// 検索して結果を表示する
  lpmDataStore.stream().size(100).next(function(err, lpm) {
  	lpm.forEach(function(lp) {
  		if(((lp.value.name).indexOf(namae) != -1 || namae === "") && ((lp.value.address).indexOf(addr) != -1  || addr === "") && (cateName === lp.value.category || cat === 0)){
        if(lpcount === 0) {
          addTableHead();
          lpcount++;
  			}
  			addText(lp.value.name, lp.value.category, lp.value.address, lp.value.pickUpLatitude, lp.value.pickUpLongitude);
  			lpcount++;
  		}
  	});
  	//検索結果が1件も見つからなかったとき
  	if(lpcount === 0) {
  		resultHeader.innerHTML = "検索条件に合致する落し物が見つかりませんでした。";
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
