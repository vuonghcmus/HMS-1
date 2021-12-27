const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/services.controller.js");

router.get("/", ServiceController.getServices);
router.get("/:service_name")

module.exports = router