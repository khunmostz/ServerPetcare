const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const admin = require('./firebaseAd');

const api_location = require("./routes/api_location");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/petcare", api_location);

// app.get('/test', async (req, res) => {
//   admin.app().firestore().collection('test').add({ test: 'test2' });
//   res.json({
//     message: 'ok'
//   })
// })

app.listen(PORT, () => {
  console.log("Backend is running on port " + PORT);
});
