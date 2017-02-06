//create, read, update and delete
var express = require('express');
var router = express.Router();
var Comment = require('../lib/models/Comment');
var passport = require('passport');


// START NEW CRUD //
// GET /comment
// "Show all comments"
router.get('/', function (req, res) {
    Comment.find(function (err, comments) {
        if (err) {
            throw err;
        }
        res.render('comments/comments', {comments: comments});
    });
});

// GET /events/create
// "Show page to create new event"
router.get('/create', function (req, res) {
    var comment = new Comment();
    Comment.find(function (err, comment) {
        if (err) {
            throw err;
        }
        res.render('comments/edit', {
            action: '/comments?_method=POST',
            comment: comment
        });
    });
});

// GET /events/:id
// "Show a single event"
router.get('/:id', function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            throw err;
        }
        res.render('comments/comment', {comment: comment,
            deleteAction: '/comments/' + comment.id + '?_method=DELETE'});
    });

});

// POST /events
// "Form post to create event"
router.post('/', function (req, res) {
    console.log(req.body);
    Comment.create(req.body, function (err, comment) {
        if (err) {
            throw err;
        }
        req.flash("success", "We have received your message!");
        res.redirect('/');
    });
});

// GET /events/:id/edit
// "Show page to edit an event"
    router.get('/:id/edit', function (req, res) {
        if (err) {
            throw err;
        }
        res.render('comments/edit', {
            action: '/comments/' + comment.id + '?_method=PUT',
            comment: comment,
            deleteAction: '/comments/' + comment.id + '?_method=DELETE'
        });
    });

// PUT/PATCH /events/:id
// "Update server with changes"
    router.put('/:id', function (req, res) {
        console.log(req.body);
        Comment.findOneAndUpdate({_id: req.params.id}, req.body,
            function (err, comment) {
                if (err) {
                    throw err;
                }
                res.redirect('/comments/' + comment.id + '/edit')
            });
    });

// DELETE /events/:id
// "Delete the record"
    router.delete('/:id', function (req, res) {
        Comment.findByIdAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                throw err;
            }
            res.redirect('/comments/');

        });
    });

module.exports = router;
