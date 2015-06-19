$(document).ready(function () {
  var milkcocoa = new MilkCocoa("blueib3a6u4k.mlkcca.com");
  //var user_id = getUserID(); // common.jsあたりにuser_idを取得する関数
  var user_id = 0; // テスト用，後々削除します

  milkcocoa.dataStore("user").child(user_id).stream().size(1).next(function(err, data) {
    var user_data = data[0].value;
    $("#name").text(user_data.name);
    // $("#email").text(user_data.email) 認証時にemail撮って来るのめんどくさそうなので要件等
    $("#rank").append(user_data.rank);
    $("#icon").attr("src", user_data.icon_path);
  });
});
