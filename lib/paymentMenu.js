
class User{
    constructor(){

    }


paymentMenu(){
    inquirer.prompt([{
        type:"list",
        name:"payment",
        message:"What do you want to do",
        choices:['pay into wallet','Pay with Card'],
    }]).then(answer=>{
        if(answer.payment=='pay with Card'){
            this.payWithCard()
        }else if(answer.payment=='pay with wallet'){
            this.payWithWallet()
        }else{
            console.log('please make payment',this.paymentMenu())
        }
    })
}



payWithCard(){
    inquirer.prompt([{
        type:"input",
        name:"Card",
        message:"enter your card your number",
    },
    {
        type:"input",
        name:"Card",
        message:"Enter the card date",
    },
    {
        type:"input",
        name:"Card",
        message:"enter your card s number",
        mask:true,
    },
]).then(answer=>{
    if(answer==this.payWithCard){
        console.log(`the payment  of ${prize} is successful`)
    }else{
        console.log(`The payment of${prize} is not successful`)
    }
})

}

payWithWallet(){

}


}