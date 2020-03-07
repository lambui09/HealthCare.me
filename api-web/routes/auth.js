const express  = require('express');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
router.post('/signup', authenticationController.signUp);
router.post('/login', authenticationController.login);
router.get('/logout', authenticationController.logout);
module.exports = router;