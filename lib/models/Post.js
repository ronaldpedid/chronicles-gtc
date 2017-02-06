/**
 * Created by ronal on 1/22/2017.
 */
var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    blurb: {
        type: String,
        required: true
    }
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
module.exports.schema = postSchema;