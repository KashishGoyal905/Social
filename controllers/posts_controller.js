const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        req.flash('success', 'Post created successfully');
        return res.redirect('back');
    } catch (e) {
        req.flash('error', 'Post not created');
        return res.redirect('back');
    }
};

module.exports.destroy = async (req, res) => {
    try {
        const delPost = await Post.findById(req.params.id);
        // .id means convr=erting the object id into string
        if (delPost.user == req.user.id) {
            await delPost.remove();
            await Comment.deleteMany({ post: req.params.id });
        }
        req.flash('error', 'Post deleted sucessfully');
        return res.redirect('back');
    } catch (e) {
        req.flash('error', 'Post not deleted');
        return res.redirect('back');
    }
};
