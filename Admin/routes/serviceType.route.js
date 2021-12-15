const express = require("express");
const router = express.Router();

const serviceTypeController = require("../controllers/serviceType.controller");

router.get("/list-service-type", serviceTypeController.showListServiceType);

router.get("/edit-service-type/:id", serviceTypeController.editServiceTypeGet);

router.post("/edit-service-type", serviceTypeController.editServiceTypePost);

router.get("/delete-service-type/:id", serviceTypeController.deleteServiceType);

router.get("/add-service-type", (req, res) => {
  res.render("service-type/add-service-type");
});

router.post("/add-service-type", serviceTypeController.addServiceTypePost);

module.exports = router;
