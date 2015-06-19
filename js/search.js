var milkcocoa = new MilkCocoa("teaib383pmz.mlkcca.com");

var lpmDataStore = milkcocoa.dataStore('lpm');
var catDataStore = milkcocoa.dataStore('lpm/category');
var addDataStore = milkcocoa.dataStore('lpm/address');
var nameTextArea, catTextArea, addTextArea, board, lpBoard;
var lpcount;

//catDataStore.push({id:"4", name:"黄色い猫", category:"猫", address:"つくば市"})
/*
lpmDataStore.push({id:"5", name:"白猫", category:"猫", address:"牛久市"})
lpmDataStore.push({id:"6", name:"青い傘", category:"小物", address:"つくば市"})
*/

window.onload = function(){
	nameTextArea = document.getElementById("name");
  catTextArea = document.getElementById("category");
  addrTextArea = document.getElementById("address");
  resultHeader = document.getElementById("result_p");
  lpBoard = document.getElementById("search_result");

  // 落し物一覧を表示する
  lpmDataStore.stream().size(20).next(function(err, lpm) {
  	lpm.forEach(function(lp) {
  		addText("名前: " + lp.value.name + " カテゴリ: " + lp.value.category + " 住所: " + lp.value.address);
  	})
  })
}

// search ボタンをクリックしたとき
function clickEvent(){
	var name = nameTextArea.value;
  var cat = catTextArea.value;
  var addr = addrTextArea.value;
  lpcount = 0;
  addTextResult(name, cat, addr);
  search(cat, addr, name);
}

function search(cat, addr, namae){
	// Board をクリアにする
	resultBoardInit();
	// 検索して結果を表示する
  lpmDataStore.stream().size(20).next(function(err, lpm) {
  	//console.log(lpm);
  	lpm.forEach(function(lp) {
  		//console.log("全部-----" + lp.value.category + " " + lp.value.address);
  		//console.log(cat + addr)
  		// 名前の検索
  		if((lp.value.name).indexOf(namae) != -1) {
  			console.log("name match" + lp.value.name + namae);
  			addText("名前: " + lp.value.name + " カテゴリ: " + lp.value.category + " 住所: " + lp.value.address);
  			lpcount++;  			
  		}
  		// 住所の検索
  		/*
  		if(addr === lp.value.address) {
  			console.log("address match" + lp.value.address);
  			addText("名前: " + lp.value.name + " カテゴリ: " + lp.value.category + " 住所: " + lp.value.address);
  			lpcount++;
  		} else if(cat === lp.value.category) {
  			console.log("ooooo");
  			addText("名前: " + lp.value.name + " カテゴリ: " + lp.value.category + " 住所: " + lp.value.address);
  			lpcount++;
  		}
  		*/
  	});
  	//検索結果が1件も見つからなかったとき
  	if(lpcount == 0) {
  		addText("Not Found");
  	}
  })
  console.log("送信完了!");
}

/*
function addText(text){
  var msgDom = document.createElement("li");
  msgDom.innerHTML = text;
  board.insertBefore(msgDom, board.firstChild);
}
*/

// header を表示
function addTextResult(name, cate, addr) {
	resultHeader.innerHTML = name + "名前: " + name + " カテゴリー: "+ cate + " 住所: " + addr + "の検索結果";
}

// 検索結果の落し物の
function addText(text){
  var lpDom = document.createElement("li");
  lpDom.innerHTML = text;
 	lpBoard.insertBefore(lpDom, lpBoard.firstChild);
}
function resultBoardInit() {
	lpBoard.innerHTML = "";
}
/*
function res
<div class="bs-component">
          <table class="table table-striped table-hover ">
            <thead>
              <tr>
                <th>#</th>
                <th>カラムのタイトル</th>
                <th>カラムのタイトル</th>
                <th>カラムのタイトル</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
              </tr>
              <tr>
                <td>2</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
              </tr>
              <tr class="info">
                <td>3</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
              </tr>
              <tr class="success">
                <td>4</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
              </tr>
              <tr class="danger">
                <td>5</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
              </tr>
              <tr class="warning">
                <td>6</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
              </tr>
              <tr class="active">
                <td>7</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
                <td>カラムの内容</td>
              </tr>
            </tbody>
          </table> 
        </div>
*/
