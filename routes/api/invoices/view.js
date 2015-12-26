var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Invoice.findOne({ 
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
        	res.renderJsonSuccess({ Invoice: resultObj });
    	}else{
	    	res.renderJsonFail('Invoice not found.');
	    }
    });
}