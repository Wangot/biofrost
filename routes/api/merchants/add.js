var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    return models.sequelize.transaction(function (t) { 
        return models.Merchant.create(req.body, {transaction: t});
    }).then(function(resultObj){
       res.renderJsonSuccess({ Merchant: resultObj }, 'Saving of merchant "'+ resultObj.name +'" is successful.');
    }).catch(function(err){
        res.renderJsonFail('Failed saving the Merchant', err.errors);
    });
}