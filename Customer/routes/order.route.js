const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller.js");

router.get("/", orderController.show);

module.exports = router