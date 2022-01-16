const serviceModel = require("../../models/service/service.model");
const serviceTypeService = require("./serviceType.service")
const ServiceService = {

    async findAll() {
        const res = await serviceModel.find({});
        return res;
    },

    async findById(id) {
        return await serviceModel.findById(id).lean();
    },
    async findByTypeId(serviceTypeId) {
        const currentServiceType = await serviceTypeService.findById(serviceTypeId);
        const serviceIds = currentServiceType.services;
        var services = [];
        for (let i = 0; i < serviceIds.length; i++) {
            services.push(await serviceModel.findById(serviceIds[i]));
        }
        return services;
    },
}

module.exports = ServiceService