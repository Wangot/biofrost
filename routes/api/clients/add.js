var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    return models.sequelize.transaction(function (t) { 
        return models.Client.create(req.body, {transaction: t});
    }).then(function(resultObj){
       res.renderJsonSuccess({ Client: resultObj }, 'Saving of client "'+ resultObj.name +'" is successful.');
    }).catch(function(err){
        res.renderJsonFail('Failed saving the client', err.errors);
    });
}