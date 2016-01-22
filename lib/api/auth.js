var auth = {};

var jar = require("request").jar();
var request = require("request").defaults({ jar: jar});


module.exports.authenticate = function(username, password, callback) {
  request({ method: "get", uri: "https://users.premierleague.com" }, function(err, resp) {
    console.log(jar);
    request.post("https://users.premierleague.com/PremierUser/j_spring_security_check", { form: { j_username: username, j_password: password } }, function (err, resp) {
      console.log(resp.statusCode + ", " + resp.statusMessage);
      console.log();
      if (typeof(jar._jar.store.idx["premierleague.com"]["/"]["pluser"]) == "undefined")
      {
        callback({ error: "Not authenticated"}, null);
      } else {
        callback(null, jar);
      }
    });
  });
}