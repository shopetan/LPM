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

function setUserInfo(user, milkcocoa) {
  var user_data = milkcocoa.dataStore('user').child(user.user_id);
  user_data.stream().size(1).next(function(err, data) {
    if(data.length == 0) {
      $.ajax({
        url: 'downloader.php',
        type: 'POST',
        dataType: 'json',
        data: {
          url: user.picture,
          file_name: user.user_id
        },
        success: (function(data) {
          var d = JSON.parse(data);
          if (d["result"] === "success") {
            user_data.push({'name' : user.name,
                            'icon_path' : 'images/user_icons/' + d["file_name"],
                            'rank' : '1'});
          } else if (d["result"] === "error") {
            alert("Error occurred: " + d["message"]);
          } else {
            alert("Undefined Server Error!");
          }
        }),
        error: (function(data) {
          alert("Undefined Server Error!");
        })
      });

    }
  });
}

function writeLoginMenu() {
  var milkcocoa = new MilkCocoa("noteibxtd2w3.mlkcca.com");

  milkcocoa.user(function(err, user) {
    if(err){
      console.log(err);
      _loginManager();
      return;
    }
    if(user) {
      setUserInfo(user, milkcocoa);
      _logoutManager();
    } else {
      _loginManager();
    }
  });
}
