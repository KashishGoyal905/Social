const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');
router.get('/profile', usersConrtoller.profile);
router.get('/sign-In', usersConrtoller.signIn);
router.get('/sign-Up', usersConrtoller.signUp);
router.post('/create', usersConrtoller.create);
router.post('/create-session', usersConrtoller.createSession);
router.post('/sign-Out', usersConrtoller.signOut);
module.exports = router;