var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    var employee = req.body;
    if(employee.Merchant){
        employee.ref_id = employee.Merchant.id;
        employee.company_type = "MERCHANT";
    }
    return models.sequelize.transaction(function (t) { 
        return models.Employee.create(employee, {transaction: t});
    }).then(function(resultObj){
       res.renderJsonSuccess({ Employee: resultObj });
    }).catch(function(err){
        res.renderJsonFail('Failed saving the employee', err.errors);
    });
}