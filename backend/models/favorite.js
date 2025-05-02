const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: 'favorites',
    timestamps: true,
    uniqueKeys: {
      unique_favorite: {
        fields: ['userId', 'storeId']
      }
    }
  });

  return Favorite;
};
