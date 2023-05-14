const mongoose = require("mongoose");
const User = require("./models/user.model"); //import user.model.js

mongoose
  .connect("mongodb://localhost:27017/Siƒii")
  .then((x) => {
    console.log("Connected SiƒiiDB");
  })
  .catch((err) => {
    console.log("error to connecting to SiƒiiDB:   ", err);
  });

User.create(/*les differents utilisateurs*/)
  .then((allUserFromDB) => console.log("User in DB ok!"))
  .catch((err) => console.log("err User create::", err));
