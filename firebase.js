const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyD6lWKPixblmvlWBQA6BOSo2fWG5gAYe1Y",
  authDomain: "petcare-fd130.firebaseapp.com",
  projectId: "petcare-fd130",
  storageBucket: "petcare-fd130.appspot.com",
  messagingSenderId: "1007922913995",
  appId: "1:1007922913995:web:b7bcc563e1f56048be714e",
  measurementId: "G-953ESTRQN5",
};

firebase.initializeApp(firebaseConfig);
const locationsDb = firebase.firestore().collection("locations");

module.exports = locationsDb;
