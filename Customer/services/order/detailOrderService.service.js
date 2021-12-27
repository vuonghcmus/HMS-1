const detailOrderServiceModel = require("../../models/order/detailOrderService.model");

const DetailOrderServiceService = {
    async findAll() {
        const result = await detailOrderServiceModel.find({});
        return result;
    },
    async findById(id) {
        return await detailOrderServiceModel.findById(id).lean();
    },

    async findByRoomId(roomId) {
        return await detailOrderServiceModel.find({roomID: roomId}).lean();
    },
}

module.exports = DetailOrderServiceService