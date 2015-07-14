$('.dropdown-toggle').dropdown();
$('.dropdown-menu').find('form').click(function (e) {
  e.stopPropagation();
});

var milkcocoa = new MilkCocoa("blueib3a6u4k.mlkcca.com");
milkcocoa.user(function(err, user) {
	if(user)$(".name").text(user.name);
});

$("#logout").click(function(){  
  milkcocoa.logout();
  window.location.href = "https://prpr-man.auth0.com/v2/logout?returnTo=http://localhost:8080/LPM/index.html";
});