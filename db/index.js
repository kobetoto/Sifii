const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Siƒii";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    //const databaseName = x.connection(0).name;
    console.log(`Connected to Mongo!! Database name: Siƒii`);
  })
  .catch((err) => {
    console.log("error to connecting to Mongo: ", err);
  });
