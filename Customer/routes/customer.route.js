const express = require("express");

const customerController = require("../controllers/customer.controller");

// var config = require("../config/");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/sign-in", customerController.show);
router.get("/profile", customerController.profile);
router.get("/change-password", customerController.changePassword);
router.post("/sign-in", customerController.login);

module.exports = router