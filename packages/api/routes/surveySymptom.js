const express = require('express');
const surveySymptom = require('../controllers/survey_symptom.controller');
const router = express.Router();
router.post('/', surveySymptom.createSymptom);
module.exports = router;