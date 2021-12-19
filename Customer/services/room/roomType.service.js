const roomTypeModel = require("../../models/room/roomType.model");

const RoomTypeService = {
    async getAll(){
        return await roomTypeModel.find().lean()
    },
    async getRoomTypeById(id){
        return await roomTypeModel.findById(id).lean()
    },
}

module.exports = RoomTypeService