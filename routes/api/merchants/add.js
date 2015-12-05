var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    return models.sequelize.transaction(function (t) { 
        return models.Merchant.create(req.body, {transaction: t});
    }).then(function(result){
       res.renderJsonSuccess({ Merchant: result });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the Merchant', err.errors);
    });
}