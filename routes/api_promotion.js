const express = require("express");
const router = express.Router();
const upload = require(".././middleware/upload_image");
const admin = require("../firebaseAd");
const cloudinary = require("../config");

router.get("/get", async (req, res) => {
  const data = await admin.app().firestore().collection("promotions").get();
  const promotionValues = [];
  data.docs.map((snapshot) => {
    console.log(snapshot.data());
    snapshot = promotionValues.push(snapshot.data());
    return promotionValues;
  });
  res.status(200).json({
    message: "promotions",
    promotions: promotionValues,
  });
});

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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await admin
    .app()
    .firestore()
    .collection("promotions")
    .doc(id)
    .delete();
  res.json({
    message: `delete promotion id:${id} success`,
  });
});

module.exports = router;
