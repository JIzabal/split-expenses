function saveExpense(amount, description) {
    let expense = {
        amount,
        description
    };

    let expenses = getExpenses();
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) ?? [];
}

export { getExpenses, saveExpense };