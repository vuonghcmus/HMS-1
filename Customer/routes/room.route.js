const express = require("express");
const router = express.Router();

const roomController = require("../controllers/room.controller.js");


router.post("/add", roomController.addRoomCart);
router.get("/clear-cart", roomController.clearCart);
router.get("/:id_room", roomController.getRoomDetail);
router.post("/:id_room", roomController.findBusyRoom, roomController.getRoomDetail);
router.get("/", roomController.show);
module.exports = router