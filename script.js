let firstNumber = '';
let secondNumber = '';
let operator = '';
let operatorIsPressed = false;
let resultExists = false;
const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('textarea');
const equalityButton = document.querySelector('.equality');
const operatorButtons = document.querySelectorAll('.operator');

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
  // if we want to use the result after a calculate this firstnumber = "" is deleting the result, I DECIDED TO SET RESULT EXISTS = FALSE IN ASSIGN OPERATOR AS WE HAVE CHOSEN TO CONTINUE USIONG THE RESULT AT THAT POINT INSTEAD OF ENTERING
  // A NEW VALUE
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
  if(operatorIsPressed){
    display.textContent = operate();
    firstNumber = operate();
    secondNumber = '';
  }
  else{
    operatorIsPressed = true;
  }
  operator = this.textContent;
}

function calculate(){
  if(secondNumber===''){
    return;
  }
  display.textContent = operate();
  firstNumber = operate();
  secondNumber = '';
  operator = '';
  operatorIsPressed = false;
  resultExists = true;
}

digitButtons.forEach((button) => button.addEventListener('click', populateDisplay));
equalityButton.addEventListener('click', calculate);
operatorButtons.forEach(((button) => button.addEventListener('click', assignOperator)));
