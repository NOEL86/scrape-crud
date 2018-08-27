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

router.get("/all", function (req, res) {

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

//is this body or params?? I am clicking on something in the body but trying to get the id of that item to alter it's boolean saved to true.
router.post("/save/:id", function (req, res) {

    db.Headline.findByIdAndUpdate(
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

router.get("/saved", function (req, res) {
    db.Headline.find({ saved: true }).then(function (err, response) {
        if (err) throw err;

        else {
            console.log(response);
            res.render("saved.handlebars", {
                articles: response
            });
        }
    })
});

router.post("/note", function (req, res) {
    console.log(req.body);
    db.notes.insert(req.body, function (err, note) {
        if (err) {
            console.log(err);
        } else {
            console.log(note);
            res.send(note);
        }
    });
});

//again params or body?? I am getting this information from a user click function.
router.post("/delete/:id", function (req, res) {
    db.Headline.remove(
        {
            _id: req.params.id
        },
        {
            new: true
        },
        function (err, removed) {
            if (err) {
                console.log(err);
            } else {

            }
        }
    )
});

router.delete({ saved: false }, function (req, res) {
    db.Headline.remove({ saved: false }, { new: true }),
        function (err, removed) {
            if (err) {
                console.log(err);
            } else {
                res.send(removed);
            }
        }
});


module.exports = router;