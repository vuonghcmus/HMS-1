const express = require("express");
const router = express.Router();

const RoomController = require("../controllers/room.controller");

router.get("/", RoomController.showListRoom);

// router.get("/test", RoomController.showListRoomTest);

module.exports = router;
