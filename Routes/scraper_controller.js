var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var db = require('../models');

//routes endpoints handlers

router.get("/", function (req, res) {
    db.Headline.find({}).then(function (response) {
        console.log(response);
        res.render("index.handlebars", {
            articles: response
        });
    })
});
router.get("/saved", function (req, res) {
    db.Headline.find({ saved: true }).then(function (response, err) {
        if (err) throw err;

        else {
            console.log(response);
            res.render("saved", {
                articles: response
            });
        }
    })
});

router.get("/all", function (req, res) {
    console.log("all route hit");
    request("https://www.nytimes.com/", function (err, response, html) {

        if (err) {

            console.log(err);
        }
        var $ = cheerio.load(html);
        var results = [];
        var id = 0;
        $("div.css-6p6lnl").each(function (i, element) {

            var title = $(element).text();
            var summary = $(element).find("p").text();
            var url = $(element).children().attr("href");
            id++;

            var results = {
                title: title,
                url,
                summary,
                id
            };
            db.Headline.create(results).then(function (response) {
                console.log(response);
            })
        });
        console.log("+++++++++++++++++++");
        res.json(results);
    });
});

router.post("/save/:id", function (req, res) {

    db.Headline.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $set: {
                saved: true
            }
        },
        {
            new: true
        },
        function (err, saved) {
            if (err) {
                console.log(err);
            } else {
                console.log(saved);
                res.send(saved);
            }
        }
    );
});

//this is creating a Note and adding it to the headlines and note dbs
router.post("/headlines/:id", function (req, res) {
    console.log(req.params.id);

    db.Note.create(req.body).then(function (note) {
        var note = req.body
        return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: db.Note._id }, { new: true }).then(function (article, err) {
            res.send(article);
            if (err) {
                console.log(err);
            }
        })
    });
});

//again params or body?? I am getting this information from a user click function.
router.post("/delete/:id", function (req, res) {
    db.Headline.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $set: {
                saved: false
            }
        },
        {
            new: true
        },
        function (err, removed) {
            if (err) {
                console.log(err);
            } else {
                console.log(removed);
                res.send(removed);
            }
        }
    );
});

module.exports = router;