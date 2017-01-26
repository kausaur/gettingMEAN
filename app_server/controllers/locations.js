/* Get 'home' page */

module.exports.homelist = function(req, res) {
  res.render('index', { title: "Home" });  
};

/* Get 'location info' page */

module.exports.locationInfo = function(req, res) {
  res.render('index', { title: "Location Info" });  
};

/* Get 'home' page */

module.exports.addReview = function(req, res) {
  res.render('index', { title: "Add Review" });  
};