const express = require("express");

const app = express(); //serveur web

app.set("view engine", "hbs"); //hbs

app.use(express.static("public")); //exp.static

app.get("/", function (req, res, next) {
  res.render("homepage");
});

app.get("/user", function (req, res, next) {
  res.render("userpage", {
    name: "John",
    cities: ["Paris", "Madrid", "Berlin", "LosAngeles"],
  });
});

app.get("/explore", function (req, res, next) {
  res.render("explore");
});

app.get("/learn", function (req, res, next) {
  res.render("learn");
});

app.get("/build", function (req, res, next) {
  res.render("build");
});

app.listen(3000, function () {
  console.log("HELLO WORLD ;) ");
});
