const express = require("express");
const router = express.Router();
const mock = require("./mock.json");

router.get("/", (req, res) => {
  res.send(JSON.stringify(mock));
});

module.exports = router;
