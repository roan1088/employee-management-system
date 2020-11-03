// Importing the mysql module
const mysql = require("mysql");

// Setting up connection config
const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "mysql",
    database: "employees_db"
});

// Connecting to the db
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// Exporting the connection
module.exports = connection;