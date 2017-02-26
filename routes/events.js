var express = require('express');
var router = express.Router();
var Event = require('../lib/models/Event');
var Game = require('../lib/models/Game');
var mongoose = require('mongoose');


// GET /events
// "Show all events"
router.get('/', function (req, res) {
    Event.find().populate('game').sort([['startTime', 1]]).exec(function (err, events) {
        if (err) {
            throw err;
        }
        console.log(events);
        res.render('events/events', {events: events});
    });
});

// GET /events/create
// "Show page to create new event"
router.get('/create', function (req, res) {
    var event = new Event();
    Game.find(function (err, games) {
        if (err) {
            throw err;
        }
        res.render('events/editEvent', {
            action: '/events?_method=POST',
            event: event,
            games: games
        });
    });
});


// GET /events/:id
// "Show a single event"
router.get('/:id', function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            throw err;
        }
        res.render('events/event', {event: event});
    });
});

// POST /events
// "Form post to create event"
router.post('/', function (req, res) {
    console.log(req.body);
    req.body.game = mongoose.Types.ObjectId(req.body.game);
    Event.create(req.body, function (err, event) {
        if (err) {
            throw err;
        }
        const id = event.id;
        res.redirect('/events/' + id);
    });
});

// GET /events/:id/edit
// "Show page to edit an event"
router.get('/:id/edit', function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            throw err;
        }
        Game.find(function (err2, games) {
            if (err2) {
                throw err2;
            }
            res.render('events/editEvent', {
                action: '/events/' + event.id + '?_method=PUT',
                event: event,
                deleteAction: '/events/' + event.id + '?_method=DELETE',
                games: games
            });
        });


    });
});
// PUT/PATCH /events/:id
// "Update server with changes"
router.put('/:id', function (req, res) {
    console.log(req.body);
    Event.findOneAndUpdate({_id: req.params.id}, req.body,
        function (err, event) {
            if (err) {
                throw err;
            }
            res.redirect('/events/' + event.id + '/edit')
        })
});

// DELETE /events/:id
// "Delete the record"
router.delete('/:id', function (req, res) {
    Event.findByIdAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            throw err;
        }
        res.redirect('/events/');
    });
});


module.exports = router;
