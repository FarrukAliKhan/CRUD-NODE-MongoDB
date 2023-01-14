const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homeRoutes = require("./routers/home");

const app = express();
const port = process.env.port || 5500;

const uri = "mongodb://localhost:27017/studentsdetails";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

  family: 4, // Use IPv4, skip trying IPv6
};

const connectWithDB = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) console.error(err);
    else console.log("database connection succedded");
  });
};

connectWithDB();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", homeRoutes);

app.listen(port);
