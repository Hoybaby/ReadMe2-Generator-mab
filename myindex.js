const inquirer = require("inquirer");
const fs = require("fs");
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile); 

//ask user for user input


// using input generate html file in string format

const promptUser = () => 
    inquirer.prompt([
        
        {
            type: "input",
            message: "What is your name?",
            name:"name"
        },
        {
            type:'input',
            message:'What is your email adress?',
            name:'email'
        },
        {
            type:"input",
            message: 'What is your Github username?',
            name: 'gitHubName'
        },
        {
            type:'input',
            message: 'For what repo is this README.md for? Spelling needs to be exact',
            name:'gitHubRepo'
        },
        {
            type: "list",
            message: 'What is your GitHub license?',
            choices: [
                "MIT",
                "Apache",
                "GPL v3", 
                "BSD 3", 
                "None"
            ],
            name:'license'
        },

        {
            type: "input",
            message: "What is the title of your Project?",
            name:"title"
        },
        {
            type: "input",
            message: "Please provide a brief description of your project.",
            name: "description"
        },
        {
            type: "input",
            message: "How can this project be used?",
            name: "usage"
        },
        {
            type: 'input',
            message: 'Who contributed to this project? Please include yourself.',
            name:'contributer'

        },
        { 
            type: "input",
            message: "What packages are needed to install this project?",
            name: "installation"

        },
        {
            type: "input",
            message: "What command do you need to type to run test?",
            name: "command"
        },
    
        {
            type: "input",
            message: "What technologies were used?",
            name: "technologies"
        }
    ]).then (function(data) {
        console.log(data);
        let readME = generateReadMe(data);

        writeFileAsync("README.md", readME).then( 
            err => console.log("Success!")
        );
    })



// promptUser();
//     .then((ansers) => writeFileAsync('index.html', generateHTML(answers)))
//     .then(() => console.log('Successfully wrote to index.html'))
//     .catch((er) => console.error(err));

function generateReadMe(data) {
    let readmeString = 
`#${data.title}

## Description
${data.description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Tests](#tests)

* [Contributors](#contributors)

* [Contact](#contact)


## Installation
Packages required to run this program are: ${data.installation}


## Usage
Examples of how to use this program: https://github.com/${data.gitHubName}/${data.gitHubRepo}


## License
The license that is being used is ${data.license}. Can be found in the license folder.


## Tests
To test, run the following command: ${data.command}


## Contributors
${data.contributer}


## Contact
${data.gitHubName}
\nIf you have any questions, contact the author directly at ${data.email}.
`
    return readmeString;
    
};


promptUser();
    // .then((data) => writeFileAsync('README.md', generateReadMe(data)))
    // .then(() => console.log('Successfully wrote to README.md'))
    // .catch((err) => console.error(err))