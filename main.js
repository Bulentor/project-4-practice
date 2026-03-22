const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let firstValue = 0;
let operator = null;
let waitingForNextValue = false;

buttons.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.classList.contains('button')) return;

  const value = target.textContent;

  switch (value) {
    case 'AC':
      resetCalculator();
      break;
    case '=':
      handleOperator(operator);
      operator = null;
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperator(value);
      break;
    case '.':
      inputDecimal();
      break;
    case '+/-':
      display.textContent = (parseFloat(display.textContent) * -1).toString();
      break;
    case '%':
      display.textContent = (parseFloat(display.textContent) / 100).toString();
      break;
    default:
      inputDigit(value);
  }
  updateDisplay();
});

function inputDigit(digit) {
  if (waitingForNextValue) {
    display.textContent = digit;
    waitingForNextValue = false;
  } else {
    display.textContent = display.textContent === '0' ? digit : display.textContent + digit;
  }
}

function inputDecimal() {
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function handleOperator(nextOperator) {
  const currentValue = parseFloat(display.textContent);

  if (operator && waitingForNextValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = currentValue;
  } else if (operator) {
    const result = calculate(firstValue, currentValue, operator);
    display.textContent = String(result);
    firstValue = result;
  }

  waitingForNextValue = true;
  operator = nextOperator;
}

function calculate(first, second, op) {
  if (op === '+') return first + second;
  if (op === '-') return first - second;
  if (op === '*') return first * second;
  if (op === '/') return first / second;
  return second;
}

function resetCalculator() {
  display.textContent = '0';
  firstValue = null;
  operator = null;
  waitingForNextValue = false;
}

function updateDisplay() {
  // Ограничиваем длину числа, чтобы оно не вылезало за экран
  if (display.textContent.length > 9) {
    display.textContent = display.textContent.substring(0, 9);
  }
}
