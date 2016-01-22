var auth = {};
var Q = require("q");
var jar = require("request").jar();
var request = require("request").defaults({ jar: jar});


module.exports.authenticate = function(username, password, callback) {
  var deferred = Q.defer();
  request({ method: "get", uri: "https://users.premierleague.com" }, function(err, resp) {
    request.post("https://users.premierleague.com/PremierUser/j_spring_security_check", { form: { j_username: username, j_password: password } }, function (err, resp) {
      if (err) deferred.reject(err);
      if (typeof(jar._jar.store.idx["premierleague.com"]["/"]["pluser"]) === "undefined")
      {
        deferred.reject({ error: "Not authenticated"});
      } else {
        deferred.resolve(jar);
      }
    });
  });
  return deferred.promise.nodeify(callback);
}