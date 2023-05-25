//express
const express = require("express");
const router = express.Router();

//import user.model.js
const User = require("../models/user.model");

//bcrypt
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

//GET login (affichage formulaire)
router.get("/login", function (req, res, next) {
  //console.log("req.session ===>", req.session);
  res.render("auth/login", {});
});
//(traitement du formulaire)
router.post("/login", function (req, res, next) {
  //console.log("req.body de la route POST du login ==", req.body);
  User.findOne({ email: req.body.email })
    .then(function (userFromDB) {
      if (userFromDB) {
        if (
          bcrypt.compareSync(req.body.passwordHash, userFromDB.passwordHash)
        ) {
          req.session.currentUser = userFromDB;

          res.render("userPage", {
            userName: req.body.userName,
            capital: ["$USD", "€EUR", "￥YEN", "฿BTC", "♢ETH"],
          });
        } else {
          console.log("WRONG ===> username || email || password");
          res.redirect("/login");
        }
      } else {
        res.render("auth/login");
      }
    })
    .catch((err) => console.log("err login", err));
});

//GET signup--> affiche le formulaire    POST--> traitement du formulaire
router.get("/signup", function (req, res, next) {
  res.render("auth/signup", {});
});
router.post("/signup", function (req, res, next) {
  //console.log("req.body requete signup .POST===", req.body);

  const passwordhash = bcrypt.hashSync(req.body.passwordHash, salt);

  new User({
    email: req.body.email,
    userName: req.body.userName,
    passwordHash: passwordhash,
  })
    .save()
    .then(function (newUserFromDB) {
      res.render("userPage", {
        userName: req.body.userName,
        capital: ["$USD", "€EUR", "￥YEN", "฿BTC", "♢ETH"],
      }),
        { layout: false };
    })
    .catch((err) => console.log("err user n'est pas en base", err));
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
