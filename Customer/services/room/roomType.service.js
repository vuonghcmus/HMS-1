const roomTypeModel = require("../../models/room/roomType.model");

const RoomTypeService = {
    async getAll(){
        return await roomTypeModel.find()
    },
    async getRoomTypeById(id){
        return await roomTypeModel.findById(id)
    },
}

module.exports = RoomTypeService