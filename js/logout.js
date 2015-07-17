$('.dropdown-toggle').dropdown();
$('.dropdown-menu').find('form').click(function (e) {
  e.stopPropagation();
});

var milkcocoa = new MilkCocoa("noteibxtd2w3.mlkcca.com");
milkcocoa.user(function(err, user) {
	if(user){
		milkcocoa.dataStore("user").child(user.user_id).stream().size(1).next(function(err, data) {
			var user_data = data[0].value;
			$(".name").text(user_data.name);
		});
	}
});

$("#logout").click(function(){
  milkcocoa.logout();
  window.location.href = "https://shopetan.auth0.com/v2/logout?returnTo=http://lpmilk.tk/index.html";
});
