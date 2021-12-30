const serviceService = require("../services/service/service.service");

class ServiceController {
    //[POST] /cart/
    async post(req, res, next) {
        
        res.render("orders/order" , {
            layout: 'main_no_head'
        });
    }
    
}
module.exports = new ServiceController;