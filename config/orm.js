// Importing the db connection
const connection = require("./connection");
// Importing the util module
const util = require("util");

// Promisify the connection query method
const query = util.promisify(connection.query).bind(connection);

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
const orm = {
    // Method to view all departments
    viewAllDepartments: async function() {
        // Query
        const result = await query("SELECT * FROM department");
        console.table(result);
    },
    // Method to exit
    exit: function() {
        // End connection
        connection.end();
    }
};

// Exporting the orm
module.exports = orm;