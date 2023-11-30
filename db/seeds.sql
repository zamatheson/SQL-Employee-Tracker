USE employeeDB


INSERT INTO departments (department_name)
VALUES ("Sales"), ("Engineering"), ("Hospitality"), ("Leadership"), ("Finance"), ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1), ("Engineer", 600000.00, 2), ("Customer Relations Manager", 75000.00, 3), ("Chief Executive Officer", 555000.00, 4), ("Finance Head", 145000.00, 5), ("Marketing Manager", 125000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Styles", 1, 1), ("Chappell", "Roan", 2,2), ("Sabrina", "Carpenter", 3, 3), ("Olivia", "Rodrigo", 4, 4), ("Phoebe", "Bridgers", 5, 5), ("Maggie", "Rodgers", 6, 6);