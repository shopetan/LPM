function writeNavbar(){
	$.ajax({
		url: "navbar.html", //index.htmlの階層が基準
		cache: false,
		async: false,
		success: function(html) {
			document.write(html);
		}
	});
}
function writeFooter(){
	$.ajax({
		url: "footer.html", //index.htmlの階層が基準
		cache: false,
		async: false,
		success: function(html) {
			document.write(html);
		}
	});
}

function _loginManager(){
  $.ajax({
    url: "_login.html",
    cache: false,
    async: false,
    success: function(html) {
      $(".login").append(html);
    }
  });

  var element = document.createElement('script');
  element.type = 'text/javascript';
  element.src = "js/login.js";
  document.body.appendChild(element);
}

function _logoutManager(){
  $.ajax({
    url: "_logout.html",
    cache: false,
    async: false,
    success: function(html) {
      $(".login").append(html);
    }
  });

  var element = document.createElement('script');
  element.type = 'text/javascript';
  element.src = "js/logout.js";
  document.body.appendChild(element);
}


function writeLoginMenu() {
  var milkcocoa = new MilkCocoa("blueib3a6u4k.mlkcca.com");

  milkcocoa.user(function(err, user) {
    if(err){
      console.log(err);
      _loginManager();
    }
    if(user) {
      _logoutManager();
    } else {
      _loginManager();
    }
  });
}