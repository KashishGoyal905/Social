const User = require('../models/user');
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Social | User Sign In'
    })
}

module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Social | User Sign Up'
    })
}

module.exports.create = function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function (err, newUser) {
        if (err) {
            console.log("error in creating a New User", err);
            return;
        }
        console.log('********', newUser);
        return res.redirect('back');
    })
}

module.exports.createSession = function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function (err, newUser) {
        if (err) {
            console.log("error in creating a New User", err);
            return;
        }
        console.log('********', newUser);
        return res.redirect('back');
    })
}