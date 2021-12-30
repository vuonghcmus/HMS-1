const serviceService = require("../services/service/service.service");

class ServiceController {
    //[GET] /order/
    async show(req, res, next) {
        
        res.render("orders/order" , {
            layout: 'main_no_head'
        });
    }
    
}
module.exports = new ServiceController;