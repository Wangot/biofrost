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
  	res.renderLayout('privatespace/index', { title: 'Hello' }, 'privatespace');
});

router.all('/*', function(req, res) {
    res.renderLayout('privatespace/index', { title: 'Hello' }, 'privatespace');
});

module.exports = router;