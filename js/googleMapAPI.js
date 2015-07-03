function startFunc(){
    getLocation();
}
function getLocation(){
    var message = "get your potition";
    document.getElementById("area_name").innnerHTML = message;

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
    var message = "not available potition";
    document.getElementById("area_name").iinerHTML = massage;
}

function initializeGoogleMap(x,y) {
    var useragent = navigator.userAgent;
    document.getElementById("area_name").innnerHTML = 'fetch google map';

    var myLatlng = new google.maps.LatLng(x,y);
    var mapOptions = {
        zoom: 17,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        draggable:true,
        map: map
    });
    infotable(marker.getPosition().lat(),
              marker.getPosition().lng());
              getAreaName(myLatlng);              

    google.maps.event.addListener(map,'click',
    function(event){
        if(marker){marker.setMap(null)};
        myLatlng = event.latLng;
        marker = new google.maps.Marker({
            position:event.latLng,
            draggable:true,
            map: map
        });
    infotable(marker.getPosition().lat(),
              marker.getPosition().lng());
              getAreaName(myLatlng);

    //マーカー移動後に座標を取得するイベントの登録
    /*TODO: ここでおそらく正しく取得ができていない*/
    google.maps.event.addListener(marker,'dragend',
    function(event){
        infotable(marker.getPosition().lat(),
                  marker.getPosition().lng());
                  getAreaName(event.latLng);
    })
    getAreaName(myLatlng);
})

}
function infotable(lat,lng,level){
    document.getElementById('id_lat').innerHTML = lat;
    document.getElementById('id_lng').innerHTML = lng;
}

function getAreaName(latLngNow){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': latLngNow},
    function(results,status){
        if(status == google.maps.GeocoderStatus.OK){
            document.getElementById("area_name").innnerHTML = results[0].formatted_address+'near';
            document.getElementById('id_address').innerHTML = results[0].formatted_address.replace(/^日本, /, '');
        } else {
            document.getElementById("area_name").innnerHTML = 'error';
        }
    });
}
