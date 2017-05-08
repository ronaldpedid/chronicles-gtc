var mongoose = require('mongoose');
var clanSchema = new mongoose.Schema({
    clanName: {
        type: String,
        required: true
    },
    clanLogo: {
        type: String,
        required: false
    }
});

var Clan = mongoose.model('Clan', clanSchema);
module.exports = Clan;
module.exports.schema = clanSchema;