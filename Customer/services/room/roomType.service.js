const roomTypeModel = require("../../models/room/roomType.model");

const RoomTypeService = {
    async findAll(){
        return await roomTypeModel.find().lean()
    },
    async findById(id){
        return await roomTypeModel.findById(id).lean()
    },

    async find(obj){
        return await roomTypeModel.find(obj).lean()
    }
}

module.exports = RoomTypeService