const Post = require('../models/post');

module.exports.home = function (req, res) {
    // // from browser sending
    // console.log(req.cookies);
    // // from codeial_development
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
    Post.find({}).populate('user').exec(function (err, posts) {
        if (err) {
            console.log(err, "error in finding posts");
        }
        return res.render('home', {
            title: "Home",
            posts: posts
        });
    })
}

