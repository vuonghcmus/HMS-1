const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller.js");

router.get("/", orderController.show);
router.post("/", orderController.order);

module.exports = router