
var express = require('express');
var router = express.Router();
var User = require('../lib/models/User');
var passport = require('passport');

/* GET home page. */
//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Chronicles: GTC', condition:true, anyArray: [1,2,3] });
//});
router.get('/', function (req, res, next) {
    res.render('dashboard');
});

router.get('/dashboard', function (req, res) {
    if (!req.session.user) {
        return res.status(401).send();
    }

    return res.status(200).send();
})
module.exports = router;