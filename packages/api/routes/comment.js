const express = require('express');
const passport = require('passport');
const commentController = require('../controllers/comment.controller');
const router = express.Router();
router.get('/',passport.authenticate('jwt', { session: false }), commentController.getAllComments);
router.get('/:doctorId',passport.authenticate('jwt', { session: false }), commentController.getAllCommentsOwnDoctor);
module.exports = router;
