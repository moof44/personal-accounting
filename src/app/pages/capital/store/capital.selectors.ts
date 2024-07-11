import { createSelector } from '@ngrx/store';
import { Capital } from '../model/capital.model'; // Assuming you have a Capital model
import { selectAll as selectCapitals } from './capital.reducer'; // Assuming your reducer is named capital.reducer

export const selectCapitalsInDateRange = createSelector(
  selectCapitals,
  (capitals: Capital[], props: { startDate: Date; endDate: Date }) => {
    return capitals.filter((capital) => {
      const capitalDate = new Date(capital.date); // Assuming 'date' is a string or Date object
      return capitalDate >= props.startDate && capitalDate <= props.endDate;
    });
  }
);

export const selectTotalAmountInDateRangeForCapitals = createSelector(
  selectCapitalsInDateRange,
  (capitals: Capital[]) => {
    return capitals.reduce((total, capital) => total + capital.amount, 0);
  }
);
