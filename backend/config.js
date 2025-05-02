require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'city_services_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  sessionSecret: process.env.SESSION_SECRET || 'your_session_secret',
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email-password',
  },
};
