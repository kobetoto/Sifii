const express = require("express");

const router = express.Router();

const bodyParser = require("body-parser"); //catch data with .post

router.use(bodyParser.urlencoded({ extended: true }));

const User = require("../models/user.model"); //import user.model.js

//GET home page
router.get("/", function (req, res, next) {
  res.render("homepage");
});

//GET user page
router.get("/user", function (req, res, next) {
  if (req.session.currentUser) {
    res.render("userPage", {
      userName: req.session.currentUser.userName, //...|| req.session.currentUser.userName
      capital: ["$USD", "€EUR", "￥YEN", "฿BTC", "♢ETH"],
    }),
      { layout: false };
  } else {
    res.redirect("/login");
  }
});

router.post("/user", function (req, res, next) {
  console.log("corps de la req .POST (userpage)==", req.body);
  res.render("userPage", {
    userName: req.body.userName,
    capital: ["$USD", "€EUR", "￥YEN", "฿BTC", "♢ETH"],
  }),
    { layout: false };
});

//GET edit user page
router.get("/user/:id/edit", function (req, res, next) {
  res.send("edit user");
});

//GET explore page
router.get("/explore", function (req, res, next) {
  res.render("explore");
});

//GET learn page
router.get("/learn", function (req, res, next) {
  res.render("learn");
});

//GET build page
router.get("/build", function (req, res, next) {
  res.render("build");
});

module.exports = router;
