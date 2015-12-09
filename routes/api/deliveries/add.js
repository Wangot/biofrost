var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
	var delivery = req.body;
	/*var delivery = {
		description: "this is a delivery",
		Items: [
			{
                id: 1,
				DeliveryItems: {
                    description: 'description',
				    quantity: 10
                }
			}
		]
	}*/

    return models.sequelize.transaction(function (t) { 
        return models.Delivery.create(delivery, {transaction: t}).then(function(deliveryObj){

            var items = [];
            for (var i = delivery.Items.length - 1; i >= 0; i--) {
                var temp = {
                    item_id: delivery.Items[i].id,
                    delivery_id: deliveryObj.id,
                    quantity: delivery.Items[i].DeliveryItems.quantity,
                    description: delivery.Items[i].DeliveryItems.description
                }

                items.push(temp)
            };
        	return models.DeliveryItems.bulkCreate(items, {transaction:t}).then(function(){
        		return deliveryObj;
        	});
        });
    }).then(function(resultObj){
       res.renderJsonSuccess({ Delivery: resultObj });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the deliveries', err.errors);
    });
}