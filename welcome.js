//========== require the prompt module and create interface ==========
const inquirer = require("inquirer");

const userMenu = require("./lib/userMenu");
const adminMenu = require("./lib/adminMenu");
const costumer = require("./lib/userclass");

const fs = require('fs')
const users = JSON.parse(fs.readFileSync('./userDB.json'))
var appUser;

var check=false;

console.log("=====Welcome to our movie store====")

function welcome() {
    inquirer.prompt([
        {
            type: "list",
            name: "welcome",
            message: "Select options",
            choices: ['Trending Movies', 'signUp', 'Login', 'exit']
        }]).then(answer => {
            console.log("======================")
            if (answer.welcome == 'Trending Movies') {
               console.log("Under construction")
               welcome()
            } else if (answer.welcome == 'signUp') {
                signUp()
            } else if (answer.welcome == 'Login') {
                login()
            } else {
                process.exit()

            }
        })
}

function signUp() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Name:",
        },
        {
            type: "input",
            name: "password",
            message: "Enter your password:",
        },


        {
            type: "input",
            name: "email",
            message: "Enter your email address:",
        },


        {
            type: "input",
            name: "username",
            message: "Enter your username:",
        },

        {
            type: "list",
            name: "signUp",
            message: "Sign-Up?",
            choices: ['YES', 'NO'],

        }

    ]).then(answer => {
        if (answer.YESORNO == 'YES') {
            appUser = new costumer(answer.name,answer.email,answer.password,answer.username);
            console.log('Sign-up Successful')
            console.log(appUser);
            userOption(appUser);
        } else {
            welcome()
        }
    })

}

function login() {
    inquirer.prompt([{
        type: "list",
        name: "login",
        message: "Login As",
        choices: ['Admin', 'user']
    },
    {
        type: "input",
        name: "Username",
        message: "Enter your Username",
    },

    {
        type: "password",
        name: "Password",
        message: "Enter your Password",
        mask: true,
    }
    ]).then(answer => {
        if (answer.login == 'Admin') {
            if ('admin', answer.Password, answer.Username) {
                adminMenu()
            } else {
                login()
            }
        } else {
            if (validate('user', answer.Password, answer.Username)) {
                userMenu()
            } else {
                login()
            }

        }


    })
}

function validate(userType, password, name) {
    if (userType == 'admin') {
        adminMenu()

        
    } else {
        users.users.forEach(user => {
            if (user.username == name && user.password == password) {
                // console.log("=====")
                check=true
                return
            } else {
                // console.log("======00000")
            
              
            }
        })
    }
console.log(check)
    return check
}

// console.log(users)
welcome()



