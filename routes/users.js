var express = require("express");
var router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

// GET users listening?

router.get("/", function (req, res, next) {
  res.render("users.ejs");
});

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    db.User.create({ username, email, password: hash }).then((result) => {
      res.redirect("/users");
    });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.User.findOne({ where: { username } })
    .then((Users) => {
      bcrypt.compare(password, Users.password, (err, match) => {
        if (match) {
          res.send("Logged In!");
        } else {
          res.send("Incorrect Login Information");
        }
      });
    })
    .catch(() => {
      res.send("username not found");
    });
});

module.exports = router;
