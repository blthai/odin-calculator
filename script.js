let firstNumber = '';
let secondNumber = '';
let operator;
let operatorIsPressed = false;

console.log(firstNumber+'hi')

function add(number1, number2){
  return number1 + number2;
}

function subtract(number1, number2){
  return number1 - number2;
}

function multiply(number1, number2){
  return number1 * number2;
}

function divide(number1, number2){
  return number1 / number2;
}

function operate(operator, number1, number2){
  if(operator === '+'){
    return add(number1, number2);
  }
  else if(operator === '-'){
    return subtract(number1, number2);
  }
  else if(operator === '*'){
    return multiply(number1, number2);
  }
  else if(operator === '/'){
    return divide(number1, number2);
  }
}

const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach((button) => button.addEventListener('click', populateDisplay));
const display = document.querySelector('textarea');

function populateDisplay(event){
  if(operatorIsPressed){
    secondNumber = secondNumber + this.textContent;
    display.textContent = secondNumber;
  }
  else{
    firstNumber = firstNumber + this.textContent;
    display.textContent = firstNumber;
  }
}



