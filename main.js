const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let currentInput = '0'; // То, что вводим сейчас
let previousInput = ''; // Предыдущее число
let operator = null;    // Знак операции
let shouldResetScreen = false; // Флаг для очистки экрана после нажатия на оператор

buttons.addEventListener('click', (e) => {
    if (!e.target.classList.contains('button')) return;

    const value = e.target.textContent;

    // Сброс (AC)
    if (e.target.classList.contains('ac')) {
        resetAll();
        return;
    }

    // Числа и точка
    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } 
    // Операции (=, +, -, *, /)
    else if (value === '=') {
        calculate();
        operator = null;
    } else {
        handleOperator(value);
    }

    updateDisplay();
});

function handleNumber(num) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
}

function handleOperator(nextOperator) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = nextOperator;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b !== 0 ? a / b : 'Ошибка'; break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
}

function resetAll() {
    display.innerText = '0';
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput;
}

