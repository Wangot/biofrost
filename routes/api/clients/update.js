var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    console.log("======> ", req.params.id, req.body)
    models.Client.findOne({where: {id: req.params.id}}).then(function(resultObj){
        return models.sequelize.transaction(function (t) { 
            return resultObj.updateAttributes(req.body, {transaction: t});
        }).then(function(result){
            resultObj.reload({ include: [{ all: true }]}).then(function(){
                res.renderJsonSuccess({ Client: resultObj }, 'Update of client "'+ resultObj.name +'" successful.');
            });
        }).catch(function(err){
            res.renderJsonFail('Failed saving the client.', err.errors);
        });
    });
}