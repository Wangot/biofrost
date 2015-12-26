var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Delivery.findAll({
    	include: [
            {
                model: models.Item,
                through: { attributes: ['description', 'quantity'] }
            },
            {
                model: models.Truck
            },
            {
                model: models.Employee
            }
    	]
    }).then(function(results){
        res.renderJsonSuccess({ Deliveries: results });
    });
}