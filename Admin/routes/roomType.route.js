const express = require("express");
const router = express.Router();

const RoomTypeController = require("../controllers/roomType.controller");

router.get("/list-room-type", RoomTypeController.showListRoomType);

router.get("/edit-room-type/:id", RoomTypeController.editRoomTypeGet);

router.post("/edit-room-type", RoomTypeController.editRoomTypePost);

router.get("/delete-room-type/:id", RoomTypeController.deleteRoomType);

router.get("/add-room-type", (req, res) => {
  res.render("room-type/add-room-type");
});

router.post("/add-room-type", RoomTypeController.addRoomTypePost);

module.exports = router;
