var express = require('express');
var router = express.Router();

var path = require('path');
// var passport = require('passport');
var models = require(path.resolve("./models/orm"));
// var auth = require(path.resolve("./models/auth"));
// var i18n = require("i18next");

/* GET home page. */
router.get('/', function(req, res) {
    // res.redirect('/login'); return;
  	res.renderLayout('public/home', { title: 'Express' });
});


// handler of templates for angular view
// @TODO : enhance this add some validation
router.get('/templates/:path*', function(req, res) {
  var referer = req.headers.referer;

  // the the path of the file
  var path = req.originalUrl.replace('/templates', '');
  // must have referer (ajax call) else show 404
  // add redirection to 404 here
  if (!referer) return;
  if (!path) return;  // might want to change this
  // add checker for folder is available
  res.render( 'angular-templates/' + path );
});

module.exports = router;