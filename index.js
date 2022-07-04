const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const pageTop = 
`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>
    <title>My Team</title>
</head>
<body>
    <header>
        <div class="hero">- MY TEAM -</div>
    </header>
    <main>
        <div class="manager-card">`;
const pageBottom = 
`       </div> 
    </main>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</body>
</html>`;

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

const employeePrompt = async (response) => {
    switch(response.choices){
    case 'Add Engineer':
        await inquirer.prompt([
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
            engineer.role = 'Engineer';
            generateEmployee(engineer);
        })
        break;
    case 'Add Intern':
        await inquirer.prompt([
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
            intern.role = 'Intern';
            generateEmployee(intern);
        })
    default:
        break;
    };
}
const mainPrompt = async () => {
    await inquirer.prompt([
        {
            type: 'list',
            name: 'main',
            choices: ['Add Engineer', 'Add Intern', 'Finish building team']
        }
    ]).then(response => {
        // if(response.choices != 'Finish building team') {
        //     employeePrompt(response);
        // } else {
        //     generatePage();
        // };
        employeePrompt(response);
    });
}
function generatePageTop() {
    fs.writeFile('./dist/index.html', pageTop, error => 
        error ? console.error(error) : console.log(`\nTop of page successfully generated!\n`))
    initPrompt();
}
function generatePage() {

}
// Function to generate employee card
function generateEmployee(response) {
    switch(response.role) {
    case 'Manager':
        let manager = new Manager(response.name, response.id, response.email, response.role, response.officeNumber);
        let managerCard = 
            `   <div class="card">
                    <div class="card-header">
                        <h3>${manager.name}</h3>
                        <h4>${manager.role}</h4>
                    </div>
                    <ul>
                        <li><span>ID:</span> ${manager.id}</li>
                        <li><span>Email:</span> ${manager.email}</li>
                        <li><span>Office #:</span> ${manager.officeNumber}</li>
                    </ul>
                </div>
            </div>
            <div class="employee-cards">`;
        fs.appendFile('./dist/index.html', managerCard, (error) => 
            error ? console.error(error) : console.log("Manager card successfully generated!"));
        break;
    case 'Engineer':
        let engineer = new Engineer(response.name, response.id, response.email, response.role, response.github);
        let engineerCard = 
            `   <div class="card">
                    <div class="card-header">
                        <h3>${engineer.name}</h3>
                        <h4>${engineer.role}</h4>
                    </div>
                    <ul>
                        <li><span>ID:</span> ${engineer.id}</li>
                        <li><span>Email:</span> ${engineer.email}</li>
                        <li><span>Github:</span> ${engineer.github}</li>
                    </ul>
                </div>`;
        fs.appendFile('./dist/index.html', engineerCard, (error) => 
            error ? console.error(error) : console.log("Engineer card successfully generated!"));
        break;
    case 'Intern':
        let intern = new Intern(response.name, response.id, response.email, response.role, response.school);
        let internCard = 
            `   <div class="card">
                    <div class="card-header">
                        <h3>${intern.name}</h3>
                        <h4>${intern.role}</h4>
                    </div>
                    <ul>
                        <li><span>ID:</span> ${intern.id}</li>
                        <li><span>Email:</span> ${intern.email}</li>
                        <li><span>School:</span> ${intern.school}</li>
                    </ul>
                </div>`;
        fs.appendFile('./dist/index.html', internCard, (error) => 
            error ? console.error(error) : console.log("Engineer card successfully generated!"));
        break;
    default:
        let employee = new Employee(response.name, response.id, response.email, response.role);
        let employeeCard = 
            `   <div class="card">
                    <div class="card-header">
                        <h3>${employee.name}</h3>
                        <h4>${employee.role}</h4>
                    </div>
                    <ul>
                        <li><span>ID:</span> ${employee.id}</li>
                        <li><span>Email:</span> ${employee.email}</li>
                    </ul>
                </div>`;
        fs.appendFile('./dist/index.html', employeeCard, (error) => 
            error ? console.error(error) : console.log("Employee card successfully generated!"));
        break;
    }
    mainPrompt();
};

generatePageTop();
// initPrompt();