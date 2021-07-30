//user model is use to define user and the field to obtain the required info about the user.

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// here we are defining the requires field for user authentication

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      index: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      trim: true,
      required: true,
      min: 8,
      max: 15,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contact: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

// hashing the plain password with bcrypt library

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

// making comparision of password with stored password for authentication

userSchema.method = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("user_model", userSchema);
