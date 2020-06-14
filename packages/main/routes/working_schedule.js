const express = require('express');
const passport = require('passport');
const workingScheduleController = require('../controllers/working_schedule.controller');

const router = express.Router();

router.post('/', passport.authenticate('jwt', {
    session: false
}), workingScheduleController.createWorkingSchedule);

router.get('/:doctor_id/available', passport.authenticate('jwt', {
    session: false
}), workingScheduleController.getAvailableTime);
router.get('/:doctor_id', workingScheduleController.getWorkingScheduleDoctor);

module.exports = router;
