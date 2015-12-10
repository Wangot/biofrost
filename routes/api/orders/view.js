var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Order.findOne({ 
        where: {id: req.params.id},
        include: [
            {
                model: models.Payment
            },
            {
                model: models.Client
            }
        ]
    }).then(function(resultObj){
    console.log("aaaaaa", resultObj)
    	if(resultObj){
        	res.renderJsonSuccess({ Order: resultObj });
    	}else{
	    	res.renderJsonFail('Order not found.');
	    }
    });
}