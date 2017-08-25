var friendsData = require('../data/friends.js');

module.exports = function (app) {
  // Return JSON list of friends
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });
  // Post new friend to friends array and call findFriend to get match
  app.post('/api/friends', function (req, res) {
    friendsData.push(req.body);
    // Return name and photo link to callback function
    res.json(findFriend(friendsData));
  });
};

// Function to find compatible friend by comparing scores
function findFriend (data) {
  var diffArr = [];
  // Store new user scores
  var userScores = data[data.length - 1].scores;
  // Compare to existing friends list
  for (var i = 0; i < data.length - 1; i++) {
    var scores = data[i].scores;
    var diff = 0;
    for (var s = 0; s < scores.length; s++) {
      diff += Math.abs(parseInt(userScores[s]) - parseInt(scores[s]));
    }
    diffArr.push(diff);
  }
  // Find closest match and return name and photo link
  var match = diffArr.indexOf(Math.min.apply(null, diffArr));
  var name = data[match].name;
  var photo = data[match].photo;
  return {"name": name, "photo": photo};
}
