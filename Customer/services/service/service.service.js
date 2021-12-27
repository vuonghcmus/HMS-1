const serviceModel = require("../../models/service/service.model");
const serviceTypeService = require("./serviceType.service")
const ServiceService = {
    async getAll() {
        const result = await serviceModel.find({});
        return result;
    },
    async getServiceById(id) {
        return await serviceModel.findById(id).lean();
    },
    async getAllServicesByTypeId(serviceTypeId) {
        const currentServiceType = await serviceTypeService.getServiceTypeById(serviceTypeId)
        const servicesId = currentServiceType.services
        const services = servicesId.map(serviceModel.findById)
        return await services
    },
}

module.exports = ServiceService