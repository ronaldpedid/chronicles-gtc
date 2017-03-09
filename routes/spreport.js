
var express = require('express');
var router = express.Router();
var spReport = require('../lib/models/SP');
var passport = require('passport');

router.get('/', function (req,res){
    spReport.find(function (err, report){
        if (err) {
            throw err
        }
        res.render('spreport/splist', {report: report});
    });
});

router.get('/create', function (req, res) {
    var report = new spReport();
    spReport.find(function (err, report) {
        if (err) {
            throw err;
        }
        res.render('spreport/edit', {
            action: '/spreport?_method=POST',
            report: report

        });
    });
});

// "Show a single event"
router.get('/:id', function (req, res) {
    spReport.findById(req.params.id, function (err, report) {
        if (err) {
            throw err;
        }
        res.render('spreport/record', {
            report: report,
            deleteAction: '/spreport/' + report.id + '?_method=DELETE'
        });
    });

});

router.post('/', function (req, res) {
    console.log(req.body);
    spReport.create(req.body, function (err, report) {
        if (err) {
            throw err;
        }
        req.flash("success", "Successfully recorded!");
        res.redirect('spreport/');
    });
});

router.delete('/:id', function (req, res) {
    spReport.findByIdAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            throw err;
        }
        res.redirect('/spreport/');

    });
});
module.exports = router;