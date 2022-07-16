const express = require("express");
const admin = require("../firebaseAd");
const router = express.Router();
router.get("/get/location", async (req, res) => {
  const data = await admin
    .app()
    .firestore()
    .collection("locations")
    .doc()
    .get();
  res.json({
    message: "locations",
    locations: data,
  });
});

router.post("/create/location", async (req, res) => {
  const {
    locationName,
    locationLat,
    locationLong,
    locationDesc,
    locationImage,
  } = req.body;
  // locationsDb.add({ locationName, locationLat, locationLong, locationDesc, locationImage });
  await admin.app().firestore().collection("locations").add({
    locationName: locationName,
    locationLat: locationLat,
    locationLong: locationLong,
    locationDesc: locationDesc,
    locationImage: locationDesc,
  });
  res.json({
    message: "create success",
    location: {
      locationName,
      locationLat,
      locationLong,
      locationDesc,
      locationImage,
    },
  });
});

module.exports = router;
