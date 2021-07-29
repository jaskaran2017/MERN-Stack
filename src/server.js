const express = require("express");
const env = require("dotenv");
// const bodyParser = require("body-parser"); this dev dependancy is depricated.
const app = express();

// calling environment variables or constants here
env.config();

//adding a middleware to send data
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello, I am the server.",
  });
});

// making post request

app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body,
  });
});

//app.listen will be given the PORT value to execute in browser
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
