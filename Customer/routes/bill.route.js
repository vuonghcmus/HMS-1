const express = require("express");
const router = express.Router();

const billController = require("../controllers/bill.controller.js");

router.get("/", billController.show);

module.exports = router