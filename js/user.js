$(document).ready(function () {
  var milkcocoa = new MilkCocoa("blueib3a6u4k.mlkcca.com");
  
  milkcocoa.user(function(err, user) {
    if(user) {
      milkcocoa.dataStore("user").child(user.user_id).stream().size(1).next(function(err, data) {
        var user_data = data[0].value;
        $("#name").text(user_data.name);
        $("#rank").append(user_data.rank);
        $("#icon").attr("src", user_data.icon_path);
      });
    }
  });
});
