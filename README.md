# SEHW2
2nd Homework (recipe) for software engineering 
Recipe Cookbook

A web application for managing and displaying recipes, where users can add, view, and manage recipes with details like ingredients and instructions.

Features

View recipes grouped by protein type.
Add new recipes with instructions and ingredients.
Hover over ingredients for additional information.
Add custom ingredients if not available in the database.
Form validation for new recipe submission.
Tech Stack

Backend: Node.js, Express
Database: MySQL
Templating Engine: EJS
CSS: Custom styles
Session Management: Express-session
Prerequisites

Before running the application, ensure you have the following installed:

Node.js (v14 or higher)
MySQL (v5.7 or higher)
npm (Node package manager)
Installation

Clone the repository:
cd into repository
Install the required dependencies:
npm install
Set up the MySQL database:
Export the MySQL database from MySQLWorkbench and import it into your MySQL server.
Ensure your database has the following tables:
recipes
ingredients
recipe_ingredients
Make sure to configure the correct database connection in the .env file (see below).
Create a .env file at the root of the project and add the following environment variables:
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
SESSION_SECRET=your_secret_key
Running the Application

Start the application:
npm start
Open your browser and go to http://localhost:9000.
Directory Structure

/Database: Contains the connection.js file for database connection setup.
/public: Stores static files such as CSS and images.
/routes: Contains route handlers (recipes.js, recipe.js, addrecipe.js).
/views: Contains the EJS templates (home.ejs, recipes.ejs, addRecipe.ejs, etc.).
/partials: Stores partial views like the header (header.ejs).
Routes

GET /: Home page showing all recipes.
GET /recipes: List of recipes grouped by protein type.
GET /recipe/:id: View details of a specific recipe (ingredients, instructions).
GET /addrecipe: Add a new recipe (with form validation).
POST /addrecipe: Submit a new recipe to the database.

