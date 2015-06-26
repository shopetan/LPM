$('.dropdown-toggle').dropdown();
$('.dropdown-menu').find('form').click(function (e) {
  e.stopPropagation();
});

var lock = new Auth0Lock('QuLn6EjHuNxY8Ljh935OR5mWwiuAXhnK', 'prpr-man.auth0.com');
lock.show({
  container: 'root',
  callbackURL: 'http://localhost:8080/LPM/index.html',
  responseType: 'code',
  authParams: {
    scope: 'openid profile'
  }
});
