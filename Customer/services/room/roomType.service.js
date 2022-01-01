const roomTypeModel = require("../../models/room/roomType.model");

const RoomTypeService = {
    async findAll() {
        return await roomTypeModel.find().lean();
    },
    async findById(id) {
        return await roomTypeModel.findById(id).lean()
    },
}

module.exports = RoomTypeService