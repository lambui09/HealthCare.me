const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const passport = require('passport');

const router = express.Router();
router.post('/', passport.authenticate('jwt', {
    session: false
}), appointmentController.createAppointment);
router.post('/list', passport.authenticate('jwt', {
    session: false
}), appointmentController.getListAppointment);
router.patch('/:appointment_id', passport.authenticate('jwt', {
    session: false
}), appointmentController.updateAppointment);

module.exports = router;