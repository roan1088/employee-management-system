USE employees_db;

-- Using https://theoffice.fandom.com/wiki/List_of_The_Office_Characters
-- Inserting departments
INSERT INTO department (name)
VALUES ("Management"), ("Sales"), ("Accounting"), ("Human Resources");

-- Inserting roles
INSERT INTO role (title, salary, department_id)
VALUES ("Regional Manager", 150000, 1),
("Receptionist ", 60000, 2),
("Sales Representative", 75000, 2),
("Senior Accountant", 100000, 3),
("Accountant", 80000, 3),
("Human Resources Representative", 120000, 4);

-- Inserting employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, NULL),
("Karen", "Filippelli", 1, NULL),
("Pam", "Beesly", 2, 1),
("Jim", "Halpert", 3, 1),
("Dwight", "Schrute", 3, 1),
("Andy", "Bernard", 3, 1),
("Angela", "Martin", 4, NULL),
("Kevin", "Malone", 5, 7),
("Oscar", "Martinez", 5, 7),
("Toby", "Flenderson", 6, NULL);