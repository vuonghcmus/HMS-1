const detailServiceBillModel = require("../../models/bill/detailServiceBill.model");

const DetailServiceBillService = {
    async getAll(){
        return await detailServiceBillModel.find().lean()
    },
    async getDetailServiceBillById(id){
        return await detailServiceBillModel.findById(id).lean()
    },
    
}

module.exports = DetailServiceBillService