var express = require('express');
var router = express.Router();
// var User = require('../lib/models/User');
var Event = require('../lib/models/Event');
var Game = require('../lib/models/Game');
var mongoose = require('mongoose');
var Comment = require('../lib/models/Comment');
var Caro = require('../lib/models/Carousel');
mongoose.connect('mongodb://localhost/users');


/* GET home page. */
//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Chronicles: GTC', condition:true, anyArray: [1,2,3] });
//});
router.get('/', function (req, res) {
    Event.find().populate('game').sort([['startTime', 1]]).exec(function (err, events) {
        if (err) {
            throw err;
        }
        var comment = new Comment();
        Comment.find(function (err, comments) {
            if (err) {
                throw err;
            }
            Caro.findOne(function (err, caro){
                if (err) {
                    throw err;
                }
                console.log(events);
                res.render('index', {
                    action: '/events?_method=POST',
                    commentAction: '/comments?_method=POST',
                    comment: comment,
                    events: events,
                    caro: caro
                });
            });
        });
    });
});



module.exports = router;
