const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("revenue/home");
});

module.exports = router;
