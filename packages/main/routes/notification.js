const express = require('express');
const passport = require('passport');
const NotificationController = require('../controllers/notification.controller');
const router = express.Router();
router.get('/',passport.authenticate('jwt', {
    session: false
}),NotificationController.getAllNotificationsByUser);

router.get('/unseen', passport.authenticate('jwt', {
    session: false
}), NotificationController.countNotificationUnseen);
module.exports = router;