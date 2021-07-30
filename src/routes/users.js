// this router file will give us excess to diffrent pages. all routers for pages will be written here

const express = require("express");
const { signup } = require("../controller/user.controller");
const router = express.Router();
const User = require("../models/user_model");

router.post("/signup", signup); // signup function is completed.

router.post("/signin", (req, res) => {
  console.log("signin");
});

module.exports = router;
