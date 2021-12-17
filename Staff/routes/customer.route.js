const express = require("express");
const CustomerController = require("../controllers/customer.controller.js");

const router = express.Router();

router.get("/list-customer", CustomerController.getAllCustomer);

// add customer
router.get("/add-customer", (req, res) => {
  res.render("customer/add-customer");
});

// add customer post
router.post("/add-customer", CustomerController.addCustomer);

// edit customer
router.get("/edit-customer/:id", CustomerController.editCustomerGet);

// edit customer post
router.post("/edit-customer", CustomerController.editCustomerPost);

// block customer
router.get("/block-customer/:id", CustomerController.blockCustomer);

// unblock customer
router.get("/unblock-customer/:id", CustomerController.unblockCustomer);

// delete customer
router.get("/delete-customer/:id", CustomerController.deleteCustomer);

module.exports = router;
