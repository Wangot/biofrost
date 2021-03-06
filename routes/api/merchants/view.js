var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Merchant.findOne({ 
        where: {id: req.params.id}
    }).then(function(resultObj){
    	if(resultObj){
        	res.renderJsonSuccess({ Merchant: resultObj });
    	}else{
	    	res.renderJsonFail('Merchant not found.');
	    }
    });
}