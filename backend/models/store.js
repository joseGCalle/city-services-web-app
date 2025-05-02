const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Store = sequelize.define('Store', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    location: {
      type: DataTypes.STRING, // could be address or coordinates as string
      allowNull: true,
    },
    hours: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    socialLinks: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    photos: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  }, {
    tableName: 'stores',
    timestamps: true,
  });

  return Store;
};
