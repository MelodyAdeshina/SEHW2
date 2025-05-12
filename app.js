require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const PORT = process.env.PORT || 9000;
const db = require('./Database/connection');
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions( { 
    secret: "D3velop1ngAnS0methingUnpr3dictable",
    resave: true,
    saveUninitialized: false,
    cookie: {}
}));


//view engine setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/static', express.static(__dirname));
app.use(session({
    secret: process.env.SESSION_SECRET || 'recipes_db-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}));

// After setting up sessions
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.isUser = !!req.session.user;
    next();
});


//Import Routes
const recipes = require('./routes/recipes.js');
const recipe = require('./routes/recipe.js');
const header = require('./routes/header.js');




//Use Routes
app.use('/', recipes);
app.use('/recipe', recipe);
app.use('/header', header);


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Session contents:', req.session);
    next();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
