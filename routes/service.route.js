const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/service.controller");

// show list service
// router.get("/", ServiceController.showListService);

router.get("/", ServiceController.showServicePending);

router.get("/accept-order-service/:id", ServiceController.acceptOrderService);

router.get("/reject-order-service/:id", ServiceController.rejectOrderService);

module.exports = router;
