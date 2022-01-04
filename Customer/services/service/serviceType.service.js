const serviceTypeModel = require("../../models/service/serviceType.model");

const ServiceTypeService = {
    async findAll() {
        return await serviceTypeModel.find().lean();
    },
    async findById(id) {
        return await serviceTypeModel.findById(id).lean();
    },

}

module.exports = ServiceTypeService