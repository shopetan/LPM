$("#logout").click(function(){
  var lock = new Auth0Lock('QuLn6EjHuNxY8Ljh935OR5mWwiuAXhnK', 'prpr-man.auth0.com');
  lock.logout({"http://localhost:8080/LPM/index.html"});
});

