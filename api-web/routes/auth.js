const express = require('express');
const authenticationController = require('../controllers/authentication.controller');
const passport = require('passport');

const router = express.Router();

router.post('/signup', authenticationController.signUp);
router.post('/login', authenticationController.login);
router.get('/logout', passport.authenticate('jwt', { session: false }), authenticationController.logout);

module.exports = router;