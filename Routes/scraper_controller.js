var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

router.get("/", function (req, res) {
    res.render("index.handlebars");
});

router.get("/all", function (req, res) {

    request("https://www.nytimes.com/", function (err, response, html) {

        if (err) {

            console.log(err);
        }
        var $ = cheerio.load(html);
        var results = [];

        $("h2.story-heading").each(function (i, element) {

            var title = $(element).text();
            var link = $(element).children().attr("href");

            results.push({
                title: title,
                link: link
            });
        });
        console.log(results);
        res.send(results);
    });
});

//is this body or params?? I am clicking on something in the body but trying to get the id of that item to alter it's boolean saved to true.
router.post("/save/:id", function (req, res) {
    console.log(req.body.id);
    db.scraped.update(
        {
            _id: mongojs.ObjectId(req.body.id)
        },
        {
            $set: {
                title: req.body.title,
                status: saved
            }
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

router.get("/all/saved", function (req, res) {
    db.scraped.find({ status: saved }, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            console.log(found);
            res.send(found);
        }
    });
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
router.get("/delete/:id", function (req, res) {
    db.scraped.remove(
        {
            _id: mongojs.ObjectId(req.body.id)
        },
        function (err, removed) {

        }
    )
})






module.exports = router;