// importing mongoose for making schema
const mongoose = require('mongoose');

// making post schema
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of ids of all comments in the post schema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

// making model
const Post = mongoose.model('Post', postSchema);
// exporting
module.exports = Post;