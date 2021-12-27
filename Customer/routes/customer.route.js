const express = require("express");

const customerController = require("../controllers/customer.controller");

// var config = require("../config/");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", customerController.show);
router.post("/", customerController.login);

module.exports = router