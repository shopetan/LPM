function initializeGoogleMap() {
  var latlng = new google.maps.LatLng(35.361056,138.731918);
  var opts = {
    zoom: 10,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), opts);
}
