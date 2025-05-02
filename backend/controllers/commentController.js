const { Comment } = require('../models');

exports.createComment = async (req, res) => {
  try {
    const userId = req.session.userId;
    const data = req.body;
    data.userId = userId;

    if (!data.storeId && !data.serviceId && !data.eventId) {
      return res.status(400).json({ message: 'Must specify storeId, serviceId, or eventId' });
    }

    const comment = await Comment.create(data);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { storeId, serviceId, eventId } = req.query;
    const where = {};
    if (storeId) where.storeId = storeId;
    if (serviceId) where.serviceId = serviceId;
    if (eventId) where.eventId = eventId;

    const comments = await Comment.findAll({ where });
    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
