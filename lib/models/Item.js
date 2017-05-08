var mongoose = require('mongoose');
var Clan = require('./Game');
var itemSchema = new mongoose.Schema({
    cardName: {
        type: String,
        required: [true, "Card name is needed!"]
    },
    quantity: {
        type: Number,
        min: [-1, 'add at least one.'],
        max: [99],
        required: true
    },
    startTime: {
        type: Date,
        required: false
    },
    printSet: {
        type: String,
        required: false
    },
    rarity: {
        type: String,
        required: false
    },
    grade: {
        type: String,
        required: false
    },
    condition: {
        type: String,
        required: false
    },
    clanName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    cardImage: {
        type: String,
        required: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clan"
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});


var Item = mongoose.model('Item', itemSchema);
module.exports.schema = itemSchema;
module.exports = Item;