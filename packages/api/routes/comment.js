const express = require('express');
const passport = require('passport');
const commentController = require('../controllers/comment.controller');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {
    session: false
}), commentController.getComments);

router.post('/:doctor_id', passport.authenticate('jwt', {
    session: false
}), commentController.createCommentToDoctor);

module.exports = router;
