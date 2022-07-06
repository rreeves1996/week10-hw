const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const styleSheet = 
`:root {
    --white: #fcf8fa;
    --white-transp: #fcf9fb85;
    --black: #39263a;
    --blue-light: #d3e7ef;
    --blue-outline: #9eccde;
    --blue-mid: #2e6f95;
    --blue-dark: #3a46af;
    --red-light: #b7094c;
    --red-mid: #892b64;
    --red-purple: #723c70;
}

/* CSS RESETS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1.5;
}
html {
    height: 100%;
}
ol, ul {
    list-style: none;
}


/* MAIN STYLE */
body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: #ceccce;
}

h1, h2, h3, h4, h5 {
    filter: drop-shadow(0px 0px 10rem var(--white-transp));
}

header {
    display: flex;
    width: 100%;
    height: 20%;
    align-items: center;
    justify-content: center;
    background-color: var(--black);
    color: var(--white);
    font-size: 400%;
    letter-spacing: 20px;
    font-weight: 100;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: inset 0px 0px 40px rgba(0, 0, 0, 0.39);
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.605);
}

main {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
}

/* EMPLOYEE CARDS */

.employee-cards {
    width: 40vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 20px;
}

.card-header {
    line-height: 1.25;
    padding: 0.75rem;
    text-align: center;
    background-color: var(--blue-mid);
    width: 200px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    text-transform: uppercase;
    text-shadow: 0px 1px 2px black;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.273);
}
.card-header h3 {
    letter-spacing: 2px;
    font-size: 1.75rem;

}

.card {
    background-color: var(--blue-light);
    filter: drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.601));
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.107);
}
.card span {
    font-weight: 500;
}
.card ul {
    padding: 10px;
    font-weight: 300;
}
.card li {
    line-height: 1.5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}`;
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
        <div class="manager-card">
`;
const pageBottom = 
`       </div> 
    </main>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</body>
</html>`;


// Initial prompt request for manager's info
const initPrompt = async () => {
    console.log(`\nWelcome! Begin by entering team manager's info...`)
    await inquirer.prompt([
        {
            type: 'input',
            message: `Team manager's name: `,
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
        generatePageTop();
        generateEmployee(response);
    });
};

const employeePrompt = async (response) => {
    
    switch(response.main){
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
        if(response.main != 'Finish building team') {
            employeePrompt(response);
        } else if(response.main != 'Add Engineer' || 'Add Intern') {
            generatePage();
        };

    });
}
function generatePageTop() {
    fs.writeFile('./dist/index.html', pageTop, error => 
        error ? console.error(error) : console.log(`Top of page successfully generated!`));
}
function generatePage() {
    fs.appendFile('./dist/index.html', pageBottom, error => 
        error ? console.error(error) : console.log(`Bottom of page successfully generated!`));
    fs.writeFile('./dist/style.css', styleSheet, error =>
        error ? console.error(error) : console.log(`Stylesheet successfully generated!`));
}
// Function to generate employee card
function generateEmployee(response) {
    switch(response.role) {
    case 'Manager':
        let manager = new Manager(response.name, response.id, response.email, response.role, response.officeNumber);
        let managerCard = 
            `           <div class="card">
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
            <div class="employee-cards">
            `;
        fs.appendFile('./dist/index.html', managerCard, (error) => 
            error ? console.error(error) : console.log("\nManager card successfully generated!"));
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
            error ? console.error(error) : console.log("\nEngineer card successfully generated!"));
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
            error ? console.error(error) : console.log("\nIntern card successfully generated!"));
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


initPrompt();