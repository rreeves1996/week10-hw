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
const pageMiddle =
`       </div>
        <div class="employee-cards">`;
const pageBottom = 
`       </div> 
    </main>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</body>
</html>`;

// TODO: Template literal for site index

// Initial prompt request for manager's info
const initPrompt = async () => {
    fs.writeFile('./dist/index.html', pageTop, error => 
        error ? console.error(error) : console.log("Top of page successfully generated"));

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
        fs.appendFile("README.md", licenseSection, (error) => 
            error ? console.error(error) : console.log("License section successfully generated!"));
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