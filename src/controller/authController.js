//controller will have all the functions
//we exposrt the functions and call them where they are required
//it working as auth in firebase

const user = require("../models/user_model");
const jwt = require("jsonwebtoken");

//exporting signup function

exports.signup = (req, res) => {
  //if the user alredy exists app will check aand not allowed to signup again

  user.findOne({ email: req.body.email }).exec((error, user) => {
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
// signion function

exports.signin = (req, res) => {
  user.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      //varification of user run here
      if (user.authenticate(req.body.password)) {
        // here we will match the password saved by the user
        // and genrate a token for him to authenticat himself
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        // when the saved and current password matches with ech other then we have the user with all the required info...
        const { _id, firstName, lastName, email, role, fullName } = user;

        //when successfull this response will we send
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        //if unsuccessfull this warnning will be displayed
        res.status(400).json({ message: "Invalid username or password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong..." });
    }
  });
};

exports.requireSignin = (req, res, next) => {
  //requiire signin is a middle ware used for the verification
  const token = req.headers.authorization.split(" ")[1]; //the token generated with jwt will be sent in header to match
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
