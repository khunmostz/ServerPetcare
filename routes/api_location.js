const express = require("express");
const router = express.Router();
const locationdb = require("../firebase");

router.get("/get/locationdb", async (req, res) => {
  res.json({
    location: "thailand",
  });
});

router.post("/create/locationdb", async (req, res) => {
  const { location } = req.body;
  await locationsDb.add(location);
  res.json({
    message: "create location successful",
  });
});

module.exports = router;
