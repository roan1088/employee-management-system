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
    // Method to view employees by manager
    viewEmployeesByManager: async function() {
        // Query managers
        const managers = await query(`SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name
        FROM employee INNER JOIN employee AS e ON employee.manager_id = e.id
        GROUP BY employee.manager_id;`);
        const managerChoices = managers.map(function(manager) {
            return {name: manager.name, value: manager.id};
       });
        // Prompt which manager
        const response = await inquirer.prompt({
            type: "list", message: "Which manager?", name: "manager_id",
            choices: managerChoices
        });
        // Query
        const result = await query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name
        FROM employee
        WHERE manager_id = ?;`, response.manager_id);
        console.table(result);
    },
    // Method to view employees by role
    viewEmployeesByRole: async function() {
        // Query roles
        const roles = await query(`SELECT id, title FROM role;`);
        const roleChoices = roles.map(function(role) {
            return {name: role.title, value: role.id};
       });
        // Prompt which role
        const response = await inquirer.prompt({
            type: "list", message: "Which role?", name: "role_id",
            choices: roleChoices
        });
        // Query
        const result = await query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name
        FROM employee
        WHERE role_id = ?;`, response.role_id);
        console.table(result);
    },
    // Method to add an employee
    addEmployee: async function() {
        // Query roles
        const roles = await query("SELECT id, title FROM role ORDER BY id;");
        const roleChoices = roles.map(function(role) {
             return {name: role.title, value: role.id};
        });
        // Query managers
        const managers = await query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee ORDER BY id;");
        const managerChoices = managers.map(function(manager) {
             return {name: manager.name, value: manager.id};
        });
        // Add a choice for no manager
        managerChoices.push({name: "None", value: null})
        // Prompt information
        const response = await inquirer.prompt([{
            type: "input", message: "What is the employee's first name?", name: "first_name"
        }, {
            type: "input", message: "What is the employee's last name?", name: "last_name"
        }, {
            type: "list", message: "What is the employee's role?", name: "role_id", choices: roleChoices
        }, {
            type: "list", message: "Who is the employee's manager?", name: "manager_id", choices: managerChoices
        }]);
        // Query
        const result = await query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);`, [response.first_name.trim(), response.last_name.trim(), response.role_id, response.manager_id]);
        console.log("Successfully added employee");
    },
    // Method to update an employee's role
    updateEmployeeRole: async function() {
        // Query roles
        const roles = await query("SELECT id, title FROM role ORDER BY id;");
        const roleChoices = roles.map(function(role) {
             return {name: role.title, value: role.id};
        });
        // Query employees
        const employees = await query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee;");
        const employeeChoices = employees.map(function(employee) {
             return {name: employee.name, value: employee.id};
        });
        // Prompt information
        const response = await inquirer.prompt([{
            type: "list", message: "Which employee?", name: "id", choices: employeeChoices
        }, {
            type: "list", message: "What is the employee's new role?", name: "role_id", choices: roleChoices
        }]);
        // Query
        const result = await query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [response.role_id, response.id]);
        console.log("Successfully updated employee's role");
    },
    // Method to view all roles
    viewAllRoles: async function() {
        // Query
        const result = await query(`SELECT role.id, role.title, department.name AS department, role.salary
        FROM role INNER JOIN department ON role.department_id = department.id
        ORDER BY ID;`);
        console.table(result);
    },
    // Method to add a role
    addRole: async function() {
        // Query departments
        const departments = await query("SELECT * FROM department ORDER BY id;");
        const departmentChoices = departments.map(function(department) {
            return {name: department.name, value: department.id};
        });
        // Prompt information
        const response = await inquirer.prompt([{
            type: "input", message: "What is the title of the role?", name: "title"
        }, {
            type: "input", message: "What is the salary of the role?", name: "salary"
        }, {
            type: "list", message: "What is the department of the role?", name: "department_id",
            choices: departmentChoices
        }]);
        // Query
        const result = await query(`INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);`, [response.title.trim(), response.salary, response.department_id]);
        console.log("Successfully added role");
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