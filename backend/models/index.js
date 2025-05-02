const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
  }
);

// Import models
const User = require('./user')(sequelize);
const Store = require('./store')(sequelize);
const Service = require('./service')(sequelize);
const Event = require('./event')(sequelize);
const Comment = require('./comment')(sequelize);
const Favorite = require('./favorite')(sequelize);

// Define associations

// User has many Stores, Services, Events
User.hasMany(Store, { foreignKey: 'userId', onDelete: 'CASCADE' });
Store.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Service, { foreignKey: 'userId', onDelete: 'CASCADE' });
Service.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Event, { foreignKey: 'userId', onDelete: 'CASCADE' });
Event.belongsTo(User, { foreignKey: 'userId' });

// Comments belong to User and Store/Service/Event (polymorphic)
Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Comment.belongsTo(Store, { foreignKey: 'storeId' });
Store.hasMany(Comment, { foreignKey: 'storeId' });

Comment.belongsTo(Service, { foreignKey: 'serviceId' });
Service.hasMany(Comment, { foreignKey: 'serviceId' });

Comment.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(Comment, { foreignKey: 'eventId' });

// Favorites belong to User and Store
Favorite.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });

Favorite.belongsTo(Store, { foreignKey: 'storeId' });
Store.hasMany(Favorite, { foreignKey: 'storeId' });

module.exports = {
  sequelize,
  User,
  Store,
  Service,
  Event,
  Comment,
  Favorite,
};
