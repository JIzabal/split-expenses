import { saveExpense } from './expenseStorage.js';

let total = 0;

function addExpense() {
    let expenseDescription = document.querySelector('#expense-description');
    let expenseAmount = document.querySelector('#expense-amount');
    let expenseForm = document.querySelector('#expense-form');

    if (isNaN(expenseAmount.value) || isNaN(parseFloat(expenseAmount.value))) {
        alert('Please enter a number');
        expenseAmount.value = '';
        expenseAmount.focus();
        return;
    }

    addExpenseToTable(expenseAmount.value, expenseDescription.value);
    addExpenseToTotal(expenseAmount.value);
    splitTotalExpenses();
    saveExpense(expenseAmount.value, expenseDescription.value);
    expenseForm.reset();
    expenseDescription.focus();
}

function addExpenseToTable(expenseAmount, expenseDescription) {
    let template = document.querySelector('#expense-row');
    let clone = template.content.cloneNode(true);

    let tds = clone.querySelectorAll('td');
    let input = tds[0].querySelector('input');
    let label = tds[0].querySelector('label');

    // https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time#answer-40591207
    let uniqueID = Date.now() + Math.random();
    input.id += `-${uniqueID}`;
    label.htmlFor += `-${uniqueID}`;
    label.innerText = expenseDescription;
    tds[1].textContent = expenseAmount;
    tds[2].textContent = splitExpense(expenseAmount);

    let dollarTableBody = document.querySelector('#dollar-table > tbody');
    let totalRow = document.querySelector('#total-row');
    dollarTableBody.insertBefore(clone, totalRow);
}

function splitExpense(expenseAmount) {
    return expenseAmount / getNumPeople();
}

function addExpenseToTotal(expenseAmount) {
    let totalAmount = document.querySelector('#total-amount');
    total += parseFloat(expenseAmount);
    totalAmount.textContent = total;
}

function splitTotalExpenses() {
    let splitAmount = document.querySelector('#split-amount');
    splitAmount.textContent = total / getNumPeople();
}

function getNumPeople() {
    let numberOfPeople = document.querySelector('#num-people');
    numberOfPeople.value ||= 2;
    return numberOfPeople.value;
}

export { addExpenseToTable, addExpenseToTotal, splitTotalExpenses, addExpense };