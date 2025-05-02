const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { isAuthenticated } = require('../utils/authMiddleware');

router.get('/', commentController.getComments);
router.post('/', isAuthenticated, commentController.createComment);
router.delete('/:id', isAuthenticated, commentController.deleteComment);

module.exports = router;
