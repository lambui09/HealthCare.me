const express = require('express');
const patientController = require('../controllers/patient.controller');
const router = express.Router();
router.patch('/:patient_id', patientController.updatePatient);
module.exports = router;