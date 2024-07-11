import { createSelector } from '@ngrx/store';
import { Savings } from '../model/savings.model'; // Assuming you have a Savings model
import { selectAll as selectSavings } from './savings.reducer'; // Assuming your reducer is named savings.reducer

export const selectSavingsInDateRange = createSelector(
  selectSavings,
  (savings: Savings[], props: { startDate: Date; endDate: Date }) => {
    return savings.filter((saving) => {
      const savingDate = new Date(saving.date); // Assuming 'date' is a string or Date object
      return savingDate >= props.startDate && savingDate <= props.endDate;
    });
  }
);

export const selectTotalAmountInDateRangeForSavings = createSelector(
  selectSavingsInDateRange,
  (savings: Savings[]) => {
    return savings.reduce((total, saving) => total + saving.amount, 0);
  }
);
