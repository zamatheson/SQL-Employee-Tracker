const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./db");

// creates a connection with MySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "EmployeeDBPassword",
    database: "employeeDB",
});

// creates connection to the database
connection.connect((err) =>{
    if (err) throw err;
    console.log("You're now connected to the database!");
    start();
});

function start() {
    inquirer
        .createPromptModule({
            type: "list",
            name: "action",
            message: "Choose Your Path...",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update An Employee Role",
                "Quit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View All Departments":
                    viewAllDepartments();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;
                    
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "Add A Department":
                    viewAddDepartment();
                    break;

                case "Add A Role":
                    viewAddRole();
                    break;
                
                case "Add An Employee":
                    viewAddDepartment();
                    break;

                case "Update An Employee Role":
                    viewUpdateEmployeeRole();
                    break;

                case "Quit":
                    connection.end();
                    console.log("QUIT. GOODBYE!");
                    break;
            }     
        });
}

// function for viewing all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
}

// function for viewing all roles
function viewAllRoles() {
    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary roles.department_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
}

// function for viewing all employees
function viewAllEmployees() {
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name)`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    })
}