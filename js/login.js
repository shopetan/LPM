$('.dropdown-toggle').dropdown();
$('.dropdown-menu').find('form').click(function (e) {
  e.stopPropagation();
});

var lock = new Auth0Lock('QuLn6EjHuNxY8Ljh935OR5mWwiuAXhnK', 'prpr-man.auth0.com');
var milkcocoa = new MilkCocoa("blueib3a6u4k.mlkcca.com");

lock.show({
  container: 'root',
  authParams: {
    scope: 'openid profile'
  }
}, function (err, profile, token) {
  milkcocoa.authWithToken(token, function(err, user) {
    if(err){
      console.log(err);
      return;
    }
    window.location.reload();
  });
});
