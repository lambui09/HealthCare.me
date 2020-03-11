const express  = require('express');
const authenticationController = require('../controllers/authentication.controller');
const passport = require('passport');
const Passport = require('../middlewares/passport');
const router = express.Router();
router.post('/signup', authenticationController.signUp);
router.post('/login', authenticationController.login);
router.get('/logout', Passport.passportAuthenticate,authenticationController.logout);
module.exports = router;