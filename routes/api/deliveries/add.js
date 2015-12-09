var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
	// req.body
	var delivery = {
		description: "this is a delivery",
		DeliveryItems: [
			{
				quantity: 10,
				item_id: 1,
			}
		]
	}

    return models.sequelize.transaction(function (t) { 
        return models.Delivery.create(delivery, {transaction: t});
    }).then(function(resultObj){
       res.renderJsonSuccess({ Delivery: resultObj });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the deliveries', err.errors);
    });
}