const express = require('express');
const passport = require('passport');
const workingScheduleController = require('../controllers/working_schedule.controller');
const router = express.Router();
router.post('/', passport.authenticate('jwt', { session: false }),workingScheduleController.createDateWorkingDoctor);

