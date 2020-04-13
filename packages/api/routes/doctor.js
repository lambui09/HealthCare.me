const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const passport = require('passport');
const router = express.Router();
router.get('/', doctorController.getAllDoctor);
router.get('/:doctorId',doctorController.getDetailDoctor);
router.get('/:doctorId/favorite',passport.authenticate('jwt', {
    session: false
}),doctorController.addFavorite)
module.exports = router;