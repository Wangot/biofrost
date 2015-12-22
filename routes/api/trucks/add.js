var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    return models.sequelize.transaction(function (t) { 
        return models.Truck.create(req.body, {transaction: t});
    }).then(function(resultObj){
       res.renderJsonSuccess({ Truck: resultObj }, 'Saving of truck "'+ resultObj.name +'" is successful.');
    }).catch(function(err){
        res.renderJsonFail('Failed saving the truck.', err.errors);
    });
}