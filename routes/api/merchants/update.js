var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Merchant.findOne({where: {id: req.params.id}}).then(function(merchant){
            return models.sequelize.transaction(function (t) { 
                return merchant.updateAttributes({
                        name: req.body.name,
                        description: req.body.description,
                        status: req.body.status
                    }, 
                    {transaction: t}
                );
            }).then(function(result){
                merchant.reload({ include: [{ all: true }]}).then(function(){
                    res.renderJsonSuccess({ Merchant: merchant });
                });
            }).catch(function(err){
                res.renderJsonFail('Failed saving the merchant', err.errors);
            });
        });
    
}