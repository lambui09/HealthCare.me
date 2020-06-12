const express = require('express');
const patientController = require('../controllers/patient.controller');
const router = express.Router();
router.patch('/:patient_id', patientController.updatePatient);
router.get('/:patient_id', patientController.getDetailPatient);
module.exports = router;