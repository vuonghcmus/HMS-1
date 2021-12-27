const serviceService = require("../services/service/service.service");

class ServiceController {
    //[GET] /services/
    async show(req, res, next) {
        // const allServices = await serviceService.findAll();
        // console.log(allServices);

        // res.render("services", { allServices: allServices });
        // res.send(allServices);
        
        res.render('services/services')
    }
    
    async getServiceDetail(req, res, next) {
        const service = await serviceService.findById(req.params.service_name);
        res.render("services/service-detail", { service: service });
    }
}
module.exports = new ServiceController;