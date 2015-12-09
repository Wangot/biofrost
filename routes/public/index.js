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

module.exports = router;