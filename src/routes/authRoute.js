// this router file will give us excess to diffrent pages. all routers for pages will be written here

const express = require("express");
const { signup, signin, requireSignin } = require("../controller/authController");
const router = express.Router();
const user = require("../models/user_model");

router.post("/signup", signup); // signup function is completed.

router.post("/signin", signin); // signin function completed.

router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: "profile" });
});

module.exports = router;
