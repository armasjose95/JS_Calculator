class Calculator { //allows us to set these text element inside of caluclator class
    //constructor takes all the inputs for it as well as all the functions for the calculator
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() //want to clear all of our inputs and set them all to default values as soon as we create a new calculator
        this.clear
    }

    clear() { //remove all these values
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined //undefined since they don't have any operations selected if we clear the calculator
    }

    delete() {
        /* convert curroperand after setting to itself & want to get very last value and chop it off, hence -1
        that's what slice method is for, goes from index 0 all the way to one from the end
        takes all characters from currOper sting & all diff #s from very 1st # to 2ndtolast and say that in new currOperand #*/
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //what's going to happen every time a user clicks on a # to add to the screen. Pass the # the user selected. 
    //convert everything to a sting because JS will try to add these as actual numbers. ex 1+1=11 not 2. 
    //#s need to be appended not added
    appendNumber(number) { //instead of appending the #, we can just change the current operand to equal that #
        //Only want one period so checking to see if we already have one
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    //what's going to happen every time a user clicks on an operation. ex. +,- Pass the operation the user selected. 
    chooseOperation(operation) {
        //checkin to make sure operations dont work if there's no crrnt value to operate on. cant execute further into code
        if (this.currentOperand === '') return 
        //if i already have something computed in prevopperand & something in curroperand, I want to do computation
        if (this.previousOperand !== '') { 
            this.compute() //updates all the variables as we need
        }
        this.operation = operation //our calculator will know which operation it needs to use
        this.previousOperand = this.currentOperand //we're done typing the current # so we recycle that over to this prev operand
        this.currentOperand = '' //clear our new current operand because = to an empty string
    }

    //Takes values inside of calculator & compute a single value for what we need to display on the calculator.
    compute() {
        let computation //result of our compute function
        //create prev variable & going to be actual # version of our prev operate operand
        //converting string to a number
        const prev = parseFloat(this.previousOperand) 
        const current = parseFloat(this.currentOperand)
        //if user doesnt input anything, we dont want code to run
        //NaN = not a number
        //dont have a prev value or no current value we just want to return and cancel this function completly
        if (isNaN(prev) || isNaN(current)) return
        //switch lets you do a bunch of if statements on a single object(this.operation). define if statements by keyword: case
        switch (this.operation) {
            case '+': //in ex this.operation should equal + & execute the code inside of this case
                computation = prev + current //prev value added to our curr value
                break //not to follow any of the other case statements
            case '-': 
                computation = prev - current 
                break 
            case '*': 
                computation = prev * current 
                break 
            case '÷': 
                computation = prev / current 
                break 
            default: //when none of these values get executed, whatever is in default is going to ve executed
                return /*return becus if none of these symbols match our operation, means we have an invalid operation sign
                so we don't want to do any computation */
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    //add commas where needed in larger numbers
    getDisplayNumber(number) { //also calling the function in the updateDisplay function
        //need string cus we want to be able to split string on the decimail character inside of it
        const stringNumber = number.toString() 
        //split on actual decimal. take our string & turn it into an array. 1st # pt of array is b4 period & 2nd # is after period
        //get the 1st part[0] cus we want the integer values b4 that
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        //dont need to parse cus we dont need it to be a # so we want 2nd part of that array [1]
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay //want integerDisplay seperatley 
        if (isNaN(integerDigits)) { //happens anytime you input nothing on screen or inputs just a decimal place
            integerDisplay = '' //if it happens, want integerDisplay to be equal to an empty string
        } else { // if they did enter an integer value
            integerDisplay = integerDigits.toLocaleString('en', {
                // never want a decimal place after it gets converted to a string with a bunch of commas
                maximumFractionDigits: 0 }) 
        }
        if (decimalDigits != null) { // if there is a decimal and not equal to null
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay // if there's no decimal
        }
    }

    //update the values inside of our output
    updateDisplay() { //allows us to set the text of number in white
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) { // if we have an operation and operation does not equal null. We want to display prev opp txt
            //make a concatenation of both prevOpper & our operation. string has the operation appended 2 the end of it
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else { //clear out previous opperand after AC button is pressed
            this.previousOperandTextElement.innerText = ''
        }
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

equalsButton.addEventListener('click', button => { //passes in the button
    calculator.compute() //calls compute bttn in my calculator to get the computed value
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => { //passes in the button
    calculator.clear() //calls compute bttn in my calculator to get the computed value
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => { //passes in the button
    calculator.delete() //calls compute bttn in my calculator to get the computed value
    calculator.updateDisplay()
})