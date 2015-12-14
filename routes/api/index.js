var path = require('path');
var express = require('express');
var router = express.Router();

require('./items')(router);
require('./clients')(router);
require('./merchants')(router);
require('./deliveries')(router);
require('./employees')(router);
require('./orders')(router);
require('./trucks')(router);

module.exports = router;