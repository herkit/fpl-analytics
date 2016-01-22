var request = require("request");
var Q = require("q");

module.exports.getPlayerStats = function(authtoken, playerId, callback) {
  var deferred = Q.defer();  
  request({
    method: "get",
    uri: "http://fantasy.premierleague.com/web/api/elements/" + playerId + "/",
    jar: authtoken
  },
  function(err, resp) {
    if (err) deferred.reject(err);
    deferred.resolve(JSON.parse(resp.body));
  });
  return deferred.promise.nodeify(callback);
}