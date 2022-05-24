const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post);
        const newComment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        // updating part
        req.flash('success', 'comment created successfully');
        post.comments.push(newComment);
        post.save();
        return res.redirect('/');
    } catch (e) {
        console.log('error', e);
        req.flash('error', 'Error in creating comment: ');
    }
}


module.exports.destroy = async (req, res) => {
    try {
        const delComment = await Comment.findById(req.params.id);
        // res.send(delComment);
        if (delComment.user == req.user.id) {
            let postId = delComment.post;
            await delComment.remove();
            Post.findByIdAndUpdate(postId, {
                $pull: { comment: req.params.id }
            })
        }
        req.flash('error', 'comment deleted successfully');
        return res.redirect('back');
    } catch (e) {
        console.log('error', e);
        req.flash('error', 'Error in deleiing comment: ');
    }
}