//serveur web
const express = require("express");
const app = express();

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
