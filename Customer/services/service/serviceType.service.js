const serviceTypeModel = require("../../models/service/serviceType.model");

const ServiceTypeService = {
    async getAll(){
        return await serviceTypeModel.find()
    },
    async getServiceTypeById(id){
        return await serviceTypeModel.findById(id)
    },
}

module.exports = ServiceTypeService