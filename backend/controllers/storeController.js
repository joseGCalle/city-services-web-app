const { Store } = require('../models');

exports.createStore = async (req, res) => {
  try {
    const userId = req.session.userId;
    const data = req.body;
    data.userId = userId;

    const store = await Store.create(data);
    res.status(201).json(store);
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStores = async (req, res) => {
  try {
    const { department, city, category } = req.query;
    const where = {};
    if (department) where.department = department;
    if (city) where.city = city;
    if (category) where.category = category;

    const stores = await Store.findAll({ where });
    res.json(stores);
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    console.error('Get store by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;
    const data = req.body;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    if (store.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await store.update(data);
    res.json(store);
  } catch (error) {
    console.error('Update store error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    if (store.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await store.destroy();
    res.json({ message: 'Store deleted' });
  } catch (error) {
    console.error('Delete store error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
