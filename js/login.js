$('.dropdown-toggle').dropdown();
$('.dropdown-menu').find('form').click(function (e) {
  e.stopPropagation();
});

var lock = new Auth0Lock('PhvoZNiNCYm0qXBVmsBXP7ZO0MJAiACe', 'shopetan.auth0.com');
var milkcocoa = new MilkCocoa("noteibxtd2w3.mlkcca.com");

var width = window.innerWidth;

function auth(err, profile, token) {
  milkcocoa.authWithToken(token, function(err, user) {
    if(err){
      console.log(err);
      return;
    }
    window.location.reload();
  });
}

if(width >= 768) {
  lock.show({
    container: 'root',
    authParams: {
      scope: 'openid profile'
    }
  }, function (err, profile, token) {
    auth(err, profile, token);
  });
}
else {
  $(".dropdown-toggle").click(function() {
    lock.show({authParams: {scope: 'openid profile'}}, function (err, profile, token) {
      auth(err, profile, token);
    });
  });
}
