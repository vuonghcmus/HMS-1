const express = require("express");
const RevenueController = require("../controllers/revenue.controller");
const router = express.Router();

router.get("/", RevenueController.getTotalRevenue);

module.exports = router;
