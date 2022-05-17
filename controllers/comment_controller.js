const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    const id = req.params.id;

    // Post.findById(id, function (err, post) {
    //     if(post){
    //         res.send(req.body)
    //         // Comment.create()
    //     }
    // })

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
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            })
        }
        else {
            console.log("error")
        }
        // res.send("no post");
    })
}


