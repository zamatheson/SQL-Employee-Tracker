const inquirer = require("inquirer");
const mysql = requireI("mysql2");
const db = require(" ");

function start() {
    inquirer
        .createPromptModule({
            type: "list",
            name: "action",
            message: "Choose Your Path...",
            choices: [
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "Add Employee":
                    viewAddEmployee();
                    break;

                case "Update Employee Role":
                    viewUpdateEmployeeRole();
                    break;
                    
                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Role":
                    viewAddRole();
                    break;

                case "View All Departments":
                    viewAllDepartments();
                    break;
                
                case "Add Department":
                    viewAddDepartment();
                    break;

                case "Quit":
                    connection.end();
                    console.log("QUIT. GOODBYE!");
                    break;
            }     
        });
}