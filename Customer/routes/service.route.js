const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller.js");

router.post("/add-to-cart", serviceController.addServiceToCart);
router.post("/update-cart/:serviceID/:qty", serviceController.updateIncart);
router.post("/confirm", serviceController.confirmCart);
router.post("/clear-cart", serviceController.clearCart);
router.get("/:id_service", serviceController.ServiceDetail);
router.get("/", serviceController.show);

module.exports = router