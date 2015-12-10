var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Employee.findOne({ 
        where: {id: req.params.id}
    }).then(function(resultObj){
    	if(resultObj){
        	res.renderJsonSuccess({ Employee: resultObj });
    	}else{
	    	res.renderJsonFail('Employee not found.');
	    }
    });
}