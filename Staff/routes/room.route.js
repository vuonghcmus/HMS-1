const express = require("express");
const router = express.Router();

const RoomController = require("../controllers/room.controller");

router.get("/list-room", RoomController.showListRoom);

router.get("/add-room", RoomController.addRoomGet);

router.post("/add-room", RoomController.addRoomPost);

router.get("/edit-room/:id", RoomController.editRoomGet);

router.post("/edit-room", RoomController.editRoomPost);

router.get("/delete-room/:id", RoomController.deleteRoom);

module.exports = router;
