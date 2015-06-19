function startFunc(){
    getLocation();
}
function getLocation(){
    document.getElementById("area_name").innnerHTML = 'get your potition';

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
    } else {
        message = "this Browser do not use GeolocationAPI";
        document.getElementById("area_name").innnerHTML = massage;
    }
}
function successCallback(pos) {
    var Potition_latitude  = pos.coords.latitude;
    var Potition_longitude = pos.coords.longitude;

    initializeGoogleMap(Potition_latitude,Potition_longitude);
}

function errorCallback(srror) {
    message = "not available potition";
    document.getElementById("area_name").iinerHTML = massage;
}

function initializeGoogleMap(x,y) {
    var useragent = navigator.userAgent;
    document.getElementById("area_name").innnerHTML = 'fetch google map';

    var myLatLng = new google.maps.LatLng(x,y);
    var mapOptions = {
        zoom: 17,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var marker = new google.maps.maps.Marker({
        position: myLatLng,
        map: map,
        title:"your position"
    });
    getAreaName(myLatlng);
}

function getAreaName(latLngNow){
    var geocoder = new google.maps.Geocoder();
    geocorder.geocode({latLng: latLngNow},function(results,status){
        if(status == google.maps.GeocoderStatus.OK){
            document.getElementById("area_name").innnerHTML = resulets[0].formatted_address+'near';
        } else {
            document.getElementById("area_name").innnerHTML = 'error';
        }
    });
}
