/**
 * Created by ronal on 1/9/2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../lib/models/User');
var passport = require('passport');

/* GET home page. */
//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Chronicles: GTC', condition:true, anyArray: [1,2,3] });
//});
router.get('/', function (req, res, next) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.post('/', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
module.exports = router;