const express = require("express");
const router = express.Router();
const jobVacancies = require("./jobVacancies");

router.get("/", (req, res) => {
  res.send(jobVacancies);
});

module.exports = router;
