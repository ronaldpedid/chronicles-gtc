var express = require('express');
var router = express.Router();
var Item = require('../lib/models/Item');
var lodash = require('lodash');
var User = require('../lib/models/User');
var passport = require('passport');
var mongoose = require('mongoose');

function getFilterFromQueryString(query) {
    var filter = {};
    var cardName = query.cardName;
    if (!lodash.isEmpty(cardName)) {
        var pattern = lodash.escapeRegExp(cardName);
        filter.cardName = {
            $regex: new RegExp(pattern, "i")
        };
    }
    return filter;
}

function getSortFromQueryString(query) {
    return [['clanName', 1]];
}

router.get('/', function (req, res) {
    var filter = getFilterFromQueryString(req.query);
    var sort = getSortFromQueryString(req.query);
    Item.find(filter).populate('lastUpdatedBy').sort(sort).exec(function (err, items) {
        if (err) {
            throw err;
        }
        var groupedItems = lodash.chain(items).groupBy("clanName").map(function (itemGroup, clanName) {
            return {clanName: clanName, items: itemGroup};
        }).value();
        res.render('inventory/all', {
            items: items,
            groupedItems: groupedItems,
            layout: req.query.bodyonly ? "bodyonly" : "layout",
            showSection: req.query.bodyonly !== "true"
        });
    });
});


router.get('/inventory/', function (req, res) {
    if (!req.session.user) {
        return res.status(401).send();
    }

    return res.status(200).send();
});

// GET /events/create
// "Show page to create new event"
router.get('/add', function (req, res) {
    var item = new Item();
    Item.find(function (err) {
        if (err) {
            throw err;
        }
        res.render('inventory/add', {
            action: '/inventory?_method=POST',
            item: item
        });
    });
});


router.get('/:id/add', function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (err) {
            throw err;
        }
        res.render('inventory/add', {
            action: '/inventory/' + item.id + '?_method=PUT',
            item: item,
            deleteAction: '/inventory/' + item.id + '?_method=DELETE'
        });
    });


});

router.put('/:id', function (req, res) {
    console.log(req.user);
    var data = Object.assign({}, req.body, {lastUpdatedBy: req.user.id});
    Item.findOneAndUpdate({_id: req.params.id}, data,
        function (err, item) {
            if (err) {
                throw err;
            }
            res.redirect('/inventory' + '#' + item.id)
        })
});


// POST /events
// "Form post to create event"
router.post('/', function (req, res) {
    console.log(req.body);
    var data = Object.assign({}, req.body, {lastUpdatedBy: req.user.id});
    Item.create(data, function (err, item) {
        if (err) {
            req.flash("error", err.message);
            res.redirect('back');
            return
        }
        const id = item.id;
        res.redirect('/inventory/' + id);
    });
});

// GET /events/:id
// "Show a single event"
router.get('/:id', function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (err) {
            throw err;
        }
        res.render('inventory/item', {item: item});
    });
});


// GET /events/:id/edit
// "Show page to edit an event"
router.get('/:id/edit', function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (err) {
            throw err;
        }

        res.render('inventory/add', {
            action: '/inventory/' + item.id + '?_method=PUT',
            item: item,
            deleteAction: '/inventory/' + item.id + '?_method=DELETE'

        });
    });
});


router.delete('/:id', function (req, res) {
    Item.findByIdAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            throw err;
        }
        res.redirect('/inventory/');
    });
});

module.exports = router;
