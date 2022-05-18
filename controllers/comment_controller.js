const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    const id = req.params.id;
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    res.send(err);
                }
                // update part
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            })
        }
        else {
            console.log("error")
        }
    })
}


module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            console.log("error in finding the comment");
        }
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {
                $pull: { comment: req.params.id }
            }, function (err, post) {
                return res.redirect('back');
            })
        }
    })
}