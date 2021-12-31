const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/service.controller");

// show list service
router.get("/", ServiceController.showListService);

module.exports = router;
