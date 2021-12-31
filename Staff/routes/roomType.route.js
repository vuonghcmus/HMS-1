const express = require("express");
const router = express.Router();

const RoomTypeController = require("../controllers/roomType.controller");

router.get("/", RoomTypeController.showListRoomType);

module.exports = router;
