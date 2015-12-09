var path = require('path');
var express = require('express');
var router = express.Router();

require('./items')(router);
require('./clients')(router);
require('./merchants')(router);
require('./deliveries')(router);

module.exports = router;