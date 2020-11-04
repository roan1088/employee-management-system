// Importing inquirer and orm modules
const inquirer = require("inquirer");
const orm = require("./config/orm");

// Main function
async function main() {
    // Variable to store users action
    let action = "";
    // Keep repeating until user chooses 
    while (action !== "Exit") {
        // Ask user their choice
        const response = await inquirer.prompt({
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: ["View All Employees", "View Employees by Manager", "View Employees by Role", "Add an Employee", "View All Roles", "Add a Role", "View All Departments", "Add a Department", "Exit"]
        });
        // Set action to users response
        action = response.action

        // Perfrom action
        switch(action) {
            case "View All Employees":
                await orm.viewAllEmployees();
                break;
            case "View Employees by Manager":
                await orm.viewEmployeesByManager();
                break;
            case "View Employees by Role":
                await orm.viewEmployeesByRole();
                break;
            case "Add an Employee":
                await orm.addEmployee();
                break;
            case "View All Roles":
                await orm.viewAllRoles();
                break;
            case "Add a Role":
                await orm.addRole();
                break;
            case "View All Departments":
                await orm.viewAllDepartments();
                break;
            case "Add a Department":
                await orm.addDepartment();
                break;
            case "Exit":
                orm.exit();
                break;
        }
    }
}

// Code flow begin by calling main
main();