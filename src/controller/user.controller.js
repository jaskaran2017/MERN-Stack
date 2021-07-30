//controller will have all the functions
//we exposrt the functions and call them where they are required

const User = require("../models/user_model");

//exporting signup function

exports.signup = (req, res) => {
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
          message: "User created successfully...",
        });
      }
    });
  });
};
