const express = require('express');
const surveySymptom = require('../controllers/survey_symptom.controller');
const passport = require('passport');
const router = express.Router();
router.post('/', surveySymptom.createSymptom);
router.patch('/:symptom_id', passport.authenticate('jwt', {session: false}), surveySymptom.updateSymptom);
router.delete('/:symptom_id', passport.authenticate('jwt', {session: false}), surveySymptom.deleteSymptom);
module.exports = router;