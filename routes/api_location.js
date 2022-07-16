const express = require("express");
const router = express.Router();
const admin = require("../firebaseAd");
const uploadImage = require("../middleware/upload_image");
const multer = require("multer");

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

router.post("/upload", upload.single("fileupload"), async (req, res) => {
  console.log("fileName: ", req.file);
});

// router.post("/create/location", async (req, res) => {
//   const {
//     locationName,
//     locationLat,
//     locationLong,
//     locationDesc,
//     locationImage,
//   } = req.body;

//   await admin.app().firestore().collection("locations").add({
//     locationName: locationName,
//     locationLat: locationLat,
//     locationLong: locationLong,
//     locationDesc: locationDesc,
//     locationImage: locationDesc,
//   });
//   res.json({
//     message: "create success",
//     location: {
//       locationName,
//       locationLat,
//       locationLong,
//       locationDesc,
//       locationImage,
//     },
//   });
// });

module.exports = router;
