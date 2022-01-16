const express = require("express");
const router = express.Router();

const ServiceTypeController = require("../controllers/serviceType.controller");

router.get("/", ServiceTypeController.showListServiceType);

router.get("/edit-service-type/:id", ServiceTypeController.editServiceTypeGet);

router.post("/edit-service-type", ServiceTypeController.editServiceTypePost);

router.get("/delete-service-type/:id", ServiceTypeController.deleteServiceType);

router.get("/add-service-type", (req, res) => {
  res.render("service-type/add-service-type");
});

router.post("/add-service-type", ServiceTypeController.addServiceTypePost);

module.exports = router;
