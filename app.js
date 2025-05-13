require('dotenv').config();
const express = require('express');
const app = express();  // Initialize the express app here
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const PORT = process.env.PORT || 9000;

// Database connection
const db = require('./Database/connection');

// Session setup
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: process.env.SESSION_SECRET || "D3velop1ngAnS0methingUnpr3dictable",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDay, secure: false }
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Pass session info to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isUser = !!req.session.user;
  next();
});

// Import routes
const recipes = require('./routes/recipes');
const recipe = require('./routes/recipe');
const addrecipe = require('./routes/addrecipe');

// Use routes
app.get('/', (req, res) => {
  res.render('home'); // This will render home.ejs when accessing '/'
});

// Use routes
app.use('/recipes', recipes);
app.use('/recipes', recipe);
app.use('/addrecipe', addrecipe);

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Session contents:', req.session);
  next();
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Export app instance correctly
module.exports = app;

