const serviceTypeModel = require("../../models/service/serviceType.model");

const ServiceTypeService = {
    async getAll(){
        return await serviceTypeModel.find().lean()
    },
    async getServiceTypeById(id){
        return await serviceTypeModel.findById(id).lean()
    },
    
}

module.exports = ServiceTypeService