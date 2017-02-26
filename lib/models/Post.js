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
        type: String
    }
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
module.exports.schema = postSchema;