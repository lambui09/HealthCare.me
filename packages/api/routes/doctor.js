const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const router = express.Router();

router.path('/:doctor_id', doctorController.updateDoctor);
router.get('/search', doctorController.searchDoctor);

module.exports = router;