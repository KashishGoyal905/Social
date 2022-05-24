const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersConrtoller = require('../controllers/users_controller');
router.get('/profile/:id', passport.checkAuthentication, usersConrtoller.profile);
router.post('/update/:id', passport.checkAuthentication, usersConrtoller.update);
router.get('/sign-In', usersConrtoller.signIn);
router.get('/sign-Up', usersConrtoller.signUp);
router.post('/create', usersConrtoller.create);
// use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-in'
    }
), usersConrtoller.createSession);
// router.post('/sign-Out', usersConrtoller.signOut);
router.get('/sign-out', usersConrtoller.destroySession);
module.exports = router;