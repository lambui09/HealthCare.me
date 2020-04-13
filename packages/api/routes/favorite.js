const express = require('express');
const passport = require('passport');
const FavoriteController = require('../controllers/favorite.controller');
const router = express.Router();
router.get('/', passport.authenticate('jwt', {
    session: false
}), FavoriteController.getAllFavorites);
module.exports = router;
