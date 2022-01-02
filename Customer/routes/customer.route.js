const express = require("express");

const customerController = require("../controllers/customer.controller");

const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/sign-in", customerController.show);
router.post("/sign-in", customerController.login);
router.get("/logout", customerController.logout);
router.get("/profile",auth, customerController.profile);
router.get("/change-password",auth, customerController.getChangePassword);
router.post("/change-password",auth, customerController.postChangePassword);

module.exports = router