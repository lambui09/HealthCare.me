const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const passport = require('passport');

const router = express.Router();
router.post('/',passport.authenticate('jwt', { session: false }),appointmentController.createAppointment );

module.exports = router;