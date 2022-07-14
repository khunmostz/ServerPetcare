const express = require("express");
const router = express.Router();
const locationsDb = require('../firebase');
router.get("/get/locationdb", async (req, res) => {
  res.json({
    location: "thailand",
  });
});

router.post('/create/location', async (req, res) => {
  const { locationName, locationLat, locationLong, locationDesc, locationImage } = req.body;

  res.json({
    message: 'create success',
    location: {
      locationName,
      locationLat,
      locationLong,
      locationDesc,
      locationImage,
    }
  });
})

module.exports = router;
