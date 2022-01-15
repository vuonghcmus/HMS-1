const express = require("express");
const router = express.Router();

const apiController = require("../../Customer/controllers/api.controller");

router.get("/dtor/:checkindate/:checkoutdate", apiController.getDtorByInOut);

module.exports = router