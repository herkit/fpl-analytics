var auth = require("./lib/api/auth");
var stats = require("./lib/api/playerstats");
var Q = require("q");

var retrieveManyPlayers = function(token) {
  var promises = [];
  for (var playerId = 1; playerId < 10; playerId++) {
    promises.push(stats.getPlayerStats(token, playerId));
  }
  return Q.all(promises);
}

auth.authenticate(process.env.FPL_USERNAME, process.env.FPL_PASSWORD)
.then(retrieveManyPlayers)
.then(console.log)
.then(null, console.error);