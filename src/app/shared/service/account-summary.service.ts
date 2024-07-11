import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { selectSavingsInDateRange, selectTotalAmountInDateRangeForSavings } from '../../pages/savings/store/savings.selectors';
import { selectCapitalsInDateRange, selectTotalAmountInDateRangeForCapitals } from '../../pages/capital/store/capital.selectors';
import { selectExpensesInDateRange, selectTotalAmountInDateRangeForExpenses } from '../../pages/expense/store/expense.selectors';
import { selectIncomesInDateRange, selectTotalAmountInDateRange } from '../../pages/income/store/income.selectors';
import { selectPurchasesInDateRange, selectTotalAmountInDateRangeForPurchases } from '../../pages/purchase/store/purchase.selectors';
import { selectLiabilitiesInDateRange, selectTotalAmountInDateRangeForLiabilities } from '../../pages/liability/store/liability.selectors';

@Injectable({
  providedIn: 'root'
})
export class AccountSummaryService {

  private _startDate = new BehaviorSubject<Date>(new Date(2024, 1, 1));
  startDate$ = this._startDate.asObservable();

  private _endDate = new BehaviorSubject<Date>(new Date());
  endDate$ = this._endDate.asObservable();

  // Savings
  private _savingsInDateRange = new BehaviorSubject<any[]>([]);
  savingsInDateRange$ = this._savingsInDateRange.asObservable();

  private _savingInDateRangeTotal = new BehaviorSubject<number>(0);
  savingInDateRangeTotal$ = this._savingInDateRangeTotal.asObservable();

  // Capitals
  private _capitalsInDateRange = new BehaviorSubject<any[]>([]);
  capitalsInDateRange$ = this._capitalsInDateRange.asObservable();

  private _capitalInDateRangeTotal = new BehaviorSubject<number>(0);
  capitalInDateRangeTotal$ = this._capitalInDateRangeTotal.asObservable();

  // Expenses
  private _expensesInDateRange = new BehaviorSubject<any[]>([]);
  expensesInDateRange$ = this._expensesInDateRange.asObservable();

  private _expenseInDateRangeTotal = new BehaviorSubject<number>(0);
  expenseInDateRangeTotal$ = this._expenseInDateRangeTotal.asObservable();

  // Incomes
  private _incomesInDateRange = new BehaviorSubject<any[]>([]);
  incomesInDateRange$ = this._incomesInDateRange.asObservable();

  private _incomeInDateRangeTotal = new BehaviorSubject<number>(0);
  incomeInDateRangeTotal$ = this._incomeInDateRangeTotal.asObservable();

  // Purchases
  private _purchasesInDateRange = new BehaviorSubject<any[]>([]);
  purchasesInDateRange$ = this._purchasesInDateRange.asObservable();

  private _purchaseInDateRangeTotal = new BehaviorSubject<number>(0);
  purchaseInDateRangeTotal$ = this._purchaseInDateRangeTotal.asObservable();

  // Liabilities
  private _liabilitiesInDateRange = new BehaviorSubject<any[]>([]);
  liabilitiesInDateRange$ = this._liabilitiesInDateRange.asObservable();

  private _liabilityInDateRangeTotal = new BehaviorSubject<number>(0);
  liabilityInDateRangeTotal$ = this._liabilityInDateRangeTotal.asObservable();

  // Net Income
  private _netIncome = new BehaviorSubject<number>(0);
  netIncome$ = this._netIncome.asObservable();

  constructor(
    private _store: Store,
  ) { 
    this._eventListener();
  }

  private _eventListener(){
    // update all items
    combineLatest([
      this.startDate$, 
      this.endDate$,
    ]).pipe(
      map(([startDate, endDate]) => {

        // Savings
        this._store.select(selectSavingsInDateRange, {
          startDate,
          endDate
        }).subscribe(data => this._savingsInDateRange.next(data));

        this._store.select(selectTotalAmountInDateRangeForSavings, {
          startDate,
          endDate
        }).subscribe(data => this._savingInDateRangeTotal.next(data));

        // Capitals
        this._store.select(selectCapitalsInDateRange, {
          startDate,
          endDate
        }).subscribe(data => this._capitalsInDateRange.next(data));

        this._store.select(selectTotalAmountInDateRangeForCapitals, {
          startDate,
          endDate
        }).subscribe(data => this._capitalInDateRangeTotal.next(data));

        // Expenses
        this._store.select(selectExpensesInDateRange, {
          startDate,
          endDate
        }).subscribe(data => this._expensesInDateRange.next(data));

        this._store.select(selectTotalAmountInDateRangeForExpenses, {
          startDate,
          endDate
        }).subscribe(data => this._expenseInDateRangeTotal.next(data));

        // Incomes
        this._store.select(selectIncomesInDateRange, {
          startDate,
          endDate
        }).subscribe(data => this._incomesInDateRange.next(data));

        this._store.select(selectTotalAmountInDateRange, {
          startDate,
          endDate
        }).subscribe(data => this._incomeInDateRangeTotal.next(data));

        // Purchases
        this._store.select(selectPurchasesInDateRange, {
          startDate,
          endDate
        }).subscribe(data => this._purchasesInDateRange.next(data));

        this._store.select(selectTotalAmountInDateRangeForPurchases, {
          startDate,
          endDate
        }).subscribe(data => this._purchaseInDateRangeTotal.next(data));

        // Liabilities
        this._store.select(selectLiabilitiesInDateRange, {
          startDate,
          endDate
        }).subscribe(data => this._liabilitiesInDateRange.next(data));

        this._store.select(selectTotalAmountInDateRangeForLiabilities, {
          startDate,
          endDate
        }).subscribe(data => this._liabilityInDateRangeTotal.next(data));

        // Calculate Net Income
        // const netIncome = totalIncome + totalCapital - totalExpense - totalPurchase;
        // this._netIncome.next(netIncome);
        // return {startDate, endDate, totalIncome, totalExpense, totalPurchase, totalCapital}
      })
    ).subscribe(v=>{
      //console.log('sample', v);
    })

    // compute net income
    combineLatest([
      this.incomeInDateRangeTotal$,
      this.expenseInDateRangeTotal$,
      this.purchaseInDateRangeTotal$,
      this.capitalInDateRangeTotal$
    ])
    .pipe(
      map(([totalIncome, totalExpense, totalPurchase, totalCapital]) => {
        return {totalIncome, totalExpense, totalPurchase, totalCapital}
      })    
    )
    .subscribe(v=>{
      //console.log('sample', v);
      const netIncome = v.totalIncome + v.totalCapital - v.totalExpense - v.totalPurchase;
      this._netIncome.next(netIncome);
    })

  }

  

}
