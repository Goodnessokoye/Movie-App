var amount=0.0;
const fs = require('fs')

let Movies = JSON.parse(fs.readFileSync("./lib/Movies.json"));
//========== require the prompt module and create interface ==========
const inquirer = require("inquirer");

const adminMenu = require("./lib/adminMenu");
const costumer = require("./lib/userclass");

const users = JSON.parse(fs.readFileSync('./userDB.json'))
var appUser;

var check=false;
var logedInUser;
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
            userMenu(appUser);
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
                check=true
                logedInUser = user;
            } else {
           
              
            }
        })
    }
console.log(check)
    return check
}

function userMenu(theObject){
    // console.log(logedInUser);
     
    let options = {
        // 'veiw profile': veiwProfile,
        'Rent a Movie': viewMovies,
        'view rented movies': rentedMovies
    }

    inquirer.prompt({
        type:"list",
        name:"user options",
        message:"Choose your Operation",
        choices: Object.keys(options)
    }).then(answer=>{
        options[answer["user options"]]();
    })
}

function viewMovies(){
    let namesOfMovies = Movies.movies.map(movie => movie.name); 

    let options = namesOfMovies;
    options[options.length - 1] += "\n";
    options.push("Go back to Home\n");

    inquirer.prompt([{
        type: "list",
        name: "selection",
        message: "\b\bSelect a movie to view details",
        choices: options
    }]).then(answer => {
        if (answer.selection == "Go back to Home\n") {
            userMenu();
        }else{
            viewMovie(getByPropName("name", answer.selection.trim(), "movies"));
        }
    })   

}

function viewMovie(movie = {}){
    for(prop of Object.keys(movie)) {
        console.log(prop, ":", movie[prop]);
    }
    inquirer.prompt([{
        type:"list",
        name:"viewoptions",
        message:"Do you want to Rent this Movie?",
        choices:['Yes','No']
    }]).then(answer=>{
        if(answer.viewoptions=='Yes'){
            paymentCard(movie.name)
        }else{
           viewMovies()
        }
    })
}

function rentedMovies(){

    if (logedInUser.rentedMovies == 0){
        inquirer.prompt([{
            type: "list",
            name: "selection",
            message: "\b\bYou have not rented any movies yet",
            choices: ["Go Back"]
        }]).then(answer => {
            userMenu();
        })  
    }else{
        let options = [];
        for (movieName of logedInUser.rentedMovies) {
            options.push(movieName);
            if (options.length == logedInUser.rentedMovies.length) {
                options[options.length - 1] += "\n";
                options.push("Go back to Home");
            }
        }
        
        inquirer.prompt([{
            type: "list",
            name: "selection",
            message: "\b\bList of rented movies:",
            choices: options
        }]).then(answer => {
            if (answer.selection == "Go back to Home") {
                userMenu();
            }else{
                viewMovie(getByPropName("name", answer.selection.trim(), "movies"), rented);

            }
        })    
    }
}

function getByPropName(propName, match, array){
    for (element of Movies[array]) if (element[propName] == match) return element;
}

function paymentCard(movieName){
    inquirer.prompt([{
        type:"number",
        name:"Card",
        message:"enter your card your number",
    }
    ]).then(answer=>{
        if(answer.Card){
            paymentPin(movieName)
        }else{
            console.log(`invalid input`)
            paymentCard(movieName)
        }
    })

}

function paymentPin(movieName){
    inquirer.prompt([{
        type:"number",
        name:"pin",
        message:"enter your card pin",
    }]).then(answer=>{
        if(answer.pin){
            console.log(`The payment successful`)
            logedInUser.rentedMovies.push(movieName);
            updateJsonfile()
            viewMovies()
        }else{
            console.log(`invalid input`)
            paymentPin(movieName)
        }
    })
}

function updateJsonfile(){
    fs.writeFileSync("./lib/userDB.json", JSON.stringify(users,null,1));
}

welcome()



