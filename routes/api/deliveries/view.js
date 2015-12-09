var path = require('path');
var models = require(path.resolve("./models/orm"));

module.exports = function(req, res) {
    models.Delivery.findOne({ 
        where: {id: req.params.id},
        include: [
            {
                model: models.Item,
                through: { attributes: ['description', 'quantity'] }
            },
            {
                model: models.Truck
            }
        ]
    }).then(function(resultObj){
    	if(resultObj){
        	res.renderJsonSuccess({ Delivery: resultObj });
    	}else{
	    	res.renderJsonFail('Delivery not found.');
	    }
    });
}