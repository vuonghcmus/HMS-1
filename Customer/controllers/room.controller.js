const RoomService = require("../services/room/room.service");
const RoomTypeSerivce = require("../services/room/roomType.service");
const { generateBookingTable } = require('../utils/')
class RoomController {
    //[GET] /rooms/
    async show(req, res, next) {
        const allRooms = await RoomTypeSerivce.findAll();
        console.log(allRooms);

        res.render('rooms/rooms', {
            allRooms: allRooms,
        });
    }

    //[GET] /rooms/room-details
    async getRoomDetail(req, res, next) {
        const roomType = await RoomTypeSerivce.findById(req.params.id_room);
        
        // mock data
        const rooms = [
            {_id: 1, roomNumber: 400, status: 'available'},
            {_id: 2, roomNumber: 401},
            {_id: 3, roomNumber: 402},
            {_id: 4, roomNumber: 403, status: 'available'},
            {_id: 5, roomNumber: 404},
            {_id: 6, roomNumber: 405},
            {_id: 7, roomNumber: 406},
            {_id: 8, roomNumber: 407},
        ]

        const table = generateBookingTable(rooms)

        res.render('rooms/room-details', {
            roomType: roomType,
            table: table,
        });
    }
}
module.exports = new RoomController;