// Write a program that takes in a dollar input from the user, adds it to a column in a table, and then displays the table.
// Then add all the provided inputs from the user and split the total evenly between an input number of people.
// Then display the total and the split amount in a table.


// Global Variables
let total = 0;

// Event Listeners

let addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', addExpense);

let expenseForm = document.querySelector('#expense-form');
expenseForm.addEventListener('keyup', event => {
    if (event.code === 'Enter') {
        addExpense();
    }
});

let localStorageButton = document.querySelector('#local-storage-btn');
localStorageButton.addEventListener('click', getExpensesFromLocalStorage);


// Functions

function getExpensesFromLocalStorage() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) ?? [];
    expenses.forEach(expense => {
        addExpenseToTable(expense.amount, expense.description);
        addExpenseToTotal(expense.amount);
        splitTotalExpenses();
    });
}

function addExpense() {
    let expenseDescription = document.querySelector('#expense-description');
    let expenseAmount = document.querySelector('#expense-amount');

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
    resetForm(expenseAmount, expenseDescription);
}

function saveExpense(amount, description) {
    let expense = {
        amount,
        description
    };

    let expenses = JSON.parse(localStorage.getItem('expenses')) ?? [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function resetForm(expenseAmount, expenseDescription) {
    expenseAmount.value = '';
    expenseDescription.value = '';
    expenseDescription.focus();
}

function addExpenseToTable(expenseAmount, expenseDescription) {
    let template = document.querySelector('#expense-row');
    let clone = template.content.cloneNode(true);

    let td = clone.querySelectorAll('td');
    td[0].textContent = expenseDescription;
    td[1].textContent = expenseAmount;
    td[2].textContent = splitExpense(expenseAmount);

    let dollarTableBody = document.querySelector('#dollar-table > tbody');
    let totalRow = document.querySelector('#total-row');
    dollarTableBody.insertBefore(clone, totalRow);
}

function splitExpense(expenseAmount) {
    return expenseAmount / getNumPeople();
}

function getNumPeople() {
    let numberOfPeople = document.querySelector('#num-people');
    numberOfPeople.value ||= 2;
    return numberOfPeople.value;
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