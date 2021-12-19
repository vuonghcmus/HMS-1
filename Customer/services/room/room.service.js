const roomModel = require("../../models/room/room.model");

const RoomService = {
    async getRoomByStatus(status){
        return await roomModel.find({ status })
    },
    async getRoomById(id){
        return await roomModel.findById(id)
    },
}

module.exports = RoomService