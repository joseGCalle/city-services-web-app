const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { isAuthenticated } = require('../utils/authMiddleware');

router.get('/', isAuthenticated, favoriteController.getFavorites);
router.post('/', isAuthenticated, favoriteController.addFavorite);
router.delete('/:id', isAuthenticated, favoriteController.removeFavorite);

module.exports = router;
