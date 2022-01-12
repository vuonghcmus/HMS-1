const Cart = require("../models/cart.model");
require("dotenv").config();
const RoomTypeService = require("../services/room/roomType.service");
const { generateBookingTable, findBusyRoom, findEmptyRoom } = require('../utils/')

class RoomController {
    //[GET] /rooms/
    async show(req, res, next) {
        const allRooms = await RoomTypeService.find();

        if (!req.session.cart) {
            req.session.cart = { rooms: [], services: [] };
        }
        var cart = req.session.cart;
        cart.length = cart.rooms.length;

        res.render('rooms/rooms', {
            allRooms: allRooms,
            cart: cart,
            isAuth: req.user,
        });
    }

    //[GET] /rooms/:id_room
    async getRoomDetail(req, res, next) {
        // if haven't find by check in and check out date
        const roomType = await RoomTypeService.findById(req.params.id_room);
        if (!req.finding) {
            return res.render('rooms/room-details', {
                roomType: roomType,
                isAuth: req.user,
                finding: true
            });
        }

        // mock data will be changed to load data from database after
        let rooms = [];

        for (let i = 0; i < roomType.rooms.length; i++) {
            rooms.push({
                _id: i,
                roomNumber: roomType.rooms[i],
            });
        }
        rooms = findEmptyRoom(rooms, req.finding.busyRooms)
        const checkin = req.finding.checkin
        const checkout = req.finding.checkout

        req.finding = null
            //combine with cart to set up status
        if (!req.session.cart) {
            req.session.cart = { rooms: [], services: [] };
        }
        var cart = req.session.cart;
        for (let i = 0; i < cart.rooms.length; i++) {
            const currentRoomCart = cart.rooms[i];
            //if exist
            if (currentRoomCart) {
                for (let j = 0; j < rooms.length; j++) {
                    if (rooms[j].available) {
                        const index = currentRoomCart.listRoom.findIndex((o) => String(o.roomid) == String(rooms[j].roomNumber));
                        if (index >= 0) {
                            rooms[j].available = false;
                        }
                    }
                }
            }
        }
        console.log(rooms[0]);
        var msg = "";
        if (cart.rooms.length == 0) {
            msg = "Please book your room";
        }

        const table = generateBookingTable(rooms);

        res.render('rooms/room-details', {
            roomType: roomType,
            table: table,
            cart: req.session.cart,
            message: msg,
            isAuth: req.user,
            checkin: checkin,
            checkout: checkout,

        });
    }

    async findBusyRoom(req, res, next) {
        const { checkin, checkout } = req.body
        const busyRooms = await findBusyRoom(process.env.DOMAIN || 'http://127.0.0.1:3000', checkin, checkout)
        req.finding = { busyRooms, checkin, checkout }
        next()
    }

    async addRoomCart(req, res, next) {
        const idRooms = req.body.roomID;
        const peoples = req.body.people;
        const checkin = req.body.checkin;
        const checkout = req.body.checkout;

        const room = {
            RoomType: req.body.roomType,
            RoomTypeID: req.body.roomTypeID,
            RoomImage: req.body.roomImage,
            RoomPrice: req.body.roomPrice,
            RoomTypeID: req.body.roomTypeID,
            listRoom: [],
        };


        if (Array.isArray(idRooms)) {
            for (let i = 0; i < idRooms.length; i++) {
                room.listRoom.push({
                    roomid: idRooms[i],
                    people: peoples[i],
                    checkin: checkin,
                    checkout: checkout,
                });
            }
        } else {
            room.listRoom.push({
                roomid: idRooms,
                people: peoples,
                checkin: checkin,
                checkout: checkout,
                // finding: true,
            });
        }

        var cart = req.session.cart;
        const index = cart.rooms.findIndex((o) => o.RoomType == room.RoomType);
        if (index >= 0) {
            for (let i = 0; i < room.listRoom.length; i++) {
                cart.rooms[i].listRoom.push(room.listRoom[i]);
            }
        } else {
            cart.rooms.push(room);
        }

        res.redirect("/rooms");
    }

    clearCart(req, res, next) {
        req.session.cart = null
        res.redirect("/rooms")

    }
}
module.exports = new RoomController;