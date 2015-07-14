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
    else {
      $(".container").css("display","none");
      var lock = new Auth0Lock('QuLn6EjHuNxY8Ljh935OR5mWwiuAXhnK', 'prpr-man.auth0.com');
      lock.show({authParams: {scope: 'openid profile'}}, function (err, profile, token) {
        milkcocoa.authWithToken(token, function(err, user) {
          if(err){
            console.log(err);
            return;
          }
          window.location.href = "index.html";
        });
      });
    }
  });
});
