//serveur web
const express = require("express");
const app = express();

//express-session (cookies)
const session = require("express-session");

// COOKIES since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = (app) => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there

  // required for the app when deployed to Heroku (in production)
  app.set("trust proxy", 1);

  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        //maxAge: 6000000, // 60 * 1000 ms === 1 min
      },
    })
  );
};

//connect to the database
require("./db");

//configure express pour utiliser body-parse
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//hbs
app.set("view engine", "hbs");

//exp.static
app.use(express.static("public"));

const indexRoutes = require("./routes/index.routes.js");
const authRoutes = require("./routes/auth.routes.js");

//"monter le router"
app.use("/", indexRoutes);
app.use("/", authRoutes);

app.listen(3000, function () {
  console.log("HELLO WORLD ;) ");
});
