var admin = require("firebase-admin");

var serviceAccount = require("./utils/petcare-fd130-firebase-adminsdk-zq1u0-74ed190320.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;