const detailOrderRoomModel = require("../../models/order/detailOrderRoom.model");

const DetailOrderRoomService = {
    async findAll() {
        const result = await detailOrderRoomModel.find({});
        return result;
    },
    async findById(id) {
        return await detailOrderRoomModel.findById(id).lean();
    },

    async findByRoomId(roomId) {
        return await detailOrderRoomModel.find({roomID: roomId}).lean();
    },
}

module.exports = DetailOrderRoomService