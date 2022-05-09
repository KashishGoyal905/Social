// requiring passport
const passport = require('passport');
// requiring stratrgy
const LocalStrategy = require('passport-local').Strategy;
// requirin db
const User = require('../models/user');

// authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find a user and establish a identity
        User.findOne({ email: email }, function (err, user) {

            if (err) {
                console.log("error in finding uer-->passport");
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("username/password is incorrect");
                return done(null, false);
            }
            return done(null, user);
        })
    }))


// sequarilizing the user to decide which key to kept in th ecookies (like giving id of user under name id)
passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

// deserializing the user from the keys in the cookies (finding user serialzing cookie)
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error in finding uer-->passport");
            return done(err);
        }
        return done(null, user);
    })

})

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;