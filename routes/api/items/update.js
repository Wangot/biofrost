var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Item.findOne({where: {id: req.params.id}}).then(function(resultObj){
            return models.sequelize.transaction(function (t) { 
                return resultObj.updateAttributes(req.body, {transaction: t});
            }).then(function(result){
                resultObj.reload({ include: [{ all: true }]}).then(function(){
                    res.renderJsonSuccess({ Item: resultObj }, 'Saving of item "'+ resultObj.name +'" is successful.');
                });
            }).catch(function(err){
                res.renderJsonFail('Failed saving the item.', err.errors);
            });
        });
    
}