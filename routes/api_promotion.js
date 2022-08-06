const express = require("express");
const router = express.Router();
const upload = require(".././middleware/upload_image");
const admin = require("../firebaseAd");
const cloudinary = require("../config");

router.get("get", async (req, res) => {});

router.post("/create", upload.single("fileImage"), async (req, res) => {
  const { promotionId, promotionTitle, promotionImage, adminId } = req.body;
  var imageUrl = "";
  cloudinary.uploader
    .upload(
      req.file.path,
      {
        user_filename: true,
        unique_filename: false,
        folder: "promotions",
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
        .collection("promotions")
        .doc(promotionId)
        .set({
          promotionId,
          promotionTitle,
          promotionImage: imageUrl,
          adminId,
        });
      res.json({
        message: "create success",
        image: "uploaded",
        location: {
          promotionId,
          promotionTitle,
          promotionImage: imageUrl,
          adminId,
        },
      });
    });
});

module.exports = router;