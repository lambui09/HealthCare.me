const express = require('express');
const SpecialistController = require('../controllers/specialist.controller');
const passport = require('passport');
const router = express.Router();
router.post('/', passport.authenticate('jwt', {session: false}), SpecialistController.createSpecialist);
router.delete('/:specialist_id', passport.authenticate('jwt', {session: false}), SpecialistController.deleteSpecialist);
router.patch('/:specialist_id', passport.authenticate('jwt', {session: false}), SpecialistController.updateSpecialist);
module.exports = router;