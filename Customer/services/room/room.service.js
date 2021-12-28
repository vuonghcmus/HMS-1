const roomModel = require("../../models/room/room.model");

const RoomService = {

    async findAll() {
        const result = await roomModel.find({});
        return result;
    },

    async findByStatus(status){
        return await roomModel.find({ status }).lean()
    },
    async findById(id){
        return await roomModel.findById(id).lean()
    },
}

module.exports = RoomService