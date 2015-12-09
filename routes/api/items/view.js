var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Item.findOne({ 
        where: {id: req.params.id}
    }).then(function(resultObj){
    	if(resultObj){
        	res.renderJsonSuccess({ Item: resultObj });
    	}else{
	    	res.renderJsonFail('Item not found.');
	    }
    });
}