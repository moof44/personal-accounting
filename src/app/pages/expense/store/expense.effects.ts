import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpenseActions } from './expense.actions';
import { Observable, catchError, exhaustMap, map, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';



@Injectable()
export class ExpenseEffects {
  // props
  private _collectionName = 'expense';
  private _expenseCollection!: CollectionReference;

  constructor(
    private _actions$: Actions,
    private _firestore: Firestore,
    private _store: Store,
  ) {
    this._expenseCollection = collection(_firestore, this._collectionName);
    this._eventListener();
  }

  loadExpenses$ = createEffect(() => 
    this._actions$.pipe(
      ofType(ExpenseActions.loadExpenses),
      exhaustMap(() => 
        collectionData(this._expenseCollection).pipe( 
          take(1), 
          map((incomes:any[])=>incomes.map(v=>({...v, date: v.date.toDate()}))),
          tap(v=>console.log('expense', v)),
          map((expenses:any) => ExpenseActions.loadExpensesSuccess({ expenses })),
          //catchError(error => of(IncomeActions.loadIncomesFailure({ error })))
        )
      )
    )
  );

  // event listener
  private _eventListener(){
    (collectionData(this._expenseCollection, {idField: 'id'}) as Observable<any[]>)
      .pipe(
        map((incomes:any[])=>incomes.map(v=>({...v, date: v.date.toDate()}))),
        tap(v=>console.log('collectionData:expense:', v))
      )
      .subscribe(expenses=>{
        this._store.dispatch(ExpenseActions.loadExpensesSuccess({ expenses }))
      })
      
  }

  // Effect to listen for real-time Firestore updates
  // listenForUpdates$ = createEffect(() => 
  //   collectionData(this._expenseCollection).pipe(
  //     tap(v=>console.log('listeforupdates', v)),
  //     catchError(e=>{
  //       console.log('error', e);
  //       return [];
  //     }),
  //     map((expenses:any) => ExpenseActions.loadExpensesSuccess({ expenses })) // Dispatch success action on updates
  //   )
  // );


  // Effect to add an income
  addExpense$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ExpenseActions.addExpense),
      map((action) => action.expense),
      exhaustMap((expense) =>{
        console.log('expense', expense);
        const incomeRef = doc(this._expenseCollection);
        const toSave = {...expense, id: incomeRef.id};
        return addDoc(this._expenseCollection, toSave).then(
          (docRef) => {
            console.log('Document written with ID: ', docRef.id);
            return ExpenseActions.addExpenseSuccess({ expense: toSave });
          },
          // (error) => {
          //   console.error('Error adding document: ', error);
          //   return IncomeActions.addIncomeFailure({ error });
          // }
        )
      })
    )
  );

}
