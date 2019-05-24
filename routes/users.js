var express = require("express");
var router = express.Router();
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET users listing. */

router.post("/regis", (req, res) => {
  const { username } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  models.User.create({ username, password }).then(user => {
        res.status(200).json({ message: "Valid Regis" });
  }).catch(err => {
	  console.log(err)
	  res.status(403).json({ message: "Invalid Regis" });
  })
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  models.User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user != null) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword === true) {
        const token = jwt.sign({ user: user }, "secret_key");
        res
          .status(200)
          .json({ message: "Success Login", data: { token: token } });
      } else {
        res.status(403).json({ message: "Invalid Login" });
      }
    } else {
      res.status(403).json({ message: "Invalid Login" });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/users/login");
    }
  });
});
module.exports = router;
