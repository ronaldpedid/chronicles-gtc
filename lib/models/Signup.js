const mongoose = require('mongoose');
const Game = require('./Game');
const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }
});

const signUp = mongoose.model('signUp', signUpSchema);
module.exports.schema = signUpSchema;
module.exports = signUp;

