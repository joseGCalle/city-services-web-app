const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { isAuthenticated } = require('../utils/authMiddleware');

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.post('/', isAuthenticated, eventController.createEvent);
router.put('/:id', isAuthenticated, eventController.updateEvent);
router.delete('/:id', isAuthenticated, eventController.deleteEvent);

module.exports = router;
