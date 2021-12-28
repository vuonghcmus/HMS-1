const detailRoomBillModel = require("../../models/bill/detailRoomBill.model");

const DetailRoomBillService = {
    async findAll() {
        const result = await detailRoomBillModel.find({});
        return result;
    },
    async findById(id) {
        return await detailRoomBillModel.findById(id).lean();
    },

    async findByRoomId(roomId) {
        return await detailRoomBillModel.find({roomID: roomId}).lean();
    },
}

module.exports = DetailRoomBillService