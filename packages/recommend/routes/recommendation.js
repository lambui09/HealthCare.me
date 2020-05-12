const express = require('express');
const router = express.Router();

const recommendationController = require('./../controllers/recommendation.controller');

router.post('/search', recommendationController.searchController);

module.exports = router;