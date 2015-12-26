var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
	var delivery = req.body;

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

                items.push(temp);
            };

            console.log("=== > ", items.length, items)
        	return models.DeliveryItems.bulkCreate(items, {transaction:t}).then(function(){
        		var employeesTemp = [];
                for (var i = delivery.Employees.length - 1; i >= 0; i--) {
                    employeesTemp.push(delivery.Employees[i].id)
                };
                return models.Employee.findAll({where: {id: employeesTemp}}).then(function(employees){
                    return deliveryObj.setEmployees(employees, {transaction: t}).then(function(){
                        return deliveryObj;
                    });
                });
        	});
        });
    }).then(function(resultObj){
        models.Delivery.findOne({
            where: {
                id: resultObj.id
            },
            include: [
                models.Truck,
                models.Item,
                models.Employee
            ]
        }).then(function(delivery){
            res.renderJsonSuccess({ Delivery: delivery }, 'Saving of delivery is successful.');
        })
    }).catch(function(err){
        res.renderJsonFail('Failed saving the deliveries', err.errors);
    });
}