// requiring passport
const passport = require('passport');
// requiring stratrgy
const LocalStrategy = require('passport-local').Strategy;
// requirin db
const User = require('../models/user');

// authenticate using passport
passport.use(new LocalStrategy({
    usernameField: email
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


// sequarilizing the user to decide which key to kept in th ecookies
passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

// deserializing the user from the keys in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error in finding uer-->passport");
            return done(err);
        }
        return done(null, user);
    })

})

module.exports = passport;