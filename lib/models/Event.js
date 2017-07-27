var mongoose = require('mongoose');
var Game = require('./Game');
var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    startTime: {
        type: Date,
        required: false
    },
    description: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }
});

var Event = mongoose.model('Event', eventSchema);
module.exports.schema = eventSchema;
module.exports = Event;