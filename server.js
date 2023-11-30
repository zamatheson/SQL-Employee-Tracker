const inquirer = require("inquirer");
const mysql = require("mysql2");

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

// function for main menu
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
                    viewAddAnEmployee();
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
    console.log("Viewing All Departments...");

    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
}

// function for viewing all roles
function viewAllRoles() {
    console.log("Viewing All Roles...");

    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary roles.department_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
}

// function for viewing all employees
function viewAllEmployees() {
    console.log("Viewing All Employees...");

    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT'(m.first_name, ' ', m.last_name) AS mamager
    FROM employee e
    LEFT JOIN role r
        ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.departmet_id
    LEFT JOIN employee m
        ON m.id = e.manager_id`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
}

// function for adding a department
function viewAddDepartment() {
    console.log("Viewing Add Department...")
    inquirer
        .createPromptModule({
            type: "input",
            name: "name",
            message: "Please enter the name of the department:",
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;

            connection.query/(query, (err, res) => {
                if (err) throw err;
                console.log(`You have successfully added ${answer.name} in the department database!`);

                start();
                console.log(answer.name);
            });
        });
}

// function for adding a role
function viewAddRole() {
    console.log("Viewing Add Role...")

    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Please enter your new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Please enter the salary for this role:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Please select the department for this role:",
                    choices: res.map((department) => department.department_name),
                },
            ])
            .then((answers) => {
                const department = res.find((department) => department.name === answers.department);
                const query = "INSERT INTO roles SET ?";
                connection.query(
                    query,
                    {
                        tite: answers.title,
                        salary: answers.salary,
                        department_id: department,
                    },
                    (err, res) => {
                        if  (err) throw err;
                        console.log(`Added the role ${answers.title} with the salary of ${ansewrs.salary} to the ${answers.department} department database.`)

                        start();
                    }
                );
            });
    });
}

// function for adding an employee
function viewAddAnEmployee() {
    console.log("Viewing add employee...");

    connection.query("SELECT id, title FROM roles", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        const roles = results.map(({id, title}) => ({
            name: title,
            value: id,
        }));

        connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee",
        (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            const managers = results.map(({ id, name }) => ({
                name,
                value: id,
            }));
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "firstName",
                        message: "Please enter the first name of the employee:",
                    },
                    {
                        type: "input",
                        name: "lastName",
                        message: "Please enter the last name of the employee:",
                    },
                    {
                        type: "list",
                        name: "roleID",
                        message: "Please select the employee's role:",
                        choices: roles,
                    },
                    {
                        type: "list",
                        name: "managerID",
                        message: "Please select the employee's manager:",
                        choices: [{name: "none", value: null}, ...managers,],
                    },
                ])
                .then((answers) => {
                    const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?)";
                    const values = [
                        answers.firstName, 
                        answers.lastName,
                        answers.roleID,
                        answers.managerID,
                    ];
                    connection.query(sql, values, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log("Success! You have added a new employee into the database.");
                        start();
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        })
     });
}

// function for updating an employee role
function viewUpdateEmployeeRole() {
    inquirer    
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "employeeUpdate"
            },
            {
                type: "input",
                message: "What would you like to update?",
                name: "roleUpdate"
            }
        ])
        .then(function(answer) {
            connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.roleUpdate, answer.employeeUpdate], function(err, res) {
                if (err) throw err;
                console.table(res);

                start();
            });
        });
}

// quits and ends connection
process.on("exit", () => {
    connection.end();
});