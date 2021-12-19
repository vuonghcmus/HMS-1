const serviceModel = require("../../models/service/service.model");

const ServiceService = {
    async getAll(){
        return await serviceModel.find()
    },
    async getServiceById(id){
        return await serviceModel.findById(id)
    },
}

module.exports = ServiceService