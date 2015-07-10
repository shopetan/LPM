$(document).ready( function(){
	var milkcocoa = new MilkCocoa("uniibxnu8d4.mlkcca.com");
	var lpmDataStore = milkcocoa.dataStore("LostProperty");
	var name,category,imagePath,pickUpLatitude,pickUpLongitude,pickUpAddress;
	name = document.getElementById("nameArea");
  	category = document.getElementById("selectArea");
	imagePath = document.getElementById("fileInput");
	pickUpLatitude = document.getElementById("id_lat");
	pickUpLongitude = document.getElementById("id_lng");
	pickUpAddress = document.getElementById("id_address");

	function clickEvent(){
		sendData(name.value,category.value,imagePath.value,pickUpLatitude.value,pickUpLongitude.value,pickUpAddress.value);
	}
	function sendData(){
		lpmDataStore.push({name:name.value, category:category.value, imagePath:imagePath.value, pickUpLatitude:pickUpLatitude.value, pickUpLongitude:pickUpLongitude.value, pickUpAddress:pickUpAddress.value});
		name = "";
		category = "";
		imagePath = "";
		pickUpLatitude = "";
		pickUpLongitude = "";
		pickUpAddress = "";
	}
});
