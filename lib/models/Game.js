var mongoose = require('mongoose');
var gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        required: true
    }

});

var Game = mongoose.model('Game', gameSchema);
module.exports = Game;
module.exports.schema = gameSchema;