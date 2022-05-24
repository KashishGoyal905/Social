const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
    // // from browser sending
    // console.log(req.cookies);
    // //from codeial_development
    // res.cookie('user_id', 20); 

    // //simple
    // Post.find({}, function (err, posts) {
    //     if (err) {
    //         console.log(err, "error in finding posts");
    //     }
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    // })

    // populate the user of each of posts

    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })
    //     .exec(function (err, posts) {
    //         User.find({}, function (err, users) {
    //             return res.render('home', {
    //                 title: "Home",
    //                 posts: posts,
    //                 all_users: users
    //             });
    //         })
    //         if (err) {
    //             console.log(err, "error in finding posts");
    //         }
    //     })

    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        if (err) {
            console.log(err, "error");
        }
    }
}

