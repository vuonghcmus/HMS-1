const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home.controller.js");

router.get("/elements", homeController.elements)
router.get("/contact", homeController.contact)
router.get("/blog", homeController.blog)
router.get("/about-us", homeController.aboutUs)
router.get("/search-order", homeController.getSearch)
router.post("/search-order", homeController.postSearch)
router.get("/",homeController.show);

module.exports = router