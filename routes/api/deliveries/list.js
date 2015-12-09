var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Delivery.findAll({include: [{all:true}]}).then(function(results){
        res.renderJsonSuccess({ Deliveries: results });
    });
}