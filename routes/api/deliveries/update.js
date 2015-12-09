var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Delivery.findOne({where: {id: req.params.id}}).then(function(resultObj){
            return models.sequelize.transaction(function (t) { 
                return resultObj.updateAttributes(req.body, {transaction: t}).then(function(){
                    // TODO: update the item under the deliveries.
                    return models.DeliveryItems.destroy(
                        {
                            where: {
                                delivery_id: req.params.id
                            }
                        },
                        {transaction: t}
                    ).then(function(){
                        var items = [];
                        for (var i = req.body.Items.length - 1; i >= 0; i--) {
                            var temp = {
                                item_id: req.body.Items[i].id,
                                delivery_id: req.params.id,
                                quantity: req.body.Items[i].DeliveryItems.quantity,
                                description: req.body.Items[i].DeliveryItems.description
                            }

                            items.push(temp)
                        };
                        return models.DeliveryItems.bulkCreate(items, {transaction: t}).then(function(){
                            return resultObj;
                        })
                    });
                });
            }).then(function(result){
                resultObj.reload({ include: [{ all: true }]}).then(function(){
                    res.renderJsonSuccess({ Delivery: resultObj });
                });
            }).catch(function(err){
                res.renderJsonFail('Failed saving the delivery', err.errors);
            });
        });
    
}