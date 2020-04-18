const express = require('express');
const NotificationController = require('../controllers/notification.controller');
const router = express.Router();
router.post('', NotificationController.sendNotification);
module.exports = router;