let firstNumber = '0';
let secondNumber = '';
let operator = '';
let operatorIsPressed = false;
let resultExists = false;
let decimalIsPressed = false;
let originalFirstNumber = '';
let tempResultExists = false;
const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('.display');
const equalityButton = document.querySelector('.equality');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const percentageButton = document.querySelector('.percentage');



function add(number1, number2){
  return Number(number1) + Number(number2);
}

function subtract(number1, number2){
  return Number(number1) - Number(number2);
}

function multiply(number1, number2){
  return Number(number1) * Number(number2);
}

function divide(number1, number2){
  return Number(number1) / Number(number2);
}

function operate(){
  if(operator === '+'){
    return add(firstNumber, secondNumber);
  }
  else if(operator === '-'){
    return subtract(firstNumber, secondNumber);
  }
  else if(operator === '*'){
    return multiply(firstNumber, secondNumber);
  }
  else if(operator === '/'){
    return divide(firstNumber, secondNumber);
  }
}

//if the result exists, set the firstnumber to an empty string and set the resultexists boolean to false when the display is populated again.
//doing this will have the display show the result from the most recent calculation, then wipe itself and begin displaying a new firstnumber
//if the user has chosen to populate the display isntead of chaining the result with another operator
function populateDisplay(event){
  if(resultExists){
    firstNumber = '';
    resultExists = false;
  }
  if(tempResultExists){
    tempResultExists = false;
  }
  if(this.textContent === '.'){
    if(decimalIsPressed){
      return;
    }
    decimalIsPressed = true;
  }
  if(operatorIsPressed){
    if(secondNumber === '0'){
      secondNumber = this.textContent;
    }
    else{
      if(secondNumber.length >12){
        return;
      }
      secondNumber = secondNumber + this.textContent;
    }
    display.textContent = secondNumber;
  }
  else{
    if(firstNumber === '0'){
      firstNumber = this.textContent
    }
    else{
      if(firstNumber.length >12){
        return;
      }
      firstNumber = firstNumber + this.textContent;
    }
    display.textContent = firstNumber;
  }
}

//set the resultExists to false so that when the user enters in numbers for the secondnumber after the operator, the firstnumber is not reset
//if the operator is pressed and firstNumber, secondNumber, and the operator are filled out already, 
//perform the calculation, and set firstNumber equal to the result 
// use the operator button that triggered this event in the next calculation
function assignOperator(event){
  decimalIsPressed = false;
  if(resultExists){
    resultExists = false;
  }
  if(operatorIsPressed && secondNumber === ''){
    operator = this.textContent;
    return;
  }
  if(operatorIsPressed){
    if(!firstNumber && operator === '/'){
      clearCalculator();
      return;
    }
    display.textContent = Number(Number(operate().toFixed(9)));
    firstNumber = operate();
    secondNumber = '';
    tempResultExists = true;
  }
  else if(firstNumber === ''){
    return;
  }
  operatorIsPressed = true;
  operator = this.textContent;
}

//do not perform the calculation if there are no inputs, or if the user is trying to divide by zero
//keep a reference to the firstNumber so that if the user presses the equal sign button after
//filling out only the firstNumber and an operator,  
//perform the calculation once with the firstNumber on both sides of the operator
function calculate(){
  if(firstNumber === '' || (secondNumber === '' && operatorIsPressed === false)){
    return;
  }
  if(!firstNumber && operator === '/'){
    clearCalculator();
    return;
  }
  if(!secondNumber){
    if(!originalFirstNumber){
      originalFirstNumber = firstNumber;
    }
    secondNumber = originalFirstNumber;
  }
  display.textContent = Number(Number(operate().toFixed(9)));
  firstNumber = operate();
  secondNumber = '';
  operator = '';
  operatorIsPressed = false;
  decimalIsPressed = false;
  resultExists = true;
}

//reset all variable back to their default values in order to reset the calculator state
function clearCalculator(event){
  firstNumber = '';
  secondNumber = '';
  operator = '';
  originalFirstNumber = '';
  operatorIsPressed = false;
  resultExists = false;
  display.textContent='0';
}

function checkForDecimal(string){
  if(string.charAt(string.length-1) === '.'){
    decimalIsPressed = false;
  }
}

function checkIfNumberExists(string){
  if(!string){
    display.textContent = '0';
    return false;
  }
  return true;
}

//delete the last digit in the number and if the number's last digit is deleted, display a 0 to the user
function backspace(){
  if(resultExists || (!firstNumber && !secondNumber || tempResultExists) ){
    return;
  }
  else if(secondNumber){
    checkForDecimal(secondNumber);
    secondNumber = secondNumber.substring(0, secondNumber.length - 1);
    if(!checkIfNumberExists(secondNumber)){
      return;
    }
    display.textContent = secondNumber;
  }
  else if(display.textContent === '0' && firstNumber!==''){
    return;
  }
  else{
    checkForDecimal(firstNumber);
    firstNumber = firstNumber.substring(0, firstNumber.length - 1);
    if(!checkIfNumberExists(firstNumber)){
      return;
    }
    display.textContent = firstNumber;
  }
}

//multiply either firstNumber or secondNumber by .01 to convert to decimal
//it is possible for this calculation to result in an integer, 
//so this function checks for that before it sets to decimalIsPressed boolean to true
function percentage(){
  if((!firstNumber && !secondNumber)){
    return;
  } 
  else if(secondNumber){
    if(secondNumber !== 0 && (secondNumber % 100 !== 0)){
      decimalIsPressed = true;
    }
    secondNumber = (secondNumber * .01) + "";
    display.textContent = Number(Number(secondNumber).toFixed(9)) + '';
  }
  else{
    if(firstNumber !== 0 && (firstNumber % 100 !== 0)){
      decimalIsPressed = true;
    }
    firstNumber = (firstNumber * .01) + "";
    display.textContent = Number(Number(firstNumber).toFixed(9)) + '';
  }
}

digitButtons.forEach((button) => button.addEventListener('click', populateDisplay));
equalityButton.addEventListener('click', calculate);
operatorButtons.forEach(((button) => button.addEventListener('click', assignOperator)));
clearButton.addEventListener('click', clearCalculator);
delButton.addEventListener('click', backspace);
percentageButton.addEventListener('click', percentage);
