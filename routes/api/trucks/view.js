var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Truck.findOne({ 
        where: {id: req.params.id}
    }).then(function(resultObj){
    	if(resultObj){
        	res.renderJsonSuccess({ Truck: resultObj });
    	}else{
	    	res.renderJsonFail('Truck not found.');
	    }
    });
}