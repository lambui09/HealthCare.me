const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const router = express.Router();

router.patch('/:doctor_id', doctorController.updateDoctor);
router.get('/search', doctorController.searchDoctor);
router.get('/', doctorController.getDoctor);

module.exports = router;