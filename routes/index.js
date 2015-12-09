var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();

module.exports = function(app){
    app.use('/', require('./public'));
    app.use('/api', require('./api'));
	app.use('/', router);
};