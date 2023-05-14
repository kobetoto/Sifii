const express = require("express");

const router = express.Router();

const User = require("../models/user.model"); //import user.model.js

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

//GET login (affichage formulaire)
router.get("/login", function (req, res, next) {
  res.render("login", {});
});
//(traitement du formulaire)
router.post("/login", function (req, res, next) {
  //console.log("req.body de la route POST du login ==", req.body);
  User.findOne({ email: req.body.email })
    .then(function (userFromDB) {
      //console.log("user from db de login", userFromDB);
      //console.log("req.body.passwordHash ========>", req.body.passwordHash);
      //console.log("userFromDB.passwordHash========>", userFromDB.passwordHash);

      if (userFromDB) {
        if (
          bcrypt.compareSync(req.body.passwordHash, userFromDB.passwordHash)
        ) {
          res.render("userPage", {
            userName: req.body.userName,
            capital: ["$USD", "€EUR", "￥YEN", "฿BTC", "♢ETH"],
          });
        } else {
          res.redirect("/login");
        }
      } else {
        res.render("login");
      }
    })
    .catch((err) => console.log("err login", err));
});

//GET signup--> affiche le formulaire    POST--> traitement du formulaire
router.get("/signup", function (req, res, next) {
  res.render("signup", {});
});
router.post("/signup", function (req, res, next) {
  console.log("req.body requete signup .POST===", req.body);

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

module.exports = router;
