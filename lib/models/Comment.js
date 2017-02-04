var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
      type: String,
        required: true
    }
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
module.exports.schema = commentSchema;
