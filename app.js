class Calculator{
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number;
    }
    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    updateDisplay(){
        this.currentOperandElement.innerText =
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
            }
    }
    compute(){
        let val;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if( isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                val = prev + current;
                break;
            case '-':
                val = prev - current;
                break;
            case '*':
                val = prev * current;
                break;
            case '÷':
                val = prev / current;
                break;
        }
        this.currentOperand = val;
        this.previousOperand = '';
        this.operation = undefined;
    }
}

const display = document.querySelector('.display');
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const deleteAllBtn = document.querySelector('[data-all-clear]');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.textContent);
        calculator.updateDisplay();
    })
})

operationBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.textContent);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteAllBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})