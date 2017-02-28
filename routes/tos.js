/**
 * Created by ronal on 2/27/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('tos');
});

module.exports = router;