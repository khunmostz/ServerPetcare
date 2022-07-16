const express = require("express");
const router = express.Router();
const multer = require("multer");
const admin = require("../firebaseAd");
const cloudinary = require("../config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "file-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({ storage: storage });

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

router.post("/create/location", upload.single("fileName"), async (req, res) => {
  const { locationName, locationLat, locationLong, locationDesc } = req.body;
  var locationImage = "";
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
        res.json({
          message: "uploaded",
        });
      }
    )
    .then(async (result) => {
      locationImage = result.url;
      await admin.app().firestore().collection("locations").add({
        locationName: locationName,
        locationLat: locationLat,
        locationLong: locationLong,
        locationDesc: locationDesc,
        locationImage: locationImage,
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
});

module.exports = router;
