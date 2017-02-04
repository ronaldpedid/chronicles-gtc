/**
 * Created by ronal on 1/21/2017.
 */
//create, read, update and delete
var express = require('express');
var router = express.Router();
var Game = require('../lib/models/Game.js');


// START NEW CRUD //
// GET /events
// "Show all events"
router.get('/', function (req, res) {
    Game.find(function (err, games) {
        if (err) {
            throw err;
        }
        res.render('games/games', {games: games});
    });
});

// GET /events/create
// "Show page to create new event"
router.get('/create', function (req, res) {
    var game = new Game();
    res.render('games/edit', {
        action: '/games?_method=POST',
        game: game
    });
});

// GET /events/:id
// "Show a single event"
router.get('/:id', function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (err) {
            throw err;
        }
        res.render('games/game', {game: game});
    });
});

// POST /events
// "Form post to create event"
router.post('/', function (req, res) {
    console.log(req.body);
    Game.create(req.body, function (err, game) {
        if (err) {
            throw err;
        }
        const id = game.id;
        res.redirect('/games/' + id);
    });

});

// GET /events/:id/edit
// "Show page to edit an event"
router.get('/:id/edit', function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (err) {
            throw err;
        }

        res.render('games/edit', {
            action: '/games/' + game.id + '?_method=PUT',
            game: game,
            deleteAction: '/games/' + game.id + '?_method=DELETE'
        });
    });
});
// PUT/PATCH /events/:id
// "Update server with changes"
router.put('/:id', function (req, res) {
    console.log(req.body);
    Game.findOneAndUpdate({_id: req.params.id}, req.body,
        function (err, game) {
            if (err) {
                throw err;
            }
            res.redirect('/games/' + game.id + '/edit')
        });
});

// DELETE /events/:id
// "Delete the record"
router.delete('/:id', function (req, res) {
    Game.findByIdAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            throw err;
        }
        res.redirect('/games/')
    })
});

module.exports = router;