const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
//Khoi tao session
app.use(
  session({
    secret: "vietpro-secret"
  }));

//Khoi
require("../lib/mongo-db");
app.use("/access", express.static(path.join(__dirname, "..", "public")));
console.log(path.join(__dirname, "..", "public"));

//using bodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Using template engine
app.set("views", path.join(__dirname, "..", "app", "views"));
app.set("view engine", "ejs");

app.use("/api", require("../routes/api"));
app.use("/", require("../routes/web"));
app.use("/static", express.static(__dirname + "/../public"));

module.exports = app;