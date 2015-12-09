var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Client.findAll().then(function(results){
        res.renderJsonSuccess({ Clients: results });
    });
}