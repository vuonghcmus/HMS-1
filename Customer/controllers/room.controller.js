const RoomService = require("../services/room/room.service");
const RoomTypeSerivce = require("../services/room/roomType.service");

class RoomController {
    //[GET] /rooms/
    async show(req, res, next) {
        const allRooms = await RoomTypeSerivce.findAll();
        console.log(allRooms);

        res.render('rooms/rooms', {
            allRooms: allRooms,
            active: {room: true}
        });
    }

    //[GET] /rooms/room-details
    async getRoomDetail(req, res, next) {
        const room = await RoomTypeSerivce.findById(req.params.id_room);
        console.log(room);
        res.render('rooms/room-details', {
            room: room,
            active: {room: true}
        });
    }
}
module.exports = new RoomController;