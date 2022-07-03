const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// TODO: Template literal for site index

// Initial prompt request for manager's info
const promptUser = async () => {
    await inquirer.prompt([
        {
            type: 'input',
            message: "Team manager's name: ",
            name: 'name'
        },
        {
            type: 'input',
            message: "Team manager's employee ID: ",
            name: 'id'
        },
        {
            type: 'input',
            message: "Team manager's email address: ",
            name: 'email'
        },
        {
            type: 'input',
            message: "Team manager's office number: ",
            name: 'officeNumber'
        },
        {
            type: 'list',
            message: "Please select number of employees: ",
            name: 'employeeCount',
            choices: [1, 2, 3, 4, 5]
        }
    ])
    .then(response => {
        generateEmployee(response);
    });
};

// Function to generate employee card
function generateEmployee(employee) {
    let newEmployee = new Employee(employee.name, employee.id, employee.email, employee.role);

    switch(employee.role) {
        case 'Manager':
            let newManager = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
            generateCard(newManager);
            break;
        case 'Engineer':
            let newEngineer = new Engineer(employee.name, employee.id, employee.email, employee.github);
            generateCard(newEngineer);
            break;
        case 'Intern':
            let newIntern = new Intern(employee.name, employee.id, employee.email, employee.school);
            generateCard(newIntern);
            break;
        default:
            generateCard(newEmployee);
            break;
    }
};

function generateCard(employee) {

}

// Function to initialize app
function init() {
    promptUser();
};

init();