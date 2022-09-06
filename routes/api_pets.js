const express = require("express");
const router = express.Router();
const upload = require(".././middleware/upload_image");
const admin = require("../firebaseAd");

router.get("/get", async (req, res) => {
  const data = await admin.app().firestore().collection("pets").get();
  const petsList = [];
  data.docs.map((snapshot) => {
    console.log(snapshot.data());
    snapshot = petsList.push(snapshot.data());
    return petsList;
  });
  res.status(200).json({
    message: "pets",
    pets: petsList,
  });
});

module.exports = router;
