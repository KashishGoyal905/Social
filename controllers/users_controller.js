const User = require('../models/user');
module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                return res.render('user_profile', { title: 'home', user_list: user });
            } else {
                return res.redirect('/users/sign-In');
            }
        })
    } else {
        return res.redirect('/users/sign-In');
    }
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
    // checking if password and confirm pass are same
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    // finding if already exist via email
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in finding user in signinng up");
            return;
        }
        // if not found creating
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    7
                    console.log("error in creating a user");
                    return;
                }
                return res.redirect('/users/sign-In');
            })
        } else {
            return res.redirect('back'); ` `
        }
    })

}

module.exports.createSession = function (req, res) {
    // find the user 
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in finding user in signinng up");
            return;
        }
        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else {
            return res.redirect('back');
        }
    })
}