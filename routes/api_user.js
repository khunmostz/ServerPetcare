const express = require("express");
const router = express.Router();
const upload = require(".././middleware/upload_image");
const admin = require("../firebaseAd");

router.get("/get", async (req, res) => {
  const data = await admin.app().firestore().collection("users").get();
  const userList = [];
  data.docs.map((snapshot) => {
    console.log(snapshot.data());
    snapshot = userList.push(snapshot.data());
    return userList;
  });
  res.status(200).json({
    message: "user",
    users: userList,
  });
});

module.exports = router;
