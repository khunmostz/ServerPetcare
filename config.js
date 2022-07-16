const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dweommand",
  api_key: "512587975387433",
  api_secret: "ol16q0gbcBgOVs0VO2lx4Zx2RS4",
  secure: true,
});

module.exports = cloudinary;
