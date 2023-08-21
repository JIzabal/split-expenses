import { displayExpenses } from './readExpenses.js';
import { addExpense } from './createExpense.js';

function init() {
    let localStorageButton = document.querySelector('#local-storage-btn');
    localStorageButton.addEventListener('click', displayExpenses);
    
    let addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener('click', addExpense);

    let expenseForm = document.querySelector('#expense-form');
    expenseForm.addEventListener('keyup', event => {
        if (event.code === 'Enter') {
            addExpense();
        }
    });
}

window.addEventListener('DOMContentLoaded', init);