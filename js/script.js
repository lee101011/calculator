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
  if (operand2 === 0) return DIVIDE_ZERO;
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
    case "*":
      result = multiply([operand1, operand2]);
      break;
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
  return isNumber(result) ? round(result, 6) : result;
}

document.addEventListener("keydown", handleKey);

const historyHTML = document.querySelector(".history");
const resultHTML = document.querySelector(".result");
const gridHTML = document.querySelector(".buttons");
gridHTML.addEventListener("click", handleButtons);

let history = [];
let result = undefined;
let storedValue = undefined;
let storedOperator = undefined;
let lastType = undefined;
const DIVIDE_ZERO = "NaN: Go back to school";

const OPERATOR = 1;
const OPERAND = 2;

function handleKey(e) {
  console.log(e.key);
  switch (e.key) {
    case " ":
    case "Enter":
      operation("=");
      break;
    case "Backspace":
    case "Delete":
      backspace();
      break;
    case ".":
    case "Decimal":
      handleDecimal();
      break;
    case "*":
    case "Multiply":
      operation("*");
      break;
    case "+":
    case "Add":
      operation("+");
      break;
    case "/":
    case "Divide":
      operation("/");
      break;
    case "-":
    case "Subtract":
      operation("-");
      break;
    case "Escape":
      clear(true);
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      numberPress(e.key);
      break;
  }
}

function handleButtons(e) {
  switch (e.target.id) {
    case "one":
    case "two":
    case "three":
    case "four":
    case "five":
    case "six":
    case "seven":
    case "eight":
    case "nine":
    case "zero":
      numberPress(e.target.textContent);
      break;
    case "decimal":
      handleDecimal();
      break;
    case "addition":
      operation("+");
      break;
    case "substraction":
      operation("-");
      break;
    case "multiplication":
      operation("*");
      break;
    case "division":
      operation("/");
      break;
    case "backspace":
      backspace();
      break;
    case "clear":
      clear();
      break;
    case "clear-all":
      clear(true);
      break;
    case "equal":
      operation("=");
      break;
  }
}


function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}

function refresh() {
  resultHTML.textContent = result;
  historyHTML.textContent = history.join(' ');
}

function numberPress(string) {
  handleNewOperand();
  resultHTML.textContent = resultHTML.textContent.concat(string);
}

function getDisplayNumber() {
  return Number(resultHTML.textContent);
}

function handleDecimal() {
  handleNewOperand();
  if (!resultHTML.textContent.includes(".")) {
    resultHTML.textContent = resultHTML.textContent.concat(".");
  }
}

function backspace() {
  resultHTML.textContent = resultHTML.textContent.substring(0, resultHTML.textContent.length - 1);
}

function handleNewOperand() {
  if (result === DIVIDE_ZERO || storedOperator === "=") clear(true);
  if (lastType === OPERATOR || lastType === undefined) {
    resultHTML.textContent = "";
    lastType = OPERAND;
  }
}

function clear(all) {
  if (all) {
    history.length = 0;
    storedValue = undefined;
    storedOperator = undefined;
  }
  result = undefined;
  lastType = undefined;
  refresh();
}

function operation(operator) {
  if (result === DIVIDE_ZERO) clear(true);
  if (lastType === OPERAND) {
    let num = getDisplayNumber();
    history.push(num, operator);
    if (storedValue && storedOperator !== "=") {
      storedValue = operate(storedValue, storedOperator, num);
    } else {
      storedValue = num;
    }
    result = storedValue;
    storedOperator = operator;
  } else if (storedValue) {
    history.pop();
    history.push(operator);
    storedOperator = operator;
  }
  lastType = OPERATOR;
  refresh();
}