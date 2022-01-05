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
        return await detailOrderServiceModel.find({ roomID: roomId }).lean();
    },
    async addDetailOrderRoom(serviceID, priceService, orderAmount, orderDate, userID) {
        return await detailOrderServiceModel.create({
            serviceID: serviceID,
            number: orderAmount,
            orderDate: orderDate,
            price: priceService,
            userID: userID,
        });
    }
}

module.exports = DetailOrderServiceService