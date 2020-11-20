const inquirer = require("inquirer");
const fs = require("fs");
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile); 

//ask user for user input


// using input generate html file in string format

const promptUser = () => {
    inquirer.prompt([
        
        {
            type: "input",
            message: "What is your name?",
            name:"name"
        },
        {
            type: "input",
            message: "What is the title of your Project?",
            name:"title"
        },
        {
            type: "input",
            message: "Please provide a brief description of your project.",
            name: "Description"
        },
        {
            type: "input",
            message: "How can this project be used?",
            name: "usage"
        },
        { 
            type: "input",
            message: "What packages are needed to install this project?",
            name: "installation"

        },
        {
            type:"input",
            message: 'What is your Github username?',
            name: 'gitHubName'
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
            message: "What technologies were used?",
            name: "technologies"
        }
    ]).then(function(data){ 
        console.log(data)
        let readMe = generateReadMe(data);
        // let readmeStr

        writeFileAsync("README.md", readMe).then(
            err => console.log("Success!")
        )

    });
};

promptUser();
    // .then((ansers) => writeFileAsync('index.html', generateHTML(answers)))
    // .then(() => console.log('Successfully wrote to index.html'))
    // .catch((er) => console.error(err));

function generateReadMe(data) {
    let readmeString = 
    `
    # ${data.title} 
  
    ## Description
      ${data.description}
    ## Table of Contents
    - [Installation](#installation)
    - [Usage](#usage)
    - [License](#license)
    - [Tests](#tests)
    - [Contributors](#contributors)
    - [Details](#details)
    ## Installation
    Packages required to run this program are: ${data.installation}
    
    ## Usage
    Examples of how to use this program: ${data.usage}
    ## License
    ${data.license}
    ## Tests
    To test, run the following command: ${data.tests}
    ## Contributors
    ${data.contributer}
    ## Contact
    \n![Badge](${gitHubName}) 
    \nView the project in GitHub at: ${data.url}
    \nIf you have any questions, contact the author directly at ${data.email}.
    `
    return readmeString;
}


promptUser()
    .then((answers => writeFileAsync('index.html', generateReadMe(data))))
    .then(() => console.log('Successfully wrote to README.md'));