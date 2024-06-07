#! /usr/bin/env node
import inquirer from "inquirer";

interface bankAccount {
    accountNumber: number;
    balance: number;
    widthdraw(amount: number):void
    deposit(amount: number):void
    checkBalance(): void
}

class bankAccount implements bankAccount {
    accountNumber: number;
    balance: number;

    constructor (accountNumber: number, balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    widthdraw(amount: number): void {
        if (this.balance>= amount){
            this.balance -= amount;
            console.log(`withdrawal of $${amount} Successful.`);
            console.log(`Your Remaining Balance is $${this.balance}`);
        
        }
        else {
            console.log(`Insufficient Balance.`);
            
        }
    }

    deposit(amount: number): void {
        if (amount > 100){
            amount -=1; // $1 charged as fee on deposit $100 or above
        } this.balance += amount;
        console.log(`Deposit of $${amount} successful.`);
        console.log(`Your Account Balance is $${this.balance}`);
        
    }
    checkBalance(): void {
        console.log(`Your Current Balance is $${this.balance}`);
        
    }
}
// Creating customer class
class customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobile: number;
    account: bankAccount;

    constructor (firstName: string, lastName:string, gender:string, age:number, mobile:number, account:bankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this. mobile= mobile;
        this.account = account;
    }
}

// Creating New bank account

const accounts: bankAccount[] = [
    new bankAccount (1001, 1000),
    new bankAccount (1002, 5000),
    new bankAccount (1003, 8000),
];

const newCustomers: customer [] = [
    new customer ("Ghulam", "Akbar", "Male", 32, 3213011912, accounts[0]),
    new customer ("Aini", "Akbar", "Female", 4, 3213011914, accounts[1]),
    new customer ("Khizra", "Akbar", "Female", 3, 3213011913, accounts[2]),
];

async function service(){
    do {
        const user = await inquirer.prompt({
            name:"input",
            type: "number",
            message: "Enter your Account Number. "
        })
        const customer = newCustomers.find(Customers => Customers.account.accountNumber === user.input);
        if (customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
            
            const task = await inquirer.prompt({
                name: "task1",
                type: "list",
                message: "Select One Option",
                choices: ["Withdraw", "Deposit", "Check Balance", "Exit"]

            });

            switch (task.task1){
                case "Withdraw":
                    const withdrawAmmount = await inquirer.prompt ({
                        name: "amount",
                        type: "number",
                        message: "Please Enter your Amount to Withdraw."
                    })
                    customer.account.widthdraw(withdrawAmmount.amount);                    
                    break;

                case "Deposit":
                    const depositAmmount = await inquirer.prompt ({
                        name: "amount",
                        type: "number",
                        message: "Please Enter your Amount to Deposit."
                        })
                    customer.account.deposit(depositAmmount.amount);
                    break;

                case "Check Balance": 
                    customer.account.checkBalance();
                    break;

                case "Exit": 
                        console.log(`\nThanks for using our Bank Services`);
                        console.log(`       Have a Good Day`);
                        return;
            }
        }
        else {
                console.log(`\nInvalid Account Number`);
                console.log(`Please Try again with a valid Account Number`);
        }
    } while (true);
}
service()