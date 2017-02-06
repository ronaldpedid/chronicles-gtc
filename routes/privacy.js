/**
 * Created by ronal on 2/5/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Chronicles: GTC', condition:true, anyArray: [1,2,3] });
//});
router.get('/', function (req, res, next) {
        res.render('privacy');
    });

module.exports = router;