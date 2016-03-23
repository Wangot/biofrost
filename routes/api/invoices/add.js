var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
	var invoice = req.body;
    /*var invoice = {
        name: 'test',
        client_id: 1,
        Client: {
            name: 'eman',
            email: 'ray@gigadevs.com'
        },
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
        return models.Invoice.create(
            invoice, 
            {
                transaction: t,
                include:[
                    models.Client,
                    models.Payment
                ]
            }
        )
    }).then(function(resultObj){
       res.renderJsonSuccess({ invoice: resultObj });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the deliveries', err.errors);
    });
}