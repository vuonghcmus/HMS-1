const express = require("express");
const AccountController = require("../controllers/account.controller.js");

const router = express.Router();

router.get("/", AccountController.getAllCustomer);

// add customer
router.get("/add-customer", (req, res) => {
  res.render("account/add-customer");
});

// add customer post
router.post("/add-customer", AccountController.addCustomer);

// edit customer
router.get("/edit-customer/:id", AccountController.editCustomerGet);

// edit customer post
router.post("/edit-customer", AccountController.editCustomerPost);

// block customer
router.get("/block-customer/:id", AccountController.blockCustomer);

// unblock customer
router.get("/unblock-customer/:id", AccountController.unblockCustomer);

// delete customer
router.get("/delete-customer/:id", AccountController.deleteCustomer);

module.exports = router;
