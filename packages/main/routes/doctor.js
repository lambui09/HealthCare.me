const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const commentController = require('../controllers/comment.controller');
const router = express.Router();
const passport = require('passport');

router.patch('/:doctor_id', doctorController.updateDoctor);
router.post('/search', passport.authenticate('jwt', {
    session: false
}), doctorController.searchDoctor);
router.get('/', doctorController.getDoctor);
router.get('/:doctor_id',doctorController.getDetailDoctor);
router.post('/:doctor_id/favorite',passport.authenticate('jwt', {
    session: false
}),doctorController.addFavorite);
router.post('/:doctor_id/comments',passport.authenticate('jwt', {
    session: false
}), commentController.createCommentToDoctor);
router.post('/near-by', doctorController.getDoctorNearBy);

module.exports = router;