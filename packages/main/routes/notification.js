const express = require('express');
const passport = require('passport');
const NotificationController = require('../controllers/notification.controller');
const router = express.Router();
router.get('/',passport.authenticate('jwt', {
    session: false
}),NotificationController.getAllNotificationsByUser);
module.exports = router;