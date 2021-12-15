const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller");
const serviceTypeController = require("../controllers/serviceType.controller");

// show list service
router.get("/list-service", serviceController.showListService);

// add service
router.get("/add-service", serviceController.addServiceGet);

// //add service post and add service id to type of service
router.post("/add-service", serviceController.addServicePost);

// // edit service and find current id of type of this service
router.get("/edit-service/:id", serviceController.editServiceGet);

// // edit service post and remove service id to old type of service
// // and push service id to new type of service
// // and using async await
router.post("/edit-service", serviceController.editServicePost);

// delete service
router.get("/delete-service/:id", serviceController.deleteService);

module.exports = router;
