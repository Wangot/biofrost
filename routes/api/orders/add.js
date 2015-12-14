var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
	var order = req.body;
    /*var order= {
        name: 'test',
        client_id: 1,
        Payments: [
            {
                amount: 100
            },
            {
                amount: 200
            }
        ]
    }*/

    return models.sequelize.transaction(function (t) { 
        return models.Order.create(
            order, 
            {
                transaction: t,
                include:[
                    models.Payment
                ]
            }
        )
    }).then(function(resultObj){
       res.renderJsonSuccess({ orders: resultObj });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the deliveries', err.errors);
    });
}