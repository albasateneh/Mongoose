var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scaping
var axios = require("axios");
var cheerio = require("cheerio");

//var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://localhost/mongoHeadlines", {useNewUrlParser: true});

mongoose.connect(MONGODB_URI);

    axios.get("https://old.reddit.com/r/edmproduction/").then(function(response) {
       
    var $ = cheerio.load(response.data);

    $("p.title").each(function(i, element) {
        var results = [];

        var title = $(element).text();


            var link = $(element).children().attr("href");


        results.push({
            title: title,
            link: link
        })
        console.log(results);
    })



    })


app.listen(PORT, function() {
    console.log("App runnin on port " + PORT + "!");
})