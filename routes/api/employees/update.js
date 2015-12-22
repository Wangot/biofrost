var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    var employee = req.body;
    if(employee.Merchant){
        employee.ref_id = employee.Merchant.id;
        employee.company_type = "MERCHANT";
    }
    models.Employee.findOne({where: {id: req.params.id}}).then(function(resultObj){
        return models.sequelize.transaction(function (t) { 
            return resultObj.updateAttributes(employee, {transaction: t});
        }).then(function(result){
            resultObj.reload({ include: [{ all: true }]}).then(function(){
                res.renderJsonSuccess({ Employee: resultObj }, 'Updating of employee "'+ resultObj.name +'" is successful.');
            });
        }).catch(function(err){
            res.renderJsonFail('Failed saving the employee.', err.errors);
        });
    });
}