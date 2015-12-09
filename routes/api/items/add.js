var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    return models.sequelize.transaction(function (t) { 
        return models.Item.create(req.body, {transaction: t});
    }).then(function(resultObj){
       res.renderJsonSuccess({ Item: resultObj });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the item.', err.errors);
    });
}