const express = require("express");
const admin = require('../firebaseAd');
const router = express.Router();
router.get("/get/locationdb", async (req, res) => {
  res.json({
    location: "thailand",
  });
});

router.post('/create/location', async (req, res) => {
  const { locationName, locationLat, locationLong, locationDesc, locationImage } = req.body;
  // locationsDb.add({ locationName, locationLat, locationLong, locationDesc, locationImage });
  admin.app
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
