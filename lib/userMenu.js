const prompt = require('readline').createInterface(process.stdin, process.stdout);
const inquirer = require("inquirer");
// const userDB = require("./")
const fs = require('fs')
const userss = JSON.parse(fs.readFileSync('./userDB.json'))
var amount=0.0;


function userOption(theObject){
    inquirer.prompt({
        type:"list",
        name:"user options",
        message:"Choose your Operation",
        choices:['veiw profile','view movies','pay into wallet','check Balance'],
    }).then(answer=>{
        if(answer["user options"]=='veiw profile'){
            veiwProfile(theObject)
        }else if(answer["user options"]=='pay into wallet'){
            payInToWallet()
        }else if(answer["user options"]=='check Balance'){
            checkBalance()
        }else if(answer["user options"]=='view movies'){
            viewMovies()
        }else{
            userOption()
        }
    })


   

}

function payInToWallet(){
    inquirer.prompt([{
        type:"number",
        name:"amount",
        message:"Input Amount to pay in",
    }]).then(answer=>{
        amount = amount + Number(answer.amount)
        // console.log(amount+answer.amount)
        if(amount>0){
            console.log('The payment of ' + answer.amount + ' is successful'+'your balance is' + amount)
            userOption()

        }else{
            console.log("please enter an amount")
        }
    })
}

function viewMovies(){
    let data = fs.readFileSync("./lib/Movies.json")
    let movies = JSON.parse(data).movies
    console.log(movies)
    for(movie of movies){
        console.log("Name:", movie.name)
        console.log("Year:", movie.year)
        console.log("Director:", movie.director)
        console.log("Prize:", movie.prize)
        console.log("Know the movie you want to rent\n")
    }
}



function veiwProfile(theObject){
    console.log(theObject);
    console.log(userss)
   let found =  userss.users.find( mee=> mee.name == theObject.name)
//    if (found){
//        console.log(found)
//    }

}



 module.exports=userOption;