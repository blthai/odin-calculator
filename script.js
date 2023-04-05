let firstNumber = '';
let secondNumber = '';
let operator = '';
let operatorIsPressed = false;
let resultExists = false;
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

function assignOperator(event){
  if(resultExists){
    resultExists = false;
  }
  //if operator is pressed AND second number is empty just swap to the new oeprator
  if(operatorIsPressed){
    if(!firstNumber && operator === '/'){
      display.textContent = '0';
      return;
    }
    display.textContent = operate();
    firstNumber = operate();
    secondNumber = '';
  }
  else{
    operatorIsPressed = true;
  }
  operator = this.textContent;
}

//consider creating a variable to store the first duplicate equals generated number the ncheck if its empty and if not empty and second number is emptywere going to use the calculate
function calculate(){
  if(firstNumber === '' && secondNumber === ''){
    return;
  }
  if(!firstNumber && operator === '/'){
    display.textContent = '0';
    return;
  }
  if(secondNumber===''){
    secondNumber = firstNumber;
  }
  display.textContent = operate();
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
  operatorIsPressed = false;
  resultExists = false;
  display.textContent='0';
}


digitButtons.forEach((button) => button.addEventListener('click', populateDisplay));
equalityButton.addEventListener('click', calculate);
operatorButtons.forEach(((button) => button.addEventListener('click', assignOperator)));
clearButton.addEventListener('click', clearCalculator);