const express = require('express');
const doctorController = require('/controllers/doctor.controller');
const router = express.Router();
router.get('/', doctorController.getAllDoctor());
router.get('/:doctorId',doctorController.getDetailDoctor());
module.exports = router;