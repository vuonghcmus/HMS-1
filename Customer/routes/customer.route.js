const express = require("express");

const CustomerController = require("../controllers/customer.controller");

// var config = require("../config/");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", CustomerController.getLogin);
router.post("/", CustomerController.postLogin);

module.exports = router