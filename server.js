const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const admin = require("./firebaseAd");

const api_location = require("./routes/api_location");
const api_promotion = require("./routes/api_promotion");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/petcare", api_location);
app.use("/api/v1/petcare/promotion", api_promotion);

app.listen(PORT, () => {
  console.log("Backend is running on port " + PORT);
});
