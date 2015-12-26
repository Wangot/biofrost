var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    var order = req.body;
    models.Delivery.findOne({where: {id: req.params.id}}).then(function(resultObj){
        return models.sequelize.transaction(function (t) { 
            return resultObj.updateAttributes(order, {transaction: t});
        }).then(function(result){
            resultObj.reload({ include: [{ all: true }]}).then(function(){
                res.renderJsonSuccess({ Delivery: resultObj });
            });
        }).catch(function(err){
            res.renderJsonFail('Failed saving the delivery', err.errors);
        });
    });   
}