// this router file will give us excess to diffrent pages. al routers for pages will bewritten here

const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

router.post("/signin", (req, res) => {
  console.log("signin");
});

router.post("/signup", (req, res) => {
  //if the user alredy exists app will check aand not allowed to signup again
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { firstName, lastName, email, password, username } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Somethin went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          user: data,
        });
      }
    });
  });
});

module.exports = router;
