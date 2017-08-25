var path = require('path');

module.exports = function (app) {
  // Set survey path
  app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/survey.html'));
  });
  // All other paths point to home
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });
};
