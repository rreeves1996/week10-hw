const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// TODO: Template literal for site index

// Initial prompt request for manager's info
const initPrompt = async () => {
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
        }
    ])
    .then(response => {
        response.role = 'Manager';
        generateEmployee(response);
    });
};

const mainPrompt = async () => {
    await inquirer.prompt([
        {
            type: 'list',
            name: 'main',
            choices: ['Add Engineer', 'Add Intern', 'Finish building team']
        }
    ]).then(response => {
        if(response.choices != 'Finish building team') {
            switch(response.choices){
            case 'Add Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "Please enter Engineer's name: ",
                        name: 'name'
                    },
                    {
                        type: 'input',
                        message: "Please enter Engineer's id: ",
                        name: 'id'
                    },
                    {
                        type: 'input',
                        message: "Please enter Engineer's email: ",
                        name: 'email'
                    },
                    {
                        type: 'input',
                        message: "Please enter Engineer's Github: ",
                        name: 'github'
                    }
                ]).then(engineer => {
                    generateEmployee(engineer);
                })
                break;
            case 'Add Add Intern':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "Please enter Intern's name: ",
                        name: 'name'
                    },
                    {
                        type: 'input',
                        message: "Please enter Intern's id: ",
                        name: 'id'
                    },
                    {
                        type: 'input',
                        message: "Please enter Intern's email: ",
                        name: 'email'
                    },
                    {
                        type: 'input',
                        message: "Please enter Intern's School: ",
                        name: 'school'
                    }
                ]).then(intern => {
                    generateEmployee(intern);
                })
            default:
                break;
            };
        } else {
            generatePage();
        };
    });
}
function generatePage() {

}
// Function to generate employee card
function generateEmployee(response) {
    switch(response.role) {
    case 'Manager':
        let manager = new Manager(response.name, response.id, response.email, response.role, response.officeNumber);
        let employeeCard = ``;
        break;
    case 'Engineer':
        let engineer = new Manager(response.name, response.id, response.email, response.role, response.github);

        break;
    case 'Intern':
        let intern = new Manager(response.name, response.id, response.email, response.role, response.school);
        
        break;
    default:
        let employee = new Employee(response.name, response.id, response.email, response.role);

        break;
    }

    mainPrompt();
};

initPrompt();