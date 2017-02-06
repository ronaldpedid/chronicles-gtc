//create, read, update and delete
var express = require('express');
var router = express.Router();
var Caro = require('../lib/models/Carousel');
var passport = require('passport');

// START NEW CRUD //
// GET /events
// "Show all events"
router.get('/', function (req, res) {
    Caro.findOrCreate({}, {
            picturePath: "string",
            picturePath1: "string",
            picturePath2: "string"
        },
        function (err, caro) {
            if (err) {
                throw err;
            }
            res.render('caro/caro', {
                caro: caro,
                action: "/caro?_method=POST"
            });
        });
});


// GET /events/:id
// "Show a single event"
router.post('/', function (req, res) {
    Caro.findOrCreate({}, req.body,
        function (err, caro, wasCreated) {
            if (err) {
                throw err;
            }
            if (!wasCreated) {
                Caro.findOneAndUpdate({}, req.body,{new:true}, function (err2, caro2) {
                    res.render('caro/caro', {caro: caro2, action: "/caro?_method=POST"});
                })
            } else {
                res.render('caro/caro', {caro: caro, action: "/caro?_method=POST"});
            }
        });
});


module.exports = router;