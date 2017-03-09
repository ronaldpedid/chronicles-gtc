var mongoose = require('mongoose');
var SPSchema = new mongoose.Schema({
    cardName: {
        type: String,
            required: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    game: {
        type: String,
        required: true

    },
    price: {
        type: String,
        required: true
    }
});

var spReport = mongoose.model('spReport', SPSchema );
module.exports = spReport;
module.exports.schema = SPSchema; 