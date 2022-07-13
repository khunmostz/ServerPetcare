const express = require("express");
const router = express.Router();

router.get("/location", async (req, res) => {
  res.json({
    location: "thailand",
  });
});

module.exports = router;