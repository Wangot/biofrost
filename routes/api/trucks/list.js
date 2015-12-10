var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Truck.findAll().then(function(results){
        res.renderJsonSuccess({ Items: results });
    });
}