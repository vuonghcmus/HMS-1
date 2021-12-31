const express = require("express");
const CustomerController = require("../controllers/customer.controller");

const router = express.Router();

router.get("/", CustomerController.getAllCustomer);

module.exports = router;
