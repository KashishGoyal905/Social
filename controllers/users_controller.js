const User = require('../models/user');

// profile page
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

// sign form page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Social | User Sign In'
    })
}

// sign up form page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Social | User Sign Up'
    })
}

// post request for sign up
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
            // create user
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

// post req for sign in
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
            // make session by making cookie
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else {
            return res.redirect('back');
        }
    })
}

// sign out route
module.exports.signOut = function (req, res) {
    // const key = req.cookies.user_id;
    // removing cookie session
    res.clearCookie('user_id');
    return res.redirect('/users/sign-In')
}