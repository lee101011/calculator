const add = function (operand1, operand2) {
  return operand1 + operand2;
};

const subtract = function (operand1, operand2) {
  return operand1 - operand2;
};

const sum = function (operands) {
  return operands.reduce((total, current) => total + current, 0);
};

const multiply = function (operands) {
  return operands.reduce((product, current) => product * current)
};

const divide = function (operand1, operand2) {
  if (operand2 === 0) return "NaN: Go back to school";
  return operand1 / operand2;
};

const power = function (operand1, operand2) {
  return Math.pow(operand1, operand2);
};

const factorial = function (factor) {
  if (factor < 0 || !Number.isInteger(factor)) return NaN;
  let result = 1;
  for (let i = 1; i <= factor; i++) {
    result *= i;
  }
  return result;
};

function round(number, decimals) {
  let factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
}

function operate(operand1, operator, operand2) {
  let result;
  switch (operator) {
    case "+":
      result = add(operand1, operand2);
      break;
    case "-":
      result = subtract(operand1, operand2);
      break;
    case "x":
      result = multiply(operand1, operand2);
      break;
    case "÷":
    case "/":
      result = divide(operand1, operand2);
      break;
    case "^":
      result = power(operand1, operand2);
      break;
    case "!":
      result = factorial(operand1);
      break;
    default:
      result = NaN;
      break;
  }
  return round(result, 6);
}

function parseOperations(operator1, operand, operator2, ...rest) {
  if (rest.length === 0) return operate(operator1, operand, operator2[0]);
  return parseOperations(operator2[0], operator2[1], operator2.slice(2));
}

function prepareOperations(array) {
  let operations = array.slice().reverse();
  return operations;
}

let display = "";
let lastEntry;
let history;
let numberStack = [];
let operatorStack = [];
const OPERATOR = 1;
const OPERAND = 2;

const plus = "element";

let storedValue = undefined;
let operator = "";
let displayedValue = 0;

function queueNumber(number) {
  numberStack.push(number);
}

function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}

function queueOperator(operator, number) {
  if(numberStack.length > 0) {
    let op1 = numberStack.pop();
    let result = operate(op1, operator, number);
  }
  

}

function calculate() {
}

const grid = document.querySelector(".buttons");
grid.addEventListener("click", handleButtons);

function handleButtons(e) {
  console.log(e);
  switch(e.target.id) {
    case "one":
    case "two":
    case "three":
    case "four":
    case "five":
    case "siz":
    case "seven":
    case "eight":
    case "nine":
    case "zero":
      numberPress(e.target.textContent);
      break;
    
  }
}

function numberPress(string) {
  console.log(string);
}