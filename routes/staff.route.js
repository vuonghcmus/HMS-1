const express = require("express");
const StaffController = require("../controllers/staff.controller");

// var config = require("../config/");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/login", StaffController.getLogin);

router.post("/login", StaffController.postLogin);

router.get("/logout", StaffController.logout);

router.get("/profile", auth, StaffController.profile);

// edit profile
router.get("/edit-profile", StaffController.getEditProfile);

// edit profile post
router.post("/edit-profile", StaffController.postEditProfile);

// change password
router.get("/change-password", StaffController.getChangePassword);

// change password post
router.post("/change-password", StaffController.postChangePassword);

module.exports = router;
