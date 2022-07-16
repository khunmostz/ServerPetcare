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

router.post(
  "/create/location",
  upload.single("fileImage"),
  async (req, res) => {
    const {
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
        await admin.app().firestore().collection("locations").add({
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

    // console.log(locationImage);
  }
);

router.put(
  "/put/location/:id",
  upload.single("fileImage"),
  async (req, res) => {}
);

router.delete("delete/location/:id", async (req, res) => {});

module.exports = router;
