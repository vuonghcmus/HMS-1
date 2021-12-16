const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/service.controller");

// show list service
router.get("/list-service", ServiceController.showListService);

// add service
router.get("/add-service", ServiceController.addServiceGet);

// //add service post and add service id to type of service
router.post("/add-service", ServiceController.addServicePost);

// // edit service and find current id of type of this service
router.get("/edit-service/:id", ServiceController.editServiceGet);

// // edit service post and remove service id to old type of service
// // and push service id to new type of service
// // and using async await
router.post("/edit-service", ServiceController.editServicePost);

// delete service
router.get("/delete-service/:id", ServiceController.deleteService);

module.exports = router;
