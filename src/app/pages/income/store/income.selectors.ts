import { createSelector } from '@ngrx/store';
import { Income } from '../model/income.model';
import { selectAll } from './income.reducer';

export const selectIncomesInDateRange = createSelector(
  selectAll,
  (incomes: Income[], props: { startDate: Date; endDate: Date }) => {
    return incomes.filter((income) => {
      const incomeDate = new Date(income.date); // Assuming 'date' is a string or Date object
      return incomeDate >= props.startDate && incomeDate <= props.endDate;
    });
  }
);

export const selectTotalAmountInDateRange = createSelector(
  selectIncomesInDateRange,
  (incomes: Income[]) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  }
);


