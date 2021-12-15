const express = require("express");
const StaffController = require("../controllers/staff.controller.js");

const router = express.Router();

router.get("/list-staff", StaffController.getAllStaff);

// add staff
router.get("/add-staff", (req, res) => {
  res.render("staff/add-staff");
});

// add staff post
router.post("/add-staff", StaffController.addStaff);

// edit staff
router.get("/edit-staff/:id", StaffController.editStaffGet);

// edit staff post
router.post("/edit-staff", StaffController.editStaffPost);

// block staff
router.get("/block-staff/:id", StaffController.blockStaff);

// unblock staff
router.get("/unblock-staff/:id", StaffController.unblockStaff);

// delete staff
router.get("/delete-staff/:id", StaffController.deleteStaff);

module.exports = router;
