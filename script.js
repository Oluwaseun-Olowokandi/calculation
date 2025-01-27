const screen = document.querySelector('.screen');
const keys = document.querySelectorAll('.calculator-key button');
const memoryKeys = document.querySelectorAll('.calc-memory'); 

let currentInput = '0';
let operator = null;
let operand1 = null;
let operand2 = null;
let memory = 0;
let resetNextInput = false;

// Update screen function
function updateScreen(value) {
    screen.value = value;
}

// Perform calculation on the calculator
function calculate(op, a, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? 'Error' : a / b;
        default:
            return b;
    }
}  
// Handle memory functionality
//loop the each memory keys
memoryKeys.forEach(key => {
    key.addEventListener('click', () => {
        const action = key.textContent;

        switch (action) {
            case 'MC': // clear the memory
                memory = 0;
                break;
            case 'MR': // recall the memory
                currentInput = memory.toString();//convert the memory to string
                updateScreen(currentInput);
                break;
            case 'M+': //add the value in the memory
                memory += parseFloat(screen.value) || 0; //convert the value on the screen to a floating number and add it to the memory
                break;
            case 'M-':
                memory -= parseFloat(screen.value) || 0;
                break;
            case 'MS':
                memory = parseFloat(screen.value) || 0;
                break;
        }
    });
});
// Handle key press events
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        if (!isNaN(keyValue) || keyValue === '.') {
            if (resetNextInput) {
                currentInput = keyValue;
                resetNextInput = false;
            } else {
                currentInput = currentInput === '0' ? keyValue : currentInput + keyValue;
            }
            updateScreen(currentInput);
        } else if (keyValue === 'C') {
            currentInput = '0';
            operand1 = null;
            operand2 = null;
            operator = null;
            updateScreen(currentInput);
        } else if (keyValue === 'CE') {
            currentInput = '0';
            updateScreen(currentInput);
        } else if (keyValue === '逃') { // Backspace
            currentInput = currentInput.slice(0, -1) || '0';
            updateScreen(currentInput);
        } else if (['+', '-', '×', '÷'].includes(keyValue)) {
            operator = keyValue === '×' ? '*' : keyValue === '÷' ? '/' : keyValue;
            operand1 = parseFloat(currentInput);
            resetNextInput = true;
        } else if (keyValue === '=') {
            if (operator) {
                operand2 = parseFloat(currentInput);
                const result = calculate(operator, operand1, operand2);
                currentInput = result.toString();
                updateScreen(currentInput);
                operator = null;
                operand1 = null;
                operand2 = null;
            }
        } else if (keyValue === '√') { // Square root
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
            updateScreen(currentInput);
        } else if (keyValue === 'x²') { // Square
            currentInput = (Math.pow(parseFloat(currentInput), 2)).toString();
            updateScreen(currentInput);
        } else if (keyValue === '1/x') { // Reciprocal
            currentInput = (1 / parseFloat(currentInput)).toString();
            updateScreen(currentInput);
        } else if (keyValue === '±') { // Plus/Minus
            currentInput = (-parseFloat(currentInput)).toString();
            updateScreen(currentInput);
        } else if (keyValue === '%') { // Percentage
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateScreen(currentInput);
        }
    });
});