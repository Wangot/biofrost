var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    console.log("get eto... VIEW")

    models.Client.findOne({ 
        where: {id: req.params.id}
    }).then(function(resultObj){
    	if(resultObj){
        	res.renderJsonSuccess({ Client: resultObj });
    	}else{
	    	res.renderJsonFail('Client not found.');
	    }
    });
}