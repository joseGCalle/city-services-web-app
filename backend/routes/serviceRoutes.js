const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { isAuthenticated } = require('../utils/authMiddleware');

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', isAuthenticated, serviceController.createService);
router.put('/:id', isAuthenticated, serviceController.updateService);
router.delete('/:id', isAuthenticated, serviceController.deleteService);

module.exports = router;
