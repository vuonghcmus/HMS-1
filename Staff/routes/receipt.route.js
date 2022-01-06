const express = require("express");
const router = express.Router();

const ReceiptController = require("../controllers/receipt.controller");

router.get("/:id/payment", ReceiptController.payment);
router.get("/:id", ReceiptController.showReceipt);

module.exports = router;
