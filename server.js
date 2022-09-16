const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const admin = require("./firebaseAd");

const api_location = require("./routes/api_location");
const api_promotion = require("./routes/api_promotion");
const api_user = require("./routes/api_user");
const api_pets = require("./routes/api_pets");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json({
    message: "test",
  });
});

app.use("/api/v1/petcare", api_location);
app.use("/api/v1/petcare/promotion", api_promotion);
app.use("/api/v1/petcare/users", api_user);
app.use("/api/v1/petcare/pets", api_pets);

app.listen(PORT, () => {
  console.log("Backend is running on port " + PORT);
});
