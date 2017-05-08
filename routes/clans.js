//create, read, update and delete
var express = require('express');
var router = express.Router();
var Clan = require('../lib/models/Clan.js');


// START NEW CRUD //
// GET /events
// "Show all events"
router.get('/', function (req, res) {
    Clan.find(function (err, clans) {
        if (err) {
            throw err;
        }
        res.render('clans/clans', {clans: clans});
    });
});

// GET /events/create
// "Show page to create new event"
router.get('/create', function (req, res) {
    var clan = new Clan();
    res.render('clans/edit', {
        action: '/clans?_method=POST',
        clan: clan
    });
});

// GET /events/:id
// "Show a single event"
router.get('/:id', function (req, res) {
    Clan.findById(req.params.id, function (err, clan) {
        if (err) {
            throw err;
        }
        res.render('clans/clan', {clan: clan});
    });
});

// POST /events
// "Form post to create event"
router.post('/', function (req, res) {
    console.log(req.body);
    Clan.create(req.body, function (err, clan) {
        if (err) {
            throw err;
        }
        const id = clan.id;
        res.redirect('/clans/' + id);
    });

});

// GET /events/:id/edit
// "Show page to edit an event"
router.get('/:id/edit', function (req, res) {
    Clan.findById(req.params.id, function (err, clan) {
        if (err) {
            throw err;
        }

        res.render('clans/edit', {
            action: '/clans/' + clan.id + '?_method=PUT',
            clan: clan,
            deleteAction: '/clans/' + clan.id + '?_method=DELETE'
        });
    });
});
// PUT/PATCH /events/:id
// "Update server with changes"
router.put('/:id', function (req, res) {
    console.log(req.body);
    Clan.findOneAndUpdate({_id: req.params.id}, req.body,
        function (err, clans) {
            if (err) {
                throw err;
            }
            res.redirect('/clans/' + clan.id + '/edit')
        });
});

// DELETE /events/:id
// "Delete the record"
router.delete('/:id', function (req, res) {
    Clan.findByIdAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            throw err;
        }
        res.redirect('/clans/')
    })
});

module.exports = router;