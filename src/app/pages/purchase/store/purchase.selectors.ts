import { createSelector } from '@ngrx/store';
import { Purchase } from '../model/purchase.model'; // Assuming you have a Purchase model
import { selectAll as selectPurchases } from './purchase.reducer'; // Assuming your reducer is named purchase.reducer

export const selectPurchasesInDateRange = createSelector(
  selectPurchases,
  (purchases: Purchase[], props: { startDate: Date; endDate: Date }) => {
    return purchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.date); // Assuming 'date' is a string or Date object
      return purchaseDate >= props.startDate && purchaseDate <= props.endDate;
    });
  }
);

export const selectTotalAmountInDateRangeForPurchases = createSelector(
  selectPurchasesInDateRange,
  (purchases: Purchase[]) => {
    return purchases.reduce((total, purchase) => total + purchase.amount, 0);
  }
);
