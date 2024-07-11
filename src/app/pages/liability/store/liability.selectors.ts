import { createSelector } from '@ngrx/store';
import { Liability } from '../model/liability.model'; // Assuming you have a Liability model
import { selectAll as selectLiabilities } from './liability.reducer'; // Assuming your reducer is named liability.reducer

export const selectLiabilitiesInDateRange = createSelector(
  selectLiabilities,
  (liabilities: Liability[], props: { startDate: Date; endDate: Date }) => {
    return liabilities.filter((liability) => {
      const liabilityDate = new Date(liability.date); // Assuming 'date' is a string or Date object
      return liabilityDate >= props.startDate && liabilityDate <= props.endDate;
    });
  }
);

export const selectTotalAmountInDateRangeForLiabilities = createSelector(
  selectLiabilitiesInDateRange,
  (liabilities: Liability[]) => {
    return liabilities.reduce((total, liability) => total + liability.amount, 0);
  }
);
