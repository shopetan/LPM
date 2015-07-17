var createObjectURL = (window.URL && window.URL.createObjectURL) ? function(file) {
    return window.URL.createObjectURL(file);
} : (window.webkitURL && window.webkitURL.createObjectURL) ? function(file) {
    return window.webkitURL.createObjectURL(file);
} : undefined;

$(document).ready(function () {
  var milkcocoa = new MilkCocoa("noteibxtd2w3.mlkcca.com");
  var fd = {};

  milkcocoa.user(function(err, user) {
    if(user) {
      milkcocoa.dataStore("user").child(user.user_id).stream().size(1).next(function(err, data) {
        var user_data = data[0].value;
        $("#name").attr("value", user_data.name);
        $("#icon").attr("src", user_data.icon_path);

        $("#submit").click(function() {
          var name = $("#name").val();
          var id = data[0].id;
          var store = milkcocoa.dataStore("user").child(user.user_id);
          store.set(id, {'name' : name,
                         'icon_path' : user_data.icon_path,
                         'rank' : user_data.rank});

          if(Object.keys(fd).length != 0){
            fd["fname"] = "images/user_icons/" + user.user_id;
            $.ajax({
              url: 'uploader.php',
              type: 'POST',
              data: fd,
              dataType: 'text'
            });
          }

          window.location.href = "user_main.html";
        });
      });
    }
    else {
      $(".container").css("display","none");
      var lock = new Auth0Lock('PhvoZNiNCYm0qXBVmsBXP7ZO0MJAiACe', 'shopetan.auth0.com');
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

  $("#input_icon").change(function(e) {
     var file = e.target.files[0];
     if(!file)return;
     if(file.type.indexOf("image") == -1)return;

     var filereader = new FileReader();
     filereader.onload = function(e){
        fd["data"] = e.target.result;
        var url = createObjectURL ? createObjectURL(file) : e.target.result;
        $("#icon").attr("src", url);
      };
      filereader.readAsDataURL(file);
  });
});
