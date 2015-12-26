var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Invoice.findAll({
    	include: [
            {
                model: models.Payment
            },
            {
                model: models.Client
            }
    	]
    }).then(function(results){
        res.renderJsonSuccess({ Invoices: results });
    });
}