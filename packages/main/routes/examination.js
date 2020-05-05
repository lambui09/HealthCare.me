const express = require('express');
const ExaminationController = require('../controllers/examination.controller');
const passport = require('passport');
const router = express.Router();
router.post('/', passport.authenticate('jwt', {session: false}), ExaminationController.createExamination);
router.delete('/:examination_id', passport.authenticate('jwt', {session: false}), ExaminationController.deleteExamination);
router.patch('/:examination_id', passport.authenticate('jwt', {session: false}), ExaminationController.updateExamination);
module.exports = router;