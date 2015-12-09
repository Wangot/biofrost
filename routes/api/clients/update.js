var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Client.findOne({where: {id: req.params.id}}).then(function(resultObj){
            return models.sequelize.transaction(function (t) { 
                return resultObj.updateAttributes(req.body, {transaction: t});
            }).then(function(result){
                resultObj.reload({ include: [{ all: true }]}).then(function(){
                    res.renderJsonSuccess({ Client: resultObj });
                });
            }).catch(function(err){
                res.renderJsonFail('Failed saving the client.', err.errors);
            });
        });
    
}