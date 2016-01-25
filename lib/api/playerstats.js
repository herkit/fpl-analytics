var request = require("request");
var Q = require("q");
var $ = require("cheerio");

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

module.exports.getTransfers = function(authtoken, callback) {

}

module.exports.getMyTeamInfo = function(authtoken, callback) {
  var deferred = Q.defer();  
  request({
    method: "get",
    uri: "http://fantasy.premierleague.com/my-team/",
    jar: authtoken
  },
  function(err, resp) {
    if (err) deferred.reject(err);
    var teamid = $(resp.body).find("#ismJSCarousel").attr("data-logged-in");
    console.log(teamid);
    deferred.resolve({ teamid: teamid });
  });
  return deferred.promise.nodeify(callback);
}