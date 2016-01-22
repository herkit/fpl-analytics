var request = require("request");

module.exports.getPlayerStats = function(authtoken, playerId, callback) {
  request({
    method: "get",
    uri: "http://fantasy.premierleague.com/web/api/elements/" + playerId + "/",
    jar: authtoken
  },
  function(err, resp) {
    if (err)
      throw err;
    callback(null, resp.body);
  });
}