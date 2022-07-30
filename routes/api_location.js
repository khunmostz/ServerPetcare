const express = require("express");
const router = express.Router();
const upload = require(".././middleware/upload_image");
const admin = require("../firebaseAd");
const cloudinary = require("../config");

router.get("/get/location", async (req, res) => {
  const data = await admin.app().firestore().collection("locations").get();
  const locationValues = [];
  data.docs.map((snapshot) => {
    snapshot = locationValues.push(snapshot.data());
    return locationValues;
  });
  res.json({
    message: "locations",
    locations: locationValues,
  });
});

router.get("/getid/location/:id", async (req, res) => {
  const { id } = req.params;
  const data = await admin
    .app()
    .firestore()
    .collection("locations")
    .doc(id)
    .get();
  const locationValues = [];
  locationValues.push(data.data());
  res.json({
    message: "locations",
    locations: locationValues,
  });
});

router.post(
  "/create/location",
  upload.single("fileImage"),
  async (req, res) => {
    const {
      locationId,
      locationName,
      locationLat,
      locationLong,
      locationDesc,
      locationImage,
    } = req.body;
    var imageUrl = "";
    cloudinary.uploader
      .upload(
        req.file.path,
        {
          user_filename: true,
          unique_filename: false,
          folder: "locations",
        },
        (err, image) => {
          if (err) {
            console.log(err);
          }
        }
      )
      .then(async (result) => {
        imageUrl = result.url;
        console.log(imageUrl);
        await admin
          .app()
          .firestore()
          .collection("locations")
          .doc(locationId)
          .set({
            locationId: locationId,
            locationName: locationName,
            locationLat: locationLat,
            locationLong: locationLong,
            locationDesc: locationDesc,
            locationImage: imageUrl,
          });
        res.json({
          message: "create success",
          image: "uploaded",
          location: {
            locationName,
            locationLat,
            locationLong,
            locationDesc,
            locationImage: imageUrl,
          },
        });
      });
  }
);

router.delete("delete/location/:id", async (req, res) => {
  const { id } = req.params;
  const data = await admin
    .app()
    .firestore()
    .collection("locations")
    .doc(id)
    .delete();
  res.json({
    message: `delete location id:${id} success`,
  });
});

module.exports = router;
