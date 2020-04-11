const express = require('express');
const authenticationController = require('../controllers/authentication.controller');
const passport = require('passport');

const router = express.Router();

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);
router.get('/logout', passport.authenticate('jwt', { session: false }), authenticationController.logout);
router.post('/doctor/signup', authenticationController.signUpDoctor);
router.post('/doctor/login', authenticationController.loginDoctor);
router.get('/doctor/logout', passport.authenticate('jwt', {session: false}), authenticationController.logoutDoctor);

module.exports = router;