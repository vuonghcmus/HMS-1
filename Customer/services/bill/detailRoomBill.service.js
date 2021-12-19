const detailRoomBillModel = require("../../models/bill/detailRoomBill.model");

const DetailRoomBillService = {
    async getAll(){
        return await detailRoomBillModel.find().lean()
    },
    async getDetailRoomBillById(id){
        return await detailRoomBillModel.findById(id).lean()
    },
    
}

module.exports = DetailRoomBillService