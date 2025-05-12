// connection.js file.
var mysql = require('mysql2');
 
require('dotenv').config(); // use npm install for this first
 
var connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME, 
    multipleStatements: true
});
connection.connect((err => {
    if(err) throw err;
    console.log('MySQL connected successfully');
}));

module.exports = connection;

