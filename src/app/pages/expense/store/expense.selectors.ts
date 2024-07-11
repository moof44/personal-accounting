import { createSelector } from '@ngrx/store';
import { Expense } from '../model/expense.model'; // Assuming you have an Expense model
import { selectAll as selectExpenses } from './expense.reducer'; // Assuming your reducer is named expense.reducer

export const selectExpensesInDateRange = createSelector(
  selectExpenses,
  (expenses: Expense[], props: { startDate: Date; endDate: Date }) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date); // Assuming 'date' is a string or Date object
      return expenseDate >= props.startDate && expenseDate <= props.endDate;
    });
  }
);

export const selectTotalAmountInDateRangeForExpenses = createSelector(
  selectExpensesInDateRange,
  (expenses: Expense[]) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
);
