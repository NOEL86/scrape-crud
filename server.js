var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
// var PORT = process.env.PORT || 3000;
var app = express();

var databaseUrl = "articles";
var collections = ["comments"];

var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database Error:", error);
});


var methodOverride = require('method-override');

app.use(express.static("public"));

app.use(logger("dev"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./Routes/scraper_controller.js");
app.use(routes);

app.listen(3000, function () {
    console.log("App running on port 3000!");
});



// app.listen(PORT, function () {
//     console.log("App now listening at localhost:" + PORT);
// });