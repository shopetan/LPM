var milkcocoa = new MilkCocoa("teaib383pmz.mlkcca.com");

var lpmDataStore = milkcocoa.dataStore('lpm');
var catDataStore = milkcocoa.dataStore('lpm/category');
var addDataStore = milkcocoa.dataStore('lpm/address');
var nameTextArea, categoryArea, addTextArea, board, resultTable;
var lpcount;


window.onload = function(){
  //TestDataPush();
	nameTextArea = document.getElementById("name");
  categoryArea = document.forms.form.select;
  addrTextArea = document.getElementById("address");
  resultHeader = document.getElementById("result_p");
  resultTable = document.getElementById('search_result');
  $("#null_alert").css("display", "none");
  ShowAllData();
}

// milkcocoa のテストデータを push する
function TestDataPush() {
  lpmDataStore.push({id:"3", name:"黄色い傘", category:"傘", lat:"36.10636387079253", lng:"140.1116754859686", address:"〒305-0005 茨城県つくば市天久保４丁目５−１８"})
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
  var cell1 = head.insertCell(0);
  var cell2 = head.insertCell(1);
  var cell3 = head.insertCell(2);
  var cell4 = head.insertCell(3);
  var cell5 = head.insertCell(4);
  cell1.innerHTML = "名前";
  cell2.innerHTML = "カテゴリ";
  cell3.innerHTML = "住所";
  cell4.innerHTML = "緯度";
  cell5.innerHTML = "軽度";
}

// 落し物一覧を表示する
function ShowAllData() {
  resultHeader.innerHTML = "落し物一覧";
  lpmDataStore.stream().size(20).next(function(err, lpm) {
    var count = 1;
    addTableHead();
    lpm.forEach(function(lp) {
      addText(count, lp.value.name, lp.value.category, lp.value.address, lp.value.lat, lp.value.lng);
    })
  })
}

// 検索結果の落し物の一覧を表示
function addText(i, name, category, address, latitude, longitude){
  var row = resultTable.insertRow(i);
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
}

// search ボタンをクリックしたとき
function clickSearch(){
	var name = nameTextArea.value;
  var cateNo = categoryArea.selectedIndex;
  var cateName = categoryArea.options[cateNo].value;
  var addr = addrTextArea.value;
  lpcount = 0;
  if(name === "" && cateNo === 0 && addr === "") {
    searchError();
  } else {
    addTextResult(name, cateName, addr);
    search(cateNo, cateName, addr, name);
    //console.log("条件" + cateNo + addr + name);
  }
}

function search(cat, cateName, addr, namae){
  console.log(cat + cateName, addr, namae)
	// Table をクリアにする
	resultBoardInit();

	// 検索して結果を表示する
  lpmDataStore.stream().size(20).next(function(err, lpm) {
  	//console.log(lpm);
  	lpm.forEach(function(lp) {
  		//console.log("全部-----" + lp.value.category + " " + lp.value.address);
  		//console.log(cat + addr)
  		if(((lp.value.name).indexOf(namae) != -1 || namae === "") && ((lp.value.address).indexOf(addr) != -1  || addr === "") && (cateName === lp.value.category || cat === 0)){
        if(lpcount === 0) {
          console.log("aaaa");
          addTableHead();
          lpcount++;
  			}
        console.log("name match" + lp.value.name + namae);
  			addText(lpcount, lp.value.name, lp.value.category, lp.value.address, lp.value.lat, lp.value.lng);
  			lpcount++;  			
  		}
  	});
  	//検索結果が1件も見つからなかったとき
  	if(lpcount === 0) {
  		resultHeader.innerHTML = "検索条件に合致する落し物が見つかりませんでした。";
  	}
  })
  console.log("送信完了!");
}

// どの項目も入力されていないとき
function searchError() {
  console.log("ERROR");
  resultBoardInit();
  $("#null_alert").css("display", "block");
  ShowAllData();
}

// アラートを消す
function clickCloseAlert() {
  $('#null_alert').css("display", "none");
}


