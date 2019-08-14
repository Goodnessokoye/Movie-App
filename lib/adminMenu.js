const fs = require('fs');
const prompt = require('readline').createInterface(process.stdin, process.stdout);
const inquirer = require("inquirer");



let moviess = JSON.parse(fs.readFileSync("./lib/Movies.json"));
function adminOption(){
    inquirer.prompt({
        type:"list",
        name:"Admin options",
        message:"Choose your Operation",
        choices:['Add movie','Remove movie'],
    }).then(answer=>{
        if(answer["Admin options"]=='Add movie'){
            addMovie()
        }else{
            removeMovie()
        }
    })

}


 function addMovie(){
    inquirer.prompt([{
        type:"input",
        name:"name",
        message:"Type in the name",
       
    },

    {
        type:"input",
        name:"year",
        message:"Type in the year",
    },

    {
        type:"input",
        name:"director",
        message:"Type in the director",
    },

    {
        type:"input",
        name:"prize",
        message:"Type in the prize",
    },

    {
        type:"list",
        name:"add",
        message:"Do you want to add the movie",
        choices:['Yes','No']
    },
]).then(answer=>{ 
    if(answer.add=='Yes'){
        console.log(answer)
        moviess.movies.push({
            name: answer.name,
            year: answer.year,
            director: answer.director,
            prize: answer.prize,
        })
        updateJsonfile();
        console.log("Your Movie File has been updated")
   
} else {
    adminOption()
}
})
}


function removeMovie(name){
    const index = moviess.findIndex(name);
    
    if (index !== undefined) movies.splice(index, 1);

    console.log("After removal:", moviess.json);
}

// const admin=new Admin();
module.exports=adminOption;
function updateJsonfile(){
    fs.writeFileSync("./lib/Movies.json", JSON.stringify(moviess,null,1));
}