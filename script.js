document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
   
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const action = button.getAttribute('data-action');
            const buttonContent = button.textContent;
            const displayedNum = display.textContent;

            if (!isNaN(action) || action === 'decimal') {
                if (displayedNum === '0' || waitingForSecondValue) {
                    display.textContent = buttonContent;
                    waitingForSecondValue = false;
                } else {
                    display.textContent = displayedNum + buttonContent;
                }
            }

            if (action === 'clear') {
                display.textContent = '0';
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            }

            if (action === 'sign') {
                display.textContent = displayedNum.charAt(0) === '-' ? displayedNum.slice(1) : '-' + displayedNum;
            }

            if (action === 'percent') {
                display.textContent = (parseFloat(displayedNum) / 100).toString();
            }

            if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
                firstValue = parseFloat(displayedNum);
                operator = action;
                waitingForSecondValue = true;
            }

            if (action === 'calculate') {
                if (firstValue === null) return;

                let secondValue = parseFloat(displayedNum);
                let result = 0;

                switch (operator) {
                    case 'add':
                        result = firstValue + secondValue;
                        break;
                    case 'subtract':
                        result = firstValue - secondValue;
                        break;
                    case 'multiply':
                        result = firstValue * secondValue;
                        break;
                    case 'divide':
                        result = firstValue / secondValue;
                        break;
                }

                display.textContent = result.toString();
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            }
        });
    });
});

