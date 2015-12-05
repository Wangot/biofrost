var path = require('path');
var express = require('express');
var router = express.Router();

require('./merchants')(router);

module.exports = router;