const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const commentController = require('../controllers/comment.controller');
const router = express.Router();
const passport = require('passport');

router.patch('/:doctor_id', doctorController.updateDoctor);
router.get('/search', doctorController.searchDoctor);
router.get('/', doctorController.getDoctor);
router.get('/:doctor_id',doctorController.getDetailDoctor);
router.post('/:doctor_id/favorite',passport.authenticate('jwt', {
    session: false
}),doctorController.addFavorite);
router.post('/:doctor_id/comments',passport.authenticate('jwt', {
    session: false
}), commentController.createCommentToDoctor);

module.exports = router;