var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Merchant.findOne({where: {id: req.params.id}}).then(function(resultObj){
            return models.sequelize.transaction(function (t) { 
                return resultObj.updateAttributes(req.body, {transaction: t});
            }).then(function(result){
                resultObj.reload({ include: [{ all: true }]}).then(function(){
                    res.renderJsonSuccess({ Merchant: resultObj }, 'Saving of merchant "'+ resultObj.name +'" is successful.');
                });
            }).catch(function(err){
                res.renderJsonFail('Failed saving the merchant', err.errors);
            });
        });
    
}