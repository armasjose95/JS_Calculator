class Calculator { //allows us to set these text element inside of caluclator class
    //constructor takes all the inputs for it as well as all the functions for the calculator
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear //want to clear all of our inputs and set them all to default values as soon as we create a new calculator
    }

    clear() { //remove all these values
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined //undefined since they don't have any operations selected if we clear the calculator
    }

    delete() {

    }

    //what's going to happen every time a user clicks on a # to add to the screen. Pass the # the user selected. 
    //convert everything to a sting because JS will try to add these as actual numbers. ex 1+1=11 not 2. 
    //#s need to be appended not added
    appendNumber(number) { //instead of appending the #, we can just change the current operand to equal that #
        //Only want one period so checking to see if we already have one
        if (number === '.' && this.currentOperand.includes('.')) return
        if(this.currentOperand === '' )
        {
            this.currentOperand = number
        }
        else{
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    //what's going to happen every time a user clicks on an operation. ex. +,- Pass the operation the user selected. 
    chooseOperation(operation) {
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //Takes values inside of calculator & compute a single value for what we need to display on the calculator.
    compute() {

    }

    //update the values inside of our output
    updateDisplay() { //allows us to set the text of number in white
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//create the calculator 
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//loop over all these different buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => { //event listener looking out for a click
        calculator.appendNumber(button.innerText) //want to add(append) the # of whatever is inside that button
        calculator.updateDisplay() //our display valueus will constantly be updated every time we click a button 
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => { //event listener looking out for a click
        calculator.chooseOperation(button.innerText) //want to choose the operation
        calculator.updateDisplay() //our display valueus will constantly be updated every time we click an operation 
    })
})