const express = require("express");
const env = require("dotenv");
// const bodyParser = require("body-parser"); //this dev dependancy is depricated.
const app = express();
const mongoose = require("mongoose");

// routes
const userRoutes = require("./routes/users");

// calling environment variables or constants here
env.config();

//mongodb connection string
//mongodb+srv://root:<password>@mern-stack.jzjaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.Mongo_db_user}:${process.env.Mongo_db_password}@mern-stack.jzjaz.mongodb.net/${process.env.Mongo_db_database}?retryWrites=true&w=majority`,

    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

//adding a middleware to send data
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use("/api", userRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello, I am the server.",
  });
});

// making post request or creating the user

app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: res.body,
  });
});

//app.listen will be given the PORT value to execute in browser
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
