const express = require("express");
const router = express.Router();

const roomController = require("../controllers/room.controller.js");


router.get("/", roomController.show);
router.get("/:id_room", roomController.getRoomDetail);
module.exports = router