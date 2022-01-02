const serviceService = require("../services/service/service.service");

class ServiceController {
    //[GET] /services/
    async show(req, res, next) {
        const allServices = await serviceService.findAll();
        res.render("services/services", {
            allServices: allServices,
            isAuth: req.user
        });

    }

    async ServiceDetail(req, res, next) {
        const service = await serviceService.findById(req.params.id_service);
        console.log(service);
        res.render("services/service-details", {
            service: service ,
            isAuth: req.user
        });
    }
}
module.exports = new ServiceController;