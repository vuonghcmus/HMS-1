const express = require("express");
const router = express.Router();

const roomController = require("../controllers/room.controller.js");

router.get("/room-details", roomController.getRoomDetail);
router.get("/", roomController.show);

module.exports = router