const { Favorite } = require('../models');

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { storeId } = req.body;

    if (!storeId) {
      return res.status(400).json({ message: 'storeId is required' });
    }

    const existing = await Favorite.findOne({ where: { userId, storeId } });
    if (existing) {
      return res.status(409).json({ message: 'Already favorited' });
    }

    const favorite = await Favorite.create({ userId, storeId });
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.session.userId;
    const favorites = await Favorite.findAll({ where: { userId } });
    res.json(favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;

    const favorite = await Favorite.findByPk(id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    if (favorite.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await favorite.destroy();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
