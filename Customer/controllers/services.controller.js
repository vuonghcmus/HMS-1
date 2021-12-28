const ServiceModel = require("../models/service/service.model");
const Service = require("../services/service/service.service");
class ServiceController {
    //[GET] /services/
    async getServices(req, res, next) {
        console.log("HELLLO");
        // const allServices = await Service.getAll();
        try {
            const data = await ServiceModel.find({});
            console.log(data);
        } catch (err) {
            console.log(err);
        }

        // console.log(allServices);

        // res.render("services");
        // res.send(allServices);
    }
    async getServiceDetail(req, res, next) {
        const service = await Service.getServiceById(req.params.service_name);
        res.render("service-detail", { service: service });
    }

}
module.exports = new ServiceController;