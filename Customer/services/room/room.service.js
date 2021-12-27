const roomModel = require("../../models/room/room.model");

const RoomService = {
    async getRoomByStatus(status){
        return await roomModel.find({ status }).lean()
    },
    async getRoomById(id){
        return await roomModel.findById(id).lean()
    },
}

module.exports = RoomService