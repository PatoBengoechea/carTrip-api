const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'admin',
    database : 'carTrip'
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error
  else {
    console.log("Successfully connected to the database.");
  }
});

module.exports = connection;
