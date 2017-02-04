/**
 * Created by ronal on 1/28/2017.
 */
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var caroSchema = new mongoose.Schema({
    picturePath: {
        type: String,
        required: true
    },
    picturePath1: {
        type: String

    },
    picturePath2: {
        type: String

    }

});
caroSchema.plugin(findOrCreate);
var Caro = mongoose.model('Caro', caroSchema);
module.exports = Caro;
module.exports.schema = caroSchema;