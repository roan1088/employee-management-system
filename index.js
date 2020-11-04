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
            choices: ["View All Employees", "View All Departments", "Exit"]
        });
        // Set action to users response
        action = response.action

        // Perfrom action
        switch(action) {
            case "View All Employees":
                await orm.viewAllEmployees();
                break;
            case "View All Departments":
                await orm.viewAllDepartments();
                break;
            case "Exit":
                orm.exit();
                break;
        }
    }
}

// Code flow begin by calling main
main();