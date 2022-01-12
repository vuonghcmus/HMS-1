const express = require("express");
const NotificationController = require("./notification.controller.js");

const router = express.Router();

router.get("/notify", NotificationController.notify);

module.exports = router;
