const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const config = require('./config');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL, adjust if needed
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // set true if using https
}));
app.use(flash());

const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const eventRoutes = require('./routes/eventRoutes');
const commentRoutes = require('./routes/commentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

// Routes
app.use('/auth', authRoutes);
app.use('/stores', storeRoutes);
app.use('/services', serviceRoutes);
app.use('/events', eventRoutes);
app.use('/comments', commentRoutes);
app.use('/favorites', favoriteRoutes);

app.get('/', (req, res) => {
  res.send('City Services Backend API');
});

module.exports = app;
