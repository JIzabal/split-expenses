import { getExpenses } from "./expenseStorage.js";
import { addExpenseToTable, addExpenseToTotal, splitTotalExpenses } from "./createExpense.js";

function displayExpenses() {
    getExpenses().forEach(expense => {
        addExpenseToTable(expense.amount, expense.description);
        addExpenseToTotal(expense.amount);
        splitTotalExpenses();
    });
}

export { displayExpenses };