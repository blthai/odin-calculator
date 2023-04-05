let firstNumber = '';
let secondNumber = '';
let operator = '';
let operatorIsPressed = false;
let resultExists = false;
let originalFirstNumber = '';
const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('textarea');
const equalityButton = document.querySelector('.equality');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');

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
  if(operatorIsPressed){
    secondNumber = secondNumber + this.textContent;
    display.textContent = secondNumber;
  }
  else{
    firstNumber = firstNumber + this.textContent;
    display.textContent = firstNumber;
  }
}

//set the resultExists to false so that when the user enters in numbers for the secondnumber after the operator, the firstnumber is not reset
function assignOperator(event){
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
  }
  else if(firstNumber === ''){
    return;
  }
  operatorIsPressed = true;
  operator = this.textContent;
}

//consider creating a variable to store the first duplicate equals generated number the ncheck if its empty and if not empty and second number is emptywere going to use the calculate
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
  resultExists = true;
}

function clearCalculator(event){
  firstNumber = '';
  secondNumber = '';
  operator = '';
  originalFirstNumber = '';
  operatorIsPressed = false;
  resultExists = false;
  display.textContent='0';
}


digitButtons.forEach((button) => button.addEventListener('click', populateDisplay));
equalityButton.addEventListener('click', calculate);
operatorButtons.forEach(((button) => button.addEventListener('click', assignOperator)));
clearButton.addEventListener('click', clearCalculator);