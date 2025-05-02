const { Service } = require('../models');

exports.createService = async (req, res) => {
  try {
    const userId = req.session.userId;
    const data = req.body;
    data.userId = userId;

    const service = await Service.create(data);
    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getServices = async (req, res) => {
  try {
    const { department, city, category } = req.query;
    const where = {};
    if (department) where.department = department;
    if (city) where.city = city;
    if (category) where.category = category;

    const services = await Service.findAll({ where });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Get service by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;
    const data = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    if (service.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await service.update(data);
    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    if (service.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
