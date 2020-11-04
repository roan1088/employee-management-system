// Importing the db connection
const connection = require("./connection");
// Importing the util module
const util = require("util");
// Importing console.table module
require("console.table");

// Promisify the connection query method
const query = util.promisify(connection.query).bind(connection);

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
const orm = {
    // Method to view all employees
    viewAllEmployees: async function() {
        // Query
        const result = await query(`SELECT employee.id, employee.first_name, employee.last_name, role.title,
        department.name AS department, role.salary, CONCAT(e.first_name, " ", e.last_name) AS manager
        FROM employee INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS e ON employee.manager_id = e.id
        ORDER BY id;`);
        console.table(result);
    },
    // Method to view all departments
    viewAllDepartments: async function() {
        // Query
        const result = await query("SELECT * FROM department ORDER BY id;");
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