const express = require("express");
const CustomerController = require("../controllers/customer.controller");

const router = express.Router();

router.get("/", CustomerController.showAllCustomer);

router.get("/accept-order-room/:id", CustomerController.acceptOrderRoom);

router.get("/reject-order-room/:id", CustomerController.rejectOrderRoom);

module.exports = router;
