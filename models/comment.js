// importing mongoose for making schema
const mongoose = require('mongoose');

// making comment schema
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belong to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // comment belog to a post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true            
});

// making model
const Comment = mongoose.model('Comment', commentSchema);
// exporting
module.exports = Comment;