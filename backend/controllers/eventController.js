const { Event } = require('../models');

exports.createEvent = async (req, res) => {
  try {
    const userId = req.session.userId;
    const data = req.body;
    data.userId = userId;

    const event = await Event.create(data);
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const { department, city, category } = req.query;
    const where = {};
    if (department) where.department = department;
    if (city) where.city = city;
    if (category) where.category = category;

    const events = await Event.findAll({ where });
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Get event by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;
    const data = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await event.update(data);
    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await event.destroy();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
