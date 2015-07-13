var milkcocoa = new MilkCocoa("noteibxtd2w3.mlkcca.com");
var lpmDataStore = milkcocoa.dataStore("LostProperty");
var name,category,imagePath,pickUpLatitude,pickUpLongitude,pickUpAddress;


function clickEvent(){
	name = document.getElementById("nameArea");
	category = document.getElementById("selectArea");
	imagePath = document.getElementById("fileInput");
	pickUpLatitude = document.getElementById("id_lat");
	pickUpLongitude = document.getElementById("id_lng");
	pickUpAddress = document.getElementById("id_address");

	console.log(name);
	sendData(name.value,category.value,imagePath.value,pickUpLatitude.value,pickUpLongitude.value,pickUpAddress.value);
}
function sendData(name,category,imagePath,pickUpLatitude,pickUpLongitude,pickUpAddress){
	lpmDataStore.push({
		name:name,
		category:category,
		imagePath:imagePath,
		pickUpLatitude:pickUpLatitude,
		pickUpLongitude:pickUpLongitude,
		pickUpAddress:pickUpAddress
	});
	name = "";
	category = "";
	imagePath = "";
	pickUpLatitude = "";
	pickUpLongitude = "";
	pickUpAddress = "";
}
