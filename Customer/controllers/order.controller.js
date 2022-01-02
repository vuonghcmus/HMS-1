const serviceService = require("../services/service/service.service");

class ServiceController {
    //[GET] /order/
    async show(req, res, next) {
        
        res.render("orders/order" , {
            
        });
    }
    
}
module.exports = new ServiceController;