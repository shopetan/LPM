var milkcocoa = new MilkCocoa("teaib383pmz.mlkcca.com");

var lpmDataStore = milkcocoa.dataStore('lpm');
var catDataStore = milkcocoa.dataStore('lpm/category');
var addDataStore = milkcocoa.dataStore('lpm/address');
var nameTextArea, categoryArea, addTextArea, board, resultTable;
var lpcount;

//catDataStore.push({id:"4", name:"黄色い猫", category:"猫", address:"つくば市"})
/*
lpmDataStore.push({id:"5", name:"白猫", category:"猫", address:"牛久市"})
lpmDataStore.push({id:"6", name:"青い傘", category:"小物", address:"つくば市"})
*/

window.onload = function(){
	nameTextArea = document.getElementById("name");
  categoryArea = document.forms.form.select;
  addrTextArea = document.getElementById("address");
  resultHeader = document.getElementById("result_p");
  resultTable = document.getElementById('search_result');
  resultHeader.innerHTML = "落し物一覧";
  // 落し物一覧を表示する
  lpmDataStore.stream().size(20).next(function(err, lpm) {
    var count = 1;
    addTableHead();
  	lpm.forEach(function(lp) {
  		addText(count, lp.value.name, lp.value.category, lp.value.address);
  	})
  })
}

// search ボタンをクリックしたとき
function clickEvent(){
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
  		
  		if(((lp.value.name).indexOf(namae) != -1 || namae === "") && (addr === lp.value.address || addr === "") && (cateName === lp.value.category || cat === 0)){
        if(lpcount === 0) {
          console.log("aaaa");
          addTableHead();
          lpcount++;
  			}
        console.log("name match" + lp.value.name + namae);
  			addText(lpcount, lp.value.name, lp.value.category, lp.value.address);
  			lpcount++;  			
  		}
  		// 住所の検索
      /*
  		if(addr === lp.value.address) {
  			console.log("address match" + lp.value.address);
  			lpcount++;
  		} else if(cat === lp.value.category) {
  			console.log("ooooo");
  			addText("名前: " + lp.value.name + " カテゴリ: " + lp.value.category + " 住所: " + lp.value.address);
  			lpcount++;
  		}
      */
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
  resultHeader.innerHTML = "少なくとも1つ以上条件を追加してください。";
}

// header を表示
function addTextResult(name, cate, addr) {
	resultHeader.innerHTML = "名前[" + name + "] カテゴリー["+ cate + "] 住所[" + addr + "]の検索結果";
}

// 検索結果の落し物の
function addText(i, name, category, address){
  var row = resultTable.insertRow(i);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = name;
  cell2.innerHTML = category;
  cell3.innerHTML = address;
}
function resultBoardInit() {
	resultTable.innerHTML = "";
}

function addTableHead() {
  console.log("addTableHead");
  var head = resultTable.insertRow(0);
  head.className = "info";
  var cell1 = head.insertCell(0);
  var cell2 = head.insertCell(1);
  var cell3 = head.insertCell(2);
  cell1.innerHTML = "名前";
  cell2.innerHTML = "カテゴリ";
  cell3.innerHTML = "住所";
}