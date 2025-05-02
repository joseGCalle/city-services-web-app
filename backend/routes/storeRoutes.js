const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { isAuthenticated } = require('../utils/authMiddleware');

router.get('/', storeController.getStores);
router.get('/:id', storeController.getStoreById);
router.post('/', isAuthenticated, storeController.createStore);
router.put('/:id', isAuthenticated, storeController.updateStore);
router.delete('/:id', isAuthenticated, storeController.deleteStore);

module.exports = router;
