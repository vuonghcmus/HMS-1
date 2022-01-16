const express = require("express");
const router = express.Router();

const ServiceTypeController = require("../controllers/serviceType.controller");

router.get("/", ServiceTypeController.showListServiceType);

module.exports = router;
