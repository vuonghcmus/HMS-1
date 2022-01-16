const billService = require("../services/service/service.service");

class ServiceController {
    //[GET] /services/
    async show(req, res, next) {
        const allServices = await billService.findAll();
        console.log(allServices);

        res.render("services", { allServices: allServices });
        res.send(allServices);
    }
    async getServiceDetail(req, res, next) {
        const service = await billService.findById(req.params.service_name);
        res.render("service-detail", { service: service });
    }
}
module.exports = new ServiceController;