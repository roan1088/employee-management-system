// Importing the db connection
const connection = require("./connection");
// Importing the util module
const util = require("util");
// Importing console.table module
require("console.table");
// Importing the inquirer modules
const inquirer = require("inquirer");

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
    // Method to view all roles
    viewAllRoles: async function() {
        // Query
        const result = await query(`SELECT role.id, role.title, department.name AS department, role.salary
        FROM role INNER JOIN department ON role.department_id = department.id
        ORDER BY ID;`);
        console.table(result);
    },
    // Method to view all departments
    viewAllDepartments: async function() {
        // Query
        const result = await query("SELECT * FROM department ORDER BY id;");
        console.table(result);
    },
    // Method to add a department
    addDepartment: async function() {
        // Prompt information
        const response = await inquirer.prompt({
            type: "input", message: "What is the name of the department?", name: "name"
        });
        // Query
        const result = await query("INSERT INTO department (name) VALUES (?);", response.name.trim());
        console.log("Successfully added department");
    },
    // Method to exit
    exit: function() {
        // End connection
        connection.end();
    }
};

// Exporting the orm
module.exports = orm;