const express = require('express');
const authController = require('../controllers/authentication.controller');
const passport = require('passport');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);
router.post('/reset-password', authController.resetPassword);

module.exports = router;