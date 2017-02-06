var express = require('express');
var router = express.Router();
var Comment = require('../lib/models/Comment');

router.get('/', function (req, res) {
    var comment = new Comment();
    Comment.find(function (err, comments) {
        if (err) {
            throw err;
        }
        res.render('about', {
            action: '/comments?_method=POST',
            comment: comment
        });
    });
});

router.get('/', function (req, res) {
    Comment.find(function (err, comments) {
        if (err) {
            throw err;
        }
        res.render('about', {
            comments: comments});
    });
});

module.exports = router;