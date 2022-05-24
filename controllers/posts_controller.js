const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
    // console.log(req.user);
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
};


module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        // .id means convr=erting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id })
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
}