const express = require('express');
const patientController = require('../controllers/patient.controller');
const router = express.Router();
router.patch('/:patientId', patientController.updatePatient);
module.exports = router;