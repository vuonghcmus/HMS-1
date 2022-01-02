const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller.js");

router.get("/:id_service", serviceController.ServiceDetail);
router.get("/", serviceController.show);

module.exports = router