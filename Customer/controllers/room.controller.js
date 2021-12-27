const roomService = require("../services/room/room.service");

class RoomController {
    //[GET] /rooms/
    async show(req, res, next) {
        // const allRooms = await roomService.findAll();
        // console.log(allRooms);

        // res.render("rooms", { allRooms: allRooms });
        res.render('rooms/rooms')
    }

    //[GET] /rooms/room-details
    async getRoomDetail(req, res, next) {
        // const room = await roomService.findById(req.params.service_name);
        // res.render("room-details", { room: room });
        res.render('rooms/room-details')
    }
}
module.exports = new RoomController;