var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
	// var delivery = req.body;
	var delivery = {
		description: "this is a delivery",
		Items: [
			{
				description: 'description',
				quantity: 10,
				item_id: 1,
			}
		]
	}

    return models.sequelize.transaction(function (t) { 
        return models.Delivery.create(delivery, {transaction: t}).then(function(deliveryObj){
        	for (var i = delivery.Items.length - 1; i >= 0; i--) {
        		delivery.Items[i].delivery_id = deliveryObj.id;
        	};
        	return models.DeliveryItems.bulkCreate(delivery.Items, {transaction:t}).then(function(){
        		return deliveryObj;
        	});
        });
    }).then(function(resultObj){
       res.renderJsonSuccess({ Delivery: resultObj });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the deliveries', err.errors);
    });
}